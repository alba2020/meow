const moment = require('moment')

const db = require('../util/db')
const Order = require('../models/Order')

async function create(req, res) {
  if (!req.body.deliveryAt) {
    res.status(400).send({ error: 'deliveryAt required' })
  }

  if (!req.body.number) {
    res.status(400).send({ error: 'number required' })
  }

  const order = new Order(req.user.id, parseInt(req.body.number), req.body.deliveryAt)
  order.info = req.info

  if (req.user.balance < order.cost) {
    return res.status(400).send({ error: 'not enough money' })
  }

  user = req.user
  user.withdraw(order.cost)
  db.updateUser(user)

  db.addOrder(order)

  res.send({ order, user })
}

async function cancel(req, res) {
  const order = db.findOrderById(req.params.orderId)
  if (!order) {
    return res.status(400).send({ error: 'order not found' })
  }

  if (! order.canBeCanceled()) {
    return res.status(400).send({ error: 'cannot be canceled' })
  }

  order.cancel()
  db.updateOrder(order)

  res.send({ order })
}

// список заказов пользователя
async function list(req, res) {
  const orders = db.ordersByUserId(req.user.id)
  res.send({ orders })
}

module.exports = {
  create,
  cancel,
  list
}
