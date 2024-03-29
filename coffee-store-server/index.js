const express = require('express') 
const cors = require('cors');
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

//*middleware

app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.q9bdeff.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const coffeeCollection = client.db('Coffee-Store').collection('Coffee')
    const userCollection = client.db('Coffee-Store').collection('users')
    await client.connect();
    
    //* Coffee Api
    app.post('/coffee',async(req,res)=>{
      const coffee = req.body
      const result = await coffeeCollection.insertOne(coffee)
      res.send(result)
    })

    app.get('/coffee',async(req,res)=>{
      const result = await coffeeCollection.find().toArray()
      res.send(result)
    })
    
    app.delete('/coffee/:id',async(req,res)=>{
      const id = req.params.id
  
      const toDelete = {_id: new ObjectId(id)}
      const result = await coffeeCollection.deleteOne(toDelete)
      res.send(result)
    })

    //*Update

    app.put('/coffee/:id',async(req,res)=>{
      const id = req.params.id
      const toBe = {_id : new ObjectId(id)}
      const coffee = req.body
      
      const toBeUpdated = {$set : coffee}
      const option = {upsert:true}
      const result = await coffeeCollection.updateOne(toBe,toBeUpdated,option)
      res.send(result)
     
    })

    app.get('/coffee/:id',async(req,res)=>{
      const id = req.params.id
      
      const toFind = {_id: new ObjectId(id)}
      const result = await coffeeCollection.findOne(toFind)
      res.send(result)
    })


    //* User Related Api

    app.post('/users',async(req,res)=>{
      const user = req.body
      
      const result = await userCollection.insertOne(user)
      res.send(result)
    })

    app.get('/users',async(req,res)=>{
      const result = await userCollection.find().toArray()
      res.send(result)
    })

    app.delete('/users/:id',async(req,res)=>{
      const id = {_id : new ObjectId(req.params.id)}
      const result = await userCollection.deleteOne(id)
      res.send(result)
    })

    app.put('/user/:id',async(req,res)=>{
     
      const id = {_id:new ObjectId(req.params.id)}
      const user = {$set : req.body}
      const option = {upsert:true}
      const result = await userCollection.updateOne(id,user,option)
      res.send(result)
    })

    app.patch("/user", async (req, res) => {
      const user = req.body
      const filter = {email: user.email}
       const option = { upsert: true };

      const update = {
        $set: {lastSignInTime : user.lastSignInTime}
      };
      const result = await userCollection.updateOne(filter,update,option)
      
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);












app.get('/',(req,res)=>{
    res.send(`coffee making server is running on ${port}`)
})

app.listen(port,()=>{
    console.log(`coffee server is running on port ${port}`)
})