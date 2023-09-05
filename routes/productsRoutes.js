const express = require('express');

const ProductsService = require('./../services/product.servies');
const {validationHandler} = require('./../middlewares/validation.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('./../schemas/product.schema');

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  const products = await service.findAll();
  res.json(products);
});

//the endpoints that you have a specific form must go before that the endpoints
//that the endpoints with  dinamic form
router.get('/filter', (req, res) => {
  res.send('i am a filter' );
});

router.get('/:id',
  validationHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try{
      const {id} = req.params;
      const product = await service.findOne(id);
      res.json( product );
    }
    catch(error){
      next(error)
    }
  }
);

router.post('/',
  validationHandler(createProductSchema, 'body'),
  (request, response) => {
    const body = request.body
    const newProduct = service.save(body);
    response.status(201).json(newProduct)
  }
)

router.patch('/:id',
  validationHandler(getProductSchema, 'params'),
  validationHandler(updateProductSchema, 'body'),
  (request, response, next) => {
    try{
      const {id} = request.params;
      const body = request.body
      const product = service.update(id, body);
      response.json(product)
    }catch(error){
      next(error)
    }
  }
)

router.delete('/:id', (request, response) => {
  const {id} = request.params;
  const rta = service.delete(id);
  response.json(rta)
})

module.exports = router;
