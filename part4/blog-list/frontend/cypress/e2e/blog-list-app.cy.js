describe('Blog-list app', () => {
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    const user = {
      name: 'Test Tester',
      username: 'ttester',
      password: 'password',
    };
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user);
    cy.visit('');
  });

  it('login form is displayed by default', () => {
    cy.contains('Login with your credentials to see and create blog listings.');
    cy.get('.LoginForm').should('contain', 'Username');
    cy.get('.LoginForm').should('contain', 'Password');
    cy.get('.LoginForm_loginButton').should('have.text', 'login');
  });

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.get('[data-cy="usernameInput"]').type('ttester');
      cy.get('[data-cy="passwordInput"]').type('password');
      cy.get('.LoginForm_loginButton').click();
      cy.get('.App_loggedInUser').should(
        'contain',
        'Test Tester is logged in.'
      );
    });

    it('fails with wrong credentials', () => {
      cy.get('[data-cy="usernameInput"]').type('ttester');
      cy.get('[data-cy="passwordInput"]').type('wrongpassword');
      cy.get('.LoginForm_loginButton').click();
      cy.get('.App_loggedInUser').should('not.exist');
      cy.get('[data-cy="notification"]')
        .should('have.text', 'Wrong username or password')
        .and('have.css', 'background-color', 'rgb(123, 8, 40)');
    });
  });
});
