/// <reference types="Cypress" />



describe('Central de Atendimento ao Cliente TAT', function() {
    const tressegundosem_ms = 3000 //variavel de 3 segundos
    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  
    })
    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longtext = 'Exemplo de um texto longo para testar que quanto mais longo o texto mais demorado o teste, então coloco o delay'
        
        cy.clock() //congela o relogio do navegador
        
        cy.get('#firstName').type('Eliezer')
        cy.get('#lastName').type('Azevedo')
        cy.get('#email').type('eliezer_azevedo@hotmail.com')
        cy.get('#open-text-area').type(longtext, { delay: 0}) //roda o teste mais rapido pois não perde tempo digitando o texto
        //cy.get('button[type="submit"]').click()  //busca o botao que tem o type=submit
        cy.contains('button', 'Enviar').click() //outra forma de mapear o botao usando contains e o texto do botao

        cy.get('.success').should('be.visible')

        //cy.tick(3000) //avanca 3 segundos no tempo colocando o tempo 
        cy.tick(tressegundosem_ms) // utilizando variavel

        cy.get('.success').should('not.be.visible')

        
    })
    it('exibe mensagem de erro ao submeter o formulario com um email com formatação invalida', function () {
        cy.clock()
        
        cy.get('#firstName').type('Eliezer')
        cy.get('#lastName').type('Azevedo')
        cy.get('#email').type('eliezer_azevedo@hotmail,com')
        cy.get('#open-text-area').type('Teste') 
        //cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')


        cy.tick(tressegundosem_ms) // utilizando variavel

        cy.get('.success').should('not.be.visible')
    })

    Cypress._.times(3, function() {

    it('campo telefone continua vazio quando preenchido com valor não-numerico', function() {
        cy.get('#phone')
        .type('abcdefgij') //não deve aparecer nada pois o campo só aceita numeros
        .should('have.value', '') //assertiva para confirmar que o campo deve estar vazio pois só aceita numeros
    })
})

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.clock()
        
        cy.get('#firstName').type('Eliezer')
        cy.get('#lastName').type('Azevedo')
        cy.get('#email').type('eliezer_azevedo@hotmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

        cy.tick(tressegundosem_ms) // utilizando variavel

        cy.get('.error').should('not.be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName')
        .type('Eliezer')
        .should('have.value', 'Eliezer')
        .clear()
        .should('have.value', '')
        cy.get('#lastName')
        .type('Azevedo')
        .should('have.value', 'Azevedo')
        .clear()
        .should('have.value', '')
        cy.get('#email')
        .type('eliezer@hotmail.com')
        .should('have.value', 'eliezer@hotmail.com')
        .clear()
        .should('have.value', '')
        cy.get('#phone')
        .type('1234567890')
        .should('have.value', '1234567890')
        .clear()
        .should('have.value', '')
    })

it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
    cy.clock()
    
    //cy.get('button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible') //verifica se o elemento com a classe error aparece na tela

    cy.tick(tressegundosem_ms) // utilizando variavel

        cy.get('.error').should('not.be.visible')

})

it('envia o formuário com sucesso usando um comando customizado', function() {
    cy.clock()
    
    cy.fillMandatoryFieldsAndSubmit() //comando personalizado, executa o comando

    cy.get('.success').should('be.visible') // verifica resultado esperado


    cy.tick(tressegundosem_ms) // utilizando variavel

    cy.get('.success').should('not.be.visible')
})

it('seleciona um produto (YouTube) por seu texto', function() {
    cy.get('#product')
    .select('YouTube') // Seleção pelo nome Youtube
    .should('have.value', 'youtube') //verificando o valor e não o texto

})

it('seleciona um produto (Mentoria) por seu valor (value)', function() {
    cy.get('#product')
    .select('mentoria') // Seleção pelo seu value
    .should('have.value', 'mentoria') //confirma pelo value

})

it('seleciona um produto (Blog) por seu índice', function() {
    cy.get('#product')
    .select(1) // Seleção pelo indice no caso "Blog" na tabela é o valor 1 começa do 0
    .should('have.value', 'blog') //confirma pelo value
})

it('marca o tipo de atendimento "Feedback"', function() {
    cy.get('input[type="radio"][value="feedback"]').check()
    .should('have.value', 'feedback')
})

it('marca cada tipo de atendimento', function() { //testar radio
    cy.get('input[type="radio"]')
    .should('have.length', 3) //verifica a quantidade de elementos de selecao
    .each(function($radio) {
        cy.wrap($radio).check() //marca todas as opções do radio uma por uma
        cy.wrap($radio).should('be.checked')

    })
})
// em checkbox sempre utilizar check e unckecked por questão de semantica, pois o clique pode desmarcar o que estava marcado
it('marca ambos checkboxes, depois desmarca o último', function() {// marcando checkboxes
    cy.get('input[type="checkbox"]') //identificou os checkbox no caso são 2 
    .check() // marcou os 2 checkboxes
    .should('be.checked')
    .last() // pega o ultimo checkbox
    .uncheck() //desmarca o ultimo checkbox
    .should('be.not.checked')

})

it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
    cy.clock()
    
    cy.get('#firstName').type('Eliezer')
    cy.get('#lastName').type('Azevedo')
    cy.get('#email').type('eliezer_azevedo@hotmail.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')

    cy.tick(tressegundosem_ms) // utilizando variavel

    cy.get('.error').should('not.be.visible')

})
//selecionar e verificar se o arquivo foi anexado
it('seleciona um arquivo da pasta fixtures', function() {
    //cy.get('#file-upload') // pelo id do input
    cy.get('input[type="file"]')//pelo input type
    .should('not.have.value')
    .selectFile('./cypress/fixtures/example.json')
    .should(function($input) { //funcao para vericiar o file do input upload
        expect($input[0].files[0].name).to.equal('example.json') //verifica se o arquivo selecionado foi o correto

    })
})

//testa o drag drop, como se tivesse arrastando o arquivo para o input do select file
it('seleciona um arquivo simulando um drag-and-drop', function() {
    cy.get('#file-upload')
    .should('not.have.value')
    .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'}) // drag-drop é como se estivesse arrastando o arquivo para o input
    .should(function($input) { //funcao para vericiar o file do input upload
        expect($input[0].files[0].name).to.equal('example.json') //verifica se o arquivo selecionado foi o correto
    })
})
it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
    cy.fixture('example.json').as('sampleFile') // função cy.fixture com alias não precisa passar todo o caminho do arquivo
    cy.get('#file-upload')
        .selectFile('@sampleFile') //informa o alias que deve ser selecionado colcar antes o @
        .should(function($input) { //funcao para vericiar o file do input upload
            expect($input[0].files[0].name).to.equal('example.json') //verifica se o arquivo selecionado foi o correto
    })
})
// testar links para outras páginas
//todos os navegadores abrem o target="_blank" em outra aba
it('verifica que o link política de privacidade abre em outra aba sem a necessidade de um clique', function() {
    cy.get('#privacy a').should('have.attr', 'target', '_blank') // elemento id #privay com "a", faz uma assertiva que tenha os atributos target e _blank
})

it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
    cy.get('#privacy a')
    .invoke('removeAttr', 'target') // remove o atributo target para o link na mesma pagina 
    .click()

    cy.contains('Talking About Testing').should('be.visible') //assertiva para verificar se esta na pagina, posso passar um seletor css ou o texto   
})
//invoke show e hide = esconde ou exibe elemento na tela
it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })

it('preenche a area de texto usando o comando invoke', function() {
    const longText = Cypress._.repeat('0123456789', 20) //repete o texto 20x
    cy.get('#open-text-area')
    .invoke('val', longText) // invoca a variavel long text
    .should('have.value', longText) //confitma se foi inserido a variavel
})

it('faz uma requisição HTTP', function() {
    cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
    .should(function(response) { //verificacao da requisicao
        const { status, statusText, body } = response // variavel do resultado
        expect(status).to.equal(200) //verifica se o cod da resposta foi 200
        expect(statusText).to.equal('OK') // verifica se o texto de status foi OK
        expect(body).to.include('CAC TAT') // verifica se no body veio o texto 'CAC TAT'

    })
})
it.only('incontra o gato escondido', function() {
    cy.get('#cat')
    .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
    cy.get('#title')
    .invoke('text', 'CAT TAT') //mudou o texto do titulo do app
    cy.get('#subtitle')
    .invoke('text', 'O gato está aparecendo acima do Nome!')

})

})
