'use strict'

module.exports = function(app) {
  const Customer = app.models.Customer

  // create default customer
  Customer.destroyAll(() => {
    Customer.create({
      "username": "user",
      "email": "user@mail.com",
      "emailVerified": true,
      'password': 'qwerty'
    })
  })
}