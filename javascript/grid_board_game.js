var app = angular.module("GridBoardGame",[])
  //expects object that responds to .cols and .rows to be parsed
  .directive('ngGameBoard', function(){
  return { 
    restrict: 'A', 
    require: '^ngModel',
    template: boardTemplate(), 
    link: function(scope, element, attrs, controller){
      var x = 0;
      var y = 0;
      scope.boardWidth   = attrs.cols;
      scope.boardHeight  = attrs.rows;
      scope.gameBoard.rows = new Array();
      for(x; x < attrs.cols; x++){
        scope.gameBoard.rows[x] = new Array();
        for(y; y < attrs.rows; y++){
          scope.gameBoard.rows[x][y] = new GameCell(x,y,undefined);
        }
        y = 0;
      } 
 
    },

  }
});

function GameCell(x,y,player){
  this.x     = x;
  this.y     = y; 
  this.player = player;
  this.token = function(){
   return this.player && this.player.token + "Token";
  };

  this.tokenIs = function(token){
    return this.player && this.player.token == token
  };
}

//TODO: move this to separate template file
function boardTemplate(){
  var tpl ="<div ng-repeat='row in gameBoard.rows' class='gameRow'>"
          +"  <div ng-repeat='cell in gameBoard.rows[$index]' class='gameCell' ng-click='processTurn(cell)'>"
          +"    <div ng-class='cell.token()' class='token'>{{cell.x}},{{cell.y}}</div>"
          +"  </div>"
          +"</div>"
          +"<div class='clear'/>"
  return tpl;
}