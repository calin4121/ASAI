const express = require("express");
const router = express.Router();

const SaleItem = require('../models/SaleItem')
const Sale = require('../models/Sale')
const Product = require('../models/Product')
const Brand = require('../models/Brand')
const ProductCategory = require('../models/ProductCategory')

const listAll = async () => {
  try {
      const reports = await SaleItem.findAll({
        include: [
          {
            model: Sale,
          }
        ],
        include: [
          {
            model: Product,
            include: [
              {
                model: Brand,
              }
            ],
            include: [
              {
                model: ProductCategory,
              }
            ]
          }
        ]
      }).then((reports) => {
        const resObj = reports.map((report) => {
          return Object.assign(
            {},
            {
              quantity: report.quantity,
              price: report.price,
              sale: report.Sale.map((sale) => {
                return Object.assign(
                  {},
                  {
                    purchaseDate: sale.purchase_date,
                    discountPercentage: sale.discount_percentage,
                  }
                )
              }),
              product: report.Product.map((product) => {
                return Object.assign(
                  {},
                  {
                    name: product.name,
                    price: product.price,
                    brand: product.Brand.map((brand) => {
                      return Object.assign(
                        {},
                        {
                          name: brand.name,
                        }
                      )
                    }),
                    category: product.ProductCategory.map((category) => {
                      return Object.assign(
                        {},
                        {
                          name: category.name,
                        }
                      )
                    })
                  }
                )
              })
            }
          )
        })
      }
      );
      return reports;
  } catch (error) {
      console.error("\nError fetching REPORTS MODULE tables.\n\n", error);
  }
}

router.get("/", async (request, response) => {
  // const joinedTables = await listAll();
  
  const joinedTables = [
    {
      idSalesItem: 1,
      quantity: 1,
      price: 5.0,
      sale: {
        idSale: 1,
        purchaseDate: "16-02-2019",
        discountPercentage: 20,
        client: {},
        seller: {},
      },
      product: [
        {
          idProduct: 1,
          name: "Cornflakes",
          price: 5.0,
          brand: {
            idBrand: 1,
            name: "Kellogs",
          },
          category: {
            idCategory: 1,
            name: "Food",
          },
        },
      ],
    },
    {
      idSalesItem: 2,
      quantity: 1,
      price: 6.6,
      sale: {
        idSale: 2,
        purchaseDate: "20-12-2019",
        discountPercentage: 10,
        client: {},
        seller: {},
      },
      product: [
        {
          idProduct: 22,
          name: "Shirt",
          price: 100.0,
          brand: {
            idBrand: 2,
            name: "Nike",
          },
          category: {
            idCategory: 2,
            name: "Clothing",
          },
        },
      ],
    },
    {
      idSalesItem: 3,
      quantity: 1,
      price: 16.0,
      sale: {
        idSale: 3,
        purchaseDate: "19-12-2019",
        discountPercentage: 10,
        client: {},
        seller: {},
      },
      product: [
        {
          idProduct: 23,
          name: "Jacket",
          price: 200.0,
          brand: {
            idBrand: 3,
            name: "Nike",
          },
          category: {
            idCategory: 3,
            name: "Clothing",
          },
        },
      ],
    },
    {
      idSalesItem: 4,
      quantity: 2,
      price: 200,
      sale: {
        idSale: 3,
        purchaseDate: "03-05-2020",
        discountPercentage: 10,
        client: {},
        seller: {},
      },
      product: [
        {
          idProduct: 23,
          name: "Jacket",
          price: 200.0,
          brand: {
            idBrand: 3,
            name: "Adidas",
          },
          category: {
            idCategory: 3,
            name: "Clothing",
          },
        },
        {
          idProduct: 23,
          name: "Jacket",
          price: 200.0,
          brand: {
            idBrand: 3,
            name: "Nike",
          },
          category: {
            idCategory: 3,
            name: "Clothing",
          },
        },
      ],
    },
  ];

  return response.json(joinedTables);
});

module.exports = router;
