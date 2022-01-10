
let text=0;
let car_time=0;
let ms=0;
let s=0;
let m=0;
class TimeMeasure{
    constructor(scene){
        this.scene = scene;

        this.create();
        this.update();
    }

    create(){
        text = this.scene.add.text(750,50,"", {
            font: "40px Arial",
            fill: "#ffffff",
            align: "center"
        });


    }

    update(){

        if(StartRace==true){
            ms++;
            if(m<10){
               
                    if(s<10){
                        car_time = "0"+m+":0"+s+":"+ms;
                    }
                    else{
                        car_time = "0"+m+":"+s+":"+ms;
                    }
                
                
            }
            if(m>=10){
                if(s<10){
                    car_time = m+":0"+s+":"+ms;
                }
                else{
                    car_time = m+":"+s+":"+ms;
                }
            }

            text.setText(car_time);

            if(ms>=100){
                s++;
                ms=0;
            }
            if(s>=60){
                m++;
                s=0;
            }

            

        }
    }
}