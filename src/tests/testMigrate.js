const sequelize = require('../utils/connection');
const request = require('supertest');
const app = require('../app');

const main = async() => {
    try{
        // Acciones a ejecutar antes de los tests
        sequelize.sync();
        const newuser = {
            firstName : 'test',
            lastName : 'test',
            email : 'test',
            phone: 'test',
            password : 'test'
        }
        await request(app).post('/users').send(newuser);
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();