describe('Trips', () => {
  beforeEach(() => {
    cy.loginUser()
    cy.contains('Add Trip').click()
  })

  it.skip("won't allow incorrect dates", () => {
    // TODO: make unit test
  })

  context('with valid data', () => {
    context('and photo provided', () => {
      it('creates the trip', () => {
        cy.contains('[data-cy=tripInput-title]').type('title')
        cy.contains('[data-cy=tripInput-location]').type('location')
        cy.contains('[data-cy=tripInput-startDate]').type('')
        cy.contains('[data-cy=tripInput-endDate]').type('')
        cy.uploadPhoto('[data-cy=tripInput-photo]', 'coverPhoto.jpeg')
        cy.contains('[data-cy=tripInput-spaces-unlimited]').click()
        cy.contains('[data-cy=tripInput-privacy-visible]').click()
        cy.contains('Create').click()
      })
    })

    context('and photo not provided', () => {
      it.skip('creates the trip', () => {
        
      })
    })
  })


  context('with invalid data', () => {
    it.skip('shows errors', () => {
      
    })
  })
})