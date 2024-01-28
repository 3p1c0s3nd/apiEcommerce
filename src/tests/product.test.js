const request = require('supertest');
const app = require('../app');

let id;
let token;

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



test("GET /products debe retornar un producto", async () => {
    const response = await request(app)
        .get('/products')
        .send();
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
});


test("POST /products debe crear un producto", async () => {
    const data = {
        title: 'test',
        description: 'test',
        brand: 'test',
        price: 'test',
        categoryId: 1
    }
    const response = await request(app)
        .post('/products')
        .set('Authorization', `Bearer ${token}`)
        .send(data);

    id = response.body.id;
    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
});


test("DELETE /products/:id debe eliminar un producto", async () => {

    const response = await request(app)
        .delete(`/products/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send();
    expect(response.status).toBe(204);

});