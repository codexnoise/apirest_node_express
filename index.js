const express = require('express');
const cors = require('cors');
const routesApi = require('./routes')

const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler')

const app = express();
const port = 3006;

app.use(express.json());
app.use(express.static('public'));

const whitelist = ['http://localhost:8080', 'http://myapp.com'];
const options = {
  origin: (origin, callback) => {
    if(whitelist.includes(origin) || !origin){
      callback(null, true)
    }else {
      callback(new Error('no permitido'))
    }
  }
}

app.use(cors(options));
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

routesApi(app);

app.get('/', (req, res) => {
  res.send('Hello Fucking World !!!');
});

app.get('/new-route', (req, res) => {
  res.send('Hello from new route');
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
