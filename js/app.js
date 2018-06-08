$(document).ready(() => {

  var Game = Game || {};

  Game.wordsArr = [
    'LCD Soundsystem',
    'Foo Fighters',
    'Tool',
    'Sum41'
  ]

  Game.$lettersContainer = $('.lettersContainer');
  Game.$inputContainer = $('.inputContainer');
  Game.$playerWord = $('#playerWord');
  Game.$playerSubmit = $('#playerSubmit');
  Game.$guessInput = $('#guessInput');
  Game.$guessSubmit = $('#guessSubmit');
  Game.$start = $('#start');
  Game.randomIndex = Math.floor(Math.random() * Game.wordsArr.length);
  Game.lives = 8;
  Game.letter = '';

  Game.playLetter = function(){
    Game.letter = Game.$guessInput.val().toLowerCase();
    if (/[a-z0-9]/.test(Game.letter)) {
      $('.errorMsg').hide()

      for (var i = 0; i < $('.letter').length; i++) {
        if ($('.letter')[i].innerText.toLowerCase() === Game.letter) {
          $('.letter')[i].style.color = 'black';
          Game.checkWin();
        }
      }
      // Lose a life
      if (!Game.wordToPlay.includes(Game.letter)) {
        $('#someSpan').append(`<h4 class="wrongGuess">${ Game.letter }</h4>`);
        Game.lives--;
      }

      switch (Game.lives) {
        case 7:
          $('.gallows').append('<div class="noose" />');
          break;
        case 6:
          $('.gallows').append('<div class="head" />');
          break;
        case 5:
          $('.gallows').append('<div class="body" />');
          break;
        case 4:
          $('.gallows').append('<div class="leftArm" />');
          break;
        case 3:
          $('.gallows').append('<div class="rightArm" />');
          break;
        case 2:
          $('.gallows').append('<div class="rightLeg" />');
          break;
        case 1:
          $('.gallows').append('<div class="leftLeg" />');
          $('.loseMsg').show();
          $('.gallows').css('background','black');
          $('.hangmanBoard').css('background','black');
          $('.gallows').children().css('background','white');
          break;
        default:

      }
      Game.$guessInput.val('');
    } else {
      $('.errorMsg').show();
      Game.$guessInput.val('');
    }
  }


  Game.setupWord = function(word){
    for (var i = 0; i < word.length; i++) {
      if (word[i] === ' ') {
        Game.$lettersContainer.append(`<div class="space">${ word[i] }</div>`)
      } else {
        Game.$lettersContainer.append(`<div class="letter">${ word[i] }</div>`)
      }
    }
  }

  Game.checkWin = function(){
    var count = 0;
    for (var i = 0; i < $('.letter').length; i++) {
      if ($('.letter')[i].style.color === 'black') {
        count++;
      }
      if (count === $('.letter').length) {
        $('.winMsg').show();
      }
    }
    count = 0;
  }

  // Player 2 Word generation
  Game.$playerSubmit.click(function(){
    Game.wordToPlay = $('#playerWord').val().toLowerCase();
    Game.setupWord(Game.wordToPlay);
    $('.modalOverlay').fadeOut(300);
    $('.modalBox').fadeOut(300);
  })

  // Player 1 word generation
  Game.$start.click(function(){
    Game.wordToPlay = Game.wordsArr[Game.randomIndex].toLowerCase();
    Game.setupWord(Game.wordToPlay);
    $('.modalOverlay').fadeOut(300);
    $('.modalBox').fadeOut(300);
  })

  // Play a letter
  Game.$guessSubmit.click(Game.playLetter);

  $(window).keydown(function(e){
    if (e.keyCode === 13) {
      Game.playLetter();
    }
  })


});
