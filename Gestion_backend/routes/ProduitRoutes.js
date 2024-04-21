const express = require('express');
const ProduitController = require('../controllers/ProduitController');
const category = require('./CategorieRoutes');
const router = express.Router();

router.post('/add', ProduitController.createProduct);
router.get('/getprod',ProduitController.getAllProducts)
router.delete('/deleteprod',ProduitController.deleteProduct)
router.put('/modif',ProduitController.updateProduct)



module.exports=router