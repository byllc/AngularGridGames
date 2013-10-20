describe("CheckersGameBoardController", function() {
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

  describe("Processing Clicks", function(){
    
    beforeEach(function(){
      cell   = new GridGameHelp.Cell(0,0)
      cell2  = new GridGameHelp.Cell(1,1)
      player2 = $scope.players[1]
      
    })

    it("should not activate unowned cell on first click", function(){
      $scope.processClick(cell)
      expect( cell.statusToken() ).toEqual('inactive')
    })

    it("should deactivate active cell on second click", function(){
      cell.addPlayer(player2)
      $scope.processClick(cell)
      $scope.processClick(cell2)
      expect( cell.statusToken() ).toEqual('inactive')
    })

    it("should activate player when requested", function(){
      $scope.activatePlayer(player2)
      expect( $scope.activePlayer() ).toEqual( player2 )
    })
  })

});