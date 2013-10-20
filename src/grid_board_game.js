var GameHelp = new GridGameHelper()
var app = angular.module("GridBoardGame",[])
  //expects object that responds to .cols and .rows to be parsed
  .directive('ngGameBoard', function(){
  return { 
    restrict: 'A', 
    require: '^ngModel',
    template: GameHelp.Template(), 
    link: function(scope, element, attrs, controller){
      var x = 0;
      var y = 0;
      scope.boardWidth   = attrs.cols;
      scope.boardHeight  = attrs.rows;
      scope.gameBoard.rows = new Array();
      for(x; x < attrs.cols; x++){
        scope.gameBoard.rows[x] = new Array();
        for(y; y < attrs.rows; y++){
          scope.gameBoard.rows[x][y] = new GameHelp.Cell(x,y,undefined);
        }
        y = 0;
      } 
 
    },

  }
});
