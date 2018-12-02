/**
 * @Author: Edmund Lam <edl>
 * @Date:   21:16:29, 24-Nov-2018
 * @Filename: main.js
 * @Last modified by:   edl
 * @Last modified time: 17:19:25, 01-Dec-2018
 */

//no more blurring! :)
context.imageSmoothingEnabled = false;

function draw(){
  context.clearRect(0, 0, canv.width, canv.height)
  switch (Game.curr_action_type){
    case "game":
      mc.currAnim=MC_DATA.animations[mc.dir[0]][mc.dir[1]];

      Game.curr_collision_data = Collision.check_collide();
      test_keypress();
      Collision.check_doors();
      Window.render();
      break;
    case "darken":
      Window.render();
      Effects.darken();
    default:
  }
}

function second(){
  window.localStorage.setItem("mainchar", JSON.stringify(mc));
}

var secondinterval = setInterval(second, 1000);
var drawinterval = setInterval(draw, 1000/BASE_FPS);
