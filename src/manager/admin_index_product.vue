<template>
	<div>
		<div style="margin: 30px 30px 0;background-color: #f5f7fa;">
			<el-button @click='showfixwrap()'>添加栏目</el-button>
		</div>
		<div style="padding: 30px 30px 0;">
			<el-table :data='datas' border>
				<el-table-column label='类型' prop='type' width='160'></el-table-column>
				<el-table-column label='描述' prop='dec'></el-table-column>
				<el-table-column label='操作' prop='dec' width='260'>
					<template slot-scope='props'>
						<el-button>下架</el-button>
						<el-button @click='showfixwrap("e");itemid=props.row.id'>编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div style="padding: 30px 30px 0;">
			<el-pagination
			  	background
			  	layout="prev, pager, next"
			  	:total="totalIndex"
			  	:page-size="pageSize"
			  	:current-page.sync="pageIndex"
			  	@current-change=""
			  	:pager-count='5'
			  	style="text-align: center;margin-bottom: 15px;margin-left:-7px;">
			</el-pagination>					
		</div>
		<!--弹窗*-->
		<div id="fixallwrap" style="position: fixed;right: 0;top: 85px;left: 180px;bottom: 0;z-index: 1;overflow: hidden;background-color: #00000077;" @click="closefixwrap()" :style="umflag==false?'height:auto;':'height:0;'">
			<div id="fixsubwrap" style="position: absolute;left: 0;right: 0;top: 0;bottom: 0;width: 90%;height: 90%;background-color: white;margin: auto;border: 1px solid #ccc;overflow: hidden;" @click.stop=' '>
				<div style="position: absolute;top: 0;left: 0;width: 100%;height: 44px;background-color: deepskyblue;">
					<span style="float: right;padding:10px 15px;color: #999;font-size: 20px;cursor: pointer;color: white;" @click.stop="closefixwrap()">×</span>
				</div>
				<div id="fixwrap" style="overflow: auto;margin-top: 44px;">
					<prd :umflag='umflag' v-on:umflagtrue='closefixwrap_on' :itemid='itemid'></prd>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	/*
	 * @刷新当前组件：
	 * 先进去空的页面，再立马空的页面返回，即可做到刷新
	 * @数据处理方面：
	 * getdatas()获取数据，打开弹窗传umflag为false触发那边的方法
	 * @弹窗部分带*的为页面与弹窗交互必须的
	 */
	import {Table,TableColumn,Button,Pagination,Input,DatePicker} from 'element-ui'
	import productadd from './admin_index_components/product-add'
	export default{
		components:{
			elButton:Button,
			elInput:Input,
			elDatePicker:DatePicker,
			elTable:Table,
			elTableColumn:TableColumn,
			elPagination:Pagination,//total；数据量，pagesize：一页显示数量，current-page.sync：显示第几页，pager-count：显示的页码的数量
			prd:productadd,//定义的弹窗内容*
		},
		data(){
			return{
				//弹窗尺寸控制*
				istimer:null,
				//
				dates:'',
				datas:[{//数据demo
					'id':265256,
					'type':'冰箱',
					'dec':'家用电器'
				},{
					'id':42666512,
					'type':'智能电视',
					'dec':'家用电器'
				}],
				totalIndex:2,
				pageSize:10,
				pageIndex:1,
				//
				umflag:true,//用来判断是否打开弹窗并运行逻辑*
				//
				itemid:'failid',//*
			}
		},
		methods:{
			//@弹窗尺寸逻辑
			showfixwrap(){//*
				this.umflag = false//*
			},
			closefixwrap(){//*
				this.umflag = true//*
				this.itemid = 'failid'//清空id值*
			},
			fixthefixheight(){//*
				var _this = this;
				_this.istimer = setInterval(function(){
					$('#fixwrap').height($('#fixsubwrap').height()-44)
					clearInterval(_this.istimer)
					_this.fixthefixheight()
				},200);	
			},
			closefixwrap_on(res){//*
				var _this = this;
					_this.umflag = res;
			},
			//@获取数据业务逻辑
			getdatas(){
				
			},
		},
		mounted(){
			this.fixthefixheight()//*
			this.getdatas();
		}
	}
</script>
