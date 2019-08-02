import {
  newUserEmailInput,
  newUserFirstNameInput,
  newUserLastNameInput,
  newUserPasswordInput,
  newUserAvatarInput,
  newUserAvatarPlaceholder,
  newUserSubmitText,
  userFirstName,
  userLastName,
  userEmail,
  userPassword,
} from "../support/fields"

describe('Users', () => {
  beforeEach(() => {
    cy.visit('/signup')
  })

  context('when avatar provided', () => {
    it('allows guest sign up', () => {
      cy.get(newUserAvatarPlaceholder)
        .first()
        .invoke('attr', 'src')
        .should('not.exist')

      cy.uploadPhoto(newUserAvatarInput, 'me.jpeg')

      cy.get(newUserFirstNameInput).type(userFirstName)
      cy.get(newUserLastNameInput).type(userLastName)
      cy.get(newUserEmailInput).type(userEmail)
      cy.get(newUserPasswordInput).type(userPassword)
      cy.get(newUserAvatarPlaceholder).first().invoke('attr', 'src').should('exist')

      cy.contains(newUserSubmitText).click()
      cy.contains('Add Trip').should('exist')
    })
  })

  context('when no avatar provided', () => {
    it('allows guest sign up', () => {
      cy.get(newUserAvatarPlaceholder)
        .first()
        .invoke('attr', 'src')
        .should('not.exist')

      cy.get(newUserFirstNameInput).type(userFirstName)
      cy.get(newUserLastNameInput).type(userLastName)
      cy.get(newUserEmailInput).type(userEmail)
      cy.get("[data-cy=signUp-password]").type(userPassword)

      cy.contains(newUserSubmitText).click()
      cy.contains('Add Trip').should('exist')
    })
  })

  context('with invalid data', () => {
    it('shows errors', () => {
      cy.seedDatabase()

      cy.get(newUserEmailInput).type(userEmail)

      cy.contains(newUserSubmitText).click()
      cy.contains("First name can't be blank").should('exist')
      cy.contains("Last name can't be blank").should('exist')
      cy.contains('Email has already been taken').should('exist')
      cy.contains('Password is too short (minimum is 8 characters)').should('exist')
    })
  })
})