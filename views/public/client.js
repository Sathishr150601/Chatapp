const user=prompt("Enter your name : ")

const URL="https://chatapp134.herokuapp.com";
//const URL="http://localhost:3000";



const socket=io(URL,{
    query:{
     
        email:user

    }
})


socket.on('get-messages',data=>{

    console.log("got message : ",data);
    addmessage(data.from +" : "+data.message);

    
});

function connectuser(a){

    let us_name=document.getElementById("con_user").value;
    console.log("connecting : ",us_name)
    socket.emit("connect-user",us_name,response=>{
        addmessage(response)

        
    })

    showuserstatus();
  
}

function showmessage(a){

    console.log(a.innerHTML)
    document.getElementById("croom").value=a.innerHTML;

}

function sendtoserver(){
console.log(document.getElementById("croom").value)
    socket.emit("send-message",document.getElementById("cmsg").value,document.getElementById("croom").value)
    document.getElementById("cmsg").value="";
}
// var a =prompt("Enter your name")




socket.on('user-status',udata=>{

    console.log(udata);
    //addmessage(data.from +" : "+data.message);

    
});

socket.on('msg-status',data=>{

    console.log(data);
    //addmessage(data.from +" : "+data.message);

    
});


function showuserstatus(){

}

// socket.emit("connect-user",{email:a});

// //const a=prompt("hii")

// socket.on('messageall',data=>{
//     console.log("all",data);
//     addmessage(data.email);

// });


function addmessage(message){

    var clist=document.getElementById("clist");

    var h2=document.createElement("h2");
    h2.appendChild(document.createTextNode(message));
    clist.appendChild(h2);
}