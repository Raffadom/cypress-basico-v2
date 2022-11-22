Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Rafael')
    cy.get('#lastName').type('Santos')
    cy.get('#email').type('rafael.domingos.rds@gmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
})



