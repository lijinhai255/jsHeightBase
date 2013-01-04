var fibonacci =function(n) {
  return n <2 ? n : arguments.callee(n -1) +arguments.callee(n -2);
}; 
console.log("计算开始");
fibonacci(40);
console.log("计算结束");