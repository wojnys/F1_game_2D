




//id drivera a circuitu se nacte z databaze
let driverID=0;
let circuitID =0;

$.ajax({
  url : './phps/readData.php', // precte data z mysql databaze a vypise konkretniho drivera a circuit
  type : 'GET', 
  async: false,    //musim naspat async: false (asynchroni funkce trva nejakou dobu nez se vykona takze by to nefungovalo spravne bez toho)
  success : function(data){
   
     var data = jQuery.parseJSON(data);
     console.log(data);
    driverID = data[0];
    circuitID = data[1];
    console.log(driverID +"ajax");
     document.querySelector(".driver").innerHTML =  driverID;   //obsahuje id od drivera
    document.querySelector(".circuit").innerHTML = circuitID;   //obsahuje id od circuit
    
  }});
console.log(driverID + "nonajax");







let a=1;
let pravidlo =[];
let cursors=0;
let f1_car =0;
let f1_sound_start=0;
let f1_sound_change_direction;
var track=0;


let wizball=[];
let index=0;
let line1=0;

class MainScene extends Phaser.Scene
{
  constructor(){
		super({key: 'SceneMain'});
	}


 preload()
{
//choose skins
 if(driverID==0)
 {
  this.load.spritesheet("f1_car","assets/car_spritesheet0.png",{frameWidth:79,frameHeight:74});
 }
 if(driverID==1)
 {
  this.load.spritesheet("f1_car","assets/car_spritesheet1.png",{frameWidth:79,frameHeight:74});
 }
 if(driverID==2)
 {
  this.load.spritesheet("f1_car","assets/car_spritesheet2.png",{frameWidth:79,frameHeight:74});
 }
 if(driverID==3)
 {
  //this.load.spritesheet("f1_car","assets/car_spritesheet3.png",{frameWidth:98,frameHeight:72});
  this.load.spritesheet("f1_car","assets/car_spritesheet3.png",{frameWidth:79,frameHeight:74});
 }
  
 //car and circuit things
  this.load.audio("f1_sound_start","audio/f1_sound.mp3");
  this.load.audio("f1_sound_change_direction","audio/change_direction_sound.mp3");
  this.load.image("track","assets/track1.png");
 this.load.image("finish","assets/finish.png");
this.load.image("start_car_position","assets/f1_next_top.png");

 //lights
 this.load.image("lightOff","assets/lightOff.png");
 this.load.image("lightOn","assets/lightOn.png");

 //collision detection
 this.load.image('wizball', 'assets/wizball.png');





 //nacteni textur pro okruh
  this.load.setPath('assets_racing/racing/');
  this.load.obj('roadStart', 'roadStartPositions.obj', 'roadStartPositions.mtl');
  this.load.obj('roadStraight', 'roadStraight.obj', 'roadStraight.mtl');
  this.load.obj('roadCornerLarge', 'roadCornerLarge.obj', 'roadCornerLarge.mtl');
  this.load.obj('roadCornerLargeBorder', 'roadCornerLargeBorder.obj', 'roadCornerLargeBorder.mtl');



  

}


 create ()
{

  //inicialitujeme classy
  this.circuit = new Circuit(this);
  this.circuit.create();   //vygeneruje zavodni okruh

  this.car = new Car(this);  //vygeneruje formuli

  this.collision = new Collision(this);   //colize mezi autem a trati
  this.collision.create();

  this.lights=new Lights(this);   //svetla (stratovaci)
  this.lights.GenerateLights();  //vygeneruje cervene svetla (formule nemuze jet kdyz sviti cervene ty svetla)

  this.time = new TimeMeasure(this);  //stopuje cas auta kdyz jede (score)
  this.time.create();

  this.finishRace = new FinishRace(this);  //vytvori kdyz auto projede cilovou carou(pocita kola)
  this.finishRace.create();

  


this.anims.create({
key: 'left',
frames: this.anims.generateFrameNumbers('f1_car', { start: 1, end: 1 }),
frameRate: 10,
repeat: -1
});
this.anims.create({
key: 'right',
frames: this.anims.generateFrameNumbers('f1_car', { start: 2, end: 2 }),
frameRate: 10,
repeat: -1
});
this.anims.create({
key: 'down',
frames: this.anims.generateFrameNumbers('f1_car', { start: 3, end: 3 }),
frameRate: 10,
repeat: -1
});
this.anims.create({
key: 'up',
frames: this.anims.generateFrameNumbers('f1_car', { start: 0, end: 0 }),
frameRate: 10,
repeat: -1
});



  
}



 init()
{
  //tohle jsou zvuky od car
    this.playing = false;
    this.playing2 =false;
    this.playing3 =false;
    this.playing4=false;
    this.playing5=false;
}


 update ()
{

if(StartRace==true)  //pouze kdyz zhasnou vsechny svetla muze se auto rozjet
{
  this.car.updatePosition();  //update pozice auto (movement)
}
  
this.lights.LightsUpdate();  //update svetel, kazdych 50ms se jedno svetlo zhasne (na zacatku zavodu)
this.time.update();


this.finishRace.countLaps(3);  //3 je zmanema pocet kol
this.finishRace.crossFinishLine();
}


}




//nastaveni okna 
var config = {
  type: Phaser.AUTO,
  width: 1300,
  height: 1000,
  physics: {
      default: 'arcade',
      debug: true,
      gravity:{y:0},
  
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
},
  scene: MainScene,
};



var game = new Phaser.Game(config);