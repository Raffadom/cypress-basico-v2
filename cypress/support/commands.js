Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(fieldsVals = {}) {
    const {
        firstName = 'Rafael',
        lastName = 'Santos',
        email = 'rafael.domingos.rds@gmail.com',
        openText = 'Teste',

    } = fieldsVals
    cy.get('#firstName').type(firstName)
    cy.get('#lastName').type(lastName)
    cy.get('#email').type(email)
    cy.get('#open-text-area').type(openText)
    cy.contains('button', 'Enviar').click()
})



