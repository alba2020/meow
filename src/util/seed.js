const moment = require('moment')
const User = require('../models/User')
const Order = require('../models/Order')
const db = require('../util/db')
const { randInt } = require('./rand')

function seed() {
  let root = new User(1, 'root')
  root.balance = 100
  db.addUser(root)

  let user = new User(2, 'user')
  user.balance = 30
  db.addUser(user)

  let order = new Order(1, 2, moment().add(3, 'h').toDate())
  order.id = 'abc'
  db.addOrder(order)

  for (let i = 0; i < 3; i++) {
    order = new Order(1, 1, moment().add(randInt(100), 'h').toDate())
    order.createdAt = moment().subtract(randInt(20), 'd').toDate()
    db.addOrder(order)
  }
}

module.exports = { seed }
