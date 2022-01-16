const express = require('express');
const app = express();
const condb=require('./models/db')
const chatdb=require('./routes/chatfunctions')

const chats = require('./models/chat');
var randomstring = require("randomstring");

condb();

app.use(express.json({ extended: false }));

app.set('view engine','ejs')


app.get('/',(req,res)=>
{
    res.json("Chat App")

})


var pending;
async function setpending(){

    
}

 
   



const Port = process.env.PORT || 3000;

const io=require('socket.io')(Port,{
    cors:{
        origin:"*"
    }
})


//Connect to socket

io.on("connection",async  (socket)=>{

    await chats.find({})
    .then(result=>{
        pending=result
    })
    .catch(err=>{
    
       console.log(err);
    })
    
console.log(pending)


    console.log("User Connected " + socket.id,socket.handshake.query.email)
    console.log("Connections : ");
    let connections=[]
    let name=socket.handshake.query.email;
    pending.forEach(element => {
       
       if(element.user1 ==name || element.user2 ==name ){
  
            connections.push(element.user1==name?element.user2:element.user1)
            socket.emit('get-friends',element.user1==name?element.user2:element.user1)
             

       }
    });


    
   
    var email=socket.handshake.query.email;

    pending.forEach(element => {
        if(element.user1 ==email ||element.user2 ==email ){

            socket.join(element.roomid);
            let chatroomid=element.roomid;
            console.log(email+" already has messages \t joined to chat "+"'"+element.roomid+"'")

            element.chats.forEach(ce=>{

   
                socket.emit('get-messages',{
                from:ce.from,
                    to:ce.to,
                    message:ce.message
                });

            })
            
        
              
        }

    });




socket.on("send-message",(message,user)=>{


    pending.forEach(element=>{
        if((element.user1==user || element.user2==user )&&(element.user1==socket.handshake.query.email || element.user2==socket.handshake.query.email ))
        {

            console.log("Sending msg to "+user ,"room",element.roomid,"message",message)

    socket.emit("msg-status","Sending msg to "+user ,"room",element.roomid,"message",message);

    chatdb.savechat(socket.handshake.query.email,user,element.roomid,message)
    socket.to(element.roomid).emit('get-messages',{
        from:socket.handshake.query.email,
        to:user,
        message:message
    });


        }
    })


})



//console.log("pending-connect ",pending)


//connecting Users
socket.on("connect-user",(receiver,check)=>{

    console.log(socket.handshake.query.email,"wants to connect to ",receiver,
    "\nJoined to Chat room : ",socket.id+"RO")
   
    var flag=true;

    if(pending.length>0){

    pending.forEach(element=>{
        if((element.user1==receiver && element.user2==socket.handshake.query.email )||(element.user1==socket.handshake.query.email && element.user2==receiver ))
        {

            check("User already Joined ")
            console.log("pending-connect 2 ",pending)
            flag=false;
            return;

        }
    })}
      if(flag){
            
var sock_id=randomstring.generate();
            socket.join(sock_id);

            chatdb.saveuser(socket.handshake.query.email,receiver,sock_id)
pending.push({
    roomid:sock_id,
    user1:receiver,
    user2:socket.handshake.query.email
})

check("User joined to room :  "+sock_id)
console.log("pending-connect  1 ",pending)

socket.emit("user-status",pending);


        }
    
    
})



})






setpending();

//app.listen(Port, () => console.log('Server started at '+Port));
