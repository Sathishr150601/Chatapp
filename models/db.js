// db.js
const mongoose = require('mongoose');



mongoose.Promise = global.Promise;

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const URI ="mongodb+srv://kumaresh:kikida@cluster0.4fnnx.mongodb.net/ChatApp?retryWrites=true&w=majority";

const connectDB = async () => {
  await mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }, (err) => {
   if (!err) {
      console.log('MongoDB Connection Succeeded.')
   } else {
      console.error('Error in DB connection: ' + err)
   }
});
};

module.exports = connectDB;


