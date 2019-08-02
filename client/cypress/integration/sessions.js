import {
  newSessionUrl,
  sessionSignUpEmailInput,
  sessionSignUpPasswordInput,
  signInText,
  signInFailText,
  userEmail,
  userPassword
} from '../support/fields'

describe('Sessions', () => {
  context('when user exists', () => {
    it('allows user to sign in', () => {
      cy.seedDatabase()

      cy.visit(newSessionUrl)
      cy.get(sessionSignUpEmailInput).type(userEmail)
      cy.get(sessionSignUpPasswordInput).type(userPassword)
      cy.contains(signInText).click()

      cy.contains("Add Trip").should("exist")
    })
  })

  context("when user doesn't exist", () => {
    it('shows errors', () => {
      cy.visit(newSessionUrl)

      cy.get(sessionSignUpEmailInput).type(userEmail)
      cy.get(sessionSignUpPasswordInput).type(userPassword)
      cy.contains(signInText).click()

      cy.contains(signInFailText).should('exist')
    })
  })
})