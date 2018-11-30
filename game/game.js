/**
 * @Author: Edmund Lam <edl>
 * @Date:   21:16:29, 24-Nov-2018
 * @Filename: main.js
 * @Last modified by:   edl
 * @Last modified time: 10:05:43, 29-Nov-2018
 */

var Game = (function(){
  var self = {};

  self.game_anim_dir_mod = 0;
  self.curr_collision_data = [false, false, false, false];
  self.curr_action_type = "game";

  return self;
});

Game.curr_action_type = "game";

function draw(){
  context.clearRect(0, 0, canv.width, canv.height)
  if (Game.curr_action_type === "game"){
    mc.currAnim=MC_DATA.animations[mc.dir[0]][mc.dir[1]];

    Game.curr_collision_data = Collision.check_collide();
    test_keypress();
    Collision.enter_doors();
    Window.render();
  }
}

function minute(){
  window.localStorage.setItem("mainchar", JSON.stringify(mc));
}

var minuteinterval = setInterval(minute, 1000*60);
var drawinterval = setInterval(draw, 1000/BASE_FPS);

function test_keypress(){
  let is_moving = false;
  Object.keys(KEYS_DOWN).forEach(key => {
    if (KEYS_DOWN[key] === true){
      if (37<=Number(key)<=40){
        if (!Game.curr_collision_data[Number(key)-37]){
          is_moving=true;
          switch (key){
            case "37":
              mc.pos[0]-=MOV_SPEED;
              break;
            case "38":
              mc.pos[1]-=MOV_SPEED;
              break;
            case "39":
              mc.pos[0]+=MOV_SPEED;
              break;
            case "40":
              mc.pos[1]+=MOV_SPEED;
              break;
          }
        }
      }
      switch (key){
        case "37":
          mc.dir[0] = 2;
          break;
        case "38":
          mc.dir[0] = 1;
          break;
        case "39":
          mc.dir[0] = 3;
          break;
        case "40":
          mc.dir[0] = 0;
          break;
      }
    }
  });
  if (Game.game_anim_dir_mod===0){
    mc.dir[1]++;
    if (is_moving){
      mc.dir[1]%=MC_DATA.animations[0].length;
    }else{
      mc.dir[1] = 0;
    }
  }
  if(is_moving){
    Game.game_anim_dir_mod++;
    Game.game_anim_dir_mod%=FRAMES_BEFORE_WALK;
  }else{
    Game.game_anim_dir_mod=0;
  }
}
