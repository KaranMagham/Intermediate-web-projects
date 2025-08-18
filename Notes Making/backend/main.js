import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import {Notes} from './models/schema.js'
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

app.get('/Notes', async(req, res) => {
    try {
        const data= await Notes.find();
        res.json(data)
    } catch (error) {
        res.status(500).json({error:"Server side error."})
    }
})

app.post('/Notes', async(req, res) => {
    try {
        const { title,content,priority,time}= req.body;
        
        if ( !title || !content || !priority ) {
            return res.status(400).json({error:"All fileds are mandatory."})
        }
        
        const newEntry= await Notes.create({ title,content,priority});
        res.status(201).json({message:"Data saved", data:newEntry})
    } catch (error) {
        res.status(500).json({error:"Data not exported."})
    }
})

app.put('/Notes/:id', async (req, res) => {
    try {
        const updated = await Notes.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) {
            return res.status(404).json({ error: "Notes not found." });
        }
        res.json({ message: "Notes updated successfully.", data: updated });
    } catch (error) {
        res.status(500).json({ error: "Failed to update notes." });
    }
});


app.delete('/Notes/:id', async(req, res) => {
    try {
        const result=await Notes.findByIdAndDelete(req.params.id);
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
