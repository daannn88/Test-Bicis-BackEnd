import bikesModel from "../schema/bikes.schema.mjs";
import rentModel from "../schema/rent.schema.mjs";
import stationModel from "../schema/station.schema.mjs";

const createRent = async (req, res)=>{
    const inData = req.body;
    try{
        const rentFound = await rentModel.findOne({bikeChossed: inData.bikeChossed})

        if (!inData.userName || !inData.departureStation) {
            return res.status(400).json({ msg: 'Faltan datos obligatorios' });
        }

        const station = await stationModel.findById(inData.departureStation);

        if (!station) {
            return res.status(404).json({ msg: 'Estación no encontrada' });
        }

        const bicicletaNoDisponible = await bikesModel.findOne({
            stateBike: 'en-mantenimiento'
        });

        if (bicicletaNoDisponible) {
            return res.status(400).json({ msg: 'No hay bicicletas disponibles o están en mantenimiento' });
        }

        if(rentFound){
            return res.json({msg: 'Ya se realizo el alquiler de esta bicicleta'})
        }

        const bicicletaDisponible = await bikesModel.findOne({
            stateBike: 'disponible'
        });

        bicicletaDisponible.stateBike = 'en-uso';

        await bicicletaDisponible.save();

        const rentCreated = await rentModel.create(inData);

        await rentCreated.save();        

        station.bicicletaDisponible -= 1;

        await station.save();

        res.status(201).json({msg: 'Bicicleta alquilada con exito'});

    }catch(error){
        console.error(error);
        res.status(500).json({msg:'Error: No se pudo realizar el alquiler'})
    };
}

const returnBikeRent = async (req, res)=>{
    const rentId = req.params.rentId;
    const inData = req.body;
    try{
        if (!inData.userName || !inData.departureStation) {
            return res.status(400).json({ msg: 'Faltan datos obligatorios' });
        }

        if (!rentId) {
            return res.status(400).json({ msg: 'ID de alquiler es obligatorio' });
        }

        const rent = await rentModel.findById(rentId)
        .populate('bikeChossed')
        .populate('departureStation');

        if(!rent){
            return res.status(404).json({msg:'alquiler no encontrado'})
        }

        if(rent.bikeActive != 'en-curso'){
            return res.status(400).json({ msg: 'El alquiler ya fue finalizado' });
        }

        rent.endDate = new Date();
        rent.bikeActive = 'finalizado';
        rent.save();
        
        const bike = rent.bikeChossed;
        bike.stateBike = 'disponible';
        await bike.save();

        res.json({msg: 'Bicicleta devuelta', rent})
    }   
    catch(error){
        console.log(error)
        res.status( 500 ).json({ msg: 'Error: No se pudo devolver la bicicleta.' })
    }
}

const getAllRents = async (req, res)=>{
    try {
        const inData = await rentModel.find({});
        res.status( 200 ).json( inData );        
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({ msg: 'Error: No se pudo obtener el listado de los alquileres.' });
    }
};

const getRentById = async (req, res) => {
    const rentId = req.params.id;

    try {
        const inData = await rentModel.findById(rentId);

        // Verifica si la categoria No existe y lanza el respectivo mensaje al cliente
        if( ! inData ) {
            return res.status( 404 ).json({ msg: 'El alquiler no se encuentra registrado.' });
        }

        res.status( 200 ).json( inData );
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({ msg: 'Error: No se pudo encontrar el registro del alquiler.' });
    }
    
};

const removeRentById = async (req, res) => {
    const rentId = req.params.id;

    try {
        const inData = await rentModel.findByIdAndDelete( rentId );

        if( ! inData ) {
            return res.json({ msg: 'El alquiler no se encuentra registrado.' });
        }
        
        res.json( inData );
    } 
    catch ( error ) {
        console.error( error );
        res.json({ msg: 'Error: No se pudo eliminar el alquiler.' });
    }
};

const updateRentById = async (req, res) => {
    const rentId = req.params.id;
    const inputData = req.body;

    try {
        const inData = await rentModel.findByIdAndUpdate( rentId, inputData, { new: true } );
        res.json( inData );        
    } 
    catch ( error ) {
        console.error( error );
        res.json({ msg: 'Error: No se pudo actualizar los datos del alquiler.' });
    }
};

export{
    updateRentById,
    createRent,
    getAllRents,
    getRentById,
    removeRentById,
    returnBikeRent
}