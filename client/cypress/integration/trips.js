import {
  tripTitleInput,
  tripLocationInput,
  tripStartDateInput,
  tripEndDateInput,
  tripPhotoInput,
  tripUnlimitedSpacesButton,
  tripVisiblePrivacyButton
} from '../support/fields'

describe('Trips', () => {
  beforeEach(() => {
    cy.loginUser()
    cy.contains('Add Trip').click()
  })

  describe('create', () => {
    context('with valid data', () => {
      context('and photo provided', () => {
        it('creates the trip', () => {
          cy.get(tripTitleInput).type('title')
          cy.get(tripLocationInput).type('location')
          cy.get(tripStartDateInput).type('2020-01-01')
          cy.get(tripEndDateInput).type('2020-01-01')
          cy.uploadPhoto(tripPhotoInput, 'coverPhoto.jpeg')
          cy.get(tripUnlimitedSpacesButton).click()
          cy.get(tripVisiblePrivacyButton).click()
          cy.contains('Create').click()
          cy.contains('Edit').should('exist')
        })
      })

      context('and photo not provided', () => {
        it('creates the trip', () => {
          cy.get(tripTitleInput).type('title')
          cy.get(tripLocationInput).type('location')
          cy.get(tripStartDateInput).type('2020-01-01')
          cy.get(tripEndDateInput).type('2020-01-01')
          cy.get(tripUnlimitedSpacesButton).click()
          cy.get(tripVisiblePrivacyButton).click()
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
        cy.get(tripTitleInput).clear().type(updatedTitle)
        cy.contains('Update').click()

        cy.contains(updatedTitle).should('exist')
      });
    })

    context('with invalid data', () => {
      it('shows errors', () => {
        cy.addTrip()

        cy.contains('Edit').click()
        cy.get(tripTitleInput).clear()
        cy.contains('Update').click()

        cy.contains("Title can't be blank").should('exist')
      });
    })
  });

  describe('delete', () => {
    context('when delete clicked', () => {
      it('deletes the trip', () => {
        const tripTitle = "Some trip title"
        cy.get(tripTitleInput).type(tripTitle)
        cy.get(tripLocationInput).type('location')
        cy.contains('Create').click()
        cy.contains('Edit').click()
        cy.contains('Delete').click()
        cy.contains('Add Trip').should('exist')
        cy.contains(tripTitle).should('not.exist')
      })
    })
  });
})