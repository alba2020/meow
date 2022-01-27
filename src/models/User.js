class User {

  constructor(id, name) {
    this.id = id
    this.name = name
    this.balance = 0
  }

  getBalance() {
    return this.balance
  }

  setBalance(newBalance) {
    this.balance = newBalance
    return this
  }

  deposit(amount) {
    this.balance += amount
  }

  withdraw(amount) {
    if (this.balance - amount < 0) {
      throw new Error("Not enough money")
    }
    this.balance -= amount
  }
}

module.exports = User
