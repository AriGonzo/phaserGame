(function () {
  'use strict';

  function Boot() {}

  Boot.prototype = {
    preload: function () {
      this.load.image('preloader', 'assets/preloader.gif');
      this.load.image('platform', 'assets/platform.png');
      this.load.image('attack', 'assets/arrow.png');
      this.load.image('health', 'assets/healthBar.png');
      this.load.atlasJSONHash('ari', 'assets/ariSprite.png', 'assets/ariSprite.json' );
      this.load.atlasJSONHash('brae', 'assets/braeSprite.png', 'assets/braeSprite.json' );
      this.load.atlasJSONHash('machoNacho', 'assets/machoNachoSprite.png', 'assets/machoNachoSprite.json' );
      this.load.atlasJSONHash('missB', 'assets/missBSprite.png', 'assets/missBSprite.json' );
      this.load.tilemap('map', 'maps/imageLayer.json', null, Phaser.Tilemap.TILED_JSON);
      this.load.image('tiles', 'maps/Grass.png');
      this.load.image('Ground', 'assets/purchasedAssets/Art/platformerPackRedux/Spritesheets/spritesheet_ground.png');
      this.load.image('miscTiles', 'assets/purchasedAssets/Art/platformerPackRedux/Spritesheets/spritesheet_tiles.png');
      this.load.image('Objects', 'assets/purchasedAssets/Art/platformerPackRedux/Spritesheets/spritesheet_items.png');
      this.load.image('tree', 'assets/tree11.png');
      this.load.image('tree2', 'assets/tree21.png');
      this.load.image('background', 'maps/background.png');
      this.load.image('background2', 'assets/stars.png');
    },


    create: function () {
      // configure game
      this.game.input.maxPointers = 1;

      if (this.game.device.desktop) {
        this.game.scale.pageAlignHorizontally = true;
      } else {
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.minWidth =  480;
        this.game.scale.minHeight = 260;
        this.game.scale.maxWidth = 640;
        this.game.scale.maxHeight = 480;
        this.game.scale.forceOrientation(true);
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.setScreenSize(true);
      }
      this.game.state.start('preloader');
    }
  };

  window['baw-game'] = window['baw-game'] || {};
  window['baw-game'].Boot = Boot;
}());

