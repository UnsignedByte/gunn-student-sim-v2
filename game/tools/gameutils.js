/**
 * @Author: Edmund Lam <edl>
 * @Date:   16:38:05, 01-Dec-2018
 * @Filename: gameutils.js
 * @Last modified by:   edl
 * @Last modified time: 22:27:28, 10-Feb-2019
 */

var Game = {
  game_anim_dir_mod:0,
  curr_collision_data:[false, false, false, false],
  curr_action_type:"game",
  cmde:null,
  text:{
    pos:null,
    full:null,
    options:null,
    chosen:null,
    chosenKey:null
  },
  inventory:[null,null,null,null,null,null,null,null,null,null]
}

function test_keypress(){
  let is_moving = false;
  Object.keys(KEYS_DOWN).forEach(key => {
    if (KEYS_DOWN[key] === true){
      switch (Game.curr_action_type){
        case "game":
          if (37<=Number(key) && Number(key)<=40){
            if(!Game.curr_collision_data[Number(key)-37]){
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
            mc.dir[0]=SWITCH_DIRS[Number(key)-37]
          }else{
            KEYS_DOWN[key]=false;
            switch (key){
              case "90":
              case "13":
                Collision.check_actions();
                break;
              case "17":
              case "67":
                Game.curr_action_type="inventory";
                break;
              default:
            }
          }
          break;
        case "text":
          KEYS_DOWN[key]=false;
          switch(key){
            case "90":
            case "13":
              if(Effects.pub_vars.text.done){
                if(Game.text.options != null){
                  Game.text.pos.push(Game.text.chosenKey);
                  Game.text.pos.push(-1);
                }
                ActionList.next();
                Effects.pub_vars.text.done = "pending";
              }
              break;
            case "16":
            case "88":
              Effects.pub_vars.text.done = true;
              break;
            case "37":
              Game.text.chosen=0;
              break;
            case "38":
              Game.text.chosen=2;
              break;
            case "39":
              Game.text.chosen=1;
              break;
            case "40":
              Game.text.chosen=3;
              break;
            default:
          }
          break;
        case "inventory":
          break;
        default:
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

var ActionList = (function(){
  var self = {};

  self.get_pos = function(pos=Game.text.pos, l=Game.text.full){
    for(let i = 0; i < pos.length; i++){
      l = l[pos[i]];
    }
    return l;
  }

  self.next = function(){
    let lastpos = Game.text.pos.pop()
    let lastm = self.get_pos();

    Game.text.pos.push(lastpos+1);
    Game.text.options = null;
    if (lastm.length === lastpos+1){
      Game.curr_action_type="game";
      return null;
    }
    if(typeof lastm[lastpos+1]=== 'string'){
    }else if (Array.isArray(lastm[lastpos+1])){
      Game.text.pos.push(randInt(0,lastm[lastpos+1].length)); // Is array
      Game.text.pos.push(0);
    }else if (lastm[lastpos+1].constructor == Object){ //Is dictionary
      Game.text.options = lastm[lastpos+1];
      Game.text.chosen = 0;
    }
  }

  return self;
}());


var Events = (function(){
  var self = {};

  self.text = function(){
    if (Game.text.options != null){
      Effects.options();
    }else{
      Effects.text(ActionList.get_pos());
    }
  }

  self.give_item = function(action){

  }

  return self;
}());
