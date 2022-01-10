let time=0;
let LightOff=[];
let LightOn=[];
let lights_off=0;
let StartRace =false;

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
LightsUpdate(){

    if(StartRace!=true){  //tohle se bude provadet pouze kdyz jsou svetla cervena
        time++;
        if(time>=50){
            LightOn[lights_off].destroy();  //po 50ms se vzdy jedno cervene svetlo zhasne
            lights_off++;
            time=0;   
        }
    }

    
    if(lights_off==5){  //kdyz se zhasne vsech 5 sevetel tak se uvolni plyn a auto se muze rozjet
        StartRace=true;
        console.log("goooo");
        time=0;               //pote vynulujeme at se hra lepe optimalizuje
        lights_off=0;         //pote vynulujeme at se hra lepe optimalizuje
    }
    
   
}
}