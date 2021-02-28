const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {		
        res.render('products',{
            products: products
        });	
	},

	// Detail - Detail from one product
	detail: (req, res) => {

		// toma el dato del /id de la URL y lo transforma a entero
		let id = parseInt(req.params.id);

		//verificamos que el id ingresado coincida con el que este en base de datos
		//para tomar ese dato
		let product = products.find(product => product.id === id);

		let title = product.name;
        res.render('detail', {
            title: title,
            product: product
        });
	},

	// Create - Form to create
	create: (req, res) => {
			res.render('product-create-form');	
	},
	
	// Create -  Method to store
	

	store: (req, res) => {

		let errors = validationResult(req);
		if(errors.errors.length > 0){
			res.render('product-create-form',{
				errors:errors.mapped(),
				old : req.body
			});
		
		}else{
			if(req.file){
				let readProductsDataBase = fs.readFileSync(productsFilePath);
				let productData = {
					id : products.length + 1,
					name : req.body.name,
					price : req.body.price,
					discount : req.body.discount,			
					category : req.body.category,
					description : req.body.description,
					image : req.file.filename
				}	
		
				let productsDatas = [];
		
				if(readProductsDataBase == ""){
					productsDatas = [];			
				}else{
					productsDatas = JSON.parse(readProductsDataBase);
				}
		
				productsDatas.push(productData);
		
				productsDatasJSON = JSON.stringify(productsDatas);
		
				fs.writeFileSync(productsFilePath, productsDatasJSON);
		
				res.redirect('/');
			}else{
				res.render('product-create-form');
			}
		}
	
	
		
	},

	// Update - Form to edit
	edit: (req, res) => {
		let title = 'Editar Producto';
		let id = parseInt(req.params.id);

		let product = products.find(product => product.id === id);

		if (product !== undefined) {
            res.render('product-edit-form', {
                title: title,
                product: product
            });
        } else {
            res.send('Error');
        }		
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
		if(req.file){
			let id = parseInt(req.params.id);        

        let product = products.find( product => product.id === id );
        product.id = id;
        product.name = req.body.name;
        product.description = req.body.description;
        product.image = req.file.filename
        product.discount = req.body.discount;
        product.price = parseInt(req.body.price);
		product.category = req.body.category;


        let filteredProducts = products.filter( product => product.id !== id );
        filteredProducts.push(product);
        let totalProducts = JSON.stringify(filteredProducts);
        fs.writeFileSync(path.resolve(productsFilePath), totalProducts);

        res.redirect('/products');
		}else{
			res.render('product-edit-form');
		}
		
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let id = parseInt(req.params.id);					
	
			const index = products.map( product => product.id ).indexOf(id);
				console.log(index);
			if ( index > -1 ) {
				products.splice(index, 1);
			}
	
			let productsJSON = JSON.stringify(products);
			fs.writeFileSync(productsFilePath, productsJSON);
	
			res.redirect('/products');
		
	}
};

module.exports = controller;