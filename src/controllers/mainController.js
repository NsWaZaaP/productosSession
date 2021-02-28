const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {

		// let products = fs.readFileSync(path.resolve(__dirname, '../products.json'), 'utf-8');
        // products = JSON.parse(products);

		let title = 'Licores a domicilios 24hs | Entrega en minutos';
        res.render('index', {
            title: title,
            products: products
        });
	},
	search: (req, res) => {
		// Do the magic
	},
};

module.exports = controller;
