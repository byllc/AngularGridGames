app.controller("CheckersGameBoardController", function($scope){
  GridGameHelp.ScopeDecorator($scope);
 
  $scope.processClick = function(cell){
    $scope.clearFlash()
    player = $scope.activePlayer()
    if($scope.activeCell){

      //will follow the validMove check and return with details
      //about walking the board for example, if players were captured
      var skipTrace = {} 

      if($scope.validMove(cell,player,skipTrace)){
        cell.addPlayer( player )
        processCaptures(skipTrace)
        $scope.activeCell.removePlayer()
        $scope.clearActiveCell()
        $scope.passPlay()
      } else {
        $scope.flash = "Not a Valid Move"
      }
    }else if( cell.ownedBy( $scope.activePlayer() ) ){
      $scope.activateCell(cell)  
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

  $scope.validMove = function(cell, player, skipTrace){
    var validMoves = validBasicMoveVectors()[player.id]
    var cellFound  = false
    for(move in validMoves){
      var coords = validMoves[move]
      var targetCoords = mergeCoordinates($scope.activeCell, coords)
      var target       = $scope.getCell(targetCoords.x,targetCoords.y)
      //second hop in the same direction
      var secondCoords = mergeCoordinates(target,coords)
      var secondTarget = $scope.getCell(secondCoords.x,secondCoords.y)

      if(target && cell.equals(target) && target.unowned() ){
        cellFound = true
        break
      //target is occupied so we check the next cell
      }else if(target.player && cell.equals(secondTarget)){
        skipTrace.capture = target
        cellFound = true
        break
      }
    }
    return cellFound;
  }

  //***
  //private members
  //***
  var mergeCoordinates= function(c1,c2){
    return { x: c1.x + c2.x, y: c1.y + c2.y }
  }
 
  var validBasicMoveVectors = function(){
    var dirs = GridGameHelp.Directions()
    return [ [dirs['sw'], dirs['se'] ],  [dirs['nw'], dirs['ne'] ] ]
  }
  
  var processCaptures = function(skipTrace){
    if(skipTrace.capture){
      skipTrace.capture.removePlayer()
      $scope.activePlayer().addPoints(1)
    }
  }

 });
  