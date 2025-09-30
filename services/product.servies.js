const { faker } = require("@faker-js/faker");
const boom = require('@hapi/boom');
class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate(){
    const limit = 10;
    for(let index = 0; index < limit; index++){
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean(),
      })
    }
  }

  save(data) {
    const newProduct = {
      id: faker.string.uuid(),
      ...data,
    }
    this.products.push(newProduct);
    return newProduct;
  }

  update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('Product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
      };
  }

  delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('Product not found');
    }
    this.products.splice(index, 1);
    return {id};
  }

  findAll() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 2000);
    });
  }

  async findOne(id) {
    const product = this.products.find(item => item.id === id);
    if(!product){
      throw boom.notFound('Product not found');
    }
    if(product.isBlock){
      throw boom.conflict('Product is block');
    }
    return product;
  }
}

module.exports = ProductsService;
