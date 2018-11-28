# react-native window系统配置

```
    本来想搭个个人项目玩玩，没想到配置环境的时候就遇到这么多坑了，于是收集多
    个博客的内容，记录一些坑放在博客里面，感谢那些写博客的博主。
```

**1. 安装java JDK**

java Jdk安装

下载地址：http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html。

由于我的系统是64位的，这里选择：jdk-8u131-windows-x64.exe。下载完后，双击jdk-8u131-windows-x64.exe 进行安装。 
接着配置系统环境，右击“计算机”–>”属性”–>”更改设置”–>”高级”–>”环境变量”，如图

点击系统变量的“ 新建”–>输入 JAVA_HOME以及jdk安装路径，

C:\Program Files\Java\jdk1.8.0_131

在系统变量里找到Path,双击在变量值的最前面加上 %JAVA_HOME%\bin;后，点击确定。

重打开cmd命令，输入 
java -version 后出现java版本则安装成功

**2.安装 node**

node安装应该是前端最熟悉的了，如果有不会的可以自行百度。


**3.Android Studio**

安装地址： https://developer.android.com/studio/index.html

一直next就能安装完成了。 安装好了之后可以通过此软件安装android sdk.

打开软件 右下角 有个 图标什么的， 里面有个 sdk manager 。 点击进去就可以看到很多 Android sdk 版本。  选择需要的版本然后进行下载。需要什么版本可以通过你 init 项目后 

项目名/android/build.gradle  这个文件看 。


设置系统变量ANDROID_HOME 与JAVA_HOME配置类似，右击“计算机”–>”属性”–>”更改设置”–>”高级”–>”环境变量”，点击系统变量的“ 新建”–>输入 ANDROID_HOME以及sdk路径，

设置系统变量Path：%ANDROID_HOME%\tools;%ANDROID_HOME%\platform-tools； 

输入adb 后出现如果不报错则android 环境配置成功： 

**4. git安装**

这个与node一样，百度安装

**5.Python安装**

下载地址： https://www.python.org/downloads/release/python-2713/

注意安装地址不要带中文，如果不介意就按默认的c盘安装

在系统变量path的最前面添加python的安装路径


重打开cmd命令，输入python -v 后出现如则python 环境配置成功：


***6.react-native-cli安装***

输入 npm install -g yarn react-native-cli 

安装成功后会有 成功信息

1、react-native init Hello

2、cd Hello

3、react-native run-android

第三步记得要打开自己的vpn安装依赖，如果安装失败就看报错信息。


***7.模拟器安装***

这里我使用的事夜神模拟器

安装： 百度搜夜神，进入官网下载

安装好之后进入目录打开夜神模拟器。接着在项目目录打开powershell，也可以是cmd或者git bash, 只要支持npm 就行。

进入后输出adb devices， 如果没事显示连接到127.0.0.1:62001 device ，则说明没有连接上夜神。 没有连接则输入   adb connect 127.0.0.1:8081  连接夜神模拟器。

连接成功后你项目已经 react-native run-android 安装了一次依赖并打包了apk，这时候夜神就会有一个你项目名字的app。这时候你点开这个app进去之后可能会出现一堆红色报错， 其中有一句会说你的content device没有连接上，这时候你点夜神右边按钮的摇一摇功能 打开 一个设置菜单，最后一个是 dev settings, 点开后选择debug server host ...,然后就会弹出一个框 你输入你的ip地址加端口（1xx.xx.xx.xx:8081）确认后 重新打开app就可以看到效果了。  


如果有显示问题，可以去本人文档去看。


[本人GitHub文档地址](https://github.com/landy-hbk/note/blob/master/)