<template>
    <div class="additem-box">
        <el-row>
            <el-col :span="24">
				<el-form ref="form" :model="form" label-width="80px" @submit.native.prevent>
					<el-input 
						v-model="form.name"
						suffix-icon="el-icon-enter"
						v-focus
						@blur="onBlur"
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
export default {
	props: [ "index", "item", "hide" ]
	, data() {
		return {
			form: {
				name: '',
				region: '',
				date1: '',
				date2: '',
				delivery: false,
				type: [],
				resource: '',
				desc: ''
			}
		}
	}
	, methods: {
		updateTotal() {
		}
		, onSubmit() {
			this.onBlur();

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
