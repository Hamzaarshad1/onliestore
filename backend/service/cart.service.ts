import {
    DocumentDefinition,
    FilterQuery,
    UpdateQuery,
    QueryOptions,
  } from "mongoose";
import cart,{cartDocuments} from "../model/cart.model";
import { omit,get } from "lodash";

export function createCart(input: cartDocuments){
    const filter = {userId: input.userId}
    return cart.findOneAndUpdate(filter,input, {upsert: true});
}

export function getCartById(id: string){
 return cart.findOne({userId: id});
}

export function deleteById(id: string){
    return cart.findOneAndDelete({userId:id});
}

export function getCartProducts(id:string){
    return cart.find({userId:id})
}