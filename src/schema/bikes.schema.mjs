import mongoose from "mongoose";

const bikesSchema = new mongoose.Schema({
    serialBike: {
        type: String,
        required: true,
        unique: true
    },
    stateBike: {
        type: String,
        enum: ['disponible', 'en uso', 'en mantenimiento'],
        default: 'disponible'
    },
    stationBike: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'station',
        required: true
    }
},{
    timestamps: true,
    versionKey: false
});

const bikesModel = mongoose.model(
    'bikes',
    bikesSchema
);

export default bikesModel;