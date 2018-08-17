'use strict'

module.exports = function(app) {
  const Customer = app.models.Customer

  // create default customer
  Customer.destroyAll(() => {
    Customer.create({
      "realm": "Don Quixote",
      "username": "donqu",
      "email": "donqu@mail.com",
      "emailVerified": true,
      'password': 'qwerty'
    })
  })
}