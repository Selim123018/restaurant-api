const express=require('express');
const passport=require('passport');

const Order=require('../models/Order');

const router=express.Router();


router.post('/newOrder', passport.authenticate('jwt',{session:false}), (req, res)=>{
    const newOrder=new Order({
        user:req.user.id,
        menuItems:req.body.menuItems,
        address:req.body.address
    })
    newOrder.save().then(order=>{
        res.json(order)
    }).catch(err=>{
        res.json(err)
    })
})

router.get('/allOrder', passport.authenticate('jwt',{session:false}), (req, res)=>{
    Order.find().populate('menuItems').populate('user').then(orders=>{
        res.json(orders)
    }).catch(err=>{
        res.json(err)
    })
})

router.post('/update/:id', passport.authenticate('jwt',{session:false}), (req, res)=>{
    Order.findByIdAndUpdate({_id:req.params.id}, req.body).then(order=>{
        res.json(order)
    }).catch(err=>{
        res.json(err)
    })
})

router.delete('/delete/:id', passport.authenticate('jwt',{session:false}), (req,res)=>{
	Order.findByIdAndDelete(req.params.id).then(()=>{
        res.json({message:'Data has deleted sucessfully'})
    }).catch(err=>{
        res.json(err)
    })
});

module.exports=router;