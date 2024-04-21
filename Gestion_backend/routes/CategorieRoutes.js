const express = require('express');
const CategoryController = require('../controllers/CategoryController');
const router = express.Router();




router.post('/addCat', CategoryController.createCategory);
router.post('/listCat', CategoryController.listCategoriesWithProducts);
router.put('/category/:id', CategoryController.updateCategory);
router.delete("/delete/:id",CategoryController.deleteCategory)




module.exports=router