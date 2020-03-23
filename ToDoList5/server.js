const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://moses:express@modifiedexpress-nv1ea.mongodb.net/test?retryWrites=true&w=majority";
const dbName = "demo";

app.listen(2002, () => {
    MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  //console.log(db)
  db.collection('messages').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {messages: result})
  })
})

app.post('/messages', (req, res) => {
  db.collection('messages').save({msg: req.body.msg,}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')

  })
})

app.put('/messages', (req, res) => {
  db.collection('messages')
  .findOneAndUpdate({msg: req.body.msg}, {

    $set: {
      strike:req.body.strike = "crossOut"
    }
    // db.collection('messages').find(req.body.thumbUp=true).toArray((err, result) => {
    //   if (err) return console.log(err)
    //   console.log(result)
    //   res.render('index.ejs', {messages: result})

  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    console.log(result)
    res.send(result)
  })
  // db.collection('messages').find(req.body.thumbUp=true).toArray((err, result) => {
  //   if (err) return console.log(err)
  //   console.log(result)
  //   res.render('index.ejs', {messages: result})

})
//name: req.body.name
app.delete('/messages', (req, res) => {
  db.collection('messages').findOneAndDelete({msg: req.body.msg}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})

app.delete('/clearall', (req, res) => {
  db.collection('messages').remove({})  //.deleteMany({})

  // db.collection('messages').find().toArray((err, result) => {
  //   if (err) return res.send(500, err)
  //   res.send('Message deleted!')
  // })
})
