const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { ProfileSchema } = require("./profileSchema");

const UserSchema = new Schema(
    {
        _id: {
            type: String,
            require: true,
        },
        username: {
            type: String,
            require: true,
            unique: true,
            minLength: [5, "username length 5 - 10"],
            maxLength: [10, "username length 5 - 10"],
        },
        email: {
            type: String,
            require: true,
            unique: true,
            match: [/^[\w-.]+@([\w-]+\.)+[\w-]{2,3}$/, "Invalid email"],
        },
        password: {
            type: String,
            require: true,
        },
        role: {
            type: String,
            enum: ["admin", "guest"],
            default: "guest",
        },
        profile: ProfileSchema,
    },
    {
        timestamps: true,
    }
);

const User = model("User", UserSchema);
module.exports = { User, UserSchema };
