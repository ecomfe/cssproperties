/**
 * @file 抓取某个网站的 cssproperties 基类
 * @author ielgnaw(wuji0223@gmail.com)
 */

var cheerio = require('cheerio');
var got = require('got');
var fs = require('fs');
var path = require('path');
var EventEmitter = require('events').EventEmitter;

var util = require('./util');

var arrayProto = Array.prototype;

var GET_TIMEOUT = 3000;

var GUID = 0;

/**
 * Fetch 基类
 *
 * @constructor
 *
 * @param {Object} opts 参数对象
 *
 * @return {Object} 当前 Fetch 实例
 */
function Fetch(opts) {
    opts = opts || {};
    EventEmitter.apply(this, arguments);

    util.extend(this, {
        // 生成的 json 文件的名字
        jsonFileName: ++GUID,
        // 获取网站的 url
        url: '',
        // 页面上 cssproperties 的 css 选择器
        selector: '',
        // 获取完后的回调函数
        callback: util.noop,
        // 自定义的处理，主要是处理抓取页面的 dom 这块
        customHandler: null
    }, opts);

    // 当前这个 Fetch 实例所抓取的 cssproperties 集合
    this.props = [];

    return this;
}

require('util').inherits(Fetch, EventEmitter);
// Fetch.prototype = new EventEmitter();

/**
 * 获取
 *
 * @return {Object} 当前 Fetch 实例
 */
Fetch.prototype.get = function () {
    var me = this;
    me.props = [];
    me.emit('beforeGet');
    got.get(me.url, {timeout: GET_TIMEOUT}, function (err, body) {
        if (err) {
            console.log(err);
            return;
        }

        var $ = cheerio.load(body);

        /**
         * 如果有自定义的处理，那么就执行自定义的处理，
         */
        if (me.customHandler && typeof me.customHandler === 'function') {
            me.props = me.customHandler.call(me, $);
        }
        else {
            var refs = $(me.selector);
            var refItems = refs.toArray();

            for (var i = 0, len = refItems.length; i < len; i++) {
                var item = refItems[i];
                var d = item.children[0].data || '';
                arrayProto.push.apply(me.props, d.split(','));
            }
        }

        var props = util.uniqueArr(me.props);
        props.sort(function (a, b) {
            if (a > b) {
                return 1;
            }
            else if (a < b) {
                return -1;
            }
            return 0;
        });
        var len = props.length;

        var jsonProps = JSON.stringify(props, null, 4);

        var template = '{\n  "___AUTO_GENERATED___": "' + (new Date()) + '",\n';
        template += '  "count": "' + len + '",\n';
        template += '  "properties": ' + jsonProps.replace(/\]$/, '  ]') + '\n}';
        fs.writeFileSync(path.join(__dirname, '../raw', path.sep) + me.jsonFileName + '.json', template);
        console.log('Update/build ' + me.jsonFileName + '.json complete successfully! :)');

        me.callback.call(me);

        me.emit('afterGet');

    });

    return this;
};

module.exports = exports = Fetch;
