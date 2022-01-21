let cursors1=0;

var emitter=0;

var start_sound;
var left_curve_sound;
var right_curve_sound;
var straight_sound;

var SoundOfLeft=false;
var SoundOfRight = false;

var car_stop=1;

var particles=0;
var rt;
var up_gas = false;

//vlastnosti auta
var cars_features=[
  {
    carID:"0",
    carName:"RedBull",
    speed:0.22,
    curve:0.08,
  },
  {
    carID:"1",
    carName:"Mercedes",
    speed:0.22,
    curve:0.07,
  },
  {
    carID:"2",
    carName:"Mclaren",
    speed:0.20,
    curve:0.05,
  },
  {
    carID:"3",
    carName:"Ferrari",
    speed:0.19,
    curve:0.05,
  },

];


var graphics;
var follower;
var path;
var objects=[];
class Car{
    constructor(scene){
        //musime nacist scenu
        this.scene = scene;



        //definujeme hodnoty promenych
        f1_car = this.scene.matter.add.image(218,490, 'f1_car');
        cursors1 = scene.input.keyboard.addKeys({ 'left': Phaser.Input.Keyboard.KeyCodes.A, 'right': Phaser.Input.Keyboard.KeyCodes.D,'up':Phaser.Input.Keyboard.KeyCodes.W,'down':Phaser.Input.Keyboard.KeyCodes.S});
        particles = this.scene.add.particles('smoke');  //tohle je na smoke efekt
        f1_sound_start = scene.sound.add("f1_sound_start");  //rozjezd zvuk
        f1_sound_change_direction = scene.sound.add("f1_sound_change_direction");  //zatacka zvuk

      //  f1_sound_start.play();
        this.create();
        this.updatePosition();
    
        }



//vytvori formuli a stara se o smoke efekt a o zataceni 
create() {

  f1_car.angle+=-45;  //vycentuje at je auto hezky rovne

 
 /* var path2 = new Phaser.Curves.Path(100, 200).lineTo(500, 300).lineTo(500,300).lineTo(300,200).ellipseTo(200, 100, 100, 300, false, 45);
  var graphics = this.scene.add.graphics();
  graphics.lineStyle(1, 0xffffff, 1);
  path2.draw(graphics,128);*/ 

    

    


  
/*
      var path = new Phaser.Curves.Path(f1_car.x+15, f1_car.y+35).circleTo(5).moveTo(40, 30);
  
       particles = this.scene.add.particles('flares');
  
      particles.createEmitter({
          frame: { frames: [ 'red', 'green', 'blue' ], cycle: true },
          scale: { start: 0.5, end: 0 },
          blendMode: 'ADD',
          emitZone: { type: 'edge', source: path, quantity: 45, yoyo: false },
          
      });*/
     


    //  particles = this.scene.add.particles('flares');  //vytvori particles pro drifty
  

      
  f1_car.setFrictionAir(0.5);   //nastavi jakoby hustotu vzduchu
  f1_car.setMass(30);            //nastavi hmotu formule
  f1_car.setFixedRotation();     //Nastavením pevné rotace se nastaví setrvačnost těla na nekonečno, což zabrání tomu, aby se mohlo otáčet, když na něj působí síly. (kdyz do neho nekdo narazi treba)
 


   start_sound = new Howl({
    src: ['./audio/f1_start_sound.mp3'],
    volume: 0.5,

  });
   left_curve_sound = new Howl({
    src: ['./audio/change_direction_sound.mp3'],
    loop: true,
  volume: 0.5,

  });

  right_curve_sound = new Howl({
    src: ['./audio/change_direction_sound_long.mp3'],
    loop: true,
  volume: 0.5,

  });

  straight_sound= new Howl({
    src: ['./audio/f1_straight.mp3'],
    loop: true,
  volume: 0.5,

  })
  
  
}




updatePosition(){




  
if(cursors1.left.isDown)
{

    if (this.playing !== true && this.playing3 !== true) {
       /* f1_sound_change_direction.play();
        f1_sound_start.stop();*/
        left_curve_sound.play();
        start_sound.stop();
        right_curve_sound.stop();
        straight_sound.stop();
        this.playing = true;
        this.playing2 = false;
        this.playing3 = true;
    }
    
  

if(up_gas == true){
  f1_car.thrust(0.008);  //kdyz je zaroven up cursor zmacknuty
}


if(up_gas==false /*&& cursors1.down.isDown*/){
  f1_car.thrust(0.08);  //tohle je tady navic (aby kdyz kliknu na tlacitko, tak aby se formule pouze netocila do kolecka ale vypadalo to jako by driftovala)

  
  //particly se muzou pouzit pouze jednou (drifting)
/*  particles.createEmitter({
    frames: 'smoke-puff',
    x: f1_car.x+10,
    y: f1_car.y+10,
    lifespan: 1500,
    
   // lifespan:-2000,
    speedX: { start: -50, end: 100, steps: 25 },
    speedY: { min: -50, max: 50 },
    scale: { start: 0.1, end:  0.02 },
    blendMode: 'ADD'
});*/
  

}

/*
//kdyz pustime S tak se particly smazou
if(cursors1.down.isDown==false){
  setTimeout(()=>{
    particles.destroy();
  },3000);

}*/

  
  
    f1_car.setAngularVelocity(-1*(cars_features[driverID].curve));

  
}



 if(cursors1.right.isDown)
{

  if (this.playing2 !== true && this.playing3 !== true) {
    /*f1_sound_change_direction.play();
    f1_sound_start.stop();*/
    right_curve_sound.play();
    start_sound.stop();
    left_curve_sound.stop();
    straight_sound.stop();
    this.playing2 = true;
    this.playing = false;
    this.playing3 = true;
}

if(up_gas == true){
  f1_car.thrust(0.008);  //kdyz je zaroven up cursor zmacknuty, tak je pohyb do zatacky pomalejsi 
}

if(up_gas==false){
  f1_car.thrust(0.08);  //tohle je tady navic (aby kdyz kliknu na tlacitko, tak aby se formule pouze netocila do kolecka ale vypadalo to jako by driftovala)
}

  f1_car.setAngularVelocity(cars_features[driverID].curve); 

 
}



  if(cursors1.up.isDown)
{
 
  up_gas=true;

  if (this.playing3 !== true && SoundOfLeft===false && SoundOfRight===false) {
   /* f1_sound_start.play();
    f1_sound_change_direction.stop();*/
    if(car_stop==1){
      start_sound.play();
      right_curve_sound.stop();
      left_curve_sound.stop();
      straight_sound.stop();
      this.playing3 = true;
      this.playing = false;
      this.playing2 = false;
    }
    else{
      straight_sound.play();
      start_sound.stop();
      right_curve_sound.stop();
      left_curve_sound.stop();
      this.playing3 = true;
      this.playing = false;
      this.playing2 = false;
    }
     
      
    
}

else if(cursors1.left.isDown){
  car_stop=0;
SoundOfLeft =true;
//SoundOfRight =false;
  if (this.playing !== true) {
    /* f1_sound_change_direction.play();
     f1_sound_start.stop();*/
     left_curve_sound.play();
     start_sound.stop();
     right_curve_sound.stop();
     straight_sound.stop();
     this.playing = true;
     this.playing2 = false;
     this.playing3 = false;
     //console.log("zatacka do leva");
 }
}

 if(cursors1.right.isDown){
  car_stop=0;
  SoundOfRight =true;
 // SoundOfLeft =false;
    if (this.playing2 !== true) {
      /* f1_sound_change_direction.play();
       f1_sound_start.stop();*/
       right_curve_sound.play();
       start_sound.stop();
       left_curve_sound.stop();
       straight_sound.stop();
       this.playing = false;
       this.playing2 = true;
       this.playing3 = false;
      // console.log("zatacka do prava");
   }

  }
  if(cursors1.right.isDown == false &&cursors1.left.isDown == false){
    SoundOfLeft =false;
    SoundOfRight =false;
  }

  
  f1_car.thrust(cars_features[driverID].speed); //nastavi rychlost formule na rovincea

}

if(cursors1.up.isDown==false){ //kdyz neni up cursor zmacknuty 
  up_gas=false;  //promenna se nahraje do false (je to kvuli zatackam aby auto nejelo prisil rychle a aby se na misto pouze nerotovalo)
}



//provede se kdyz zadna klavesa nenni zamacknuta (auto stoji na miste)

  if(cursors1.left.isDown==false && cursors1.right.isDown==false&&cursors1.up.isDown==false){
   /* f1_sound_change_direction.stop();
    f1_sound_start.stop();*/
    start_sound.stop();
    right_curve_sound.stop();
    left_curve_sound.stop();
    straight_sound.stop();
    SoundOfLeft=false;
    SoundOfRight=false;
    this.playing3=false;
    car_stop=1;
   // particles.destroy();  //smazu particles
    
  }

  
}

}