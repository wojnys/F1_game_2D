//let time=0;
let LightOff=[];
let LightOn=[];
let lights_off=0;
let StartRace =false;

var real_time=1;
var lights_time_cover=0;
var lock_light = [];
class Lights{
    constructor(scene) {
        this.scene=scene;

        this.GenerateLights();
        this.LightsUpdate();
    }

    
    //vygeneruje cervene svetla (vygeneruje i svetla ktere jsou cerne(potom cerne svetla nahradi cervene))
GenerateLights(){
    for(let i=0;i<5;i++){
        LightOff[i] = this.scene.physics.add.image((i*70)+300,60,"lightOff");
    }

    for(let i=0;i<5;i++){
        LightOn[i] = this.scene.physics.add.image((i*70)+300,60,"lightOn");
    }
    StartRace = false;
}


//zhasinani cervenych svetel
LightsUpdate(time,delta){

    if(StartRace!=true){  //tohle se bude provadet pouze kdyz jsou svetla cervena

        real_time=time*0.001;   //sekundy(je to cas ktery je stejny na vsech kompech)

        if(real_time>=2 && lock_light[0]!=1){
            LightOn[lights_off].destroy();  //po 50ms se vzdy jedno cervene svetlo zhasne
            lights_off++;
            lock_light[0]=1;
        }
        if(real_time>=4 && lock_light[1]!=1){
            LightOn[lights_off].destroy();  //po 50ms se vzdy jedno cervene svetlo zhasne
            lights_off++;
            lock_light[1]=1;
        }
        if(real_time>=6 && lock_light[2]!=1){
            LightOn[lights_off].destroy();  //po 50ms se vzdy jedno cervene svetlo zhasne
            lights_off++;
            lock_light[2]=1;
        }
        if(real_time>=8 && lock_light[3]!=1){
            LightOn[lights_off].destroy();  //po 50ms se vzdy jedno cervene svetlo zhasne
            lights_off++;
            lock_light[3]=1;
        }
        if(real_time>=10 && lock_light[4]!=1){
            LightOn[lights_off].destroy();  //po 50ms se vzdy jedno cervene svetlo zhasne
            lights_off++;
            lock_light[4]=1;
        }
        /*time++;
        if(time>=50){
            LightOn[lights_off].destroy();  //po 50ms se vzdy jedno cervene svetlo zhasne
            lights_off++;
            time=0;   
        }*/
    }

    
    if(lights_off==5){  //kdyz se zhasne vsech 5 sevetel tak se uvolni plyn a auto se muze rozjet
        StartRace=true;
    lights_time_cover = real_time;

     console.log("cover time:"+lights_time_cover);
     console.log("real time:"+real_time);
        lights_off=0;         //pote vynulujeme at se hra lepe optimalizuje
    }
    
   
}
}