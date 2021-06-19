const user=prompt("Enter your name : ")

const socket=io("http://localhost:3001",{
    query:{
     
        email:user

    }
})

function connectuser(a){
    console.log("connecting : ",a.innerHTML)
    socket.emit("connect-user",a.innerHTML,response=>{
        addmessage(response)
    })
  
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

socket.on('get-messages',data=>{

     console.log("got message : ",data);
     addmessage(data.from +" : "+data.message);

     
});

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