<template>
  <el-container>
    <el-header style="text-align: left; font-size: 12px">
        <el-row>
            <el-col :span="10">
                <span>
                    <i class="el-icon-logo" style="margin-right: 0px"></i>
                </span>
                <label style="font-weight: bold; font-size: 16px;">{{packInfo.name}}</label>
                <span>{{$t('totalLabel')}} </span><span>{{fullTotal}}</span>
                <span v-if="fullTotal != listTotal">, {{$t('curTotalLabel')}} </span><span v-if="fullTotal != listTotal">{{listTotal}}</span>
            </el-col>
			<el-col :span="10" style="text-align:right;">
				<el-select v-model="filterStatus" placeholder="请选择" @change="filterChange">
					<el-option
						label="全部"
						:value="-1">
					</el-option>
					<el-option
						v-for="( item, index ) in typemap.status"
						:key="index"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
					&nbsp;
			</el-col>
            <el-col :span="4" style="text-align:right;">
                  <el-input
                      :placeholder="$t('searchPlaceholder')"
                      v-model="searchText"
                      @input="onTextInput"
                      >
                      <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>    
            </el-col>
        </el-row>
    </el-header>
    
    <el-main 
		v-loading="loading"
        class="main-box"
    >
        <el-row class="type-main">
            <el-col 
                :span="12" 
                v-for="(item, index) in typemap.item"
                :class="`type-box type-box-${index}`"
                :key="index"
                >
                <el-row class="type-header" @click.native="onAddItem( $event, index )">
                    <el-col :span="18">
                        <label>{{item.label}}</label>
                    </el-col>
                    <el-col :span="6">
                          <el-button icon="el-icon-plus" circle></el-button>
                    </el-col>
                </el-row>
                <AddItemComp 
					:index="index" 
					:item="item" 
					:hide="hideMethod"
					:update="updateList"
					v-if="addVisible[index]" 
					/>

                <ListDataComp
					:index="index" 
					:item="item" 
					:list="fqtData[index]"
					:edit="onEditItem"
					:update="updateList"
					/>

            </el-col>
        </el-row>
		<EditItemComp 
		:isedit="itemjson"
		:close="closeEdit"
		:update="updateList"
		/>

    </el-main>
		<el-pagination
		  v-if="listData.length && !loading && listTotal > listPageSize"
		  background
		  layout="prev, pager, next"
		  :total="listTotal"
		  :page-size="listPageSize"
		  :current-page="listCurPage"
		  @current-change="curListChange"
		  >
		</el-pagination>

  </el-container>
</template>

<style>
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
}

.el-header .el-row {
    margin: 0 auto;
}

.el-table__row > td {
    vertical-align: top;
}

.el-aside {
    color: #333;
}

.el-pagination {
    text-align: right;
    padding: 10px;
}

.type-main > .el-col:nth-child( odd ){
	border-right: 1px solid #d9d9d9;
}
</style>

<script>
const packInfo = require( '@root/package.json' )

import "@src/assets/css/iconfont/iconfont.css";


import moment from '@src/chrome/utils/moment.js'
import config from '@src/chrome/config'
import dataMixin from '@src/mixin/data.js'

let tmer;

export default {
    mixins: [ dataMixin ]
    , data() {
        return {
            packInfo: packInfo
        }
    }
    , mounted(){
        let p = this;
		this.updateFullList( 1, this.$route.query.id );
    }
    , methods: {
        moment
		, afterUpdateList(){
			this.loading = false;

            if( ( this.listTotal > this.listPageSize ) ){
                this.paddingMain = 'padding-bottom: 50px;'
            }
		}
        , onAddItem( evt, type ) {
            this.$set( this.addVisible, type, !this.addVisible[ type ]  );
        }

		, onEditItem( type, item, sindex ) {
			console.log( 'onEditItem', type, item, sindex );
			this.itemjson = item;
		}

		, closeEdit() {
			this.itemjson = null;
		}

		, hideMethod( type, item, json ) {
            this.$set( this.addVisible, type, false  );
		}

		, updateList( json, type, item ){
			tmer && clearTimeout( tmer );

			tmer = setTimeout( ()=>{
				this.updateFullList( 1, this.$route.query.id );
			}, 50 );
		}

        , onDeleteItem( evt, id, item ){
            this.loading = 1;
            this.deleteItem( id, item.md5 ).then( ( )=> {
                for( let i = 0, j = this.listData.length; i < j; i++ ){
                    let tmp = this.listData[ i ];
                    if( tmp.id == id ){
                        this.listData.splice( i, 1 );
                        this.loading = 0;
                        break;
                    }
                }
                console.log( 'this.listData.legnth:', this.listData.length );
                if( !this.listData.length ){
                    //this.updateFullList( 1 );
                    console.log( 'location.href', location.href.split( '?' )[0]+ '?rnd=' + Date.now() );
                    location.href = location.href.split( '?' )[0]+ '?rnd=' + Date.now();
                }
            }).catch( err => {
                this.loading = 0;
                console.error( err );
            });
        }
    }

};
</script>
