const express=require('express');

const MenuItem=require('../models/MenuItem');

const router=express.Router();


router.post('/newItem', (req, res)=>{
    const newItem=new MenuItem({
        name:req.body.name
    })
    newItem.save().then(item=>{
        res.json(item)
    }).catch(err=>{
        res.json(err)
    })
})

router.get('/allItem', (req, res)=>{
    MenuItem.find().then(items=>{
        res.json(items)
    }).catch(err=>{
        res.json(err)
    })
})

router.post('/update/:id', (req, res)=>{
    MenuItem.findByIdAndUpdate({_id:req.params.id}, req.body).then(item=>{
        res.json(item)
    }).catch(err=>{
        res.json(err)
    })
})

router.delete('/delete/:id', (req,res)=>{
	MenuItem.findByIdAndDelete(req.params.id).then(()=>{
        res.json({message:'Data has deleted sucessfully'})
    }).catch(err=>{
        res.json(err)
    })
});

module.exports=router;