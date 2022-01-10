let laps_count=0;
let laps_success=false;
let one_lap_action=false;
var healthGroup=0;
let checkpoints=0;
let checkPoint=0;
class FinishRace{
    constructor(scene){
        this.scene=scene;

        this.finishLine = this.scene.physics.add.image(207,384,"finish");


    }

    create(){
        this.text = this.scene.add.text(50,50,"", {
            font: "40px Arial",
            fill: "#ffffff",
            align: "center"
        });

        
    }



    countLaps(laps){ 

        if(f1_car.y < this.finishLine.y){

            
            if(one_lap_action ==true){
                laps_count++;   
                if(laps_count==(laps+1)){

                   laps_success =true;
               }

            }

            one_lap_action =false;
           
        }

        if(f1_car.y > this.finishLine.y)
        {
            one_lap_action =true;
        }

        this.text.setText(laps_count+" / "+laps);
        
    }
 

    crossFinishLine(){

        if(laps_success==true){
            if(car_time<="00:"+"30:"+":00"){
                window.location.href="./index.html";
                alert("BAN this time is not normal you bullshit");
            }
            else{
                window.location.href="./index.html";
                alert("I will upgrade win page, but GREAT TIME" + car_time);
            }
                
        }

    }
}