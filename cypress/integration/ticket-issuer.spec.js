describe('Devcon Ticket Issuer', () => {

    beforeEach(() => {
        cy.visit('https://tokenscript.github.io/token-negotiator-gh-pages/ticket-issuer-url-website')
    })

    it('Should be able to issue a ticket', () => {
        cy.get('.tokensWrapper').should('contain.text', 'no ticket found');
        cy.get('.ticketContainer').should('have.length', 0, 'No tickets should be shown') ;
        cy.get('button.makeTicket').should('have.length', 4, 'There should be 4 create ticket buttons visible'); 

        cy.get('button.makeTicket').first().click();
        cy.get('.ticketContainer', { timeout: 15000 }).should('have.length', 1, 'Ticket should be generated');
    })

})
