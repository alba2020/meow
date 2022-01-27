const db = require('../util/db')

const withUser = async (req, res, next) => {
  if (! req.params.userId) {
    return res.status(401).json({ error: 'userId not found' })
  }

  const userId = parseInt(req.params.userId)
  const user = db.findUserById(userId)

  if (!user) {
    return res.status(401).json({ error: 'user not found' })
  }

  req.user = user  
  next()
}

module.exports = {
  withUser
}
