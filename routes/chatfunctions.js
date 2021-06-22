// index.js
const chats = require('../models/chat');
const express=require('express')
const mongoose=require('mongoose')


function findroomid(user1,user2){

   


}

 async function saveuser(user1,user2,rid){

   let newchat = new chats({user1:user1,user2:user2,roomid:rid});
 
   await newchat.save()
   .then(result=>{

console.log("\nUser Saved : ",result);

   })
   .catch(err=>{

      console.log(err);
   })


}


async function savechat(user1,user2,rid,chatmsg){

   console.log("riim : ",  rid)
 
   await chats.updateOne({roomid:rid},{$push:{chats:{

      from:user1,
      to:user2,
      message:chatmsg,
     date:new Date()
   }}
}
   )
   .then(result=>{

console.log(result);

   })
   .catch(err=>{

      console.log(err);
   })


}



async function getuserinfo(){

 
   await chats.find({})
   .then(result=>{

console.log(result);
return result;

   })
   .catch(err=>{

      console.log(err);
   })


}
module.exports={saveuser,savechat,getuserinfo};