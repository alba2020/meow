const moment = require('moment')

let users = []
let orders = []

console.log('db init')

function addUser(user) {
  users.push(user)
}

function allUsers() {
  return [...users]
}

function updateUser(user) {
  removeUser(user.id)
  addUser(user)
}

function removeUser(id) {
  users = users.filter(u => id.id !== id)
}

function findUserById(id) {
  return users.find(u => u.id === id)
}

function getBalanceById(id) {
  return findUserById(id).getBalance()
}

function addOrder(order) {
  orders.push(order)
}

function updateOrder(order) {
  removeOrder(order.id)
  addOrder(order)
}

function removeOrder(id) {
  orders = orders.filter(o => o.id !== id)
}

function allOrders() {
  return [...orders]
}

function ordersByUserId(id) {
  return orders.filter(o => o.userId === id)
}

function ordersByUserIdAndPeriod(id, period) { // day, month, year
  const now = moment()

  return orders.filter(order => {
    return order.userId === id && now.isSame(order.createdAt, period)
  })
}

function findOrderById(id) {
  return orders.find(o => o.id === id)
}

module.exports = {
  addUser,
  removeUser,
  updateUser,
  allUsers,
  findUserById,
  getBalanceById,

  addOrder,
  removeOrder,
  updateOrder,
  allOrders,
  ordersByUserId,
  ordersByUserIdAndPeriod,
  findOrderById,
}
