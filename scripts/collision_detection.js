
let finishLine=0;
class Collision{
    constructor(scene)
    {
        this.scene = scene;

        this.index=4;

        
        this.create();
    }



//vytvori kolizi mezi autem a okruhem
 create ()
{
   // this.scene.cameras.main.centerOn(0, 0);
   
   wizball[0] = this.scene.physics.add.staticImage(323, 655, 'wizball').setCircle(45);
   wizball[1] = this.scene.physics.add.staticImage(577, 661, 'wizball').setCircle(45);
   wizball[2] = this.scene.physics.add.staticImage(563, 322, 'wizball').setCircle(45);
   wizball[3] = this.scene.physics.add.staticImage(317, 315, 'wizball').setCircle(45); 

   for(let i=322;i<577;i+=50){
       wizball[this.index++] =this.scene.physics.add.staticImage(i, 669, 'wizball').setCircle(45);
   }
   for(let i=317;i<563;i+=50){
    wizball[this.index++] =this.scene.physics.add.staticImage(i, 322, 'wizball').setCircle(45);
    }
    for(let i=322;i<655;i+=50){
        wizball[this.index++] =this.scene.physics.add.staticImage(317, i, 'wizball').setCircle(45);
    }

    for(let i=322;i<655;i+=50){
     wizball[this.index++] =this.scene.physics.add.staticImage(577, i, 'wizball').setCircle(45);
     }

     for(let i=0;i<this.index;i++)
    {
        this.scene.physics.add.collider(wizball[i],f1_car);
        wizball[i].setVisible(false);
      
    }


   


       //tohle generuje na klik body ktere chci aby se zobrazily 
   /*this.scene.input.on(Phaser.Input.Events.POINTER_UP, function (pointer) {
    
    const x = Phaser.Math.Snap.Floor(pointer.x,1);
    const y = Phaser.Math.Snap.Floor(pointer.y,1);

        console.log(x);
        console.log(y);
    
        wizball[index] = this.scene.physics.add.staticImage(x, y, 'wizball').setCircle(45);
        index++;
        console.log(index);
    
        for(let i=0;i<index;i++)
       {
        this.scene.physics.add.collider(wizball[i],f1_car);
       }

  
}, this);*/

}


}