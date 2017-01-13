- events 
	-event.js、event-net.js自定义事件和利用net连接的自定义事件及响应的文件，学习node中如何处理重复回调的情况
	- event-net.js 在启动后，可以用telnet打开命令行输入127.0.0.1 8888 连接服务端模拟net连接

- watche-file 简单的监视文件变化，并转移到相应目录下，学习读取文件、事件监听及自定义事件。

- parallel 读取文件夹count下的文件数据，并将它们单词数汇总计数.用completeCounts对比task长度计数的方式来计算并行的异步是否执行完毕。

- serialzation 将要运行的函数按顺序放到数组中，利用自定义函数来串行控制异步函数的回调，防止进入回调地狱，学习判断文件是否存在，读取文件，利用request模块拉取数据三步经典操作

- sream 简单使用数据流来读取文件，在http服务器中req是 readStream res是writeStream，readStream.pipe(writeStream);

- todolist 纯服务器返回的todo程序，运行访问：localhost:3000
	- 关于设定Content-length
		- 设定Content-length域会隐含禁用node的块代码，如此传输数据更少，以提升性能
		- 但是Content-length 应是字节长度而不是字符长度，不应该简单使用length
	    - node提供了 Buffer.byteLength
	

- file-todolist 文件上传版本的todolist
	- 表单提交请求的两种Content--type格式
		- application/x-www-form=urlecoded 是html表单的默认值
		- multipart/form-data 在表单中含有文件或非ASCⅡ或二进制数据时使用
	- formidable模块用于媒体上传或转换，随着数据块上传接受它们、解析它们、并吐出特定部分
		- 利用stream读写图片
		- 处理<img>标签图片请求	
- file-storage 学习基于文件存储数据

- file-todolist 学习将todolist数据存储在文件中

- mongodb 学习非关系型数据库基本操作
	- basic-server.js 基本mongodb操作示例
		- 打开mongdb，建一个test文件夹，然后回到bin目录，cmd，运行mongod --dbpath ../test，可启动mongodb
	- mongoose 学习使用mongoose
		- mongoose是可以让你顺畅使用mongodb的node模块
		- schema层次结构可以让一个模型和其他模型关联。中间件可以转换数据，或者操做模型数据的过程中触发逻辑，让删除父数据时对子数据的修剪这样的任务变成自动化。

	