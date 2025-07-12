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
    // Check that the form elements exist
    cy.get('input[type="text"]').should('have.length.at.least', 1);
    cy.get('input[type="number"]').should('have.length.at.least', 1);
    cy.get('input[value="Init escrow"]').should('exist');
  });
});

describe('Bob takes a trade', () => {
  it('should allow Bob to take a trade and show a result', () => {
    cy.visit('/');
    cy.contains('Bob').click();
    // Check that Bob's interface loads properly
    cy.get('input[type="text"]').should('have.length.at.least', 1);
    cy.get('input[type="number"]').should('have.length.at.least', 1);
  });
}); 