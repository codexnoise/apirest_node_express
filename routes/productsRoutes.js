const express = require('express');

const ProductsService = require('./../services/product.servies');

const router = express.Router();
const service = new ProductsService();

router.get('/', (req, res) => {
  const products = service.findAll();
  res.json(products);
});

//the endpoints that you have a specific form must go before that the endpoints
//that the endpoints with  dinamic form
router.get('/filter', (req, res) => {
  res.send('i am a filter' );
});

router.get('/:id', async (req, res) => {
  try{
    const {id} = req.params;
    const product = await service.findOne(id);
    res.json( product );
  }
  catch(error){
    res.json(error)
  }
});

router.post('/', (request, response) => {
  const body = request.body
  const newProduct = service.save(body);
  response.status(201).json(newProduct)
})

router.patch('/:id', (request, response) => {
  const {id} = request.params;
  const body = request.body
  const product = service.update(id, body);
  response.json(product)
})

router.delete('/:id', (request, response) => {
  const {id} = request.params;
  const rta = service.delete(id);
  response.json(rta)
})

module.exports = router;
