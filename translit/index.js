const translitBase = [
    {ru: "а", en: "a"},
    {ru: "б", en: "b"},
    {ru: "в", en: "v"},
    {ru: "г", en: "g"},
    {ru: "д", en: "d"},
    {ru: "е", en: "e"},
    {ru: "ё", en: "yo"},
    {ru: "ж", en: "zh"},
    {ru: "з", en: "z"},
    {ru: "и", en: "i"},
    {ru: "й", en: "j"},
    {ru: "к", en: "k"},
    {ru: "л", en: "l"},
    {ru: "м", en: "m"},
    {ru: "н", en: "n"},
    {ru: "о", en: "o"},
    {ru: "п", en: "p"},
    {ru: "р", en: "r"},
    {ru: "с", en: "s"},
    {ru: "т", en: "t"},
    {ru: "у", en: "u"},
    {ru: "ф", en: "f"},
    {ru: "х", en: "kh"},
    {ru: "ц", en: "c"},
    {ru: "ч", en: "ch"},
    {ru: "ш", en: "sh"},
    {ru: "щ", en: "shh"},
    {ru: "ь", en: ""},
    {ru: "ъ", en: ""},
    {ru: "э", en: "e"},
    {ru: "ы", en: "y"},
    {ru: "ю", en: "yu"},
    {ru: "я", en: "ya"},
]

const inputElem = document.querySelector('#input');
const outputElem = document.querySelector('#output');
const clearButton = document.querySelector('.clear-button');
const copyButton = document.querySelector('.copy-button');

function translitText() {
    const result = this.value.split('').map(letter => {
        const index = translitBase.findIndex(element => element.ru === letter.toLowerCase());
        if (letter.match(/[А-Я]/)) {
            return letter = translitBase[index].en.toUpperCase();
        }
        if (letter.match(/[а-я]/)) {
            return letter = translitBase[index].en;
        }
        return letter;
    });
    outputElem.textContent = result.join("");
}
function clearResult() {
    if (inputElem.value.length > 0) {
        inputElem.value = "";
        outputElem.textContent = "";
    }
}
function showCopiedText() {
    const copiedText = document.createElement('span');
    copiedText.classList.add('copied-text');
    copiedText.innerText = "текст скопирован";
    document.body.append(copiedText);
    copiedText.style.top = `${copyButton.getBoundingClientRect().top - copiedText.getBoundingClientRect().height - 5}px`;
    copiedText.style.left = `${copyButton.getBoundingClientRect().left - ((copiedText.getBoundingClientRect().width - copyButton.getBoundingClientRect().width) / 2)}px`;
}
function removeCopiedText() {
    const copiedText = document.querySelector('.copied-text');
    document.body.removeChild(copiedText);
}
function copyResult() {
    if (outputElem.textContent.length > 0) {
        const tempText = document.createElement('textarea');
        tempText.value = outputElem.textContent;
        document.body.appendChild(tempText);
        tempText.select();
        document.execCommand('copy');
        document.body.removeChild(tempText);
        showCopiedText();
        setTimeout(removeCopiedText, 200);
    }
}

inputElem.addEventListener('input', translitText);
clearButton.addEventListener('click', clearResult);
copyButton.addEventListener('click', copyResult);