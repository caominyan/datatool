//[{ "name": {"name":"cxh"}, "sex": "man" }, { "name": "cxh", "sex": "man" }]
var titles;
var jsonStr;
var input = document.getElementById("jsonInput");
var convertBtn = document.getElementById("convertTable");
var jsonFormat = document.getElementById("jsonFormat");
var table = document.getElementById("table");
var jsonFormatePlace = document.getElementById("writePlace");
convertBtn.onclick = function(){
    table.style.visibility = "visible";
    jsonFormatePlace.style.visibility = "hidden";
    getTitles();
    clearTable();
    makeTitles()
    makeData();
};
jsonFormat.onclick = function () {
    table.style.visibility = "hidden";
    jsonFormatePlace.style.visibility = "visible";
    clearTable();
    var resultJson = formatJson(input.value);
    jsonFormatePlace.innerHTML = '<pre>' +resultJson + '<pre/>';
}

function getTitles() {

    titles = new Set();
    jsonStr = JSON.parse(input.value);
    for(var i=0,l=jsonStr.length;i<l;i++){
        for(var key in jsonStr[i]){
            titles.add(key);
        }
    }
}

function clearTable() {
    table.innerHTML = "";
    jsonFormatePlace.innerHTML = "";
}

function makeTitles() {
    var titleTr = document.createElement("tr");
    titleTr.style.color = "#FF00FF";
    titleTr.style.fontSize = "30px";
    table.appendChild(titleTr);
    for(var title of titles){
        var titleNode = document.createElement("th");
        titleNode.innerText = title;
        titleTr.appendChild(titleNode);
    }
}

//jsonStr[i]

function makeData() {
    for(var i=0,l=jsonStr.length;i<l;i++){
        var tmpTr = document.createElement("tr");
        table.appendChild(tmpTr);
        for(var title of titles){
            var titleNode = document.createElement("th");
            if(jsonStr[i][title] == undefined){
                titleNode.innerText = "";
            }else{
                if(typeof(jsonStr[i][title]) == "object" ){
                    titleNode.innerText = JSON.stringify(jsonStr[i][title])
                }else{
                    titleNode.innerText = jsonStr[i][title];
                }
            }

            table.appendChild(titleNode);
        }
    }

}

var formatJson = function (json, options) {
    var reg = null,
        formatted = '',
        pad = 0,
        PADDING = '    ';
    options = options || {};
    options.newlineAfterColonIfBeforeBraceOrBracket = (options.newlineAfterColonIfBeforeBraceOrBracket === true) ? true : false;
    options.spaceAfterColon = (options.spaceAfterColon === false) ? false : true;
    if (typeof json !== 'string') {
        json = JSON.stringify(json);
    } else {
        json = JSON.parse(json);
        json = JSON.stringify(json);
    }
    reg = /([\{\}])/g;
    json = json.replace(reg, '\r\n$1\r\n');
    reg = /([\[\]])/g;
    json = json.replace(reg, '\r\n$1\r\n');
    reg = /(\,)/g;
    json = json.replace(reg, '$1\r\n');
    reg = /(\r\n\r\n)/g;
    json = json.replace(reg, '\r\n');
    reg = /\r\n\,/g;
    json = json.replace(reg, ',');
    if (!options.newlineAfterColonIfBeforeBraceOrBracket) {
        reg = /\:\r\n\{/g;
        json = json.replace(reg, ':{');
        reg = /\:\r\n\[/g;
        json = json.replace(reg, ':[');
    }
    if (options.spaceAfterColon) {
        reg = /\:/g;
        json = json.replace(reg, ':');
    }
    (json.split('\r\n')).forEach(function (node, index) {
            var i = 0,
                indent = 0,
                padding = '';

            if (node.match(/\{$/) || node.match(/\[$/)) {
                indent = 1;
            } else if (node.match(/\}/) || node.match(/\]/)) {
                if (pad !== 0) {
                    pad -= 1;
                }
            } else {
                indent = 0;
            }

            for (i = 0; i < pad; i++) {
                padding += PADDING;
            }

            formatted += padding + node + '\r\n';
            pad += indent;
        }
    );
    return formatted;
};

