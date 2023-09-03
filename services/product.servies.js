const { faker } = require("@faker-js/faker");

class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate(){
    const limit = 10;
    for(let index = 0; index < limit; index++){
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
      })
    }
  }

  save(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data,
    }
    this.products.push(newProduct);
    return newProduct;
  }

  update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){
      throw new Error('Product not found');
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
      throw new Error('Product not found');
    }
    this.products.splice(index, 1);
    return {id};
  }

  findAll() {
    return this.products;
  }

  findOne(id) {
    return this.products.find(item => item.id === id);
  }
}

module.exports = ProductsService;