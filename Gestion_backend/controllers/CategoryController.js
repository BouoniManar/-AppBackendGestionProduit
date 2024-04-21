const Category = require('../Models/Categorie');

const Product = require('../Models/Produit');




//creation
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const category = new Category({ name, description });
    const savedCategory = await category.save();

    res.status(201).json(savedCategory);
  } catch (err) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la sauvegarde de la catégorie.' });
  }}



  //update 
  exports.updateCategory = async (req, res) => {
    try {
      const { _id } = req.params; // ID de la catégorie à modifier
      const { name, description } = req.body; // Nouveau nom et/ou description
  
      // Vérifier si la catégorie existe
      const existingCategory = await Category.findById(_id);
  
      if (!existingCategory) {
        return res.status(404).json({ error: 'La catégorie n\'existe pas.' });
      }
  
      existingCategory.name = name || existingCategory.name; 
      existingCategory.description = description || existingCategory.description; 

      const updatedCategory = await existingCategory.save();
  
      res.status(200).json(updatedCategory);
    } catch (err) {
      res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour de la catégorie.' });
    }
  };

//delete
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params; 


    const existingCategory = await Category.findById(id);

    if (!existingCategory) {
      return res.status(404).json({ error: 'La catégorie n\'existe pas.' });
    }


    await existingCategory.remove();

    res.status(200).json({ message: 'La catégorie a été supprimée avec succès.' });
  } catch (err) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la suppression de la catégorie.' });
  }
};


//liste categorie produit

exports.listCategoriesWithProducts = async (req, res) => {
  try {
    const categories = await Category.find();

    const categoriesWithProducts = await Promise.all(
      categories.map(async (category) => {
        const products = await Product.find({ categoryId: category._id });
        return { category, products };
      })
    );

    res.status(200).json(categoriesWithProducts);
  } catch (err) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des catégories avec les produits associés.' });
  }
};
  