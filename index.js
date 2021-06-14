window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-NFW3QQ0L31');

/*this section of script only deals with the swipe function in mobile phones. The code has only been tested on android devices*/
            document.addEventListener('touchstart', handleTouchStart, false);        
            document.addEventListener('touchmove', handleTouchMove, false);

            var xDown = null;                                                        
            var yDown = null;

            function getTouches(evt) {
            return evt.touches ||             
                    evt.originalEvent.touches; 
            }                                                     

            function handleTouchStart(evt) {
                const firstTouch = getTouches(evt)[0];                                      
                xDown = firstTouch.clientX;                                      
                yDown = firstTouch.clientY;                                      
            };                                                

            function handleTouchMove(evt) {
                if ( ! xDown || ! yDown ) {
                    return;
                }

                var xUp = evt.touches[0].clientX;                                    
                var yUp = evt.touches[0].clientY;

                var xDiff = xDown - xUp;
                var yDiff = yDown - yUp;

                if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
                    if ( xDiff > 0 ) {
                        /* left swipe */ 
                        moveleft();
                    } else {
                        /* right swipe */
                        moveright();
                    }                       
                } else {
                    if ( yDiff > 0 ) {
                        moveup();
                        /* up swipe */ 
                    } else { 
                        movedown();
                        /* down swipe */
                    }                                                                 
                }
                /* reset values */
                xDown = null;
                yDown = null;                                             
            };

var k;
                var myGamePiece;
                var score;
                var btncount=0;
                var obstacle1;
                function startGame() {
                    myGameArea.start();
                    myGamePiece = new snakeHead(16, 16, "red", 16, 160);
                    obstacle1 = new maze(5,100,47,89);
                    obstacle2 = new maze(70,5,168,298);
                    obstacle3 = new maze(5,50,179,59);
                    tail = new Queue();
                    }
                function setPace(input_pace) {
                    myGamePiece.pace=input_pace;
                }
                var myGameArea = {
                    canvas : document.createElement("canvas"),
                    start : function() {
                        this.canvas.width = 320;
                        this.canvas.height = 480;
                        this.canvas.style.display ="block";
                        this.canvas.style.marginLeft = "auto";
                        this.canvas.style.marginRight = "auto";
                        this.canvas.style.backgroundColor="blue";
                        this.canvas.style.overscrollBehavior="contain";
                        this.context = this.canvas.getContext("2d");
                        score=0;
                        tail = new Queue();
                        document.getElementById("display").innerHTML = score;
                        apple.set();
                        document.body.insertBefore(this.canvas, document.body.childNodes[2]);
                        this.interval = setInterval(updateGameArea,10);
                    },
                    clear : function() {
                        this.context.clearRect(0,0,this.width,this.height);
                    },    
                }
                document.onkeydown = checkKey;
                function checkKey(e) {
                    e = e || window.event;

                        if (e.keyCode == '38') {
                            // up arrow
                            moveup();
                        }
                        else if (e.keyCode == '40') {
                            // down arrow
                            movedown();
                        }
                        else if (e.keyCode == '37') {
                            // left arrow
                            moveleft();
                        }
                        else if (e.keyCode == '39') {
                            // right arrow
                            moveright();
                        }
                }
                function changeTheme(num) {
                    switch(num) {
                        case 2:
                            myGameArea.canvas.style.backgroundColor="yellow";
                            break;
                        case 3:
                            myGameArea.canvas.style.backgroundColor="white";
                            break;
                    }
                }
                function maze(width,height,x,y) {
                    this.x=x;
                    this.y=y;
                    this.height=height;
                    this.width=width;
                    mgx = myGameArea.context;
                    mgx.fillStyle = "black";
                    mgx.fillRect(this.x,this.y,this.width,this.height); 
                    this.update = function() {
                        mgx = myGameArea.context;
                        mgx.fillStyle = "black";
                        mgx.fillRect(this.x,this.y,this.width,this.height);
                    }
                    this.checkCollision = function() {
                        for(k=0;k<16;k++) {
                            if(myGamePiece.speedX) {
                                if(myGamePiece.speedX>0) {
                                    if(myGamePiece.x+16>this.x && myGamePiece.x+16<this.x+this.width && myGamePiece.y+k>this.y && myGamePiece.y+k<this.y+this.height) {
                                        terminate();
                                        break;
                                    }
                                }
                                if(myGamePiece.speedX<0) {
                                    if(myGamePiece.x>this.x && myGamePiece.x<this.x+this.width && myGamePiece.y+k>this.y && myGamePiece.y+k<this.y+this.height) {
                                        terminate();
                                        break;
                                    }
                                }
                            }
                            if(myGamePiece.speedY) {
                                if(myGamePiece.speedY>0) {
                                    if(myGamePiece.x+k>this.x && myGamePiece.x+k<this.x+this.width && myGamePiece.y+16>this.y && myGamePiece.y+16<this.y+obstacle1.height) {
                                        terminate();
                                        break;
                                    }
                                }
                                if(myGamePiece.speedY<0) {
                                    if(myGamePiece.x+k>this.x && myGamePiece.x+k<this.x+this.width && myGamePiece.y>this.y && myGamePiece.y<this.y+this.height) {
                                        terminate();
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
                function snakeHead(width, height, color, x, y) {
                    this.width = width;
                    this.height = height;
                    this.pace=1;
                    this.speedX = 0;
                    this.speedY = 0;
                    this.x = x;
                    this.y = y;  
                    tail.enqueue(this.x,this.y);
                    ctx = myGameArea.context;
                    ctx.fillStyle = color;
                    ctx.fillRect(this.x, this.y, this.width, this.height);
                    ctx.fillStyle = color;
                    ctx.fillRect(apple.x, apple.y, this.width, this.height);
                    this.update = function() {
                        ctx = myGameArea.context;
                        ctx.fillStyle = color;
                        ctx.fillRect(this.x, this.y, this.width, this.height);
                        ctx.fillStyle = apple.color();
                        ctx.fillRect(apple.x, apple.y, this.width, this.height);

                    }
                    this.newPos = function() {
                        this.x += this.speedX;
                        this.y += this.speedY;
                        if(btncount) {
                            tail.enqueue(this.x,this.y);
                        }
                        if(this.x<0||this.x>304||this.y<0||this.y>464) {
                            terminate();
                        }
                        for(k=0;k<16;k++) {
                            if(this.speedX) {
                                if(this.speedX>0) {
                                    tail.check(this.x+16,this.y+k);
                                }
                                if(this.speedX<0) {
                                    tail.check(this.x,this.y+k);
                                }
                            }
                            if(this.speedY) {
                                if(this.speedY>0) {
                                    tail.check(this.x+k,this.y+16);
                                }
                                if(this.speedY<0) {
                                    tail.check(this.x+k,this.y);
                                }
                            }
                        }
                        
                        obstacle1.checkCollision();
                        obstacle2.checkCollision();
                        obstacle3.checkCollision();
                        for(k=0;k<16;k++) {
                            if(this.speedX!=0) {
                                if(myGamePiece.x>apple.x && myGamePiece.y+k>apple.y&&myGamePiece.x<(apple.x+16)&&myGamePiece.y+k<(apple.y+16))
                                    {
                                        score++;
                                        if(score>5&&score<10) {
                                            changeTheme(2);
                                        }
                                        if(score>10) {
                                            changeTheme(3);
                                        }
                                        document.getElementById("display").innerHTML=score;
                                        myGameArea.context.clearRect(apple.x,apple.y,16,16);
                                        obstacle1.update();
                                        obstacle2.update();
                                        obstacle3.update();
                                        apple.set();
                                    }
                            }
                            if(this.speedY!=0) {
                                if(myGamePiece.x+k>apple.x && myGamePiece.y>apple.y&&myGamePiece.x+k<(apple.x+16)&&myGamePiece.y<(apple.y+16))
                                    {
                                        score++;
                                        if(score>5&&score<10) {
                                            changeTheme(2);
                                        }
                                        if(score>10) {
                                            changeTheme(3);
                                        }
                                        document.getElementById("display").innerHTML=score;
                                        myGameArea.context.clearRect(apple.x,apple.y,16,16);
                                        obstacle1.update();
                                        obstacle2.update();
                                        obstacle3.update();
                                        apple.set();
                                    }
                            }
                        }
                        clearFeces(this.x-this.speedX,this.y-this.speedY);
                              
                    } 
                }
                function clearFeces(X,Y) {
                    if(score) {
                        setTimeout(function() {
                            myGameArea.context.clearRect(X,Y,16,16);
                            tail.dequeue();
                        },1000*score);
                    }
                    if(!score) {
                        if(btncount!=0) {
                            setTimeout(function() {
                                myGameArea.context.clearRect(X,Y,16,16);
                                tail.dequeue();
                            },500);
                        }
                    }
                    }
                var apple = {
                    set : function(){
                        this.x=Math.floor(Math.random()*304);
                        this.y=Math.floor(Math.random()*464);
                        
                    },
                    color : function(){
                        return "green";
                    },
                }
                
                function updateGameArea() {
                    //myGameArea.clear();
                    myGamePiece.newPos();    
                    myGamePiece.update();
                }
                function terminate() {
                    myGameArea.clear();
                    clearInterval(myGameArea.interval);
                    btncount=0;
                    alert("game terminated \nyour score is: "+score);
                    obstacle1.update();
                    obstacle2.update();
                    obstacle3.update();
                    startGame();
                }
                function moveup() {
                    if(myGamePiece.speedY==0)
                    {
                        myGamePiece.speedY = myGamePiece.pace*(-1);
                        btncount++;
                        myGamePiece.speedX = 0;
                    }
                }

                function movedown() {
                    if(myGamePiece.speedY==0)
                    {
                        myGamePiece.speedY = myGamePiece.pace;
                        btncount++;
                        myGamePiece.speedX = 0;
                    }
                }

                function moveleft() {
                    if(myGamePiece.speedX==0)
                    {
                        myGamePiece.speedX=(-1)*myGamePiece.pace;
                        btncount++;
                        myGamePiece.speedY=0;
                    }
                }

                function moveright() {
                    if(myGamePiece.speedX==0)
                    {
                        myGamePiece.speedX = myGamePiece.pace;
                        btncount++;
                        myGamePiece.speedY=0;
                    }
                }
                function Queue() {
                    this._oldestIndex = 1;
                    this._newestIndex = 1;
                    this._storageX = {};
                    this._storageY = {};
                    
                    this.size = function() {
                        return (this._newestIndex - this._oldestIndex);
                    };
                    this.enqueue = function(x,y) {
                        this._storageX[this._newestIndex] = x;
                        this._storageY[this._newestIndex] = y;
                        this._newestIndex++;
                        //console.log("e");
                    };
                    this.dequeue = function() {
                        var oldestIndex = this._oldestIndex;
                        delete this._storageX[oldestIndex];
                        delete this._storageY[oldestIndex];
                        this._oldestIndex++;
                        console.log("d");
                    };
                    this.check = function(x,y) {
                        let i;
                        for(i=this._oldestIndex;i<this._newestIndex;i++) {
                            if(x>this._storageX[i] && y>this._storageY[i] && x<(this._storageX[i]+16) && y<(this._storageY[i]+16)) {
                                console.log("f");
                                console.log("storage x: "+this._storageX[i]);
                                console.log("storage y: "+this._storageY[i]);
                                console.log(x);
                                console.log(y);
                                terminate();
                                break;
                            };
                        }                            
                    };
                }
                
                    
