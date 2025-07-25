import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import {Passwords} from './models/schema.js'
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
    res.send('Hello World!')
})

app.get('/Passwords', async(req, res) => {
    try {
        const data= await Passwords.find();
        res.json(data)
    } catch (error) {
        res.status(500).json({error:"Server side error."})
    }
})

app.post('/Passwords', async(req, res) => {
    try {
        const { SiteURI,Username,Password}= req.body;

        if ( !SiteURI || !Username || !Password ) {
            return res.status(500).json({error:"All fileds are mandatiory."})
        }

        const newEntry= await Passwords.create({ SiteURI,Username,Password});
        res.status(201).json({message:"Data saved", data:newEntry})
    } catch (error) {
        res.status(500).json({error:"Data not exported."})
    }
})

app.delete('/Passwords/:id', async(req, res) => {
    try {
        const result=await Passwords.findByIdAndDelete(req.params.id);
        if (!result) {
            res.status(500).json({error:"Not found!"});
        }
        res.json({message:"Data succesfully deleted"})
    } catch (error) {
        res.status(500).json({error:"Server side error."})
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});
