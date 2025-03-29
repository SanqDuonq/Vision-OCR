import bcrypt from 'bcrypt';

class Bcrypt {
    async hashPassword(password: string) {
        return await bcrypt.hash(password,10);
    }

    async comparePassword(password: string, hashPassword: string) {
        return await bcrypt.compare(password, hashPassword);
    }
}

export default new Bcrypt();