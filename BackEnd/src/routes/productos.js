const { Router } = require("express")
const { models, sequelize } = require("../db/index")
const router = Router();
const { Sequelize } = require ("sequelize");

//Raiz
router.get('/', async(req, res) =>{
    try{
        let listProductos = await models.productos.findAll(); //await: hasta que se termine el proceso, que se continue
        //console.log(listProductos);
        res.json(listProductos);
    }catch(error){
        console.log(error)
    }
});

router.get("/:id", async(req, res)=>{
    try{
        let producto = await sequelize.query(`SELECT * FROM productos WHERE Codigo = ${id}`)
        res.json(producto);
    }catch(error){
        console.log(error)
    }
});

//POST, suopngo
router.post("/", async(req, res) => {
    try{
        const { body } = req;
        console.log(body);
        console.log(body.Codigo);
        //producto = await models.productos.query('call PostProduto')
        let producto = await models.productos.create(body);
        res.json(producto);
    }catch(error){
        console.log(error)
    }
});

router.put("/:id", async(req, res) => {
    try{
        const { id } = req.params;
        const { body } = req;

        //Modifica los datos mediante update
        const update = await models.productos.update(body, {
            where: {codigo : id}
        });
        //Busca el producto por la id
        let product = await models.productos.findByPk(id);
        //Respuesta
        res.json(update);
    }catch(error){
        console.log(error)
    }
});

router.delete("/:id", async(req, res) => {
    try{
        const { id } = req.params;
        await models.productos.destroy({
            where : { Codigo : id }
        });
        res.json("Producto con id: "+ id + " se ha eliminado correctamente");
    }catch(error){
        console.log(error)
    }
});

module.exports = router;