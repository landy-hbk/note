# 项目中css的小知识点

    下面主要记录一些本人在项目中，用到的一些css技巧。希望能对读者起到一些作用。
    
> 1 在使用float布局的时候，会造成流的改变，在正常的盒模型中，盒子会在同一个流上面按照从左往右的方式排列在一起。使用float 会脱离正常流，这样父元素是获取不到子元素的高宽的，因为不再同一流中。

    解决方式：
    1.定义类名
    .clearfix{
    	zoom: 1;
    }
    .clearfix:after{
    	visibility: hidden;
    	display: block;
    	content: '';
    	clear: both;
    	height: 0;
    }
    
> 2.在需求中总是会有一行显示和多行显示的需求
    
    解决方式：
    1.单行显示
    .line-clamp-1{
    	overflow: hidden;
    	white-space: nowrap;
    	text-overflow: ellipsis;
    }
    2.多行显示
    .line-clamp-2 {
    	display: -webkit-box;
    	-webkit-box-orient: vertical;
    	-webkit-line-clamp: 2;
    	overflow:  hidden;
    }
    
> 3.如何写出一个三角行出来
    
    .trangle {
        width: 0;
        height: 0;
        border-left: .03rem solid transparent;
        border-right: .03rem solid transparent;
        border-top: .06rem solid #000;
        display: inline-block;
    }
    
> 4.一段文字粘贴进去 如何保留他的空格和换行
    
    .text-box {
        white-space: pre-line; //保留换行 不保留空格
        //white-space: pre-wrap; //保留换行 保留空格
    }
    
> 5. 水波纹渣渣版
    
    hmlt
    <div class="btn">
		<div class="dot"></div>
		123
	</div>
	css
	.dot {
        position: absolute;
    	top: 50%;
    	left: 50%;
    	transform: translate(-50%, -50%);
        z-index: -1;
        width: 10px;
        height:10px; 
        background-color: #eee;
    	border: 1px solid #ddd;
    	opacity: 0;
        border-radius: 50%;
    
      }
     
      @keyframes waveCircle {
         0% {
          transform: scale(1);
    	  opacity: .1;
        }
        100% {
    		transform: scale(22);
    		opacity: .8;
        }
      }
	.btn {
		margin: 100px;
		width: 200px;
		height: 40px;
		position: relative;
		text-align: center;
		line-height: 40px;
		border: 1px solid #ccc;
		overflow: hidden;
	}
	
	.btn:hover .dot{
		-webkit-animation: waveCircle 1.5s ease infinite normal ;
	}

![avatar](http://omhedznzy.bkt.clouddn.com/ce.gif)
6: 吹气球简易版 

    html
    <div class="move">
		<div class="foot">
		
		</div>
		<div class="line">
		</div>
		<div class="line2">
		</div>
		<div class="inflation">
		
		</div>
		<div class="dot">
		
		</div>
	</div>
    css
    .move {
		position: relative;
		width: 800px;
		height: 500px;
		margin: auto auto;
		border: 1px solid #ccc;
		overflow: hidden;
	}
	
	.foot {
		width: 50px;
		height: 50px;
		display: inline-block;
		border: 1px solid #ccc;
		position: absolute;
		bottom: 80px;
		left: 20px;
	}
	.inflation {
		width: 50px;
		height: 50px;
		display: inline-block;
		border: 1px solid #ccc;
		position: absolute;
		bottom: 20px;
		left: 20px;
	}
	.line {
		width: 350px;
		height: 20px;
		display: inline-block;
		border: 1px solid #ccc;
		position: absolute;
		bottom: 20px;
		left: 70px;
	}
	.line2 {
		width:  20px;
		height: 100px;
		display: inline-block;
		border: 1px solid #ccc;
		position: absolute;
		bottom: 20px;
		left: 420px;
	}
	.dot {
		width:  50px;
		height: 50px;
		display: inline-block;
		border: 1px solid #ccc;
		border-radius: 50%;
		position: absolute;
		bottom: 120px;
		left: 405px;
	}
	.move:hover .foot {
		animation:foots 1s infinite;
	}
	
	.move:hover .inflation {
		animation: inflation 1s infinite;
	}
	
	.move:hover .dot {
		animation: dot 50s infinite;
	}
	
	@keyframes foots {
		0% {
			bottom: 80px;
		}
		100% {
			bottom: 40px;
		}
	}
	
	@keyframes inflation {
		0% {
			height: 50px;
		}
		100% {
			height: 10px;
		}
	}
	@keyframes dot {
		0% {
			transform: scale(1);
			bottom: 120px;
		}
		100% {
			transform: scale(10);
			bottom: 350px;
		}
	}


> 类似这种垂直居中布局，使用flex非常好，优点主要体现在2点，1 flex 处理水平居中和垂直居中非常好 2. flex 非常适合宫格布局 。 宫格布局主要指将盒子空间平等分给子元素。 就像一块饼干分给12个小朋友，能保证分给每个小孩子的饼干都一模一样大小。      
![avatar](http://omhedznzy.bkt.clouddn.com/2017.07.27.1.png)

>> 1用户圆如何布局？ 1 一般不是特别情况下我们不推荐使用float布局。 如果你用块元素去布局用户头像，它会把 其他元素排挤到下面去， 如果你用内联元素去布局， 他只会根据内容的大小来撑开盒子，所以你给内联元素定义高宽是没有什么意义的。

    user-avatar {
        width: .6rem;
        height: .6rem;
        display: inline-block;
        border-radius: 50%;
    }

这里我们用inline-block来让盒子获取到宽度，在让元素的圆角为50%得到一个圆，如果你的圆是带背景色或者线条的话 请加上overflow: hidden。


>> 2.接着我们先写好html结构

    <div class="info mb-sm">
		<img :src="imgUrl.avatar" alt=""  class="img" />
		<div class="context">
			<p class="line-clamp-1 name">注册/登录 </p>
			<p class="btn">点击注册/登录</p>
		</div>
		<span class="next"></span>
	</div>

从图中能看出主要分成3部分，用户头像，注册登录，图标。


>> 3.为每一个元素添加样式

    .info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.21rem 0.15rem 0.21rem 0.18rem;
		background: #fff;
		.img {
			width: 0.6rem;
			height: 0.6rem;
			display: inline-block;
			border-radius: 50%;
		}
		.context {
			width:  80%;
			flex: 1 1;
			padding: 0 0.1rem 0 0.2rem; 
			.name {
				margin: 0.1rem 0;
				font-size: 0.18rem;
				line-height: 0.18rem;
			}
			.btn {
				color: #cdcdcd;
			}
		}
		.next {
			width: 0.06rem;
			height: 0.11rem;
			display: inline-block;
			background: url("../../static/images/right.png") no-repeat;
			background-size: 100% 100%;
		}
	}

步骤如下 info 定义一个flex盒子，盒子两端平分（justify-contetn）,垂直居中（align-items）, 接着定义用户头像， 然后定义 登陆，从图中可以看出来只有中间那一块的宽度是可以变化的所以我们会给他定义flex，flex主要是定义元素占复原空间的比例。 这里我让他 放大占一份，缩小占一份。 然后给他个宽度 可以防止他抢占其他元素的空间。如果不给的话，当你content里面内容过长的时候他会去掠夺其他元素的空间。