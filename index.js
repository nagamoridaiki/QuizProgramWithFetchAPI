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
let shuffleCoices = [];
let choices = [];
let numberOfCorrectAnswers = 0;
let questionNumber = 0;
const ALL_QUIZ_COUNT = 10;//出題問題数

//選択肢をシャッフルするため
const shuffle = ([...array]) => {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

//開始ボタン押下時の処理
button.addEventListener('click', function(e){
    url = "https://opentdb.com/api.php?amount=10";
    let results = Array();
    //通信中の処理
    title.innerHTML = '取得中';
    question.innerHTML = '少々お待ちください';
    button.style.visibility = "hidden"

    //問題データを取得
    fetch(url)
    .then(response => response.json())
    .then(data => {
        results = data.results;
        //各配列に格納する。
        results.forEach(function (result) {
            questionArray.push(result['question']);
            correctAnswerArray.push(result['correct_answer']);
            incorrectAnswerArray.push(result['incorrect_answers']);
            categories.push(result['category']);
            difficulties.push(result['difficulty']);
        })
        //Consoleで答えを確認したい時のために
        console.log("correctAnswerArray", correctAnswerArray);

        showQuiz();//クイズを画面に表示
    })
    .catch((error) => {
        console.error('Error:', error);
        alert(error); 
    });

})

//クイズを画面に表示
function showQuiz () {
    //問題番号・ジャンル・難易度・問題文をつくる。
    titleNumber = questionNumber + 1;
    title.innerHTML = '問題' + titleNumber
    generate.innerHTML = 
    '<h4>' + '[ジャンル] ' + categories[questionNumber] + '</h4>' +
    '<h4>' + '[難易度] ' + difficulties[questionNumber] + '</h4>'
    question.innerHTML = questionArray[questionNumber];

    //正解と不正解の選択肢を１つの配列に一緒に格納する。
    choices.push(correctAnswerArray[questionNumber]);
    incorrectAnswerArray[questionNumber].forEach(function (incorrectAnswer) {
        choices.push(incorrectAnswer);
    });
    //選択肢の順番をシャッフル
    shuffleCoices = shuffle(choices);

    //それぞれの選択肢ボタンをつくる。
    shuffleCoices.forEach(function (one_choice) {
        const tr = document.createElement("tr");
        tr.innerHTML = '<td>' + '<button class=answer>' + one_choice + '</button>' + '</td>';
        list.appendChild(tr);
    })

    answerBtn = document.getElementsByClassName('answer')
    for (let n = 0 ; n < answerBtn.length ; n++) {
        answerBtn[n].setAttribute("onclick", "select("+n+")");//setAtributeのidで実装できなかった
    };
}

//選択肢にアンサーしたとき
function select (n) {
    //選択が正解ならば
    if (shuffleCoices[n] === correctAnswerArray[questionNumber]) {
        numberOfCorrectAnswers += 1;
        console.log("正解")//確認用
    }else{
        console.log("不正解")//確認用
    }
    choices = [];//選択肢を空にする
    questionNumber += 1;//問題を次のステップの番号に
    list.innerHTML = "";//選択肢のレンダリングを空にする

    //問題番号が出題数を満たした場合、結果発表へ
    questionNumber === ALL_QUIZ_COUNT ? resultShow() : showQuiz ();
};

//結果発表の画面レンダリング
function resultShow () {
    title.innerHTML = 'あなたの正答数は' + numberOfCorrectAnswers + 'です！！';
    question.innerHTML = '再度チャレンジしたい場合は以下をクリック！！';
    generate.innerHTML = '';
    const btn = document.createElement("button");
    btn.innerHTML =   'ホームに戻る' ;
    list.appendChild(btn);
    
    btn.addEventListener('click', function(e){
        //はじめからやりなおす(リロード)
        window.location.reload();
    });
}
