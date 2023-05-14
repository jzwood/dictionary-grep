const WORDS = fetch("./collins_scrabble_2019.txt")
  .then((res) => res.text())
  .then((words) => words.split("\n"));

document.addEventListener("DOMContentLoaded", main);

function onLoad() {
  Array.from(document.querySelectorAll(".loading"))
    .forEach((elem) => {
      elem.classList.replace("loading", "loaded");
    });
}

function onSearch(value, words) {
  const limit = 1000
  const wordsElem = document.getElementById("words");
  let matches = ''
  try {
    const re = new RegExp(value, "i");
    const matches = words.filter((word) => re.test(word))
    const truncated = matches.length > limit
    wordsElem.textContent = matches.slice(0, limit).join("\n") + (truncated ? '\n…' : '')
  } catch (err) {
    wordsElem.textContent = ''
  }
}

async function main() {
  const words = await WORDS;
  onLoad();

  document.getElementById("search")
    .addEventListener("input", (e) => {
      const value = e.target.value.replaceAll(/\s/g, '')
      e.target.value = value
      onSearch(value, words)
    });
}
