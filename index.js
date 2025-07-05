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

let posts=[
    {
        username:"apnacollege",
        content:"i love coding",
    },
    {
        username:"Hitesh",
        content:"Chai aur code",
    },
    {
        username:"FreeCodeCamp",
        content:"We Promote open source",
    }

];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/posts",(req,res)=>
{
    let {username,content} = req.body;
    posts.push({username,content});
    // res.send("Post route is working");
    res.redirect("/posts");
})