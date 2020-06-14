let platforms;
let player;
let cursors;
let balls;
let score = 0;
let scoreText;

function collectStar(p, ball) {
  ball.disableBody(true, true);

  //  Add and update the score
  score += 10;
  scoreText.setText(`Score: ${score}`);
}

function preload() {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('brick1', 'assets/brick1.png');
  this.load.image('brick2', 'assets/brick2.png');
  this.load.image('brick3', 'assets/brick3.png');
  this.load.image('bomb', 'assets/bomb.png');
}

function create() {
  this.add.image(400, 300, 'sky');

  platforms = this.physics.add.staticGroup();

  platforms.create(0, 240, 'brick2').setScale(2, 1).refreshBody();
  platforms.create(0, 320, 'brick2').setScale(2, 1).refreshBody();

  platforms.create(430, 240, 'brick2').setScale(1.5, 1).refreshBody();
  platforms.create(430, 320, 'brick2').setScale(1.5, 1).refreshBody();

  platforms.create(750, 240, 'brick2');
  platforms.create(750, 320, 'brick2');

  platforms.create(200, 130, 'brick3').setScale(1, 1.3).refreshBody();
  platforms.create(200, 450, 'brick3').setScale(1, 1.5).refreshBody();

  platforms.create(300, 130, 'brick3').setScale(1, 1.3).refreshBody();
  platforms.create(300, 450, 'brick3').setScale(1, 1.5).refreshBody();

  platforms.create(560, 130, 'brick3').setScale(1, 1.3).refreshBody();
  platforms.create(560, 450, 'brick3').setScale(1, 1.5).refreshBody();

  platforms.create(650, 130, 'brick3').setScale(1, 1.3).refreshBody();
  platforms.create(650, 450, 'brick3').setScale(1, 1.5).refreshBody();

  player = this.physics.add.sprite(100, 280, 'brick1');
  player.body.setAllowGravity(false);

  balls = this.physics.add.group({
    key: 'bomb',
    repeat: 11,
    setXY: { x: 12, y: 280, stepX: 70 },
    allowGravity: false,
  });

  this.physics.add.overlap(player, balls, collectStar, null, this);
  this.physics.add.collider(player, platforms);

  scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '42px', fill: '#fff' });
  cursors = this.input.keyboard.createCursorKeys();
}


function update() {
  if (cursors.left.isDown) {
    player.setVelocityX(-200);
  } else if (cursors.right.isDown) {
    player.setVelocityX(200);
  } else if (cursors.up.isDown) {
    player.setVelocityY(-200);
  } else if (cursors.down.isDown) {
    player.setVelocityY(200);
  } else {
    // player.setVelocityX(0);
    // player.setVelocityY(0);
  }
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload,
    create,
    update,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
};

// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(config);
