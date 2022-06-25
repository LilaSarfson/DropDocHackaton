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
  e.preventDefault();
  file = e.dataTransfer.files;
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
  // if (dropBox.style.backgroundImage = "url('Image\filec.png')"){
  //   dropBox.style.backgroundImage = "url('Image\fileb.png')";
  // }
}
function dragOverHandler(ev) {
  ev.preventDefault();
}

dropBox.addEventListener("dragenter", event => {
//  dropBox.style.backgroundImage = "url('../Image/filec.png')";
});

dropBox.addEventListener("dragleave", event => {
  // dropBox.style.backgroundImage = "url('../Image/fileb.png')";
});


//  GOOGLE AUTHENTICATOR

const CLIENT_ID = '799427492949-4cl8i09kkimcqqp6h60g9qaadsci85q1.apps.googleusercontent.com';
const API_KEY = 'AIzaSyDm7VUHic_xLq_bgBu50Yfv_W-3nDSql78';

// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/drive.file';

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

// Upload files at Google Drive



//Creamos una carpeta en el drive del usuario
function createFolder(){
  return gapi.client.drive.files.insert(
      {
          'resource':{
              "title":'Drive API From JS Sample',
              "mimeType": "application/vnd.google-apps.folder"
          }
      }
  )


//Verifica que la carpeta exista y la crea si no es así
}function ensureUploadFolderPresent(){
  return gapi.client.drive.files.list(
      {q:"mimeType = 'application/vnd.google-apps.folder' and trashed = false"}
  ).then(function(files){
      var directory=files.result.items;

      if(!directory.length){
          return createFolder().then(function(res){
              return res.result;
          });
      }else{
          return directory[0];
      }
  });
}


function insertFile(fileData, filename,parentId) {
  var deferred = $q.defer();

  var boundary = '-------314159265358979323846';
  var delimiter = "\r\n--" + boundary + "\r\n";
  var close_delim = "\r\n--" + boundary + "--";

  var reader = new FileReader();
  reader.readAsBinaryString(fileData);
  reader.onload = function (e) {
      var contentType = fileData.type || 'application/octet-stream';
      var metadata = {
          'title': filename,
          'mimeType': contentType,
          "parents": [{"id":parentId}]
      };

      var base64Data = btoa(reader.result);
      var multipartRequestBody =
          delimiter +
          'Content-Type: application/json\r\n\r\n' +
          JSON.stringify(metadata) +
          delimiter +
          'Content-Type: ' + contentType + '\r\n' +
          'Content-Transfer-Encoding: base64\r\n' +
          '\r\n' +
          base64Data +
          close_delim;

      var request = gapi.client.request({
          'path': '/upload/drive/v2/files',
          'method': 'POST',
          'params': {'uploadType': 'multipart'},
          'headers': {
              'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
          },
          'body': multipartRequestBody});
      request.then(function(file){
          deferred.resolve(file.result);
      },function(reason){
          deferred.reject(reason);
      });
  };

  return deferred.promise;

}
function waitForFileToBecomeActive(fileId){
  var deferred = $q.defer();

  gapi.client.request({
      'path': '/drive/v2/files/'+fileId,
      'method': 'GET'
  }).then(function(){
      deferred.resolve();
  },function(){
      setTimeout(function(){
          waitForFileToBecomeActive(fileId).then(function(){
              deferred.resolve();
          },function(reason){
              deferred.reject(reason);
          })
      },1000);
  });

  return deferred.promise;
}
function insertPermission(file){
  return gapi.client.drive.permissions.insert({
      'fileId': file.id,
      'resource': {
          "withLink": true,
          "role": "reader",
          "type": "anyone"
      }
  })
}