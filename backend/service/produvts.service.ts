import {
    DocumentDefinition,
    FilterQuery,
    UpdateQuery,
    QueryOptions,
  } from "mongoose";
import Product,{ProductsDocuments} from "../model/products.model";

export function getAllProducts(){
    return Product.find();
}

export function getProductByID(id:any){
  return Product.findById(id)
}