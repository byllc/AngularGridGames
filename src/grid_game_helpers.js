var GridGameHelper = function(){
  return {

    /* A single game board cell object
       x: X location in grid
       y: Y location in grid
       player: the player or players who own or occupy this cell */
    Cell: function(x,y,player){
      this.x     = x;
      this.y     = y; 
      this.player = player;
      this.active = false;
     
      this.hasPlayer = function(){
        return !(this.player == undefined)
      }

      this.location = function(){
        return [x,y];
      }

      this.token = function(){
        return this.player && this.player.token + "Token";
      };

      this.tokenIs = function(token){
        return this.player && this.player.token == token
      };

      this.activeToken = function(){
        return active ? "active" : "";
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
    },
  
    //TODO: move this to separate template file
    Template: function(){
      var tpl ="<div ng-repeat='row in gameBoard.rows' class='gameRow'>"
          +"      <div ng-repeat='cell in gameBoard.rows[$index]' ng-class='class.activeToken()' class='gameCell' ng-click='processTurn(cell)'>"
          +"        <div draggable='true' ng-class='cell.token()' class='token'></div>"
          +"      </div>"
          +"   </div>"
          +"   <div class='clear'/>"
      return tpl;
    }
  }
}