var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed, lastfed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);f

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
 
  feedDog();
  //write code to display text lastFed time here
  getTime();
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  var foodval = foodObj.getFoodStock();
  if (foodval <= 0) {
    foodObj.updateFoodStock(foodval*0);

  }else {
    foodObj.updateFoodStock(foodval - 1);
  }
  //write code here to update food stock and last fed time

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}


async function getTime() {
  var response = await fetch("http://worldtimeapi.org/api/timezone/America/Los_Angeles");
  var responseJSON = await response.json();
  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11, 13);
  text(hour);
}
