// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import 'cypress-file-upload'
import axios from 'axios'
import {
  newUserUrl,
  newUserFirstNameInput,
  newUserLastNameInput,
  newUserEmailInput,
  newUserPasswordInput,
  newUserSubmitText,
  userFirstName,
  userLastName,
  userEmail,
  userPassword,
  tripTitleInput,
  tripLocationInput,
  tripDateRangeInput,
  tripPhotoInput,
  tripUnlimitedSpacesButton,
  tripVisiblePrivacyButton,
} from "./fields"

Cypress.Commands.add('cleanDatabase', () => {
  return axios({
    method: "POST",
    url: "http://localhost:3001/test/clean_database"
  })
  .then(res => console.log(res))
  .catch(err => console.log(err))
})

Cypress.Commands.add('seedDatabase', () => {
  return axios({
    method: "POST",
    url: "http://localhost:3001/test/seed_database"
  })
  .then(res => console.log(res))
  .catch(err => console.log(err))
})

Cypress.Commands.add('cleanLocalStorage', () => {
  localStorage.removeItem('session')
})

Cypress.Commands.add('uploadPhoto', (selector, fixture) => {
  cy.fixture(fixture, 'base64').then(fileContent => {
    cy.get(selector).upload(
      {fileContent, fileName: fixture, mimeType: 'image/jpeg'},
      {subjectType: 'input'}
    )
  })
})

Cypress.Commands.add('loginUser', () => {
  console.log(newUserUrl)
  cy.visit(newUserUrl)

  cy.get(newUserFirstNameInput).type(userFirstName)
  cy.get(newUserLastNameInput).type(userLastName)
  cy.get(newUserEmailInput).type(userEmail)
  cy.get(newUserPasswordInput).type(userPassword)

  cy.contains(newUserSubmitText).click()
})

Cypress.Commands.add('addTrip', () => {
  cy.get(tripTitleInput).type('title')
  cy.get(tripLocationInput).type('location')
  cy.get(tripDateRangeInput).first().click()
  cy.contains('22').click()
  cy.contains('23').click()
  cy.uploadPhoto(tripPhotoInput, 'coverPhoto.jpeg')
  cy.get(tripUnlimitedSpacesButton).click()
  cy.get(tripVisiblePrivacyButton).click()
  cy.contains('Create').click()
})