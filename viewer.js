var browser;
var version;
// this code from https://jsfiddle.net/kmturley/Gd6c8/
(function () {
    'use strict';
    
    var module = {
        options: [],
        header: [navigator.platform, navigator.userAgent, navigator.appVersion, navigator.vendor, window.opera],
        dataos: [
            { name: 'Windows Phone', value: 'Windows Phone', version: 'OS' },
            { name: 'Windows', value: 'Win', version: 'NT' },
            { name: 'iPhone', value: 'iPhone', version: 'OS' },
            { name: 'iPad', value: 'iPad', version: 'OS' },
            { name: 'Kindle', value: 'Silk', version: 'Silk' },
            { name: 'Android', value: 'Android', version: 'Android' },
            { name: 'PlayBook', value: 'PlayBook', version: 'OS' },
            { name: 'BlackBerry', value: 'BlackBerry', version: '/' },
            { name: 'Macintosh', value: 'Mac', version: 'OS X' },
            { name: 'Linux', value: 'Linux', version: 'rv' },
            { name: 'Palm', value: 'Palm', version: 'PalmOS' }
        ],
        databrowser: [
            { name: 'Chrome', value: 'Chrome', version: 'Chrome' },
            { name: 'Firefox', value: 'Firefox', version: 'Firefox' },
            { name: 'Safari', value: 'Safari', version: 'Version' },
            { name: 'Internet Explorer', value: 'MSIE', version: 'MSIE' },
            { name: 'Opera', value: 'Opera', version: 'Opera' },
            { name: 'BlackBerry', value: 'CLDC', version: 'CLDC' },
            { name: 'Mozilla', value: 'Mozilla', version: 'Mozilla' }
        ],
        init: function () {
            var agent = this.header.join(' '),
                os = this.matchItem(agent, this.dataos),
                browser = this.matchItem(agent, this.databrowser);
            
            return { os: os, browser: browser };
        },
        matchItem: function (string, data) {
            var i = 0,
                j = 0,
                html = '',
                regex,
                regexv,
                match,
                matches,
                version;
            
            for (i = 0; i < data.length; i += 1) {
                regex = new RegExp(data[i].value, 'i');
                match = regex.test(string);
                if (match) {
                    regexv = new RegExp(data[i].version + '[- /:;]([\\d._]+)', 'i');
                    matches = string.match(regexv);
                    version = '';
                    if (matches) { if (matches[1]) { matches = matches[1]; } }
                    if (matches) {
                        matches = matches.split(/[._]+/);
                        for (j = 0; j < matches.length; j += 1) {
                            if (j === 0) {
                                version += matches[j] + '.';
                            } else {
                                version += matches[j];
                            }
                        }
                    } else {
                        version = '0';
                    }
                    return {
                        name: data[i].name,
                        version: parseFloat(version)
                    };
                }
            }
            return { name: 'unknown', version: 0 };
        }
    };
    
    var e = module.init();
	browser = e.browser.name;
    	version = e.browser.version;
	
}());


function downloadFile(myobject)
{
	var fileData =myobject.fileref;
	var filename = myobject.name;
    const downloadLink = document.createElement("a");

    downloadLink.href = "data:application/pdf;base64"+fileData;
    downloadLink.download = filename;
	document.body.appendChild(downloadLink);
    downloadLink.click();
	document.body.removeChild(downloadLink);
	
//	var b="https://drive.google.com/uc?export=download&id="+fileData;
	
	
//	window.location = b;

	
}



function loadpage()
{
	var searchq=window.location.search+""
	var q=window.location.search+"=z&end" || "?noquery"
	var qt=q.split("&")[0]
	var queryx=qt.split("=")[0];
		
	switch(queryx)
	{
		case "?landing":
		document.getElementById('homepage').style.display='none';
		document.getElementById('landingpage').style.display='inline-block';
		break;
		case "?download":
		var viewno=getParameterByName('download', "0000");
		var titlex=getParameterByName('n', "404 Not Found");
		document.write("<html><body>&nbsp;<script src=\"\/download\/download.js\" type=\"text\/javascript\"></script><script src=\"\/s\/viewer.js\" type=\"text\/javascript\"></script><script type=\"application/javascript\" src=\"https:\/\/script.google.com\/macros\/s\/AKfycbx69GPoJtf9sSevsUbWtPr46vpa01u4oNkHjFmkkWxmj62AZ0q-\/exec?export=data&field="+titlex+"&base="+viewno+"\"></script></body></html>");
		break;
		case "?view":
		var viewno=getParameterByName('view', "0000")
	var titlex=getParameterByName('n', "404 Not Found");
	if(window.self !== window.top)
	{
	 win=window.open("about:blank","_blank");
	 if (window.focus) {win.focus()}
	}
	else
	{
	 win=window.open("about:blank","_self");
	 if (window.focus) {win.focus()}		
	}
  	win.document.write("<html><head><title>"+titlex+"</title><meta http-equiv=\"X-UA-Compatible\" content=\"IE=Edge\">");
	win.document.write("<meta http-equiv=\"content-type\" content=\"text\/html; charset=utf-8\"><link rel=\"shortcut icon\" type=\"image\/x-icon\" href=\"https:\/\/thsconline.github.io\/s\/images\/icon_pdf2.png\">");
	win.document.write("<link href=\"\/s\/styles.css\" rel=\"stylesheet\" type=\"text\/css\">");
	win.document.write("<style>html, body {height:100% !important;}</style>");
	win.document.write("<script src=\"https:\/\/ajax.googleapis.com\/ajax\/libs\/jquery\/1.6.4\/jquery.min.js\" type=\"text\/javascript\"><\/script>");
	win.document.write("<\/head><body>");
	
	if(browser == "Chrome" && version > 82)
	{
	 	win.document.write("<div id=\"overlaybar\" style=\"z-index:1000\; width:100%;height:30px;\"><span id=\"overlayinsert\" style=\"float:left !Important\">Downloads in the latest version of Chrome 83 and newer is not yet supported. Some files can be downloading using this link: <a target=\"_blank\" href=\"https://thsconline.github.io/s/?download="+viewno+"&n="+titlex+"\" class=\"border\" href=\"#v\">Temp Download Link for Chrome 83<\/a>&nbsp;&nbsp;</span></div><br>");
	}			
			
	//win.document.write("<span id=\"overlaybar\"><span id=\"overlayinsert\">&nbsp;&nbsp;<a onclick=\"window.close()\" class=\"border\" href=\"#v\">Close &#215;<\/a>&nbsp;&nbsp;</span></span><br>");
	win.document.write("<iframe style=\"width:100%; height:98%;\" height=\"98%\" sandbox=\"allow-scripts allow-pointer-lock allow-presentation allow-same-origin allow-modals allow-top-navigation allow-downloads\" allowscripts=\"1\" allowdownloads=\"1\" allowfullscreen=\"1\" frameborder=\"0\" id=\"viewer\" src=\"https:\/\/script.google.com\/macros\/s\/AKfycbx69GPoJtf9sSevsUbWtPr46vpa01u4oNkHjFmkkWxmj62AZ0q-\/exec?&export=view&field="+titlex+"&base="+viewno+"\"><noscript>&nbsp;Enable Javascript to Load File<\/noscript><\/iframe>");
	win.document.write("</body></html>"); 	 
	win.document.title = titlex;


			
			
			
	/*		
			
   	document.write("<html><head><title>"+titlex+"</title><meta http-equiv=\"X-UA-Compatible\" content=\"IE=Edge\">");
	document.write("<meta http-equiv=\"content-type\" content=\"text\/html; charset=utf-8\"><link rel=\"shortcut icon\" type=\"image\/x-icon\" href=\"https:\/\/thsconline.github.io\/s\/images\/icon_def.png\">");
	document.write("<link href=\"\/s\/styles.css\" rel=\"stylesheet\" type=\"text\/css\">");
	document.write("<style>html, body {height:100% !important;}</style>");
	document.write("<script src=\"https:\/\/ajax.googleapis.com\/ajax\/libs\/jquery\/1.6.4\/jquery.min.js\" type=\"text\/javascript\"><\/script>");
	document.write("<\/head><body>");
	document.write("<span id=\"overlaybar\"><span id=\"overlayinsert\">&nbsp;&nbsp;<a onclick=\"window.close()\" class=\"border\" href=\"#v\">Close &#215;<\/a>&nbsp;&nbsp;</span></span><br>");
	document.write("<iframe style=\"width:100%; height:95%;\" height=\"95%\" allow-downloads=\"1\" allowfullscreen=\"1\" frameborder=\"0\" id=\"viewer\" src=\"https:\/\/script.google.com\/macros\/s\/AKfycbx69GPoJtf9sSevsUbWtPr46vpa01u4oNkHjFmkkWxmj62AZ0q-\/exec?&export=view&field="+titlex+"&base="+viewno+"\"><noscript>&nbsp;Enable Javascript to Load File<\/noscript><\/iframe>");
	document.write("</body></html>"); 	    
 	*/
		break;		
		default:
		document.getElementById("homepage").style.display='inline';
		break;
	}
}

function pdf(input, viewno)
{
    var titlex = input.innerHTML;
	
	
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
	 window.open("https://thsconline.github.io/s/index.html?view="+viewno+"&n="+titlex);	    
  }
    else
    {
    var i = document.createElement('iframe');
    i.style.display = 'none';
    i.src = "https://thsconline.github.io/s/index.html?view="+viewno+"&n="+titlex;
    document.body.appendChild(i);
    i.onload = function() {setTimeout(function(){i.parentNode.removeChild(i);}, 4000)};
    }
    
    return false;
}

function toggleView(id1, id2)
{
    var x = document.getElementById(id1).style.display;
    var y = document.getElementById(id2).style.display;   
    
    document.getElementById(id2).style.display=x;
    document.getElementById(id1).style.display=y;
}

function getParameterByName(name, defaultx, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return defaultx;
    if (!results[2]) return defaultx;
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
