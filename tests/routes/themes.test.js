const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../app');
const Theme = require('../../models/theme');

describe('Themes API', () => {
    let mongoServer;
    let token;

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
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    beforeEach(async () => {
        await Theme.create({
            name: "Test Theme",
            contentPermissions: { images: true, videos: false, texts: true },
            accessPermissions: { read: ["admin", "reader"], write: ["admin"] },
            imageUrl: "http://example.com/image.png"
        });
    });

    afterEach(async () => {
        await Theme.deleteMany({});
    });

    it('should get all themes', async () => {
        const res = await request(app)
            .get('/api/themes')
            .set('x-auth-token', token);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveLength(1);
        expect(res.body[0].name).toEqual("Test Theme");
    });

    it('should create a new theme', async () => {
        const res = await request(app)
            .post('/api/themes')
            .set('x-auth-token', token)
            .send({
                name: "New Theme",
                contentPermissions: { images: false, videos: true, texts: false },
                accessPermissions: { read: ["creator"], write: ["admin", "creator"] },
                imageUrl: "http://example.com/newimage.png"
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toEqual("New Theme");
    });
});

