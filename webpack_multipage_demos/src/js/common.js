import '../sass/index.scss';
import '../static/laydate.css';
import '../static/layui.all.js'

$(function() {
	console.log('1')
	layui.use('laydate', function(){
	  var laydate = layui.laydate;
	  
	  //执行一个laydate实例
	  laydate.render({
	    elem: '#test1' //指定元素
	  });
	   laydate.render({
	    elem: '#test2' //指定元素
	  });
	});
})