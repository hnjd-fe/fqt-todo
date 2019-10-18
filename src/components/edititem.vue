<template>
	<el-drawer
	  title="编辑任务"
	  :before-close="handleClose"
	  :visible.sync="dialog"
	  direction="rtl"
	  custom-class="demo-drawer"
	  ref="drawer"
	  >
	  <div class="demo-drawer__content">
		  <el-form :model="form">
			  <el-form-item label="活动名称" :label-width="formLabelWidth">
				  <el-input v-model="form.name" autocomplete="off"></el-input>
			  </el-form-item>
			  <el-form-item label="活动区域" :label-width="formLabelWidth">
				  <el-select v-model="form.region" placeholder="请选择活动区域">
					  <el-option label="区域一" value="shanghai"></el-option>
					  <el-option label="区域二" value="beijing"></el-option>
				  </el-select>
			  </el-form-item>
		  </el-form>
		  <div class="demo-drawer__footer" style="padding-left: 15px;">
			  <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
			  <el-button @click="onClose()">取 消</el-button>
		  </div>
	  </div>
	</el-drawer>
</template>

<style>

.edititem-box {
	position: absolute;
	top: 0;
	width: 100%;
}

</style>

<script>

import modifyMixin from '@src/mixin/modify.js'

export default {
    mixins: [ modifyMixin ]
	, props: [ "index", "item", "close", 'update', 'isedit' ]
	, watch: {
		isedit: function( newv, oldv ){
			console.log( newv, oldv );
			this.dialog = !!newv;
		}
	}
	, data() {
		return {
			table: false,
			dialog: false,
			loading: false,
			gridData: [{
				date: '2016-05-02',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1518 弄'
			}, {
				date: '2016-05-04',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1518 弄'
			}, {
				date: '2016-05-01',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1518 弄'
			}, {
				date: '2016-05-03',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1518 弄'
			}],
			form: {
				name: '',
				region: '',
				date1: '',
				date2: '',
				delivery: false,
				type: [],
				resource: '',
				desc: ''
			},
			formLabelWidth: '80px'
		};
	}
	, methods: {
		updateTotal() {
		}
		, handleClose(done) {
			this.onClose();
		}
		, onSubmit() {
			console.log( this.form.note, Date.now() );
			if( !this.form.note ) {
				this.$message({
					message: '请输入内容！',
					type: 'warning'
				});
				return;
			}
			let json = { 
				note: this.form.note 
				, type: this.index
				, status: 0
			}

			this.edititem( json ).then( ( json )=>{
					this.$message({
						message: '数据添加成功',
						type: 'success'
					});
					this.onBlur( null, json );
					this.update && this.update( json, this.index, this.item  );
				}, ()=>{
					this.$message({
						message: '添加数据时出错',
						type: 'error'
					});
				}
			);

			return false;
		}
		, onBlur( evt, json ) {
			this.close && this.close( this.index, this.item, json );
		}
		, onClose( evt, json ){
			this.close && this.close( this.index, this.item, json );
		}
	}
	, mounted(){
		this.updateTotal();
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
