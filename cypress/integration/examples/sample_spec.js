context('login', () => {
    beforeEach(() => {
      cy.visit('http://127.0.0.1:8080')
    })

    describe('Login', function() {
        it('login success', () => {
            cy.get('#password').type('123456')
            cy.get('button[type=submit]').click()
            cy.url().should('include', '#/write')
        })

        it('login unsuccess', () => {
            cy.get('#password').type('bad_password')
            cy.get('button[type=submit]').click()
            cy.get('form').contains('login failed').should('class', 'red')
        })
    })

    describe('Write note', function() {
        it('write note', () => {
            // login
            cy.get('#password').type('123456')
            cy.get('button[type=submit]').click()
            cy.url().should('include', '#/write')

            const number = Math.random() * 100
            const note = 'my new note, number ' + number

            cy.get('textarea').type(note)
            cy.get('button[type=submit]').click()

            cy.get('div.message').contains(note.length)
            // cy.get('section.notes').contains(note)
        })
        it('read notes', () => {
            // login
            cy.get('#password').type('123456')
            cy.get('button[type=submit]').click()
            cy.url().should('include', '#/write')

            cy.contains('Read').click()
        })
    })

    describe('Logout', function() {
        it('logout', () => {
            // login
            cy.get('#password').type('123456')
            cy.get('button[type=submit]').click()
            cy.url().should('include', '#/write')

            cy.contains('Logout').click()

            cy.get('form').find('label').contains('Password')
        })
    })

})
