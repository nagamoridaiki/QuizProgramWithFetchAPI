const button = document.getElementById('button')
title = document.getElementById('title');
question = document.getElementById('question');
list = document.getElementById('list');
generate = document.getElementById('generate');
let categories = [];
let difficulties = [];
let questionArray = [];
let correctAnswerArray = [];
let incorrectAnswerArray = [];
let numberOfAnswers = 0;
let numberOfCorrectAnswers = 0;
let questionNumber = 0;

button.addEventListener('click', ()=>{
    url = "https://opentdb.com/api.php?amount=10";
    let results = Array();
    //通信中の処理
    title.innerHTML = '取得中';
    question.innerHTML = '少々お待ちください';
    button.style.visibility = "hidden"

    fetch(url)
    .then(response => response.json())
    .then(data => {
        results = data.results;
        for (let i = 0 ; i < results.length ; i++) {
            questionArray.push(results[i]['question']);
            correctAnswerArray.push(results[i]['correct_answer']);
            incorrectAnswerArray.push(results[i]['incorrect_answers']);
            categories.push(results[i]['category']);
            difficulties.push(results[i]['difficulty']);
        }
        console.log("questionArray", questionArray);
        console.log("correctAnswerArray", correctAnswerArray);
        console.log("incorrectAnswerArray", incorrectAnswerArray);
        console.log("categories", categories);
        console.log("difficulties", difficulties);

        titleNumber = questionNumber + 1;
        title.innerHTML = '問題' + titleNumber
        generate.innerHTML = 
        '<h4>' + '[ジャンル] ' + categories[questionNumber] + '</h4>' +
        '<h4>' + '[難易度] ' + difficulties[questionNumber] + '</h4>'
        question.innerHTML = questionArray[questionNumber];
        




        
    })
    .catch((error) => {
        console.error('Error:', error);
        alert(error); 
    });

})