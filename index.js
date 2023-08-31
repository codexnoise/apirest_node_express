const express = require('express');
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
  res.json([
    {
    name: 'Product 1',
    price: 66.66,
    },
    {
      name: 'Product 2',
      price: 55.55,
    }
  ]);
});

app.get('/users', (req, res) =>{
   const {limit, offset} = req.query;
   if(limit && offset){
    res.json({limit, offset})
   }
   res.send("Dont have params")
})

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
