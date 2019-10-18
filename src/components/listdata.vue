<template>
    <div class="listitem-box" >
        <el-row v-for="(item, index) in list" :key="index">
            <el-col :span="2" style="text-align: center;" >
                <el-checkbox v-model="item.status" label="" true-label="" false-label="" round />
            </el-col>
            <el-col :span="16">
            {{item.note}}
            </el-col>
            <el-col :span="6" style="text-align: right; padding-right: 5px;">
            {{moment(parseInt(item.updateDate)).format('YYYY-MM-DD HH:mm:ss')}}
            </el-col>
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
