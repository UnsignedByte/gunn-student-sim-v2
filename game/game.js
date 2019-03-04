/**
 * @Author: Edmund Lam <edl>
 * @Date:   21:16:29, 24-Nov-2018
 * @Filename: main.js
 * @Last modified by:   edl
 * @Last modified time: 10:09:01, 03-Mar-2019
 */

//no more blurring! :)
context.imageSmoothingEnabled = false;

function draw(){
  context.clearRect(0, 0, canv.width, canv.height)
  test_keypress();
  switch (Game.curr_action_type){
    case "game":
      mc.currAnim=MC_DATA.animations[mc.dir[0]][mc.dir[1]];

      Game.curr_collision_data = Collision.check_collide();
      Collision.check_doors();
      Window.render();
      break;
    case "darken":
      Window.render();
      Effects.darken();
      break;
    case "text":
      Window.render();
      Events.text();
      break;
    case "inventory":
      Window.render();
      Effects.inventory();
      break;
    case "container":
      Window.render();
      Effects.container();
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
