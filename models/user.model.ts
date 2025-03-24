import mongoose from "mongoose";
import { IUser } from "../interface/user.interface";

const UserModel = new mongoose.Schema<IUser>({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    avatar: {
        type: String,
    },
    googleId: {
        type: String
    },
    githubId: {
        type: String
    }
})

const User = mongoose.model('User', UserModel);
export default User;