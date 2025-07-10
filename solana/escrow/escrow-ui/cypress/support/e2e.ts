// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

describe('App loads', () => {
  it('should load the main page', () => {
    cy.visit('/');
    cy.contains('Alice').should('exist');
    cy.contains('Bob').should('exist');
  });
});

describe('Alice starts an escrow', () => {
  it('should allow Alice to start an escrow and show confirmation', () => {
    cy.visit('/');
    cy.contains('Alice').click();
    // Simulate filling out a form if present
    // cy.get('input[name="amount"]').type('100');
    // cy.get('button').contains('Start Escrow').click();
    // For demo, just check for a confirmation message or UI change
    // Adjust selectors as needed for your actual UI
    cy.contains('Escrow started').should('exist');
  });
});

describe('Bob takes a trade', () => {
  it('should allow Bob to take a trade and show a result', () => {
    cy.visit('/');
    cy.contains('Bob').click();
    // Simulate filling out a form or clicking a button if present
    // cy.get('input[name="tradeId"]').type('1');
    // cy.get('button').contains('Take Trade').click();
    // For demo, just check for a result message or UI change
    cy.contains('Trade completed').should('exist');
  });
});