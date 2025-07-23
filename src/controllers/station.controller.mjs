import stationModel from "../schema/station.schema.mjs";


const createStation = async (req, res)=>{
    const inData = req.body;

    try{
        const stationFound = await stationModel.findOne({ stationName: inData.stationName })

        if(stationFound){
            return res.json({msg: 'La estacion ya se encuentra registrada'})
        };

        const stationCreated = await stationModel.create(inData);
        console.log('Estacion creada con exito');
        res.status(201).json(stationCreated);

    }catch(error){
        console.error(error);
        res.status(500).json({msg:'Error: No se pudo registrar la estacion'})
    }
};

const getAllStations = async (req, res)=>{
    try {
        const inData = await stationModel.find({});
        res.status( 200 ).json( inData );        
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({ msg: 'Error: No se pudo obtener el listado de estaciones.' });
    }
};

const getStationById = async (req, res) => {
    const stationId = req.params.id;

    try {
        const inData = await stationModel.findById(stationId);

        // Verifica si la categoria No existe y lanza el respectivo mensaje al cliente
        if( ! inData ) {
            return res.status( 404 ).json({ msg: 'La estacion no se encuentra registrada.' });
        }

        res.status( 200 ).json( inData );
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({ msg: 'Error: No se pudo encontrar la estacion.' });
    }
    
};

const removeStationById = async (req, res) => {
    const stationId = req.params.id;

    try {
        const inData = await stationModel.findByIdAndDelete( stationId );

        if( ! inData ) {
            return res.json({ msg: 'La estacion no se encuentra registrada.' });
        }
        
        res.json( inData );
    } 
    catch ( error ) {
        console.error( error );
        res.json({ msg: 'Error: No se pudo eliminar la estacion.' });
    }
};

const updateStationById = async (req, res) => {
    const stationId = req.params.id;
    const inputData = req.body;

    try {
        const inData = await stationModel.findByIdAndUpdate( stationId, inputData, { new: true } );
        res.json( inData );        
    } 
    catch ( error ) {
        console.error( error );
        res.json({ msg: 'Error: No se pudo actualizar los datos de la estacion.' });
    }
};


export{
    updateStationById,
    removeStationById,
    createStation,
    getAllStations,
    getStationById
}
