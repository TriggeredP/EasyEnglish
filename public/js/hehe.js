/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!******************************!*\
  !*** ./resources/js/hehe.js ***!
  \******************************/
var dictonaryList = {};
var words = {
  engWords: ["Apple", "Tree"],
  rusWords: ["Яблоко", "Дерево"]
};
var wordNumber = 0;
var maxWordNumber = 0;
var isEnglish = true;
var wordsOrder = ["engWords", "rusWords"];
var importDictonary = document.getElementById("importDictonary");
var csvFile = document.getElementById("csvFile");
importDictonary.addEventListener("submit", function (e) {
  e.preventDefault();
  var input = csvFile.files[0];
  var reader = new FileReader();

  if (input === undefined) {
    return;
  }

  reader.onload = function (e) {
    var text = e.target.result;
    var data = csvToArray(text);
    dictonaryList[input.name] = {
      data: JSON.stringify(data)
    };
    console.log(dictonaryList);
  };

  reader.readAsText(input);
});

function csvToArray(str) {
  var delimiter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ",";
  str = str.replace(/\r/g, "");
  var headers = str.slice(0, str.indexOf("\n")).split(delimiter);
  var rows = str.slice(str.indexOf("\n") + 1).split("\n");
  var arr = rows.map(function (row) {
    var values = row.split(delimiter);
    var el = headers.reduce(function (object, header, index) {
      object[header] = values[index];
      return object;
    }, {});
    return el;
  });
  var dictonary = {
    engWords: [],
    rusWords: []
  };
  arr.forEach(function (element, index) {
    if (element["eng"] == null) {
      dictonary.engWords.push("[ Слово отсуствует ]");
    } else {
      dictonary.engWords.push(element["eng"]);
    }

    if (element["rus"] == null) {
      dictonary.rusWords.push("[ Слово отсуствует ]");
    } else {
      dictonary.rusWords.push(element["rus"]);
    }
  });
  return dictonary;
}

window.updateWords = function () {
  console.log(words);
  document.getElementById("firstWord").innerHTML = words[wordsOrder[0]][wordNumber];
  document.getElementById("secondWord").innerHTML = "?";
};

window.changeWord = function (isNext) {
  if (words.engWords.length === 0 || words.rusWords.length === 0) return;
  maxWordNumber = words.engWords.length - 1;
  if (isNext && wordNumber < maxWordNumber) wordNumber++;
  if (!isNext && wordNumber > 0) wordNumber--;
  updateWords();
  document.getElementById("wordsCount").innerHTML = "".concat(wordNumber + 1, "/").concat(maxWordNumber + 1);
};

window.showTranslate = function () {
  document.getElementById("secondWord").innerHTML = words[wordsOrder[1]][wordNumber];
};

window.changeLanguage = function () {
  if (isEnglish) {
    isEnglish = false;
    wordsOrder = ["rusWords", "engWords"];
  } else {
    isEnglish = true;
    wordsOrder = ["engWords", "rusWords"];
  }

  updateWords();
};

window.changeDictonary = function (index) {
  console.log(dictonaryList[Object.keys(dictonaryList)[index]]);
  console.log(JSON.parse(dictonaryList[Object.keys(dictonaryList)[index]].data));
  words = {
    rusWords: JSON.parse(dictonaryList[Object.keys(dictonaryList)[index]].data).rusWords,
    engWords: JSON.parse(dictonaryList[Object.keys(dictonaryList)[index]].data).engWords
  };
  updateWords();
  wordNumber = 0;
  maxWordNumber = words.engWords.length - 1;
  document.getElementById("wordsCount").innerHTML = "".concat(wordNumber + 1, "/").concat(maxWordNumber + 1);
  document.getElementById("dictonaryInfo").innerHTML = "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0441\u044F \u0441\u043B\u043E\u0432\u0430\u0440\u044C: ".concat(Object.keys(dictonaryList)[index], " (\u041A\u043E\u043B-\u0432\u043E \u0441\u043B\u043E\u0432: ").concat(maxWordNumber + 1, ")");
};

window.exportList = function () {
  var exportButtonList = [];
  Object.keys(dictonaryList).forEach(function (element, index) {
    exportButtonList.push("<button type=\"button\" class=\"list-group-item list-group-item-action\" data-bs-dismiss=\"modal\" onclick=\"changeDictonary(".concat(index, ")\">").concat(element, "</button>"));
  });
  console.log(exportButtonList);
  document.getElementById("exportList").innerHTML = exportButtonList.join(' ');
};
/******/ })()
;