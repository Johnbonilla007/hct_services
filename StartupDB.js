const db = require('./infrastructure/models');
const { Op } = require("sequelize");

const { categories, cities, affiliates, products, carrusels } = require('./data');

class StartupDB {

    start() {
        db.sequelize.sync();
    }

    loadDataInitial() {
        db.sequelize.sync({ alter: false }).then(() => {
            db.Category.bulkCreate(categories);
            db.City.bulkCreate(cities);
            db.Carrusel.bulkCreate(carrusels);

            getProducts().then(productsToSave => {
                db.Product.bulkCreate(productsToSave, { include: [db.ProductCategory, db.ProductCity] });
            });

            db.Affiliate.bulkCreate(affiliates);

        }).catch(err => {
            console.log(err);
        });
    }
}


const getProducts = async () => {
    const categoryProducts = products.reduce((acc, current) => [...acc, ...current.category], []);
    const uniqueCategories = [...new Set(categoryProducts)];

    const categories = await db.Category.findAll({
        where: {
            name: {
                [Op.in]: uniqueCategories
            }
        }
    });

    const cityProducts = products.reduce((acc, current) => [...acc, ...Object.keys(current.city || [])], []);
    const uniqueCities = [...new Set(cityProducts)];

    const cities = await db.City.findAll({
        where: {
            name: {
                [Op.in]: uniqueCities
            }
        }
    })

    return products.map(product => ({
        name: product.name, available: product.available, brand: product.brand,
        condition: product.condition, description: product.description,
        features: product.features, image: product.image,
        price: product.price, quantity_available: product.quantity_available,
        rating: product.rating,
        ProductCategories: product.category ? categories.filter(s => product.category.includes(s.name))
            .map(cat => ({ categoryId: cat.id })) : [],

        ProductCities: product.city ? cities.filter(s => product.city[s.name]).map(c => ({
            cityId: c.id,
            quality: product.city[c.name]
        })) : []
    }))
}


module.exports = StartupDB;