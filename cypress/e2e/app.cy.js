/// <reference types="cypress" />

describe('Sign Up', () => {
  beforeEach(() => {
    // clear the existing server data
    cy.request('POST', 'http://localhost:4000/reset', { students: [] })
  })

  Cypress._.times(10, (k) => {
    it(`Adds person to course ${k + 1} / 10`, () => {
      cy.visit('/')

      // type username into input
      cy.get('input[name="name"]').click().type('Some Name')
      // type user email
      cy.get('input[name="email"]').click().type('some@email.com')
      // select the "core" department
      cy.get('select[name="department"]').select('core')
      // select the "git-it" course
      cy.get('select[name="course"]').select('git-it')
      // submit the form
      cy.intercept('POST', '/students').as('save')
      cy.get('input[type="submit"]').click()
      cy.wait('@save')
      // the "Saved!" message should appear
      cy.get('input[value="Saved!"]').should('be.visible')
      // and the list of registered people should contain the new person
      // including the email and the course name
      cy.contains('li', 'Some Name - some@email.com - core - git-it')
      // the data should be preserved after the reload
      cy.reload()
      // does this work reliably?
      // why would the same assertion pass before the reload but not now?
      cy.contains('li', 'Some Name - some@email.com - core - git-it').should('be.visible')
      
    })
  })
})

