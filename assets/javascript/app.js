function Question (question, a1, a2, a3, a4, correctAnswer) {
    this.question      = question;
    this.a1            = a1;
    this.a2            = a2;
    this.a3            = a3;
    this.a4            = a4;
    this.correctAnswer = correctAnswer;
  }
  
  Question.prototype.checkAnswer = function(userAnswer) {
    if(userAnswer===this.correctAnswer) {
      return true;
    } else {
      return false;
    }
  };
  
  
  var questions = [
      new Question(
        "What is the first line Spongebob says in Jellyfish hunter?",
        "You’re my 12th catch of the day!",
        "Gotcha!",
        "You’re my 8th catch of the day!",
        "Nothing he just runs around laughing with his net in the air",
        "a1"),
      new Question(
        "In the episode Krusty Krab Training Video, what gets thrown at the boy who keeps saying hoopla?",
        "A shoe",
        "A walking stick",
        "An anchor",
        "A brick",
        "a4"),
      new Question(
        "On Graveyard shift whats the first name Spongebob says after squidward says the hash slinging slasher?",
        "The sash-ringing",
        "The trash-singing",
        "The mash-flinging",
        "The flash-springing",
        "a1"),
      new Question(
        "Whats lucky about Spongebob and Patrick when a sea rhinoceros comes in The camping episode?",
        "There wearing there camouflage sea rhino outfits",
        "There wearing there anti sea-rhino undergarments",
        "There in a anti sea-rhino circle",
        "Nothing is lucky about them",
        "a3"),
      new Question(
        "What is the episode called were Squidward goes back and forward in time?",
        "SB-129",
        "SQ-009",
        "Back to the future",
        "221 Squidward",
        "a1")
  ];
  
  var questionCounter = 0;
  var questionTimer;
  var answerTimer;
  var questionDuration = 10;
  var answerDuration = 3;
  var correct = 0;
  var incorrect = 0;
  var unanswered = 0;
  function startGame() {
    var startButton = $("<button>");
    $(startButton).addClass(".start");
    $(startButton).html("<h2>Start</h2>");
    $(".stage").html("<h2>Hi:D My Friend!</h2> <h2>Welcome to SpongeBob Trivia Questions</h2>");
    $(".stage").append(startButton);
  
    $(startButton).click(function(){
      askQuestion();
    });
  }
  
  function reset() {
    questionCounter = 0;
    correct = 0;
    incorrect = 0;
    unanswered = 0;
    clearTimeout(answerTimer);
    clearInterval(questionTimer);
    startGame();
  }
  
  function startQuestionTimer(t, q) {
    questionTimer = setInterval(function(){
      if (t <= 0) {
        renderWrong(q, true);
        return;
      } else {
        $("h4.timer span").text(t);
        t--;
      }
    }, 1000);
  }
  
  function startAnswerTimer(){
    console.log(answerDuration);
    answerTimer = setTimeout(function(){
      askQuestion();
    },answerDuration*1000);
  }
  
  function renderGameOver() {
    var output = "<h2>Let's see how you did...</h2>";
    output += "<table><tbody><tr><td class='left'>";
    output += "Correct:</td><td class='left'>  "+correct+"</td></tr><tr><td class='left'>";
    output += "Incorrect:</td><td class='left'>  "+incorrect+"</td></tr><tr><td class='left'>";
    output += "Unanswered:</td><td class='left'>  "+unanswered+"</td></tr></tbody></table>";
    output += "<button class='reset'>Try again!</button>";
    $(".stage").html(output);
    $(".reset").click(function(){
      reset();
    });
  }
  
  function askQuestion() {
    $(".stage").empty();
    clearTimeout(answerTimer);
    if(questionCounter < questions.length) {
      var q = questions[questionCounter];
      var currentQuestion = new Question(q);
      var output = "<h4 class='timer'> Time remaining: <span>"+questionDuration+"</span></h4>";
      output += "<h3>"+q.question+"</h3>";
      output += "<ul class='answers'>";
      output += "<li id='a1'>"+q.a1+"</li>";
      output += "<li id='a2'>"+q.a2+"</li>";
      output += "<li id='a3'>"+q.a3+"</li>";
      output += "<li id='a4'>"+q.a4+"</li>";
      output += "</ul>";
  
  
      $(".stage").html(output);
  
      startQuestionTimer(questionDuration, q);
  
      questionCounter++;
  
      $("li").click(function(){
        $(this).addClass('selected');
        if(q.checkAnswer($(this).attr("id"))) {
          renderCorrect(q);
        } else {
          renderWrong(q);
        }
      });
    } else {
  
      renderGameOver();
  }
  
  }
  
  function renderCorrect(q) {
    correct++;
    clearInterval(questionTimer);
    startAnswerTimer();
    var output = "<h3>CORRECT!</h3>";
    output += "<img src='./assets/images/win.gif'>";
    $(".stage").html(output);
  }
  
  function renderWrong(q, ranOutofTime) {
    clearInterval(questionTimer);
    startAnswerTimer();
    var correct = q[q.correctAnswer];
    var output;
    if (ranOutofTime === true) {
      output = "<h3>OOPS! RAN OUT OF TIME.</h3>";
      unanswered++;
    } else {
      output = "<h3>WRONG!</h3>";
      incorrect++;
    }
    output += "<h4 class='correction'>The correct answer was "+correct+".</h4>";
    output += "<img src='./assets/images/fail.gif'>";
    $(".stage").html(output);
  
  }
  
  
  $(document).ready(function(){
  
    startGame();
  
  
  }); 
  