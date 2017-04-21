
var bulletIndex = 0;
var myBullets = [];
var myGamePiece;
var myGameEnemy = [];
var myScore;
var score = 0;

function startGame() {
    myGamePiece = new component(30, 30, "red", 40, 40);
    for(var cnt = 0 ; cnt < 10; cnt++){
        myGameEnemy[cnt] = new enemy(30 ,30, "black", 225 + 31*cnt, 225);
    }        
    myScore = new scoreboard("18px", "Sans", "black", 600, 40);
    myGameArea.start();      
}

        function component(width, height, color, x, y, type){
            this.type = type;
            this.width = width;
            this.height = height;
            this.speedY = 0;
            this.speedX = 0;
            this.x = x;
            this.y = y;
            this.update = function(){
                ctx = myGameArea.context;
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.fillStyle = color;
                ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
                ctx.fillRect(0, 0, this.width, this.height/2);
                ctx.fillRect(- 1* this.width, 0, this.width, this.height/2);
                ctx.fillStyle = "black";
                ctx.restore();
            }           
            this.newPosY = function(){
                this.y -= this.speedY;
            }   
            this.newPosX = function(){
                this.x += this.speedX;
            }
            this.crashWith = function(otherobj){
                var myleft = this.x;
                var myright = this.x + (this.width);
                var mytop = this.y;
                var mybottom = this.y + (this.height);
                var otherleft = otherobj.x;
                var otherright = otherobj.x + (otherobj.width);
                var othertop = otherobj.y;
                var otherbottom = otherobj.y + (otherobj.height);
                var crash = true;
                if( (mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)){
                    crash = false;
                }
                return crash;
            }
         }

         function bullet(x, y, type){
            this.type = type;
            this.width = 2;
            this.height = 5;
            this.speedY = 0;
            this.speedX = 0;
            this.x = x;
            this.y = y;
            this.speedY = 0;
            this.fire = function(y){
                this.y -= this.speedY;
            }             
            this.update = function(){
                ctx = myGameArea.context;
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.fillStyle = "black";
                ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
                ctx.restore();
            }           
         }

        function creBullet(){
            if(bulletIndex % 20 == 0){
                myBullets[bulletIndex] = new bullet(myGamePiece.x, myGamePiece.y); 
            }
            bulletIndex++;      
        }

         function enemy(width, height, color, x, y, type){
            this.type = type;
            this.width = width;
            this.height = height;
            this.speedY = 0;
            this.speedX = 0;
            this.x = x;
            this.y = y;
            this.speedX = 0;
            this.speedY = 0;
            this.newPosY = function(){
                this.y -= this.speedY;
            }   
            this.newPosX = function(){
                this.x += this.speedX;
            }
            this.update = function(){
                ctx = myGameArea.context;
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.fillStyle = color;
                ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
                ctx.restore();
            }           
         }

         function scoreboard(width, height, color, x, y){
             this.width = width;
             this.height = height;
             this.x = x;
             this.y = y; 
             this.update = function() {
                 ctx = myGameArea.context;
                 ctx.font = this.width + " " + this.height;
                 ctx.fillStyle = color;
                 ctx.fillText(this.text, this.x, this.y);
         }
        }

         function updateGameArea(){

             myGameArea.clear();
             myGamePiece.speedY = 0;
             myGamePiece.speedX = 0;

              for(var cnt = 0 ; cnt < myGameEnemy.length; cnt++){
                  if(myGameEnemy[cnt] != null){
                    myGameEnemy[cnt].speedY = Math.random(-0.0001,0.0001);
                    myGameEnemy[cnt].speedX = Math.random(-0.0005,0.0005);
                  }
              }

             if (myGameArea.keys && myGameArea.keys[38]) {myGamePiece.speedY = 7;}
             if (myGameArea.keys && myGameArea.keys[40]) {myGamePiece.speedY = -7;}
             if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.speedX = 7;}
             if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.speedX = -7;}
             if (myGameArea.keys && myGameArea.keys[32]) 
             {               
                creBullet();
             }
            //  for(var cnt = 0 ; cnt < myGameEnemy.length; cnt++){
            //     if (myGamePiece.crashWith(myGameEnemy[cnt])){

            //         if(myGamePiece.y + (myGamePiece.height) >= myGameEnemy[cnt].y){ 
            //             myGamePiece.y = myGameEnemy[cnt].y - myGamePiece.height;

            //         }else if(myGamePiece.y <= myGameEnemy[cnt].y + (myGameEnemy[cnt].height)){
            //             myGamePiece.y = myGameEnemy[cnt].y + (myGameEnemy[cnt].height);

            //         }if(myGamePiece.x + (myGamePiece.width) >= myGameEnemy[cnt].x){
            //             myGamePiece.x = myGameEnemy[cnt].x - myGamePiece.width;

            //         }else if(myGamePiece.x <= myGameEnemy[cnt].x + (myGameEnemy[cnt].width)){
            //             myGamePiece.x = myGameEnemy[cnt].x + (myGameEnemy[cnt].width);
            //         }
            //     }
            //  }
             myGamePiece.newPosY();
             myGamePiece.newPosX();
            //  myGameEnemy.newPosY();
            //  myGameEnemy.newPosX();   

            for(var cnt = 0 ; cnt < myGameEnemy.length; cnt++){
                 if(myGameEnemy[cnt] != null){
                    myGameEnemy[cnt].update();
                 }               
             }
             try{
                 for(var idx = 0; idx < bulletIndex; idx++){
                    if(idx%20 == 0 && myBullets[idx] != null){
                    myBullets[idx].speedY = 7;
                    myBullets[idx].fire();              
                    myBullets[idx].update(); 
                    }
                 }

             }finally{
             }             
             for(var idx = 0; idx < myGameEnemy.length; idx++){
                for(var cnt = 0; cnt < myBullets.length; cnt++){
                    if(myGameEnemy[idx] != null && myBullets[cnt] != null){
                    if(cnt%20 == 0 && Math.sqrt(Math.pow(myBullets[cnt].x - myGameEnemy[idx].x, 2))
                         + Math.pow(myBullets[cnt].y - myGameEnemy[idx].y, 2) < 50)
                    {
                        score++;
                        myGameEnemy[idx] = null;
                        myBullets[cnt] = null;

                    }
                    }
                }
            }   

            myScore.text = "Score : " + score;
            myScore.update();       
            myGamePiece.update();
 
        }

        var myGameArea = {
            canvas :
            document.createElement("canvas"),
            start : function(){
                this.canvas.width = 700;
                this.canvas.height = 400;
                this.context = this.canvas.getContext("2d");
                document.body.insertBefore(this.canvas, document.body.childNodes[0]);
                this.frameNo = 0;
                this.interval = setInterval(updateGameArea, 10);
                window.addEventListener('keydown', function (e){
                    e.preventDefault();
                    myGameArea.keys = (myGameArea.keys || []);
                    myGameArea.keys[e.keyCode] = (e.type == "keydown");
                })
                window.addEventListener('keyup', function(e){
                    myGameArea.keys[e.keyCode] = (e.tpye == "keydown");
                })
            },
            stop : function(){
                clearInterval(this.interval);
            },
            clear : function(){
                this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
            }
        }
        
window.onload = startGame();