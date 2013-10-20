app.controller("OthelloGameBoardController", function($scope){
  GridGameHelp.ScopeDecorator($scope);
  
  $scope.processClick = function(cell){
    if(processSideEffects(cell)){
      $scope.placeToken(cell);
      $scope.passPlay()
      $scope.activePlayer().addPoints(1)
      checkGameCompletion();
    }
  }

  $scope.newGame = function(){
    //set token fo defaults
    $scope.activePlayerId = $scope.firstPlayer.id
    $scope.getCell(3,3).player = $scope.activePlayer()
    $scope.getCell(4,3).player = $scope.nextPlayer()
    $scope.getCell(3,4).player = $scope.nextPlayer()
    $scope.getCell(4,4).player = $scope.activePlayer()
  }

  //***
  //private members
  //***
  var checkGameCompletion = function(){
    var maxPlays = $scope.boardWidth * $scope.boardHeight; 
    if($scope.turns >= maxPlays){
      $scope.gameStatus = 'complete'
    }
  }

  //perform all flanking flip operations for this cell
  //return true if anything was processed
  var processSideEffects = function(cell){
    var results = []
    var directions = GridGameHelp.Directions()
    for(direction in directions ){
      results.push(walkDirection(cell, directions[direction], []));
    }
    return (results.indexOf(true) > -1)
  }

  var walkDirection = function(cell,direction,cellStack){
    var next   = $scope.getCell( (cell.x + direction.x), (cell.y + direction.y) )
    var actionApplied = false;
    if(next && next.tokenIs($scope.activePlayer().token)){
      flipCells(cellStack);  
      actionApplied = (cellStack.length > 0)
    }else if(next && next.tokenIs($scope.nextPlayer().token)){
      cellStack.push(next);
      actionApplied = walkDirection(next,direction,cellStack);
    }else if(next == undefined || next.player == undefined){
      cellStack = [];
    }
    return actionApplied;
  }
  
  var flipCells = function(cellStack){
    for(cell in cellStack){
      cellStack[cell].player = $scope.activePlayer()
      $scope.activePlayer().addPoints(1)
      $scope.nextPlayer().addPoints(-1)
    }
  }

  
});
