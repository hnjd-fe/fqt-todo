<template>
    <div style="height:100%;">
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
                <AddItemSimpleComp 
                    :index="index" 
                    :item="item" 
                    :hide="hideMethod"
                    :update="updateList"
                    v-if="addVisible[index]" 
                    />
                <GridDataChildComp
                    :index="index" 
                    :item="item" 
                    :list="fqtData[index]"
                    :update="updateList"
                    :edit="onEditItem"
                    />
            </el-col>
        </el-row>
        <EditItemComp 
        :isedit="itemjson"
        :close="closeEdit"
        :update="updateList"
        />
    </div>
</template>

<style>

.listitem-box {
    > .el-row {
        line-height: 40px;
        font-size: 14px;
        border-bottom: 1px dashed #ccc;

        > .el-col {
        }
    }
}

</style>

<script>

import modifyMixin from '@src/mixin/modify.js'
import compsMixin from '@src/mixin/comps.js'
import jsonUtils from 'json-utilsx'

export default {
    mixins: [ compsMixin, modifyMixin ]
	, props: [ "list", "fqtData", "updateFullList" ]
	, watch: {
		list: function( newv, oldv ){
			if( newv ) {
			}else{
			}
		}
	}
	, data() {
		return {
		}
	}
	, methods: {
		hideMethod( type, item, json ) {
            this.$set( this.addVisible, type, false  );
		}
        , updateJson( json ){
            this.itemjson = json;
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
	, mounted(){
	}
	, computed: {
	}
};
</script>
