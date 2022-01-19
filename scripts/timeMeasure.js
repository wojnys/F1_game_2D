
let text=0;
let car_time=0;

var seconds=0;
var minutes=0;
let timer=0;
let setActualTime=0;
class TimeMeasure{
    constructor(scene){
        this.scene = scene;

        this.create();
        
        
    }

    create(){
        text = this.scene.add.text(750,50,"", {
            font: "40px Arial",
            fill: "#ffffff",
            align: "center"
        });

        
    }

    update(time,delta){
        if(StartRace==true){
            seconds = time * 0.001 -(lights_time_cover);
            text.setText(Phaser.Math.RoundTo(seconds,-3));
     

            

        }
    }
}