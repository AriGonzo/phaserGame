(function() {
  'use strict';

  function Game() {}

  var map;
  var layer;
  var layer2;
  var layer3;
  var layerGroups;
  var background;


  var ari;
  var player;
  var playerHealth;
  var cursors;
  var jump;
  var left;
  var right;
  var down;
  var attack;
  var attackBtn;
  var attackBtn2;

  var fireRate = 900;
  var nextFire = 0;

  Game.prototype = {
    create: function () {
      //Set the Stage
      this.world.setBounds(0, 0, 2000, 650);
      this.stage.backgroundColor = '#85b5e1';
      background = this.add.tileSprite(0,0, this.world.bounds.width, this.world.bounds.height, 'background')
      background.fixedToCamera = true;

      map = this.add.tilemap('map');
      map.addTilesetImage('Ground', 'Ground');
      map.addTilesetImage('miscTiles', 'miscTiles');
      map.addTilesetImage('Objects', 'Objects');

      layerGroups = {
        back: this.add.group(),
        mid: this.add.group(),
        between: this.add.group(),
        front: this.add.group()
      };

      layer3 = map.createLayer('Background');
      layer2 = map.createLayer('Foreground');
      layer = map.createLayer('Tile Layer 1');
      layer.resizeWorld();
      layerGroups.back.add(layer);
      layerGroups.front.add(layer2);
      layerGroups.mid.add(layer3);

      map.setCollisionByExclusion([0],true, 'Tile Layer 1');

      this.lastDirection = 'right';

      //Ari Character
      ari = this.add.sprite(200, 1035, this.game.character, 'stand1_0.png');
      layerGroups.between.add(ari)
      ari.scale.setTo(0.30,0.30);
      ari.animations.add('stand', [
        'stand1_0.png',
        'stand1_1.png',
        'stand1_2.png',
        'stand1_3.png'
      ], 4, true, false);
      ari.animations.add('standLeft', [
        'stand1_0Left.png',
        'stand1_1Left.png',
        'stand1_2Left.png',
        'stand1_3Left.png'
      ], 4, true, false);
      ari.animations.add('walkRight', [
        'walk1_0.png',
        'walk1_1.png',
        'walk1_2.png',
        'walk1_3.png'
      ], 4, true, false);
      ari.animations.add('walkLeft', [
        'walk1_0Left.png',
        'walk1_1Left.png',
        'walk1_2Left.png',
        'walk1_3Left.png'
      ], 4, true, false);
      ari.animations.add('jump', [
        'jump_0.png'
      ], 4, true, false);
      ari.animations.add('jumpLeft', [
        'jump_0Left.png'
      ], 4, true, false);
      ari.animations.add('attackAnimationRight', [
        'shoot1_0.png',
        'shoot1_1.png',
        'shoot1_2.png'
      ], 11, false, false);
      ari.animations.add('attackAnimationLeft', [
        'shoot1_0Left.png',
        'shoot1_1Left.png',
        'shoot1_2Left.png'
      ], 11, false, false);
      ari.animations.add('swingAnimationLeft', [
        'swing1_0Left.png',
        'swing1_1Left.png',
        'swing1_2Left.png'
      ], 7, false, false);
      ari.animations.add('swingAnimationRight', [
        'swing1_0.png',
        'swing1_1.png',
        'swing1_2.png'
      ], 7, false, false);
      ari.animations.add('crouchLeft', [
        'prone_0Left.png'
      ], 4, true, false);
      ari.animations.add('crouchRight', [
        'prone_0.png'
      ], 4, true, false);
      ari.animations.play('stand');
      ari.isAlive = true;
      ari.invincible = false;
      ari.health = 20;
      ari.maxHealth = 20;

      //Finn Creation

      player = ari;
      player.isAlive = true;
      player.invincible = false;
      ari.health = 20;
      ari.maxHealth = 20;
      playerHealth = this.game.add.sprite(20,20,'health');
      playerHealth.fixedToCamera = true;
      playerHealth.originalWidth = playerHealth.width;
      //Player Physics
      this.physics.arcade.enable(player);
      ari.body.collideWorldBounds = true;
      ari.body.gravity.y = 990;

      //Create Movement Keys
      cursors = this.input.keyboard.createCursorKeys();
      attackBtn = this.input.keyboard.addKey(Phaser.Keyboard.Z);
      attackBtn2 = this.input.keyboard.addKey(Phaser.Keyboard.X);
      jump = cursors.up;
      left = cursors.left;
      right = cursors.right;
      down = cursors.down;

      attackBtn.onDown.add(this.fire, this);
      attackBtn2.onDown.add(this.swing, this);
      down.onDown.add(this.crouch, this);

      //Set Camera
      this.camera.follow(player, Phaser.Camera.FOLLOW_PLATFORMER);

      //Create Projectiles
      attack = this.add.group();
      attack.enableBody = true;
      attack.physicsBodyType = Phaser.Physics.ARCADE;
      attack.createMultiple(50, 'attack');
    },

    update: function () {

      //Physics
      ari.body.velocity.x = 0;
      this.physics.arcade.collide(ari, layer);


      //Assign Movement Keys
      if (!ari.body.onFloor() && left.isDown) {
        ari.body.velocity.x = -300;
        ari.animations.play('jumpLeft');
        this.lastDirection = 'left';
        //background.tilePosition.x += 0.10;
      } else if (left.isDown) {
        ari.body.velocity.x = -300;
        ari.animations.play('walkLeft');
        this.lastDirection = 'left';
        //background.tilePosition.x += 0.10;
      } else if (!ari.body.onFloor() && right.isDown) {
        ari.body.velocity.x = 300;
        ari.animations.play('jump');
        this.lastDirection = 'right';
        //background.tilePosition.x -= 0.10;
      } else if (right.isDown) {
        ari.body.velocity.x = 300;
        ari.animations.play('walkRight');
        this.lastDirection = 'right';
        //background.tilePosition.x -= 0.10;
      } else if (ari.animations.getAnimation('attackAnimationRight').isPlaying || ari.animations.getAnimation('attackAnimationLeft').isPlaying || ari.animations.getAnimation('swingAnimationRight').isPlaying || ari.animations.getAnimation('swingAnimationLeft').isPlaying){
        return
      } else if (this.lastDirection == 'left'){
        ari.animations.play('standLeft')
      } else {
        ari.animations.play('stand');
      }

      if (jump.isDown && (ari.body.onFloor() || ari.body.touching.down)) {
        if(this.lastDirection == 'left') {
          ari.animations.play('jumpLeft')
        } else {
          ari.animations.play('jump')
        }
        ari.body.velocity.y = -730;
      }
    },
    fire: function () {
      if (this.time.now > nextFire && attack.countDead() > 0) {
        if (this.lastDirection == 'left') {
          ari.animations.play('attackAnimationLeft');
          nextFire = this.time.now + fireRate;
          var bullet = attack.getFirstDead();
          bullet.reset(ari.x + 45, ari.y + 77);
          bullet.rotation = 3.14159
          this.physics.arcade.moveToXY(bullet, -999999, ari.y, 300);
        } else {
          ari.animations.play('attackAnimationRight');
          nextFire = this.time.now + fireRate;
          var bullet = attack.getFirstDead();
          bullet.reset(ari.x + 45, ari.y + 53);
          this.physics.arcade.moveToXY(bullet, 999999, ari.y, 300);
        }
      }
    },
    swing: function () {
      if (this.lastDirection == "right"){
        ari.animations.play('swingAnimationRight');
      } else {
        ari.animations.play('swingAnimationLeft');
      }

    },
    killAttack: function (attack) {
      attack.kill()
    },
    //attackKO: function (enemy, attack) {
    //  attack.kill();
    //
    //  if (enemy.invincible == false) {
    //    enemy.damage(2);
    //    enemy.invincible = true;
    //  } else {
    //    return
    //  }
    //
    //  var enemyHealthBefore = enemy.health;
    //  enemyHealth.cropEnabled = true;
    //  enemyHealth.crop.width = (enemy.health / enemy.maxHealth) * enemyHealth.originalWidth;
    //  enemyHealth.width = enemyHealth.crop.width;
    //
    //  if (enemy.health > 0 ) {
    //    this.timer = this.time.create(false);
    //    this.timer.loop(250, function () {
    //      this.updateCounter(enemy)
    //    }, this);
    //    this.timer.start();
    //    var that = this;
    //    setTimeout(function () {
    //      that.timer.stop();
    //      enemy.revive();
    //      enemy.health = enemyHealthBefore;
    //      enemy.invincible = false;
    //    }, 3000)
    //  }
    //},
    //takeDamage: function (enemy, player) {
    //  if (ari.invincible == false) {
    //    ari.damage(5);
    //    ari.invincible = true;
    //  } else {
    //    return
    //  }
    //
    //
    //  var playerHealthBefore = enemy.health;
    //  playerHealth.cropEnabled = true;
    //  playerHealth.crop.width = (ari.health / ari.maxHealth) * playerHealth.originalWidth;
    //  playerHealth.width = playerHealth.crop.width;
    //
    //  if (ari.health > 0 ) {
    //    this.timer = this.time.create(false);
    //    this.timer.loop(250, function () {
    //      this.updateCounter(player)
    //    }, this);
    //    this.timer.start();
    //    var that = this;
    //    setTimeout(function () {
    //      that.timer.stop();
    //      ari.revive();
    //      ari.health = playerHealthBefore;
    //      ari.invincible = false;
    //    }, 3000)
    //  }
    //},
    updateCounter: function (sprite) {
      if (sprite.exists) {
        sprite.kill();
      } else {
        sprite.revive();
      }
    },
    crouch: function () {
      if(this.lastDirection == "left") {
        ari.animations.play('crouchLeft')
      } else {
        ari.animations.play('crouchRight')
      }
    }
  };

  window['baw-game'] = window['baw-game'] || {};
  window['baw-game'].Game = Game;
}());
