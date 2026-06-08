const SequelizeAuto = require('sequelize-auto');
require('dotenv').config();

const auto = new SequelizeAuto(process.env.database, process.env.username, process.env.password, {
    host: process.env.host,
    dialect: process.env.dialect,
    directory: './models', 
    port: process.env.port,
    caseModel: 'c', // convert snake_case column names to camelCase field names: user_id -> userId
    caseFile: 'c', // file names created for each model use camelCase.js not snake_case.js
    singularize: true, // convert plural table names to singular model names
    additional: {
        timestamps: true,
    },
    tables: ['users'] 
})

auto.run(err => {
    try {
        if (err) throw err;
        console.log('Models generated successfully!');
    } catch (error) {
        console.error('Error generating models:', error);
    }
});