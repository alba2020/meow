const request = require('supertest')
const moment = require('moment')

const User = require('../models/User')
const { app } = require('../server')
const db = require('../util/db')
const { NOT_ALLOWED, STATUS_CREATED } = require('../const')

describe('Server tests', () => {
  // beforeEach(async () => {
  // })

  test('ping', async (done) => {
    let response = await request(app).get('/ping')
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      message: 'meow'
    })
    done()
  })

  test('create user', async (done) => {
    const id = 23423
    const name = 'sfsdf'
    await request(app)
          .post('/users')
          .send(`id=${id}`)
          .send(`name=${name}`)
    

    let response = await request(app).get(`/users/${id}`)

    expect(response.body).toEqual({
      user: {
        id: id,
        name: name,
        balance: 0
      }
    })

    done()
  })

  test('deposit', async done => {
    const user = new User(3123, 'test')
    db.addUser(user)

    let response = await request(app).get(`/users/${user.id}`)
    expect(response.body.user.balance).toEqual(0)

    response = await request(app).post(`/users/${user.id}/deposit`).send("amount=10")
    expect(response.body.balance).toEqual(10)

    response = await request(app).get(`/users/${user.id}/balance`)
    expect(response.body.balance).toEqual(10)

    done()
  })

  test('last digit test', async done => {
    const rem = moment().date() % 2
    good = new User(22 + rem, 'good')
    good.balance = 100
    db.addUser(good)
    bad = new User(33 + rem, 'bad')
    bad.balance = 100
    db.addUser(bad)

    let response = await request(app)
            .post(`/users/${bad.id}/orders`)
            .send(`deliveryAt=2022-05-01`)
            .send(`number=1`)

    expect(response.body).toEqual({ error: NOT_ALLOWED })

    response = await request(app)
    .post(`/users/${good.id}/orders`)
    .send(`deliveryAt=2022-05-01`)
    .send(`number=1`)

    expect(response.body.order.status).toEqual(STATUS_CREATED)

    done()
  })

})
