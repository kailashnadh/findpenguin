
var hideout = document.getElementById('gameholder');
var music = new Audio('audio/Mii Channel Music.mp3');
var score = 0;
 $("#score").text("Score: " + score );
  

var Game = function() {
  this.MOUNDS = 9;
  this.penguins = [];
  this.yeti = Math.floor(Math.random() * this.MOUNDS);
};

 $("#start-game").on("click",function()
    {
        //Starts the game
        $(this).css({"visibility":"hidden"});
       
      
      
        music.play();
         hideout.innerHTML='';
         var game = new Game();
    game.start();
	 score = 0;
        $("#score").text("Score: " + score);
   
    });

    function updateScore()
    {
        score += 10;
        $("#score").text("Score: " + score);
    }


     function resetGame()
    {
        //alert("Game over! Your score was: " + score);
       
         music.pause();

        $("#start-game").css({"visibility":"visible"});
       

    }

    

Game.prototype.start = function() {
   $(this).css({"visibility":"hidden"});
  this.hidePenguins(this.penguins);
  this.hideYeti();
  this.render();

  console.log(this.penguins);
}

Game.prototype.hidePenguins = function(penguins) {
  for(var i=1; i<this.MOUNDS; i++) {
    penguins.push('penguin'+i);
  }

  var i = 0,
      j = 0,
      temp = null;

  for (i = penguins.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    temp = penguins[i];
    penguins[i] = penguins[j];
    penguins[j] = temp;
  }

  return penguins;
};

Game.prototype.hideYeti = function() {
  this.penguins.splice(this.yeti, 0, 'yeti');
}

Game.prototype.render = function() {
  hideout.innerHTML='';
   var titleDiv = document.createElement('div');
    titleDiv.setAttribute("id", "title");
    hideout.appendChild(titleDiv);
  for(var i=0; i<this.penguins.length; i++) {
    var innerDiv = document.createElement('div');
    innerDiv.setAttribute("id", this.penguins[i]);
    /*item = document.createElement('li');
    item.setAttribute("id", this.penguins[i]);*/
    //item.classList.add(this.penguins[i]);
    hideout.appendChild(innerDiv);
  }
}

Game.prototype.stop = function(yeti) {
  var el=[];
  for(i=0;i<9-1;i++)
  {
    el[i]=document.getElementById('penguin'+(i+1));
  }
  var header = document.getElementById('page-header');
  for (var i = 0; i < el.length; i++) {
    el[i].classList.remove('found');
    el[i].classList.add('disabled');
  }

  yeti.classList.add('found');
  
  resetGame();


}


hideout.addEventListener('click', function(e){
  var thisMound = e.target;
  //thisMound.classList.add('active');
  thisMound.classList.add('found');
  updateScore();
  
  if(e.target.id=='yeti') {
    document.body.classList.add('yeti-found');
    game.stop(thisMound);
  }
});

window.onload = function() {
  hideout.innerHTML='';
  
};

