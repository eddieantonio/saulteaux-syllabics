describe('Basic usage', () => {
  it('converts SRO to syllabics', () => {
    cy.visit('http://localhost:1234')
    cy.get('#sro').type('aaniin, pooshoo!')
    cy.get('#syl').should('have.value', 'ᐋᓃᐣ, ᐴᔔ!')
  })

  it('converts Syllabics to SRO', () => {
    cy.visit('http://localhost:1234')
    cy.get('#syl').type('ᐋᓃᐣ, ᐴᔔ!')
    cy.get('#sro').should('have.value', 'ānīn, pōšō!')
  })
})

describe('Text substitutions', () => {
  it('can be disabled', () => {
    cy.visit('http://localhost:1234')
    cy.get('#settings').click()
    cy.get('[data-cy=option-substitutions]').click()

    cy.get('#sro').type('aaniin, pooshoo!')
    // This is invalid SRO, so it will not be converted:
    cy.get('#syl').should('have.value', 'aaniin, pooshoo!')
  })

  it('sets the cursor position in the right place', () => {
    cy.visit('http://localhost:1234')
    cy.get('#sro').type('anin, pōs!{moveToStart}{rightArrow}a{rightArrow}i{moveToEnd}{leftArrow}hoo')
    cy.get('#sro').should('have.value', 'ānīn, pōšō!')
  })
})
