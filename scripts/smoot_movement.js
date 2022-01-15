var formula;
//var cursors1;
//var particles;

class SmoothMove{
    constructor(scene){
        this.scene= scene;

        formula = this.scene.matter.add.image(400, 300, 'formula');
        cursors1 = this.scene.input.keyboard.createCursorKeys();
        particles = this.scene.add.particles('smoke');  //tohle je na smoke efekt
        this.create();
        this.update();
    }

      
      create ()
      {

        
        formula.angle+=-45;  //vycentuje at je auto hezky rovne
       
   
      
        formula.setFrictionAir(0.5);   //nastavi jakoby hustotu vzduchu
        formula.setMass(30);            //nastavi hmotu formule
        formula.setFixedRotation();     //Nastavením pevné rotace se nastaví setrvačnost těla na nekonečno, což zabrání tomu, aby se mohlo otáčet, když na něj působí síly. (kdyz do neho nekdo narazi treba)
       
      
        var emitter = particles.createEmitter({
            speed: {
                onEmit: function (particle, key, t, value)
                {
                    return formula.body.speed * 10;
                }
            },
            lifespan: {
                onEmit: function (particle, key, t, value)
                {
                    return Phaser.Math.Percent(formula.body.speed, 0, 30) * 400;
                }
            },
            alpha: {
                onEmit: function (particle, key, t, value)
                {
                    return Phaser.Math.Percent(formula.body.speed, 0, 30) * 100;
                }
            },
            scale: { start: 1.0, end: 0 },
            blendMode: 'ADD'
        });
      
        emitter.startFollow(formula);
      
        //this.matter.world.setBounds(0, 0, 800, 600);
      
        
      }
      
       update ()
      {


        if(cursors1.left.isDown){
            formula.thrust(0.08);  //tohle je tady navic (aby kdyz kliknu na tlacitko, tak aby se formule pouze netocila do kolecka ale vypadalo to jako by driftovala)
            formula.setAngularVelocity(-0.08);
          }

       
        else if (cursors1.right.isDown)
        {
            formula.thrust(0.08);  //tohle je tady navic (aby kdyz kliknu na tlacitko, tak aby se formule pouze netocila do kolecka ale vypadalo to jako by driftovala)
            formula.setAngularVelocity(0.08);   //
            
        }
      
        if (cursors1.up.isDown)
        {
            formula.thrust(0.18);  //nastavi rychlost formule na rovince
        }
      }
    

}