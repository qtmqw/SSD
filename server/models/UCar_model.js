const mongoose = require("mongoose")
const { Schema } = mongoose;

const uCarSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        image: {
            type: String,
        },
        company: {
            type: String,
            required: true,
        },
        model: {
            type: String,
            required: true,
        },
        year: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        created_at: {
            type: Date,
            default: Date.now,
        },
    },
);

const UCar = mongoose.model("UCar", uCarSchema)

module.exports = UCar