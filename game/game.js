/**
 * @Author: Edmund Lam <edl>
 * @Date:   21:16:29, 24-Nov-2018
 * @Filename: main.js
 * @Last modified by:   edl
 * @Last modified time: 12:48:12, 24-Jun-2019
 */

//no more blurring! :)
context.imageSmoothingEnabled = false;

function tick(){
  test_keypress();
  if (Game.curr_action_type === "game"){
    Game.curr_collision_data = Collision.check_collide();
    Collision.check_doors();
  }
}

function draw(){
  context.clearRect(0, 0, canv.width, canv.height)
  mc.currAnim=MC_DATA.animations[mc.dir[0]][mc.dir[1]];
  Window.render();
  switch (Game.curr_action_type){
    case "darken":
      Effects.darken();
      break;
    case "text":
      Events.text();
      break;
    case "inventory":
      if (mc.inventory.length === 0) Game.inventory.chosen = null;
      Effects.inventory();
      break;
    case "container":
      Events.container();
      break;
    default:
  }
}

function second(){
  mc.time++;
  mc.time%=86400;
  Stats.calculate();

  window.localStorage.setItem("mainchar", JSON.stringify(mc));
  window.localStorage.setItem("lmd", JSON.stringify(lmd));
}

second();
var secondinterval = setInterval(second, 1000);
var drawinterval = setInterval(draw, 1000/BASE_FPS);
var tickinterval = setInterval(tick, 1000/TPS)
