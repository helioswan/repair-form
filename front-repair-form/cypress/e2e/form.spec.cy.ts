import { Transaction } from './../../src/types/Transaction';
const url = 'http://localhost:5173';

describe('Form', () => {
  it('should log create a repair form', () => {
    cy.visit(`${url}`);

    cy.get('[href="/form/plomberie"]').click()

    cy.url().should('include', '/plomberie');

    cy.get('.mb-4 > :nth-child(1)').click();
    cy.get('.mb-4 > :nth-child(1)').click();
    cy.get('.mb-4 > :nth-child(1)').click();

    cy.url().should('include', '/result');

    cy.get('.intervention-card > div > .flex').click();

    cy.url().should('include', '/transaction');

    cy.get(':nth-child(1) > .relative > .w-full').type('Test');
    cy.get(':nth-child(2) > .relative > .w-full').type('Test');
    cy.get(':nth-child(3) > .relative > .w-full').type('Test');
    cy.get(':nth-child(4) > .relative > .w-full').type('Test');
    cy.get(':nth-child(5) > .relative > .w-full').type('0123456789');
    cy.get(':nth-child(6) > .relative > .w-full').type('test@goweb.com');

    cy.get('fieldset.flex > :nth-child(2)').click();
    cy.get(':nth-child(1) > .cursor-pointer').click();
    cy.get('#retractTerms').click();

    cy.get('#submit > .mx-auto').click();

    cy.url().should('include', '/success');
  });
});