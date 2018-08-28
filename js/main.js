// set mutiple elements event listener
let select_choice = document.getElementsByClassName("select-choice");

for (let i = 0; i < select_choice.length; i++) {
  select_choice[i].addEventListener("click", eloquenceStart, false);
}

// main function
function eloquenceStart() {
  let wordLibrary = document.querySelector("#wordLibrary").value;
  let wordNum = document.querySelector("#wordNum").value;
  let questionWrap = document.querySelector("#questionWrap");
  let questionWords = document.querySelector("#questionWords");
  let answerWords = document.querySelector("#answerWords");

  if (wordLibrary != "" && wordNum > 0) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "data.json");
    xhr.onload = function() {
      if (this.status == 200) {
        // show hidden parts
        questionWrap.style.display = "block";
        // random fetch mutiply items from array or object
        function shuffle(x) {
          for (let i = x.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [x[i], x[j]] = [x[j], x[i]];
          }
          return x;
        }
        // fetch a specific obj by the number of customer's choice and change to array, pay attention for the obj[wordLibrary] rathan than obj.wordLibrary
        let res = JSON.parse(this.responseText)[wordLibrary];

        res = shuffle(res);
        res = shuffle(res);
        res = shuffle(res);
        res = shuffle(res);
        res = shuffle(res);

        randomQuestionWords = res.slice(0, wordNum);

        randomQuestionWordsString = randomQuestionWords.toString();

        questionWords.innerText = randomQuestionWordsString;

        // increase shuffle times to reduce the repetion of questions and answers. This is a temporadry way, needs to figue out obj subtract obj method.

        res = shuffle(res);
        res = shuffle(res);
        res = shuffle(res);
        res = shuffle(res);
        res = shuffle(res);
        res = shuffle(res);
        res = shuffle(res);

        randomAnswerWords = res.slice(0, wordNum).toString();
        if (randomAnswerWords == randomQuestionWordsString) {
          randomAnswerWords = res.slice(0, wordNum).toString();
        } else {
          answerWords.innerText = randomAnswerWords;
        }

        let question = document.querySelector("#question");
        let answer = document.querySelector("#answer");
        // Incase any change of question library or words, clear the content of question and answer.
        question.value = "";
        answer.value = "";
      }
    };
    xhr.send();
  }
}
// JavaScript download standard method
function download(filename, text) {
  let element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

// Start file download.
document.getElementById("button").addEventListener(
  "click",
  function() {
    let questionWords = document.querySelector("#questionWords").innerText;
    let answerWords = document.querySelector("#answerWords").innerText;
    let question = document.querySelector("#question").value;
    let answer = document.querySelector("#answer").value;

    let text = `\r\n 您本次口才訓練的相關資料如下：\r\n\r\n 您此次練習問題的必含詞彙為：${questionWords} \r\n\r\n 您此次練習回答的必含詞彙為： ${answerWords} \r\n\r\n 您編纂的問題為：${question} \r\n\r\n 您的回答為：${answer} \r\n\r\n\r\n\r\n 太棒了，恭喜您又完成了一次思想與口才的碰撞！\r\n\r\n 每天進步多一點，期待您的再次光臨！`;

    let d = new Date();
    let file =
      "eloquence-" + d.getFullYear() + (d.getMonth() + 1) + d.getDate();
    let fileextension = ".txt";

    let filename = file + fileextension;

    download(filename, text);
  },
  false
);

/* random select one item from a array
function random_item(items) {

  return items[Math.floor(Math.random() * items.length)];

}

const items = [254, 45, 212, 365, 2543];
console.log(random_item(items));
*/
