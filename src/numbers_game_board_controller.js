app.controller("NumbersGameBoardController", function($scope){
  GridGameHelp.ScopeDecorator($scope);

  $scope.newGame = function(){
  	$scope.getCell(0,0).decoration = 1
    $scope.getCell(0,1).decoration = 3
  	$scope.getCell(0,2).decoration = 14
  	$scope.getCell(0,3).decoration = 8
  	$scope.getCell(1,0).decoration = 6
  	$scope.getCell(1,1).decoration = 5
  	$scope.getCell(1,2).decoration = 10
  	$scope.getCell(1,3).decoration = 13	
    $scope.getCell(2,0).decoration = 7
    $scope.getCell(2,1).decoration = 2
    $scope.getCell(2,2).decoration = 11
  	$scope.getCell(2,3).decoration = 4
  	$scope.getCell(3,0).decoration = 13
  	$scope.getCell(3,1).decoration = 9
  	$scope.getCell(3,2).decoration = 15
  	$scope.activateCell($scope.getCell(3,3))

  }

  $scope.processClick = function(cell){
    $scope.swapDecorations(cell,$scope.activeCell)
    $scope.swapActiveCell(cell)
  }


});
  