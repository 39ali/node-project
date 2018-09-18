const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app=express();


hbs.registerPartials(__dirname+'/views/partials/');
hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear() ;
});

hbs.registerHelper("toUpper",(text)=>{ return text.toUpperCase()} );

app.set('view engine', 'hbs');




app.use((req,res,next)=>{
    const now= new Date().toString();
    var log = `Date: ${now}` + `${req.url}  ${req.method}`;
    fs.appendFile('server.log', log +'\n',(err)=>{console.log(err)});

    next();
  
});

app.use((req,res,next)=>{
    res.render('maintenance.hbs');
});


app.use(express.static(__dirname+ '/public'));
app.get('/',(req ,res)=>{

res.render('home.hbs',{
    pageTitle:'Home Page',
    welcomeMsg:'WELOCME !'
}
);

});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About Page',
       
    }
    );
});

app.get('/bad', (req,res)=>{
    res.send({error:"error loading data "});
});

app.listen(3000);