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

app.get('/my-products', (req, res) => {
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
