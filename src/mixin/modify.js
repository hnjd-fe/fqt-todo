
import db from '@src/chrome/db.js'
import typemap from '@src/data/typemap.js'
import moment from '@src/chrome/utils/moment.js'

let mixin = {
    data() {
        return {
        }
    }
    , methods: {
        moment
        , addItem( json ) {
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

    }
}

export default mixin;
