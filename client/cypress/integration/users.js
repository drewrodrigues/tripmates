describe('Users', () => {
  beforeEach(() => {
    cy.visit('/signup')
  })

  context('when avatar provided', () => {
    it('allows guest sign up', () => {
      cy.get('[data-cy=signUp-avatar-placeholder]')
        .first()
        .invoke('attr', 'src')
        .should('not.exist')

      cy.uploadPhoto('[data-cy=signUp-avatar]', 'me.jpeg')

      cy.get("[data-cy=signUp-firstName]").type('Drew')
      cy.get("[data-cy=signUp-lastName]").type('Rodrigues')
      cy.get("[data-cy=signUp-email]").type('drew@tripmates.io')
      cy.get("[data-cy=signUp-password]").type('password')

      cy.get('[data-cy=signUp-avatar-placeholder]').first().invoke('attr', 'src').should('exist')

      cy.contains('Create your account').click()
      cy.contains('Add Trip').should('exist')
    })
  })

  context('when no avatar provided', () => {
    it('allows guest sign up', () => {
      cy.get('[data-cy=signUp-avatar-placeholder]')
        .first()
        .invoke('attr', 'src')
        .should('not.exist')

      cy.get("[data-cy=signUp-firstName]").type('Drew')
      cy.get("[data-cy=signUp-lastName]").type('Rodrigues')
      cy.get("[data-cy=signUp-email]").type('drew@tripmates.io')
      cy.get("[data-cy=signUp-password]").type('password')

      cy.contains('Create your account').click()
      cy.contains('Add Trip').should('exist')
    })
  })

  context('with invalid data', () => {
    it('shows errors', () => {
      cy.seedDatabase()

      cy.get("[data-cy=signUp-email]").type('drew@tripmates.io')

      cy.contains('Create your account').click()
      cy.contains("First name can't be blank").should('exist')
      cy.contains("Last name can't be blank").should('exist')
      cy.contains('Email has already been taken').should('exist')
      cy.contains('Password is too short (minimum is 8 characters)').should('exist')
    })
  })
})