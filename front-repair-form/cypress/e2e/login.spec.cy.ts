const url = 'http://localhost:5173';

describe('Login', () => {
  it('should log in an existing user', () => {
    cy.visit(`${url}/login`);

    cy.get(':nth-child(1) > .relative > .w-full').type('test@goweb.com');
    cy.get(':nth-child(2) > .relative > .w-full').type('password123');

    cy.get('.card-shadow > .items-center').click();

    cy.url().should('include', '/dashboard');
  });
});