'use strict'

module.exports = function(app) {

  // execute autoupdate for Note model to create text search index
  app.dataSources.db.autoupdate('Note', (err, res) => {
    if (err) throw err;
  })

  // create default customer
  const MYJOURNAL_PASSWORD = process.env.MYJOURNAL_PASSWORD
  const Customer = app.models.Customer

  Customer.count((err, cnt) => {
    if (!cnt) {
      if (!MYJOURNAL_PASSWORD) {
        console.log('Error:')
        console.log('Need to set MYJOURNAL_PASSWORD envirable to create a default user')
        process.exit(1)
      }

      Customer.create({
        "username": "user",
        "email": "user@mail.com",
        "emailVerified": true,
        'password': MYJOURNAL_PASSWORD
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
