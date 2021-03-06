const Stock = require('../models/Stock')

const Store = require('../models/Store')
const Product = require('../models/Product')

////-----------------/////

module.exports = {

  /*async listAll() {
    try {
        const stock = await Stock.findAll();

        return stock;

    } catch (error) {
        console.error("\nError in StockController trying to list all stocks \n\n", error);
    }
  },*/  

  async listAll() {
    try {
        var myjoin = await Stock.findAll({raw: true, include: [{model: Store, as:'Store'}, {model: Product, as:'Product'}]});
        myjoin = JSON.parse(JSON.stringify(myjoin).split('"Product.id":').join('"product_id":'));
        myjoin = JSON.parse(JSON.stringify(myjoin).split('"Product.name":').join('"product_name":'));
        myjoin = JSON.parse(JSON.stringify(myjoin).split('"Product.price":').join('"product_price":'));
        myjoin = JSON.parse(JSON.stringify(myjoin).split('"Product.quantity":').join('"product_quantity":'));
        myjoin = JSON.parse(JSON.stringify(myjoin).split('"Store.id":').join('"store_id":'));
        myjoin = JSON.parse(JSON.stringify(myjoin).split('"Store.name":').join('"store_name":'));
        myjoin = JSON.parse(JSON.stringify(myjoin).split('"Stock.quantity":').join('"stock_qty":'));
        return myjoin;

    } catch (error) {
        console.error("\nError in StockController trying to list all Stocks \n\n", error);
    }
  },

  async store(stockData) {
    try {
        const stock = await Stock.create({ 
            store_id: stockData.store_id,
            product_id: stockData.product_id
        });

        return stock;

    } catch (error) {
        console.error("\nError in stockController trying to create a stock \n\n", error);
    }
  },

  //Return 0 on error or 1 in sucess
  async delete(stockId){
    try {
        const status = await Stock.destroy({
            where: {
              id: stockId
            }
        });

        return status;

    } catch (error) {
        console.error("\nError in StockController trying to delete a stock \n\n", error);
    }
  },

  //Return an array with 0 on error or 1 in sucess
  async update(stockId, stockData){
    try {
        const stock = await Stock.update({
            store_id: stockData.store_id,
            product_id: stockData.product_id
        },{
            where: {
                id: stockId
            }
        });

        return stock;

    } catch (error) {
        console.error("\nError in stockController trying to update a stock by ID \n\n", error);
    }
  },

}