//importando o nosso express
const express = require('express')
const { ObjectId } = require('mongodb')
const app = express()
const MongoClient = require('mongodb').MongoClient
const uri = "mongodb+srv://DbUser:DbUser@cluster0.bcojswd.mongodb.net/?retryWrites=true&w=majority"

//permitir o servidor se comunicar com o navegador

app.set('view engine', 'ejs')
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))

app.get('/', (req, res) =>{
    res.render('index.ejs')
})
app.get('/home', (req, res) =>{
    res.render('home.ejs')
})
app.get('/', (req, res) =>{
    let cuso = db.collection('bancocond').find()
})



app.post('/show', (req, res) =>{
    db.collection('bancocond').insertOne(req.body, (err,result) =>{
        if(err) return console.log(err)
        console.log("salvou no banco")
        res.redirect('show.ejs')
        db.collection('bancocond').find().toArray((err, results)=>{
            console.log(results)
        })
    })
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

app.get('/show', (req, res) =>{
    db.collection('bancocond').find().toArray((err, results) =>{
        if(err) return console.log(err)
        res.render('show.ejs', {bancocond: results})
    })
})

//criando a nosso rota 
app.route("/edit/:id")
.get((req, res) => {
    var id = req.params.id

    db.collection('bancocond').find(objectId(id)).toArray((err, results) =>{
        if(err) return res.send(err)
        res.render('edit.ejs', {bancocond: results})
    })
})

.post((req, res) =>{
    var id = req.params.id
    var name = req.params.name
    var surname = req.params.surname
    var celular = req.params.celular
    var cpf = req.params.cpf
    var rg = req.params.rg
    var email = req.params.email
    var complemento = req.params.complemento

    db.collection('bancocond').updateOne({_id: ObjectId(id)},{
        $set: {
            name: name,
            surname: surname,
            celular: celular,
            cpf: cpf,
            rg: rg,
            email: email,
            complemento: complemento
        }
    }, (err, result) =>{
        if(err) return res.send(err)
        res.redirect('/show')
        console.log('banco atualizado')
    })
})