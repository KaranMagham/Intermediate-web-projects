import mongoose, { Schema } from "mongoose";

const passwordschema=new mongoose.Schema({
    SiteURI:{type:String,required:true,default:undefined},
    Username:{type:String,required:true,default:undefined},
    Password:{type:String,required:true,default:undefined},
},{timestamps:true})

export const Passwords=mongoose.model("Weather",passwordschema);