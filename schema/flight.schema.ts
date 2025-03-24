import { z } from "zod";

export const ticketSchema = z.object({
    airline: z.string().min(1, "Hãng hàng không không được để trống"),
    airlineCode: z.string().min(1, "Mã hãng hàng không không được để trống"),
    passengerName: z.string().min(1, "Tên hành khách không được để trống"),
    gate: z.string().min(1, "Cổng không được để trống"),
    seat: z.string().min(1, "Ghế không được để trống"),
    from: z.string().min(1, "Điểm đi không được để trống"),
    to: z.string().min(1, "Điểm đến không được để trống"),
    departureTime: z.preprocess(
        (arg) => (typeof arg === "string" || arg instanceof Date ? new Date(arg) : undefined),
        z.date().refine((date) => !isNaN(date.getTime()), { message: "Thời gian khởi hành không hợp lệ" })
    )
});
