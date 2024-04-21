const mongoose =require('mongoose')

const CategorieSchema = new mongoose.Schema({
    name:{
        type:String

    },
    description : {
        type: String
    }
})

const Categorie = mongoose.model("categorie", CategorieSchema)
module.exports=Categorie;