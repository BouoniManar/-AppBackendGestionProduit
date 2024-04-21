const Product = require('../Models/Produit');
const Category = require('../Models/Categorie');


// create
exports.createProduct = (req, res) => {
  const { name, price, categoryId } = req.body;

  Category.findById(categoryId, (err, existingCategory) => {
    if (err) {
      return res.status(500).json({ error: 'Une erreur est survenue lors de la recherche de la catégorie associée.' });
    }

    if (!existingCategory) {
      return res.status(400).json({ error: 'La catégorie associée n\'existe pas.' });
    }

    const product = new Product({ name, price, categoryId });

    product.save((err, savedProduct) => {
      if (err) {
        return res.status(500).json({ error: 'Une erreur est survenue lors de la sauvegarde du produit.' });
      }

      res.status(201).json(savedProduct);
    });
  });
};



//Recupérer les produits

exports.getAllProducts = (req, res) => {
  Product.find({})
    .populate('categoryId') 
    .exec((err, products) => {
      if (err) {
        return res.status(500).json({ error: 'Une erreur est survenue lors de la recherche des produits.' });
      }

      res.json(products);
    });
};




  //update
  exports.updateProduct = (req, res) => {
    const { productId } = req.params;
    const { name, price, description } = req.body;
  
    Product.findByIdAndUpdate(
      productId,
      { name, price, description },
      { new: true },
      (err, updatedProduct) => {
        if (err) {
          return res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour du produit.' });
        }
  
        if (!updatedProduct) {
          return res.status(404).json({ error: 'Le produit n\'existe pas.' });
        }
  
        res.status(200).json(updatedProduct);
      }
    );
  };






  //delete
  exports.deleteProduct = (req, res) => {
    const { productId } = req.params;
  
    Product.findByIdAndRemove(productId, (err, deletedProduct) => {
      if (err) {
        return res.status(500).json({ error: 'Une erreur est survenue lors de la suppression du produit.' });
      }
  
      if (!deletedProduct) {
        return res.status(404).json({ error: 'Le produit n\'existe pas.' });
      }
  
      res.status(200).json({ message: 'Le produit a été supprimé avec succès.' });
    });
  };