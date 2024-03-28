/// <reference types="cypress" />

describe('Sign Up', () => {
  // if you repeat this test enough times you can see
  // it has a problem typing the email
  // Can you retype the email if the first attempt fails?

  Cypress._.times(10, (k) => {
    it('Adds person to course ' + (k + 1) + ' / 10', () => {
      cy.visit('/')

      // type username into input
      cy.get('input[name="name"]').click().type('Some Name')

      // type user email
      cy.get('input[name="email"]')
        .click()
        .type('some@email.com')
        .invoke('attr', 'value')
        .then((value) => {
          if (value !== 'some@email.com') {
            cy.get('input[name="email"]').clear().type('some@email.com')
          }
        })

      // assert that the email is correct
      cy.get('input[name="email"]').should('have.value', 'some@email.com')

      // select the "core" department
      cy.get('select[name="department"]').select('core')
      // select the "git-it" course
      cy.get('select[name="course"]').select('git-it')
      // submit the form
      cy.get('input[type="submit"]').click()
      // the "Saved!" message should appear
      cy.get('input[value="Saved!"]').should('be.visible')
      // and the list of registered people should contain the new person
      // including the email and the course name
      cy.contains('li', 'Some Name - some@email.com - core - git-it', {
        timeout: 1000,
      })
    })
  })
})
