
var WINDOW_HEIGHT = $(window).height(),
    WINDOW_TOP = $(window).scrollTop(),
    $animates = $('.js-animates'),
    clouds = [],
    elements = [],
    instance = this,
    TREES = [
            [20, 350],
            [600, 400],
            [900, 500],
            [1100, 250],
            [800, 250],
            [800, 450],
            [550, 850],
            [330, 1000],
            [300, 1050],
            [100, 1250],
            [200, 1400],
            [230, 1430],
            [180, 1450],
            [880, 1500],
            [680, 1600],
            [500, 1850],
            [300, 1900],
            [100, 2000],
            [130, 2030],
            [350, 2300],
            [850, 2500],
            [880, 2520],
            [840, 2530],
            [800, 2600],
            [700, 2800],
            [730, 2830],
            [330, 2900],
            [130, 3000],
            [330, 3220],
            [530, 3300],
            [670, 3400],
            [970, 3480],
            [800, 3700],
            [600, 3800],
            [570, 3840],
            [80, 3840],
            [150, 3970],
            [100, 4000],
            [150, 4200]
    ],
    BUSHES = [
            [900, 450],
            [1000, 500],
            [1200, 600],
            [650, 500],
            [600, 530],
            [850, 850],
            [800, 880],
            [340, 1200],
            [360, 1250],
            [300, 1250],
            [400, 1400],
            [430, 1430],
            [480, 1450],
            [680, 1500],
            [650, 1580],
            [800, 1850],
            [770, 1900],
            [100, 2400],
            [130, 2430],
            [350, 2400],
            [550, 2500],
            [680, 2520],
            [640, 2530],
            [900, 2700],
            [500, 2800],
            [430, 2830],
            [130, 2900],
            [140, 2930],
            [30, 3220],
            [50, 3300],
            [770, 3400],
            [800, 3450],
            [600, 3700],
            [400, 3800],
            [370, 3900],
            [30, 3840],
            [150, 4170],
            [100, 4150],
            [350, 4200]
    ],
    HILLS = [
      [100, 200],
      [400, 200],
      [850, 100],
      [250, 500],
      [200, 470],
      [400, 420]
    ],
    CLOUDS = [
      100,
      470,
      900,
      950,
      1500,
      1900,
      2400,
      2800,
      3300,
      3800,
      3850
    ];

$('body').addClass('js-inview');

instance.canvas = document.createElement('canvas');
instance.canvas.id = "bg-canvas";

$('body').prepend($(instance.canvas));
instance.canvas.width =  window.innerWidth;
instance.canvas.height = window.innerHeight;

this.ctx = this.canvas.getContext('2d');

var ANIMATING = true;

var texture = new Image();
texture.src = 'img/spritesheet.png';     
texture.addEventListener('load', handle_texture_LOAD);

function render () {
  var scrollPosition,
      element,
      cloud,
      i;

  scrollPosition = WINDOW_TOP < 0 ? scrollPosition = 0 : scrollPosition = -WINDOW_TOP;
  
  console.log(scrollPosition);this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.ctx.save();
  this.ctx.translate(0, scrollPosition);
            
  for (i = 0; i < elements.length; i += 1) {
    element = elements[i];
    element.render();
  }
  this.ctx.restore();
  this.ctx.save();
  this.ctx.translate(0, scrollPosition * 0.8);

  for (i = 0; i < clouds.length; i += 1) {
    cloud = clouds[i];
    cloud.render();
    if (ANIMATING !== false) {
      cloud.x = cloud.x < window.innerWidth ? cloud.x + 1 : -100;
    }
  }

  this.ctx.restore();
            
  if (ANIMATING !== false) {
    requestAnimationFrame(this.render.bind(this));
  }
};

function handle_texture_LOAD() {
  addContent();
  render();
}

function inviewAnimations() {
  var i;

  if (WINDOW_TOP < 0) {
    return;
  }

  $animates.each(function () {
    var $this = $(this),
        elTop = $this.offset().top,
        elHeight = $this.height();

    if (elTop - WINDOW_TOP < WINDOW_HEIGHT && elTop - WINDOW_TOP + elHeight > 0) 
    {
      $this.addClass('in');
    } else {
      $this.removeClass('in');
    }
  });
}

var CloudSprite = function (options) {
  this.image = options.image;
  this.ctx = options.ctx;
  this.x = options.x;
  this.y = options.y;
  this.tex = {x: 136, y: 0, w: 96, h: 67};
  this.render = function () {
    this.ctx.drawImage(this.image, this.tex.x, this.tex.y, this.tex.w, this.tex.h, this.x, this.y, this.tex.w, this.tex.h);
  }
}

var TreeSprite = function (options) {
  this.image = options.image;
  this.ctx = options.ctx;
  this.x = options.x;
  this.y = options.y;
  this.tex = {x: 0, y: 0, w: 72, h: 108};
  this.render = function () {
            this.ctx.drawImage(this.image, this.tex.x, this.tex.y, this.tex.w, this.tex.h, this.x, this.y, this.tex.w, this.tex.h);
  }
}

var BushSprite = function (options) {
  this.image = options.image;
  this.ctx = options.ctx;
  this.x = options.x;
  this.y = options.y;
  this.tex = {x: 73, y: 0, w: 35, h: 30};
  this.render = function () {
            this.ctx.drawImage(this.image, this.tex.x, this.tex.y, this.tex.w, this.tex.h, this.x, this.y, this.tex.w, this.tex.h);
  }
}

var HillSprite = function (options) {
  this.image = options.image;
  this.ctx = options.ctx;
  this.x = options.x;
  this.y = options.y;
  this.tex = {x: 73, y: 40, w: 65, h: 65};
  this.render = function () {
            this.ctx.drawImage(this.image, this.tex.x, this.tex.y, this.tex.w, this.tex.h, this.x, this.y, this.tex.w, this.tex.h);
  }
}

function addContent() {
  var i,
      tree,
      bush,
      hill,
      cloud;
            
  for (i = 0; i < CLOUDS.length; i += 1) {
    cloud = new CloudSprite({x: Math.random() * window.innerWidth, y: CLOUDS[i], ctx: this.ctx, image: texture});                
    clouds.push(cloud);
  }

  for (i = 0; i < TREES.length; i += 1) {
    tree = new TreeSprite({x: TREES[i][0], y: TREES[i][1], ctx: this.ctx, image: texture});
    elements.push(tree);
  }

  for (i = 0; i < BUSHES.length; i += 1) {
    bush = new BushSprite({x: BUSHES[i][0], y: BUSHES[i][1], ctx: this.ctx, image: texture});
    elements.push(bush);
  }

  for (i = 0; i < HILLS.length; i += 1) {
    hill = new HillSprite({x: HILLS[i][0], y: HILLS[i][1], ctx: this.ctx, image: texture});
    elements.push(hill);
  }
}

function handle_SCROLL() {
  WINDOW_TOP = $(window).scrollTop();
  TIMEOUT = setTimeout(function () {
    inviewAnimations();
  }, 100);
}

function handle_RESIZE() {
  instance.canvas.width =  window.innerWidth;
  instance.canvas.height = window.innerHeight;
  WINDOW_HEIGHT = $(window).height();
}

window.addEventListener('scroll', handle_SCROLL);
window.addEventListener('resize', handle_RESIZE);






