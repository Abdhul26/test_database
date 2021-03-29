require('dotenv').config()
const express = require('express');
const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

const objectId = mongodb.ObjectID;
const app = express();

// let dbUrl = 'mongodb://127.0.0.1:27017/';
const dbUrl =  'mongodb://127.0.0.1:27017/' || process.env.DB_URL;
const port = process.env.PORT || 4000;

app.use(express.json());

 
app.get('/', async (req, res)=> {
    try {
      let clientInfo = await mongoClient.connect(dbUrl);
        const db = clientInfo.db("new_database");
        let data =await db.collection('users').find().toArray()
        res.status(200).json(data);
        clientInfo.close();
    } catch (error) {
        console.log(error);
}

});

app.post("/create-student", async (req, res)=>{
       try {
      let client = await mongoClient.connect(dbUrl);
        const db = client.db("new_database");
           await db.collection('users').insertOne(req.body);
           res.status(200).json({ message: "user created" });
           client.close();
    } catch (error) {
        console.log(error);
}
});

app.put("/update-student/:id", async (req, res)=>{
        try {
      let client = await mongoClient.connect(dbUrl);
        const db = client.db("new_database");
            await db.collection('users').findOneAndUpdate({ _id: objectId(req.params.id) }, { $set: req.body });
           res.status(200).json({ message: "user updated" });
           client.close();
    } catch (error) {
        console.log(error);
}
});

app.delete("/delete-student/:id", async (req, res)=> {
       try {
      let client = await mongoClient.connect(dbUrl);
        let db = client.db("new_database");
           await db.collection('users').deleteOne({ _id: objectId(req.params.id) });
           res.status(200).json({ message: "user delted" });
           client.close();
    } catch (error) {
        console.log(error);
}
});

app.listen(port);