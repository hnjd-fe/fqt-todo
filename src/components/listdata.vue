<template>
    <div class="listitem-box" >
        <el-row v-for="(item, sindex) in list" :key="sindex">
            <label>
                <el-col :span="1" style="text-align: center;" >
                    <el-checkbox 
                        v-model="item.status" 
                        label="" 
                        true-label="" 
                        false-label="" 
                        round 
                        @change="onChange( $event, item, sindex )"
                        />
                </el-col>
                <el-col :span="17">
                {{item.note}}
                </el-col>
                <el-col :span="6" style="text-align: right; padding-right: 5px;">
                {{moment(parseInt(item.updateDate)).format('YYYY-MM-DD HH:mm:ss')}}
                </el-col>
            </label>
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

export default {
    mixins: [ modifyMixin ]
	, props: [ "index", "item", "list" ]
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
		, onSubmit() {
			return false;
		}
		, onBlur() {
			this.hide && this.hide( this.index, this.item );
		}
        , onChange( evt, item, sindex ){
            console.log( 'onChange', item, sindex );
            item.updateDate = Date.now();
            this.updateItem( item.id, item );
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
