<template>
    <div class="listitem-box" >
        <el-row v-for="( sitem, sindex ) in list" :key="sitem.id"
		v-if="!loading"
        :class="`type-box type-box-${sitem.type}`"
        >
            <el-col style="padding:0">
                <el-row style="vertical-align: middle; line-height: 20px;" class="type-header" >
                    <el-col :span="2" style="text-align: center; ">
						<el-checkbox 
							v-model="sitem.status"
							:label="sindex+1 + '. ' "
							round 
							@change.self="onChange( $event, sitem, sindex, this )"
							/>

                    </el-col>
                    <el-col :span="10" >
						<label>{{typemap.item[sitem.type].label}}</label>
                    </el-col>
                    <el-col :span="10" style="text-align: right;" >
                        <label>{{typemap.status[sitem.status ? 1 : 0 ].label}}</label>
                    </el-col>
                    <el-col :span="2" class="source" style="text-align: center; padding:0; ">
                        <div style="margin-top: 3px;">
                            <el-button  icon="el-icon-edit" 
                            :title="$t('edit')"
							@click="onEdit( $event, sitem, sindex )"
                            style="zoom:.8"
                            circle></el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="20" :offset="2" style="font-size: 14px;" >
                <div>
                    <a :title="sitem.type" >
                        <span v-html="hightlightSearch(sitem.note, 1, sitem)"></span>
                    </a>
                </div>
            </el-col>
        </el-row>
		<el-row
			v-if="!list.length && !loading"
			class="no-data"
		>
		{{$t('nodata')}}
		</el-row>
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
import jsonUtils from 'json-utilsx'

export default {
    mixins: [ modifyMixin ]
	, props: [ "index", "item", "list", "edit", "update", "hightlightSearch" ]
	, watch: {
		list: function( newv, oldv ){
			if( newv ) {
			}else{
			}
		}
	}
	, data() {
		return {
			loading: null,
			form: {
				note: ''
			}
		}
	}
	, methods: {
		updateTotal() {
		}
		, setStatus( status ){
            return status ? true : false;
		}
		, onSubmit() {
			return false;
		}
		, onBlur() {
			this.hide && this.hide( this.index, this.item );
		}
        , onEdit( evt, sitem, sindex ){
            this.edit && this.edit( this.index, sitem, sindex )
        }
        , onChange( evt, sitem, sindex, src ){
            this.updateItem( sitem.id, sitem ).then( ()=>{
				this.update && this.update();
			});
        }
	}
	, mounted(){
	}
	, computed: {

	}
	, directives: {
		focus: {
			inserted: function (el) {
				el.querySelector('input').focus()
			}
		}
	}
};
</script>
