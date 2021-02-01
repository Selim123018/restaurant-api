const express=require('express');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const passport=require('passport');
const keys=require('../config/keys');

const validateRegisterInput=require('../validation/register');
const validateLoginInput=require('../validation/login');

const User=require('../models/User');

const router=express.Router();


router.post('/register' ,(req,res)=>{

	const {errors, isValid}=validateRegisterInput(req.body);

    if(!isValid){
    	return res.status(400).json(errors);
    }

	User.findOne({ email:req.body.email })
	.then((user)=>{
		if(user){
			errors.email='Email already exits';
			res.status(400).json(errors);
		}else{

			const newUser= new User({
				name    :req.body.name,
				email   :req.body.email,
				password:req.body.password
			})

			bcrypt.genSalt(10, (err,salt)=>{
				bcrypt.hash(newUser.password,salt,(err,hash)=>{
					if(err) throw err;
					newUser.password=hash;
					newUser.save()
					.then((user)=>{
						res.json(user);
					})
					.catch((err)=>{
						res.json(err);
					})
				})

			})
		}
	})
})

router.post('/login' ,(req,res)=>{

	const {errors, isValid}=validateLoginInput(req.body);

    if(!isValid){
    	return res.status(400).json(errors);
    }

	const email=req.body.email;
	const password=req.body.password;
	User.findOne({email}).then(user=>{
		if(!user){
			errors.email='User not found';
			res.status(404).json(errors);
		}

		bcrypt.compare(password, user.password)
		.then(isMatch=>{
			if(isMatch){
				const payload={id:user.id, name:user.name, email:user.email};
				jwt.sign(
					payload, 
					keys.secretOrKey, 
					{ expiresIn:3600 },
					(err,token)=>{
						res.json({
							success:true,
							token:'bearer ' +token
						})
					});
			}else{
				errors.password='Incorrect password';
				res.status(400).json(errors);
			}
		})
	});
});

router.get('/details/:id', (req, res)=>{
    User.findById(req.params.id).then(user=>{
        res.json(user)
    }).catch(err=>{
        res.json(err)
    })
})

router.get('/allUser', passport.authenticate('jwt',{session:false}), (req, res)=>{
    User.find().then(users=>{
        res.json(users)
    }).catch(err=>{
        res.json(err)
    })
})

router.post('/update/:id', passport.authenticate('jwt',{session:false}), (req, res)=>{
    User.findByIdAndUpdate({_id:req.params.id}, req.body).then(user=>{
        res.json(user)
    }).catch(err=>{
        res.json(err)
    })
})

router.delete('/delete/:id', passport.authenticate('jwt',{session:false}), (req,res)=>{
	User.findByIdAndDelete(req.params.id).then(()=>{
        res.json({message:'Data has deleted sucessfully'})
    }).catch(err=>{
        res.json(err)
    })
});

router.get('/logout', (req, res)=>{
	req.session.destroy(function(err){
		if(err){
		   console.log(err);
		}else{
			res.json({message:'Log out successfully'})
		}
	 });
   
})

module.exports=router;