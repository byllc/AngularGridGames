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

});