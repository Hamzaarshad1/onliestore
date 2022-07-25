import mongoose,{Schema} from 'mongoose'

export interface cartDocuments extends mongoose.Document{
    userId: Schema.Types.ObjectId;
    products: {
        productID: string;
        quantity: Number;
    } [];
        
}

const cartSchema = new mongoose.Schema(
   {
    userId: { type: Schema.Types.ObjectId, ref: 'user', index: true },
   // userId: { type : String, required: true },
    products:[
        {
            productId:{ type: String},
            quantity:{  type: Number,  default: true }
        }
    ]
},
{timestamps: true}
)

const Cart = mongoose.model<cartDocuments>('Cart', cartSchema);

export default Cart;