describe('Note app', () => {
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Ella Gillis',
      username: 'ellag',
      password: 'ellagpassword',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })
  it('front page can be opened', () => {
    cy.contains('Notes')
    // cy.contains('Browser can execute only JavaScript')
  })

  it('login form can be opened', () => {
    cy.contains('Log in').click()
  })

  it('user can login', () => {
    cy.contains('Log in').click()
    cy.get('#username').type('ellag')
    cy.get('#password').type('ellagpassword')
    cy.get('#login-button').click()
    cy.contains('Ella Gillis is logged in')
  })

  it('login fails with wrong password', () => {
    cy.contains('Log in').click()
    cy.get('#username').type('ellag')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'Ella Gillis is logged in')
  })

  describe('when logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'ellag', password: 'ellagpassword' })
    })

    it('a new note can be created', () => {
      cy.contains('new note').click()
      cy.get('#note-input').type('a note created by cypress')
      cy.contains('Save').click()
      cy.contains('a note created by cypress')
    })

    describe('and several note exists', () => {
      beforeEach(() => {
        cy.createNote({
          content: 'first note',
          important: false,
        })
        cy.createNote({
          content: 'second note',
          important: false,
        })
        cy.createNote({
          content: 'third note',
          important: false,
        })
      })

      it('one of those can be made important', () => {
        cy.contains('show all').click()
        cy.contains('second note').contains('make important').click()

        cy.contains('second note').contains('make not important')
      })
    })
  })
})
