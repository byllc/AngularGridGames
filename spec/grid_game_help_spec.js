describe("GridGameHelpers", function() {
 
  beforeEach(function() {
  	GridGameHelp = new GridGameHelper();
  });

  describe("Cell Object", function(){

    beforeEach(function() {
      player = {name: "Test"}
  	  cell = new GridGameHelp.Cell(1,1)
    });
  
    it('Should know where it is in the grid', function(){
    	expect(cell.location).toEqual([1,1])
    });

    it('Should know when a player is assigned', function(){
    	cell.addPlayer(player)
        expect( cell.hasPlayer() ).toEqual(true)
    });

    it('Should know when a player is not assigned', function(){
    	cell.removePlayer()
        expect( cell.hasPlayer() ).toEqual(false)
    });

    it('should be inactive by default', function(){
        expect( cell.active ).toBe(false)
    });

    it('should add a player', function(){
      cell.addPlayer(player)
      expect( cell.player ).toEqual(player)
    })

    it('should return active token when active', function(){
    	cell.activate()
    	expect( cell.statusToken()).toEqual('active')
    })

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

    it('should add points to score', function(){
      player.addPoints(2)
      expect(player.score).toBe(2)
    });

  });

  describe("Directions", function(){
    beforeEach(function(){
       north     = { x: -1, y: 0 }
       northeast = { x: -1, y: 1 }
       east      = { x:  0, y: 1 }
       southeast = { x:  1, y: 1 }
       south     = { x:  1, y: 0 }
       southwest = { x:  1, y: -1}
       west      = { x:  0, y: -1}
       northwest = { x: -1, y: -1}      

      directions = GridGameHelp.Directions()
    });
    
    it("should know north", function(){
      expect(directions['n']).toEqual(north)
    });

    it("should know northeast", function(){
      expect(directions['ne']).toEqual(northeast)
    });

    it("should know east", function(){
      expect(directions['e']).toEqual(east)
    });

    it("should know southeast", function(){
      expect(directions['se']).toEqual(southeast)
    });

    it("should know south", function(){
      expect(directions['s']).toEqual(south)
    });

    it("should know southwest", function(){
      expect(directions['sw']).toEqual(southwest)
    });

    it("should know west", function(){
      expect(directions['w']).toEqual(west)
    });

    it("should know southest", function(){
      expect(directions['nw']).toEqual(northwest)
    });

  }),

  describe("Game Board", function(){
   
    beforeEach(function() {
      scope   = {}
      element = {}
      attrs   = { cols: 2, rows: 2 }
      ctrl    = {}
      //gameBoard = new GridGameHelper.GameBoard(scope,element,attrs,ctrl)
    });

    it("should populate game board", function(){
      //expect(gameBoard.rows.length).toBe(2)
    })

  });

  describe("Scope Decorator", function(){
     beforeEach(function(){
       scope = {}
       cell = new GridGameHelp.Cell(1,2)
       GridGameHelp.ScopeDecorator(scope)
     });

     it("should add default game board", function(){
       expect(scope.gameBoard).not.toBe(undefined)
     });

     it("should add default rows", function(){
       expect(scope.gameBoard.rows).not.toBe(undefined)
     });

     it("should add default players", function(){
       expect(scope.players.length).toBe(2)
     });

     it("should assign current player", function(){
        expect(scope.activePlayerId).toBe(0)
     });

     it("should activate cell when asked", function(){
     	scope.activateCell(cell)
     	expect(scope.activeCell).toEqual(cell)
        expect(scope.activeCell.statusToken()).toEqual('active')
     })
  });
});