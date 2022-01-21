
let finishLine=0;
var circuit_features =[];
 



class Collision{
    constructor(scene)
    {
        this.scene = scene;

        this.index=4;

         circuit_features =[
          {
              cirID:"0",  //id trate
              name:"Basic",
              difficulty:"10%",
              corners:4,   //kolik ma okruh zatacek
              collision_start_points:[277,375],     //tohle je prvni bod(X,Y) od ktereho se potom pocitaji a odvijeji ty ostatni (odkud se zacina vykreslovat vnitrni kolize(bariera) trate)
              collision_points:[510,275,615,610,380,710,278,394],  //Tohle jsou potom body(X,Y) ktere vytvori kompletni vnitrni kolizi trate 
              checkPointsPosition:[628, 235,234,734],  //pozice checkpointu (prvniX,prvniY,druhyX,druhyY)
          },
          {
              cirID:"1",
              name:"Easy",
              difficulty:"25%",
              corners:6,
              collision_start_points:[277,375],     //tohle je prvni bod(X,Y) od ktereho se potom pocitaji a odvijeji ty ostatni (odkud se zacina vykreslovat vnitrni kolize(bariera) trate)
              collision_points:[996,276,768,417,495,622,486,699,278,369],  //Tohle jsou potom body(X,Y) ktere vytvori kompletni vnitrni kolizi trate 
              checkPointsPosition:[1058, 207,638,529],
          },
          {
              cirID:"2",
              name:"Medium",
              difficulty:"50%",
              corners:8,
          },
          {
              cirID:"3",
              name:"Hard",
              difficulty:"80%",
              corners:8,
          },
        ]; 
        
        this.create();
    }



//vytvori kolizi mezi autem a okruhem
 create ()
{


  this.createCircuitDetection(circuitID,circuit_features[circuitID].corners,circuit_features[circuitID].collision_start_points,circuit_features[circuitID].collision_points);  //funkce ktera se stara o detekci kolize mezi autem a trati




//tohle generuje na klik body ktere chci aby se zobrazily 
   this.scene.input.on(Phaser.Input.Events.POINTER_UP, function (pointer) {
    
    const x = Phaser.Math.Snap.Floor(pointer.x,1);
    const y = Phaser.Math.Snap.Floor(pointer.y,1);

        console.log(x);
        console.log(y);
    
        wizball[index] = this.scene.physics.add.staticImage(x, y, 'wizball').setCircle(10).setScale(0.5,0.5);
        index++;
        console.log(index);
    
        for(let i=0;i<index;i++)
       {
        this.scene.physics.add.collider(wizball[i],f1_car);
       }

  
}, this);

}


createCircuitDetection(circuitID,corners,startPoints,collisionPoints){
  

 //vykresleni objektu(koliznich objektu podle line(predem definovane cary))
 graphics = this.scene.add.graphics();

 follower = { t: 0, vec: new Phaser.Math.Vector2() };  //vykresluje se to pomoci Vectoru (0 - 0.9999)

 //  Path starts at 100x100
 path = new Phaser.Curves.Path(startPoints[0], startPoints[1]); //zacatek od ktereho se potom kresli zbytek kolize (zbytek tvaru)


 //tohle vytvori nejednodusi trat (circuitID == 0)
if(corners==4){

  path.ellipseTo(100, 100, 0, 90, false, 180);  //rotace 
  path.lineTo(collisionPoints[0],collisionPoints[1]);                   //line kde vede potom
  path.ellipseTo(100, 100, 0, 90, false, 180+90);
  path.lineTo(collisionPoints[2],collisionPoints[3]);
  path.ellipseTo(100, 100, 0, 90, false, 180+90+90); //kdy se rotace rovna 360 tak se musi u dalsi zacit od nuly
  path.lineTo(collisionPoints[4],collisionPoints[5]);
  path.ellipseTo(100, 100, 0, 90, false, 0+90);
  path.lineTo(collisionPoints[6],collisionPoints[7]);

}

 //tohle vytvori nejednodusi trat (circuitID == 1)
 if(corners==6){

  path.ellipseTo(100, 100, 0, 90, false, 180);  //rotace 
  path.lineTo(collisionPoints[0],collisionPoints[1]);                   //line kde vede potom
  path.ellipseTo(90, 90, 0, 90, false, 180+90);
  path.ellipseTo(50, 50, 0, 90, false, 180+90+90);
  path.lineTo(collisionPoints[2],collisionPoints[3]);
 // cubicBezierTo: function (x, y, control1X, control1Y, control2X, control2Y)
 path.cubicBezierTo(collisionPoints[4],collisionPoints[5], 561, 380, 504, 535);  // cubicBezierTo: function (x, y, control1X, control1Y, control2X, control2Y)
 path.lineTo(collisionPoints[6],collisionPoints[7]);
 path.cubicBezierTo(collisionPoints[8],collisionPoints[9],250,730,281, 636);  // cubicBezierTo: function (x, y, control1X, control1Y, control2X, control2Y)
 

}


 graphics.clear();
 //graphics.lineStyle(2, 0xffffff, 1); //zobrazi mi line

 path.draw(graphics);


 for(let i=0;follower.t<1;i++){   //kresli mi to vy collidery (follower) -> generuje dokud t se nerova 1 (od 0 - 0.999);
   
   path.getPoint(follower.t, follower.vec);
   follower.t+=0.01;

   graphics.fillStyle(0xff0000, 1);
  wizball[i] = graphics.fillCircle(follower.vec.x, follower.vec.y, 12);  //zobrazi mi kulicky misto wizball
   wizball[i] = this.scene.matter.add.image(follower.vec.x, follower.vec.y, 'wizball', null, { isStatic: true }).setScale(0.5, 0.5).setAngle(1);
   wizball[i].setVisible(true);
 }

}


}