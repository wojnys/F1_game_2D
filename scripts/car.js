class Car{
    constructor(scene){
        //musime nacist scenu
        this.scene = scene;


        //nacteme hodnoty do promenych
         cursors = scene.input.keyboard.addKeys({ 'left': Phaser.Input.Keyboard.KeyCodes.A, 'right': Phaser.Input.Keyboard.KeyCodes.D,'up':Phaser.Input.Keyboard.KeyCodes.W,'down':Phaser.Input.Keyboard.KeyCodes.S});
         f1_car = scene.physics.add.sprite(218,490,"f1_car");
         f1_sound_start = scene.sound.add("f1_sound_start");
         f1_sound_change_direction = scene.sound.add("f1_sound_change_direction");
    

        //napiseme funkce ktere jsme vytvorili (musime je zde napsat)   
        this.updatePosition();
    
        }

    
    updatePosition()
    {

    if(cursors.left.isDown)
{
  pravidlo[1] = "jedu";
  if(pravidlo[1]=="jedu" && pravidlo[2] == "jedu" || pravidlo[1]=="jedu" && pravidlo[3]=="jedu"|| pravidlo[1]=="jedu" && pravidlo[4]=="jedu") //kdyz zmenim smer tak se spusti zvuk ktery jakoby podradi a brzdi
  {
    console.log("zatacka");
    if (this.playing2 !== true) {
      f1_sound_start.stop();
      f1_sound_change_direction.play();
      this.playing2 = true;
      this.playing5 = false;
      this.playing4 = false;
      this.playing3 = false;
    }
  }

  if(pravidlo[1]!="jedu" || pravidlo[2] != "jedu" && pravidlo[1]!="jedu" || pravidlo[3]!="jedu"&& pravidlo[1]!="jedu" || pravidlo[4]!="jedu")   //kdyz nezatim ale rozjizdim se
  {
    console.log("rozjezd");
    if (this.playing !== true) {
      f1_sound_start.play();
      f1_sound_change_direction.stop();
      this.playing = true;
    }
  }

  f1_car.setVelocityX(-100);
  f1_car.setVelocityY(0);
  f1_car.anims.play("left",true);
  
  
}


else if(cursors.right.isDown)
{
  pravidlo[2] = "jedu";
  if(pravidlo[2]=="jedu" && pravidlo[1] == "jedu" || pravidlo[2]=="jedu" && pravidlo[3]=="jedu"|| pravidlo[2]=="jedu" && pravidlo[4]=="jedu")
  {
    console.log("zatacka");
    if (this.playing3 !== true) {
      f1_sound_start.stop();
      f1_sound_change_direction.play();
      this.playing3 = true;
      this.playing5 = false;
      this.playing4 = false;
      this.playing2 = false;
    }
  }
  if(pravidlo[2]!="jedu" || pravidlo[1] != "jedu" && pravidlo[2]!="jedu" || pravidlo[3]!="jedu" && pravidlo[2]!="jedu" || pravidlo[4]!="jedu")
  {
    console.log("rozjezd");
    if (this.playing !== true) {
      f1_sound_start.play();
      f1_sound_change_direction.stop();
      this.playing = true;
    }
  }

  
  
  f1_car.setVelocityX(100);
  f1_car.setVelocityY(0);
  f1_car.anims.play("right",true);
 
}



else if(cursors.down.isDown)
{
  pravidlo[3]="jedu";
  if(pravidlo[3]=="jedu" && pravidlo[1] == "jedu" || pravidlo[3]=="jedu" && pravidlo[2]=="jedu"|| pravidlo[3]=="jedu" && pravidlo[4]=="jedu")
  {
    console.log("zatacka");
    if (this.playing4 !== true) {
      f1_sound_start.stop();
      f1_sound_change_direction.play();
      this.playing4 = true;
      this.playing5 = false;
      this.playing3 = false;
      this.playing2 = false;
    }
  }
  if(pravidlo[3]!="jedu" || pravidlo[1] != "jedu" && pravidlo[3]!="jedu" || pravidlo[2]!="jedu"&& pravidlo[3]!="jedu" || pravidlo[4]!="jedu")
  {
    console.log("rozjezd");
    if (this.playing !== true) {
      f1_sound_start.play();
      f1_sound_change_direction.stop();
      this.playing = true;
    }
  }
 
  f1_car.setVelocityY(+100);
  f1_car.setVelocityX(0);
  f1_car.anims.play("down",true);  

  
}
else if(cursors.up.isDown)
{
  pravidlo[4]="jedu";
  if(pravidlo[4]=="jedu" && pravidlo[1] == "jedu" || pravidlo[4]=="jedu" && pravidlo[2]=="jedu"|| pravidlo[4]=="jedu" && pravidlo[3]=="jedu")
  {
    console.log("zatacka");
    if (this.playing5 !== true) {
      f1_sound_start.stop();
      f1_sound_change_direction.play();
      this.playing5 = true;
      this.playing4 = false;
      this.playing3 = false;
      this.playing2 = false;
    }
  }
  if(pravidlo[4]!="jedu" || pravidlo[1] != "jedu" && pravidlo[4]!="jedu" || pravidlo[2]!="jedu" && pravidlo[4]!="jedu" || pravidlo[3]!="jedu")
  {
    console.log("rozjezd");
    if (this.playing !== true) {
      f1_sound_start.play();
      f1_sound_change_direction.stop();
      this.playing = true;
    }
  }
 
  f1_car.setVelocityY(-100);
  f1_car.setVelocityX(0);
  f1_car.anims.play("up",true);  
 
}


//provede se kdyz zadna klavesa nenni zamacknuta (auto stoji na miste)
else{
  f1_car.setVelocityY(0);
  f1_car.setVelocityX(0);
  f1_sound_start.stop();
  f1_sound_change_direction.stop();
  f1_car.anims.play("up",true);  

  for(let i=0;i<pravidlo.length;i++)  //musi vsehcny pravidla nastavit jako "stojim"
  {
      pravidlo[i]="stojim";
  }
  console.log("stojim");
  this.playing = false;
  this.playing2 = false;
  this.playing3 = false;
    }
}
}