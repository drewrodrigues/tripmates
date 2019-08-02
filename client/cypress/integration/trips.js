const titleInput = "[data-cy=tripInput-title]"
const locationInput = "[data-cy=tripInput-location]"
const startDateInput = "[data-cy=tripInput-startDate]"
const endDateInput = "[data-cy=tripInput-endDate]"
const photoInput = '[data-cy=tripInput-photo]'
const unlimitedSpacesButton = "[data-cy=tripInput-spaces-unlimited]"
const visiblePrivacyButton = "[data-cy=tripInput-privacy-visible]"

describe('Trips', () => {
  beforeEach(() => {
    cy.loginUser()
    cy.contains('Add Trip').click()
  })

  describe('create', () => {
    context('with valid data', () => {
      context('and photo provided', () => {
        it('creates the trip', () => {
          cy.get(titleInput).type('title')
          cy.get(locationInput).type('location')
          cy.get(startDateInput).type('2020-01-01')
          cy.get(endDateInput).type('2020-01-01')
          cy.uploadPhoto(photoInput, 'coverPhoto.jpeg')
          cy.get(unlimitedSpacesButton).click()
          cy.get(visiblePrivacyButton).click()
          cy.contains('Create').click()
          cy.contains('Edit').should('exist')
        })
      })

      context('and photo not provided', () => {
        it('creates the trip', () => {
          cy.get(titleInput).type('title')
          cy.get(locationInput).type('location')
          cy.get(startDateInput).type('2020-01-01')
          cy.get(endDateInput).type('2020-01-01')
          cy.get(unlimitedSpacesButton).click()
          cy.get(visiblePrivacyButton).click()
          cy.contains('Create').click()
          cy.contains('Edit').should('exist')
        })
      })
    })

    context('with invalid data', () => {
      it('shows errors', () => {
        cy.contains('Create').click()
        cy.contains("Title can't be blank").should('exist')
        cy.contains("Location can't be blank").should('exist')
      })
    })
  })

  describe('update', () => {
    context('with valid data', () => {
      it('updates the trip', () => {
        cy.addTrip()

        const updatedTitle = "Updated Title"
        cy.contains('Edit').click()
        cy.get(titleInput).clear().type(updatedTitle)
        cy.contains('Update').click()

        cy.contains(updatedTitle).should('exist')
      });
    })

    context('with invalid data', () => {
      it('shows errors', () => {
        cy.addTrip()

        cy.contains('Edit').click()
        cy.get(titleInput).clear()
        cy.contains('Update').click()

        cy.contains("Title can't be blank").should('exist')
      });
    })
  });

  describe('delete', () => {
    context('when delete clicked', () => {
      it('deletes the trip', () => {
        const tripTitle = "Some trip title"
        cy.get(titleInput).type(tripTitle)
        cy.get(locationInput).type('location')
        cy.contains('Create').click()
        cy.contains('Edit').click()
        cy.contains('Delete').click()
        cy.contains('Add Trip').should('exist')
        cy.contains(tripTitle).should('not.exist')
      })
    })
  });
})