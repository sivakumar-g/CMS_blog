const express = require('express')
const app = express()
const PORT = 5000
const mongoose = require('mongoose')
const {MONGOURI} = require('./keys')
const auth = require('./routes/auth')
const User = require('./models/user')
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

  

// CORS Middleware
app.use(cors());
app.use(cors({ origin: 'http://localhost:3000' }));



require('./models/user')
require('./models/post')


app.use(express.json())
 app.use(require('./routes/auth'))
 app.use(require('./routes/posts'))
 // app.use('/auth',auth)



 mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})


mongoose.connection.on('connected',()=>{
    console.log('mongoDB connected')
})


mongoose.connection.on('error',()=>{
    console.log('ERROR_CUSTOM')
})

/*
app.get('/',(req,res)=>{
res.send("hello world")
})



*/
 



app.listen(PORT,()=>{
    console.log("connected at ${PORT}",PORT)
})

