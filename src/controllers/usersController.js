const fs = require('fs');
const path = require('path');

const controller = {
	index: (req, res) => {
		let title = 'Registro de Usuarios';
        res.render('users', {
            title: title,            
        });
	},
	search: (req, res) => {
		// Do the magic
	},
};

module.exports = controller;
