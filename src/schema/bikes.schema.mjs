import mongoose from "mongoose";

export const estadosDisponibles = ['disponible', 'en-uso', 'en-mantenimiento']

const bikesSchema = new mongoose.Schema({
    serialBike: {
        type: String,
        required: true,
        unique: true
    },
    stateBike: {
        type: String,
        enum: estadosDisponibles,
        default: 'disponible'
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