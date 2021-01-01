const base_tones = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];
const scales = {
  "Ionian": [1, 3, 5, 6, 8, 10, 12],
  "Dorian (b3, b7)": [1, 3, 4, 6, 8, 10, 11],
  "Phrygian (b2, b3, b6, b7)": [1, 2, 4, 6, 8, 9, 11],
  "Lydian (#4)": [1, 3, 5, 7, 8, 10, 12],
  "Mixolydian (b7)": [1, 3, 5, 6, 8, 10, 11],
  "Aeolian (b3, b6, b7)": [1, 3, 4, 6, 8, 9, 11],
  "Locrian (b2, b3, b5, b6, b7)": [1, 2, 4, 6, 7, 9, 11],
  "Melodic Minor (b3)": [1, 3, 4, 6, 8, 10, 12],
  "Dorian b2 (b2, b3, b7)": [1, 2, 4, 6, 8, 10, 11],
  "Lydian Aug. (#4, #5)": [1, 3, 5, 7, 9, 10, 12],
  "Mixolydian #11 (#4, b7)": [1, 3, 5, 7, 8, 10, 11],
  "Mixolydian b6 (b6, b7)": [1, 3, 5, 6, 8, 9, 11],
  "Locrian Nat.9 (b3, b5, b6, b7)": [1, 3, 4, 6, 7, 9, 11],
  "Altered Dominant (b2, b3, b4, b5, b6, b7)": [1, 2, 4, 5, 6, 9, 11],
  "Harmonic Minor (b3, b6)": [1, 3, 4, 6, 8, 9, 12],
  "Locrian Nat.6 (b2, b3, b5, b7)": [1, 2, 4, 6, 7, 10, 11],
  "Ionian Aug. (#5)": [1, 3, 5, 6, 9, 10, 12],
  "Dorian #4 (b3, #4, b7)": [1, 3, 4, 7, 8, 10, 11],
  "Phrygian Major (b2, b6, b7)": [1, 2, 4, 6, 8, 9, 11],
  "Lydian #9 (#2, #4)": [1, 4, 5, 7, 8, 10, 12],
  "Altered Dominant bb7 (b2, b3, b4, b5, b6, bb7)": [1, 2, 4, 5, 7, 8, 9, 10],
};

let checker = (arr, target) => target.every((v) => arr.includes(v));

function findRelatedScales() {
  var notes = getNotes();
  var tonesArr = organizeTones(notes);

  var numbersArr = findRelativeNumbers(tonesArr, notes);

  var matches = findMatches(numbersArr, tonesArr);

  var output = format(matches);

  $("#result").html(output);
}

function organizeTones(notes) {
  var tonesArr = [];

  for (var i = 0; i < base_tones.length; ++i) {
    var firstNote = base_tones[i];
    var start = base_tones.slice(base_tones.indexOf(firstNote));
    var end = base_tones.slice(0, base_tones.indexOf(firstNote));
    tones = start.concat(end);
    tonesArr.push(tones);
  }

  //   for (var i = 0; i < notes.length; ++i) {
  //     var firstNote = notes[i];
  //     var start = base_tones.slice(base_tones.indexOf(firstNote));
  //     var end = base_tones.slice(0, base_tones.indexOf(firstNote));
  //     tones = start.concat(end);
  //     tonesArr.push(tones);
  //   }

  return tonesArr;
}

function findRelativeNumbers(tonesArr, notes) {
  var relativeNumbers = [];

  for (var i = 0; i < tonesArr.length; ++i) {
    var numbers = [];
    for (var j = 0; j < notes.length; ++j) {
      numbers.push(tonesArr[i].indexOf(notes[j]) + 1);
    }
    relativeNumbers.push(numbers);
  }

  return relativeNumbers;
}

function findMatches(numbersArr, tonesArr) {
  var matches = [];

  for (var i = 0; i < numbersArr.length; ++i) {
    for (var key in scales) {
      if (checker(scales[key], numbersArr[i])) {
        matches.push([key, numbersArr[i], tonesArr[i], scales[key]]);
      }
    }
  }

  return matches;
}

function format(matches) {
  var output =
    '<table class="table table-fixed border-green-700 justify-center"><tr><th>Mode</th><th>Notes</th></tr>';

  for (var i = 0; i < matches.length; ++i) {
    output += "<tr>";
    output +=
      "<td>" +
      matches[i][2][0].toUpperCase() +
      " " +
      matches[i][0] +
      "</td><td>" +
      printScale(matches[i][1], matches[i][2], matches[i][3]) +
      "</td>";
    output += "</tr>";
  }

  output += "</table>";

  return output;
}

function printScale(targets, scale, mode) {
  var output = "";

  for (var i = 0; i < mode.length; ++i) {
    var flavor = "";
    if ([1, 2, 5].includes(i)) {
      flavor = "m";
    }
    if (i == 6) {
      flavor = "dim7";
    }
    if (targets.includes(mode[i])) {
      output += "<b>" + scale[mode[i] - 1] + flavor + "</b> ";
    } else {
      output += scale[mode[i] - 1] + flavor + " ";
    }
  }

  return output;
}

