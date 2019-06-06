<!--src/manager里面的vue，外面的static文件夹和json以及需要的路由-->
<style type="text/css">
	.el-table thead.is-group th,.el-table th.is-leaf{
		background-color: #f5f7fa;
	}
</style>
<style scoped>
	#a_topwrap {
		height: 44px;
		background-color: deepskyblue;
		line-height: 44px;
	}
	.a_name{
		margin-right: 30px;float: right;color:white;
	}
	#a_leftwrap {
		float: left;
		width: 180px;
		background-color: #dedede;
		font-size: 16px;
	}
	.a_leftwrap_nav,.a_leftwrap_subnav{
		padding: 9px 30px;
		position: relative;
		color: #666;
	}
	.a_leftwrap_nav{
		border-top: 1px solid #cacaca;
	}
	.a_leftwrap_nav:hover,.a_leftwrap_subnav:hover{
		color: #007EFF;
	}
	.a_leftwrap_nav>i{
		position: absolute;
		top: 17px;
		right: 20px;
		width:0;
		border-top: 5px solid coral;
		border-left: 5px solid transparent;
		border-right: 5px solid transparent;
	}
	.a_leftwrap_subnavwrap{
		height:0px;
		overflow: hidden;
	}
	.a_leftwrap_subnav{
		padding-left: 40px;
	}
	.a_contwrap {
		margin-left: 180px;
	}	
	.a_conttabs {
		height: 41px;
		background-color: #eee;
	}
	#a_contsubwrap{
		overflow: scroll;
	}
</style>

<template>
	<div>
		<div id="a_topwrap">
			<span style="float: left;color: white;margin-left: 30px;font-weight: bolder;">FOR-ADMIN WITH V ELE-UI</span>
			<span class="a_name">MSG</span>
			<span class="a_name" style="margin-right: 20px;">超级管理员&nbsp;&nbsp;&nbsp;|</span>
		</div>
		<div id="a_leftwrap">
			<div >
				<div v-for='(v,i) in tabstravels'>
					<div v-if='v.children' style="cursor: pointer;">
						<div @click='navshow(i)' class="a_leftwrap_nav">
							{{v.title}}
							<i></i>
						</div>
						<div class="a_leftwrap_subnavwrap" :id="subnavs(i)">
							<div :id="subnavs2(i)">
								<div v-for='(vi,ind) in v.children' @click='addTab(vi)' class="a_leftwrap_subnav">
									{{vi.title}}
								</div>								
							</div>
						</div>						
					</div>
					<div v-else style="cursor: pointer;">
						<div @click='addTab(v)' class="a_leftwrap_nav">
							{{v.title}}
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="a_contwrap">
			<div class="a_conttabs">
				<el-tabs v-model="editableTabsValue" type="card" @tab-remove="removeTab" @tab-click='thistab(editableTabsValue)'>
					<el-tab-pane :key="item.name" v-for="(item, index) in editableTabs" :label="item.title" :name="item.name" :closable="index!=0?true:false"></el-tab-pane>
				</el-tabs>
			</div>
			<div id="a_contsubwrap">
				<div id="ifshow" style="height: 0;overflow: hidden;position: relative;">
					<router-view></router-view>
				</div>				
			</div>
		</div>
	</div>
</template>

<script>
	/*
	 * @mounted启动的方法
	 * fixheight()//高度适配
	 * 刷新返回初始页：
	 * 一开始先隐藏，刷新之后返回初始路径再出现组件
	 * @手动触发启动
	 * thistab()，addTab(tabobj)，removeTab(targetName)//标签栏操作
	 * @组件刷新：
	 * 进入空的组件立马back，返回之前的组件
	 * @定时器变量的问题
	 * 这里的定时器带一个i开头，分页的定时器带一个is开头，弹窗那些自定义定时器的话不要带开头就行
	 */
	import { Tabs, TabPane } from 'element-ui'
	export default {
		components: {
			elTabs: Tabs,
			elTabPane: TabPane,
		},
		data() {
			return {
				itimer:null,
				//导航栏展开控制
				itimer2: null,
				navheightflag:false,
				//标签栏数据
				editableTabsValue: '1',//切换已打开的标签的唯一标识,也就是name
				tabstravels:[{//所有标签
					path:'/admin_index/shenpi',
					title:'审批管理',
					name: '2',
					content: 'Tab 1 content'
				},{
					title:'系统设置',
					name: '3',
					content: 'Tab 2 content',
					children:[{
						path:'/admin_index/product',
						title:'栏目管理',
						name: '2a',
						content: 'Tab 2a content',
					}]
				}],
				editableTabs: [{//已打开标签
					path:'/admin_index/wel',
					title: 'welcome',
					name: '1',
					content: 'Tab 1 content'
				}],
			}
		},
		methods: {
			//@高度fix
			fixheight() {
				var _this = this;
				_this.itimer2 = setInterval(function() {
					var winheight = window.innerHeight ? window.innerHeight :
						document.documentElement.clientHeight ? document.documentElement.clientHeight :
						document.body.clientHeight
					$('#a_leftwrap').css('height', winheight - 44)
					$('#a_contsubwrap').css('height', winheight - 85)
					clearInterval(_this.itimer2);
					_this.fixheight()
				}, 20)
			},
			//@标签操作的方法
			thistab(item){
				var _this = this;
				for(var i=0;i<_this.editableTabs.length;i++){//筛查并跳转路径
					if(_this.editableTabs[i].name==item){
						_this.$router.push({'path':_this.editableTabs[i].path})
						return;
					}
				}
			},
			addTab(tabobj) {
				var _this = this;
				for(var i=0;i<this.editableTabs.length;i++){//筛查并跳转路径
					if(tabobj.name==_this.editableTabs[i].name){
						_this.editableTabsValue = tabobj.name
						if(tabobj.path==''){
							return;	
						}else{
							_this.$router.push({'path':tabobj.path})
							return;	
						}						
					}
				}
				this.editableTabs.push(tabobj);
				this.editableTabsValue = tabobj.name;
				if(tabobj.path==''){//跳转路径
					return;	
				}else{
					_this.$router.push({'path':tabobj.path})
					return;	
				}
			},
			removeTab(targetName) {
				var _this = this;
				let tabs = this.editableTabs;
				let activeName = this.editableTabsValue;
				if(activeName === targetName) {
					tabs.forEach((tab, index) => {
						if(tab.name === targetName) {
							let nextTab = tabs[index + 1] || tabs[index - 1];
							if(nextTab) {
								activeName = nextTab.name;
							}
						}
					});
				}

				this.editableTabsValue = activeName;
				this.editableTabs = tabs.filter(tab => tab.name !== targetName);
				for(var i=0;i<this.editableTabs.length;i++){//筛查并跳转路径
					if(_this.editableTabsValue==_this.editableTabs[i].name){
						if(_this.editableTabs[i].path==''){
							return;	
						}else{
							_this.$router.push({'path':_this.editableTabs[i].path})
							return;	
						}						
					}
				}			
			},
			subnavs(ind){
				return 'sub_'+ind
			},
			subnavs2(ind){
				return 'sub2_'+ind
			},
			navshow(ind){//二级展开
				//高度：展开二级的时候先获取再展开，二级之后先当前级数高度auto再展开下一级
				if(this.navheightflag == false){
					this.navheightflag = true;
					console.log($('#sub2_'+ind).height())
					$('#sub_'+ind).css({'height':$('#sub2_'+ind).height(),'transition':'all 200ms'})
//					$('#sub_'+ind).animate({'height':$('#sub2_'+ind).height()},200)
				}else{
					this.navheightflag = false;
					$('#sub_'+ind).css({'height':0,'transition':'all 200ms'})
//					$('#sub_'+ind).animate({'height':'0px'},200)
				}
			},
		},
		mounted() {
			var _this = this;
			this.fixheight()
			//刷新时返回初始页路径
			_this.$router.push({'path':'/admin_index/wel'})
			//然后控制时间再出现页面
			_this.itimer = setInterval(function(){
				if(location.href.indexOf('/admin_index/wel')!=-1){
					$('#ifshow').css('height','auto');
					clearInterval(_this.itimer)
				}
			},10)			
		}
	}
</script>
