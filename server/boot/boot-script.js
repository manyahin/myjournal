'use strict'

module.exports = function(app) {
  const DIARY_PASSWORD = process.env.DIARY_PASSWORD
  const Customer = app.models.Customer

  // create default customer
  Customer.count((err, cnt) => {
    if (!cnt) {
      if (!DIARY_PASSWORD) {
        console.log('Error:')
        console.log('Need to set DIARY_PASSWORD envirable to create a default user')
        process.exit(1)
      }

      Customer.create({
        "username": "user",
        "email": "user@mail.com",
        "emailVerified": true,
        'password': DIARY_PASSWORD
      }, (err) => {
        if (err) {
          console.log('Error:')
          console.log('Cannot create a default user')

          throw err
        }

        console.log('Success: Default user created!')
      })
    }
  })
}