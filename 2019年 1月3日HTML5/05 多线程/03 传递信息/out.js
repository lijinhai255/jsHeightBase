// console.log(this);

// var i = 0;
// 开启定时器
// setInterval(function() {
// 	i++;
	// console.log(i);
// 	postMessage(i);
// }, 1000)


var fibonacci =function(n) {
  return n <2 ? n : arguments.callee(n -1) +arguments.callee(n -2);
}; 

console.log("计算开始");
postMessage(fibonacci(40));
console.log("信息已发送")