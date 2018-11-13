# react-redux 学习

```
网上很多react-redux的教程，但是看了很多也没领悟怎么入门，于是记录下自己的入门
过程，写的都是最基础的东西，希望对不知道如何入门的redux小白有帮助。s
```


> action ()用户行为

Action 是把数据从应用（译者注：这里之所以不叫 view 是因为这些数据有可能是服务器响应，用户输入或其它非 view 的数据 ）传到 store 的有效载荷。它是 store 数据的唯一来源。一般来说你会通过 store.dispatch() 将 action 传到 store。


Action 本质上是 JavaScript 普通对象。我们约定，action 内必须使用一个字符串类型的 type 字段来表示将要执行的动作。多数情况下，type 会被定义成字符串常量。当应用规模越来越大时，建议使用单独的模块或文件来存放 action。


```
const ADD_TODO = 'ADD_TODO'
{
  type: ADD_TODO,
  text: 'Build my first Redux app'
}
```

__action我喜欢叫做用户行为， 主要以对象形式存在， 用于通知store用户要发起什么行为。简单来讲的话就像ajax中的method: get,在发送请求前 说明自己的操作行为。 type 属性定义行为，剩下的属性自己定义，主要以参数的形式进入reducer函数。
写法很简单， 只要有个type就好了。(记住行为用大写描述，react的规范之一，也可以不遵守)__

```
    const user = {
        type: 'CHANGE_NAME',
        info: {
            name: '哈哈',
            age: '18',
            sex: '未定义'
        }
    }

```



> dispatch(action)  发送请求

分发 action。这是触发 state 变化的惟一途径。

将使用当前 getState() 的结果和传入的 action 以同步方式的调用 store 的 reduce 函数。它的返回值会被作为下一个 state。从现在开始，这就成为了 getState() 的返回值，同时变化监听器(change listener)会被触发。


__这个就是store对象底下的一个方法，参数为上面定义的action对象，主要用于触发监听器。__


> reducer

Reducers 指定了应用状态的变化如何响应 actions 并发送到 store 的，记住 actions 只是描述了有事情发生了这一事实，并没有描述应用如何更新 state。

__这个是最重要的一个东西，他给我的感觉就是一个接收器，处理器。他会接受两个值，一个是state, 一个是action。 action就不用说了，state这个就是很重要的一个东西。它不像vuex一样state是定义在一个对象下的， 当然你可以写一个state文件管理所有的state，所有reducer接受的state会挂载在store的一个对象下，这样当你页面访问state对象下，能拿到的就是在reducer函数中state参数，记住redux不直接修改 state 中的字段，而是返回新对象__


```
    const initState  = {
        name: '张三'
    }
    
    const changeName (state=initState, action) {
        switch(action.type) {
            case 'CHANGE_NAME':
                return action.name
                break;
                
            default: 
                return state
                break;
        }
    }
```


> store

Store 就是把它们联系到一起的对象。Store 有以下职责：

维持应用的 state；
提供 getState() 方法获取 state；
提供 dispatch(action) 方法更新 state；
通过 subscribe(listener) 注册监听器;
通过 subscribe(listener) 返回的函数注销监听器。

__我用到的有2个方法dispatch，createStore ，createStore就是创建一个store对象，这个对象会监听你的state对象并对视图做更新__

***

### demo1

```
因为只是做测试用， 所以没有分文件处理，项目中不要使用一个文件管理
所有对象，请按照官方用多文件进行单独管理
```

reduxStore.js

```
import { createStore } from 'redux'
import { combineReducers } from 'redux'



//创建action
const add_name = (val) => {
	return {
		type: 'add',
		name: '增加'
	}
}


//创建reducer

const initState = 'null';



//表示某个页面的功能   里面包括  操作，初始化状态 ， 操作后的返回对象。
const changeName = (state = initState, action)=>{

	console.log(action, 'action')

	switch (action.type) {
        case 'add':
            return action.name //新的state
        default:
         return state   
    }
}

const changeName2 = (state = { name: 'hello' }, action)=>{

	console.log(action, 'action')

	switch (action.type) {
        case 'add':
            return '' //新的state
        default:
         return state   
    }
}


// 整个store对象
const rootReducer = combineReducers({
    changeName,
    changeName2
})



const store = createStore(rootReducer);


export default store;
````

index.js 入口文件

```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SideNav from './components/SideNav';
import router from './router/index'
//import registerServiceWorker from './registerServiceWorker';
import { HashRouter, Route, Link, Switch } from 'react-router-dom';

//store文件引入
import { Provider } from 'react-redux';
import store from './store/reduxStore';




ReactDOM.render( 
   <div id="page">
        //Provider组件可以将store对象挂载在react上，子孙组件都能共享到
   		<Provider store={store}>
			<App/>
		</Provider>
	</div>
	,
	document.getElementById('root')
);
//registerServiceWorker();
```

redux.js   redux测试组件

```
import React from 'react'
import {connect} from 'react-redux';

class Reduxs extends React.Component {
	constructor(props) {
		super(props);
	}

	handleName() {
		console.log(this, 'click')

		this.props.dispatch({
			type: 'add',
			name: '张三'
		})

		console.log(this.props.myName, 'this.props.myName')
	}


	render() {

		//let store = this.getChildContext();

		//console.log(this, 'store')

		console.log(this.props)
		return (
			<div>
				<h2>redux</h2>

				<p>
					名字: {this.props.myName}

					
					
				</p>
				<p>
					<button onClick={this.handleName.bind(this)}>改变</button>
				</p>
			</div>
		)
	}
}

const mapStateToProps  = (store) => {
	//在这里能拿到rootReducer对象
	console.log(store, '123')
	console.log(store.getState, '1234')

 	return {
 		myName: store.changeName,
 	}
}



//connect可以将元素传递到组件中
Reduxs = connect(mapStateToProps)(Reduxs)

export default Reduxs

```


这个是个非常简单的demo， 这样可以让你对redux的使用了解一些， 后续的一些复杂使用下次更新。



