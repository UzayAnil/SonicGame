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

    //
    // Game Type Selection
    //
    function gameType() {
        var selectedGameType = $('.game-type').val();
        $(".game-type").toggleClass('hidden');
        $(".battle-button").toggleClass('hidden');
        $(".right-container").removeClass('hidden');
        $(".left-container").removeClass('hidden');
        $("#intro-image").addClass('hidden');
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
        $(".character-name").text(sonic.name);
      } else if (selectedCharacter == 'tails') {
        selectedCharacter = tails;
        $(".selected-char-image").attr("src", "images/tails.png");
        $(".character-name").text(tails.name);
      }

      //
      //** Randomly select and display enemy**//
      //
      var randomNumber = _.random(0, 100);
      if (randomNumber <= 50) {
        selectedEnemy = eggman;
        $(".selected-enemy-image").attr("src", "images/eggman.png");
        $(".enemy-name").text(eggman.name);
      } else if (randomNumber > 50) {
        selectedEnemy = espio;
        $(".selected-enemy-image").attr("src", "images/espio.png");
        $(".enemy-name").text(espio.name);
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
      name: 'Dr.Eggman'
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
        _.delay(selectedEnemy.attacks, 300, selectedCharacter);

        updateLifeStatus(selectedEnemy);
        _.delay(updateLifeStatus, 300, selectedCharacter);

        $('#enemy-damage-display').addClass('.damage-transition');

      }
    }

    //
    //Attack function on Character Prototype
    //
    Character.prototype.attacks = function(attacked) {
      // var attacker = this.name;
      var characterAttack = selectedCharacter.attack * _.random(2, 7);
      attacked.health = attacked.health - characterAttack;
      $('#enemy-damage-display').text(String(characterAttack).slice(0,2));
      if (attacked.health > 99) {
        $('#enemy-health-display').text(String(attacked.health).slice(0,3));
      } else {
        $('#enemy-health-display').text(String(attacked.health).slice(0,2));
      }
      if (selectedEnemy.health <= 0 || selectedCharacter.health <= 0) {
        $("h2").removeClass('hidden');
        $("progress").addClass('hidden');
        $(".attack-button").addClass('hidden');
        $(".replay-button").removeClass('hidden');
        $("#character-damage-display").addClass('hidden');
        $("#enemy-damage-display").addClass('hidden');
        $("#character-health-display").addClass('hidden');
        $("#enemy-health-display").addClass('hidden');
        $(".character-name").addClass("hidden");
        $(".enemy-name").addClass("hidden");

      }
    };

    //
    //Attack function on Enemy Prototype
    //
    Enemy.prototype.attacks = function(attacked) {
      // var attacker = this.name;
      var enemyAttack = selectedEnemy.attack * _.random(2, 7)
      attacked.health = attacked.health - enemyAttack;
      $('#character-damage-display').text(String(enemyAttack).slice(0,2));
      $('#character-health-display').text(String(attacked.health).slice(0,3));
      if (selectedEnemy.health <= 0 || selectedCharacter.health <= 0) {
        $("h2").removeClass('hidden');
        $("progress").addClass('hidden');
        $(".attack-button").addClass('hidden');
        $(".replay-button").removeClass('hidden');
        $("#character-damage-display").addClass('hidden');
        $("#enemy-damage-display").addClass('hidden');
        $("#character-health-display").addClass('hidden');
        $("#enemy-health-display").addClass('hidden');
        $(".character-name").addClass("hidden");
        $(".enemy-name").addClass("hidden");


      }
    };

    //
    //Update Health
    //
    function updateLifeStatus(character) {
      $('#character-health-bar').attr('value', selectedCharacter.health);
      $('#enemy-health-bar').attr('value', selectedEnemy.health);
    }
  });
})();
