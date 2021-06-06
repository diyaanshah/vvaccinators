var buildings,buildingsImage;
var covid19,covid29,covid39;
var trump;
var score=0;
var gameState='start'


function preload(){
  buildingsImage=loadImage('boombed building.jpg')
  covid19Image=loadImage('covid-19-removebg-preview.png')
   covid29Image=loadImage('covid-29-removebg-preview.png')
     covid39Image=loadImage('covid39-removebg-preview.png')
president=loadAnimation('trump1-removebg-preview.png','trump_2-removebg-preview.png','trump_3-removebg-preview.png')
vaccineImg=loadImage('vaccine-removebg-preview.png')
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  trump=createSprite(70,800,50,50)
    trump.addAnimation('walking',president)


    sprite1=createSprite(0,height-250,width,20)
    sprite2=createSprite(0,height-900,width,20)
    sprite1.visible=false;
    sprite2.visible=false;

    vaccineGroup=new Group()
    covid19Group=new Group()
    covid29Group=new Group()
    covid39Group=new Group()

}
function draw() {
  background('black');
  //edges=createEdgeSprite()

  if(gameState==='start'){
    textSize(50)
    text('press s to start',width/2-200,height/2)
    trump.visible=false
  }
  if(gameState==='start'&&(keyDown('s'))){
    gameState='play'
  }
  if(gameState==='play'){ 
    // trump.collide(edges)
  //trump.y=mouseY
  trump.visible=true
   if(keyWentDown('space')){
    createVaccine()
  

  
  }
  
   
 


 if(frameCount===2||frameCount%60/1.1===0){

 buildings=createSprite(width+1126,height/2,100,10)
 buildings.scale=width/height+1-0.25
 buildings.addImage("destroyed",buildingsImage)
   //buildings.visible=false
 buildings.setVelocity(-4-frameCount/100000,0)
 //  buildings.lifetime(width/height)/2
 trump.depth=buildings.depth
 trump.depth=trump.depth+1
 }
 if(frameCount%150===0&&frameCount<1000&&frameCount!=0){
   covid19=createSprite(width-100,random(width-300,300),20,20)
 covid19.addImage(covid19Image)
 covid19.setVelocity(random(-3,-9),random(-0.1,0.1))
   covid19.scale=(random(0.1,0.5))
   covid19.depth=buildings.depth
   covid19.depth=covid19.depth+1
   covid19.lifetime=(width/height)/2
   covid19Group.add(covid19)
   covid19.debug=true

   if(covid19Group.isTouching(trump)){
     gameState='end'
   }
 }
  if(frameCount%100===0&&frameCount<2000&&frameCount>1000){
   covid29=createSprite(width-100,random(width-300,300),20,20)
 covid29.addImage(covid29Image)
 covid29.setVelocity(random(-15,-25),random(-0.7,0.7))
   covid29.scale=(random(0.1,0.5))
   covid29.depth=buildings.depth
   covid29.depth=covid29.depth+1
   covid29.lifetime=(width/height)/2
   covid29Group.add(covid29)
   covid29.debug=true

   if(covid29Group.isTouching(trump)){
    gameState='end'
  }
 }
 
   if(frameCount%75===0&&frameCount>2000){
   covid39=createSprite(width-100,random(width-300,300),20,20)
 covid39.addImage(covid39Image)
 covid39.setVelocity(random(-14,-28),random(-0.1,0.1))
   covid39.scale=(random(0.1,0.3))
   covid39.depth=buildings.depth
   covid39.depth=covid39.depth+1
   covid39.lifetime=(width/height)/2
    covid39Group.add(covid39)
    covid39.debug=true

    if(covid39Group.isTouching(trump)){
      gameState='end'
    }
 }

 

  }

  if(gameState==='end'){
    textSize(50)
    fill('red')
    text('press r to restart',width/2-200,height/2+300)
    trump.visible=false
   // buildings.visible=false
    covid19.visible=false
    covid29.visible=false
    //covid39.visible=false
   }
   if (gameState==='end'&&(keyDown('r'))){
     gameState='play'
score=0
    }
  trump.y=mouseY
/*if(keyWentDown('w')){h
  trump.setVelocity(0,-5)
}
if(keyWentUp('w')){
  trump.setVelocity(0,0)
}
if(keyDown('s')){
 trump.setVelocity(0,5)
  //trump.y=trump.y+3
}
if(keyWentUp('s')){
  trump.setVelocity(0,0)
}
*/
trump.collide(sprite1)
trump.collide(sprite2)
textSize(50)
fill(255,0,0)  
text('score:'+score,width-400,100)

  
 //console.log(trump.y)
  drawSprites()

}

function createVaccine(){
  vaccine=createSprite(70,300,20,20)
  vaccine.y=trump.y-50;
  vaccine.addImage(vaccineImg)
  vaccine.scale=0.15
  vaccine.setVelocity(8,0)
  vaccine.depth=buildings.depth
  buildings.depth=buildings.depth+1

    console.log(trump.y)
  vaccineGroup.add(vaccine)
  vaccine.debug=true


if(vaccineGroup.collide(covid19Group)){
covid19Group.destroyEach()
vaccineGroup.destroyEach()
score=score+1 
}

if(vaccineGroup.collide(covid29Group)){
  covid29Group.destroyEach()
  vaccineGroup.destroyEach()
  score=score+2
  }
  if(vaccineGroup.collide(covid39Group)){
    covid39Group.destroyEach()
    vaccineGroup.destroyEach()
    score=score+3
    }
}