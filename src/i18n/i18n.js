
import VueI18n from 'vue-i18n'
import deepmerge from 'deepmerge'

// 准备翻译的语言环境信息
const messages = {
	en: {
        "mainPage": "fqt-todo",
        "importExport": "import/export",
        "dataManage": "data manage",
        "popupPage": "popup page",
        "setting": "setting"

		, "searchPlaceholder": "search all task"
		, "inputPlaceholder": "type task in there, Ctrl+Enter submit."
		, "nodata": "nothing in there"

        , "synchronous_short": "sync"
        , "synchronous_in_processing": "data synchronous in processing, please waiting..."
        , "synchronous_in_processing_short": "syncing..."

        , "sync": "synchronous"
        , "login_github": "login github"
        , "no_login_sync_msg": "synchronous data must be login @github!"
        , "synchronous_data": "synchronous data from remote server"
        , "synchronous": "data synchronous"

        , "logout": "logout"
        , "login": "login"

        , "addTask": "Add Task"
        , "editTask": "Edit Task"
        , "edit": "Edit"
        , "delete": "Delete"

        , "status--1": "All Status"
        , "status-0": "Active"
        , "status-1": "Done"

        , "type--1": "All Type"
        , "type-0": "Important urgent"
        , "type-1": "Important not urgent"
        , "type-2": "Not important urgent"
        , "type-3": "Not important not urgent"

        , "submit": "Submit"
        , "startDate": "begin date"
        , "endDate": "end date"
        , "cancel": "cancel"
        , "confirm": "Confrim"

        , 'requireNote': 'note something in there'
        , 'deleteConfirm': 'Are you sure delete this item?'

        , 'addNoteSuccess': 'task added!'
        , 'addNoteError': 'add task failed!'
	},
	zh: {
        'nooooooo': ''

        , 'addNoteSuccess': '任务添加成功!'
        , 'addNoteError': '添加任务时出错了！'

        , 'requireNote': '请输入任务内容！'
        , 'deleteConfirm': '确定要删除任务吗？'

        , "mainPage": "fqt-todo"
        , "importExport": "导入/导出"
        , "dataManage": "数据管理"
        , "popupPage": "popup 页面"
        , "setting": "设置"

		, "searchPlaceholder": "查找全部任务"
		, "inputPlaceholder": "请输入任务，按Ctrl+Enter键完成"
		, "nodata": "没有任务"

        , "synchronous_short": "同步"
        , "synchronous_in_processing": "数据同步中，请稍候..."
        , "synchronous_in_processing_short": "数据同步中..."

        , "sync": "同步数据"
        , "login_github": "login github"
        , "no_login_sync_msg": "同步数据需要先登陆@github"
        , "synchronous_data": "从服务器同步数据"
        , "synchronous": "data synchronous"

        , "logout": "退出"
        , "login": "登陆"

        , "addTask": "添加任务"
        , "editTask": "编辑任务"
        , "edit": "编辑"
        , "delete": "删除"

        , "status--1": "全部状态"
        , "status-0": "未完成"
        , "status-1": "已完成"

        , "type--1": "全部"
        , "type-0": "很重要-很紧急"
        , "type-1": "重要-不紧急"
        , "type-2": "不重要-紧急"
        , "type-3": "不重要-不紧急"

        , "submit": "提交"
        , "startDate": "开始日期"
        , "endDate": "结束日期"
        , "cancel": "取消"
        , "confirm": "确定"
	}
}

function fixLocale( lang ){
	let zh = clone( lang.zh ), en = clone( lang.en );
	lang.en = deepmerge( zh, lang.en );
	lang.zh  = deepmerge( en, lang.zh );

    lang['zh-CN'] = lang['zh']
    lang['en-US'] = lang['en']
}

function clone( item ){
	return JSON.parse( JSON.stringify( item ) )
}

export default {
    supportLang: {
        'zh': '中文'
        , 'en': 'English'
    }
    , init( locale = zh, page = 'index' ) {
        let json = require( `./pages/${page}/index.js` );
        let merged = deepmerge( messages, json );
        fixLocale( merged );

        const i18n = new VueI18n({
            locale: locale, // 设置地区
            messages: merged, // 设置地区信息
        })

        return i18n;
    }

    , getLocale(){
		let locale = localStorage.getItem( 'locale' ) || navigator.language.replace( /\-.*/, '' );
		return locale;
    }

	, updateLocale( lang ) {
		localStorage.setItem( 'locale', lang );
		return lang;
	}
};
