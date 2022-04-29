describe('Hotel Bogota - Passive', () => {

    beforeEach(() => {
        cy.visit('https://tokenscript.github.io/token-negotiator-gh-pages/hotel-bogota-passive-negotiation-website/')
    })

    it('Should not show any tickets by default', () => {
        cy.get('div.MuiCardContent-root > h1').eq(1).should('contain.text', '0 Devcon Tickets')   
    })

})
