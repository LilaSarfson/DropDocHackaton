let dropBox = document.querySelector(".dropBox");
let button = document.querySelector(".button");
let input = document.querySelector(".input");
let dropZone = document.querySelector(".dropZone");
let documentZone1 = document.querySelector(".newDoc");
FileList = [];

button.addEventListener("click", (event) => {
  event.preventDefault();
  clickOnInput();
  console.log(input.files)
});

function clickOnInput() {

  input.click();

};

// Añadir un archivo con el botón

input.addEventListener("change", (e) => {
  files = input.files;
  documentZone1.innerHTML += `
    <div class="documentZone">
                        <div class="docDownloaded"><img class="iconoDoc" src="./Image/pictures.png" alt=""></div>
                        <div class="uploadZone">
                            <h3 class="fileName">NombredeArchivo1</h3>
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

dropBox.addEventListener('dragover', dragOverHandler, false)
dropBox.addEventListener('drop', dropHandler, false)

function dropHandler(ev) {
  console.log('File(s) dropped');
  ev.preventDefault();
  if (ev.dataTransfer.items) {
    // Use DataTransferItemList interface to access the file(s)
    for (let i = 0; i < ev.dataTransfer.items.length; i++) {
      multipleFile = ev.dataTransfer.files[i]
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
    <h3 class="fileName">${multipleFile.name}</h3>
        <div style="width: 50%" class="Upload">
        <div>80 %</div>
        </div>
        </div>
        </div>
        `
}
function dragOverHandler(ev) {
  ev.preventDefault();
}

dropBox.addEventListener("dragenter", event => {
  document.querySelector(".dropBox p").textContent = "Suelta aquí tu archivo";
  event.stopPropagation();
  
});

dropBox.addEventListener("dragleave", event => {
  document.querySelector(".dropBox p").textContent = "Puedes dropear tu archivo aquí o"
  event.stopPropagation();
});

// let textbox = document.querySelector(".droptext");

// textbox.addEventListener("dragenter", event => {
//   // highlight potential drop target when the draggable element enters it
//   if (event.target.classList.contains("dropzone")) {
//     event.target.classList.add("dragover");
//   }
//   document.querySelector(".droptext p").textContent = "Suelta aquí tu archivo";
//   event.preventDefault();
// });



// textbox.addEventListener("dragleave", event => {
//   // reset background of potential drop target when the draggable element leaves it
//   if (event.target.classList.contains("dropzone")) {
//     event.target.classList.remove("dragover");
//     console.log("funcionoo")
//   }
//   document.querySelector(".droptext p").textContent = "Puedes dropear tu archivo aquí o"
//   event.preventDefault();
// });




//  GOOGLE AUTHENTICATOR

// Credenciales google
const CLIENT_ID = '799427492949-4cl8i09kkimcqqp6h60g9qaadsci85q1.apps.googleusercontent.com';
const API_KEY = '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';

const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

const SCOPES = 'https://www.googleapis.com/drive.file';
let tokenClient;
let gapiInited = false;
let gisInited = false;

document.getElementById('authorize_button').style.visibility = 'hidden';
document.getElementById('signout_button').style.visibility = 'hidden';

/**
 * Callback after api.js is loaded.
 */
function gapiLoaded() {
  gapi.load('client', intializeGapiClient);
}

/**
 * Callback after the API client is loaded. Loads the
 * discovery doc to initialize the API.
 */
async function intializeGapiClient() {
  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
  });
  gapiInited = true;
  maybeEnableButtons();
}

/**
 * Callback after Google Identity Services are loaded.
 */
function gisLoaded() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: '', // defined later
  });
  gisInited = true;
  maybeEnableButtons();
}

/**
 * Enables user interaction after all libraries are loaded.
 */
function maybeEnableButtons() {
  if (gapiInited && gisInited) {
    document.getElementById('authorize_button').style.visibility = 'visible';
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick() {
  tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
      throw (resp);
    }
    document.getElementById('signout_button').style.visibility = 'visible';
    document.getElementById('authorize_button').innerText = 'Refresh';
    await listFiles();
  };

  if (gapi.client.getToken() === null) {
    // Prompt the user to select a Google Account and ask for consent to share their data
    // when establishing a new session.
    tokenClient.requestAccessToken({ prompt: 'consent' });
  } else {
    // Skip display of account chooser and consent dialog for an existing session.
    tokenClient.requestAccessToken({ prompt: '' });
  }
}
function handleSignoutClick() {
  const token = gapi.client.getToken();
  if (token !== null) {
    google.accounts.oauth2.revoke(token.access_token);
    gapi.client.setToken('');
    document.getElementById('content').innerText = '';
    document.getElementById('authorize_button').innerText = 'Authorize';
    document.getElementById('signout_button').style.visibility = 'hidden';
  }
}

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}
