var GridGameHelper = function(){
  return {

    /* A single game board cell object
       x: X location in grid
       y: Y location in grid
       player: the player or players who own or occupy this cell */
    Cell: function(x,y,player){
      this.x      = x
      this.y      = y 
      this.player = player
      this.active = false
      this.location = [x,y]
      this.decoration = ""

      this.activate = function(){
        this.active = true
      }
      this.addPlayer = function(player){
        this.player = player
      }
      this.deactivate = function(){
        this.active   = false
      }
      this.equals    = function(other){
        return this.x == other.x && this.y == other.y
      }
      this.getIcon   = function(){
        return this.occupant ? this.occupant.icon : ""
      }
      this.hasPlayer = function(){
        return !(this.player == undefined)
      }
      this.addOccupant = function(obj){
        this.occupant = obj
      }
      this.removeOccupant = function(){
        this.occupant = undefined
      }
      this.removePlayer = function(){
        this.player = undefined
      }
      this.token = function(){
        return this.player && this.player.token + "Token";
      }
      this.tokenIs = function(token){
        return this.player && this.player.token == token
      }
      this.unowned = function(){
        return this.player == undefined
      }
      this.unoccupied = function(){
        return this.occupant = undefined
      }
      this.statusToken = function(){
        return this.active ? "active" : "inactive";
      }
      this.ownedBy    = function(player){
        return this.player && player.id == this.player.id
      }

    },

    /* Direction Vectors for moving around the grid */
    Directions: function(){ 
       return {
           n: { x: -1, y: 0 },
          ne: { x: -1, y: 1 },
           e: { x:  0, y: 1 },
          se: { x:  1, y: 1 },
           s: { x:  1, y: 0 },
          sw: { x:  1, y: -1},
           w: { x:  0, y: -1},
          nw: { x: -1, y: -1}
       }
    },   

    /* A GameBoard 
       The expected usage is via angularjs therefore the parameters are those
       required for the angular 'link' option for directives
       scope: The scope that contains the Game board control mechanisms
       element: the element that will contain the game board
       attrs:   attributes
       controller: The controller for the game board */
    GameBoard: function(scope, element, attrs, controller){
      scope.boardWidth   = attrs.cols;
      scope.boardHeight  = attrs.rows;
      scope.gameBoard    = scope.gameBoard || {}
      scope.gameBoard.rows = new Array()

      for(var x=0; x < attrs.cols; x++){
        scope.gameBoard.rows[x] = new Array();
        for(var y=0; y < attrs.rows; y++){
          scope.gameBoard.rows[x][y] = new GridGameHelp.Cell(x,y,undefined);
        }
        y = 0;
      }
  
    }, 


    /* A generalized game piece object
       name: a label
       html: html code representation 
       icon: image or character */
    Piece: function(name, html, icon, moves){
        this.name = name
        this.icon = icon
        this.html = html
        this.validMoves = moves
    },


    /* A Generalized player object 
       id: Normally the expected index in the players array
       name: The name of the player
       token: a simple identifier
       next:  we can cycle the players in any order */
    Player: function(id,name,token,next){
      this.id    = id
      this.name  = name
      this.token = token
      this.score = 0
      this.next  = next
      this.addPoints = function(points){
        this.score = Number(this.score) + Number(points)
      }
    },


    /*Set up the default scope values and behaviors
      for a Game Board Controller
      scope: a scope object */
    ScopeDecorator: function(scope){
      scope.gameBoard      = new Object();
      scope.gameBoard.rows = new Array();
      scope.boardWidth     = 8
      scope.boardHeight    = 8
      scope.gameStatus     = ''
      scope.activeToken  = undefined
      scope.activeCell   = undefined

      scope.players      = [ 
        new GridGameHelp.Player(0,'Player 1','p1',1),
        new GridGameHelp.Player(1,'Player 2','p2',0)
      ]

      scope.activePlayerId = 0
      scope.firstPlayer  = scope.players[0]
      scope.addCell     = function(cell){
        scope.rows[cell.x] = scope.rows[cell.x] || new Array()
        scope.rows[cell.x][cell.y] = cell
      }
      scope.statusToken = function(x,y){
        return scope.getCell(x,y).active ? 'active' : ''
      }
      scope.activePlayer = function(){
        return scope.players[ scope.activePlayerId ]
      }
      scope.activateCell = function(cell){
         cell.activate() 
         scope.activeCell = cell
      }
      scope.clearActiveCell = function(){
        scope.activeCell.deactivate()
        scope.activeCell = undefined
      }
      scope.clearFlash = function(){
        scope.flash = ''
      }
      scope.activatePlayer = function(player){
        scope.activePlayerId = player.id
      }
      scope.nextPlayer = function(){
        return scope.players[ scope.activePlayer().next ]; 
      }
      scope.getCell    = function(x,y){
        if( scope.gameBoard.rows[x] == undefined ){
          return undefined
        }else{
          return scope.gameBoard.rows[x][y]
        }
      }
      scope.passPlay     = function(){
        scope.activePlayerId = scope.nextPlayer().id
      }
      
      scope.placeToken = function(cell){
        if( cell.player == undefined ){
          cell.player = scope.activePlayer();
        }
      }
      scope.rows = function(){
        return this.gameboard.rows
      }
      scope.swapActiveCell = function(cell){
        scope.activeCell.deactivate()
        scope.activateCell(cell)
      }
      scope.swapDecorations = function(cell1,cell2){
        var tempDecoration = cell1.decoration
        cell1.decoration   = cell2.decoration
        cell2.decoration   = tempDecoration
      }

    },
  
    //TODO: move this to separate template file
    // The basic board game html template
    Template: function(){
      var tpl ="<div ng-repeat='row in gameBoard.rows' class='gameRow'>"
          +"      <div ng-repeat='cell in gameBoard.rows[$index]' ng-class='cell.statusToken()' class='gameCell' ng-click='processClick(cell)'>"
          +"        <div draggable='true' ng-class='cell.token()' class='token'>"
          +"            <span class='icon'>{{cell.getIcon()}}</span>"
          +"            <span class='decoration'>{{cell.decoration}}</div>"
          +"      </div>"
          +"   </div>"
          +"   <div class='clear'/>"
      return tpl;
    }
  }
}