
import GridDataComp from '@src/components/griddata.vue';
import ListDataComp from '@src/components/listdata.vue';
import db from '@src/chrome/db.js'
import typemap from '@src/data/typemap.js'

import store from 'store'

let mixin = {
    data() {
        return {
            searchDelayMs: 500
            , searchDelayName: 'searchDelay' 
            , listTotal: 0
            , listPageSize: 50 
            , listCurPage: 1 
            , listData: []
            , curPageData: []
            , searchText: ''
			, isSearch: 0
			, loading: true 
            , paddingMain: ''
            , searchTextDelay: 0
            , syncInProcessing: 0
            , fullTotal: 0

			, fqtData: {}

            , token: localStorage.getItem( 'token' )
            , email: localStorage.getItem( 'email' )
            , username: localStorage.getItem( 'username' )
            , nickname: localStorage.getItem( 'nickname' ) || localStorage.getItem( 'username' )
            , md5: localStorage.getItem( 'md5' )
            , logintype: localStorage.getItem( 'logintype' )
            , uid: localStorage.getItem( 'uid' )

            , typemap: typemap

			, filterStatus: typeof store.get( 'status' ) != 'undefined' ? store.get( 'status' ) : false
			, filterType: -1
			, sortList: false
        }
    }
    , components: {
		GridDataComp
        , ListDataComp
    } 
    , methods: {
        synchronousData() {

            this.syncInProcessing = 1;
            if( db.isLogin() ){
                db.sync().then( ()=>{
                });
            }
        }

        , filterChange( status, val ){
            this.updateFullList( 1, this.$route.query.id );
			store.set( 'status', status );
        }
		, filterTypeChange( type ){
            this.updateFullList( 1, this.$route.query.id );
			store.set( 'type', type );
		}
        , initLogin() {
            this.setDataItem( 'token' );
            this.setDataItem( 'username' );
            this.setDataItem( 'nickname' );
            this.setDataItem( 'email' );
            this.setDataItem( 'md5' );
            this.setDataItem( 'logintype' );
            this.setDataItem( 'uid' );

            if( this.$route.query.token ){
                setTimeout( ()=>{
                    location.href = location.href.split( '?' )[0];
                }, 50 );
            }
        }
        , setDataItem( key, val ){
            if( this.$route.query[key]){
                localStorage.setItem( key, this.$route.query[key]);
                this.$set( this.data || {}, key, val );
            }
        }

        , updateTotal() {
            this.$refs.databaseInfo.updateTotal();
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
        , updateDefaultList() {
            db.topList()
            .then( ( data )=>{
				data = this.sortListFunc( data );

                this.listData = data;
				this.listTotal = this.listData.length;
				this.listCurPage = 1;

                this.afterUpdateList();
                this.updateFullTotal();

                this.resolveFqtData();
            });
        }
        , updateFullList( page = 1, id ) {
            db.fullList( page, 50, id, this.filterStatus, this.filterType )
            .then( ( data )=>{
				data.data = this.sortListFunc( data.data );

                this.listData = data.data;
				this.listTotal = data.total;
				this.page = 1;

                this.afterUpdateList();
                this.updateFullTotal();

                this.resolveFqtData();
            });
        }
        , resolveFqtData( data ){
            let tmp = { "0": [], "1": [], "2": [], "3": [] };
            this.listData.map( ( item ) => {
                if( !( item.type in tmp) ){
                    tmp[ item.type ] = [];
                }
                tmp[ item.type ].push( item );
            });

            for( let k in tmp ){
                this.$set( this.fqtData, k, tmp[k] );
            }

			this.loading = false;
        }
		, sortListFunc( data ) {
			if( !this.sortList ) return data;

			let tmp = [], o = {};

			data.map( (item) => {
				if( !o[item.type] ){
					o[item.type] = [];
				}
				o[ item.type ].push( item );
			});
			for( let i = 0; i < 4; i++ ){
				if( o[i] ){
					tmp.push( ...o[i]);
				}
			}

			return tmp;
		}
        , afterUpdateList( curListPage ){
        }

        , updateFullTotal(){
            db.total().then( ( total ) => {
                this.fullTotal = total;
            });
        }

        , fixNewLine(){
        }

        , onTextInput () {
            if( this.searchTextDelay ) clearTimeout( this.searchTextDelay );

            this.searchTextDelay = setTimeout( ()=>{
				let search = (this.searchText||'').trim();
				if( !search || search.length < 2 ){
					this.isSearch = 0;
					this.updateFullList( this.listCurPage );
					return;
				}

				this.loading = true;

				db.search( this.searchText ).then( ( list )=>{
					this.isSearch = 1;
					this.searchData = list;
					this.listData = this.searchData.slice( 0, this.listPageSize );
					this.listCurPage = 1;
					this.listTotal = this.searchData.length

					this.afterUpdateList();
                    this.updateFullTotal();

                    this.resolveFqtData();
				});
            }, this.searchDelayMs );
        }
		, curListChange( page ) {
			this.loading = true;
			this.listCurPage = parseInt( page );

			if( this.isSearch ){
				let start = ( page - 1 ) * this.listPageSize;
				this.listData = this.searchData.slice( start, start + this.listPageSize );
			}else{
				this.updateFullList( page  );
			}
		}



    }
}

export default mixin;
