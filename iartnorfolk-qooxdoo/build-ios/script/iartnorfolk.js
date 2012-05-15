(function(){

if (!window.qx) window.qx = {};

qx.$$start = new Date();
  
if (!qx.$$environment) qx.$$environment = {};
var envinfo = {"engine.name":"webkit","qx.application":"iartnorfolk.Application","qx.debug":false,"qx.debug.databinding":false,"qx.debug.dispose":false,"qx.mobile.emulatetouch":true,"qx.mobile.nativescroll":false,"qx.optimization.basecalls":true,"qx.optimization.comments":true,"qx.optimization.privates":true,"qx.optimization.strings":true,"qx.optimization.variables":true,"qx.optimization.variants":true,"qx.revision":"","qx.theme":"qx.theme.Modern","qx.version":"2.0"};
for (var k in envinfo) qx.$$environment[k] = envinfo[k];

if (!qx.$$libraries) qx.$$libraries = {};
var libinfo = {"__out__":{"sourceUri":"script"},"iartnorfolk":{"resourceUri":"resource","sourceUri":"script"},"qx":{"resourceUri":"resource","sourceUri":"script"}};
for (var k in libinfo) qx.$$libraries[k] = libinfo[k];

qx.$$resources = {};
qx.$$translations = {"C":null,"en":null};
qx.$$locales = {"C":null,"en":null};
qx.$$packageData = {};

qx.$$loader = {
  parts : {"boot":[0]},
  packages : {"0":{"uris":["__out__:iartnorfolk.094590f52170.js"]}},
  urisBefore : [],
  cssBefore : ["./resource/qx/mobile/css/ios.css","./resource/iartnorfolk/css/styles.css"],
  boot : "boot",
  closureParts : {},
  bootIsInline : true,
  addNoCacheParam : false,
  
  decodeUris : function(compressedUris)
  {
    var libs = qx.$$libraries;
    var uris = [];
    for (var i=0; i<compressedUris.length; i++)
    {
      var uri = compressedUris[i].split(":");
      var euri;
      if (uri.length==2 && uri[0] in libs) {
        var prefix = libs[uri[0]].sourceUri;
        euri = prefix + "/" + uri[1];
      } else {
        euri = compressedUris[i];
      }
      if (qx.$$loader.addNoCacheParam) {
        euri += "?nocache=" + Math.random();
      }
      
      uris.push(euri);
    }
    return uris;      
  }
};  

function loadScript(uri, callback) {
  var elem = document.createElement("script");
  elem.charset = "utf-8";
  elem.src = uri;
  elem.onreadystatechange = elem.onload = function() {
    if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") {
      elem.onreadystatechange = elem.onload = null;
      callback();
    }
  };
  var head = document.getElementsByTagName("head")[0];
  head.appendChild(elem);
}

function loadCss(uri) {
  var elem = document.createElement("link");
  elem.rel = "stylesheet";
  elem.type= "text/css";
  elem.href= uri;
  var head = document.getElementsByTagName("head")[0];
  head.appendChild(elem);
}

var isWebkit = /AppleWebKit\/([^ ]+)/.test(navigator.userAgent);

function loadScriptList(list, callback) {
  if (list.length == 0) {
    callback();
    return;
  }
  var item = list.shift();
  loadScript(item,  function() {
    if (isWebkit) {
      // force async, else Safari fails with a "maximum recursion depth exceeded"
      window.setTimeout(function() {
        loadScriptList(list, callback);
      }, 0);
    } else {
      loadScriptList(list, callback);
    }
  });
}

var fireContentLoadedEvent = function() {
  qx.$$domReady = true;
  document.removeEventListener('DOMContentLoaded', fireContentLoadedEvent, false);
};
if (document.addEventListener) {
  document.addEventListener('DOMContentLoaded', fireContentLoadedEvent, false);
}

qx.$$loader.importPackageData = function (dataMap, callback) {
  if (dataMap["resources"]){
    var resMap = dataMap["resources"];
    for (var k in resMap) qx.$$resources[k] = resMap[k];
  }
  if (dataMap["locales"]){
    var locMap = dataMap["locales"];
    var qxlocs = qx.$$locales;
    for (var lang in locMap){
      if (!qxlocs[lang]) qxlocs[lang] = locMap[lang];
      else 
        for (var k in locMap[lang]) qxlocs[lang][k] = locMap[lang][k];
    }
  }
  if (dataMap["translations"]){
    var trMap   = dataMap["translations"];
    var qxtrans = qx.$$translations;
    for (var lang in trMap){
      if (!qxtrans[lang]) qxtrans[lang] = trMap[lang];
      else 
        for (var k in trMap[lang]) qxtrans[lang][k] = trMap[lang][k];
    }
  }
  if (callback){
    callback(dataMap);
  }
}

qx.$$loader.signalStartup = function () 
{
  qx.$$loader.scriptLoaded = true;
  if (window.qx && qx.event && qx.event.handler && qx.event.handler.Application) {
    qx.event.handler.Application.onScriptLoaded();
    qx.$$loader.applicationHandlerReady = true; 
  } else {
    qx.$$loader.applicationHandlerReady = false;
  }
}

// Load all stuff
qx.$$loader.init = function(){
  var l=qx.$$loader;
  if (l.cssBefore.length>0) {
    for (var i=0, m=l.cssBefore.length; i<m; i++) {
      loadCss(l.cssBefore[i]);
    }
  }
  if (l.urisBefore.length>0){
    loadScriptList(l.urisBefore, function(){
      l.initUris();
    });
  } else {
    l.initUris();
  }
}

// Load qooxdoo boot stuff
qx.$$loader.initUris = function(){
  var l=qx.$$loader;
  var bootPackageHash=l.parts[l.boot][0];
  if (l.bootIsInline){
    l.importPackageData(qx.$$packageData[bootPackageHash]);
    l.signalStartup();
  } else {
    loadScriptList(l.decodeUris(l.packages[l.parts[l.boot][0]].uris), function(){
      // Opera needs this extra time to parse the scripts
      window.setTimeout(function(){
        l.importPackageData(qx.$$packageData[bootPackageHash] || {});
        l.signalStartup();
      }, 0);
    });
  }
}
})();

qx.$$packageData['0']={"locales":{},"resources":{"iartnorfolk/css/styles.css":"iartnorfolk","qx/mobile/css/LICENSE":"qx","qx/mobile/css/android/android.css":"qx","qx/mobile/css/common/main.css":"qx","qx/mobile/css/ios/ios.css":"qx","qx/mobile/icon/ios/arrow.png":[25,20,"png","qx"],"qx/mobile/icon/ios/arrow_pressed.png":[25,20,"png","qx"],"qx/mobile/icon/ios/backButton.png":[43,30,"png","qx"],"qx/mobile/icon/ios/backButton_pressed.png":[43,30,"png","qx"],"qx/mobile/icon/ios/cancel.png":[20,20,"png","qx"],"qx/mobile/icon/ios/checkbox.png":[22,21,"png","qx"],"qx/mobile/icon/ios/loading.png":[32,32,"png","qx"],"qx/mobile/icon/ios/on_off.png":[149,27,"png","qx"],"qx/mobile/icon/ios/pinstripes.png":[7,1,"png","qx"],"qx/mobile/icon/ios/scrollbar.png":[7,7,"png","qx"],"qx/mobile/icon/ios/spinner.png":[20,20,"png","qx"],"qx/mobile/icon/ios/toolButton.png":[16,30,"png","qx"],"qx/mobile/icon/ios/toolButton_pressed.png":[16,30,"png","qx"],"qx/mobile/js/iscroll.js":"qx","qx/mobile/js/iscroll.min.js":"qx"},"translations":{}};
(function(){var m="toString",k=".",j="Object",h='"',g="Array",f="()",e="String",d="Function",c=".prototype",b="function",K="Boolean",J="Error",I="constructor",H="warn",G="default",F="hasOwnProperty",E="string",D="toLocaleString",C="RegExp",B='\", "',t="info",u="BROKEN_IE",r="isPrototypeOf",s="Date",p="",q="qx.Bootstrap",n="]",o="Class",v="error",w="[Class ",y="valueOf",x="Number",A="debug",z="ES5";
if(!window.qx){window.qx={};
}qx.Bootstrap={genericToString:function(){return w+this.classname+n;
},createNamespace:function(name,L){var N=name.split(k);
var parent=window;
var M=N[0];

for(var i=0,O=N.length-1;i<O;i++,M=N[i]){if(!parent[M]){parent=parent[M]={};
}else{parent=parent[M];
}}parent[M]=L;
return M;
},setDisplayName:function(P,Q,name){P.displayName=Q+k+name+f;
},setDisplayNames:function(R,S){for(var name in R){var T=R[name];

if(T instanceof Function){T.displayName=S+k+name+f;
}}},define:function(name,U){if(!U){var U={statics:{}};
}var ba;
var X=null;
qx.Bootstrap.setDisplayNames(U.statics,name);

if(U.members||U.extend){qx.Bootstrap.setDisplayNames(U.members,name+c);
ba=U.construct||new Function;

if(U.extend){this.extendClass(ba,ba,U.extend,name,Y);
}var V=U.statics||{};
for(var i=0,bb=qx.Bootstrap.getKeys(V),l=bb.length;i<l;i++){var bc=bb[i];
ba[bc]=V[bc];
}X=ba.prototype;
var W=U.members||{};
for(var i=0,bb=qx.Bootstrap.getKeys(W),l=bb.length;i<l;i++){var bc=bb[i];
X[bc]=W[bc];
}}else{ba=U.statics||{};
}var Y=this.createNamespace(name,ba);
ba.name=ba.classname=name;
ba.basename=Y;
ba.$$type=o;
if(!ba.hasOwnProperty(m)){ba.toString=this.genericToString;
}if(U.defer){U.defer(ba,X);
}qx.Bootstrap.$$registry[name]=U.statics;
return ba;
}};
qx.Bootstrap.define(q,{statics:{LOADSTART:qx.$$start||new Date(),DEBUG:(function(){var bd=true;

if(qx.$$environment&&qx.$$environment["qx.debug"]===false){bd=false;
}return bd;
})(),getEnvironmentSetting:function(be){if(qx.$$environment){return qx.$$environment[be];
}},setEnvironmentSetting:function(bf,bg){if(!qx.$$environment){qx.$$environment={};
}
if(qx.$$environment[bf]===undefined){qx.$$environment[bf]=bg;
}},createNamespace:qx.Bootstrap.createNamespace,define:qx.Bootstrap.define,setDisplayName:qx.Bootstrap.setDisplayName,setDisplayNames:qx.Bootstrap.setDisplayNames,genericToString:qx.Bootstrap.genericToString,extendClass:function(bh,bi,bj,name,bk){var bn=bj.prototype;
var bm=new Function;
bm.prototype=bn;
var bl=new bm;
bh.prototype=bl;
bl.name=bl.classname=name;
bl.basename=bk;
bi.base=bh.superclass=bj;
bi.self=bh.constructor=bl.constructor=bh;
},getByName:function(name){return qx.Bootstrap.$$registry[name];
},$$registry:{},objectGetLength:function(bo){var length=0;

for(var bp in bo){length++;
}return length;
},objectMergeWith:function(bq,br,bs){if(bs===undefined){bs=true;
}
for(var bt in br){if(bs||bq[bt]===undefined){bq[bt]=br[bt];
}}return bq;
},__a:[r,F,D,m,y,I],getKeys:({"ES5":Object.keys,"BROKEN_IE":function(bu){var bv=[];
var bx=Object.prototype.hasOwnProperty;

for(var by in bu){if(bx.call(bu,by)){bv.push(by);
}}var bw=qx.Bootstrap.__a;

for(var i=0,a=bw,l=a.length;i<l;i++){if(bx.call(bu,a[i])){bv.push(a[i]);
}}return bv;
},"default":function(bz){var bA=[];
var bB=Object.prototype.hasOwnProperty;

for(var bC in bz){if(bB.call(bz,bC)){bA.push(bC);
}}return bA;
}})[typeof (Object.keys)==b?z:(function(){for(var bD in {toString:1}){return bD;
}})()!==m?u:G],getKeysAsString:function(bE){var bF=qx.Bootstrap.getKeys(bE);

if(bF.length==0){return p;
}return h+bF.join(B)+h;
},__b:{"[object String]":e,"[object Array]":g,"[object Object]":j,"[object RegExp]":C,"[object Number]":x,"[object Boolean]":K,"[object Date]":s,"[object Function]":d,"[object Error]":J},bind:function(bG,self,bH){var bI=Array.prototype.slice.call(arguments,2,arguments.length);
return function(){var bJ=Array.prototype.slice.call(arguments,0,arguments.length);
return bG.apply(self,bI.concat(bJ));
};
},firstUp:function(bK){return bK.charAt(0).toUpperCase()+bK.substr(1);
},firstLow:function(bL){return bL.charAt(0).toLowerCase()+bL.substr(1);
},getClass:function(bM){var bN=Object.prototype.toString.call(bM);
return (qx.Bootstrap.__b[bN]||bN.slice(8,-1));
},isString:function(bO){return (bO!==null&&(typeof bO===E||qx.Bootstrap.getClass(bO)==e||bO instanceof String||(!!bO&&!!bO.$$isString)));
},isArray:function(bP){return (bP!==null&&(bP instanceof Array||(bP&&qx.data&&qx.data.IListData&&qx.util.OOUtil.hasInterface(bP.constructor,qx.data.IListData))||qx.Bootstrap.getClass(bP)==g||(!!bP&&!!bP.$$isArray)));
},isObject:function(bQ){return (bQ!==undefined&&bQ!==null&&qx.Bootstrap.getClass(bQ)==j);
},isFunction:function(bR){return qx.Bootstrap.getClass(bR)==d;
},classIsDefined:function(name){return qx.Bootstrap.getByName(name)!==undefined;
},getPropertyDefinition:function(bS,name){while(bS){if(bS.$$properties&&bS.$$properties[name]){return bS.$$properties[name];
}bS=bS.superclass;
}return null;
},hasProperty:function(bT,name){return !!qx.Bootstrap.getPropertyDefinition(bT,name);
},getEventType:function(bU,name){var bU=bU.constructor;

while(bU.superclass){if(bU.$$events&&bU.$$events[name]!==undefined){return bU.$$events[name];
}bU=bU.superclass;
}return null;
},supportsEvent:function(bV,name){return !!qx.Bootstrap.getEventType(bV,name);
},getByInterface:function(bW,bX){var bY,i,l;

while(bW){if(bW.$$implements){bY=bW.$$flatImplements;

for(i=0,l=bY.length;i<l;i++){if(bY[i]===bX){return bW;
}}}bW=bW.superclass;
}return null;
},hasInterface:function(ca,cb){return !!qx.Bootstrap.getByInterface(ca,cb);
},getMixins:function(cc){var cd=[];

while(cc){if(cc.$$includes){cd.push.apply(cd,cc.$$flatIncludes);
}cc=cc.superclass;
}return cd;
},$$logs:[],debug:function(ce,cf){qx.Bootstrap.$$logs.push([A,arguments]);
},info:function(cg,ch){qx.Bootstrap.$$logs.push([t,arguments]);
},warn:function(ci,cj){qx.Bootstrap.$$logs.push([H,arguments]);
},error:function(ck,cl){qx.Bootstrap.$$logs.push([v,arguments]);
},trace:function(cm){}}});
})();
(function(){var a="qx.util.OOUtil";
qx.Bootstrap.define(a,{statics:{classIsDefined:qx.Bootstrap.classIsDefined,getPropertyDefinition:qx.Bootstrap.getPropertyDefinition,hasProperty:qx.Bootstrap.hasProperty,getEventType:qx.Bootstrap.getEventType,supportsEvent:qx.Bootstrap.supportsEvent,getByInterface:qx.Bootstrap.getByInterface,hasInterface:qx.Bootstrap.hasInterface,getMixins:qx.Bootstrap.getMixins}});
})();
(function(){var h="qx.Mixin",g=".prototype",f="constructor",e="Array",d="[Mixin ",c="]",b="destruct",a="Mixin";
qx.Bootstrap.define(h,{statics:{define:function(name,j){if(j){if(j.include&&!(qx.Bootstrap.getClass(j.include)===e)){j.include=[j.include];
}var m=j.statics?j.statics:{};
qx.Bootstrap.setDisplayNames(m,name);

for(var k in m){if(m[k] instanceof Function){m[k].$$mixin=m;
}}if(j.construct){m.$$constructor=j.construct;
qx.Bootstrap.setDisplayName(j.construct,name,f);
}
if(j.include){m.$$includes=j.include;
}
if(j.properties){m.$$properties=j.properties;
}
if(j.members){m.$$members=j.members;
qx.Bootstrap.setDisplayNames(j.members,name+g);
}
for(var k in m.$$members){if(m.$$members[k] instanceof Function){m.$$members[k].$$mixin=m;
}}
if(j.events){m.$$events=j.events;
}
if(j.destruct){m.$$destructor=j.destruct;
qx.Bootstrap.setDisplayName(j.destruct,name,b);
}}else{var m={};
}m.$$type=a;
m.name=name;
m.toString=this.genericToString;
m.basename=qx.Bootstrap.createNamespace(name,m);
this.$$registry[name]=m;
return m;
},checkCompatibility:function(n){var q=this.flatten(n);
var r=q.length;

if(r<2){return true;
}var u={};
var t={};
var s={};
var p;

for(var i=0;i<r;i++){p=q[i];

for(var o in p.events){if(s[o]){throw new Error('Conflict between mixin "'+p.name+'" and "'+s[o]+'" in member "'+o+'"!');
}s[o]=p.name;
}
for(var o in p.properties){if(u[o]){throw new Error('Conflict between mixin "'+p.name+'" and "'+u[o]+'" in property "'+o+'"!');
}u[o]=p.name;
}
for(var o in p.members){if(t[o]){throw new Error('Conflict between mixin "'+p.name+'" and "'+t[o]+'" in member "'+o+'"!');
}t[o]=p.name;
}}return true;
},isCompatible:function(v,w){var x=qx.util.OOUtil.getMixins(w);
x.push(v);
return qx.Mixin.checkCompatibility(x);
},getByName:function(name){return this.$$registry[name];
},isDefined:function(name){return this.getByName(name)!==undefined;
},getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);
},flatten:function(y){if(!y){return [];
}var z=y.concat();

for(var i=0,l=y.length;i<l;i++){if(y[i].$$includes){z.push.apply(z,this.flatten(y[i].$$includes));
}}return z;
},genericToString:function(){return d+this.name+c;
},$$registry:{},__c:null,__d:function(){}}});
})();
(function(){var cq="qx.bom.client.CssTransform.get3D",cp="default",co="|",cn="qx.allowUrlSettings",cm="qx.bom.client.Stylesheet.getInsertRule",cl="css.transform.3d",ck="qx.bom.client.Html.getDataset",cj="qx.bom.client.PhoneGap.getPhoneGap",ci="qx.bom.client.Html.getAudioAif",ch="qx.debug.dispose",bt="qx.bom.client.Xml.getAttributeNS",bs="qx.bom.client.Stylesheet.getRemoveImport",br="qx.bom.client.Css.getUserModify",bq="qx.bom.client.Css.getBoxShadow",bp="qx.bom.client.Event.getHashChange",bo="qx.bom.client.Plugin.getWindowsMedia",bn="qx.bom.client.Html.getVideo",bm="qx.bom.client.Device.getName",bl="qx.bom.client.Event.getTouch",bk="qx.optimization.strings",cx="qx.optimization.variables",cy="qx.bom.client.EcmaScript.getStackTrace",cv="qx.bom.client.EcmaScript.getObjectCount",cw="qx.bom.client.Xml.getSelectSingleNode",ct="css.gradient.linear",cu="qx.bom.client.Xml.getImplementation",cr="qx.bom.client.Html.getConsole",cs="qx.bom.client.Engine.getVersion",cz="qx.bom.client.Plugin.getQuicktime",cA="qx.propertyDebugLevel",bR="qx.bom.client.Html.getNaturalDimensions",bQ="qx.bom.client.Xml.getSelectNodes",bT="qx.bom.client.Xml.getElementsByTagNameNS",bS="qx.bom.client.Html.getDataUrl",bV="qx.bom.client.Flash.isAvailable",bU="qx.bom.client.Html.getCanvas",bX="qx.bom.client.Css.getBoxModel",bW="qx.bom.client.Plugin.getSilverlight",bP="qx.bom.client.Css.getUserSelect",bO="qx.bom.client.Css.getRadialGradient",a="module.property",b="qx.bom.client.Plugin.getWindowsMediaVersion",c="qx.bom.client.Stylesheet.getCreateStyleSheet",d="qx.bom.client.Locale.getLocale",e="module.events",f="module.databinding",g="qx.bom.client.Html.getFileReader",h="qx.bom.client.Css.getBorderImage",j="qx.bom.client.Stylesheet.getDeleteRule",k="qx.bom.client.Plugin.getDivXVersion",cE="qx.bom.client.Scroll.scrollBarOverlayed",cD="qx.bom.client.Plugin.getPdfVersion",cC=":",cB="qx.bom.client.Css.getLinearGradient",cI="qx.bom.client.Transport.getXmlHttpRequest",cH="qx.bom.client.Html.getClassList",cG="qx.bom.client.Event.getHelp",cF="qx.optimization.comments",cK="qx.bom.client.Locale.getVariant",cJ="qx.bom.client.Css.getBoxSizing",J="qx.bom.client.OperatingSystem.getName",K="module.logger",H="qx.bom.client.Css.getOverflowXY",I="qx.mobile.emulatetouch",N="qx.bom.client.Html.getAudioWav",O="qx.bom.client.Browser.getName",L="qx.bom.client.Css.getInlineBlock",M="qx.bom.client.Plugin.getPdf",F="qx.dynlocale",G="qx.bom.client.Html.getAudio",s="qx.core.Environment",r="qx.bom.client.CssTransform.getSupport",u="qx.bom.client.Html.getTextContent",t="qx.bom.client.Css.getPlaceholder",o="qx.bom.client.Css.getFloat",n="false",q="qx.bom.client.Html.getXul",p="qx.bom.client.Xml.getCreateNode",m="qxenv",l="qx.bom.client.Html.getSessionStorage",T="qx.bom.client.Html.getAudioAu",U="qx.bom.client.Css.getOpacity",V="qx.bom.client.Html.getVml",W="qx.bom.client.Css.getRgba",P="qx.bom.client.Transport.getMaxConcurrentRequestCount",Q="qx.bom.client.Css.getBorderRadius",R="qx.bom.client.Event.getPointer",S="qx.bom.client.Css.getGradients",X="qx.bom.client.Transport.getSsl",Y="qx.bom.client.Html.getWebWorker",C="qx.bom.client.Json.getJson",B="qx.bom.client.Browser.getQuirksMode",A="qx.bom.client.Css.getTextOverflow",z="qx.bom.client.Xml.getQualifiedItem",y="qx.bom.client.Html.getVideoOgg",x="&",w="qx.bom.client.Browser.getDocumentMode",v="qx.allowUrlVariants",E="qx.bom.client.Html.getContains",D="qx.bom.client.Plugin.getActiveX",ba=".",bb="qx.bom.client.Xml.getDomProperties",bc="qx.bom.client.CssAnimation.getSupport",bd="qx.debug.databinding",be="qx.optimization.basecalls",bf="qx.bom.client.Browser.getVersion",bg="qx.bom.client.Css.getUserSelectNone",bh="true",bi="qx.bom.client.Html.getSvg",bj="qx.optimization.privates",bx="qx.bom.client.Plugin.getDivX",bw="qx.bom.client.Runtime.getName",bv="qx.bom.client.Html.getLocalStorage",bu="qx.bom.client.Flash.getStrictSecurityModel",bB="qx.aspects",bA="qx.debug",bz="qx.dynamicmousewheel",by="qx.bom.client.Html.getAudioMp3",bD="qx.bom.client.Engine.getName",bC="qx.bom.client.Plugin.getGears",bK="qx.bom.client.Plugin.getQuicktimeVersion",bL="qx.bom.client.Html.getAudioOgg",bI="qx.bom.client.Plugin.getSilverlightVersion",bJ="qx.bom.client.Html.getCompareDocumentPosition",bG="qx.bom.client.Flash.getExpressInstall",bH="qx.bom.client.OperatingSystem.getVersion",bE="qx.bom.client.Html.getXPath",bF="qx.bom.client.Html.getGeoLocation",bM="qx.bom.client.Css.getAppearance",bN="qx.mobile.nativescroll",ca="qx.bom.client.Xml.getDomParser",bY="qx.bom.client.Stylesheet.getAddImport",cc="qx.optimization.variants",cb="qx.bom.client.Html.getVideoWebm",ce="qx.bom.client.Flash.getVersion",cd="qx.bom.client.PhoneGap.getNotification",cg="qx.bom.client.Html.getVideoH264",cf="qx.bom.client.Xml.getCreateElementNS";
qx.Bootstrap.define(s,{statics:{_checks:{},_asyncChecks:{},__e:{},_checksMap:{"engine.version":cs,"engine.name":bD,"browser.name":O,"browser.version":bf,"browser.documentmode":w,"browser.quirksmode":B,"runtime.name":bw,"device.name":bm,"locale":d,"locale.variant":cK,"os.name":J,"os.version":bH,"os.scrollBarOverlayed":cE,"plugin.gears":bC,"plugin.activex":D,"plugin.quicktime":cz,"plugin.quicktime.version":bK,"plugin.windowsmedia":bo,"plugin.windowsmedia.version":b,"plugin.divx":bx,"plugin.divx.version":k,"plugin.silverlight":bW,"plugin.silverlight.version":bI,"plugin.flash":bV,"plugin.flash.version":ce,"plugin.flash.express":bG,"plugin.flash.strictsecurity":bu,"plugin.pdf":M,"plugin.pdf.version":cD,"io.maxrequests":P,"io.ssl":X,"io.xhr":cI,"event.touch":bl,"event.pointer":R,"event.help":cG,"event.hashchange":bp,"ecmascript.objectcount":cv,"ecmascript.stacktrace":cy,"html.webworker":Y,"html.filereader":g,"html.geolocation":bF,"html.audio":G,"html.audio.ogg":bL,"html.audio.mp3":by,"html.audio.wav":N,"html.audio.au":T,"html.audio.aif":ci,"html.video":bn,"html.video.ogg":y,"html.video.h264":cg,"html.video.webm":cb,"html.storage.local":bv,"html.storage.session":l,"html.classlist":cH,"html.xpath":bE,"html.xul":q,"html.canvas":bU,"html.svg":bi,"html.vml":V,"html.dataset":ck,"html.dataurl":bS,"html.console":cr,"html.stylesheet.createstylesheet":c,"html.stylesheet.insertrule":cm,"html.stylesheet.deleterule":j,"html.stylesheet.addimport":bY,"html.stylesheet.removeimport":bs,"html.element.contains":E,"html.element.compareDocumentPosition":bJ,"html.element.textcontent":u,"html.image.naturaldimensions":bR,"json":C,"css.textoverflow":A,"css.placeholder":t,"css.borderradius":Q,"css.borderimage":h,"css.boxshadow":bq,"css.gradients":S,"css.gradient.linear":cB,"css.gradient.radial":bO,"css.boxmodel":bX,"css.rgba":W,"css.userselect":bP,"css.userselect.none":bg,"css.usermodify":br,"css.appearance":bM,"css.float":o,"css.boxsizing":cJ,"css.translate3d":cq,"css.animation":bc,"css.transform":r,"css.transform.3d":cq,"css.inlineblock":L,"css.opacity":U,"css.overflowxy":H,"phonegap":cj,"phonegap.notification":cd,"xml.implementation":cu,"xml.domparser":ca,"xml.selectsinglenode":cw,"xml.selectnodes":bQ,"xml.getelementsbytagnamens":bT,"xml.domproperties":bb,"xml.attributens":bt,"xml.createnode":p,"xml.getqualifieditem":z,"xml.createelementns":cf},get:function(cL){if(qx.Bootstrap.DEBUG){var cN={"css.translate3d":cl,"css.gradients":ct,"ecmascript.objectcount":null};

if(cL in cN){qx.Bootstrap.warn("The key '"+cL+"' is deprecated."+(cN[cL]?" Please use '"+cN[cL]+"' instead.":""));
}}if(this.__e[cL]!=undefined){return this.__e[cL];
}var cP=this._checks[cL];

if(cP){var cO=cP();
this.__e[cL]=cO;
return cO;
}var cM=this._getClassNameFromEnvKey(cL);

if(cM[0]!=undefined){var cQ=cM[0];
var cR=cM[1];
var cO=cQ[cR]();
this.__e[cL]=cO;
return cO;
}if(qx.Bootstrap.DEBUG){qx.Bootstrap.warn(cL+" is not a valid key. Please see the API-doc of "+"qx.core.Environment for a list of predefined keys.");
qx.Bootstrap.trace(this);
}},_getClassNameFromEnvKey:function(cS){var cY=this._checksMap;

if(cY[cS]!=undefined){var cU=cY[cS];
var cX=cU.lastIndexOf(ba);

if(cX>-1){var cW=cU.slice(0,cX);
var cT=cU.slice(cX+1);
var cV=qx.Bootstrap.getByName(cW);

if(cV!=undefined){return [cV,cT];
}}}return [undefined,undefined];
},getAsync:function(da,db,self){var df=this;

if(this.__e[da]!=undefined){window.setTimeout(function(){db.call(self,df.__e[da]);
},0);
return;
}var de=this._asyncChecks[da];

if(de){de(function(dh){df.__e[da]=dh;
db.call(self,dh);
});
return;
}var dd=this._getClassNameFromEnvKey(da);

if(dd[0]!=undefined){var dg=dd[0];
var dc=dd[1];
dg[dc](function(di){df.__e[da]=di;
db.call(self,di);
});
return;
}if(qx.Bootstrap.DEBUG){qx.Bootstrap.warn(da+" is not a valid key. Please see the API-doc of "+"qx.core.Environment for a list of predefined keys.");
qx.Bootstrap.trace(this);
}},select:function(dj,dk){return this.__f(this.get(dj),dk);
},selectAsync:function(dl,dm,self){this.getAsync(dl,function(dn){var dp=this.__f(dl,dm);
dp.call(self,dn);
},this);
},__f:function(dq,dr){var dt=dr[dq];

if(dr.hasOwnProperty(dq)){return dt;
}for(var ds in dr){if(ds.indexOf(co)!=-1){var du=ds.split(co);

for(var i=0;i<du.length;i++){if(du[i]==dq){return dr[ds];
}}}}
if(dr[cp]!==undefined){return dr[cp];
}
if(qx.Bootstrap.DEBUG){throw new Error('No match for variant "'+dq+'" ('+(typeof dq)+' type)'+' in variants ['+qx.Bootstrap.getKeysAsString(dr)+'] found, and no default ("default") given');
}},filter:function(dv){var dx=[];

for(var dw in dv){if(this.get(dw)){dx.push(dv[dw]);
}}return dx;
},invalidateCacheKey:function(dy){delete this.__e[dy];
},add:function(dz,dA){if(this._checks[dz]==undefined){if(dA instanceof Function){this._checks[dz]=dA;
}else{this._checks[dz]=this.__i(dA);
}}},addAsync:function(dB,dC){if(this._checks[dB]==undefined){this._asyncChecks[dB]=dC;
}},getChecks:function(){return this._checks;
},getAsyncChecks:function(){return this._asyncChecks;
},_initDefaultQxValues:function(){this.add(cn,function(){return false;
});
this.add(v,function(){return false;
});
this.add(cA,function(){return 0;
});
this.add(bA,function(){return true;
});
this.add(bB,function(){return false;
});
this.add(F,function(){return true;
});
this.add(I,function(){return false;
});
this.add(bN,function(){return false;
});
this.add(bz,function(){return true;
});
this.add(bd,function(){return false;
});
this.add(ch,function(){return false;
});
this.add(be,function(){return false;
});
this.add(cF,function(){return false;
});
this.add(bj,function(){return false;
});
this.add(bk,function(){return false;
});
this.add(cx,function(){return false;
});
this.add(cc,function(){return false;
});
this.add(f,function(){return true;
});
this.add(K,function(){return true;
});
this.add(a,function(){return true;
});
this.add(e,function(){return true;
});
},__g:function(){if(qx&&qx.$$environment){for(var dE in qx.$$environment){var dD=qx.$$environment[dE];
this._checks[dE]=this.__i(dD);
}}},__h:function(){if(window.document&&window.document.location){var dF=window.document.location.search.slice(1).split(x);

for(var i=0;i<dF.length;i++){var dH=dF[i].split(cC);

if(dH.length!=3||dH[0]!=m){continue;
}var dI=dH[1];
var dG=decodeURIComponent(dH[2]);
if(dG==bh){dG=true;
}else if(dG==n){dG=false;
}else if(/^(\d|\.)+$/.test(dG)){dG=parseFloat(dG);
}this._checks[dI]=this.__i(dG);
}}},__i:function(dJ){return qx.Bootstrap.bind(function(dK){return dK;
},null,dJ);
}},defer:function(dL){dL._initDefaultQxValues();
dL.__g();
if(dL.get(cn)===true){dL.__h();
}}});
})();
(function(){var d="qx.core.Aspect",c="before",b="*",a="static";
qx.Bootstrap.define(d,{statics:{__j:[],wrap:function(e,f,g){var m=[];
var h=[];
var l=this.__j;
var k;

for(var i=0;i<l.length;i++){k=l[i];

if((k.type==null||g==k.type||k.type==b)&&(k.name==null||e.match(k.name))){k.pos==-1?m.push(k.fcn):h.push(k.fcn);
}}
if(m.length===0&&h.length===0){return f;
}var j=function(){for(var i=0;i<m.length;i++){m[i].call(this,e,f,g,arguments);
}var n=f.apply(this,arguments);

for(var i=0;i<h.length;i++){h[i].call(this,e,f,g,arguments,n);
}return n;
};

if(g!==a){j.self=f.self;
j.base=f.base;
}f.wrapper=j;
j.original=f;
return j;
},addAdvice:function(o,p,q,name){this.__j.push({fcn:o,pos:p===c?-1:1,type:q,name:name});
}}});
})();
(function(){var j="function",h="Boolean",g="qx.Interface",f="Array",e="]",d="toggle",c="Interface",b="is",a="[Interface ";
qx.Bootstrap.define(g,{statics:{define:function(name,k){if(k){if(k.extend&&!(qx.Bootstrap.getClass(k.extend)===f)){k.extend=[k.extend];
}var m=k.statics?k.statics:{};
if(k.extend){m.$$extends=k.extend;
}
if(k.properties){m.$$properties=k.properties;
}
if(k.members){m.$$members=k.members;
}
if(k.events){m.$$events=k.events;
}}else{var m={};
}m.$$type=c;
m.name=name;
m.toString=this.genericToString;
m.basename=qx.Bootstrap.createNamespace(name,m);
qx.Interface.$$registry[name]=m;
return m;
},getByName:function(name){return this.$$registry[name];
},isDefined:function(name){return this.getByName(name)!==undefined;
},getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);
},flatten:function(n){if(!n){return [];
}var o=n.concat();

for(var i=0,l=n.length;i<l;i++){if(n[i].$$extends){o.push.apply(o,this.flatten(n[i].$$extends));
}}return o;
},__k:function(p,q,r,s){var w=r.$$members;

if(w){for(var v in w){if(qx.Bootstrap.isFunction(w[v])){var u=this.__l(q,v);
var t=u||qx.Bootstrap.isFunction(p[v]);

if(!t){throw new Error('Implementation of method "'+v+'" is missing in class "'+q.classname+'" required by interface "'+r.name+'"');
}var x=s===true&&!u&&!qx.util.OOUtil.hasInterface(q,r);

if(x){p[v]=this.__o(r,p[v],v,w[v]);
}}else{if(typeof p[v]===undefined){if(typeof p[v]!==j){throw new Error('Implementation of member "'+v+'" is missing in class "'+q.classname+'" required by interface "'+r.name+'"');
}}}}}},__l:function(y,z){var D=z.match(/^(is|toggle|get|set|reset)(.*)$/);

if(!D){return false;
}var A=qx.Bootstrap.firstLow(D[2]);
var B=qx.util.OOUtil.getPropertyDefinition(y,A);

if(!B){return false;
}var C=D[0]==b||D[0]==d;

if(C){return qx.util.OOUtil.getPropertyDefinition(y,A).check==h;
}return true;
},__m:function(E,F){if(F.$$properties){for(var G in F.$$properties){if(!qx.util.OOUtil.getPropertyDefinition(E,G)){throw new Error('The property "'+G+'" is not supported by Class "'+E.classname+'"!');
}}}},__n:function(H,I){if(I.$$events){for(var J in I.$$events){if(!qx.util.OOUtil.supportsEvent(H,J)){throw new Error('The event "'+J+'" is not supported by Class "'+H.classname+'"!');
}}}},assertObject:function(K,L){var N=K.constructor;
this.__k(K,N,L,false);
this.__m(N,L);
this.__n(N,L);
var M=L.$$extends;

if(M){for(var i=0,l=M.length;i<l;i++){this.assertObject(K,M[i]);
}}},assert:function(O,P,Q){this.__k(O.prototype,O,P,Q);
this.__m(O,P);
this.__n(O,P);
var R=P.$$extends;

if(R){for(var i=0,l=R.length;i<l;i++){this.assert(O,R[i],Q);
}}},genericToString:function(){return a+this.name+e;
},$$registry:{},__o:function(){},__c:null,__d:function(){}}});
})();
(function(){var g="emulated",f="native",e='"',d="qx.lang.Core",c="\\\\",b="\\\"",a="[object Error]";
qx.Bootstrap.define(d,{statics:{errorToString:{"native":Error.prototype.toString,"emulated":function(){return this.message;
}}[(!Error.prototype.toString||Error.prototype.toString()==a)?g:f],arrayIndexOf:{"native":Array.prototype.indexOf,"emulated":function(h,j){if(j==null){j=0;
}else if(j<0){j=Math.max(0,this.length+j);
}
for(var i=j;i<this.length;i++){if(this[i]===h){return i;
}}return -1;
}}[Array.prototype.indexOf?f:g],arrayLastIndexOf:{"native":Array.prototype.lastIndexOf,"emulated":function(k,m){if(m==null){m=this.length-1;
}else if(m<0){m=Math.max(0,this.length+m);
}
for(var i=m;i>=0;i--){if(this[i]===k){return i;
}}return -1;
}}[Array.prototype.lastIndexOf?f:g],arrayForEach:{"native":Array.prototype.forEach,"emulated":function(n,o){var l=this.length;

for(var i=0;i<l;i++){var p=this[i];

if(p!==undefined){n.call(o||window,p,i,this);
}}}}[Array.prototype.forEach?f:g],arrayFilter:{"native":Array.prototype.filter,"emulated":function(q,r){var s=[];
var l=this.length;

for(var i=0;i<l;i++){var t=this[i];

if(t!==undefined){if(q.call(r||window,t,i,this)){s.push(this[i]);
}}}return s;
}}[Array.prototype.filter?f:g],arrayMap:{"native":Array.prototype.map,"emulated":function(u,v){var w=[];
var l=this.length;

for(var i=0;i<l;i++){var x=this[i];

if(x!==undefined){w[i]=u.call(v||window,x,i,this);
}}return w;
}}[Array.prototype.map?f:g],arraySome:{"native":Array.prototype.some,"emulated":function(y,z){var l=this.length;

for(var i=0;i<l;i++){var A=this[i];

if(A!==undefined){if(y.call(z||window,A,i,this)){return true;
}}}return false;
}}[Array.prototype.some?f:g],arrayEvery:{"native":Array.prototype.every,"emulated":function(B,C){var l=this.length;

for(var i=0;i<l;i++){var D=this[i];

if(D!==undefined){if(!B.call(C||window,D,i,this)){return false;
}}}return true;
}}[Array.prototype.every?f:g],stringQuote:{"native":String.prototype.quote,"emulated":function(){return e+this.replace(/\\/g,c).replace(/\"/g,b)+e;
}}[String.prototype.quote?f:g]}});
Error.prototype.toString=qx.lang.Core.errorToString;
Array.prototype.indexOf=qx.lang.Core.arrayIndexOf;
Array.prototype.lastIndexOf=qx.lang.Core.arrayLastIndexOf;
Array.prototype.forEach=qx.lang.Core.arrayForEach;
Array.prototype.filter=qx.lang.Core.arrayFilter;
Array.prototype.map=qx.lang.Core.arrayMap;
Array.prototype.some=qx.lang.Core.arraySome;
Array.prototype.every=qx.lang.Core.arrayEvery;
String.prototype.quote=qx.lang.Core.stringQuote;
})();
(function(){var bB=';',bA='return this.',bz="string",by="boolean",bx='!==undefined)',bw="this.",bv="",bu="set",bt="setThemed",bs="resetThemed",bh='else if(this.',bg="reset",bf="setRuntime",be="init",bd="();",bc='else ',bb='if(this.',ba="resetRuntime",Y="return this.",X="get",bI=";",bJ="(a[",bG=' of an instance of ',bH="refresh",bE=' is not (yet) ready!");',bF="]);",bC='qx.lang.Type.isString(value) && qx.util.ColorUtil.isValidPropertyValue(value)',bD='value !== null && qx.theme.manager.Font.getInstance().isDynamic(value)',bK='value !== null && value.nodeType === 9 && value.documentElement',bL='value !== null && value.$$type === "Mixin"',bl='return init;',bk='var init=this.',bn='value !== null && value.nodeType === 1 && value.attributes',bm="var parent = this.getLayoutParent();",bp="Error in property ",bo='qx.core.Assert.assertInstance(value, Date, msg) || true',br="if (!parent) return;",bq=" in method ",bj='qx.core.Assert.assertInstance(value, Error, msg) || true',bi='Undefined value is not allowed!',b="inherit",c='Is invalid!',d="MSIE 6.0",e="': ",f=" of class ",g='value !== null && value.nodeType !== undefined',h='value !== null && qx.theme.manager.Decoration.getInstance().isValidPropertyValue(value)',j="module.events",k='qx.core.Assert.assertPositiveInteger(value, msg) || true',m='if(init==qx.core.Property.$$inherit)init=null;',bP='value !== null && value.$$type === "Interface"',bO='var inherit=prop.$$inherit;',bN="var value = parent.",bM="$$useinit_",bT="(value);",bS='Requires exactly one argument!',bR="$$runtime_",bQ="$$user_",bV='qx.core.Assert.assertArray(value, msg) || true',bU='qx.core.Assert.assertPositiveNumber(value, msg) || true',H="Boolean",I='return value;',F='if(init==qx.core.Property.$$inherit)throw new Error("Inheritable property ',G='Does not allow any arguments!',L="()",M="var a=arguments[0] instanceof Array?arguments[0]:arguments;",J='value !== null && value.$$type === "Theme"',K="())",D='return null;',E='qx.core.Assert.assertObject(value, msg) || true',u='qx.core.Assert.assertString(value, msg) || true',t="if (value===undefined) value = parent.",w='value !== null && value.$$type === "Class"',v='qx.core.Assert.assertFunction(value, msg) || true',q="object",p="$$init_",s="$$theme_",r='qx.core.Assert.assertMap(value, msg) || true',o='qx.core.Assert.assertNumber(value, msg) || true',n='Null value is not allowed!',R='qx.core.Assert.assertInteger(value, msg) || true',S="rv:1.8.1",T="shorthand",U='qx.core.Assert.assertInstance(value, RegExp, msg) || true',N='value !== null && value.type !== undefined',O='value !== null && value.document',P='throw new Error("Property ',Q="(!this.",V='qx.core.Assert.assertBoolean(value, msg) || true',W="toggle",C="$$inherit_",B=" with incoming value '",A="a=qx.lang.Array.fromShortHand(qx.lang.Array.fromArguments(a));",z="qx.core.Property",y="is",x='Could not change or apply init value after constructing phase!';
qx.Bootstrap.define(z,{statics:{__p:function(){if(qx.core.Environment.get(j)){qx.event.type.Data;
qx.event.dispatch.Direct;
}},__q:{"Boolean":V,"String":u,"Number":o,"Integer":R,"PositiveNumber":bU,"PositiveInteger":k,"Error":bj,"RegExp":U,"Object":E,"Array":bV,"Map":r,"Function":v,"Date":bo,"Node":g,"Element":bn,"Document":bK,"Window":O,"Event":N,"Class":w,"Mixin":bL,"Interface":bP,"Theme":J,"Color":bC,"Decorator":h,"Font":bD},__r:{"Node":true,"Element":true,"Document":true,"Window":true,"Event":true},$$inherit:b,$$store:{runtime:{},user:{},theme:{},inherit:{},init:{},useinit:{}},$$method:{get:{},set:{},reset:{},init:{},refresh:{},setRuntime:{},resetRuntime:{},setThemed:{},resetThemed:{}},$$allowedKeys:{name:bz,dereference:by,inheritable:by,nullable:by,themeable:by,refine:by,init:null,apply:bz,event:bz,check:null,transform:bz,deferredInit:by,validate:null},$$allowedGroupKeys:{name:bz,group:q,mode:bz,themeable:by},$$inheritable:{},__s:function(bW){var bX=this.__t(bW);

if(!bX.length){var bY=function(){};
}else{bY=this.__u(bX);
}bW.prototype.$$refreshInheritables=bY;
},__t:function(ca){var cc=[];

while(ca){var cb=ca.$$properties;

if(cb){for(var name in this.$$inheritable){if(cb[name]&&cb[name].inheritable){cc.push(name);
}}}ca=ca.superclass;
}return cc;
},__u:function(cd){var ch=this.$$store.inherit;
var cg=this.$$store.init;
var cf=this.$$method.refresh;
var ce=[bm,br];

for(var i=0,l=cd.length;i<l;i++){var name=cd[i];
ce.push(bN,ch[name],bI,t,cg[name],bI,bw,cf[name],bT);
}return new Function(ce.join(bv));
},attachRefreshInheritables:function(ci){ci.prototype.$$refreshInheritables=function(){qx.core.Property.__s(ci);
return this.$$refreshInheritables();
};
},attachMethods:function(cj,name,ck){ck.group?this.__v(cj,ck,name):this.__w(cj,ck,name);
},__v:function(cl,cm,name){var ct=qx.Bootstrap.firstUp(name);
var cs=cl.prototype;
var cu=cm.themeable===true;
var cv=[];
var cp=[];

if(cu){var cn=[];
var cr=[];
}var cq=M;
cv.push(cq);

if(cu){cn.push(cq);
}
if(cm.mode==T){var co=A;
cv.push(co);

if(cu){cn.push(co);
}}
for(var i=0,a=cm.group,l=a.length;i<l;i++){cv.push(bw,this.$$method.set[a[i]],bJ,i,bF);
cp.push(bw,this.$$method.reset[a[i]],bd);

if(cu){cn.push(bw,this.$$method.setThemed[a[i]],bJ,i,bF);
cr.push(bw,this.$$method.resetThemed[a[i]],bd);
}}this.$$method.set[name]=bu+ct;
cs[this.$$method.set[name]]=new Function(cv.join(bv));
this.$$method.reset[name]=bg+ct;
cs[this.$$method.reset[name]]=new Function(cp.join(bv));

if(cu){this.$$method.setThemed[name]=bt+ct;
cs[this.$$method.setThemed[name]]=new Function(cn.join(bv));
this.$$method.resetThemed[name]=bs+ct;
cs[this.$$method.resetThemed[name]]=new Function(cr.join(bv));
}},__w:function(cw,cx,name){var cz=qx.Bootstrap.firstUp(name);
var cB=cw.prototype;
if(cx.dereference===undefined&&typeof cx.check===bz){cx.dereference=this.__x(cx.check);
}var cA=this.$$method;
var cy=this.$$store;
cy.runtime[name]=bR+name;
cy.user[name]=bQ+name;
cy.theme[name]=s+name;
cy.init[name]=p+name;
cy.inherit[name]=C+name;
cy.useinit[name]=bM+name;
cA.get[name]=X+cz;
cB[cA.get[name]]=function(){return qx.core.Property.executeOptimizedGetter(this,cw,name,X);
};
cA.set[name]=bu+cz;
cB[cA.set[name]]=function(cC){return qx.core.Property.executeOptimizedSetter(this,cw,name,bu,arguments);
};
cA.reset[name]=bg+cz;
cB[cA.reset[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,cw,name,bg);
};

if(cx.inheritable||cx.apply||cx.event||cx.deferredInit){cA.init[name]=be+cz;
cB[cA.init[name]]=function(cD){return qx.core.Property.executeOptimizedSetter(this,cw,name,be,arguments);
};
}
if(cx.inheritable){cA.refresh[name]=bH+cz;
cB[cA.refresh[name]]=function(cE){return qx.core.Property.executeOptimizedSetter(this,cw,name,bH,arguments);
};
}cA.setRuntime[name]=bf+cz;
cB[cA.setRuntime[name]]=function(cF){return qx.core.Property.executeOptimizedSetter(this,cw,name,bf,arguments);
};
cA.resetRuntime[name]=ba+cz;
cB[cA.resetRuntime[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,cw,name,ba);
};

if(cx.themeable){cA.setThemed[name]=bt+cz;
cB[cA.setThemed[name]]=function(cG){return qx.core.Property.executeOptimizedSetter(this,cw,name,bt,arguments);
};
cA.resetThemed[name]=bs+cz;
cB[cA.resetThemed[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,cw,name,bs);
};
}
if(cx.check===H){cB[W+cz]=new Function(Y+cA.set[name]+Q+cA.get[name]+K);
cB[y+cz]=new Function(Y+cA.get[name]+L);
}},__x:function(cH){return !!this.__r[cH];
},__y:function(cI){return this.__r[cI]||qx.util.OOUtil.classIsDefined(cI)||(qx.Interface&&qx.Interface.isDefined(cI));
},__z:{0:x,1:bS,2:bi,3:G,4:n,5:c},error:function(cJ,cK,cL,cM,cN){var cO=cJ.constructor.classname;
var cP=bp+cL+f+cO+bq+this.$$method[cM][cL]+B+cN+e;
throw new Error(cP+(this.__z[cK]||"Unknown reason: "+cK));
},__A:function(cQ,cR,name,cS,cT,cU){var cV=this.$$method[cS][name];
{cR[cV]=new Function("value",cT.join(""));
};
if(qx.core.Environment.get("qx.aspects")){cR[cV]=qx.core.Aspect.wrap(cQ.classname+"."+cV,cR[cV],"property");
}qx.Bootstrap.setDisplayName(cR[cV],cQ.classname+".prototype",cV);
if(cU===undefined){return cQ[cV]();
}else{return cQ[cV](cU[0]);
}},executeOptimizedGetter:function(cW,cX,name,cY){var db=cX.$$properties[name];
var dd=cX.prototype;
var da=[];
var dc=this.$$store;
da.push(bb,dc.runtime[name],bx);
da.push(bA,dc.runtime[name],bB);

if(db.inheritable){da.push(bh,dc.inherit[name],bx);
da.push(bA,dc.inherit[name],bB);
da.push(bc);
}da.push(bb,dc.user[name],bx);
da.push(bA,dc.user[name],bB);

if(db.themeable){da.push(bh,dc.theme[name],bx);
da.push(bA,dc.theme[name],bB);
}
if(db.deferredInit&&db.init===undefined){da.push(bh,dc.init[name],bx);
da.push(bA,dc.init[name],bB);
}da.push(bc);

if(db.init!==undefined){if(db.inheritable){da.push(bk,dc.init[name],bB);

if(db.nullable){da.push(m);
}else if(db.init!==undefined){da.push(bA,dc.init[name],bB);
}else{da.push(F,name,bG,cX.classname,bE);
}da.push(bl);
}else{da.push(bA,dc.init[name],bB);
}}else if(db.inheritable||db.nullable){da.push(D);
}else{da.push(P,name,bG,cX.classname,bE);
}return this.__A(cW,dd,name,cY,da);
},executeOptimizedSetter:function(de,df,name,dg,dh){var dm=df.$$properties[name];
var dl=df.prototype;
var dj=[];
var di=dg===bu||dg===bt||dg===bf||(dg===be&&dm.init===undefined);
var dk=dm.apply||dm.event||dm.inheritable;
var dn=this.__B(dg,name);
this.__C(dj,dm,name,dg,di);

if(di){this.__D(dj,df,dm,name);
}
if(dk){this.__E(dj,di,dn,dg);
}
if(dm.inheritable){dj.push(bO);
}
if(!dk){this.__G(dj,name,dg,di);
}else{this.__H(dj,dm,name,dg,di);
}
if(dm.inheritable){this.__I(dj,dm,name,dg);
}else if(dk){this.__J(dj,dm,name,dg);
}
if(dk){this.__K(dj,dm,name);
if(dm.inheritable&&dl._getChildren){this.__L(dj,name);
}}if(di){dj.push(I);
}return this.__A(de,dl,name,dg,dj,dh);
},__B:function(dp,name){if(dp==="setRuntime"||dp==="resetRuntime"){var dq=this.$$store.runtime[name];
}else if(dp==="setThemed"||dp==="resetThemed"){dq=this.$$store.theme[name];
}else if(dp==="init"){dq=this.$$store.init[name];
}else{dq=this.$$store.user[name];
}return dq;
},__C:function(dr,ds,name,dt,du){{if(!ds.nullable||ds.check||ds.inheritable){dr.push('var prop=qx.core.Property;');
}if(dt==="set"){dr.push('if(value===undefined)prop.error(this,2,"',name,'","',dt,'",value);');
}};
},__D:function(dv,dw,dx,name){if(dx.transform){dv.push('value=this.',dx.transform,'(value);');
}if(dx.validate){if(typeof dx.validate==="string"){dv.push('this.',dx.validate,'(value);');
}else if(dx.validate instanceof Function){dv.push(dw.classname,'.$$properties.',name);
dv.push('.validate.call(this, value);');
}}},__E:function(dy,dz,dA,dB){var dC=(dB==="reset"||dB==="resetThemed"||dB==="resetRuntime");

if(dz){dy.push('if(this.',dA,'===value)return value;');
}else if(dC){dy.push('if(this.',dA,'===undefined)return;');
}},__F:undefined,__G:function(dD,name,dE,dF){if(dE==="setRuntime"){dD.push('this.',this.$$store.runtime[name],'=value;');
}else if(dE==="resetRuntime"){dD.push('if(this.',this.$$store.runtime[name],'!==undefined)');
dD.push('delete this.',this.$$store.runtime[name],';');
}else if(dE==="set"){dD.push('this.',this.$$store.user[name],'=value;');
}else if(dE==="reset"){dD.push('if(this.',this.$$store.user[name],'!==undefined)');
dD.push('delete this.',this.$$store.user[name],';');
}else if(dE==="setThemed"){dD.push('this.',this.$$store.theme[name],'=value;');
}else if(dE==="resetThemed"){dD.push('if(this.',this.$$store.theme[name],'!==undefined)');
dD.push('delete this.',this.$$store.theme[name],';');
}else if(dE==="init"&&dF){dD.push('this.',this.$$store.init[name],'=value;');
}},__H:function(dG,dH,name,dI,dJ){if(dH.inheritable){dG.push('var computed, old=this.',this.$$store.inherit[name],';');
}else{dG.push('var computed, old;');
}dG.push('if(this.',this.$$store.runtime[name],'!==undefined){');

if(dI==="setRuntime"){dG.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(dI==="resetRuntime"){dG.push('delete this.',this.$$store.runtime[name],';');
dG.push('if(this.',this.$$store.user[name],'!==undefined)');
dG.push('computed=this.',this.$$store.user[name],';');
dG.push('else if(this.',this.$$store.theme[name],'!==undefined)');
dG.push('computed=this.',this.$$store.theme[name],';');
dG.push('else if(this.',this.$$store.init[name],'!==undefined){');
dG.push('computed=this.',this.$$store.init[name],';');
dG.push('this.',this.$$store.useinit[name],'=true;');
dG.push('}');
}else{dG.push('old=computed=this.',this.$$store.runtime[name],';');
if(dI==="set"){dG.push('this.',this.$$store.user[name],'=value;');
}else if(dI==="reset"){dG.push('delete this.',this.$$store.user[name],';');
}else if(dI==="setThemed"){dG.push('this.',this.$$store.theme[name],'=value;');
}else if(dI==="resetThemed"){dG.push('delete this.',this.$$store.theme[name],';');
}else if(dI==="init"&&dJ){dG.push('this.',this.$$store.init[name],'=value;');
}}dG.push('}');
dG.push('else if(this.',this.$$store.user[name],'!==undefined){');

if(dI==="set"){if(!dH.inheritable){dG.push('old=this.',this.$$store.user[name],';');
}dG.push('computed=this.',this.$$store.user[name],'=value;');
}else if(dI==="reset"){if(!dH.inheritable){dG.push('old=this.',this.$$store.user[name],';');
}dG.push('delete this.',this.$$store.user[name],';');
dG.push('if(this.',this.$$store.runtime[name],'!==undefined)');
dG.push('computed=this.',this.$$store.runtime[name],';');
dG.push('if(this.',this.$$store.theme[name],'!==undefined)');
dG.push('computed=this.',this.$$store.theme[name],';');
dG.push('else if(this.',this.$$store.init[name],'!==undefined){');
dG.push('computed=this.',this.$$store.init[name],';');
dG.push('this.',this.$$store.useinit[name],'=true;');
dG.push('}');
}else{if(dI==="setRuntime"){dG.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(dH.inheritable){dG.push('computed=this.',this.$$store.user[name],';');
}else{dG.push('old=computed=this.',this.$$store.user[name],';');
}if(dI==="setThemed"){dG.push('this.',this.$$store.theme[name],'=value;');
}else if(dI==="resetThemed"){dG.push('delete this.',this.$$store.theme[name],';');
}else if(dI==="init"&&dJ){dG.push('this.',this.$$store.init[name],'=value;');
}}dG.push('}');
if(dH.themeable){dG.push('else if(this.',this.$$store.theme[name],'!==undefined){');

if(!dH.inheritable){dG.push('old=this.',this.$$store.theme[name],';');
}
if(dI==="setRuntime"){dG.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(dI==="set"){dG.push('computed=this.',this.$$store.user[name],'=value;');
}else if(dI==="setThemed"){dG.push('computed=this.',this.$$store.theme[name],'=value;');
}else if(dI==="resetThemed"){dG.push('delete this.',this.$$store.theme[name],';');
dG.push('if(this.',this.$$store.init[name],'!==undefined){');
dG.push('computed=this.',this.$$store.init[name],';');
dG.push('this.',this.$$store.useinit[name],'=true;');
dG.push('}');
}else if(dI==="init"){if(dJ){dG.push('this.',this.$$store.init[name],'=value;');
}dG.push('computed=this.',this.$$store.theme[name],';');
}else if(dI==="refresh"){dG.push('computed=this.',this.$$store.theme[name],';');
}dG.push('}');
}dG.push('else if(this.',this.$$store.useinit[name],'){');

if(!dH.inheritable){dG.push('old=this.',this.$$store.init[name],';');
}
if(dI==="init"){if(dJ){dG.push('computed=this.',this.$$store.init[name],'=value;');
}else{dG.push('computed=this.',this.$$store.init[name],';');
}}else if(dI==="set"||dI==="setRuntime"||dI==="setThemed"||dI==="refresh"){dG.push('delete this.',this.$$store.useinit[name],';');

if(dI==="setRuntime"){dG.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(dI==="set"){dG.push('computed=this.',this.$$store.user[name],'=value;');
}else if(dI==="setThemed"){dG.push('computed=this.',this.$$store.theme[name],'=value;');
}else if(dI==="refresh"){dG.push('computed=this.',this.$$store.init[name],';');
}}dG.push('}');
if(dI==="set"||dI==="setRuntime"||dI==="setThemed"||dI==="init"){dG.push('else{');

if(dI==="setRuntime"){dG.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(dI==="set"){dG.push('computed=this.',this.$$store.user[name],'=value;');
}else if(dI==="setThemed"){dG.push('computed=this.',this.$$store.theme[name],'=value;');
}else if(dI==="init"){if(dJ){dG.push('computed=this.',this.$$store.init[name],'=value;');
}else{dG.push('computed=this.',this.$$store.init[name],';');
}dG.push('this.',this.$$store.useinit[name],'=true;');
}dG.push('}');
}},__I:function(dK,dL,name,dM){dK.push('if(computed===undefined||computed===inherit){');

if(dM==="refresh"){dK.push('computed=value;');
}else{dK.push('var pa=this.getLayoutParent();if(pa)computed=pa.',this.$$store.inherit[name],';');
}dK.push('if((computed===undefined||computed===inherit)&&');
dK.push('this.',this.$$store.init[name],'!==undefined&&');
dK.push('this.',this.$$store.init[name],'!==inherit){');
dK.push('computed=this.',this.$$store.init[name],';');
dK.push('this.',this.$$store.useinit[name],'=true;');
dK.push('}else{');
dK.push('delete this.',this.$$store.useinit[name],';}');
dK.push('}');
dK.push('if(old===computed)return value;');
dK.push('if(computed===inherit){');
dK.push('computed=undefined;delete this.',this.$$store.inherit[name],';');
dK.push('}');
dK.push('else if(computed===undefined)');
dK.push('delete this.',this.$$store.inherit[name],';');
dK.push('else this.',this.$$store.inherit[name],'=computed;');
dK.push('var backup=computed;');
if(dL.init!==undefined&&dM!=="init"){dK.push('if(old===undefined)old=this.',this.$$store.init[name],";");
}else{dK.push('if(old===undefined)old=null;');
}dK.push('if(computed===undefined||computed==inherit)computed=null;');
},__J:function(dN,dO,name,dP){if(dP!=="set"&&dP!=="setRuntime"&&dP!=="setThemed"){dN.push('if(computed===undefined)computed=null;');
}dN.push('if(old===computed)return value;');
if(dO.init!==undefined&&dP!=="init"){dN.push('if(old===undefined)old=this.',this.$$store.init[name],";");
}else{dN.push('if(old===undefined)old=null;');
}},__K:function(dQ,dR,name){if(dR.apply){dQ.push('this.',dR.apply,'(computed, old, "',name,'");');
}if(dR.event){dQ.push("var reg=qx.event.Registration;","if(reg.hasListener(this, '",dR.event,"')){","reg.fireEvent(this, '",dR.event,"', qx.event.type.Data, [computed, old]",")}");
}},__L:function(dS,name){dS.push('var a=this._getChildren();if(a)for(var i=0,l=a.length;i<l;i++){');
dS.push('if(a[i].',this.$$method.refresh[name],')a[i].',this.$$method.refresh[name],'(backup);');
dS.push('}');
}},defer:function(dT){var dV=navigator.userAgent.indexOf(d)!=-1;
var dU=navigator.userAgent.indexOf(S)!=-1;
if(dV||dU){dT.__x=dT.__y;
}}});
})();
(function(){var k="qx.aspects",j="Array",h=".",g="static",f="[Class ",e="]",d="constructor",c="extend",b="qx.Class";
qx.Bootstrap.define(b,{statics:{__M:qx.core.Environment.get("module.property")?qx.core.Property:null,define:function(name,m){if(!m){var m={};
}if(m.include&&!(qx.Bootstrap.getClass(m.include)===j)){m.include=[m.include];
}if(m.implement&&!(qx.Bootstrap.getClass(m.implement)===j)){m.implement=[m.implement];
}var n=false;

if(!m.hasOwnProperty(c)&&!m.type){m.type=g;
n=true;
}var o=this.__P(name,m.type,m.extend,m.statics,m.construct,m.destruct,m.include);
if(m.extend){if(m.properties){this.__R(o,m.properties,true);
}if(m.members){this.__T(o,m.members,true,true,false);
}if(m.events){this.__Q(o,m.events,true);
}if(m.include){for(var i=0,l=m.include.length;i<l;i++){this.__X(o,m.include[i],false);
}}}if(m.environment){for(var p in m.environment){qx.core.Environment.add(p,m.environment[p]);
}}if(m.implement){for(var i=0,l=m.implement.length;i<l;i++){this.__V(o,m.implement[i]);
}}if(m.defer){m.defer.self=o;
m.defer(o,o.prototype,{add:function(name,q){var r={};
r[name]=q;
qx.Class.__R(o,r,true);
}});
}return o;
},undefine:function(name){delete this.$$registry[name];
var s=name.split(h);
var u=[window];

for(var i=0;i<s.length;i++){u.push(u[i][s[i]]);
}for(var i=u.length-1;i>=1;i--){var t=u[i];
var parent=u[i-1];

if(qx.Bootstrap.isFunction(t)||qx.Bootstrap.objectGetLength(t)===0){delete parent[s[i-1]];
}else{break;
}}},isDefined:qx.util.OOUtil.classIsDefined,getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);
},getByName:qx.Bootstrap.getByName,include:function(v,w){qx.Class.__X(v,w,false);
},patch:function(x,y){qx.Class.__X(x,y,true);
},isSubClassOf:function(z,A){if(!z){return false;
}
if(z==A){return true;
}
if(z.prototype instanceof A){return true;
}return false;
},getPropertyDefinition:qx.util.OOUtil.getPropertyDefinition,getProperties:function(B){var C=[];

while(B){if(B.$$properties){C.push.apply(C,qx.Bootstrap.getKeys(B.$$properties));
}B=B.superclass;
}return C;
},getByProperty:function(D,name){while(D){if(D.$$properties&&D.$$properties[name]){return D;
}D=D.superclass;
}return null;
},hasProperty:qx.util.OOUtil.hasProperty,getEventType:qx.util.OOUtil.getEventType,supportsEvent:qx.util.OOUtil.supportsEvent,hasOwnMixin:function(E,F){return E.$$includes&&E.$$includes.indexOf(F)!==-1;
},getByMixin:function(G,H){var I,i,l;

while(G){if(G.$$includes){I=G.$$flatIncludes;

for(i=0,l=I.length;i<l;i++){if(I[i]===H){return G;
}}}G=G.superclass;
}return null;
},getMixins:qx.util.OOUtil.getMixins,hasMixin:function(J,K){return !!this.getByMixin(J,K);
},hasOwnInterface:function(L,M){return L.$$implements&&L.$$implements.indexOf(M)!==-1;
},getByInterface:qx.util.OOUtil.getByInterface,getInterfaces:function(N){var O=[];

while(N){if(N.$$implements){O.push.apply(O,N.$$flatImplements);
}N=N.superclass;
}return O;
},hasInterface:qx.util.OOUtil.hasInterface,implementsInterface:function(P,Q){var R=P.constructor;

if(this.hasInterface(R,Q)){return true;
}
try{qx.Interface.assertObject(P,Q);
return true;
}catch(S){}
try{qx.Interface.assert(R,Q,false);
return true;
}catch(T){}return false;
},getInstance:function(){if(!this.$$instance){this.$$allowconstruct=true;
this.$$instance=new this;
delete this.$$allowconstruct;
}return this.$$instance;
},genericToString:function(){return f+this.classname+e;
},$$registry:qx.Bootstrap.$$registry,__c:null,__N:null,__d:function(){},__O:function(){},__P:function(name,U,V,W,X,Y,ba){var bd;

if(!V&&qx.core.Environment.get("qx.aspects")==false){bd=W||{};
qx.Bootstrap.setDisplayNames(bd,name);
}else{var bd={};

if(V){if(!X){X=this.__Y();
}
if(this.__bb(V,ba)){bd=this.__bc(X,name,U);
}else{bd=X;
}if(U==="singleton"){bd.getInstance=this.getInstance;
}qx.Bootstrap.setDisplayName(X,name,"constructor");
}if(W){qx.Bootstrap.setDisplayNames(W,name);
var be;

for(var i=0,a=qx.Bootstrap.getKeys(W),l=a.length;i<l;i++){be=a[i];
var bb=W[be];

if(qx.core.Environment.get("qx.aspects")){if(bb instanceof Function){bb=qx.core.Aspect.wrap(name+"."+be,bb,"static");
}bd[be]=bb;
}else{bd[be]=bb;
}}}}var bc=qx.Bootstrap.createNamespace(name,bd);
bd.name=bd.classname=name;
bd.basename=bc;
bd.$$type="Class";

if(U){bd.$$classtype=U;
}if(!bd.hasOwnProperty("toString")){bd.toString=this.genericToString;
}
if(V){qx.Bootstrap.extendClass(bd,X,V,name,bc);
if(Y){if(qx.core.Environment.get("qx.aspects")){Y=qx.core.Aspect.wrap(name,Y,"destructor");
}bd.$$destructor=Y;
qx.Bootstrap.setDisplayName(Y,name,"destruct");
}}this.$$registry[name]=bd;
return bd;
},__Q:function(bf,bg,bh){var bi,bi;

if(bf.$$events){for(var bi in bg){bf.$$events[bi]=bg[bi];
}}else{bf.$$events=bg;
}},__R:function(bj,bk,bl){if(!qx.core.Environment.get("module.property")){throw new Error("Property module disabled.");
}var bm;

if(bl===undefined){bl=false;
}var bn=bj.prototype;

for(var name in bk){bm=bk[name];
bm.name=name;
if(!bm.refine){if(bj.$$properties===undefined){bj.$$properties={};
}bj.$$properties[name]=bm;
}if(bm.init!==undefined){bj.prototype["$$init_"+name]=bm.init;
}if(bm.event!==undefined){if(!qx.core.Environment.get("module.events")){throw new Error("Events module not enabled.");
}var event={};
event[bm.event]="qx.event.type.Data";
this.__Q(bj,event,bl);
}if(bm.inheritable){this.__M.$$inheritable[name]=true;

if(!bn.$$refreshInheritables){this.__M.attachRefreshInheritables(bj);
}}
if(!bm.refine){this.__M.attachMethods(bj,name,bm);
}}},__S:null,__T:function(bo,bp,bq,br,bs){var bt=bo.prototype;
var bv,bu;
qx.Bootstrap.setDisplayNames(bp,bo.classname+".prototype");

for(var i=0,a=qx.Bootstrap.getKeys(bp),l=a.length;i<l;i++){bv=a[i];
bu=bp[bv];
if(br!==false&&bu instanceof Function&&bu.$$type==null){if(bs==true){bu=this.__U(bu,bt[bv]);
}else{if(bt[bv]){bu.base=bt[bv];
}bu.self=bo;
}
if(qx.core.Environment.get("qx.aspects")){bu=qx.core.Aspect.wrap(bo.classname+"."+bv,bu,"member");
}}bt[bv]=bu;
}},__U:function(bw,bx){if(bx){return function(){var bz=bw.base;
bw.base=bx;
var by=bw.apply(this,arguments);
bw.base=bz;
return by;
};
}else{return bw;
}},__V:function(bA,bB){var bC=qx.Interface.flatten([bB]);

if(bA.$$implements){bA.$$implements.push(bB);
bA.$$flatImplements.push.apply(bA.$$flatImplements,bC);
}else{bA.$$implements=[bB];
bA.$$flatImplements=bC;
}},__W:function(bD){var name=bD.classname;
var bE=this.__bc(bD,name,bD.$$classtype);
for(var i=0,a=qx.Bootstrap.getKeys(bD),l=a.length;i<l;i++){bF=a[i];
bE[bF]=bD[bF];
}bE.prototype=bD.prototype;
var bH=bD.prototype;

for(var i=0,a=qx.Bootstrap.getKeys(bH),l=a.length;i<l;i++){bF=a[i];
var bI=bH[bF];
if(bI&&bI.self==bD){bI.self=bE;
}}for(var bF in this.$$registry){var bG=this.$$registry[bF];

if(!bG){continue;
}
if(bG.base==bD){bG.base=bE;
}
if(bG.superclass==bD){bG.superclass=bE;
}
if(bG.$$original){if(bG.$$original.base==bD){bG.$$original.base=bE;
}
if(bG.$$original.superclass==bD){bG.$$original.superclass=bE;
}}}qx.Bootstrap.createNamespace(name,bE);
this.$$registry[name]=bE;
return bE;
},__X:function(bJ,bK,bL){if(this.hasMixin(bJ,bK)){return;
}var bO=bJ.$$original;

if(bK.$$constructor&&!bO){bJ=this.__W(bJ);
}var bN=qx.Mixin.flatten([bK]);
var bM;

for(var i=0,l=bN.length;i<l;i++){bM=bN[i];
if(bM.$$events){this.__Q(bJ,bM.$$events,bL);
}if(bM.$$properties){this.__R(bJ,bM.$$properties,bL);
}if(bM.$$members){this.__T(bJ,bM.$$members,bL,bL,bL);
}}if(bJ.$$includes){bJ.$$includes.push(bK);
bJ.$$flatIncludes.push.apply(bJ.$$flatIncludes,bN);
}else{bJ.$$includes=[bK];
bJ.$$flatIncludes=bN;
}},__Y:function(){function bP(){bP.base.apply(this,arguments);
}return bP;
},__ba:function(){return function(){};
},__bb:function(bQ,bR){if(bQ&&bQ.$$includes){var bS=bQ.$$flatIncludes;

for(var i=0,l=bS.length;i<l;i++){if(bS[i].$$constructor){return true;
}}}if(bR){var bT=qx.Mixin.flatten(bR);

for(var i=0,l=bT.length;i<l;i++){if(bT[i].$$constructor){return true;
}}}return false;
},__bc:function(bU,name,bV){var bX=function(){var cb=bX;
var ca=cb.$$original.apply(this,arguments);
if(cb.$$includes){var bY=cb.$$flatIncludes;

for(var i=0,l=bY.length;i<l;i++){if(bY[i].$$constructor){bY[i].$$constructor.apply(this,arguments);
}}}return ca;
};

if(qx.core.Environment.get(k)){var bW=qx.core.Aspect.wrap(name,bX,d);
bX.$$original=bU;
bX.constructor=bW;
bX=bW;
}bX.$$original=bU;
bU.wrapper=bX;
return bX;
}},defer:function(){if(qx.core.Environment.get(k)){for(var cc in qx.Bootstrap.$$registry){var cd=qx.Bootstrap.$$registry[cc];

for(var ce in cd){if(cd[ce] instanceof Function){cd[ce]=qx.core.Aspect.wrap(cc+h+ce,cd[ce],g);
}}}}}});
})();
(function(){var k="indexOf",j="lastIndexOf",h="slice",g="concat",f="join",e="toLocaleUpperCase",d="shift",c="substr",b="filter",a="unshift",I="match",H="quote",G="qx.lang.Generics",F="localeCompare",E="sort",D="some",C="charAt",B="split",A="substring",z="pop",t="toUpperCase",u="replace",q="push",r="charCodeAt",o="every",p="reverse",m="search",n="forEach",v="map",w="toLowerCase",y="splice",x="toLocaleLowerCase";
qx.Class.define(G,{statics:{__bd:{"Array":[f,p,E,q,z,d,a,y,g,h,k,j,n,v,b,D,o],"String":[H,A,w,t,C,r,k,j,x,e,F,I,m,u,B,c,g,h]},__be:function(J,K){return function(s){return J.prototype[K].apply(s,Array.prototype.slice.call(arguments,1));
};
},__bf:function(){var L=qx.lang.Generics.__bd;

for(var P in L){var N=window[P];
var M=L[P];

for(var i=0,l=M.length;i<l;i++){var O=M[i];

if(!N[O]){N[O]=qx.lang.Generics.__be(N,O);
}}}}},defer:function(Q){Q.__bf();
}});
})();
(function(){var a="qx.data.MBinding";
qx.Mixin.define(a,{members:{bind:function(b,c,d,e){return qx.data.SingleValueBinding.bind(this,b,c,d,e);
},removeBinding:function(f){qx.data.SingleValueBinding.removeBindingFromObject(this,f);
},removeAllBindings:function(){qx.data.SingleValueBinding.removeAllBindingsForObject(this);
},getBindings:function(){return qx.data.SingleValueBinding.getAllBindingsForObject(this);
}}});
})();
(function(){var m="get",l="",k="[",h="last",g="change",f="]",d=".",c="Number",b="String",a="set",E="deepBinding",D="item",C="reset",B="' (",A="Boolean",z=") to the object '",y="Integer",x=" of object ",w="qx.data.SingleValueBinding",v="Binding property ",t="Binding from '",u="PositiveNumber",r="PositiveInteger",s="Binding does not exist!",p=").",q="Date",n=" not possible: No event available. ";
qx.Class.define(w,{statics:{__bg:{},bind:function(F,G,H,I,J){var U=this.__bi(F,G,H,I,J);
var P=G.split(d);
var L=this.__bo(P);
var T=[];
var Q=[];
var R=[];
var N=[];
var O=F;
try{for(var i=0;i<P.length;i++){if(L[i]!==l){N.push(g);
}else{N.push(this.__bj(O,P[i]));
}T[i]=O;
if(i==P.length-1){if(L[i]!==l){var Y=L[i]===h?O.length-1:L[i];
var K=O.getItem(Y);
this.__bn(K,H,I,J,F);
R[i]=this.__bp(O,N[i],H,I,J,L[i]);
}else{if(P[i]!=null&&O[m+qx.lang.String.firstUp(P[i])]!=null){var K=O[m+qx.lang.String.firstUp(P[i])]();
this.__bn(K,H,I,J,F);
}R[i]=this.__bp(O,N[i],H,I,J);
}}else{var V={index:i,propertyNames:P,sources:T,listenerIds:R,arrayIndexValues:L,targetObject:H,targetPropertyChain:I,options:J,listeners:Q};
var S=qx.lang.Function.bind(this.__bh,this,V);
Q.push(S);
R[i]=O.addListener(N[i],S);
}if(O[m+qx.lang.String.firstUp(P[i])]==null){O=null;
}else if(L[i]!==l){O=O[m+qx.lang.String.firstUp(P[i])](L[i]);
}else{O=O[m+qx.lang.String.firstUp(P[i])]();
}
if(!O){break;
}}}catch(ba){for(var i=0;i<T.length;i++){if(T[i]&&R[i]){T[i].removeListenerById(R[i]);
}}var X=U.targets;
var M=U.listenerIds[i];
for(var i=0;i<X.length;i++){if(X[i]&&M[i]){X[i].removeListenerById(M[i]);
}}throw ba;
}var W={type:E,listenerIds:R,sources:T,targetListenerIds:U.listenerIds,targets:U.targets};
this.__bq(W,F,G,H,I);
return W;
},__bh:function(bb){if(bb.options&&bb.options.onUpdate){bb.options.onUpdate(bb.sources[bb.index],bb.targetObject);
}for(var j=bb.index+1;j<bb.propertyNames.length;j++){var bf=bb.sources[j];
bb.sources[j]=null;

if(!bf){continue;
}bf.removeListenerById(bb.listenerIds[j]);
}var bf=bb.sources[bb.index];
for(var j=bb.index+1;j<bb.propertyNames.length;j++){if(bb.arrayIndexValues[j-1]!==l){bf=bf[m+qx.lang.String.firstUp(bb.propertyNames[j-1])](bb.arrayIndexValues[j-1]);
}else{bf=bf[m+qx.lang.String.firstUp(bb.propertyNames[j-1])]();
}bb.sources[j]=bf;
if(!bf){this.__bk(bb.targetObject,bb.targetPropertyChain);
break;
}if(j==bb.propertyNames.length-1){if(qx.Class.implementsInterface(bf,qx.data.IListData)){var bg=bb.arrayIndexValues[j]===h?bf.length-1:bb.arrayIndexValues[j];
var bd=bf.getItem(bg);
this.__bn(bd,bb.targetObject,bb.targetPropertyChain,bb.options,bb.sources[bb.index]);
bb.listenerIds[j]=this.__bp(bf,g,bb.targetObject,bb.targetPropertyChain,bb.options,bb.arrayIndexValues[j]);
}else{if(bb.propertyNames[j]!=null&&bf[m+qx.lang.String.firstUp(bb.propertyNames[j])]!=null){var bd=bf[m+qx.lang.String.firstUp(bb.propertyNames[j])]();
this.__bn(bd,bb.targetObject,bb.targetPropertyChain,bb.options,bb.sources[bb.index]);
}var be=this.__bj(bf,bb.propertyNames[j]);
bb.listenerIds[j]=this.__bp(bf,be,bb.targetObject,bb.targetPropertyChain,bb.options);
}}else{if(bb.listeners[j]==null){var bc=qx.lang.Function.bind(this.__bh,this,bb);
bb.listeners.push(bc);
}if(qx.Class.implementsInterface(bf,qx.data.IListData)){var be=g;
}else{var be=this.__bj(bf,bb.propertyNames[j]);
}bb.listenerIds[j]=bf.addListener(be,bb.listeners[j]);
}}},__bi:function(bh,bi,bj,bk,bl){var bp=bk.split(d);
var bn=this.__bo(bp);
var bu=[];
var bt=[];
var br=[];
var bq=[];
var bo=bj;
for(var i=0;i<bp.length-1;i++){if(bn[i]!==l){bq.push(g);
}else{try{bq.push(this.__bj(bo,bp[i]));
}catch(e){break;
}}bu[i]=bo;
var bs=function(){for(var j=i+1;j<bp.length-1;j++){var bx=bu[j];
bu[j]=null;

if(!bx){continue;
}bx.removeListenerById(br[j]);
}var bx=bu[i];
for(var j=i+1;j<bp.length-1;j++){var bv=qx.lang.String.firstUp(bp[j-1]);
if(bn[j-1]!==l){var by=bn[j-1]===h?bx.getLength()-1:bn[j-1];
bx=bx[m+bv](by);
}else{bx=bx[m+bv]();
}bu[j]=bx;
if(bt[j]==null){bt.push(bs);
}if(qx.Class.implementsInterface(bx,qx.data.IListData)){var bw=g;
}else{try{var bw=qx.data.SingleValueBinding.__bj(bx,bp[j]);
}catch(e){break;
}}br[j]=bx.addListener(bw,bt[j]);
}qx.data.SingleValueBinding.updateTarget(bh,bi,bj,bk,bl);
};
bt.push(bs);
br[i]=bo.addListener(bq[i],bs);
var bm=qx.lang.String.firstUp(bp[i]);
if(bo[m+bm]==null){bo=null;
}else if(bn[i]!==l){bo=bo[m+bm](bn[i]);
}else{bo=bo[m+bm]();
}
if(!bo){break;
}}return {listenerIds:br,targets:bu};
},updateTarget:function(bz,bA,bB,bC,bD){var bE=this.getValueFromObject(bz,bA);
bE=qx.data.SingleValueBinding.__br(bE,bB,bC,bD,bz);
this.__bl(bB,bC,bE);
},getValueFromObject:function(o,bF){var bJ=this.__bm(o,bF);
var bH;

if(bJ!=null){var bL=bF.substring(bF.lastIndexOf(d)+1,bF.length);
if(bL.charAt(bL.length-1)==f){var bG=bL.substring(bL.lastIndexOf(k)+1,bL.length-1);
var bI=bL.substring(0,bL.lastIndexOf(k));
var bK=bJ[m+qx.lang.String.firstUp(bI)]();

if(bG==h){bG=bK.length-1;
}
if(bK!=null){bH=bK.getItem(bG);
}}else{bH=bJ[m+qx.lang.String.firstUp(bL)]();
}}return bH;
},__bj:function(bM,bN){var bO=this.__bs(bM,bN);
if(bO==null){if(qx.Class.supportsEvent(bM.constructor,bN)){bO=bN;
}else if(qx.Class.supportsEvent(bM.constructor,g+qx.lang.String.firstUp(bN))){bO=g+qx.lang.String.firstUp(bN);
}else{throw new qx.core.AssertionError(v+bN+x+bM+n);
}}return bO;
},__bk:function(bP,bQ){var bR=this.__bm(bP,bQ);

if(bR!=null){var bS=bQ.substring(bQ.lastIndexOf(d)+1,bQ.length);
if(bS.charAt(bS.length-1)==f){this.__bl(bP,bQ,null);
return;
}if(bR[C+qx.lang.String.firstUp(bS)]!=undefined){bR[C+qx.lang.String.firstUp(bS)]();
}else{bR[a+qx.lang.String.firstUp(bS)](null);
}}},__bl:function(bT,bU,bV){var ca=this.__bm(bT,bU);

if(ca!=null){var cb=bU.substring(bU.lastIndexOf(d)+1,bU.length);
if(cb.charAt(cb.length-1)==f){var bW=cb.substring(cb.lastIndexOf(k)+1,cb.length-1);
var bY=cb.substring(0,cb.lastIndexOf(k));
var bX=bT;

if(!qx.Class.implementsInterface(bX,qx.data.IListData)){bX=ca[m+qx.lang.String.firstUp(bY)]();
}
if(bW==h){bW=bX.length-1;
}
if(bX!=null){bX.setItem(bW,bV);
}}else{ca[a+qx.lang.String.firstUp(cb)](bV);
}}},__bm:function(cc,cd){var cg=cd.split(d);
var ch=cc;
for(var i=0;i<cg.length-1;i++){try{var cf=cg[i];
if(cf.indexOf(f)==cf.length-1){var ce=cf.substring(cf.indexOf(k)+1,cf.length-1);
cf=cf.substring(0,cf.indexOf(k));
}if(cf!=l){ch=ch[m+qx.lang.String.firstUp(cf)]();
}if(ce!=null){if(ce==h){ce=ch.length-1;
}ch=ch.getItem(ce);
ce=null;
}}catch(ci){return null;
}}return ch;
},__bn:function(cj,ck,cl,cm,cn){cj=this.__br(cj,ck,cl,cm,cn);
if(cj===undefined){this.__bk(ck,cl);
}if(cj!==undefined){try{this.__bl(ck,cl,cj);
if(cm&&cm.onUpdate){cm.onUpdate(cn,ck,cj);
}}catch(e){if(!(e instanceof qx.core.ValidationError)){throw e;
}
if(cm&&cm.onSetFail){cm.onSetFail(e);
}else{qx.log.Logger.warn("Failed so set value "+cj+" on "+ck+". Error message: "+e);
}}}},__bo:function(co){var cp=[];
for(var i=0;i<co.length;i++){var name=co[i];
if(qx.lang.String.endsWith(name,f)){var cq=name.substring(name.indexOf(k)+1,name.indexOf(f));
if(name.indexOf(f)!=name.length-1){throw new Error("Please use only one array at a time: "+name+" does not work.");
}
if(cq!==h){if(cq==l||isNaN(parseInt(cq,10))){throw new Error("No number or 'last' value hast been given"+" in an array binding: "+name+" does not work.");
}}if(name.indexOf(k)!=0){co[i]=name.substring(0,name.indexOf(k));
cp[i]=l;
cp[i+1]=cq;
co.splice(i+1,0,D);
i++;
}else{cp[i]=cq;
co.splice(i,1,D);
}}else{cp[i]=l;
}}return cp;
},__bp:function(cr,cs,ct,cu,cv,cw){var cx;
var cz=function(cA,e){if(cA!==l){if(cA===h){cA=cr.length-1;
}var cD=cr.getItem(cA);
if(cD===undefined){qx.data.SingleValueBinding.__bk(ct,cu);
}var cB=e.getData().start;
var cC=e.getData().end;

if(cA<cB||cA>cC){return;
}}else{var cD=e.getData();
}cD=qx.data.SingleValueBinding.__br(cD,ct,cu,cv,cr);
try{if(cD!==undefined){qx.data.SingleValueBinding.__bl(ct,cu,cD);
}else{qx.data.SingleValueBinding.__bk(ct,cu);
}if(cv&&cv.onUpdate){cv.onUpdate(cr,ct,cD);
}}catch(e){if(!(e instanceof qx.core.ValidationError)){throw e;
}
if(cv&&cv.onSetFail){cv.onSetFail(e);
}else{qx.log.Logger.warn("Failed so set value "+cD+" on "+ct+". Error message: "+e);
}}};
if(!cw){cw=l;
}cz=qx.lang.Function.bind(cz,cr,cw);
var cy=cr.addListener(cs,cz);
return cy;
},__bq:function(cE,cF,cG,cH,cI){if(this.__bg[cF.toHashCode()]===undefined){this.__bg[cF.toHashCode()]=[];
}this.__bg[cF.toHashCode()].push([cE,cF,cG,cH,cI]);
},__br:function(cJ,cK,cL,cM,cN){if(cM&&cM.converter){var cP;

if(cK.getModel){cP=cK.getModel();
}return cM.converter(cJ,cP,cN,cK);
}else{var cR=this.__bm(cK,cL);
var cS=cL.substring(cL.lastIndexOf(d)+1,cL.length);
if(cR==null){return cJ;
}var cQ=qx.Class.getPropertyDefinition(cR.constructor,cS);
var cO=cQ==null?l:cQ.check;
return this.__bt(cJ,cO);
}},__bs:function(cT,cU){var cV=qx.Class.getPropertyDefinition(cT.constructor,cU);

if(cV==null){return null;
}return cV.event;
},__bt:function(cW,cX){var cY=qx.lang.Type.getClass(cW);
if((cY==c||cY==b)&&(cX==y||cX==r)){cW=parseInt(cW,10);
}if((cY==A||cY==c||cY==q)&&cX==b){cW=cW+l;
}if((cY==c||cY==b)&&(cX==c||cX==u)){cW=parseFloat(cW);
}return cW;
},removeBindingFromObject:function(da,db){if(db.type==E){for(var i=0;i<db.sources.length;i++){if(db.sources[i]){db.sources[i].removeListenerById(db.listenerIds[i]);
}}for(var i=0;i<db.targets.length;i++){if(db.targets[i]){db.targets[i].removeListenerById(db.targetListenerIds[i]);
}}}else{da.removeListenerById(db);
}var dc=this.__bg[da.toHashCode()];
if(dc!=undefined){for(var i=0;i<dc.length;i++){if(dc[i][0]==db){qx.lang.Array.remove(dc,dc[i]);
return;
}}}throw new Error("Binding could not be found!");
},removeAllBindingsForObject:function(dd){var de=this.__bg[dd.toHashCode()];

if(de!=undefined){for(var i=de.length-1;i>=0;i--){this.removeBindingFromObject(dd,de[i][0]);
}}},getAllBindingsForObject:function(df){if(this.__bg[df.toHashCode()]===undefined){this.__bg[df.toHashCode()]=[];
}return this.__bg[df.toHashCode()];
},removeAllBindings:function(){for(var dh in this.__bg){var dg=qx.core.ObjectRegistry.fromHashCode(dh);
if(dg==null){delete this.__bg[dh];
continue;
}this.removeAllBindingsForObject(dg);
}this.__bg={};
},getAllBindings:function(){return this.__bg;
},showBindingInLog:function(di,dj){var dl;
for(var i=0;i<this.__bg[di.toHashCode()].length;i++){if(this.__bg[di.toHashCode()][i][0]==dj){dl=this.__bg[di.toHashCode()][i];
break;
}}
if(dl===undefined){var dk=s;
}else{var dk=t+dl[1]+B+dl[2]+z+dl[3]+B+dl[4]+p;
}qx.log.Logger.debug(dk);
},showAllBindingsInLog:function(){for(var dn in this.__bg){var dm=qx.core.ObjectRegistry.fromHashCode(dn);

for(var i=0;i<this.__bg[dn].length;i++){this.showBindingInLog(dm,this.__bg[dn][i][0]);
}}}}});
})();
(function(){var p="",o="g",n="]",m='\\u',l="undefined",k='\\$1',j="0041-005A0061-007A00AA00B500BA00C0-00D600D8-00F600F8-02C102C6-02D102E0-02E402EC02EE0370-037403760377037A-037D03860388-038A038C038E-03A103A3-03F503F7-0481048A-05250531-055605590561-058705D0-05EA05F0-05F20621-064A066E066F0671-06D306D506E506E606EE06EF06FA-06FC06FF07100712-072F074D-07A507B107CA-07EA07F407F507FA0800-0815081A082408280904-0939093D09500958-0961097109720979-097F0985-098C098F09900993-09A809AA-09B009B209B6-09B909BD09CE09DC09DD09DF-09E109F009F10A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A59-0A5C0A5E0A72-0A740A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABD0AD00AE00AE10B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D0B5C0B5D0B5F-0B610B710B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BD00C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D0C580C590C600C610C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD0CDE0CE00CE10D05-0D0C0D0E-0D100D12-0D280D2A-0D390D3D0D600D610D7A-0D7F0D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60E01-0E300E320E330E40-0E460E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB00EB20EB30EBD0EC0-0EC40EC60EDC0EDD0F000F40-0F470F49-0F6C0F88-0F8B1000-102A103F1050-1055105A-105D106110651066106E-10701075-1081108E10A0-10C510D0-10FA10FC1100-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A1380-138F13A0-13F41401-166C166F-167F1681-169A16A0-16EA1700-170C170E-17111720-17311740-17511760-176C176E-17701780-17B317D717DC1820-18771880-18A818AA18B0-18F51900-191C1950-196D1970-19741980-19AB19C1-19C71A00-1A161A20-1A541AA71B05-1B331B45-1B4B1B83-1BA01BAE1BAF1C00-1C231C4D-1C4F1C5A-1C7D1CE9-1CEC1CEE-1CF11D00-1DBF1E00-1F151F18-1F1D1F20-1F451F48-1F4D1F50-1F571F591F5B1F5D1F5F-1F7D1F80-1FB41FB6-1FBC1FBE1FC2-1FC41FC6-1FCC1FD0-1FD31FD6-1FDB1FE0-1FEC1FF2-1FF41FF6-1FFC2071207F2090-209421022107210A-211321152119-211D212421262128212A-212D212F-2139213C-213F2145-2149214E218321842C00-2C2E2C30-2C5E2C60-2CE42CEB-2CEE2D00-2D252D30-2D652D6F2D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE2E2F300530063031-3035303B303C3041-3096309D-309F30A1-30FA30FC-30FF3105-312D3131-318E31A0-31B731F0-31FF3400-4DB54E00-9FCBA000-A48CA4D0-A4FDA500-A60CA610-A61FA62AA62BA640-A65FA662-A66EA67F-A697A6A0-A6E5A717-A71FA722-A788A78BA78CA7FB-A801A803-A805A807-A80AA80C-A822A840-A873A882-A8B3A8F2-A8F7A8FBA90A-A925A930-A946A960-A97CA984-A9B2A9CFAA00-AA28AA40-AA42AA44-AA4BAA60-AA76AA7AAA80-AAAFAAB1AAB5AAB6AAB9-AABDAAC0AAC2AADB-AADDABC0-ABE2AC00-D7A3D7B0-D7C6D7CB-D7FBF900-FA2DFA30-FA6DFA70-FAD9FB00-FB06FB13-FB17FB1DFB1F-FB28FB2A-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74FE76-FEFCFF21-FF3AFF41-FF5AFF66-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC",h='-',g="qx.lang.String",f="(^|[^",c="0",e="%",d=' ',b='\n',a="])[";
qx.Bootstrap.define(g,{statics:{__bu:j,__bv:null,__bw:{},camelCase:function(q){var r=this.__bw[q];

if(!r){r=q.replace(/\-([a-z])/g,function(s,t){return t.toUpperCase();
});
}return r;
},hyphenate:function(u){var v=this.__bw[u];

if(!v){v=u.replace(/[A-Z]/g,function(w){return (h+w.charAt(0).toLowerCase());
});
}return v;
},capitalize:function(x){if(this.__bv===null){var y=m;
this.__bv=new RegExp(f+this.__bu.replace(/[0-9A-F]{4}/g,function(z){return y+z;
})+a+this.__bu.replace(/[0-9A-F]{4}/g,function(A){return y+A;
})+n,o);
}return x.replace(this.__bv,function(B){return B.toUpperCase();
});
},clean:function(C){return this.trim(C.replace(/\s+/g,d));
},trimLeft:function(D){return D.replace(/^\s+/,p);
},trimRight:function(E){return E.replace(/\s+$/,p);
},trim:function(F){return F.replace(/^\s+|\s+$/g,p);
},startsWith:function(G,H){return G.indexOf(H)===0;
},endsWith:function(I,J){return I.substring(I.length-J.length,I.length)===J;
},repeat:function(K,L){return K.length>0?new Array(L+1).join(K):p;
},pad:function(M,length,N){var O=length-M.length;

if(O>0){if(typeof N===l){N=c;
}return this.repeat(N,O)+M;
}else{return M;
}},firstUp:qx.Bootstrap.firstUp,firstLow:qx.Bootstrap.firstLow,contains:function(P,Q){return P.indexOf(Q)!=-1;
},format:function(R,S){var T=R;
var i=S.length;

while(i--){T=T.replace(new RegExp(e+(i+1),o),S[i]+p);
}return T;
},escapeRegexpChars:function(U){return U.replace(/([.*+?^${}()|[\]\/\\])/g,k);
},toArray:function(V){return V.split(/\B|\b/g);
},stripTags:function(W){return W.replace(/<\/?[^>]+>/gi,p);
},stripScripts:function(X,Y){var bb=p;
var ba=X.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi,function(){bb+=arguments[1]+b;
return p;
});

if(Y===true){qx.lang.Function.globalEval(bb);
}return ba;
}}});
})();
(function(){var e="number",d="qx.lang.Array",c="string",b="[object Array]",a="qx";
qx.Bootstrap.define(d,{statics:{toArray:function(f,g){return this.cast(f,Array,g);
},cast:function(h,j,k){var i,l;

if(h.constructor===j){return h;
}
if(qx.data&&qx.data.IListData){if(qx.Class&&qx.Class.hasInterface(h,qx.data.IListData)){var h=h.toArray();
}}var m=new j;
if(Object.prototype.toString.call(h)===b&&k==null){m.push.apply(m,h);
}else{m.push.apply(m,Array.prototype.slice.call(h,k||0));
}return m;
},fromArguments:function(n,o){return Array.prototype.slice.call(n,o||0);
},fromCollection:function(p){var q,i,l;
return Array.prototype.slice.call(p,0);
},fromShortHand:function(r){var t=r.length;
var s=qx.lang.Array.clone(r);
switch(t){case 1:s[1]=s[2]=s[3]=s[0];
break;
case 2:s[2]=s[0];
case 3:s[3]=s[1];
}return s;
},clone:function(u){return u.concat();
},insertAt:function(v,w,i){v.splice(i,0,w);
return v;
},insertBefore:function(x,y,z){var i=x.indexOf(z);

if(i==-1){x.push(y);
}else{x.splice(i,0,y);
}return x;
},insertAfter:function(A,B,C){var i=A.indexOf(C);

if(i==-1||i==(A.length-1)){A.push(B);
}else{A.splice(i+1,0,B);
}return A;
},removeAt:function(D,i){return D.splice(i,1)[0];
},removeAll:function(E){E.length=0;
return this;
},append:function(F,G){Array.prototype.push.apply(F,G);
return F;
},exclude:function(H,I){for(var i=0,K=I.length,J;i<K;i++){J=H.indexOf(I[i]);

if(J!=-1){H.splice(J,1);
}}return H;
},remove:function(L,M){var i=L.indexOf(M);

if(i!=-1){L.splice(i,1);
return M;
}},contains:function(N,O){return N.indexOf(O)!==-1;
},equals:function(P,Q){var length=P.length;

if(length!==Q.length){return false;
}
for(var i=0;i<length;i++){if(P[i]!==Q[i]){return false;
}}return true;
},sum:function(R){var S=0;

for(var i=0,l=R.length;i<l;i++){S+=R[i];
}return S;
},max:function(T){var i,V=T.length,U=T[0];

for(i=1;i<V;i++){if(T[i]>U){U=T[i];
}}return U===undefined?null:U;
},min:function(W){var i,Y=W.length,X=W[0];

for(i=1;i<Y;i++){if(W[i]<X){X=W[i];
}}return X===undefined?null:X;
},unique:function(ba){var bk=[],bc={},bf={},bh={};
var bg,bb=0;
var bl=a+qx.lang.Date.now();
var bd=false,bj=false,bm=false;
for(var i=0,bi=ba.length;i<bi;i++){bg=ba[i];
if(bg===null){if(!bd){bd=true;
bk.push(bg);
}}else if(bg===undefined){}else if(bg===false){if(!bj){bj=true;
bk.push(bg);
}}else if(bg===true){if(!bm){bm=true;
bk.push(bg);
}}else if(typeof bg===c){if(!bc[bg]){bc[bg]=1;
bk.push(bg);
}}else if(typeof bg===e){if(!bf[bg]){bf[bg]=1;
bk.push(bg);
}}else{var be=bg[bl];

if(be==null){be=bg[bl]=bb++;
}
if(!bh[be]){bh[be]=bg;
bk.push(bg);
}}}for(var be in bh){try{delete bh[be][bl];
}catch(bn){try{bh[be][bl]=null;
}catch(bo){throw new Error("Cannot clean-up map entry doneObjects["+be+"]["+bl+"]");
}}}return bk;
}}});
})();
(function(){var a="qx.lang.Date";
qx.Class.define(a,{statics:{now:function(){return +new Date;
}}});
})();
(function(){var f="()",e=".",d=".prototype.",c='anonymous()',b="qx.lang.Function",a=".constructor()";
qx.Bootstrap.define(b,{statics:{getCaller:function(g){return g.caller?g.caller.callee:g.callee.caller;
},getName:function(h){if(h.displayName){return h.displayName;
}
if(h.$$original||h.wrapper||h.classname){return h.classname+a;
}
if(h.$$mixin){for(var j in h.$$mixin.$$members){if(h.$$mixin.$$members[j]==h){return h.$$mixin.name+d+j+f;
}}for(var j in h.$$mixin){if(h.$$mixin[j]==h){return h.$$mixin.name+e+j+f;
}}}
if(h.self){var k=h.self.constructor;

if(k){for(var j in k.prototype){if(k.prototype[j]==h){return k.classname+d+j+f;
}}for(var j in k){if(k[j]==h){return k.classname+e+j+f;
}}}}var i=h.toString().match(/function\s*(\w*)\s*\(.*/);

if(i&&i.length>=1&&i[1]){return i[1]+f;
}return c;
},globalEval:function(l){if(window.execScript){return window.execScript(l);
}else{return eval.call(window,l);
}},empty:function(){},returnTrue:function(){return true;
},returnFalse:function(){return false;
},returnNull:function(){return null;
},returnThis:function(){return this;
},returnZero:function(){return 0;
},create:function(m,n){if(!n){return m;
}if(!(n.self||n.args||n.delay!=null||n.periodical!=null||n.attempt)){return m;
}return function(event){var p=qx.lang.Array.fromArguments(arguments);
if(n.args){p=n.args.concat(p);
}
if(n.delay||n.periodical){var o=qx.event.GlobalError.observeMethod(function(){return m.apply(n.self||this,p);
});

if(n.delay){return window.setTimeout(o,n.delay);
}
if(n.periodical){return window.setInterval(o,n.periodical);
}}else if(n.attempt){var q=false;

try{q=m.apply(n.self||this,p);
}catch(r){}return q;
}else{return m.apply(n.self||this,p);
}};
},bind:function(s,self,t){return this.create(s,{self:self,args:arguments.length>2?qx.lang.Array.fromArguments(arguments,2):null});
},curry:function(u,v){return this.create(u,{args:arguments.length>1?qx.lang.Array.fromArguments(arguments,1):null});
},listener:function(w,self,x){if(arguments.length<3){return function(event){return w.call(self||this,event||window.event);
};
}else{var y=qx.lang.Array.fromArguments(arguments,2);
return function(event){var z=[event||window.event];
z.push.apply(z,y);
w.apply(self||this,z);
};
}},attempt:function(A,self,B){return this.create(A,{self:self,attempt:true,args:arguments.length>2?qx.lang.Array.fromArguments(arguments,2):null})();
},delay:function(C,D,self,E){return this.create(C,{delay:D,self:self,args:arguments.length>3?qx.lang.Array.fromArguments(arguments,3):null})();
},periodical:function(F,G,self,H){return this.create(F,{periodical:G,self:self,args:arguments.length>3?qx.lang.Array.fromArguments(arguments,3):null})();
}}});
})();
(function(){var b="qx.globalErrorHandling",a="qx.event.GlobalError";
qx.Bootstrap.define(a,{statics:{__bx:function(){if(qx.core&&qx.core.Environment){return qx.core.Environment.get(b);
}else{return !!qx.Bootstrap.getEnvironmentSetting(b);
}},setErrorHandler:function(c,d){this.__by=c||null;
this.__bz=d||window;

if(this.__bx()){if(c&&window.onerror){var e=qx.Bootstrap.bind(this.__bB,this);

if(this.__bA==null){this.__bA=window.onerror;
}var self=this;
window.onerror=function(f,g,h){self.__bA(f,g,h);
e(f,g,h);
};
}
if(c&&!window.onerror){window.onerror=qx.Bootstrap.bind(this.__bB,this);
}if(this.__by==null){if(this.__bA!=null){window.onerror=this.__bA;
this.__bA=null;
}else{window.onerror=null;
}}}},__bB:function(i,j,k){if(this.__by){this.handleError(new qx.core.WindowError(i,j,k));
return true;
}},observeMethod:function(l){if(this.__bx()){var self=this;
return function(){if(!self.__by){return l.apply(this,arguments);
}
try{return l.apply(this,arguments);
}catch(m){self.handleError(new qx.core.GlobalError(m,arguments));
}};
}else{return l;
}},handleError:function(n){if(this.__by){this.__by.call(this.__bz,n);
}}},defer:function(o){if(qx.core&&qx.core.Environment){qx.core.Environment.add(b,true);
}else{qx.Bootstrap.setEnvironmentSetting(b,true);
}o.setErrorHandler(null,null);
}});
})();
(function(){var b="",a="qx.core.WindowError";
qx.Bootstrap.define(a,{extend:Error,construct:function(c,d,e){Error.call(this,c);
this.__bC=c;
this.__bD=d||b;
this.__bE=e===undefined?-1:e;
},members:{__bC:null,__bD:null,__bE:null,toString:function(){return this.__bC;
},getUri:function(){return this.__bD;
},getLineNumber:function(){return this.__bE;
}}});
})();
(function(){var b="GlobalError: ",a="qx.core.GlobalError";
qx.Bootstrap.define(a,{extend:Error,construct:function(c,d){if(qx.Bootstrap.DEBUG){qx.core.Assert.assertNotUndefined(c);
}this.__bC=b+(c&&c.message?c.message:c);
Error.call(this,this.__bC);
this.__bF=d;
this.__bG=c;
},members:{__bG:null,__bF:null,__bC:null,toString:function(){return this.__bC;
},getArguments:function(){return this.__bF;
},getSourceException:function(){return this.__bG;
}},destruct:function(){this.__bG=null;
this.__bF=null;
this.__bC=null;
}});
})();
(function(){var f="qx.lang.Type",e="Error",d="RegExp",c="Date",b="Number",a="Boolean";
qx.Bootstrap.define(f,{statics:{getClass:qx.Bootstrap.getClass,isString:qx.Bootstrap.isString,isArray:qx.Bootstrap.isArray,isObject:qx.Bootstrap.isObject,isFunction:qx.Bootstrap.isFunction,isRegExp:function(g){return this.getClass(g)==d;
},isNumber:function(h){return (h!==null&&(this.getClass(h)==b||h instanceof Number));
},isBoolean:function(i){return (i!==null&&(this.getClass(i)==a||i instanceof Boolean));
},isDate:function(j){return (j!==null&&(this.getClass(j)==c||j instanceof Date));
},isError:function(k){return (k!==null&&(this.getClass(k)==e||k instanceof Error));
}}});
})();
(function(){var p="",o="!",n="'!",m="'",k="Expected '",j="' (rgb(",h=",",g=")), but found value '",f="Event (",d="Expected value to be the CSS color '",bz="' but found ",by="]",bx=", ",bw="The value '",bv=" != ",bu="qx.core.Object",bt="Expected value to be an array but found ",bs=") was fired.",br="Expected value to be an integer >= 0 but found ",bq="' to be not equal with '",w="' to '",x="Expected object '",u="Called assertTrue with '",v="Expected value to be a map but found ",s="The function did not raise an exception!",t="Expected value to be undefined but found ",q="Expected value to be a DOM element but found  '",r="Expected value to be a regular expression but found ",E="' to implement the interface '",F="Expected value to be null but found ",S="Invalid argument 'type'",O="Called assert with 'false'",bb="Assertion error! ",V="null",bm="' but found '",bg="' must must be a key of the map '",J="The String '",bp="Expected value to be a string but found ",bo="Expected value not to be undefined but found undefined!",bn="qx.util.ColorUtil",I=": ",L="The raised exception does not have the expected type! ",N=") not fired.",Q="qx.core.Assert",T="Expected value to be typeof object but found ",W="' (identical) but found '",bd="' must have any of the values defined in the array '",bi="Expected value to be a number but found ",y="Called assertFalse with '",z="qx.ui.core.Widget",K="Expected value to be a qooxdoo object but found ",ba="' arguments.",Y="Expected value '%1' to be in the range '%2'..'%3'!",X="Array[",bf="' does not match the regular expression '",be="' to be not identical with '",U="Expected [",bc="' arguments but found '",a="', which cannot be converted to a CSS color!",bh="qx.core.AssertionError",A="Expected value to be a boolean but found ",B="Expected value not to be null but found null!",P="))!",b="Expected value to be a qooxdoo widget but found ",c="Expected value to be typeof '",H="Expected value to be typeof function but found ",C="Expected value to be an integer but found ",D="Called fail().",G="The parameter 're' must be a string or a regular expression.",R="Expected value to be a number >= 0 but found ",bk="Expected value to be instanceof '",bj="], but found [",M="Wrong number of arguments given. Expected '",bl="object";
qx.Class.define(Q,{statics:{__bH:true,__bI:function(bA,bB){var bF=p;

for(var i=1,l=arguments.length;i<l;i++){bF=bF+this.__bJ(arguments[i]);
}var bE=p;

if(bF){bE=bA+I+bF;
}else{bE=bA;
}var bD=bb+bE;

if(qx.Class.isDefined(bh)){var bC=new qx.core.AssertionError(bA,bF);

if(this.__bH){qx.Bootstrap.error(bD+"\n Stack trace: \n"+bC.getStackTrace());
}throw bC;
}else{if(this.__bH){qx.Bootstrap.error(bD);
}throw new Error(bD);
}},__bJ:function(bG){var bH;

if(bG===null){bH=V;
}else if(qx.lang.Type.isArray(bG)&&bG.length>10){bH=X+bG.length+by;
}else if((bG instanceof Object)&&(bG.toString==null)){bH=qx.lang.Json.stringify(bG,null,2);
}else{try{bH=bG.toString();
}catch(e){bH=p;
}}return bH;
},assert:function(bI,bJ){bI==true||this.__bI(bJ||p,O);
},fail:function(bK,bL){var bM=bL?p:D;
this.__bI(bK||p,bM);
},assertTrue:function(bN,bO){(bN===true)||this.__bI(bO||p,u,bN,m);
},assertFalse:function(bP,bQ){(bP===false)||this.__bI(bQ||p,y,bP,m);
},assertEquals:function(bR,bS,bT){bR==bS||this.__bI(bT||p,k,bR,bm,bS,n);
},assertNotEquals:function(bU,bV,bW){bU!=bV||this.__bI(bW||p,k,bU,bq,bV,n);
},assertIdentical:function(bX,bY,ca){bX===bY||this.__bI(ca||p,k,bX,W,bY,n);
},assertNotIdentical:function(cb,cc,cd){cb!==cc||this.__bI(cd||p,k,cb,be,cc,n);
},assertNotUndefined:function(ce,cf){ce!==undefined||this.__bI(cf||p,bo);
},assertUndefined:function(cg,ch){cg===undefined||this.__bI(ch||p,t,cg,o);
},assertNotNull:function(ci,cj){ci!==null||this.__bI(cj||p,B);
},assertNull:function(ck,cl){ck===null||this.__bI(cl||p,F,ck,o);
},assertJsonEquals:function(cm,cn,co){this.assertEquals(qx.lang.Json.stringify(cm),qx.lang.Json.stringify(cn),co);
},assertMatch:function(cp,cq,cr){this.assertString(cp);
this.assert(qx.lang.Type.isRegExp(cq)||qx.lang.Type.isString(cq),G);
cp.search(cq)>=0||this.__bI(cr||p,J,cp,bf,cq.toString(),n);
},assertArgumentsCount:function(cs,ct,cu,cv){var cw=cs.length;
(cw>=ct&&cw<=cu)||this.__bI(cv||p,M,ct,w,cu,bc,arguments.length,ba);
},assertEventFired:function(cx,event,cy,cz,cA){var cC=false;
var cB=function(e){if(cz){cz.call(cx,e);
}cC=true;
};
var cD;

try{cD=cx.addListener(event,cB,cx);
cy.call();
}catch(cE){throw cE;
}finally{try{cx.removeListenerById(cD);
}catch(cF){}}cC===true||this.__bI(cA||p,f,event,N);
},assertEventNotFired:function(cG,event,cH,cI){var cK=false;
var cJ=function(e){cK=true;
};
var cL=cG.addListener(event,cJ,cG);
cH.call();
cK===false||this.__bI(cI||p,f,event,bs);
cG.removeListenerById(cL);
},assertException:function(cM,cN,cO,cP){var cN=cN||Error;
var cQ;

try{this.__bH=false;
cM();
}catch(cR){cQ=cR;
}finally{this.__bH=true;
}
if(cQ==null){this.__bI(cP||p,s);
}cQ instanceof cN||this.__bI(cP||p,L,cN,bv,cQ);

if(cO){this.assertMatch(cQ.toString(),cO,cP);
}},assertInArray:function(cS,cT,cU){cT.indexOf(cS)!==-1||this.__bI(cU||p,bw,cS,bd,cT,m);
},assertArrayEquals:function(cV,cW,cX){this.assertArray(cV,cX);
this.assertArray(cW,cX);
cX=cX||U+cV.join(bx)+bj+cW.join(bx)+by;

if(cV.length!==cW.length){this.fail(cX,true);
}
for(var i=0;i<cV.length;i++){if(cV[i]!==cW[i]){this.fail(cX,true);
}}},assertKeyInMap:function(cY,da,db){da[cY]!==undefined||this.__bI(db||p,bw,cY,bg,da,m);
},assertFunction:function(dc,dd){qx.lang.Type.isFunction(dc)||this.__bI(dd||p,H,dc,o);
},assertString:function(de,df){qx.lang.Type.isString(de)||this.__bI(df||p,bp,de,o);
},assertBoolean:function(dg,dh){qx.lang.Type.isBoolean(dg)||this.__bI(dh||p,A,dg,o);
},assertNumber:function(di,dj){(qx.lang.Type.isNumber(di)&&isFinite(di))||this.__bI(dj||p,bi,di,o);
},assertPositiveNumber:function(dk,dl){(qx.lang.Type.isNumber(dk)&&isFinite(dk)&&dk>=0)||this.__bI(dl||p,R,dk,o);
},assertInteger:function(dm,dn){(qx.lang.Type.isNumber(dm)&&isFinite(dm)&&dm%1===0)||this.__bI(dn||p,C,dm,o);
},assertPositiveInteger:function(dp,dq){var dr=(qx.lang.Type.isNumber(dp)&&isFinite(dp)&&dp%1===0&&dp>=0);
dr||this.__bI(dq||p,br,dp,o);
},assertInRange:function(ds,dt,du,dv){(ds>=dt&&ds<=du)||this.__bI(dv||p,qx.lang.String.format(Y,[ds,dt,du]));
},assertObject:function(dw,dx){var dy=dw!==null&&(qx.lang.Type.isObject(dw)||typeof dw===bl);
dy||this.__bI(dx||p,T,(dw),o);
},assertArray:function(dz,dA){qx.lang.Type.isArray(dz)||this.__bI(dA||p,bt,dz,o);
},assertMap:function(dB,dC){qx.lang.Type.isObject(dB)||this.__bI(dC||p,v,dB,o);
},assertRegExp:function(dD,dE){qx.lang.Type.isRegExp(dD)||this.__bI(dE||p,r,dD,o);
},assertType:function(dF,dG,dH){this.assertString(dG,S);
typeof (dF)===dG||this.__bI(dH||p,c,dG,bz,dF,o);
},assertInstance:function(dI,dJ,dK){var dL=dJ.classname||dJ+p;
dI instanceof dJ||this.__bI(dK||p,bk,dL,bz,dI,o);
},assertInterface:function(dM,dN,dO){qx.Class.implementsInterface(dM,dN)||this.__bI(dO||p,x,dM,E,dN,n);
},assertCssColor:function(dP,dQ,dR){var dS=qx.Class.getByName(bn);

if(!dS){throw new Error("qx.util.ColorUtil not available! Your code must have a dependency on 'qx.util.ColorUtil'");
}var dU=dS.stringToRgb(dP);

try{var dT=dS.stringToRgb(dQ);
}catch(dW){this.__bI(dR||p,d,dP,j,dU.join(h),g,dQ,a);
}var dV=dU[0]==dT[0]&&dU[1]==dT[1]&&dU[2]==dT[2];
dV||this.__bI(dR||p,d,dU,j,dU.join(h),g,dQ,j,dT.join(h),P);
},assertElement:function(dX,dY){!!(dX&&dX.nodeType===1)||this.__bI(dY||p,q,dX,n);
},assertQxObject:function(ea,eb){this.__bK(ea,bu)||this.__bI(eb||p,K,ea,o);
},assertQxWidget:function(ec,ed){this.__bK(ec,z)||this.__bI(ed||p,b,ec,o);
},__bK:function(ee,ef){if(!ee){return false;
}var eg=ee.constructor;

while(eg){if(eg.classname===ef){return true;
}eg=eg.superclass;
}return false;
}}});
})();
(function(){var c="",b=": ",a="qx.type.BaseError";
qx.Class.define(a,{extend:Error,construct:function(d,e){Error.call(this,e);
this.__bL=d||c;
this.message=e||qx.type.BaseError.DEFAULTMESSAGE;
},statics:{DEFAULTMESSAGE:"error"},members:{__bL:null,message:null,getComment:function(){return this.__bL;
},toString:function(){return this.__bL+(this.message?b+this.message:c);
}}});
})();
(function(){var a="qx.core.AssertionError";
qx.Class.define(a,{extend:qx.type.BaseError,construct:function(b,c){qx.type.BaseError.call(this,b,c);
this.__bM=qx.dev.StackTrace.getStackTrace();
},members:{__bM:null,getStackTrace:function(){return this.__bM;
}}});
})();
(function(){var n=":",m="function",l="ecmascript.stacktrace",k="Error created at",j="stack",h="qx.dev.StackTrace",g="",f="\n",e="?",d="/source/class/",a="...",c="stacktrace",b=".";
qx.Bootstrap.define(h,{statics:{FILENAME_TO_CLASSNAME:null,FORMAT_STACKTRACE:null,getStackTrace:function(){return this.getStackTraceFromCaller(arguments);
},getStackTraceFromCaller:function(o){var t=[];
var s=qx.lang.Function.getCaller(o);
var p={};

while(s){var q=qx.lang.Function.getName(s);
t.push(q);

try{s=s.caller;
}catch(u){break;
}
if(!s){break;
}var r=qx.core.ObjectRegistry.toHashCode(s);

if(p[r]){t.push(a);
break;
}p[r]=s;
}return t;
},getStackTraceFromError:function(v){var z=[];

if(qx.core.Environment.get(l)===j){var K=/@(.+):(\d+)$/gm;
var y;

while((y=K.exec(v.stack))!=null){var B=y[1];
var I=y[2];
var G=this.__bN(B);
z.push(G+n+I);
}
if(z.length>0){return this.__bP(z);
}var K=/at (.*)/gm;
var J=/\((.*?)(:[^\/].*)\)/;
var F=/(.*?)(:[^\/].*)/;
var y;

while((y=K.exec(v.stack))!=null){var E=J.exec(y[1]);

if(!E){E=F.exec(y[1]);
}
if(E){var G=this.__bN(E[1]);
z.push(G+E[2]);
}else{z.push(y[1]);
}}}else if(qx.core.Environment.get(l)===c){var x=v.stacktrace;

if(x.indexOf(k)>=0){x=x.split(k)[0];
}var K=/line\ (\d+?),\ column\ (\d+?)\ in\ (?:.*?)\ in\ (.*?):[^\/]/gm;
var y;

while((y=K.exec(x))!=null){var I=y[1];
var A=y[2];
var B=y[3];
var G=this.__bN(B);
z.push(G+n+I+n+A);
}
if(z.length>0){return this.__bP(z);
}var K=/Line\ (\d+?)\ of\ linked\ script\ (.*?)$/gm;
var y;

while((y=K.exec(x))!=null){var I=y[1];
var B=y[2];
var G=this.__bN(B);
z.push(G+n+I);
}}else if(v.message&&v.message.indexOf("Backtrace:")>=0){var D=qx.lang.String.trim(v.message.split("Backtrace:")[1]);
var C=D.split(f);

for(var i=0;i<C.length;i++){var w=C[i].match(/\s*Line ([0-9]+) of.* (\S.*)/);

if(w&&w.length>=2){var I=w[1];
var H=this.__bN(w[2]);
z.push(H+n+I);
}}}else if(v.sourceURL&&v.line){z.push(this.__bN(v.sourceURL)+n+v.line);
}return this.__bP(z);
},__bN:function(L){if(typeof qx.dev.StackTrace.FILENAME_TO_CLASSNAME==m){return qx.dev.StackTrace.FILENAME_TO_CLASSNAME(L);
}return qx.dev.StackTrace.__bO(L);
},__bO:function(M){var Q=d;
var N=M.indexOf(Q);
var P=M.indexOf(e);

if(P>=0){M=M.substring(0,P);
}var O=(N==-1)?M:M.substring(N+Q.length).replace(/\//g,b).replace(/\.js$/,g);
return O;
},__bP:function(R){if(typeof qx.dev.StackTrace.FORMAT_STACKTRACE==m){return qx.dev.StackTrace.FORMAT_STACKTRACE(R);
}return R;
}}});
})();
(function(){var g="$$hash",f="qx.core.ObjectRegistry",e="-",d="",c="-0";
qx.Class.define(f,{statics:{inShutDown:false,__j:{},__bQ:0,__bR:[],__bS:d,__bT:{},register:function(h){var m=this.__j;

if(!m){return;
}var k=h.$$hash;

if(k==null){var j=this.__bR;

if(j.length>0&&true){k=j.pop();
}else{k=(this.__bQ++)+this.__bS;
}h.$$hash=k;
}m[k]=h;
},unregister:function(n){var o=n.$$hash;

if(o==null){return;
}var p=this.__j;

if(p&&p[o]){delete p[o];
this.__bR.push(o);
}try{delete n.$$hash;
}catch(q){if(n.removeAttribute){n.removeAttribute(g);
}}},toHashCode:function(r){var t=r.$$hash;

if(t!=null){return t;
}var s=this.__bR;

if(s.length>0){t=s.pop();
}else{t=(this.__bQ++)+this.__bS;
}return r.$$hash=t;
},clearHashCode:function(u){var v=u.$$hash;

if(v!=null){this.__bR.push(v);
try{delete u.$$hash;
}catch(w){if(u.removeAttribute){u.removeAttribute(g);
}}}},fromHashCode:function(x){return this.__j[x]||null;
},shutdown:function(){this.inShutDown=true;
var z=this.__j;
var B=[];

for(var A in z){B.push(A);
}B.sort(function(a,b){return parseInt(b,10)-parseInt(a,10);
});
var y,i=0,l=B.length;

while(true){try{for(;i<l;i++){A=B[i];
y=z[A];

if(y&&y.dispose){y.dispose();
}}}catch(C){qx.Bootstrap.error(this,"Could not dispose object "+y.toString()+": "+C,C);

if(i!==l){i++;
continue;
}}break;
}qx.Bootstrap.debug(this,"Disposed "+l+" objects");
delete this.__j;
},getRegistry:function(){return this.__j;
},getNextHash:function(){return this.__bQ;
},getPostId:function(){return this.__bS;
},getStackTraces:function(){return this.__bT;
}},defer:function(D){if(window&&window.top){var frames=window.top.frames;

for(var i=0;i<frames.length;i++){if(frames[i]===window){D.__bS=e+(i+1);
return;
}}}D.__bS=c;
}});
})();
(function(){var f="ecmascript.objectcount",d="stack",c="ecmascript.stacktrace",b="stacktrace",a="qx.bom.client.EcmaScript";
qx.Bootstrap.define(a,{statics:{getObjectCount:function(){return (({}).__count__==0);
},getStackTrace:function(){var e=new Error();
return e.stacktrace?b:e.stack?d:null;
}},defer:function(g){qx.core.Environment.add(f,g.getObjectCount);
qx.core.Environment.add(c,g.getStackTrace);
}});
})();
(function(){var p='',o='"',m=':',l=']',h='null',g=': ',f='object',e='function',d=',',b='\n',ba='\\u',Y=',\n',X='0000',W='string',V="Cannot stringify a recursive object.",U='0',T='-',S='}',R='String',Q='Boolean',x='\\\\',y='\\f',u='\\t',w='{\n',s='[]',t="qx.lang.JsonImpl",q='Z',r='\\n',z='Object',A='{}',H='@',F='.',K='(',J='Array',M='T',L='\\r',C='{',P='JSON.parse',O=' ',N='[',B='Number',D=')',E='[\n',G='\\"',I='\\b';
qx.Class.define(t,{extend:Object,construct:function(){this.stringify=qx.lang.Function.bind(this.stringify,this);
this.parse=qx.lang.Function.bind(this.parse,this);
},members:{__bU:null,__bV:null,__bW:null,__bX:null,stringify:function(bb,bc,bd){this.__bU=p;
this.__bV=p;
this.__bX=[];

if(qx.lang.Type.isNumber(bd)){var bd=Math.min(10,Math.floor(bd));

for(var i=0;i<bd;i+=1){this.__bV+=O;
}}else if(qx.lang.Type.isString(bd)){if(bd.length>10){bd=bd.slice(0,10);
}this.__bV=bd;
}if(bc&&(qx.lang.Type.isFunction(bc)||qx.lang.Type.isArray(bc))){this.__bW=bc;
}else{this.__bW=null;
}return this.__bY(p,{'':bb});
},__bY:function(be,bf){var bi=this.__bU,bg,bj=bf[be];
if(bj&&qx.lang.Type.isFunction(bj.toJSON)){bj=bj.toJSON(be);
}else if(qx.lang.Type.isDate(bj)){bj=this.dateToJSON(bj);
}if(typeof this.__bW===e){bj=this.__bW.call(bf,be,bj);
}
if(bj===null){return h;
}
if(bj===undefined){return undefined;
}switch(qx.lang.Type.getClass(bj)){case R:return this.__ca(bj);
case B:return isFinite(bj)?String(bj):h;
case Q:return String(bj);
case J:this.__bU+=this.__bV;
bg=[];

if(this.__bX.indexOf(bj)!==-1){throw new TypeError(V);
}this.__bX.push(bj);
var length=bj.length;

for(var i=0;i<length;i+=1){bg[i]=this.__bY(i,bj)||h;
}this.__bX.pop();
if(bg.length===0){var bh=s;
}else if(this.__bU){bh=E+this.__bU+bg.join(Y+this.__bU)+b+bi+l;
}else{bh=N+bg.join(d)+l;
}this.__bU=bi;
return bh;
case z:this.__bU+=this.__bV;
bg=[];

if(this.__bX.indexOf(bj)!==-1){throw new TypeError(V);
}this.__bX.push(bj);
if(this.__bW&&typeof this.__bW===f){var length=this.__bW.length;

for(var i=0;i<length;i+=1){var k=this.__bW[i];

if(typeof k===W){var v=this.__bY(k,bj);

if(v){bg.push(this.__ca(k)+(this.__bU?g:m)+v);
}}}}else{for(var k in bj){if(Object.hasOwnProperty.call(bj,k)){var v=this.__bY(k,bj);

if(v){bg.push(this.__ca(k)+(this.__bU?g:m)+v);
}}}}this.__bX.pop();
if(bg.length===0){var bh=A;
}else if(this.__bU){bh=w+this.__bU+bg.join(Y+this.__bU)+b+bi+S;
}else{bh=C+bg.join(d)+S;
}this.__bU=bi;
return bh;
}},dateToJSON:function(bk){var bl=function(n){return n<10?U+n:n;
};
var bm=function(n){var bn=bl(n);
return n<100?U+bn:bn;
};
return isFinite(bk.valueOf())?bk.getUTCFullYear()+T+bl(bk.getUTCMonth()+1)+T+bl(bk.getUTCDate())+M+bl(bk.getUTCHours())+m+bl(bk.getUTCMinutes())+m+bl(bk.getUTCSeconds())+F+bm(bk.getUTCMilliseconds())+q:null;
},__ca:function(bo){var bp={'\b':I,'\t':u,'\n':r,'\f':y,'\r':L,'"':G,'\\':x};
var bq=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
bq.lastIndex=0;

if(bq.test(bo)){return o+bo.replace(bq,function(a){var c=bp[a];
return typeof c===W?c:ba+(X+a.charCodeAt(0).toString(16)).slice(-4);
})+o;
}else{return o+bo+o;
}},parse:function(br,bs){var bt=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
bt.lastIndex=0;
if(bt.test(br)){br=br.replace(bt,function(a){return ba+(X+a.charCodeAt(0).toString(16)).slice(-4);
});
}if(/^[\],:{}\s]*$/.test(br.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,H).replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,l).replace(/(?:^|:|,)(?:\s*\[)+/g,p))){var j=eval(K+br+D);
return typeof bs===e?this.__cb({'':j},p,bs):j;
}throw new SyntaxError(P);
},__cb:function(bu,bv,bw){var bx=bu[bv];

if(bx&&typeof bx===f){for(var k in bx){if(Object.hasOwnProperty.call(bx,k)){var v=this.__cb(bx,k,bw);

if(v!==undefined){bx[k]=v;
}else{delete bx[k];
}}}}return bw.call(bu,bv,bx);
}}});
})();
(function(){var u=".",t="function",s="",r="gecko",q="Maple",p="[object Opera]",o="mshtml",n="8.0",m="AppleWebKit/",l="9.0",e="[^\\.0-9]",k="Gecko",h="webkit",c="4.0",b="1.9.0.0",g="opera",f="Version/",i="5.0",a="engine.version",j="qx.bom.client.Engine",d="engine.name";
qx.Bootstrap.define(j,{statics:{getVersion:function(){var y=window.navigator.userAgent;
var w=s;

if(qx.bom.client.Engine.__cc()){if(/Opera[\s\/]([0-9]+)\.([0-9])([0-9]*)/.test(y)){if(y.indexOf(f)!=-1){var x=y.match(/Version\/(\d+)\.(\d+)/);
w=x[1]+u+x[2].charAt(0)+u+x[2].substring(1,x[2].length);
}else{w=RegExp.$1+u+RegExp.$2;

if(RegExp.$3!=s){w+=u+RegExp.$3;
}}}}else if(qx.bom.client.Engine.__cd()){if(/AppleWebKit\/([^ ]+)/.test(y)){w=RegExp.$1;
var z=RegExp(e).exec(w);

if(z){w=w.slice(0,z.index);
}}}else if(qx.bom.client.Engine.__cf()||qx.bom.client.Engine.__ce()){if(/rv\:([^\);]+)(\)|;)/.test(y)){w=RegExp.$1;
}}else if(qx.bom.client.Engine.__cg()){if(/MSIE\s+([^\);]+)(\)|;)/.test(y)){w=RegExp.$1;
if(w<8&&/Trident\/([^\);]+)(\)|;)/.test(y)){if(RegExp.$1==c){w=n;
}else if(RegExp.$1==i){w=l;
}}}}else{var v=window.qxFail;

if(v&&typeof v===t){w=v().FULLVERSION;
}else{w=b;
qx.Bootstrap.warn("Unsupported client: "+y+"! Assumed gecko version 1.9.0.0 (Firefox 3.0).");
}}return w;
},getName:function(){var name;

if(qx.bom.client.Engine.__cc()){name=g;
}else if(qx.bom.client.Engine.__cd()){name=h;
}else if(qx.bom.client.Engine.__cf()||qx.bom.client.Engine.__ce()){name=r;
}else if(qx.bom.client.Engine.__cg()){name=o;
}else{var A=window.qxFail;

if(A&&typeof A===t){name=A().NAME;
}else{name=r;
qx.Bootstrap.warn("Unsupported client: "+window.navigator.userAgent+"! Assumed gecko version 1.9.0.0 (Firefox 3.0).");
}}return name;
},__cc:function(){return window.opera&&Object.prototype.toString.call(window.opera)==p;
},__cd:function(){return window.navigator.userAgent.indexOf(m)!=-1;
},__ce:function(){return window.navigator.userAgent.indexOf(q)!=-1;
},__cf:function(){return window.controllers&&window.navigator.product===k&&window.navigator.userAgent.indexOf(q)==-1;
},__cg:function(){return window.navigator.cpuClass&&/MSIE\s+([^\);]+)(\)|;)/.test(window.navigator.userAgent);
}},defer:function(B){qx.core.Environment.add(a,B.getVersion);
qx.core.Environment.add(d,B.getName);
}});
})();
(function(){var g="repl",f="prop",e="qx.bom.client.Json",d="JSON",c='{"x":1}',b="json",a="val";
qx.Bootstrap.define(e,{statics:{getJson:function(){return (qx.Bootstrap.getClass(window.JSON)==d&&JSON.parse(c).x===1&&JSON.stringify({"prop":a},function(k,v){return k===f?g:v;
}).indexOf(g)>0);
}},defer:function(h){qx.core.Environment.add(b,h.getJson);
}});
})();
(function(){var a="qx.lang.Json";
qx.Class.define(a,{statics:{JSON:qx.core.Environment.get("json")?window.JSON:new qx.lang.JsonImpl(),stringify:null,parse:null},defer:function(b){b.stringify=b.JSON.stringify;
b.parse=b.JSON.parse;
}});
})();
(function(){var c="qx.event.type.Data",b="qx.event.type.Event",a="qx.data.IListData";
qx.Interface.define(a,{events:{"change":c,"changeLength":b},members:{getItem:function(d){},setItem:function(e,f){},splice:function(g,h,i){},contains:function(j){},getLength:function(){},toArray:function(){}}});
})();
(function(){var a="qx.core.ValidationError";
qx.Class.define(a,{extend:qx.type.BaseError});
})();
(function(){var a="qx.lang.RingBuffer";
qx.Class.define(a,{extend:Object,construct:function(b){this.setMaxEntries(b||50);
},members:{__ch:0,__ci:0,__cj:false,__ck:0,__cl:null,__cm:null,setMaxEntries:function(c){this.__cm=c;
this.clear();
},getMaxEntries:function(){return this.__cm;
},addEntry:function(d){this.__cl[this.__ch]=d;
this.__ch=this.__cn(this.__ch,1);
var e=this.getMaxEntries();

if(this.__ci<e){this.__ci++;
}if(this.__cj&&(this.__ck<e)){this.__ck++;
}},mark:function(){this.__cj=true;
this.__ck=0;
},clearMark:function(){this.__cj=false;
},getAllEntries:function(){return this.getEntries(this.getMaxEntries(),false);
},getEntries:function(f,g){if(f>this.__ci){f=this.__ci;
}if(g&&this.__cj&&(f>this.__ck)){f=this.__ck;
}
if(f>0){var i=this.__cn(this.__ch,-1);
var h=this.__cn(i,-f+1);
var j;

if(h<=i){j=this.__cl.slice(h,i+1);
}else{j=this.__cl.slice(h,this.__ci).concat(this.__cl.slice(0,i+1));
}}else{j=[];
}return j;
},clear:function(){this.__cl=new Array(this.getMaxEntries());
this.__ci=0;
this.__ck=0;
this.__ch=0;
},__cn:function(k,l){var m=this.getMaxEntries();
var n=(k+l)%m;
if(n<0){n+=m;
}return n;
}}});
})();
(function(){var a="qx.log.appender.RingBuffer";
qx.Class.define(a,{extend:qx.lang.RingBuffer,construct:function(b){this.setMaxMessages(b||50);
},members:{setMaxMessages:function(c){this.setMaxEntries(c);
},getMaxMessages:function(){return this.getMaxEntries();
},process:function(d){this.addEntry(d);
},getAllLogEvents:function(){return this.getAllEntries();
},retrieveLogEvents:function(e,f){return this.getEntries(e,f);
},clearHistory:function(){this.clear();
}}});
})();
(function(){var k="node",j="error",h="...(+",g="array",f=")",e="info",d="instance",c="string",b="null",a="class",H="number",G="stringify",F="]",E="date",D="unknown",C="function",B="boolean",A="debug",z="map",y="undefined",s="qx.log.Logger",t="[",q="#",r="warn",o="document",p="{...(",m="text[",n="[...(",u="\n",v=")}",x=")]",w="object";
qx.Class.define(s,{statics:{__co:A,setLevel:function(I){this.__co=I;
},getLevel:function(){return this.__co;
},setTreshold:function(J){this.__cr.setMaxMessages(J);
},getTreshold:function(){return this.__cr.getMaxMessages();
},__cp:{},__cq:0,register:function(K){if(K.$$id){return;
}var M=this.__cq++;
this.__cp[M]=K;
K.$$id=M;
var L=this.__cs;
var N=this.__cr.getAllLogEvents();

for(var i=0,l=N.length;i<l;i++){if(L[N[i].level]>=L[this.__co]){K.process(N[i]);
}}},unregister:function(O){var P=O.$$id;

if(P==null){return;
}delete this.__cp[P];
delete O.$$id;
},debug:function(Q,R){qx.log.Logger.__ct(A,arguments);
},info:function(S,T){qx.log.Logger.__ct(e,arguments);
},warn:function(U,V){qx.log.Logger.__ct(r,arguments);
},error:function(W,X){qx.log.Logger.__ct(j,arguments);
},trace:function(Y){qx.log.Logger.__ct(e,[Y,qx.dev.StackTrace.getStackTrace().join(u)]);
},deprecatedMethodWarning:function(ba,bb){var bc;
},deprecatedClassWarning:function(bd,be){var bf;
},deprecatedEventWarning:function(bg,event,bh){var bi;
},deprecatedMixinWarning:function(bj,bk){var bl;
},deprecatedConstantWarning:function(bm,bn,bo){var self,bp;
},deprecateMethodOverriding:function(bq,br,bs,bt){var bu;
},clear:function(){this.__cr.clearHistory();
},__cr:new qx.log.appender.RingBuffer(50),__cs:{debug:0,info:1,warn:2,error:3},__ct:function(bv,bw){var bB=this.__cs;

if(bB[bv]<bB[this.__co]){return;
}var by=bw.length<2?null:bw[0];
var bA=by?1:0;
var bx=[];

for(var i=bA,l=bw.length;i<l;i++){bx.push(this.__cv(bw[i],true));
}var bC=new Date;
var bD={time:bC,offset:bC-qx.Bootstrap.LOADSTART,level:bv,items:bx,win:window};
if(by){if(by.$$hash!==undefined){bD.object=by.$$hash;
}else if(by.$$type){bD.clazz=by;
}}this.__cr.process(bD);
var bE=this.__cp;

for(var bz in bE){bE[bz].process(bD);
}},__cu:function(bF){if(bF===undefined){return y;
}else if(bF===null){return b;
}
if(bF.$$type){return a;
}var bG=typeof bF;

if(bG===C||bG==c||bG===H||bG===B){return bG;
}else if(bG===w){if(bF.nodeType){return k;
}else if(bF.classname){return d;
}else if(bF instanceof Array){return g;
}else if(bF instanceof Error){return j;
}else if(bF instanceof Date){return E;
}else{return z;
}}
if(bF.toString){return G;
}return D;
},__cv:function(bH,bI){var bP=this.__cu(bH);
var bL=D;
var bK=[];

switch(bP){case b:case y:bL=bP;
break;
case c:case H:case B:case E:bL=bH;
break;
case k:if(bH.nodeType===9){bL=o;
}else if(bH.nodeType===3){bL=m+bH.nodeValue+F;
}else if(bH.nodeType===1){bL=bH.nodeName.toLowerCase();

if(bH.id){bL+=q+bH.id;
}}else{bL=k;
}break;
case C:bL=qx.lang.Function.getName(bH)||bP;
break;
case d:bL=bH.basename+t+bH.$$hash+F;
break;
case a:case G:bL=bH.toString();
break;
case j:bK=qx.dev.StackTrace.getStackTraceFromError(bH);
bL=bH.toString();
break;
case g:if(bI){bL=[];

for(var i=0,l=bH.length;i<l;i++){if(bL.length>20){bL.push(h+(l-i)+f);
break;
}bL.push(this.__cv(bH[i],false));
}}else{bL=n+bH.length+x;
}break;
case z:if(bI){var bJ;
var bO=[];

for(var bN in bH){bO.push(bN);
}bO.sort();
bL=[];

for(var i=0,l=bO.length;i<l;i++){if(bL.length>20){bL.push(h+(l-i)+f);
break;
}bN=bO[i];
bJ=this.__cv(bH[bN],false);
bJ.key=bN;
bL.push(bJ);
}}else{var bM=0;

for(var bN in bH){bM++;
}bL=p+bM+v;
}break;
}return {type:bP,text:bL,trace:bK};
}},defer:function(bQ){var bR=qx.Bootstrap.$$logs;

for(var i=0;i<bR.length;i++){bQ.__ct(bR[i][0],bR[i][1]);
}qx.Bootstrap.debug=bQ.debug;
qx.Bootstrap.info=bQ.info;
qx.Bootstrap.warn=bQ.warn;
qx.Bootstrap.error=bQ.error;
qx.Bootstrap.trace=bQ.trace;
}});
})();
(function(){var d="set",c="reset",b="get",a="qx.core.MProperty";
qx.Mixin.define(a,{members:{set:function(e,f){var h=qx.core.Property.$$method.set;

if(qx.Bootstrap.isString(e)){if(!this[h[e]]){if(this[d+qx.Bootstrap.firstUp(e)]!=undefined){this[d+qx.Bootstrap.firstUp(e)](f);
return this;
}}return this[h[e]](f);
}else{for(var g in e){if(!this[h[g]]){if(this[d+qx.Bootstrap.firstUp(g)]!=undefined){this[d+qx.Bootstrap.firstUp(g)](e[g]);
continue;
}}this[h[g]](e[g]);
}return this;
}},get:function(i){var j=qx.core.Property.$$method.get;

if(!this[j[i]]){if(this[b+qx.Bootstrap.firstUp(i)]!=undefined){return this[b+qx.Bootstrap.firstUp(i)]();
}}return this[j[i]]();
},reset:function(k){var l=qx.core.Property.$$method.reset;

if(!this[l[k]]){if(this[c+qx.Bootstrap.firstUp(k)]!=undefined){this[c+qx.Bootstrap.firstUp(k)]();
return;
}}this[l[k]]();
}}});
})();
(function(){var e="info",d="debug",c="warn",b="qx.core.MLogging",a="error";
qx.Mixin.define(b,{members:{__cw:qx.log.Logger,debug:function(f){this.__cx(d,arguments);
},info:function(g){this.__cx(e,arguments);
},warn:function(h){this.__cx(c,arguments);
},error:function(i){this.__cx(a,arguments);
},trace:function(){this.__cw.trace(this);
},__cx:function(j,k){var l=qx.lang.Array.fromArguments(k);
l.unshift(this);
this.__cw[j].apply(this.__cw,l);
}}});
})();
(function(){var c="qx.dom.Node",b="";
qx.Class.define(c,{statics:{ELEMENT:1,ATTRIBUTE:2,TEXT:3,CDATA_SECTION:4,ENTITY_REFERENCE:5,ENTITY:6,PROCESSING_INSTRUCTION:7,COMMENT:8,DOCUMENT:9,DOCUMENT_TYPE:10,DOCUMENT_FRAGMENT:11,NOTATION:12,getDocument:function(d){return d.nodeType===this.DOCUMENT?d:d.ownerDocument||d.document;
},getWindow:function(e){if(e.nodeType==null){return e;
}if(e.nodeType!==this.DOCUMENT){e=e.ownerDocument;
}return e.defaultView||e.parentWindow;
},getDocumentElement:function(f){return this.getDocument(f).documentElement;
},getBodyElement:function(g){return this.getDocument(g).body;
},isNode:function(h){return !!(h&&h.nodeType!=null);
},isElement:function(j){return !!(j&&j.nodeType===this.ELEMENT);
},isDocument:function(k){return !!(k&&k.nodeType===this.DOCUMENT);
},isText:function(l){return !!(l&&l.nodeType===this.TEXT);
},isWindow:function(m){return !!(m&&m.history&&m.location&&m.document);
},isNodeName:function(n,o){if(!o||!n||!n.nodeName){return false;
}return o.toLowerCase()==qx.dom.Node.getName(n);
},getName:function(p){if(!p||!p.nodeName){return null;
}return p.nodeName.toLowerCase();
},getText:function(q){if(!q||!q.nodeType){return null;
}
switch(q.nodeType){case 1:var i,a=[],r=q.childNodes,length=r.length;

for(i=0;i<length;i++){a[i]=this.getText(r[i]);
}return a.join(b);
case 2:case 3:case 4:return q.nodeValue;
}return null;
},isBlockNode:function(s){if(!qx.dom.Node.isElement(s)){return false;
}s=qx.dom.Node.getName(s);
return /^(body|form|textarea|fieldset|ul|ol|dl|dt|dd|li|div|hr|p|h[1-6]|quote|pre|table|thead|tbody|tfoot|tr|td|th|iframe|address|blockquote)$/.test(s);
}}});
})();
(function(){var j="on",i="function",h="engine.version",g="undefined",f="HTMLEvents",d="mousedown",c="qx.bom.Event",b="return;",a="mouseover";
qx.Bootstrap.define(c,{statics:{addNativeListener:function(k,l,m,n){if(k.addEventListener){k.addEventListener(l,m,!!n);
}else if(k.attachEvent){k.attachEvent(j+l,m);
}else if(typeof k[j+l]!=g){k[j+l]=m;
}else{}},removeNativeListener:function(o,p,q,r){if(o.removeEventListener){o.removeEventListener(p,q,!!r);
}else if(o.detachEvent){try{o.detachEvent(j+p,q);
}catch(e){if(e.number!==-2146828218){throw e;
}}}else if(typeof o[j+p]!=g){o[j+p]=null;
}else{}},getTarget:function(e){return e.target||e.srcElement;
},getRelatedTarget:function(e){if(e.relatedTarget!==undefined){return e.relatedTarget;
}else if(e.fromElement!==undefined&&e.type===a){return e.fromElement;
}else if(e.toElement!==undefined){return e.toElement;
}else{return null;
}},preventDefault:function(e){if(e.preventDefault){if((false)&&parseFloat(qx.core.Environment.get(h))>=1.9&&e.type==d&&e.button==2){return;
}e.preventDefault();
if((false)&&parseFloat(qx.core.Environment.get(h))<1.9){try{e.keyCode=0;
}catch(s){}}}else{try{e.keyCode=0;
}catch(t){}e.returnValue=false;
}},stopPropagation:function(e){if(e.stopPropagation){e.stopPropagation();
}else{e.cancelBubble=true;
}},fire:function(u,v){if(document.createEvent){var w=document.createEvent(f);
w.initEvent(v,true,true);
return !u.dispatchEvent(w);
}else{var w=document.createEventObject();
return u.fireEvent(j+v,w);
}},supportsEvent:function(x,y){var z=j+y;
var A=(z in x);

if(!A){A=typeof x[z]==i;

if(!A&&x.setAttribute){x.setAttribute(z,b);
A=typeof x[z]==i;
x.removeAttribute(z);
}}return A;
}}});
})();
(function(){var r="|bubble",q="|capture",p="|",o="",n="_",m="unload",k="__cD",j="UNKNOWN_",h="c",g="DOM_",c="WIN_",f="QX_",e="qx.event.Manager",b="capture",a="__cC",d="DOCUMENT_";
qx.Class.define(e,{extend:Object,construct:function(s,t){this.__cy=s;
this.__cz=qx.core.ObjectRegistry.toHashCode(s);
this.__cA=t;
if(s.qx!==qx){var self=this;
qx.bom.Event.addNativeListener(s,m,qx.event.GlobalError.observeMethod(function(){qx.bom.Event.removeNativeListener(s,m,arguments.callee);
self.dispose();
}));
}this.__cB={};
this.__cC={};
this.__cD={};
this.__cE={};
},statics:{__cF:0,getNextUniqueId:function(){return (this.__cF++)+o;
}},members:{__cA:null,__cB:null,__cD:null,__cG:null,__cC:null,__cE:null,__cy:null,__cz:null,getWindow:function(){return this.__cy;
},getWindowId:function(){return this.__cz;
},getHandler:function(u){var v=this.__cC[u.classname];

if(v){return v;
}return this.__cC[u.classname]=new u(this);
},getDispatcher:function(w){var x=this.__cD[w.classname];

if(x){return x;
}return this.__cD[w.classname]=new w(this,this.__cA);
},getListeners:function(y,z,A){var B=y.$$hash||qx.core.ObjectRegistry.toHashCode(y);
var D=this.__cB[B];

if(!D){return null;
}var E=z+(A?q:r);
var C=D[E];
return C?C.concat():null;
},getAllListeners:function(){return this.__cB;
},serializeListeners:function(F){var M=F.$$hash||qx.core.ObjectRegistry.toHashCode(F);
var O=this.__cB[M];
var K=[];

if(O){var I,N,G,J,L;

for(var H in O){I=H.indexOf(p);
N=H.substring(0,I);
G=H.charAt(I+1)==h;
J=O[H];

for(var i=0,l=J.length;i<l;i++){L=J[i];
K.push({self:L.context,handler:L.handler,type:N,capture:G});
}}}return K;
},toggleAttachedEvents:function(P,Q){var V=P.$$hash||qx.core.ObjectRegistry.toHashCode(P);
var X=this.__cB[V];

if(X){var S,W,R,T;

for(var U in X){S=U.indexOf(p);
W=U.substring(0,S);
R=U.charCodeAt(S+1)===99;
T=X[U];

if(Q){this.__cH(P,W,R);
}else{this.__cI(P,W,R);
}}}},hasListener:function(Y,ba,bb){var bc=Y.$$hash||qx.core.ObjectRegistry.toHashCode(Y);
var be=this.__cB[bc];

if(!be){return false;
}var bf=ba+(bb?q:r);
var bd=be[bf];
return !!(bd&&bd.length>0);
},importListeners:function(bg,bh){var bn=bg.$$hash||qx.core.ObjectRegistry.toHashCode(bg);
var bo=this.__cB[bn]={};
var bk=qx.event.Manager;

for(var bi in bh){var bl=bh[bi];
var bm=bl.type+(bl.capture?q:r);
var bj=bo[bm];

if(!bj){bj=bo[bm]=[];
this.__cH(bg,bl.type,bl.capture);
}bj.push({handler:bl.listener,context:bl.self,unique:bl.unique||(bk.__cF++)+o});
}},addListener:function(bp,bq,br,self,bs){var bw;
var bx=bp.$$hash||qx.core.ObjectRegistry.toHashCode(bp);
var bz=this.__cB[bx];

if(!bz){bz=this.__cB[bx]={};
}var bv=bq+(bs?q:r);
var bu=bz[bv];

if(!bu){bu=bz[bv]=[];
}if(bu.length===0){this.__cH(bp,bq,bs);
}var by=(qx.event.Manager.__cF++)+o;
var bt={handler:br,context:self,unique:by};
bu.push(bt);
return bv+p+by;
},findHandler:function(bA,bB){var bN=false,bF=false,bO=false,bC=false;
var bL;

if(bA.nodeType===1){bN=true;
bL=g+bA.tagName.toLowerCase()+n+bB;
}else if(bA.nodeType===9){bC=true;
bL=d+bB;
}else if(bA==this.__cy){bF=true;
bL=c+bB;
}else if(bA.classname){bO=true;
bL=f+bA.classname+n+bB;
}else{bL=j+bA+n+bB;
}var bH=this.__cE;

if(bH[bL]){return bH[bL];
}var bK=this.__cA.getHandlers();
var bG=qx.event.IEventHandler;
var bI,bJ,bE,bD;

for(var i=0,l=bK.length;i<l;i++){bI=bK[i];
bE=bI.SUPPORTED_TYPES;

if(bE&&!bE[bB]){continue;
}bD=bI.TARGET_CHECK;

if(bD){var bM=false;

if(bN&&((bD&bG.TARGET_DOMNODE)!=0)){bM=true;
}else if(bF&&((bD&bG.TARGET_WINDOW)!=0)){bM=true;
}else if(bO&&((bD&bG.TARGET_OBJECT)!=0)){bM=true;
}else if(bC&&((bD&bG.TARGET_DOCUMENT)!=0)){bM=true;
}
if(!bM){continue;
}}bJ=this.getHandler(bK[i]);

if(bI.IGNORE_CAN_HANDLE||bJ.canHandleEvent(bA,bB)){bH[bL]=bJ;
return bJ;
}}return null;
},__cH:function(bP,bQ,bR){var bS=this.findHandler(bP,bQ);

if(bS){bS.registerEvent(bP,bQ,bR);
return;
}},removeListener:function(bT,bU,bV,self,bW){var cb;
var cc=bT.$$hash||qx.core.ObjectRegistry.toHashCode(bT);
var cd=this.__cB[cc];

if(!cd){return false;
}var bX=bU+(bW?q:r);
var bY=cd[bX];

if(!bY){return false;
}var ca;

for(var i=0,l=bY.length;i<l;i++){ca=bY[i];

if(ca.handler===bV&&ca.context===self){qx.lang.Array.removeAt(bY,i);

if(bY.length==0){this.__cI(bT,bU,bW);
}return true;
}}return false;
},removeListenerById:function(ce,cf){var cl;
var cj=cf.split(p);
var co=cj[0];
var cg=cj[1].charCodeAt(0)==99;
var cn=cj[2];
var cm=ce.$$hash||qx.core.ObjectRegistry.toHashCode(ce);
var cp=this.__cB[cm];

if(!cp){return false;
}var ck=co+(cg?q:r);
var ci=cp[ck];

if(!ci){return false;
}var ch;

for(var i=0,l=ci.length;i<l;i++){ch=ci[i];

if(ch.unique===cn){qx.lang.Array.removeAt(ci,i);

if(ci.length==0){this.__cI(ce,co,cg);
}return true;
}}return false;
},removeAllListeners:function(cq){var cu=cq.$$hash||qx.core.ObjectRegistry.toHashCode(cq);
var cw=this.__cB[cu];

if(!cw){return false;
}var cs,cv,cr;

for(var ct in cw){if(cw[ct].length>0){cs=ct.split(p);
cv=cs[0];
cr=cs[1]===b;
this.__cI(cq,cv,cr);
}}delete this.__cB[cu];
return true;
},deleteAllListeners:function(cx){delete this.__cB[cx];
},__cI:function(cy,cz,cA){var cB=this.findHandler(cy,cz);

if(cB){cB.unregisterEvent(cy,cz,cA);
return;
}},dispatchEvent:function(cC,event){var cH;
var cI=event.getType();

if(!event.getBubbles()&&!this.hasListener(cC,cI)){qx.event.Pool.getInstance().poolObject(event);
return true;
}
if(!event.getTarget()){event.setTarget(cC);
}var cG=this.__cA.getDispatchers();
var cF;
var cE=false;

for(var i=0,l=cG.length;i<l;i++){cF=this.getDispatcher(cG[i]);
if(cF.canDispatchEvent(cC,event,cI)){cF.dispatchEvent(cC,event,cI);
cE=true;
break;
}}
if(!cE){return true;
}var cD=event.getDefaultPrevented();
qx.event.Pool.getInstance().poolObject(event);
return !cD;
},dispose:function(){this.__cA.removeManager(this);
qx.util.DisposeUtil.disposeMap(this,a);
qx.util.DisposeUtil.disposeMap(this,k);
this.__cB=this.__cy=this.__cG=null;
this.__cA=this.__cE=null;
}}});
})();
(function(){var a="qx.event.IEventHandler";
qx.Interface.define(a,{statics:{TARGET_DOMNODE:1,TARGET_WINDOW:2,TARGET_OBJECT:4,TARGET_DOCUMENT:8},members:{canHandleEvent:function(b,c){},registerEvent:function(d,e,f){},unregisterEvent:function(g,h,i){}}});
})();
(function(){var c="qx.event.Registration";
qx.Class.define(c,{statics:{__cJ:{},getManager:function(d){if(d==null){d=window;
}else if(d.nodeType){d=qx.dom.Node.getWindow(d);
}else if(!qx.dom.Node.isWindow(d)){d=window;
}var f=d.$$hash||qx.core.ObjectRegistry.toHashCode(d);
var e=this.__cJ[f];

if(!e){e=new qx.event.Manager(d,this);
this.__cJ[f]=e;
}return e;
},removeManager:function(g){var h=g.getWindowId();
delete this.__cJ[h];
},addListener:function(i,j,k,self,l){return this.getManager(i).addListener(i,j,k,self,l);
},removeListener:function(m,n,o,self,p){return this.getManager(m).removeListener(m,n,o,self,p);
},removeListenerById:function(q,r){return this.getManager(q).removeListenerById(q,r);
},removeAllListeners:function(s){return this.getManager(s).removeAllListeners(s);
},deleteAllListeners:function(t){var u=t.$$hash;

if(u){this.getManager(t).deleteAllListeners(u);
}},hasListener:function(v,w,x){return this.getManager(v).hasListener(v,w,x);
},serializeListeners:function(y){return this.getManager(y).serializeListeners(y);
},createEvent:function(z,A,B){if(A==null){A=qx.event.type.Event;
}var C=qx.event.Pool.getInstance().getObject(A);
B?C.init.apply(C,B):C.init();
if(z){C.setType(z);
}return C;
},dispatchEvent:function(D,event){return this.getManager(D).dispatchEvent(D,event);
},fireEvent:function(E,F,G,H){var I;
var J=this.createEvent(F,G||null,H);
return this.getManager(E).dispatchEvent(E,J);
},fireNonBubblingEvent:function(K,L,M,N){var O=this.getManager(K);

if(!O.hasListener(K,L,false)){return true;
}var P=this.createEvent(L,M||null,N);
return O.dispatchEvent(K,P);
},PRIORITY_FIRST:-32000,PRIORITY_NORMAL:0,PRIORITY_LAST:32000,__cC:[],addHandler:function(Q){this.__cC.push(Q);
this.__cC.sort(function(a,b){return a.PRIORITY-b.PRIORITY;
});
},getHandlers:function(){return this.__cC;
},__cD:[],addDispatcher:function(R,S){this.__cD.push(R);
this.__cD.sort(function(a,b){return a.PRIORITY-b.PRIORITY;
});
},getDispatchers:function(){return this.__cD;
}}});
})();
(function(){var a="qx.core.MEvents";
qx.Mixin.define(a,{members:{__cK:qx.event.Registration,addListener:function(b,c,self,d){if(!this.$$disposed){return this.__cK.addListener(this,b,c,self,d);
}return null;
},addListenerOnce:function(f,g,self,h){var i=function(e){this.removeListener(f,i,this,h);
g.call(self||this,e);
};
return this.addListener(f,i,this,h);
},removeListener:function(j,k,self,l){if(!this.$$disposed){return this.__cK.removeListener(this,j,k,self,l);
}return false;
},removeListenerById:function(m){if(!this.$$disposed){return this.__cK.removeListenerById(this,m);
}return false;
},hasListener:function(n,o){return this.__cK.hasListener(this,n,o);
},dispatchEvent:function(p){if(!this.$$disposed){return this.__cK.dispatchEvent(this,p);
}return true;
},fireEvent:function(q,r,s){if(!this.$$disposed){return this.__cK.fireEvent(this,q,r,s);
}return true;
},fireNonBubblingEvent:function(t,u,v){if(!this.$$disposed){return this.__cK.fireNonBubblingEvent(this,t,u,v);
}return true;
},fireDataEvent:function(w,x,y,z){if(!this.$$disposed){if(y===undefined){y=null;
}return this.__cK.fireNonBubblingEvent(this,w,qx.event.type.Data,[x,y,!!z]);
}return true;
}}});
})();
(function(){var a="qx.event.IEventDispatcher";
qx.Interface.define(a,{members:{canDispatchEvent:function(b,event,c){this.assertInstance(event,qx.event.type.Event);
this.assertString(c);
},dispatchEvent:function(d,event,e){this.assertInstance(event,qx.event.type.Event);
this.assertString(e);
}}});
})();
(function(){var j="module.property",h="module.events",g="qx.core.Object",f="[",e="$$user_",d="]",c="rv:1.8.1",b="MSIE 6.0",a="Object";
qx.Class.define(g,{extend:Object,include:qx.core.Environment.filter({"module.databinding":qx.data.MBinding,"module.logger":qx.core.MLogging,"module.events":qx.core.MEvents,"module.property":qx.core.MProperty}),construct:function(){qx.core.ObjectRegistry.register(this);
},statics:{$$type:a},members:{__M:qx.core.Environment.get("module.property")?qx.core.Property:null,toHashCode:function(){return this.$$hash;
},toString:function(){return this.classname+f+this.$$hash+d;
},base:function(k,m){if(arguments.length===1){return k.callee.base.call(this);
}else{return k.callee.base.apply(this,Array.prototype.slice.call(arguments,1));
}},self:function(n){return n.callee.self;
},clone:function(){if(!qx.core.Environment.get(j)){throw new Error("Cloning only possible with properties.");
}var p=this.constructor;
var o=new p;
var r=qx.Class.getProperties(p);
var q=this.__M.$$store.user;
var s=this.__M.$$method.set;
var name;
for(var i=0,l=r.length;i<l;i++){name=r[i];

if(this.hasOwnProperty(q[name])){o[s[name]](this[q[name]]);
}}return o;
},__cL:null,setUserData:function(t,u){if(!this.__cL){this.__cL={};
}this.__cL[t]=u;
},getUserData:function(v){if(!this.__cL){return null;
}var w=this.__cL[v];
return w===undefined?null:w;
},isDisposed:function(){return this.$$disposed||false;
},dispose:function(){var B,z,y,C;
if(this.$$disposed){return;
}this.$$disposed=true;
this.$$instance=null;
this.$$allowconstruct=null;
var A=this.constructor;
var x;

while(A.superclass){if(A.$$destructor){A.$$destructor.call(this);
}if(A.$$includes){x=A.$$flatIncludes;

for(var i=0,l=x.length;i<l;i++){if(x[i].$$destructor){x[i].$$destructor.call(this);
}}}A=A.superclass;
}if(this.__cM){this.__cM();
}},__cM:null,__cN:function(){var D=qx.Class.getProperties(this.constructor);

for(var i=0,l=D.length;i<l;i++){delete this[e+D[i]];
}},_disposeObjects:function(E){qx.util.DisposeUtil.disposeObjects(this,arguments);
},_disposeSingletonObjects:function(F){qx.util.DisposeUtil.disposeObjects(this,arguments,true);
},_disposeArray:function(G){qx.util.DisposeUtil.disposeArray(this,G);
},_disposeMap:function(H){qx.util.DisposeUtil.disposeMap(this,H);
}},environment:{"qx.disposerDebugLevel":0},defer:function(I,J){var L=navigator.userAgent.indexOf(b)!=-1;
var K=navigator.userAgent.indexOf(c)!=-1;
if(L||K){J.__cM=J.__cN;
}},destruct:function(){if(qx.core.Environment.get(h)){if(!qx.core.ObjectRegistry.inShutDown){qx.event.Registration.removeAllListeners(this);
}else{qx.event.Registration.deleteAllListeners(this);
}}qx.core.ObjectRegistry.unregister(this);
this.__cL=null;
if(qx.core.Environment.get(j)){var O=this.constructor;
var S;
var T=this.__M.$$store;
var Q=T.user;
var R=T.theme;
var M=T.inherit;
var P=T.useinit;
var N=T.init;

while(O){S=O.$$properties;

if(S){for(var name in S){if(S[name].dereference){this[Q[name]]=this[R[name]]=this[M[name]]=this[P[name]]=this[N[name]]=undefined;
}}}O=O.superclass;
}}}});
})();
(function(){var a="qx.util.DisposeUtil";
qx.Class.define(a,{statics:{disposeObjects:function(b,c,d){var name;

for(var i=0,l=c.length;i<l;i++){name=c[i];

if(b[name]==null||!b.hasOwnProperty(name)){continue;
}
if(!qx.core.ObjectRegistry.inShutDown){if(b[name].dispose){if(!d&&b[name].constructor.$$instance){throw new Error("The object stored in key "+name+" is a singleton! Please use disposeSingleton instead.");
}else{b[name].dispose();
}}else{throw new Error("Has no disposable object under key: "+name+"!");
}}b[name]=null;
}},disposeArray:function(e,f){var h=e[f];

if(!h){return;
}if(qx.core.ObjectRegistry.inShutDown){e[f]=null;
return;
}try{var g;

for(var i=h.length-1;i>=0;i--){g=h[i];

if(g){g.dispose();
}}}catch(j){throw new Error("The array field: "+f+" of object: "+e+" has non disposable entries: "+j);
}h.length=0;
e[f]=null;
},disposeMap:function(k,m){var o=k[m];

if(!o){return;
}if(qx.core.ObjectRegistry.inShutDown){k[m]=null;
return;
}try{var n;

for(var p in o){n=o[p];

if(o.hasOwnProperty(p)&&n){n.dispose();
}}}catch(q){throw new Error("The map field: "+m+" of object: "+k+" has non disposable entries: "+q);
}k[m]=null;
},disposeTriggeredBy:function(r,s){var t=s.dispose;
s.dispose=function(){t.call(s);
r.dispose();
};
}}});
})();
(function(){var a="qx.event.type.Event";
qx.Class.define(a,{extend:qx.core.Object,statics:{CAPTURING_PHASE:1,AT_TARGET:2,BUBBLING_PHASE:3},members:{init:function(b,c){this._type=null;
this._target=null;
this._currentTarget=null;
this._relatedTarget=null;
this._originalTarget=null;
this._stopPropagation=false;
this._preventDefault=false;
this._bubbles=!!b;
this._cancelable=!!c;
this._timeStamp=(new Date()).getTime();
this._eventPhase=null;
return this;
},clone:function(d){if(d){var e=d;
}else{var e=qx.event.Pool.getInstance().getObject(this.constructor);
}e._type=this._type;
e._target=this._target;
e._currentTarget=this._currentTarget;
e._relatedTarget=this._relatedTarget;
e._originalTarget=this._originalTarget;
e._stopPropagation=this._stopPropagation;
e._bubbles=this._bubbles;
e._preventDefault=this._preventDefault;
e._cancelable=this._cancelable;
return e;
},stop:function(){if(this._bubbles){this.stopPropagation();
}
if(this._cancelable){this.preventDefault();
}},stopPropagation:function(){this._stopPropagation=true;
},getPropagationStopped:function(){return !!this._stopPropagation;
},preventDefault:function(){this._preventDefault=true;
},getDefaultPrevented:function(){return !!this._preventDefault;
},getType:function(){return this._type;
},setType:function(f){this._type=f;
},getEventPhase:function(){return this._eventPhase;
},setEventPhase:function(g){this._eventPhase=g;
},getTimeStamp:function(){return this._timeStamp;
},getTarget:function(){return this._target;
},setTarget:function(h){this._target=h;
},getCurrentTarget:function(){return this._currentTarget||this._target;
},setCurrentTarget:function(i){this._currentTarget=i;
},getRelatedTarget:function(){return this._relatedTarget;
},setRelatedTarget:function(j){this._relatedTarget=j;
},getOriginalTarget:function(){return this._originalTarget;
},setOriginalTarget:function(k){this._originalTarget=k;
},getBubbles:function(){return this._bubbles;
},setBubbles:function(l){this._bubbles=l;
},isCancelable:function(){return this._cancelable;
},setCancelable:function(m){this._cancelable=m;
}},destruct:function(){this._target=this._currentTarget=this._relatedTarget=this._originalTarget=null;
}});
})();
(function(){var b="qx.util.ObjectPool",a="Integer";
qx.Class.define(b,{extend:qx.core.Object,construct:function(c){qx.core.Object.call(this);
this.__cO={};

if(c!=null){this.setSize(c);
}},properties:{size:{check:a,init:Infinity}},members:{__cO:null,getObject:function(d){if(this.$$disposed){return new d;
}
if(!d){throw new Error("Class needs to be defined!");
}var e=null;
var f=this.__cO[d.classname];

if(f){e=f.pop();
}
if(e){e.$$pooled=false;
}else{e=new d;
}return e;
},poolObject:function(g){if(!this.__cO){return;
}var h=g.classname;
var j=this.__cO[h];

if(g.$$pooled){throw new Error("Object is already pooled: "+g);
}
if(!j){this.__cO[h]=j=[];
}if(j.length>this.getSize()){if(g.destroy){g.destroy();
}else{g.dispose();
}return;
}g.$$pooled=true;
j.push(g);
}},destruct:function(){var n=this.__cO;
var k,m,i,l;

for(k in n){m=n[k];

for(i=0,l=m.length;i<l;i++){m[i].dispose();
}}delete this.__cO;
}});
})();
(function(){var b="singleton",a="qx.event.Pool";
qx.Class.define(a,{extend:qx.util.ObjectPool,type:b,construct:function(){qx.util.ObjectPool.call(this,30);
}});
})();
(function(){var a="qx.event.dispatch.Direct";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventDispatcher,construct:function(b){this._manager=b;
},statics:{PRIORITY:qx.event.Registration.PRIORITY_LAST},members:{canDispatchEvent:function(c,event,d){return !event.getBubbles();
},dispatchEvent:function(e,event,f){var j,g;
event.setEventPhase(qx.event.type.Event.AT_TARGET);
var k=this._manager.getListeners(e,f,false);

if(k){for(var i=0,l=k.length;i<l;i++){var h=k[i].context||e;
k[i].handler.call(h,event);
}}}},defer:function(m){qx.event.Registration.addDispatcher(m);
}});
})();
(function(){var a="qx.event.handler.Object";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_LAST,SUPPORTED_TYPES:null,TARGET_CHECK:qx.event.IEventHandler.TARGET_OBJECT,IGNORE_CAN_HANDLE:false},members:{canHandleEvent:function(b,c){return qx.Class.supportsEvent(b.constructor,c);
},registerEvent:function(d,e,f){},unregisterEvent:function(g,h,i){}},defer:function(j){qx.event.Registration.addHandler(j);
}});
})();
(function(){var a="qx.event.type.Data";
qx.Class.define(a,{extend:qx.event.type.Event,members:{__cP:null,__cQ:null,init:function(b,c,d){qx.event.type.Event.prototype.init.call(this,false,d);
this.__cP=b;
this.__cQ=c;
return this;
},clone:function(e){var f=qx.event.type.Event.prototype.clone.call(this,e);
f.__cP=this.__cP;
f.__cQ=this.__cQ;
return f;
},getData:function(){return this.__cP;
},getOldData:function(){return this.__cQ;
}},destruct:function(){this.__cP=this.__cQ=null;
}});
})();
(function(){var a="qx.application.IApplication";
qx.Interface.define(a,{members:{main:function(){},finalize:function(){},close:function(){},terminate:function(){}}});
})();
(function(){var a="qx.locale.MTranslation";
qx.Mixin.define(a,{members:{tr:function(b,c){var d=qx.locale.Manager;

if(d){return d.tr.apply(d,arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
},trn:function(e,f,g,h){var i=qx.locale.Manager;

if(i){return i.trn.apply(i,arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
},trc:function(j,k,l){var m=qx.locale.Manager;

if(m){return m.trc.apply(m,arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
},marktr:function(n){var o=qx.locale.Manager;

if(o){return o.marktr.apply(o,arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
}}});
})();
(function(){var a="qx.application.Mobile";
qx.Class.define(a,{extend:qx.core.Object,implement:[qx.application.IApplication],include:qx.locale.MTranslation,construct:function(){qx.core.Object.call(this);
},members:{__cR:null,main:function(){this.__cR=this._createRootWidget();
{this.__cR.setShowScrollbarY(false);
};
},getRoot:function(){return this.__cR;
},_createRootWidget:function(){return new qx.ui.mobile.core.Root();
},finalize:function(){},close:function(){},terminate:function(){}},destruct:function(){this.__cR=null;
}});
})();
(function(){var a="qx.ui.mobile.core.MChildrenHandling";
qx.Mixin.define(a,{members:{getChildren:function(){return this._getChildren();
},hasChildren:function(){return this._hasChildren();
},indexOf:function(b){return this._indexOf(b);
},add:function(c,d){this._add(c,d);
},addBefore:function(e,f,g){this._addBefore(e,f,g);
},addAfter:function(h,i,j){this._addAfter(h,i,j);
},remove:function(k){this._remove(k);
},removeAt:function(l){return this._removeAt(l);
},removeAll:function(){this._removeAll();
}},statics:{remap:function(m){m.getChildren=m._getChildren;
m.hasChildren=m._hasChildren;
m.indexOf=m._indexOf;
m.add=m._add;
m.addBefore=m._addBefore;
m.addAfter=m._addAfter;
m.remove=m._remove;
m.removeAt=m._removeAt;
m.removeAll=m._removeAll;
}}});
})();
(function(){var k="ready",j="webkit",i="load",h="unload",g="shutdown",f="qx.event.handler.Application",d="complete",c="gecko",b="opera",a="DOMContentLoaded";
qx.Class.define(f,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(l){qx.core.Object.call(this);
this._window=l.getWindow();
this.__cS=false;
this.__cT=false;
this.__cU=false;
this.__cV=false;
this._initObserver();
qx.event.handler.Application.$$instance=this;
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{ready:1,shutdown:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true,onScriptLoaded:function(){var m=qx.event.handler.Application.$$instance;

if(m){m.__cW();
}}},members:{canHandleEvent:function(n,o){},registerEvent:function(p,q,r){},unregisterEvent:function(s,t,u){},__cU:null,__cS:null,__cT:null,__cV:null,__cW:function(){if(!this.__cU&&this.__cS&&qx.$$loader.scriptLoaded){{this.__cU=true;
qx.event.Registration.fireEvent(this._window,k);
};
}},isApplicationReady:function(){return this.__cU;
},_initObserver:function(){if(qx.$$domReady||document.readyState==d||document.readyState==k){this.__cS=true;
this.__cW();
}else{var self,v;
this._onNativeLoadWrapped=qx.lang.Function.bind(this._onNativeLoad,this);

if(j==c||j==b||true){qx.bom.Event.addNativeListener(this._window,a,this._onNativeLoadWrapped);
}else{}qx.bom.Event.addNativeListener(this._window,i,this._onNativeLoadWrapped);
}this._onNativeUnloadWrapped=qx.lang.Function.bind(this._onNativeUnload,this);
qx.bom.Event.addNativeListener(this._window,h,this._onNativeUnloadWrapped);
},_stopObserver:function(){if(this._onNativeLoadWrapped){qx.bom.Event.removeNativeListener(this._window,i,this._onNativeLoadWrapped);
}qx.bom.Event.removeNativeListener(this._window,h,this._onNativeUnloadWrapped);
this._onNativeLoadWrapped=null;
this._onNativeUnloadWrapped=null;
},_onNativeLoad:qx.event.GlobalError.observeMethod(function(){this.__cS=true;
this.__cW();
}),_onNativeUnload:qx.event.GlobalError.observeMethod(function(){if(!this.__cV){this.__cV=true;

try{qx.event.Registration.fireEvent(this._window,g);
}catch(e){throw e;
}finally{qx.core.ObjectRegistry.shutdown();
}}})},destruct:function(){this._stopObserver();
this._window=null;
},defer:function(w){qx.event.Registration.addHandler(w);
}});
})();
(function(){var c="ready",b="qx.bom.Lifecycle",a="shutdown";
qx.Class.define(b,{statics:{onReady:function(d,e){var g=qx.event.Registration;
var f=g.getManager(window).getHandler(qx.event.handler.Application);
if(f&&f.isApplicationReady()){d.call(e);
}else{g.addListener(window,c,d,e);
}},onShutdown:function(h,i){qx.event.Registration.addListener(window,a,h,i);
}}});
})();
(function(){var k="qx.event.type.Mouse",j="visible",h="qx.event.type.Focus",g="qx.event.type.Touch",f="excluded",e="hidden",d="Boolean",c="qx.event.type.KeySequence",b="String",a="qx.event.type.Event",H="_applyAttribute",G="disabled",F="visibility",E='anonymous',D="display",C="changeVisibility",B="div",A="changeId",z="qx.event.type.KeyInput",y="_transformId",s="qx.event.type.MouseWheel",t="_applyEnabled",q="_applyId",r="changeEnabled",o="",p="_applyDefaultCssClass",m="undefined",n="block",u="none",v="qx.ui.mobile.core.Widget",x="_applyStyle",w="_applyVisibility";
qx.Class.define(v,{extend:qx.core.Object,include:[qx.locale.MTranslation],construct:function(){qx.core.Object.call(this);
this._setContainerElement(this._createContainerElement());
this.__cX=[];
this.setId(this.getId());
this.initDefaultCssClass();
this.initName();
this.initAnonymous();
this.initActivatable();
},events:{mousemove:k,mouseover:k,mouseout:k,mousedown:k,mouseup:k,click:k,dblclick:k,contextmenu:k,beforeContextmenuOpen:k,mousewheel:s,touchstart:g,touchend:g,touchmove:g,touchcancel:g,tap:g,swipe:g,keyup:c,keydown:c,keypress:c,keyinput:z,domupdated:a,appear:a,disappear:a,focus:h,blur:h,focusin:h,focusout:h,activate:h,deactivate:h},properties:{defaultCssClass:{check:b,init:null,nullable:true,apply:p},enabled:{init:true,check:d,nullable:false,event:r,apply:t},name:{check:b,init:null,nullable:true,apply:H},anonymous:{check:d,init:null,nullable:true,apply:x},id:{check:b,init:null,nullable:true,apply:q,transform:y,event:A},visibility:{check:[j,e,f],init:j,apply:w,event:C},activatable:{check:d,init:false,apply:H}},statics:{ID_PREFIX:"qx_id_",__j:{},__cY:0,__da:null,onShutdown:function(){window.clearTimeout(qx.ui.mobile.core.Widget.__da);
delete qx.ui.mobile.core.Widget.__j;
},getCurrentId:function(){return qx.ui.mobile.core.Widget.__cY;
},registerWidget:function(I){var J=I.getId();
var K=qx.ui.mobile.core.Widget.__j;
K[J]=I;
},unregisterWidget:function(L){delete qx.ui.mobile.core.Widget.__j[L];
},getWidgetById:function(M){return qx.ui.mobile.core.Widget.__j[M];
},scheduleDomUpdated:function(){if(qx.ui.mobile.core.Widget.__da==null){qx.ui.mobile.core.Widget.__da=window.setTimeout(qx.ui.mobile.core.Widget.domUpdated,0);
}},domUpdated:qx.event.GlobalError.observeMethod(function(){var N=qx.ui.mobile.core.Widget;
window.clearTimeout(N.__da);
N.__da=null;
qx.event.handler.Appear.refresh();
qx.ui.mobile.core.DomUpdatedHandler.refresh();
}),addAttributeMapping:function(O,P,Q){var R;
qx.ui.mobile.core.Widget.ATTRIBUTE_MAPPING[O]={attribute:P,values:Q};
},addStyleMapping:function(S,T,U){var V;
qx.ui.mobile.core.Widget.STYLE_MAPPING[S]={style:T,values:U};
},ATTRIBUTE_MAPPING:{"selectable":{attribute:"data-selectable",values:{"true":null,"false":"false"}},"activatable":{attribute:"data-activatable",values:{"true":"true","false":null}},"readOnly":{attribute:"readonly"}},STYLE_MAPPING:{"anonymous":{style:"pointer-events",values:{"true":"none","false":null}}}},members:{__db:null,__dc:null,__dd:null,__cX:null,__de:null,_getTagName:function(){return B;
},_createContainerElement:function(){return qx.bom.Element.create(this._getTagName());
},_domUpdated:function(){qx.ui.mobile.core.Widget.scheduleDomUpdated();
},_transformId:function(W){if(W==null){var X=qx.ui.mobile.core.Widget;
W=X.ID_PREFIX+X.__cY++;
}return W;
},_applyId:function(Y,ba){if(ba!=null){qx.ui.mobile.core.Widget.unregisterWidget(ba);
}var bb=this.getContainerElement();
bb.id=Y;
qx.ui.mobile.core.Widget.registerWidget(this);
},_applyEnabled:function(bc,bd){if(bc){this.removeCssClass(G);
this._setStyle(E,this.getAnonymous());
}else{this.addCssClass(G);
this._setStyle(E,true);
}},_add:function(be,bf){be.setLayoutParent(this);
be.setLayoutProperties(bf);
this.getContentElement().appendChild(be.getContainerElement());
this.__cX.push(be);
this._domUpdated();
},_addBefore:function(bg,bh,bi){if(bg==bh){return;
}bg.setLayoutParent(this);
bg.setLayoutProperties(bi);
this.getContentElement().insertBefore(bg.getContainerElement(),bh.getContainerElement());
qx.lang.Array.insertBefore(this.__cX,bg,bh);
this._domUpdated();
},_addAfter:function(bj,bk,bl){if(bj==bk){return;
}bj.setLayoutParent(this);
bj.setLayoutProperties(bl);
var length=this._getChildren().length;
var bm=this._indexOf(bk);

if(bm==length-1){this.getContentElement().appendChild(bj.getContainerElement());
}else{var bn=this._getChildren()[bm+1];
this.getContentElement().insertBefore(bj.getContainerElement(),bn.getContainerElement());
}qx.lang.Array.insertAfter(this.__cX,bj,bk);
this._domUpdated();
},_remove:function(bo){bo.setLayoutParent(null);
this._domUpdated();
},_removeAt:function(bp){if(!this.__cX){throw new Error("This widget has no children!");
}var bq=this.__cX[bp];
this._remove(bq);
},_removeAll:function(){var br=this.__cX.concat();

for(var i=0,l=br.length;i<l;i++){this._remove(br[i]);
}},_indexOf:function(bs){var bt=this.__cX;

if(!bt){return -1;
}return bt.indexOf(bs);
},setLayoutParent:function(parent){if(this.__dd===parent){return;
}var bu=this.__dd;

if(bu&&!bu.$$disposed){this.__dd.removeChild(this);
}this.__dd=parent||null;
},removeChild:function(bv){qx.lang.Array.remove(this.__cX,bv);
this.getContentElement().removeChild(bv.getContainerElement());
},getLayoutParent:function(){return this.__dd;
},_getChildren:function(){return this.__cX;
},_hasChildren:function(){return this.__cX&&this.__cX.length>0;
},_setLayout:function(bw){if(this.__de){this.__de.connectToWidget(null);
}
if(bw){bw.connectToWidget(this);
}this.__de=bw;
},_getLayout:function(){return this.__de;
},setLayoutProperties:function(bx){if(bx==null){return;
}var parent=this.getLayoutParent();

if(parent){parent.updateLayoutProperties(this,bx);
}},updateLayoutProperties:function(by,bz){var bA=this._getLayout();

if(bA){bA.setLayoutProperties(by,bz);
}},_setHtml:function(bB){this.getContentElement().innerHTML=bB||o;
this._domUpdated();
},_applyAttribute:function(bC,bD,bE){this._setAttribute(bE,bC);
},_setAttribute:function(bF,bG){var bI=qx.ui.mobile.core.Widget.ATTRIBUTE_MAPPING[bF];

if(bI){bF=bI.attribute||bF;
var bH=bI.values;
bG=bH&&typeof bH[bG]!==m?bH[bG]:bG;
}var bJ=this.getContainerElement();

if(bG!=null){qx.bom.element.Attribute.set(bJ,bF,bG);
}else{qx.bom.element.Attribute.reset(bJ,bF);
}this._domUpdated();
},_getAttribute:function(bK){var bL=this.getContainerElement();
return qx.bom.element.Attribute.get(bL,bK);
},_applyStyle:function(bM,bN,bO){this._setStyle(bO,bM);
},_setStyle:function(bP,bQ){var bR=qx.ui.mobile.core.Widget.STYLE_MAPPING[bP];

if(bR){bP=bR.style||bP;
bQ=bR.values[bQ];
}var bS=this.getContainerElement();

if(bQ!=null){qx.bom.element.Style.set(bS,bP,bQ);
}else{qx.bom.element.Style.reset(bS,bP);
}this._domUpdated();
},_getStyle:function(bT){var bU=this.getContainerElement();
return qx.bom.element.Style.get(bU,bT);
},_applyDefaultCssClass:function(bV,bW){if(bW){this.removeCssClass(bW);
}
if(bV){this.addCssClass(bV);
}},addCssClass:function(bX){var bY=this.getContainerElement();
qx.bom.element.Class.add(bY,bX);
this._domUpdated();
},removeCssClass:function(ca){var cb=this.getContainerElement();
qx.bom.element.Class.remove(cb,ca);
this._domUpdated();
},_applyVisibility:function(cc,cd){if(cc==f){this._setStyle(D,u);
}else if(cc==j){this._setStyle(D,n);
this._setStyle(F,j);
}else if(cc==e){this._setStyle(F,e);
}},show:function(){this.setVisibility(j);
},hide:function(){this.setVisibility(e);
},exclude:function(){this.setVisibility(f);
},isVisible:function(){return this.getVisibility()===j;
},isHidden:function(){return this.getVisibility()!==j;
},isExcluded:function(){return this.getVisibility()===f;
},isSeeable:function(){return this.getContainerElement().offsetWidth>0;
},_setContainerElement:function(ce){this.__db=ce;
},getContainerElement:function(){return this.__db;
},getContentElement:function(){if(!this.__dc){this.__dc=this._getContentElement();
}return this.__dc;
},_getContentElement:function(){return this.getContainerElement();
},destroy:function(){if(this.$$disposed){return;
}var parent=this.__dd;

if(parent){parent._remove(this);
}this.dispose();
}},destruct:function(){if(!qx.core.ObjectRegistry.inShutDown){qx.event.Registration.removeAllListeners(this);

if(this.getId()){qx.ui.mobile.core.Widget.unregisterWidget(this.getId());
}}this.__dd=this.__db=this.__dc=null;

if(this.__de){this.__de.dispose();
}this.__de=null;
},defer:function(cf){qx.bom.Lifecycle.onShutdown(cf.onShutdown,cf);
}});
})();
(function(){var k="active",j="touchmove",h="qx.ui.mobile.core.EventHandler",g="touchend",f="touchcancel",e="data-selectable",d="true",c="data-activatable",b="touchstart",a="false";
qx.Class.define(h,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(){qx.core.Object.call(this);
this.__df=qx.event.Registration.getManager(window);
},statics:{PRIORITY:qx.event.Registration.PRIORITY_FIRST,SUPPORTED_TYPES:{mousemove:1,mouseover:1,mouseout:1,mousedown:1,mouseup:1,click:1,dblclick:1,contextmenu:1,mousewheel:1,keyup:1,keydown:1,keypress:1,keyinput:1,capture:1,losecapture:1,focusin:1,focusout:1,focus:1,blur:1,activate:1,deactivate:1,appear:1,disappear:1,resize:1,dragstart:1,dragend:1,dragover:1,dragleave:1,drop:1,drag:1,dragchange:1,droprequest:1,touchstart:1,touchend:1,touchmove:1,touchcancel:1,tap:1,swipe:1},IGNORE_CAN_HANDLE:false,__dg:null,__dh:null,__di:null,__dj:null,__dk:null,__dl:function(m){var n=qx.ui.mobile.core.EventHandler;
n.__dh=qx.bom.Viewport.getScrollLeft();
n.__di=qx.bom.Viewport.getScrollTop();
var o=m.getChangedTargetTouches()[0];
n.__dj=o.screenY;
n.__dp();
var p=m.getTarget();

while(p&&p.parentNode&&p.parentNode.nodeType==1&&qx.bom.element.Attribute.get(p,c)!=d){p=p.parentNode;
}n.__dg=p;
n.__dm=window.setTimeout(function(){n.__dm=null;
var q=n.__dg;

if(q&&(qx.bom.element.Attribute.get(q,e)!=a)){qx.bom.element.Class.add(q,k);
}},100);
},__dn:function(r){qx.ui.mobile.core.EventHandler.__dq();
},__do:function(s){var t=qx.ui.mobile.core.EventHandler;
var u=s.getChangedTargetTouches()[0];
var v=u.screenY-t.__dj;

if(t.__dg&&Math.abs(v)>=qx.event.handler.Touch.TAP_MAX_DISTANCE){t.__dq();
}
if(t.__dg&&(t.__dh!=qx.bom.Viewport.getScrollLeft()||t.__di!=qx.bom.Viewport.getScrollTop())){t.__dq();
}},__dp:function(){var w=qx.ui.mobile.core.EventHandler;

if(w.__dm){window.clearTimeout(w.__dm);
w.__dm=null;
}},__dq:function(){var x=qx.ui.mobile.core.EventHandler;
x.__dp();
var y=x.__dg;

if(y){qx.bom.element.Class.remove(y,k);
}x.__dg=null;
}},members:{__df:null,canHandleEvent:function(z,A){return z instanceof qx.ui.mobile.core.Widget;
},registerEvent:function(B,C,D){var E=B.getContainerElement();
qx.event.Registration.addListener(E,C,this._dispatchEvent,this,D);
},unregisterEvent:function(F,G,H){var I=F.getContainerElement();
qx.event.Registration.removeListener(I,G,this._dispatchEvent,this,H);
},_dispatchEvent:function(J){var O=J.getTarget();

if(!O||O.id==null){return;
}var N=qx.ui.mobile.core.Widget.getWidgetById(O.id);
if(J.getRelatedTarget){var V=J.getRelatedTarget();

if(V&&V.id){var U=qx.ui.mobile.core.Widget.getWidgetById(V.id);
}}var Q=J.getCurrentTarget();
var S=qx.ui.mobile.core.Widget.getWidgetById(Q.id);

if(!S){return;
}var K=J.getEventPhase()==qx.event.type.Event.CAPTURING_PHASE;
var T=J.getType();
var P=this.__df.getListeners(S,T,K);

if(!P||P.length===0){return;
}var L=qx.event.Pool.getInstance().getObject(J.constructor);
J.clone(L);
L.setTarget(N);
L.setRelatedTarget(U||null);
L.setCurrentTarget(S);
var W=J.getOriginalTarget();

if(W&&W.id){var M=qx.ui.mobile.core.Widget.getWidgetById(W.id);
L.setOriginalTarget(M);
}else{L.setOriginalTarget(O);
}for(var i=0,l=P.length;i<l;i++){var R=P[i].context||S;
P[i].handler.call(R,L);
}if(L.getPropagationStopped()){J.stopPropagation();
}
if(L.getDefaultPrevented()){J.preventDefault();
}qx.event.Pool.getInstance().poolObject(L);
}},destruct:function(){this.__df=null;
},defer:function(X){qx.event.Registration.addHandler(X);
qx.event.Registration.addListener(document,b,X.__dl);
qx.event.Registration.addListener(document,g,X.__dn);
qx.event.Registration.addListener(document,f,X.__dn);
qx.event.Registration.addListener(document,j,X.__do);
}});
})();
(function(){var e="CSS1Compat",d="qx.bom.Document",c="1px",b="position:absolute;width:0;height:0;width:1",a="div";
qx.Class.define(d,{statics:{isQuirksMode:function(f){if(document.compatMode===undefined){var g=(f||window).document.createElement(a);
g.style.cssText=b;
return g.style.width===c?true:false;
}else{return (f||window).document.compatMode!==e;
}},isStandardMode:function(h){return !this.isQuirksMode(h);
},getWidth:function(i){var j=(i||window).document;
var k=qx.bom.Viewport.getWidth(i);
var scroll=this.isStandardMode(i)?j.documentElement.scrollWidth:j.body.scrollWidth;
return Math.max(scroll,k);
},getHeight:function(l){var m=(l||window).document;
var n=qx.bom.Viewport.getHeight(l);
var scroll=this.isStandardMode(l)?m.documentElement.scrollHeight:m.body.scrollHeight;
return Math.max(scroll,n);
}}});
})();
(function(){var b="engine.version",a="qx.bom.Viewport";
qx.Class.define(a,{statics:{getWidth:function(c){if(parseFloat(qx.core.Environment.get(b))<523.15){return (c||window).innerWidth;
}else{var d=(c||window).document;
return qx.bom.Document.isStandardMode(c)?d.documentElement.clientWidth:d.body.clientWidth;
}},getHeight:function(e){if(parseFloat(qx.core.Environment.get(b))<523.15){return (e||window).innerHeight;
}else{var f=(e||window).document;
return qx.bom.Document.isStandardMode(e)?f.documentElement.clientHeight:f.body.clientHeight;
}},getScrollLeft:function(g){var h=(g||window).document;
return (g||window).pageXOffset||h.documentElement.scrollLeft||h.body.scrollLeft;
},getScrollTop:function(i){var j=(i||window).document;
return (i||window).pageYOffset||j.documentElement.scrollTop||j.body.scrollTop;
},__dr:function(){var k=this.getWidth()>this.getHeight()?90:0;
var l=window.orientation;

if(l==null||Math.abs(l%180)==k){return {"-270":90,"-180":180,"-90":-90,"0":0,"90":90,"180":180,"270":-90};
}else{return {"-270":180,"-180":-90,"-90":0,"0":90,"90":180,"180":-90,"270":0};
}},__ds:null,getOrientation:function(m){var n=(m||window).orientation;

if(n==null){n=this.getWidth(m)>this.getHeight(m)?90:0;
}else{n=this.__ds[n];
}return n;
},isLandscape:function(o){return Math.abs(this.getOrientation(o))==90;
},isPortrait:function(p){return Math.abs(this.getOrientation(p))!==90;
}},defer:function(q){q.__ds=q.__dr();
}});
})();
(function(){var l="",k="audio",j="video",i="undefined",h="number",g="function",f="html.video.h264",d="html.element.contains",c='video/ogg; codecs="theora, vorbis"',b="html.console",bh="html.xul",bg="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",bf="html.video.ogg",be="http://www.w3.org/TR/SVG11/feature#BasicStructure",bd="html.storage.local",bc='audio',bb='video/mp4; codecs="avc1.42E01E, mp4a.40.2"',ba="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",Y="html.audio",X="audio/mpeg",s="org.w3c.dom.svg",t="html.classlist",q="html.video",r="html.geolocation",o="DOMTokenList",p="html.storage.session",m="1.1",n="html.image.naturaldimensions",x="html.audio.aif",y="audio/x-wav",G="html.canvas",E="audio/ogg",N="html.audio.mp3",I="html.element.compareDocumentPosition",T="audio/x-aiff",R="html.audio.au",A="img",W="html.xpath",V="qx.bom.client.Html",U='video',z="span",C="html.element.textcontent",D="mshtml",F="html.vml",H="html.svg",J="html.audio.ogg",O="label",S='video/webm; codecs="vp8, vorbis"',u="html.dataurl",w="html.webworker",B="html.dataset",M="1.0",L="html.audio.wav",K="html.filereader",Q="audio/basic",P="html.video.webm";
qx.Bootstrap.define(V,{statics:{getWebWorker:function(){return window.Worker!=null;
},getFileReader:function(){return window.FileReader!=null;
},getGeoLocation:function(){return navigator.geolocation!=null;
},getAudio:function(){return !!document.createElement(bc).canPlayType;
},getAudioOgg:function(){if(!qx.bom.client.Html.getAudio()){return l;
}var a=document.createElement(k);
return a.canPlayType(E);
},getAudioMp3:function(){if(!qx.bom.client.Html.getAudio()){return l;
}var a=document.createElement(k);
return a.canPlayType(X);
},getAudioWav:function(){if(!qx.bom.client.Html.getAudio()){return l;
}var a=document.createElement(k);
return a.canPlayType(y);
},getAudioAu:function(){if(!qx.bom.client.Html.getAudio()){return l;
}var a=document.createElement(k);
return a.canPlayType(Q);
},getAudioAif:function(){if(!qx.bom.client.Html.getAudio()){return l;
}var a=document.createElement(k);
return a.canPlayType(T);
},getVideo:function(){return !!document.createElement(U).canPlayType;
},getVideoOgg:function(){if(!qx.bom.client.Html.getVideo()){return l;
}var v=document.createElement(j);
return v.canPlayType(c);
},getVideoH264:function(){if(!qx.bom.client.Html.getVideo()){return l;
}var v=document.createElement(j);
return v.canPlayType(bb);
},getVideoWebm:function(){if(!qx.bom.client.Html.getVideo()){return l;
}var v=document.createElement(j);
return v.canPlayType(S);
},getLocalStorage:function(){try{return window.localStorage!=null;
}catch(bi){return false;
}},getSessionStorage:function(){try{return window.sessionStorage!=null;
}catch(bj){return false;
}},getClassList:function(){return !!(document.documentElement.classList&&qx.Bootstrap.getClass(document.documentElement.classList)===o);
},getXPath:function(){return !!document.evaluate;
},getXul:function(){try{document.createElementNS(bg,O);
return true;
}catch(e){return false;
}},getSvg:function(){return document.implementation&&document.implementation.hasFeature&&(document.implementation.hasFeature(s,M)||document.implementation.hasFeature(be,m));
},getVml:function(){return qx.bom.client.Engine.getName()==D;
},getCanvas:function(){return !!window.CanvasRenderingContext2D;
},getDataUrl:function(bk){var bl=new Image();
bl.onload=bl.onerror=function(){window.setTimeout(function(){bk.call(null,(bl.width==1&&bl.height==1));
},0);
};
bl.src=ba;
},getDataset:function(){return !!document.documentElement.dataset;
},getContains:function(){return (typeof document.documentElement.contains!==i);
},getCompareDocumentPosition:function(){return (typeof document.documentElement.compareDocumentPosition===g);
},getTextContent:function(){var bm=document.createElement(z);
return (typeof bm.textContent!==i);
},getConsole:function(){return typeof window.console!==i;
},getNaturalDimensions:function(){var bn=document.createElement(A);
return typeof bn.naturalHeight===h&&typeof bn.naturalWidth===h;
}},defer:function(bo){qx.core.Environment.add(w,bo.getWebWorker),qx.core.Environment.add(K,bo.getFileReader),qx.core.Environment.add(r,bo.getGeoLocation),qx.core.Environment.add(Y,bo.getAudio),qx.core.Environment.add(J,bo.getAudioOgg),qx.core.Environment.add(N,bo.getAudioMp3),qx.core.Environment.add(L,bo.getAudioWav),qx.core.Environment.add(R,bo.getAudioAu),qx.core.Environment.add(x,bo.getAudioAif),qx.core.Environment.add(q,bo.getVideo),qx.core.Environment.add(bf,bo.getVideoOgg),qx.core.Environment.add(f,bo.getVideoH264),qx.core.Environment.add(P,bo.getVideoWebm),qx.core.Environment.add(bd,bo.getLocalStorage),qx.core.Environment.add(p,bo.getSessionStorage),qx.core.Environment.add(t,bo.getClassList),qx.core.Environment.add(W,bo.getXPath),qx.core.Environment.add(bh,bo.getXul),qx.core.Environment.add(G,bo.getCanvas),qx.core.Environment.add(H,bo.getSvg),qx.core.Environment.add(F,bo.getVml),qx.core.Environment.add(B,bo.getDataset),qx.core.Environment.addAsync(u,bo.getDataUrl);
qx.core.Environment.add(d,bo.getContains);
qx.core.Environment.add(I,bo.getCompareDocumentPosition);
qx.core.Environment.add(C,bo.getTextContent);
qx.core.Environment.add(b,bo.getConsole);
qx.core.Environment.add(n,bo.getNaturalDimensions);
}});
})();
(function(){var j="",i="undefined",h="readOnly",g="accessKey",f="qx.bom.element.Attribute",e="rowSpan",d="vAlign",c="className",b="textContent",a="'",A="htmlFor",z="longDesc",y="cellSpacing",x="frameBorder",w="='",v="useMap",u="innerText",t="innerHTML",s="tabIndex",r="dateTime",p="maxLength",q="html.element.textcontent",n="mshtml",o="webkit",l="cellPadding",m="browser.documentmode",k="colSpan";
qx.Class.define(f,{statics:{__dt:{names:{"class":c,"for":A,html:t,text:qx.core.Environment.get(q)?b:u,colspan:k,rowspan:e,valign:d,datetime:r,accesskey:g,tabindex:s,maxlength:p,readonly:h,longdesc:z,cellpadding:l,cellspacing:y,frameborder:x,usemap:v},runtime:{"html":1,"text":1},bools:{compact:1,nowrap:1,ismap:1,declare:1,noshade:1,checked:1,disabled:1,readOnly:1,multiple:1,selected:1,noresize:1,defer:1,allowTransparency:1},property:{$$html:1,$$widget:1,disabled:1,checked:1,readOnly:1,multiple:1,selected:1,value:1,maxLength:1,className:1,innerHTML:1,innerText:1,textContent:1,htmlFor:1,tabIndex:1},qxProperties:{$$widget:1,$$html:1},propertyDefault:{disabled:false,checked:false,readOnly:false,multiple:false,selected:false,value:j,className:j,innerHTML:j,innerText:j,textContent:j,htmlFor:j,tabIndex:0,maxLength:524288},removeableProperties:{disabled:1,multiple:1,maxLength:1},original:{href:1,src:1,type:1}},compile:function(B){var C=[];
var E=this.__dt.runtime;

for(var D in B){if(!E[D]){C.push(D,w,B[D],a);
}}return C.join(j);
},get:function(F,name){var H=this.__dt;
var G;
name=H.names[name]||name;
if(o==n&&parseInt(qx.core.Environment.get(m),10)<8&&H.original[name]){G=F.getAttribute(name,2);
}else if(H.property[name]){G=F[name];

if(typeof H.propertyDefault[name]!==i&&G==H.propertyDefault[name]){if(typeof H.bools[name]===i){return null;
}else{return G;
}}}else{G=F.getAttribute(name);
}if(H.bools[name]){return !!G;
}return G;
},set:function(I,name,J){if(typeof J===i){return;
}var K=this.__dt;
name=K.names[name]||name;
if(K.bools[name]){J=!!J;
}if(K.property[name]&&(!(I[name]===undefined)||K.qxProperties[name])){if(J==null){if(K.removeableProperties[name]){I.removeAttribute(name);
return;
}else if(typeof K.propertyDefault[name]!==i){J=K.propertyDefault[name];
}}I[name]=J;
}else{if(J===true){I.setAttribute(name,name);
}else if(J===false||J===null){I.removeAttribute(name);
}else{I.setAttribute(name,J);
}}},reset:function(L,name){this.set(L,name,null);
}}});
})();
(function(){var j="",i="mshtml",h="msie",g="maple",f=")(/| )([0-9]+\.[0-9])",e="(",d="ce",c="CSS1Compat",b="android",a="operamini",H="gecko",G="browser.quirksmode",F="browser.name",E="mobile chrome",D="iemobile",C="prism|Fennec|Camino|Kmeleon|Galeon|Netscape|SeaMonkey|Namoroka|Firefox",B="opera mobi",A="Mobile Safari",z="Maple",y="operamobile",q="ie",r="mobile safari",o="IEMobile|Maxthon|MSIE",p="qx.bom.client.Browser",m="(Maple )([0-9]+\.[0-9]+\.[0-9]*)",n="opera mini",k="browser.version",l="opera",s="Opera Mini|Opera Mobi|Opera",t="AdobeAIR|Titanium|Fluid|Chrome|Android|Epiphany|Konqueror|iCab|OmniWeb|Maxthon|Pre|Mobile Safari|Safari",v="webkit",u="browser.documentmode",x="5.0",w="Mobile/";
qx.Bootstrap.define(p,{statics:{getName:function(){var L=navigator.userAgent;
var K=new RegExp(e+qx.bom.client.Browser.__du+f);
var J=L.match(K);

if(!J){return j;
}var name=J[1].toLowerCase();
var I=qx.bom.client.Engine.getName();

if(I===v){if(name===b){name=E;
}else if(L.indexOf(A)!==-1||L.indexOf(w)!==-1){name=r;
}}else if(I===i){if(name===h){name=q;
if(qx.bom.client.OperatingSystem.getVersion()===d){name=D;
}}}else if(I===l){if(name===B){name=y;
}else if(name===n){name=a;
}}else if(I===H){if(L.indexOf(z)!==-1){name=g;
}}return name;
},getVersion:function(){var P=navigator.userAgent;
var O=new RegExp(e+qx.bom.client.Browser.__du+f);
var N=P.match(O);

if(!N){return j;
}var name=N[1].toLowerCase();
var M=N[3];
if(P.match(/Version(\/| )([0-9]+\.[0-9])/)){M=RegExp.$2;
}
if(qx.bom.client.Engine.getName()==i){M=qx.bom.client.Engine.getVersion();

if(name===h&&qx.bom.client.OperatingSystem.getVersion()==d){M=x;
}}
if(qx.bom.client.Browser.getName()==g){O=new RegExp(m);
N=P.match(O);

if(!N){return j;
}M=N[2];
}return M;
},getDocumentMode:function(){if(document.documentMode){return document.documentMode;
}return 0;
},getQuirksMode:function(){if(qx.bom.client.Engine.getName()==i&&parseFloat(qx.bom.client.Engine.getVersion())>=8){return qx.bom.client.Engine.DOCUMENT_MODE===5;
}else{return document.compatMode!==c;
}},__du:{"webkit":t,"gecko":C,"mshtml":o,"opera":s}[qx.bom.client.Engine.getName()]},defer:function(Q){qx.core.Environment.add(F,Q.getName),qx.core.Environment.add(k,Q.getVersion),qx.core.Environment.add(u,Q.getDocumentMode),qx.core.Environment.add(G,Q.getQuirksMode);
}});
})();
(function(){var j="",i="10.1",h="10.3",g="10.7",f="10.5",e="95",d="10.2",c="98",b="2000",a="10.6",be="10.0",bd="10.4",bc="rim_tabletos",bb="Darwin",ba="os.version",Y="2003",X=")",W="iPhone",V="android",U="unix",q="ce",r="7",o="SymbianOS",p="os.name",m="|",n="MacPPC",k="iPod",l="\.",u="Win64",v="linux",D="me",B="Macintosh",K="Android",F="Windows",Q="ios",O="vista",x="blackberry",T="(",S="win",R="Linux",w="BSD",z="Mac OS X",A="iPad",C="X11",E="xp",G="symbian",L="qx.bom.client.OperatingSystem",P="g",s="Win32",t="osx",y="webOS",J="RIM Tablet OS",I="BlackBerry",H="nt4",N="MacIntel",M="webos";
qx.Bootstrap.define(L,{statics:{getName:function(){if(!navigator){return j;
}var bf=navigator.platform||j;
var bg=navigator.userAgent||j;

if(bf.indexOf(F)!=-1||bf.indexOf(s)!=-1||bf.indexOf(u)!=-1){return S;
}else if(bf.indexOf(B)!=-1||bf.indexOf(n)!=-1||bf.indexOf(N)!=-1||bf.indexOf(z)!=-1){return t;
}else if(bg.indexOf(J)!=-1){return bc;
}else if(bg.indexOf(y)!=-1){return M;
}else if(bf.indexOf(k)!=-1||bf.indexOf(W)!=-1||bf.indexOf(A)!=-1){return Q;
}else if(bf.indexOf(R)!=-1){return v;
}else if(bf.indexOf(C)!=-1||bf.indexOf(w)!=-1||bf.indexOf(bb)!=-1){return U;
}else if(bf.indexOf(K)!=-1){return V;
}else if(bf.indexOf(o)!=-1){return G;
}else if(bf.indexOf(I)!=-1){return x;
}return j;
},__dv:{"Windows NT 6.1":r,"Windows NT 6.0":O,"Windows NT 5.2":Y,"Windows NT 5.1":E,"Windows NT 5.0":b,"Windows 2000":b,"Windows NT 4.0":H,"Win 9x 4.90":D,"Windows CE":q,"Windows 98":c,"Win98":c,"Windows 95":e,"Win95":e,"Mac OS X 10_7":g,"Mac OS X 10.7":g,"Mac OS X 10_6":a,"Mac OS X 10.6":a,"Mac OS X 10_5":f,"Mac OS X 10.5":f,"Mac OS X 10_4":bd,"Mac OS X 10.4":bd,"Mac OS X 10_3":h,"Mac OS X 10.3":h,"Mac OS X 10_2":d,"Mac OS X 10.2":d,"Mac OS X 10_1":i,"Mac OS X 10.1":i,"Mac OS X 10_0":be,"Mac OS X 10.0":be},getVersion:function(){var bj=[];

for(var bi in qx.bom.client.OperatingSystem.__dv){bj.push(bi);
}var bk=new RegExp(T+bj.join(m).replace(/\./g,l)+X,P);
var bh=bk.exec(navigator.userAgent);

if(bh&&bh[1]){return qx.bom.client.OperatingSystem.__dv[bh[1]];
}return j;
}},defer:function(bl){qx.core.Environment.add(p,bl.getName);
qx.core.Environment.add(ba,bl.getVersion);
}});
})();
(function(){var d="=",c="+",b="&",a="qx.lang.Object";
qx.Class.define(a,{statics:{empty:function(e){for(var f in e){if(e.hasOwnProperty(f)){delete e[f];
}}},isEmpty:function(g){for(var h in g){return false;
}return true;
},hasMinLength:function(j,k){if(k<=0){return true;
}var length=0;

for(var m in j){if((++length)>=k){return true;
}}return false;
},getLength:qx.Bootstrap.objectGetLength,getKeys:qx.Bootstrap.getKeys,getKeysAsString:qx.Bootstrap.getKeysAsString,getValues:function(n){var p=[];
var o=this.getKeys(n);

for(var i=0,l=o.length;i<l;i++){p.push(n[o[i]]);
}return p;
},mergeWith:qx.Bootstrap.objectMergeWith,carefullyMergeWith:function(q,r){return qx.lang.Object.mergeWith(q,r,false);
},merge:function(s,t){var u=arguments.length;

for(var i=1;i<u;i++){qx.lang.Object.mergeWith(s,arguments[i]);
}return s;
},clone:function(v){var w={};

for(var x in v){w[x]=v[x];
}return w;
},invert:function(y){var z={};

for(var A in y){z[y[A].toString()]=A;
}return z;
},getKeyFromValue:function(B,C){for(var D in B){if(B.hasOwnProperty(D)&&B[D]===C){return D;
}}return null;
},contains:function(E,F){return this.getKeyFromValue(E,F)!==null;
},select:function(G,H){return H[G];
},fromArray:function(I){var J={};

for(var i=0,l=I.length;i<l;i++){J[I[i].toString()]=true;
}return J;
},toUriParameter:function(K,L){var O,N=[],M=window.encodeURIComponent;

for(O in K){if(K.hasOwnProperty(O)){if(L){N.push(M(O).replace(/%20/g,c)+d+M(K[O]).replace(/%20/g,c));
}else{N.push(M(O)+d+M(K[O]));
}}}return N.join(b);
}}});
})();
(function(){var s="html.classlist",r="default",q="native",p="",o=" ",n='',m="(^|\\s)",k="(\\s|$)",j="\\b",h="g",c='function',g="\\b|\\b",f="qx.bom.element.Class",b='SVGAnimatedString',a='object',e="$2",d='undefined';
qx.Class.define(f,{statics:{__dw:/\s+/g,__dx:/^\s+|\s+$/g,add:qx.lang.Object.select(qx.core.Environment.get(s)?q:r,{"native":function(t,name){t.classList.add(name);
return name;
},"default":function(u,name){if(!this.has(u,name)){u.className+=(u.className?o:p)+name;
}return name;
}}),addClasses:qx.lang.Object.select(qx.core.Environment.get(s)?q:r,{"native":function(v,w){for(var i=0;i<w.length;i++){v.classList.add(w[i]);
}return v.className;
},"default":function(x,y){var z={};
var B;
var A=x.className;

if(A){B=A.split(this.__dw);

for(var i=0,l=B.length;i<l;i++){z[B[i]]=true;
}
for(var i=0,l=y.length;i<l;i++){if(!z[y[i]]){B.push(y[i]);
}}}else{B=y;
}return x.className=B.join(o);
}}),get:function(C){var D=C.className;

if(typeof D.split!==c){if(typeof D===a){if(qx.Bootstrap.getClass(D)==b){D=D.baseVal;
}else{D=n;
}}
if(typeof D===d){D=n;
}}return D;
},has:qx.lang.Object.select(qx.core.Environment.get(s)?q:r,{"native":function(E,name){return E.classList.contains(name);
},"default":function(F,name){var G=new RegExp(m+name+k);
return G.test(F.className);
}}),remove:qx.lang.Object.select(qx.core.Environment.get(s)?q:r,{"native":function(H,name){H.classList.remove(name);
return name;
},"default":function(I,name){var J=new RegExp(m+name+k);
I.className=I.className.replace(J,e);
return name;
}}),removeClasses:qx.lang.Object.select(qx.core.Environment.get(s)?q:r,{"native":function(K,L){for(var i=0;i<L.length;i++){K.classList.remove(L[i]);
}return K.className;
},"default":function(M,N){var O=new RegExp(j+N.join(g)+j,h);
return M.className=M.className.replace(O,p).replace(this.__dx,p).replace(this.__dw,o);
}}),replace:function(P,Q,R){this.remove(P,Q);
return this.add(P,R);
},toggle:qx.lang.Object.select(qx.core.Environment.get(s)?q:r,{"native":function(S,name,T){if(T===undefined){S.classList.toggle(name);
}else{T?this.add(S,name):this.remove(S,name);
}return name;
},"default":function(U,name,V){if(V==null){V=!this.has(U,name);
}V?this.add(U,name):this.remove(U,name);
return name;
}})}});
})();
(function(){var e="orientationchange",d="resize",c="landscape",b="portrait",a="qx.event.handler.Orientation";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(f){qx.core.Object.call(this);
this.__df=f;
this.__cy=f.getWindow();
this._initObserver();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{orientationchange:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{__df:null,__cy:null,__dy:null,__dz:null,__dA:null,canHandleEvent:function(g,h){},registerEvent:function(i,j,k){},unregisterEvent:function(l,m,n){},_initObserver:function(){this.__dA=qx.lang.Function.listener(this._onNative,this);
this.__dy=qx.bom.Event.supportsEvent(this.__cy,e)?e:d;
var Event=qx.bom.Event;
Event.addNativeListener(this.__cy,this.__dy,this.__dA);
},_stopObserver:function(){var Event=qx.bom.Event;
Event.removeNativeListener(this.__cy,this.__dy,this.__dA);
},_onNative:qx.event.GlobalError.observeMethod(function(o){var q=qx.bom.Viewport;
var p=q.getOrientation();

if(this.__dz!=p){this.__dz=p;
var r=q.isLandscape()?c:b;
qx.event.Registration.fireEvent(this.__cy,e,qx.event.type.Orientation,[p,r]);
}})},destruct:function(){this._stopObserver();
this.__df=this.__cy=null;
},defer:function(s){qx.event.Registration.addHandler(s);
}});
})();
(function(){var c="landscape",b="qx.event.type.Orientation",a="portrait";
qx.Class.define(b,{extend:qx.event.type.Event,members:{__dB:null,__dC:null,init:function(d,e){qx.event.type.Event.prototype.init.call(this,false,false);
this.__dB=d;
this.__dC=e;
return this;
},clone:function(f){var g=qx.event.type.Event.prototype.clone.call(this,f);
g.__dB=this.__dB;
g.__dC=this.__dC;
return g;
},getOrientation:function(){return this.__dB;
},isLandscape:function(){return this.__dC==c;
},isPortrait:function(){return this.__dC==a;
}}});
})();
(function(){var l="mshtml",k="event.pointer",j="onhashchange",i="event.help",h="event.touch",g="opera",f="event.hashchange",e="onhelp",d="pointerEvents",c="documentMode",a="qx.bom.client.Event",b="ontouchstart";
qx.Bootstrap.define(a,{statics:{getTouch:function(){return (b in window);
},getPointer:function(){if(d in document.documentElement.style){var m=qx.bom.client.Engine.getName();
return m!=g&&m!=l;
}return false;
},getHelp:function(){return (e in document);
},getHashChange:function(){var n=qx.bom.client.Engine.getName();
var o=j in window;
return (n!==l&&o)||(n===l&&c in document&&document.documentMode>=8&&o);
}},defer:function(p){qx.core.Environment.add(h,p.getTouch);
qx.core.Environment.add(k,p.getPointer);
qx.core.Environment.add(i,p.getHelp);
qx.core.Environment.add(f,p.getHashChange);
}});
})();
(function(){var a="qx.event.handler.UserAction";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(b){qx.core.Object.call(this);
this.__df=b;
this.__cy=b.getWindow();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{useraction:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{__df:null,__cy:null,canHandleEvent:function(c,d){},registerEvent:function(e,f,g){},unregisterEvent:function(h,i,j){}},destruct:function(){this.__df=this.__cy=null;
},defer:function(k){qx.event.Registration.addHandler(k);
}});
})();
(function(){var o="touchend",n="touchstart",m="touchmove",l="event.touch",k="mousemove",j="mouseup",i="touchcancel",h="mousedown",g="qx.event.handler.Touch",f="useraction",b="swipe",d="tap",c="x",a="y";
qx.Class.define(g,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(p){qx.core.Object.call(this);
this.__df=p;
this.__cy=p.getWindow();
this.__cR=this.__cy.document;
this._initTouchObserver();
this._initMouseObserver();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{touchstart:1,touchmove:1,touchend:1,touchcancel:1,tap:1,swipe:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE+qx.event.IEventHandler.TARGET_DOCUMENT,IGNORE_CAN_HANDLE:true,MOUSE_TO_TOUCH_MAPPING:{"mousedown":"touchstart","mousemove":"touchmove","mouseup":"touchend"},SWIPE_DIRECTION:{x:["left","right"],y:["up","down"]},TAP_MAX_DISTANCE:qx.core.Environment.get("os.name")!="android"?10:40,SWIPE_MIN_DISTANCE:qx.core.Environment.get("os.name")!="android"?11:41,SWIPE_MIN_VELOCITY:0},members:{__dD:null,__dE:null,__df:null,__cy:null,__cR:null,__dF:null,__dG:null,__dH:null,__dI:null,__dJ:false,__dK:null,canHandleEvent:function(q,r){},registerEvent:function(s,t,u){},unregisterEvent:function(v,w,x){},__dL:function(y){var z=qx.bom.Event.getTarget(y);
{if(z&&z.nodeType==3){z=z.parentNode;
}};
return z;
},__dM:function(A,B,C,D){if(!C){C=this.__dL(A);
}var B=B||A.type;

if(C&&C.nodeType){qx.event.Registration.fireEvent(C,B,D||qx.event.type.Touch,[A,C,null,true,true]);
}qx.event.Registration.fireEvent(this.__cy,f,qx.event.type.Data,[B]);
},__dN:function(E,F,G){if(!G){G=this.__dL(E);
}var F=F||E.type;

if(F==n){this.__dO(E,G);
}else if(F==m){this.__dP(E,G);
}else if(F==o){this.__dQ(E,G);
}},__dO:function(H,I){var J=H.changedTouches[0];
this.__dF=J.screenX;
this.__dG=J.screenY;
this.__dH=new Date().getTime();
this.__dI=H.changedTouches.length===1;
},__dP:function(K,L){if(this.__dI&&K.changedTouches.length>1){this.__dI=false;
}},__dQ:function(M,N){if(this.__dI){var O=M.changedTouches[0];
var Q={x:O.screenX-this.__dF,y:O.screenY-this.__dG};
var R=qx.event.handler.Touch;

if(this.__dK==N&&Math.abs(Q.x)<=R.TAP_MAX_DISTANCE&&Math.abs(Q.y)<=R.TAP_MAX_DISTANCE){this.__dM(M,d,N,qx.event.type.Tap);
}else{var P=this.__dR(M,N,Q);

if(P){M.swipe=P;
this.__dM(M,b,N,qx.event.type.Swipe);
}}}},__dR:function(S,T,U){var Y=qx.event.handler.Touch;
var ba=new Date().getTime()-this.__dH;
var bc=(Math.abs(U.x)>=Math.abs(U.y))?c:a;
var V=U[bc];
var W=Y.SWIPE_DIRECTION[bc][V<0?0:1];
var bb=(ba!==0)?V/ba:0;
var X=null;

if(Math.abs(bb)>=Y.SWIPE_MIN_VELOCITY&&Math.abs(V)>=Y.SWIPE_MIN_DISTANCE){X={startTime:this.__dH,duration:ba,axis:bc,direction:W,distance:V,velocity:bb};
}return X;
},__dS:function(bd){var be=bd.type;
var bg=qx.event.handler.Touch.MOUSE_TO_TOUCH_MAPPING;

if(bg[be]){be=bg[be];
if(be==n&&this.__dT(bd)){this.__dJ=true;
}else if(be==o){this.__dJ=false;
}var bh=this.__dU(bd);
var bf=(be==o?[]:[bh]);
bd.touches=bf;
bd.targetTouches=bf;
bd.changedTouches=[bh];
}return be;
},__dT:function(bi){{var bj=0;
};
return bi.button==bj;
},__dU:function(bk){var bl=this.__dL(bk);
return {clientX:bk.clientX,clientY:bk.clientY,screenX:bk.screenX,screenY:bk.screenY,pageX:bk.pageX,pageY:bk.pageY,identifier:1,target:bl};
},_initTouchObserver:function(){this.__dD=qx.lang.Function.listener(this._onTouchEvent,this);
var Event=qx.bom.Event;
Event.addNativeListener(this.__cR,n,this.__dD);
Event.addNativeListener(this.__cR,m,this.__dD);
Event.addNativeListener(this.__cR,o,this.__dD);
Event.addNativeListener(this.__cR,i,this.__dD);
},_initMouseObserver:function(){if(!qx.core.Environment.get(l)){this.__dE=qx.lang.Function.listener(this._onMouseEvent,this);
var Event=qx.bom.Event;
Event.addNativeListener(this.__cR,h,this.__dE);
Event.addNativeListener(this.__cR,k,this.__dE);
Event.addNativeListener(this.__cR,j,this.__dE);
}},_stopTouchObserver:function(){var Event=qx.bom.Event;
Event.removeNativeListener(this.__cR,n,this.__dD);
Event.removeNativeListener(this.__cR,m,this.__dD);
Event.removeNativeListener(this.__cR,o,this.__dD);
Event.removeNativeListener(this.__cR,i,this.__dD);
},_stopMouseObserver:function(){if(!qx.core.Environment.get(l)){var Event=qx.bom.Event;
Event.removeNativeListener(this.__cR,h,this.__dE);
Event.removeNativeListener(this.__cR,k,this.__dE);
Event.removeNativeListener(this.__cR,j,this.__dE);
}},_onTouchEvent:qx.event.GlobalError.observeMethod(function(bm){this._commonTouchEventHandler(bm);
}),_onMouseEvent:qx.event.GlobalError.observeMethod(function(bn){if(!qx.core.Environment.get(l)){if(bn.type==k&&!this.__dJ){return;
}var bo=this.__dS(bn);
this._commonTouchEventHandler(bn,bo);
}}),_commonTouchEventHandler:function(bp,bq){var bq=bq||bp.type;

if(bq==n){this.__dK=this.__dL(bp);
}this.__dM(bp,bq);
this.__dN(bp,bq);
}},destruct:function(){this._stopTouchObserver();
this._stopMouseObserver();
this.__df=this.__cy=this.__cR=this.__dK=null;
},defer:function(br){qx.event.Registration.addHandler(br);
if(qx.core.Environment.get(l)){{document.addEventListener(m,function(e){e.preventDefault();
});
};
qx.event.Registration.getManager(document).getHandler(br);
}}});
})();
(function(){var a="qx.event.type.Native";
qx.Class.define(a,{extend:qx.event.type.Event,members:{init:function(b,c,d,e,f){qx.event.type.Event.prototype.init.call(this,e,f);
this._target=c||qx.bom.Event.getTarget(b);
this._relatedTarget=d||qx.bom.Event.getRelatedTarget(b);

if(b.timeStamp){this._timeStamp=b.timeStamp;
}this._native=b;
this._returnValue=null;
return this;
},clone:function(g){var h=qx.event.type.Event.prototype.clone.call(this,g);
var i={};
h._native=this._cloneNativeEvent(this._native,i);
h._returnValue=this._returnValue;
return h;
},_cloneNativeEvent:function(j,k){k.preventDefault=qx.lang.Function.empty;
return k;
},preventDefault:function(){qx.event.type.Event.prototype.preventDefault.call(this);
qx.bom.Event.preventDefault(this._native);
},getNativeEvent:function(){return this._native;
},setReturnValue:function(l){this._returnValue=l;
},getReturnValue:function(){return this._returnValue;
}},destruct:function(){this._native=this._returnValue=null;
}});
})();
(function(){var c="os.name",b="qx.event.type.Dom",a="osx";
qx.Class.define(b,{extend:qx.event.type.Native,statics:{SHIFT_MASK:1,CTRL_MASK:2,ALT_MASK:4,META_MASK:8},members:{_cloneNativeEvent:function(d,e){var e=qx.event.type.Native.prototype._cloneNativeEvent.call(this,d,e);
e.shiftKey=d.shiftKey;
e.ctrlKey=d.ctrlKey;
e.altKey=d.altKey;
e.metaKey=d.metaKey;
return e;
},getModifiers:function(){var g=0;
var f=this._native;

if(f.shiftKey){g|=qx.event.type.Dom.SHIFT_MASK;
}
if(f.ctrlKey){g|=qx.event.type.Dom.CTRL_MASK;
}
if(f.altKey){g|=qx.event.type.Dom.ALT_MASK;
}
if(f.metaKey){g|=qx.event.type.Dom.META_MASK;
}return g;
},isCtrlPressed:function(){return this._native.ctrlKey;
},isShiftPressed:function(){return this._native.shiftKey;
},isAltPressed:function(){return this._native.altKey;
},isMetaPressed:function(){return this._native.metaKey;
},isCtrlOrCommandPressed:function(){if(qx.core.Environment.get(c)==a){return this._native.metaKey;
}else{return this._native.ctrlKey;
}}}});
})();
(function(){var c="touchcancel",b="qx.event.type.Touch",a="touchend";
qx.Class.define(b,{extend:qx.event.type.Dom,members:{_cloneNativeEvent:function(d,e){var e=qx.event.type.Dom.prototype._cloneNativeEvent.call(this,d,e);
e.pageX=d.pageX;
e.pageY=d.pageY;
e.layerX=d.layerX;
e.layerY=d.layerY;
e.scale=d.scale;
e.rotation=d.rotation;
e.srcElement=d.srcElement;
e.targetTouches=[];

for(var i=0;i<d.targetTouches.length;i++){e.targetTouches[i]=d.targetTouches[i];
}e.changedTouches=[];

for(var i=0;i<d.changedTouches.length;i++){e.changedTouches[i]=d.changedTouches[i];
}e.touches=[];

for(var i=0;i<d.touches.length;i++){e.touches[i]=d.touches[i];
}return e;
},stop:function(){this.stopPropagation();
},getAllTouches:function(){return this._native.touches;
},getTargetTouches:function(){return this._native.targetTouches;
},getChangedTargetTouches:function(){return this._native.changedTouches;
},isMultiTouch:function(){return this.__dW().length>1;
},getScale:function(){return this._native.scale;
},getRotation:function(){return this._native.rotation;
},getDocumentLeft:function(f){return this.__dV(f).pageX;
},getDocumentTop:function(g){return this.__dV(g).pageY;
},getScreenLeft:function(h){return this.__dV(h).screenX;
},getScreenTop:function(j){return this.__dV(j).screenY;
},getViewportLeft:function(k){return this.__dV(k).clientX;
},getViewportTop:function(l){return this.__dV(l).clientY;
},getIdentifier:function(m){return this.__dV(m).identifier;
},__dV:function(n){n=n==null?0:n;
return this.__dW()[n];
},__dW:function(){var o=(this._isTouchEnd()?this.getChangedTargetTouches():this.getTargetTouches());
return o;
},_isTouchEnd:function(){return (this.getType()==a||this.getType()==c);
}}});
})();
(function(){var a="qx.event.type.Tap";
qx.Class.define(a,{extend:qx.event.type.Touch,members:{_isTouchEnd:function(){return true;
}}});
})();
(function(){var a="qx.event.type.Swipe";
qx.Class.define(a,{extend:qx.event.type.Touch,members:{_cloneNativeEvent:function(b,c){var c=qx.event.type.Touch.prototype._cloneNativeEvent.call(this,b,c);
c.swipe=b.swipe;
return c;
},_isTouchEnd:function(){return true;
},getStartTime:function(){return this._native.swipe.startTime;
},getDuration:function(){return this._native.swipe.duration;
},getAxis:function(){return this._native.swipe.axis;
},getDirection:function(){return this._native.swipe.direction;
},getVelocity:function(){return this._native.swipe.velocity;
},getDistance:function(){return this._native.swipe.distance;
}}});
})();
(function(){var c="qx.event.handler.Appear",b="disappear",a="appear";
qx.Class.define(c,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(d){qx.core.Object.call(this);
this.__df=d;
this.__dX={};
qx.event.handler.Appear.__dY[this.$$hash]=this;
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{appear:true,disappear:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true,__dY:{},refresh:function(){var e=this.__dY;

for(var f in e){e[f].refresh();
}}},members:{__df:null,__dX:null,canHandleEvent:function(g,h){},registerEvent:function(i,j,k){var l=qx.core.ObjectRegistry.toHashCode(i)+j;
var m=this.__dX;

if(m&&!m[l]){m[l]=i;
i.$$displayed=i.offsetWidth>0;
}},unregisterEvent:function(n,o,p){var q=qx.core.ObjectRegistry.toHashCode(n)+o;
var r=this.__dX;

if(!r){return;
}
if(r[q]){delete r[q];
}},refresh:function(){var v=this.__dX;
var w;

for(var u in v){w=v[u];
var s=w.offsetWidth>0;

if((!!w.$$displayed)!==s){w.$$displayed=s;
var t=qx.event.Registration.createEvent(s?a:b);
this.__df.dispatchEvent(w,t);
}}}},destruct:function(){this.__df=this.__dX=null;
delete qx.event.handler.Appear.__dY[this.$$hash];
},defer:function(x){qx.event.Registration.addHandler(x);
}});
})();
(function(){var b="qx.ui.mobile.core.DomUpdatedHandler",a="domupdated";
qx.Class.define(b,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(c){qx.core.Object.call(this);
this.__df=c;
this.__dX={};
qx.ui.mobile.core.DomUpdatedHandler.__dY[this.$$hash]=this;
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{domupdated:1},IGNORE_CAN_HANDLE:false,__dY:{},refresh:function(){var d=this.__dY;

for(var e in d){d[e].refresh();
}}},members:{__df:null,__dX:null,canHandleEvent:function(f,g){return f instanceof qx.ui.mobile.core.Widget;
},registerEvent:function(h,i,j){var k=h.$$hash;
var l=this.__dX;

if(l&&!l[k]){l[k]=h;
}},unregisterEvent:function(m,n,o){var p=m.$$hash;
var q=this.__dX;

if(!q){return;
}
if(q[p]){delete q[p];
}},refresh:function(){var t=this.__dX;
var u;

for(var s in t){u=t[s];

if(u&&!u.$$disposed&&u.isSeeable()){var r=qx.event.Registration.createEvent(a);
this.__df.dispatchEvent(u,r);
}}}},destruct:function(){this.__df=this.__dX=null;
delete qx.ui.mobile.core.DomUpdatedHandler.__dY[this.$$hash];
},defer:function(v){qx.event.Registration.addHandler(v);
}});
})();
(function(){var b="abstract",a="qx.event.dispatch.AbstractBubbling";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventDispatcher,type:b,construct:function(c){this._manager=c;
},members:{_getParent:function(d){throw new Error("Missing implementation");
},canDispatchEvent:function(e,event,f){return event.getBubbles();
},dispatchEvent:function(g,event,h){var parent=g;
var s=this._manager;
var p,w;
var n;
var r,u;
var t;
var v=[];
p=s.getListeners(g,h,true);
w=s.getListeners(g,h,false);

if(p){v.push(p);
}
if(w){v.push(w);
}var parent=this._getParent(g);
var l=[];
var k=[];
var m=[];
var q=[];
while(parent!=null){p=s.getListeners(parent,h,true);

if(p){m.push(p);
q.push(parent);
}w=s.getListeners(parent,h,false);

if(w){l.push(w);
k.push(parent);
}parent=this._getParent(parent);
}event.setEventPhase(qx.event.type.Event.CAPTURING_PHASE);

for(var i=m.length-1;i>=0;i--){t=q[i];
event.setCurrentTarget(t);
n=m[i];

for(var j=0,o=n.length;j<o;j++){r=n[j];
u=r.context||t;
r.handler.call(u,event);
}
if(event.getPropagationStopped()){return;
}}event.setEventPhase(qx.event.type.Event.AT_TARGET);
event.setCurrentTarget(g);

for(var i=0,x=v.length;i<x;i++){n=v[i];

for(var j=0,o=n.length;j<o;j++){r=n[j];
u=r.context||g;
r.handler.call(u,event);
}
if(event.getPropagationStopped()){return;
}}event.setEventPhase(qx.event.type.Event.BUBBLING_PHASE);

for(var i=0,x=l.length;i<x;i++){t=k[i];
event.setCurrentTarget(t);
n=l[i];

for(var j=0,o=n.length;j<o;j++){r=n[j];
u=r.context||t;
r.handler.call(u,event);
}
if(event.getPropagationStopped()){return;
}}}}});
})();
(function(){var a="qx.event.dispatch.DomBubbling";
qx.Class.define(a,{extend:qx.event.dispatch.AbstractBubbling,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL},members:{_getParent:function(b){return b.parentNode;
},canDispatchEvent:function(c,event,d){return c.nodeType!==undefined&&event.getBubbles();
}},defer:function(e){qx.event.Registration.addDispatcher(e);
}});
})();
(function(){var d="-",c="qx.event.handler.Element",b="load",a="iframe";
qx.Class.define(c,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(e){qx.core.Object.call(this);
this._manager=e;
this._registeredEvents={};
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{abort:true,load:true,scroll:true,select:true,reset:true,submit:true},CANCELABLE:{selectstart:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:false},members:{canHandleEvent:function(f,g){if(g===b){return f.tagName.toLowerCase()!==a;
}else{return true;
}},registerEvent:function(h,i,j){var m=qx.core.ObjectRegistry.toHashCode(h);
var k=m+d+i;
var l=qx.lang.Function.listener(this._onNative,this,k);
qx.bom.Event.addNativeListener(h,i,l);
this._registeredEvents[k]={element:h,type:i,listener:l};
},unregisterEvent:function(n,o,p){var s=this._registeredEvents;

if(!s){return;
}var t=qx.core.ObjectRegistry.toHashCode(n);
var q=t+d+o;
var r=this._registeredEvents[q];

if(r){qx.bom.Event.removeNativeListener(n,o,r.listener);
}delete this._registeredEvents[q];
},_onNative:qx.event.GlobalError.observeMethod(function(u,v){var x=this._registeredEvents;

if(!x){return;
}var w=x[v];
var y=this.constructor.CANCELABLE[w.type];
qx.event.Registration.fireNonBubblingEvent(w.element,w.type,qx.event.type.Native,[u,undefined,undefined,undefined,y]);
})},destruct:function(){var z;
var A=this._registeredEvents;

for(var B in A){z=A[B];
qx.bom.Event.removeNativeListener(z.element,z.type,z.listener);
}this._manager=this._registeredEvents=null;
},defer:function(C){qx.event.Registration.addHandler(C);
}});
})();
(function(){var m="keydown",l="keypress",k="keyup",j="Enter",i="engine.version",h="NumLock",g="0",f="9",e="-",d="PageUp",bq="+",bp="PrintScreen",bo="os.name",bn="A",bm="Space",bl="Left",bk="F5",bj="Down",bi="Up",bh="F11",t="F6",u="useraction",r="osx",s="keyinput",p="Insert",q="F8",n="End",o="/",B="Delete",C="*",M="cmd",J="F1",U="F4",P="Home",bd="F2",ba="F12",F="PageDown",bg="F7",bf="Win",be="F9",E="F10",H="Right",I="F3",L="Z",N="Escape",Q="5",W="3",bc="Meta",v="7",w="CapsLock",G="Scroll",T="Control",S="Tab",R="Shift",Y="Pause",X="Unidentified",O="qx.event.handler.Keyboard",V="Apps",a="6",bb="4",x="Alt",y="2",K="mshtml",b="1",c="8",D="webkit",z=",",A="Backspace";
qx.Class.define(O,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(br){qx.core.Object.call(this);
this.__df=br;
this.__cy=br.getWindow();
{this.__cR=this.__cy.document.documentElement;
};
this.__ea={};
this._initKeyObserver();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{keyup:1,keydown:1,keypress:1,keyinput:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true,isValidKeyIdentifier:function(bs){if(this._identifierToKeyCodeMap[bs]){return true;
}
if(bs.length!=1){return false;
}
if(bs>=g&&bs<=f){return true;
}
if(bs>=bn&&bs<=L){return true;
}
switch(bs){case bq:case e:case C:case o:return true;
default:return false;
}},isPrintableKeyIdentifier:function(bt){if(bt===bm){return true;
}else{return this._identifierToKeyCodeMap[bt]?false:true;
}}},members:{__eb:null,__df:null,__cy:null,__cR:null,__ea:null,__ec:null,__ed:null,__ee:null,canHandleEvent:function(bu,bv){},registerEvent:function(bw,bx,by){},unregisterEvent:function(bz,bA,bB){},_fireInputEvent:function(bC,bD){var bE=this.__ef();
if(bE&&bE.offsetWidth!=0){var event=qx.event.Registration.createEvent(s,qx.event.type.KeyInput,[bC,bE,bD]);
this.__df.dispatchEvent(bE,event);
}if(this.__cy){qx.event.Registration.fireEvent(this.__cy,u,qx.event.type.Data,[s]);
}},_fireSequenceEvent:function(bF,bG,bH){var bI=this.__ef();
var bJ=bF.keyCode;
var event=qx.event.Registration.createEvent(bG,qx.event.type.KeySequence,[bF,bI,bH]);
this.__df.dispatchEvent(bI,event);
if(D==K||true){if(bG==m&&event.getDefaultPrevented()){if(!this._isNonPrintableKeyCode(bJ)&&!this._emulateKeyPress[bJ]){this._fireSequenceEvent(bF,l,bH);
}}}if(this.__cy){qx.event.Registration.fireEvent(this.__cy,u,qx.event.type.Data,[bG]);
}},__ef:function(){var bK=this.__df.getHandler(qx.event.handler.Focus);
var bL=bK.getActive();
if(!bL||bL.offsetWidth==0){bL=bK.getFocus();
}if(!bL||bL.offsetWidth==0){bL=this.__df.getWindow().document.body;
}return bL;
},_initKeyObserver:function(){this.__eb=qx.lang.Function.listener(this.__eg,this);
this.__ee=qx.lang.Function.listener(this.__ei,this);
var Event=qx.bom.Event;
Event.addNativeListener(this.__cR,k,this.__eb);
Event.addNativeListener(this.__cR,m,this.__eb);
Event.addNativeListener(this.__cR,l,this.__ee);
},_stopKeyObserver:function(){var Event=qx.bom.Event;
Event.removeNativeListener(this.__cR,k,this.__eb);
Event.removeNativeListener(this.__cR,m,this.__eb);
Event.removeNativeListener(this.__cR,l,this.__ee);

for(var bN in (this.__ed||{})){var bM=this.__ed[bN];
Event.removeNativeListener(bM.target,l,bM.callback);
}delete (this.__ed);
},__eg:qx.event.GlobalError.observeMethod(function(bO){var bR=0;
var bP=0;
var bQ=bO.type;
if(parseFloat(qx.core.Environment.get(i))<525.13){if(bQ==k||bQ==m){bR=this._charCode2KeyCode[bO.charCode]||bO.keyCode;
}else{if(this._charCode2KeyCode[bO.charCode]){bR=this._charCode2KeyCode[bO.charCode];
}else{bP=bO.charCode;
}}this._idealKeyHandler(bR,bP,bQ,bO);
}else{bR=bO.keyCode;
this._idealKeyHandler(bR,bP,bQ,bO);
if(bQ==m){if(this._isNonPrintableKeyCode(bR)||this._emulateKeyPress[bR]){this._idealKeyHandler(bR,bP,l,bO);
}}this.__ea[bR]=bQ;
}}),__eh:null,__ei:qx.event.GlobalError.observeMethod(function(bS){if(parseFloat(qx.core.Environment.get(i))<525.13){var bV=0;
var bT=0;
var bU=bS.type;

if(bU==k||bU==m){bV=this._charCode2KeyCode[bS.charCode]||bS.keyCode;
}else{if(this._charCode2KeyCode[bS.charCode]){bV=this._charCode2KeyCode[bS.charCode];
}else{bT=bS.charCode;
}}this._idealKeyHandler(bV,bT,bU,bS);
}else{if(this._charCode2KeyCode[bS.keyCode]){this._idealKeyHandler(this._charCode2KeyCode[bS.keyCode],0,bS.type,bS);
}else{this._idealKeyHandler(0,bS.keyCode,bS.type,bS);
}}}),_idealKeyHandler:function(bW,bX,bY,ca){var cb;
if(bW||(!bW&&!bX)){cb=this._keyCodeToIdentifier(bW);
this._fireSequenceEvent(ca,bY,cb);
}else{cb=this._charCodeToIdentifier(bX);
this._fireSequenceEvent(ca,l,cb);
this._fireInputEvent(ca,bX);
}},_specialCharCodeMap:{8:A,9:S,13:j,27:N,32:bm},_emulateKeyPress:{8:true,9:true,27:true},_keyCodeToIdentifierMap:{16:R,17:T,18:x,20:w,224:bc,37:bl,38:bi,39:H,40:bj,33:d,34:F,35:n,36:P,45:p,46:B,112:J,113:bd,114:I,115:U,116:bk,117:t,118:bg,119:q,120:be,121:E,122:bh,123:ba,144:h,44:bp,145:G,19:Y,91:qx.core.Environment.get(bo)==r?M:bf,92:bf,93:qx.core.Environment.get(bo)==r?M:V},_numpadToCharCode:{96:g.charCodeAt(0),97:b.charCodeAt(0),98:y.charCodeAt(0),99:W.charCodeAt(0),100:bb.charCodeAt(0),101:Q.charCodeAt(0),102:a.charCodeAt(0),103:v.charCodeAt(0),104:c.charCodeAt(0),105:f.charCodeAt(0),106:C.charCodeAt(0),107:bq.charCodeAt(0),109:e.charCodeAt(0),110:z.charCodeAt(0),111:o.charCodeAt(0)},_charCodeA:bn.charCodeAt(0),_charCodeZ:L.charCodeAt(0),_charCode0:g.charCodeAt(0),_charCode9:f.charCodeAt(0),_isNonPrintableKeyCode:function(cc){return this._keyCodeToIdentifierMap[cc]?true:false;
},_isIdentifiableKeyCode:function(cd){if(cd>=this._charCodeA&&cd<=this._charCodeZ){return true;
}if(cd>=this._charCode0&&cd<=this._charCode9){return true;
}if(this._specialCharCodeMap[cd]){return true;
}if(this._numpadToCharCode[cd]){return true;
}if(this._isNonPrintableKeyCode(cd)){return true;
}return false;
},_keyCodeToIdentifier:function(ce){if(this._isIdentifiableKeyCode(ce)){var cf=this._numpadToCharCode[ce];

if(cf){return String.fromCharCode(cf);
}return (this._keyCodeToIdentifierMap[ce]||this._specialCharCodeMap[ce]||String.fromCharCode(ce));
}else{return X;
}},_charCodeToIdentifier:function(cg){return this._specialCharCodeMap[cg]||String.fromCharCode(cg).toUpperCase();
},_identifierToKeyCode:function(ch){return qx.event.handler.Keyboard._identifierToKeyCodeMap[ch]||ch.charCodeAt(0);
}},destruct:function(){this._stopKeyObserver();
this.__ec=this.__df=this.__cy=this.__cR=this.__ea=null;
},defer:function(ci,cj){qx.event.Registration.addHandler(ci);
if(!ci._identifierToKeyCodeMap){ci._identifierToKeyCodeMap={};

for(var ck in cj._keyCodeToIdentifierMap){ci._identifierToKeyCodeMap[cj._keyCodeToIdentifierMap[ck]]=parseInt(ck,10);
}
for(var ck in cj._specialCharCodeMap){ci._identifierToKeyCodeMap[cj._specialCharCodeMap[ck]]=parseInt(ck,10);
}}{if(parseFloat(qx.core.Environment.get(i))<525.13){cj._charCode2KeyCode={63289:cj._identifierToKeyCode(h),63276:cj._identifierToKeyCode(d),63277:cj._identifierToKeyCode(F),63275:cj._identifierToKeyCode(n),63273:cj._identifierToKeyCode(P),63234:cj._identifierToKeyCode(bl),63232:cj._identifierToKeyCode(bi),63235:cj._identifierToKeyCode(H),63233:cj._identifierToKeyCode(bj),63272:cj._identifierToKeyCode(B),63302:cj._identifierToKeyCode(p),63236:cj._identifierToKeyCode(J),63237:cj._identifierToKeyCode(bd),63238:cj._identifierToKeyCode(I),63239:cj._identifierToKeyCode(U),63240:cj._identifierToKeyCode(bk),63241:cj._identifierToKeyCode(t),63242:cj._identifierToKeyCode(bg),63243:cj._identifierToKeyCode(q),63244:cj._identifierToKeyCode(be),63245:cj._identifierToKeyCode(E),63246:cj._identifierToKeyCode(bh),63247:cj._identifierToKeyCode(ba),63248:cj._identifierToKeyCode(bp),3:cj._identifierToKeyCode(j),12:cj._identifierToKeyCode(h),13:cj._identifierToKeyCode(j)};
}else{cj._charCode2KeyCode={13:13,27:27};
}};
}});
})();
(function(){var a="qx.event.type.KeyInput";
qx.Class.define(a,{extend:qx.event.type.Dom,members:{init:function(b,c,d){qx.event.type.Dom.prototype.init.call(this,b,c,null,true,true);
this._charCode=d;
return this;
},clone:function(e){var f=qx.event.type.Dom.prototype.clone.call(this,e);
f._charCode=this._charCode;
return f;
},getCharCode:function(){return this._charCode;
},getChar:function(){return String.fromCharCode(this._charCode);
}}});
})();
(function(){var a="qx.event.type.KeySequence";
qx.Class.define(a,{extend:qx.event.type.Dom,members:{init:function(b,c,d){qx.event.type.Dom.prototype.init.call(this,b,c,null,true,true);
this._keyCode=b.keyCode;
this._identifier=d;
return this;
},clone:function(e){var f=qx.event.type.Dom.prototype.clone.call(this,e);
f._keyCode=this._keyCode;
f._identifier=this._identifier;
return f;
},getKeyIdentifier:function(){return this._identifier;
},getKeyCode:function(){return this._keyCode;
},isPrintable:function(){return qx.event.handler.Keyboard.isPrintableKeyIdentifier(this._identifier);
}}});
})();
(function(){var t="blur",s="focus",r="on",q="selectstart",p="mousedown",o="DOMFocusOut",n="mouseup",m="activate",l="focusout",k="qxKeepActive",d="_applyActive",j="tabIndex",g="qx.event.handler.Focus",c="_applyFocus",b="qxSelectable",f="deactivate",e="input",h="textarea",a="focusin",i="qxKeepFocus";
qx.Class.define(g,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(u){qx.core.Object.call(this);
this._manager=u;
this._window=u.getWindow();
this._document=this._window.document;
this._root=this._document.documentElement;
this._body=this._document.body;
this._initObserver();
},properties:{active:{apply:d,nullable:true},focus:{apply:c,nullable:true}},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{focus:1,blur:1,focusin:1,focusout:1,activate:1,deactivate:1},IGNORE_CAN_HANDLE:true,FOCUSABLE_ELEMENTS:{button:1,input:1,select:1,textarea:1}},members:{__ej:null,__ek:null,__el:null,__em:null,__en:null,__eo:null,__ep:null,__eq:null,__er:null,__es:null,canHandleEvent:function(v,w){},registerEvent:function(x,y,z){},unregisterEvent:function(A,B,C){},focus:function(D){{try{D.focus();
}catch(E){}};
this.setFocus(D);
this.setActive(D);
},activate:function(F){this.setActive(F);
},blur:function(G){try{G.blur();
}catch(H){}
if(this.getActive()===G){this.resetActive();
}
if(this.getFocus()===G){this.resetFocus();
}},deactivate:function(I){if(this.getActive()===I){this.resetActive();
}},tryActivate:function(J){var K=this.__eG(J);

if(K){this.setActive(K);
}},__dM:function(L,M,N,O){var Q=qx.event.Registration;
var P=Q.createEvent(N,qx.event.type.Focus,[L,M,O]);
Q.dispatchEvent(L,P);
},_windowFocused:true,__et:function(){if(this._windowFocused){this._windowFocused=false;
this.__dM(this._window,null,t,false);
}},__eu:function(){if(!this._windowFocused){this._windowFocused=true;
this.__dM(this._window,null,s,false);
}},_initObserver:function(){this.__ej=qx.lang.Function.listener(this.__eA,this);
this.__ek=qx.lang.Function.listener(this.__eB,this);
this.__eq=qx.lang.Function.listener(this.__ex,this);
this.__el=qx.lang.Function.listener(this.__ez,this);
this.__em=qx.lang.Function.listener(this.__ey,this);
this.__eo=qx.lang.Function.listener(this.__eD,this);
qx.bom.Event.addNativeListener(this._document,p,this.__ej,true);
qx.bom.Event.addNativeListener(this._document,n,this.__ek,true);
qx.bom.Event.addNativeListener(this._document,q,this.__eo,false);
qx.bom.Event.addNativeListener(this._window,o,this.__eq,true);
qx.bom.Event.addNativeListener(this._window,s,this.__el,true);
qx.bom.Event.addNativeListener(this._window,t,this.__em,true);
},_stopObserver:function(){qx.bom.Event.removeNativeListener(this._document,p,this.__ej,true);
qx.bom.Event.removeNativeListener(this._document,n,this.__ek,true);
qx.bom.Event.removeNativeListener(this._document,q,this.__eo,false);
qx.bom.Event.removeNativeListener(this._window,o,this.__eq,true);
qx.bom.Event.removeNativeListener(this._window,s,this.__el,true);
qx.bom.Event.removeNativeListener(this._window,t,this.__em,true);
},__ev:qx.event.GlobalError.observeMethod(null),__ew:qx.event.GlobalError.observeMethod(null),__ex:qx.event.GlobalError.observeMethod(function(R){var S=qx.bom.Event.getTarget(R);

if(S===this.getFocus()){this.resetFocus();
}
if(S===this.getActive()){this.resetActive();
}}),__ey:qx.event.GlobalError.observeMethod(function(T){var U=qx.bom.Event.getTarget(T);

if(U===this._window||U===this._document){this.__et();
this.__er=this.getFocus();
this.__es=this.getActive();
this.resetActive();
this.resetFocus();
}}),__ez:qx.event.GlobalError.observeMethod(function(V){var W=qx.bom.Event.getTarget(V);

if(W===this._window||W===this._document){this.__eu();

if(this.__er){this.setFocus(this.__er);
delete this.__er;
}
if(this.__es){this.setActive(this.__es);
delete this.__es;
}}else{this.setFocus(W);
this.tryActivate(W);
}}),__eA:qx.event.GlobalError.observeMethod(function(X){var ba=qx.bom.Event.getTarget(X);
var Y=this.__eF(ba);

if(Y){this.setFocus(Y);
}else{qx.bom.Event.preventDefault(X);
}}),__eB:qx.event.GlobalError.observeMethod(function(bb){var bc=qx.bom.Event.getTarget(bb);
this.tryActivate(this.__eC(bc));
}),__eC:qx.event.GlobalError.observeMethod(function(bd){var be=this.getFocus();

if(be&&bd!=be&&(be.nodeName.toLowerCase()===e||be.nodeName.toLowerCase()===h)){bd=be;
}return bd;
}),__eD:qx.event.GlobalError.observeMethod(function(bf){var bg=qx.bom.Event.getTarget(bf);

if(!this.__eH(bg)){qx.bom.Event.preventDefault(bf);
}}),__eE:function(bh){var bi=qx.bom.element.Attribute.get(bh,j);

if(bi>=1){return true;
}var bj=qx.event.handler.Focus.FOCUSABLE_ELEMENTS;

if(bi>=0&&bj[bh.tagName]){return true;
}return false;
},__eF:function(bk){while(bk&&bk.nodeType===1){if(bk.getAttribute(i)==r){return null;
}
if(this.__eE(bk)){return bk;
}bk=bk.parentNode;
}return this._body;
},__eG:function(bl){var bm=bl;

while(bl&&bl.nodeType===1){if(bl.getAttribute(k)==r){return null;
}bl=bl.parentNode;
}return bm;
},__eH:function(bn){while(bn&&bn.nodeType===1){var bo=bn.getAttribute(b);

if(bo!=null){return bo===r;
}bn=bn.parentNode;
}return true;
},_applyActive:function(bp,bq){if(bq){this.__dM(bq,bp,f,true);
}
if(bp){this.__dM(bp,bq,m,true);
}},_applyFocus:function(br,bs){if(bs){this.__dM(bs,br,l,true);
}
if(br){this.__dM(br,bs,a,true);
}if(bs){this.__dM(bs,br,t,false);
}
if(br){this.__dM(br,bs,s,false);
}}},destruct:function(){this._stopObserver();
this._manager=this._window=this._document=this._root=this._body=this.__eI=null;
},defer:function(bt){qx.event.Registration.addHandler(bt);
var bu=bt.FOCUSABLE_ELEMENTS;

for(var bv in bu){bu[bv.toUpperCase()]=1;
}}});
})();
(function(){var a="qx.event.type.Focus";
qx.Class.define(a,{extend:qx.event.type.Event,members:{init:function(b,c,d){qx.event.type.Event.prototype.init.call(this,d,false);
this._target=b;
this._relatedTarget=c;
return this;
}}});
})();
(function(){var s="mouseup",r="mousewheel",q="mousedown",p="contextmenu",o="click",n="dblclick",m="os.name",l="mouseover",k="mouseout",j="ios",c="mousemove",h="on",f="engine.version",b="useraction",a="webkit",e="gecko",d="DOMMouseScroll",g="qx.event.handler.Mouse";
qx.Class.define(g,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(t){qx.core.Object.call(this);
this.__df=t;
this.__cy=t.getWindow();
this.__cR=this.__cy.document;
this._initButtonObserver();
this._initMoveObserver();
this._initWheelObserver();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{mousemove:1,mouseover:1,mouseout:1,mousedown:1,mouseup:1,click:1,dblclick:1,contextmenu:1,mousewheel:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE+qx.event.IEventHandler.TARGET_DOCUMENT+qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{__eJ:null,__eK:null,__eL:null,__eM:null,__eN:null,__df:null,__cy:null,__cR:null,canHandleEvent:function(u,v){},registerEvent:qx.core.Environment.get(m)===j?function(w,x,y){w[h+x]=qx.lang.Function.returnNull;
}:qx.lang.Function.returnNull,unregisterEvent:qx.core.Environment.get(m)===j?function(z,A,B){z[h+A]=undefined;
}:qx.lang.Function.returnNull,__dM:function(C,D,E){if(!E){E=qx.bom.Event.getTarget(C);
}if(E&&E.nodeType){qx.event.Registration.fireEvent(E,D||C.type,D==r?qx.event.type.MouseWheel:qx.event.type.Mouse,[C,E,null,true,true]);
}qx.event.Registration.fireEvent(this.__cy,b,qx.event.type.Data,[D||C.type]);
},__eO:function(){var G=[this.__cy,this.__cR,this.__cR.body];
var H=this.__cy;
var F=d;

for(var i=0;i<G.length;i++){if(qx.bom.Event.supportsEvent(G[i],r)){F=r;
H=G[i];
break;
}}return {type:F,target:H};
},_initButtonObserver:function(){this.__eJ=qx.lang.Function.listener(this._onButtonEvent,this);
var Event=qx.bom.Event;
Event.addNativeListener(this.__cR,q,this.__eJ);
Event.addNativeListener(this.__cR,s,this.__eJ);
Event.addNativeListener(this.__cR,o,this.__eJ);
Event.addNativeListener(this.__cR,n,this.__eJ);
Event.addNativeListener(this.__cR,p,this.__eJ);
},_initMoveObserver:function(){this.__eK=qx.lang.Function.listener(this._onMoveEvent,this);
var Event=qx.bom.Event;
Event.addNativeListener(this.__cR,c,this.__eK);
Event.addNativeListener(this.__cR,l,this.__eK);
Event.addNativeListener(this.__cR,k,this.__eK);
},_initWheelObserver:function(){this.__eL=qx.lang.Function.listener(this._onWheelEvent,this);
var I=this.__eO();
qx.bom.Event.addNativeListener(I.target,I.type,this.__eL);
},_stopButtonObserver:function(){var Event=qx.bom.Event;
Event.removeNativeListener(this.__cR,q,this.__eJ);
Event.removeNativeListener(this.__cR,s,this.__eJ);
Event.removeNativeListener(this.__cR,o,this.__eJ);
Event.removeNativeListener(this.__cR,n,this.__eJ);
Event.removeNativeListener(this.__cR,p,this.__eJ);
},_stopMoveObserver:function(){var Event=qx.bom.Event;
Event.removeNativeListener(this.__cR,c,this.__eK);
Event.removeNativeListener(this.__cR,l,this.__eK);
Event.removeNativeListener(this.__cR,k,this.__eK);
},_stopWheelObserver:function(){var J=this.__eO();
qx.bom.Event.removeNativeListener(J.target,J.type,this.__eL);
},_onMoveEvent:qx.event.GlobalError.observeMethod(function(K){this.__dM(K);
}),_onButtonEvent:qx.event.GlobalError.observeMethod(function(L){var M=L.type;
var N=qx.bom.Event.getTarget(L);
if(a==e||true){if(N&&N.nodeType==3){N=N.parentNode;
}}
if(this.__eP){this.__eP(L,M,N);
}
if(this.__eR){this.__eR(L,M,N);
}this.__dM(L,M,N);

if(this.__eQ){this.__eQ(L,M,N);
}
if(this.__eS){this.__eS(L,M,N);
}this.__eM=M;
}),_onWheelEvent:qx.event.GlobalError.observeMethod(function(O){this.__dM(O,r);
}),__eP:function(P,Q,R){if(parseFloat(qx.core.Environment.get(f))<530){if(Q==p){this.__dM(P,s,R);
}}},__eQ:null,__eR:null,__eS:function(S,T,U){switch(T){case q:this.__eN=U;
break;
case s:if(U!==this.__eN){var V=qx.dom.Hierarchy.getCommonParent(U,this.__eN);
this.__dM(S,o,V);
}}}},destruct:function(){this._stopButtonObserver();
this._stopMoveObserver();
this._stopWheelObserver();
this.__df=this.__cy=this.__cR=this.__eN=null;
},defer:function(W){qx.event.Registration.addHandler(W);
}});
})();
(function(){var j="left",i="right",h="middle",g="none",f="click",e="contextmenu",d="qx.event.type.Mouse",c="browser.documentmode",b="browser.name",a="ie";
qx.Class.define(d,{extend:qx.event.type.Dom,members:{_cloneNativeEvent:function(k,l){var l=qx.event.type.Dom.prototype._cloneNativeEvent.call(this,k,l);
l.button=k.button;
l.clientX=k.clientX;
l.clientY=k.clientY;
l.pageX=k.pageX;
l.pageY=k.pageY;
l.screenX=k.screenX;
l.screenY=k.screenY;
l.wheelDelta=k.wheelDelta;
l.wheelDeltaX=k.wheelDeltaX;
l.wheelDeltaY=k.wheelDeltaY;
l.detail=k.detail;
l.axis=k.axis;
l.wheelX=k.wheelX;
l.wheelY=k.wheelY;
l.HORIZONTAL_AXIS=k.HORIZONTAL_AXIS;
l.srcElement=k.srcElement;
l.target=k.target;
return l;
},__eT:{0:j,2:i,1:h},__eU:{1:j,2:i,4:h},stop:function(){this.stopPropagation();
},getButton:function(){switch(this._type){case e:return i;
case f:if(qx.core.Environment.get(b)===a&&qx.core.Environment.get(c)<9){return j;
}default:if(this._native.target!==undefined){return this.__eT[this._native.button]||g;
}else{return this.__eU[this._native.button]||g;
}}},isLeftPressed:function(){return this.getButton()===j;
},isMiddlePressed:function(){return this.getButton()===h;
},isRightPressed:function(){return this.getButton()===i;
},getRelatedTarget:function(){return this._relatedTarget;
},getViewportLeft:function(){return this._native.clientX;
},getViewportTop:function(){return this._native.clientY;
},getDocumentLeft:function(){if(this._native.pageX!==undefined){return this._native.pageX;
}else{var m=qx.dom.Node.getWindow(this._native.srcElement);
return this._native.clientX+qx.bom.Viewport.getScrollLeft(m);
}},getDocumentTop:function(){if(this._native.pageY!==undefined){return this._native.pageY;
}else{var n=qx.dom.Node.getWindow(this._native.srcElement);
return this._native.clientY+qx.bom.Viewport.getScrollTop(n);
}},getScreenLeft:function(){return this._native.screenX;
},getScreenTop:function(){return this._native.screenY;
}}});
})();
(function(){var k="engine.version",j="os.name",i="x",h="osx",g="win",f="chrome",d="qx.dynamicmousewheel",c="qx.event.type.MouseWheel",b="browser.name",a="y";
qx.Class.define(c,{extend:qx.event.type.Mouse,statics:{MAXSCROLL:null,MINSCROLL:null,FACTOR:1},members:{stop:function(){this.stopPropagation();
this.preventDefault();
},__eV:function(l){var m=Math.abs(l);
if(qx.event.type.MouseWheel.MINSCROLL==null||qx.event.type.MouseWheel.MINSCROLL>m){qx.event.type.MouseWheel.MINSCROLL=m;
this.__eW();
}if(qx.event.type.MouseWheel.MAXSCROLL==null||qx.event.type.MouseWheel.MAXSCROLL<m){qx.event.type.MouseWheel.MAXSCROLL=m;
this.__eW();
}if(qx.event.type.MouseWheel.MAXSCROLL===m&&qx.event.type.MouseWheel.MINSCROLL===m){return 2*(l/m);
}var n=qx.event.type.MouseWheel.MAXSCROLL-qx.event.type.MouseWheel.MINSCROLL;
var o=(l/n)*Math.log(n)*qx.event.type.MouseWheel.FACTOR;
return o<0?Math.min(o,-1):Math.max(o,1);
},__eW:function(){var p=qx.event.type.MouseWheel.MAXSCROLL||0;
var s=qx.event.type.MouseWheel.MINSCROLL||p;

if(p<=s){return;
}var q=p-s;
var r=(p/q)*Math.log(q);

if(r==0){r=1;
}qx.event.type.MouseWheel.FACTOR=6/r;
},getWheelDelta:function(t){var e=this._native;
if(t===undefined){if(u===undefined){var u=-e.wheelDelta;

if(e.wheelDelta===undefined){u=e.detail;
}}return this.__eX(u);
}if(t===i){var x=0;

if(e.wheelDelta!==undefined){if(e.wheelDeltaX!==undefined){x=e.wheelDeltaX?this.__eX(-e.wheelDeltaX):0;
}}else{if(e.axis&&e.axis==e.HORIZONTAL_AXIS){x=this.__eX(e.detail);
}}return x;
}if(t===a){var y=0;

if(e.wheelDelta!==undefined){if(e.wheelDeltaY!==undefined){y=e.wheelDeltaY?this.__eX(-e.wheelDeltaY):0;
}else{y=this.__eX(-e.wheelDelta);
}}else{if(!(e.axis&&e.axis==e.HORIZONTAL_AXIS)){y=this.__eX(e.detail);
}}return y;
}return 0;
},__eX:function(v){if(qx.core.Environment.get(d)){return this.__eV(v);
}else{var w=function(){if(qx.core.Environment.get(b)==f){if(qx.core.Environment.get(j)==h){return v/60;
}else{return v/120;
}}else{if(qx.core.Environment.get(j)==g){var z=120;
if(parseFloat(qx.core.Environment.get(k))==533.16){z=1200;
}}else{z=40;
if(parseFloat(qx.core.Environment.get(k))==533.16||parseFloat(qx.core.Environment.get(k))==533.17||parseFloat(qx.core.Environment.get(k))==533.18){z=1200;
}}return v/z;
}};
return w.call(this);
}}}});
})();
(function(){var g="html.element.contains",f="html.element.compareDocumentPosition",e="qx.dom.Hierarchy",d="previousSibling",c="nextSibling",b="parentNode",a="*";
qx.Class.define(e,{statics:{getNodeIndex:function(h){var i=0;

while(h&&(h=h.previousSibling)){i++;
}return i;
},getElementIndex:function(j){var k=0;
var l=qx.dom.Node.ELEMENT;

while(j&&(j=j.previousSibling)){if(j.nodeType==l){k++;
}}return k;
},getNextElementSibling:function(m){while(m&&(m=m.nextSibling)&&!qx.dom.Node.isElement(m)){continue;
}return m||null;
},getPreviousElementSibling:function(n){while(n&&(n=n.previousSibling)&&!qx.dom.Node.isElement(n)){continue;
}return n||null;
},contains:function(o,p){if(qx.core.Environment.get(g)){if(qx.dom.Node.isDocument(o)){var q=qx.dom.Node.getDocument(p);
return o&&q==o;
}else if(qx.dom.Node.isDocument(p)){return false;
}else{return o.contains(p);
}}else if(qx.core.Environment.get(f)){return !!(o.compareDocumentPosition(p)&16);
}else{while(p){if(o==p){return true;
}p=p.parentNode;
}return false;
}},isRendered:function(r){var s=r.ownerDocument||r.document;

if(qx.core.Environment.get(g)){if(!r.parentNode||!r.offsetParent){return false;
}return s.body.contains(r);
}else if(qx.core.Environment.get(f)){return !!(s.compareDocumentPosition(r)&16);
}else{while(r){if(r==s.body){return true;
}r=r.parentNode;
}return false;
}},isDescendantOf:function(t,u){return this.contains(u,t);
},getCommonParent:function(v,w){if(v===w){return v;
}
if(qx.core.Environment.get(g)){while(v&&qx.dom.Node.isElement(v)){if(v.contains(w)){return v;
}v=v.parentNode;
}return null;
}else{var x={};
var A=qx.core.ObjectRegistry;
var z,y;

while(v||w){if(v){z=A.toHashCode(v);

if(x[z]){return x[z];
}x[z]=v;
v=v.parentNode;
}
if(w){y=A.toHashCode(w);

if(x[y]){return x[y];
}x[y]=w;
w=w.parentNode;
}}return null;
}},getAncestors:function(B){return this._recursivelyCollect(B,b);
},getChildElements:function(C){C=C.firstChild;

if(!C){return [];
}var D=this.getNextSiblings(C);

if(C.nodeType===1){D.unshift(C);
}return D;
},getDescendants:function(E){return qx.lang.Array.fromCollection(E.getElementsByTagName(a));
},getFirstDescendant:function(F){F=F.firstChild;

while(F&&F.nodeType!=1){F=F.nextSibling;
}return F;
},getLastDescendant:function(G){G=G.lastChild;

while(G&&G.nodeType!=1){G=G.previousSibling;
}return G;
},getPreviousSiblings:function(H){return this._recursivelyCollect(H,d);
},getNextSiblings:function(I){return this._recursivelyCollect(I,c);
},_recursivelyCollect:function(J,K){var L=[];

while(J=J[K]){if(J.nodeType==1){L.push(J);
}}return L;
},getSiblings:function(M){return this.getPreviousSiblings(M).reverse().concat(this.getNextSiblings(M));
},isEmpty:function(N){N=N.firstChild;

while(N){if(N.nodeType===qx.dom.Node.ELEMENT||N.nodeType===qx.dom.Node.TEXT){return false;
}N=N.nextSibling;
}return true;
},cleanWhitespace:function(O){var P=O.firstChild;

while(P){var Q=P.nextSibling;

if(P.nodeType==3&&!/\S/.test(P.nodeValue)){O.removeChild(P);
}P=Q;
}}}});
})();
(function(){var a="qx.event.handler.Capture";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{capture:true,losecapture:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(b,c){},registerEvent:function(d,e,f){},unregisterEvent:function(g,h,i){}},defer:function(j){qx.event.Registration.addHandler(j);
}});
})();
(function(){var k="alias",j="copy",i="blur",h="mouseout",g="keydown",f="Control",d="Shift",c="mousemove",b="move",a="mouseover",D="Alt",C="keyup",B="mouseup",A="keypress",z="dragend",y="on",x="mousedown",w="qxDraggable",v="Escape",u="drag",r="drop",s="qxDroppable",p="qx.event.handler.DragDrop",q="droprequest",n="dragstart",o="dragchange",l="dragleave",m="dragover",t="left";
qx.Class.define(p,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(E){qx.core.Object.call(this);
this.__df=E;
this.__cR=E.getWindow().document.documentElement;
this.__df.addListener(this.__cR,x,this._onMouseDown,this);
this.__fj();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{dragstart:1,dragend:1,dragover:1,dragleave:1,drop:1,drag:1,dragchange:1,droprequest:1},IGNORE_CAN_HANDLE:true},members:{__df:null,__cR:null,__eY:null,__fa:null,__fb:null,__fc:null,__fd:null,__e:null,__fe:null,__ff:null,__fg:false,__fh:0,__fi:0,canHandleEvent:function(F,G){},registerEvent:function(H,I,J){},unregisterEvent:function(K,L,M){},addType:function(N){this.__fb[N]=true;
},addAction:function(O){this.__fc[O]=true;
},supportsType:function(P){return !!this.__fb[P];
},supportsAction:function(Q){return !!this.__fc[Q];
},getData:function(R){if(!this.__fp||!this.__eY){throw new Error("This method must not be used outside the drop event listener!");
}
if(!this.__fb[R]){throw new Error("Unsupported data type: "+R+"!");
}
if(!this.__e[R]){this.__fe=R;
this.__dM(q,this.__fa,this.__eY,false);
}
if(!this.__e[R]){throw new Error("Please use a droprequest listener to the drag source to fill the manager with data!");
}return this.__e[R]||null;
},getCurrentAction:function(){return this.__ff;
},addData:function(S,T){this.__e[S]=T;
},getCurrentType:function(){return this.__fe;
},isSessionActive:function(){return this.__fg;
},__fj:function(){this.__fb={};
this.__fc={};
this.__fd={};
this.__e={};
},__fk:function(){if(this.__fa==null){return;
}var W=this.__fc;
var U=this.__fd;
var V=null;

if(this.__fp){if(U.Shift&&U.Control&&W.alias){V=k;
}else if(U.Shift&&U.Alt&&W.copy){V=j;
}else if(U.Shift&&W.move){V=b;
}else if(U.Alt&&W.alias){V=k;
}else if(U.Control&&W.copy){V=j;
}else if(W.move){V=b;
}else if(W.copy){V=j;
}else if(W.alias){V=k;
}}
if(V!=this.__ff){this.__ff=V;
this.__dM(o,this.__fa,this.__eY,false);
}},__dM:function(X,Y,ba,bb,bc){var be=qx.event.Registration;
var bd=be.createEvent(X,qx.event.type.Drag,[bb,bc]);

if(Y!==ba){bd.setRelatedTarget(ba);
}return be.dispatchEvent(Y,bd);
},__fl:function(bf){while(bf&&bf.nodeType==1){if(bf.getAttribute(w)==y){return bf;
}bf=bf.parentNode;
}return null;
},__fm:function(bg){while(bg&&bg.nodeType==1){if(bg.getAttribute(s)==y){return bg;
}bg=bg.parentNode;
}return null;
},__fn:function(){this.__fa=null;
this.__df.removeListener(this.__cR,c,this._onMouseMove,this,true);
this.__df.removeListener(this.__cR,B,this._onMouseUp,this,true);
qx.event.Registration.removeListener(window,i,this._onWindowBlur,this);
this.__fj();
},__fo:function(){if(this.__fg){this.__df.removeListener(this.__cR,a,this._onMouseOver,this,true);
this.__df.removeListener(this.__cR,h,this._onMouseOut,this,true);
this.__df.removeListener(this.__cR,g,this._onKeyDown,this,true);
this.__df.removeListener(this.__cR,C,this._onKeyUp,this,true);
this.__df.removeListener(this.__cR,A,this._onKeyPress,this,true);
this.__dM(z,this.__fa,this.__eY,false);
this.__fg=false;
}this.__fp=false;
this.__eY=null;
this.__fn();
},__fp:false,_onWindowBlur:function(e){this.__fo();
},_onKeyDown:function(e){var bh=e.getKeyIdentifier();

switch(bh){case D:case f:case d:if(!this.__fd[bh]){this.__fd[bh]=true;
this.__fk();
}}},_onKeyUp:function(e){var bi=e.getKeyIdentifier();

switch(bi){case D:case f:case d:if(this.__fd[bi]){this.__fd[bi]=false;
this.__fk();
}}},_onKeyPress:function(e){var bj=e.getKeyIdentifier();

switch(bj){case v:this.__fo();
}},_onMouseDown:function(e){if(this.__fg||e.getButton()!==t){return;
}var bk=this.__fl(e.getTarget());

if(bk){this.__fh=e.getDocumentLeft();
this.__fi=e.getDocumentTop();
this.__fa=bk;
this.__df.addListener(this.__cR,c,this._onMouseMove,this,true);
this.__df.addListener(this.__cR,B,this._onMouseUp,this,true);
qx.event.Registration.addListener(window,i,this._onWindowBlur,this);
}},_onMouseUp:function(e){if(this.__fp){this.__dM(r,this.__eY,this.__fa,false,e);
}if(this.__fg){e.stopPropagation();
}this.__fo();
},_onMouseMove:function(e){if(this.__fg){if(!this.__dM(u,this.__fa,this.__eY,true,e)){this.__fo();
}}else{if(Math.abs(e.getDocumentLeft()-this.__fh)>3||Math.abs(e.getDocumentTop()-this.__fi)>3){if(this.__dM(n,this.__fa,this.__eY,true,e)){this.__fg=true;
this.__df.addListener(this.__cR,a,this._onMouseOver,this,true);
this.__df.addListener(this.__cR,h,this._onMouseOut,this,true);
this.__df.addListener(this.__cR,g,this._onKeyDown,this,true);
this.__df.addListener(this.__cR,C,this._onKeyUp,this,true);
this.__df.addListener(this.__cR,A,this._onKeyPress,this,true);
var bl=this.__fd;
bl.Control=e.isCtrlPressed();
bl.Shift=e.isShiftPressed();
bl.Alt=e.isAltPressed();
this.__fk();
}else{this.__dM(z,this.__fa,this.__eY,false);
this.__fn();
}}}},_onMouseOver:function(e){var bm=e.getTarget();
var bn=this.__fm(bm);

if(bn&&bn!=this.__eY){this.__fp=this.__dM(m,bn,this.__fa,true,e);
this.__eY=bn;
this.__fk();
}},_onMouseOut:function(e){var bp=this.__fm(e.getTarget());
var bo=this.__fm(e.getRelatedTarget());

if(bp&&bp!==bo&&bp==this.__eY){this.__dM(l,this.__eY,bo,false,e);
this.__eY=null;
this.__fp=false;
qx.event.Timer.once(this.__fk,this,0);
}}},destruct:function(){this.__fa=this.__eY=this.__df=this.__cR=this.__fb=this.__fc=this.__fd=this.__e=null;
},defer:function(bq){qx.event.Registration.addHandler(bq);
}});
})();
(function(){var a="qx.event.type.Drag";
qx.Class.define(a,{extend:qx.event.type.Event,members:{init:function(b,c){qx.event.type.Event.prototype.init.call(this,true,b);

if(c){this._native=c.getNativeEvent()||null;
this._originalTarget=c.getTarget()||null;
}else{this._native=null;
this._originalTarget=null;
}return this;
},clone:function(d){var e=qx.event.type.Event.prototype.clone.call(this,d);
e._native=this._native;
return e;
},getDocumentLeft:function(){if(this._native==null){return 0;
}
if(this._native.pageX!==undefined){return this._native.pageX;
}else{var f=qx.dom.Node.getWindow(this._native.srcElement);
return this._native.clientX+qx.bom.Viewport.getScrollLeft(f);
}},getDocumentTop:function(){if(this._native==null){return 0;
}
if(this._native.pageY!==undefined){return this._native.pageY;
}else{var g=qx.dom.Node.getWindow(this._native.srcElement);
return this._native.clientY+qx.bom.Viewport.getScrollTop(g);
}},getManager:function(){return qx.event.Registration.getManager(this.getTarget()).getHandler(qx.event.handler.DragDrop);
},addType:function(h){this.getManager().addType(h);
},addAction:function(i){this.getManager().addAction(i);
},supportsType:function(j){return this.getManager().supportsType(j);
},supportsAction:function(k){return this.getManager().supportsAction(k);
},addData:function(l,m){this.getManager().addData(l,m);
},getData:function(n){return this.getManager().getData(n);
},getCurrentType:function(){return this.getManager().getCurrentType();
},getCurrentAction:function(){return this.getManager().getCurrentAction();
}}});
})();
(function(){var h="interval",g="qx.event.Timer",f="_applyInterval",d="_applyEnabled",c="Boolean",b="qx.event.type.Event",a="Integer";
qx.Class.define(g,{extend:qx.core.Object,construct:function(i){qx.core.Object.call(this);
this.setEnabled(false);

if(i!=null){this.setInterval(i);
}var self=this;
this.__fq=function(){self._oninterval.call(self);
};
},events:{"interval":b},statics:{once:function(j,k,l){var m=new qx.event.Timer(l);
m.__fr=j;
m.addListener(h,function(e){m.stop();
j.call(k,e);
m.dispose();
k=null;
},k);
m.start();
return m;
}},properties:{enabled:{init:true,check:c,apply:d},interval:{check:a,init:1000,apply:f}},members:{__fs:null,__fq:null,_applyInterval:function(n,o){if(this.getEnabled()){this.restart();
}},_applyEnabled:function(p,q){if(q){window.clearInterval(this.__fs);
this.__fs=null;
}else if(p){this.__fs=window.setInterval(this.__fq,this.getInterval());
}},start:function(){this.setEnabled(true);
},startWith:function(r){this.setInterval(r);
this.start();
},stop:function(){this.setEnabled(false);
},restart:function(){this.stop();
this.start();
},restartWith:function(s){this.stop();
this.startWith(s);
},_oninterval:qx.event.GlobalError.observeMethod(function(){if(this.$$disposed){return;
}
if(this.getEnabled()){this.fireEvent(h);
}})},destruct:function(){if(this.__fs){window.clearInterval(this.__fs);
}this.__fs=this.__fq=null;
}});
})();
(function(){var c="offline",b="online",a="qx.event.handler.Offline";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(d){qx.core.Object.call(this);
this.__df=d;
this.__cy=d.getWindow();
this._initObserver();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{online:true,offline:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{__df:null,__cy:null,__dA:null,canHandleEvent:function(e,f){},registerEvent:function(g,h,i){},unregisterEvent:function(j,k,l){},_initObserver:function(){this.__dA=qx.lang.Function.listener(this._onNative,this);
qx.bom.Event.addNativeListener(this.__cy,c,this.__dA);
qx.bom.Event.addNativeListener(this.__cy,b,this.__dA);
},_stopObserver:function(){qx.bom.Event.removeNativeListener(this.__cy,c,this.__dA);
qx.bom.Event.removeNativeListener(this.__cy,b,this.__dA);
},_onNative:qx.event.GlobalError.observeMethod(function(m){qx.event.Registration.fireEvent(this.__cy,m.type,qx.event.type.Event,[]);
}),isOnline:function(){return !!this.__cy.navigator.onLine;
}},destruct:function(){this.__df=null;
this._stopObserver();
delete qx.event.handler.Appear.__instances[this.$$hash];
},defer:function(n){qx.event.Registration.addHandler(n);
}});
})();
(function(){var o="",n=" ",m=">",k="<",h="='",g="none",f="<INPUT TYPE='RADIO' NAME='RADIOTEST' VALUE='Second Choice'>",d="qx.bom.Element",c="' ",b="div",a="></";
qx.Class.define(d,{statics:{__ft:{"onload":true,"onpropertychange":true,"oninput":true,"onchange":true,"name":true,"type":true,"checked":true,"disabled":true},__fu:{},__fv:{},allowCreationWithMarkup:function(p){if(!p){p=window;
}var q=p.location.href;

if(qx.bom.Element.__fv[q]==undefined){try{p.document.createElement(f);
qx.bom.Element.__fv[q]=true;
}catch(e){qx.bom.Element.__fv[q]=false;
}}return qx.bom.Element.__fv[q];
},getHelperElement:function(r){if(!r){r=window;
}var t=r.location.href;

if(!qx.bom.Element.__fu[t]){var s=qx.bom.Element.__fu[t]=r.document.createElement(b);
{s.style.display=g;
r.document.body.appendChild(s);
};
}return qx.bom.Element.__fu[t];
},create:function(name,u,v){if(!v){v=window;
}
if(!name){throw new Error("The tag name is missing!");
}var x=this.__ft;
var w=o;

for(var z in u){if(x[z]){w+=z+h+u[z]+c;
}}var A;
if(w!=o){if(qx.bom.Element.allowCreationWithMarkup(v)){A=v.document.createElement(k+name+n+w+m);
}else{var y=qx.bom.Element.getHelperElement(v);
y.innerHTML=k+name+n+w+a+name+m;
A=y.firstChild;
}}else{A=v.document.createElement(name);
}
for(var z in u){if(!x[z]){qx.bom.element.Attribute.set(A,z,u[z]);
}}return A;
},empty:function(B){return B.innerHTML=o;
},addListener:function(C,D,E,self,F){return qx.event.Registration.addListener(C,D,E,self,F);
},removeListener:function(G,H,I,self,J){return qx.event.Registration.removeListener(G,H,I,self,J);
},removeListenerById:function(K,L){return qx.event.Registration.removeListenerById(K,L);
},hasListener:function(M,N,O){return qx.event.Registration.hasListener(M,N,O);
},focus:function(P){qx.event.Registration.getManager(P).getHandler(qx.event.handler.Focus).focus(P);
},blur:function(Q){qx.event.Registration.getManager(Q).getHandler(qx.event.handler.Focus).blur(Q);
},activate:function(R){qx.event.Registration.getManager(R).getHandler(qx.event.handler.Focus).activate(R);
},deactivate:function(S){qx.event.Registration.getManager(S).getHandler(qx.event.handler.Focus).deactivate(S);
},capture:function(T,U){qx.event.Registration.getManager(T).getDispatcher(qx.event.dispatch.MouseCapture).activateCapture(T,U);
},releaseCapture:function(V){qx.event.Registration.getManager(V).getDispatcher(qx.event.dispatch.MouseCapture).releaseCapture(V);
},matchesSelector:function(W,X){if(X){return qx.bom.Selector.query(X,W.parentNode).length>0;
}else{return false;
}},clone:function(Y,ba){var i,l;
var i,l;
var bd;

if(ba||((false)&&!qx.xml.Document.isXmlDocument(Y))){var bh=qx.event.Registration.getManager(Y);
var bb=qx.dom.Hierarchy.getDescendants(Y);
bb.push(Y);
}var bd=Y.cloneNode(true);
if(ba===true){var bk=qx.dom.Hierarchy.getDescendants(bd);
bk.push(bd);
var bc,bf,bj,be;

for(var i=0,bi=bb.length;i<bi;i++){bj=bb[i];
bc=bh.serializeListeners(bj);

if(bc.length>0){bf=bk[i];

for(var j=0,bg=bc.length;j<bg;j++){be=bc[j];
bh.addListener(bf,be.type,be.handler,be.self,be.capture);
}}}}return bd;
}}});
})();
(function(){var g="losecapture",f="blur",e="focus",d="click",c="qx.event.dispatch.MouseCapture",b="capture",a="scroll";
qx.Class.define(c,{extend:qx.event.dispatch.AbstractBubbling,construct:function(h,i){qx.event.dispatch.AbstractBubbling.call(this,h);
this.__cy=h.getWindow();
this.__cA=i;
h.addListener(this.__cy,f,this.releaseCapture,this);
h.addListener(this.__cy,e,this.releaseCapture,this);
h.addListener(this.__cy,a,this.releaseCapture,this);
},statics:{PRIORITY:qx.event.Registration.PRIORITY_FIRST},members:{__cA:null,__fw:null,__fx:true,__cy:null,_getParent:function(j){return j.parentNode;
},canDispatchEvent:function(k,event,l){return !!(this.__fw&&this.__fy[l]);
},dispatchEvent:function(m,event,n){if(n==d){event.stopPropagation();
this.releaseCapture();
return;
}
if(this.__fx||!qx.dom.Hierarchy.contains(this.__fw,m)){m=this.__fw;
}qx.event.dispatch.AbstractBubbling.prototype.dispatchEvent.call(this,m,event,n);
},__fy:{"mouseup":1,"mousedown":1,"click":1,"dblclick":1,"mousemove":1,"mouseout":1,"mouseover":1},activateCapture:function(o,p){var p=p!==false;

if(this.__fw===o&&this.__fx==p){return;
}
if(this.__fw){this.releaseCapture();
}this.nativeSetCapture(o,p);

if(this.hasNativeCapture){var self=this;
qx.bom.Event.addNativeListener(o,g,function(){qx.bom.Event.removeNativeListener(o,g,arguments.callee);
self.releaseCapture();
});
}this.__fx=p;
this.__fw=o;
this.__cA.fireEvent(o,b,qx.event.type.Event,[true,false]);
},getCaptureElement:function(){return this.__fw;
},releaseCapture:function(){var q=this.__fw;

if(!q){return;
}this.__fw=null;
this.__cA.fireEvent(q,g,qx.event.type.Event,[true,false]);
this.nativeReleaseCapture(q);
},hasNativeCapture:false,nativeSetCapture:qx.lang.Function.empty,nativeReleaseCapture:qx.lang.Function.empty},destruct:function(){this.__fw=this.__cy=this.__cA=null;
},defer:function(r){qx.event.Registration.addDispatcher(r);
}});
})();
(function(){var a="qx.event.handler.Window";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(b){qx.core.Object.call(this);
this._manager=b;
this._window=b.getWindow();
this._initWindowObserver();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{error:1,load:1,beforeunload:1,unload:1,resize:1,scroll:1,beforeshutdown:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(c,d){},registerEvent:function(f,g,h){},unregisterEvent:function(i,j,k){},_initWindowObserver:function(){this._onNativeWrapper=qx.lang.Function.listener(this._onNative,this);
var m=qx.event.handler.Window.SUPPORTED_TYPES;

for(var l in m){qx.bom.Event.addNativeListener(this._window,l,this._onNativeWrapper);
}},_stopWindowObserver:function(){var o=qx.event.handler.Window.SUPPORTED_TYPES;

for(var n in o){qx.bom.Event.removeNativeListener(this._window,n,this._onNativeWrapper);
}},_onNative:qx.event.GlobalError.observeMethod(function(e){if(this.isDisposed()){return;
}var q=this._window;

try{var t=q.document;
}catch(e){return ;
}var r=t.documentElement;
var p=qx.bom.Event.getTarget(e);

if(p==null||p===q||p===t||p===r){var event=qx.event.Registration.createEvent(e.type,qx.event.type.Native,[e,q]);
qx.event.Registration.dispatchEvent(q,event);
var s=event.getReturnValue();

if(s!=null){e.returnValue=s;
return s;
}}})},destruct:function(){this._stopWindowObserver();
this._manager=this._window=null;
},defer:function(u){qx.event.Registration.addHandler(u);
}});
})();
(function(){var c="qx.bom.Selector";
qx.Class.define(c,{statics:{query:null,matches:null}});
(function(){var o=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,v=0,x=Object.prototype.toString,p=false,z=true,t=/\\/g,g=/\W/;
[0,0].sort(function(){z=false;
return 0;
});
var s=function(B,C,D,E){D=D||[];
C=C||document;
var N=C;

if(C.nodeType!==1&&C.nodeType!==9){return [];
}
if(!B||typeof B!=="string"){return D;
}var m,H,F,J,L,I,O,i,P=true,G=s.isXML(C),K=[],M=B;
do{o.exec("");
m=o.exec(M);

if(m){M=m[3];
K.push(m[1]);

if(m[2]){J=m[3];
break;
}}}while(m);

if(K.length>1&&q.exec(B)){if(K.length===2&&k.relative[K[0]]){H=h(K[0]+K[1],C);
}else{H=k.relative[K[0]]?[C]:s(K.shift(),C);

while(K.length){B=K.shift();

if(k.relative[B]){B+=K.shift();
}H=h(B,H);
}}}else{if(!E&&K.length>1&&C.nodeType===9&&!G&&k.match.ID.test(K[0])&&!k.match.ID.test(K[K.length-1])){L=s.find(K.shift(),C,G);
C=L.expr?s.filter(L.expr,L.set)[0]:L.set[0];
}
if(C){L=E?{expr:K.pop(),set:f(E)}:s.find(K.pop(),K.length===1&&(K[0]==="~"||K[0]==="+")&&C.parentNode?C.parentNode:C,G);
H=L.expr?s.filter(L.expr,L.set):L.set;

if(K.length>0){F=f(H);
}else{P=false;
}
while(K.length){I=K.pop();
O=I;

if(!k.relative[I]){I="";
}else{O=K.pop();
}
if(O==null){O=C;
}k.relative[I](F,O,G);
}}else{F=K=[];
}}
if(!F){F=H;
}
if(!F){s.error(I||B);
}
if(x.call(F)==="[object Array]"){if(!P){D.push.apply(D,F);
}else if(C&&C.nodeType===1){for(i=0;F[i]!=null;i++){if(F[i]&&(F[i]===true||F[i].nodeType===1&&s.contains(C,F[i]))){D.push(H[i]);
}}}else{for(i=0;F[i]!=null;i++){if(F[i]&&F[i].nodeType===1){D.push(H[i]);
}}}}else{f(F,D);
}
if(J){s(J,N,D,E);
s.uniqueSort(D);
}return D;
};
s.uniqueSort=function(Q){if(u){p=z;
Q.sort(u);

if(p){for(var i=1;i<Q.length;i++){if(Q[i]===Q[i-1]){Q.splice(i--,1);
}}}}return Q;
};
s.matches=function(R,S){return s(R,null,null,S);
};
s.matchesSelector=function(T,U){return s(U,null,null,[T]).length>0;
};
s.find=function(V,W,X){var Y;

if(!V){return [];
}
for(var i=0,l=k.order.length;i<l;i++){var bb,ba=k.order[i];

if((bb=k.leftMatch[ba].exec(V))){var bc=bb[1];
bb.splice(1,1);

if(bc.substr(bc.length-1)!=="\\"){bb[1]=(bb[1]||"").replace(t,"");
Y=k.find[ba](bb,W,X);

if(Y!=null){V=V.replace(k.match[ba],"");
break;
}}}}
if(!Y){Y=typeof W.getElementsByTagName!=="undefined"?W.getElementsByTagName("*"):[];
}return {set:Y,expr:V};
};
s.filter=function(bd,be,bf,bg){var bt,bs,bh=bd,bn=[],bi=be,bj=be&&be[0]&&s.isXML(be[0]);

while(bd&&be.length){for(var br in k.filter){if((bt=k.leftMatch[br].exec(bd))!=null&&bt[2]){var bq,bm,bk=k.filter[br],bu=bt[1];
bs=false;
bt.splice(1,1);

if(bu.substr(bu.length-1)==="\\"){continue;
}
if(bi===bn){bn=[];
}
if(k.preFilter[br]){bt=k.preFilter[br](bt,bi,bf,bn,bg,bj);

if(!bt){bs=bq=true;
}else if(bt===true){continue;
}}
if(bt){for(var i=0;(bm=bi[i])!=null;i++){if(bm){bq=bk(bm,bt,i,bi);
var bo=bg^!!bq;

if(bf&&bq!=null){if(bo){bs=true;
}else{bi[i]=false;
}}else if(bo){bn.push(bm);
bs=true;
}}}}
if(bq!==undefined){if(!bf){bi=bn;
}bd=bd.replace(k.match[br],"");

if(!bs){return [];
}break;
}}}if(bd===bh){if(bs==null){s.error(bd);
}else{break;
}}bh=bd;
}return bi;
};
s.error=function(bv){throw "Syntax error, unrecognized expression: "+bv;
};
var k=s.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(bw){return bw.getAttribute("href");
},type:function(bx){return bx.getAttribute("type");
}},relative:{"+":function(by,bz){var bA=typeof bz==="string",bC=bA&&!g.test(bz),bD=bA&&!bC;

if(bC){bz=bz.toLowerCase();
}
for(var i=0,l=by.length,bB;i<l;i++){if((bB=by[i])){while((bB=bB.previousSibling)&&bB.nodeType!==1){}by[i]=bD||bB&&bB.nodeName.toLowerCase()===bz?bB||false:bB===bz;
}}
if(bD){s.filter(bz,by,true);
}},">":function(bE,bF){var bH,bG=typeof bF==="string",i=0,l=bE.length;

if(bG&&!g.test(bF)){bF=bF.toLowerCase();

for(;i<l;i++){bH=bE[i];

if(bH){var parent=bH.parentNode;
bE[i]=parent.nodeName.toLowerCase()===bF?parent:false;
}}}else{for(;i<l;i++){bH=bE[i];

if(bH){bE[i]=bG?bH.parentNode:bH.parentNode===bF;
}}
if(bG){s.filter(bF,bE,true);
}}},"":function(bI,bJ,bK){var bN,bL=v++,bM=y;

if(typeof bJ==="string"&&!g.test(bJ)){bJ=bJ.toLowerCase();
bN=bJ;
bM=A;
}bM("parentNode",bJ,bL,bI,bN,bK);
},"~":function(bO,bP,bQ){var bT,bR=v++,bS=y;

if(typeof bP==="string"&&!g.test(bP)){bP=bP.toLowerCase();
bT=bP;
bS=A;
}bS("previousSibling",bP,bR,bO,bT,bQ);
}},find:{ID:function(bU,bV,bW){if(typeof bV.getElementById!=="undefined"&&!bW){var m=bV.getElementById(bU[1]);
return m&&m.parentNode?[m]:[];
}},NAME:function(bX,bY){if(typeof bY.getElementsByName!=="undefined"){var cb=[],ca=bY.getElementsByName(bX[1]);

for(var i=0,l=ca.length;i<l;i++){if(ca[i].getAttribute("name")===bX[1]){cb.push(ca[i]);
}}return cb.length===0?null:cb;
}},TAG:function(cc,cd){if(typeof cd.getElementsByTagName!=="undefined"){return cd.getElementsByTagName(cc[1]);
}}},preFilter:{CLASS:function(ce,cf,cg,ch,ci,cj){ce=" "+ce[1].replace(t,"")+" ";

if(cj){return ce;
}
for(var i=0,ck;(ck=cf[i])!=null;i++){if(ck){if(ci^(ck.className&&(" "+ck.className+" ").replace(/[\t\n\r]/g," ").indexOf(ce)>=0)){if(!cg){ch.push(ck);
}}else if(cg){cf[i]=false;
}}}return false;
},ID:function(cl){return cl[1].replace(t,"");
},TAG:function(cm,cn){return cm[1].replace(t,"").toLowerCase();
},CHILD:function(co){if(co[1]==="nth"){if(!co[2]){s.error(co[0]);
}co[2]=co[2].replace(/^\+|\s*/g,'');
var cp=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(co[2]==="even"&&"2n"||co[2]==="odd"&&"2n+1"||!/\D/.test(co[2])&&"0n+"+co[2]||co[2]);
co[2]=(cp[1]+(cp[2]||1))-0;
co[3]=cp[3]-0;
}else if(co[2]){s.error(co[0]);
}co[0]=v++;
return co;
},ATTR:function(cq,cr,cs,ct,cu,cv){var name=cq[1]=cq[1].replace(t,"");

if(!cv&&k.attrMap[name]){cq[1]=k.attrMap[name];
}cq[4]=(cq[4]||cq[5]||"").replace(t,"");

if(cq[2]==="~="){cq[4]=" "+cq[4]+" ";
}return cq;
},PSEUDO:function(cw,cx,cy,cz,cA){if(cw[1]==="not"){if((o.exec(cw[3])||"").length>1||/^\w/.test(cw[3])){cw[3]=s(cw[3],null,null,cx);
}else{var cB=s.filter(cw[3],cx,cy,true^cA);

if(!cy){cz.push.apply(cz,cB);
}return false;
}}else if(k.match.POS.test(cw[0])||k.match.CHILD.test(cw[0])){return true;
}return cw;
},POS:function(cC){cC.unshift(true);
return cC;
}},filters:{enabled:function(cD){return cD.disabled===false&&cD.type!=="hidden";
},disabled:function(cE){return cE.disabled===true;
},checked:function(cF){return cF.checked===true;
},selected:function(cG){if(cG.parentNode){cG.parentNode.selectedIndex;
}return cG.selected===true;
},parent:function(cH){return !!cH.firstChild;
},empty:function(cI){return !cI.firstChild;
},has:function(cJ,i,cK){return !!s(cK[3],cJ).length;
},header:function(cL){return (/h\d/i).test(cL.nodeName);
},text:function(cM){return "text"===cM.getAttribute('type');
},radio:function(cN){return "radio"===cN.type;
},checkbox:function(cO){return "checkbox"===cO.type;
},file:function(cP){return "file"===cP.type;
},password:function(cQ){return "password"===cQ.type;
},submit:function(cR){return "submit"===cR.type;
},image:function(cS){return "image"===cS.type;
},reset:function(cT){return "reset"===cT.type;
},button:function(cU){return "button"===cU.type||cU.nodeName.toLowerCase()==="button";
},input:function(cV){return (/input|select|textarea|button/i).test(cV.nodeName);
}},setFilters:{first:function(cW,i){return i===0;
},last:function(cX,i,cY,da){return i===da.length-1;
},even:function(db,i){return i%2===0;
},odd:function(dc,i){return i%2===1;
},lt:function(dd,i,de){return i<de[3]-0;
},gt:function(df,i,dg){return i>dg[3]-0;
},nth:function(dh,i,di){return di[3]-0===i;
},eq:function(dj,i,dk){return dk[3]-0===i;
}},filter:{PSEUDO:function(dl,dm,i,dn){var name=dm[1],dp=k.filters[name];

if(dp){return dp(dl,i,dm,dn);
}else if(name==="contains"){return (dl.textContent||dl.innerText||s.getText([dl])||"").indexOf(dm[3])>=0;
}else if(name==="not"){var dq=dm[3];

for(var j=0,l=dq.length;j<l;j++){if(dq[j]===dl){return false;
}}return true;
}else{s.error(name);
}},CHILD:function(dr,ds){var dy=ds[1],dt=dr;

switch(dy){case "only":case "first":while((dt=dt.previousSibling)){if(dt.nodeType===1){return false;
}}
if(dy==="first"){return true;
}dt=dr;
case "last":while((dt=dt.nextSibling)){if(dt.nodeType===1){return false;
}}return true;
case "nth":var dz=ds[2],dv=ds[3];

if(dz===1&&dv===0){return true;
}var dx=ds[0],parent=dr.parentNode;

if(parent&&(parent.sizcache!==dx||!dr.nodeIndex)){var du=0;

for(dt=parent.firstChild;dt;dt=dt.nextSibling){if(dt.nodeType===1){dt.nodeIndex=++du;
}}parent.sizcache=dx;
}var dw=dr.nodeIndex-dv;

if(dz===0){return dw===0;
}else{return (dw%dz===0&&dw/dz>=0);
}}},ID:function(dA,dB){return dA.nodeType===1&&dA.getAttribute("id")===dB;
},TAG:function(dC,dD){return (dD==="*"&&dC.nodeType===1)||dC.nodeName.toLowerCase()===dD;
},CLASS:function(dE,dF){return (" "+(dE.className||dE.getAttribute("class"))+" ").indexOf(dF)>-1;
},ATTR:function(dG,dH){var name=dH[1],dL=k.attrHandle[name]?k.attrHandle[name](dG):dG[name]!=null?dG[name]:dG.getAttribute(name),dK=dL+"",dJ=dH[2],dI=dH[4];
return dL==null?dJ==="!=":dJ==="="?dK===dI:dJ==="*="?dK.indexOf(dI)>=0:dJ==="~="?(" "+dK+" ").indexOf(dI)>=0:!dI?dK&&dL!==false:dJ==="!="?dK!==dI:dJ==="^="?dK.indexOf(dI)===0:dJ==="$="?dK.substr(dK.length-dI.length)===dI:dJ==="|="?dK===dI||dK.substr(0,dI.length+1)===dI+"-":false;
},POS:function(dM,dN,i,dO){var name=dN[2],dP=k.setFilters[name];

if(dP){return dP(dM,i,dN,dO);
}}}};
var q=k.match.POS,d=function(dQ,dR){return "\\"+(dR-0+1);
};

for(var w in k.match){k.match[w]=new RegExp(k.match[w].source+(/(?![^\[]*\])(?![^\(]*\))/.source));
k.leftMatch[w]=new RegExp(/(^(?:.|\r|\n)*?)/.source+k.match[w].source.replace(/\\(\d+)/g,d));
}var f=function(dS,dT){dS=Array.prototype.slice.call(dS,0);

if(dT){dT.push.apply(dT,dS);
return dT;
}return dS;
};
try{Array.prototype.slice.call(document.documentElement.childNodes,0)[0].nodeType;
}catch(e){f=function(dU,dV){var i=0,dW=dV||[];

if(x.call(dU)==="[object Array]"){Array.prototype.push.apply(dW,dU);
}else{if(typeof dU.length==="number"){for(var l=dU.length;i<l;i++){dW.push(dU[i]);
}}else{for(;dU[i];i++){dW.push(dU[i]);
}}}return dW;
};
}var u,n;

if(document.documentElement.compareDocumentPosition){u=function(a,b){if(a===b){p=true;
return 0;
}
if(!a.compareDocumentPosition||!b.compareDocumentPosition){return a.compareDocumentPosition?-1:1;
}return a.compareDocumentPosition(b)&4?-1:1;
};
}else{u=function(a,b){var ec,ea,ed=[],ee=[],dY=a.parentNode,eb=b.parentNode,dX=dY;
if(a===b){p=true;
return 0;
}else if(dY===eb){return n(a,b);
}else if(!dY){return -1;
}else if(!eb){return 1;
}while(dX){ed.unshift(dX);
dX=dX.parentNode;
}dX=eb;

while(dX){ee.unshift(dX);
dX=dX.parentNode;
}ec=ed.length;
ea=ee.length;
for(var i=0;i<ec&&i<ea;i++){if(ed[i]!==ee[i]){return n(ed[i],ee[i]);
}}return i===ec?n(a,ee[i],-1):n(ed[i],b,1);
};
n=function(a,b,ef){if(a===b){return ef;
}var eg=a.nextSibling;

while(eg){if(eg===b){return -1;
}eg=eg.nextSibling;
}return 1;
};
}s.getText=function(eh){var ej="",ei;

for(var i=0;eh[i];i++){ei=eh[i];
if(ei.nodeType===3||ei.nodeType===4){ej+=ei.nodeValue;
}else if(ei.nodeType!==8){ej+=s.getText(ei.childNodes);
}}return ej;
};
(function(){var em=document.createElement("div"),el="script"+(new Date()).getTime(),ek=document.documentElement;
em.innerHTML="<a name='"+el+"'/>";
ek.insertBefore(em,ek.firstChild);
if(document.getElementById(el)){k.find.ID=function(en,eo,ep){if(typeof eo.getElementById!=="undefined"&&!ep){var m=eo.getElementById(en[1]);
return m?m.id===en[1]||typeof m.getAttributeNode!=="undefined"&&m.getAttributeNode("id").nodeValue===en[1]?[m]:undefined:[];
}};
k.filter.ID=function(eq,er){var es=typeof eq.getAttributeNode!=="undefined"&&eq.getAttributeNode("id");
return eq.nodeType===1&&es&&es.nodeValue===er;
};
}ek.removeChild(em);
ek=em=null;
})();
(function(){var et=document.createElement("div");
et.appendChild(document.createComment(""));
if(et.getElementsByTagName("*").length>0){k.find.TAG=function(eu,ev){var ex=ev.getElementsByTagName(eu[1]);
if(eu[1]==="*"){var ew=[];

for(var i=0;ex[i];i++){if(ex[i].nodeType===1){ew.push(ex[i]);
}}ex=ew;
}return ex;
};
}et.innerHTML="<a href='#'></a>";

if(et.firstChild&&typeof et.firstChild.getAttribute!=="undefined"&&et.firstChild.getAttribute("href")!=="#"){k.attrHandle.href=function(ey){return ey.getAttribute("href",2);
};
}et=null;
})();

if(document.querySelectorAll){(function(){var eA=s,ez=document.createElement("div"),eB="__sizzle__";
ez.innerHTML="<p class='TEST'></p>";
if(ez.querySelectorAll&&ez.querySelectorAll(".TEST").length===0){return;
}s=function(eD,eE,eF,eG){eE=eE||document;
if(!eG&&!s.isXML(eE)){var eL=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(eD);

if(eL&&(eE.nodeType===1||eE.nodeType===9)){if(eL[1]){return f(eE.getElementsByTagName(eD),eF);
}else if(eL[2]&&k.find.CLASS&&eE.getElementsByClassName){return f(eE.getElementsByClassName(eL[2]),eF);
}}
if(eE.nodeType===9){if(eD==="body"&&eE.body){return f([eE.body],eF);
}else if(eL&&eL[3]){var eJ=eE.getElementById(eL[3]);
if(eJ&&eJ.parentNode){if(eJ.id===eL[3]){return f([eJ],eF);
}}else{return f([],eF);
}}
try{return f(eE.querySelectorAll(eD),eF);
}catch(eO){}}else if(eE.nodeType===1&&eE.nodeName.toLowerCase()!=="object"){var eN=eE,eI=eE.getAttribute("id"),eK=eI||eB,eH=eE.parentNode,eM=/^\s*[+~]/.test(eD);

if(!eI){eE.setAttribute("id",eK);
}else{eK=eK.replace(/'/g,"\\$&");
}
if(eM&&eH){eE=eE.parentNode;
}
try{if(!eM||eH){return f(eE.querySelectorAll("[id='"+eK+"'] "+eD),eF);
}}catch(eP){}finally{if(!eI){eN.removeAttribute("id");
}}}}return eA(eD,eE,eF,eG);
};

for(var eC in eA){s[eC]=eA[eC];
}ez=null;
})();
}(function(){var eS=document.documentElement,eQ=eS.matchesSelector||eS.mozMatchesSelector||eS.webkitMatchesSelector||eS.msMatchesSelector,eR=false;

try{eQ.call(document.documentElement,"[test!='']:sizzle");
}catch(eT){eR=true;
}
if(eQ){s.matchesSelector=function(eU,eV){eV=eV.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");

if(!s.isXML(eU)){try{if(eR||!k.match.PSEUDO.test(eV)&&!/!=/.test(eV)){return eQ.call(eU,eV);
}}catch(e){}}return s(eV,null,null,[eU]).length>0;
};
}})();
(function(){var eW=document.createElement("div");
eW.innerHTML="<div class='test e'></div><div class='test'></div>";
if(!eW.getElementsByClassName||eW.getElementsByClassName("e").length===0){return;
}eW.lastChild.className="e";

if(eW.getElementsByClassName("e").length===1){return;
}k.order.splice(1,0,"CLASS");
k.find.CLASS=function(eX,eY,fa){if(typeof eY.getElementsByClassName!=="undefined"&&!fa){return eY.getElementsByClassName(eX[1]);
}};
eW=null;
})();
function A(fb,fc,fd,fe,ff,fg){for(var i=0,l=fe.length;i<l;i++){var fi=fe[i];

if(fi){var fh=false;
fi=fi[fb];

while(fi){if(fi.sizcache===fd){fh=fe[fi.sizset];
break;
}
if(fi.nodeType===1&&!fg){fi.sizcache=fd;
fi.sizset=i;
}
if(fi.nodeName.toLowerCase()===fc){fh=fi;
break;
}fi=fi[fb];
}fe[i]=fh;
}}}function y(fj,fk,fl,fm,fn,fo){for(var i=0,l=fm.length;i<l;i++){var fq=fm[i];

if(fq){var fp=false;
fq=fq[fj];

while(fq){if(fq.sizcache===fl){fp=fm[fq.sizset];
break;
}
if(fq.nodeType===1){if(!fo){fq.sizcache=fl;
fq.sizset=i;
}
if(typeof fk!=="string"){if(fq===fk){fp=true;
break;
}}else if(s.filter(fk,[fq]).length>0){fp=fq;
break;
}}fq=fq[fj];
}fm[i]=fp;
}}}
if(document.documentElement.contains){s.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):true);
};
}else if(document.documentElement.compareDocumentPosition){s.contains=function(a,b){return !!(a.compareDocumentPosition(b)&16);
};
}else{s.contains=function(){return false;
};
}s.isXML=function(fr){var fs=(fr?fr.ownerDocument||fr:0).documentElement;
return fs?fs.nodeName!=="HTML":false;
};
var h=function(ft,fu){var fy,fw=[],fv="",fx=fu.nodeType?[fu]:fu;
while((fy=k.match.PSEUDO.exec(ft))){fv+=fy[0];
ft=ft.replace(k.match.PSEUDO,"");
}ft=k.relative[ft]?ft+"*":ft;

for(var i=0,l=fx.length;i<l;i++){s(ft,fx[i],fw);
}return s.filter(fv,fw);
};
var r=qx.bom.Selector;
r.query=function(fz,fA){return s(fz,fA);
};
r.matches=function(fB,fC){return s(fB,null,null,fC);
};
})();
})();
(function(){var l="",k="pdf",h="wmv",g="divx",f="quicktime",e="mshtml",d="silverlight",c="Silverlight",b="plugin.silverlight.version",a="function",H="QuickTimeCheckObject.QuickTimeCheck.1",G="Adobe Acrobat",F="plugin.windowsmedia",E="QuickTime",D="plugin.silverlight",C="qx.bom.client.Plugin",B="plugin.divx",A="Chrome PDF Viewer",z="Windows Media",y="plugin.gears",s="plugin.quicktime",t="plugin.windowsmedia.version",q="DivX Web Player",r="AgControl.AgControl",o="plugin.pdf",p="plugin.pdf.version",m="plugin.divx.version",n="WMPlayer.OCX.7",u="AcroPDF.PDF",v="plugin.activex",x="plugin.quicktime.version",w="npdivx.DivXBrowserPlugin.1";
qx.Bootstrap.define(C,{statics:{getGears:function(){return !!(window.google&&window.google.gears);
},getActiveX:function(){return (typeof window.ActiveXObject===a);
},__fz:{quicktime:{plugin:[E],control:H},wmv:{plugin:[z],control:n},divx:{plugin:[q],control:w},silverlight:{plugin:[c],control:r},pdf:{plugin:[A,G],control:u}},getQuicktimeVersion:function(){var I=qx.bom.client.Plugin.__fz[f];
return qx.bom.client.Plugin.__fA(I.control,I.plugin);
},getWindowsMediaVersion:function(){var J=qx.bom.client.Plugin.__fz[h];
return qx.bom.client.Plugin.__fA(J.control,J.plugin);
},getDivXVersion:function(){var K=qx.bom.client.Plugin.__fz[g];
return qx.bom.client.Plugin.__fA(K.control,K.plugin);
},getSilverlightVersion:function(){var L=qx.bom.client.Plugin.__fz[d];
return qx.bom.client.Plugin.__fA(L.control,L.plugin);
},getPdfVersion:function(){var M=qx.bom.client.Plugin.__fz[k];
return qx.bom.client.Plugin.__fA(M.control,M.plugin);
},getQuicktime:function(){var N=qx.bom.client.Plugin.__fz[f];
return qx.bom.client.Plugin.__fB(N.control,N.plugin);
},getWindowsMedia:function(){var O=qx.bom.client.Plugin.__fz[h];
return qx.bom.client.Plugin.__fB(O.control,O.plugin);
},getDivX:function(){var P=qx.bom.client.Plugin.__fz[g];
return qx.bom.client.Plugin.__fB(P.control,P.plugin);
},getSilverlight:function(){var Q=qx.bom.client.Plugin.__fz[d];
return qx.bom.client.Plugin.__fB(Q.control,Q.plugin);
},getPdf:function(){var R=qx.bom.client.Plugin.__fz[k];
return qx.bom.client.Plugin.__fB(R.control,R.plugin);
},__fA:function(S,T){var U=qx.bom.client.Plugin.__fB(S,T);
if(!U){return l;
}if(qx.bom.client.Engine.getName()==e){var V=new ActiveXObject(S);

try{var Y=V.versionInfo;

if(Y!=undefined){return Y;
}Y=V.version;

if(Y!=undefined){return Y;
}Y=V.settings.version;

if(Y!=undefined){return Y;
}}catch(bb){return l;
}return l;
}else{var ba=navigator.plugins;
var X=/([0-9]\.[0-9])/g;

for(var i=0;i<ba.length;i++){var W=ba[i];

for(var j=0;j<T.length;j++){if(W.name.indexOf(T[j])!==-1){if(X.test(W.name)||X.test(W.description)){return RegExp.$1;
}}}}return l;
}},__fB:function(bc,bd){if(qx.bom.client.Engine.getName()==e){var be=window.ActiveXObject;

if(!be){return false;
}
try{new ActiveXObject(bc);
}catch(bg){return false;
}return true;
}else{var bf=navigator.plugins;

if(!bf){return false;
}var name;

for(var i=0;i<bf.length;i++){name=bf[i].name;

for(var j=0;j<bd.length;j++){if(name.indexOf(bd[j])!==-1){return true;
}}}return false;
}}},defer:function(bh){qx.core.Environment.add(y,bh.getGears);
qx.core.Environment.add(s,bh.getQuicktime);
qx.core.Environment.add(x,bh.getQuicktimeVersion);
qx.core.Environment.add(F,bh.getWindowsMedia);
qx.core.Environment.add(t,bh.getWindowsMediaVersion);
qx.core.Environment.add(B,bh.getDivX);
qx.core.Environment.add(m,bh.getDivXVersion);
qx.core.Environment.add(D,bh.getSilverlight);
qx.core.Environment.add(b,bh.getSilverlightVersion);
qx.core.Environment.add(o,bh.getPdf);
qx.core.Environment.add(p,bh.getPdfVersion);
qx.core.Environment.add(v,bh.getActiveX);
}});
})();
(function(){var s="plugin.activex",r="MSXML2.DOMDocument.3.0",q="",p='<\?xml version="1.0" encoding="utf-8"?>\n<',o="qx.xml.Document",n=" />",m="xml.domparser",k="SelectionLanguage",j="'",h="MSXML2.XMLHTTP.3.0",c="MSXML2.XMLHTTP.6.0",g="xml.implementation",f=" xmlns='",b="text/xml",a="XPath",e="MSXML2.DOMDocument.6.0",d="HTML";
qx.Class.define(o,{statics:{DOMDOC:null,XMLHTTP:null,isXmlDocument:function(t){if(t.nodeType===9){return t.documentElement.nodeName!==d;
}else if(t.ownerDocument){return this.isXmlDocument(t.ownerDocument);
}else{return false;
}},create:function(u,v){if(qx.core.Environment.get(s)){var w=new ActiveXObject(this.DOMDOC);
if(this.DOMDOC==r){w.setProperty(k,a);
}
if(v){var x=p;
x+=v;

if(u){x+=f+u+j;
}x+=n;
w.loadXML(x);
}return w;
}
if(qx.core.Environment.get(g)){return document.implementation.createDocument(u||q,v||q,null);
}throw new Error("No XML implementation available!");
},fromString:function(y){if(qx.core.Environment.get(s)){var A=qx.xml.Document.create();
A.loadXML(y);
return A;
}
if(qx.core.Environment.get(m)){var z=new DOMParser();
return z.parseFromString(y,b);
}throw new Error("No XML implementation available!");
}},defer:function(B){if(qx.core.Environment.get(s)){var C=[e,r];
var D=[c,h];

for(var i=0,l=C.length;i<l;i++){try{new ActiveXObject(C[i]);
new ActiveXObject(D[i]);
}catch(E){continue;
}B.DOMDOC=C[i];
B.XMLHTTP=D[i];
break;
}}}});
})();
(function(){var s="undefined",r="function",q="<a></a>",p="xml.implementation",o="xml.attributens",n="xml.selectnodes",m="xml.getqualifieditem",l="SelectionLanguage",k="xml.getelementsbytagnamens",j="qx.bom.client.Xml",d="xml.domproperties",i="xml.selectsinglenode",g="1.0",c="xml.createnode",b="xml.domparser",f="getProperty",e="XML",h="string",a="xml.createelementns";
qx.Bootstrap.define(j,{statics:{getImplementation:function(){return document.implementation&&document.implementation.hasFeature&&document.implementation.hasFeature(e,g);
},getDomParser:function(){return typeof window.DOMParser!==s;
},getSelectSingleNode:function(){return typeof qx.xml.Document.create().selectSingleNode!==s;
},getSelectNodes:function(){return typeof qx.xml.Document.create().selectNodes!==s;
},getElementsByTagNameNS:function(){return typeof qx.xml.Document.create().getElementsByTagNameNS!==s;
},getDomProperties:function(){var t=qx.xml.Document.create();
return (f in t&&typeof t.getProperty(l)===h);
},getAttributeNS:function(){var u=qx.xml.Document.fromString(q).documentElement;
return typeof u.getAttributeNS===r&&typeof u.setAttributeNS===r;
},getCreateElementNS:function(){return typeof qx.xml.Document.create().createElementNS===r;
},getCreateNode:function(){return typeof qx.xml.Document.create().createNode!==s;
},getQualifiedItem:function(){var v=qx.xml.Document.fromString(q).documentElement;
return typeof v.attributes.getQualifiedItem!==s;
}},defer:function(w){qx.core.Environment.add(p,w.getImplementation);
qx.core.Environment.add(b,w.getDomParser);
qx.core.Environment.add(i,w.getSelectSingleNode);
qx.core.Environment.add(n,w.getSelectNodes);
qx.core.Environment.add(k,w.getElementsByTagNameNS);
qx.core.Environment.add(d,w.getDomProperties);
qx.core.Environment.add(o,w.getAttributeNS);
qx.core.Environment.add(a,w.getCreateElementNS);
qx.core.Environment.add(c,w.getCreateNode);
qx.core.Environment.add(m,w.getQualifiedItem);
}});
})();
(function(){var d="-",c="qx.bom.Style",b="string",a="";
qx.Bootstrap.define(c,{statics:{VENDOR_PREFIXES:["Webkit","Moz","O","ms","Khtml"],getPropertyName:function(e){var f=document.documentElement.style;

for(var i=0,l=this.VENDOR_PREFIXES.length;i<l;i++){var g=this.VENDOR_PREFIXES[i]+qx.lang.String.firstUp(e);

if(f[g]!==undefined){return g;
}}if(f[e]!==undefined){return e;
}return null;
},getAppliedStyle:function(h,j,k,m){var n=(m!==false)?[null].concat(this.VENDOR_PREFIXES):[null];

for(var i=0,l=n.length;i<l;i++){var o=n[i]?d+n[i].toLowerCase()+d+k:k;
try{h.style[j]=o;

if(typeof h.style[j]==b&&h.style[j]!==a){return o;
}}catch(p){}}return null;
}}});
})();
(function(){var k="div",j="-moz-none",h="string",g="backgroundImage",f="inline-block",e="-moz-inline-box",d="span",c="color",b="css.float",a="css.inlineblock",bb="css.usermodify",ba="boxSizing",Y="placeholder",X="content",W="css.appearance",V="css.gradient.radial",U="borderImage",T="userSelect",S="css.overflowxy",R="styleFloat",r="css.userselect",s="css.boxsizing",p="css.boxmodel",q="qx.bom.client.Css",n="appearance",o='m11',l="input",m="css.boxshadow",v="css.gradient.legacywebkit",w="css.borderradius",E="linear-gradient(0deg, #fff, #000)",C="css.opacity",J="css.borderimage",G="rgba(1, 2, 3, 0.5)",N="radial-gradient(0px 0px, cover, red 50%, blue 100%)",L="rgba",y="css.gradients",Q="borderRadius",P="css.gradient.linear",O='WebKitCSSMatrix',x="-webkit-gradient(linear,0% 0%,100% 100%,from(white), to(red))",A="mshtml",B="css.rgba",D="none",F="css.placeholder",H="css.userselect.none",K="css.textoverflow",M="textOverflow",t="userModify",u="boxShadow",z="cssFloat",I="border";
qx.Bootstrap.define(q,{statics:{__fC:null,getBoxModel:function(){var content=qx.bom.client.Engine.getName()!==A||!qx.bom.client.Browser.getQuirksMode();
return content?X:I;
},getTextOverflow:function(){return qx.bom.Style.getPropertyName(M);
},getPlaceholder:function(){var i=document.createElement(l);
return Y in i;
},getAppearance:function(){return qx.bom.Style.getPropertyName(n);
},getBorderRadius:function(){return qx.bom.Style.getPropertyName(Q);
},getBoxShadow:function(){return qx.bom.Style.getPropertyName(u);
},getBorderImage:function(){return qx.bom.Style.getPropertyName(U);
},getUserSelect:function(){return qx.bom.Style.getPropertyName(T);
},getUserSelectNone:function(){var bd=qx.bom.client.Css.getUserSelect();

if(bd){var bc=document.createElement(d);
bc.style[bd]=j;
return bc.style[bd]===j?j:D;
}return null;
},getUserModify:function(){return qx.bom.Style.getPropertyName(t);
},getFloat:function(){var be=document.documentElement.style;
return be.cssFloat!==undefined?z:be.styleFloat!==undefined?R:null;
},getTranslate3d:function(){return O in window&&o in new WebKitCSSMatrix();
},getGradients:function(){return !!(qx.bom.client.Css.getLinearGradient());
},getLinearGradient:function(){qx.bom.client.Css.__fC=false;
var bi=E;
var bf=document.createElement(k);
var bg=qx.bom.Style.getAppliedStyle(bf,g,bi);

if(!bg){bi=x;
var bg=qx.bom.Style.getAppliedStyle(bf,g,bi,false);

if(bg){qx.bom.client.Css.__fC=true;
}}if(!bg){return null;
}var bh=/(.*?)\(/.exec(bg);
return bh?bh[1]:null;
},getRadialGradient:function(){var bm=N;
var bj=document.createElement(k);
var bk=qx.bom.Style.getAppliedStyle(bj,g,bm);

if(!bk){return null;
}var bl=/(.*?)\(/.exec(bk);
return bl?bl[1]:null;
},getLegacyWebkitGradient:function(){if(qx.bom.client.Css.__fC===null){qx.bom.client.Css.getLinearGradient();
}return qx.bom.client.Css.__fC;
},getRgba:function(){var bn;

try{bn=document.createElement(k);
}catch(bo){bn=document.createElement();
}try{bn.style[c]=G;

if(bn.style[c].indexOf(L)!=-1){return true;
}}catch(bp){}return false;
},getBoxSizing:function(){return qx.bom.Style.getPropertyName(ba);
},getInlineBlock:function(){var bq=document.createElement(d);
bq.style.display=f;

if(bq.style.display==f){return f;
}bq.style.display=e;

if(bq.style.display!==e){return e;
}return null;
},getOpacity:function(){return (typeof document.documentElement.style.opacity==h);
},getOverflowXY:function(){return (typeof document.documentElement.style.overflowX==h)&&(typeof document.documentElement.style.overflowY==h);
}},defer:function(br){qx.core.Environment.add(K,br.getTextOverflow);
qx.core.Environment.add(F,br.getPlaceholder);
qx.core.Environment.add(w,br.getBorderRadius);
qx.core.Environment.add(m,br.getBoxShadow);
qx.core.Environment.add(y,br.getGradients);
qx.core.Environment.add(P,br.getLinearGradient);
qx.core.Environment.add(V,br.getRadialGradient);
qx.core.Environment.add(v,br.getLegacyWebkitGradient);
qx.core.Environment.add(p,br.getBoxModel);
qx.core.Environment.add(B,br.getRgba);
qx.core.Environment.add(J,br.getBorderImage);
qx.core.Environment.add(bb,br.getUserModify);
qx.core.Environment.add(r,br.getUserSelect);
qx.core.Environment.add(H,br.getUserSelectNone);
qx.core.Environment.add(W,br.getAppearance);
qx.core.Environment.add(b,br.getFloat);
qx.core.Environment.add(s,br.getBoxSizing);
qx.core.Environment.add(a,br.getInlineBlock);
qx.core.Environment.add(C,br.getOpacity);
qx.core.Environment.add(S,br.getOverflowXY);
}});
})();
(function(){var k="css.overflowxy",j="-moz-scrollbars-none",i="hidden",h="",g="gecko",f="overflow",e="webkit",d="engine.version",b="none",a="scroll",B="borderLeftStyle",A="borderRightStyle",z="div",y="borderRightWidth",x="overflow-y",w="borderLeftWidth",v="-moz-scrollbars-vertical",u=":",r="overflowY",q="100px",o="overflow:",p="qx.bom.element.Overflow",m="overflow-x",n=";",l="overflowX";
qx.Class.define(p,{statics:{DEFAULT_SCROLLBAR_WIDTH:14,__fD:null,getScrollbarWidth:function(){if(this.__fD!==null){return this.__fD;
}var C=qx.bom.element.Style;
var E=function(I,J){return parseInt(C.get(I,J),10)||0;
};
var F=function(K){return (C.get(K,A)==b?0:E(K,y));
};
var D=function(L){return (C.get(L,B)==b?0:E(L,w));
};
var H=function(M){if(M.clientWidth==0){var N=C.get(M,f);
var O=(N==a||N==v?16:0);
return Math.max(0,F(M)+O);
}return Math.max(0,(M.offsetWidth-M.clientWidth-D(M)));
};
var G=function(P){return H(P)-F(P);
};
var t=document.createElement(z);
var s=t.style;
s.height=s.width=q;
s.overflow=a;
document.body.appendChild(t);
var c=G(t);
this.__fD=c;
document.body.removeChild(t);
return this.__fD;
},_compile:function(Q,R){if(!qx.core.Environment.get(k)){Q=o;

if(e===g&&R==i){R=j;
}}return Q+u+R+n;
},compileX:function(S){return this._compile(m,S);
},compileY:function(T){return this._compile(x,T);
},getX:function(U,V){if(qx.core.Environment.get(k)){return qx.bom.element.Style.get(U,l,V,false);
}var W=qx.bom.element.Style.get(U,f,V,false);

if(W===j){W=i;
}return W;
},setX:function(X,Y){if(qx.core.Environment.get(k)){X.style.overflowX=Y;
}else{if(Y===i&&e===g&&parseFloat(qx.core.Environment.get(d))<1.8){Y=j;
}X.style.overflow=Y;
}},resetX:function(ba){if(qx.core.Environment.get(k)){ba.style.overflowX=h;
}else{ba.style.overflow=h;
}},getY:function(bb,bc){if(qx.core.Environment.get(k)){return qx.bom.element.Style.get(bb,r,bc,false);
}var bd=qx.bom.element.Style.get(bb,f,bc,false);

if(bd===j){bd=i;
}return bd;
},setY:function(be,bf){if(qx.core.Environment.get(k)){be.style.overflowY=bf;
}else{if(bf===i&&e===g&&parseFloat(qx.core.Environment.get(d))<1.8){bf=j;
}be.style.overflow=bf;
}},resetY:function(bg){if(qx.core.Environment.get(k)){bg.style.overflowY=h;
}else{bg.style.overflow=h;
}}}});
})();
(function(){var h="css.boxsizing",g="",f="border-box",e="qx.bom.element.BoxSizing",d="boxSizing",c="content-box",b=":",a=";";
qx.Class.define(e,{statics:{__fE:{tags:{button:true,select:true},types:{search:true,button:true,submit:true,reset:true,checkbox:true,radio:true}},__fF:function(i){var j=this.__fE;
return j.tags[i.tagName.toLowerCase()]||j.types[i.type];
},compile:function(k){if(qx.core.Environment.get(h)){var l=qx.lang.String.hyphenate(qx.core.Environment.get(h));
return l+b+k+a;
}else{qx.log.Logger.warn(this,"This client does not support dynamic modification of the boxSizing property.");
qx.log.Logger.trace();
}},get:function(m){if(qx.core.Environment.get(h)){return qx.bom.element.Style.get(m,d,null,false)||g;
}
if(qx.bom.Document.isStandardMode(qx.dom.Node.getWindow(m))){if(!this.__fF(m)){return c;
}}return f;
},set:function(n,o){if(qx.core.Environment.get(h)){try{n.style[qx.core.Environment.get(h)]=o;
}catch(p){qx.log.Logger.warn(this,"This client does not support the boxSizing value",o);
}}else{qx.log.Logger.warn(this,"This client does not support dynamic modification of the boxSizing property.");
}},reset:function(q){this.set(q,g);
}}});
})();
(function(){var e="",d="cursor:",c="qx.bom.element.Cursor",b="cursor",a=";";
qx.Class.define(c,{statics:{__bd:{},compile:function(f){return d+(this.__bd[f]||f)+a;
},get:function(g,h){return qx.bom.element.Style.get(g,b,h,false);
},set:function(i,j){i.style.cursor=this.__bd[j]||j;
},reset:function(k){k.style.cursor=e;
}}});
})();
(function(){var o="auto",n="px",m=",",l="clip:auto;",k="rect(",j=");",i="",h=")",g="qx.bom.element.Clip",f="string",c="clip:rect(",e=" ",d="clip",b="rect(auto,auto,auto,auto)",a="rect(auto, auto, auto, auto)";
qx.Class.define(g,{statics:{compile:function(p){if(!p){return l;
}var u=p.left;
var top=p.top;
var t=p.width;
var s=p.height;
var q,r;

if(u==null){q=(t==null?o:t+n);
u=o;
}else{q=(t==null?o:u+t+n);
u=u+n;
}
if(top==null){r=(s==null?o:s+n);
top=o;
}else{r=(s==null?o:top+s+n);
top=top+n;
}return c+top+m+q+m+r+m+u+j;
},get:function(v,w){var y=qx.bom.element.Style.get(v,d,w,false);
var E,top,C,B;
var x,z;

if(typeof y===f&&y!==o&&y!==i){y=qx.lang.String.trim(y);
if(/\((.*)\)/.test(y)){var D=RegExp.$1;
if(/,/.test(D)){var A=D.split(m);
}else{var A=D.split(e);
}top=qx.lang.String.trim(A[0]);
x=qx.lang.String.trim(A[1]);
z=qx.lang.String.trim(A[2]);
E=qx.lang.String.trim(A[3]);
if(E===o){E=null;
}
if(top===o){top=null;
}
if(x===o){x=null;
}
if(z===o){z=null;
}if(top!=null){top=parseInt(top,10);
}
if(x!=null){x=parseInt(x,10);
}
if(z!=null){z=parseInt(z,10);
}
if(E!=null){E=parseInt(E,10);
}if(x!=null&&E!=null){C=x-E;
}else if(x!=null){C=x;
}
if(z!=null&&top!=null){B=z-top;
}else if(z!=null){B=z;
}}else{throw new Error("Could not parse clip string: "+y);
}}return {left:E||null,top:top||null,width:C||null,height:B||null};
},set:function(F,G){if(!G){F.style.clip=b;
return;
}var L=G.left;
var top=G.top;
var K=G.width;
var J=G.height;
var H,I;

if(L==null){H=(K==null?o:K+n);
L=o;
}else{H=(K==null?o:L+K+n);
L=L+n;
}
if(top==null){I=(J==null?o:J+n);
top=o;
}else{I=(J==null?o:top+J+n);
top=top+n;
}F.style.clip=k+top+m+H+m+I+m+L+h;
},reset:function(M){M.style.clip=a;
}}});
})();
(function(){var e="",d="opacity",c="qx.bom.element.Opacity",b=";",a="opacity:";
qx.Class.define(c,{statics:{SUPPORT_CSS3_OPACITY:false,compile:function(f){if(f>=1){return e;
}return a+f+b;
},set:function(g,h){if(h>=1){h=e;
}g.style.opacity=h;
},reset:function(i){i.style.opacity=e;
},get:function(j,k){var l=qx.bom.element.Style.get(j,d,k,false);

if(l!=null){return parseFloat(l);
}return 1.0;
}},defer:function(m){m.SUPPORT_CSS3_OPACITY=qx.core.Environment.get("css.opacity");
}});
})();
(function(){var j="",i="float",h="browser.documentmode",g="mshtml",f="webkit",e="style",d="css.float",c="css.appearance",b="pixelBottom",a="css.userselect",v="css.boxsizing",u="css.textoverflow",t="pixelHeight",s="pixelRight",r=":",q="pixelTop",p="css.borderimage",o="pixelLeft",n="css.usermodify",m="qx.bom.element.Style",k="pixelWidth",l=";";
qx.Class.define(m,{statics:{__fG:function(){var x={"appearance":qx.core.Environment.get(c),"userSelect":qx.core.Environment.get(a),"textOverflow":qx.core.Environment.get(u),"borderImage":qx.core.Environment.get(p),"float":qx.core.Environment.get(d),"userModify":qx.core.Environment.get(n),"boxSizing":qx.core.Environment.get(v)};
this.__fH={};

for(var w in qx.lang.Object.clone(x)){if(!x[w]){delete x[w];
}else{this.__fH[w]=w==i?i:qx.lang.String.hyphenate(x[w]);
}}this.__fI=x;
},__fJ:{width:k,height:t,left:o,right:s,top:q,bottom:b},__fK:{clip:qx.bom.element.Clip,cursor:qx.bom.element.Cursor,opacity:qx.bom.element.Opacity,boxSizing:qx.bom.element.BoxSizing,overflowX:{set:qx.lang.Function.bind(qx.bom.element.Overflow.setX,qx.bom.element.Overflow),get:qx.lang.Function.bind(qx.bom.element.Overflow.getX,qx.bom.element.Overflow),reset:qx.lang.Function.bind(qx.bom.element.Overflow.resetX,qx.bom.element.Overflow),compile:qx.lang.Function.bind(qx.bom.element.Overflow.compileX,qx.bom.element.Overflow)},overflowY:{set:qx.lang.Function.bind(qx.bom.element.Overflow.setY,qx.bom.element.Overflow),get:qx.lang.Function.bind(qx.bom.element.Overflow.getY,qx.bom.element.Overflow),reset:qx.lang.Function.bind(qx.bom.element.Overflow.resetY,qx.bom.element.Overflow),compile:qx.lang.Function.bind(qx.bom.element.Overflow.compileY,qx.bom.element.Overflow)}},compile:function(y){var A=[];
var C=this.__fK;
var B=this.__fH;
var name,z;

for(name in y){z=y[name];

if(z==null){continue;
}name=B[name]||name;
if(C[name]){A.push(C[name].compile(z));
}else{A.push(qx.lang.String.hyphenate(name),r,z,l);
}}return A.join(j);
},setCss:function(D,E){if(f===g&&parseInt(qx.core.Environment.get(h),10)<8){D.style.cssText=E;
}else{D.setAttribute(e,E);
}},getCss:function(F){if(f===g&&parseInt(qx.core.Environment.get(h),10)<8){return F.style.cssText.toLowerCase();
}else{return F.getAttribute(e);
}},isPropertySupported:function(G){return (this.__fK[G]||this.__fI[G]||G in document.documentElement.style);
},COMPUTED_MODE:1,CASCADED_MODE:2,LOCAL_MODE:3,set:function(H,name,I,J){name=this.__fI[name]||name;
if(J!==false&&this.__fK[name]){return this.__fK[name].set(H,I);
}else{H.style[name]=I!==null?I:j;
}},setStyles:function(K,L,M){var P=this.__fI;
var R=this.__fK;
var N=K.style;

for(var Q in L){var O=L[Q];
var name=P[Q]||Q;

if(O===undefined){if(M!==false&&R[name]){R[name].reset(K);
}else{N[name]=j;
}}else{if(M!==false&&R[name]){R[name].set(K,O);
}else{N[name]=O!==null?O:j;
}}}},reset:function(S,name,T){name=this.__fI[name]||name;
if(T!==false&&this.__fK[name]){return this.__fK[name].reset(S);
}else{S.style[name]=j;
}},get:function(U,name,V,W){name=this.__fI[name]||name;
if(W!==false&&this.__fK[name]){return this.__fK[name].get(U,V);
}switch(V){case this.LOCAL_MODE:return U.style[name]||j;
case this.CASCADED_MODE:if(U.currentStyle){return U.currentStyle[name]||j;
}throw new Error("Cascaded styles are not supported in this browser!");
default:var X=qx.dom.Node.getDocument(U);
var Y=X.defaultView.getComputedStyle(U,null);
return Y?Y[name]:j;
}}},defer:function(ba){ba.__fG();
}});
})();
(function(){var g="qx.ui.mobile.core.Root",f="Boolean",e="root",d="overflow-y",c="hidden",b="auto",a="_applyShowScrollbarY";
qx.Class.define(g,{extend:qx.ui.mobile.core.Widget,include:[qx.ui.mobile.core.MChildrenHandling],construct:function(h){this.__cR=h||document.body;
qx.ui.mobile.core.Widget.call(this);
},properties:{defaultCssClass:{refine:true,init:e},showScrollbarY:{check:f,init:true,apply:a}},members:{__cR:null,_createContainerElement:function(){return this.__cR;
},_applyShowScrollbarY:function(i,j){this._setStyle(d,i?b:c);
}},destruct:function(){this.__cR=null;
},defer:function(k,l){qx.ui.mobile.core.MChildrenHandling.remap(l);
}});
})();
(function(){var g="eventNavigationButtonClicked",f="List",e="iartnorfolk.Application",d="back",c="Map",b="Share",a="Settings";
qx.Class.define(e,{extend:qx.application.Mobile,members:{main:function(){qx.application.Mobile.prototype.main.call(this);
document.body.a1=this;
document.mapMuralProperties=function(m){m.interalId=m.assetId||m.accession_id;
delete m.assetId;
m.title=m.Title||m.title;
delete m.Title;
m.imgs=[];
m.imgs.push(m.Image);
};
document.__fL=null;
this._pageForwarder=function(h){document.body.a2=h;

switch(h.getData().button){case c:document.mapPage.show();
break;
case f:document.listPage.show();
break;
case b:document.sharePage.show();
break;
case a:document.settingsPage.show();
break;
default:return;
break;
}document.__fL=h.getData().from;
};
this._backButtonHandler=function(){if(document.__fL!=null){document.__fL.show({reverse:true});
}document.__fL=null;
};
document.mapPage=new iartnorfolk.page.Map();
document.mapPage.addListener(g,this._pageForwarder,this);
document.listPage=new iartnorfolk.page.List();
document.listPage.addListener(g,this._pageForwarder,this);
document.sharePage=new iartnorfolk.page.Share();
document.sharePage.addListener(g,this._pageForwarder,this);
document.settingsPage=new iartnorfolk.page.Settings();
document.settingsPage.addListener(g,this._pageForwarder,this);
document.detailPage=new iartnorfolk.page.Detail();
document.detailPage.addListener(d,this._backButtonHandler,this);
document.detailPage.addListener(g,this._pageForwarder,this);
document.mapPage.show();
}}});
})();
(function(){var n="perspectiveProperty",m="css.transform.3d",l="BackfaceVisibility",k="TransformStyle",j="WebkitPerspective",h='div',g="TransformOrigin",f="qx.bom.client.CssTransform",e="Transform",d="MozPerspective",a="Perspective",c="css.transform",b="PerspectiveOrigin";
qx.Bootstrap.define(f,{statics:{getSupport:function(){var name=qx.bom.client.CssTransform.getName();

if(name!=null){return {"name":name,"style":qx.bom.client.CssTransform.getStyle(),"origin":qx.bom.client.CssTransform.getOrigin(),"3d":qx.bom.client.CssTransform.get3D(),"perspective":qx.bom.client.CssTransform.getPerspective(),"perspective-origin":qx.bom.client.CssTransform.getPerspectiveOrigin(),"backface-visibility":qx.bom.client.CssTransform.getBackFaceVisibility()};
}return null;
},getStyle:function(){return qx.bom.Style.getPropertyName(k);
},getPerspective:function(){return qx.bom.Style.getPropertyName(a);
},getPerspectiveOrigin:function(){return qx.bom.Style.getPropertyName(b);
},getBackFaceVisibility:function(){return qx.bom.Style.getPropertyName(l);
},getOrigin:function(){return qx.bom.Style.getPropertyName(g);
},getName:function(){return qx.bom.Style.getPropertyName(e);
},get3D:function(){var o=document.createElement(h);
var q=false;
var p=[n,j,d];

for(var i=p.length-1;i>=0;i--){q=q?q:o.style[p[i]]!=undefined;
}return q;
}},defer:function(r){qx.core.Environment.add(c,r.getSupport);
qx.core.Environment.add(m,r.get3D);
}});
})();
(function(){var k="os.name",j="android",h="phonegap",g="menubutton",f="qx.event.type.Data",e="backbutton",d="add",c="input",b="qx.ui.mobile.page.manager.Simple",a="remove";
qx.Class.define(b,{extend:qx.core.Object,construct:function(l){qx.core.Object.call(this);
this.__fM={};
this._setRoot(l);
this.__fQ();
},events:{add:f,remove:f},members:{__fM:null,__fN:null,__cR:null,__fO:null,__fP:null,__fQ:function(){if(qx.core.Environment.get(h)&&qx.core.Environment.get(k)==j){this.__fO=qx.lang.Function.bind(this._onBackButton,this);
this.__fP=qx.lang.Function.bind(this._onMenuButton,this);
qx.bom.Event.addNativeListener(document,e,this.__fO);
qx.bom.Event.addNativeListener(document,g,this.__fP);
}},__fR:function(){if(qx.core.Environment.get(h)&&qx.core.Environment.get(k)==j){qx.bom.Event.removeNativeListener(document,e,this.__fO);
qx.bom.Event.removeNativeListener(document,g,this.__fP);
}},_onBackButton:function(){if(qx.core.Environment.get(h)&&qx.core.Environment.get(k)==j){var m=true;

if(this.__fN){m=this.__fN.back();
}
if(m){navigator.app.exitApp();
}}},_onMenuButton:function(){if(qx.core.Environment.get(h)&&qx.core.Environment.get(k)==j){if(this.__fN){this.__fN.menu();
}}},add:function(n){this.__fM[n.getId()]=n;
this.fireDataEvent(d,n);
},remove:function(o){var p=this.getPage(o);
delete this.__fM[o];
this.fireDataEvent(a,p);
},show:function(q){var r=this.__fN;

if(r==q){return;
}q.initialize();
q.start();
this._getRoot().add(q);

if(r){r.stop();
this.__fS();
this._removeCurrentPage();
}this._setCurrentPage(q);
},_removeCurrentPage:function(){this._getRoot().remove(this.__fN);
},_getRoot:function(){if(this.__cR==null){this._setRoot(qx.core.Init.getApplication().getRoot());
}return this.__cR;
},_setRoot:function(s){this.__cR=s;
},getCurrentPage:function(){return this.__fN;
},_setCurrentPage:function(t){this.__fN=t;
},getPage:function(u){return this.__fM[u];
},__fS:function(){var v=document.getElementsByTagName(c);

for(var i=0,length=v.length;i<length;i++){v[i].blur();
}}},destruct:function(){this.__fR();
this.__fT=this.__fM=this.__fN=this.__cR=null;
}});
})();
(function(){var e="notification",d="PhoneGap",c="qx.bom.client.PhoneGap",b="phonegap",a="phonegap.notification";
qx.Bootstrap.define(c,{statics:{getPhoneGap:function(){return d in window;
},getNotification:function(){return e in navigator;
}},defer:function(f){qx.core.Environment.add(b,f.getPhoneGap);
qx.core.Environment.add(a,f.getNotification);
}});
})();
(function(){var f="",d="engine.version",c="qx.core.BaseInit",b="os.name",a="iartnorfolk.Application";
qx.Class.define(c,{statics:{getApplication:function(){return this.__fU||null;
},ready:function(){if(this.__fU){return;
}
if(qx.core.Environment.get(d)==f){qx.log.Logger.warn("Could not detect the version of the engine!");
}
if(qx.core.Environment.get(b)==f){qx.log.Logger.warn("Could not detect operating system!");
}qx.log.Logger.debug(this,"Load runtime: "+(new Date-qx.Bootstrap.LOADSTART)+"ms");
var h=a;
var i=qx.Class.getByName(h);

if(i){this.__fU=new i;
var g=new Date;
this.__fU.main();
qx.log.Logger.debug(this,"Main runtime: "+(new Date-g)+"ms");
var g=new Date;
this.__fU.finalize();
qx.log.Logger.debug(this,"Finalize runtime: "+(new Date-g)+"ms");
}else{qx.log.Logger.warn("Missing application class: "+h);
}},__fV:function(e){var j=this.__fU;

if(j){j.close();
}},__fW:function(){var k=this.__fU;

if(k){k.terminate();
}qx.core.ObjectRegistry.shutdown();
}}});
})();
(function(){var d="ready",c="shutdown",b="beforeunload",a="qx.core.Init";
qx.Class.define(a,{statics:{getApplication:qx.core.BaseInit.getApplication,ready:qx.core.BaseInit.ready,__fV:function(e){var f=this.getApplication();

if(f){e.setReturnValue(f.close());
}},__fW:function(){var g=this.getApplication();

if(g){g.terminate();
}}},defer:function(h){qx.event.Registration.addListener(window,d,h.ready,h);
qx.event.Registration.addListener(window,c,h.__fW,h);
qx.event.Registration.addListener(window,b,h.__fV,h);
}});
})();
(function(){var k="animationEnd",j="animationParent",i="in",h="out",g="qx.event.type.Data",f="animationChild",e="qx.ui.mobile.page.manager.Animation",d="reverse",c="slide",b="String",a="animationStart";
qx.Class.define(e,{extend:qx.ui.mobile.page.manager.Simple,events:{animationStart:g,animationEnd:g},properties:{defaultAnimation:{check:b,init:c}},statics:{ANIMATIONS:{"slide":true,"pop":true,"fade":true,"dissolve":true,"slideup":true,"flip":true,"swap":true,"cube":true}},members:{__fX:null,__fY:null,__ga:null,__gb:null,__gc:null,isInAnimation:function(){return this.__fX;
},show:function(l,m){if(this.__fX){return;
}m=m||{};
this.__fY=m.animation||this.getDefaultAnimation();
m.reverse=m.reverse==null?false:m.reverse;
this.__ga=m.fromHistory||m.reverse;
this.__gb=this.getCurrentPage();
this.__gc=l;
qx.ui.mobile.page.manager.Simple.prototype.show.call(this,l);
},_removeCurrentPage:function(){this.__gd();
},__gd:function(){this.__fX=true;
this.fireDataEvent(a,[this.__gb,this.__gc]);
var p=this.__gb.getContainerElement();
var n=this.__gc.getContainerElement();
var o=this.__gf(h);
var q=this.__gf(i);
qx.event.Registration.addListener(p,k,this._onAnimationEnd,this);
qx.event.Registration.addListener(n,k,this._onAnimationEnd,this);
this._getRoot().addCssClass(j);
qx.bom.element.Class.addClasses(n,q);
qx.bom.element.Class.addClasses(p,o);
},_onAnimationEnd:function(r){this._getRoot().remove(this.__gb);
this.__ge();
this.fireDataEvent(k,[this.__gb,this.__gc]);
},__ge:function(){if(this.__fX){var t=this.__gb.getContainerElement();
var s=this.__gc.getContainerElement();
qx.event.Registration.removeListener(t,k,this._onAnimationEnd,this);
qx.event.Registration.removeListener(s,k,this._onAnimationEnd,this);
qx.bom.element.Class.removeClasses(t,this.__gf(h));
qx.bom.element.Class.removeClasses(s,this.__gf(i));
this._getRoot().removeCssClass(j);
this.__fX=false;
}},__gf:function(u){var v=[f,this.__fY,u];

if(this.__ga){v.push(d);
}return v;
}},destruct:function(){this.__ge();
this.__fX=this.__fY,this.__ga=null;
this.__gb=this.__gc=null;
}});
})();
(function(){var a="qx.event.handler.Transition";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(b){qx.core.Object.call(this);
this.__gg={};
this.__gh=qx.lang.Function.listener(this._onNative,this);
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{transitionEnd:1,animationEnd:1,animationStart:1,animationIteration:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true,TYPE_TO_NATIVE:{transitionEnd:"webkitTransitionEnd",animationEnd:"webkitAnimationEnd",animationStart:"webkitAnimationStart",animationIteration:"webkitAnimationIteration"},NATIVE_TO_TYPE:{webkitTransitionEnd:"transitionEnd",webkitAnimationEnd:"animationEnd",webkitAnimationStart:"animationStart",webkitAnimationIteration:"animationIteration"}},members:{__gh:null,__gg:null,canHandleEvent:function(c,d){},registerEvent:function(e,f,g){var i=qx.core.ObjectRegistry.toHashCode(e)+f;
var h=qx.event.handler.Transition.TYPE_TO_NATIVE[f];
this.__gg[i]={target:e,type:h};
qx.bom.Event.addNativeListener(e,h,this.__gh);
},unregisterEvent:function(j,k,l){var n=this.__gg;

if(!n){return;
}var m=qx.core.ObjectRegistry.toHashCode(j)+k;

if(n[m]){delete n[m];
}qx.bom.Event.removeNativeListener(j,qx.event.handler.Transition.TYPE_TO_NATIVE[k],this.__gh);
},_onNative:qx.event.GlobalError.observeMethod(function(o){qx.event.Registration.fireEvent(o.target,qx.event.handler.Transition.NATIVE_TO_TYPE[o.type],qx.event.type.Event);
})},destruct:function(){var event;
var q=this.__gg;

for(var p in q){event=q[p];

if(event.target){qx.bom.Event.removeNativeListener(event.target,event.type,this.__gh);
}}this.__gg=this.__gh=null;
},defer:function(r){qx.event.Registration.addHandler(r);
}});
})();
(function(){var a="qx.ui.mobile.core.MLayoutHandling";
qx.Mixin.define(a,{members:{setLayout:function(b){return this._setLayout(b);
},getLayout:function(){return this._getLayout();
}},statics:{remap:function(c){c.getLayout=c._getLayout;
c.setLayout=c._setLayout;
}}});
})();
(function(){var a="qx.ui.mobile.container.Composite";
qx.Class.define(a,{extend:qx.ui.mobile.core.Widget,include:[qx.ui.mobile.core.MChildrenHandling,qx.ui.mobile.core.MLayoutHandling],construct:function(b){qx.ui.mobile.core.Widget.call(this);

if(b){this.setLayout(b);
}},defer:function(c,d){qx.ui.mobile.core.MChildrenHandling.remap(d);
qx.ui.mobile.core.MLayoutHandling.remap(d);
}});
})();
(function(){var o="qx.event.type.Event",n="resize",m="orientationchange",l="start",k="css.transform.3d",j="height",i="px",h="page",g="stop",f="resume",c="initialize",e="pause",d="back",b="qx.ui.mobile.page.Page",a="menu";
qx.Class.define(b,{extend:qx.ui.mobile.container.Composite,construct:function(p){qx.ui.mobile.container.Composite.call(this,p);

if(!p){this.setLayout(new qx.ui.mobile.layout.VBox());
}qx.ui.mobile.page.Page.getManager().add(this);
this._resize();
qx.event.Registration.addListener(window,m,this._resize,this);
qx.event.Registration.addListener(window,n,this._resize,this);
},events:{"initialize":o,"start":o,"stop":o,"pause":o,"resume":o,"back":o,"menu":o},properties:{defaultCssClass:{refine:true,init:h}},statics:{__df:null,getManager:function(){return qx.ui.mobile.page.Page.__df;
},setManager:function(q){qx.ui.mobile.page.Page.__df=q;
}},members:{__gi:false,_resize:function(){{this._setStyle(j,window.innerHeight+i);
};
},_applyId:function(r,s){qx.ui.mobile.container.Composite.prototype._applyId.call(this,r,s);

if(s!=null){qx.ui.mobile.page.Page.getManager().remove(s);
}qx.ui.mobile.page.Page.getManager().add(this);
},back:function(){this.fireEvent(d);
var t=this._back();
return t||false;
},_back:function(){},menu:function(){this.fireEvent(a);
},show:function(u){qx.ui.mobile.page.Page.getManager().show(this,u);
},initialize:function(){if(!this.isInitialized()){this._initialize();
this.__gi=true;
this.fireEvent(c);
}},_initialize:function(){},isInitialized:function(){return this.__gi;
},start:function(){this._start();
this.fireEvent(l);
},_start:function(){},stop:function(){this._stop();
this.fireEvent(g);
},_stop:function(){},pause:function(){this._pause();
this.fireEvent(e);
},_pause:function(){},resume:function(){this._resume();
this.fireEvent(f);
},_resume:function(){}},destruct:function(){qx.event.Registration.removeListener(window,m,this._resize,this);
qx.event.Registration.removeListener(window,n,this._resize,this);
this.__gi=null;

if(!qx.core.ObjectRegistry.inShutDown){if(this.getId()){qx.ui.mobile.page.Page.getManager().remove(this.getId());
}}},defer:function(v){if(qx.core.Environment.get(k)){v.setManager(new qx.ui.mobile.page.manager.Animation());
}else{v.setManager(new qx.ui.mobile.page.manager.Simple());
}}});
})();
(function(){var b="abstract",a="qx.ui.mobile.layout.Abstract";
qx.Class.define(a,{extend:qx.core.Object,type:b,members:{_widget:null,__gj:null,__gk:null,getCssClass:function(){},_getSupportedChildLayoutProperties:function(){},_setLayoutProperty:function(c,d,e){},setLayoutProperties:function(f,g){var i=this._getSupportedChildLayoutProperties();

for(var h in g){if(!i[h]){throw new Error("The layout does not support the "+h+" property");
}var j=g[h];
this._setLayoutProperty(f,h,j);
this._addChildLayoutProperty(f,h,j);
}},connectToWidget:function(k){if(this._widget){this._widget.removeCssClass(this.getCssClass());
}this._widget=k;

if(k){k.addCssClass(this.getCssClass());

if(this.__gj){for(var l in this.__gj){this.reset(l);
this.set(l,this.__gj[l]);
}}}else{this.__gj=null;
}},_addCachedProperty:function(m,n){if(!this.__gj){this.__gj={};
}this.__gj[m]=n;
},_getChildLayoutPropertyValue:function(o,p){var q=this.__gl(o);
return q[p];
},_addChildLayoutProperty:function(r,s,t){var u=this.__gl(r);

if(t==null){delete u[s];
}else{u[s]=t;
}},__gl:function(v){if(!this.__gk){this.__gk={};
}var w=this.__gk;
var x=v.toHashCode();

if(!w[x]){w[x]={};
}return w[x];
}},destruct:function(){this._widget=null;
}});
})();
(function(){var l="_applyLayoutChange",k="boxFlex",j="abstract",i="middle",h="bottom",g="center",f="Boolean",e="flex",d="top",c="left",a="right",b="qx.ui.mobile.layout.AbstractBox";
qx.Class.define(b,{extend:qx.ui.mobile.layout.Abstract,type:j,construct:function(m,n,o){qx.ui.mobile.layout.Abstract.call(this);

if(m){this.setAlignX(m);
}
if(n){this.setAlignY(n);
}
if(o){this.setReversed(o);
}},properties:{alignX:{check:[c,g,a],nullable:true,init:null,apply:l},alignY:{check:[d,i,h],nullable:true,init:null,apply:l},reversed:{check:f,nullable:true,init:null,apply:l}},statics:{PROPERTY_CSS_MAPPING:{"alignX":{"hbox":{"left":"boxPackStart","center":"boxPackCenter","right":"boxPackEnd"},"vbox":{"left":"boxAlignStart","center":"boxAlignCenter","right":"boxAlignEnd"}},"alignY":{"hbox":{"top":"boxAlignStart","middle":"boxAlignCenter","bottom":"boxAlignEnd"},"vbox":{"top":"boxPackStart","middle":"boxPackCenter","bottom":"boxPackEnd"}},"reversed":{"hbox":{"true":"boxReverse","false":null},"vbox":{"true":"boxReverse","false":null}}},SUPPORTED_CHILD_LAYOUT_PROPERTIES:{"flex":1}},members:{_getSupportedChildLayoutProperties:function(){return qx.ui.mobile.layout.AbstractBox.SUPPORTED_CHILD_LAYOUT_PROPERTIES;
},_setLayoutProperty:function(p,q,r){if(q==e){var s=this._getChildLayoutPropertyValue(p,q);

if(s!=null){p.removeCssClass(k+r);
}p.addCssClass(k+r);
}},connectToWidget:function(t){if(this._widget){this.resetAlignX();
this.resetAlignY();
this.resetReversed();
}qx.ui.mobile.layout.Abstract.prototype.connectToWidget.call(this,t);
},_applyLayoutChange:function(u,v,w){if(this._widget){var A=this.getCssClass();
var y=qx.ui.mobile.layout.AbstractBox.PROPERTY_CSS_MAPPING[w][A];

if(v){var z=y[v];

if(z){this._widget.removeCssClass(z);
}}
if(u){var x=y[u];

if(x){this._widget.addCssClass(x);
}}}else{if(u){this._addCachedProperty(w,u);
}}}}});
})();
(function(){var b="vbox",a="qx.ui.mobile.layout.VBox";
qx.Class.define(a,{extend:qx.ui.mobile.layout.AbstractBox,members:{getCssClass:function(){return b;
}}});
})();
(function(){var n="String",m="",l="Boolean",k="tap",j="_applyShowButton",i="_applyShowBackButton",h="action",g="content",f="_applyBackButtonText",e="qx.event.type.Event",b="_applyContentCssClass",d="_applyButtonText",c="qx.ui.mobile.page.NavigationPage",a="_applyTitle";
qx.Class.define(c,{extend:qx.ui.mobile.page.Page,events:{action:e},properties:{title:{check:n,init:m,nullable:true,apply:a},backButtonText:{check:n,init:m,apply:f},buttonText:{check:n,init:m,apply:d},showBackButton:{check:l,init:false,apply:i},showButton:{check:l,init:false,apply:j},contentCssClass:{check:n,init:g,nullable:true,apply:b}},members:{__gm:null,__gn:null,__go:null,__gp:null,__gq:null,__gr:null,getContent:function(){return this.__gq;
},_getTitle:function(){return this.__gn;
},_getNavigationBar:function(){return this.__gm;
},_getBackButton:function(){return this.__go;
},_getButton:function(){return this.__gp;
},_getScrollContainer:function(){return this.__gr;
},_applyTitle:function(o,p){if(this.__gn){this.__gn.setValue(o);
}},_applyBackButtonText:function(q,r){if(this.__go){this.__go.setValue(q);
}},_applyButtonText:function(s,t){if(this.__gp){this.__gp.setValue(s);
}},_applyShowBackButton:function(u,v){this._showBackButton();
},_applyShowButton:function(w,x){this._showButton();
},_applyContentCssClass:function(y,z){if(this.__gq){this.__gq.setDefaultCssClass(y);
}},_showBackButton:function(){if(this.__go){if(this.getShowBackButton()){this.__go.show();
}else{this.__go.hide();
}}},_showButton:function(){if(this.__gp){if(this.getShowButton()){this.__gp.show();
}else{this.__gp.hide();
}}},_initialize:function(){qx.ui.mobile.page.Page.prototype._initialize.call(this);
this.__gm=this._createNavigationBar();

if(this.__gm){this.add(this.__gm);
}this.__gr=this._createScrollContainer();
this.__gq=this._createContent();

if(this.__gq){this.__gr._setLayout(new qx.ui.mobile.layout.VBox());
this.__gr.add(this.__gq,{flex:1});
}
if(this.__gr){this.add(this.__gr,{flex:1});
}},_createScrollContainer:function(){return new qx.ui.mobile.container.Scroll();
},_createContent:function(){var content=new qx.ui.mobile.container.Composite();
content.setDefaultCssClass(this.getContentCssClass());
return content;
},_createNavigationBar:function(){var A=new qx.ui.mobile.navigationbar.NavigationBar();
this.__go=this._createBackButton();

if(this.__go){this.__go.addListener(k,this._onBackButtonTap,this);
this.__go.setValue(this.getBackButtonText());
this._showBackButton();
A.add(this.__go);
}this.__gn=this._createTitle();

if(this.__gn){A.add(this.__gn,{flex:1});
}this.__gp=this._createButton();

if(this.__gp){this.__gp.addListener(k,this._onButtonTap,this);
this.__gp.setValue(this.getButtonText());
this._showButton();
A.add(this.__gp);
}return A;
},_createTitle:function(){return new qx.ui.mobile.navigationbar.Title(this.getTitle());
},_createBackButton:function(){return new qx.ui.mobile.navigationbar.BackButton();
},_createButton:function(){return new qx.ui.mobile.navigationbar.Button();
},_onBackButtonTap:function(B){this.back();
},_onButtonTap:function(C){this.fireEvent(h);
}},destruct:function(){this.__gm=this.__gn=this.__go=this.__gp=this.__gq=this.__gr=null;
}});
})();
(function(){var n="resize",m="orientationchange",l="domupdated",k='TEXTAREA',j="qx/mobile/js/iscroll.min.js",i='INPUT',h="iscroll",g="scrollbar",f='SELECT',d="div",a="qx.ui.mobile.container.MIScroll",c="success",b='iscrollstart';
qx.Mixin.define(a,{construct:function(){this.__gt();
this.__fQ();
},members:{__gs:null,_createScrollElement:function(){var scroll=qx.bom.Element.create(d);
qx.bom.element.Class.add(scroll,h);
return scroll;
},_getScrollContentElement:function(){return this.getContainerElement().childNodes[0];
},__gt:function(){if(!window.iScroll){{var p=j;
};
var o=qx.util.ResourceManager.getInstance().toUri(p);
var q=new qx.io.ScriptLoader();
q.load(o,this.__gw,this);
}else{this._setScroll(this.__gu());
}},__gu:function(){var scroll=new iScroll(this.getContainerElement(),{hideScrollbar:true,fadeScrollbar:true,hScrollbar:false,scrollbarClass:g,onBeforeScrollStart:function(e){var s=e.target;

while(s.nodeType!=1){s=s.parentNode;
}
if(s.tagName!=f&&s.tagName!=i&&s.tagName!=k){e.preventDefault();
}{var r=new qx.event.message.Message(b);
qx.event.message.Bus.getInstance().dispatch(r);
};
}});
return scroll;
},__fQ:function(){qx.event.Registration.addListener(window,m,this._refresh,this);
qx.event.Registration.addListener(window,n,this._refresh,this);
this.addListener(l,this._refresh,this);
},__gv:function(){qx.event.Registration.removeListener(window,m,this._refresh,this);
qx.event.Registration.removeListener(window,n,this._refresh,this);
this.removeListener(l,this._refresh,this);
},__gw:function(status){if(status==c){this._setScroll(this.__gu());
}else{}},_setScroll:function(scroll){this.__gs=scroll;
},_refresh:function(){if(this.__gs){this.__gs.refresh();
}}},destruct:function(){this.__gv();
if(this.__gs){this.__gs.destroy();
}this.__gs;
}});
})();
(function(){var l="",k="string",j="data",i="io.ssl",h="type",g="data:image/",f=";",e="/",d="encoding",c="qx.util.ResourceManager",a="singleton",b=",";
qx.Class.define(c,{extend:qx.core.Object,type:a,construct:function(){qx.core.Object.call(this);
},statics:{__j:qx.$$resources||{},__gx:{}},members:{has:function(m){return !!this.self(arguments).__j[m];
},getData:function(n){return this.self(arguments).__j[n]||null;
},getImageWidth:function(o){var p=this.self(arguments).__j[o];
return p?p[0]:null;
},getImageHeight:function(q){var r=this.self(arguments).__j[q];
return r?r[1]:null;
},getImageFormat:function(s){var t=this.self(arguments).__j[s];
return t?t[2]:null;
},getCombinedFormat:function(u){var x=l;
var w=this.self(arguments).__j[u];
var v=w&&w.length>4&&typeof (w[4])==k&&this.constructor.__j[w[4]];

if(v){var z=w[4];
var y=this.constructor.__j[z];
x=y[2];
}return x;
},toUri:function(A){if(A==null){return A;
}var B=this.self(arguments).__j[A];

if(!B){return A;
}
if(typeof B===k){var D=B;
}else{var D=B[3];
if(!D){return A;
}}var C=l;

if((false)&&qx.core.Environment.get(i)){C=this.self(arguments).__gx[D];
}return C+qx.$$libraries[D].resourceUri+e+A;
},toDataUri:function(E){var G=this.constructor.__j[E];
var H=this.constructor.__j[G[4]];
var I;

if(H){var F=H[4][E];
I=g+F[h]+f+F[d]+b+F[j];
}else{I=this.toUri(E);
}return I;
}},defer:function(J){var N,L,K,O,M;
}});
})();
(function(){var n="xhr",m="Microsoft.XMLHTTP",l="io.ssl",k="io.xhr",j="",i="file:",h="https:",g="webkit",f="gecko",e="activex",b="opera",d=".",c="io.maxrequests",a="qx.bom.client.Transport";
qx.Bootstrap.define(a,{statics:{getMaxConcurrentRequestCount:function(){var o;
var r=qx.bom.client.Engine.getVersion().split(d);
var p=0;
var s=0;
var q=0;
if(r[0]){p=r[0];
}if(r[1]){s=r[1];
}if(r[2]){q=r[2];
}if(window.maxConnectionsPerServer){o=window.maxConnectionsPerServer;
}else if(qx.bom.client.Engine.getName()==b){o=8;
}else if(qx.bom.client.Engine.getName()==g){o=4;
}else if(qx.bom.client.Engine.getName()==f&&((p>1)||((p==1)&&(s>9))||((p==1)&&(s==9)&&(q>=1)))){o=6;
}else{o=2;
}return o;
},getSsl:function(){return window.location.protocol===h;
},getXmlHttpRequest:function(){var t=window.ActiveXObject?(function(){if(window.location.protocol!==i){try{new window.XMLHttpRequest();
return n;
}catch(u){}}
try{new window.ActiveXObject(m);
return e;
}catch(v){}})():(function(){try{new window.XMLHttpRequest();
return n;
}catch(w){}})();
return t||j;
}},defer:function(x){qx.core.Environment.add(c,x.getMaxConcurrentRequestCount);
qx.core.Environment.add(l,x.getSsl);
qx.core.Environment.add(k,x.getXmlHttpRequest);
}});
})();
(function(){var p="success",o="fail",n="mshtml",m="complete",l="error",k="load",j="opera",i="loaded",h="readystatechange",g="head",c="webkit",f="script",d="qx.io.ScriptLoader",b="text/javascript",a="abort";
qx.Bootstrap.define(d,{construct:function(){this.__gy=qx.Bootstrap.bind(this.__gC,this);
this.__gz=document.createElement(f);
},statics:{TIMEOUT:15},members:{__gA:null,__gB:null,__by:null,__bz:null,__gy:null,__gz:null,load:function(q,r,s){if(this.__gA){throw new Error("Another request is still running!");
}this.__gA=true;
this.__gB=false;
var t=document.getElementsByTagName(g)[0];
var u=this.__gz;
this.__by=r||null;
this.__bz=s||window;
u.type=b;
u.onerror=u.onload=u.onreadystatechange=this.__gy;
var self=this;
if(qx.bom.client.Engine.getName()===j&&this._getTimeout()>0){setTimeout(function(){self.dispose(o);
},this._getTimeout()*1000);
}u.src=q;
setTimeout(function(){t.appendChild(u);
},0);
},abort:function(){if(this.__gA){this.dispose(a);
}},dispose:function(status){if(this.__gB){return;
}this.__gB=true;
var x=this.__gz;
x.onerror=x.onload=x.onreadystatechange=null;
var w=x.parentNode;

if(w){w.removeChild(x);
}delete this.__gA;
if(this.__by){var v=qx.bom.client.Engine.getName();

if(v==n||v==c){var self=this;
setTimeout(qx.event.GlobalError.observeMethod(function(){self.__by.call(self.__bz,status);
delete self.__by;
}),0);
}else{this.__by.call(this.__bz,status);
delete this.__by;
}}},_getTimeout:function(){return qx.io.ScriptLoader.TIMEOUT;
},__gC:qx.event.GlobalError.observeMethod(function(e){var y=qx.bom.client.Engine.getName();
if(y==n){var z=this.__gz.readyState;

if(z==i){this.dispose(p);
}else if(z==m){this.dispose(p);
}else{return;
}}else if(y==j){if(qx.Bootstrap.isString(e)||e.type===l){return this.dispose(o);
}else if(e.type===k){return this.dispose(p);
}else{return;
}}else{if(qx.Bootstrap.isString(e)||e.type===l){this.dispose(o);
}else if(e.type===k){this.dispose(p);
}else if(e.type===h&&(e.target.readyState===m||e.target.readyState===i)){this.dispose(p);
}else{return;
}}})}});
})();
(function(){var c="Object",b="qx.event.message.Message",a="String";
qx.Class.define(b,{extend:qx.core.Object,construct:function(name,d){qx.core.Object.call(this);

if(name!=null){this.setName(name);
}
if(d!=null){this.setData(d);
}},properties:{name:{check:a},data:{init:null,nullable:true},sender:{check:c}}});
})();
(function(){var d="function",c="qx.event.message.Bus",b="*",a="singleton";
qx.Class.define(c,{type:a,extend:qx.core.Object,statics:{getSubscriptions:function(){return this.getInstance().getSubscriptions();
},subscribe:function(e,f,g){return this.getInstance().subscribe(e,f,g);
},checkSubscription:function(h,j,k){return this.getInstance().checkSubscription(h,j,k);
},unsubscribe:function(l,m,n){return this.getInstance().unsubscribe(l,m,n);
},dispatch:function(o){return this.getInstance().dispatch.apply(this.getInstance(),arguments);
},dispatchByName:function(name,p){return this.getInstance().dispatchByName.apply(this.getInstance(),arguments);
}},construct:function(){this.__gD={};
},members:{__gD:null,getSubscriptions:function(){return this.__gD;
},subscribe:function(q,r,s){if(!q||typeof r!=d){this.error("Invalid parameters! "+[q,r,s]);
return false;
}var t=this.getSubscriptions();

if(this.checkSubscription(q)){if(this.checkSubscription(q,r,s)){this.warn("Object method already subscribed to "+q);
return false;
}t[q].push({subscriber:r,context:s||null});
return true;
}else{t[q]=[{subscriber:r,context:s||null}];
return true;
}},checkSubscription:function(u,v,w){var x=this.getSubscriptions();

if(!x[u]||x[u].length===0){return false;
}
if(v){for(var i=0;i<x[u].length;i++){if(x[u][i].subscriber===v&&x[u][i].context===(w||null)){return true;
}}return false;
}return true;
},unsubscribe:function(y,z,A){var C=this.getSubscriptions();
var B=C[y];

if(B){if(!z){C[y]=null;
delete C[y];
return true;
}else{if(!A){A=null;
}var i=B.length;
var D;

do{D=B[--i];

if(D.subscriber===z&&D.context===A){B.splice(i,1);

if(B.length===0){C[y]=null;
delete C[y];
}return true;
}}while(i);
}}return false;
},dispatch:function(E){var H=this.getSubscriptions();
var F=E.getName();
var G=false;

for(var I in H){var J=I.indexOf(b);

if(J>-1){if(J===0||I.substr(0,J)===F.substr(0,J)){this.__gE(H[I],E);
G=true;
}}else{if(I===F){this.__gE(H[F],E);
G=true;
}}}return G;
},dispatchByName:function(name,K){var L=new qx.event.message.Message(name,K);
return this.dispatch(L);
},__gE:function(M,N){for(var i=0;i<M.length;i++){var O=M[i].subscriber;
var P=M[i].context;
if(P&&P.isDisposed){if(P.isDisposed()){M.splice(i,1);
i--;
}else{O.call(P,N);
}}else{O.call(P,N);
}}}}});
})();
(function(){var b="qx.ui.mobile.container.Scroll",a="scroll";
qx.Class.define(b,{extend:qx.ui.mobile.core.Widget,include:[qx.ui.mobile.core.MChildrenHandling],properties:{defaultCssClass:{refine:true,init:a}},members:{_createContainerElement:function(){var d=qx.ui.mobile.core.Widget.prototype._createContainerElement.call(this);
var c=this._createScrollElement();

if(c){d.appendChild(c);
}return d;
},_getContentElement:function(){var e=qx.ui.mobile.core.Widget.prototype._getContentElement.call(this);
var f=this._getScrollContentElement();
return f||e;
}},defer:function(g){{qx.Class.include(g,qx.ui.mobile.container.MIScroll);
};
}});
})();
(function(){var c="middle",b="navigationbar",a="qx.ui.mobile.navigationbar.NavigationBar";
qx.Class.define(a,{extend:qx.ui.mobile.container.Composite,construct:function(d){qx.ui.mobile.container.Composite.call(this,d);

if(!d){this.setLayout(new qx.ui.mobile.layout.HBox().set({alignY:c}));
}},properties:{defaultCssClass:{refine:true,init:b}}});
})();
(function(){var b="qx.ui.mobile.layout.HBox",a="hbox";
qx.Class.define(b,{extend:qx.ui.mobile.layout.AbstractBox,members:{getCssClass:function(){return a;
}}});
})();
(function(){var g="no-wrap",f="Boolean",e="label",d="_applyValue",c="qx.ui.mobile.basic.Label",b="_applyWrap",a="changeValue";
qx.Class.define(c,{extend:qx.ui.mobile.core.Widget,construct:function(h){qx.ui.mobile.core.Widget.call(this);

if(h){this.setValue(h);
}this.initWrap();
},properties:{defaultCssClass:{refine:true,init:e},value:{nullable:true,init:null,apply:d,event:a},anonymous:{refine:true,init:true},wrap:{check:f,init:true,apply:b}},members:{_applyValue:function(i,j){this._setHtml(i);
},_applyWrap:function(k,l){if(k){this.removeCssClass(g);
}else{this.addCssClass(g);
}}}});
})();
(function(){var b="qx.ui.mobile.navigationbar.Title",a="h1";
qx.Class.define(b,{extend:qx.ui.mobile.basic.Label,properties:{wrap:{refine:true,init:false}},members:{_getTagName:function(){return a;
}}});
})();
(function(){var j="top",i="left",h="bottom",g='display',f='inline',e="both",d='left',c='label',b='icon',a='bottom',J="middle",I="String",H='top',G='margin-',F="Boolean",E='px',D="_applyCenter",C="changeIcon",B="changeLabel",A="_applyIconPosition",q="Integer",r='verticalAlign',o="center",p='both',m="icon",n="right",k="qx.ui.mobile.basic.Atom",l="_applyIcon",s='middle',t="label",v="_applyShow",u=" ",x='right',w="_applyLabel",z="_applyGap",y="atom";
qx.Class.define(k,{extend:qx.ui.mobile.core.Widget,construct:function(K,L){qx.ui.mobile.core.Widget.call(this);
this.__gK(K,L);
this.initGap();
},properties:{defaultCssClass:{refine:true,init:y},label:{apply:w,nullable:true,check:I,event:B},icon:{check:I,apply:l,nullable:true,event:C},gap:{check:q,nullable:false,apply:z,init:4},show:{init:e,check:[e,t,m],inheritable:true,apply:v},iconPosition:{init:i,check:[j,n,h,i],apply:A},center:{init:true,check:F,apply:D}},members:{__gF:null,__gG:null,__gH:null,__gI:null,_applyIconPosition:function(M,N){var O;
var R=[j,h].indexOf(M)!=-1;
var T=[j,h].indexOf(N)!=-1;

if(R&&!T){O=new qx.ui.mobile.layout.VBox();
this.__gF._setStyle(g,null);
}
if(!R&&T){O=new qx.ui.mobile.layout.HBox();
this.__gF._setStyle(g,f);
}
if(O){this.__gH.setLayout(O);
}var Q=[j,i].indexOf(M)!=-1;
var P=[j,i].indexOf(N)!=-1;

if(Q!=P){if(Q){this.__gH.remove(this.__gF);
this.__gH._addAfter(this.__gF,this.__gG);
}else{this.__gH.remove(this.__gG);
this.__gH._addAfter(this.__gG,this.__gF);
}var S=this.__gJ(N);
this.__gG._setStyle(G+S,null);
this._applyGap(this.getGap());
this._domUpdated();
}},_applyShow:function(U,V){if(U===p){if(this.__gF){this.__gF.show();
}
if(this.__gG){this.__gG.show();
}}
if(U===b){if(this.__gF){this.__gF.exclude();
}
if(this.__gG){this.__gG.show();
}}
if(U===c){if(this.__gG){this.__gG.exclude();
}
if(this.__gF){this.__gF.show();
}}},_applyGap:function(W,X){if(this.__gG){var Y=this.__gJ(this.getIconPosition());
this.__gG._setStyle(G+Y,W+E);
}},__gJ:function(ba){var bb=d;

switch(ba){case H:bb=a;
break;
case a:bb=H;
break;
case d:bb=x;
break;
}return bb;
},_applyLabel:function(bc,bd){if(this.__gF){this.__gF.setValue(bc);
}else{this.__gF=this._createLabelWidget(bc);

if(this.__gG){var be=[j,i].indexOf(this.getIconPosition())!=-1;

if(be){this.__gH._addAfter(this.__gF,this.__gG);
}else{this.__gH._addBefore(this.__gF,this.__gG);
}}
if(this.__gI){this.__gH._addAfter(this.__gF,this.__gI);
this.__gI.destroy();
this.__gI=null;
}}},_applyIcon:function(bf,bg){if(this.__gG){this.__gG.setSource(bf);
}else{this.__gG=this._createIconWidget(bf);
var bh=[j,i].indexOf(this.getIconPosition())!=-1;

if(bh){this.__gH._addBefore(this.__gG,this.__gF);
}else{this.__gH._addAfter(this.__gG,this.__gF);
}}},getIconWidget:function(){return this.__gG;
},getLabelWidget:function(){return this.__gF;
},_createIconWidget:function(bi){var bj=new qx.ui.mobile.basic.Image(bi);
bj.setAnonymous(true);
bj._setStyle(r,s);
return bj;
},_createLabelWidget:function(bk){var bm=new qx.ui.mobile.basic.Label(bk);
bm.setAnonymous(true);
bm.setWrap(false);
var bl=[j,h].indexOf(this.getIconPosition())!=-1;

if(!bl){bm._setStyle(g,f);
}return bm;
},__gK:function(bn,bo){if(bn){this.__gF=this._createLabelWidget(bn);
this.setLabel(bn);
}
if(bo){this.__gG=this._createIconWidget(bo);
this.setIcon(bo);
}var bp=[j,h].indexOf(this.getIconPosition())!=-1;
var bq=bp?new qx.ui.mobile.layout.VBox():new qx.ui.mobile.layout.HBox();

if(this.getCenter()){if(bp){bq.set({alignY:J});
}else{bq.set({alignX:o});
}}this.__gH=new qx.ui.mobile.container.Composite(bq);
this.__gH.setAnonymous(true);
var bs=[j,i].indexOf(this.getIconPosition())!=-1;

if(this.__gG&&this.__gF){this.__gH.add(bs?this.__gG:this.__gF,{flex:1});
this.__gH.add(!bs?this.__gG:this.__gF,{flex:1});
}else{if(this.__gG){this.__gH.add(this.__gG,{flex:1});
}
if(this.__gF){this.__gH.add(this.__gF,{flex:1});
}else{if(!this.__gG){this.__gI=new qx.ui.mobile.basic.Label(u);
this.__gH.add(this.__gI);
}}}
if(this.getShow()===b&&this.__gF){this.__gF.exclude();
}
if(this.getShow()===c&&this.__gG){this.__gG.exclude();
}var br=new qx.ui.mobile.container.Composite(new qx.ui.mobile.layout.VBox().set({alignY:J}));
br.setAnonymous(true);
br.add(this.__gH,{'flex':0});
this._add(br);
}},destruct:function(){if(this.__gF){this.__gF.dispose();
}
if(this.__gI){this.__gI.dispose();
}
if(this.__gG){this.__gG.dispose();
}
if(this.__gH){this.__gH.dispose();
}this.__gF=this.__gG=this.__gH=this.__gI=null;
}});
})();
(function(){var i="qx.event.type.Event",h="src",g="_applySource",f='data:',e="loaded",d="img",c="loadingFailed",b="qx.ui.mobile.basic.Image",a="String";
qx.Class.define(b,{extend:qx.ui.mobile.core.Widget,construct:function(j){qx.ui.mobile.core.Widget.call(this);

if(j){this.setSource(j);
}else{this.initSource();
}},events:{loadingFailed:i,loaded:i},properties:{source:{check:a,nullable:true,init:null,apply:g}},members:{_getTagName:function(){return d;
},_applySource:function(k,l){var m=k;

if(m&&m.indexOf(f)!=0){m=qx.util.ResourceManager.getInstance().toUri(m);
var n=qx.io.ImageLoader;

if(!n.isFailed(m)&&!n.isLoaded(m)){n.load(m,this.__gL,this);
}}this._setSource(m);
},__gL:function(o,p){if(this.$$disposed===true){return;
}if(p.failed){this.warn("Image could not be loaded: "+o);
this.fireEvent(c);
}else if(p.aborted){return ;
}else{this.fireEvent(e);
}this._domUpdated();
},_setSource:function(q){this._setAttribute(h,q);
}}});
})();
(function(){var c="html.image.naturaldimensions",b="load",a="qx.io.ImageLoader";
qx.Bootstrap.define(a,{statics:{__cP:{},__gM:{width:null,height:null},__gN:/\.(png|gif|jpg|jpeg|bmp)\b/i,isLoaded:function(d){var e=this.__cP[d];
return !!(e&&e.loaded);
},isFailed:function(f){var g=this.__cP[f];
return !!(g&&g.failed);
},isLoading:function(h){var j=this.__cP[h];
return !!(j&&j.loading);
},getFormat:function(k){var m=this.__cP[k];
return m?m.format:null;
},getSize:function(n){var o=this.__cP[n];
return o?{width:o.width,height:o.height}:this.__gM;
},getWidth:function(p){var q=this.__cP[p];
return q?q.width:null;
},getHeight:function(r){var s=this.__cP[r];
return s?s.height:null;
},load:function(t,u,v){var w=this.__cP[t];

if(!w){w=this.__cP[t]={};
}if(u&&!v){v=window;
}if(w.loaded||w.loading||w.failed){if(u){if(w.loading){w.callbacks.push(u,v);
}else{u.call(v,t,w);
}}}else{w.loading=true;
w.callbacks=[];

if(u){w.callbacks.push(u,v);
}var y=new Image();
var x=qx.lang.Function.listener(this.__gO,this,y,t);
y.onload=x;
y.onerror=x;
y.src=t;
w.element=y;
}},abort:function(z){var A=this.__cP[z];

if(A&&!A.loaded){A.aborted=true;
var C=A.callbacks;
var B=A.element;
B.onload=B.onerror=null;
delete A.callbacks;
delete A.element;
delete A.loading;

for(var i=0,l=C.length;i<l;i+=2){C[i].call(C[i+1],z,A);
}}this.__cP[z]=null;
},__gO:qx.event.GlobalError.observeMethod(function(event,D,E){var F=this.__cP[E];
if(event.type===b){F.loaded=true;
F.width=this.__gP(D);
F.height=this.__gQ(D);
var G=this.__gN.exec(E);

if(G!=null){F.format=G[1];
}}else{F.failed=true;
}D.onload=D.onerror=null;
var H=F.callbacks;
delete F.loading;
delete F.callbacks;
delete F.element;
for(var i=0,l=H.length;i<l;i+=2){H[i].call(H[i+1],E,F);
}}),__gP:function(I){return qx.core.Environment.get(c)?I.naturalWidth:I.width;
},__gQ:function(J){return qx.core.Environment.get(c)?J.naturalHeight:J.height;
}}});
})();
(function(){var b="qx.ui.mobile.form.Button",a="button";
qx.Class.define(b,{extend:qx.ui.mobile.basic.Atom,properties:{defaultCssClass:{refine:true,init:a},activatable:{refine:true,init:true}},members:{setValue:function(c){this.setLabel(c);
},getValue:function(){return this.getLabel();
}}});
})();
(function(){var b="qx.ui.mobile.navigationbar.Button",a="navigationbar-button";
qx.Class.define(b,{extend:qx.ui.mobile.form.Button,properties:{defaultCssClass:{refine:true,init:a}}});
})();
(function(){var b="qx.ui.mobile.navigationbar.BackButton",a="navigationbar-backbutton";
qx.Class.define(b,{extend:qx.ui.mobile.navigationbar.Button,properties:{defaultCssClass:{refine:true,init:a}}});
})();
(function(){var j="eventNavigationButtonClicked",i="tap",h="Share",g="Map",f="Settings",e="iArtNorfolk",d="iartnorfolk.page.iArtShell",c="Find Me",b="FindMe",a="qx.event.type.Data";
qx.Class.define(d,{extend:qx.ui.mobile.page.NavigationPage,construct:function(){qx.ui.mobile.page.NavigationPage.call(this);
},members:{_initialize:function(){qx.ui.mobile.page.NavigationPage.prototype._initialize.call(this);
this.remove(this._getNavigationBar());
var k=this.__gR=new qx.ui.mobile.navigationbar.NavigationBar();
this.getContent().add(this.__gR);
var l=this.__gS=new qx.ui.mobile.navigationbar.Button(g);
this.__gT=g;
l.addListener(i,function(){this.fireDataEvent(j,{from:this,button:this.__gT});
},this);
k.add(l,{flex:0});
var l=this.__gU=new qx.ui.mobile.navigationbar.Button(h);
this.__gV=h;
l.addListener(i,function(){this.fireDataEvent(j,{from:this,button:this.__gV});
},this);
k.add(l,{flex:0});
var m=this.__gW=new qx.ui.mobile.navigationbar.Title(e);
k.add(m,{flex:1});
var l=this.__gX=new qx.ui.mobile.navigationbar.Button(c);
this.__gY=b;
l.addListener(i,function(){this.fireDataEvent(j,{from:this,button:this.__gY});
},this);
k.add(l,{flex:0});
var l=this.__ha=new qx.ui.mobile.navigationbar.Button(f);
this.__hb=f;
l.addListener(i,function(){this.fireDataEvent(j,{from:this,button:this.__hb});
},this);
k.add(l,{flex:0});
}},events:{"eventNavigationButtonClicked":a}});
})();
(function(){var n="setCenter",m="all",l="&nbsp;&nbsp;",k="button",j="myDetailThumbButton",h="px",g="",e="simplified",d="labels",c="road",P="List",O="geometry",N="tap",M='<div class="info-background"><center>',L='resource/location-icon-pin-32.png',K="iartnorfolk.page.Map",J="http://iartnorfolk.com/data.php?detail=",I='',H="view",G='" /><br style="clear:both" />',u="road.local",v='</center></div>',s='</strong><br />',t="fade",q='resource/map-stake.png',r="#0000ff",o='json',p='We couldn\'t locate your position.',w="click",x='<img class="thumbnail" src="',A='Map',z='server-side failure with status code ',C="http://iartnorfolk.com/data.php",B="<br>",E='<strong>',D="close",y="on",F='dragend';
qx.Class.define(K,{extend:iartnorfolk.page.iArtShell,construct:function(){iartnorfolk.page.iArtShell.call(this);
},members:{_muralIcon:q,_locationIcon:L,_dataLoadUrl:C,_detailDataLoadUrl:J,_map:null,_mapTypeName:A,_mapTypeDef:[{featureType:c,elementType:m,stylers:[{saturation:-99},{hue:r}]},{featureType:m,elementType:d,stylers:[{visibility:e}]},{featureType:c,elementType:O,stylers:[{visibility:e}]},{featureType:u,elementType:d,stylers:[{visibility:y}]},{featureType:m,elementType:O,stylers:[{saturation:-20}]}],_mapOptions:{zoom:16,center:new google.maps.LatLng(36.84765224454971,-76.2922677397728),mapTypeId:this._mapTypeName,mapTypeControlOptions:{mapTypeIds:[this._mapTypeName,google.maps.MapTypeId.SATELLITE,google.maps.MapTypeId.HYBRID]}},_markers:[],_lastSearchLatLng:undefined,_myLocationLatLng:undefined,_myLocationMarker:undefined,_directionsService:new google.maps.DirectionsService(),_murals:[],_initialize:function(){iartnorfolk.page.iArtShell.prototype._initialize.call(this);
document._mapPage=this;
var S=new qx.ui.mobile.container.Composite();
S.setLayout(new qx.ui.mobile.layout.VBox());
S.addCssClass(n);
document.detailThumbHtmlBlob=new qx.ui.mobile.embed.Html();
document.detailThumbHtmlBlob.addCssClass(n);
var R=new qx.ui.mobile.container.Composite();
R.setLayout(new qx.ui.mobile.layout.HBox());
S.add(document.detailThumbHtmlBlob);
var T=new qx.ui.mobile.form.Button(H);
T.removeCssClass(k);
T.addCssClass(j);
T.addListener(N,function(){document.detailPopup.hide();
document.__fL=document.mapPage;
document.detailPage.show({animation:t});
document.detailPage._refreshDetail(document.theDetailId);
});
T.addCssClass(n);
var U=new qx.ui.mobile.form.Button(D);
U.removeCssClass(k);
U.addCssClass(j);
U.addListener(N,function(){document.detailPopup.hide();
});
U.addCssClass(n);
S.add(new qx.ui.mobile.embed.Html(B));
R.add(new qx.ui.mobile.embed.Html(l),{flex:1});
R.add(T,{flex:0});
R.add(new qx.ui.mobile.embed.Html(l),{flex:1});
R.add(U,{flex:0});
R.add(new qx.ui.mobile.embed.Html(l),{flex:1});
R.addCssClass(n);
S.add(R);
document.detailPopup=new qx.ui.mobile.dialog.Popup(S);
this.__mainButton.setValue(P);
this.__gT=P;
var Q=this.__hc=new qx.ui.mobile.page.NavigationPage();
this.getContent().add(Q);
Q.getContainerElement().style.height=((Q.getContainerElement().style.height+g).replace(h,g)-75)+h;
this._alreadyInitedPins=false;
this._initMap();
this._findMe();

if(!this._alreadyInitedPins){this._refresh(this._myLocationLatLng);
}},_clearMarkers:function(){var V=this._markers.length;

for(var i=0;i<V;i++){this._markers[i].setMap(null);
}this._markers=[];
},_calcDistance:function(W){var X={origin:this._myLocationLatLng,destination:new google.maps.LatLng(W.geometry.coordinates[1],W.geometry.coordinates[0]),travelMode:google.maps.DirectionsTravelMode.WALKING};
this._directionsService.route(X,function(Y,status){if(status==google.maps.DirectionsStatus.OK){alert('You are '+Y.routes[0].legs[0].distance.text+' away.');
}});
},_addMarker:function(ba){var bc=new google.maps.LatLng(ba.geometry.coordinates[1],ba.geometry.coordinates[0]);
var bb=new google.maps.Marker({map:this._map,position:bc,icon:this._muralIcon});
this._markers.push(bb);
google.maps.event.addListener(bb,w,function(){var bd=I;
bd+=M;
bd+=E+ba.properties.title+s;
bd+=x+ba.properties.imgs[0]+G;
bd+=v;
document.detailThumbHtmlBlob.setHtml(bd);
document.theDetailId=ba.properties._id;
document.detailPopup.show();
});
},_refresh:function(be){var f=0.015;
be=be||this._lastSearchLatLng||this._map.getCenter();
var bg={'minx':(be.lng()-f),'miny':(be.lat()-f),'maxx':(be.lng()+f),'maxy':(be.lat()+f)};
this._lastSearchLatLng=be;
var bf=undefined;
$.ajax({url:this._dataLoadUrl,crossDomain:true,dataType:o,async:false,success:function(bi,bj,bk){bf=bi;
},error:function(bl,status,bm){console.log(z+status);
}});

if(bf!=undefined){document.murals=bf.features;
$.each(document.murals,function(i,bn){document.mapMuralProperties(bn.properties);
});
function bh(a,b){return a.properties.distance-b.properties.distance;
}document.murals.sort(bh);
document.murals=document.murals.slice(0,50);
this._refreshMarkers();
}},_refreshMarkers:function(){this._clearMarkers();
var bo=document.murals.length;

for(var i=0;i<bo;i++){var bp=document.murals[i];

if(bp&&bp.geometry){this._addMarker(bp);
}}},_findMe:function(){if(navigator.geolocation){navigator.geolocation.getCurrentPosition(function(bq){var br=new google.maps.LatLng(bq.coords.latitude,bq.coords.longitude);
if(this._myLocationMarker){this._myLocationMarker.setMap(null);
}this._myLocationLatLng=br;
this._myLocationMarker=new google.maps.Marker({map:this._map,position:this._myLocationLatLng,icon:this._locationIcon});
this._map.setCenter(this._myLocationLatLng);
this._refresh(this._myLocationLatLng);
this._alreadyInitedPins=true;
},function(bs){console.log(p);
},{enableHighAccuracy:true,maximumAge:90000});
}},_initMap:function(){this._map=new google.maps.Map(this.__hc.getContentElement(),this._mapOptions);
var bt=new google.maps.StyledMapType(this._mapTypeDef,{name:this._mapTypeName});
this._map.mapTypes.set(this._mapTypeName,bt);
this._map.setMapTypeId(this._mapTypeName);
google.maps.event.addListener(this._map,F,function(){this._refresh(this._map.getCenter());
});
}}});
})();
(function(){var d="qx.ui.mobile.embed.Html",c="changeHtml",b="String",a="_applyHtml";
qx.Class.define(d,{extend:qx.ui.mobile.core.Widget,construct:function(e){qx.ui.mobile.core.Widget.call(this);

if(e){this.setHtml(e);
}},properties:{html:{check:b,init:null,nullable:true,event:c,apply:a}},members:{_applyHtml:function(f,g){this._setHtml(f);
}}});
})();
(function(){var j='px',i='padding-bottom',h='popupAnchorPointerTop',g='dialogTitleUnderline',f='margin-top',e="px",d='popupAnchorPointerRight',c="String",b="resize",a='popupAnchorPointerBottom',A='border-top-width',z='popupAnchorPointerLeft',y='margin-left',w='-',v='margin-bottom',u="changeIcon",t='padding-right',s='popupAnchorPointer',r="qx.ui.mobile.dialog.Popup",q="middle",o='border-bottom-width',p="changeTitle",m="popup",n="_applyIcon",k="_applyTitle",l='border-right-width';
qx.Class.define(r,{extend:qx.ui.mobile.core.Widget,construct:function(B,C){qx.ui.mobile.core.Widget.call(this);
this.exclude();
qx.core.Init.getApplication().getRoot().add(this);

if(C){this.__hd=C;
}
if(B){this._initializeChild(B);
}},properties:{defaultCssClass:{refine:true,init:m},title:{apply:k,nullable:true,check:c,event:p},icon:{check:c,apply:n,nullable:true,event:u}},members:{__he:false,__gH:null,__hf:null,__hg:null,__hh:null,__hd:null,__hi:null,__hj:null,__hk:null,_updatePosition:function(){if(this.__hf!=null||this.__hg!=null){return;
}
if(this.__hd){var F=qx.bom.element.Location.getPosition(this.__hd.getContainerElement());
var D=qx.bom.element.Dimension.getSize(this.__hd.getContainerElement());
var K=qx.bom.element.Dimension.getSize(this.getContainerElement());

if(F.top+K.height>qx.bom.Viewport.getHeight()){F.top=F.top-K.height-parseInt(qx.bom.element.Style.get(this.getContainerElement(),i))-parseInt(qx.bom.element.Style.get(this.getContainerElement(),o));
this.__hk.removeCssClass(h);
this.__hk.removeCssClass(z);
this.__hk.removeCssClass(d);
this.__hk.addCssClass(a);
this.__hk._setStyle(y,(D.width/2)+j);
this.__hk._setStyle(v,w+(parseInt(qx.bom.element.Style.get(this.getContainerElement(),i))+parseInt(qx.bom.element.Style.get(this.__hk.getContainerElement(),A)))+j);
this.__hk._setStyle(f,(parseInt(qx.bom.element.Style.get(this.getContainerElement(),i)))+j);
var E=qx.bom.element.Dimension.getSize(this.getContainerElement());
this._positionTo(F.left,F.top-(E.height-K.height));
}else if(F.left+K.width>qx.bom.Viewport.getWidth()){F.left=F.left-K.width-parseInt(qx.bom.element.Style.get(this.getContainerElement(),t))-parseInt(qx.bom.element.Style.get(this.getContainerElement(),l));
this.__hk.removeCssClass(h);
this.__hk.removeCssClass(z);
this.__hk.removeCssClass(a);
this.__hk.addCssClass(d);
this._positionTo(F.left,F.top);
}else{this.__hk._setStyle(y,(D.width/2)+j);
var E=qx.bom.element.Dimension.getSize(this.getContainerElement());
var x=parseInt(this.__hk._getStyle(f))==0?2:0;
this.__hk._setStyle(f,w+(E.height-x*parseInt(qx.bom.element.Style.get(this.getContainerElement(),i))+parseInt(qx.bom.element.Style.get(this.getContainerElement(),A)))+j);
this._positionTo(F.left,F.top+D.height+parseInt(qx.bom.element.Dimension.getHeight(this.__hk.getContainerElement())));
}return;
}var top=qx.bom.Viewport.getScrollTop(),G=1;
var L=qx.bom.Viewport.getScrollLeft(),H=1;
var J=qx.bom.Viewport.getWidth(),I=qx.bom.Viewport.getHeight();

if(this.__gH){var K=qx.bom.element.Dimension.getSize(this.__gH.getContainerElement());
H=K.width;
G=K.height;
}this._positionTo(L+(J-H)/2,top+(I-G)/2);
},show:function(){if(!this.__he){this.__hl();
qx.ui.mobile.core.Widget.prototype.show.call(this);
this._updatePosition();
}this.__he=true;
},placeTo:function(M,top){this.__hf=M;
this.__hg=top;
this._positionTo(M,top);
},_positionTo:function(N,top){this.getContainerElement().style.left=N+e;
this.getContainerElement().style.top=top+e;
},hide:function(){if(this.__he){this.__hm();
this.exclude();
}this.__he=false;
},__hl:function(){qx.event.Registration.addListener(window,b,this._updatePosition,this);
},__hm:function(){qx.event.Registration.removeListener(window,b,this._updatePosition,this);
},_initializeChild:function(O){if(this.__gH==null){this.__gH=new qx.ui.mobile.container.Composite(new qx.ui.mobile.layout.VBox().set({alignY:q}));
this._add(this.__gH);
}
if(this._createTitleWidget()){this.__gH.add(this._createTitleWidget());
}this.__gH.add(O);

if(this.__hd){this.__hk=new qx.ui.mobile.core.Widget();
this.__hk.addCssClass(s);
this.__hk.addCssClass(h);
this._add(this.__hk);
}this.__hi=O;
},_createTitleWidget:function(){if(this.__hj){return this.__hj;
}
if(this.getTitle()||this.getIcon()){this.__hj=new qx.ui.mobile.basic.Atom(this.getTitle(),this.getIcon());
this.__hj.addCssClass(g);
return this.__hj;
}else{return null;
}},_applyTitle:function(P,Q){if(P){if(this.__hj){this.__hj.setLabel(P);
}else{this.__hj=new qx.ui.mobile.basic.Atom(P,this.getIcon());
this.__hj.addCssClass(g);

if(this.__hi){this.__gH.addBefore(this._createTitleWidget(),this.__hi);
}else{if(this.__gH){this.__gH.add(this._createTitleWidget());
}}}}},_applyIcon:function(R,S){if(R){if(this.__hj){this.__hj.setIcon(R);
}else{this.__hj=new qx.ui.mobile.basic.Atom(this.getTitle(),R);
this.__hj.addCssClass(g);

if(this.__hi){this.__gH.addBefore(this._createTitleWidget(),this.__hi);
}else{if(this.__gH){this.__gH.add(this._createTitleWidget());
}}}}},add:function(T){this.removeWidget();
this._initializeChild(T);
},setAnchor:function(U){this.__hd=U;
},getTitleWidget:function(){return this.__hj;
},removeWidget:function(){if(this.__hi){this.__gH.remove(this.__hi);
return this.__hi;
}else{return null;
}}},destruct:function(){this.__hm();
this.__gH.dispose();
}});
})();
(function(){var j="borderTopWidth",i="borderLeftWidth",h="scroll",g="borderBottomWidth",f="engine.version",e="borderRightWidth",d="auto",c="marginTop",b="marginLeft",a="padding",z="qx.bom.element.Location",y="paddingLeft",x="static",w="marginBottom",v="BODY",u="paddingBottom",t="paddingTop",s="marginRight",r="browser.quirksmode",q="mshtml",o="position",p="margin",m="webkit",n="paddingRight",k="browser.documentmode",l="border";
qx.Class.define(z,{statics:{__hn:function(A,B){return qx.bom.element.Style.get(A,B,qx.bom.element.Style.COMPUTED_MODE,false);
},__ho:function(C,D){return parseInt(qx.bom.element.Style.get(C,D,qx.bom.element.Style.COMPUTED_MODE,false),10)||0;
},__hp:function(E){var H=0,top=0;
if(E.getBoundingClientRect&&true){var G=qx.dom.Node.getWindow(E);
H-=qx.bom.Viewport.getScrollLeft(G);
top-=qx.bom.Viewport.getScrollTop(G);
}else{var F=qx.dom.Node.getDocument(E).body;
E=E.parentNode;
while(E&&E!=F){H+=E.scrollLeft;
top+=E.scrollTop;
E=E.parentNode;
}}return {left:H,top:top};
},__hq:function(I){var K=qx.dom.Node.getDocument(I);
var J=K.body;
var L=J.offsetLeft;
var top=J.offsetTop;
if(parseFloat(qx.core.Environment.get(f))<530.17){L+=this.__ho(J,i);
top+=this.__ho(J,j);
}return {left:L,top:top};
},__hr:function(M){var O=qx.dom.Node.getDocument(M);
if(M.getBoundingClientRect){var P=M.getBoundingClientRect();
var Q=P.left;
var top=P.top;
}else{var Q=M.offsetLeft;
var top=M.offsetTop;
M=M.offsetParent;
var N=O.body;
while(M&&M!=N){Q+=M.offsetLeft;
top+=M.offsetTop;
Q+=this.__ho(M,i);
top+=this.__ho(M,j);
M=M.offsetParent;
}}return {left:Q,top:top};
},get:function(R,S){if(R.tagName==v){var location=this.__hs(R);
var ba=location.left;
var top=location.top;
}else{var T=this.__hq(R);
var Y=this.__hr(R);
var scroll=this.__hp(R);
var ba=Y.left+T.left-scroll.left;
var top=Y.top+T.top-scroll.top;
}var U=ba+R.offsetWidth;
var V=top+R.offsetHeight;

if(S){if(S==a||S==h){var W=qx.bom.element.Overflow.getX(R);

if(W==h||W==d){U+=R.scrollWidth-R.offsetWidth+this.__ho(R,i)+this.__ho(R,e);
}var X=qx.bom.element.Overflow.getY(R);

if(X==h||X==d){V+=R.scrollHeight-R.offsetHeight+this.__ho(R,j)+this.__ho(R,g);
}}
switch(S){case a:ba+=this.__ho(R,y);
top+=this.__ho(R,t);
U-=this.__ho(R,n);
V-=this.__ho(R,u);
case h:ba-=R.scrollLeft;
top-=R.scrollTop;
U-=R.scrollLeft;
V-=R.scrollTop;
case l:ba+=this.__ho(R,i);
top+=this.__ho(R,j);
U-=this.__ho(R,e);
V-=this.__ho(R,g);
break;
case p:ba-=this.__ho(R,b);
top-=this.__ho(R,c);
U+=this.__ho(R,s);
V+=this.__ho(R,w);
break;
}}return {left:ba,top:top,right:U,bottom:V};
},__hs:function(bb){var top=bb.offsetTop;
var bc=bb.offsetLeft;

if(m!==q||!((parseFloat(qx.core.Environment.get(f))<8||qx.core.Environment.get(k)<8)&&!qx.core.Environment.get(r))){top+=this.__ho(bb,c);
bc+=this.__ho(bb,b);
}return {left:bc,top:top};
},getLeft:function(bd,be){return this.get(bd,be).left;
},getTop:function(bf,bg){return this.get(bf,bg).top;
},getRight:function(bh,bi){return this.get(bh,bi).right;
},getBottom:function(bj,bk){return this.get(bj,bk).bottom;
},getRelative:function(bl,bm,bn,bo){var bq=this.get(bl,bn);
var bp=this.get(bm,bo);
return {left:bq.left-bp.left,top:bq.top-bp.top,right:bq.right-bp.right,bottom:bq.bottom-bp.bottom};
},getPosition:function(br){return this.getRelative(br,this.getOffsetParent(br));
},getOffsetParent:function(bs){var bu=bs.offsetParent||document.body;
var bt=qx.bom.element.Style;

while(bu&&(!/^body|html$/i.test(bu.tagName)&&bt.get(bu,o)===x)){bu=bu.offsetParent;
}return bu;
}}});
})();
(function(){var i="0px",h="mshtml",g="webkit",f="engine.version",e="qx.bom.element.Dimension",d="paddingRight",c="paddingLeft",b="paddingBottom",a="paddingTop";
qx.Class.define(e,{statics:{getWidth:function(j){return j.offsetWidth;
},getHeight:function(k){return k.offsetHeight;
},getSize:function(l){return {width:this.getWidth(l),height:this.getHeight(l)};
},__ht:{visible:true,hidden:true},getContentWidth:function(m){var n=qx.bom.element.Style;
var o=qx.bom.element.Overflow.getX(m);
var p=parseInt(n.get(m,c)||i,10);
var s=parseInt(n.get(m,d)||i,10);

if(this.__ht[o]){var r=m.clientWidth;

if((false)||qx.dom.Node.isBlockNode(m)){r=r-p-s;
}return r;
}else{if(m.clientWidth>=m.scrollWidth){return Math.max(m.clientWidth,m.scrollWidth)-p-s;
}else{var q=m.scrollWidth-p;
if(g==h&&qx.core.Environment.get(f)>=6){q-=s;
}return q;
}}},getContentHeight:function(t){var u=qx.bom.element.Style;
var x=qx.bom.element.Overflow.getY(t);
var w=parseInt(u.get(t,a)||i,10);
var v=parseInt(u.get(t,b)||i,10);

if(this.__ht[x]){return t.clientHeight-w-v;
}else{if(t.clientHeight>=t.scrollHeight){return Math.max(t.clientHeight,t.scrollHeight)-w-v;
}else{var y=t.scrollHeight-w;
if(g==h&&qx.core.Environment.get(f)==6){y-=v;
}return y;
}}},getContentSize:function(z){return {width:this.getContentWidth(z),height:this.getContentHeight(z)};
}}});
})();
(function(){var g='<span class="list_page_item"><span class="list_page_item_header">',f="showPointer",e='</span> <span class="list_page_item_Artists">by ',d='</span></span>',c="changeSelection",b="fade",a="iartnorfolk.page.List";
qx.Class.define(a,{extend:iartnorfolk.page.iArtShell,construct:function(){iartnorfolk.page.iArtShell.call(this);
},members:{_initialize:function(){iartnorfolk.page.iArtShell.prototype._initialize.call(this);
document.listPageItems=this.__hu=new qx.ui.mobile.list.List();
document.listPageItems.setDelegate({configureItem:function(h,j,k){var l=document.murals[j];
h.setTitle(g+l.properties.title+e+l.properties.Artists+d);
h.setImage(l.properties.imgs[0]);
}});
document.listPageItems.addCssClass(f);
document.listPageItems.addListener(c,function(m){var n=m.getData();
var o=document.murals[n];
document.theDetailId=o.properties._id;
document.__fL=document.listPage;
document.detailPage.show({animation:b});
document.detailPage._refreshDetail(document.theDetailId);
});
this.getContent().add(document.listPageItems);
this._refreshDetailList();
},_refreshDetailList:function(){if(document.murals==undefined){document.mapPage._refresh();
}
if(document.murals==undefined){return;
}var p=new Array();

for(var i=document.murals.length;i!=0;i--){p[i-1]=i-1;
}document.listPageItems.setModel(new qx.data.Array(p));
}}});
})();
(function(){var r="changeBubble",q="_applyDelegate",p="changeModel",o="LI",n="list",m="changeDelegate",l="",k="qx.data.Array",j="data-selectable",i="false",c="qx.ui.mobile.list.List",h="changeSelection",f="tap",b="ul",a="__hv",e="Integer",d="_applyModel",g="qx.event.type.Data";
qx.Class.define(c,{extend:qx.ui.mobile.core.Widget,construct:function(s){qx.ui.mobile.core.Widget.call(this);
this.addListener(f,this._onTap,this);
this.__hv=new qx.ui.mobile.list.provider.Provider(this);

if(s){this.setDelegate(s);
}},events:{changeSelection:g},properties:{defaultCssClass:{refine:true,init:n},delegate:{apply:q,event:m,init:null,nullable:true},model:{check:k,apply:d,event:p,nullable:true,init:null},itemCount:{check:e,init:0}},members:{__hv:null,_getTagName:function(){return b;
},_onTap:function(t){var v=t.getOriginalTarget();
var u=-1;

while(v.tagName!=o){v=v.parentNode;
}
if(qx.bom.element.Attribute.get(v,j)!=i&&qx.dom.Element.hasChild(this.getContainerElement(),v)){u=qx.dom.Hierarchy.getElementIndex(v);
}
if(u!=-1){this.fireDataEvent(h,u);
}},_applyModel:function(w,x){if(x!=null){x.removeListener(r,this.__hw,this);
}
if(w!=null){w.addListener(r,this.__hw,this);
}this.__hw();
},_applyDelegate:function(y,z){this.__hv.setDelegate(y);
},__hw:function(){var A=this.getModel();
this.setItemCount(A?A.getLength():0);
this.__hx();
},__hx:function(){this._setHtml(l);
var E=this.getItemCount();
var D=this.getModel();
var F=this.getContentElement();

for(var C=0;C<E;C++){var B=this.__hv.getItemElement(D.getItem(C),C);
F.appendChild(B);
}this._domUpdated();
}},destruct:function(){this._disposeObjects(a);
}});
})();
(function(){var d="_applyDelegate",c="qx.ui.mobile.list.provider.Provider",b="createItemRenderer",a="changeDelegate";
qx.Class.define(c,{extend:qx.core.Object,properties:{delegate:{event:a,init:null,nullable:true,apply:d}},members:{__hy:null,_setItemRenderer:function(e){this.__hy=e;
},_getItemRenderer:function(){return this.__hy;
},getItemElement:function(f,g){this.__hy.reset();
this._configureItem(f,g);
return qx.bom.Element.clone(this.__hy.getContainerElement(),true);
},_configureItem:function(h,i){var j=this.getDelegate();

if(j!=null&&j.configureItem!=null){j.configureItem(this.__hy,h,i);
}},_createItemRenderer:function(){var l=qx.util.Delegate.getMethod(this.getDelegate(),b);
var k=null;

if(l==null){k=new qx.ui.mobile.list.renderer.Default();
}else{k=l();
}return k;
},_applyDelegate:function(m,n){this._setItemRenderer(this._createItemRenderer());
}},destruct:function(){this.__hy.dispose();
this.__hy=null;
}});
})();
(function(){var a="qx.util.Delegate";
qx.Class.define(a,{statics:{getMethod:function(b,c){if(qx.util.Delegate.containsMethod(b,c)){return qx.lang.Function.bind(b[c],b);
}return null;
},containsMethod:function(d,e){var f=qx.lang.Type;

if(f.isObject(d)){return f.isFunction(d[e]);
}return false;
}}});
})();
(function(){var k="Boolean",j="arrow",i="selected",h="listItem",g="li",f="_applyAttribute",e="_applySelected",d="qx.ui.mobile.list.renderer.Abstract",c="LI",b="_applyShowArrow",a="abstract";
qx.Class.define(d,{extend:qx.ui.mobile.container.Composite,type:a,construct:function(l){qx.ui.mobile.container.Composite.call(this,l);
this.initSelectable();
this.initShowArrow();
},properties:{defaultCssClass:{refine:true,init:h},selected:{check:k,init:false,apply:e},selectable:{check:k,init:true,apply:f},showArrow:{check:k,init:false,apply:b},activatable:{refine:true,init:true}},members:{reset:function(){},_getTagName:function(){return g;
},getRowIndexFromEvent:function(m){return this.getRowIndex(m.getOriginalTarget());
},getRowIndex:function(n){while(n.tagName!=c){n=n.parentNode;
}return qx.dom.Hierarchy.getElementIndex(n);
},_applyShowArrow:function(o,p){if(o){this.addCssClass(j);
}else{this.removeCssClass(j);
}},_applySelected:function(q,r){if(q){this.addCssClass(i);
}else{this.removeCssClass(i);
}}}});
})();
(function(){var f="",e="middle",d="list-itemlabel",c="qx.ui.mobile.list.renderer.Default",b="list-itemimage",a="subtitle";
qx.Class.define(c,{extend:qx.ui.mobile.list.renderer.Abstract,construct:function(g){qx.ui.mobile.list.renderer.Abstract.call(this,g||new qx.ui.mobile.layout.HBox().set({alignY:e}));
this.add(this._create(),{flex:1});
},members:{__hz:null,__gn:null,__hA:null,__hB:null,__hC:null,getImageWidget:function(){return this.__hz;
},getTitleWidget:function(){return this.__gn;
},getSubTitleWidget:function(){return this.__hA;
},setImage:function(h){this.__hz.setSource(h);
},setTitle:function(i){this.__gn.setValue(i);
},setSubTitle:function(j){this.__hA.setValue(j);
},_create:function(){var k=qx.ui.mobile.container.Composite;
this.__hB=new k(new qx.ui.mobile.layout.HBox().set({alignY:e}));
this.__hz=new qx.ui.mobile.basic.Image();
this.__hz.setAnonymous(true);
this.__hz.addCssClass(b);
this.__hB.add(this.__hz);
this.__hC=new k(new qx.ui.mobile.layout.VBox());
this.__hB.add(this.__hC,{flex:1});
this.__gn=new qx.ui.mobile.basic.Label();
this.__gn.setWrap(false);
this.__gn.addCssClass(d);
this.__hC.add(this.__gn);
this.__hA=new qx.ui.mobile.basic.Label();
this.__hA.setWrap(false);
this.__hA.addCssClass(a);
this.__hC.add(this.__hA);
return this.__hB;
},reset:function(){this.__hz.setSource(null);
this.__gn.setValue(f);
this.__hA.setValue(f);
}},destruct:function(){this.__hz.dispose();
this.__hz=null;
this.__gn.dispose();
this.__gn=null;
this.__hA.dispose();
this.__hA=null;
this.__hB.dispose();
this.__hB=null;
this.__hC.dispose();
this.__hC=null;
}});
})();
(function(){var a="qx.dom.Element";
qx.Class.define(a,{statics:{hasChild:function(parent,b){return b.parentNode===parent;
},hasChildren:function(c){return !!c.firstChild;
},hasChildElements:function(d){d=d.firstChild;

while(d){if(d.nodeType===1){return true;
}d=d.nextSibling;
}return false;
},getParentElement:function(e){return e.parentNode;
},isInDom:function(f,g){if(!g){g=window;
}var h=g.document.getElementsByTagName(f.nodeName);

for(var i=0,l=h.length;i<l;i++){if(h[i]===f){return true;
}}return false;
},insertAt:function(j,parent,k){var m=parent.childNodes[k];

if(m){parent.insertBefore(j,m);
}else{parent.appendChild(j);
}return true;
},insertBegin:function(n,parent){if(parent.firstChild){this.insertBefore(n,parent.firstChild);
}else{parent.appendChild(n);
}},insertEnd:function(o,parent){parent.appendChild(o);
},insertBefore:function(p,q){q.parentNode.insertBefore(p,q);
return true;
},insertAfter:function(r,s){var parent=s.parentNode;

if(s==parent.lastChild){parent.appendChild(r);
}else{return this.insertBefore(r,s.nextSibling);
}return true;
},remove:function(t){if(!t.parentNode){return false;
}t.parentNode.removeChild(t);
return true;
},removeChild:function(u,parent){if(u.parentNode!==parent){return false;
}parent.removeChild(u);
return true;
},removeChildAt:function(v,parent){var w=parent.childNodes[v];

if(!w){return false;
}parent.removeChild(w);
return true;
},replaceChild:function(x,y){if(!y.parentNode){return false;
}y.parentNode.replaceChild(x,y);
return true;
},replaceAt:function(z,A,parent){var B=parent.childNodes[A];

if(!B){return false;
}parent.replaceChild(z,B);
return true;
}}});
})();
(function(){var h="[",g="idBubble-",f="]",d=".",c="changeBubble",b="qx.data.marshal.MEventBubbling",a="qx.event.type.Data";
qx.Mixin.define(b,{events:{"changeBubble":a},members:{_applyEventPropagation:function(j,k,name){this.fireDataEvent(c,{value:j,name:name,old:k});
this._registerEventChaining(j,k,name);
},_registerEventChaining:function(l,m,name){if((l instanceof qx.core.Object)&&qx.Class.hasMixin(l.constructor,qx.data.marshal.MEventBubbling)){var n=qx.lang.Function.bind(this.__hD,this,name);
var p=l.addListener(c,n,this);
var o=l.getUserData(g+this.$$hash);

if(o==null){o=[];
l.setUserData(g+this.$$hash,o);
}o.push(p);
}if(m!=null&&m.getUserData&&m.getUserData(g+this.$$hash)!=null){var o=m.getUserData(g+this.$$hash);

for(var i=0;i<o.length;i++){m.removeListenerById(o[i]);
}m.setUserData(g+this.$$hash,null);
}},__hD:function(name,e){var x=e.getData();
var t=x.value;
var r=x.old;
if(qx.Class.hasInterface(e.getTarget().constructor,qx.data.IListData)){if(x.name.indexOf){var w=x.name.indexOf(d)!=-1?x.name.indexOf(d):x.name.length;
var u=x.name.indexOf(h)!=-1?x.name.indexOf(h):x.name.length;

if(w<u){var q=x.name.substring(0,w);
var v=x.name.substring(w+1,x.name.length);

if(v[0]!=h){v=d+v;
}var s=name+h+q+f+v;
}else if(u<w){var q=x.name.substring(0,u);
var v=x.name.substring(u,x.name.length);
var s=name+h+q+f+v;
}else{var s=name+h+x.name+f;
}}else{var s=name+h+x.name+f;
}}else{var s=name+d+x.name;
}this.fireDataEvent(c,{value:t,name:s,old:r});
}}});
})();
(function(){var o="change",n="changeBubble",m="add",l="remove",k="0-",j="order",h="-",g="0",f="qx.event.type.Data",e="Boolean",b="",d="qx.data.Array",c="number",a="changeLength";
qx.Class.define(d,{extend:qx.core.Object,include:qx.data.marshal.MEventBubbling,implement:[qx.data.IListData],construct:function(p){qx.core.Object.call(this);
if(p==undefined){this.__hE=[];
}else if(arguments.length>1){this.__hE=[];

for(var i=0;i<arguments.length;i++){this.__hE.push(arguments[i]);
}}else if(typeof p==c){this.__hE=new Array(p);
}else if(p instanceof Array){this.__hE=qx.lang.Array.clone(p);
}else{this.__hE=[];
this.dispose();
throw new Error("Type of the parameter not supported!");
}for(var i=0;i<this.__hE.length;i++){this._applyEventPropagation(this.__hE[i],null,i);
}this.__hF();
},properties:{autoDisposeItems:{check:e,init:false}},events:{"change":f,"changeLength":f},members:{__hE:null,concat:function(q){if(q){var r=this.__hE.concat(q);
}else{var r=this.__hE.concat();
}return new qx.data.Array(r);
},join:function(s){return this.__hE.join(s);
},pop:function(){var t=this.__hE.pop();
this.__hF();
this._registerEventChaining(null,t,this.length-1);
this.fireDataEvent(n,{value:[],name:this.length,old:[t]});
this.fireDataEvent(o,{start:this.length-1,end:this.length-1,type:l,items:[t]},null);
return t;
},push:function(u){for(var i=0;i<arguments.length;i++){this.__hE.push(arguments[i]);
this.__hF();
this._registerEventChaining(arguments[i],null,this.length-1);
this.fireDataEvent(n,{value:[arguments[i]],name:this.length-1,old:[]});
this.fireDataEvent(o,{start:this.length-1,end:this.length-1,type:m,items:[arguments[i]]},null);
}return this.length;
},reverse:function(){if(this.length==0){return;
}var v=this.__hE.concat();
this.__hE.reverse();
this.fireDataEvent(o,{start:0,end:this.length-1,type:j,items:null},null);
this.fireDataEvent(n,{value:this.__hE,name:k+(this.__hE.length-1),old:v});
},shift:function(){if(this.length==0){return;
}var w=this.__hE.shift();
this.__hF();
this._registerEventChaining(null,w,this.length-1);
this.fireDataEvent(n,{value:[],name:g,old:[w]});
this.fireDataEvent(o,{start:0,end:this.length-1,type:l,items:[w]},null);
return w;
},slice:function(x,y){return new qx.data.Array(this.__hE.slice(x,y));
},splice:function(z,A,B){var J=this.__hE.length;
var F=this.__hE.splice.apply(this.__hE,arguments);
if(this.__hE.length!=J){this.__hF();
}var H=A>0;
var D=arguments.length>2;
var E=null;

if(H||D){if(this.__hE.length>J){var I=m;
}else if(this.__hE.length<J){var I=l;
E=F;
}else{var I=j;
}this.fireDataEvent(o,{start:z,end:this.length-1,type:I,items:E},null);
}for(var i=2;i<arguments.length;i++){this._registerEventChaining(arguments[i],null,z+i);
}var G=[];

for(var i=2;i<arguments.length;i++){G[i-2]=arguments[i];
}var C=(z+Math.max(arguments.length-3,A-1));
var name=z==C?C:z+h+C;
this.fireDataEvent(n,{value:G,name:name,old:F});
for(var i=0;i<F.length;i++){this._registerEventChaining(null,F[i],i);
}return (new qx.data.Array(F));
},sort:function(K){if(this.length==0){return;
}var L=this.__hE.concat();
this.__hE.sort.apply(this.__hE,arguments);
this.fireDataEvent(o,{start:0,end:this.length-1,type:j,items:null},null);
this.fireDataEvent(n,{value:this.__hE,name:k+(this.length-1),old:L});
},unshift:function(M){for(var i=arguments.length-1;i>=0;i--){this.__hE.unshift(arguments[i]);
this.__hF();
this._registerEventChaining(arguments[i],null,0);
this.fireDataEvent(n,{value:[this.__hE[0]],name:g,old:[this.__hE[1]]});
this.fireDataEvent(o,{start:0,end:this.length-1,type:m,items:[arguments[i]]},null);
}return this.length;
},toArray:function(){return this.__hE;
},getItem:function(N){return this.__hE[N];
},setItem:function(O,P){var Q=this.__hE[O];
if(Q===P){return;
}this.__hE[O]=P;
this._registerEventChaining(P,Q,O);
if(this.length!=this.__hE.length){this.__hF();
}this.fireDataEvent(n,{value:[P],name:O,old:[Q]});
this.fireDataEvent(o,{start:O,end:O,type:m,items:[P]},null);
},getLength:function(){return this.length;
},indexOf:function(R){return this.__hE.indexOf(R);
},toString:function(){if(this.__hE!=null){return this.__hE.toString();
}return b;
},contains:function(S){return this.__hE.indexOf(S)!==-1;
},copy:function(){return this.concat();
},insertAt:function(T,U){this.splice(T,0,U).dispose();
},insertBefore:function(V,W){var X=this.indexOf(V);

if(X==-1){this.push(W);
}else{this.splice(X,0,W).dispose();
}},insertAfter:function(Y,ba){var bb=this.indexOf(Y);

if(bb==-1||bb==(this.length-1)){this.push(ba);
}else{this.splice(bb+1,0,ba).dispose();
}},removeAt:function(bc){var be=this.splice(bc,1);
var bd=be.getItem(0);
be.dispose();
return bd;
},removeAll:function(){for(var i=0;i<this.__hE.length;i++){this._registerEventChaining(null,this.__hE[i],i);
}if(this.getLength()==0){return;
}var bg=this.getLength();
var bf=this.__hE.concat();
this.__hE.length=0;
this.__hF();
this.fireDataEvent(n,{value:[],name:k+(bg-1),old:bf});
this.fireDataEvent(o,{start:0,end:bg-1,type:l,items:bf},null);
return bf;
},append:function(bh){if(bh instanceof qx.data.Array){bh=bh.toArray();
}Array.prototype.push.apply(this.__hE,bh);
for(var i=0;i<bh.length;i++){this._registerEventChaining(bh[i],null,this.__hE.length+i);
}var bi=this.length;
this.__hF();
this.fireDataEvent(n,{value:bh,name:bi==(this.length-1)?bi:bi+h+(this.length-1),old:[]});
this.fireDataEvent(o,{start:bi,end:this.length-1,type:m,items:bh},null);
},remove:function(bj){var bk=this.indexOf(bj);

if(bk!=-1){this.splice(bk,1).dispose();
return bj;
}},equals:function(bl){if(this.length!==bl.length){return false;
}
for(var i=0;i<this.length;i++){if(this.getItem(i)!==bl.getItem(i)){return false;
}}return true;
},sum:function(){var bm=0;

for(var i=0;i<this.length;i++){bm+=this.getItem(i);
}return bm;
},max:function(){var bn=this.getItem(0);

for(var i=1;i<this.length;i++){if(this.getItem(i)>bn){bn=this.getItem(i);
}}return bn===undefined?null:bn;
},min:function(){var bo=this.getItem(0);

for(var i=1;i<this.length;i++){if(this.getItem(i)<bo){bo=this.getItem(i);
}}return bo===undefined?null:bo;
},forEach:function(bp,bq){for(var i=0;i<this.__hE.length;i++){bp.call(bq,this.__hE[i],i,this);
}},__hF:function(){var br=this.length;
this.length=this.__hE.length;
this.fireDataEvent(a,this.length,br);
}},destruct:function(){for(var i=0;i<this.__hE.length;i++){var bs=this.__hE[i];
this._applyEventPropagation(null,bs,i);
if(this.isAutoDisposeItems()&&bs&&bs instanceof qx.core.Object){bs.dispose();
}}this.__hE=null;
}});
})();
(function(){var c="List",b="iartnorfolk.page.Share",a="iArtNorfolk: Share";
qx.Class.define(b,{extend:iartnorfolk.page.iArtShell,construct:function(){iartnorfolk.page.iArtShell.call(this);
},members:{_initialize:function(){iartnorfolk.page.iArtShell.prototype._initialize.call(this);
this.__pageTitle.setValue(a);
this.__gV=c;
this.__shareButton.setValue(c);
}}});
})();
(function(){var b="iArtNorfolk: Settings",a="iartnorfolk.page.Settings";
qx.Class.define(a,{extend:iartnorfolk.page.iArtShell,construct:function(){iartnorfolk.page.iArtShell.call(this);
},members:{_initialize:function(){iartnorfolk.page.iArtShell.prototype._initialize.call(this);
this.__pageTitle.setValue(b);
this.remove(this.__findMeButton);
this.remove(this.__settingsButton);
}}});
})();
(function(){var o='',m='<ul>',l='</div>',k='</ul>',j="Back",h='<span class="details_seperator"><span class="details_seperator_',g='_id',f='</span></span></li>',e='<div class="details_title">',b='<li>',Q='geometry',P='">: </span></span>',O='<li><span class="details_header"><span class="details_header_Link">Link</span></span>',N='imgs',M='</span></a></span></span></span></li>',L='<span class="details_seperator"><span class="details_seperator_Link">: </span></span>',K='<span class="details_header"><span class="details_header_',J='Image',I='Loading Detail...',H="back",v='title',w="noimage.png",t='<div class="details_wrapper">',u='"><span class="details_info_Link_text">',r='<div class="details_image"><img src="',s='">',p='Link',q='json',x="iartnorfolk.page.Detail",y='server-side failure with status code ',B='<span class="details_info"><span class="details_info_Link"><a href="',A='interalId',D='" /></div>',C='<span class="details_info"><span class="details_info_">',F='id',E='</span></span>',z="tap",G='_rev';
qx.Class.define(x,{extend:iartnorfolk.page.iArtShell,construct:function(){iartnorfolk.page.iArtShell.call(this);
},members:{_initialize:function(){iartnorfolk.page.iArtShell.prototype._initialize.call(this);
var S=new qx.ui.mobile.navigationbar.BackButton(j);
S.addListener(z,function(){this.fireDataEvent(H,j);
},this);
this.__navBar.addBefore(S,this.__mainButton,{flex:0});
this.remove(this.__mainButton);
document.detailHtmlBlob=new qx.ui.mobile.embed.Html();
this.getContent().add(document.detailHtmlBlob);
},_refreshDetail:function(T){document.detailHtmlBlob.setHtml(I);
var V=document.mapPage._detailDataLoadUrl+T+o;
var U=undefined;
$.ajax({url:V,crossDomain:true,dataType:q,async:false,success:function(bb,bc,bd){U=bb;
},error:function(be,status,bf){console.log(y+status);
}});

if(U!=undefined){var W=U;
document.mapMuralProperties(W.properties);
var Y=e+W.properties.title+l;
var X=o;
if(W.properties.imgs.length>0){Y+=(W.properties.imgs[0]!=w)?r+W.properties.imgs[0]+D:o;
}Y+=m;
$.each(W.properties,function(i,n){if(n!=o&&i!=v&&i!=Q&&i!=F&&i!=g&&i!=G&&i!=N&&i!=J&&i!=A&&i!=p){var bg=K+i+s+i+E;
var bh=h+i+P;
Y+=b+bg+bh+C+n+f;
}});
var ba=L;
Y+=O+ba+B+W.properties.Link+u+W.properties.title+M;
Y+=o;
Y+=k;
Y+=m;
Y+=X;
Y+=k;
Y=t+Y+l;
document.detailHtmlBlob.setHtml(Y);
}},_calcDistance:function(bi,bj){var R=6371;
var bl=(bj[0]-bi[0]).toRad();
var bk=(bj[1]-bi[1]).toRad();
var a=Math.sin(bl/2)*Math.sin(bl/2)+Math.cos(bi[0].toRad())*Math.cos(bj[0].toRad())*Math.sin(bk/2)*Math.sin(bk/2);
var c=2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
var d=R*c;
return d;
}}});
})();


qx.$$loader.init();

