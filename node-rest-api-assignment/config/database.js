const mongoose =require('mongoose');
const mongoDB= 'mongodb://localhost/node_rest_api_assignment';
mongoose.set('strictQuery', true);
mongoose.connect(mongoDB);
mongoose.Promise= global.Promise;

module.exports= mongoose;