import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbmessages.js';
import Pusher from 'pusher';
import cors from 'cors';
const app=express();
const port=process.env.PORT||9000
const pusher = new Pusher({
    appId: "1164660",
    key: "4b7549ce8f4c5434c509",
    secret: "82a33b837392c7af5151",
    cluster: "ap2",
    useTLS: true
  });

//middleware//
app.use(express.json());
app.use(cors());

//connecting database//
const connection_url='mongodb+srv://admin:h1i2m3@c456789@cluster0.wyjkg.mongodb.net/whatsappdb?retryWrites=true&w=majority'
mongoose.connect(connection_url,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true});

const db=mongoose.connection
db.once('open',()=>{
    console.log("db connected");
    const msgcollection=db.collection('messagecontents')
    const changeStream=msgcollection.watch();
    changeStream.on('change',(change)=>{
        console.log(change);
        if(change.operationType==='insert'){
            const messageDetails=change.fullDocument;
            pusher.trigger('messages','inserted',{
                name:messageDetails.user,
                message:messageDetails.message,
                timestamp:messageDetails.timestamp
            })
        }
        else{
            console.log('error triggering pusher');
        }
    })
})



app.get('/',(req,res)=>res.status(200).send('hello world'));

app.get('/messages/sync',(req,res)=>{
    Messages.find((err,data)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).send(data);
        }
    })
});
app.post('/messages/new',(req,res)=>{
    const dbMessage=req.body;
    
    Messages.create(dbMessage,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(`new message created:\n ${data}`)
        }
    })

})


app.listen(port,()=>console.log(`listening port :${port}`));