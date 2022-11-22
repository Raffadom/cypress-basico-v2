/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })

   it('verifica o título da aplicação', function() {
      cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
   })

   it('preenche os campos obrigatórios e envia o formulário', function() {
      
       const longText = 'Digitando um texto longo onde colocamos o delay como forma de deixar que o texto vá mais rapido'
       cy.get('#firstName').type('Rafael')
       cy.get('#lastName').type('Santos')
       cy.get('#email').type('rafael.domingos.rds@gmail.com')
       cy.get('#open-text-area').type(longText, {delay:0})
       cy.contains('button', 'Enviar').click()

       cy.get('.success').should('be.visible')
   })

   it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
       cy.get('#firstName').type('Rafael')
       cy.get('#lastName').type('Santos')
       cy.get('#email').type('rafael.domingos.rds@gmail,com')
       cy.get('#open-text-area').type('Test')
       cy.contains('button', 'Enviar').click()

       cy.get('.error').should('be.visible')
   })

   it('campo telefone continua vazio quando preeenchido com valor não-numérico', function() {
       cy.get('#phone')
         .type('abcdefghi')
         .should('have.value', '')
   })

   it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
       cy.get('#firstName').type('Rafael')
       cy.get('#lastName').type('Santos')
       cy.get('#email').type('rafael.domingos.rds@gmail.com')
       cy.get('#phone-checkbox').check()
       cy.get('#open-text-area').type('Test')
       cy.contains('button', 'Enviar').click()  
       
       cy.get('.error').should('be.visible')
   }) 

   it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
       cy.get('#firstName')
         .type('Rafael')
         .should('have.value', 'Rafael')
         .clear()
         .should('have.value', '')
       cy.get('#lastName')
         .type('Santos')
         .should('have.value', 'Santos')
         .clear()
         .should('have.value', '')
       cy.get('#email')
         .type('rafael.domingos.rds@gmail.com')
         .should('have.value', 'rafael.domingos.rds@gmail.com')
         .clear()
         .should('have.value', '')
       cy.get('#phone')
         .type('73991508817')
         .should('have.value', '73991508817')
         .clear()
         .should('have.value', '')
   }) 
   
   it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
     cy.contains('button', 'Enviar').click()
       cy.get('.error').should('be.visible')

   })  
   
   it('envia o formuário com sucesso usando um comando customizado', function() {
     
     cy.fillMandatoryFieldsAndSubmit()

     cy.get('.success').should('be.visible')

   })
   
   it('seleciona um produto (YouTube) por seu texto', function() {

     cy.get('#product') //adicionado pela id do cypress (poderia se tb pelo nome "select")
       .select('YouTube')
       .should('have.value', 'youtube')
   })
   
   it('seleciona um produto (Mentoria) por seu valor (value)', function() {

     cy.get('#product')
       .select('mentoria')
       .should('have.value', 'mentoria')
   })

   it('seleciona um produto (Blog) por seu índice', function() {

     cy.get('#product')
       .select(1)
       .should('have.value', 'blog')
   })

   it('marca o tipo de atendimento Feedback', function() {
     
     cy.get('input[type="radio"][value="feedback"]')//não pode haver espaço entre as chaves[].
       .check()
       .should('have.value', 'feedback')
   })

   it('marca cada tipo de atendimento', function() {
     cy.get('input[type="radio"]')// input generica de todas as opções
       .should('have.length', 3)// o comprimento 3 se refere as opções disponiveis
       .each(function($radio) { // each recebe uma function($radio) como argumento. deve-se abrir {}
         cy.wrap($radio).check()// empacota cada elemento e marca cada opção pelo comando check 
         cy.wrap($radio).should('be.checked')// garante que as opções foram marcadas
   }) 
   
  })
   it('marca ambos checkboxes, depois desmarca o ultimo', function() {

    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
   }) 

   it('seleciona um arquivo da pasta fixtures', function() {

    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
   })

   it('seleciona um arquivo simulando um drag-and-drop', function() {
   
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json', { action: "drag-drop"})
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
   })

   it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
      .selectFile('@sampleFile')
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })

   })

   it('verifica que a politica de privacidade abre em outra aba sem a necessidad de um clique', function() {

    cy.get('#privacy a')
      .should('have.attr', 'target', '_blank')
   })

   it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {

    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('Talking About Testing').should('be.visible')  
     
       })
    
  })
