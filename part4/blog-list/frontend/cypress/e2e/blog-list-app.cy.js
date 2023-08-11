describe('Blog-list app', () => {
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    cy.visit('');
  });
  it('login form is displayed by default', () => {
    cy.contains('Login with your credentials to see and create blog listings.');
    cy.get('.LoginForm').should('contain', 'Username');
    cy.get('.LoginForm').should('contain', 'Password');
    cy.get('.LoginForm_loginButton').should('have.text', 'login');
  });
});
