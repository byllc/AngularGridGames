app.controller("ChessGameBoardController", function($scope){
  $scope.gameBoard      = new Object();
  $scope.gameBoard.rows = new Array();
  $scope.boardWidth     = 8
  $scope.boardHeight    = 8
  $scope.gameStatus     = ''

  $scope.players = [ 
    { id: 0, next: 1, name: 'Player 1', score: 0, token: 'p2'},
    { id: 1, next: 0, name: 'Player 2', score: 0, token: 'p1'}
  ]

  

 ));
  