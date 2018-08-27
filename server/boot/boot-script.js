'use strict'

module.exports = function(app) {
  const Customer = app.models.Customer

  // create default customer
  Customer.count((err, cnt) => {
    if (!cnt) {
      Customer.create({
        "username": "user",
        "email": "user@mail.com",
        "emailVerified": true,
        'password': process.env.PASSWORD
      })
    }
  })
}