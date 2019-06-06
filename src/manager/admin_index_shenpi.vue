<template>
	<div>
		<div style="margin: 30px 30px 0;background-color: #f5f7fa;padding-left: 10px;font-size: 12px;">
			日期范围：
			<el-date-picker
		      v-model="dates"
		      type="daterange"
		      range-separator="至"
		      start-placeholder="开始日期"
		      end-placeholder="结束日期">
		    </el-date-picker>
			<el-button>搜索</el-button>
		</div>
		<div style="padding: 30px 30px 0;">
			<el-table :data='datas' border>
				<el-table-column label='类型' prop='type' width='160'></el-table-column>
				<el-table-column label='描述' prop='dec'></el-table-column>
				<el-table-column label='操作' prop='dec' width='260'>
					<template slot-scope='props'>
						<el-button>同意</el-button>
						<el-button>拒绝</el-button>
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
	</div>
</template>

<script>
	/*
	 * @刷新当前组件：
	 * 先进去空的页面，再立马空的页面返回，即可做到刷新
	 */
	import {Table,TableColumn,Button,Pagination,Input,DatePicker} from 'element-ui'
	export default{
		components:{
			elButton:Button,
			elInput:Input,
			elDatePicker:DatePicker,
			elTable:Table,
			elTableColumn:TableColumn,
			elPagination:Pagination,//total；数据量，pagesize：一页显示数量，current-page.sync：显示第几页，pager-count：显示的页码的数量
		},
		data(){
			return{
				//日期
				dates:'',
				//数据
				datas:[{
					'type':'冰箱',
					'dec':'家用电器'
				},{
					'type':'智能电视',
					'dec':'家用电器'
				}],
				//分页
				totalIndex:2,
				pageSize:10,
				pageIndex:1,
			}
		},
		methods:{
			
		},
		mounted(){
			
		}
	}
</script>
