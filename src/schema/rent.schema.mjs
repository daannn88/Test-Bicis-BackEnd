import mongoose from "mongoose";

const rentSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    bikeChossed: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bicicleta',
        required: true
    },
    departureStation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Estacion',
        required: true
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date
    },
    bikeInUse: {
        type: Boolean,
        default: true
    }
},{
    timestamps: true,
    versionkey: false
});

const rentModel = mongoose.model(
    'rent',
    rentSchema
);

export default rentModel;