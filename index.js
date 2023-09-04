const express = require('express');
const routesApi = require('./routes')

const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler')

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

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
