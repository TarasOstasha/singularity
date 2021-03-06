var express = require('express');
var router = express.Router();
var cors = require('cors');
//const mongoose = require('mongoose');

const User = require('../models/user');
const Product = require('../models/product');
const Favorite = require('../models/favorites');

const { MongoClient } = require('mongodb');

const url = 'http://localhost:4200' // dev mode
//const url = ''; // production mode
const keys = {
  "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
  "x-rapidapi-key": "61c9c07416msh341cab0c2cb927ep115e4ejsn2ea5df19a531"
};

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

// get all products
router.get('/products', cors(), async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.json({ ok: true, allProducts })
  } catch (error) {
    console.log(error)
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
    console.log(error)
    res.sendStatus(500);
  };
});

// search
router.get('/search', cors(), async (req, res) => {
  try {
    let searchData;
    const query = req.query.q;
    if (query == '') searchData = await Product.find()
    else searchData = await Product.find({ productName: query })
    res.json({ ok: true, data: searchData })
  } catch (error) {
    console.log(error)
    res.sendStatus(500);
  }

})

// post favorite products
router.post('/favorite-products', cors(), async (req, res) => {
  try {
    console.log(req.user, req.body, 'req user');
    if (!req.user) return res.json({ ok: false, msg: 'Please log in' });
    const productId = req.body._id;
    const userId = req.user._id;
    if (await Favorite.findOne({
      productId,
      userId
    })) return res.json({ ok: false, mag: 'This item already exist in your list' });

    const favoriteProducts = await Favorite.create({
      productId,
      userId
    })
    favoriteProducts.save();

  } catch (error) {
    console.log(error)
    res.sendStatus(500);
  }
})




/////////////////////// flight
var unirest = require("unirest");


router.get('/flights', cors(), (req, res) => {
  var request = unirest("GET", "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/");
  var fromCityName = req.body.fromCityName;
  var toCityName = req.body.toCityName;
  request.query({
    "query": fromCityName
  });

  request.headers({
    "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
    "x-rapidapi-key": "61c9c07416msh341cab0c2cb927ep115e4ejsn2ea5df19a531"
  });


  request.end(function (response) {
    if (response.error) throw new Error(res.error);

    console.log(response.body);
  });
})


router.get('/localization', cors(), (req, res) => {
  try {
    var request = unirest("GET", "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/reference/v1.0/countries/en-US");

    request.headers({
      "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
      "x-rapidapi-key": "61c9c07416msh341cab0c2cb927ep115e4ejsn2ea5df19a531"
    });


    request.end(function (response) {
      if (response.error) throw new Error(response.error);

      console.log(response.body);
      res.json({ ok: true, localization: response.body })
    });
  } catch (error) {
    res.json({ ok: false, error });
  }

})

router.get('/currencies', cors(), (req, res) => {
  try {
    var request = unirest("GET", "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/reference/v1.0/currencies");

    request.headers({
      "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
      "x-rapidapi-key": "61c9c07416msh341cab0c2cb927ep115e4ejsn2ea5df19a531"
    });


    request.end(function (response) {
      if (response.error) throw new Error(response.error);

      console.log(response.body);
    });
  } catch (error) {
    res.json({ ok: false, error });
  }

})
// Departure
router.get('/reqData', cors(), (req, res) => {
  try {
    const data = req.query;
    console.log(data, '!!!!!!!!!!!!!!!!!!!!')
    var request = unirest("GET", `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/US/USD/en-US/${data.placeIdTo}/${data.placeIdReturn}/${data.departDate}`);
    var request2 = unirest("GET", "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/US/USD/en-US/SFO-sky/LAX-sky/" + data.returnDate);

    request.query({
      "inboundpartialdate": "2020-09-01" // date
    });


    request.headers(keys);
    request2.headers(keys);

    let reqCounter = 0;
    const finish = { ok: true, data: {} }
    request.end(function (response) {
      reqCounter++;
      //console.log(response.error)
      if (response.error) throw new Error(response.error);
      finish.data.departingFlight = response.body
      if (reqCounter == 2) res.json(finish);
      //console.log(response.body);
    });

    request2.end(function (response) {
      reqCounter++;
      if (response.error) throw new Error(response.error);
      finish.data.returningFlight = response.body
      if (reqCounter == 2) res.json(finish);
    });


  } catch (error) {
    res.json({ ok: false, error });
  }
})



router.get('/listPlaces', cors(), (req, res) => {
  try {
    const data = req.query;
    var request = unirest("GET", "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/");
    

    request.query({
      "query": data.country
    });


    request.headers(keys);

    request.end(function (response) {
      if (res.error) throw new Error(response.error);
      res.json({ ok: true, data: response.body })
      console.log(response.body);
    });
  } catch (error) {
    response.json({ ok: false, error });
  }
})





module.exports = router;



