import mongoose from 'mongoose'
import { string } from 'yup'

export interface ProductsDocuments extends mongoose.Document{
    title: string;
    display_image: string;
    description: string;
    brand: string;
    category: string;
    tags: string[];
    available: Boolean;
    is_best_seller: Boolean;
    price: {
        currency: string;
        value: Number;
    } ;
    
}

const productsSchema = new mongoose.Schema(
   {
    title: { type : String, required: true },
    display_image: { type : String, required: true },
    description:{ type: String, required: true },
    brand:{ type: String, required: true },
    category:{ type: String, required: true, },
    tags:{ type: [], required: true },
    available:{ type: Boolean, default: true },
    is_best_seller:{ type: Boolean, default: false },
    price:{
        currency:{ type: String,  required: true },
        value:{  type: Number,  required: true }
    }
},
{timestamps: true}
)

const Product = mongoose.model<ProductsDocuments>('Product', productsSchema);

export default Product;