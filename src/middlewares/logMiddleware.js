const fs = require('fs');

const logMiddleware = ((req,res,next)=>{
    fs.appendFileSync('logDB.txt', 'Se a creado un producto '+ new Date().toISOString() + req.url + '\n');

    next();
})

module.exports = logMiddleware;