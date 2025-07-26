import mongoose from "mongoose";

const rentSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    bikeChossed: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bikes',
        required: true
    },
    departureStation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'station',
        required: true
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date
    },
    bikeActive: {
        type: String,
        enum: [ 'en-curso', 'finalizado'],
        default: 'en-curso'
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