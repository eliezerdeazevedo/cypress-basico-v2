Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() { //adiciona um novo comando nome do comando e abaixo a função
    cy.get('#firstName').type('Eliezer')
    cy.get('#lastName').type('Azevedo')
    cy.get('#email').type('eliezer_azevedo@hotmail.com')
    cy.get('#open-text-area').type('Teste') 
    cy.get('button[type="submit"]').click()

})


















// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })




