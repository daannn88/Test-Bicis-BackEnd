import express from 'express';

import { createStation, getAllStations, getStationById, removeStationById, updateStationById } from '../controllers/station.controller.mjs';

const router = express.Router();

router.post('/api/stations', createStation)
router.get('/api/stations', getAllStations)
router.get('/api/stations/:id', getStationById)
router.delete('/api/stations/:id', removeStationById)
router.patch('/api/stations/:id', updateStationById)

export default router;