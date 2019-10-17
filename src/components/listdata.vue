<template>
    <div >
        <el-row v-for="(item, index) in (list||[])" :key="index">
            <el-col :span="4">
                <el-checkbox v-model="item.status" label="" true-label="" false-label="" round />
            </el-col>
            <el-col :span="16">
            {{item.note}}
            </el-col>
            <el-col :span="4">
            {{moment(parseInt(item.updateDate)).format('YYYY-MM-DD HH:mm:ss')}}
            </el-col>
        </el-row>
    </div>
</template>

<style>

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
