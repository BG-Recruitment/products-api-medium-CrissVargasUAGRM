const Products = require('../models/products');

module.exports = {
    createProduct: async(req, res) => {
        try {
            const {name, price, mrp, stock} = req.body;
            const isPublished = false;
            return res.status(201).json(
                await Products.create({
                    name,
                    price,
                    mrp,
                    stock,
                    isPublished
                })
            );
        } catch (error) {
            console.error(error);
            return res.status(500).send({error});
        }
    },

    getAllProduct: async(req, res) => {
        try {
            return res.status(200).json(
                await Products.findAll({
                    order: [
                        ['id', 'ASC']
                    ]
                })
            );
        } catch (error) {
            console.error(error);
            return res.status(500).send({error});
        }
    },

    updateProduct: async(req, res) => {
        const idProduct = req.params.id;
        const product = await Products.findOne({
            where: {id: idProduct}
        });

        if(!product){
            return res.status(404).json({message: "not found"});
        }

        crit1 = product.getDataValue("mrp") >= product.getDataValue("price");
        crit2 = product.getDataValue("stock") > 0;

        if(!crit1 && crit2){
            return res.status(422).json(["MRP should be less than equal to the Price"]);
        }

        if(crit1 && !crit2){
            return res.status(422).json(["Stock count is 0"]);
        }

        if(!crit1 && !crit2){
            return res.status(422).json(["MRP should be less than equal to the Price", "Stock count is 0"]);
        }

        await product.update({isPublished: true});
        return res.status(204).send();
    },

    deleteProduct: async(req, res) => {
        return res.status(405).json({message: "not allowed"});
    }
}