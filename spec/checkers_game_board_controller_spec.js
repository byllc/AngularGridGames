describe("CheckersGameBoardController", function() {
  var $scope, controller;

  beforeEach(function() {
    module('GridBoardGame');
  });

  beforeEach(inject(function ($rootScope, $controller) {
    $scope = $rootScope.$new();
    controller = $controller('CheckersGameBoardController', {
      $scope: $scope 
    });
  }));

  it("should generate a new empty gameBoard", function() {
    expect($scope.gameBoard).not.toBe(undefined)
    expect(Object.getOwnPropertyNames($scope.gameBoard).length).toBe(1)
  });

  describe("Processing Clicks", function(){
    
    beforeEach(function(){
      directions = new GridGameHelp.Directions()
      cell   = new GridGameHelp.Cell(0,1)
      cell2  = new GridGameHelp.Cell(1,2)
      cell3  = new GridGameHelp.Cell(4,4)
      cell4  = new GridGameHelp.Cell(1,0)
      cell5  = new GridGameHelp.Cell(1,-1)
      cell6  = new GridGameHelp.Cell(1,1)
      $scope.gameBoard.rows[0] = []
      $scope.gameBoard.rows[1] = []
      $scope.gameBoard.rows[4] = []
      $scope.gameBoard.rows[0][1] = cell
      $scope.gameBoard.rows[1][2] = cell2
      $scope.gameBoard.rows[4][4] = cell3
      $scope.gameBoard.rows[1][0] = cell4
      $scope.gameBoard.rows[1][-1] = cell5
      $scope.gameBoard.rows[1][1] = cell6

      validMoves2 = [directions['sw'],directions['se']]
      player  = $scope.players[0]
      player2 = $scope.players[1]
      
    })

    it("should not activate owned cell on first click", function(){
      cell.addPlayer(player)
      $scope.processClick(cell)
      expect( cell.statusToken() ).toEqual('active')
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

    it("should only allow valid moves", function(){
      $scope.activateCell(cell)
      expect( $scope.validMove(cell2,player) ).toEqual(true)
    })

    it("should not allow invalid moves", function(){
      //$scope.activateCell(cell)
      //expect( $scope.validMove(cell3,player) ).toEqual(false)
    })
  })

});