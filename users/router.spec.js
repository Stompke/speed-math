const request = require('supertest');
const server = require('../api/server');

let testEmail = `testing12_${Date.now()}@gmail.com`;
let testName = `Test Name_${Date.now()}`;
let testId;
let testToken;
let testValueId;
let testValueName = `Test Value_${Date.now()}`;


describe('API LOGIN / REGISTER Functionality', () => {
    it('Should run a test', () => {
        expect(true).toBe(true);
    })

    it('Should fail registering a user for missing email', () => {
        return request(server)
        .post('/api/users')
        .send({  password: 'password'})
        .then(res => {
            expect(res.body.error).toBe("Could not add user");
        })
    })

    it('Should register a user', () => {
        return request(server)
        .post('/api/users')
        .send({ email: testEmail, password: 'password', username: testName})
        .then(res => {

            expect(res.body.message).toBe(`Welcome ${testName}`);
        })
    })

    it('should fail loggin in with wrong credentials', () => {
        return request(server)
        .post('/api/users/login')
        .send({email: testEmail, password: 'wrongPassword'})
        .then(res => {
            expect(res.body.message).toBe(`Invalid Credentials`);
        })
    })

    it('should login a user', () => {
        return request(server)
        .post('/api/users/login')
        .send({email: testEmail, password: 'password'})
        .then(res => {
            testId = res.body.id;
            testToken = res.body.token;
            expect(res.body.message).toBe(`Welcome ${testName}`);
        })
    })

    it('Should delete the user', () => {
        return request(server)
        .delete(`/api/users/${testId}`)
        .then(res => {
            console.log(testId)
            console.log(res.body)
            expect(res.body.message).toBe(`User ${testId} successfully deleted`);
        })
    })
})



describe('API functionality for Values Data', () => {


    it('Should register a user', () => {
        return request(server)
        .post('/api/users/register')
        .send({ email: testEmail, password: 'password', name: testName})
        .then(res => {
            testId = res.body.id;
            testToken = res.body.token;
            expect(res.body.message).toBe(`Welcome ${testName}`);
        })
    })


    it('Should get a list of values', () => {
        return request(server)
        .get(`/api/values`)
        .set('authorization', testToken)
        .then(res => {
            expect(Array.isArray(res.body)).toBe(true);
        })
    })

    it('should add a value', () => {
        return request(server)
        .post(`/api/values`)
        .set('authorization', testToken)
        .send({name: testValueName, description: 'description for test value'})
        .then(res => {
            testValueId = res.body
            expect(Array.isArray(res.body)).toBe(true);
        })
    })

    it('should find a value by id', () => {
        return request(server)
        .get(`/api/values/${testValueId}`)
        .set('authorization', testToken)
        .then(res => {
            expect(res.body[0].id).toBe(testValueId[0]);
        })
    })
    

    it('should add value to a user', () => {
        return request(server)
        .post(`/api/values/user/${testId}`)
        .set('authorization', testToken)
        .send({            
            "value_id": 1,
            "description": "i want to explore the world of music"
        })
        .then(res => {
            expect(res.body.description).toBe('i want to explore the world of music');
        })
    })


    it('should get values for user', () => {
        return request(server)
        .get(`/api/values/user/${testId}`)
        .set('authorization', testToken)
        .then(res => {
            expect(res.body[0].User_Description).toBe('i want to explore the world of music');
        })
    })


    it('should edit a value for a user', () => {
        return request(server)
        .put(`/api/values/user/${testId}`)
        .set('authorization', testToken)
        .send({            
            "value_id": 1,
            "description": "i want to explore the world of music",
            "top_three": true
        })
        .then(res => {
            expect(res.body.message).toBe(`Value 1 successfully edited from user ${testId}`);
        })
    })

    

    it('should Delete a Value', () => {
        return request(server)
        .delete(`/api/values/${testValueId}`)
        .set('authorization', testToken)
        .then(res => {
            expect(res.body.message).toBe(`Value ${testValueId} successfully deleted`);
        })
    })
    
    it('should Remove value from user', () => {
        return request(server)
        .delete(`/api/values/delete/${testId}`)
        .set('authorization', testToken)
        .send({            
            "value_id": 1,
        })
        .then(res => {
            expect(res.body.message).toBe(`Value 1 successfully removed from user ${testId}`);
        })
    })

    it('Should delete the user', () => {
        return request(server)
        .delete(`/api/users/${testId}`)
        .then(res => {
            expect(res.body.message).toBe(`User ${testId} successfully deleted`);
        })
    })

})

describe('Tests for Projects', () => {


    it('Should register a user', () => {
        return request(server)
        .post('/api/users/register')
        .send({ email: testEmail, password: 'password', name: testName})
        .then(res => {
            testId = res.body.id;
            testToken = res.body.token;
            expect(res.body.message).toBe(`Welcome ${testName}`);
        })
    })

    it('get projects for user', () => {
        return request(server)
        .get(`/api/projects`)
        .set('authorization', testToken)
        .then(res => {
            expect(Array.isArray(res.body)).toBe(true);
        })
    })

    it('Adds project for user', () => {
        return request(server)
        .post(`/api/projects/`)
        .set('authorization', testToken)
        .send({
            name: "another test project",
            description: "test description"
        })
        .then(res => {
            expect(Array.isArray(res.body)).toBe(true);
        })
    })

    // it('Should delete the user', () => {
    //     return request(server)
    //     .delete(`/api/users/${testId}`)
    //     .then(res => {
    //         console.log(res.body)
    //         console.log(testId)
    //         expect(res.body.message).toBe(`User ${testId} successfully deleted`);
    //     })
    // })

})