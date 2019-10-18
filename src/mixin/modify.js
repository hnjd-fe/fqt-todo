
import db from '@src/chrome/db.js'
import typemap from '@src/data/typemap.js'
import moment from '@src/chrome/utils/moment.js'
import md5 from '@src/chrome/utils/md5.js'

let mixin = {
    data() {
        return {
			typemap
        }
    }
    , methods: {
        moment
        , addItem( json ) {
            json.md5 = md5( json.note + Date.now() );
            console.log( 'addItem', json );
            return new Promise( ( resolve, reject ) => {
                db.add( json ).then( ( json )=> {
                    resolve( json );
                }).catch( ()=>{
                    reject( json );
                });
            });
        }
        , updateItem( id, json ) {
            return new Promise( ( resolve, reject ) => {
                db.update( id, json ).then( ( r )=> {
                    resolve( r );
                }).catch( ()=>{
                    reject( json );
                });
            });
        }
        , deleteItem( id, md5 ) {
            return new Promise( ( resolve, reject ) => {
                db.deleteItem( id, md5 ).then( ()=> {
                    resolve( id, md5 );
                }).catch( ()=>{
                    reject( id );
                });
            });
        }
    }
}

export default mixin;
