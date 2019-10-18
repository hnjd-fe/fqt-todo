<template>
    <div class="listitem-box" >
        <el-row v-for="(sitem, sindex) in list" :key="sindex">
            <!--<label>-->
                <el-col :span="1" style="text-align: center;" >
                    <el-checkbox 
						v-model="sitem.status"
                        true-label="" 
                        false-label="" 
						:true-value="1"
						:false-value="0"
                        round 
                        @change.self="onChange( $event, sitem, sindex, this )"
                        />
                </el-col>
                <el-col :span="17">
                {{sitem.note}}&nbsp;
                </el-col>
                <el-col :span="6" style="text-align: right; padding-right: 5px; white-space: nowrap;">
                {{moment(parseInt(sitem.updateDate)).format('YYYY-MM-DD HH:mm:ss')}}
                <el-button  icon="el-icon-edit" circle style="zoom:.7"
                    @click="onEdit( $event, sitem, sindex )"
                ></el-button>
                </el-col>
            <!--</label>-->
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
	, props: [ "index", "item", "list", "edit", "update" ]
	, data() {
		return {
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
        , onChange( evt, sitem, sindex, ele ){
			console.log( '111', evt.currentTarget );
			console.dir( evt );

			let tmp = jsonUtils.clone( sitem );
			tmp.status = tmp.status ? 1 : 0;

            this.updateItem( tmp.id, tmp ).then( ()=>{
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
