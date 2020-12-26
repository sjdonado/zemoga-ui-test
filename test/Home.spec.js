describe('Home page', () => {
  beforeEach(() => {
    cy.visit('./dist/index.html');
  });

  it('open the page', () => {
    cy.get('header').should('be.visible');
  });
});
