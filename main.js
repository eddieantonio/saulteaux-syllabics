/*!
 * Copyright (C) 2018–2026 Eddie Antonio Santos <hello@eddieantonio.ca>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import SaulteauxSyllabics from './src/saulteaux-syllabics.js';

globalThis.CONVERTER_VERSION = SaulteauxSyllabics.version.toString();

let dirty = null;
document.addEventListener('DOMContentLoaded', function () {
  const sroBox = document.getElementById('sro');
  const sylBox = document.getElementById('syl');
  const doubledVowelCheckbox = document.getElementsByName('double-vowels')[0];

  let previousSROText = sroBox.value;

  // Convert "dirty" changes soon as the page is loaded.
  if (dirty == 'sro') {
    sendSRO();
  } else if (dirty == 'syl') {
    sendSyllabics();
  }

  // Add a long vowel when double-pressing a vowel.
  sroBox.addEventListener('input', function (event) {
    const newSROText = sroBox.value;
    let differentAt;
    let addedChar;
    let commonPrefix;
    let newString;

    // Obey settings on whether it should change.
    if (!doubledVowelCheckbox.checked) {
      return;
    }

    // Check if exactly one character has been ADDED.
    // Only then can we check whether we want a long vowel.
    if (newSROText.length === previousSROText.length + 1) {
      differentAt = whereDiffer(previousSROText, newSROText);
      console.assert(newSROText.substr(0, differentAt) ===
                     previousSROText.substr(0, differentAt));
      commonPrefix = previousSROText.substr(0, differentAt);
      addedChar = newSROText[differentAt];

      // Check if a vowel has been doubled.
      if (isSROShortVowel(addedChar) && lastCharOf(commonPrefix) === addedChar) {
        // Pretend we never typed the second vowel; instead, add the long
        // vowel to the buffer.
        event.preventDefault();
        // Construct new string by chopping off the short vowel from the
        // common prefix, and chopping off the end of the previous buffer.
        newString = commonPrefix.substr(0, commonPrefix.length - 1)
          + longVowelOf(addedChar)
          + previousSROText.substr(differentAt);
        previousSROText = event.target.value = newString;
        return;
      }
    }

    previousSROText = newSROText;
  });

  function lastCharOf(string) {
    return string[string.length - 1];
  }

  function whereDiffer(prev, current) {
    let i;
    console.assert(prev.length + 1 === current.length);
    for (i = 0; i < prev.length; i++) {
      if (prev[i] !== current[i]) {
        return i;
      }
    }
    // They must differ at the last position!
    return i;
  }

  // Send the appropriate request when the user types or pastes into the SRO
  // or syllabics boxes, respectively.
  sroBox.addEventListener('input', sendSROFromEvent);
  sylBox.addEventListener('input', sendSyllabicsFromEvent);

  // Change the values when the /#!hash changes.
  globalThis.onhashchange = function () {
    let settingsBox;
    // Open the settings box if navigated to.
    if (location.hash === '#settings') {
      settingsBox = document.getElementById('settings');
      settingsBox.open = true;
    }

    const pairs = parseFragment();
    updateBoxes(pairs);
    if ('sro' in pairs) {
      sendSRO();
    } else if ('syl' in pairs) {
      sendSyllabics();
    }
  };

  function updateBoxes(data) {
    if (data.sro)
      sroBox.value = data.sro;
    if (data.syl)
      sylBox.value = data.syl;
  }

  function sendSRO() {
    send({
      syl: SaulteauxSyllabics.sro2syllabics(sroBox.value)
    });
  }

  function sendSyllabics() {
    const sro = SaulteauxSyllabics.syllabics2sro(sylBox.value);
    send({ sro: sro });
  }

  function send(message) {
    updateBoxes(message);
  }

  // Return the long version of a short vowel.
  function longVowelOf(vowel) {
    const latinVowels = 'eioa';

    const index = latinVowels.indexOf(vowel);
    if (index < 0) {
      throw new RangeError('Invalid long vowel: ' + vowel);
    }

    const accentedVowels = 'ēīōā';
    return accentedVowels[index];
  }

  function isSROShortVowel(letter) {
    return letter === 'e' || letter === 'i' || letter === 'o' || letter === 'a';
  }

  /**
   * Event hanlders that ignores the event
   */
  function sendSROFromEvent(/* ignored: event */) {
    sendSRO();
  }

  /**
   * Event hanlders that ignores the event
   */
  function sendSyllabicsFromEvent(/* ignored: event */) {
    sendSyllabics();
  }
});

// TODO: this is dead code; it assumes the script will load as a render-blocking resource,
// but this is no longer the case. need to update this to work with module-style scripts.
globalThis.getDefaultTextareaValue = function (name) {
  const textarea = document.getElementById(name);

  if (name != 'sro' && name != 'syl') {
    return;
  }

  const fragment = parseFragment();
  if (fragment[name]) {
    dirty = name;
    textarea.value = fragment[name];
  }
};

function parseFragment() {
  const fragment = location.hash;
  const pairsText = fragment.split('!', 2)[1];
  if (!pairsText) {
    return {};
  }

  const pairs = {};
  pairsText.split(';').forEach(function (pair) {
    const _pair = pair.split(':', 2), key = _pair[0], value = _pair[1];
    pairs[key] = decodeURIComponent(value);
  });

  return pairs;
}
