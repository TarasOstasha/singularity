var express = require('express');
var router = express.Router();
var cors = require('cors');
//const mongoose = require('mongoose');

const User = require('../models/user');
const Product = require('../models/product');

const { MongoClient } = require('mongodb');

const url = 'http://localhost:4200' // dev mode
//const url = ''; // production mode

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});




router.get('/user', async (req, res) => {
  // MongoDB Method how to create first data 
  // const url = 'mongodb://localhost:27017';
  // const dbName = 'singularity';
  // (async function mongo() {
  //   try {
  //     let client;
  //     client = await MongoClient.connect(url);
  //     console.log('connected to the server');
  //     const db = client.db(dbName);
  //     const response = await db.collection('users').insertMany(users);
  //     console.log(response)
  //     const tesUser = db.collection('users').findOne({ userName })
  //     res.json(tesUser);
  //     client.close();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }())

  // Mongoose method how to create first data
  const newUser = await User.findOne({ userName: 'john' });
  res.json({ ok: true })
  console.log(newUser);

  //create new
  //const kitty = new Cat({ name: 'Zildjian' });
  //kitty.save().then(() => console.log('meow')); 


});


router.get('/test', (req, res, next) => {
  res.json({ ok: true });
});

// register
router.post('/register', cors(), async (req, res) => {
  try {
    const userEmail = req.body.email;
    const user = await User.findOne({ email: userEmail }); // request to data base
    if (user) return res.json({ ok: false, message: 'this user already exist' });

    // create new user
    const new_user = new User({
      userName: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    new_user.save();
    res.json({ ok: true, message: 'new account has been created' });

    req.login(req.body, () => {
      res.json({ ok: true })
    })
  } catch (error) {
    console.log(error)
    res.sendStatus(500);
  }

})

// login
router.post('/login', cors(), async (req, res) => {
  const userEmail = req.body.email;
  const user = await User.findOne({ email: userEmail });
  console.log(user);
  if (!user) return res.json({ ok: false, message: 'his user not exist' });

  req.login(req.body, () => {
    res.json({ ok: true, user })
  })

});
// log out
router.get('/log-out', cors(), async (req, res) => {
  req.logout();
  res.json({ ok: true })
})

// add products
router.post('/products', cors(), async (req, res) => {
  try {
    //console.log(req.body)
    const product = new Product(req.body);
    console.log(product)
    await product.save()
    res.json({ ok: true, product: product });
  } catch (error) {
    res.json({ ok: false, message: error });
    res.sendStatus(500);
  }
})



 // get product
router.get('/product/:id', cors(), async (req, res) => {
  try {
    const _id = req.params.id;
    console.log(_id);
    const product = await Product.findOne({ _id });
    res.json({ ok: true, product: product })
  } catch (err) {
    console.log(err);
  };
});

module.exports = router;
