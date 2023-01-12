//testa a página da política de privacidade de forma independente

//it('testa a página da política de privacidade de forma independente', function() {
 //   cy.visit('./src/privacy.html')
    // verifica a pagina se contem o texto
   // cy.contains('Talking About Testing').should('be.visible') //assertiva para verificar se esta na pagina, posso passar um seletor css ou o texto   
    // verifica a pagina pelo titulo
    //cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
//})

Cypress._.times(5, function() {
    it('testa a página da política de privacidade de forma independente', function() {
        cy.visit('./src/privacy.html')
    
        cy.contains('Talking About Testing').should('be.visible') //assertiva para verificar se esta na pagina, posso passar um seletor css ou o texto   
           // verifica a pagina pelo titulo

       })

})


