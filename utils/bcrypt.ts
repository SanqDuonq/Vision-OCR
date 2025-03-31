import bcryptjs from 'bcryptjs'

class Bcrypt {
    async hashPassword(password: string) {
        return await bcryptjs.hash(password,10);
    }

    async comparePassword(password: string, hashPassword: string) {
        return await bcryptjs.compare(password, hashPassword);
    }
}

export default new Bcrypt();