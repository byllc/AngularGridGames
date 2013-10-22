app.controller("ChessGameBoardController", function($scope){
  GridGameHelp.ScopeDecorator($scope);

  $scope.processClick = function(cell){
    $scope.clearFlash()
    player = $scope.activePlayer()
    if($scope.activeCell){

      if($scope.validMove(cell,player)){
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
  	var pieces = ['g','b','r','k','q','b','r','g']
  	 var p1cell
  	 var p2cell 
  	 for(var j in pieces){
  	 	piece1 = $scope.pieces[ 'w' + pieces[j] ]
  	 	p1cell = $scope.getCell(0,j)
  	 	p1cell.addOccupant(piece1)
  	    p1cell.player = $scope.players[0]
        
        piece2 = $scope.pieces[ 'b' + pieces[j] ]
        p2cell = $scope.getCell(7,j)
        p2cell.addOccupant(piece2)
        p2cell.player = $scope.players[1]
  	 }

  	 for(var i=0; i<8; i++){
  	   piece1 = $scope.pieces['wp']
  	   p1cell = $scope.getCell(1,i)
  	   p1cell.addOccupant(piece1)
  	   p1cell.player = $scope.players[0]

       piece2 = $scope.pieces['bp']
       p2cell = $scope.getCell(6,i)
       p2cell.addOccupant(piece2)
       p2cell.player = $scope.players[1]
     }

  }


   
  $scope.validMove = function(cell,player){
    var moves = $scope.activeCell.occupant.validMoves
    var cells = new Array()
    var valid = false
    for(m in moves){
      valid = testMove(cell,moves[m])   
      if(valid){ break;  }      
    }

    return valid
  }

  $scope.pieces = { 
  	wk: new GridGameHelp.Piece("white king"  , '&#9812', '♔', ['n','ne','e','se','s','sw','w','nw']        ),
    wq: new GridGameHelp.Piece("white queen" , '&#9813', '♕', ['n*','ne*','e*','se*','s*','sw*','w*','nw*']),
    wr: new GridGameHelp.Piece("white rook"  , '&#9814', '♖', ['ne*','se*','sw*','nw*']                    ),
    wb: new GridGameHelp.Piece("white bishop", '&#9815', '♗', ['n*','e*','s*','w*']                        ),
    wg: new GridGameHelp.Piece("white knight", '&#9816', '♘', ['n+n+e','n+n+w','s+s+e','s+s+w','e+e+s','e+e+n','w+w+s','w+w+n']),
    wp: new GridGameHelp.Piece("white pawn"  , '&#9817', '♙', ['s']                                        ),
    bk: new GridGameHelp.Piece("black king"  , '&#9818', '♚', ['n','ne','e','se','s','sw','w','nw']        ),
    bq: new GridGameHelp.Piece("black queen" , '&#9819', '♛', ['n*','ne*','e*','se*','s*','sw*','w*','nw*']),
    br: new GridGameHelp.Piece("black rook"  , '&#9820', '♜', ['ne*','se*','sw*','nw*']                    ),
    bb: new GridGameHelp.Piece("black bishop", '&#9821', '♝', ['n*','e*','s*','w*']                        ),
    bg: new GridGameHelp.Piece("black knight", '&#9822', '♞', ['n+n+e','n+n+w','s+s+e','s+s+w','e+e+s','e+e+n','w+w+s','w+w+n']),
    bp: new GridGameHelp.Piece("black pawn"  , '&#9823', '♟', ['n']                                        )
  }


  //is this cell a valid move
  var testMove = function(cell, move){
	  var directions = new GridGameHelp.Directions()

	  //starting with naive, brute force matches, we will clean these up when
  	//when we flesh out the rest of the details here
  	var oneSpace   = /^(n|ne|e|se|s|sw|w|nw)$/g
  	var manySpaces = /^(n*|ne*|e*|se*|s*|sw*|w*|nw*)$/g
  	var jumps      = /^(n+n+e|n+n+w|s+s+e|s+s+w|e+e+s|e+e+n|w+w+s|w+w+n)$/g
    var targetCell
    var valid = false
    var moveDetail = {}
  	var matches = move.match(oneSpace)
    console.log(matches)
   console.log(move)
    if( matches && matches.length > 0 ){
        moveDetail.x = $scope.activeCell.x + directions[move].x
        moveDetail.y = $scope.activeCell.y + directions[move].y
        targetCell = $scope.getCell(moveDetail.x, moveDetail.y)
        valid = !cell.ownedBy( $scope.activePlayer ) 
  	}

      return valid;
    }

});




  