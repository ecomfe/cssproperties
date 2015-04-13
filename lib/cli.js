/**
 * @file 命令行功能模块
 * @author ielgnaw(wuji0223@gmail.com)
 */

var fs = require('fs');
var chalk = require('chalk');

var sys = require('../package');
var util = require('./util');

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
        ['First value', 'Second value阿萨德']
      , ['First value', 'Second value']
    );

    // console.log(table.toString());

    var table1 = new Table();

    table1.push(
        { 'Some key': 'Some value阿萨德' }
      , { 'Another key': 'Another value' }
    );


    function uniqueArr(arr) {
        var ret = [];
        var json = {};
        var len = arr.length;

        for(var i = 0; i < len; i++){
            var val = arr[i];
            if(!json[val]){
                json[val] = 1;
                ret.push(trim(val));
            }
        }
        return ret;
    }

    var whitespace = /^[\s\xa0\u3000]+|[\u3000\xa0\s]+$/g;

    function trim(source) {
        if (!source) {
            return '';
        }

        return String(source).replace(whitespace, '');
    };

    // console.log(table1.toString());

    var arrayProto = Array.prototype;

    var cheerio = require('cheerio');
    var got = require('got');
    var eachAsync = require('each-async');

    function build1(url, callback) {
        var props = [];
        got.get(url, function(err, body) {
            if (err) {
                callback(err);
                return;
            }
            var $ = cheerio.load(body);
            var refs = $('.col-3').find('a');
            var len = refs.length;
            var refItems = refs.toArray();
            eachAsync(refItems, function (item, index, done) {
                var d = item.children[0].data || '';
                arrayProto.push.apply(props, d.split(','))
                done();
            }, function() {
                callback(null, props);
            });
        });
    }

    // http://www.quackit.com/css/properties/
    build1('http://www.quackit.com/css/properties/', function (err, props) {
        if (err) {
            throw Error('Get http://www.quackit.com/css/properties/ has Error');
        }
        props = uniqueArr(props);
        var len = props.length;
        props.sort(function (a, b) {
            if (a > b) {
                return 1;
            }
            else if (a < b) {
                return -1;
            }

            return 0;
        });
        props = JSON.stringify(props, null, 4);

        var template = '{\n  "___AUTO_GENERATED___": "' + (new Date()) + '",\n';
        template += '  "count": "' + len + '",\n';
        template += '  "properties": ' + props.replace(/\]$/, '  ]') + '\n}';
        fs.writeFileSync('./raw/quackit.com-css-properties.json', template);
        console.log('Update/build complete successfully! :)');
    });

    function build2(url, callback) {
        var props = [];
        got.get(url, function(err, body) {
            if (err) {
                callback(err);
                return;
            }
            var $ = cheerio.load(body);
            var refs = $('.prop_name');
            var len = refs.length;
            var refItems = refs.toArray();
            eachAsync(refItems, function (item, index, done) {
                var d = item.children[0].data || '';
                arrayProto.push.apply(props, d.split(','))
                done();
            }, function() {
                callback(null, props);
            });
        });
    }

    // http://www.pageresource.com/dhtml/cssprops.htm
    build2('http://www.pageresource.com/dhtml/cssprops.htm', function (err, props) {
        if (err) {
            throw Error('Get http://www.pageresource.com/dhtml/cssprops.htm has Error');
        }
        props = uniqueArr(props);
        var len = props.length;
        props.sort(function (a, b) {
            if (a > b) {
                return 1;
            }
            else if (a < b) {
                return -1;
            }

            return 0;
        });
        props = JSON.stringify(props, null, 4);

        var template = '{\n  "___AUTO_GENERATED___": "' + (new Date()) + '",\n';
        template += '  "count": "' + len + '",\n';
        template += '  "properties": ' + props.replace(/\]$/, '  ]') + '\n}';
        fs.writeFileSync('./raw/pageresource.com-css-properties.json', template);
        console.log('Update/build complete successfully! :)');
    });

    function build3(url, callback) {
        var props = [];
        got.get(url, function(err, body) {
            if (err) {
                callback(err);
                return;
            }
            var $ = cheerio.load(body);
            var refs = $('#sec').find('a');
            var len = refs.length;
            var refItems = refs.toArray();
            eachAsync(refItems, function (item, index, done) {
                var d = item.children[0].data || '';
                arrayProto.push.apply(props, d.split(','))
                done();
            }, function() {
                callback(null, props);
            });
        });
    }

    // http://htmldog.com/reference/cssproperties/
    build3('http://htmldog.com/reference/cssproperties/', function (err, props) {
        if (err) {
            throw Error('Get http://htmldog.com/reference/cssproperties/ has Error');
        }
        props = uniqueArr(props);
        var len = props.length;
        props.sort(function (a, b) {
            if (a > b) {
                return 1;
            }
            else if (a < b) {
                return -1;
            }

            return 0;
        });
        props = JSON.stringify(props, null, 4);

        var template = '{\n  "___AUTO_GENERATED___": "' + (new Date()) + '",\n';
        template += '  "count": "' + len + '",\n';
        template += '  "properties": ' + props.replace(/\]$/, '  ]') + '\n}';
        fs.writeFileSync('./raw/htmldog.com-css-properties.json', template);
        console.log('Update/build complete successfully! :)');
    });

    function build4(url, callback) {
        var props = [];
        got.get(url, function (err, body) {
            if (err) {
                callback(err);
                return;
            }
            var $ = cheerio.load(body);
            var refs = $('td[align="left"][valign="top"] a');
            var len = refs.length;
            var refItems = refs.toArray();
            eachAsync(refItems, function (item, index, done) {
                var d = item.children[0].data || '';
                arrayProto.push.apply(props, d.split(','))
                done();
            }, function () {
                callback(null, props);
            });
        });
    }

    // http://www.blooberry.com/indexdot/css/propindex/all.htm
    build4('http://www.blooberry.com/indexdot/css/propindex/all.htm', function (err, props) {
        if (err) {
            throw Error('Get http://www.blooberry.com/indexdot/css/propindex/all.htm has Error');
        }
        props = uniqueArr(props);
        var len = props.length;
        props.sort(function (a, b) {
            if (a > b) {
                return 1;
            }
            else if (a < b) {
                return -1;
            }

            return 0;
        });
        props = JSON.stringify(props, null, 4);

        var template = '{\n  "___AUTO_GENERATED___": "' + (new Date()) + '",\n';
        template += '  "count": "' + len + '",\n';
        template += '  "properties": ' + props.replace(/\]$/, '  ]') + '\n}';
        fs.writeFileSync('./raw/blooberry.com-css-properties.json', template);
        console.log('Update/build complete successfully! :)');
    });

    function build5(url, callback) {
        var props = [];
        got.get(url, function (err, body) {
            if (err) {
                callback(err);
                return;
            }
            var $ = cheerio.load(body);
            var refs = $('table[rules="all"]');
            var refItems = refs.toArray();
            // console.warn(refs);
            eachAsync(refItems, function (item, index, done) {
                var trs = $(item).find('tr');
                // 第一个是 th，但是网页中还是 tr，所以跳过
                for (var i = 1, trsLen = trs.length; i < trsLen; i++) {
                    var d = trs[i].children[0].children[0].data || '';
                    arrayProto.push.apply(props, d.split(','));
                }
                done();
            }, function () {
                callback(null, props);
            });
        });
    }

    // http://www.comptechdoc.org/independent/web/html/guide/htmlcssprop.html
    build5('http://www.comptechdoc.org/independent/web/html/guide/htmlcssprop.html', function (err, props) {
        if (err) {
            throw Error('Get http://www.comptechdoc.org/independent/web/html/guide/htmlcssprop.html has Error');
        }
        props = uniqueArr(props);
        var len = props.length;
        props.sort(function (a, b) {
            if (a > b) {
                return 1;
            }
            else if (a < b) {
                return -1;
            }

            return 0;
        });
        props = JSON.stringify(props, null, 4);

        var template = '{\n  "___AUTO_GENERATED___": "' + (new Date()) + '",\n';
        template += '  "count": "' + len + '",\n';
        template += '  "properties": ' + props.replace(/\]$/, '  ]') + '\n}';
        fs.writeFileSync('./raw/comptechdoc.org-css-properties.json', template);
        console.log('Update/build complete successfully! :)');
    });

    function build6(url, callback) {
        var props = [];
        got.get(url, function (err, body) {
            if (err) {
                callback(err);
                return;
            }
            var $ = cheerio.load(body);
            var refs = $($('section')[0]).find('code');
            var refItems = refs.toArray();
            eachAsync(refItems, function (item, index, done) {
                // console.warn(item.children[0].data);
                var d = item.children[0].data || '';
                if (d !== '--*') {
                    arrayProto.push.apply(props, d.split(','))
                }
                done();
            }, function () {
                callback(null, props);
            });
        });
    }

    // http://ref.openweb.io/CSS/
    build6('http://ref.openweb.io/CSS/', function (err, props) {
        if (err) {
            throw Error('Get http://ref.openweb.io/CSS/ has Error');
        }
        props = uniqueArr(props);
        var len = props.length;
        props.sort(function (a, b) {
            if (a > b) {
                return 1;
            }
            else if (a < b) {
                return -1;
            }

            return 0;
        });
        props = JSON.stringify(props, null, 4);

        var template = '{\n  "___AUTO_GENERATED___": "' + (new Date()) + '",\n';
        template += '  "count": "' + len + '",\n';
        template += '  "properties": ' + props.replace(/\]$/, '  ]') + '\n}';
        fs.writeFileSync('./raw/openweb.io-css-properties.json', template);
        console.log('Update/build complete successfully! :)');
    });

    /*test(function(err, props) {
        props = JSON.stringify(props, null, 4);
        var template = '{\n  "___AUTO_GENERATED___": "' + (new Date()) + '",\n';
        template += '  "properties": ' + props.replace(/\]$/, '  ]') + '\n}';
        fs.writeFileSync('./w3c-css-properties.json', template);
        console.log('Update/build complete successfully! :)');
        process.exit(0);
    });*/

};
