import { IUser } from "../interface/user.interface";
import User from "../models/user.model";
import bcrypt from "../utils/bcrypt";
import { throwError } from "../utils/throw-error";

class AuthServices {
    private async checkEmail(email: string) {
        if (await User.findOne({email})) {
            throwError(400, 'Email is already exists');
        }
    }

    private async comparePassword(password: string, hashPassword: string)  {
        if (!(await bcrypt.comparePassword(password, hashPassword))) {
            throwError(404, 'Email or password wrong');
        }
    }

    private async getEmailUser(email: string) {
        const user = await User.findOne({ email });
        if (!user) {
            throwError(400, "Email not found");
        }
        return user;
    }

    async signUp(user: IUser) {
        await this.checkEmail(user.email);
        user.password = await bcrypt.hashPassword(user.password!);
        return await User.create(user);
    }

    async signIn(email: string, password: string) {
        const user = await this.getEmailUser(email);
        await this.comparePassword(password, user?.password!);
        return user!._id.toString();
    }
}

export default new AuthServices();