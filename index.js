const express = require('express');
const { faker } = require("@faker-js/faker");
//const randomName = faker.name.findName();

const app = express();
const port = 3006;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello Fucking World !!!');
});

app.get('/new-route', (req, res) => {
  res.send('Hello from new route');
});

app.get('/products', (req, res) => {
  const products = [];
  const {size} = req.query;
  const limit = size || 10;
  for(let index = 0; index < limit; index++){
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl(),
    })
  }
  res.json(products);
});

app.get('/users', (req, res) =>{
   const {limit, offset} = req.query;
   if(limit && offset){
    res.json({limit, offset})
   }
   res.send("Dont have params")
})

//the endpoints that you have a specific form must go before that the endpoints
//that the endpoints with  dinamic form
app.get('/products/filter', (req, res) => {
  res.send('i am a filter' );
});

app.get('/products/:id', (req, res) => {
  const {id} = req.params;
  res.json(
    {
      id: id,
      name: 'Product 2',
      price: 55.55,
    }
  );
});

app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const {categoryId, productId} = req.params;
  res.json(
    {
      categoryId,
      productId,
    }
  );
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
