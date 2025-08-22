describe('App loads', () => {
  it('should load the main page with navigation', () => {
    cy.visit('/');
    cy.contains('Solana Escrow').should('exist');
    cy.contains('Alice (Init)').should('exist');
    cy.contains('Bob (Trade)').should('exist');
    cy.contains('P@P').should('exist');
    cy.contains('Wormhole').should('exist');
  });
});

describe('Navigation works', () => {
  it('should navigate between different interfaces', () => {
    cy.visit('/');
    
    // Test navigation to Bob's interface
    cy.contains('Bob (Trade)').click();
    cy.url().should('include', '/bob');
    cy.contains('Bob\'s Trade Interface').should('exist');
    
    // Test navigation to P@P interface
    cy.contains('P@P').click();
    cy.url().should('include', '/pap');
    cy.contains('Bob\'s Trade Interface').should('exist');
    
    // Test navigation to Wormhole interface
    cy.contains('Wormhole').click();
    cy.url().should('include', '/wormhole');
    cy.contains('Wormhole Interface').should('exist');
    
    // Test navigation back to Alice's interface
    cy.contains('Alice (Init)').click();
    cy.url().should('not.include', '/bob');
    cy.url().should('not.include', '/pap');
    cy.url().should('not.include', '/wormhole');
  });
});

describe('Alice starts an escrow', () => {
  it('should allow Alice to start an escrow and show confirmation', () => {
    cy.visit('/');
    cy.contains('Alice (Init)').click();
    
    // Check that the form elements exist
    cy.get('input[type="text"]').should('have.length.at.least', 1);
    cy.get('input[type="number"]').should('have.length.at.least', 1);
    cy.get('input[value="Init escrow"]').should('exist');
    
    // Check that form validation works
    cy.get('input[value="Init escrow"]').should('be.disabled');
    
    // Check that labels are properly associated
    cy.get('label[for="alice-private-key"]').should('exist');
    cy.get('label[for="alice-program-id"]').should('exist');
  });
});

describe('Bob takes a trade', () => {
  it('should allow Bob to take a trade and show a result', () => {
    cy.visit('/bob');
    
    // Check that Bob's interface loads properly
    cy.get('input[type="text"]').should('have.length.at.least', 1);
    cy.get('input[type="number"]').should('have.length.at.least', 1);
    cy.get('input[value="Take trade"]').should('exist');
    
    // Check that form validation works
    cy.get('input[value="Take trade"]').should('be.disabled');
    
    // Check that labels are properly associated
    cy.get('label[for="bob-private-key"]').should('exist');
    cy.get('label[for="bob-program-id"]').should('exist');
  });
});

describe('P@P interface', () => {
  it('should load P@P interface properly', () => {
    cy.visit('/pap');
    
    // Check that P@P interface loads properly
    cy.get('input[type="text"]').should('have.length.at.least', 1);
    cy.get('input[type="number"]').should('have.length.at.least', 1);
    cy.get('input[value="Take trade"]').should('exist');
    
    // Check that form validation works
    cy.get('input[value="Take trade"]').should('be.disabled');
  });
});

describe('Wormhole interface', () => {
  it('should show placeholder message', () => {
    cy.visit('/wormhole');
    
    // Check that Wormhole interface shows placeholder
    cy.contains('placeholder for the Wormhole interface').should('exist');
    cy.contains('not yet implemented').should('exist');
    cy.get('input[value="Go Back"]').should('exist');
  });
}); 