
let manifest;
if( typeof chrome !='undefined' && chrome.runtime && chrome.runtime.getManifest && chrome.runtime.getManifest() ){
    manifest = chrome.runtime.getManifest();
}else{
    manifest = require( '../manifest.json' );
}

const config = {
    "name": "config.js"
    , "dbName": manifest.name
    , "dbDesc": `${manifest.name} database`
    , "dbDataTableName": "notes"

    , "operationDelayMs": 500
};

export default config;
