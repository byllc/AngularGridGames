# Angular Grid Games

An angular directive and small framework for quickly designing 2d grid based board games. This is a work in progress. The first game example Othello is playable. The basic idea is that the directive will manage the board, and it's tokens but the play dynamic of each token and the scoring can be handled in a controller specific to that game. 

## Here is an example usage from the index.html file
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

##TODO
 * Add Tests
 * Other Games (Chess, Go, Pente, Peg Solitaire)
 * Get a demo on gh-pages branch