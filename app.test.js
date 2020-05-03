const request = require('supertest');
const app = require('./app');

describe('Test the posts service', () => {
    test('GET /posts succeeds', () => {
        return request(app).get('/posts').expect(200);
    });

    test('GET /posts returns JSON', () => {
        return request(app).get('/posts').expect('Content-type', /json/);
    });

    test('POST /posts/new succeeds', () => {
        const params = {
            post_title: 'Test Post',
            user_img: 'https://user-images.githubusercontent.com/10763102/27139021-48d2738a-50f8-11e7-86ad-ef2cfeb8c6d3.png',
            username: 'robot',
            timestamp: 'now',
            post_img: 'https://knowpathology.com.au/app/uploads/2018/07/Happy-Test-Screen-01.png',
            post_text: 'running automated test...'
        };

        return request(app).post('/posts/new').send(params).expect(200);
    });

    test('POST /posts/new adds data, accessed by GET', async () => {
        const params = {
            post_title: 'Test Post: test123456789',
            user_img: 'https://user-images.githubusercontent.com/10763102/27139021-48d2738a-50f8-11e7-86ad-ef2cfeb8c6d3.png',
            username: 'robot',
            timestamp: 'now',
            post_img: 'https://knowpathology.com.au/app/uploads/2018/07/Happy-Test-Screen-01.png',
            post_text: 'running automated test...'
        };

        await request(app).post('/posts/new').send(params);

        return request(app).get('/posts').expect(/test123456789/);
    });

    test('POST /posts/comments/new succeeds', () => {
        const params = {
            postID: '1',
            authorImg: 'https://user-images.githubusercontent.com/10763102/27139021-48d2738a-50f8-11e7-86ad-ef2cfeb8c6d3.png',
            authorName: 'robot',
            text: 'running automated test... creating comment'
        };

        return request(app).post('/posts/comments/new').send(params).expect(200);
    });

    test('POST /posts/comments/new adds data, accessed by GET', async () => {
        const params = {
            postID: '1',
            authorImg: 'https://user-images.githubusercontent.com/10763102/27139021-48d2738a-50f8-11e7-86ad-ef2cfeb8c6d3.png',
            authorName: 'robot',
            text: 'running automated test... creating comment test987654321'
        };

        await request(app).post('/posts/comments/new').send(params);

        return request(app).get('/posts').expect(/test987654321/);
    });
});

describe('Test the user service', () => {
    test('GET /user succeeds', () => {
        return request(app).get('/user?uname=Bill').expect(200);
    });

    test('GET /user includes Bill', () => {
        return request(app).get('/user?uname=Bill').expect(/true/);
    });

    test('GET /user/login succeeds', () => {
        return request(app).get('/user/login').expect(200);
    });

    test('GET /user/login returns JSON', () => {
        return request(app).get('/user/login?uname=Bill&pass=Bill123').expect('Content-type', /json/);
    });

    test('POST /user/new succeeds', () => {
        const params = {
            username: 'robot24681357',
            password: 'robot123',
            img: 'https://user-images.githubusercontent.com/10763102/27139021-48d2738a-50f8-11e7-86ad-ef2cfeb8c6d3.png'
          };

        return request(app).post('/user/new').send(params).expect(200);
    });

    test('POST /user/new adds data, accessed by GET', async () => {
        const params = {
            username: 'robot24681357',
            password: 'robot123',
            img: 'https://user-images.githubusercontent.com/10763102/27139021-48d2738a-50f8-11e7-86ad-ef2cfeb8c6d3.png'
        };

        await request(app).post('/user/new').send(params);

        return request(app).get('/user?uname=robot24681357').expect('Content-type', /json/);
    });
});
