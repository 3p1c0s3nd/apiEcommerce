const  request  = require('supertest');
const app = require('../app');

let token;
let id;
beforeAll(async () => {

    const category = {
        email: 'test',
        password: 'test'
    }
    const response = await request(app)
        .post('/users/login')
        .send(category);

    token = response.body.token;
})


//TESTING AL ENDPOINT CATEGORIA
test("GET /categories debe retornar una categoria", async () => {
    const response = await request(app)
        .get('/categories')
        .send();
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);

});


test("POST /categories debe crear una categoria", async () => {
    const category = {
        name: 'test'
    }
    const response = await request(app)
        .post('/categories')
        .set('Authorization', `Bearer ${token}`)
        .send(category);
    id = response.body.id;
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(category.name);
    expect(response.body.id).toBeDefined();
});


test("DELETE /categories/:id debe borrar una categoria", async () => {

    const response = await request(app)
        .delete(`/categories/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send();
    expect(response.status).toBe(204);
});