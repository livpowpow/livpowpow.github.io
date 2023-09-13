let firstSection = document.getElementById("keyterms");
console.log(firstSection);

let isWhite = true;

function colourToggle(){
    //console.log("toggle");
    if(isWhite){
        firstSection.style.backgroundColor = "#BF80FE";
        isWhite = false;
    } else{
        console.log("state is purple");
        firstSection.style.backgroundColor = "white";
        isWhite = true;
    }
}

function changeBGColour(bgColour){
    console.log("i'm clicked");
    firstSection.style.backgroundColor = bgColour;
    firstSection.style.color = "black";

}

//changeBGColour("#BF80FE");

//setTimeout(changeBGColour, 1000);8