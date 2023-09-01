const express = require('express');
const { faker } = require("@faker-js/faker");

const router = express.Router();

router.get('/', (req, res) => {
  const products = [];
  const {size} = req.query;
  const limit = size || 10;
  for(let index = 0; index < limit; index++){
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.url(),
    })
  }
  res.json(products);
});

//the endpoints that you have a specific form must go before that the endpoints
//that the endpoints with  dinamic form
router.get('/filter', (req, res) => {
  res.send('i am a filter' );
});

router.get('/:id', (req, res) => {
  const {id} = req.params;
  res.json(
    {
      id: id,
      name: 'Product 2',
      price: 55.55,
    }
  );
});

module.exports = router;
