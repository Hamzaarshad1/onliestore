import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import { createUserSessionHandler } from "./controller/userSession.controller";
import validateRequest from './middleware/validateRequest'
import { createUserSchema,createUserSessionSchema } from "./schema/user.schema";
import { 
    getAllProductsHandler,
    getSpecificProductHandler } from "./controller/products.controller";
import {
    createaddToCartHandler,
    getCartHandler
    } from './controller/cart.controller';

import  {
    oderHandler,
    getOrderHandler
} from './controller/order.controller';

export default function(app: Express){
   
    //Register-user
    // post /api/session
    app.post('/api/users',validateRequest(createUserSchema), createUserHandler)
    //login-user
    //post /api/session
    app.post(
        "/api/sessions",
        validateRequest(createUserSessionSchema),
        createUserSessionHandler
      );
    //Get user's sessions
    //get /api/sessions

    //Logout
    //delete /api/session

    //get Products
    //get api/products
    app.get('/api/products',getAllProductsHandler)

    //get Product by id
    //get api/products
    app.get('/api/product',getSpecificProductHandler)

    //post Cart
    //post api/addtocart
    app.post('/api/addtocart',createaddToCartHandler)

    //get cart
    //get api/getCart
    app.get('/api/addtocart',getCartHandler)

    // post Order
    //post api/order
    app.post('/api/order', oderHandler)

    // get Order
    //post api/order
    app.get('/api/order', getOrderHandler)  

}