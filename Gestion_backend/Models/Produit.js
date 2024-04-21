const mongoose = require('mongoose')




const produitSchema =new mongoose.Schema ( {
    nom : {
        type :String
    },

    prix: {
        type:String
    },

    description :{
        type: String
    }
})

const produit = mongoose.model("Produit",produitSchema)
module.exports=produit