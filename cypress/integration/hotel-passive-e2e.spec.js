describe('Hotel Bogota - Passive - E2E', () => {

    it('Issued tickets should enable free shuttle service', () => {
        cy.visit('https://tokenscript.github.io/token-negotiator-gh-pages/ticket-issuer-url-website')
        cy.get('button.makeTicket').first().click();
        cy.get('button.makeTicket').eq(1).click();
        cy.get('.ticketContainer').should('have.length', 2, 'Tickets should be created') 

        cy.visit('https://tokenscript.github.io/token-negotiator-gh-pages/hotel-bogota-passive-negotiation-website/')
        cy.get('div.MuiCardContent-root > h1').eq(1).should('contain.text', '2 Devcon Tickets')
        cy.get('#root').should('contain.text', 'Free shuttle service available to you as a Devcon Ticket holder! Enjoy the event.')
    })

})
