const express=require("express");
const app=express();
const path=require("path")
const{v4 : uuid4} = require("uuid");

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
        id:uuid4(),
        username:"apnacollege",
        content:"i love coding",
    },
    {
        id:uuid4(),
        username:"Hitesh",
        content:"Chai aur code",
    },
    {
       id:uuid4(),
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
    let id=uuid4();
    posts.push({id,username,content});
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

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let {newContent}=req.body.content;
    console.log(newContent);
    let post=posts.find((p)=>{return id === p.id});
    post.content=newContent;
    console.log(post);
})

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>{return id === p.id});
    res.render("edit.ejs",{post})
})