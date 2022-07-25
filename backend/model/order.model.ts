import mongoose,{Schema} from 'mongoose'

export interface orderDocuments extends mongoose.Document{
    userId: string;
    products: [{
        productID: string;
        quantity: Number;
    }];
    amount: Number;
    address: string;
    status: string;   
}

const orderSchema = new mongoose.Schema(
   {
    userId: { type: Schema.Types.ObjectId, ref: 'user', index: true },
    products:[
        {
            productId:{ type: String},
            quantity:{  type: Number,  default: true }
        }
    ],
    amount:{type:Number, required:true},
    address: { type:String, required: true},
    status: {type: String, default: "success"}
},
{timestamps: true}
)

const Order = mongoose.model<orderDocuments>('Order', orderSchema);

export default Order;