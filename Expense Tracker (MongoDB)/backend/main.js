import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import {Transaction} from './models/schema.js'
import cors from 'cors'

dotenv.config();
const app = express()
const port = process.env.PORT
const mongo_uri = process.env.MONGO_URI
console.log(port, mongo_uri)
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URI);


app.get('/', (req, res) => {
    res.send('Helloooo World!')
})

app.get('/Transaction', async(req, res) => {
    try {
        const data= await Transaction.find();
        res.json(data)
    } catch (error) {
        res.status(500).json({error:"Server side error."})
    }
})

app.post('/Transaction', async(req, res) => {
    try {
        const { amount,description,date,type,radio,time}= req.body;
        
        if ( !amount || !description || !radio || !type ||!date ) {
            return res.status(400).json({error:"All fileds are mandatory."})
        }
        
        const newEntry= await Transaction.create({ amount,description,date,type,radio,time: time || new Date()});
        res.status(201).json({message:"Data saved", data:newEntry})
    } catch (error) {
        res.status(500).json({error:"Data not exported."})
    }
})

app.get("/api/transactions", async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
});


app.put('/Transaction/:id', async (req, res) => {
    try {
        const updated = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) {
            return res.status(404).json({ error: "Transaction not found." });
        }
        res.json({ message: "Transaction updated successfully.", data: updated });
    } catch (error) {
        res.status(500).json({ error: "Failed to update transaction." });
    }
});


app.delete('/Transaction/:id', async(req, res) => {
    try {
        const result=await Transaction.findByIdAndDelete(req.params.id);
        if (!result) {
            res.status(500).json({error:"Not found!"});
        }
        res.json({message:"Data succesfully deleted"})
    } catch (error) {
        res.status(500).json({error:"Server side error."})
    }
})
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
