//importando o nosso express
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const uri = "mongodb+srv://DbUser:DbUser@cluster0.bcojswd.mongodb.net/?retryWrites=true&w=majority"

//permitir o servidor se comunicar com o navegador

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended:true}))

app.get('/', (req, res) =>{
    res.render('index.ejs')
})
app.get('/home', (req, res) =>{
    res.render('home.ejs')
})
app.post('/home', (req, res) =>{
    db.collection('banco/cond').insertOne(req.body, (err,result) =>{
        if(err) return console.log(err)
        console.log("salvou no banco")
        res.redirect('/home')
        db.collection('banco/cond').find().toArray((err, results)=>{
            console.log(results)
        })
    })
})

app.get('/', (req, res) =>{
    let cuso = db.collection('banco/cond').find()
})
//conectando banco de dados
MongoClient.connect(uri,(err , client) =>{
    if(err) return console.log(err)
    //colocando o nosso banco 
    db = client.db('banco-cond')

    app.listen(3000, () =>{
        console.log("servidor rodando safe")
    })
})
