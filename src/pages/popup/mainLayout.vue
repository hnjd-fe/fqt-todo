<template>
<el-container style="height: 600px; border: 1px solid #eee" class="popup_layout">
  <el-container>
      <el-header>
            <el-row>
                <el-col :span="7">
                    <el-select v-model="filterType" 
                        @change="filterTypeChange" 
                        style="width:95%;" 
                        size="medium" 
                        >
                        <el-option
                            :label="$t(`type--1`)"
                            :value="-1">
                        </el-option>
                        <el-option
                            v-for="( item, index ) in typemap.item"
                            :key="index"
                            :label="$t(`type-${index}`)"
                            :value="index">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="7">
                    <el-select v-model="filterStatus" 
                        @change="filterChange" 
                        style="width:95%;" 
                        size="medium"
                        >
                        <el-option
                            :label="$t(`status--1`)"
                            :value="-1">
                        </el-option>
                        <el-option
                            v-for="( item, index ) in typemap.status"
                            :key="index"
                            :label="$t(`status-${index}`)"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="8">
                  <el-input
                      :placeholder="$t('searchPlaceholder')"
                      v-model="searchText"
                      @input="onTextInput"
                      size="medium"
                      >
                      <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>    

                </el-col>
                <el-col :span="2" style="text-align: center">
                    <el-button type="primary"  icon="el-icon-plus" circle style="zoom:.8"
                        @click="onAddItemFull"
                    ></el-button>
                </el-col>
            </el-row>
            </el-row>
      </el-header>
    
    <el-main 
		v-loading="loading"
        :style="paddingMain"
	>
        <ListDataComp
            :list="listData"
			:updateFullList="updateFullList"
			:additemjson_pnt="additemjson_pnt"
            :searchText="searchText"
            />
    </el-main>

		<el-pagination
		  v-if="listData.length && !loading && listTotal > listPageSize && false"
		  background
		  layout="prev, pager, next"
		  :total="listTotal"
		  :page-size="listPageSize"
		  :current-page="listCurPage"
		  @current-change="curListChange"
		  >
		</el-pagination>
    <el-footer>
        <el-row>
            <el-col :span="13">
                <el-link :href="packInfo.homepage" target="_blank" class="pluginName">
                    <i class="el-icon-logo" style=""></i>
                    <span>{{packInfo.name}}</span>
                </el-link>
                <el-link v-if="token && !syncInProcessing" :title="$t('synchronous')" style="margin-left: 5px;" @click="synchronousData">
                     <i class="el-icon-refresh">{{$t('synchronous_short')}}</i>
                </el-link>
                <el-link v-if="token && syncInProcessing" style="margin-left: 5px;" >
                     {{$t('synchronous_in_processing_short')}}
                </el-link>
            </el-col>
            <el-col :span="11" style="text-align: right">
                <el-link id="login" v-if="!token">{{$t('login')}}@github</el-link>
                <el-link v-if="token" href="javascript:;" id="logout">{{$t('logout')}}</el-link>
                <el-link v-if="token">, </el-link>
                <el-link v-if="token" >{{nickname}}@{{logintype}} </el-link>

                <el-link href="./index.html"  :target="`_${packInfo.name}_index`" 
                    style="margin-right: -10px"
                    :title="$t('setting')"
                    >
                    <i class="el-icon-setting" style="padding: 0 10px;"></i>
                </el-link>
            </el-col>
        </el-row>
    </el-footer>

  </el-container>
</el-container>
</template>
<style lang="less">
@import './index.less';
</style>

<script>
import config from '@src/chrome/config.js'
import dataMixin from '@src/mixin/data.js'

import moment from '@src/chrome/utils/moment.js'
const packInfo = require( '@root/package.json' )

let tmer;

export default {
    props: [ "packInfo" ],
    mixins: [ dataMixin ],
    data() {
        return {
			additemjson_pnt: null
			, sortList: true
        }
    }
    , created(){

    }
    , mounted(){
        let p = this;

		this.updateFullList( 1 );

        this.initLogin();
    }
    , methods: {
        onAddItemFull() {
            this.additemjson_pnt = {
                type: 0
                , status: false
                , endDate: moment().add( 1, 'days')._d.getTime()
            };
        }

		, afterUpdateList(){
			this.loading = false;

            if( ( this.listTotal > this.listPageSize ) ){
                //this.paddingMain = 'padding-bottom: 50px;'
            }

		}
    }
};
</script>

