function _new(fn, ...arg) {
  const obj = Object.create(fn.prototype);
  const ret = fn.apply(obj, arg);
  return ret instanceof Object ? ret : obj;
}

// new: 声明一个对象；将这个对象的原型指向构造函数的prototype；将构造函数的this指向这个对象；return 这个对象。