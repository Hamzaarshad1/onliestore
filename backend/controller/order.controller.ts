import { Request, Response } from "express";
import { get } from "lodash";
import { createOrder,getOrderById } from "../service/order.service";
import { deleteById } from "../service/cart.service";

export async function oderHandler(req: Request, res: Response) {
    const userId = get(req, 'userId');
    const body = req.body;
    //console.log(body)
    const post = await createOrder({ ...body, user: userId });
    deleteById(userId);
    return res.send(post);
  }

export async function getOrderHandler(req: Request, res: Response){
    const userId = get(req.query, 'userId') as string;
    const order = await getOrderById(userId);

    return res.send(order)

}