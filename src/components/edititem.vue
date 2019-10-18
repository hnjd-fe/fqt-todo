<template>
	<el-drawer
	  title="编辑任务"
	  :before-close="handleClose"
	  :visible.sync="dialog"
	  direction="rtl"
	  custom-class="demo-drawer"
	  ref="drawer"
	  >
	  <el-row class="demo-drawer__content">
		  <el-col>
			  <el-form :model="form">
				  <el-form-item >
					  <el-input v-model="form.note" autocomplete="off"></el-input>
				  </el-form-item>
				<el-form-item>
					<el-radio-group v-model="form.type">
						<el-radio 
						v-for="(sitem, sindex) in typemap.item" 
						:label="sindex" 
						:key="sindex" 
						>{{sitem.label}}</el-radio>
					</el-radio-group>
				</el-form-item>

				<el-form-item>
					<el-radio-group v-model="form.status">
						<el-radio 
						v-for="(sitem, sindex) in typemap.status" 
						:label="sitem.value" 
						:key="sindex" 
						>{{sitem.label}}</el-radio>
					</el-radio-group>
				</el-form-item>


			  </el-form>
			  <div class="demo-drawer__footer">
				  <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
				  <el-button @click="onClose()">取 消</el-button>
			  </div>
		  </el-col>
	  </el-row>
	</el-drawer>
</template>

<style>

.el-drawer__header {
	margin-bottom: 0px;	
}

.demo-drawer__content {
	padding:20px;
	padding-top:15px;
}

.el-form-item {
    margin-bottom: 0px;
}

.demo-drawer__footer {
	margin-top: 15px;
}

</style>

<script>

import modifyMixin from '@src/mixin/modify.js'

export default {
    mixins: [ modifyMixin ]
	, props: [ "index", "item", "close", 'update', 'isedit' ]
	, watch: {
		isedit: function( newv, oldv ){
			this.dialog = !!newv;
			if( newv ) {
				this.form = newv;
			}else{
				this.form = {};
			}
		}
	}
	, data() {
		return {
			table: false,
			dialog: false,
			loading: false,
			form: {
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
