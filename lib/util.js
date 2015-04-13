/**
 * @file 工具方法
 * @author ielgnaw(wuji0223@gmail.com)
 */

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
