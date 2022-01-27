const moment = require('moment')
const { STATUS_CREATED, STATUS_CANCELED } = require('../const')

const { randStr } = require("../util/rand")

class Order {
 
  constructor(userId, number, deliveryAt) {
    this.id = randStr(8)
    this.userId = userId
    this.number = number
    this.cost = number * 10
    this.createdAt = new Date()
    this.deliveryAt = deliveryAt
    this.status = STATUS_CREATED
    this.info = {}
  }

  hoursLeft() {
    const now = moment()
    const end = moment(this.deliveryAt)
    const left = moment.duration(end.diff(now))
    
    return left.asHours()
  }

  canBeCanceled() {
    return this.hoursLeft() > 1
  }

  cancel() {
    if (this.canBeCanceled()) {
      this.status = STATUS_CANCELED
    } else {
      throw new Error("order cannot be canceled")
    }
  }
}

module.exports = Order
