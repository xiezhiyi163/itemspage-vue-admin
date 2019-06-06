<style scoped="scoped">
	#echarts{
		float: left;
		height: 330px;
		width: 50%;
	}
	.logininfo{
		margin-left: 50%;
		height: 330px;
	}
</style>
<template>
	<div>
		<div style="padding: 0 20px;">
			<p id="echarts"></p>
			<div class="logininfo">
				<table style="height: 100%;">
					<tr>
						<td>
							今日到访人数300人，<br/>
							最近新增的注册用户200人
						</td>
					</tr>
				</table>
			</div>
		</div>
		<div style="padding: 0 20px;">
			<el-table :data='weltabledata' border>
				<el-table-column label='类型' prop='type' width='200'>
				</el-table-column>
				<el-table-column label='销售量'>
					<template slot-scope="scope">
						{{scope.row.num}}
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div style="padding: 0 20px;margin-top: 20px;">
			<el-table :data='welsysteminfo' border>
				<el-table-column label='类型' prop='type' width='200'>
				</el-table-column>
				<el-table-column label='描述'>
					<template slot-scope="scope">
						{{scope.row.dec}}
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	/*
	 * @图表的业务逻辑
	 * resizeecharts()，启动图表然后再自适应
	 */
	import echarts from '../../static/js/Ext/echarts.js'
	import { Table,TableColumn,Button,Pagination,Row,Input,Upload,Checkbox,Select,Option,Loading,Dialog,Form,FormItem,Popover} from "element-ui";
	export default{
		components:{
			elTable:Table,
			elTableColumn:TableColumn,
			elButton:Button,
			elPagination:Pagination,
			elRow:Row,
			elInput:Input,
			elUpload:Upload,
			elCheckbox:Checkbox,
			elSelect:Select,
			elOption:Option,
			elDialog:Dialog,
			elForm:Form,
			elFormItem:FormItem,
			elPopover:Popover,
		},
		data(){
			return{
				weltabledata:[{
					'type':'智能机',
					'num':3200,
				},{
					'type':'智能机',
					'num':3200,
				},{
					'type':'智能机',
					'num':3200,
				}],
				welsysteminfo:[{
					'type':'系统',
					'dec':'Linux'
				},{
					'type':'ip地址',
					'dec':'192.168.3.2'
				}],
				//
				options:{
				    xAxis: {
				        type: 'category',
				        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
				    },
				    yAxis: {
				        type: 'value'
				    },
				    series: [{
				        data: [120, 200, 150, 80, 70, 110, 130],
				        type: 'bar',
				        itemStyle: {
		                    normal: {
		　　　　　　　　　　　　　　//定义一个list，然后根据所以取得不同的值，这样就实现了，
		                        color: function(params) {
		                            // build a color map as your need.
		                            var colorList = [
		                              '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
		                               '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
		                               '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
		                            ];
		                            return colorList[params.dataIndex]
		                        },
		　　　　　　　　　　　　　　//以下为是否显示，显示位置和显示格式的设置了
		                        label: {
		                            show: true,
		                            position: 'top',
		                            formatter: '{b}\n{c}'
		                        }
		                    }
		                },
				    }],
				    animation:false,
				},
				initecharts:null,
				chartstimer:null,
			}
		},
		methods:{
			//
			initechartsv(){
				this.initecharts = echarts.init(document.getElementById('echarts'));
				this.initecharts.setOption(this.options);
			},
			resizeecharts(){
				var _this = this;
				this.initecharts.resize()
				this.chartstimer = setInterval(function(){
					clearInterval(_this.chartstimer)
					_this.resizeecharts()
				},10)
			}
		},
		mounted(){
			//
			this.initechartsv()
			this.resizeecharts()
		}
	}
</script>

<style>
</style>