        var enemyCnt=0; // 적이 사라진 수를 카운트함 _JHY
   	    var nullEnemy= []; //사라진 적의 인덱스를 저장할 배열 _JHY
        var bulletIndex = 0;
        var enemybulletIndex =0;// 적 총알 배열 index _YYJ
        var myBullets = [];
        var enemymyBullets=[];// 적 총알 객체 _YYJ
        var myGamePiece;
        var myGameEnemy = [];
        var item;
        var bulletFire = 20;
        var now = new Date();
        var itemStart;
        var itemEnd;
        var score = 0;       

        function startGame() {
            myGamePiece = new component(30, 30, "red", 350, 500);         
            for(var cnt = 0 ; cnt < 10; cnt++){
                myGameEnemy[cnt] = new enemy(30 ,30, "black", Math.random()*700, Math.random()*700 ); //25 + 31*cnt, 100
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
            this.width = 4;
            this.height = 10;
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
                ctx.fillStyle = "green";
                ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
                ctx.restore();
            }           
         }
         // 수정  적 총알생성자 새로 생성 _YYJ 
         function enemybullet(x, y, type){
             this.type = type;
             this.width = 2;
             this.height = 5;
             this.speedY = 0;
             this.speedX = 0;
             this.x = x;
             this.y = y;
             this.speedY = 0;
             this.fire = function(y){
                 this.y += this.speedY;
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
		//총알 생성
        function creBullet(bulletFire){
            if(bulletIndex % bulletFire == 0){
                myBullets[bulletIndex] = new bullet(myGamePiece.x, myGamePiece.y); 
            }
            bulletIndex++;      
        }

        function Item(width, height, x, y){
            this.width = width;
            this.height = height;
            this.speedY = 2;
            this.speedX = 2;
            this.x = x;
            this.y = y;
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
                ctx.fillStyle = "Green";
                ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
                ctx.restore();
            } 
        }

         function enemy(width, height, color, x, y, type){
            this.type = type;
            this.width = width;
            this.height = height;
            //this.speedY = 0;
           // this.speedX = 0;
            this.speed = 0.5;
            this.speedX = 0.7;
            this.angle = 2;
            this.moveAngle = 0.1;
            this.x = x;
            this.y = y;
            /*
            this.newPosY = function(){
                this.y -= this.speedY;
            }   
            this.newPosX = function(){
                this.x += this.speedX;
            }*/
            this.update = function(){
                ctx = myGameArea.context;
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.fillStyle = color;
                ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
                ctx.restore();
            } 
            //회전시킴_JHY 
            this.newPos = function() {
                this.angle += this.moveAngle * Math.PI / 180;
                this.x +=  Math.sin(this.angle*35) * Math.sin(this.angle*15) * Math.sin(this.angle*35) * 6 ;
                this.y += Math.log(this.angle);
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
                        
             //                          주인공 객체 부분                           //
             myGameArea.clear();            
             myGamePiece.speedY = 0;
             myGamePiece.speedX = 0;
             if (myGameArea.keys && myGameArea.keys[38]) {myGamePiece.speedY = 7;}
             if (myGameArea.keys && myGameArea.keys[40]) {myGamePiece.speedY = -7;}
             if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.speedX = 7;}
             if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.speedX = -7;}
             if (myGameArea.keys && myGameArea.keys[32]) {creBullet(bulletFire);}
             myGamePiece.newPosY();
             myGamePiece.newPosX();      
             if(myGamePiece.x > 670){
                myGamePiece.x = 670;
             } if (myGamePiece.x <30){
                myGamePiece.x = 30;
             } if (myGamePiece.y > 680){
                myGamePiece.y = 680;
             } if (myGamePiece.y < 10){
                myGamePiece.y = 10;
             }
             if(bulletFire == 2){
                 itemEnd = now.getSeconds();
                 if(Math.abs(itemEnd - itemStart) > 2){
                     bulletFire = 20;
                 }
             }
             myGamePiece.update(); 

            //                          적군 객체 부분                           //
             for(var cnt = 0 ; cnt < myGameEnemy.length; cnt++){
                 if(myGameEnemy[cnt] != null){
                	myGameEnemy[cnt].newPos();
                    // 적 총알에 객체 생성 , 적의 위치 
                    if(enemybulletIndex % 20 == 0 && enemybulletIndex != 0 ){
                    	 enemymyBullets[enemybulletIndex] = new enemybullet(myGameEnemy[cnt].x, myGameEnemy[cnt].y); 
                         enemybulletIndex++;
                     }
                     enemybulletIndex++; 
                     if (myGameEnemy[cnt].y > 700){
                        myGameEnemy[cnt].y = 0;
                    }
                    myGameEnemy[cnt].update();
                    myGameEnemy[cnt].update();
                 }               
             }           
             try{
                 for(var idx = 0; idx < bulletIndex; idx++){
                    if(idx%bulletFire == 0 && myBullets[idx] != null){
                    myBullets[idx].speedY = 7;
                    myBullets[idx].fire();       
                    myBullets[idx].update(); 
                    if (myBullets[idx].y < -50){
                        myBullets[idx] = null;
                    }                     
                    }
                 }
                for(var idxz = 0; idxz < enemybulletIndex; idxz++){
                     if(idxz%20 == 0 && enemymyBullets[idxz] != null){
                    	 enemymyBullets[idxz].speedY = 7;
                    	 enemymyBullets[idxz].fire();              
                    	 enemymyBullets[idxz].update(); 
                        if (enemymyBullets[idxz].y > 750){
                        enemymyBullets[idxz] = null;
                        }        
                     }
                }
             }finally{}   
                          
             var color=["red","orange","Yellow","blue","black","white","tomato","pink"];
             var enemyPosX=parseInt(Math.random()*400)+30;
             var enemyPosY=parseInt(Math.random()*225)+30;
             var choice=parseInt(Math.random()*8);
             
             // 적이 총에 맞았을 때 
             for(var idx = 0; idx < myGameEnemy.length; idx++){
                for(var cnt = 0; cnt < myBullets.length; cnt++){
                	
                    if(myGameEnemy[idx] != null && myBullets[cnt] != null){
	                    if(cnt%20 == 0 && Math.sqrt(Math.pow(myBullets[cnt].x - myGameEnemy[idx].x, 2))
	                         + Math.pow(myBullets[cnt].y - myGameEnemy[idx].y, 2) < 50)
	                    {   
	                        myGameEnemy[idx] = null;
	                        myBullets[cnt] = null;
                            score++;
	                        nullEnemy[cnt] = myGameEnemy[idx]; // 사라진 적의 인덱스를 저장함
	                        // 2개 정도 남았을 때 사라진 적만 생기도록 수정해야함!! + 다시 생길 때 두 번 생기는 것도 고쳐야함
	                        /****************새로 추가한 부분 _ JHY _ 170417*********************/
	                        if(myGameEnemy[idx]==null){ // 적이 총에 맞았을 때 카운트함.
	                        	enemyCnt++;
	                        	if(enemyCnt>=myGameEnemy.length){ // null값이고 적이 없을때 다시 생성한다.
	                        		var timeEnd=setTimeout(function(){
	                        		for(var cnt = 0 ; cnt < 10; cnt++){
	                        			enemyCnt=0; //초기화
	                        			// 구별을 위해 색을 바꿈
	                        			 myGameEnemy[cnt] = new enemy(30 ,30, color[choice], Math.random()*700, Math.random()*700);
	                                } 
	                        		},300); // timeEnd
	                        	}
	              	        }
	                    }
                    }
                }
            }

            //                스코어보드 부분                   //
            myScore.text = "Score : " + score;
            myScore.update(); 
            //                아이템 생성로직                   //
            if( score % 5 == 0 && item == null){
                item = new Item(30, 30, Math.random()*700, Math.random()*700); 
                }
            if(item != null){
                if(item.x < 0){
                    var temp = item.speedX;
                    item.speedX = -1 * temp;
                }if(item.x > 700){
                    var temp = item.speedX;
                    item.speedX = -1 *temp;
                }if(item.y < 0){
                    var temp = item.speedY;
                    item.speedY = -1 *temp;
                }if(item.y >700){
                    var temp = item.speedY;
                    item.speedY = -1 *temp;
                }
                item.newPosX();
                item.newPosY();
                item.update();
                if(Math.abs(myGamePiece.x - item.x) < 20 && Math.abs(myGamePiece.y - item.y) < 20){
                    item = null;
                    //setInterval(5000, function(){bulletFire = 1});
                    bulletFire = 2;
                    itemStart = now.getSeconds();
                }
            }

             /*
            if(enemyCnt<=7) {
            	for(var cnt = 0 ; cnt < 10; cnt++){
            		if(myGameEnemy[cnt]==null)
                   		 myGameEnemy[cnt] = new enemy(30 ,30, "black", 225 + 31*cnt, 225);
                } 
            }
            */ 
            
        }

        var myGameArea = {
            canvas :
            document.createElement("canvas"),
            start : function(){
                this.canvas.width = 700;
                this.canvas.height = 700;
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