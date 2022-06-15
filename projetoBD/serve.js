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
app.get('/opcoes', (req, res) =>{
    res.render('opcoes.ejs')
})
app.get('/', (req, res) =>{
    let cursor = db.collection('bancocond').find()
})
/*app.get('/home', (req, res) =>{
    let cursor = db.collection('bancocond').find()
})*/



app.post('/show', (req, res) =>{
    db.collection('bancocond').insertOne(req.body, (err,result) =>{
        if(err) return console.log(err)
        console.log("salvou no banco")
        res.redirect('/opcoes')
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

app.get('/home', (req, res) =>{
    db.collection('bancocond').find().toArray((err, results) =>{
        if(err) return console.log(err)
        res.render('home.ejs', {bancocond: results})
    })
})

//criando a nosso rota 
app.route("/edit/:id")
.get((req, res) => {
    var id = req.params.id

    db.collection('bancocond').find(ObjectId(id)).toArray((err, result) =>{
        if(err) return res.send(err)
        res.render('edit.ejs', {bancocond: result})
    })
})

.post((req, res) =>{
    var id = req.params.id
    var name = req.body.name
    var surname = req.body.surname
    var celular = req.body.celular
    var cpf = req.body.cpf
    var rg = req.body.rg
    var email = req.body.email
    var complemento = req.body.complemento
    var vencimento = req.body.vencimento
    var pago = req.body.pago
    var pendente = req.body.pendente

    db.collection('bancocond').updateOne({_id: ObjectId(id)},{
        $set: {
            name: name,
            surname: surname,
            celular: celular,
            cpf: cpf,
            rg: rg,
            email: email,
            complemento: complemento,
            vencimento: vencimento,
            pago: pago,
            pendente: pendente
        }
    }, (err, result) =>{
        if(err) return res.send(err)
        res.redirect('/show')
        console.log('banco atualizado')
    })
})

app.route("/delete/:id")
.get((req, res) => {
    var id = req.params.id

    db.collection('bancocond').deleteOne({_id: ObjectId(id)}, (err, result) =>{
        if(err) return res.send(500, err)
        console.log('Deletando do nosso banco de dados!')
        res.redirect('/show')
    })
})
