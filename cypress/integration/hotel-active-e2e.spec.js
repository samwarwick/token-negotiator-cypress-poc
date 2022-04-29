describe('Hotel Bogota - Active - E2E', () => {

    before(() => {
        cy.setupMetamask(
            Cypress.env('SECRET_WORDS'),
            Cypress.env('NETWORK'),
            Cypress.env('PASSWORD')
        ).then(setupFinished => {
           expect(setupFinished).to.be.true;
        });
    });

    it('Can select a Devcon ticket and obtain discounts', () => {
        cy.visit('https://tokenscript.github.io/token-negotiator-gh-pages/ticket-issuer-url-website')

        cy.acceptMetamaskAccess().then(connected => {
            expect(connected).to.be.true;
        });

        cy.get('button.makeTicket').first().click();
        cy.get('button.makeTicket').eq(1).click();
        cy.get('.ticketContainer', { timeout: 15000 }).should('have.length', 2, 'Tickets should be created') 

        cy.visit('https://tokenscript.github.io/token-negotiator-gh-pages/hotel-bogota-active-negotiation-website/')

        cy.get('.overlay-tn > button').click()
        cy.get('button.opening-btn-tn').contains(`Let's go!`);
        cy.get('.opening-heading-tn').contains('Open a new world of discounts available with your tokens.');

        cy.get('button.opening-btn-tn').click()
        cy.get('.headline-container-tn').contains('Select Wallet');

        cy.get('button[data-wallet="MetaMask"]').click()

        cy.get('button.connect-btn-tn').click(); // Connect to Devcon
        cy.get('.headline-tn').contains('Get discount with Ticket');
        cy.get('button.tokens-btn-tn').should('contain.text', '2 token/s available')

        cy.get('button.tokens-btn-tn').click();
        cy.get('.token-name').contains('Devcon');

        // CSS property: visibility: hidden
        cy.get('#toggle0').click({ force: true }); // select the first token
       
        cy.get('.overlay-tn > button').click();

        // assert hotel room discounts
        cy.get('div.MuiCardContent-root > div > p:nth-child(2)').contains('COP 180000 / night')
    })

})
