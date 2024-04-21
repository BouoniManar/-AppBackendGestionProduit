const express = require ('express')
const mongoose = require('mongoose')
const app =express()
app.use(express.json())
const dotenv = require('dotenv');
dotenv.config();
const Categorie = require('./Models/Categorie');
const Produit = require('./Models/Produit');



const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT || 9000
const CategorieRoutes= require('./routes/CategorieRoutes')
const ProduitRoutes= require('./routes/ProduitRoutes')




mongoose.connect(MONGODB_URI).then(() => {
    console.log('connect to the database')
    app.listen(PORT,() => {
        console.log('server is running on  http://localhost:9000')
    })
}).catch(error => {
    console.log('error connecting to database :' , error.message)
    
})

app.use("/Categorie",CategorieRoutes)
app.use("/produit",ProduitRoutes)