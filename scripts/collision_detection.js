
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




//matter physics

    //tvori mi to kolizi mezi hracem a okruhem( uvnitr) aby si hrac nemohl zkratit cestu
 for(let ix=330;ix<=580;ix+=50){
     for(let iy=319;iy<=680;iy+=50){
       wizball[0]=this.scene.matter.add.image(ix, iy, 'wizball', null, { isStatic: true }).setScale(1, 1).setAngle(1);
       wizball[0].setVisible(false);
     }
 }


 /*const line = new Phaser.Geom.Line(100, 200, 600, 400);
 const group = this.scene.add.group({ key: 'ball', frameQuantity: 32 });

        Phaser.Actions.PlaceOnLine(group.getChildren(), line);*/




//tohle generuje na klik body ktere chci aby se zobrazily 
  /* this.scene.input.on(Phaser.Input.Events.POINTER_UP, function (pointer) {
    
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