const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const moment = require('moment')

const usersController = require('./controllers/usersController')
const ordersController = require('./controllers/ordersController')
const { withUser } = require('./middleware/withUser')
const { limit } = require('./middleware/limit')
const { lastDigit } = require('./middleware/lastDigit')
const { seed } = require('./util/seed')
const db = require('./util/db')

const app = express()
app.disable('x-powered-by')
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.get('/test/:userId', [withUser], async(req, res) => {
  const orders = db.ordersByUserIdAndPeriod(req.user.id, 'day')

  res.send({ count:orders.length, orders:orders })
})

// new user
app.post('/users', usersController.signup)
// all users
app.get('/users', usersController.list)
// user info
app.get('/users/:userId', [withUser], usersController.show)

// deposit money
app.post('/users/:userId/deposit', [withUser], usersController.deposit)
// get balance
app.get('/users/:userId/balance', [withUser], usersController.balance)

// create order
app.post('/users/:userId/orders', [
  withUser, limit('day', 2), limit('month', 10), limit('year', 100), lastDigit(2022)
], ordersController.create)

// orders by user
app.get('/users/:userId/orders', [withUser], ordersController.list)
// cancel order
app.post('/orders/:orderId/cancel', ordersController.cancel)

app.get('/ping', async (req, res) => {
  res.send({ message: 'meow' })
})

const start = async () => {

  seed()

  const config = { port: 3000 }
  try {
    app.listen(config.port, () => {
      console.log(`MEOW API on http://localhost:${config.port}/api`)
    })
  } catch (e) {
    console.error(e)
  }
}

module.exports = {
  app,
  start
}