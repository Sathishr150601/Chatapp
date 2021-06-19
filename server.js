const express = require('express');
const app = express();

var randomstring = require("randomstring");



app.use(express.json({ extended: false }));

//app.use(express.urlencoded({extended:false}));

app.set('view engine','ejs')


app.get('/',(req,res)=>
{
    //res.sendFile(__dirname+'/views/index.html');

    res.json("Chat App")

})

const pending=[]





const Port = process.env.PORT || 3000;

const io=require('socket.io')(Port,{
    cors:{
        origin:"*"
    }
})


//Connect to socket

io.on("connection",(socket)=>{

    console.log("User Connected " + socket.id,socket.handshake.query.email)

   // console.log("pending",pending)

    var email=socket.handshake.query.email;


   
    pending.forEach(element => {
        if(element.user1 ==email ||element.user2 ==email ){
            socket.join(element.roomid);
            console.log(email+" already has messages \t joined to chat "+"'"+element.roomid+"'")
              
        }

    });



socket.on("send-message",(message,user)=>{


    pending.forEach(element=>{
        if((element.user1==user || element.user2==user )&&(element.user1==socket.handshake.query.email || element.user2==socket.handshake.query.email ))
        {

            console.log("Sending msg to "+user ,"room",element.roomid,"message",message)

    socket.emit("msg-status","Sending msg to "+user ,"room",element.roomid,"message",message);

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

    var flag=1;

    if(pending.length>0){

    pending.forEach(element=>{
        if((element.user1==receiver && element.user2==socket.handshake.query.email )||(element.user1==socket.handshake.query.email && element.user2==receiver ))
        {

            check("User already Joined ")
            console.log("pending-connect 2 ",pending)
            flag=0

        }
    })      
      if(flag==1){
            
var sock_id=randomstring.generate();
            socket.join(sock_id);
pending.push({
    roomid:sock_id,
    user1:receiver,
    user2:socket.handshake.query.email
})

check("User joined to room :  "+sock_id)
console.log("pending-connect  1 ",pending)

socket.emit("user-status",pending);


        }
    


}
else{

    socket.join(socket.id+"RO");
pending.push({
    roomid:socket.id+"RO",
    user1:receiver,
    user2:socket.handshake.query.email
})

check("New User joined to room :  "+socket.id+"RO")
console.log("pending-connect 3 ",pending)

socket.emit("user-status",pending);
}
    
    
})



})

//app.listen(Port, () => console.log('Server started at '+Port));
