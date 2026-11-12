// Ava unit tests
import test from 'ava';

import SaulteauxSyllabics from './src/saulteaux-syllabics.js';
const { sro2syllabics, syllabics2sro } = SaulteauxSyllabics;

const COMBINING_MACRON = '\u0304'

/* Create automatic titles for some test cases. */
const createMacroTitle = (operator) => (comment, a, b) =>
  `“${a}” ${operator} “${b}”` + (comment ? ` (${comment})` : '')
convertSemiRoundTrip.title = createMacroTitle('↔')
convertRoundTrip.title = createMacroTitle('⇔')
convertToSyllabics.title = createMacroTitle('→')
convertToSRO.title = createMacroTitle('→')

// ////////////////////////////// TEST CASES ////////////////////////////// //

/* Basic, full word tests. */
test(convertRoundTrip, 'sīpi', 'ᓰᐱ')
test(convertRoundTrip, 'animohš', 'ᐊᓂᒧᐦᐡ')
test(convertRoundTrip, 'šwāškwāk', 'ᔤᐡᒁᐠ')
test(convertRoundTrip, 'kīhtwām', 'ᑮᐦᑤᒼ')

/* Spelling relaxation tests. */
test(convertToSyllabics, "niš'napemwin", 'ᓂᔑᓇᐯᒯᐣ')
test(convertToSyllabics, 'Anihšināpēmowin', 'ᐊᓂᐦᔑᓈᐯᒧᐏᐣ')

test('Unicode normalization using String#normalize()', t => {
  const here = 'pi';
  const wait = here + COMBINING_MACRON + 'h';

  t.not(here, wait)
  t.not(sro2syllabics(here), sro2syllabics(wait))
  t.is(sro2syllabics(here), 'ᐱ')
  t.is(sro2syllabics(wait), 'ᐲᐦ')
})

/* Test full-stop */
test('test full-stop', convertSemiRoundTrip, 'ānīn.', 'ᐋᓃᐣ᙮')

/* Test final-middle dot. */
// TODO: THESE ARE ᓀᐦᐃᔭᐍᐏᐣ AND NOT ᐊᓂᐦᔑᓈᐯᒧᐏᐣ!
test('final middle-dot', convertToSRO, 'ᐋᐧᐱ ᑭᐦᐃᐤ', 'wāpi kihiw')
test('"ᐋᐧᐱ ᑭᐦᐃᐤ" → "ᐚᐱ ᑭᐦᐃᐤ"', t => {
  t.is(sro2syllabics(syllabics2sro('ᐋᐧᐱ ᑭᐦᐃᐤ')), 'ᐚᐱ ᑭᐦᐃᐤ')
})

/* Test lookalikes */
test('lookalike: U+1466 CANADIAN SYLLABICS T', convertLookalike, 'ᒌᐦᑫᐣᑕ\u1466', 'cīhkēntam', 'ᒌᐦᑫᐣᑕᒼ')
test('lookalike: U+1541 CANADIAN SYLLABICS SAYISI YI', convertLookalike, 'ᐊᐦᑭ\u1541', 'ahkihk', 'ᐊᐦᑭᕽ')
test('lookalike: U+1429 CANADIAN SYLLABICS WEST-CREE Y', convertLookalike, 'ᑭᑕ\u1540', 'kitay', 'ᑭᑕᐩ')


/* ***************************** Test Macros ***************************** */

/**
 * Test macro that tests SRO → syllabics, syllabics → SRO,
 * SRO → syllabics → SRO, and syllabics → SRO → syllabics.
 */
function convertRoundTrip(t, sro, syllabics) {
  // Test simple conversion first.
  t.is(sro2syllabics(sro), syllabics)
  t.is(syllabics2sro(syllabics), sro)
  // Test roundtrip/inverse
  t.is(syllabics2sro(sro2syllabics(sro)), sro)
  t.is(sro2syllabics(syllabics2sro(syllabics)), syllabics)
}

/**
 * Test macro that tests SRO → syllabics and syllabics → SRO.
 * Inverses are not tested.
 */
function convertSemiRoundTrip(t, sro, syllabics) {
  t.is(sro2syllabics(sro), syllabics)
  t.is(syllabics2sro(syllabics), sro)
}

/**
 * Test macro that tests SRO → syllabics.
 */
function convertToSyllabics(t, sro, syllabics) {
  t.is(sro2syllabics(sro), syllabics)
}

/**
 * Test macro that tests SRO → syllabics.
 */
function convertToSRO(t, syllabics, sro) {
  t.is(syllabics2sro(syllabics), sro)
}

/**
 * Test macro for testing lookalike normalization
 */
function convertLookalike(t, erroneousSyllabics, sro, correctSyllabics) {
  t.not(erroneousSyllabics, correctSyllabics)
  t.is(syllabics2sro(erroneousSyllabics), sro)
  t.is(sro2syllabics(syllabics2sro(erroneousSyllabics)), correctSyllabics)
}
