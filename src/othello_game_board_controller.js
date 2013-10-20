app.controller("OthelloGameBoardController", function($scope){
  var GridHelp = new GridGameHelper(); 
  
  $scope.gameBoard      = new Object();
  $scope.gameBoard.rows = new Array();
  $scope.boardWidth     = 8
  $scope.boardHeight    = 8
  $scope.gameStatus     = ''

  $scope.players = [ 
    { id: 0, next: 1, name: 'Player 2', score: 2, token: 'p1'},
    { id: 1, next: 0, name: 'Player 1', score: 2, token: 'p2'}
  ]
  
  //default first player
  $scope.firstPlayer = $scope.players[0]
  $scope.activePlayerId = $scope.firstPlayer.id

  $scope.processTurn = function(cell){
    if(processSideEffects(cell)){
      placeToken(cell);
      checkGameCompletion();
    }
  }

  $scope.activePlayer = function(){
    return $scope.players[ $scope.activePlayerId ]
  }

  $scope.nextPlayer = function(){
    return $scope.players[ $scope.activePlayer().next ]; 
  }

  $scope.newGame = function(){
    //set token fo defaults
    $scope.activePlayerId = $scope.firstPlayer.id
    getCell(3,3).player = $scope.activePlayer()
    getCell(4,3).player = $scope.nextPlayer()
    getCell(3,4).player = $scope.nextPlayer()
    getCell(4,4).player = $scope.activePlayer()
  }

  //***
  //private members
  //***
  var directions = GridHelp.Directions();

  var checkGameCompletion = function(){
    var maxPlays = $scope.boardWidth * $scope.boardHeight; 
    if($scope.turns >= maxPlays){
      $scope.gameStatus = 'complete'
    }
  }

  var getCell = function(x,y){
    if($scope.gameBoard.rows[x] == undefined){
      return undefined
    }else{
      return $scope.gameBoard.rows[x][y]
    }
  }

  var placeToken = function(cell){
    if( cell.player == undefined ){
      cell.player = $scope.activePlayer();
      $scope.activePlayer().score += 1;
      $scope.activePlayerId = $scope.nextPlayer().id;
    }
  }

  //perform all flanking flip operations for this cell
  //return true if anything was processed
  var processSideEffects = function(cell){
    results = []
    for(direction in directions){
      results.push(walkDirection(cell, directions[direction], []));
    }
    return (results.indexOf(true) > -1)
  }

  var walkDirection = function(cell,direction,cellStack){
    var next   = getCell( (cell.x + direction.x), (cell.y + direction.y) )
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
      $scope.activePlayer().score += 1
      $scope.nextPlayer().score   -= 1
    }
  }

  
});
