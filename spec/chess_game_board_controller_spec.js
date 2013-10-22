describe("ChessGameBoardController", function() {
  var $scope, controller;

  beforeEach(function() {
    module('GridBoardGame');
  });

  beforeEach(inject(function ($rootScope, $controller) {
    $scope = $rootScope.$new();
    controller = $controller('ChessGameBoardController', {
      $scope: $scope 
    });
  }));

  describe("while moving", function(){

    beforeEach(function(){
      activeCell = new GridGameHelp.Cell(1,0)
      targetCell = new GridGameHelp.Cell(2,0)
      badCell    = new GridGameHelp.Cell(3,3)
      $scope.addCell(activeCell)
      $scope.addCell(targetCell)
      $scope.addCell(badCell)

      wpawn = new GridGameHelp.Piece("white pawn"  , '&#9823', '♟', ['s'] )
      bpawn = new GridGameHelp.Piece("black pawn"  , '&#9823', '♟', ['n'] )
      wplayer = new GridGameHelp.Player(0,"Joe")
      bplayer = new GridGameHelp.Player(0,"Jen")
    });

    it('should know how to parse for valid moves for white pawn', function(){
      activeCell.addOccupant(wpawn)
      activeCell.addPlayer(wplayer)
      $scope.activateCell(activeCell)

      expect($scope.validMove(targetCell,wplayer)).toBe(true)
    });

    it('should know how to parse for invalid moves for white pawn', function(){
      activeCell.addOccupant(wpawn)
      activeCell.addPlayer(wplayer)
      $scope.activateCell(activeCell)

      expect($scope.validMove(badCell,wplayer)).toBe(false)
    });


    it('should know how to parse for valid moves for black pawn', function(){
      activeCell.addOccupant(bpawn)
      activeCell.addPlayer(bplayer)
      $scope.activateCell(activeCell)

      expect($scope.validMove(targetCell,bplayer)).toBe(true)
    });

    
  })



});