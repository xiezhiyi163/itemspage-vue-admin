<style type="text/css">
	.w-e-toolbar{
		display: block !important;
		word-break: break-word;
	}
	.w-e-toolbar .w-e-menu{
		display: inline-block;
	}
</style>
<style scoped="scoped" type="text/css">
	.title{
		float: left;height: 40px;line-height: 40px;font-size: 14px;
	}
	.hiddenv{
		visibility: hidden;
	}
	.ml90{
		display: block;margin-left: 90px;
	}
	.mb20{
		margin-bottom: 20px;
	}
</style>

<template>
	<div>
		<div style="margin: 30px;">
			<div style="max-width: 1000px;margin: auto;">
				<div class="mb20">
					<span class="title">栏目名称：</span>
					<div class="ml90">
						<el-input></el-input>
					</div>			
				</div>			
				<div class="mb20">
					<span class="title">栏目名称：</span>
					<div class="ml90">
						<el-input></el-input>
					</div>			
				</div>			
				<div class="mb20">
					<span class="title">栏目名称：</span>
					<div class="ml90">
						<el-input></el-input>
					</div>			
				</div>			
				<div class="mb20">
					<span class="title">栏目名称：</span>
					<div class="ml90" style="min-height: 10px;padding-bottom: 30px;">
						<!--<div id="uploader" class="wu-example" 用来存放文件信息>
						    <div id="thelist" class="uploader-list"></div>
						    <div class="btns">
						        <div id="picker">选择文件</div>
						        <button id="ctlBtn" class="btn btn-default">开始上传</button>
						    </div>
						</div>-->
						<div id="fileList" class="uploader-list"></div>
    					<div id="filePicker">选择图片</div>
<!--<button id="btn-star" class="btn btn-default btn-uploadstar radius ml-10">开始上传</button>-->
					</div>			
				</div>			
				<div class="mb20">
					<span class="title">栏目名称：</span>
					<div class="ml90">
						<div id="editor"></div>
					</div>			
				</div>			
				<div class="mb20">
					<span class="title hiddenv">栏目名称：</span>
					<div class="ml90">
						<el-button @click='sumbitdata()' style='background-color: deepskyblue;color: white;'>提交</el-button>
					</div>			
				</div>			
			</div>			
		</div>
	</div>
</template>

<script>
	/*
	 * @这弹窗里面带*为与父组件交互的必要的数据，属性和方法
	 */
	import Ucss from '../../../static/css/Ext/webuploader.css'
	import Ev from '../../../static/js/Ext/wangeditor.js'
	import Ecss from '../../../static/css/Ext/wangeditor.css'
	import {Button,Pagination,Input,DatePicker} from 'element-ui'
	export default{
		components:{
			elButton:Button,
			elInput:Input,
			elDatePicker:DatePicker,
		},
		data(){
			return{
				//判断是否触发弹窗的方法*
				timer:null,
				umflagtemp:true,
				uploader:null,
				//上传需要的字段
				$list :null,
				$btn : null,
				state :null,
				ratio :null,
			}
		},
		props:['umflag','itemid'],//*
		methods:{
			ifusemethods(){//*
				var _this = this;
				this.timer = setTimeout(function(){
					if(!_this.umflag&&_this.umflagtemp){
						_this.umflagtemp = false
						console.log('方法已运行')
						//业务逻辑在这里触发
						if(_this.itemid=='failid'){
							//此处清空输入框内容
						}else{
							//清空运行业务逻辑获取数据
							console.log(_this.itemid)
						}						
					}else if(_this.umflag){
						_this.umflagtemp = true
					}
					_this.ifusemethods()
				},10)
			},
			//@下面要运行的业务逻辑
			getitemiddata(){
				
			},
			sumbitdata(){
				this.$emit('umflagtrue',true)
			},
			useeditor(){
		        var editor = new Ev('#editor')
		        editor.create()
			},
			loaderuploadscr(){
				var _this = this;
				$.getScript('../../../static/js/Ext/webuploader.js',function(){//插件特殊情况只能这么引入
					_this.uploadimages();
				})	
			},
			uploaderfile(){
				var _this = this;
					//初始化
					this.$list = $("#thelist"),
					this.$btn = $("#ctlBtn"),
					this.state = "pending",
					this.uploader = WebUploader.create({					
					    // swf文件路径
					    swf: '../../../static/js/Ext/Uploader.swf',					
					    // 文件接收服务端。
					    server: 'http://webuploader.duapp.com/server/fileupload.php',					
					    // 选择文件的按钮。可选。
					    // 内部根据当前运行是创建，可能是input元素，也可能是flash.
					    pick: '#picker',					
					    // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
					    resize: false
					});
					// 当有文件被添加进队列的时候
					this.uploader.on( 'fileQueued', function( file ) {
					    _this.$list.append( '<div id="' + file.id + '" class="item">' +
					        '<h4 class="info">' + file.name + '</h4>' +
					        '<p class="state">等待上传...</p>' +
					    '</div>' );
					});
					// 文件上传过程中创建进度条实时显示。
					this.uploader.on( 'uploadProgress', function( file, percentage ) {
					    var $li = $( '#'+file.id ),
					        $percent = $li.find('.progress .progress-bar');
					
					    // 避免重复创建
					    if ( !$percent.length ) {
					        $percent = $('<div class="progress progress-striped active">' +
					          '<div class="progress-bar" role="progressbar" style="width: 0%">' +
					          '</div>' +
					        '</div>').appendTo( $li ).find('.progress-bar');
					    }
					
					    $li.find('p.state').text('上传中');
					
					    $percent.css( 'width', percentage * 100 + '%' );
					});
					//处理成功或者失败
					this.uploader.on( 'uploadSuccess', function( file ) {
					    $( '#'+file.id ).find('p.state').text('已上传');
					});
					
					this.uploader.on( 'uploadError', function( file ) {
					    $( '#'+file.id ).find('p.state').text('上传出错');
					});
					
					this.uploader.on( 'uploadComplete', function( file ) {
					    $( '#'+file.id ).find('.progress').fadeOut();
					});
					this.uploader.on( 'all', function( type ) {
				        if ( type === 'startUpload' ) {
				            _this.state = 'uploading';
				        } else if ( type === 'stopUpload' ) {
				            _this.state = 'paused';
				        } else if ( type === 'uploadFinished' ) {
				            _this.state = 'done';
				        }
				
				        if ( _this.state === 'uploading' ) {
				            _this.$btn.text('暂停上传');
				        } else {
				            _this.$btn.text('开始上传');
				        }
				    });
					_this.$btn.on( 'click', function() {
				        if ( _this.state === 'uploading' ) {
				            _this.uploader.stop();
				        } else {
				            _this.uploader.upload();
				        }
				    });
			},
			uploadimages(){
				var _this = this;
				// 初始化Web Uploader
					
					_this.$list = $("#fileList"),
					/**
					 * 优化retina, 在retina下这个值是2
					 */
					_this.ratio = window.devicePixelRatio || 1,
					_this.uploader = WebUploader.create({
					
					    // 选完文件后，是否自动上传。
					    auto: true,
					
					    // swf文件路径
					    swf: '../../../static/js/Ext/Uploader.swf',
					
					    // 文件接收服务端。
					    server: 'http://webuploader.duapp.com/server/fileupload.php',
					
					    // 选择文件的按钮。可选。
					    // 内部根据当前运行是创建，可能是input元素，也可能是flash.
					    pick: '#filePicker',
					
					    // 只允许选择图片文件。
					    accept: {
					        title: 'Images',
					        extensions: 'gif,jpg,jpeg,bmp,png',
					        mimeTypes: 'image/*'
					    }
					});
					// 当有文件添加进来的时候
					_this.uploader.on( 'fileQueued', function( file ) {
					    var $li = $(
					            '<div id="' + file.id + '" class="file-item thumbnail">' +
					                '<img>' +
					                '<div class="info">' + file.name + '</div>' +
					            '</div>'
					            ),
					        $img = $li.find('img');
					
					
					    // $list为容器jQuery实例
					    _this.$list.append( $li );
					
					    // 创建缩略图
					    // 如果为非图片文件，可以不用调用此方法。
					    // thumbnailWidth x thumbnailHeight 为 100 x 100
					    _this.uploader.makeThumb( file, function( error, src ) {
					        if ( error ) {
					            $img.replaceWith('<span>不能预览</span>');
					            return;
					        }
					
					        $img.attr( 'src', src );
//					    }, thumbnailWidth, thumbnailHeight );
					    }, 100, 100 );
					});
					// 文件上传过程中创建进度条实时显示。
					_this.uploader.on( 'uploadProgress', function( file, percentage ) {
					    var $li = $( '#'+file.id ),
					        $percent = $li.find('.progress span');
					
					    // 避免重复创建
					    if ( !$percent.length ) {
					        $percent = $('<p class="progress"><span></span></p>')
					                .appendTo( $li )
					                .find('span');
					    }
					
					    $percent.css( 'width', percentage * 100 + '%' );
					});
					
					// 文件上传成功，给item添加成功class, 用样式标记上传成功。
					_this.uploader.on( 'uploadSuccess', function( file ) {
					    $( '#'+file.id ).addClass('upload-state-done');
					});
					
					// 文件上传失败，显示上传出错。
					_this.uploader.on( 'uploadError', function( file ) {
					    var $li = $( '#'+file.id ),
					        $error = $li.find('div.error');
					
					    // 避免重复创建
					    if ( !$error.length ) {
					        $error = $('<div class="error"></div>').appendTo( $li );
					    }
					
					    $error.text('上传失败');
					});
					
					// 完成上传完了，成功或者失败，先删除进度条。
					_this.uploader.on( 'uploadComplete', function( file ) {
					    $( '#'+file.id ).find('.progress').remove();
					});
			}
		},
		mounted(){
			this.ifusemethods();//*
			this.useeditor();
			this.loaderuploadscr();
		}
	}
</script>