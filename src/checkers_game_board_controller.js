app.controller("CheckersGameBoardController", function($scope){
  GridGameHelp.ScopeDecorator($scope);
 
  $scope.processClick = function(cell){

    if($scope.activeCell){
      cell.addPlayer( $scope.activePlayer() )
      $scope.activeCell.removePlayer()
      $scope.clearActiveCell()
      $scope.passPlay()
    }else if( cell.ownedBy( $scope.activePlayer() ) ){
      $scope.activateCell(cell)  
      console.log($scope.activeCell) 
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
        
        $scope.getCell(rowId, cellId).player   = $scope.activePlayer()
        $scope.getCell(rowId+5, p2CellId).player = $scope.nextPlayer()
      }
    }
    
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

  var validMove = function(cell,player){
    var dirs = GridGameHelp.Directions()
    var validCoords = [ [dirs['sw'], dirs['se'] ], 
                       [dirs['nw'], dirs['sw'] ] ]

    for(coords in validCoords[player.id]){
      
    }
  }
  

 });
  