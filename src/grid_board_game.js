var GridGameHelp = new GridGameHelper()
var app = angular.module("GridBoardGame",[])
  
//expects object that responds to .cols and .rows to be parsed
app.directive('ngGameBoard', function(){
  return { 
    restrict: 'A', 
    require: '^ngModel',
    template: GridGameHelp.Template(), 
    link: function(scope, element, attrs, controller){
      return new GridGameHelp.GameBoard(scope, element, attrs, controller)
    }

  }
});
