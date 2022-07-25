import jsonProducts from './products.json'
import Product from './model/products.model'
import connect from './db/connect';


const start = async ()=>{
    try{
        await connect();
        await Product.deleteMany();
        await Product.create(jsonProducts);
        console.log("All products added successfully")
    }catch(e: any){
        console.log(e.message)
    }
}

start()