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

  describe('when logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'ttester', password: 'password' });
    });

    it('a blog can be created', () => {
      cy.get('[data-cy="Togglable_addBlogButton"]').click();
      cy.get('#titleInput').type('How to successfully add a new blog');
      cy.get('#authorInput').type('Test Tester');
      cy.get('#urlInput').type('http://www.blog.com/add-blog');
      cy.get('.Form_addButton').click();
      cy.get('[data-cy="notification"]').should(
        'have.text',
        'Blog "How to successfully add a new blog" was successfully added to the Blog List!'
      );
      cy.get('.App_blogs').should(
        'contain',
        'How to successfully add a new blog'
      );
    });
    describe('and several blogs exist', () => {
      beforeEach(() => {
        cy.createBlog({
          title: 'Blog 1',
          author: 'James Jameson',
          url: 'http://www.blogs.com/blog1',
        });
        cy.createBlog({
          title: 'Blog 2',
          author: 'Jane Doe',
          url: 'http://www.blogs.com/blog2',
        });
        cy.createBlog({
          title: 'Blog 3',
          author: 'Mike Mayers',
          url: 'http://www.blogs.com/blog3',
        });
      });

      it('Blog 2 can be liked', () => {
        cy.pressLikeButton(2);
        cy.get('@blog2Container').find('.Blog_likes').should('have.text', '1');
      });

      it('Blog creator can delete blog', () => {
        cy.contains('Blog 2').as('blog2text');
        cy.get('@blog2text').parent().parent().parent().as('blog2Container');
        cy.get('@blog2Container').find('.Blog_toggleButton').as('viewButton');
        cy.get('@viewButton').click();
        cy.get('@blog2Container')
          .find('[data-cy="Blog_deleteButton"]')
          .as('deleteButton');
        cy.get('@deleteButton').click();
        cy.get('.Blog_title').should('have.length', 2);
        cy.get('[data-cy="notification"]').should(
          'have.text',
          'Blog "Blog 2" was successfully deleted.'
        );
      });

      it('delete-button not visible for user who did not create blog', () => {
        const user = {
          name: 'Mary Smith',
          username: 'msmith',
          password: 'wordsofpass',
        };
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, user);
        cy.get('.App_logoutButton').click();
        cy.login({ username: 'msmith', password: 'wordsofpass' });
        cy.get('.App_loggedInUser').should(
          'contain',
          'Mary Smith is logged in.'
        );
        cy.contains('Blog 2').as('blog2text');
        cy.get('@blog2text').parent().parent().parent().as('blog2Container');
        cy.get('@blog2Container').find('.Blog_toggleButton').as('viewButton');
        cy.get('@viewButton').click();
        cy.get('@blog2Container').should(
          'not.contain.html',
          '[data-cy="Blog_deleteButton"]'
        );
      });

      it('Blogs are ordered according to likes', () => {
        cy.pressLikeButton(2);
        cy.pressLikeButton(2);
        cy.pressLikeButton(2);
        cy.pressLikeButton(1);
        cy.pressLikeButton(1);
        cy.pressLikeButton(3);
        cy.pressLikeButton(3);
        cy.pressLikeButton(3);
        cy.pressLikeButton(3);
        cy.get('.Blog').eq(0).should('contain', 'Blog 3');
        cy.get('.Blog').eq(1).should('contain', 'Blog 2');
        cy.get('.Blog').eq(2).should('contain', 'Blog 1');
      });
    });
  });
});
