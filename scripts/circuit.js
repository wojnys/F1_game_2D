const rot90 = Phaser.Math.DegToRad(90);
const rot180 = Phaser.Math.DegToRad(180);
const rot0 =Phaser.Math.DegToRad(0);
var track;

class Circuit{
    constructor(scene){
        this.scene = scene;

       track =this.scene.track;
    }

    

    create ()
    {
        
        track= this.scene.add.mesh(400, 300);

        if(circuitID==0){
            this.Track0();   //kdyz se circuitID == 0 vytvori se Track0
        }
        if(circuitID==1){
            this.Track1();   //kdyz se circuitID == 1 vytvori se Track1
        }
        if(circuitID==2){
            this.Track2();   //kdyz se circuitID == 2 vytvori se Track2
        }
        if(circuitID==3){
            this.Track3();   //kdyz se circuitID == 3 vytvori se Track3
        }
        
      
        //  Zoom the camera

        track.panX(-5);
        track.panY(7);
        track.panZ(50);

        this.debug = this.scene.add.graphics();

        this.track = track;

       
    }

    //trat id 0 se vy tehle funkci vytvori
    Track0(){

        //  Add road pieces
        track.addVerticesFromObj('roadStart', 2, 0, 0, 0, rot90, rot180);
        track.addVerticesFromObj('roadStraight', 2, 0, 4, 0, rot90, rot180);
        track.addVerticesFromObj('roadCornerLarge', 2, 0, 6, 0, rot90, rot180);
        track.addVerticesFromObj('roadCornerLargeBorder', 2, 0, 6, 0, rot90, rot180);


        track.addVerticesFromObj('roadStraight', 2, 4, 10, 0, rot90, rot90);
        track.addVerticesFromObj('roadStraight', 2, 6, 10, 0, rot90, rot90);
        track.addVerticesFromObj('roadCornerLarge', 2, 8, 10, 0, rot90, rot90);
        track.addVerticesFromObj('roadCornerLargeBorder', 2, 8, 10, 0, rot90, rot90);

        
        track.addVerticesFromObj('roadStraight', 2, 10, 4, 0, rot90, rot180);
        track.addVerticesFromObj('roadStraight', 2, 10, 2, 0, rot90, rot180);
        track.addVerticesFromObj('roadStraight', 2, 10, 0, 0, rot90, rot180);
        track.addVerticesFromObj('roadCornerLarge', 2, 12, 0, 0, rot90, rot0);
        track.addVerticesFromObj('roadCornerLargeBorder', 2, 12, 0, 0, rot90, rot0);


        track.addVerticesFromObj('roadStraight', 2, 6, -2, 0, rot90, rot90);
        track.addVerticesFromObj('roadStraight', 2, 4, -2, 0, rot90, rot90);
        track.addVerticesFromObj('roadCornerLarge', 2, 4, -4, 0, rot90, rot180+rot90);
        track.addVerticesFromObj('roadCornerLargeBorder', 2, 4, -4, 0, rot90, rot180+rot90);
    }



    //trat id 1 se vy tehle funkci vytvori
    Track1(){

        //  Add road pieces
        track.addVerticesFromObj('roadStart', 2, 0, 0, 0, rot90, rot180);
        track.addVerticesFromObj('roadStraight', 2, 0, 4, 0, rot90, rot180);
        track.addVerticesFromObj('roadCornerLarge', 2, 0, 6, 0, rot90, rot180);  //rotace zatacky cislo 1
        track.addVerticesFromObj('roadCornerLargeBorder', 2, 0, 6, 0, rot90, rot180);

        for(let i=4;i<18;i+=2){  //dlouha rovinka cislo 1 
            track.addVerticesFromObj('roadStraight', 2, i, 10, 0, rot90, rot90);
        }
        
        track.addVerticesFromObj('roadCornerLarge', 2, 18, 10, 0, rot90, rot90);   //rotace zatacky cislo 2 
        track.addVerticesFromObj('roadCornerLargeBorder', 2, 18, 10, 0, rot90, rot90);

        track.addVerticesFromObj('roadCornerLarge', 2, 22, 6, 0, rot90, rot0);   //rotace zatacky cislo 3
        track.addVerticesFromObj('roadCornerLargeBorder',2, 22, 6, 0, rot90, rot0);

        for(let i=16;i>10;i-=2){  //dlouha rovinka cislo2
            track.addVerticesFromObj('roadStraight', 2, i, 4, 0, rot90, rot90);
        }

        track.addVerticesFromObj('roadCornerLarge', 2, 8, 0, 0, rot90, rot180);   //rotace zatacky cislo 4
        track.addVerticesFromObj('roadCornerLargeBorder', 2, 8, 0, 0, rot90, rot180);


        track.addVerticesFromObj('roadCornerLarge', 2, 10, 0, 0, rot90, rot0);   //rotace zatacky cislo 5
        track.addVerticesFromObj('roadCornerLargeBorder', 2, 10, 0, 0, rot90, rot0);

        track.addVerticesFromObj('roadStraight', 2, 4, -2, 0, rot90, rot90);  //kratka rovina cislo 1

        track.addVerticesFromObj('roadCornerLarge', 2, 4, -4, 0, rot90, rot0-rot90);   //rotace zatacky cislo 6
        track.addVerticesFromObj('roadCornerLargeBorder', 2, 4, -4, 0, rot90, rot0-rot90);

    }

    

    update ()
    {   
        this.debug.clear();
        this.debug.lineStyle(1, 0x00ff00);
    }

}