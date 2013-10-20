describe("GridGameHelpers", function() {

  beforeEach(function() {
  	GridGameHelp = new GridGameHelper();
  });

  describe("Cell Object", function(){

    beforeEach(function() {
      player = {}
  	  cell = new GridGameHelp.Cell(1,1,player)
    });
  
    it('Should know where it is in the grid', function(){
    	expect(cell.location()).toEqual([1,1])
    });

    it('Should know when a player is assigned', function(){
        expect( cell.hasPlayer() ).toEqual(true)
    });

    it('Should know when a player is not assigned', function(){
    	cell.player = undefined
        expect( cell.hasPlayer() ).toEqual(false)
    });

    it('should be inactive by default', function(){
        expect( cell.active ).toBe(false)
    });

  });

  describe("Player Object", function(){

    beforeEach(function() {
      playerId = 0
      name     = "Joe Smith"
      token    = "pl1"
      player = new GridGameHelp.Player(playerId,name,token,1)
  	});
  
    it('should know its name', function(){
    	expect(player.name).toEqual(name)
    });

    it('should know its token', function(){
    	expect(player.token).toEqual(token)
    });

  });

  describe("Game Board", function(){
   
    beforeEach(function() {
      scope = {}
      element = {}
      attrs = { cols: 2, rows: 2 }
      ctrl = {}
      gameBoard = new GridGameHelper.GameBoard(scope,element,attrs,ctrl)
    });

    it("should populate game board", function(){
      expect(gameBoard.rows.length).toBe(2)
    })

  });
});