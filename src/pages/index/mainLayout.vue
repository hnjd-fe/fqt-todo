<template>
  <el-container>
		<el-header style="text-align: left; font-size: 12px">
			<el-row>
				<el-col :span="10">
					<span>
						<i class="el-icon-logo" style="margin-right: 0px"></i>
					</span>
					<label style="font-weight: bold; font-size: 16px;">{{packInfo.name}}</label>
					<span>{{$t('totalLabel')}} </span><span>{{fullTotal}}</span>
					<span v-if="fullTotal != listTotal">, {{$t('curTotalLabel')}} </span><span v-if="fullTotal != listTotal">{{listTotal}}</span>
				</el-col>
				<el-col :span="10" style="text-align:right;">
					<el-select v-model="filterStatus" placeholder="请选择" @change="filterChange">
						<el-option
							label="全部状态"
							:value="-1">
						</el-option>
						<el-option
							v-for="( item, index ) in typemap.status"
							:key="index"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
						&nbsp;
				</el-col>
				<el-col :span="4" style="text-align:right;">
					  <el-input
						  :placeholder="$t('searchPlaceholder')"
						  v-model="searchText"
						  @input="onTextInput"
						  >
						  <i slot="prefix" class="el-input__icon el-icon-search"></i>
					  </el-input>    
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
</style>

<script>
const packInfo = require( '@root/package.json' )

import "@src/assets/css/iconfont/iconfont.css";


import moment from '@src/chrome/utils/moment.js'
import config from '@src/chrome/config'
import dataMixin from '@src/mixin/data.js'

export default {
    mixins: [ dataMixin ]
    , data() {
        return {
            packInfo: packInfo
        }
    }
    , mounted(){
        let p = this;
		this.updateFullList( 1, this.$route.query.id );
    }
    , methods: {
        moment
		, afterUpdateList(){
			this.loading = false;

            if( ( this.listTotal > this.listPageSize ) ){
                this.paddingMain = 'padding-bottom: 50px;'
            }
		}
    }

};
</script>
