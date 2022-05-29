let dictonaryList = {}

let words = {
    engWords: ["Apple","Tree"],
    rusWords: ["Яблоко","Дерево"]
}

let wordNumber = 0
let maxWordNumber = 0

let isEnglish = true

let wordsOrder = ["engWords","rusWords"]

const importDictonary = document.getElementById("importDictonary");
const csvFile = document.getElementById("csvFile");

importDictonary.addEventListener("submit", function (e) {
    e.preventDefault();
    const input = csvFile.files[0];
    const reader = new FileReader();

    if (input === undefined){
        return
    }

    reader.onload = function (e) {
        const text = e.target.result;
        const data = csvToArray(text);
        dictonaryList[input.name] ={
            data: JSON.stringify(data)
        }
        console.log(dictonaryList)
    };

    reader.readAsText(input);
});

function csvToArray(str, delimiter = ",") {
    str = str.replace(/\r/g,"");
    const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");
    const arr = rows.map(function (row) {
        const values = row.split(delimiter);
        const el = headers.reduce(function (object, header, index) {
            object[header] = values[index];
            return object;
        }, {});
        return el;
    });

    let dictonary = {
        engWords: [],
        rusWords: []
    }

    arr.forEach((element, index) => {
        if (element["eng"] == null){dictonary.engWords.push("[ Слово отсуствует ]")}
        else { dictonary.engWords.push(element["eng"]) }
        if (element["rus"] == null){dictonary.rusWords.push("[ Слово отсуствует ]")}
        else { dictonary.rusWords.push(element["rus"]) }
    })

    return dictonary
}

window.updateWords = function (){
    console.log(words)

    document.getElementById("firstWord").innerHTML = words[wordsOrder[0]][wordNumber]
    document.getElementById("secondWord").innerHTML = "?"
}

window.changeWord = function (isNext){
    if (words.engWords.length === 0  || words.rusWords.length === 0) return

    maxWordNumber = words.engWords.length - 1

    if (isNext && wordNumber < maxWordNumber) wordNumber ++
    if (!isNext && wordNumber > 0) wordNumber --

    updateWords()

    document.getElementById("wordsCount").innerHTML = `${wordNumber+1}/${maxWordNumber+1}`
}

window.showTranslate = function (){
    document.getElementById("secondWord").innerHTML = words[wordsOrder[1]][wordNumber]
}

window.changeLanguage = function (){
    if (isEnglish){
        isEnglish = false
        wordsOrder = ["rusWords","engWords"]
    } else {
        isEnglish = true
        wordsOrder = ["engWords","rusWords"]
    }

    updateWords()
}

window.changeDictonary = function (index){

    console.log(dictonaryList[Object.keys(dictonaryList)[index]])
    console.log(JSON.parse(dictonaryList[Object.keys(dictonaryList)[index]].data))

    words = {
        rusWords: JSON.parse(dictonaryList[Object.keys(dictonaryList)[index]].data).rusWords,
        engWords: JSON.parse(dictonaryList[Object.keys(dictonaryList)[index]].data).engWords
    }

    updateWords()

    wordNumber = 0
    maxWordNumber = words.engWords.length - 1
    document.getElementById("wordsCount").innerHTML = `${wordNumber+1}/${maxWordNumber+1}`
    document.getElementById("dictonaryInfo").innerHTML = `Используется словарь: ${Object.keys(dictonaryList)[index]} (Кол-во слов: ${maxWordNumber+1})`
}

window.exportList = function (){
    let exportButtonList = []

    Object.keys(dictonaryList).forEach((element, index) => {
        exportButtonList.push(`<button type="button" class="list-group-item list-group-item-action" data-bs-dismiss="modal" onclick="changeDictonary(${index})">${element}</button>`)
    })

    console.log(exportButtonList)
    document.getElementById("exportList").innerHTML = exportButtonList.join(' ')
}
