let cursors1=0;
let particles=0;

var emitter=0;

var start_sound;
var left_curve_sound;
var right_curve_sound;
var straight_sound;

var SoundOfLeft=false;
var SoundOfRight = false;

var car_stop=1;
class Car{
    constructor(scene){
        //musime nacist scenu
        this.scene = scene;


        //nacteme hodnoty do promenych
         /*cursors = scene.input.keyboard.addKeys({ 'left': Phaser.Input.Keyboard.KeyCodes.A, 'right': Phaser.Input.Keyboard.KeyCodes.D,'up':Phaser.Input.Keyboard.KeyCodes.W,'down':Phaser.Input.Keyboard.KeyCodes.S});
         f1_car = scene.physics.add.sprite(218,490,"f1_car");
         f1_sound_start = scene.sound.add("f1_sound_start");
         f1_sound_change_direction = scene.sound.add("f1_sound_change_direction");
    

        //napiseme funkce ktere jsme vytvorili (musime je zde napsat)   
        f1_car.angle=0;*/


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
       
   
      
  f1_car.setFrictionAir(0.5);   //nastavi jakoby hustotu vzduchu
  f1_car.setMass(30);            //nastavi hmotu formule
  f1_car.setFixedRotation();     //Nastavením pevné rotace se nastaví setrvačnost těla na nekonečno, což zabrání tomu, aby se mohlo otáčet, když na něj působí síly. (kdyz do neho nekdo narazi treba)
 



 /*var emitter = particles.createEmitter({
      speed: {
          onEmit: function (particle, key, t, value)
          {
              return f1_car.body.speed * 10;
          }
      },
      lifespan: {
          onEmit: function (particle, key, t, value)
          {
              return Phaser.Math.Percent(f1_car.body.speed, 0, 30) * 400;
          }
      },
      alpha: {
          onEmit: function (particle, key, t, value)
          {
              return Phaser.Math.Percent(f1_car.body.speed, 0, 30)*100;
          }
      },
      scale: { start: 1.0, end: 0 },
      blendMode: 'ADD'
  });

  emitter.startFollow(f1_car);*/

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
    
  


  f1_car.thrust(0.008);  //tohle je tady navic (aby kdyz kliknu na tlacitko, tak aby se formule pouze netocila do kolecka ale vypadalo to jako by driftovala)
  f1_car.setAngularVelocity(-0.08);

  
  
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

  
  f1_car.thrust(0.008);  //tohle je tady navic (aby kdyz kliknu na tlacitko, tak aby se formule pouze netocila do kolecka ale vypadalo to jako by driftovala)
  f1_car.setAngularVelocity(0.08);  

 
}



  if(cursors1.up.isDown)
{
 
  

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
     console.log("zatacka do leva");
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
       console.log("zatacka do prava");
   }

  }
  if(cursors1.right.isDown == false &&cursors1.left.isDown == false){
    SoundOfLeft =false;
    SoundOfRight =false;
  }


  f1_car.thrust(0.18);  //nastavi rychlost formule na rovincea
 
}


//provede se kdyz zadna klavesa nenni zamacknuta (auto stoji na miste)

else{
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

  }
   
  

    
  }


}

}