import { Request, response, Response } from "express";
import { request } from "http";
import { get } from "lodash";
import { getAllProducts,getProductByID } from "../service/produvts.service";

export async function getAllProductsHandler(req: Request, res: Response){    
    const products = await getAllProducts();
    if(!products){
        res.status(404).send('There is no data')
    }

    res.status(200).send(products)
}

export async function getSpecificProductHandler(req: Request, res: Response){
    
    const id = get(req.query,'productId');
    const product = await getProductByID(id);
    
    res.status(200).send(product)
}