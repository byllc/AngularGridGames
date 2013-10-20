describe("OthelloGameBoardController", function() {
  var $scope, controller;

  beforeEach(function() {
    module('GridBoardGame');
  });

  beforeEach(inject(function ($rootScope, $controller) {
    $scope = $rootScope.$new();
    controller = $controller('OthelloGameBoardController', {
      $scope: $scope 
    });
  }));

  it("should generate a new empty gameBoard", function() {
    expect($scope.gameBoard).not.toBe(undefined)
    expect(Object.getOwnPropertyNames($scope.gameBoard).length).toBe(1)
  });

  it("should have two players", function(){
    expect($scope.players.length).toBe(2)
  });

  it("should have default board width set", function(){
    expect($scope.boardWidth).toBe(8) 
  });

  it("should have default board height set", function(){
    expect($scope.boardWidth).toBe(8) 
  });

  it("have and empty row set intializes", function(){
    expect($scope.gameBoard.rows.length).toBe(0) 
  });

  it("should have default player set to first person in array", function(){
    expect($scope.activePlayer()).toBe($scope.players[0])
  });

  it("should have nextPlayer set to next person in array", function(){
    expect($scope.nextPlayer()).toBe($scope.players[1])
  });


});