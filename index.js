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

//arr is used to replicate it as database
let posts=[
    {
        id:"1a",
        username:"apnacollege",
        content:"i love coding",
    },
    {
        id:"2b",
        username:"Hitesh",
        content:"Chai aur code",
    },
    {
        id:"3c",
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

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>{return id === p.id})
    console.log(post)
    if(post)
    {
        res.render("show.ejs",{post});
    }
    else
    {
        res.render("error.ejs")
    }
    
})