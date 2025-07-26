import mongoose from "mongoose";

const stationSchema = new mongoose.Schema({
    stationName: {
        type: String,
        required: true,
        trim: true
    },
    locationStation: {
        latitude: {
            type: Number,
            required: true
        },
        length: {
            type: Number,
            required: true
        }
    },
    capacitanceStation: {
        type: Number,
        required: true,
        max: 10,
        min: 1
    },
    bikesAvailableStation: {
        type: mongoose.Schema.Types.ObjectId,   
    }
},{
        timestamps: true,
        versionKey: false
});

const stationModel = mongoose.model(
    'station',
    stationSchema
);

export default stationModel;