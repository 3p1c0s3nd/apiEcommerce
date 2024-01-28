const  request  = require('supertest');
const app = require('../app');


test('POST /user debe crear un usuario', async () => {
    const response = await request(app)
        .post('/user')
        .send({
            firstName: 'test',
            lastName: 'test',
            email: 'test@test',
            password: 'test',
            phone: 'test'
        });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
});

test("GET /user debe retornar un usuario", async () => {

    const response = await request(app)
        .get('/user')
        .send();
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
});

test("PUT /user debe retornar un usuario", async () => {

    const response = await request(app)
        .put('/user/1')
        .send({
            firstName: 'test1',
            lastName: 'test1',
            phone: 'test1'
        });
    expect(response.status).toBe(200);
    //expect(response.body).toHaveProperty('firstName');
    expect(response.body.firstName).toEqual('test1');
});



test("/user/login debe retornar un token", async () => {

    const response = await request(app)
        .post('/user/login')
        .send({
            email: 'test@test',
            password: 'test'
        });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('accessToken');
});






//