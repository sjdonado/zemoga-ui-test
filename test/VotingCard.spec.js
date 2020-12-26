const votingCards = [
  {
    name: 'Kanye',
    score: [64, 36],
  },
  {
    name: 'Mark',
    score: [36, 64],
  },
  {
    name: 'Cristina',
    score: [36, 64],
  },
  {
    name: 'Malala',
    score: [64, 36],
  },
];

describe('VotingCard component', () => {
  beforeEach(() => {
    cy.visit('./dist/index.html');
    cy.clearIndexedDB();
  });

  it(`Should have ${votingCards.length} voting cards`, () => {
    cy.get('.voting-card').should('to.have.lengthOf', votingCards.length);
  });

  votingCards.forEach(({ name, score }, index) => {
    const cardSelector = `.voting-card:nth-child(${index + 1})`;
    const thumbUpSelector = `${cardSelector} label[for="${name}-radio-thumb-up"]`;
    const thumbDownSelector = `${cardSelector} label[for="${name}-radio-thumb-down"]`;
    const submitButtonSelector = `${cardSelector} form input[type="submit"]`;

    const thumbUpStatistics = `${cardSelector} .card-statistics > .blue-alpha > .score`;
    const thumbDownStatistics = `${cardSelector} .card-statistics > .orange-alpha > .score`;

    let scoreIdx = Number(score[0] > score[1]);

    const thumbButtonSelectors = [thumbUpSelector, thumbDownSelector];
    const thumbStatisticSelectors = [thumbUpStatistics, thumbDownStatistics];
    const thumbDecoratorColors = ['orange', 'blue'];
    const thumbDecoratorIcons = ['icon-thumb-down', 'icon-thumb-up'];

    const vote = () => {
      cy.get(thumbButtonSelectors[scoreIdx]).click();
      cy.get(submitButtonSelector).click();
    };

    it(`Should ${name} card display default values`, () => {
      cy.get(`${cardSelector} .thumb-decorator > div`).should('have.class', thumbDecoratorColors[scoreIdx]);
      cy.get(`${cardSelector} .thumb-decorator > div > span`).should('have.class', thumbDecoratorIcons[scoreIdx]);
      cy.get(thumbStatisticSelectors[scoreIdx]).should('have.text', `${score[scoreIdx]}%`);

      cy.get(`${cardSelector} form`).children().should('to.have.lengthOf', 3);
      cy.get(submitButtonSelector).should('have.value', 'Vote now');
      cy.get(thumbButtonSelectors[scoreIdx]).should('be.visible');
    });

    it(`Should vote in ${name} card`, () => {
      vote();
      cy.get(`${cardSelector} form`).children().should('to.have.lengthOf', 1);
      cy.get(submitButtonSelector).should('have.value', 'Vote again');
      cy.get(thumbStatisticSelectors[scoreIdx]).should('have.text', `${score[scoreIdx] + 1}%`);
      cy.get(`${cardSelector} .card-description`).should('have.text', 'Thank you for voting!');
    });

    it(`Should vote again in ${name} card`, () => {
      vote();
      cy.get(submitButtonSelector).click();
      cy.get(`${cardSelector} form`).children().should('to.have.lengthOf', 3);
      cy.get(`${cardSelector} .card-description`).should('not.have.text', 'Thank you for voting!');
    });

    it(`Should vote 30 times thumb down in ${name} card`, () => {
      for (let i = 0; i < 30; i += 1) {
        vote();
        cy.get(submitButtonSelector).click();
      }
      cy.get(thumbStatisticSelectors[scoreIdx]).should('have.text', '51%');

      scoreIdx = (scoreIdx + 1) % 2;
      cy.get(`${cardSelector} .thumb-decorator > div`).should('have.class', thumbDecoratorColors[scoreIdx]);
      cy.get(`${cardSelector} .thumb-decorator > div > span`).should('have.class', thumbDecoratorIcons[scoreIdx]);
      cy.get(thumbStatisticSelectors[scoreIdx]).should('have.text', '49%');
    });
  });
});
