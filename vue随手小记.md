# vue随手小记
    以下来自于自己在项目中遇到的一些问题，记录下来并从网上收集的的解决方法。
    谢谢那些乐于分享的博客作者们。有了他们的无私奉献，帮助了我们在坑的道路上少走了许多弯路。

### vue知识
    
    vue是现在比较流行mvvm框架之一，主要是通过监听Object属性中get,set方法，而拓展出来的一种通过数据
    更改视图的一种模式。实现通过Object.defineProperty( )方法，其中主要由view, obsever,
    data, virtualdom几个模块组成。
    
>  1.v-model

主要由v-bind和@input事件组成。一般用在表单元素上，实现表单的值与vue的data对象绑定。

> 2. 组件通信

* props方法



传递

``` <child :name="message"></child> ```


接收

``` 
export default {
  props: ['name']
}
```

通过父元素传值，子元素通过props属性接收到值。单向传值，只能父组件传值下去。

* $emit 方法

父组件 将值和改变值的监听方法一起传下去。

(v-on监听当前实例上的自定义事件。事件可以由vm.$emit触发。回调函数会接收所有传入事件触发函数的额外参数。)

```
    <child :name="message" @change="changeName"></child>
    
    export default {
        methods: {
            changeName(val) {
                this.message = val;
            }
        }
    }
```


子组件进行接收，并在值改变的时候派发事件上去传递。

``` 
    export default {
        props: ['name', 'change'],
        
        created(){
            this.$emit('change', '张三')
        }
        
    }
```

双向传值，父子组件可以通过监听函数共同改变监听的值。

* .sync 修饰符


父组件通过 .async 修饰符将值传给监听函数。

```
    <child v-bind:name.sync="message"></child>
```

子组件通过函数直接修改即可。2.3版本一下不支持该写法，原因是不允许子组件污染父组件变量

```
    export default {
        methods: {
            changeName(){
                this.$parent.message = '张三'
            }
        }
    }
```
双向传值，父子组件可以通过监听函数共同改变监听的值。

* provide / inject 传值

这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效。如果你熟悉 React，这与 React 的上下文特性很相似。

高阶组件属性之一， 学过react的很容易理解这两个属性，其实就是2个人在通话，
provide 可以理解为 派发者，  inject可以理解为 接收者。 

先通过父组件provide将属性派发下去，不管是子组件还是孙组件都可以接收到。

```
    export default {
        provide: {
            money: 100,
        }
    }
```

接着子孙组件通过inject属性接收到父组件的值，因为派发的属性是公共的，所以一定要小心使用。

```
    export default {
        inject: {
			money: {
				default: '',
			}
		},
    }
```

* EventBus

简单来说就是创建一个空的vue对象， 引入这个对象，然后进行操作就好了。

首先要有个公共的文件js  common.js

```
    import Vue from 'vue'
    
    let Common = new Vue();
    
   export default Common
```

接着就很简单了，引入进行操作就可以了。

父组件写入

```
import Common from './common.js'
    
    export default {
        created() {
            Common.myName = "landy";
        }
    }
```

子组件读取/修改


```
    import Common from './common.js'

    <p>全局的名字： {{ ce }}</p> //模板内容
    
    export default {
        data() {
			return {
				ce : Common.myName
			}
		},
    }
```

* vuex  

最后就是通过状态机管理数据源，其实也很简单，因为知识点比较多，就不介绍了
有不懂得直接看官方文档就好了。 vuex的文档简单易上手。

[vuex文档](https://vuex.vuejs.org/zh/)

### vue问题

> 1. webpack 打包编译-webkit-box-orient: vertical 后消失

    注释掉webpack.prod.conf.js中下面的代码
    
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    
> 2.vue 数据改变却没有更新

出现这种情况有很多， 我遇到过的有当你通过js去更新vue的时候会更新不了， 数据对象复杂的时候会更新不了，或者因为一些其他原因。


解决方法： 
    
    1.vue对象有一个方法 Vue.set();
    2.因为vue对性能的优化是通过缓存对象，所有有时候你会一直拿到缓存对象的值在渲染，
    在值中加上一个date对象，保存当前时间。
    
> 3. vue  页面中title 如何改变
    
因为vue是单页应用，所有头部的title一直是index.html的title并不会对tile部分进行改变。

解决方法

    解决的方法有很多种，我用的是最简单的一种， vue-router对象有生命周期对象，我们可以在
    路由进入后开始改变title.
    
    代码
    router.beforeEach(function(to, from, next) {
        if(to.name == 'exhibitionDetails') {
            getDealerDetails({
                exhibitionId: to.query.id,
                exhibitionMerchantId: to.query.dealerId,
            }).then( res => {
                let name = res.data ? res.data.merchant_data.merchant_name : '';
                 document.title = name;
                next();
            })
        }else {
            if(to.meta.title) {
               document.title = to.meta.title;
            }else {
                document.title = '';
            }
    
            next();
        }
    })
    
这样的好处在于你title的值也可以通过接口获得，因为next是一个控制器。所有你可以为所欲为。

> 4.异步组件传值

当我们传一个data数据给一个子组件的时候，因为数据源是异步得到的，当你子组件渲染的时候会拿到一个obersever对象。

解决方法
    
    <Swiper :list="banner ? banner : []" v-if="banner.length>0" value="banner_pic">
			</Swiper>
			
解决方法不止这一种，但是这种最为简单，通过vue本身的属性（v-if）去解决。当你数据源为空的时候不去渲染该组件，到拿到数据的时候再渲染。
    

    
    

    