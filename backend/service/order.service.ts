import { orderBy } from "lodash";
import {
    DocumentDefinition,
    FilterQuery,
    UpdateQuery,
    QueryOptions,
  } from "mongoose";
import cart,{cartDocuments} from "../model/cart.model";
import Order,{orderDocuments} from "../model/order.model";

export function createOrder(input: orderDocuments){

    return Order.create(input);
}

export function getOrderById(id: string){
const query: any = {}
query.userId =id
 return Order.find(query);
}

// export async function findUser(query: FilterQuery<UserDocument>){    
//     return User.findOne(query).lean();
// }