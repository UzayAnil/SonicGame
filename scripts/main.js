(function() {
  'use strict';

  $(document).ready(function() {
    var selectedEnemy;
    var selectedCharacter;

    //**** Select Game Type Event ****//
    $(".game-type").on("change", gameType);
    $(".replay-button").on('click', replay);

    function replay(){
      location.reload();
    }

    function gameType() {
        var selectedGameType = $('.game-type').val();
        $(".game-type").toggleClass('hidden');
        $(".battle-button").toggleClass('hidden');
        $(".right-container").removeClass('hidden');
        $(".left-container").removeClass('hidden');
        $("#intro-image").addClass('hidden');

        console.log(selectedGameType);
      }
      //
      //**** Select Character Event ****//
      //
    $(".battle-button").on("click", selectCharacter);

    function selectCharacter() {
      selectedCharacter = $(this).attr('data-character');
      $(".start-screen-container").hide();
      $(".battle-screen-container").show();
      //
      //** Selected character Display **//
      //
      if (selectedCharacter == 'sonic') {
        selectedCharacter = sonic;
        $(".selected-char-image").attr("src", "images/sonic.png");
      } else if (selectedCharacter == 'tails') {
        selectedCharacter = tails;
        $(".selected-char-image").attr("src", "images/tails.png");
      }
      //
      //** Randomly select and display enemy**//
      //
      var randomNumber = _.random(0, 100);
      if (randomNumber <= 50) {
        selectedEnemy = eggman;
        $(".selected-enemy-image").attr("src", "images/eggman.png");
      } else if (randomNumber > 50) {
        selectedEnemy = espio;
        $(".selected-enemy-image").attr("src", "images/espio.png");
      }
      // console.log(selectedEnemy);
      // console.log(selectedCharacter);
      $('#character-health-bar').attr('max', selectedCharacter.health);
      $('#enemy-health-bar').attr('max', selectedEnemy.health);
    }

    //
    //** Character Prototype **//
    //
    var Character = function(options) {
      var options = options || {};
      _.defaults(options, {
        image: "",
      });
      _.extend(this, options);

      var healthFactor = 300;
      this.health = this.health * healthFactor;

      var attackFactor = 12;
      this.attack = this.attack * attackFactor;

    };

    //
    //** Enemy Prototype **//
    //
    var Enemy = function(options) {
      var options = options || {};
      _.defaults(options, {
        image: "",
      });
      _.extend(this, options);

      var healthFactor = 400;
      this.health = this.health * healthFactor;

      var attackFactor = 10;
      this.attack = this.attack * attackFactor;

    };

    //
    //** Character Constructors **//
    //
    var sonic = new Character({
      image: "",
      health: 1.3,
      attack: 1.5,
      name: 'Sonic',
    });

    var tails = new Character({
      image: "",
      health: 1.1,
      attack: 1.3,
      name: 'Tails'
    });

    var eggman = new Enemy({
      image: "",
      health: 1.5,
      attack: 1.0,
      name: 'Eggman'
    });

    var espio = new Enemy({
      image: "",
      health: 1.4,
      attack: 0.8,
      name: 'Espio'
    });

    //
    //** Attack Button **//
    //
    $(".attack-button").on("click", attackButtonClick);

    function attackButtonClick() {


      if (selectedEnemy.health > 0 && selectedCharacter.health > 0) {

        selectedCharacter.attacks(selectedEnemy);
        _.delay(selectedEnemy.attacks, 500, selectedCharacter);


        updateLifeStatus(selectedEnemy);
        _.delay(updateLifeStatus, 500, selectedCharacter);

        // if (selectedCharacter.health > 0) {
        //   selectedEnemy.attacks(selectedCharacter);
        //   updateLifeStatus(selectedCharacter);
        // }
      }
    }

    //
    //Attack function on Character Prototype
    //
    Character.prototype.attacks = function(attacked) {
      // var attacker = this.name;
      attacked.health = attacked.health - (selectedCharacter.attack * _.random(2, 7));

      if (selectedEnemy.health <= 0 || selectedCharacter.health <= 0) {
        $("h2").removeClass('hidden');
        $("progress").addClass('hidden');
        $(".attack-button").addClass('hidden');
        $(".replay-button").removeClass('hidden');
      }

      console.log(selectedCharacter.health);
    };

    //
    //Attack function on Enemy Prototype
    //
    Enemy.prototype.attacks = function(attacked) {
      // var attacker = this.name;
      attacked.health = attacked.health - (selectedEnemy.attack * _.random(2, 7));
      console.log(selectedEnemy.health);
    };


    //
    //Update Health
    //
    function updateLifeStatus(character) {
      $('#character-health-bar').attr('value', selectedCharacter.health);
      $('#enemy-health-bar').attr('value', selectedEnemy.health);

    }



    //**** Battle Screen ****//




  });
})();
