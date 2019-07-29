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
import $ from 'jquery'

Cypress.Commands.add('cleanDatabase', (opts = { seed: false }) => {
  return $.ajax({
    type: "POST",
    url: "http://localhost:3001/test/clean_database"
    // data: { should_seed: opts.seed }
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
  cy.visit('/signup')

  // TODO: setup redux state instead of ui login
  cy.get("[data-cy=signUp-firstName]").type('Drew')
  cy.get("[data-cy=signUp-lastName]").type('Rodrigues')
  cy.get("[data-cy=signUp-email]").type('drew@tripmates.io')
  cy.get("[data-cy=signUp-password]").type('password')

  cy.contains('Create your account').click()
})