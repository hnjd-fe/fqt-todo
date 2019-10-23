
import config from './config.js';
import db from './db.js';

document.addEventListener('DOMContentLoaded', function () {

	document.body.addEventListener( 'click', ( evt ) => {
		if( evt.path && evt.path.length ){
			for( let i = 0, j = evt.path.length; i < j; i++ ){
				
			}
		}
	});

	if( !window.delegate ) return;

	delegate( document.body, '#login', 'click', ( evt )=> {
        console.log( 'login' );
        return;
        if( chrome && chrome.tabs  ){
            chrome.tabs.create( {
                url: 'http://btbtd.org/api/fattodo'
            },
            function(tab) {

            });
        }else{
            location.href = "http://btbtd.org/api/fattodo?from=" 
				+ encodeURIComponent( location.href.split('?')[0] ) ;
        }
	});

	delegate( document.body, '#logout', 'click', ( evt )=> {
        db.logout();
		
		location.reload();
	});
});
