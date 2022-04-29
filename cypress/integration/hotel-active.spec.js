describe('Hotel Bogota - Active', () => {
    before(() => {
        cy.setupMetamask(
            Cypress.env('SECRET_WORDS'),
            Cypress.env('NETWORK'),
            Cypress.env('PASSWORD')
        ).then(setupFinished => {
           expect(setupFinished).to.be.true;
        });
    });

    it('No Devcon tickets available when no tokens issued', () => {
        cy.visit('https://tokenscript.github.io/token-negotiator-gh-pages/hotel-bogota-active-negotiation-website/')

        cy.get('.overlay-tn > button').click() // open negotiator
        cy.get('button.opening-btn-tn').contains(`Let's go!`);
        cy.get('.opening-heading-tn').contains('Open a new world of discounts available with your tokens.');

        cy.get('button.opening-btn-tn').click()
        cy.get('.headline-container-tn').contains('Select Wallet');

        cy.log('Wallets:')
        cy.get('button.wallet-button-tn').each((button) => {
            cy.log(`${button.children('p').text()} [${button.attr('data-wallet')}]`)
        }) 

        cy.get('button[data-wallet="MetaMask"]').should('exist')   // Requires MetaMask browser extension to be present
        // NOTE: off-chain tokens don't actually need MetaMask but we need to select it in order to progress
        cy.get(`button[data-wallet='WalletConnect']`).should('exist')   
        cy.get(`button[data-wallet='Torus']`).should('exist')   

        cy.get('button[data-wallet="MetaMask"]').click() // This opens MetaMask because the site needs to be connected
        cy.acceptMetamaskAccess().then(connected => {
            expect(connected).to.be.true;
        });

        cy.get('button.connect-btn-tn').click(); // Connect to Devcon
        cy.get('.headline-tn').contains('Get discount with Ticket');
        cy.get('button.tokens-btn-tn').contains('0 token/s available', { timeout: 10000 })

        cy.get('button.tokens-btn-tn').click();
        cy.get('.token-name').contains('Devcon');

        cy.get('.overlay-tn > button').click() // close negotiator
    })

})
