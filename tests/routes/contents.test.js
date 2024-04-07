const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../app');
const Content = require('../../models/content');
const Theme = require('../../models/theme');

describe('Contents API', () => {
    let mongoServer;
    let token;
    let testTheme;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(process.env.MONGO_URI);

        const userRes = await request(app)
            .post('/api/users/login')
            .send({
                email: 'test@example.com',
                password: 'test1234*'
            });
        token = userRes.body.token;

        testTheme = await Theme.create({
            name: "Test Theme Content",
            contentPermissions: { images: true, videos: false, texts: true },
            accessPermissions: { read: ["admin", "reader"], write: ["admin"] },
            imageUrl: "http://example.com/image.png"
        });
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    beforeEach(async () => {
    });

    afterEach(async () => {
        await Content.deleteMany({});
    });

    it('should create a new content', async () => {
        const newContent = {
            type: 'image',
            url: 'http://example.com/newcontentimage.png',
            theme: testTheme._id,
            credits: 'UsuarioPrueba'
        };
        const res = await request(app)
            .post('/api/contents')
            .set('x-auth-token', token)
            .send(newContent);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.type).toEqual(newContent.type);
    });

    it('should get all contents', async () => {
        const res = await request(app)
            .get('/api/contents')
            .set('x-auth-token', token);
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });
});
