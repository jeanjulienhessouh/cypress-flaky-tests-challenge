describe('Sign Up', () => {
  // Can you figure out why this test fails?
  // How would you fix it?
  // Tips: instead of "command - command - command" tests,
  // try doing "command - assertion - command - assertion" to make
  // sure the app has executed the command before proceeding

  it('Adds person to course', () => {
    cy.visit('/')

    // type username into input
    cy.get('input[name="name"]').click().type('Some Name')
    // type user email
    cy.get('input[name="email"]').click().type('some@email.com')
    // select the "core" department
    cy.get('select[name="department"]').select('core')
    // select the "git-it" course
    cy.get('select[name="course"]')
      .select('git-it')
      .should('have.value', 'git-it')
    // submit the form
    cy.get('input[type="submit"]').click()
    // the "Saved!" message should appear
    cy.get('input[value="Saved!"]').should('be.visible')
    // and the list of registered people should contain the new person
    // including the email and the course name
    cy.get('li')
      .should('contain', 'Some Name - some@email.com - core - git-it')

  })
})
