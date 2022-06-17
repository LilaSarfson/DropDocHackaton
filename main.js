let dropBox= document.querySelector(".dropBox");
let button = dropBox.querySelector("button");
let input = dropBox.querySelector("input");
let dropZone = document.querySelector(".dropZone");
let documentZone1 = document.querySelector(".newDoc");

let fileList = [];

button.addEventListener("click", (event)=> {
event.preventDefault();
clickOnInput();
console.log(input.files)
});

dropBox.addEventListener("drop", (e)=>{
    console.log("estas dropeando un archivo")
    });

function clickOnInput(){
    
    input.click();
 
        };
input.addEventListener("change", (e)=>{
    files = input.files;
    documentZone1.innerHTML += `
    <div class="documentZone">
    <div class="docDownloaded"><img class="iconoDoc" src="./Image/${files[0].type}.png" alt=""></div>
    <div class="uploadZone">
        <h3>${files[0].name}</h3>
        <div style="width: 50%" class="Upload">
            <div>80 %</div>
        </div>
    </div>
</div>
    `

})