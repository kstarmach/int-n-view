const User = require('../models/user');
const bcrypt = require('bcrypt');
const test_helper = require('./test_helper');
const app = require('../app');
const supertest = require('supertest');

const api = supertest(app);

beforeEach(async () => {
    await User.deleteMany({});

    const paswordHash = await bcrypt.hash('test123', 10);
    const user = new User({ email: 'root@test.com', passwordHash: paswordHash });

    await user.save();
})

describe('Adding new user to the DB', () => {
    test('Successfully added user', async () => {
        const usersAtStart = await test_helper.usersInDb();

        const newUser = {
            email: "test1@example.com",
            password: "abcd4321"
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await test_helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

        const emails = usersAtEnd.map(user => user.email);
        expect(emails).toContain(newUser.email);
    })
})