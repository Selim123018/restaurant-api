const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const menuItemSchema=new Schema({
	name:{
		type:String,
		require:true
	},
	date:{
		type:Date,
		default:Date.now
	}
})

module.exports=MenuItem=mongoose.model('menuItems', menuItemSchema);