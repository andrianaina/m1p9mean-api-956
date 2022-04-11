const mongoose=require('mongoose');
// mongoose.connect(
//     "mongodb://localhost:27017/ekaly",{useNewUrlParser:true,useUnifiedTopology:true},
//     (err)=>{
//         if(!err) console.log('Mongodb connected');
//         else console.log("Connection error: "+ err);
//     }
// )

mongoose.connect(
    "mongodb+srv://Ekaly:mRSa8ry9QbE1TToF@cluster0.z99ra.mongodb.net/ekaly?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true},
    (err)=>{
        if(!err) console.log('Mongodb connected');
        else console.log("Connection error: "+ err);
    }
)