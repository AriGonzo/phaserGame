(function() {
  'use strict';

  function Menu() {}

  var ari;
  var brae;
  var missB;
  var machoNacho;

  Menu.prototype = {
    create: function () {
      var text = this.add.text(this.game.width * 0.5, this.game.height * 0.5,
        'BAW Game', {font: '42px Helvetica', fill: '#ffffff', align: 'center'
      });
      text.anchor.set(0.5);

      ari = this.add.sprite(250, 140, 'ari', 'stand1_0.png');
      ari.scale.setTo(0.40,0.40);
      ari.inputEnabled = true;
      ari.input.useHandCursor = true;
      ari.events.onInputDown.add(this.selectAri, this);

      brae = this.add.sprite(375, 140, 'brae', 'stand1_0.png');
      brae.scale.setTo(0.40,0.40);
      brae.inputEnabled = true;
      brae.input.useHandCursor = true;
      brae.events.onInputDown.add(this.selectBrae, this);

      machoNacho = this.add.sprite(100, 140, 'machoNacho', 'stand1_0.png');
      machoNacho.scale.setTo(0.40,0.40);
      machoNacho.inputEnabled = true;
      machoNacho.input.useHandCursor = true;
      machoNacho.events.onInputDown.add(this.selectMacho, this);

      missB = this.add.sprite(550, 140, 'missB', 'stand1_0.png');
      missB.scale.setTo(0.40,0.40);
      missB.inputEnabled = true;
      missB.input.useHandCursor = true;
      missB.events.onInputDown.add(this.selectMissB, this);
    },

    update: function () {

    },
    selectAri: function () {
      this.game.character = "ari"
      this.game.state.start('game');
    },
    selectBrae: function () {
      this.game.character = "brae"
      this.game.state.start('game');
    },
    selectMacho: function () {
      this.game.character = "machoNacho"
      this.game.state.start('game');
    },
    selectMissB: function () {
      this.game.character = "missB"
      this.game.state.start('game');
    },
    onDown: function () {
      this.game.character = "brae"
      this.game.state.start('game');
    }
  };

  window['baw-game'] = window['baw-game'] || {};
  window['baw-game'].Menu = Menu;
}());
