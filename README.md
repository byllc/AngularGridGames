# Angular Grid Games

An angular directive and small framework for quickly designing 2d grid based board games. This is a work in progress. The Checkers and Othello game examples are functional.

Years ago I wrote an othello clone when I was learning javascript, more than decade later now, while researching angularjs, I thought it would be cool to revisit 2d board games on a modern stack.  

## Usage

Currently you need to include grid_board_games.js and the controller for the games you would like to use (othello_game_board_controller.js, chess... et). All styles and layout are handled through css. The directive applies minimal classes to the layout. 

## Here is an example usage
```html
<div class='gameContainer' ng-controller='OthelloGameBoardController'>
    <div ng-game-board cols='8' rows='8' ng-model='gameBoard'></div> 
    <ul>
      <li>{{ activePlayer().name }} it's your move </li>
      <li ng-repeat='player in players'>
        <span class='{{player.token}}Token'>{{player.name}}: </b> {{player.score}}
      </li>
     </ul>

     <select ng-model='firstPlayer' ng-options='player.name for player in players'></select>
    
     <button ng-click='newGame()'/>New Game</button>
     {{ gameStatus }}
 </div>

```

##Generates the following grid and playable game
![alt tag](https://raw.github.com/byllc/AngularGridGames/master/images/othello.png)

##And Checkers is now functional with single jump mechanics
![alt tag](https://raw.github.com/byllc/AngularGridGames/master/images/checkers.png)

##Chess is a work in progress
![alt tag](https://raw.github.com/byllc/AngularGridGames/master/images/chess.png)

The look and feel differences are completely handled via css

##Tests
Test have been provided in Jasmine. You can view them by loading spec_runner.html in a browser
![alt tag](https://raw.github.com/byllc/AngularGridGames/master/images/spec.png)

##TODO
 * Other Games (Chess, Go, Pente, Peg Solitaire, tic-tac-toe)
 * Get a demo on gh-pages branch
