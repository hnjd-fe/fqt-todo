<template>
    <div class="additem-box">
        <el-row>
            <el-col :span="24">
				<el-form ref="form" :model="form" label-width="80px" @submit.native.prevent>
					<el-input 
						v-model.trim="form.note"
						suffix-icon="el-icon-enter"
						v-focus
						@blur="onBlur"
						placeholder="请输入任务，按Enter键完成"
						@keyup.enter.native="onSubmit()"
					></el-input>
				</el-form>
            </el-col>
        </el-row>
    </div>
</template>

<style>

.additem-box {
	position: absolute;
	top: 0;
	width: 100%;
}

</style>

<script>

import modifyMixin from '@src/mixin/modify.js'

export default {
    mixins: [ modifyMixin ]
	, props: [ "index", "item", "hide" ]
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

			this.addItem( json ).then( ( json )=>{
					this.$message({
						message: '数据添加成功',
						type: 'success'
					});
					this.onBlur();
				}, ()=>{
					this.$message({
						message: '添加数据时出错',
						type: 'error'
					});
				}
			);

			return false;
		}
		, onBlur() {
			this.hide && this.hide( this.index, this.item );
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
