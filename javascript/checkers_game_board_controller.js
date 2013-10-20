app.controller("CheckersGameBoardController", function($scope){
  var GridHelp = new GridGameHelper(); 

  $scope.gameBoard      = new Object();
  $scope.gameBoard.rows = new Array();
  $scope.boardWidth     = 8
  $scope.boardHeight    = 8
  $scope.gameStatus     = ''

  $scope.players = [ 
    { id: 0, next: 1, name: 'Player 1', score: 0, token: 'p1'},
    { id: 1, next: 0, name: 'Player 2', score: 0, token: 'p2'}
  ]

  //default first player
  $scope.firstPlayer = $scope.players[0]
  $scope.activePlayerId = $scope.firstPlayer.id
  $scope.activeToken  = undefined

  $scope.processTurn = function(cell){
    if($scope.activeToken){
      $scope.activeToken.player = undefined
      $scope.activeToken.active = false
      cell.player = $scope.activePlayer()
      console.log($scope.activePlayer())
    }else if(cell.player && Number($scope.activePlayerId) == Number(cell.player.id)){
      console.log("clicked my thing")
      $scope.activeToken = cell
      cell.active        = true
      $scope.activePlayerId = $scope.nextPlayer().id
    }
  }
 
  $scope.newGame = function(){
    $scope.activePlayerId = $scope.firstPlayer.id
    var pDefaults = [[1,3,5,7], [0,2,4,6], [1,3,5,7]];
    
    for( row in pDefaults){
      var rowId = Number(row);
      for( cell in pDefaults[row] ){
      	var cellId    = Number(pDefaults[row][cell]);
        var p2CellId  = cellId + ((cellId%2 == 1) ? -1 : 1);
        
        getCell(rowId, cellId).player   = $scope.activePlayer()
        getCell(rowId+5, p2CellId).player = $scope.nextPlayer()
      }
    }
    
  }

  $scope.activeTokenLabel = function(x,y){
    getCell(x,y).active ? 'active' : ''
  }

  $scope.activePlayer = function(){
    return $scope.players[ $scope.activePlayerId ]
  }

  $scope.nextPlayer = function(){
    return $scope.players[ $scope.activePlayer().next ]; 
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

 });
  