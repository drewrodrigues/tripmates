describe('Sessions', () => {
  context('when user exists', () => {
    it('allows user to sign in', () => {
      cy.seedDatabase()

      cy.visit('/login')
      cy.get("[data-cy=signUp-email]").type("drew@tripmates.io")
      cy.get("[data-cy=signUp-password]").type("password")
      cy.contains("Sign in").click()

      cy.contains("Add Trip").should("exist")
    })
  })

  context("when user doesn't exist", () => {
    it('shows errors', () => {
      cy.visit('/login')

      cy.get("[data-cy=signUp-email]").type("drew@tripmates.io")
      cy.get("[data-cy=signUp-password]").type("password")
      cy.contains("Sign in").click()

      cy.contains('Failed to login').should('exist')
    })
  })
})