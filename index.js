const express = require('express');
const routesApi = require('./routes')

const app = express();
const port = 3006;

app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello Fucking World !!!');
});

app.get('/new-route', (req, res) => {
  res.send('Hello from new route');
});

routesApi(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
