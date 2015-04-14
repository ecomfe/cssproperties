/**
 * @file 命令行功能模块
 * @author ielgnaw(wuji0223@gmail.com)
 */

var chalk = require('chalk');

var sys = require('../package');
var util = require('./util');
var Fetch = require('./Fetch');

/**
 * 显示默认的信息
 */
function showDefaultInfo() {
    console.log('');
    console.log((sys.name + ' v' + sys.version));
    console.log(chalk.bold.green(util.formatMsg(sys.description)));
}

/**
 * 解析参数。作为命令行执行的入口
 *
 * @param {Array} args 参数列表
 */
exports.parse = function (args) {

    args = args.slice(2);

    // 不带参数时，默认检测当前目录下所有的 css 文件
    if (args.length === 0) {
        args.push('.');
    }

    if (args[0] === '--version' || args[0] === '-v') {
        showDefaultInfo();
        return;
    }

    var Table = require('cli-table-zh');

    // instantiate
    var table = new Table({
        head: [chalk.bold.green('TH 1 label'), 'TH 2 label']
      // , colWidths: [50, 50]
    });

    // table is an Array, so you can `push`, `unshift`, `splice` and friends
    table.push(
        ['First value', 'Second value阿萨德'],
        ['First value', 'Second value']
    );

    // console.log(table.toString());

    var table1 = new Table();

    table1.push(
        { 'Some key': 'Some value阿萨德' },
        { 'Another key': 'Another value' }
    );


    // console.log(table1.toString());

    var candidates = [
        {
            jsonFileName: 'quackit',
            url: 'http://www.quackit.com/css/properties/',
            selector: '.col-3 a',
            callback: function () {
                console.warn('quackit done');
            }
        },
        {
            jsonFileName: 'pageresource',
            url: 'http://www.pageresource.com/dhtml/cssprops.htm',
            selector: '.prop_name',
            callback: function () {
                console.warn('pageresource done');
            }
        },
        {
            jsonFileName: 'htmldog',
            url: 'http://htmldog.com/reference/cssproperties/',
            selector: '#sec a',
            callback: function () {
                console.warn('htmldog done');
            }
        },
        {
            jsonFileName: 'blooberry',
            url: 'http://www.blooberry.com/indexdot/css/propindex/all.htm',
            selector: 'td[align="left"][valign="top"] a',
            callback: function () {
                console.warn('blooberry done');
            }
        },
        {
            jsonFileName: 'w3schools',
            url: 'http://www.w3schools.com/cssref/',
            selector: 'div.notranslate a[target="_top"]',
            callback: function () {
                console.warn('w3schools done');
            }
        },
        {
            jsonFileName: 'comptechdoc',
            url: 'http://www.comptechdoc.org/independent/web/html/guide/htmlcssprop.html',
            customHandler: function ($) {
                var refs = $('table[rules="all"]');
                var refItems = refs.toArray();

                var ret = [];
                for (var i = 0, len = refItems.length; i < len; i++) {
                    var item = refItems[i];
                    var trs = $(item).find('tr');
                    // 第一个是 th，但是网页中还是用的 tr 标签，所以跳过
                    for (var j = 1, trsLen = trs.length; j < trsLen; j++) {
                        var d = trs[j].children[0].children[0].data || '';
                        Array.prototype.push.apply(ret, d.split(','));
                    }
                }

                return ret;
            },
            callback: function () {
                console.warn('comptechdoc done');
            }
        },
        {
            jsonFileName: 'openweb',
            url: 'http://ref.openweb.io/CSS/',
            customHandler: function ($) {
                var refs = $($('section')[0]).find('code');
                var refItems = refs.toArray();

                var ret = [];
                for (var i = 0, len = refItems.length; i < len; i++) {
                    var item = refItems[i];
                    var d = item.children[0].data || '';
                    if (d !== '--*') {
                        Array.prototype.push.apply(ret, d.split(','));
                    }
                }

                return ret;
            },
            callback: function () {
                console.warn('openweb done');
            }
        }
    ];

    for (var i = 0, len = candidates.length; i < len; i++) {
        /* jshint loopfunc:true */
        (function (index) {
            new Fetch({
                jsonFileName: candidates[index].jsonFileName,
                url: candidates[index].url,
                selector: candidates[index].selector,
                callback: candidates[index].callback,
                customHandler: candidates[index].customHandler
            }).on('beforeGet', function () {
                console.warn('beforeGet ', this.jsonFileName);
            }).on('afterGet', function () {
                console.warn('afterGet ', this.jsonFileName);
            }).get();
        })(i);
    }

    // function SubFetch(opts) {
    //     Fetch.apply(this, arguments);
    // }

    // require('util').inherits(SubFetch, Fetch);

    // var sf = new SubFetch({
    //     jsonFileName: 'comptechdoc',
    //     url: 'http://www.comptechdoc.org/independent/web/html/guide/htmlcssprop.html',
    //     callback: function () {
    //         console.warn('f7 done');
    //     }
    // });
    // console.warn(sf.get);
};
