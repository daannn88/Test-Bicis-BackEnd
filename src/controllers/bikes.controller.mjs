import bikesModel, { estadosDisponibles } from "../schema/bikes.schema.mjs";


const createBike = async (req, res) => {
    const inData = req.body;

    try {
        const bikeFound = await bikesModel.findOne({ serialBike: inData.serialBike })

        if (bikeFound) {
            return res.json({ msg: 'La bicicleta ya se encuentra registrada' })
        };

        const BikeCreated = await bikesModel.create(inData);
        console.log('Bicicleta registrada con exito');
        res.status(201).json(BikeCreated);

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error: No se pudo registrar la bicicleta' })
    }
};

const getAllBikes = async (req, res) => {
    try {
        const inData = await bikesModel.find({});
        res.status(200).json(inData);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error: No se pudo obtener el listado de las bicicletas.' });
    }
};

const getOnlyBikesAvalaivable = async (req, res) => {
    const stateBike = req.params.stateBike || 'disponible';
    const stateExists = estadosDisponibles.includes( stateBike  );

    try { 
        console.log( stateExists )
        if ( ! stateExists ) {
            return res.json({ msg: `${ stateBike } no es un estado valido` });
        }
        
        const bikesAvailable = await bikesModel.find({stateBike}).populate('stateBike')
            
        res.json(bikesAvailable)
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener bicicletas' });
    }
};

const getBikeById = async (req, res) => {
    const BikeId = req.params.id;

    try {
        const inData = await bikesModel.findById(BikeId);

        // Verifica si la categoria No existe y lanza el respectivo mensaje al cliente
        if (!inData) {
            return res.status(404).json({ msg: 'La bicicleta no se encuentra registrada.' });
        }

        res.status(200).json(inData);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error: No se pudo encontrar la bicicleta.' });
    }

};

const removeBikeById = async (req, res) => {
    const BikeId = req.params.id;

    try {
        const inData = await bikesModel.findByIdAndDelete(BikeId);

        if (!inData) {
            return res.json({ msg: 'La bicicleta no se encuentra registrada.' });
        }

        res.json(inData);
    }
    catch (error) {
        console.error(error);
        res.json({ msg: 'Error: No se pudo eliminar la bicicleta.' });
    }
};

const updateBikeById = async (req, res) => {
    const BikeId = req.params.id;
    const inputData = req.body;

    try {
        const inData = await bikesModel.findByIdAndUpdate(BikeId, inputData, { new: true });
        res.json(inData);
    }
    catch (error) {
        console.error(error);
        res.json({ msg: 'Error: No se pudo actualizar los datos de la bicicleta.' });
    }
};

export {
    updateBikeById,
    createBike,
    getAllBikes,
    getBikeById,
    removeBikeById,
    getOnlyBikesAvalaivable
}