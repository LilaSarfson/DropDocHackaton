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
  file = dataTransfer.files;
  documentZone1.innerHTML += `
    <div class="documentZone">
                        <div class="docDownloaded"><img class="iconoDoc" src="./Image/pictures.png" alt=""></div>
                        <div class="uploadZone">
                            <h3 class="fileName">${file.name}</h3>
                            <div style="width: 100%" class="Upload">
                                <div>100 %</div>
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
isDropped = false;

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
        <div style="width: 100%" class="Upload">
        <div>100 %</div>
        </div>
        </div>
        </div>
        `
  if (dropBox.style.backgroundImage = "url('../Image/filec.png')"){
    dropBox.style.backgroundImage = "url('../Image/fileb.png')";
  }
}
function dragOverHandler(ev) {
  ev.preventDefault();
}

dropBox.addEventListener("dragenter", event => {
 dropBox.style.backgroundImage = "url('../Image/filec.png')";
});

dropBox.addEventListener("dragleave", event => {
  dropBox.style.backgroundImage = "url('../Image/fileb.png')";
});


//  GOOGLE AUTHENTICATOR

const CLIENT_ID = '799427492949-4cl8i09kkimcqqp6h60g9qaadsci85q1.apps.googleusercontent.com';
const API_KEY = 'AIzaSyDm7VUHic_xLq_bgBu50Yfv_W-3nDSql78';

// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';

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
    document.getElementById('authorize_button').style.visibility = 'hidden';
    await listFiles();
  };

  if (gapi.client.getToken() === null) {
    // Prompt the user to select a Google Account and ask for consent to share their data
    // when establishing a new session.
    tokenClient.requestAccessToken({prompt: 'consent'});
  } else {
    // Skip display of account chooser and consent dialog for an existing session.
    tokenClient.requestAccessToken({prompt: ''});
  }
}

/**
 *  Sign out the user upon button click.
 */
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

/**
 * Print metadata for first 10 files.
 */
async function listFiles() {
  let response;
  try {
    response = await gapi.client.drive.files.list({
      'pageSize': 10,
      'fields': 'files(id, name)',
    });
  } catch (err) {
    document.getElementById('content').innerText = err.message;
    return;
  }
  const files = response.result.files;
  if (!files || files.length == 0) {
    document.getElementById('content').innerText = 'No files found.';
    return;
  }
  // Flatten to string to display
  const output = files.reduce(
      (str, file) => `${str}${file.name} (${file.id}\n`,
      'Files:\n');
  document.getElementById('content').innerText = output;
}