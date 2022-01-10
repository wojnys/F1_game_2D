class Circuit{
    constructor(scene){
        this.scene = scene;

      
    }

    

    create ()
    {
        let track =this.scene.track;
        track= this.scene.add.mesh(400, 300);

        const rot90 = Phaser.Math.DegToRad(90);
        const rot180 = Phaser.Math.DegToRad(180);
        const rot0 =Phaser.Math.DegToRad(0);

        

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

      
        //  Zoom the camera

        track.panX(-5);
        track.panY(7);
        track.panZ(50);

        this.debug = this.scene.add.graphics();

    



        this.track = track;

       
    }

    

    update ()
    {   
        this.debug.clear();
        this.debug.lineStyle(1, 0x00ff00);
    }

}