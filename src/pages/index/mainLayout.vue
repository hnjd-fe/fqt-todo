<template>
  <el-container>
		<el-header style="text-align: left; font-size: 12px">
			<el-row>
				<el-col :span="6">
					<span>
						<i class="el-icon-logo" style="margin-right: 0px"></i>
					</span>
					<label style="font-weight: bold; font-size: 16px;">{{packInfo.name}}</label>
					<span>{{$t('totalLabel')}} </span><span>{{fullTotal}}</span>
					<span v-if="fullTotal != listTotal">, {{$t('curTotalLabel')}} </span><span v-if="fullTotal != listTotal">{{listTotal}}</span>
				</el-col>
				<el-col :span="18" style="text-align:right;">
					  <el-input
						  :placeholder="$t('searchPlaceholder')"
						  v-model="searchText"
						  @input="onTextInput"
						  style="width:300px;"
						  >
						  <i slot="prefix" class="el-input__icon el-icon-search"></i>
					  </el-input>    
					  &nbsp;
					<el-radio-group v-model="filterStatus" @change="filterChange" style="margin-top:-5px;">
						<el-radio-button :label="-1" 
						>{{$t(`status--1`)}}</el-radio-button>
						<el-radio-button 
							v-for="( item, index ) in typemap.status"
							:key="index"
							:label="item.value"
						>{{$t(`status-${item.value?1:0}`)}}</el-radio-button>
					</el-radio-group>
						&nbsp;
						<el-button type="primary"  icon="el-icon-plus" circle style=""
							@click="onAddItemFull"
						></el-button>
				</el-col>
			</el-row>
		</el-header>
		
		<el-main 
			v-loading="loading"
			class="main-box"
		>
			<GridDataComp
				:list="listData"
				:fqtData="fqtData"
				:updateFullList="updateFullList"
                :searchText="searchText"
				/>
		</el-main>

		<AddItemComp 
		:isedit="additemjson_pnt"
		:close="closeAdd"
		:update="updateList"
		/>

		<el-pagination
		  v-if="listData.length && !loading && listTotal > listPageSize"
		  background
		  layout="prev, pager, next"
		  :total="listTotal"
		  :page-size="listPageSize"
		  :current-page="listCurPage"
		  @current-change="curListChange"
		  >
		</el-pagination>

  </el-container>
</template>

<style>
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
}

.el-header .el-row {
    margin: 0 auto;
}

.el-table__row > td {
    vertical-align: top;
}

.el-aside {
    color: #333;
}

.el-pagination {
    text-align: right;
    padding: 10px;
}

.type-main > .el-col:nth-child( odd ){
	border-right: 1px solid #d9d9d9;
}

.el-main {
    overflow: hidden;
}
</style>

<script>
const packInfo = require( '@root/package.json' )

import "@src/assets/css/iconfont/iconfont.css";


import moment from '@src/chrome/utils/moment.js'
import config from '@src/chrome/config'
import dataMixin from '@src/mixin/data.js'
import compsMixin from '@src/mixin/comps.js'

export default {
    mixins: [ dataMixin, compsMixin ]
    , data() {
        return {
            packInfo: packInfo
			, additemjson_pnt: null
			, tmer: null
        }
    }
    , mounted(){
        let p = this;
		this.updateFullList( 1, this.$route.query.id );
		this.loading = false;
    }
    , methods: {
        moment
        , onAddItemFull() {
            this.additemjson_pnt = {
                type: 0
                , status: false
                , endDate: moment().add( 1, 'days')._d.getTime()
            };
        }
		, closeAdd() {
			this.additemjson_pnt = null;
		}
		, updateList( json, type, item ){
			this.tmer && clearTimeout( this.tmer );

			this.tmer = setTimeout( ()=>{
				this.updateFullList( 1, this.$route.query.id );
			}, 50 );
		}


		, afterUpdateList(){

            if( ( this.listTotal > this.listPageSize ) ){
                this.paddingMain = 'padding-bottom: 50px;'
            }
		}
    }

};
</script>
