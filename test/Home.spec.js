const sizes = [[320, 806], [375, 806], [425, 806], [768, 806], [1024, 806], [1440, 806]];
const breakPoints = [767, 992, 1200];
const mainComponents = ['header', '.navbar', '.header-voting-card', '.closing-in', '.info-banner', '.voting-card', '.submit-name-banner', 'footer'];

describe('Home page', () => {
  beforeEach(() => {
    cy.visit('./dist/index.html');
  });

  it('Should open the page', () => {
    mainComponents.forEach((component) => cy.get(component).should('be.visible'));
  });

  sizes.forEach((size) => {
    context(`${size[0]} screen`, () => {
      beforeEach(() => {
        cy.viewport(size[0], size[1]);
      });

      mainComponents.forEach((component) => {
        it(`Should ${component} be responsive`, () => {
          cy.get(component)
            .should('have.css', 'width')
            .and('to.satisfy', (width) => width.slice(0, 3) <= size[0]);
        });
      });

      if (size[0] < breakPoints[0]) {
        it('Should display hamburguer menu', () => {
          cy.get('.navbar .hamburguer').should('be.visible');
          cy.get('.navbar .navigation').should('not.be.visible');
        });

        it('Should show navbar on click hamburguer menu', () => {
          cy.get('.navbar .hamburguer').click();
          cy.get('.navbar .navigation').should('be.visible');
        });
      }

      if (size[0] > breakPoints[0] && size[0] < breakPoints[1]) {
        it('Should not display hamburguer menu', () => {
          cy.get('.navbar .hamburguer').should('not.be.visible');
          cy.get('.navbar .navigation').should('be.visible');
        });
      }

      if (size[0] > breakPoints[1] && size[0] < breakPoints[2]) {
        it('Should not display hamburguer menu', () => {
          cy.get('.navbar .hamburguer').should('not.be.visible');
          cy.get('.navbar .navigation').should('be.visible');
        });
      }

      if (size[0] > breakPoints[2]) {
        it('Should not display hamburguer menu', () => {
          cy.get('.navbar .hamburguer').should('not.be.visible');
          cy.get('.navbar .navigation').should('be.visible');
        });
      }
    });
  });
});
