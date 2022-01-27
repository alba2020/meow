const User = require('../models/User')
const db = require('../util/db')

async function signup (req, res) {
  if (!req.body.id || !req.body.name) {
    return res.status(400).send({ message: 'id and name required' })
  }

  const id = parseInt(req.body.id)

  const exists = db.findUserById(id)
  if (exists) {
    return res.status(400).send({ error: 'user with that id already exists' })
  }

  try {
    let user = new User(id, req.body.name)
    db.addUser(user)
  
    return res.status(201).send({ user })
  } catch (e) {
    return res.status(500).end()
  }
}

async function list(req, res) {
  let allUsers = db.allUsers()

  return res.send({ users: allUsers })
}

async function show(req, res) {
  res.send({ user: req.user })
}

async function deposit(req, res) {
  if (!req.body.amount) {
    return res.status(400).send({ message: 'amount required' })
  }

  const amount = parseInt(req.body.amount)

  if (amount <= 0) {
    return res.status(400).send({ message: 'positive amount required' })
  }

  user = req.user
  
  user.deposit(amount)
  db.updateUser(user)

  res.send({ balance: user.getBalance() })
}

async function balance(req, res) {
  res.send({ balance: req.user.balance })
}


module.exports = {
  signup,
  list,
  show,
  deposit,
  balance,
}
