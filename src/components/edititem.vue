<template>
	<el-drawer
	  :before-close="handleClose"
	  :visible.sync="dialog"
	  direction="rtl"
	  custom-class="edit-drawer"
	  ref="drawer"
	  :show-close="false"
	  >
	  <el-row slot="title" class="dtitle">
		  <el-col :span="22">
		  	编辑任务
		  </el-col>
		  <el-col :span="2" style="text-align: center; white-space: nowrap">
			  <el-link type="danger" @click="onDelete()">删除</el-link>
		  </el-col>
	  </el-row>
	  <el-row class="demo-drawer__content">
		  <el-col>
			  <el-form :model="form"  @submit.native.prevent>
				  <el-form-item >
					  <el-input 
					  	autocomplete="off"
						v-focus
						v-model="form.note"
						placeholder="请输入任务，按CTRL+Enter键完成"
						type="textarea"
						autosize
						@keydown.ctrl.enter.native="onSubmit()"
					  ></el-input>
				  </el-form-item>

				<el-form-item style="padding: 20px 0 10px 0;">
					<el-date-picker
						v-model="daterange"
						type="datetimerange"
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						@change="onDateChange"
						>
					</el-date-picker>
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
				  <el-button type="primary" @click="onSubmit()">确 定</el-button>
				  <el-button @click="onClose()">取 消</el-button>
			  </div>
		  </el-col>
	  </el-row>
	</el-drawer>
</template>

<style>

.dtitle {
	font-size: 14px;
}

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
				this.form = this.clone( newv );

				this.daterange = [ this.moment( newv.startDate )._d, this.moment( newv.endDate )._d ];
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
			daterange: [ this.moment()._d, this.moment().add( 1, 'days')._d ],
			formLabelWidth: '80px'
		};
	}
	, methods: {
		updateTotal() {
		}
		, handleClose(done) {
			this.onClose();
		}
		, onDateChange() {
			console.log( 'onDateChange', this.daterange );
			this.form.startDate = this.daterange[0].getTime();
			this.form.endDate = this.daterange[1].getTime();
		}
		, onDelete(){
			this.$confirm('确定要删除任务吗？').then( ()=>{
				console.log( 'onDelete', Date.now() );

				this.deleteItem( this.form.id, this.form.md5 ).then( ()=>{
					this.onClose();
					this.update && this.update();
				});
			}, ()=>{
			});
		}
		, onSubmit() {
			console.log( 'onSubmit', this.form.note, Date.now() );
			if( !this.form.note ) {
				this.$message({
					message: '请输入任务内容！',
					type: 'warning'
				});
				return;
			}

            if( this.form.status ){
                this.form.endDate = this.moment()._d.getTime()
            }

            this.updateItem( this.form.id, this.form ).then( ( json )=>{
                console.log( 'edit update', this.form.id, this.form );
				this.onClose();
				this.update && this.update();
			});

			return false;
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
				el.querySelector('textarea').focus()
			}
		}
	}
};
</script>
