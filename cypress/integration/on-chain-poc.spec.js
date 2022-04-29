describe('On-chain POC Example', () => {
    before(() => {
        cy.setupMetamask(
            Cypress.env('ON_CHAIN_SECRET_WORDS'),
            Cypress.env('NETWORK'),
            Cypress.env('PASSWORD')
        ).then(setupFinished => {
           expect(setupFinished).to.be.true;
        });
    });

    it('Can select an NFT to obtain special offers', () => {
        const collection = 'Castle NFT';
        const name = 'Castle Red Door'
        const issuer = 'castle-nft';

        cy.visit('http://localhost:8080/')

        cy.get('.overlay-tn > button', { timeout: 10000 }).click()
        cy.get('button.opening-btn-tn').contains(`Let's go!`);
        cy.get('.opening-heading-tn').contains('Open a new world of discounts available with your tokens.');

        cy.get('button.opening-btn-tn').click()
        cy.get('.headline-container-tn').contains('Select Wallet');

        cy.get('button[data-wallet="MetaMask"]').click() 
        cy.acceptMetamaskAccess().then(connected => {
            expect(connected).to.be.true;
        });

        cy.get('.headline-tn').contains('Get discount with Ticket');

        const connectButton = `button.connect-btn-tn[data-issuer*="${issuer}"]`;
        cy.get(connectButton).contains('Connect', { timeout: 10000 });
        cy.get(connectButton).click(); // Connect to collection and load available NFTs

        const tokenButton = `button.tokens-btn-tn[data-issuer*="${issuer}"]`;
        cy.get(tokenButton).contains('1 token/s available', { timeout: 10000 })
        cy.get(tokenButton).click();
        cy.get('.token-name').contains(collection);

        cy.get('.token-title-tn').contains(name);
        cy.get('#toggle0').click({ force: true }); // select the first NFT

        cy.get('#punks-tshirt-offer').should('be.visible');

        cy.get('.overlay-tn > button').click() // close negotiator
    })

})
