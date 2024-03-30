describe('Sign Up', () => {
  Cypress._.times(10, (k) => {
    it(`Adds person to course ${k + 1} / 10`, () => {
      cy.visit('/')
      cy.get('[loaded="true"]', { timeout: 15000 })

      // type username into input
      cy.get('input[name="name"]').click().type('Some Name')
      // type user email
      cy.get('input[name="email"]').click().type('some@email.com')
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
      cy.get('li')
        .should('have.length.gte', 1)
        .and('contain', 'Some Name - some@email.com - core - git-it')
    })
  })
})
