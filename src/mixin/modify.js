
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
                db.add( json ).then( ()=> {
                    resolve( json );
                }).catch( ()=>{
                    reject( json );
                });
            });
        }
    }
}

export default mixin;
