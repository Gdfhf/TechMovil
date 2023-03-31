const { Router } = require("express")
const { models } = require("../db/index")
const router = Router();

router.get('/', async(req, res) => {
    try{
        let listProveedores = await models.proveedores.findAll();
        res.json(listProveedores);
    }catch(error){
        console.log(error);
    }
});

router.get("/:id", async(req, res) => {
    try{
        const { id } = req.params;
        let listProveedores = await models.proveedores.findByPk(id);
        res.json(listProveedores);
    }catch(error){
        console.log(error);
    }
});

router.post("/", async(req,res)=> {
    try{
        console.log(req);
        const {body} = req;
        console.log(body);
        let proveedor = await models.proveedores.create(body);
        res.json(proveedor);
    }catch(error){
        console.log(error)
    }
});

router.put("/:id", async(req,res)=>{
    try{
        const { id } = req.params;
        const { body } = req;
        const update = await models.proveedores.update(body, {
            where: {CodigoProveedor: id}
        });
        let proveedor = await models.proveedores.findByPk(id);
        res.json(proveedor);
    }catch(error){
        console.log(error)
    }
})

router.delete("/:id", async(req, res)=>{
    try{
        const { id } = req.params;
        await models.proveedores.destroy({
            where: { CodigoProveedor: id }
        });
        res.json("Proveedor id: " +id+ ";Elimination Succesful");
    }catch(error){
        console.log(error)
    }

});

module.exports = router;