const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const orderSchema=new Schema({
	user:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    menuItems:[{
        type:Schema.Types.ObjectId,
        ref:'menuItems'
    }],
    address:{
        type:String,
        required:true
    },
	date:{
		type:Date,
		default:Date.now
	}
})

module.exports=Order=mongoose.model('orders', orderSchema);