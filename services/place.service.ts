import axios from "axios";
import redis from "../database/redis";

class PlaceServices {
    async getTouristPlace(location: string) {
        try {
            const cacheKey = `touristPlaces:${location}`;
            const cachedData = await redis.get(cacheKey);

            if (cachedData) {
                console.log("🚀 Lấy từ Redis Cache");
                return JSON.parse(cachedData).sort(() => 0.5 - Math.random()).slice(0, 5);
            }

            const geoUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`;
            const geoResponse = await axios.get(geoUrl);
            if (!geoResponse.data.length) return [];

            const bestMatch = geoResponse.data.find((place: any) => place.type === "city") || geoResponse.data[0];
            const { lat, lon } = bestMatch;

            const overpassQuery = `
                [out:json];
                (
                  node["tourism"="attraction"](around:10000, ${lat}, ${lon});
                  way["tourism"="attraction"](around:10000, ${lat}, ${lon});
                  relation["tourism"="attraction"](around:10000, ${lat}, ${lon});
                );
                out body;
            `;
            const overpassUrl = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`;
            const overpassResponse = await axios.get(overpassUrl);
            let places = overpassResponse.data.elements.filter((el: any) => el.tags && el.tags.name);

            if (!places.length) return [];

            let placeDetails = await Promise.all(
                places.map(async (el: any) => {
                    if (!el.lat || !el.lon) return null;

                    const reverseGeoUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${el.lat}&lon=${el.lon}`;
                    try {
                        const reverseGeoResponse = await axios.get(reverseGeoUrl);
                        let address = reverseGeoResponse.data.display_name || "Không có địa chỉ cụ thể";

                        address = address.replace(/\b\d{5,}\b/g, "").trim().replace(/, ,/g, ",");

                        if (address.startsWith(el.tags.name)) {
                            address = address.replace(el.tags.name + ", ", "");
                        }

                        return { name: el.tags.name, address };
                    } catch (error) {
                        console.error(`Lỗi lấy địa chỉ: ${el.tags.name}`, error);
                        return { name: el.tags.name, address: "Không có địa chỉ cụ thể" };
                    }
                })
            );

            placeDetails = placeDetails.filter((p) => p !== null && p.address !== "Không có địa chỉ cụ thể");

            if (placeDetails.length < 5) {
                const additionalPlaces = places
                    .map((el:any) => ({ name: el.tags.name, address: "Không có địa chỉ cụ thể" }))
                    .filter((p: any) => !placeDetails.some((d) => d.name === p.name));

                placeDetails = [...placeDetails, ...additionalPlaces].slice(0, 5);
            } else {
                placeDetails = placeDetails.sort(() => 0.5 - Math.random()).slice(0, 5);
            }

            await redis.set(cacheKey, JSON.stringify(placeDetails), "EX", 3600);
            console.log("✅ Dữ liệu mới đã cache vào Redis");

            return placeDetails;
        } catch (error) {
            console.error("Lỗi lấy dữ liệu OSM:", error);
            return [];
        }
    }
}

export default new PlaceServices();
