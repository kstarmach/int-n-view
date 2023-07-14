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

    test('Password to short error return', async () => {
        const usersAtStart = await test_helper.usersInDb();

        const newUser = {
            email: "test2@example.com",
            password: "abc"
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await test_helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);

        expect(result.body.error).toContain('Password must be at least 5 characters long!');
    })

    test('Email adress arleady exist in the db', async () => {
        const usersAtStart = await test_helper.usersInDb();

        const newUser = {
            email: "root@test.com",
            password: "abcdefg"
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await test_helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);

        expect(result.body.error).toContain('The email you entered already exists. Please try logging in or use a different email address.');
    })

    test('Not correct email address', async () => {
        const usersAtStart = await test_helper.usersInDb();

        const newUser = {
            email: "test_wrong_email_address",
            password: "abcdefg"
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await test_helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);

        expect(result.body.error).toContain('Please enter a valid email address format.');
    })
})