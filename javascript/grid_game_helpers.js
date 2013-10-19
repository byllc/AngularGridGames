var GridGameHelper = function(){
  return {
    Cell: function(x,y,player){
      this.x     = x;
      this.y     = y; 
      this.player = player;
      this.token = function(){
        return this.player && this.player.token + "Token";
      };

      this.tokenIs = function(token){
        return this.player && this.player.token == token
      };
    },

    Directions: function(){
      return {
       n:  { x: -1, y: 0},
       ne: { x: -1, y: 1},
       e:  { x: 0, y: 1},
       se: { x: 1, y: 1},
       s:  { x: 1, y: 0},
       sw: { x: 1, y: -1},
       w:  { x: 0, y: -1},
       nw: { x: -1, y: -1}
      }
    },   
  
    //TODO: move this to separate template file
    Template: function(){
      var tpl ="<div ng-repeat='row in gameBoard.rows' class='gameRow'>"
          +"  <div ng-repeat='cell in gameBoard.rows[$index]' class='gameCell' ng-click='processTurn(cell)'>"
          +"    <div ng-class='cell.token()' class='token'>{{cell.x}},{{cell.y}}</div>"
          +"  </div>"
          +"</div>"
          +"<div class='clear'/>"
      return tpl;
    }
  }
}