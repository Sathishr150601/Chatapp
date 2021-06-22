// user.model.js
const mongoose = require('mongoose');

const chat = new mongoose.Schema({
    user1: {
        type: String,
        required: true
       
    },
    user2: {
        type: String,
        required: true
    },
    chats: {
        type: Array,
      
        
    },
    roomid: {
        type: String,
        required: true,
    
    },
});

// Export the model
module.exports = mongoose.model('Chats', chat);