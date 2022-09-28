
const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;


// push list pertanyaan kedalam array availableQuestions[];
function setAvailableQuestions(){

    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
        availableQuestions.push(quiz[i])
    }

}

// set nomor pertanyaan, pertanyaan, dan opsi
function getNewQuestion(){

// set nomor pertanyaan
    questionNumber.innerHTML = (`Pertanyaan ${questionCounter + 1} dari ${quiz.length}`);

// set list pertanyaan secara random 
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
//  pertanyaan saat ini
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;

// mengambil posisi index yang ada di dalam "questionIndex" dari array availableQuestions;
    const index1 = availableQuestions.indexOf(questionIndex);

// menghapus index "questionIndex" dari/dalam array availableQuestions;
// jadi list pertanyaan yang sama tidak akan terulang
    availableQuestions.splice(index1, 1);

// console.info(questionIndex);
// console.info(availableQuestions);

// set options
// mengambil panjang dari options
    const optionLength = currentQuestion.options.length;
// push option ke dalam availableOptions Array
    for(let i=0; i<optionLength; i++){
        availableOptions.push(i);
    }

    optionContainer.innerHTML = '';
    let animationDelay = 0.3;

// creat option in html 
    for(let i=0; i<optionLength; i++){
// random option
        const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
// mengambil posisi index dari 'availableOptions';
        index2 = availableOptions.indexOf(optionIndex);
// hapus optionIndex dari 'availableOptions', agar tidak terjadi pengulangan data option yang sama
        availableOptions.splice(index2, 1);
        
       
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optionIndex];
        option.id = optionIndex;
        option.style.animationDelay = (`${animationDelay + 's'}`);
        animationDelay = animationDelay + 0.3;
        option.className = "option";
        optionContainer.appendChild(option);
        option.setAttribute("onclick", "getResult(this)");
    }

    questionCounter ++
}

// Mengambil hasil dari jawaban (klik) sekarang
    function getResult(element){
// mengubah id dari tipedata string menjadi integer (bilangan bulat)
        const id = parseInt (element.id);
// mengambil jawaban lalu melakukan perbandingan dengan id yang di klik 
        if(id === currentQuestion.answer){
// menambahkan warna hijau untuk pilihan (option) yang benar 
            element.classList.add("correct");
// menambah indicator ketika jawaban benar
            updateAnswerIndicator("correct");
            correctAnswers++;
            


        }else{
// menambahkan warna merah untuk pilihan (option) yang salah 
            element.classList.add("wrong");
// menambah indicator ketika jawaban benar
            updateAnswerIndicator("wrong");

// jika jawaban salah, kita juga akan menampilkan jawaban yang benar dengan menambah background hijau (pada jawaban benar)
            const optionLength = optionContainer.children.length;
             for(let i=0; i<optionLength; i++){
            if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
               optionContainer.children[i].classList.add("correct");

                
               

            }

    }


        }
        attempt++;
        unclickableOptions();
}

// Membuat semua pilihan option (setelah memilih) tidak bisa di klik
// untuk mencegah user menukar pilihan / jawaban
function unclickableOptions(){

    const optionLength = optionContainer.children.length;
    for(let i=0; i<optionLength; i++){
    
     optionContainer.children[i].classList.add("already-answer");
    }


}


// indicator function
function answerIndicator(){

    answersIndicatorContainer.innerHTML='';
    const totalQuestion = quiz.length;
    
    for(let i=0; i<totalQuestion; i++){

        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);
    }


}


function  updateAnswerIndicator(markType){

    answersIndicatorContainer.children[questionCounter-1].classList.add(markType);


}



function next(){

    if(questionCounter === quiz.length){

        console.info("Kuis Berakhir");
        quizOver();
    
    }else{

        getNewQuestion();
    }

}


function quizOver(){

//sembunyikan quizBox
    quizBox.classList.add("hide");

//lalu tampilkan resultBox
    resultBox.classList.remove("hide");
    quizResult();
    
}


// mengambil hasil quiz (untuk ditampilkan)
function quizResult(){

    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
    const percentage = (correctAnswers/quiz.length)*100; 
//The toFixed() method mengubah number menjadi string
    resultBox.querySelector(".total-percentage").innerHTML = percentage.toFixed(2)+"%";
    resultBox.querySelector(".total-score").innerHTML = correctAnswers +" / "+quiz.length;

}



function resetQuiz(){

    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
}


function tryAgainQuiz(){

// menyembunyikan resultBox
    resultBox.classList.add("hide");

// lalu, memunculkan (lagi) quizBox
    quizBox.classList.remove("hide");
    resetQuiz();
    StartQuiz();

}


function backTohome(){
//menyembunyikan resultBox
    resultBox.classList.add("hide");

//lalu menampilkan homeBox
    homeBox.classList.remove("hide");
    resetQuiz();

}


// ### START POINT### //


function StartQuiz(){

// Menyembunyikan home-box
    homeBox.classList.add("hide");

//Lalu menampilkan quiz-box
    quizBox.classList.remove("hide");

// Pertama, kita akan set semua pertanyaan yang ada di dalam array availableQuestions;
    setAvailableQuestions();
   
//kedua, kita akan memanggil function getNewQuestion();
    getNewQuestion();

// membuat indicator ketika jawaban benar/salah
    answerIndicator();

}


window.onload = function(){

    homeBox.querySelector(".total-question").innerHTML = quiz.length;


}