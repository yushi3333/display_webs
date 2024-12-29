const {getDb} = require('../utils/db')
const {ObjectId} = require('mongodb')

//get apple products
const getAppleProducts = async (req, res)=>{
    try{
        const db = getDb();
        const appleCollection = db.collection("Apple");
        const products = await appleCollection.find().toArray();
        res.status(200).json(products)
        console.log('Apple products fetched:', products);
    }catch(error){
        res.status(500).json({message: "Failed to fetch all apple", error})
        
    }
}
//get dell products
const getDellProducts = async(req, res)=>{
    try{
        const db = getDb();
        const dellCollection = db.collection('Dell');
        const products = await dellCollection.find().toArray();
        res.status(200).json(products)

    }catch(err){

    }
}

const createProductForCategory = async (req,res) =>{
    try{
        const {category} = req.params;// Extract the category
        console.log(`Category: ${category}`);
        const validCategories = ['Apple', 'Dell'];

        if (!validCategories.includes(category)) {
            return res.status(400).json({ message: 'Invalid category' });
        }
        const db = getDb();
        const collection = db.collection(category);
        const newProduct = req.body;// The product details from the request body
        const result = await collection.insertOne(newProduct);
        // Use the `result.insertedId` for success confirmation
        res.status(201).json({
            message: `Product created successfully in ${category}`,
            product: { ...newProduct, _id: result.insertedId }, // Append inserted ID to the response
        });

    }catch(err){
        res.status(500).json({message: `Failed to create product in ${req.params.category}`, err})
    }
}







//get products by id
const getProductsById = async (req,res)=>{
    try {
        const {category, id} = req.params;
        console.log(`fetching product from category: ${category} with ID: ${id}`)
        const validCategories=['Apple', 'Dell'];
        if (!validCategories.includes(category)){
            return res.status(400).json({message: 'Invalid category'})
        }

        const db = getDb();
        const collection  = db.collection(category);
        const product = await collection.findOne({_id: new ObjectId(req.params.id)})
        console.log("the product is :", product)
        if (product){
            res.status(200).json(product);
        }
        else{
            res.status(404).json({message: "product not found"})
        }
    }
    catch(error){
        res.status(500).json({message: "failed to fetch product", product})
    }
};

//update product by ID
const updateProducts = async (req, res)=>{

    try{
        const {category, id} = req.params;
        //console.log('PUT /api/products/:id route hit with ID:', req.params.id); // Debugging log
        const trimmedId = id.trim();
        //console.log('Trimmed ID:', trimmedId); // Log the trimmed version of ID
        if (!ObjectId.isValid(trimmedId)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }
        const validCategories=['Apple', 'Dell'];
        if (!validCategories.includes(category)){
            return res.status(400).json({message: 'Invalid category'})
        }    
        const db = getDb();
        const collection = db.collection(category);
        const updateData = req.body;
        //console.log('Update data:', updateData);

        const productExists = await collection.findOne({ _id: new ObjectId(trimmedId) });
        //console.log('Product found before update:', productExists);
        if (!productExists) {
            return res.status(404).json({ message: "Product not found" });
        }

        const result = await collection.updateOne(
            { _id: new ObjectId(trimmedId) },
            {$set: updateData},

        );

        if (result.matchedCount > 0) {
            res.status(200).json({ message: "Product updated successfully" });
        } else {
            console.log("Product not found for ID:", trimmedId);
            res.status(404).json({ message: "Product not found" });
        }

    }catch(error){
        res.status(500).json({message:"Failed to update product", error});
    }
}

//delete the product by id
const deleteProducts = async (req, res)=>{
    try{
        const {category, id} =req.params;
        console.log(`fetching product in category ${category} with ID: ${id}`)
        const trimmedId = id.trim();
        if (!ObjectId.isValid(trimmedId)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }


        const validCategories=['Apple', 'Dell'];
        if (!validCategories.includes(category)){
            return res.status(400).json({message: 'Invalid category'})
        }    
       
        const db = getDb();
        const collection = db.collection(category)
        const result = await collection.deleteOne({_id: new ObjectId(trimmedId)});
        console.log("the deleted product is ", result)
        if (result.deletedCount === 1){
            res.status(200).json({message: "Product deleted successfully"})

        }else{
            res.status(404).json({message: "Product not found"});
        }
        
    }catch(error){
        res.status(500).json({message: "Failed to delete product", error})

    }
}


module.exports ={
  
    getAppleProducts,
    getDellProducts,
    createProductForCategory,
    getProductsById,
    updateProducts,
    deleteProducts
};