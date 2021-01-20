var dog,happyDog,database,foodStock,foodS,lastFed,fedTime,count=0;

function preload()
{
  dogImage=loadImage("images/dogImg.png");
  dogHappyImage=loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();

  dog=createSprite(450,300);
  dog.addImage(dogImage);
  dog.scale=0.1;

  feedDog=createButton("Feed the Dog");
  feedDog.position(450,95);
 
  
  addFood=createButton("Add Food");
  addFood.position(550,95);
  
  food = new Food();
  foodS=0;
}


function draw() {  
  background(0);

  

  //console.log(foodS);
  food.getFoodStock();
  fedTime=database.ref('fedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })

  feedDog.mousePressed(function(){
    dog.addImage(dogHappyImage);
    food.deductFood(-1);
    hr=hour();
    database.ref('/').update({
      fedTime : hr
    })
  });

  addFood.mousePressed(function(){
    food.deductFood(1);
    dog.addImage(dogImage);
  });

  fill(255,255,254);
  textSize(14);
  if(lastFed>=12){
    text("Last fed time : " + lastFed%12 + "PM" ,350,30 );
  }
  else if(lastFed==0){
    text("Last fed time : 12 AM" ,350,30 );
  }
  else{
    text("Last fed time : " + lastFed + "AM" ,350,30 );
  }
  food.display();
  food.updateFoodStock(count);
  drawSprites();
}
