describe('Basic functionality', function () {
  const NNBSP = '\u202f';

  before(function () {
    // The service worker makes things sad :(
    cy.unregisterServiceWorkers()
  })

  it('transcribes SRO to syllabics', function () {
    cy.visit('/');

    cy.get('textarea#sro')
      .clear()
      .type("Ahpī kā-mōškahank ahki šikwa ānīn Nēnapohš kā-iši-kīhtwāmi-ošihtōt");

    cy.get('textarea#syl')
      .invoke('val')
      .should('equal',
      `ᐊᐦᐲ ᑳ${NNBSP}ᒨᐡᑲᐦᐊᐣᐠ ᐊᐦᑭ ᔑᑿ ᐋᓃᐣ ᓀᓇᐳᐦᐡ ᑳ${NNBSP}ᐃᔑ${NNBSP}ᑮᐦᑤᒥ${NNBSP}ᐅᔑᐦᑑᐟ`);
  });

  it.skip('transcribes syllabics to SRO', function () {
    cy.visit('/');

    cy.get('textarea#syl')
      .clear()
      .type('ᑲᐦᑭᔭᐤ ᑮᑿᕀ ᐚᐦᑰᐦᑐᐘᐠ᙮');

    cy.get('textarea#sro')
      .invoke('val')
      .should('equal', 'kahkiyaw kîkway wâhkôhtowak.');
  });

  it.skip('allows for SRO transcription without clearing the textarea', function () {
    cy.visit('/');

    cy.get('textarea#sro')
      .click()
      .type("tapwe, miyo-kîsikâw anohc.");

    cy.get('textarea#syl')
      .invoke('val')
      .should('equal', `ᑕᐻ, ᒥᔪ${NNBSP}ᑮᓯᑳᐤ ᐊᓄᐦᐨ᙮`);
  });

  it.skip('allows for syllabics transcription without clearing the textarea', function () {
    cy.visit('/');

    cy.get('textarea#syl')
      .clear()
      .type('ᑲᐦᑭᔭᐤ ᑮᑿᕀ ᐚᐦᑰᐦᑐᐘᐠ᙮');

    cy.get('textarea#sro')
      .invoke('val')
      .should('equal', 'kahkiyaw kîkway wâhkôhtowak.');
  });

  describe.skip("hk finals", function () {
    const sroInput = "Maskwaciisihk";

    it.skip('supports ᕽ-style finals', function () {
      cy.visit('/');

      // Enable the ᕽ setting
      cy.get('[data-cy="settings-drop-down"]')
        .click();
      cy.get('[data-cy="option-final-x"]')
        .should("be.visible")
        .click();

      cy.get('textarea#sro')
        .clear()
        .type(sroInput);

      cy.get('textarea#syl')
        .invoke('val')
        .should('not.equal', 'ᒪᐢᑿᒌᓯᐦᐠ')
        .should('equal', 'ᒪᐢᑿᒌᓯᕽ');
    });

    it.skip('supports ᐦᐠ-style finals', function () {
      cy.visit('/');

      // Enable the ᕽ setting
      cy.get('[data-cy="settings-drop-down"]')
        .click();
      cy.get('[data-cy="option-final-hk"]')
        .should("be.visible")
        .click();

      cy.get('textarea#sro')
        .clear()
        .type(sroInput);

      cy.get('textarea#syl')
        .invoke('val')
        .should('not.equal', 'ᒪᐢᑿᒌᓯᕽ')
        .should('equal', 'ᒪᐢᑿᒌᓯᐦᐠ');
    });
  });
});
