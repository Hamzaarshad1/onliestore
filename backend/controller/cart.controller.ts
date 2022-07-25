import { Request, Response } from "express";
import { get } from "lodash";
import { 
    createCart,
    getCartById,
    deleteById } from "../service/cart.service";

export async function createaddToCartHandler(req: Request, res: Response) {
    const body = req.body;
    const post = await createCart({ ...body, userId: body.userid });
  
    return res.send(post);
  }

export async function getCartHandler(req: Request, res: Response){
    const userId = get(req.query, 'userId') as string;
    const cart = await getCartById(userId);

    return res.send(cart)

}

export async function deleteCartHandler(req: Request, res: Response){
    const userId = get(req.query, 'userId') as string;
    const cart = await deleteById(userId);

    return res.send(cart)

}