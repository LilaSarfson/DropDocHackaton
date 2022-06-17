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

// dropBox.addEventListener("drop", (e)=>{
//     console.log("estas dropeando un archivo")
//
    dropBox.addEventListener('dragover',  dragOverHandler, false)
    dropBox.addEventListener('drop',  dropHandler, false)

function clickOnInput(){
    
    input.click();
 
        };

        // Añadir un archivo con el botón

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
 fileList = fileList + files;
 console.log(fileList)
})

// Añadir un archivo dropeandolo

function dropHandler(ev) {
    console.log('File(s) dropped');
  
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  
    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (let i = 0; i < ev.dataTransfer.items.length; i++) {
          multipleFile =  ev.dataTransfer.files[i]
          console.log(multipleFile);
        // If dropped items aren't files, reject them
        if (ev.dataTransfer.items[i].kind === 'file') {
          const file = ev.dataTransfer.items[i].getAsFile();
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (let i = 0; i < ev.dataTransfer.files.length; i++) {
      }

    }
    documentZone1.innerHTML += `
    <div class="documentZone">
    <div class="docDownloaded"><img class="iconoDoc"  alt=""></div>
    <div class="uploadZone">
        <h3>${multipleFile.name}</h3>
        <div style="width: 50%" class="Upload">
            <div>80 %</div>
        </div>
    </div>
</div>
    `
  }
  function dragOverHandler(ev) {
    console.log('File(s) in drop zone');
  
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  }

//   Google authenticator

function renderButton() {
    gapi.signin2.render('gSignIn', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
    });
}

// Sign-in success callback
function onSuccess(googleUser) {
    // Get the Google profile data (basic)
    //var profile = googleUser.getBasicProfile();
    
    // Retrieve the Google account data
    gapi.client.load('oauth2', 'v2', function () {
        var request = gapi.client.oauth2.userinfo.get({
            'userId': 'me'
        });
        request.execute(function (resp) {
            // Display the user details
            var profileHTML = '<h3>Welcome '+resp.given_name+'! <a href="javascript:void(0);" onclick="signOut();">Sign out</a></h3>';
            profileHTML += '<img src="'+resp.picture+'"/><p><b>Google ID: </b>'+resp.id+'</p><p><b>Name: </b>'+resp.name+'</p><p><b>Email: </b>'+resp.email+'</p><p><b>Gender: </b>'+resp.gender+'</p><p><b>Locale: </b>'+resp.locale+'</p><p><b>Google Profile:</b> <a target="_blank" href="'+resp.link+'">click to view profile</a></p>';
            document.getElementsByClassName("userContent")[0].innerHTML = profileHTML;
            
            document.getElementById("gSignIn").style.display = "none";
            document.getElementsByClassName("userContent")[0].style.display = "block";
        });
    });
}

// Sign-in failure callback
function onFailure(error) {
    alert(error);
}

// Sign out the user
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        document.getElementsByClassName("userContent")[0].innerHTML = '';
        document.getElementsByClassName("userContent")[0].style.display = "none";
        document.getElementById("gSignIn").style.display = "block";
    });
    
    auth2.disconnect();
}