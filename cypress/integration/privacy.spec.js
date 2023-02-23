beforeEach(function() {
    cy.visit('./src/privacy.html')
})

Cypress._.times(5, function() {
    it('testa a página da política de privacidade de forma independente', function() {

        cy.contains('Talking About Testing')
            .should('be.visible')
    }) 
})


it('testa o titulo da politica de privacidade', function() {

    cy.title()
      .should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade') 


})