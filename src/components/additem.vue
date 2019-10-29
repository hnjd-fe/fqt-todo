<template>
	<el-drawer
	  :before-close="handleClose"
	  :visible.sync="dialog"
	  direction="rtl"
	  custom-class="edit-drawer"
	  ref="drawer"
	  :show-close="true"
	  >
	  <el-row slot="title" class="dtitle">
		  <el-col :span="22">
		  	{{$t('addTask')}}
		  </el-col>
		  <el-col :span="2" style="text-align: center; white-space: nowrap">
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
						:placeholder="$t('inputPlaceholder')"
						type="textarea"
						suffix-icon="el-icon-enter"
						autosize
						@keydown.ctrl.enter.native="onSubmit()"
					  ></el-input>
				  </el-form-item>

				<el-form-item style="padding: 20px 0 10px 0;">
					<el-date-picker
						v-model="daterange"
						type="datetimerange"
						range-separator="-"
						:start-placeholder="$t('startDate')"
						:end-placeholder="$t('endDate')"
						@change="onDateChange"
						>
					</el-date-picker>
				</el-form-item>

				<el-form-item style="maring-top: 10px; margin-bottom:10px;">
					<el-radio-group v-model="form.type" size="medium">
						<el-radio-button
						v-for="(sitem, sindex) in typemap.item" 
						:label="sindex" 
						:key="sindex" 
						>{{$t(`type-${sindex}`)}}</el-radio-button>
					</el-radio-group>
				</el-form-item>

				<el-form-item>
					<el-radio-group v-model="form.status" size="medium">
						<el-radio-button 
						v-for="(sitem, sindex) in typemap.status" 
						:label="sitem.value" 
						:key="sindex" 
						>{{$t(`status-${sitem.value?1:0}`)}}</el-radio-button>
					</el-radio-group>
				</el-form-item>

			  </el-form>
			  <div class="demo-drawer__footer">
				  <el-button type="primary" @click="onSubmit()">{{$t('submit')}}</el-button>
				  <el-button @click="onClose()">{{$t('cancel')}}</el-button>
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
		, onSubmit() {
			console.log( 'onSubmit', this.form.note, Date.now() );
			if( !this.form.note ) {
				this.$message({
					message: this.$t( 'requireNote' ),
					type: 'warning'
				});
				return;
			}

            this.addItem( this.form ).then( ( json )=>{
                this.$message({
                    message: this.$t( 'addNoteSuccess' ),
                    type: 'success'
                });

                console.log( 'add update', this.form );
				this.onClose();
				this.update && this.update();
            }, ()=>{
                this.$message({
                    message: this.$t( 'addNoteError' ),
                    type: 'error'
                });
            }
			);

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
