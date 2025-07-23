import bikesModel from "../schema/bikes.schema.mjs";
import rentModel from "../schema/rent.schema.mjs";

const createRent = async (req, res)=>{
    const inData = req.body;

    try{
        const rentFound = await rentModel.findOne({bikeChossed: inData.bikeChossed})

        if(rentFound){
            return res.json({msg: 'Ya se realizo la renta de esta bicicleta'})
        }

        const rentCreated = await rentModel.create(inData);
        console.log('Renta creada con exito');
        res.status(201).json(rentCreated);

    }catch(error){
        console.error(error);
        res.status(500).json({msg:'Error: No se pudo realizar la renta'})
    }
};

const getAllRents = async (req, res)=>{
    try {
        const inData = await rentModel.find({});
        res.status( 200 ).json( inData );        
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({ msg: 'Error: No se pudo obtener el listado de rentas.' });
    }
};

const getRentById = async (req, res) => {
    const rentId = req.params.id;

    try {
        const inData = await rentModel.findById(rentId);

        // Verifica si la categoria No existe y lanza el respectivo mensaje al cliente
        if( ! inData ) {
            return res.status( 404 ).json({ msg: 'La renta no se encuentra registrada.' });
        }

        res.status( 200 ).json( inData );
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({ msg: 'Error: No se pudo encontrar el registro de la renta.' });
    }
    
};

const removeRentById = async (req, res) => {
    const rentId = req.params.id;

    try {
        const inData = await rentModel.findByIdAndDelete( rentId );

        if( ! inData ) {
            return res.json({ msg: 'La renta no se encuentra registrada.' });
        }
        
        res.json( inData );
    } 
    catch ( error ) {
        console.error( error );
        res.json({ msg: 'Error: No se pudo eliminar la renta.' });
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
        res.json({ msg: 'Error: No se pudo actualizar los datos de la renta.' });
    }
};

export{
    updateRentById,
    createRent,
    getAllRents,
    getRentById,
    removeRentById
}