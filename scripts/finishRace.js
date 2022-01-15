let laps_count=0;
let laps_success=false;
let one_lap_action=false;
var healthGroup=0;
let checkPoints=0;
let count_check=0;
let anounce_miss_lap;


let lap_complete="0_lap";
class FinishRace{
    constructor(scene){
        this.scene=scene;

        this.finishLine = this.scene.physics.add.image(207,384,"finish");
        checkPoints = this.scene.physics.add.image(628, 235, 'checkpoint', null, { isStatic: true });  //vytvorim prvni checkpoint
        

        
    }

    create(){
        this.text = this.scene.add.text(50,50,"", {
            font: "40px Arial",
            fill: "#ffffff",
            align: "center"
        });

        anounce_miss_lap=this.scene.add.text(200,880,"", {
            font: "18px Arial",
            fill: "#ffffff",
            align: "center"
        });


        
    }

    checkOverlap(car, checkpoints) {
        var boundsA = car.getBounds();
        var boundsB = checkpoints.getBounds();
        return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
        
    }


    updateCheckPoints(){  //kdyz auto projede checkpointem tak se check point zvysi (proti zkarocovani a cheaterum)


    let checkPointCheck = this.checkOverlap(f1_car,checkPoints);  //kontroluje jeslti auto projizdi checkpointy(proti cheaterum)
    console.log(checkPointCheck);
    checkPoints.setVisible(false); //checkpoint je pro hrace neviditelny ale fyzicky porad exituje (aby ho hrac nemohl videt)

    if(checkPointCheck==true){  //kdyz je overlap mezi f1_car a checkpointem tak se provede podminka

    count_check++;  //prida hodnotu o jeden
    checkPoints.visible = false;   //smaze se prvni checkpoint a zobrazi se druhy kterym musi hrac projet
    

    if(count_check%2==1){
    checkPoints = this.scene.physics.add.image(234, 734, 'checkpoint', null, { isStatic: true });   //zobrazi se druhy checkpoint kterym musi hrar projet a takhle se to opakuje do kola az neni konec
    lap_complete=false;  //promenna ktere je pro kontroly projeli vsemi chekpointy
    }

    if(count_check%2==0){
    checkPoints = this.scene.physics.add.image(628, 235, 'checkpoint', null, { isStatic: true });   //zobrazi se druhy checkpoint kterym musi hrar projet a takhle se to opakuje do kola az neni konec
    lap_complete=false;  //promenna ktere je pro kontroly projeli vsemi chekpointy
    }

    checkPoints.setVisible(false); //checkpoint je pro hrace neviditelny ale fyzicky porad exituje (aby ho hrac nemohl videt)
    }

}


    countLaps(laps){ 
        var dist = Phaser.Math.Distance.BetweenPoints(f1_car, this.finishLine);
        if(dist>=300){
            lap_complete=false;//promenna ktere je pro kontroly projeli vsemi chekpointy
        }
       
    
    let finish = this.checkOverlap(f1_car,this.finishLine);  //kontroluje jeslti auto projizdi checkpointy(proti cheaterum)

    //kontroluje jestli projel checkpointy
   if(count_check==2 && finish==true){  //kdyz jsem projeli vsemi checkpointy a potom i cilem tak se pricte kolo
        laps_count++;
        lap_complete=true;
        count_check=0;  //musime vynulovat
    }
    
   
    if(finish==true && lap_complete!=true && lap_complete!="0_lap"){ //pokud jsme nejaky checkpoint vynechali tak se se nam ukaze tahle zprava
        count_check=0;
        checkPoints.visible=false;
        checkPoints = this.scene.physics.add.image(628, 235, 'checkpoint', null, { isStatic: true });  //vytvorim prvni checkpoint opet
        anounce_miss_lap.visible=true; //text o tom se jsem vjel mimo okruh tady nastavim na visible
        anounce_miss_lap.setText("VYJEL SI MIMO DRAHU A NEPROJEL CHECKPOINTEM. kole se nepocita");
        console.log("ewhat");
        lap_complete=false;

        setTimeout(() => { //po 5 sekundach se smaze hlaska o tom ze neprojel chekcpointem
            anounce_miss_lap.visible=false; //nastim na invisible message o vyjeti mimo drahu
        }, 5000);
    }

    


    if(laps_count==laps){ //pokud uz odjezdime vsechny kola tak se do promene nastavi ze jsme dokoncili zavod
        laps_success=true; 
        console.log("END OF THE GAME");
    }

        this.text.setText(laps_count+" / "+laps);  //vypisuje odjete kola na obrazovku

        
        
    }
 

    crossFinishLine(){

        if(laps_success==true){
            window.location.href="./index.html";
            alert("I will upgrade win page, but GREAT TIME" + car_time);
                
        }

    }
}