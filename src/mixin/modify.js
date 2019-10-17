
import db from '@src/chrome/db.js'
import typemap from '@src/data/typemap.js'

let mixin = {
    data() {
        return {
        }
    }
    , methods: {
        addItem( json ) {
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
