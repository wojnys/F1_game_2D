
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


let timeEvent=0;
let test_text=0;

const Width = 1300;
const Height = 1000;


class MainScene extends Phaser.Scene
{
  
  constructor(){
	//	super({key: 'SceneMain'},physics: { arcade: { debug: true, gravity: { y: 0 } }, matter: { debug: true, gravity: { y: 0 });
  
    super({
      key: 'SceneMain',
      physics: {
        arcade: {
          //debug: true,
          gravity: { y: 0 }
        },
        matter: {
         // debug: true,
          gravity: { y: 0 },
         // debugShowBody: true,
          debugBodyColor: 0x0000ff
        }
      }
    });
  }




 preload()
{
 
//choose skins
 if(driverID==0)
 {

  this.load.image('f1_car', 'assets/formula0.png');
  
 }
 if(driverID==1)
 {

  this.load.image('f1_car', 'assets/formula1.png');
 }
 if(driverID==2)
 {

  this.load.image('f1_car', 'assets/formula2.png');
 }
 if(driverID==3)
 {

  this.load.image('f1_car', 'assets/formula3.png');
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



 //checkpoints
 this.load.image("checkpoint",'assets/checkpoint.png');


 //smoke
 this.load.image("smoke","assets/smoke.png");
 this.load.atlas('flares', 'assets/smoke.png', 'assets/flares.json');

 //nacteni textur pro okruh
  this.load.setPath('assets_racing/racing/');
  this.load.obj('roadStart', 'roadStartPositions.obj', 'roadStartPositions.mtl');
  this.load.obj('roadStraight', 'roadStraight.obj', 'roadStraight.mtl');
  this.load.obj('roadCornerLarge', 'roadCornerLarge.obj', 'roadCornerLarge.mtl');
  this.load.obj('roadCornerLargeBorder', 'roadCornerLargeBorder.obj', 'roadCornerLargeBorder.mtl');



  

}


 create ()
{
  this.physics.world.setFPS(30);
  
  //inicialitujeme classy
  this.circuit = new Circuit(this);
  this.circuit.create();   //vygeneruje zavodni okruh

  this.car = new Car(this);  //vygeneruje formuli
  this.car.create();

  this.collision = new Collision(this);   //colize mezi autem a trati
  this.collision.create();

  this.lights=new Lights(this);   //svetla (stratovaci)
  this.lights.GenerateLights();  //vygeneruje cervene svetla (formule nemuze jet kdyz sviti cervene ty svetla)

  this.time = new TimeMeasure(this);  //stopuje cas auta kdyz jede (score)
  this.time.create();

  this.finishRace = new FinishRace(this);  //vytvori kdyz auto projede cilovou carou(pocita kola)
  this.finishRace.create();





  
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


 update (time,delta)
{
 

if(StartRace==true)  //pouze kdyz zhasnou vsechny svetla muze se auto rozjet
{
  this.car.updatePosition();  //update pozice auto (movement)
}
  
this.lights.LightsUpdate(time,delta);  //update svetel, kazdych 50ms se jedno svetlo zhasne (na zacatku zavodu)
if(StartRace==true){
 
  this.time.update(time,delta);
}



this.finishRace.countLaps(3);  //3 je zmanema pocet kol
this.finishRace.updateCheckPoints();
this.finishRace.crossFinishLine();





}



}






//nastaveni okna 
var config = {
  type: Phaser.AUTO,
  width: Width,
  height: Height,
  scene: [MainScene],
  physics: {
      //default: 'arcade',
      //default: 'matter',
      debug: true,
      gravity:{y:0},
  
  },
  
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
},

  
};




var game = new Phaser.Game(config);