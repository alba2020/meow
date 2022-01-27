const moment = require('moment')
const { NOT_ALLOWED } = require('../const')
const db = require('../util/db')

// - С 2022 года нельзя покупать шаурмяу:
//     - по чётным дням месяца, если последняя цифра ИЖМ нечётная
//     - по нечётным дням месяца, если последняя цифра ИЖМ чётная

function lastDigit(fromYear) {
  return async function(req, res, next) {

    // moment().date() - day of month
    if(moment().year() === fromYear) {
      if( (moment().date() + req.user.id) % 2 === 1) {
        return res.status(400).send({ error: NOT_ALLOWED })
      }
    }

    if ('info' in req) {
      req.info['last_digit'] = fromYear
    } else {
      req.info = {
        last_digit: fromYear
      }
    }

    next()
  }
}

module.exports = {
  lastDigit
}
