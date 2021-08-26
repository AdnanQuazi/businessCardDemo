const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/noxsh",{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then( ()=>{
    console.log("connection established");
}).catch((e)=>{
    console.log(`ERROR: ${e}`)
});