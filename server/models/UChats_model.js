const mongoose = require("mongoose")
const { Schema } = mongoose;

const uChatSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        message: {
            type: String,
            required: true,
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },
    },
);

const UChat = mongoose.model("UChat", uChatSchema)

module.exports = UChat