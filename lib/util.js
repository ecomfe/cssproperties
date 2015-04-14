/**
 * @file 工具方法
 * @author ielgnaw(wuji0223@gmail.com)
 */

var whitespace = /^[\s\xa0\u3000]+|[\u3000\xa0\s]+$/g;

/**
 * 去掉首尾空格
 *
 * @param {string} source 原字符串
 *
 * @return {string} 去掉空格后的结果
 */
exports.trim = function (source) {
    if (!source) {
        return '';
    }

    return String(source).replace(whitespace, '');
};

/**
 * 空函数
 *
 * @return {Function} 空函数
 */
exports.noop = function () {};

var objectProto = Object.prototype;

/**
 * 获取对象类型
 *
 * @param {*} obj 待检测对象
 *
 * @return {string} 类型
 */
// exports.getType = function (obj) {
//     var objectName = objectProto.toString.call(obj);
//     var match = /\[object (\w+)\]/.exec(objectName);

//     return match[1].toLowerCase();
// };

// /**
//  * 检测变量是否为空的简单对象
//  *
//  * @public
//  * @param {*} obj 目标变量
//  * @return {boolean}
//  */
// exports.isEmptyObject = function (obj) {
//     if (exports.getType(obj) !== 'object') {
//         return false;
//     }

//     var key;
//     for (key in obj) {
//         return false;
//     }

//     return true;
// };

// /**
//  * 检测是否是 plainObject
//  * from jQuery，这里是 node 环境，就去掉了 window 以及 DOM nodes 的检查
//  *
//  * @param {Object} obj 待检测对象
//  *
//  * @return {boolean} 结果
//  */
// exports.isPlainObject = function (obj) {
//     if (exports.getType(obj) !== 'object') {
//         return false;
//     }

//     if (obj.constructor
//         && !{}.hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf')
//     ) {
//         return false;
//     }

//     return true;
// };

// /**
//  * 复制
//  * from jQuery
//  *
//  * @return {*} 结果
//  */
// exports.extend = function () {
//     var options;
//     var name;
//     var src;
//     var copy;
//     var copyIsArray;
//     var clone;
//     var target = arguments[0] || {};
//     var i = 1;
//     var length = arguments.length;
//     var deep = false;

//     if (exports.getType(target) === 'boolean') {
//         deep = target;
//         target = arguments[i] || {};
//         i++;
//     }
//     if (exports.getType(target) !== 'object' && exports.getType(target) !== 'function') {
//         target = {};
//     }

//     if (i === length) {
//         target = this;
//         i--;
//     }

//     /* jshint maxdepth: 6 */
//     for (; i < length; i++) {
//         if ((options = arguments[i]) != null) {
//             for (name in options) {
//                 src = target[name];
//                 copy = options[name];

//                 if (target === copy) {
//                     continue;
//                 }

//                 if (deep && copy && (exports.isPlainObject(copy) || (copyIsArray = Array.isArray(copy))))  {
//                     if (copyIsArray) {
//                         copyIsArray = false;
//                         clone = src && Array.isArray(src) ? src : [];

//                     }
//                     else {
//                         clone = src && exports.isPlainObject(src) ? src : {};
//                     }

//                     target[name] = exports.extend(deep, clone, copy);

//                 }
//                 else if (copy !== undefined) {
//                     target[name] = copy;
//                 }
//             }
//         }
//     }

//     return target;
// };

/**
 * 对象属性拷贝，浅复制
 *
 * @param {Object} target 目标对象
 * @param {...Object} source 源对象
 * @return {Object}
 */
exports.extend = function (target, source) {
    for (var i = 1, len = arguments.length; i < len; i++) {
        source = arguments[i];

        if (!source) {
            continue;
        }

        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] = source[key];
            }
        }

    }

    return target;
};

/**
 * 调用给定的迭代函数 n 次,每一次传递 index 参数，调用迭代函数。
 * from underscore
 *
 * @param {number} n 迭代次数
 * @param {Function} iterator 处理函数
 * @param {Object} context 上下文
 *
 * @return {Array} 结果集
 */
exports.times = function (n, iterator, context) {
    var accum = new Array(Math.max(0, n));
    for (var i = 0; i < n; i++) {
        accum[i] = iterator.call(context, i);
    }
    return accum;
};

/**
 * 格式化信息
 *
 * @param {string} msg 输出的信息
 * @param {number} spaceCount 信息前面空格的个数即缩进的长度
 *
 * @return {string} 格式化后的信息
 */
exports.formatMsg = function (msg, spaceCount) {
    var space = '';
    spaceCount = spaceCount || 0;
    exports.times(
        spaceCount,
        function () {
            space += ' ';
        }
    );
    return space + msg;
};

/**
 * 数组去重
 *
 * @param {Array} arr 原数组
 *
 * @return {Array} 结果，是一个新数组
 */
exports.uniqueArr = function (arr) {
    var ret = [];
    var obj = {};

    var len = arr.length;
    for (var i = 0; i < len; i++) {
        var val = arr[i];
        if (!obj[val]) {
            obj[val] = true;
            ret.push(exports.trim(val));
        }
    }

    return ret;
};

/**
 * 合并数组
 *
 * @param {...Array} source 源数组对象
 * @return {Array} 结果数组，是一个新数组
 */
exports.mergeArr = function (source) {
    var ret = {};
    for (var i = 0, len = arguments.length; i < len; i++) {
        source = arguments[i];

        for (var j = 0, length = source.length; j < length; j++) {
            var val = source[j];
            if (!ret[val]) {
                ret[val] = true;
            }
        }
    }
    return Object.keys(ret);
};
