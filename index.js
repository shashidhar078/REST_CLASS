const express=require("express");
const app=express();
const path=require("path")

const port=8080;

app.listen(port,()=>{
    console.log(`app listens on : ${port}`)
})

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")))

app.use(express.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.send("You are on main page")
})