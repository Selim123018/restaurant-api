const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const passport=require('passport');
const sessions = require('express-session');
const users=require('./routes/users');
const menuItems=require('./routes/menuItems');
const orders=require('./routes/orders');
const secretKey=require('./config/keys').secretOrKey


const app=express();

const port=process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(sessions({
	secret:secretKey,
	resave:false,
	saveUninitialized:true
}))
app.use(passport.initialize());

require('./middleware/passport')(passport);

//DB config
const db=require('./config/keys').mongoURI;

//MongoDB connect
mongoose
.connect(db, { useUnifiedTopology: true })
.then(()=>console.log('MongoDB connected'))
.catch((err)=> console.log(err));


//use routes
app.use('/api/users', users);
app.use('/api/menuItems', menuItems);
app.use('/api/orders', orders);


app.listen(port, ()=>{
	console.log('server is running on port: '+port);
})
