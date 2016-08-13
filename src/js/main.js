window.addEventListener('load', function () {
  'use strict';

  var ns = window['baw-game'];
  var game = new Phaser.Game(840, 650, Phaser.AUTO, 'baw-game-game');
  game.state.add('boot', ns.Boot);
  game.state.add('preloader', ns.Preloader);
  game.state.add('menu', ns.Menu);
  game.state.add('game', ns.Game);
  /* yo phaser:state new-state-files-put-here */
  game.state.start('boot');
}, false);
