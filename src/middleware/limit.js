const db = require('../util/db')

function limit(period, max) {
  return async function(req, res, next) {
    const created = db.ordersByUserIdAndPeriod(req.user.id, period)

    if (created.length >= max) {
      return res.status(400).send({ error: 'too many orders', period })
    }
  
    if ('info' in req) {
      req.info[`limit_${period}`] = max
    } else {
      req.info = {
        [`limit_${period}`]: max
      }
    }

    next()
  }
}

module.exports = {
  limit
}
