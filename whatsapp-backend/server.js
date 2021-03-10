//importing
import express from 'express';
import mongoose from 'mongoose'
import Messages from './dbMessages.js'
import Pusher from 'pusher'
import cors from 'cors'

//app config
const app=express();
const port=process.env.PORT || 5000

const pusher = new Pusher({
    appId: "1169705",
    key: "e653c91a132613d82b2f",
    secret: "6385f84f12a5a596ec43",
    cluster: "eu",
    useTLS: true
  });

//middleware
app.use(express.json());
app.use(cors())

// app.use((req,res,next)=>{
//     res.setHeader("Access-Control-Allow-Origin","*");
//     res.setHeader("Access-Control-Allow-Headers","*");
//     next();
// });

//DB config
const connection_url='mongodb+srv://saxurhasan:hesen1994@practicenode.en4df.mongodb.net/whatsapp?retryWrites=true&w=majority'
mongoose.connect(connection_url,{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useCreateIndex:true 
});

const db=mongoose.connection

db.once('open',() =>{
console.log("Db connected");

const msgCollection=db.collection('messagecontents')
const changeStream=msgCollection.watch();

changeStream.on('change',(change)=>{
    console.log(change);

    if (change.operationType==='insert') {
        const messageDetails=change.fullDocument;

        pusher.trigger('messages','inserted',
        {
            name:messageDetails.name,
            message:messageDetails.message,
            timestamp:messageDetails.timestamp,
            received:messageDetails.received
        }

        );
        
    } else {
        console.log('Error triggering pusher')
    }
})

})




//api routes
app.get('/',(req,res)=>res.status(200).send('hello world'))

//get message
app.get('/messages/sync',(req,res)=>{

    Messages.find((err,data)=>{
        if (err) {
          res.status(500).send(err)  
        } else {
            res.status(201).send(data)
        }
    })
})

//post message
app.post('/messages/new',(req,res)=>{
    const dbMessage=req.body

    Messages.create(dbMessage,(err,data)=>{
        if (err) {
          res.status(500).send(err)  
        } else {
            res.status(201).send(data)
        }
    })
})


//listen
app.listen(port,()=>console.log(`Listening on localhost: ${port}`))