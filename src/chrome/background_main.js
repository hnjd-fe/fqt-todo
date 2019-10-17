console.log( 'background', Date.now() );

import config from './config.js';
import db from './db.js';
import md5 from './utils/md5.js'

main();

/*
{
  "info": {
    "editable": false,
    "frameId": 0,
    "menuItemId": "fqt-todo",
    "pageUrl": "chrome://extensions/",
    "selectionText": "ID：opkoninacfpinfmklefkfdklgdebdoen"
  },
  "tag": {
    "active": true,
    "audible": false,
    "autoDiscardable": true,
    "discarded": false,
    "favIconUrl": "",
    "height": 946,
    "highlighted": true,
    "id": 538,
    "incognito": false,
    "index": 0,
    "mutedInfo": {
      "muted": false
    },
    "pinned": false,
    "selected": true,
    "status": "complete",
    "title": "扩展程序",
    "url": "chrome://extensions/",
    "width": 932,
    "windowId": 29
  }
}
*/

function addNote(info, tab) {

    let data = {
		note: `info.selectionText`
		, status: 0
		, siteTitle: tab.title
		, md5: ''
		, width: tab.width.toString()
		, height: tab.height.toString()
	}

    chrome.tabs.executeScript(tab.id, {code:"document.body.innerHTML"}, ( data )=>{
        console.log( 'test', data );
    })


	return new Promise( ( resolve, reject ) => {

		chrome.permissions.request({
			permissions: ['tabs'],
			origins: [
				"http://*/"
				, "https://*/"
				, "ftp://*/"
                , "file:///*/"
			]
		}, function(granted) {
			// The callback argument will be true if the user granted the permissions.
			if (granted) {
				chrome.tabs.executeScript( {
					code: "window.getSelection().toString();"
				}, function(selection) {
					data.note = selection[0];
					data.md5 = md5( [ data.siteTitle + data.note ].join( ' - ' ) )

					db.add( data ).then( ( )=> {
						resolve( data );
					}).catch( (err) => {
						reject( err );
					});
				});
			} else {
                data.note = info.selectionText;
                data.md5 = md5( [ data.siteTitle + data.note ].join( ' - ' ) )
				data.nopre = true;
                
                db.add( data ).then( ( )=> {
                    resolve( data );
                }).catch( (err) => {
                    reject( err );
                });
			}
		});
	});
}

let copyNoti;

function main(){
    if( typeof chrome == 'undefined' ) return;

    var menuItem = chrome.contextMenus.create({
        "id": config.dbName
        , "title": "svae selection text"
        , "contexts": ["selection"]
    });

    /*
    var child1 = chrome.contextMenus.create( {
        "id": "save text"
        , "title": "save text"
        , "parentId": menuItem
        , "contexts": ["selection"]
    });
    */

    chrome.contextMenus.onClicked.addListener( function(info, tab){

        switch( info.menuItemId ){
            case config.dbName: {
                addNote( info, tab ).then( (data)=>{
						copyNoti = chrome.notifications.create(
							config.dbName,{   
								type: 'basic', 
								iconUrl: '../assets/img/save-everywhere48.png', 
								title: `${config.dbName} save done!`, 
								message: `${data.note}`
							},
							function() {
								console.log( 'notification done' );
								chrome.notifications.clear( config.dbName, ()=>{
									console.log( 'clear done', Date.now() );
								});
							} 
						);
					}
				);
                break;
            }
        }
    } )
}

