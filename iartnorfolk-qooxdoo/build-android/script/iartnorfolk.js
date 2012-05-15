(function(){

if (!window.qx) window.qx = {};

qx.$$start = new Date();
  
if (!qx.$$environment) qx.$$environment = {};
var envinfo = {"engine.name":"webkit","qx.application":"iartnorfolk.Application","qx.debug":false,"qx.debug.databinding":false,"qx.debug.dispose":false,"qx.mobile.emulatetouch":true,"qx.mobile.nativescroll":false,"qx.optimization.basecalls":true,"qx.optimization.comments":true,"qx.optimization.privates":true,"qx.optimization.strings":true,"qx.optimization.variables":true,"qx.optimization.variants":true,"qx.revision":"","qx.theme":"qx.theme.Modern","qx.version":"2.0"};
for (var k in envinfo) qx.$$environment[k] = envinfo[k];

if (!qx.$$libraries) qx.$$libraries = {};
var libinfo = {"__out__":{"sourceUri":"script"},"iartnorfolk":{"resourceUri":"resource","sourceUri":"script"},"qx":{"resourceUri":"resource","sourceUri":"script","sourceViewUri":"https://github.com/qooxdoo/qooxdoo/blob/%{qxGitBranch}/framework/source/class/%{classFilePath}#L%{lineNumber}"}};
for (var k in libinfo) qx.$$libraries[k] = libinfo[k];

qx.$$resources = {};
qx.$$translations = {"C":null,"en":null};
qx.$$locales = {"C":null,"en":null};
qx.$$packageData = {};

qx.$$loader = {
  parts : {"boot":[0]},
  packages : {"0":{"uris":["__out__:iartnorfolk.68ced90f6430.js"]}},
  urisBefore : [],
  cssBefore : ["./resource/qx/mobile/css/android.css","./resource/iartnorfolk/css/styles.css"],
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
      if (typeof callback === "function") {
        callback();
      }
    }
  };

  if (isLoadParallel) {
    elem.async = false;
  }

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
var isLoadParallel = 'async' in document.createElement('script');

function loadScriptList(list, callback) {
  if (list.length == 0) {
    callback();
    return;
  }

  var item;

  if (isLoadParallel) {
    while (list.length) {
      item = list.shift();
      if (list.length) {
        loadScript(item);
      } else {
        loadScript(item, callback);
      }
    }
  } else {
    item = list.shift();
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
    window.setTimeout(function(){l.signalStartup();}, 500); /* safari on an ipad needs a timeout too - 50 didn't do */
  } else {
    loadScriptList(l.decodeUris(l.packages[l.parts[l.boot][0]].uris), function(){
      // Opera needs this extra time to parse the scripts
      window.setTimeout(function(){
        l.importPackageData(qx.$$packageData[bootPackageHash] || {});
        l.signalStartup();
      }, 500); /* 50 should do, but be safe... */
    });
  }
}
})();

qx.$$packageData['0']={"locales":{},"resources":{"iartnorfolk/css/styles.css":"iartnorfolk","qx/mobile/css/LICENSE":"qx","qx/mobile/css/_android.css":"qx","qx/mobile/css/_animations.css":"qx","qx/mobile/css/_base.css":"qx","qx/mobile/css/_ios.css":"qx","qx/mobile/css/_layout.css":"qx","qx/mobile/css/_main.css":"qx","qx/mobile/css/_mixins.css":"qx","qx/mobile/css/_scroller.css":"qx","qx/mobile/css/_utility.css":"qx","qx/mobile/css/_widgets.css":"qx","qx/mobile/css/android.css":"qx","qx/mobile/css/ios.css":"qx","qx/mobile/icon/android/arrow.png":[25,20,"png","qx"],"qx/mobile/icon/android/arrow_pressed.png":[25,20,"png","qx"],"qx/mobile/icon/android/cancel.png":[20,20,"png","qx"],"qx/mobile/icon/android/checkbox-gray.png":[22,19,"png","qx"],"qx/mobile/icon/android/checkbox-green.png":[22,19,"png","qx"],"qx/mobile/icon/android/loading.png":[32,32,"png","qx"],"qx/mobile/icon/android/on_off.png":[149,27,"png","qx"],"qx/mobile/icon/android/scrollbar.png":[7,7,"png","qx"],"qx/mobile/icon/android/spinner.png":[20,20,"png","qx"],"qx/mobile/icon/android/warning.png":[32,32,"png","qx"],"qx/mobile/js/iscroll.js":"qx","qx/mobile/js/iscroll.min.js":"qx"},"translations":{}};
(function(){var m=".prototype",k="function",j="Boolean",h="Error",g="constructor",f="warn",e="default",d="hasOwnProperty",c="string",b="toLocaleString",K="RegExp",J='\", "',I="info",H="BROKEN_IE",G="isPrototypeOf",F="Date",E="",D="qx.Bootstrap",C="]",B="Class",t="error",u="[Class ",r="valueOf",s="Number",p="debug",q="ES5",n="Object",o='"',v="Array",w="()",y="String",x="Function",A="toString",z=".";if(!window.qx){window.qx={};}
;qx.Bootstrap={genericToString:function(){return u+this.classname+C;}
,createNamespace:function(name,L){var N=name.split(z);var parent=window;var M=N[0];for(var i=0,O=N.length-1;i<O;i++,M=N[i]){if(!parent[M]){parent=parent[M]={};}
else {parent=parent[M];}
;}
;parent[M]=L;return M;}
,setDisplayName:function(P,Q,name){P.displayName=Q+z+name+w;}
,setDisplayNames:function(R,S){for(var name in R){var T=R[name];if(T instanceof Function){T.displayName=S+z+name+w;}
;}
;}
,define:function(name,U){if(!U){var U={statics:{}};}
;var ba;var X=null;qx.Bootstrap.setDisplayNames(U.statics,name);if(U.members||U.extend){qx.Bootstrap.setDisplayNames(U.members,name+m);ba=U.construct||new Function;if(U.extend){this.extendClass(ba,ba,U.extend,name,Y);}
;var V=U.statics||{};for(var i=0,bb=qx.Bootstrap.getKeys(V),l=bb.length;i<l;i++){var bc=bb[i];ba[bc]=V[bc];}
;X=ba.prototype;var W=U.members||{};for(var i=0,bb=qx.Bootstrap.getKeys(W),l=bb.length;i<l;i++){var bc=bb[i];X[bc]=W[bc];}
;}
else {ba=U.statics||{};}
;var Y=this.createNamespace(name,ba);ba.name=ba.classname=name;ba.basename=Y;ba.$$type=B;if(!ba.hasOwnProperty(A)){ba.toString=this.genericToString;}
;if(U.defer){U.defer(ba,X);}
;qx.Bootstrap.$$registry[name]=ba;return ba;}
};qx.Bootstrap.define(D,{statics:{LOADSTART:qx.$$start||new Date(),DEBUG:(function(){var bd=true;if(qx.$$environment&&qx.$$environment["qx.debug"]===false){bd=false;}
;return bd;}
)(),getEnvironmentSetting:function(be){if(qx.$$environment){return qx.$$environment[be];}
;}
,setEnvironmentSetting:function(bf,bg){if(!qx.$$environment){qx.$$environment={};}
;if(qx.$$environment[bf]===undefined){qx.$$environment[bf]=bg;}
;}
,createNamespace:qx.Bootstrap.createNamespace,define:qx.Bootstrap.define,setDisplayName:qx.Bootstrap.setDisplayName,setDisplayNames:qx.Bootstrap.setDisplayNames,genericToString:qx.Bootstrap.genericToString,extendClass:function(bh,bi,bj,name,bk){var bn=bj.prototype;var bm=new Function;bm.prototype=bn;var bl=new bm;bh.prototype=bl;bl.name=bl.classname=name;bl.basename=bk;bi.base=bh.superclass=bj;bi.self=bh.constructor=bl.constructor=bh;}
,getByName:function(name){return qx.Bootstrap.$$registry[name];}
,$$registry:{},objectGetLength:function(bo){var length=0;for(var bp in bo){length++;}
;return length;}
,objectMergeWith:function(bq,br,bs){if(bs===undefined){bs=true;}
;for(var bt in br){if(bs||bq[bt]===undefined){bq[bt]=br[bt];}
;}
;return bq;}
,__a:[G,d,b,A,r,g],getKeys:({"ES5":Object.keys,"BROKEN_IE":function(bu){var bv=[];var bx=Object.prototype.hasOwnProperty;for(var by in bu){if(bx.call(bu,by)){bv.push(by);}
;}
;var bw=qx.Bootstrap.__a;for(var i=0,a=bw,l=a.length;i<l;i++){if(bx.call(bu,a[i])){bv.push(a[i]);}
;}
;return bv;}
,"default":function(bz){var bA=[];var bB=Object.prototype.hasOwnProperty;for(var bC in bz){if(bB.call(bz,bC)){bA.push(bC);}
;}
;return bA;}
})[typeof (Object.keys)==k?q:(function(){for(var bD in {toString:1}){return bD;}
;}
)()!==A?H:e],getKeysAsString:function(bE){var bF=qx.Bootstrap.getKeys(bE);if(bF.length==0){return E;}
;return o+bF.join(J)+o;}
,__b:{"[object String]":y,"[object Array]":v,"[object Object]":n,"[object RegExp]":K,"[object Number]":s,"[object Boolean]":j,"[object Date]":F,"[object Function]":x,"[object Error]":h},bind:function(bG,self,bH){var bI=Array.prototype.slice.call(arguments,2,arguments.length);return function(){var bJ=Array.prototype.slice.call(arguments,0,arguments.length);return bG.apply(self,bI.concat(bJ));}
;}
,firstUp:function(bK){return bK.charAt(0).toUpperCase()+bK.substr(1);}
,firstLow:function(bL){return bL.charAt(0).toLowerCase()+bL.substr(1);}
,getClass:function(bM){var bN=Object.prototype.toString.call(bM);return (qx.Bootstrap.__b[bN]||bN.slice(8,-1));}
,isString:function(bO){return (bO!==null&&(typeof bO===c||qx.Bootstrap.getClass(bO)==y||bO instanceof String||(!!bO&&!!bO.$$isString)));}
,isArray:function(bP){return (bP!==null&&(bP instanceof Array||(bP&&qx.data&&qx.data.IListData&&qx.util.OOUtil.hasInterface(bP.constructor,qx.data.IListData))||qx.Bootstrap.getClass(bP)==v||(!!bP&&!!bP.$$isArray)));}
,isObject:function(bQ){return (bQ!==undefined&&bQ!==null&&qx.Bootstrap.getClass(bQ)==n);}
,isFunction:function(bR){return qx.Bootstrap.getClass(bR)==x;}
,$$logs:[],debug:function(bS,bT){qx.Bootstrap.$$logs.push([p,arguments]);}
,info:function(bU,bV){qx.Bootstrap.$$logs.push([I,arguments]);}
,warn:function(bW,bX){qx.Bootstrap.$$logs.push([f,arguments]);}
,error:function(bY,ca){qx.Bootstrap.$$logs.push([t,arguments]);}
,trace:function(cb){}
}});}
)();
(function(){var a="qx.util.OOUtil";qx.Bootstrap.define(a,{statics:{classIsDefined:function(name){return qx.Bootstrap.getByName(name)!==undefined;}
,getPropertyDefinition:function(b,name){while(b){if(b.$$properties&&b.$$properties[name]){return b.$$properties[name];}
;b=b.superclass;}
;return null;}
,hasProperty:function(c,name){return !!qx.util.OOUtil.getPropertyDefinition(c,name);}
,getEventType:function(d,name){var d=d.constructor;while(d.superclass){if(d.$$events&&d.$$events[name]!==undefined){return d.$$events[name];}
;d=d.superclass;}
;return null;}
,supportsEvent:function(e,name){return !!qx.util.OOUtil.getEventType(e,name);}
,getByInterface:function(f,g){var h,i,l;while(f){if(f.$$implements){h=f.$$flatImplements;for(i=0,l=h.length;i<l;i++){if(h[i]===g){return f;}
;}
;}
;f=f.superclass;}
;return null;}
,hasInterface:function(j,k){return !!qx.util.OOUtil.getByInterface(j,k);}
,getMixins:function(m){var n=[];while(m){if(m.$$includes){n.push.apply(n,m.$$flatIncludes);}
;m=m.superclass;}
;return n;}
}});}
)();
(function(){var o="qx.Mixin",n=".prototype",m="]",k="constructor",j="Array",h="destruct",g='" in property "',f="Mixin",e="[Mixin ",d='" in member "',a='Conflict between mixin "',c='"!',b='" and "';qx.Bootstrap.define(o,{statics:{define:function(name,p){if(p){if(p.include&&!(qx.Bootstrap.getClass(p.include)===j)){p.include=[p.include];}
;{}
;var r=p.statics?p.statics:{};qx.Bootstrap.setDisplayNames(r,name);for(var q in r){if(r[q] instanceof Function){r[q].$$mixin=r;}
;}
;if(p.construct){r.$$constructor=p.construct;qx.Bootstrap.setDisplayName(p.construct,name,k);}
;if(p.include){r.$$includes=p.include;}
;if(p.properties){r.$$properties=p.properties;}
;if(p.members){r.$$members=p.members;qx.Bootstrap.setDisplayNames(p.members,name+n);}
;for(var q in r.$$members){if(r.$$members[q] instanceof Function){r.$$members[q].$$mixin=r;}
;}
;if(p.events){r.$$events=p.events;}
;if(p.destruct){r.$$destructor=p.destruct;qx.Bootstrap.setDisplayName(p.destruct,name,h);}
;}
else {var r={};}
;r.$$type=f;r.name=name;r.toString=this.genericToString;r.basename=qx.Bootstrap.createNamespace(name,r);this.$$registry[name]=r;return r;}
,checkCompatibility:function(s){var v=this.flatten(s);var w=v.length;if(w<2){return true;}
;var z={};var y={};var x={};var u;for(var i=0;i<w;i++){u=v[i];for(var t in u.events){if(x[t]){throw new Error(a+u.name+b+x[t]+d+t+c);}
;x[t]=u.name;}
;for(var t in u.properties){if(z[t]){throw new Error(a+u.name+b+z[t]+g+t+c);}
;z[t]=u.name;}
;for(var t in u.members){if(y[t]){throw new Error(a+u.name+b+y[t]+d+t+c);}
;y[t]=u.name;}
;}
;return true;}
,isCompatible:function(A,B){var C=qx.util.OOUtil.getMixins(B);C.push(A);return qx.Mixin.checkCompatibility(C);}
,getByName:function(name){return this.$$registry[name];}
,isDefined:function(name){return this.getByName(name)!==undefined;}
,getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);}
,flatten:function(D){if(!D){return [];}
;var E=D.concat();for(var i=0,l=D.length;i<l;i++){if(D[i].$$includes){E.push.apply(E,this.flatten(D[i].$$includes));}
;}
;return E;}
,genericToString:function(){return e+this.name+m;}
,$$registry:{},__c:null,__d:function(){}
}});}
)();
(function(){var cs="qx.bom.client.Stylesheet.getInsertRule",cr="qx.bom.client.Html.getDataset",cq="qx.bom.client.PhoneGap.getPhoneGap",cp='] found, and no default ("default") given',co="qx.bom.client.Html.getAudioAif",cn="qx.bom.client.CssTransform.get3D",cm=' type)',cl="qx.bom.client.Xml.getAttributeNS",ck="qx.bom.client.Stylesheet.getRemoveImport",cj="qx.bom.client.Css.getUserModify",bt="qx.bom.client.Css.getFilterGradient",bs="qx.bom.client.Event.getHashChange",br="qx.bom.client.Plugin.getWindowsMedia",bq="qx.bom.client.Html.getVideo",bp="qx.bom.client.Device.getName",bo="qx.bom.client.Event.getTouch",bn="qx.optimization.strings",bm="qx.optimization.variables",bl="qx.bom.client.EcmaScript.getStackTrace",bk="qx.bom.client.Xml.getSelectSingleNode",cz="qx.bom.client.Xml.getImplementation",cA="qx.bom.client.Html.getConsole",cx="qx.bom.client.Engine.getVersion",cy="qx.bom.client.Plugin.getQuicktime",cv="qx.propertyDebugLevel",cw="qx.bom.client.Html.getNaturalDimensions",ct="qx.bom.client.Xml.getSelectNodes",cu="qx.bom.client.Xml.getElementsByTagNameNS",cB="qx.bom.client.Html.getDataUrl",cC="qx.bom.client.Flash.isAvailable",bR="qx.bom.client.Html.getCanvas",bQ="qx.bom.client.Css.getBoxModel",bT="qx.bom.client.Plugin.getSilverlight",bS="qx.bom.client.Css.getUserSelect",bV="qx.bom.client.Css.getRadialGradient",bU="module.property",bX="qx.bom.client.Plugin.getWindowsMediaVersion",bW="qx.bom.client.Stylesheet.getCreateStyleSheet",bP='No match for variant "',bO="qx.bom.client.Locale.getLocale",a="module.events",b="module.databinding",c="qx.bom.client.Html.getFileReader",d="qx.bom.client.Css.getBorderImage",e="qx.bom.client.Stylesheet.getDeleteRule",f="qx.bom.client.Plugin.getDivXVersion",g="qx.bom.client.Scroll.scrollBarOverlayed",h="qx.bom.client.Plugin.getPdfVersion",j=":",k="qx.bom.client.Css.getLinearGradient",cN="qx.bom.client.Transport.getXmlHttpRequest",cM="qx.bom.client.Css.getBorderImageSyntax",cL="qx.bom.client.Html.getClassList",cK="qx.bom.client.Event.getHelp",cR="qx.optimization.comments",cQ="qx.bom.client.Locale.getVariant",cP="qx.bom.client.Css.getBoxSizing",cO="qx.bom.client.OperatingSystem.getName",cT="module.logger",cS="qx.bom.client.Css.getOverflowXY",J="qx.mobile.emulatetouch",K="qx.bom.client.Html.getAudioWav",H="qx.bom.client.Browser.getName",I="qx.bom.client.Css.getInlineBlock",N="qx.bom.client.Plugin.getPdf",O="qx.dynlocale",L='" (',M="qx.bom.client.Html.getAudio",F="qx.core.Environment",G="qx.bom.client.CssTransform.getSupport",s="qx.bom.client.Html.getTextContent",r="qx.bom.client.Css.getPlaceholder",u="qx.bom.client.Css.getFloat",t=' in variants [',o="false",n="qx.bom.client.Css.getBoxShadow",q="qx.bom.client.Html.getXul",p="qx.bom.client.Xml.getCreateNode",m="qxenv",l="qx.bom.client.Html.getSessionStorage",T="qx.bom.client.Html.getAudioAu",U="qx.bom.client.Css.getOpacity",V="qx.bom.client.Css.getFilterTextShadow",W="qx.bom.client.Html.getVml",P="qx.bom.client.Css.getRgba",Q="qx.bom.client.Transport.getMaxConcurrentRequestCount",R="qx.bom.client.Css.getBorderRadius",S="qx.bom.client.Event.getPointer",X="qx.bom.client.Transport.getSsl",Y="qx.bom.client.Html.getWebWorker",C="qx.bom.client.Json.getJson",B="qx.bom.client.Browser.getQuirksMode",A="qx.debug.dispose",z="qx.bom.client.Css.getTextOverflow",y="qx.bom.client.Xml.getQualifiedItem",x="qx.bom.client.Html.getVideoOgg",w="&",v="qx.bom.client.Browser.getDocumentMode",E="qx.allowUrlVariants",D="qx.bom.client.Html.getContains",ba="qx.bom.client.Plugin.getActiveX",bb=".",bc="qx.bom.client.Xml.getDomProperties",bd="qx.bom.client.CssAnimation.getSupport",be="qx.debug.databinding",bf="qx.optimization.basecalls",bg="qx.bom.client.Browser.getVersion",bh="qx.bom.client.Css.getUserSelectNone",bi="true",bj="qx.bom.client.Html.getSvg",bx="qx.optimization.privates",bw="qx.bom.client.Plugin.getDivX",bv="qx.bom.client.Runtime.getName",bu="qx.bom.client.Html.getLocalStorage",bB="qx.bom.client.Flash.getStrictSecurityModel",bA="qx.aspects",bz="qx.debug",by="qx.dynamicmousewheel",bD="qx.bom.client.Html.getAudioMp3",bC="qx.bom.client.Engine.getName",bK="qx.bom.client.Html.getUserDataStorage",bL="qx.bom.client.Plugin.getGears",bI="qx.bom.client.Plugin.getQuicktimeVersion",bJ="qx.bom.client.Html.getAudioOgg",bG="qx.bom.client.Css.getTextShadow",bH="qx.bom.client.Plugin.getSilverlightVersion",bE="qx.bom.client.Html.getCompareDocumentPosition",bF="qx.bom.client.Flash.getExpressInstall",bM="qx.bom.client.OperatingSystem.getVersion",bN="qx.bom.client.Html.getXPath",cc="qx.bom.client.Html.getGeoLocation",cb="qx.bom.client.Css.getAppearance",ce="qx.mobile.nativescroll",cd="qx.bom.client.Xml.getDomParser",cg="qx.bom.client.Stylesheet.getAddImport",cf="qx.optimization.variants",ci="qx.bom.client.Html.getVideoWebm",ch="qx.bom.client.Flash.getVersion",ca="qx.bom.client.Css.getLegacyWebkitGradient",bY="qx.bom.client.PhoneGap.getNotification",cG="qx.bom.client.Html.getVideoH264",cH="qx.bom.client.Xml.getCreateElementNS",cI="qx.core.Environment for a list of predefined keys.",cJ=" is not a valid key. Please see the API-doc of ",cD="default",cE="|",cF="qx.allowUrlSettings";qx.Bootstrap.define(F,{statics:{_checks:{},_asyncChecks:{},__e:{},_checksMap:{"engine.version":cx,"engine.name":bC,"browser.name":H,"browser.version":bg,"browser.documentmode":v,"browser.quirksmode":B,"runtime.name":bv,"device.name":bp,"locale":bO,"locale.variant":cQ,"os.name":cO,"os.version":bM,"os.scrollBarOverlayed":g,"plugin.gears":bL,"plugin.activex":ba,"plugin.quicktime":cy,"plugin.quicktime.version":bI,"plugin.windowsmedia":br,"plugin.windowsmedia.version":bX,"plugin.divx":bw,"plugin.divx.version":f,"plugin.silverlight":bT,"plugin.silverlight.version":bH,"plugin.flash":cC,"plugin.flash.version":ch,"plugin.flash.express":bF,"plugin.flash.strictsecurity":bB,"plugin.pdf":N,"plugin.pdf.version":h,"io.maxrequests":Q,"io.ssl":X,"io.xhr":cN,"event.touch":bo,"event.pointer":S,"event.help":cK,"event.hashchange":bs,"ecmascript.stacktrace":bl,"html.webworker":Y,"html.filereader":c,"html.geolocation":cc,"html.audio":M,"html.audio.ogg":bJ,"html.audio.mp3":bD,"html.audio.wav":K,"html.audio.au":T,"html.audio.aif":co,"html.video":bq,"html.video.ogg":x,"html.video.h264":cG,"html.video.webm":ci,"html.storage.local":bu,"html.storage.session":l,"html.storage.userdata":bK,"html.classlist":cL,"html.xpath":bN,"html.xul":q,"html.canvas":bR,"html.svg":bj,"html.vml":W,"html.dataset":cr,"html.dataurl":cB,"html.console":cA,"html.stylesheet.createstylesheet":bW,"html.stylesheet.insertrule":cs,"html.stylesheet.deleterule":e,"html.stylesheet.addimport":cg,"html.stylesheet.removeimport":ck,"html.element.contains":D,"html.element.compareDocumentPosition":bE,"html.element.textcontent":s,"html.image.naturaldimensions":cw,"json":C,"css.textoverflow":z,"css.placeholder":r,"css.borderradius":R,"css.borderimage":d,"css.borderimage.standardsyntax":cM,"css.boxshadow":n,"css.gradient.linear":k,"css.gradient.filter":bt,"css.gradient.radial":bV,"css.gradient.legacywebkit":ca,"css.boxmodel":bQ,"css.rgba":P,"css.userselect":bS,"css.userselect.none":bh,"css.usermodify":cj,"css.appearance":cb,"css.float":u,"css.boxsizing":cP,"css.animation":bd,"css.transform":G,"css.transform.3d":cn,"css.inlineblock":I,"css.opacity":U,"css.overflowxy":cS,"css.textShadow":bG,"css.textShadow.filter":V,"phonegap":cq,"phonegap.notification":bY,"xml.implementation":cz,"xml.domparser":cd,"xml.selectsinglenode":bk,"xml.selectnodes":ct,"xml.getelementsbytagnamens":cu,"xml.domproperties":bc,"xml.attributens":cl,"xml.createnode":p,"xml.getqualifieditem":y,"xml.createelementns":cH},get:function(cU){if(this.__e[cU]!=undefined){return this.__e[cU];}
;var cX=this._checks[cU];if(cX){var cY=cX();this.__e[cU]=cY;return cY;}
;var cW=this._getClassNameFromEnvKey(cU);if(cW[0]!=undefined){var da=cW[0];var cV=cW[1];var cY=da[cV]();this.__e[cU]=cY;return cY;}
;if(qx.Bootstrap.DEBUG){qx.Bootstrap.warn(cU+cJ+cI);qx.Bootstrap.trace(this);}
;}
,_getClassNameFromEnvKey:function(db){var dh=this._checksMap;if(dh[db]!=undefined){var dd=dh[db];var dg=dd.lastIndexOf(bb);if(dg>-1){var df=dd.slice(0,dg);var dc=dd.slice(dg+1);var de=qx.Bootstrap.getByName(df);if(de!=undefined){return [de,dc];}
;}
;}
;return [undefined,undefined];}
,getAsync:function(di,dj,self){var dn=this;if(this.__e[di]!=undefined){window.setTimeout(function(){dj.call(self,dn.__e[di]);}
,0);return;}
;var dm=this._asyncChecks[di];if(dm){dm(function(dq){dn.__e[di]=dq;dj.call(self,dq);}
);return;}
;var dl=this._getClassNameFromEnvKey(di);if(dl[0]!=undefined){var dp=dl[0];var dk=dl[1];dp[dk](function(dr){dn.__e[di]=dr;dj.call(self,dr);}
);return;}
;if(qx.Bootstrap.DEBUG){qx.Bootstrap.warn(di+cJ+cI);qx.Bootstrap.trace(this);}
;}
,select:function(ds,dt){return this.__f(this.get(ds),dt);}
,selectAsync:function(du,dv,self){this.getAsync(du,function(dw){var dx=this.__f(du,dv);dx.call(self,dw);}
,this);}
,__f:function(dy,dz){var dB=dz[dy];if(dz.hasOwnProperty(dy)){return dB;}
;for(var dA in dz){if(dA.indexOf(cE)!=-1){var dC=dA.split(cE);for(var i=0;i<dC.length;i++){if(dC[i]==dy){return dz[dA];}
;}
;}
;}
;if(dz[cD]!==undefined){return dz[cD];}
;if(qx.Bootstrap.DEBUG){throw new Error(bP+dy+L+(typeof dy)+cm+t+qx.Bootstrap.getKeysAsString(dz)+cp);}
;}
,filter:function(dD){var dF=[];for(var dE in dD){if(this.get(dE)){dF.push(dD[dE]);}
;}
;return dF;}
,invalidateCacheKey:function(dG){delete this.__e[dG];}
,add:function(dH,dI){if(this._checks[dH]==undefined){if(dI instanceof Function){this._checks[dH]=dI;}
else {this._checks[dH]=this.__i(dI);}
;}
;}
,addAsync:function(dJ,dK){if(this._checks[dJ]==undefined){this._asyncChecks[dJ]=dK;}
;}
,getChecks:function(){return this._checks;}
,getAsyncChecks:function(){return this._asyncChecks;}
,_initDefaultQxValues:function(){this.add(cF,function(){return false;}
);this.add(E,function(){return false;}
);this.add(cv,function(){return 0;}
);this.add(bz,function(){return true;}
);this.add(bA,function(){return false;}
);this.add(O,function(){return true;}
);this.add(J,function(){return false;}
);this.add(ce,function(){return false;}
);this.add(by,function(){return true;}
);this.add(be,function(){return false;}
);this.add(A,function(){return false;}
);this.add(bf,function(){return false;}
);this.add(cR,function(){return false;}
);this.add(bx,function(){return false;}
);this.add(bn,function(){return false;}
);this.add(bm,function(){return false;}
);this.add(cf,function(){return false;}
);this.add(b,function(){return true;}
);this.add(cT,function(){return true;}
);this.add(bU,function(){return true;}
);this.add(a,function(){return true;}
);}
,__g:function(){if(qx&&qx.$$environment){for(var dM in qx.$$environment){var dL=qx.$$environment[dM];this._checks[dM]=this.__i(dL);}
;}
;}
,__h:function(){if(window.document&&window.document.location){var dN=window.document.location.search.slice(1).split(w);for(var i=0;i<dN.length;i++){var dP=dN[i].split(j);if(dP.length!=3||dP[0]!=m){continue;}
;var dQ=dP[1];var dO=decodeURIComponent(dP[2]);if(dO==bi){dO=true;}
else if(dO==o){dO=false;}
else if(/^(\d|\.)+$/.test(dO)){dO=parseFloat(dO);}
;;this._checks[dQ]=this.__i(dO);}
;}
;}
,__i:function(dR){return qx.Bootstrap.bind(function(dS){return dS;}
,null,dR);}
},defer:function(dT){dT._initDefaultQxValues();dT.__g();if(dT.get(cF)===true){dT.__h();}
;}
});}
)();
(function(){var d="qx.core.Aspect",c="before",b="*",a="static";qx.Bootstrap.define(d,{statics:{__j:[],wrap:function(e,f,g){var m=[];var h=[];var l=this.__j;var k;for(var i=0;i<l.length;i++){k=l[i];if((k.type==null||g==k.type||k.type==b)&&(k.name==null||e.match(k.name))){k.pos==-1?m.push(k.fcn):h.push(k.fcn);}
;}
;if(m.length===0&&h.length===0){return f;}
;var j=function(){for(var i=0;i<m.length;i++){m[i].call(this,e,f,g,arguments);}
;var n=f.apply(this,arguments);for(var i=0;i<h.length;i++){h[i].call(this,e,f,g,arguments,n);}
;return n;}
;if(g!==a){j.self=f.self;j.base=f.base;}
;f.wrapper=j;j.original=f;return j;}
,addAdvice:function(o,p,q,name){this.__j.push({fcn:o,pos:p===c?-1:1,type:q,name:name});}
}});}
)();
(function(){var t='Implementation of method "',s="function",r="Boolean",q="qx.Interface",p='The event "',o='The property "',n="Interface",m="toggle",k="]",j="[Interface ",c="is",h="Array",f='Implementation of member "',b='"',a='" is not supported by Class "',e='" required by interface "',d='" is missing in class "',g='"!';qx.Bootstrap.define(q,{statics:{define:function(name,u){if(u){if(u.extend&&!(qx.Bootstrap.getClass(u.extend)===h)){u.extend=[u.extend];}
;{}
;var v=u.statics?u.statics:{};if(u.extend){v.$$extends=u.extend;}
;if(u.properties){v.$$properties=u.properties;}
;if(u.members){v.$$members=u.members;}
;if(u.events){v.$$events=u.events;}
;}
else {var v={};}
;v.$$type=n;v.name=name;v.toString=this.genericToString;v.basename=qx.Bootstrap.createNamespace(name,v);qx.Interface.$$registry[name]=v;return v;}
,getByName:function(name){return this.$$registry[name];}
,isDefined:function(name){return this.getByName(name)!==undefined;}
,getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);}
,flatten:function(w){if(!w){return [];}
;var x=w.concat();for(var i=0,l=w.length;i<l;i++){if(w[i].$$extends){x.push.apply(x,this.flatten(w[i].$$extends));}
;}
;return x;}
,__k:function(y,z,A,B){var F=A.$$members;if(F){for(var E in F){if(qx.Bootstrap.isFunction(F[E])){var D=this.__l(z,E);var C=D||qx.Bootstrap.isFunction(y[E]);if(!C){throw new Error(t+E+d+z.classname+e+A.name+b);}
;var G=B===true&&!D&&!qx.util.OOUtil.hasInterface(z,A);if(G){y[E]=this.__o(A,y[E],E,F[E]);}
;}
else {if(typeof y[E]===undefined){if(typeof y[E]!==s){throw new Error(f+E+d+z.classname+e+A.name+b);}
;}
;}
;}
;}
;}
,__l:function(H,I){var M=I.match(/^(is|toggle|get|set|reset)(.*)$/);if(!M){return false;}
;var J=qx.Bootstrap.firstLow(M[2]);var K=qx.util.OOUtil.getPropertyDefinition(H,J);if(!K){return false;}
;var L=M[0]==c||M[0]==m;if(L){return qx.util.OOUtil.getPropertyDefinition(H,J).check==r;}
;return true;}
,__m:function(N,O){if(O.$$properties){for(var P in O.$$properties){if(!qx.util.OOUtil.getPropertyDefinition(N,P)){throw new Error(o+P+a+N.classname+g);}
;}
;}
;}
,__n:function(Q,R){if(R.$$events){for(var S in R.$$events){if(!qx.util.OOUtil.supportsEvent(Q,S)){throw new Error(p+S+a+Q.classname+g);}
;}
;}
;}
,assertObject:function(T,U){var W=T.constructor;this.__k(T,W,U,false);this.__m(W,U);this.__n(W,U);var V=U.$$extends;if(V){for(var i=0,l=V.length;i<l;i++){this.assertObject(T,V[i]);}
;}
;}
,assert:function(X,Y,ba){this.__k(X.prototype,X,Y,ba);this.__m(X,Y);this.__n(X,Y);var bb=Y.$$extends;if(bb){for(var i=0,l=bb.length;i<l;i++){this.assert(X,bb[i],ba);}
;}
;}
,genericToString:function(){return j+this.name+k;}
,$$registry:{},__o:function(){}
,__c:null,__d:function(){}
}});}
)();
(function(){var g="qx.lang.Core",f="\\\\",e="\\\"",d='"',c="[object Error]",b="emulated",a="native";qx.Bootstrap.define(g,{statics:{errorToString:{"native":Error.prototype.toString,"emulated":function(){return this.message;}
}[(!Error.prototype.toString||Error.prototype.toString()==c)?b:a],arrayIndexOf:{"native":Array.prototype.indexOf,"emulated":function(h,j){if(j==null){j=0;}
else if(j<0){j=Math.max(0,this.length+j);}
;for(var i=j;i<this.length;i++){if(this[i]===h){return i;}
;}
;return -1;}
}[Array.prototype.indexOf?a:b],arrayLastIndexOf:{"native":Array.prototype.lastIndexOf,"emulated":function(k,m){if(m==null){m=this.length-1;}
else if(m<0){m=Math.max(0,this.length+m);}
;for(var i=m;i>=0;i--){if(this[i]===k){return i;}
;}
;return -1;}
}[Array.prototype.lastIndexOf?a:b],arrayForEach:{"native":Array.prototype.forEach,"emulated":function(n,o){var l=this.length;for(var i=0;i<l;i++){var p=this[i];if(p!==undefined){n.call(o||window,p,i,this);}
;}
;}
}[Array.prototype.forEach?a:b],arrayFilter:{"native":Array.prototype.filter,"emulated":function(q,r){var s=[];var l=this.length;for(var i=0;i<l;i++){var t=this[i];if(t!==undefined){if(q.call(r||window,t,i,this)){s.push(this[i]);}
;}
;}
;return s;}
}[Array.prototype.filter?a:b],arrayMap:{"native":Array.prototype.map,"emulated":function(u,v){var w=[];var l=this.length;for(var i=0;i<l;i++){var x=this[i];if(x!==undefined){w[i]=u.call(v||window,x,i,this);}
;}
;return w;}
}[Array.prototype.map?a:b],arraySome:{"native":Array.prototype.some,"emulated":function(y,z){var l=this.length;for(var i=0;i<l;i++){var A=this[i];if(A!==undefined){if(y.call(z||window,A,i,this)){return true;}
;}
;}
;return false;}
}[Array.prototype.some?a:b],arrayEvery:{"native":Array.prototype.every,"emulated":function(B,C){var l=this.length;for(var i=0;i<l;i++){var D=this[i];if(D!==undefined){if(!B.call(C||window,D,i,this)){return false;}
;}
;}
;return true;}
}[Array.prototype.every?a:b],stringQuote:{"native":String.prototype.quote,"emulated":function(){return d+this.replace(/\\/g,f).replace(/\"/g,e)+d;}
}[String.prototype.quote?a:b]}});if(!Error.prototype.toString||Error.prototype.toString()==c){Error.prototype.toString=qx.lang.Core.errorToString;}
;if(!Array.prototype.indexOf){Array.prototype.indexOf=qx.lang.Core.arrayIndexOf;}
;if(!Array.prototype.lastIndexOf){Array.prototype.lastIndexOf=qx.lang.Core.arrayLastIndexOf;}
;if(!Array.prototype.forEach){Array.prototype.forEach=qx.lang.Core.arrayForEach;}
;if(!Array.prototype.filter){Array.prototype.filter=qx.lang.Core.arrayFilter;}
;if(!Array.prototype.map){Array.prototype.map=qx.lang.Core.arrayMap;}
;if(!Array.prototype.some){Array.prototype.some=qx.lang.Core.arraySome;}
;if(!Array.prototype.every){Array.prototype.every=qx.lang.Core.arrayEvery;}
;if(!String.prototype.quote){String.prototype.quote=qx.lang.Core.stringQuote;}
;}
)();
(function(){var bC='qx.lang.Type.isString(value) && qx.util.ColorUtil.isValidPropertyValue(value)',bB='value !== null && qx.theme.manager.Font.getInstance().isDynamic(value)',bA='value !== null && value.nodeType === 9 && value.documentElement',bz='value !== null && value.$$type === "Mixin"',by='return init;',bx='var init=this.',bw='value !== null && value.nodeType === 1 && value.attributes',bv="var parent = this.getLayoutParent();",bu="Error in property ",bt='qx.core.Assert.assertInstance(value, Date, msg) || true',bi="if (!parent) return;",bh=" in method ",bg='qx.core.Assert.assertInstance(value, Error, msg) || true',bf='Undefined value is not allowed!',be="inherit",bd='Is invalid!',bc="MSIE 6.0",bb="': ",ba=" of class ",Y='value !== null && value.nodeType !== undefined',bJ='value !== null && qx.theme.manager.Decoration.getInstance().isValidPropertyValue(value)',bK="module.events",bH='qx.core.Assert.assertPositiveInteger(value, msg) || true',bI='if(init==qx.core.Property.$$inherit)init=null;',bF='value !== null && value.$$type === "Interface"',bG='var inherit=prop.$$inherit;',bD="var value = parent.",bE="$$useinit_",bL="(value);",bM='Requires exactly one argument!',bm="$$runtime_",bl="$$user_",bo='qx.core.Assert.assertArray(value, msg) || true',bn='qx.core.Assert.assertPositiveNumber(value, msg) || true',bq="Boolean",bp='return value;',bs='if(init==qx.core.Property.$$inherit)throw new Error("Inheritable property ',br='Does not allow any arguments!',bk="()",bj="var a=arguments[0] instanceof Array?arguments[0]:arguments;",b='value !== null && value.$$type === "Theme"',c="())",d='return null;',e='qx.core.Assert.assertObject(value, msg) || true',f='qx.core.Assert.assertString(value, msg) || true',g="if (value===undefined) value = parent.",h='value !== null && value.$$type === "Class"',j='qx.core.Assert.assertFunction(value, msg) || true',k="object",m="$$init_",bQ="$$theme_",bP="Unknown reason: ",bO='qx.core.Assert.assertMap(value, msg) || true',bN='qx.core.Assert.assertNumber(value, msg) || true',bU='Null value is not allowed!',bT='qx.core.Assert.assertInteger(value, msg) || true',bS="rv:1.8.1",bR="shorthand",bW='qx.core.Assert.assertInstance(value, RegExp, msg) || true',bV='value !== null && value.type !== undefined',I='value !== null && value.document',J='throw new Error("Property ',G="(!this.",H='qx.core.Assert.assertBoolean(value, msg) || true',M="toggle",N="$$inherit_",K=" with incoming value '",L="a=qx.lang.Array.fromShortHand(qx.lang.Array.fromArguments(a));",E="qx.core.Property",F="is",u='Could not change or apply init value after constructing phase!',t="();",w='else ',v='if(this.',q="resetRuntime",p="return this.",s="get",r=";",o="(a[",n=' of an instance of ',S="refresh",T=' is not (yet) ready!");',U="]);",V="resetThemed",O='else if(this.',P="reset",Q="setRuntime",R="init",W="set",X="setThemed",D='!==undefined)',C="this.",B="",A='return this.',z="string",y="boolean",x=';';qx.Bootstrap.define(E,{statics:{__p:function(){if(qx.core.Environment.get(bK)){qx.event.type.Data;qx.event.dispatch.Direct;}
;}
,__q:{"Boolean":H,"String":f,"Number":bN,"Integer":bT,"PositiveNumber":bn,"PositiveInteger":bH,"Error":bg,"RegExp":bW,"Object":e,"Array":bo,"Map":bO,"Function":j,"Date":bt,"Node":Y,"Element":bw,"Document":bA,"Window":I,"Event":bV,"Class":h,"Mixin":bz,"Interface":bF,"Theme":b,"Color":bC,"Decorator":bJ,"Font":bB},__r:{"Node":true,"Element":true,"Document":true,"Window":true,"Event":true},$$inherit:be,$$store:{runtime:{},user:{},theme:{},inherit:{},init:{},useinit:{}},$$method:{get:{},set:{},reset:{},init:{},refresh:{},setRuntime:{},resetRuntime:{},setThemed:{},resetThemed:{}},$$allowedKeys:{name:z,dereference:y,inheritable:y,nullable:y,themeable:y,refine:y,init:null,apply:z,event:z,check:null,transform:z,deferredInit:y,validate:null},$$allowedGroupKeys:{name:z,group:k,mode:z,themeable:y},$$inheritable:{},__s:function(bX){var bY=this.__t(bX);if(!bY.length){var ca=function(){}
;}
else {ca=this.__u(bY);}
;bX.prototype.$$refreshInheritables=ca;}
,__t:function(cb){var cd=[];while(cb){var cc=cb.$$properties;if(cc){for(var name in this.$$inheritable){if(cc[name]&&cc[name].inheritable){cd.push(name);}
;}
;}
;cb=cb.superclass;}
;return cd;}
,__u:function(ce){var ci=this.$$store.inherit;var ch=this.$$store.init;var cg=this.$$method.refresh;var cf=[bv,bi];for(var i=0,l=ce.length;i<l;i++){var name=ce[i];cf.push(bD,ci[name],r,g,ch[name],r,C,cg[name],bL);}
;return new Function(cf.join(B));}
,attachRefreshInheritables:function(cj){cj.prototype.$$refreshInheritables=function(){qx.core.Property.__s(cj);return this.$$refreshInheritables();}
;}
,attachMethods:function(ck,name,cl){cl.group?this.__v(ck,cl,name):this.__w(ck,cl,name);}
,__v:function(cm,cn,name){var cu=qx.Bootstrap.firstUp(name);var ct=cm.prototype;var cv=cn.themeable===true;{}
;var cw=[];var cq=[];if(cv){var co=[];var cs=[];}
;var cr=bj;cw.push(cr);if(cv){co.push(cr);}
;if(cn.mode==bR){var cp=L;cw.push(cp);if(cv){co.push(cp);}
;}
;for(var i=0,a=cn.group,l=a.length;i<l;i++){{}
;cw.push(C,this.$$method.set[a[i]],o,i,U);cq.push(C,this.$$method.reset[a[i]],t);if(cv){{}
;co.push(C,this.$$method.setThemed[a[i]],o,i,U);cs.push(C,this.$$method.resetThemed[a[i]],t);}
;}
;this.$$method.set[name]=W+cu;ct[this.$$method.set[name]]=new Function(cw.join(B));this.$$method.reset[name]=P+cu;ct[this.$$method.reset[name]]=new Function(cq.join(B));if(cv){this.$$method.setThemed[name]=X+cu;ct[this.$$method.setThemed[name]]=new Function(co.join(B));this.$$method.resetThemed[name]=V+cu;ct[this.$$method.resetThemed[name]]=new Function(cs.join(B));}
;}
,__w:function(cx,cy,name){var cA=qx.Bootstrap.firstUp(name);var cC=cx.prototype;{}
;if(cy.dereference===undefined&&typeof cy.check===z){cy.dereference=this.__x(cy.check);}
;var cB=this.$$method;var cz=this.$$store;cz.runtime[name]=bm+name;cz.user[name]=bl+name;cz.theme[name]=bQ+name;cz.init[name]=m+name;cz.inherit[name]=N+name;cz.useinit[name]=bE+name;cB.get[name]=s+cA;cC[cB.get[name]]=function(){return qx.core.Property.executeOptimizedGetter(this,cx,name,s);}
;cB.set[name]=W+cA;cC[cB.set[name]]=function(cD){return qx.core.Property.executeOptimizedSetter(this,cx,name,W,arguments);}
;cB.reset[name]=P+cA;cC[cB.reset[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,cx,name,P);}
;if(cy.inheritable||cy.apply||cy.event||cy.deferredInit){cB.init[name]=R+cA;cC[cB.init[name]]=function(cE){return qx.core.Property.executeOptimizedSetter(this,cx,name,R,arguments);}
;}
;if(cy.inheritable){cB.refresh[name]=S+cA;cC[cB.refresh[name]]=function(cF){return qx.core.Property.executeOptimizedSetter(this,cx,name,S,arguments);}
;}
;cB.setRuntime[name]=Q+cA;cC[cB.setRuntime[name]]=function(cG){return qx.core.Property.executeOptimizedSetter(this,cx,name,Q,arguments);}
;cB.resetRuntime[name]=q+cA;cC[cB.resetRuntime[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,cx,name,q);}
;if(cy.themeable){cB.setThemed[name]=X+cA;cC[cB.setThemed[name]]=function(cH){return qx.core.Property.executeOptimizedSetter(this,cx,name,X,arguments);}
;cB.resetThemed[name]=V+cA;cC[cB.resetThemed[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,cx,name,V);}
;}
;if(cy.check===bq){cC[M+cA]=new Function(p+cB.set[name]+G+cB.get[name]+c);cC[F+cA]=new Function(p+cB.get[name]+bk);}
;}
,__x:function(cI){return !!this.__r[cI];}
,__y:function(cJ){return this.__r[cJ]||qx.util.OOUtil.classIsDefined(cJ)||(qx.Interface&&qx.Interface.isDefined(cJ));}
,__z:{'0':u,'1':bM,'2':bf,'3':br,'4':bU,'5':bd},error:function(cK,cL,cM,cN,cO){var cP=cK.constructor.classname;var cQ=bu+cM+ba+cP+bh+this.$$method[cN][cM]+K+cO+bb;throw new Error(cQ+(this.__z[cL]||bP+cL));}
,__A:function(cR,cS,name,cT,cU,cV){var cW=this.$$method[cT][name];cS[cW]=new Function("value",cU.join(""));if(qx.core.Environment.get("qx.aspects")){cS[cW]=qx.core.Aspect.wrap(cR.classname+"."+cW,cS[cW],"property");}
;qx.Bootstrap.setDisplayName(cS[cW],cR.classname+".prototype",cW);if(cV===undefined){return cR[cW]();}
else return cR[cW](cV[0]);;}
,executeOptimizedGetter:function(cX,cY,name,da){var dc=cY.$$properties[name];var de=cY.prototype;var db=[];var dd=this.$$store;db.push(v,dd.runtime[name],D);db.push(A,dd.runtime[name],x);if(dc.inheritable){db.push(O,dd.inherit[name],D);db.push(A,dd.inherit[name],x);db.push(w);}
;db.push(v,dd.user[name],D);db.push(A,dd.user[name],x);if(dc.themeable){db.push(O,dd.theme[name],D);db.push(A,dd.theme[name],x);}
;if(dc.deferredInit&&dc.init===undefined){db.push(O,dd.init[name],D);db.push(A,dd.init[name],x);}
;db.push(w);if(dc.init!==undefined){if(dc.inheritable){db.push(bx,dd.init[name],x);if(dc.nullable){db.push(bI);}
else if(dc.init!==undefined){db.push(A,dd.init[name],x);}
else {db.push(bs,name,n,cY.classname,T);}
;db.push(by);}
else {db.push(A,dd.init[name],x);}
;}
else if(dc.inheritable||dc.nullable){db.push(d);}
else {db.push(J,name,n,cY.classname,T);}
;return this.__A(cX,de,name,da,db);}
,executeOptimizedSetter:function(df,dg,name,dh,di){var dn=dg.$$properties[name];var dm=dg.prototype;var dk=[];var dj=dh===W||dh===X||dh===Q||(dh===R&&dn.init===undefined);var dl=dn.apply||dn.event||dn.inheritable;var dp=this.__B(dh,name);this.__C(dk,dn,name,dh,dj);if(dj){this.__D(dk,dg,dn,name);}
;if(dl){this.__E(dk,dj,dp,dh);}
;if(dn.inheritable){dk.push(bG);}
;{}
;if(!dl){this.__G(dk,name,dh,dj);}
else {this.__H(dk,dn,name,dh,dj);}
;if(dn.inheritable){this.__I(dk,dn,name,dh);}
else if(dl){this.__J(dk,dn,name,dh);}
;if(dl){this.__K(dk,dn,name);if(dn.inheritable&&dm._getChildren){this.__L(dk,name);}
;}
;if(dj){dk.push(bp);}
;return this.__A(df,dm,name,dh,dk,di);}
,__B:function(dq,name){if(dq==="setRuntime"||dq==="resetRuntime"){var dr=this.$$store.runtime[name];}
else if(dq==="setThemed"||dq==="resetThemed"){dr=this.$$store.theme[name];}
else if(dq==="init"){dr=this.$$store.init[name];}
else {dr=this.$$store.user[name];}
;;return dr;}
,__C:function(ds,dt,name,du,dv){if(!dt.nullable||dt.check||dt.inheritable){ds.push('var prop=qx.core.Property;');}
;if(du==="set"){ds.push('if(value===undefined)prop.error(this,2,"',name,'","',du,'",value);');}
;}
,__D:function(dw,dx,dy,name){if(dy.transform){dw.push('value=this.',dy.transform,'(value);');}
;if(dy.validate){if(typeof dy.validate==="string"){dw.push('this.',dy.validate,'(value);');}
else if(dy.validate instanceof Function){dw.push(dx.classname,'.$$properties.',name);dw.push('.validate.call(this, value);');}
;}
;}
,__E:function(dz,dA,dB,dC){var dD=(dC==="reset"||dC==="resetThemed"||dC==="resetRuntime");if(dA){dz.push('if(this.',dB,'===value)return value;');}
else if(dD){dz.push('if(this.',dB,'===undefined)return;');}
;}
,__F:undefined,__G:function(dE,name,dF,dG){if(dF==="setRuntime"){dE.push('this.',this.$$store.runtime[name],'=value;');}
else if(dF==="resetRuntime"){dE.push('if(this.',this.$$store.runtime[name],'!==undefined)');dE.push('delete this.',this.$$store.runtime[name],';');}
else if(dF==="set"){dE.push('this.',this.$$store.user[name],'=value;');}
else if(dF==="reset"){dE.push('if(this.',this.$$store.user[name],'!==undefined)');dE.push('delete this.',this.$$store.user[name],';');}
else if(dF==="setThemed"){dE.push('this.',this.$$store.theme[name],'=value;');}
else if(dF==="resetThemed"){dE.push('if(this.',this.$$store.theme[name],'!==undefined)');dE.push('delete this.',this.$$store.theme[name],';');}
else if(dF==="init"&&dG){dE.push('this.',this.$$store.init[name],'=value;');}
;;;;;;}
,__H:function(dH,dI,name,dJ,dK){if(dI.inheritable){dH.push('var computed, old=this.',this.$$store.inherit[name],';');}
else {dH.push('var computed, old;');}
;dH.push('if(this.',this.$$store.runtime[name],'!==undefined){');if(dJ==="setRuntime"){dH.push('computed=this.',this.$$store.runtime[name],'=value;');}
else if(dJ==="resetRuntime"){dH.push('delete this.',this.$$store.runtime[name],';');dH.push('if(this.',this.$$store.user[name],'!==undefined)');dH.push('computed=this.',this.$$store.user[name],';');dH.push('else if(this.',this.$$store.theme[name],'!==undefined)');dH.push('computed=this.',this.$$store.theme[name],';');dH.push('else if(this.',this.$$store.init[name],'!==undefined){');dH.push('computed=this.',this.$$store.init[name],';');dH.push('this.',this.$$store.useinit[name],'=true;');dH.push('}');}
else {dH.push('old=computed=this.',this.$$store.runtime[name],';');if(dJ==="set"){dH.push('this.',this.$$store.user[name],'=value;');}
else if(dJ==="reset"){dH.push('delete this.',this.$$store.user[name],';');}
else if(dJ==="setThemed"){dH.push('this.',this.$$store.theme[name],'=value;');}
else if(dJ==="resetThemed"){dH.push('delete this.',this.$$store.theme[name],';');}
else if(dJ==="init"&&dK){dH.push('this.',this.$$store.init[name],'=value;');}
;;;;}
;dH.push('}');dH.push('else if(this.',this.$$store.user[name],'!==undefined){');if(dJ==="set"){if(!dI.inheritable){dH.push('old=this.',this.$$store.user[name],';');}
;dH.push('computed=this.',this.$$store.user[name],'=value;');}
else if(dJ==="reset"){if(!dI.inheritable){dH.push('old=this.',this.$$store.user[name],';');}
;dH.push('delete this.',this.$$store.user[name],';');dH.push('if(this.',this.$$store.runtime[name],'!==undefined)');dH.push('computed=this.',this.$$store.runtime[name],';');dH.push('if(this.',this.$$store.theme[name],'!==undefined)');dH.push('computed=this.',this.$$store.theme[name],';');dH.push('else if(this.',this.$$store.init[name],'!==undefined){');dH.push('computed=this.',this.$$store.init[name],';');dH.push('this.',this.$$store.useinit[name],'=true;');dH.push('}');}
else {if(dJ==="setRuntime"){dH.push('computed=this.',this.$$store.runtime[name],'=value;');}
else if(dI.inheritable){dH.push('computed=this.',this.$$store.user[name],';');}
else {dH.push('old=computed=this.',this.$$store.user[name],';');}
;if(dJ==="setThemed"){dH.push('this.',this.$$store.theme[name],'=value;');}
else if(dJ==="resetThemed"){dH.push('delete this.',this.$$store.theme[name],';');}
else if(dJ==="init"&&dK){dH.push('this.',this.$$store.init[name],'=value;');}
;;}
;dH.push('}');if(dI.themeable){dH.push('else if(this.',this.$$store.theme[name],'!==undefined){');if(!dI.inheritable){dH.push('old=this.',this.$$store.theme[name],';');}
;if(dJ==="setRuntime"){dH.push('computed=this.',this.$$store.runtime[name],'=value;');}
else if(dJ==="set"){dH.push('computed=this.',this.$$store.user[name],'=value;');}
else if(dJ==="setThemed"){dH.push('computed=this.',this.$$store.theme[name],'=value;');}
else if(dJ==="resetThemed"){dH.push('delete this.',this.$$store.theme[name],';');dH.push('if(this.',this.$$store.init[name],'!==undefined){');dH.push('computed=this.',this.$$store.init[name],';');dH.push('this.',this.$$store.useinit[name],'=true;');dH.push('}');}
else if(dJ==="init"){if(dK){dH.push('this.',this.$$store.init[name],'=value;');}
;dH.push('computed=this.',this.$$store.theme[name],';');}
else if(dJ==="refresh"){dH.push('computed=this.',this.$$store.theme[name],';');}
;;;;;dH.push('}');}
;dH.push('else if(this.',this.$$store.useinit[name],'){');if(!dI.inheritable){dH.push('old=this.',this.$$store.init[name],';');}
;if(dJ==="init"){if(dK){dH.push('computed=this.',this.$$store.init[name],'=value;');}
else {dH.push('computed=this.',this.$$store.init[name],';');}
;}
else if(dJ==="set"||dJ==="setRuntime"||dJ==="setThemed"||dJ==="refresh"){dH.push('delete this.',this.$$store.useinit[name],';');if(dJ==="setRuntime"){dH.push('computed=this.',this.$$store.runtime[name],'=value;');}
else if(dJ==="set"){dH.push('computed=this.',this.$$store.user[name],'=value;');}
else if(dJ==="setThemed"){dH.push('computed=this.',this.$$store.theme[name],'=value;');}
else if(dJ==="refresh"){dH.push('computed=this.',this.$$store.init[name],';');}
;;;}
;dH.push('}');if(dJ==="set"||dJ==="setRuntime"||dJ==="setThemed"||dJ==="init"){dH.push('else{');if(dJ==="setRuntime"){dH.push('computed=this.',this.$$store.runtime[name],'=value;');}
else if(dJ==="set"){dH.push('computed=this.',this.$$store.user[name],'=value;');}
else if(dJ==="setThemed"){dH.push('computed=this.',this.$$store.theme[name],'=value;');}
else if(dJ==="init"){if(dK){dH.push('computed=this.',this.$$store.init[name],'=value;');}
else {dH.push('computed=this.',this.$$store.init[name],';');}
;dH.push('this.',this.$$store.useinit[name],'=true;');}
;;;dH.push('}');}
;}
,__I:function(dL,dM,name,dN){dL.push('if(computed===undefined||computed===inherit){');if(dN==="refresh"){dL.push('computed=value;');}
else {dL.push('var pa=this.getLayoutParent();if(pa)computed=pa.',this.$$store.inherit[name],';');}
;dL.push('if((computed===undefined||computed===inherit)&&');dL.push('this.',this.$$store.init[name],'!==undefined&&');dL.push('this.',this.$$store.init[name],'!==inherit){');dL.push('computed=this.',this.$$store.init[name],';');dL.push('this.',this.$$store.useinit[name],'=true;');dL.push('}else{');dL.push('delete this.',this.$$store.useinit[name],';}');dL.push('}');dL.push('if(old===computed)return value;');dL.push('if(computed===inherit){');dL.push('computed=undefined;delete this.',this.$$store.inherit[name],';');dL.push('}');dL.push('else if(computed===undefined)');dL.push('delete this.',this.$$store.inherit[name],';');dL.push('else this.',this.$$store.inherit[name],'=computed;');dL.push('var backup=computed;');if(dM.init!==undefined&&dN!=="init"){dL.push('if(old===undefined)old=this.',this.$$store.init[name],";");}
else {dL.push('if(old===undefined)old=null;');}
;dL.push('if(computed===undefined||computed==inherit)computed=null;');}
,__J:function(dO,dP,name,dQ){if(dQ!=="set"&&dQ!=="setRuntime"&&dQ!=="setThemed"){dO.push('if(computed===undefined)computed=null;');}
;dO.push('if(old===computed)return value;');if(dP.init!==undefined&&dQ!=="init"){dO.push('if(old===undefined)old=this.',this.$$store.init[name],";");}
else {dO.push('if(old===undefined)old=null;');}
;}
,__K:function(dR,dS,name){if(dS.apply){dR.push('this.',dS.apply,'(computed, old, "',name,'");');}
;if(dS.event){dR.push("var reg=qx.event.Registration;","if(reg.hasListener(this, '",dS.event,"')){","reg.fireEvent(this, '",dS.event,"', qx.event.type.Data, [computed, old]",")}");}
;}
,__L:function(dT,name){dT.push('var a=this._getChildren();if(a)for(var i=0,l=a.length;i<l;i++){');dT.push('if(a[i].',this.$$method.refresh[name],')a[i].',this.$$method.refresh[name],'(backup);');dT.push('}');}
},defer:function(dU){var dW=navigator.userAgent.indexOf(bc)!=-1;var dV=navigator.userAgent.indexOf(bS)!=-1;if(dW||dV){dU.__x=dU.__y;}
;}
});}
)();
(function(){var k="[Class ",j="]",h="constructor",g="extend",f="qx.Class",e="qx.aspects",d="Array",c=".",b="static";qx.Bootstrap.define(f,{statics:{__M:qx.core.Environment.get("module.property")?qx.core.Property:null,define:function(name,m){if(!m){var m={};}
;if(m.include&&!(qx.Bootstrap.getClass(m.include)===d)){m.include=[m.include];}
;if(m.implement&&!(qx.Bootstrap.getClass(m.implement)===d)){m.implement=[m.implement];}
;var n=false;if(!m.hasOwnProperty(g)&&!m.type){m.type=b;n=true;}
;{}
;var o=this.__P(name,m.type,m.extend,m.statics,m.construct,m.destruct,m.include);if(m.extend){if(m.properties){this.__R(o,m.properties,true);}
;if(m.members){this.__T(o,m.members,true,true,false);}
;if(m.events){this.__Q(o,m.events,true);}
;if(m.include){for(var i=0,l=m.include.length;i<l;i++){this.__X(o,m.include[i],false);}
;}
;}
;if(m.environment){for(var p in m.environment){qx.core.Environment.add(p,m.environment[p]);}
;}
;if(m.implement){for(var i=0,l=m.implement.length;i<l;i++){this.__V(o,m.implement[i]);}
;}
;{}
;if(m.defer){m.defer.self=o;m.defer(o,o.prototype,{add:function(name,q){var r={};r[name]=q;qx.Class.__R(o,r,true);}
});}
;return o;}
,undefine:function(name){delete this.$$registry[name];var s=name.split(c);var u=[window];for(var i=0;i<s.length;i++){u.push(u[i][s[i]]);}
;for(var i=u.length-1;i>=1;i--){var t=u[i];var parent=u[i-1];if(qx.Bootstrap.isFunction(t)||qx.Bootstrap.objectGetLength(t)===0){delete parent[s[i-1]];}
else {break;}
;}
;}
,isDefined:qx.util.OOUtil.classIsDefined,getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);}
,getByName:qx.Bootstrap.getByName,include:function(v,w){{}
;qx.Class.__X(v,w,false);}
,patch:function(x,y){{}
;qx.Class.__X(x,y,true);}
,isSubClassOf:function(z,A){if(!z){return false;}
;if(z==A){return true;}
;if(z.prototype instanceof A){return true;}
;return false;}
,getPropertyDefinition:qx.util.OOUtil.getPropertyDefinition,getProperties:function(B){var C=[];while(B){if(B.$$properties){C.push.apply(C,qx.Bootstrap.getKeys(B.$$properties));}
;B=B.superclass;}
;return C;}
,getByProperty:function(D,name){while(D){if(D.$$properties&&D.$$properties[name]){return D;}
;D=D.superclass;}
;return null;}
,hasProperty:qx.util.OOUtil.hasProperty,getEventType:qx.util.OOUtil.getEventType,supportsEvent:qx.util.OOUtil.supportsEvent,hasOwnMixin:function(E,F){return E.$$includes&&E.$$includes.indexOf(F)!==-1;}
,getByMixin:function(G,H){var I,i,l;while(G){if(G.$$includes){I=G.$$flatIncludes;for(i=0,l=I.length;i<l;i++){if(I[i]===H){return G;}
;}
;}
;G=G.superclass;}
;return null;}
,getMixins:qx.util.OOUtil.getMixins,hasMixin:function(J,K){return !!this.getByMixin(J,K);}
,hasOwnInterface:function(L,M){return L.$$implements&&L.$$implements.indexOf(M)!==-1;}
,getByInterface:qx.util.OOUtil.getByInterface,getInterfaces:function(N){var O=[];while(N){if(N.$$implements){O.push.apply(O,N.$$flatImplements);}
;N=N.superclass;}
;return O;}
,hasInterface:qx.util.OOUtil.hasInterface,implementsInterface:function(P,Q){var R=P.constructor;if(this.hasInterface(R,Q)){return true;}
;try{qx.Interface.assertObject(P,Q);return true;}
catch(S){}
;try{qx.Interface.assert(R,Q,false);return true;}
catch(T){}
;return false;}
,getInstance:function(){if(!this.$$instance){this.$$allowconstruct=true;this.$$instance=new this;delete this.$$allowconstruct;}
;return this.$$instance;}
,genericToString:function(){return k+this.classname+j;}
,$$registry:qx.Bootstrap.$$registry,__c:null,__N:null,__d:function(){}
,__O:function(){}
,__P:function(name,U,V,W,X,Y,ba){var bd;if(!V&&qx.core.Environment.get("qx.aspects")==false){bd=W||{};qx.Bootstrap.setDisplayNames(bd,name);}
else {var bd={};if(V){if(!X){X=this.__Y();}
;if(this.__bb(V,ba)){bd=this.__bc(X,name,U);}
else {bd=X;}
;if(U==="singleton"){bd.getInstance=this.getInstance;}
;qx.Bootstrap.setDisplayName(X,name,"constructor");}
;if(W){qx.Bootstrap.setDisplayNames(W,name);var be;for(var i=0,a=qx.Bootstrap.getKeys(W),l=a.length;i<l;i++){be=a[i];var bb=W[be];if(qx.core.Environment.get("qx.aspects")){if(bb instanceof Function){bb=qx.core.Aspect.wrap(name+"."+be,bb,"static");}
;bd[be]=bb;}
else {bd[be]=bb;}
;}
;}
;}
;var bc=qx.Bootstrap.createNamespace(name,bd);bd.name=bd.classname=name;bd.basename=bc;bd.$$type="Class";if(U){bd.$$classtype=U;}
;if(!bd.hasOwnProperty("toString")){bd.toString=this.genericToString;}
;if(V){qx.Bootstrap.extendClass(bd,X,V,name,bc);if(Y){if(qx.core.Environment.get("qx.aspects")){Y=qx.core.Aspect.wrap(name,Y,"destructor");}
;bd.$$destructor=Y;qx.Bootstrap.setDisplayName(Y,name,"destruct");}
;}
;this.$$registry[name]=bd;return bd;}
,__Q:function(bf,bg,bh){var bi,bi;{}
;if(bf.$$events){for(var bi in bg){bf.$$events[bi]=bg[bi];}
;}
else {bf.$$events=bg;}
;}
,__R:function(bj,bk,bl){if(!qx.core.Environment.get("module.property")){throw new Error("Property module disabled.");}
;var bm;if(bl===undefined){bl=false;}
;var bn=bj.prototype;for(var name in bk){bm=bk[name];{}
;bm.name=name;if(!bm.refine){if(bj.$$properties===undefined){bj.$$properties={};}
;bj.$$properties[name]=bm;}
;if(bm.init!==undefined){bj.prototype["$$init_"+name]=bm.init;}
;if(bm.event!==undefined){if(!qx.core.Environment.get("module.events")){throw new Error("Events module not enabled.");}
;var event={};event[bm.event]="qx.event.type.Data";this.__Q(bj,event,bl);}
;if(bm.inheritable){this.__M.$$inheritable[name]=true;if(!bn.$$refreshInheritables){this.__M.attachRefreshInheritables(bj);}
;}
;if(!bm.refine){this.__M.attachMethods(bj,name,bm);}
;}
;}
,__S:null,__T:function(bo,bp,bq,br,bs){var bt=bo.prototype;var bv,bu;qx.Bootstrap.setDisplayNames(bp,bo.classname+".prototype");for(var i=0,a=qx.Bootstrap.getKeys(bp),l=a.length;i<l;i++){bv=a[i];bu=bp[bv];{}
;if(br!==false&&bu instanceof Function&&bu.$$type==null){if(bs==true){bu=this.__U(bu,bt[bv]);}
else {if(bt[bv]){bu.base=bt[bv];}
;bu.self=bo;}
;if(qx.core.Environment.get("qx.aspects")){bu=qx.core.Aspect.wrap(bo.classname+"."+bv,bu,"member");}
;}
;bt[bv]=bu;}
;}
,__U:function(bw,bx){if(bx){return function(){var bz=bw.base;bw.base=bx;var by=bw.apply(this,arguments);bw.base=bz;return by;}
;}
else {return bw;}
;}
,__V:function(bA,bB){{}
;var bC=qx.Interface.flatten([bB]);if(bA.$$implements){bA.$$implements.push(bB);bA.$$flatImplements.push.apply(bA.$$flatImplements,bC);}
else {bA.$$implements=[bB];bA.$$flatImplements=bC;}
;}
,__W:function(bD){var name=bD.classname;var bE=this.__bc(bD,name,bD.$$classtype);for(var i=0,a=qx.Bootstrap.getKeys(bD),l=a.length;i<l;i++){bF=a[i];bE[bF]=bD[bF];}
;bE.prototype=bD.prototype;var bH=bD.prototype;for(var i=0,a=qx.Bootstrap.getKeys(bH),l=a.length;i<l;i++){bF=a[i];var bI=bH[bF];if(bI&&bI.self==bD){bI.self=bE;}
;}
;for(var bF in this.$$registry){var bG=this.$$registry[bF];if(!bG){continue;}
;if(bG.base==bD){bG.base=bE;}
;if(bG.superclass==bD){bG.superclass=bE;}
;if(bG.$$original){if(bG.$$original.base==bD){bG.$$original.base=bE;}
;if(bG.$$original.superclass==bD){bG.$$original.superclass=bE;}
;}
;}
;qx.Bootstrap.createNamespace(name,bE);this.$$registry[name]=bE;return bE;}
,__X:function(bJ,bK,bL){{}
;if(this.hasMixin(bJ,bK)){return;}
;var bO=bJ.$$original;if(bK.$$constructor&&!bO){bJ=this.__W(bJ);}
;var bN=qx.Mixin.flatten([bK]);var bM;for(var i=0,l=bN.length;i<l;i++){bM=bN[i];if(bM.$$events){this.__Q(bJ,bM.$$events,bL);}
;if(bM.$$properties){this.__R(bJ,bM.$$properties,bL);}
;if(bM.$$members){this.__T(bJ,bM.$$members,bL,bL,bL);}
;}
;if(bJ.$$includes){bJ.$$includes.push(bK);bJ.$$flatIncludes.push.apply(bJ.$$flatIncludes,bN);}
else {bJ.$$includes=[bK];bJ.$$flatIncludes=bN;}
;}
,__Y:function(){function bP(){bP.base.apply(this,arguments);}
;return bP;}
,__ba:function(){return function(){}
;}
,__bb:function(bQ,bR){{}
;if(bQ&&bQ.$$includes){var bS=bQ.$$flatIncludes;for(var i=0,l=bS.length;i<l;i++){if(bS[i].$$constructor){return true;}
;}
;}
;if(bR){var bT=qx.Mixin.flatten(bR);for(var i=0,l=bT.length;i<l;i++){if(bT[i].$$constructor){return true;}
;}
;}
;return false;}
,__bc:function(bU,name,bV){var bX=function(){var cb=bX;{}
;var ca=cb.$$original.apply(this,arguments);if(cb.$$includes){var bY=cb.$$flatIncludes;for(var i=0,l=bY.length;i<l;i++){if(bY[i].$$constructor){bY[i].$$constructor.apply(this,arguments);}
;}
;}
;{}
;return ca;}
;if(qx.core.Environment.get(e)){var bW=qx.core.Aspect.wrap(name,bX,h);bX.$$original=bU;bX.constructor=bW;bX=bW;}
;bX.$$original=bU;bU.wrapper=bX;return bX;}
},defer:function(){if(qx.core.Environment.get(e)){for(var cc in qx.Bootstrap.$$registry){var cd=qx.Bootstrap.$$registry[cc];for(var ce in cd){if(cd[ce] instanceof Function){cd[ce]=qx.core.Aspect.wrap(cc+c+ce,cd[ce],b);}
;}
;}
;}
;}
});}
)();
(function(){var k="join",j="toLocaleUpperCase",h="shift",g="substr",f="filter",e="unshift",d="match",c="quote",b="qx.lang.Generics",a="localeCompare",I="sort",H="some",G="charAt",F="split",E="substring",D="pop",C="toUpperCase",B="replace",A="push",z="charCodeAt",t="every",u="reverse",q="search",r="forEach",o="map",p="toLowerCase",m="splice",n="toLocaleLowerCase",v="indexOf",w="lastIndexOf",y="slice",x="concat";qx.Class.define(b,{statics:{__bd:{"Array":[k,u,I,A,D,h,e,m,x,y,v,w,r,o,f,H,t],"String":[c,E,p,C,G,z,v,w,n,j,a,d,q,B,F,g,x,y]},__be:function(J,K){return function(s){return J.prototype[K].apply(s,Array.prototype.slice.call(arguments,1));}
;}
,__bf:function(){var L=qx.lang.Generics.__bd;for(var P in L){var N=window[P];var M=L[P];for(var i=0,l=M.length;i<l;i++){var O=M[i];if(!N[O]){N[O]=qx.lang.Generics.__be(N,O);}
;}
;}
;}
},defer:function(Q){Q.__bf();}
});}
)();
(function(){var a="qx.data.MBinding";qx.Mixin.define(a,{members:{bind:function(b,c,d,e){return qx.data.SingleValueBinding.bind(this,b,c,d,e);}
,removeBinding:function(f){qx.data.SingleValueBinding.removeBindingFromObject(this,f);}
,removeAllBindings:function(){qx.data.SingleValueBinding.removeAllBindingsForObject(this);}
,getBindings:function(){return qx.data.SingleValueBinding.getAllBindingsForObject(this);}
}});}
)();
(function(){var m="Boolean",l=") to the object '",k="Please use only one array at a time: ",h="Integer",g=" of object ",f="qx.data.SingleValueBinding",d="No number or 'last' value hast been given",c="Binding property ",b="Binding could not be found!",a="Binding from '",M="PositiveNumber",L="PositiveInteger",K="Binding does not exist!",J=" in an array binding: ",I=").",H="Date",G=" not possible: No event available. ",F=". Error message: ",E="set",D="deepBinding",u="item",v="reset",s="Failed so set value ",t=" does not work.",q="' (",r=" on ",n="String",p="Number",w="change",x="]",z=".",y="last",B="[",A="",C="get";qx.Class.define(f,{statics:{__bg:{},bind:function(N,O,P,Q,R){var bd=this.__bi(N,O,P,Q,R);var X=O.split(z);var T=this.__bo(X);var bc=[];var Y=[];var ba=[];var V=[];var W=N;try{for(var i=0;i<X.length;i++){if(T[i]!==A){V.push(w);}
else {V.push(this.__bj(W,X[i]));}
;bc[i]=W;if(i==X.length-1){if(T[i]!==A){var bh=T[i]===y?W.length-1:T[i];var S=W.getItem(bh);this.__bn(S,P,Q,R,N);ba[i]=this.__bp(W,V[i],P,Q,R,T[i]);}
else {if(X[i]!=null&&W[C+qx.lang.String.firstUp(X[i])]!=null){var S=W[C+qx.lang.String.firstUp(X[i])]();this.__bn(S,P,Q,R,N);}
;ba[i]=this.__bp(W,V[i],P,Q,R);}
;}
else {var be={index:i,propertyNames:X,sources:bc,listenerIds:ba,arrayIndexValues:T,targetObject:P,targetPropertyChain:Q,options:R,listeners:Y};var bb=qx.lang.Function.bind(this.__bh,this,be);Y.push(bb);ba[i]=W.addListener(V[i],bb);}
;if(W[C+qx.lang.String.firstUp(X[i])]==null){W=null;}
else if(T[i]!==A){W=W[C+qx.lang.String.firstUp(X[i])](T[i]);}
else {W=W[C+qx.lang.String.firstUp(X[i])]();}
;if(!W){break;}
;}
;}
catch(bi){for(var i=0;i<bc.length;i++){if(bc[i]&&ba[i]){bc[i].removeListenerById(ba[i]);}
;}
;var bg=bd.targets;var U=bd.listenerIds[i];for(var i=0;i<bg.length;i++){if(bg[i]&&U[i]){bg[i].removeListenerById(U[i]);}
;}
;throw bi;}
;var bf={type:D,listenerIds:ba,sources:bc,targetListenerIds:bd.listenerIds,targets:bd.targets};this.__bq(bf,N,O,P,Q);return bf;}
,__bh:function(bj){if(bj.options&&bj.options.onUpdate){bj.options.onUpdate(bj.sources[bj.index],bj.targetObject);}
;for(var j=bj.index+1;j<bj.propertyNames.length;j++){var bn=bj.sources[j];bj.sources[j]=null;if(!bn){continue;}
;bn.removeListenerById(bj.listenerIds[j]);}
;var bn=bj.sources[bj.index];for(var j=bj.index+1;j<bj.propertyNames.length;j++){if(bj.arrayIndexValues[j-1]!==A){bn=bn[C+qx.lang.String.firstUp(bj.propertyNames[j-1])](bj.arrayIndexValues[j-1]);}
else {bn=bn[C+qx.lang.String.firstUp(bj.propertyNames[j-1])]();}
;bj.sources[j]=bn;if(!bn){this.__bk(bj.targetObject,bj.targetPropertyChain);break;}
;if(j==bj.propertyNames.length-1){if(qx.Class.implementsInterface(bn,qx.data.IListData)){var bo=bj.arrayIndexValues[j]===y?bn.length-1:bj.arrayIndexValues[j];var bl=bn.getItem(bo);this.__bn(bl,bj.targetObject,bj.targetPropertyChain,bj.options,bj.sources[bj.index]);bj.listenerIds[j]=this.__bp(bn,w,bj.targetObject,bj.targetPropertyChain,bj.options,bj.arrayIndexValues[j]);}
else {if(bj.propertyNames[j]!=null&&bn[C+qx.lang.String.firstUp(bj.propertyNames[j])]!=null){var bl=bn[C+qx.lang.String.firstUp(bj.propertyNames[j])]();this.__bn(bl,bj.targetObject,bj.targetPropertyChain,bj.options,bj.sources[bj.index]);}
;var bm=this.__bj(bn,bj.propertyNames[j]);bj.listenerIds[j]=this.__bp(bn,bm,bj.targetObject,bj.targetPropertyChain,bj.options);}
;}
else {if(bj.listeners[j]==null){var bk=qx.lang.Function.bind(this.__bh,this,bj);bj.listeners.push(bk);}
;if(qx.Class.implementsInterface(bn,qx.data.IListData)){var bm=w;}
else {var bm=this.__bj(bn,bj.propertyNames[j]);}
;bj.listenerIds[j]=bn.addListener(bm,bj.listeners[j]);}
;}
;}
,__bi:function(bp,bq,br,bs,bt){var bx=bs.split(z);var bv=this.__bo(bx);var bC=[];var bB=[];var bz=[];var by=[];var bw=br;for(var i=0;i<bx.length-1;i++){if(bv[i]!==A){by.push(w);}
else {try{by.push(this.__bj(bw,bx[i]));}
catch(e){break;}
;}
;bC[i]=bw;var bA=function(){for(var j=i+1;j<bx.length-1;j++){var bF=bC[j];bC[j]=null;if(!bF){continue;}
;bF.removeListenerById(bz[j]);}
;var bF=bC[i];for(var j=i+1;j<bx.length-1;j++){var bD=qx.lang.String.firstUp(bx[j-1]);if(bv[j-1]!==A){var bG=bv[j-1]===y?bF.getLength()-1:bv[j-1];bF=bF[C+bD](bG);}
else {bF=bF[C+bD]();}
;bC[j]=bF;if(bB[j]==null){bB.push(bA);}
;if(qx.Class.implementsInterface(bF,qx.data.IListData)){var bE=w;}
else {try{var bE=qx.data.SingleValueBinding.__bj(bF,bx[j]);}
catch(e){break;}
;}
;bz[j]=bF.addListener(bE,bB[j]);}
;qx.data.SingleValueBinding.updateTarget(bp,bq,br,bs,bt);}
;bB.push(bA);bz[i]=bw.addListener(by[i],bA);var bu=qx.lang.String.firstUp(bx[i]);if(bw[C+bu]==null){bw=null;}
else if(bv[i]!==A){bw=bw[C+bu](bv[i]);}
else {bw=bw[C+bu]();}
;if(!bw){break;}
;}
;return {listenerIds:bz,targets:bC};}
,updateTarget:function(bH,bI,bJ,bK,bL){var bM=this.getValueFromObject(bH,bI);bM=qx.data.SingleValueBinding.__br(bM,bJ,bK,bL,bH);this.__bl(bJ,bK,bM);}
,getValueFromObject:function(o,bN){var bR=this.__bm(o,bN);var bP;if(bR!=null){var bT=bN.substring(bN.lastIndexOf(z)+1,bN.length);if(bT.charAt(bT.length-1)==x){var bO=bT.substring(bT.lastIndexOf(B)+1,bT.length-1);var bQ=bT.substring(0,bT.lastIndexOf(B));var bS=bR[C+qx.lang.String.firstUp(bQ)]();if(bO==y){bO=bS.length-1;}
;if(bS!=null){bP=bS.getItem(bO);}
;}
else {bP=bR[C+qx.lang.String.firstUp(bT)]();}
;}
;return bP;}
,__bj:function(bU,bV){var bW=this.__bs(bU,bV);if(bW==null){if(qx.Class.supportsEvent(bU.constructor,bV)){bW=bV;}
else if(qx.Class.supportsEvent(bU.constructor,w+qx.lang.String.firstUp(bV))){bW=w+qx.lang.String.firstUp(bV);}
else {throw new qx.core.AssertionError(c+bV+g+bU+G);}
;}
;return bW;}
,__bk:function(bX,bY){var ca=this.__bm(bX,bY);if(ca!=null){var cb=bY.substring(bY.lastIndexOf(z)+1,bY.length);if(cb.charAt(cb.length-1)==x){this.__bl(bX,bY,null);return;}
;if(ca[v+qx.lang.String.firstUp(cb)]!=undefined){ca[v+qx.lang.String.firstUp(cb)]();}
else {ca[E+qx.lang.String.firstUp(cb)](null);}
;}
;}
,__bl:function(cc,cd,ce){var ci=this.__bm(cc,cd);if(ci!=null){var cj=cd.substring(cd.lastIndexOf(z)+1,cd.length);if(cj.charAt(cj.length-1)==x){var cf=cj.substring(cj.lastIndexOf(B)+1,cj.length-1);var ch=cj.substring(0,cj.lastIndexOf(B));var cg=cc;if(!qx.Class.implementsInterface(cg,qx.data.IListData)){cg=ci[C+qx.lang.String.firstUp(ch)]();}
;if(cf==y){cf=cg.length-1;}
;if(cg!=null){cg.setItem(cf,ce);}
;}
else {ci[E+qx.lang.String.firstUp(cj)](ce);}
;}
;}
,__bm:function(ck,cl){var co=cl.split(z);var cp=ck;for(var i=0;i<co.length-1;i++){try{var cn=co[i];if(cn.indexOf(x)==cn.length-1){var cm=cn.substring(cn.indexOf(B)+1,cn.length-1);cn=cn.substring(0,cn.indexOf(B));}
;if(cn!=A){cp=cp[C+qx.lang.String.firstUp(cn)]();}
;if(cm!=null){if(cm==y){cm=cp.length-1;}
;cp=cp.getItem(cm);cm=null;}
;}
catch(cq){return null;}
;}
;return cp;}
,__bn:function(cr,cs,ct,cu,cv){cr=this.__br(cr,cs,ct,cu,cv);if(cr===undefined){this.__bk(cs,ct);}
;if(cr!==undefined){try{this.__bl(cs,ct,cr);if(cu&&cu.onUpdate){cu.onUpdate(cv,cs,cr);}
;}
catch(e){if(!(e instanceof qx.core.ValidationError)){throw e;}
;if(cu&&cu.onSetFail){cu.onSetFail(e);}
else {qx.log.Logger.warn(s+cr+r+cs+F+e);}
;}
;}
;}
,__bo:function(cw){var cx=[];for(var i=0;i<cw.length;i++){var name=cw[i];if(qx.lang.String.endsWith(name,x)){var cy=name.substring(name.indexOf(B)+1,name.indexOf(x));if(name.indexOf(x)!=name.length-1){throw new Error(k+name+t);}
;if(cy!==y){if(cy==A||isNaN(parseInt(cy,10))){throw new Error(d+J+name+t);}
;}
;if(name.indexOf(B)!=0){cw[i]=name.substring(0,name.indexOf(B));cx[i]=A;cx[i+1]=cy;cw.splice(i+1,0,u);i++;}
else {cx[i]=cy;cw.splice(i,1,u);}
;}
else {cx[i]=A;}
;}
;return cx;}
,__bp:function(cz,cA,cB,cC,cD,cE){var cF;{}
;var cH=function(cI,e){if(cI!==A){if(cI===y){cI=cz.length-1;}
;var cL=cz.getItem(cI);if(cL===undefined){qx.data.SingleValueBinding.__bk(cB,cC);}
;var cJ=e.getData().start;var cK=e.getData().end;if(cI<cJ||cI>cK){return;}
;}
else {var cL=e.getData();}
;{}
;cL=qx.data.SingleValueBinding.__br(cL,cB,cC,cD,cz);{}
;try{if(cL!==undefined){qx.data.SingleValueBinding.__bl(cB,cC,cL);}
else {qx.data.SingleValueBinding.__bk(cB,cC);}
;if(cD&&cD.onUpdate){cD.onUpdate(cz,cB,cL);}
;}
catch(e){if(!(e instanceof qx.core.ValidationError)){throw e;}
;if(cD&&cD.onSetFail){cD.onSetFail(e);}
else {qx.log.Logger.warn(s+cL+r+cB+F+e);}
;}
;}
;if(!cE){cE=A;}
;cH=qx.lang.Function.bind(cH,cz,cE);var cG=cz.addListener(cA,cH);return cG;}
,__bq:function(cM,cN,cO,cP,cQ){if(this.__bg[cN.toHashCode()]===undefined){this.__bg[cN.toHashCode()]=[];}
;this.__bg[cN.toHashCode()].push([cM,cN,cO,cP,cQ]);}
,__br:function(cR,cS,cT,cU,cV){if(cU&&cU.converter){var cX;if(cS.getModel){cX=cS.getModel();}
;return cU.converter(cR,cX,cV,cS);}
else {var da=this.__bm(cS,cT);var db=cT.substring(cT.lastIndexOf(z)+1,cT.length);if(da==null){return cR;}
;var cY=qx.Class.getPropertyDefinition(da.constructor,db);var cW=cY==null?A:cY.check;return this.__bt(cR,cW);}
;}
,__bs:function(dc,dd){var de=qx.Class.getPropertyDefinition(dc.constructor,dd);if(de==null){return null;}
;return de.event;}
,__bt:function(df,dg){var dh=qx.lang.Type.getClass(df);if((dh==p||dh==n)&&(dg==h||dg==L)){df=parseInt(df,10);}
;if((dh==m||dh==p||dh==H)&&dg==n){df=df+A;}
;if((dh==p||dh==n)&&(dg==p||dg==M)){df=parseFloat(df);}
;return df;}
,removeBindingFromObject:function(di,dj){if(dj.type==D){for(var i=0;i<dj.sources.length;i++){if(dj.sources[i]){dj.sources[i].removeListenerById(dj.listenerIds[i]);}
;}
;for(var i=0;i<dj.targets.length;i++){if(dj.targets[i]){dj.targets[i].removeListenerById(dj.targetListenerIds[i]);}
;}
;}
else {di.removeListenerById(dj);}
;var dk=this.__bg[di.toHashCode()];if(dk!=undefined){for(var i=0;i<dk.length;i++){if(dk[i][0]==dj){qx.lang.Array.remove(dk,dk[i]);return;}
;}
;}
;throw new Error(b);}
,removeAllBindingsForObject:function(dl){{}
;var dm=this.__bg[dl.toHashCode()];if(dm!=undefined){for(var i=dm.length-1;i>=0;i--){this.removeBindingFromObject(dl,dm[i][0]);}
;}
;}
,getAllBindingsForObject:function(dn){if(this.__bg[dn.toHashCode()]===undefined){this.__bg[dn.toHashCode()]=[];}
;return this.__bg[dn.toHashCode()];}
,removeAllBindings:function(){for(var dq in this.__bg){var dp=qx.core.ObjectRegistry.fromHashCode(dq);if(dp==null){delete this.__bg[dq];continue;}
;this.removeAllBindingsForObject(dp);}
;this.__bg={};}
,getAllBindings:function(){return this.__bg;}
,showBindingInLog:function(dr,ds){var du;for(var i=0;i<this.__bg[dr.toHashCode()].length;i++){if(this.__bg[dr.toHashCode()][i][0]==ds){du=this.__bg[dr.toHashCode()][i];break;}
;}
;if(du===undefined){var dt=K;}
else {var dt=a+du[1]+q+du[2]+l+du[3]+q+du[4]+I;}
;qx.log.Logger.debug(dt);}
,showAllBindingsInLog:function(){for(var dw in this.__bg){var dv=qx.core.ObjectRegistry.fromHashCode(dw);for(var i=0;i<this.__bg[dw].length;i++){this.showBindingInLog(dv,this.__bg[dw][i][0]);}
;}
;}
}});}
)();
(function(){var p="]",o='\\u',n="undefined",m='\\$1',l="0041-005A0061-007A00AA00B500BA00C0-00D600D8-00F600F8-02C102C6-02D102E0-02E402EC02EE0370-037403760377037A-037D03860388-038A038C038E-03A103A3-03F503F7-0481048A-05250531-055605590561-058705D0-05EA05F0-05F20621-064A066E066F0671-06D306D506E506E606EE06EF06FA-06FC06FF07100712-072F074D-07A507B107CA-07EA07F407F507FA0800-0815081A082408280904-0939093D09500958-0961097109720979-097F0985-098C098F09900993-09A809AA-09B009B209B6-09B909BD09CE09DC09DD09DF-09E109F009F10A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A59-0A5C0A5E0A72-0A740A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABD0AD00AE00AE10B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D0B5C0B5D0B5F-0B610B710B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BD00C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D0C580C590C600C610C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD0CDE0CE00CE10D05-0D0C0D0E-0D100D12-0D280D2A-0D390D3D0D600D610D7A-0D7F0D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60E01-0E300E320E330E40-0E460E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB00EB20EB30EBD0EC0-0EC40EC60EDC0EDD0F000F40-0F470F49-0F6C0F88-0F8B1000-102A103F1050-1055105A-105D106110651066106E-10701075-1081108E10A0-10C510D0-10FA10FC1100-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A1380-138F13A0-13F41401-166C166F-167F1681-169A16A0-16EA1700-170C170E-17111720-17311740-17511760-176C176E-17701780-17B317D717DC1820-18771880-18A818AA18B0-18F51900-191C1950-196D1970-19741980-19AB19C1-19C71A00-1A161A20-1A541AA71B05-1B331B45-1B4B1B83-1BA01BAE1BAF1C00-1C231C4D-1C4F1C5A-1C7D1CE9-1CEC1CEE-1CF11D00-1DBF1E00-1F151F18-1F1D1F20-1F451F48-1F4D1F50-1F571F591F5B1F5D1F5F-1F7D1F80-1FB41FB6-1FBC1FBE1FC2-1FC41FC6-1FCC1FD0-1FD31FD6-1FDB1FE0-1FEC1FF2-1FF41FF6-1FFC2071207F2090-209421022107210A-211321152119-211D212421262128212A-212D212F-2139213C-213F2145-2149214E218321842C00-2C2E2C30-2C5E2C60-2CE42CEB-2CEE2D00-2D252D30-2D652D6F2D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE2E2F300530063031-3035303B303C3041-3096309D-309F30A1-30FA30FC-30FF3105-312D3131-318E31A0-31B731F0-31FF3400-4DB54E00-9FCBA000-A48CA4D0-A4FDA500-A60CA610-A61FA62AA62BA640-A65FA662-A66EA67F-A697A6A0-A6E5A717-A71FA722-A788A78BA78CA7FB-A801A803-A805A807-A80AA80C-A822A840-A873A882-A8B3A8F2-A8F7A8FBA90A-A925A930-A946A960-A97CA984-A9B2A9CFAA00-AA28AA40-AA42AA44-AA4BAA60-AA76AA7AAA80-AAAFAAB1AAB5AAB6AAB9-AABDAAC0AAC2AADB-AADDABC0-ABE2AC00-D7A3D7B0-D7C6D7CB-D7FBF900-FA2DFA30-FA6DFA70-FAD9FB00-FB06FB13-FB17FB1DFB1F-FB28FB2A-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74FE76-FEFCFF21-FF3AFF41-FF5AFF66-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC",k='-',j="qx.lang.String",h="(^|[^",g="0",f="%",c=' ',e='\n',d="])[",b="g",a="";qx.Bootstrap.define(j,{statics:{__bu:l,__bv:null,__bw:{},camelCase:function(q){var r=this.__bw[q];if(!r){r=q.replace(/\-([a-z])/g,function(s,t){return t.toUpperCase();}
);}
;return r;}
,hyphenate:function(u){var v=this.__bw[u];if(!v){v=u.replace(/[A-Z]/g,function(w){return (k+w.charAt(0).toLowerCase());}
);}
;return v;}
,capitalize:function(x){if(this.__bv===null){var y=o;this.__bv=new RegExp(h+this.__bu.replace(/[0-9A-F]{4}/g,function(z){return y+z;}
)+d+this.__bu.replace(/[0-9A-F]{4}/g,function(A){return y+A;}
)+p,b);}
;return x.replace(this.__bv,function(B){return B.toUpperCase();}
);}
,clean:function(C){return this.trim(C.replace(/\s+/g,c));}
,trimLeft:function(D){return D.replace(/^\s+/,a);}
,trimRight:function(E){return E.replace(/\s+$/,a);}
,trim:function(F){return F.replace(/^\s+|\s+$/g,a);}
,startsWith:function(G,H){return G.indexOf(H)===0;}
,endsWith:function(I,J){return I.substring(I.length-J.length,I.length)===J;}
,repeat:function(K,L){return K.length>0?new Array(L+1).join(K):a;}
,pad:function(M,length,N){var O=length-M.length;if(O>0){if(typeof N===n){N=g;}
;return this.repeat(N,O)+M;}
else {return M;}
;}
,firstUp:qx.Bootstrap.firstUp,firstLow:qx.Bootstrap.firstLow,contains:function(P,Q){return P.indexOf(Q)!=-1;}
,format:function(R,S){var T=R;var i=S.length;while(i--){T=T.replace(new RegExp(f+(i+1),b),S[i]+a);}
;return T;}
,escapeRegexpChars:function(U){return U.replace(/([.*+?^${}()|[\]\/\\])/g,m);}
,toArray:function(V){return V.split(/\B|\b/g);}
,stripTags:function(W){return W.replace(/<\/?[^>]+>/gi,a);}
,stripScripts:function(X,Y){var bb=a;var ba=X.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi,function(){bb+=arguments[1]+e;return a;}
);if(Y===true){qx.lang.Function.globalEval(bb);}
;return ba;}
}});}
)();
(function(){var h="[object Array]",g="number",f="Cannot clean-up map entry doneObjects[",e="]",d="qx",c="qx.lang.Array",b="][",a="string";qx.Bootstrap.define(c,{statics:{toArray:function(j,k){return this.cast(j,Array,k);}
,cast:function(m,n,o){var i,l;if(m.constructor===n){return m;}
;if(qx.data&&qx.data.IListData){if(qx.Class&&qx.Class.hasInterface(m,qx.data.IListData)){var m=m.toArray();}
;}
;var p=new n;{}
;if(Object.prototype.toString.call(m)===h&&o==null){p.push.apply(p,m);}
else {p.push.apply(p,Array.prototype.slice.call(m,o||0));}
;return p;}
,fromArguments:function(q,r){return Array.prototype.slice.call(q,r||0);}
,fromCollection:function(s){var t,i,l;{}
;return Array.prototype.slice.call(s,0);}
,fromShortHand:function(u){var w=u.length;var v=qx.lang.Array.clone(u);switch(w){case 1:v[1]=v[2]=v[3]=v[0];break;case 2:v[2]=v[0];case 3:v[3]=v[1];};return v;}
,clone:function(x){return x.concat();}
,insertAt:function(y,z,i){y.splice(i,0,z);return y;}
,insertBefore:function(A,B,C){var i=A.indexOf(C);if(i==-1){A.push(B);}
else {A.splice(i,0,B);}
;return A;}
,insertAfter:function(D,E,F){var i=D.indexOf(F);if(i==-1||i==(D.length-1)){D.push(E);}
else {D.splice(i+1,0,E);}
;return D;}
,removeAt:function(G,i){return G.splice(i,1)[0];}
,removeAll:function(H){H.length=0;return this;}
,append:function(I,J){{}
;Array.prototype.push.apply(I,J);return I;}
,exclude:function(K,L){{}
;for(var i=0,N=L.length,M;i<N;i++){M=K.indexOf(L[i]);if(M!=-1){K.splice(M,1);}
;}
;return K;}
,remove:function(O,P){var i=O.indexOf(P);if(i!=-1){O.splice(i,1);return P;}
;}
,contains:function(Q,R){return Q.indexOf(R)!==-1;}
,equals:function(S,T){var length=S.length;if(length!==T.length){return false;}
;for(var i=0;i<length;i++){if(S[i]!==T[i]){return false;}
;}
;return true;}
,sum:function(U){var V=0;for(var i=0,l=U.length;i<l;i++){V+=U[i];}
;return V;}
,max:function(W){{}
;var i,Y=W.length,X=W[0];for(i=1;i<Y;i++){if(W[i]>X){X=W[i];}
;}
;return X===undefined?null:X;}
,min:function(ba){{}
;var i,bc=ba.length,bb=ba[0];for(i=1;i<bc;i++){if(ba[i]<bb){bb=ba[i];}
;}
;return bb===undefined?null:bb;}
,unique:function(bd){var bn=[],bf={},bi={},bk={};var bj,be=0;var bo=d+qx.lang.Date.now();var bg=false,bm=false,bp=false;for(var i=0,bl=bd.length;i<bl;i++){bj=bd[i];if(bj===null){if(!bg){bg=true;bn.push(bj);}
;}
else if(bj===undefined){}
else if(bj===false){if(!bm){bm=true;bn.push(bj);}
;}
else if(bj===true){if(!bp){bp=true;bn.push(bj);}
;}
else if(typeof bj===a){if(!bf[bj]){bf[bj]=1;bn.push(bj);}
;}
else if(typeof bj===g){if(!bi[bj]){bi[bj]=1;bn.push(bj);}
;}
else {var bh=bj[bo];if(bh==null){bh=bj[bo]=be++;}
;if(!bk[bh]){bk[bh]=bj;bn.push(bj);}
;}
;;;;;}
;for(var bh in bk){try{delete bk[bh][bo];}
catch(bq){try{bk[bh][bo]=null;}
catch(br){throw new Error(f+bh+b+bo+e);}
;}
;}
;return bn;}
}});}
)();
(function(){var a="qx.lang.Date";qx.Bootstrap.define(a,{statics:{now:function(){return +new Date;}
}});}
)();
(function(){var g='anonymous()',f="qx.globalErrorHandling",e="qx.lang.Function",d=".constructor()",c=".",b=".prototype.",a="()";qx.Bootstrap.define(e,{statics:{getCaller:function(h){return h.caller?h.caller.callee:h.callee.caller;}
,getName:function(i){if(i.displayName){return i.displayName;}
;if(i.$$original||i.wrapper||i.classname){return i.classname+d;}
;if(i.$$mixin){for(var k in i.$$mixin.$$members){if(i.$$mixin.$$members[k]==i){return i.$$mixin.name+b+k+a;}
;}
;for(var k in i.$$mixin){if(i.$$mixin[k]==i){return i.$$mixin.name+c+k+a;}
;}
;}
;if(i.self){var l=i.self.constructor;if(l){for(var k in l.prototype){if(l.prototype[k]==i){return l.classname+b+k+a;}
;}
;for(var k in l){if(l[k]==i){return l.classname+c+k+a;}
;}
;}
;}
;var j=i.toString().match(/function\s*(\w*)\s*\(.*/);if(j&&j.length>=1&&j[1]){return j[1]+a;}
;return g;}
,globalEval:function(m){if(window.execScript){return window.execScript(m);}
else {return eval.call(window,m);}
;}
,empty:function(){}
,returnTrue:function(){return true;}
,returnFalse:function(){return false;}
,returnNull:function(){return null;}
,returnThis:function(){return this;}
,returnZero:function(){return 0;}
,create:function(n,o){{}
;if(!o){return n;}
;if(!(o.self||o.args||o.delay!=null||o.periodical!=null||o.attempt)){return n;}
;return function(event){{}
;var q=qx.lang.Array.fromArguments(arguments);if(o.args){q=o.args.concat(q);}
;if(o.delay||o.periodical){var p=function(){return n.apply(o.self||this,q);}
;if(qx.core.Environment.get(f)){p=qx.event.GlobalError.observeMethod(p);}
;if(o.delay){return window.setTimeout(p,o.delay);}
;if(o.periodical){return window.setInterval(p,o.periodical);}
;}
else if(o.attempt){var r=false;try{r=n.apply(o.self||this,q);}
catch(s){}
;return r;}
else {return n.apply(o.self||this,q);}
;}
;}
,bind:function(t,self,u){return this.create(t,{self:self,args:arguments.length>2?qx.lang.Array.fromArguments(arguments,2):null});}
,curry:function(v,w){return this.create(v,{args:arguments.length>1?qx.lang.Array.fromArguments(arguments,1):null});}
,listener:function(x,self,y){if(arguments.length<3){return function(event){return x.call(self||this,event||window.event);}
;}
else {var z=qx.lang.Array.fromArguments(arguments,2);return function(event){var A=[event||window.event];A.push.apply(A,z);x.apply(self||this,A);}
;}
;}
,attempt:function(B,self,C){return this.create(B,{self:self,attempt:true,args:arguments.length>2?qx.lang.Array.fromArguments(arguments,2):null})();}
,delay:function(D,E,self,F){return this.create(D,{delay:E,self:self,args:arguments.length>3?qx.lang.Array.fromArguments(arguments,3):null})();}
,periodical:function(G,H,self,I){return this.create(G,{periodical:H,self:self,args:arguments.length>3?qx.lang.Array.fromArguments(arguments,3):null})();}
}});}
)();
(function(){var b="qx.event.GlobalError",a="qx.globalErrorHandling";qx.Bootstrap.define(b,{statics:{__bx:function(){if(qx.core&&qx.core.Environment){return qx.core.Environment.get(a);}
else {return !!qx.Bootstrap.getEnvironmentSetting(a);}
;}
,setErrorHandler:function(c,d){this.__by=c||null;this.__bz=d||window;if(this.__bx()){if(c&&window.onerror){var e=qx.Bootstrap.bind(this.__bB,this);if(this.__bA==null){this.__bA=window.onerror;}
;var self=this;window.onerror=function(f,g,h){self.__bA(f,g,h);e(f,g,h);}
;}
;if(c&&!window.onerror){window.onerror=qx.Bootstrap.bind(this.__bB,this);}
;if(this.__by==null){if(this.__bA!=null){window.onerror=this.__bA;this.__bA=null;}
else {window.onerror=null;}
;}
;}
;}
,__bB:function(i,j,k){if(this.__by){this.handleError(new qx.core.WindowError(i,j,k));return true;}
;}
,observeMethod:function(l){if(this.__bx()){var self=this;return function(){if(!self.__by){return l.apply(this,arguments);}
;try{return l.apply(this,arguments);}
catch(m){self.handleError(new qx.core.GlobalError(m,arguments));}
;}
;}
else {return l;}
;}
,handleError:function(n){if(this.__by){this.__by.call(this.__bz,n);}
;}
},defer:function(o){if(qx.core&&qx.core.Environment){qx.core.Environment.add(a,true);}
else {qx.Bootstrap.setEnvironmentSetting(a,true);}
;o.setErrorHandler(null,null);}
});}
)();
(function(){var b="",a="qx.core.WindowError";qx.Bootstrap.define(a,{extend:Error,construct:function(c,d,e){var f=Error.call(this,c);if(f.stack){this.stack=f.stack;}
;if(f.stacktrace){this.stacktrace=f.stacktrace;}
;this.__bC=c;this.__bD=d||b;this.__bE=e===undefined?-1:e;}
,members:{__bC:null,__bD:null,__bE:null,toString:function(){return this.__bC;}
,getUri:function(){return this.__bD;}
,getLineNumber:function(){return this.__bE;}
}});}
)();
(function(){var b="GlobalError: ",a="qx.core.GlobalError";qx.Bootstrap.define(a,{extend:Error,construct:function(c,d){if(qx.Bootstrap.DEBUG){qx.core.Assert.assertNotUndefined(c);}
;this.__bC=b+(c&&c.message?c.message:c);var e=Error.call(this,this.__bC);if(e.stack){this.stack=e.stack;}
;if(e.stacktrace){this.stacktrace=e.stacktrace;}
;this.__bF=d;this.__bG=c;}
,members:{__bG:null,__bF:null,__bC:null,toString:function(){return this.__bC;}
,getArguments:function(){return this.__bF;}
,getSourceException:function(){return this.__bG;}
},destruct:function(){this.__bG=null;this.__bF=null;this.__bC=null;}
});}
)();
(function(){var f="qx.lang.Type",e="Error",d="RegExp",c="Date",b="Number",a="Boolean";qx.Bootstrap.define(f,{statics:{getClass:qx.Bootstrap.getClass,isString:qx.Bootstrap.isString,isArray:qx.Bootstrap.isArray,isObject:qx.Bootstrap.isObject,isFunction:qx.Bootstrap.isFunction,isRegExp:function(g){return this.getClass(g)==d;}
,isNumber:function(h){return (h!==null&&(this.getClass(h)==b||h instanceof Number));}
,isBoolean:function(i){return (i!==null&&(this.getClass(i)==a||i instanceof Boolean));}
,isDate:function(j){return (j!==null&&(this.getClass(j)==c||j instanceof Date));}
,isError:function(k){return (k!==null&&(this.getClass(k)==e||k instanceof Error));}
}});}
)();
(function(){var p=" != ",o="qx.core.Object",n="Expected value to be an array but found ",m=") was fired.",k="Expected value to be an integer >= 0 but found ",j="' to be not equal with '",h="' to '",g="Expected object '",f="Called assertTrue with '",d="Expected value to be a map but found ",bB="The function did not raise an exception!",bA="Expected value to be undefined but found ",bz="Expected value to be a DOM element but found  '",by="Expected value to be a regular expression but found ",bx="' to implement the interface '",bw="Expected value to be null but found ",bv="Invalid argument 'type'",bu="Called assert with 'false'",bt="Assertion error! ",bs="null",w="' but found '",x="' must must be a key of the map '",u="The String '",v="Expected value to be a string but found ",s="Expected value not to be undefined but found undefined!",t="qx.util.ColorUtil",q=": ",r="The raised exception does not have the expected type! ",E=") not fired.",F="qx.core.Assert",T="Expected value to be typeof object but found ",P="' (identical) but found '",bc="' must have any of the values defined in the array '",W="Expected value to be a number but found ",bo="Called assertFalse with '",bi="qx.ui.core.Widget",K="Expected value to be a qooxdoo object but found ",br="' arguments.",bq="Expected value '%1' to be in the range '%2'..'%3'!",bp="Array[",I="' does not match the regular expression '",M="' to be not identical with '",O="Expected [",R="' arguments but found '",U="', which cannot be converted to a CSS color!",X="qx.core.AssertionError",be="Expected value to be a boolean but found ",bk="Expected value not to be null but found null!",y="))!",z="Expected value to be a qooxdoo widget but found ",L="Expected value to be typeof '",bb="\n Stack trace: \n",ba="Expected value to be typeof function but found ",Y="Expected value to be an integer but found ",bg="Called fail().",bf="The parameter 're' must be a string or a regular expression.",V="qx.util.ColorUtil not available! Your code must have a dependency on 'qx.util.ColorUtil'",bd="Expected value to be a number >= 0 but found ",a="Expected value to be instanceof '",bj="], but found [",A="Wrong number of arguments given. Expected '",B="object",Q=")), but found value '",b="Event (",c="Expected value to be the CSS color '",H="' but found ",C="]",D=", ",G="The value '",S="' (rgb(",bm=",",bl="'",N="Expected '",bn="'!",J="!",bh="";qx.Class.define(F,{statics:{__bH:true,__bI:function(bC,bD){var bH=bh;for(var i=1,l=arguments.length;i<l;i++){bH=bH+this.__bJ(arguments[i]);}
;var bG=bh;if(bH){bG=bC+q+bH;}
else {bG=bC;}
;var bF=bt+bG;if(qx.Class.isDefined(X)){var bE=new qx.core.AssertionError(bC,bH);if(this.__bH){qx.Bootstrap.error(bF+bb+bE.getStackTrace());}
;throw bE;}
else {if(this.__bH){qx.Bootstrap.error(bF);}
;throw new Error(bF);}
;}
,__bJ:function(bI){var bJ;if(bI===null){bJ=bs;}
else if(qx.lang.Type.isArray(bI)&&bI.length>10){bJ=bp+bI.length+C;}
else if((bI instanceof Object)&&(bI.toString==null)){bJ=qx.lang.Json.stringify(bI,null,2);}
else {try{bJ=bI.toString();}
catch(e){bJ=bh;}
;}
;;return bJ;}
,assert:function(bK,bL){bK==true||this.__bI(bL||bh,bu);}
,fail:function(bM,bN){var bO=bN?bh:bg;this.__bI(bM||bh,bO);}
,assertTrue:function(bP,bQ){(bP===true)||this.__bI(bQ||bh,f,bP,bl);}
,assertFalse:function(bR,bS){(bR===false)||this.__bI(bS||bh,bo,bR,bl);}
,assertEquals:function(bT,bU,bV){bT==bU||this.__bI(bV||bh,N,bT,w,bU,bn);}
,assertNotEquals:function(bW,bX,bY){bW!=bX||this.__bI(bY||bh,N,bW,j,bX,bn);}
,assertIdentical:function(ca,cb,cc){ca===cb||this.__bI(cc||bh,N,ca,P,cb,bn);}
,assertNotIdentical:function(cd,ce,cf){cd!==ce||this.__bI(cf||bh,N,cd,M,ce,bn);}
,assertNotUndefined:function(cg,ch){cg!==undefined||this.__bI(ch||bh,s);}
,assertUndefined:function(ci,cj){ci===undefined||this.__bI(cj||bh,bA,ci,J);}
,assertNotNull:function(ck,cl){ck!==null||this.__bI(cl||bh,bk);}
,assertNull:function(cm,cn){cm===null||this.__bI(cn||bh,bw,cm,J);}
,assertJsonEquals:function(co,cp,cq){this.assertEquals(qx.lang.Json.stringify(co),qx.lang.Json.stringify(cp),cq);}
,assertMatch:function(cr,cs,ct){this.assertString(cr);this.assert(qx.lang.Type.isRegExp(cs)||qx.lang.Type.isString(cs),bf);cr.search(cs)>=0||this.__bI(ct||bh,u,cr,I,cs.toString(),bn);}
,assertArgumentsCount:function(cu,cv,cw,cx){var cy=cu.length;(cy>=cv&&cy<=cw)||this.__bI(cx||bh,A,cv,h,cw,R,arguments.length,br);}
,assertEventFired:function(cz,event,cA,cB,cC){var cE=false;var cD=function(e){if(cB){cB.call(cz,e);}
;cE=true;}
;var cF;try{cF=cz.addListener(event,cD,cz);cA.call(cz);}
catch(cG){throw cG;}
finally{try{cz.removeListenerById(cF);}
catch(cH){}
;}
;cE===true||this.__bI(cC||bh,b,event,E);}
,assertEventNotFired:function(cI,event,cJ,cK){var cM=false;var cL=function(e){cM=true;}
;var cN=cI.addListener(event,cL,cI);cJ.call();cM===false||this.__bI(cK||bh,b,event,m);cI.removeListenerById(cN);}
,assertException:function(cO,cP,cQ,cR){var cP=cP||Error;var cS;try{this.__bH=false;cO();}
catch(cT){cS=cT;}
finally{this.__bH=true;}
;if(cS==null){this.__bI(cR||bh,bB);}
;cS instanceof cP||this.__bI(cR||bh,r,cP,p,cS);if(cQ){this.assertMatch(cS.toString(),cQ,cR);}
;}
,assertInArray:function(cU,cV,cW){cV.indexOf(cU)!==-1||this.__bI(cW||bh,G,cU,bc,cV,bl);}
,assertArrayEquals:function(cX,cY,da){this.assertArray(cX,da);this.assertArray(cY,da);da=da||O+cX.join(D)+bj+cY.join(D)+C;if(cX.length!==cY.length){this.fail(da,true);}
;for(var i=0;i<cX.length;i++){if(cX[i]!==cY[i]){this.fail(da,true);}
;}
;}
,assertKeyInMap:function(db,dc,dd){dc[db]!==undefined||this.__bI(dd||bh,G,db,x,dc,bl);}
,assertFunction:function(de,df){qx.lang.Type.isFunction(de)||this.__bI(df||bh,ba,de,J);}
,assertString:function(dg,dh){qx.lang.Type.isString(dg)||this.__bI(dh||bh,v,dg,J);}
,assertBoolean:function(di,dj){qx.lang.Type.isBoolean(di)||this.__bI(dj||bh,be,di,J);}
,assertNumber:function(dk,dl){(qx.lang.Type.isNumber(dk)&&isFinite(dk))||this.__bI(dl||bh,W,dk,J);}
,assertPositiveNumber:function(dm,dn){(qx.lang.Type.isNumber(dm)&&isFinite(dm)&&dm>=0)||this.__bI(dn||bh,bd,dm,J);}
,assertInteger:function(dp,dq){(qx.lang.Type.isNumber(dp)&&isFinite(dp)&&dp%1===0)||this.__bI(dq||bh,Y,dp,J);}
,assertPositiveInteger:function(dr,ds){var dt=(qx.lang.Type.isNumber(dr)&&isFinite(dr)&&dr%1===0&&dr>=0);dt||this.__bI(ds||bh,k,dr,J);}
,assertInRange:function(du,dv,dw,dx){(du>=dv&&du<=dw)||this.__bI(dx||bh,qx.lang.String.format(bq,[du,dv,dw]));}
,assertObject:function(dy,dz){var dA=dy!==null&&(qx.lang.Type.isObject(dy)||typeof dy===B);dA||this.__bI(dz||bh,T,(dy),J);}
,assertArray:function(dB,dC){qx.lang.Type.isArray(dB)||this.__bI(dC||bh,n,dB,J);}
,assertMap:function(dD,dE){qx.lang.Type.isObject(dD)||this.__bI(dE||bh,d,dD,J);}
,assertRegExp:function(dF,dG){qx.lang.Type.isRegExp(dF)||this.__bI(dG||bh,by,dF,J);}
,assertType:function(dH,dI,dJ){this.assertString(dI,bv);typeof (dH)===dI||this.__bI(dJ||bh,L,dI,H,dH,J);}
,assertInstance:function(dK,dL,dM){var dN=dL.classname||dL+bh;dK instanceof dL||this.__bI(dM||bh,a,dN,H,dK,J);}
,assertInterface:function(dO,dP,dQ){qx.Class.implementsInterface(dO,dP)||this.__bI(dQ||bh,g,dO,bx,dP,bn);}
,assertCssColor:function(dR,dS,dT){var dU=qx.Class.getByName(t);if(!dU){throw new Error(V);}
;var dW=dU.stringToRgb(dR);try{var dV=dU.stringToRgb(dS);}
catch(dY){this.__bI(dT||bh,c,dR,S,dW.join(bm),Q,dS,U);}
;var dX=dW[0]==dV[0]&&dW[1]==dV[1]&&dW[2]==dV[2];dX||this.__bI(dT||bh,c,dW,S,dW.join(bm),Q,dS,S,dV.join(bm),y);}
,assertElement:function(ea,eb){!!(ea&&ea.nodeType===1)||this.__bI(eb||bh,bz,ea,bn);}
,assertQxObject:function(ec,ed){this.__bK(ec,o)||this.__bI(ed||bh,K,ec,J);}
,assertQxWidget:function(ee,ef){this.__bK(ee,bi)||this.__bI(ef||bh,z,ee,J);}
,__bK:function(eg,eh){if(!eg){return false;}
;var ei=eg.constructor;while(ei){if(ei.classname===eh){return true;}
;ei=ei.superclass;}
;return false;}
}});}
)();
(function(){var c=": ",b="qx.type.BaseError",a="";qx.Class.define(b,{extend:Error,construct:function(d,e){var f=Error.call(this,e);if(f.stack){this.stack=f.stack;}
;if(f.stacktrace){this.stacktrace=f.stacktrace;}
;if(!(f.stack||f.stacktrace)){this.__bL=qx.dev.StackTrace.getStackTraceFromCaller(arguments);}
;this.__bM=d||a;this.message=e||qx.type.BaseError.DEFAULTMESSAGE;}
,statics:{DEFAULTMESSAGE:"error"},members:{__bL:null,__bM:null,message:null,getComment:function(){return this.__bM;}
,getStackTrace:function(){if(this.stack||this.stacktrace){return qx.dev.StackTrace.getStackTraceFromError(this);}
else if(this.__bL){return this.__bL;}
;return [];}
,toString:function(){return this.__bM+(this.message?c+this.message:a);}
}});}
)();
(function(){var s="anonymous",r="...",q="qx.dev.StackTrace",p="",o="\n",n="?",m="/source/class/",l="FILENAME_TO_CLASSNAME must return a string!",k="stack",j="FORMAT_STACKTRACE must return an array of strings!",c="prototype",h="stacktrace",f="Error created at",b="Backtrace:",a="function",e="ecmascript.stacktrace",d=".",g=":";qx.Bootstrap.define(q,{statics:{FILENAME_TO_CLASSNAME:null,FORMAT_STACKTRACE:null,getStackTrace:function(){var x=[];try{throw new Error();}
catch(I){if(qx.core.Environment.get(e)){var C=qx.dev.StackTrace.getStackTraceFromError(I);var A=qx.dev.StackTrace.getStackTraceFromCaller(arguments);qx.lang.Array.removeAt(C,0);var x=A.length>C.length?A:C;for(var i=0;i<Math.min(A.length,C.length);i++){var y=A[i];if(y.indexOf(s)>=0){continue;}
;var w;var G=y.split(d);var z=/(.*?)\(/.exec(G[G.length-1]);if(z&&z.length==2){w=z[1];G.pop();}
;if(G[G.length-1]==c){G.pop();}
;var E=G.join(d);var v=C[i];var H=v.split(g);var D=H[0];var t=H[1];var u;if(H[2]){u=H[2];}
;if(qx.Class.getByName(D)){var B=D;}
else {B=E;}
;var F=B+d;if(w){F+=w+g;}
;F+=t;if(u){F+=g+u;}
;x[i]=F;}
;}
else {x=this.getStackTraceFromCaller(arguments);}
;}
;return x;}
,getStackTraceFromCaller:function(J){var O=[];var N=qx.lang.Function.getCaller(J);var K={};while(N){var L=qx.lang.Function.getName(N);O.push(L);try{N=N.caller;}
catch(P){break;}
;if(!N){break;}
;var M=qx.core.ObjectRegistry.toHashCode(N);if(K[M]){O.push(r);break;}
;K[M]=N;}
;return O;}
,getStackTraceFromError:function(Q){var U=[];if(qx.core.Environment.get(e)===k){if(!Q.stack){return U;}
;var bg=/@(.+):(\d+)$/gm;var T;while((T=bg.exec(Q.stack))!=null){var W=T[1];var be=T[2];var bc=this.__bN(W);U.push(bc+g+be);}
;if(U.length>0){return this.__bP(U);}
;var bg=/at (.*)/gm;var bf=/\((.*?)(:[^\/].*)\)/;var bb=/(.*?)(:[^\/].*)/;var T;while((T=bg.exec(Q.stack))!=null){var ba=bf.exec(T[1]);if(!ba){ba=bb.exec(T[1]);}
;if(ba){var bc=this.__bN(ba[1]);U.push(bc+ba[2]);}
else {U.push(T[1]);}
;}
;}
else if(qx.core.Environment.get(e)===h){var S=Q.stacktrace;if(!S){return U;}
;if(S.indexOf(f)>=0){S=S.split(f)[0];}
;var bg=/line\ (\d+?),\ column\ (\d+?)\ in\ (?:.*?)\ in\ (.*?):[^\/]/gm;var T;while((T=bg.exec(S))!=null){var be=T[1];var V=T[2];var W=T[3];var bc=this.__bN(W);U.push(bc+g+be+g+V);}
;if(U.length>0){return this.__bP(U);}
;var bg=/Line\ (\d+?)\ of\ linked\ script\ (.*?)$/gm;var T;while((T=bg.exec(S))!=null){var be=T[1];var W=T[2];var bc=this.__bN(W);U.push(bc+g+be);}
;}
else if(Q.message&&Q.message.indexOf(b)>=0){var Y=qx.lang.String.trim(Q.message.split(b)[1]);var X=Y.split(o);for(var i=0;i<X.length;i++){var R=X[i].match(/\s*Line ([0-9]+) of.* (\S.*)/);if(R&&R.length>=2){var be=R[1];var bd=this.__bN(R[2]);U.push(bd+g+be);}
;}
;}
else if(Q.sourceURL&&Q.line){U.push(this.__bN(Q.sourceURL)+g+Q.line);}
;;;return this.__bP(U);}
,__bN:function(bh){if(typeof qx.dev.StackTrace.FILENAME_TO_CLASSNAME==a){var bi=qx.dev.StackTrace.FILENAME_TO_CLASSNAME(bh);if(false&&!qx.lang.Type.isString(bi)){throw new Error(l);}
;return bi;}
;return qx.dev.StackTrace.__bO(bh);}
,__bO:function(bj){var bn=m;var bk=bj.indexOf(bn);var bm=bj.indexOf(n);if(bm>=0){bj=bj.substring(0,bm);}
;var bl=(bk==-1)?bj:bj.substring(bk+bn.length).replace(/\//g,d).replace(/\.js$/,p);return bl;}
,__bP:function(bo){if(typeof qx.dev.StackTrace.FORMAT_STACKTRACE==a){bo=qx.dev.StackTrace.FORMAT_STACKTRACE(bo);if(false&&!qx.lang.Type.isArray(bo)){throw new Error(j);}
;}
;return bo;}
}});}
)();
(function(){var d="stack",c="ecmascript.stacktrace",b="stacktrace",a="qx.bom.client.EcmaScript";qx.Bootstrap.define(a,{statics:{getStackTrace:function(){var e=new Error();return e.stacktrace?b:e.stack?d:null;}
},defer:function(f){qx.core.Environment.add(c,f.getStackTrace);}
});}
)();
(function(){var m="-",k="",j="qx.core.ObjectRegistry",h="Disposed ",g="-0",f=" objects",e="Could not dispose object ",d=": ",c="$$hash";qx.Class.define(j,{statics:{inShutDown:false,__j:{},__bQ:0,__bR:[],__bS:k,__bT:{},register:function(n){var q=this.__j;if(!q){return;}
;var p=n.$$hash;if(p==null){var o=this.__bR;if(o.length>0&&true){p=o.pop();}
else {p=(this.__bQ++)+this.__bS;}
;n.$$hash=p;{}
;}
;{}
;q[p]=n;}
,unregister:function(r){var s=r.$$hash;if(s==null){return;}
;var t=this.__j;if(t&&t[s]){delete t[s];this.__bR.push(s);}
;try{delete r.$$hash;}
catch(u){if(r.removeAttribute){r.removeAttribute(c);}
;}
;}
,toHashCode:function(v){{}
;var x=v.$$hash;if(x!=null){return x;}
;var w=this.__bR;if(w.length>0){x=w.pop();}
else {x=(this.__bQ++)+this.__bS;}
;return v.$$hash=x;}
,clearHashCode:function(y){{}
;var z=y.$$hash;if(z!=null){this.__bR.push(z);try{delete y.$$hash;}
catch(A){if(y.removeAttribute){y.removeAttribute(c);}
;}
;}
;}
,fromHashCode:function(B){return this.__j[B]||null;}
,shutdown:function(){this.inShutDown=true;var D=this.__j;var F=[];for(var E in D){F.push(E);}
;F.sort(function(a,b){return parseInt(b,10)-parseInt(a,10);}
);var C,i=0,l=F.length;while(true){try{for(;i<l;i++){E=F[i];C=D[E];if(C&&C.dispose){C.dispose();}
;}
;}
catch(G){qx.Bootstrap.error(this,e+C.toString()+d+G,G);if(i!==l){i++;continue;}
;}
;break;}
;qx.Bootstrap.debug(this,h+l+f);delete this.__j;}
,getRegistry:function(){return this.__j;}
,getNextHash:function(){return this.__bQ;}
,getPostId:function(){return this.__bS;}
,getStackTraces:function(){return this.__bT;}
},defer:function(H){if(window&&window.top){var frames=window.top.frames;for(var i=0;i<frames.length;i++){if(frames[i]===window){H.__bS=m+(i+1);return;}
;}
;}
;H.__bS=g;}
});}
)();
(function(){var a="qx.core.AssertionError";qx.Class.define(a,{extend:qx.type.BaseError,construct:function(b,c){qx.type.BaseError.call(this,b,c);this.__bU=qx.dev.StackTrace.getStackTrace();}
,members:{__bU:null,getStackTrace:function(){return this.__bU;}
}});}
)();
(function(){var g="prop",f="qx.bom.client.Json",e="JSON",d='{"x":1}',c="json",b="val",a="repl";qx.Bootstrap.define(f,{statics:{getJson:function(){return (qx.Bootstrap.getClass(window.JSON)==e&&JSON.parse(d).x===1&&JSON.stringify({"prop":b},function(k,v){return k===g?a:v;}
).indexOf(a)>0);}
},defer:function(h){qx.core.Environment.add(c,h.getJson);}
});}
)();
(function(){var p='String',o='Boolean',m='\\\\',l='\\f',h='\\t',g='{\n',f='[]',e="qx.lang.JsonImpl",d='Z',b='\\n',ba='Object',Y='{}',X='@',W='.',V='(',U='Array',T='T',S='\\r',R='{',Q='JSON.parse',x=' ',y='[',u='Number',w=')',s='[\n',t='\\"',q='\\b',r=': ',z='object',A='function',H=',',F='\n',K='\\u',J=',\n',M='0000',L='string',C="Cannot stringify a recursive object.",P='0',O='-',N='}',B=']',D='null',E='"',G=':',I='';qx.Bootstrap.define(e,{extend:Object,construct:function(){this.stringify=qx.lang.Function.bind(this.stringify,this);this.parse=qx.lang.Function.bind(this.parse,this);}
,members:{__bV:null,__bW:null,__bX:null,__bY:null,stringify:function(bb,bc,bd){this.__bV=I;this.__bW=I;this.__bY=[];if(qx.lang.Type.isNumber(bd)){var bd=Math.min(10,Math.floor(bd));for(var i=0;i<bd;i+=1){this.__bW+=x;}
;}
else if(qx.lang.Type.isString(bd)){if(bd.length>10){bd=bd.slice(0,10);}
;this.__bW=bd;}
;if(bc&&(qx.lang.Type.isFunction(bc)||qx.lang.Type.isArray(bc))){this.__bX=bc;}
else {this.__bX=null;}
;return this.__ca(I,{'':bb});}
,__ca:function(be,bf){var bi=this.__bV,bg,bj=bf[be];if(bj&&qx.lang.Type.isFunction(bj.toJSON)){bj=bj.toJSON(be);}
else if(qx.lang.Type.isDate(bj)){bj=this.dateToJSON(bj);}
;if(typeof this.__bX===A){bj=this.__bX.call(bf,be,bj);}
;if(bj===null){return D;}
;if(bj===undefined){return undefined;}
;switch(qx.lang.Type.getClass(bj)){case p:return this.__cb(bj);case u:return isFinite(bj)?String(bj):D;case o:return String(bj);case U:this.__bV+=this.__bW;bg=[];if(this.__bY.indexOf(bj)!==-1){throw new TypeError(C);}
;this.__bY.push(bj);var length=bj.length;for(var i=0;i<length;i+=1){bg[i]=this.__ca(i,bj)||D;}
;this.__bY.pop();if(bg.length===0){var bh=f;}
else if(this.__bV){bh=s+this.__bV+bg.join(J+this.__bV)+F+bi+B;}
else {bh=y+bg.join(H)+B;}
;this.__bV=bi;return bh;case ba:this.__bV+=this.__bW;bg=[];if(this.__bY.indexOf(bj)!==-1){throw new TypeError(C);}
;this.__bY.push(bj);if(this.__bX&&typeof this.__bX===z){var length=this.__bX.length;for(var i=0;i<length;i+=1){var k=this.__bX[i];if(typeof k===L){var v=this.__ca(k,bj);if(v){bg.push(this.__cb(k)+(this.__bV?r:G)+v);}
;}
;}
;}
else {for(var k in bj){if(Object.hasOwnProperty.call(bj,k)){var v=this.__ca(k,bj);if(v){bg.push(this.__cb(k)+(this.__bV?r:G)+v);}
;}
;}
;}
;this.__bY.pop();if(bg.length===0){var bh=Y;}
else if(this.__bV){bh=g+this.__bV+bg.join(J+this.__bV)+F+bi+N;}
else {bh=R+bg.join(H)+N;}
;this.__bV=bi;return bh;};}
,dateToJSON:function(bk){var bl=function(n){return n<10?P+n:n;}
;var bm=function(n){var bn=bl(n);return n<100?P+bn:bn;}
;return isFinite(bk.valueOf())?bk.getUTCFullYear()+O+bl(bk.getUTCMonth()+1)+O+bl(bk.getUTCDate())+T+bl(bk.getUTCHours())+G+bl(bk.getUTCMinutes())+G+bl(bk.getUTCSeconds())+W+bm(bk.getUTCMilliseconds())+d:null;}
,__cb:function(bo){var bp={'\b':q,'\t':h,'\n':b,'\f':l,'\r':S,'"':t,'\\':m};var bq=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;bq.lastIndex=0;if(bq.test(bo)){return E+bo.replace(bq,function(a){var c=bp[a];return typeof c===L?c:K+(M+a.charCodeAt(0).toString(16)).slice(-4);}
)+E;}
else {return E+bo+E;}
;}
,parse:function(br,bs){var bt=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;bt.lastIndex=0;if(bt.test(br)){br=br.replace(bt,function(a){return K+(M+a.charCodeAt(0).toString(16)).slice(-4);}
);}
;if(/^[\],:{}\s]*$/.test(br.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,X).replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,B).replace(/(?:^|:|,)(?:\s*\[)+/g,I))){var j=eval(V+br+w);return typeof bs===A?this.__cc({'':j},I,bs):j;}
;throw new SyntaxError(Q);}
,__cc:function(bu,bv,bw){var bx=bu[bv];if(bx&&typeof bx===z){for(var k in bx){if(Object.hasOwnProperty.call(bx,k)){var v=this.__cc(bx,k,bw);if(v!==undefined){bx[k]=v;}
else {delete bx[k];}
;}
;}
;}
;return bw.call(bu,bv,bx);}
}});}
)();
(function(){var a="qx.lang.Json";qx.Bootstrap.define(a,{statics:{JSON:qx.core.Environment.get("json")?window.JSON:new qx.lang.JsonImpl(),stringify:null,parse:null},defer:function(b){b.stringify=b.JSON.stringify;b.parse=b.JSON.parse;}
});}
)();
(function(){var c="qx.event.type.Data",b="qx.event.type.Event",a="qx.data.IListData";qx.Interface.define(a,{events:{"change":c,"changeLength":b},members:{getItem:function(d){}
,setItem:function(e,f){}
,splice:function(g,h,i){}
,contains:function(j){}
,getLength:function(){}
,toArray:function(){}
}});}
)();
(function(){var a="qx.core.ValidationError";qx.Class.define(a,{extend:qx.type.BaseError});}
)();
(function(){var a="qx.lang.RingBuffer";qx.Class.define(a,{extend:Object,construct:function(b){this.setMaxEntries(b||50);}
,members:{__cd:0,__ce:0,__cf:false,__cg:0,__ch:null,__ci:null,setMaxEntries:function(c){this.__ci=c;this.clear();}
,getMaxEntries:function(){return this.__ci;}
,addEntry:function(d){this.__ch[this.__cd]=d;this.__cd=this.__cj(this.__cd,1);var e=this.getMaxEntries();if(this.__ce<e){this.__ce++;}
;if(this.__cf&&(this.__cg<e)){this.__cg++;}
;}
,mark:function(){this.__cf=true;this.__cg=0;}
,clearMark:function(){this.__cf=false;}
,getAllEntries:function(){return this.getEntries(this.getMaxEntries(),false);}
,getEntries:function(f,g){if(f>this.__ce){f=this.__ce;}
;if(g&&this.__cf&&(f>this.__cg)){f=this.__cg;}
;if(f>0){var i=this.__cj(this.__cd,-1);var h=this.__cj(i,-f+1);var j;if(h<=i){j=this.__ch.slice(h,i+1);}
else {j=this.__ch.slice(h,this.__ce).concat(this.__ch.slice(0,i+1));}
;}
else {j=[];}
;return j;}
,clear:function(){this.__ch=new Array(this.getMaxEntries());this.__ce=0;this.__cg=0;this.__cd=0;}
,__cj:function(k,l){var m=this.getMaxEntries();var n=(k+l)%m;if(n<0){n+=m;}
;return n;}
}});}
)();
(function(){var a="qx.log.appender.RingBuffer";qx.Class.define(a,{extend:qx.lang.RingBuffer,construct:function(b){this.setMaxMessages(b||50);}
,members:{setMaxMessages:function(c){this.setMaxEntries(c);}
,getMaxMessages:function(){return this.getMaxEntries();}
,process:function(d){this.addEntry(d);}
,getAllLogEvents:function(){return this.getAllEntries();}
,retrieveLogEvents:function(e,f){return this.getEntries(e,f);}
,clearHistory:function(){this.clear();}
}});}
)();
(function(){var k="qx.log.Logger",j="[",h="#",g="warn",f="document",e="{...(",d="text[",c="[...(",b="\n",a=")}",H=")]",G="object",F="...(+",E="array",D=")",C="info",B="instance",A="string",z="null",y="class",s="number",t="stringify",q="]",r="date",o="unknown",p="function",m="boolean",n="debug",u="map",v="undefined",x="node",w="error";qx.Class.define(k,{statics:{__ck:n,setLevel:function(I){this.__ck=I;}
,getLevel:function(){return this.__ck;}
,setTreshold:function(J){this.__cn.setMaxMessages(J);}
,getTreshold:function(){return this.__cn.getMaxMessages();}
,__cl:{},__cm:0,register:function(K){if(K.$$id){return;}
;var M=this.__cm++;this.__cl[M]=K;K.$$id=M;var L=this.__co;var N=this.__cn.getAllLogEvents();for(var i=0,l=N.length;i<l;i++){if(L[N[i].level]>=L[this.__ck]){K.process(N[i]);}
;}
;}
,unregister:function(O){var P=O.$$id;if(P==null){return;}
;delete this.__cl[P];delete O.$$id;}
,debug:function(Q,R){qx.log.Logger.__cp(n,arguments);}
,info:function(S,T){qx.log.Logger.__cp(C,arguments);}
,warn:function(U,V){qx.log.Logger.__cp(g,arguments);}
,error:function(W,X){qx.log.Logger.__cp(w,arguments);}
,trace:function(Y){qx.log.Logger.__cp(C,[Y,qx.dev.StackTrace.getStackTrace().join(b)]);}
,deprecatedMethodWarning:function(ba,bb){var bc;{}
;}
,deprecatedClassWarning:function(bd,be){var bf;{}
;}
,deprecatedEventWarning:function(bg,event,bh){var bi;{}
;}
,deprecatedMixinWarning:function(bj,bk){var bl;{}
;}
,deprecatedConstantWarning:function(bm,bn,bo){var self,bp;{}
;}
,deprecateMethodOverriding:function(bq,br,bs,bt){var bu;{}
;}
,clear:function(){this.__cn.clearHistory();}
,__cn:new qx.log.appender.RingBuffer(50),__co:{debug:0,info:1,warn:2,error:3},__cp:function(bv,bw){var bB=this.__co;if(bB[bv]<bB[this.__ck]){return;}
;var by=bw.length<2?null:bw[0];var bA=by?1:0;var bx=[];for(var i=bA,l=bw.length;i<l;i++){bx.push(this.__cr(bw[i],true));}
;var bC=new Date;var bD={time:bC,offset:bC-qx.Bootstrap.LOADSTART,level:bv,items:bx,win:window};if(by){if(by.$$hash!==undefined){bD.object=by.$$hash;}
else if(by.$$type){bD.clazz=by;}
;}
;this.__cn.process(bD);var bE=this.__cl;for(var bz in bE){bE[bz].process(bD);}
;}
,__cq:function(bF){if(bF===undefined){return v;}
else if(bF===null){return z;}
;if(bF.$$type){return y;}
;var bG=typeof bF;if(bG===p||bG==A||bG===s||bG===m){return bG;}
else if(bG===G){if(bF.nodeType){return x;}
else if(bF.classname){return B;}
else if(bF instanceof Array){return E;}
else if(bF instanceof Error){return w;}
else if(bF instanceof Date){return r;}
else {return u;}
;;;;}
;if(bF.toString){return t;}
;return o;}
,__cr:function(bH,bI){var bP=this.__cq(bH);var bL=o;var bK=[];switch(bP){case z:case v:bL=bP;break;case A:case s:case m:case r:bL=bH;break;case x:if(bH.nodeType===9){bL=f;}
else if(bH.nodeType===3){bL=d+bH.nodeValue+q;}
else if(bH.nodeType===1){bL=bH.nodeName.toLowerCase();if(bH.id){bL+=h+bH.id;}
;}
else {bL=x;}
;;break;case p:bL=qx.lang.Function.getName(bH)||bP;break;case B:bL=bH.basename+j+bH.$$hash+q;break;case y:case t:bL=bH.toString();break;case w:bK=qx.dev.StackTrace.getStackTraceFromError(bH);bL=bH.toString();break;case E:if(bI){bL=[];for(var i=0,l=bH.length;i<l;i++){if(bL.length>20){bL.push(F+(l-i)+D);break;}
;bL.push(this.__cr(bH[i],false));}
;}
else {bL=c+bH.length+H;}
;break;case u:if(bI){var bJ;var bO=[];for(var bN in bH){bO.push(bN);}
;bO.sort();bL=[];for(var i=0,l=bO.length;i<l;i++){if(bL.length>20){bL.push(F+(l-i)+D);break;}
;bN=bO[i];bJ=this.__cr(bH[bN],false);bJ.key=bN;bL.push(bJ);}
;}
else {var bM=0;for(var bN in bH){bM++;}
;bL=e+bM+a;}
;break;};return {type:bP,text:bL,trace:bK};}
},defer:function(bQ){var bR=qx.Bootstrap.$$logs;for(var i=0;i<bR.length;i++){bQ.__cp(bR[i][0],bR[i][1]);}
;qx.Bootstrap.debug=bQ.debug;qx.Bootstrap.info=bQ.info;qx.Bootstrap.warn=bQ.warn;qx.Bootstrap.error=bQ.error;qx.Bootstrap.trace=bQ.trace;}
});}
)();
(function(){var d="qx.core.MProperty",c="reset",b="get",a="set";qx.Mixin.define(d,{members:{set:function(e,f){var h=qx.core.Property.$$method.set;if(qx.Bootstrap.isString(e)){if(!this[h[e]]){if(this[a+qx.Bootstrap.firstUp(e)]!=undefined){this[a+qx.Bootstrap.firstUp(e)](f);return this;}
;{}
;}
;return this[h[e]](f);}
else {for(var g in e){if(!this[h[g]]){if(this[a+qx.Bootstrap.firstUp(g)]!=undefined){this[a+qx.Bootstrap.firstUp(g)](e[g]);continue;}
;{}
;}
;this[h[g]](e[g]);}
;return this;}
;}
,get:function(i){var j=qx.core.Property.$$method.get;if(!this[j[i]]){if(this[b+qx.Bootstrap.firstUp(i)]!=undefined){return this[b+qx.Bootstrap.firstUp(i)]();}
;{}
;}
;return this[j[i]]();}
,reset:function(k){var l=qx.core.Property.$$method.reset;if(!this[l[k]]){if(this[c+qx.Bootstrap.firstUp(k)]!=undefined){this[c+qx.Bootstrap.firstUp(k)]();return;}
;{}
;}
;this[l[k]]();}
}});}
)();
(function(){var e="info",d="debug",c="warn",b="qx.core.MLogging",a="error";qx.Mixin.define(b,{members:{__cs:qx.log.Logger,debug:function(f){this.__ct(d,arguments);}
,info:function(g){this.__ct(e,arguments);}
,warn:function(h){this.__ct(c,arguments);}
,error:function(i){this.__ct(a,arguments);}
,trace:function(){this.__cs.trace(this);}
,__ct:function(j,k){var l=qx.lang.Array.fromArguments(k);l.unshift(this);this.__cs[j].apply(this.__cs,l);}
}});}
)();
(function(){var c="qx.dom.Node",b="";qx.Class.define(c,{statics:{ELEMENT:1,ATTRIBUTE:2,TEXT:3,CDATA_SECTION:4,ENTITY_REFERENCE:5,ENTITY:6,PROCESSING_INSTRUCTION:7,COMMENT:8,DOCUMENT:9,DOCUMENT_TYPE:10,DOCUMENT_FRAGMENT:11,NOTATION:12,getDocument:function(d){return d.nodeType===this.DOCUMENT?d:d.ownerDocument||d.document;}
,getWindow:function(e){if(e.nodeType==null){return e;}
;if(e.nodeType!==this.DOCUMENT){e=e.ownerDocument;}
;return e.defaultView||e.parentWindow;}
,getDocumentElement:function(f){return this.getDocument(f).documentElement;}
,getBodyElement:function(g){return this.getDocument(g).body;}
,isNode:function(h){return !!(h&&h.nodeType!=null);}
,isElement:function(j){return !!(j&&j.nodeType===this.ELEMENT);}
,isDocument:function(k){return !!(k&&k.nodeType===this.DOCUMENT);}
,isText:function(l){return !!(l&&l.nodeType===this.TEXT);}
,isWindow:function(m){return !!(m&&m.history&&m.location&&m.document);}
,isNodeName:function(n,o){if(!o||!n||!n.nodeName){return false;}
;return o.toLowerCase()==qx.dom.Node.getName(n);}
,getName:function(p){if(!p||!p.nodeName){return null;}
;return p.nodeName.toLowerCase();}
,getText:function(q){if(!q||!q.nodeType){return null;}
;switch(q.nodeType){case 1:var i,a=[],r=q.childNodes,length=r.length;for(i=0;i<length;i++){a[i]=this.getText(r[i]);}
;return a.join(b);case 2:case 3:case 4:return q.nodeValue;};return null;}
,isBlockNode:function(s){if(!qx.dom.Node.isElement(s)){return false;}
;s=qx.dom.Node.getName(s);return /^(body|form|textarea|fieldset|ul|ol|dl|dt|dd|li|div|hr|p|h[1-6]|quote|pre|table|thead|tbody|tfoot|tr|td|th|iframe|address|blockquote)$/.test(s);}
}});}
)();
(function(){var j="HTMLEvents",i="mousedown",h="qx.bom.Event",g="return;",f="mouseover",d="function",c="engine.version",b="undefined",a="on";qx.Bootstrap.define(h,{statics:{addNativeListener:function(k,l,m,n){if(k.addEventListener){k.addEventListener(l,m,!!n);}
else if(k.attachEvent){k.attachEvent(a+l,m);}
else if(typeof k[a+l]!=b){k[a+l]=m;}
else {{}
;}
;;}
,removeNativeListener:function(o,p,q,r){if(o.removeEventListener){o.removeEventListener(p,q,!!r);}
else if(o.detachEvent){try{o.detachEvent(a+p,q);}
catch(e){if(e.number!==-2146828218){throw e;}
;}
;}
else if(typeof o[a+p]!=b){o[a+p]=null;}
else {{}
;}
;;}
,getTarget:function(e){return e.target||e.srcElement;}
,getRelatedTarget:function(e){if(e.relatedTarget!==undefined){{}
;return e.relatedTarget;}
else if(e.fromElement!==undefined&&e.type===f){return e.fromElement;}
else if(e.toElement!==undefined){return e.toElement;}
else {return null;}
;;}
,preventDefault:function(e){if(e.preventDefault){if((false)&&parseFloat(qx.core.Environment.get(c))>=1.9&&e.type==i&&e.button==2){return;}
;e.preventDefault();if((false)&&parseFloat(qx.core.Environment.get(c))<1.9){try{e.keyCode=0;}
catch(s){}
;}
;}
else {try{e.keyCode=0;}
catch(t){}
;e.returnValue=false;}
;}
,stopPropagation:function(e){if(e.stopPropagation){e.stopPropagation();}
else {e.cancelBubble=true;}
;}
,fire:function(u,v){if(document.createEvent){var w=document.createEvent(j);w.initEvent(v,true,true);return !u.dispatchEvent(w);}
else {var w=document.createEventObject();return u.fireEvent(a+v,w);}
;}
,supportsEvent:function(x,y){var z=a+y;var A=(z in x);if(!A){A=typeof x[z]==d;if(!A&&x.setAttribute){x.setAttribute(z,g);A=typeof x[z]==d;x.removeAttribute(z);}
;}
;return A;}
}});}
)();
(function(){var j="[object Opera]",i="[^\\.0-9]",h="4.0",g="1.9.0.0",f="Version/",e="9.0",d="8.0",c="Gecko",b="AppleWebKit/",a="opera",w="engine.version",v="mshtml",u="engine.name",t="webkit",s="5.0",r="qx.bom.client.Engine",q="function",p="gecko",o="Maple",n="Unsupported client: ",l="",m="! Assumed gecko version 1.9.0.0 (Firefox 3.0).",k=".";qx.Bootstrap.define(r,{statics:{getVersion:function(){var A=window.navigator.userAgent;var y=l;if(qx.bom.client.Engine.__cu()){if(/Opera[\s\/]([0-9]+)\.([0-9])([0-9]*)/.test(A)){if(A.indexOf(f)!=-1){var z=A.match(/Version\/(\d+)\.(\d+)/);y=z[1]+k+z[2].charAt(0)+k+z[2].substring(1,z[2].length);}
else {y=RegExp.$1+k+RegExp.$2;if(RegExp.$3!=l){y+=k+RegExp.$3;}
;}
;}
;}
else if(qx.bom.client.Engine.__cv()){if(/AppleWebKit\/([^ ]+)/.test(A)){y=RegExp.$1;var B=RegExp(i).exec(y);if(B){y=y.slice(0,B.index);}
;}
;}
else if(qx.bom.client.Engine.__cx()||qx.bom.client.Engine.__cw()){if(/rv\:([^\);]+)(\)|;)/.test(A)){y=RegExp.$1;}
;}
else if(qx.bom.client.Engine.__cy()){if(/MSIE\s+([^\);]+)(\)|;)/.test(A)){y=RegExp.$1;if(y<8&&/Trident\/([^\);]+)(\)|;)/.test(A)){if(RegExp.$1==h){y=d;}
else if(RegExp.$1==s){y=e;}
;}
;}
;}
else {var x=window.qxFail;if(x&&typeof x===q){y=x().FULLVERSION;}
else {y=g;qx.Bootstrap.warn(n+A+m);}
;}
;;;return y;}
,getName:function(){var name;if(qx.bom.client.Engine.__cu()){name=a;}
else if(qx.bom.client.Engine.__cv()){name=t;}
else if(qx.bom.client.Engine.__cx()||qx.bom.client.Engine.__cw()){name=p;}
else if(qx.bom.client.Engine.__cy()){name=v;}
else {var C=window.qxFail;if(C&&typeof C===q){name=C().NAME;}
else {name=p;qx.Bootstrap.warn(n+window.navigator.userAgent+m);}
;}
;;;return name;}
,__cu:function(){return window.opera&&Object.prototype.toString.call(window.opera)==j;}
,__cv:function(){return window.navigator.userAgent.indexOf(b)!=-1;}
,__cw:function(){return window.navigator.userAgent.indexOf(o)!=-1;}
,__cx:function(){return window.controllers&&window.navigator.product===c&&window.navigator.userAgent.indexOf(o)==-1;}
,__cy:function(){return window.navigator.cpuClass&&/MSIE\s+([^\);]+)(\)|;)/.test(window.navigator.userAgent);}
},defer:function(D){qx.core.Environment.add(w,D.getVersion);qx.core.Environment.add(u,D.getName);}
});}
)();
(function(){var r="__cD",q="UNKNOWN_",p="__cE",o="c",n="DOM_",m="WIN_",k="QX_",j="qx.event.Manager",h="capture",g="DOCUMENT_",c="unload",f="",e="_",b="|",a="|bubble",d="|capture";qx.Class.define(j,{extend:Object,construct:function(s,t){this.__cz=s;this.__cA=qx.core.ObjectRegistry.toHashCode(s);this.__cB=t;if(s.qx!==qx){var self=this;qx.bom.Event.addNativeListener(s,c,qx.event.GlobalError.observeMethod(function(){qx.bom.Event.removeNativeListener(s,c,arguments.callee);self.dispose();}
));}
;this.__cC={};this.__cD={};this.__cE={};this.__cF={};}
,statics:{__cG:0,getNextUniqueId:function(){return (this.__cG++)+f;}
},members:{__cB:null,__cC:null,__cE:null,__cH:null,__cD:null,__cF:null,__cz:null,__cA:null,getWindow:function(){return this.__cz;}
,getWindowId:function(){return this.__cA;}
,getHandler:function(u){var v=this.__cD[u.classname];if(v){return v;}
;return this.__cD[u.classname]=new u(this);}
,getDispatcher:function(w){var x=this.__cE[w.classname];if(x){return x;}
;return this.__cE[w.classname]=new w(this,this.__cB);}
,getListeners:function(y,z,A){var B=y.$$hash||qx.core.ObjectRegistry.toHashCode(y);var D=this.__cC[B];if(!D){return null;}
;var E=z+(A?d:a);var C=D[E];return C?C.concat():null;}
,getAllListeners:function(){return this.__cC;}
,serializeListeners:function(F){var M=F.$$hash||qx.core.ObjectRegistry.toHashCode(F);var O=this.__cC[M];var K=[];if(O){var I,N,G,J,L;for(var H in O){I=H.indexOf(b);N=H.substring(0,I);G=H.charAt(I+1)==o;J=O[H];for(var i=0,l=J.length;i<l;i++){L=J[i];K.push({self:L.context,handler:L.handler,type:N,capture:G});}
;}
;}
;return K;}
,toggleAttachedEvents:function(P,Q){var V=P.$$hash||qx.core.ObjectRegistry.toHashCode(P);var X=this.__cC[V];if(X){var S,W,R,T;for(var U in X){S=U.indexOf(b);W=U.substring(0,S);R=U.charCodeAt(S+1)===99;T=X[U];if(Q){this.__cI(P,W,R);}
else {this.__cJ(P,W,R);}
;}
;}
;}
,hasListener:function(Y,ba,bb){{}
;var bc=Y.$$hash||qx.core.ObjectRegistry.toHashCode(Y);var be=this.__cC[bc];if(!be){return false;}
;var bf=ba+(bb?d:a);var bd=be[bf];return !!(bd&&bd.length>0);}
,importListeners:function(bg,bh){{}
;var bn=bg.$$hash||qx.core.ObjectRegistry.toHashCode(bg);var bo=this.__cC[bn]={};var bk=qx.event.Manager;for(var bi in bh){var bl=bh[bi];var bm=bl.type+(bl.capture?d:a);var bj=bo[bm];if(!bj){bj=bo[bm]=[];this.__cI(bg,bl.type,bl.capture);}
;bj.push({handler:bl.listener,context:bl.self,unique:bl.unique||(bk.__cG++)+f});}
;}
,addListener:function(bp,bq,br,self,bs){var bw;{}
;var bx=bp.$$hash||qx.core.ObjectRegistry.toHashCode(bp);var bz=this.__cC[bx];if(!bz){bz=this.__cC[bx]={};}
;var bv=bq+(bs?d:a);var bu=bz[bv];if(!bu){bu=bz[bv]=[];}
;if(bu.length===0){this.__cI(bp,bq,bs);}
;var by=(qx.event.Manager.__cG++)+f;var bt={handler:br,context:self,unique:by};bu.push(bt);return bv+b+by;}
,findHandler:function(bA,bB){var bN=false,bF=false,bO=false,bC=false;var bL;if(bA.nodeType===1){bN=true;bL=n+bA.tagName.toLowerCase()+e+bB;}
else if(bA.nodeType===9){bC=true;bL=g+bB;}
else if(bA==this.__cz){bF=true;bL=m+bB;}
else if(bA.classname){bO=true;bL=k+bA.classname+e+bB;}
else {bL=q+bA+e+bB;}
;;;var bH=this.__cF;if(bH[bL]){return bH[bL];}
;var bK=this.__cB.getHandlers();var bG=qx.event.IEventHandler;var bI,bJ,bE,bD;for(var i=0,l=bK.length;i<l;i++){bI=bK[i];bE=bI.SUPPORTED_TYPES;if(bE&&!bE[bB]){continue;}
;bD=bI.TARGET_CHECK;if(bD){var bM=false;if(bN&&((bD&bG.TARGET_DOMNODE)!=0)){bM=true;}
else if(bF&&((bD&bG.TARGET_WINDOW)!=0)){bM=true;}
else if(bO&&((bD&bG.TARGET_OBJECT)!=0)){bM=true;}
else if(bC&&((bD&bG.TARGET_DOCUMENT)!=0)){bM=true;}
;;;if(!bM){continue;}
;}
;bJ=this.getHandler(bK[i]);if(bI.IGNORE_CAN_HANDLE||bJ.canHandleEvent(bA,bB)){bH[bL]=bJ;return bJ;}
;}
;return null;}
,__cI:function(bP,bQ,bR){var bS=this.findHandler(bP,bQ);if(bS){bS.registerEvent(bP,bQ,bR);return;}
;{}
;}
,removeListener:function(bT,bU,bV,self,bW){var cb;{}
;var cc=bT.$$hash||qx.core.ObjectRegistry.toHashCode(bT);var cd=this.__cC[cc];if(!cd){return false;}
;var bX=bU+(bW?d:a);var bY=cd[bX];if(!bY){return false;}
;var ca;for(var i=0,l=bY.length;i<l;i++){ca=bY[i];if(ca.handler===bV&&ca.context===self){qx.lang.Array.removeAt(bY,i);if(bY.length==0){this.__cJ(bT,bU,bW);}
;return true;}
;}
;return false;}
,removeListenerById:function(ce,cf){var cl;{}
;var cj=cf.split(b);var co=cj[0];var cg=cj[1].charCodeAt(0)==99;var cn=cj[2];var cm=ce.$$hash||qx.core.ObjectRegistry.toHashCode(ce);var cp=this.__cC[cm];if(!cp){return false;}
;var ck=co+(cg?d:a);var ci=cp[ck];if(!ci){return false;}
;var ch;for(var i=0,l=ci.length;i<l;i++){ch=ci[i];if(ch.unique===cn){qx.lang.Array.removeAt(ci,i);if(ci.length==0){this.__cJ(ce,co,cg);}
;return true;}
;}
;return false;}
,removeAllListeners:function(cq){var cu=cq.$$hash||qx.core.ObjectRegistry.toHashCode(cq);var cw=this.__cC[cu];if(!cw){return false;}
;var cs,cv,cr;for(var ct in cw){if(cw[ct].length>0){cs=ct.split(b);cv=cs[0];cr=cs[1]===h;this.__cJ(cq,cv,cr);}
;}
;delete this.__cC[cu];return true;}
,deleteAllListeners:function(cx){delete this.__cC[cx];}
,__cJ:function(cy,cz,cA){var cB=this.findHandler(cy,cz);if(cB){cB.unregisterEvent(cy,cz,cA);return;}
;{}
;}
,dispatchEvent:function(cC,event){var cH;{}
;var cI=event.getType();if(!event.getBubbles()&&!this.hasListener(cC,cI)){qx.event.Pool.getInstance().poolObject(event);return true;}
;if(!event.getTarget()){event.setTarget(cC);}
;var cG=this.__cB.getDispatchers();var cF;var cE=false;for(var i=0,l=cG.length;i<l;i++){cF=this.getDispatcher(cG[i]);if(cF.canDispatchEvent(cC,event,cI)){cF.dispatchEvent(cC,event,cI);cE=true;break;}
;}
;if(!cE){{}
;return true;}
;var cD=event.getDefaultPrevented();qx.event.Pool.getInstance().poolObject(event);return !cD;}
,dispose:function(){this.__cB.removeManager(this);qx.util.DisposeUtil.disposeMap(this,r);qx.util.DisposeUtil.disposeMap(this,p);this.__cC=this.__cz=this.__cH=null;this.__cB=this.__cF=null;}
}});}
)();
(function(){var a="qx.event.IEventHandler";qx.Interface.define(a,{statics:{TARGET_DOMNODE:1,TARGET_WINDOW:2,TARGET_OBJECT:4,TARGET_DOCUMENT:8},members:{canHandleEvent:function(b,c){}
,registerEvent:function(d,e,f){}
,unregisterEvent:function(g,h,i){}
}});}
)();
(function(){var c="qx.event.Registration";qx.Class.define(c,{statics:{__cK:{},getManager:function(d){if(d==null){{}
;d=window;}
else if(d.nodeType){d=qx.dom.Node.getWindow(d);}
else if(!qx.dom.Node.isWindow(d)){d=window;}
;;var f=d.$$hash||qx.core.ObjectRegistry.toHashCode(d);var e=this.__cK[f];if(!e){e=new qx.event.Manager(d,this);this.__cK[f]=e;}
;return e;}
,removeManager:function(g){var h=g.getWindowId();delete this.__cK[h];}
,addListener:function(i,j,k,self,l){return this.getManager(i).addListener(i,j,k,self,l);}
,removeListener:function(m,n,o,self,p){return this.getManager(m).removeListener(m,n,o,self,p);}
,removeListenerById:function(q,r){return this.getManager(q).removeListenerById(q,r);}
,removeAllListeners:function(s){return this.getManager(s).removeAllListeners(s);}
,deleteAllListeners:function(t){var u=t.$$hash;if(u){this.getManager(t).deleteAllListeners(u);}
;}
,hasListener:function(v,w,x){return this.getManager(v).hasListener(v,w,x);}
,serializeListeners:function(y){return this.getManager(y).serializeListeners(y);}
,createEvent:function(z,A,B){{}
;if(A==null){A=qx.event.type.Event;}
;var C=qx.event.Pool.getInstance().getObject(A);B?C.init.apply(C,B):C.init();if(z){C.setType(z);}
;return C;}
,dispatchEvent:function(D,event){return this.getManager(D).dispatchEvent(D,event);}
,fireEvent:function(E,F,G,H){var I;{}
;var J=this.createEvent(F,G||null,H);return this.getManager(E).dispatchEvent(E,J);}
,fireNonBubblingEvent:function(K,L,M,N){{}
;var O=this.getManager(K);if(!O.hasListener(K,L,false)){return true;}
;var P=this.createEvent(L,M||null,N);return O.dispatchEvent(K,P);}
,PRIORITY_FIRST:-32000,PRIORITY_NORMAL:0,PRIORITY_LAST:32000,__cD:[],addHandler:function(Q){{}
;this.__cD.push(Q);this.__cD.sort(function(a,b){return a.PRIORITY-b.PRIORITY;}
);}
,getHandlers:function(){return this.__cD;}
,__cE:[],addDispatcher:function(R,S){{}
;this.__cE.push(R);this.__cE.sort(function(a,b){return a.PRIORITY-b.PRIORITY;}
);}
,getDispatchers:function(){return this.__cE;}
}});}
)();
(function(){var a="qx.core.MEvents";qx.Mixin.define(a,{members:{__cL:qx.event.Registration,addListener:function(b,c,self,d){if(!this.$$disposed){return this.__cL.addListener(this,b,c,self,d);}
;return null;}
,addListenerOnce:function(f,g,self,h){var i=function(e){this.removeListener(f,i,this,h);g.call(self||this,e);}
;return this.addListener(f,i,this,h);}
,removeListener:function(j,k,self,l){if(!this.$$disposed){return this.__cL.removeListener(this,j,k,self,l);}
;return false;}
,removeListenerById:function(m){if(!this.$$disposed){return this.__cL.removeListenerById(this,m);}
;return false;}
,hasListener:function(n,o){return this.__cL.hasListener(this,n,o);}
,dispatchEvent:function(p){if(!this.$$disposed){return this.__cL.dispatchEvent(this,p);}
;return true;}
,fireEvent:function(q,r,s){if(!this.$$disposed){return this.__cL.fireEvent(this,q,r,s);}
;return true;}
,fireNonBubblingEvent:function(t,u,v){if(!this.$$disposed){return this.__cL.fireNonBubblingEvent(this,t,u,v);}
;return true;}
,fireDataEvent:function(w,x,y,z){if(!this.$$disposed){if(y===undefined){y=null;}
;return this.__cL.fireNonBubblingEvent(this,w,qx.event.type.Data,[x,y,!!z]);}
;return true;}
}});}
)();
(function(){var a="qx.event.IEventDispatcher";qx.Interface.define(a,{members:{canDispatchEvent:function(b,event,c){this.assertInstance(event,qx.event.type.Event);this.assertString(c);}
,dispatchEvent:function(d,event,e){this.assertInstance(event,qx.event.type.Event);this.assertString(e);}
}});}
)();
(function(){var k="module.events",j="Cloning only possible with properties.",h="qx.core.Object",g="[",f="$$user_",e="]",d="rv:1.8.1",c="MSIE 6.0",b="Object",a="module.property";qx.Class.define(h,{extend:Object,include:qx.core.Environment.filter({"module.databinding":qx.data.MBinding,"module.logger":qx.core.MLogging,"module.events":qx.core.MEvents,"module.property":qx.core.MProperty}),construct:function(){qx.core.ObjectRegistry.register(this);}
,statics:{$$type:b},members:{__M:qx.core.Environment.get("module.property")?qx.core.Property:null,toHashCode:function(){return this.$$hash;}
,toString:function(){return this.classname+g+this.$$hash+e;}
,base:function(m,n){{}
;if(arguments.length===1){return m.callee.base.call(this);}
else {return m.callee.base.apply(this,Array.prototype.slice.call(arguments,1));}
;}
,self:function(o){return o.callee.self;}
,clone:function(){if(!qx.core.Environment.get(a)){throw new Error(j);}
;var q=this.constructor;var p=new q;var s=qx.Class.getProperties(q);var r=this.__M.$$store.user;var t=this.__M.$$method.set;var name;for(var i=0,l=s.length;i<l;i++){name=s[i];if(this.hasOwnProperty(r[name])){p[t[name]](this[r[name]]);}
;}
;return p;}
,__cM:null,setUserData:function(u,v){if(!this.__cM){this.__cM={};}
;this.__cM[u]=v;}
,getUserData:function(w){if(!this.__cM){return null;}
;var x=this.__cM[w];return x===undefined?null:x;}
,isDisposed:function(){return this.$$disposed||false;}
,dispose:function(){var C,A,z,D;if(this.$$disposed){return;}
;this.$$disposed=true;this.$$instance=null;this.$$allowconstruct=null;{}
;var B=this.constructor;var y;while(B.superclass){if(B.$$destructor){B.$$destructor.call(this);}
;if(B.$$includes){y=B.$$flatIncludes;for(var i=0,l=y.length;i<l;i++){if(y[i].$$destructor){y[i].$$destructor.call(this);}
;}
;}
;B=B.superclass;}
;if(this.__cN){this.__cN();}
;{}
;}
,__cN:null,__cO:function(){var E=qx.Class.getProperties(this.constructor);for(var i=0,l=E.length;i<l;i++){delete this[f+E[i]];}
;}
,_disposeObjects:function(F){qx.util.DisposeUtil.disposeObjects(this,arguments);}
,_disposeSingletonObjects:function(G){qx.util.DisposeUtil.disposeObjects(this,arguments,true);}
,_disposeArray:function(H){qx.util.DisposeUtil.disposeArray(this,H);}
,_disposeMap:function(I){qx.util.DisposeUtil.disposeMap(this,I);}
},environment:{"qx.disposerDebugLevel":0},defer:function(J,K){var M=navigator.userAgent.indexOf(c)!=-1;var L=navigator.userAgent.indexOf(d)!=-1;if(M||L){K.__cN=K.__cO;}
;}
,destruct:function(){if(qx.core.Environment.get(k)){if(!qx.core.ObjectRegistry.inShutDown){qx.event.Registration.removeAllListeners(this);}
else {qx.event.Registration.deleteAllListeners(this);}
;}
;qx.core.ObjectRegistry.unregister(this);this.__cM=null;if(qx.core.Environment.get(a)){var P=this.constructor;var T;var U=this.__M.$$store;var R=U.user;var S=U.theme;var N=U.inherit;var Q=U.useinit;var O=U.init;while(P){T=P.$$properties;if(T){for(var name in T){if(T[name].dereference){this[R[name]]=this[S[name]]=this[N[name]]=this[Q[name]]=this[O[name]]=undefined;}
;}
;}
;P=P.superclass;}
;}
;}
});}
)();
(function(){var j=" is a singleton! Please use disposeSingleton instead.",h="qx.util.DisposeUtil",g="!",f="The map field: ",e="The array field: ",d="The object stored in key ",c="Has no disposable object under key: ",b=" of object: ",a=" has non disposable entries: ";qx.Class.define(h,{statics:{disposeObjects:function(k,m,n){var name;for(var i=0,l=m.length;i<l;i++){name=m[i];if(k[name]==null||!k.hasOwnProperty(name)){continue;}
;if(!qx.core.ObjectRegistry.inShutDown){if(k[name].dispose){if(!n&&k[name].constructor.$$instance){throw new Error(d+name+j);}
else {k[name].dispose();}
;}
else {throw new Error(c+name+g);}
;}
;k[name]=null;}
;}
,disposeArray:function(o,p){var r=o[p];if(!r){return;}
;if(qx.core.ObjectRegistry.inShutDown){o[p]=null;return;}
;try{var q;for(var i=r.length-1;i>=0;i--){q=r[i];if(q){q.dispose();}
;}
;}
catch(s){throw new Error(e+p+b+o+a+s);}
;r.length=0;o[p]=null;}
,disposeMap:function(t,u){var w=t[u];if(!w){return;}
;if(qx.core.ObjectRegistry.inShutDown){t[u]=null;return;}
;try{var v;for(var x in w){v=w[x];if(w.hasOwnProperty(x)&&v){v.dispose();}
;}
;}
catch(y){throw new Error(f+u+b+t+a+y);}
;t[u]=null;}
,disposeTriggeredBy:function(z,A){var B=A.dispose;A.dispose=function(){B.call(A);z.dispose();}
;}
}});}
)();
(function(){var a="qx.event.type.Event";qx.Class.define(a,{extend:qx.core.Object,statics:{CAPTURING_PHASE:1,AT_TARGET:2,BUBBLING_PHASE:3},members:{init:function(b,c){{}
;this._type=null;this._target=null;this._currentTarget=null;this._relatedTarget=null;this._originalTarget=null;this._stopPropagation=false;this._preventDefault=false;this._bubbles=!!b;this._cancelable=!!c;this._timeStamp=(new Date()).getTime();this._eventPhase=null;return this;}
,clone:function(d){if(d){var e=d;}
else {var e=qx.event.Pool.getInstance().getObject(this.constructor);}
;e._type=this._type;e._target=this._target;e._currentTarget=this._currentTarget;e._relatedTarget=this._relatedTarget;e._originalTarget=this._originalTarget;e._stopPropagation=this._stopPropagation;e._bubbles=this._bubbles;e._preventDefault=this._preventDefault;e._cancelable=this._cancelable;return e;}
,stop:function(){if(this._bubbles){this.stopPropagation();}
;if(this._cancelable){this.preventDefault();}
;}
,stopPropagation:function(){{}
;this._stopPropagation=true;}
,getPropagationStopped:function(){return !!this._stopPropagation;}
,preventDefault:function(){{}
;this._preventDefault=true;}
,getDefaultPrevented:function(){return !!this._preventDefault;}
,getType:function(){return this._type;}
,setType:function(f){this._type=f;}
,getEventPhase:function(){return this._eventPhase;}
,setEventPhase:function(g){this._eventPhase=g;}
,getTimeStamp:function(){return this._timeStamp;}
,getTarget:function(){return this._target;}
,setTarget:function(h){this._target=h;}
,getCurrentTarget:function(){return this._currentTarget||this._target;}
,setCurrentTarget:function(i){this._currentTarget=i;}
,getRelatedTarget:function(){return this._relatedTarget;}
,setRelatedTarget:function(j){this._relatedTarget=j;}
,getOriginalTarget:function(){return this._originalTarget;}
,setOriginalTarget:function(k){this._originalTarget=k;}
,getBubbles:function(){return this._bubbles;}
,setBubbles:function(l){this._bubbles=l;}
,isCancelable:function(){return this._cancelable;}
,setCancelable:function(m){this._cancelable=m;}
},destruct:function(){this._target=this._currentTarget=this._relatedTarget=this._originalTarget=null;}
});}
)();
(function(){var d="qx.util.ObjectPool",c="Class needs to be defined!",b="Object is already pooled: ",a="Integer";qx.Class.define(d,{extend:qx.core.Object,construct:function(e){qx.core.Object.call(this);this.__cP={};if(e!=null){this.setSize(e);}
;}
,properties:{size:{check:a,init:Infinity}},members:{__cP:null,getObject:function(f){if(this.$$disposed){return new f;}
;if(!f){throw new Error(c);}
;var g=null;var h=this.__cP[f.classname];if(h){g=h.pop();}
;if(g){g.$$pooled=false;}
else {g=new f;}
;return g;}
,poolObject:function(j){if(!this.__cP){return;}
;var k=j.classname;var m=this.__cP[k];if(j.$$pooled){throw new Error(b+j);}
;if(!m){this.__cP[k]=m=[];}
;if(m.length>this.getSize()){if(j.destroy){j.destroy();}
else {j.dispose();}
;return;}
;j.$$pooled=true;m.push(j);}
},destruct:function(){var p=this.__cP;var n,o,i,l;for(n in p){o=p[n];for(i=0,l=o.length;i<l;i++){o[i].dispose();}
;}
;delete this.__cP;}
});}
)();
(function(){var b="singleton",a="qx.event.Pool";qx.Class.define(a,{extend:qx.util.ObjectPool,type:b,construct:function(){qx.util.ObjectPool.call(this,30);}
});}
)();
(function(){var a="qx.event.dispatch.Direct";qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventDispatcher,construct:function(b){this._manager=b;}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_LAST},members:{canDispatchEvent:function(c,event,d){return !event.getBubbles();}
,dispatchEvent:function(e,event,f){var j,g;{}
;event.setEventPhase(qx.event.type.Event.AT_TARGET);var k=this._manager.getListeners(e,f,false);if(k){for(var i=0,l=k.length;i<l;i++){var h=k[i].context||e;{}
;k[i].handler.call(h,event);}
;}
;}
},defer:function(m){qx.event.Registration.addDispatcher(m);}
});}
)();
(function(){var a="qx.event.handler.Object";qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_LAST,SUPPORTED_TYPES:null,TARGET_CHECK:qx.event.IEventHandler.TARGET_OBJECT,IGNORE_CAN_HANDLE:false},members:{canHandleEvent:function(b,c){return qx.Class.supportsEvent(b.constructor,c);}
,registerEvent:function(d,e,f){}
,unregisterEvent:function(g,h,i){}
},defer:function(j){qx.event.Registration.addHandler(j);}
});}
)();
(function(){var a="qx.event.type.Data";qx.Class.define(a,{extend:qx.event.type.Event,members:{__cQ:null,__cR:null,init:function(b,c,d){qx.event.type.Event.prototype.init.call(this,false,d);this.__cQ=b;this.__cR=c;return this;}
,clone:function(e){var f=qx.event.type.Event.prototype.clone.call(this,e);f.__cQ=this.__cQ;f.__cR=this.__cR;return f;}
,getData:function(){return this.__cQ;}
,getOldData:function(){return this.__cR;}
},destruct:function(){this.__cQ=this.__cR=null;}
});}
)();
(function(){var a="qx.application.IApplication";qx.Interface.define(a,{members:{main:function(){}
,finalize:function(){}
,close:function(){}
,terminate:function(){}
}});}
)();
(function(){var b="qx.locale.MTranslation",a="To enable localization please include qx.locale.Manager into your build!";qx.Mixin.define(b,{members:{tr:function(c,d){var e=qx.locale.Manager;if(e){return e.tr.apply(e,arguments);}
;throw new Error(a);}
,trn:function(f,g,h,i){var j=qx.locale.Manager;if(j){return j.trn.apply(j,arguments);}
;throw new Error(a);}
,trc:function(k,l,m){var n=qx.locale.Manager;if(n){return n.trc.apply(n,arguments);}
;throw new Error(a);}
,marktr:function(o){var p=qx.locale.Manager;if(p){return p.marktr.apply(p,arguments);}
;throw new Error(a);}
}});}
)();
(function(){var a="qx.application.Mobile";qx.Class.define(a,{extend:qx.core.Object,implement:[qx.application.IApplication],include:qx.locale.MTranslation,construct:function(){qx.core.Object.call(this);}
,members:{__cS:null,main:function(){this.__cS=this._createRootWidget();this.__cS.setShowScrollbarY(false);}
,getRoot:function(){return this.__cS;}
,_createRootWidget:function(){return new qx.ui.mobile.core.Root();}
,finalize:function(){}
,close:function(){}
,terminate:function(){}
},destruct:function(){this.__cS=null;}
});}
)();
(function(){var a="qx.ui.mobile.core.MChildrenHandling";qx.Mixin.define(a,{members:{getChildren:function(){return this._getChildren();}
,hasChildren:function(){return this._hasChildren();}
,indexOf:function(b){return this._indexOf(b);}
,add:function(c,d){this._add(c,d);}
,addBefore:function(e,f,g){this._addBefore(e,f,g);}
,addAfter:function(h,i,j){this._addAfter(h,i,j);}
,remove:function(k){this._remove(k);}
,removeAt:function(l){return this._removeAt(l);}
,removeAll:function(){this._removeAll();}
},statics:{remap:function(m){m.getChildren=m._getChildren;m.hasChildren=m._hasChildren;m.indexOf=m._indexOf;m.add=m._add;m.addBefore=m._addBefore;m.addAfter=m._addAfter;m.remove=m._remove;m.removeAt=m._removeAt;m.removeAll=m._removeAll;}
}});}
)();
(function(){var h="shutdown",g="qx.event.handler.Application",f="complete",d="DOMContentLoaded",c="ready",b="load",a="unload";qx.Class.define(g,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(i){qx.core.Object.call(this);this._window=i.getWindow();this.__cT=false;this.__cU=false;this.__cV=false;this.__cW=false;this._initObserver();qx.event.handler.Application.$$instance=this;}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{ready:1,shutdown:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true,onScriptLoaded:function(){var j=qx.event.handler.Application.$$instance;if(j){j.__cX();}
;}
},members:{canHandleEvent:function(k,l){}
,registerEvent:function(m,n,o){}
,unregisterEvent:function(p,q,r){}
,__cV:null,__cT:null,__cU:null,__cW:null,__cX:function(){if(!this.__cV&&this.__cT&&qx.$$loader.scriptLoaded){this.__cV=true;qx.event.Registration.fireEvent(this._window,c);}
;}
,isApplicationReady:function(){return this.__cV;}
,_initObserver:function(){if(qx.$$domReady||document.readyState==f||document.readyState==c){this.__cT=true;this.__cX();}
else {var self,s;this._onNativeLoadWrapped=qx.lang.Function.bind(this._onNativeLoad,this);if(false||false||true){qx.bom.Event.addNativeListener(this._window,d,this._onNativeLoadWrapped);}
else {}
;qx.bom.Event.addNativeListener(this._window,b,this._onNativeLoadWrapped);}
;this._onNativeUnloadWrapped=qx.lang.Function.bind(this._onNativeUnload,this);qx.bom.Event.addNativeListener(this._window,a,this._onNativeUnloadWrapped);}
,_stopObserver:function(){if(this._onNativeLoadWrapped){qx.bom.Event.removeNativeListener(this._window,b,this._onNativeLoadWrapped);}
;qx.bom.Event.removeNativeListener(this._window,a,this._onNativeUnloadWrapped);this._onNativeLoadWrapped=null;this._onNativeUnloadWrapped=null;}
,_onNativeLoad:qx.event.GlobalError.observeMethod(function(){this.__cT=true;this.__cX();}
),_onNativeUnload:qx.event.GlobalError.observeMethod(function(){if(!this.__cW){this.__cW=true;try{qx.event.Registration.fireEvent(this._window,h);}
catch(e){throw e;}
finally{qx.core.ObjectRegistry.shutdown();}
;}
;}
)},destruct:function(){this._stopObserver();this._window=null;}
,defer:function(t){qx.event.Registration.addHandler(t);}
});}
)();
(function(){var c="ready",b="qx.bom.Lifecycle",a="shutdown";qx.Class.define(b,{statics:{onReady:function(d,e){var g=qx.event.Registration;var f=g.getManager(window).getHandler(qx.event.handler.Application);if(f&&f.isApplicationReady()){d.call(e);}
else {g.addListener(window,c,d,e);}
;}
,onShutdown:function(h,i){qx.event.Registration.addListener(window,a,h,i);}
}});}
)();
(function(){var k="changeVisibility",j="div",h="changeId",g="qx.event.type.KeyInput",f="_transformId",e="qx.event.type.MouseWheel",d="_applyEnabled",c="_applyId",b="changeEnabled",a="",G="_applyDefaultCssClass",F="This widget has no children!",E="undefined",D="qx.ui.mobile.core.Widget",C="_applyStyle",B="_applyVisibility",A="_applyAttribute",z="disabled",y="visibility",x="exclude",s='anonymous',t="Boolean",q="qx.event.type.KeySequence",r="String",o="qx.event.type.Event",p="excluded",m="hidden",n="qx.event.type.Focus",u="qx.event.type.Touch",v="visible",w="qx.event.type.Mouse";qx.Class.define(D,{extend:qx.core.Object,include:[qx.locale.MTranslation],construct:function(){qx.core.Object.call(this);this._setContainerElement(this._createContainerElement());this.__cY=[];this.setId(this.getId());this.initDefaultCssClass();this.initName();this.initAnonymous();this.initActivatable();}
,events:{mousemove:w,mouseover:w,mouseout:w,mousedown:w,mouseup:w,click:w,dblclick:w,contextmenu:w,beforeContextmenuOpen:w,mousewheel:e,touchstart:u,touchend:u,touchmove:u,touchcancel:u,tap:u,swipe:u,keyup:q,keydown:q,keypress:q,keyinput:g,domupdated:o,appear:o,disappear:o,focus:n,blur:n,focusin:n,focusout:n,activate:n,deactivate:n},properties:{defaultCssClass:{check:r,init:null,nullable:true,apply:G},enabled:{init:true,check:t,nullable:false,event:b,apply:d},name:{check:r,init:null,nullable:true,apply:A},anonymous:{check:t,init:null,nullable:true,apply:C},id:{check:r,init:null,nullable:true,apply:c,transform:f,event:h},visibility:{check:[v,m,p],init:v,apply:B,event:k},activatable:{check:t,init:false,apply:A}},statics:{ID_PREFIX:"qx_id_",__j:{},__da:0,__db:null,onShutdown:function(){window.clearTimeout(qx.ui.mobile.core.Widget.__db);delete qx.ui.mobile.core.Widget.__j;}
,getCurrentId:function(){return qx.ui.mobile.core.Widget.__da;}
,registerWidget:function(H){var I=H.getId();var J=qx.ui.mobile.core.Widget.__j;{}
;J[I]=H;}
,unregisterWidget:function(K){delete qx.ui.mobile.core.Widget.__j[K];}
,getWidgetById:function(L){return qx.ui.mobile.core.Widget.__j[L];}
,scheduleDomUpdated:function(){if(qx.ui.mobile.core.Widget.__db==null){qx.ui.mobile.core.Widget.__db=window.setTimeout(qx.ui.mobile.core.Widget.domUpdated,0);}
;}
,domUpdated:qx.event.GlobalError.observeMethod(function(){var M=qx.ui.mobile.core.Widget;window.clearTimeout(M.__db);M.__db=null;qx.event.handler.Appear.refresh();qx.ui.mobile.core.DomUpdatedHandler.refresh();}
),addAttributeMapping:function(N,O,P){var Q;{}
;qx.ui.mobile.core.Widget.ATTRIBUTE_MAPPING[N]={attribute:O,values:P};}
,addStyleMapping:function(R,S,T){var U;{}
;qx.ui.mobile.core.Widget.STYLE_MAPPING[R]={style:S,values:T};}
,ATTRIBUTE_MAPPING:{"selectable":{attribute:"data-selectable",values:{"true":null,"false":"false"}},"activatable":{attribute:"data-activatable",values:{"true":"true","false":null}},"readOnly":{attribute:"readonly"}},STYLE_MAPPING:{"anonymous":{style:"pointerEvents",values:{"true":"none","false":null}}}},members:{__dc:null,__dd:null,__de:null,__cY:null,__df:null,_getTagName:function(){return j;}
,_createContainerElement:function(){return qx.bom.Element.create(this._getTagName());}
,_domUpdated:function(){qx.ui.mobile.core.Widget.scheduleDomUpdated();}
,_transformId:function(V){if(V==null){var W=qx.ui.mobile.core.Widget;V=W.ID_PREFIX+W.__da++;}
;return V;}
,_applyId:function(X,Y){if(Y!=null){qx.ui.mobile.core.Widget.unregisterWidget(Y);}
;var ba=this.getContainerElement();ba.id=X;qx.ui.mobile.core.Widget.registerWidget(this);}
,_applyEnabled:function(bb,bc){if(bb){this.removeCssClass(z);this._setStyle(s,this.getAnonymous());}
else {this.addCssClass(z);this._setStyle(s,true);}
;}
,_add:function(bd,be){{}
;bd.setLayoutParent(this);bd.setLayoutProperties(be);this.getContentElement().appendChild(bd.getContainerElement());this.__cY.push(bd);this._domUpdated();}
,_addBefore:function(bf,bg,bh){{}
;if(bf==bg){return;}
;bf.setLayoutParent(this);bf.setLayoutProperties(bh);this.getContentElement().insertBefore(bf.getContainerElement(),bg.getContainerElement());qx.lang.Array.insertBefore(this.__cY,bf,bg);this._domUpdated();}
,_addAfter:function(bi,bj,bk){{}
;if(bi==bj){return;}
;bi.setLayoutParent(this);bi.setLayoutProperties(bk);var length=this._getChildren().length;var bl=this._indexOf(bj);if(bl==length-1){this.getContentElement().appendChild(bi.getContainerElement());}
else {var bm=this._getChildren()[bl+1];this.getContentElement().insertBefore(bi.getContainerElement(),bm.getContainerElement());}
;qx.lang.Array.insertAfter(this.__cY,bi,bj);this._domUpdated();}
,_remove:function(bn){bn.setLayoutParent(null);this._domUpdated();}
,_removeAt:function(bo){if(!this.__cY){throw new Error(F);}
;var bp=this.__cY[bo];this._remove(bp);}
,_removeAll:function(){var bq=this.__cY.concat();for(var i=0,l=bq.length;i<l;i++){this._remove(bq[i]);}
;}
,_indexOf:function(br){var bs=this.__cY;if(!bs){return -1;}
;return bs.indexOf(br);}
,setLayoutParent:function(parent){if(this.__de===parent){return;}
;var bt=this.__de;if(bt&&!bt.$$disposed){this.__de.removeChild(this);}
;this.__de=parent||null;}
,removeChild:function(bu){qx.lang.Array.remove(this.__cY,bu);this.getContentElement().removeChild(bu.getContainerElement());}
,getLayoutParent:function(){return this.__de;}
,_getChildren:function(){return this.__cY;}
,_hasChildren:function(){return this.__cY&&this.__cY.length>0;}
,_setLayout:function(bv){{}
;if(this.__df){this.__df.connectToWidget(null);}
;if(bv){bv.connectToWidget(this);}
;this.__df=bv;}
,_getLayout:function(){return this.__df;}
,setLayoutProperties:function(bw){if(bw==null){return;}
;var parent=this.getLayoutParent();if(parent){parent.updateLayoutProperties(this,bw);}
;}
,updateLayoutProperties:function(bx,by){var bz=this._getLayout();if(bz){bz.setLayoutProperties(bx,by);}
;}
,_setHtml:function(bA){this.getContentElement().innerHTML=bA||a;this._domUpdated();}
,_applyAttribute:function(bB,bC,bD){this._setAttribute(bD,bB);}
,_setAttribute:function(bE,bF){var bH=qx.ui.mobile.core.Widget.ATTRIBUTE_MAPPING[bE];if(bH){bE=bH.attribute||bE;var bG=bH.values;bF=bG&&typeof bG[bF]!==E?bG[bF]:bF;}
;var bI=this.getContainerElement();if(bF!=null){qx.bom.element.Attribute.set(bI,bE,bF);}
else {qx.bom.element.Attribute.reset(bI,bE);}
;this._domUpdated();}
,_getAttribute:function(bJ){var bK=this.getContainerElement();return qx.bom.element.Attribute.get(bK,bJ);}
,_applyStyle:function(bL,bM,bN){this._setStyle(bN,bL);}
,_setStyle:function(bO,bP){var bQ=qx.ui.mobile.core.Widget.STYLE_MAPPING[bO];if(bQ){bO=bQ.style||bO;bP=bQ.values[bP];}
;var bR=this.getContainerElement();if(bP!=null){qx.bom.element.Style.set(bR,bO,bP);}
else {qx.bom.element.Style.reset(bR,bO);}
;this._domUpdated();}
,_getStyle:function(bS){var bT=this.getContainerElement();return qx.bom.element.Style.get(bT,bS);}
,_applyDefaultCssClass:function(bU,bV){if(bV){this.removeCssClass(bV);}
;if(bU){this.addCssClass(bU);}
;}
,addCssClass:function(bW){qx.bom.element.Class.add(this.getContainerElement(),bW);this._domUpdated();}
,removeCssClass:function(bX){qx.bom.element.Class.remove(this.getContainerElement(),bX);this._domUpdated();}
,hasCssClass:function(bY){return qx.bom.element.Class.has(this.getContainerElement(),bY);}
,_applyVisibility:function(ca,cb){if(ca==p){this.addCssClass(x);}
else if(ca==v){this.removeCssClass(x);this._setStyle(y,v);}
else if(ca==m){this._setStyle(y,m);}
;;}
,show:function(){this.setVisibility(v);}
,hide:function(){this.setVisibility(m);}
,exclude:function(){this.setVisibility(p);}
,isVisible:function(){return this.getVisibility()===v;}
,isHidden:function(){return this.getVisibility()!==v;}
,isExcluded:function(){return this.getVisibility()===p;}
,isSeeable:function(){return this.getContainerElement().offsetWidth>0;}
,_setContainerElement:function(cc){this.__dc=cc;}
,getContainerElement:function(){return this.__dc;}
,getContentElement:function(){if(!this.__dd){this.__dd=this._getContentElement();}
;return this.__dd;}
,_getContentElement:function(){return this.getContainerElement();}
,destroy:function(){if(this.$$disposed){return;}
;var parent=this.__de;if(parent){parent._remove(this);}
;this.dispose();}
},destruct:function(){if(!qx.core.ObjectRegistry.inShutDown){qx.event.Registration.removeAllListeners(this);if(this.getId()){qx.ui.mobile.core.Widget.unregisterWidget(this.getId());}
;}
;this.__de=this.__dc=this.__dd=null;if(this.__df){this.__df.dispose();}
;this.__df=null;}
,defer:function(cd){qx.bom.Lifecycle.onShutdown(cd.onShutdown,cd);}
});}
)();
(function(){var k="touchmove",j="qx.ui.mobile.core.EventHandler",h="touchend",g="touchcancel",f="data-selectable",e="true",d="data-activatable",c="touchstart",b="false",a="active";qx.Class.define(j,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(){qx.core.Object.call(this);this.__dg=qx.event.Registration.getManager(window);}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_FIRST,SUPPORTED_TYPES:{mousemove:1,mouseover:1,mouseout:1,mousedown:1,mouseup:1,click:1,dblclick:1,contextmenu:1,mousewheel:1,keyup:1,keydown:1,keypress:1,keyinput:1,capture:1,losecapture:1,focusin:1,focusout:1,focus:1,blur:1,activate:1,deactivate:1,appear:1,disappear:1,resize:1,dragstart:1,dragend:1,dragover:1,dragleave:1,drop:1,drag:1,dragchange:1,droprequest:1,touchstart:1,touchend:1,touchmove:1,touchcancel:1,tap:1,swipe:1},IGNORE_CAN_HANDLE:false,__dh:null,__di:null,__dj:null,__dk:null,__dl:null,__dm:function(m){var n=qx.ui.mobile.core.EventHandler;n.__di=qx.bom.Viewport.getScrollLeft();n.__dj=qx.bom.Viewport.getScrollTop();var o=m.getChangedTargetTouches()[0];n.__dk=o.screenY;n.__dq();var p=m.getTarget();while(p&&p.parentNode&&p.parentNode.nodeType==1&&qx.bom.element.Attribute.get(p,d)!=e){p=p.parentNode;}
;n.__dh=p;n.__dn=window.setTimeout(function(){n.__dn=null;var q=n.__dh;if(q&&(qx.bom.element.Attribute.get(q,f)!=b)){qx.bom.element.Class.add(q,a);}
;}
,100);}
,__do:function(r){qx.ui.mobile.core.EventHandler.__dr();}
,__dp:function(s){var t=qx.ui.mobile.core.EventHandler;var u=s.getChangedTargetTouches()[0];var v=u.screenY-t.__dk;if(t.__dh&&Math.abs(v)>=qx.event.handler.Touch.TAP_MAX_DISTANCE){t.__dr();}
;if(t.__dh&&(t.__di!=qx.bom.Viewport.getScrollLeft()||t.__dj!=qx.bom.Viewport.getScrollTop())){t.__dr();}
;}
,__dq:function(){var w=qx.ui.mobile.core.EventHandler;if(w.__dn){window.clearTimeout(w.__dn);w.__dn=null;}
;}
,__dr:function(){var x=qx.ui.mobile.core.EventHandler;x.__dq();var y=x.__dh;if(y){qx.bom.element.Class.remove(y,a);}
;x.__dh=null;}
},members:{__dg:null,canHandleEvent:function(z,A){return z instanceof qx.ui.mobile.core.Widget;}
,registerEvent:function(B,C,D){var E=B.getContainerElement();qx.event.Registration.addListener(E,C,this._dispatchEvent,this,D);}
,unregisterEvent:function(F,G,H){var I=F.getContainerElement();qx.event.Registration.removeListener(I,G,this._dispatchEvent,this,H);}
,_dispatchEvent:function(J){var O=J.getTarget();if(!O||O.id==null){return;}
;var N=qx.ui.mobile.core.Widget.getWidgetById(O.id);if(J.getRelatedTarget){var V=J.getRelatedTarget();if(V&&V.id){var U=qx.ui.mobile.core.Widget.getWidgetById(V.id);}
;}
;var Q=J.getCurrentTarget();var S=qx.ui.mobile.core.Widget.getWidgetById(Q.id);if(!S){return;}
;var K=J.getEventPhase()==qx.event.type.Event.CAPTURING_PHASE;var T=J.getType();var P=this.__dg.getListeners(S,T,K);if(!P||P.length===0){return;}
;var L=qx.event.Pool.getInstance().getObject(J.constructor);J.clone(L);L.setTarget(N);L.setRelatedTarget(U||null);L.setCurrentTarget(S);var W=J.getOriginalTarget();if(W&&W.id){var M=qx.ui.mobile.core.Widget.getWidgetById(W.id);L.setOriginalTarget(M);}
else {L.setOriginalTarget(O);}
;for(var i=0,l=P.length;i<l;i++){var R=P[i].context||S;P[i].handler.call(R,L);}
;if(L.getPropagationStopped()){J.stopPropagation();}
;if(L.getDefaultPrevented()){J.preventDefault();}
;qx.event.Pool.getInstance().poolObject(L);}
},destruct:function(){this.__dg=null;}
,defer:function(X){qx.event.Registration.addHandler(X);qx.event.Registration.addListener(document,c,X.__dm);qx.event.Registration.addListener(document,h,X.__do);qx.event.Registration.addListener(document,g,X.__do);qx.event.Registration.addListener(document,k,X.__dp);}
});}
)();
(function(){var e="CSS1Compat",d="qx.bom.Document",c="1px",b="position:absolute;width:0;height:0;width:1",a="div";qx.Class.define(d,{statics:{isQuirksMode:function(f){if(document.compatMode===undefined){var g=(f||window).document.createElement(a);g.style.cssText=b;return g.style.width===c?true:false;}
else {return (f||window).document.compatMode!==e;}
;}
,isStandardMode:function(h){return !this.isQuirksMode(h);}
,getWidth:function(i){var j=(i||window).document;var k=qx.bom.Viewport.getWidth(i);var scroll=this.isStandardMode(i)?j.documentElement.scrollWidth:j.body.scrollWidth;return Math.max(scroll,k);}
,getHeight:function(l){var m=(l||window).document;var n=qx.bom.Viewport.getHeight(l);var scroll=this.isStandardMode(l)?m.documentElement.scrollHeight:m.body.scrollHeight;return Math.max(scroll,n);}
}});}
)();
(function(){var a="qx.bom.Viewport";qx.Class.define(a,{statics:{getWidth:function(b){var b=b||window;var c=b.document;return qx.bom.Document.isStandardMode(b)?c.documentElement.clientWidth:c.body.clientWidth;}
,getHeight:function(d){var d=d||window;var e=d.document;return qx.bom.Document.isStandardMode(d)?e.documentElement.clientHeight:e.body.clientHeight;}
,getScrollLeft:function(f){var g=(f||window).document;return (f||window).pageXOffset||g.documentElement.scrollLeft||g.body.scrollLeft;}
,getScrollTop:function(h){var i=(h||window).document;return (h||window).pageYOffset||i.documentElement.scrollTop||i.body.scrollTop;}
,__ds:function(){var j=this.getWidth()>this.getHeight()?90:0;var k=window.orientation;if(k==null||Math.abs(k%180)==j){return {"-270":90,"-180":180,"-90":-90,"0":0,"90":90,"180":180,"270":-90};}
else {return {"-270":180,"-180":-90,"-90":0,"0":90,"90":180,"180":-90,"270":0};}
;}
,__dt:null,getOrientation:function(l){var m=(l||window).orientation;if(m==null){m=this.getWidth(l)>this.getHeight(l)?90:0;}
else {m=this.__dt[m];}
;return m;}
,isLandscape:function(n){return Math.abs(this.getOrientation(n))==90;}
,isPortrait:function(o){return Math.abs(this.getOrientation(o))!==90;}
},defer:function(p){p.__dt=p.__ds();}
});}
)();
(function(){var m="function",l="html.video.h264",k="html.element.contains",j='video/ogg; codecs="theora, vorbis"',i="html.console",h="html.xul",g="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",f="html.video.ogg",d="http://www.w3.org/TR/SVG11/feature#BasicStructure",c="html.storage.local",bo="div",bn="qx.bom.client.Html",bm="html.storage.userdata",bl='audio',bk='video/mp4; codecs="avc1.42E01E, mp4a.40.2"',bj="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",bi="html.audio",bh="audio/mpeg",bg="org.w3c.dom.svg",bf="html.classlist",t="html.svg",u="html.video",r="html.geolocation",s="DOMTokenList",p="html.storage.session",q="1.1",n="html.image.naturaldimensions",o="html.audio.aif",A="audio/x-wav",B="html.canvas",K="audio/ogg",H="html.audio.mp3",S="html.element.compareDocumentPosition",N="audio/x-aiff",bb="html.audio.au",X="img",D="html.xpath",be="qxtest",bd='video',bc="span",C="html.element.textcontent",F="mshtml",G="html.vml",J="html.audio.ogg",L="none",O="label",U='video/webm; codecs="vp8, vorbis"',ba="html.dataurl",w="html.webworker",x="html.dataset",E="1.0",R="html.audio.wav",Q="html.filereader",P="audio/basic",W="#default#userdata",V="html.video.webm",M="display",T="head",b="number",Y="video",y="undefined",z="audio",I="";qx.Bootstrap.define(bn,{statics:{getWebWorker:function(){return window.Worker!=null;}
,getFileReader:function(){return window.FileReader!=null;}
,getGeoLocation:function(){return navigator.geolocation!=null;}
,getAudio:function(){return !!document.createElement(bl).canPlayType;}
,getAudioOgg:function(){if(!qx.bom.client.Html.getAudio()){return I;}
;var a=document.createElement(z);return a.canPlayType(K);}
,getAudioMp3:function(){if(!qx.bom.client.Html.getAudio()){return I;}
;var a=document.createElement(z);return a.canPlayType(bh);}
,getAudioWav:function(){if(!qx.bom.client.Html.getAudio()){return I;}
;var a=document.createElement(z);return a.canPlayType(A);}
,getAudioAu:function(){if(!qx.bom.client.Html.getAudio()){return I;}
;var a=document.createElement(z);return a.canPlayType(P);}
,getAudioAif:function(){if(!qx.bom.client.Html.getAudio()){return I;}
;var a=document.createElement(z);return a.canPlayType(N);}
,getVideo:function(){return !!document.createElement(bd).canPlayType;}
,getVideoOgg:function(){if(!qx.bom.client.Html.getVideo()){return I;}
;var v=document.createElement(Y);return v.canPlayType(j);}
,getVideoH264:function(){if(!qx.bom.client.Html.getVideo()){return I;}
;var v=document.createElement(Y);return v.canPlayType(bk);}
,getVideoWebm:function(){if(!qx.bom.client.Html.getVideo()){return I;}
;var v=document.createElement(Y);return v.canPlayType(U);}
,getLocalStorage:function(){try{return window.localStorage!=null;}
catch(bp){return false;}
;}
,getSessionStorage:function(){try{return window.sessionStorage!=null;}
catch(bq){return false;}
;}
,getUserDataStorage:function(){var br=document.createElement(bo);br.style[M]=L;document.getElementsByTagName(T)[0].appendChild(br);var bs=false;try{br.addBehavior(W);br.load(be);bs=true;}
catch(e){}
;document.getElementsByTagName(T)[0].removeChild(br);return bs;}
,getClassList:function(){return !!(document.documentElement.classList&&qx.Bootstrap.getClass(document.documentElement.classList)===s);}
,getXPath:function(){return !!document.evaluate;}
,getXul:function(){try{document.createElementNS(g,O);return true;}
catch(e){return false;}
;}
,getSvg:function(){return document.implementation&&document.implementation.hasFeature&&(document.implementation.hasFeature(bg,E)||document.implementation.hasFeature(d,q));}
,getVml:function(){return qx.bom.client.Engine.getName()==F;}
,getCanvas:function(){return !!window.CanvasRenderingContext2D;}
,getDataUrl:function(bt){var bu=new Image();bu.onload=bu.onerror=function(){window.setTimeout(function(){bt.call(null,(bu.width==1&&bu.height==1));}
,0);}
;bu.src=bj;}
,getDataset:function(){return !!document.documentElement.dataset;}
,getContains:function(){return (typeof document.documentElement.contains!==y);}
,getCompareDocumentPosition:function(){return (typeof document.documentElement.compareDocumentPosition===m);}
,getTextContent:function(){var bv=document.createElement(bc);return (typeof bv.textContent!==y);}
,getConsole:function(){return typeof window.console!==y;}
,getNaturalDimensions:function(){var bw=document.createElement(X);return typeof bw.naturalHeight===b&&typeof bw.naturalWidth===b;}
},defer:function(bx){qx.core.Environment.add(w,bx.getWebWorker);qx.core.Environment.add(Q,bx.getFileReader);qx.core.Environment.add(r,bx.getGeoLocation);qx.core.Environment.add(bi,bx.getAudio);qx.core.Environment.add(J,bx.getAudioOgg);qx.core.Environment.add(H,bx.getAudioMp3);qx.core.Environment.add(R,bx.getAudioWav);qx.core.Environment.add(bb,bx.getAudioAu);qx.core.Environment.add(o,bx.getAudioAif);qx.core.Environment.add(u,bx.getVideo);qx.core.Environment.add(f,bx.getVideoOgg);qx.core.Environment.add(l,bx.getVideoH264);qx.core.Environment.add(V,bx.getVideoWebm);qx.core.Environment.add(c,bx.getLocalStorage);qx.core.Environment.add(p,bx.getSessionStorage);qx.core.Environment.add(bm,bx.getUserDataStorage);qx.core.Environment.add(bf,bx.getClassList);qx.core.Environment.add(D,bx.getXPath);qx.core.Environment.add(h,bx.getXul);qx.core.Environment.add(B,bx.getCanvas);qx.core.Environment.add(t,bx.getSvg);qx.core.Environment.add(G,bx.getVml);qx.core.Environment.add(x,bx.getDataset);qx.core.Environment.addAsync(ba,bx.getDataUrl);qx.core.Environment.add(k,bx.getContains);qx.core.Environment.add(S,bx.getCompareDocumentPosition);qx.core.Environment.add(C,bx.getTextContent);qx.core.Environment.add(i,bx.getConsole);qx.core.Environment.add(n,bx.getNaturalDimensions);}
});}
)();
(function(){var j="readOnly",i="accessKey",h="qx.bom.element.Attribute",g="rowSpan",f="vAlign",e="className",d="textContent",c="'",b="htmlFor",a="longDesc",y="cellSpacing",x="frameBorder",w="='",v="useMap",u="innerText",t="innerHTML",s="tabIndex",r="dateTime",q="maxLength",p="html.element.textcontent",n="cellPadding",o="browser.documentmode",l="colSpan",m="undefined",k="";qx.Class.define(h,{statics:{__du:{names:{"class":e,"for":b,html:t,text:qx.core.Environment.get(p)?d:u,colspan:l,rowspan:g,valign:f,datetime:r,accesskey:i,tabindex:s,maxlength:q,readonly:j,longdesc:a,cellpadding:n,cellspacing:y,frameborder:x,usemap:v},runtime:{"html":1,"text":1},bools:{compact:1,nowrap:1,ismap:1,declare:1,noshade:1,checked:1,disabled:1,readOnly:1,multiple:1,selected:1,noresize:1,defer:1,allowTransparency:1},property:{$$html:1,$$widget:1,disabled:1,checked:1,readOnly:1,multiple:1,selected:1,value:1,maxLength:1,className:1,innerHTML:1,innerText:1,textContent:1,htmlFor:1,tabIndex:1},qxProperties:{$$widget:1,$$html:1},propertyDefault:{disabled:false,checked:false,readOnly:false,multiple:false,selected:false,value:k,className:k,innerHTML:k,innerText:k,textContent:k,htmlFor:k,tabIndex:0,maxLength:524288},removeableProperties:{disabled:1,multiple:1,maxLength:1},original:{href:1,src:1,type:1}},compile:function(z){var A=[];var C=this.__du.runtime;for(var B in z){if(!C[B]){A.push(B,w,z[B],c);}
;}
;return A.join(k);}
,get:function(D,name){var F=this.__du;var E;name=F.names[name]||name;if(false&&parseInt(qx.core.Environment.get(o),10)<8&&F.original[name]){E=D.getAttribute(name,2);}
else if(F.property[name]){E=D[name];if(typeof F.propertyDefault[name]!==m&&E==F.propertyDefault[name]){if(typeof F.bools[name]===m){return null;}
else {return E;}
;}
;}
else {E=D.getAttribute(name);}
;if(F.bools[name]){return !!E;}
;return E;}
,set:function(G,name,H){if(typeof H===m){return;}
;var I=this.__du;name=I.names[name]||name;if(I.bools[name]){H=!!H;}
;if(I.property[name]&&(!(G[name]===undefined)||I.qxProperties[name])){if(H==null){if(I.removeableProperties[name]){G.removeAttribute(name);return;}
else if(typeof I.propertyDefault[name]!==m){H=I.propertyDefault[name];}
;}
;G[name]=H;}
else {if(H===true){G.setAttribute(name,name);}
else if(H===false||H===null){G.removeAttribute(name);}
else {G.setAttribute(name,H);}
;}
;}
,reset:function(J,name){this.set(J,name,null);}
}});}
)();
(function(){var j="CSS1Compat",i="android",h="operamini",g="gecko",f="browser.quirksmode",e="browser.name",d="mobile chrome",c="iemobile",b="prism|Fennec|Camino|Kmeleon|Galeon|Netscape|SeaMonkey|Namoroka|Firefox",a="opera mobi",H="Mobile Safari",G="Maple",F="operamobile",E="ie",D="mobile safari",C="IEMobile|Maxthon|MSIE",B="qx.bom.client.Browser",A="(Maple )([0-9]+\.[0-9]+\.[0-9]*)",z="opera mini",y="browser.version",q="opera",r="Opera Mini|Opera Mobi|Opera",o="AdobeAIR|Titanium|Fluid|Chrome|Android|Epiphany|Konqueror|iCab|OmniWeb|Maxthon|Pre|Mobile Safari|Safari",p="webkit",m="browser.documentmode",n="5.0",k="Mobile/",l="msie",s="maple",t=")(/| )([0-9]+\.[0-9])",v="(",u="ce",x="",w="mshtml";qx.Bootstrap.define(B,{statics:{getName:function(){var L=navigator.userAgent;var K=new RegExp(v+qx.bom.client.Browser.__dv+t);var J=L.match(K);if(!J){return x;}
;var name=J[1].toLowerCase();var I=qx.bom.client.Engine.getName();if(I===p){if(name===i){name=d;}
else if(L.indexOf(H)!==-1||L.indexOf(k)!==-1){name=D;}
;}
else if(I===w){if(name===l){name=E;if(qx.bom.client.OperatingSystem.getVersion()===u){name=c;}
;}
;}
else if(I===q){if(name===a){name=F;}
else if(name===z){name=h;}
;}
else if(I===g){if(L.indexOf(G)!==-1){name=s;}
;}
;;;return name;}
,getVersion:function(){var P=navigator.userAgent;var O=new RegExp(v+qx.bom.client.Browser.__dv+t);var N=P.match(O);if(!N){return x;}
;var name=N[1].toLowerCase();var M=N[3];if(P.match(/Version(\/| )([0-9]+\.[0-9])/)){M=RegExp.$2;}
;if(qx.bom.client.Engine.getName()==w){M=qx.bom.client.Engine.getVersion();if(name===l&&qx.bom.client.OperatingSystem.getVersion()==u){M=n;}
;}
;if(qx.bom.client.Browser.getName()==s){O=new RegExp(A);N=P.match(O);if(!N){return x;}
;M=N[2];}
;return M;}
,getDocumentMode:function(){if(document.documentMode){return document.documentMode;}
;return 0;}
,getQuirksMode:function(){if(qx.bom.client.Engine.getName()==w&&parseFloat(qx.bom.client.Engine.getVersion())>=8){return qx.bom.client.Engine.DOCUMENT_MODE===5;}
else {return document.compatMode!==j;}
;}
,__dv:{"webkit":o,"gecko":b,"mshtml":C,"opera":r}[qx.bom.client.Engine.getName()]},defer:function(Q){qx.core.Environment.add(e,Q.getName),qx.core.Environment.add(y,Q.getVersion),qx.core.Environment.add(m,Q.getDocumentMode),qx.core.Environment.add(f,Q.getQuirksMode);}
});}
)();
(function(){var j="rim_tabletos",i="Darwin",h="os.version",g="2003",f=")",e="iPhone",d="android",c="unix",b="ce",a="7",bf="SymbianOS",be="os.name",bd="|",bc="MacPPC",bb="iPod",ba="\.",Y="Win64",X="linux",W="me",V="Macintosh",q="Android",r="Windows",o="ios",p="vista",m="8",n="blackberry",k="(",l="win",u="Linux",v="BSD",D="Mac OS X",B="iPad",L="X11",G="xp",R="symbian",P="qx.bom.client.OperatingSystem",x="g",U="Win32",T="osx",S="webOS",w="RIM Tablet OS",z="BlackBerry",A="nt4",C="MacIntel",E="webos",H="10.1",M="10.3",Q="10.7",s="10.5",t="95",y="10.2",K="98",J="2000",I="10.6",O="10.0",N="10.4",F="";qx.Bootstrap.define(P,{statics:{getName:function(){if(!navigator){return F;}
;var bg=navigator.platform||F;var bh=navigator.userAgent||F;if(bg.indexOf(r)!=-1||bg.indexOf(U)!=-1||bg.indexOf(Y)!=-1){return l;}
else if(bg.indexOf(V)!=-1||bg.indexOf(bc)!=-1||bg.indexOf(C)!=-1||bg.indexOf(D)!=-1){return T;}
else if(bh.indexOf(w)!=-1){return j;}
else if(bh.indexOf(S)!=-1){return E;}
else if(bg.indexOf(bb)!=-1||bg.indexOf(e)!=-1||bg.indexOf(B)!=-1){return o;}
else if(bh.indexOf(q)!=-1){return d;}
else if(bg.indexOf(u)!=-1){return X;}
else if(bg.indexOf(L)!=-1||bg.indexOf(v)!=-1||bg.indexOf(i)!=-1){return c;}
else if(bg.indexOf(bf)!=-1){return R;}
else if(bg.indexOf(z)!=-1){return n;}
;;;;;;;;;return F;}
,__dw:{"Windows NT 6.2":m,"Windows NT 6.1":a,"Windows NT 6.0":p,"Windows NT 5.2":g,"Windows NT 5.1":G,"Windows NT 5.0":J,"Windows 2000":J,"Windows NT 4.0":A,"Win 9x 4.90":W,"Windows CE":b,"Windows 98":K,"Win98":K,"Windows 95":t,"Win95":t,"Mac OS X 10_7":Q,"Mac OS X 10.7":Q,"Mac OS X 10_6":I,"Mac OS X 10.6":I,"Mac OS X 10_5":s,"Mac OS X 10.5":s,"Mac OS X 10_4":N,"Mac OS X 10.4":N,"Mac OS X 10_3":M,"Mac OS X 10.3":M,"Mac OS X 10_2":y,"Mac OS X 10.2":y,"Mac OS X 10_1":H,"Mac OS X 10.1":H,"Mac OS X 10_0":O,"Mac OS X 10.0":O},getVersion:function(){var bk=[];for(var bj in qx.bom.client.OperatingSystem.__dw){bk.push(bj);}
;var bl=new RegExp(k+bk.join(bd).replace(/\./g,ba)+f,x);var bi=bl.exec(navigator.userAgent);if(bi&&bi[1]){return qx.bom.client.OperatingSystem.__dw[bi[1]];}
;return F;}
},defer:function(bm){qx.core.Environment.add(be,bm.getName);qx.core.Environment.add(h,bm.getVersion);}
});}
)();
(function(){var d="&",c="qx.lang.Object",b="=",a="+";qx.Class.define(c,{statics:{empty:function(e){{}
;for(var f in e){if(e.hasOwnProperty(f)){delete e[f];}
;}
;}
,isEmpty:function(g){{}
;for(var h in g){return false;}
;return true;}
,hasMinLength:function(j,k){{}
;if(k<=0){return true;}
;var length=0;for(var m in j){if((++length)>=k){return true;}
;}
;return false;}
,getLength:qx.Bootstrap.objectGetLength,getKeys:qx.Bootstrap.getKeys,getKeysAsString:qx.Bootstrap.getKeysAsString,getValues:function(n){{}
;var p=[];var o=this.getKeys(n);for(var i=0,l=o.length;i<l;i++){p.push(n[o[i]]);}
;return p;}
,mergeWith:qx.Bootstrap.objectMergeWith,carefullyMergeWith:function(q,r){{}
;return qx.lang.Object.mergeWith(q,r,false);}
,merge:function(s,t){{}
;var u=arguments.length;for(var i=1;i<u;i++){qx.lang.Object.mergeWith(s,arguments[i]);}
;return s;}
,clone:function(v,w){if(qx.lang.Type.isObject(v)){var x={};for(var y in v){if(w){x[y]=qx.lang.Object.clone(v[y],w);}
else {x[y]=v[y];}
;}
;return x;}
else if(qx.lang.Type.isArray(v)){var x=[];for(var i=0;i<v.length;i++){if(w){x[i]=qx.lang.Object.clone(v[i]);}
else {x[i]=v[i];}
;}
;return x;}
;return v;}
,invert:function(z){{}
;var A={};for(var B in z){A[z[B].toString()]=B;}
;return A;}
,getKeyFromValue:function(C,D){{}
;for(var E in C){if(C.hasOwnProperty(E)&&C[E]===D){return E;}
;}
;return null;}
,contains:function(F,G){{}
;return this.getKeyFromValue(F,G)!==null;}
,select:function(H,I){{}
;return I[H];}
,fromArray:function(J){{}
;var K={};for(var i=0,l=J.length;i<l;i++){{}
;K[J[i].toString()]=true;}
;return K;}
,toUriParameter:function(L,M){var P,N=[];for(P in L){if(L.hasOwnProperty(P)){var O=L[P];if(O instanceof Array){for(var i=0;i<O.length;i++){this.__dx(P,O[i],N,M);}
;}
else {this.__dx(P,O,N,M);}
;}
;}
;return N.join(d);}
,__dx:function(Q,R,S,T){var U=window.encodeURIComponent;if(T){S.push(U(Q).replace(/%20/g,a)+b+U(R).replace(/%20/g,a));}
else {S.push(U(Q)+b+U(R));}
;}
}});}
)();
(function(){var s="g",r='function',q="\\b|\\b",p="qx.bom.element.Class",o='SVGAnimatedString',n='object',m="$2",k='undefined',j='',h="(^|\\s)",c="(\\s|$)",g="\\b",f="",b=" ",a="html.classlist",e="default",d="native";qx.Class.define(p,{statics:{__dy:/\s+/g,__dz:/^\s+|\s+$/g,add:qx.lang.Object.select(qx.core.Environment.get(a)?d:e,{"native":function(t,name){t.classList.add(name);return name;}
,"default":function(u,name){if(!this.has(u,name)){u.className+=(u.className?b:f)+name;}
;return name;}
}),addClasses:qx.lang.Object.select(qx.core.Environment.get(a)?d:e,{"native":function(v,w){for(var i=0;i<w.length;i++){v.classList.add(w[i]);}
;return v.className;}
,"default":function(x,y){var z={};var B;var A=x.className;if(A){B=A.split(this.__dy);for(var i=0,l=B.length;i<l;i++){z[B[i]]=true;}
;for(var i=0,l=y.length;i<l;i++){if(!z[y[i]]){B.push(y[i]);}
;}
;}
else {B=y;}
;return x.className=B.join(b);}
}),get:function(C){var D=C.className;if(typeof D.split!==r){if(typeof D===n){if(qx.Bootstrap.getClass(D)==o){D=D.baseVal;}
else {{}
;D=j;}
;}
;if(typeof D===k){{}
;D=j;}
;}
;return D;}
,has:qx.lang.Object.select(qx.core.Environment.get(a)?d:e,{"native":function(E,name){return E.classList.contains(name);}
,"default":function(F,name){var G=new RegExp(h+name+c);return G.test(F.className);}
}),remove:qx.lang.Object.select(qx.core.Environment.get(a)?d:e,{"native":function(H,name){H.classList.remove(name);return name;}
,"default":function(I,name){var J=new RegExp(h+name+c);I.className=I.className.replace(J,m);return name;}
}),removeClasses:qx.lang.Object.select(qx.core.Environment.get(a)?d:e,{"native":function(K,L){for(var i=0;i<L.length;i++){K.classList.remove(L[i]);}
;return K.className;}
,"default":function(M,N){var O=new RegExp(g+N.join(q)+g,s);return M.className=M.className.replace(O,f).replace(this.__dz,f).replace(this.__dy,b);}
}),replace:function(P,Q,R){this.remove(P,Q);return this.add(P,R);}
,toggle:qx.lang.Object.select(qx.core.Environment.get(a)?d:e,{"native":function(S,name,T){if(T===undefined){S.classList.toggle(name);}
else {T?this.add(S,name):this.remove(S,name);}
;return name;}
,"default":function(U,name,V){if(V==null){V=!this.has(U,name);}
;V?this.add(U,name):this.remove(U,name);return name;}
})}});}
)();
(function(){var e="resize",d="landscape",c="portrait",b="qx.event.handler.Orientation",a="orientationchange";qx.Class.define(b,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(f){qx.core.Object.call(this);this.__dg=f;this.__cz=f.getWindow();this._initObserver();}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{orientationchange:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{__dg:null,__cz:null,__dA:null,__dB:null,__dC:null,canHandleEvent:function(g,h){}
,registerEvent:function(i,j,k){}
,unregisterEvent:function(l,m,n){}
,_initObserver:function(){this.__dC=qx.lang.Function.listener(this._onNative,this);this.__dA=qx.bom.Event.supportsEvent(this.__cz,a)?a:e;var Event=qx.bom.Event;Event.addNativeListener(this.__cz,this.__dA,this.__dC);}
,_stopObserver:function(){var Event=qx.bom.Event;Event.removeNativeListener(this.__cz,this.__dA,this.__dC);}
,_onNative:qx.event.GlobalError.observeMethod(function(o){var q=qx.bom.Viewport;var p=q.getOrientation();if(this.__dB!=p){this.__dB=p;var r=q.isLandscape()?d:c;qx.event.Registration.fireEvent(this.__cz,a,qx.event.type.Orientation,[p,r]);}
;}
)},destruct:function(){this._stopObserver();this.__dg=this.__cz=null;}
,defer:function(s){qx.event.Registration.addHandler(s);}
});}
)();
(function(){var c="landscape",b="qx.event.type.Orientation",a="portrait";qx.Class.define(b,{extend:qx.event.type.Event,members:{__dD:null,__dE:null,init:function(d,e){qx.event.type.Event.prototype.init.call(this,false,false);this.__dD=d;this.__dE=e;return this;}
,clone:function(f){var g=qx.event.type.Event.prototype.clone.call(this,f);g.__dD=this.__dD;g.__dE=this.__dE;return g;}
,getOrientation:function(){return this.__dD;}
,isLandscape:function(){return this.__dE==c;}
,isPortrait:function(){return this.__dE==a;}
}});}
)();
(function(){var l="event.pointer",k="onhashchange",j="event.help",i="event.touch",h="opera",g="event.hashchange",f="onhelp",e="pointerEvents",d="documentMode",c="qx.bom.client.Event",a="ontouchstart",b="mshtml";qx.Bootstrap.define(c,{statics:{getTouch:function(){return (a in window);}
,getPointer:function(){if(e in document.documentElement.style){var m=qx.bom.client.Engine.getName();return m!=h&&m!=b;}
;return false;}
,getHelp:function(){return (f in document);}
,getHashChange:function(){var n=qx.bom.client.Engine.getName();var o=k in window;return (n!==b&&o)||(n===b&&d in document&&document.documentMode>=8&&o);}
},defer:function(p){qx.core.Environment.add(i,p.getTouch);qx.core.Environment.add(l,p.getPointer);qx.core.Environment.add(j,p.getHelp);qx.core.Environment.add(g,p.getHashChange);}
});}
)();
(function(){var a="qx.event.handler.UserAction";qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(b){qx.core.Object.call(this);this.__dg=b;this.__cz=b.getWindow();}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{useraction:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{__dg:null,__cz:null,canHandleEvent:function(c,d){}
,registerEvent:function(e,f,g){}
,unregisterEvent:function(h,i,j){}
},destruct:function(){this.__dg=this.__cz=null;}
,defer:function(k){qx.event.Registration.addHandler(k);}
});}
)();
(function(){var q="engine.name",p="mshtml",o="qx.event.handler.Touch",n="useraction",m="swipe",l="tap",k="x",j="y",i="touchcancel",h="mouseup",c="mousedown",g="mousemove",f="touchmove",b="event.touch",a="touchend",d="touchstart";qx.Class.define(o,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(r){qx.core.Object.call(this);this.__dg=r;this.__cz=r.getWindow();this.__cS=this.__cz.document;this._initTouchObserver();this._initMouseObserver();}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{touchstart:1,touchmove:1,touchend:1,touchcancel:1,tap:1,swipe:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE+qx.event.IEventHandler.TARGET_DOCUMENT,IGNORE_CAN_HANDLE:true,MOUSE_TO_TOUCH_MAPPING:{"mousedown":"touchstart","mousemove":"touchmove","mouseup":"touchend"},SWIPE_DIRECTION:{x:["left","right"],y:["up","down"]},TAP_MAX_DISTANCE:qx.core.Environment.get("os.name")!="android"?10:40,SWIPE_MIN_DISTANCE:qx.core.Environment.get("os.name")!="android"?11:41,SWIPE_MIN_VELOCITY:0},members:{__dF:null,__dG:null,__dg:null,__cz:null,__cS:null,__dH:null,__dI:null,__dJ:null,__dK:null,__dL:false,__dM:null,canHandleEvent:function(s,t){}
,registerEvent:function(u,v,w){}
,unregisterEvent:function(x,y,z){}
,__dN:function(A){var B=qx.bom.Event.getTarget(A);if(B&&B.nodeType==3){B=B.parentNode;}
;return B;}
,__dO:function(C,D,E,F){if(!E){E=this.__dN(C);}
;var D=D||C.type;if(E&&E.nodeType){qx.event.Registration.fireEvent(E,D,F||qx.event.type.Touch,[C,E,null,true,true]);}
;qx.event.Registration.fireEvent(this.__cz,n,qx.event.type.Data,[D]);}
,__dP:function(G,H,I){if(!I){I=this.__dN(G);}
;var H=H||G.type;if(H==d){this.__dQ(G,I);}
else if(H==f){this.__dR(G,I);}
else if(H==a){this.__dS(G,I);}
;;}
,__dQ:function(J,K){var L=J.changedTouches[0];this.__dH=L.screenX;this.__dI=L.screenY;this.__dJ=new Date().getTime();this.__dK=J.changedTouches.length===1;}
,__dR:function(M,N){if(this.__dK&&M.changedTouches.length>1){this.__dK=false;}
;}
,__dS:function(O,P){if(this.__dK){var Q=O.changedTouches[0];var S={x:Q.screenX-this.__dH,y:Q.screenY-this.__dI};var T=qx.event.handler.Touch;if(this.__dM==P&&Math.abs(S.x)<=T.TAP_MAX_DISTANCE&&Math.abs(S.y)<=T.TAP_MAX_DISTANCE){this.__dO(O,l,P,qx.event.type.Tap);}
else {var R=this.__dT(O,P,S);if(R){O.swipe=R;this.__dO(O,m,P,qx.event.type.Swipe);}
;}
;}
;}
,__dT:function(U,V,W){var bb=qx.event.handler.Touch;var bc=new Date().getTime()-this.__dJ;var be=(Math.abs(W.x)>=Math.abs(W.y))?k:j;var X=W[be];var Y=bb.SWIPE_DIRECTION[be][X<0?0:1];var bd=(bc!==0)?X/bc:0;var ba=null;if(Math.abs(bd)>=bb.SWIPE_MIN_VELOCITY&&Math.abs(X)>=bb.SWIPE_MIN_DISTANCE){ba={startTime:this.__dJ,duration:bc,axis:be,direction:Y,distance:X,velocity:bd};}
;return ba;}
,__dU:function(bf){var bg=bf.type;var bi=qx.event.handler.Touch.MOUSE_TO_TOUCH_MAPPING;if(bi[bg]){bg=bi[bg];if(bg==d&&this.__dV(bf)){this.__dL=true;}
else if(bg==a){this.__dL=false;}
;var bj=this.__dW(bf);var bh=(bg==a?[]:[bj]);bf.touches=bh;bf.targetTouches=bh;bf.changedTouches=[bj];}
;return bg;}
,__dV:function(bk){if((qx.core.Environment.get(q)==p)){var bl=1;}
else {var bl=0;}
;return bk.button==bl;}
,__dW:function(bm){var bn=this.__dN(bm);return {clientX:bm.clientX,clientY:bm.clientY,screenX:bm.screenX,screenY:bm.screenY,pageX:bm.pageX,pageY:bm.pageY,identifier:1,target:bn};}
,_initTouchObserver:function(){this.__dF=qx.lang.Function.listener(this._onTouchEvent,this);var Event=qx.bom.Event;Event.addNativeListener(this.__cS,d,this.__dF);Event.addNativeListener(this.__cS,f,this.__dF);Event.addNativeListener(this.__cS,a,this.__dF);Event.addNativeListener(this.__cS,i,this.__dF);}
,_initMouseObserver:function(){if(!qx.core.Environment.get(b)){this.__dG=qx.lang.Function.listener(this._onMouseEvent,this);var Event=qx.bom.Event;Event.addNativeListener(this.__cS,c,this.__dG);Event.addNativeListener(this.__cS,g,this.__dG);Event.addNativeListener(this.__cS,h,this.__dG);}
;}
,_stopTouchObserver:function(){var Event=qx.bom.Event;Event.removeNativeListener(this.__cS,d,this.__dF);Event.removeNativeListener(this.__cS,f,this.__dF);Event.removeNativeListener(this.__cS,a,this.__dF);Event.removeNativeListener(this.__cS,i,this.__dF);}
,_stopMouseObserver:function(){if(!qx.core.Environment.get(b)){var Event=qx.bom.Event;Event.removeNativeListener(this.__cS,c,this.__dG);Event.removeNativeListener(this.__cS,g,this.__dG);Event.removeNativeListener(this.__cS,h,this.__dG);}
;}
,_onTouchEvent:qx.event.GlobalError.observeMethod(function(bo){this._commonTouchEventHandler(bo);}
),_onMouseEvent:qx.event.GlobalError.observeMethod(function(bp){if(!qx.core.Environment.get(b)){if(bp.type==g&&!this.__dL){return;}
;var bq=this.__dU(bp);this._commonTouchEventHandler(bp,bq);}
;}
),_commonTouchEventHandler:function(br,bs){var bs=bs||br.type;if(bs==d){this.__dM=this.__dN(br);}
;this.__dO(br,bs);this.__dP(br,bs);}
},destruct:function(){this._stopTouchObserver();this._stopMouseObserver();this.__dg=this.__cz=this.__cS=this.__dM=null;}
,defer:function(bt){qx.event.Registration.addHandler(bt);if(qx.core.Environment.get(b)){document.addEventListener(f,function(e){e.preventDefault();}
);qx.event.Registration.getManager(document).getHandler(bt);}
;}
});}
)();
(function(){var a="qx.event.type.Native";qx.Class.define(a,{extend:qx.event.type.Event,members:{init:function(b,c,d,e,f){qx.event.type.Event.prototype.init.call(this,e,f);this._target=c||qx.bom.Event.getTarget(b);this._relatedTarget=d||qx.bom.Event.getRelatedTarget(b);if(b.timeStamp){this._timeStamp=b.timeStamp;}
;this._native=b;this._returnValue=null;return this;}
,clone:function(g){var h=qx.event.type.Event.prototype.clone.call(this,g);var i={};h._native=this._cloneNativeEvent(this._native,i);h._returnValue=this._returnValue;return h;}
,_cloneNativeEvent:function(j,k){k.preventDefault=qx.lang.Function.empty;return k;}
,preventDefault:function(){qx.event.type.Event.prototype.preventDefault.call(this);qx.bom.Event.preventDefault(this._native);}
,getNativeEvent:function(){return this._native;}
,setReturnValue:function(l){this._returnValue=l;}
,getReturnValue:function(){return this._returnValue;}
},destruct:function(){this._native=this._returnValue=null;}
});}
)();
(function(){var c="os.name",b="qx.event.type.Dom",a="osx";qx.Class.define(b,{extend:qx.event.type.Native,statics:{SHIFT_MASK:1,CTRL_MASK:2,ALT_MASK:4,META_MASK:8},members:{_cloneNativeEvent:function(d,e){var e=qx.event.type.Native.prototype._cloneNativeEvent.call(this,d,e);e.shiftKey=d.shiftKey;e.ctrlKey=d.ctrlKey;e.altKey=d.altKey;e.metaKey=d.metaKey;return e;}
,getModifiers:function(){var g=0;var f=this._native;if(f.shiftKey){g|=qx.event.type.Dom.SHIFT_MASK;}
;if(f.ctrlKey){g|=qx.event.type.Dom.CTRL_MASK;}
;if(f.altKey){g|=qx.event.type.Dom.ALT_MASK;}
;if(f.metaKey){g|=qx.event.type.Dom.META_MASK;}
;return g;}
,isCtrlPressed:function(){return this._native.ctrlKey;}
,isShiftPressed:function(){return this._native.shiftKey;}
,isAltPressed:function(){return this._native.altKey;}
,isMetaPressed:function(){return this._native.metaKey;}
,isCtrlOrCommandPressed:function(){if(qx.core.Environment.get(c)==a&&true){return this._native.metaKey;}
else {return this._native.ctrlKey;}
;}
}});}
)();
(function(){var c="touchcancel",b="qx.event.type.Touch",a="touchend";qx.Class.define(b,{extend:qx.event.type.Dom,members:{_cloneNativeEvent:function(d,e){var e=qx.event.type.Dom.prototype._cloneNativeEvent.call(this,d,e);e.pageX=d.pageX;e.pageY=d.pageY;e.layerX=d.layerX;e.layerY=d.layerY;e.scale=d.scale;e.rotation=d.rotation;e.srcElement=d.srcElement;e.targetTouches=[];for(var i=0;i<d.targetTouches.length;i++){e.targetTouches[i]=d.targetTouches[i];}
;e.changedTouches=[];for(var i=0;i<d.changedTouches.length;i++){e.changedTouches[i]=d.changedTouches[i];}
;e.touches=[];for(var i=0;i<d.touches.length;i++){e.touches[i]=d.touches[i];}
;return e;}
,stop:function(){this.stopPropagation();}
,getAllTouches:function(){return this._native.touches;}
,getTargetTouches:function(){return this._native.targetTouches;}
,getChangedTargetTouches:function(){return this._native.changedTouches;}
,isMultiTouch:function(){return this.__dY().length>1;}
,getScale:function(){return this._native.scale;}
,getRotation:function(){return this._native.rotation;}
,getDocumentLeft:function(f){return this.__dX(f).pageX;}
,getDocumentTop:function(g){return this.__dX(g).pageY;}
,getScreenLeft:function(h){return this.__dX(h).screenX;}
,getScreenTop:function(j){return this.__dX(j).screenY;}
,getViewportLeft:function(k){return this.__dX(k).clientX;}
,getViewportTop:function(l){return this.__dX(l).clientY;}
,getIdentifier:function(m){return this.__dX(m).identifier;}
,__dX:function(n){n=n==null?0:n;return this.__dY()[n];}
,__dY:function(){var o=(this._isTouchEnd()?this.getChangedTargetTouches():this.getTargetTouches());return o;}
,_isTouchEnd:function(){return (this.getType()==a||this.getType()==c);}
}});}
)();
(function(){var a="qx.event.type.Tap";qx.Class.define(a,{extend:qx.event.type.Touch,members:{_isTouchEnd:function(){return true;}
}});}
)();
(function(){var a="qx.event.type.Swipe";qx.Class.define(a,{extend:qx.event.type.Touch,members:{_cloneNativeEvent:function(b,c){var c=qx.event.type.Touch.prototype._cloneNativeEvent.call(this,b,c);c.swipe=b.swipe;return c;}
,_isTouchEnd:function(){return true;}
,getStartTime:function(){return this._native.swipe.startTime;}
,getDuration:function(){return this._native.swipe.duration;}
,getAxis:function(){return this._native.swipe.axis;}
,getDirection:function(){return this._native.swipe.direction;}
,getVelocity:function(){return this._native.swipe.velocity;}
,getDistance:function(){return this._native.swipe.distance;}
}});}
)();
(function(){var c="qx.event.handler.Appear",b="disappear",a="appear";qx.Class.define(c,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(d){qx.core.Object.call(this);this.__dg=d;this.__ea={};qx.event.handler.Appear.__eb[this.$$hash]=this;}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{appear:true,disappear:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true,__eb:{},refresh:function(){var e=this.__eb;for(var f in e){e[f].refresh();}
;}
},members:{__dg:null,__ea:null,canHandleEvent:function(g,h){}
,registerEvent:function(i,j,k){var l=qx.core.ObjectRegistry.toHashCode(i)+j;var m=this.__ea;if(m&&!m[l]){m[l]=i;i.$$displayed=i.offsetWidth>0;}
;}
,unregisterEvent:function(n,o,p){var q=qx.core.ObjectRegistry.toHashCode(n)+o;var r=this.__ea;if(!r){return;}
;if(r[q]){delete r[q];}
;}
,refresh:function(){var v=this.__ea;var w;for(var u in v){w=v[u];var s=w.offsetWidth>0;if((!!w.$$displayed)!==s){w.$$displayed=s;var t=qx.event.Registration.createEvent(s?a:b);this.__dg.dispatchEvent(w,t);}
;}
;}
},destruct:function(){this.__dg=this.__ea=null;delete qx.event.handler.Appear.__eb[this.$$hash];}
,defer:function(x){qx.event.Registration.addHandler(x);}
});}
)();
(function(){var b="qx.ui.mobile.core.DomUpdatedHandler",a="domupdated";qx.Class.define(b,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(c){qx.core.Object.call(this);this.__dg=c;this.__ea={};qx.ui.mobile.core.DomUpdatedHandler.__eb[this.$$hash]=this;}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{domupdated:1},IGNORE_CAN_HANDLE:false,__eb:{},refresh:function(){var d=this.__eb;for(var e in d){d[e].refresh();}
;}
},members:{__dg:null,__ea:null,canHandleEvent:function(f,g){return f instanceof qx.ui.mobile.core.Widget;}
,registerEvent:function(h,i,j){var k=h.$$hash;var l=this.__ea;if(l&&!l[k]){l[k]=h;}
;}
,unregisterEvent:function(m,n,o){var p=m.$$hash;var q=this.__ea;if(!q){return;}
;if(q[p]){delete q[p];}
;}
,refresh:function(){var t=this.__ea;var u;for(var s in t){u=t[s];if(u&&!u.$$disposed&&u.isSeeable()){var r=qx.event.Registration.createEvent(a);this.__dg.dispatchEvent(u,r);}
;}
;}
},destruct:function(){this.__dg=this.__ea=null;delete qx.ui.mobile.core.DomUpdatedHandler.__eb[this.$$hash];}
,defer:function(v){qx.event.Registration.addHandler(v);}
});}
)();
(function(){var c="abstract",b="Missing implementation",a="qx.event.dispatch.AbstractBubbling";qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventDispatcher,type:c,construct:function(d){this._manager=d;}
,members:{_getParent:function(e){throw new Error(b);}
,canDispatchEvent:function(f,event,g){return event.getBubbles();}
,dispatchEvent:function(h,event,k){var parent=h;var t=this._manager;var q,x;var o;var s,v;var u;var w=[];q=t.getListeners(h,k,true);x=t.getListeners(h,k,false);if(q){w.push(q);}
;if(x){w.push(x);}
;var parent=this._getParent(h);var m=[];var l=[];var n=[];var r=[];while(parent!=null){q=t.getListeners(parent,k,true);if(q){n.push(q);r.push(parent);}
;x=t.getListeners(parent,k,false);if(x){m.push(x);l.push(parent);}
;parent=this._getParent(parent);}
;event.setEventPhase(qx.event.type.Event.CAPTURING_PHASE);for(var i=n.length-1;i>=0;i--){u=r[i];event.setCurrentTarget(u);o=n[i];for(var j=0,p=o.length;j<p;j++){s=o[j];v=s.context||u;{}
;s.handler.call(v,event);}
;if(event.getPropagationStopped()){return;}
;}
;event.setEventPhase(qx.event.type.Event.AT_TARGET);event.setCurrentTarget(h);for(var i=0,y=w.length;i<y;i++){o=w[i];for(var j=0,p=o.length;j<p;j++){s=o[j];v=s.context||h;{}
;s.handler.call(v,event);}
;if(event.getPropagationStopped()){return;}
;}
;event.setEventPhase(qx.event.type.Event.BUBBLING_PHASE);for(var i=0,y=m.length;i<y;i++){u=l[i];event.setCurrentTarget(u);o=m[i];for(var j=0,p=o.length;j<p;j++){s=o[j];v=s.context||u;{}
;s.handler.call(v,event);}
;if(event.getPropagationStopped()){return;}
;}
;}
}});}
)();
(function(){var a="qx.event.dispatch.DomBubbling";qx.Class.define(a,{extend:qx.event.dispatch.AbstractBubbling,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL},members:{_getParent:function(b){return b.parentNode;}
,canDispatchEvent:function(c,event,d){return c.nodeType!==undefined&&event.getBubbles();}
},defer:function(e){qx.event.Registration.addDispatcher(e);}
});}
)();
(function(){var d="qx.event.handler.Element",c="load",b="iframe",a="-";qx.Class.define(d,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(e){qx.core.Object.call(this);this._manager=e;this._registeredEvents={};}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{abort:true,load:true,scroll:true,select:true,reset:true,submit:true},CANCELABLE:{selectstart:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:false},members:{canHandleEvent:function(f,g){if(g===c){return f.tagName.toLowerCase()!==b;}
else {return true;}
;}
,registerEvent:function(h,i,j){var m=qx.core.ObjectRegistry.toHashCode(h);var k=m+a+i;var l=qx.lang.Function.listener(this._onNative,this,k);qx.bom.Event.addNativeListener(h,i,l);this._registeredEvents[k]={element:h,type:i,listener:l};}
,unregisterEvent:function(n,o,p){var s=this._registeredEvents;if(!s){return;}
;var t=qx.core.ObjectRegistry.toHashCode(n);var q=t+a+o;var r=this._registeredEvents[q];if(r){qx.bom.Event.removeNativeListener(n,o,r.listener);}
;delete this._registeredEvents[q];}
,_onNative:qx.event.GlobalError.observeMethod(function(u,v){var x=this._registeredEvents;if(!x){return;}
;var w=x[v];var y=this.constructor.CANCELABLE[w.type];qx.event.Registration.fireNonBubblingEvent(w.element,w.type,qx.event.type.Native,[u,undefined,undefined,undefined,y]);}
)},destruct:function(){var z;var A=this._registeredEvents;for(var B in A){z=A[B];qx.bom.Event.removeNativeListener(z.element,z.type,z.listener);}
;this._manager=this._registeredEvents=null;}
,defer:function(C){qx.event.Registration.addHandler(C);}
});}
)();
(function(){var m="Escape",l="webkit",k="5",j="3",i="Meta",h="7",g="CapsLock",f="Scroll",e="Control",d="Tab",br="Shift",bq="Pause",bp="Unidentified",bo="qx.event.handler.Keyboard",bn="Apps",bm="6",bl="4",bk="Alt",bj="2",bi="gecko",t="1",u="8",r=",",s="Backspace",p="-",q="PageUp",n="+",o="PrintScreen",B="os.name",C="A",N="Space",K="Left",V="F5",Q="Down",be="Up",bb="F11",G="F6",bh="useraction",bg="osx",bf="keyinput",F="Insert",I="F8",J="End",M="/",O="Delete",R="*",X="cmd",bd="F1",v="F4",w="Home",H="F2",U="F12",T="PageDown",S="F7",ba="Win",Y="F9",P="F10",W="engine.name",a="Right",bc="F3",x="Z",y="Enter",L="engine.version",b="0",c="9",E="NumLock",z="keyup",A="keydown",D="keypress";qx.Class.define(bo,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(bs){qx.core.Object.call(this);this.__dg=bs;this.__cz=bs.getWindow();this.__cS=this.__cz.document.documentElement;this.__ec={};this._initKeyObserver();}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{keyup:1,keydown:1,keypress:1,keyinput:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true,isValidKeyIdentifier:function(bt){if(this._identifierToKeyCodeMap[bt]){return true;}
;if(bt.length!=1){return false;}
;if(bt>=b&&bt<=c){return true;}
;if(bt>=C&&bt<=x){return true;}
;switch(bt){case n:case p:case R:case M:return true;default:return false;};}
,isPrintableKeyIdentifier:function(bu){if(bu===N){return true;}
else {return this._identifierToKeyCodeMap[bu]?false:true;}
;}
},members:{__ed:null,__dg:null,__cz:null,__cS:null,__ec:null,__ee:null,__ef:null,__eg:null,canHandleEvent:function(bv,bw){}
,registerEvent:function(bx,by,bz){}
,unregisterEvent:function(bA,bB,bC){}
,_fireInputEvent:function(bD,bE){var bF=this.__eh();if(bF&&bF.offsetWidth!=0){var event=qx.event.Registration.createEvent(bf,qx.event.type.KeyInput,[bD,bF,bE]);this.__dg.dispatchEvent(bF,event);}
;if(this.__cz){qx.event.Registration.fireEvent(this.__cz,bh,qx.event.type.Data,[bf]);}
;}
,_fireSequenceEvent:function(bG,bH,bI){var bJ=this.__eh();var bK=bG.keyCode;var event=qx.event.Registration.createEvent(bH,qx.event.type.KeySequence,[bG,bJ,bI]);this.__dg.dispatchEvent(bJ,event);if(false||true){if(bH==A&&event.getDefaultPrevented()){if(!this._isNonPrintableKeyCode(bK)&&!this._emulateKeyPress[bK]){this._fireSequenceEvent(bG,D,bI);}
;}
;}
;if(this.__cz){qx.event.Registration.fireEvent(this.__cz,bh,qx.event.type.Data,[bH]);}
;}
,__eh:function(){var bL=this.__dg.getHandler(qx.event.handler.Focus);var bM=bL.getActive();if(!bM||bM.offsetWidth==0){bM=bL.getFocus();}
;if(!bM||bM.offsetWidth==0){bM=this.__dg.getWindow().document.body;}
;return bM;}
,_initKeyObserver:function(){this.__ed=qx.lang.Function.listener(this.__ei,this);this.__eg=qx.lang.Function.listener(this.__ek,this);var Event=qx.bom.Event;Event.addNativeListener(this.__cS,z,this.__ed);Event.addNativeListener(this.__cS,A,this.__ed);Event.addNativeListener(this.__cS,D,this.__eg);}
,_stopKeyObserver:function(){var Event=qx.bom.Event;Event.removeNativeListener(this.__cS,z,this.__ed);Event.removeNativeListener(this.__cS,A,this.__ed);Event.removeNativeListener(this.__cS,D,this.__eg);for(var bO in (this.__ef||{})){var bN=this.__ef[bO];Event.removeNativeListener(bN.target,D,bN.callback);}
;delete (this.__ef);}
,__ei:qx.event.GlobalError.observeMethod(function(bP){var bS=0;var bQ=0;var bR=bP.type;if(parseFloat(qx.core.Environment.get(L))<525.13){if(bR==z||bR==A){bS=this._charCode2KeyCode[bP.charCode]||bP.keyCode;}
else {if(this._charCode2KeyCode[bP.charCode]){bS=this._charCode2KeyCode[bP.charCode];}
else {bQ=bP.charCode;}
;}
;this._idealKeyHandler(bS,bQ,bR,bP);}
else {bS=bP.keyCode;this._idealKeyHandler(bS,bQ,bR,bP);if(bR==A){if(this._isNonPrintableKeyCode(bS)||this._emulateKeyPress[bS]){this._idealKeyHandler(bS,bQ,D,bP);}
;}
;this.__ec[bS]=bR;}
;}
),__ej:null,__ek:qx.event.GlobalError.observeMethod(function(bT){if(parseFloat(qx.core.Environment.get(L))<525.13){var bW=0;var bU=0;var bV=bT.type;if(bV==z||bV==A){bW=this._charCode2KeyCode[bT.charCode]||bT.keyCode;}
else {if(this._charCode2KeyCode[bT.charCode]){bW=this._charCode2KeyCode[bT.charCode];}
else {bU=bT.charCode;}
;}
;this._idealKeyHandler(bW,bU,bV,bT);}
else {if(this._charCode2KeyCode[bT.keyCode]){this._idealKeyHandler(this._charCode2KeyCode[bT.keyCode],0,bT.type,bT);}
else {this._idealKeyHandler(0,bT.keyCode,bT.type,bT);}
;}
;}
),_idealKeyHandler:function(bX,bY,ca,cb){var cc;if(bX||(!bX&&!bY)){cc=this._keyCodeToIdentifier(bX);this._fireSequenceEvent(cb,ca,cc);}
else {cc=this._charCodeToIdentifier(bY);this._fireSequenceEvent(cb,D,cc);this._fireInputEvent(cb,bY);}
;}
,_specialCharCodeMap:{'8':s,'9':d,'13':y,'27':m,'32':N},_emulateKeyPress:{'8':true,'9':true,'27':true},_keyCodeToIdentifierMap:{'16':br,'17':e,'18':bk,'20':g,'224':i,'37':K,'38':be,'39':a,'40':Q,'33':q,'34':T,'35':J,'36':w,'45':F,'46':O,'112':bd,'113':H,'114':bc,'115':v,'116':V,'117':G,'118':S,'119':I,'120':Y,'121':P,'122':bb,'123':U,'144':E,'44':o,'145':f,'19':bq,'91':qx.core.Environment.get(B)==bg?X:ba,'92':ba,'93':qx.core.Environment.get(B)==bg?X:bn},_numpadToCharCode:{'96':b.charCodeAt(0),'97':t.charCodeAt(0),'98':bj.charCodeAt(0),'99':j.charCodeAt(0),'100':bl.charCodeAt(0),'101':k.charCodeAt(0),'102':bm.charCodeAt(0),'103':h.charCodeAt(0),'104':u.charCodeAt(0),'105':c.charCodeAt(0),'106':R.charCodeAt(0),'107':n.charCodeAt(0),'109':p.charCodeAt(0),'110':r.charCodeAt(0),'111':M.charCodeAt(0)},_charCodeA:C.charCodeAt(0),_charCodeZ:x.charCodeAt(0),_charCode0:b.charCodeAt(0),_charCode9:c.charCodeAt(0),_isNonPrintableKeyCode:function(cd){return this._keyCodeToIdentifierMap[cd]?true:false;}
,_isIdentifiableKeyCode:function(ce){if(ce>=this._charCodeA&&ce<=this._charCodeZ){return true;}
;if(ce>=this._charCode0&&ce<=this._charCode9){return true;}
;if(this._specialCharCodeMap[ce]){return true;}
;if(this._numpadToCharCode[ce]){return true;}
;if(this._isNonPrintableKeyCode(ce)){return true;}
;return false;}
,_keyCodeToIdentifier:function(cf){if(this._isIdentifiableKeyCode(cf)){var cg=this._numpadToCharCode[cf];if(cg){return String.fromCharCode(cg);}
;return (this._keyCodeToIdentifierMap[cf]||this._specialCharCodeMap[cf]||String.fromCharCode(cf));}
else {return bp;}
;}
,_charCodeToIdentifier:function(ch){return this._specialCharCodeMap[ch]||String.fromCharCode(ch).toUpperCase();}
,_identifierToKeyCode:function(ci){return qx.event.handler.Keyboard._identifierToKeyCodeMap[ci]||ci.charCodeAt(0);}
},destruct:function(){this._stopKeyObserver();this.__ee=this.__dg=this.__cz=this.__cS=this.__ec=null;}
,defer:function(cj,ck){qx.event.Registration.addHandler(cj);if(!cj._identifierToKeyCodeMap){cj._identifierToKeyCodeMap={};for(var cl in ck._keyCodeToIdentifierMap){cj._identifierToKeyCodeMap[ck._keyCodeToIdentifierMap[cl]]=parseInt(cl,10);}
;for(var cl in ck._specialCharCodeMap){cj._identifierToKeyCodeMap[ck._specialCharCodeMap[cl]]=parseInt(cl,10);}
;}
;(qx.core.Environment.get(W)==bi);{ck._keyCodeFix={'12':ck._identifierToKeyCode(E)};}
;if((qx.core.Environment.get(W)==l)){if(parseFloat(qx.core.Environment.get(L))<525.13){ck._charCode2KeyCode={'63289':ck._identifierToKeyCode(E),'63276':ck._identifierToKeyCode(q),'63277':ck._identifierToKeyCode(T),'63275':ck._identifierToKeyCode(J),'63273':ck._identifierToKeyCode(w),'63234':ck._identifierToKeyCode(K),'63232':ck._identifierToKeyCode(be),'63235':ck._identifierToKeyCode(a),'63233':ck._identifierToKeyCode(Q),'63272':ck._identifierToKeyCode(O),'63302':ck._identifierToKeyCode(F),'63236':ck._identifierToKeyCode(bd),'63237':ck._identifierToKeyCode(H),'63238':ck._identifierToKeyCode(bc),'63239':ck._identifierToKeyCode(v),'63240':ck._identifierToKeyCode(V),'63241':ck._identifierToKeyCode(G),'63242':ck._identifierToKeyCode(S),'63243':ck._identifierToKeyCode(I),'63244':ck._identifierToKeyCode(Y),'63245':ck._identifierToKeyCode(P),'63246':ck._identifierToKeyCode(bb),'63247':ck._identifierToKeyCode(U),'63248':ck._identifierToKeyCode(o),'3':ck._identifierToKeyCode(y),'12':ck._identifierToKeyCode(E),'13':ck._identifierToKeyCode(y)};}
else {ck._charCode2KeyCode={'13':13,'27':27};}
;}
;}
});}
)();
(function(){var a="qx.event.type.KeyInput";qx.Class.define(a,{extend:qx.event.type.Dom,members:{init:function(b,c,d){qx.event.type.Dom.prototype.init.call(this,b,c,null,true,true);this._charCode=d;return this;}
,clone:function(e){var f=qx.event.type.Dom.prototype.clone.call(this,e);f._charCode=this._charCode;return f;}
,getCharCode:function(){return this._charCode;}
,getChar:function(){return String.fromCharCode(this._charCode);}
}});}
)();
(function(){var a="qx.event.type.KeySequence";qx.Class.define(a,{extend:qx.event.type.Dom,members:{init:function(b,c,d){qx.event.type.Dom.prototype.init.call(this,b,c,null,true,true);this._keyCode=b.keyCode;this._identifier=d;return this;}
,clone:function(e){var f=qx.event.type.Dom.prototype.clone.call(this,e);f._keyCode=this._keyCode;f._identifier=this._identifier;return f;}
,getKeyIdentifier:function(){return this._identifier;}
,getKeyCode:function(){return this._keyCode;}
,isPrintable:function(){return qx.event.handler.Keyboard.isPrintableKeyIdentifier(this._identifier);}
}});}
)();
(function(){var t="activate",s="focusout",r="qxKeepActive",q="_applyActive",p="tabIndex",o="qx.event.handler.Focus",n="_applyFocus",m="qxSelectable",l="deactivate",k="input",d="textarea",j="focusin",g="qxKeepFocus",c="selectstart",b="mousedown",f="DOMFocusOut",e="mouseup",h="on",a="blur",i="focus";qx.Class.define(o,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(u){qx.core.Object.call(this);this._manager=u;this._window=u.getWindow();this._document=this._window.document;this._root=this._document.documentElement;this._body=this._document.body;this._initObserver();}
,properties:{active:{apply:q,nullable:true},focus:{apply:n,nullable:true}},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{focus:1,blur:1,focusin:1,focusout:1,activate:1,deactivate:1},IGNORE_CAN_HANDLE:true,FOCUSABLE_ELEMENTS:{button:1,input:1,select:1,textarea:1}},members:{__el:null,__em:null,__en:null,__eo:null,__ep:null,__eq:null,__er:null,__es:null,__et:null,__eu:null,canHandleEvent:function(v,w){}
,registerEvent:function(x,y,z){}
,unregisterEvent:function(A,B,C){}
,focus:function(D){try{D.focus();}
catch(E){}
;this.setFocus(D);this.setActive(D);}
,activate:function(F){this.setActive(F);}
,blur:function(G){try{G.blur();}
catch(H){}
;if(this.getActive()===G){this.resetActive();}
;if(this.getFocus()===G){this.resetFocus();}
;}
,deactivate:function(I){if(this.getActive()===I){this.resetActive();}
;}
,tryActivate:function(J){var K=this.__eI(J);if(K){this.setActive(K);}
;}
,__dO:function(L,M,N,O){var Q=qx.event.Registration;var P=Q.createEvent(N,qx.event.type.Focus,[L,M,O]);Q.dispatchEvent(L,P);}
,_windowFocused:true,__ev:function(){if(this._windowFocused){this._windowFocused=false;this.__dO(this._window,null,a,false);}
;}
,__ew:function(){if(!this._windowFocused){this._windowFocused=true;this.__dO(this._window,null,i,false);}
;}
,_initObserver:function(){this.__el=qx.lang.Function.listener(this.__eC,this);this.__em=qx.lang.Function.listener(this.__eD,this);this.__es=qx.lang.Function.listener(this.__ez,this);this.__en=qx.lang.Function.listener(this.__eB,this);this.__eo=qx.lang.Function.listener(this.__eA,this);this.__eq=qx.lang.Function.listener(this.__eF,this);qx.bom.Event.addNativeListener(this._document,b,this.__el,true);qx.bom.Event.addNativeListener(this._document,e,this.__em,true);qx.bom.Event.addNativeListener(this._document,c,this.__eq,false);qx.bom.Event.addNativeListener(this._window,f,this.__es,true);qx.bom.Event.addNativeListener(this._window,i,this.__en,true);qx.bom.Event.addNativeListener(this._window,a,this.__eo,true);}
,_stopObserver:function(){qx.bom.Event.removeNativeListener(this._document,b,this.__el,true);qx.bom.Event.removeNativeListener(this._document,e,this.__em,true);qx.bom.Event.removeNativeListener(this._document,c,this.__eq,false);qx.bom.Event.removeNativeListener(this._window,f,this.__es,true);qx.bom.Event.removeNativeListener(this._window,i,this.__en,true);qx.bom.Event.removeNativeListener(this._window,a,this.__eo,true);}
,__ex:qx.event.GlobalError.observeMethod(null),__ey:qx.event.GlobalError.observeMethod(null),__ez:qx.event.GlobalError.observeMethod(function(R){var S=qx.bom.Event.getTarget(R);if(S===this.getFocus()){this.resetFocus();}
;if(S===this.getActive()){this.resetActive();}
;}
),__eA:qx.event.GlobalError.observeMethod(function(T){var U=qx.bom.Event.getTarget(T);if(U===this._window||U===this._document){this.__ev();this.__et=this.getFocus();this.__eu=this.getActive();this.resetActive();this.resetFocus();}
;}
),__eB:qx.event.GlobalError.observeMethod(function(V){var W=qx.bom.Event.getTarget(V);if(W===this._window||W===this._document){this.__ew();if(this.__et){this.setFocus(this.__et);delete this.__et;}
;if(this.__eu){this.setActive(this.__eu);delete this.__eu;}
;}
else {this.setFocus(W);this.tryActivate(W);}
;}
),__eC:qx.event.GlobalError.observeMethod(function(X){var ba=qx.bom.Event.getTarget(X);var Y=this.__eH(ba);if(Y){this.setFocus(Y);}
else {qx.bom.Event.preventDefault(X);}
;}
),__eD:qx.event.GlobalError.observeMethod(function(bb){var bc=qx.bom.Event.getTarget(bb);this.tryActivate(this.__eE(bc));}
),__eE:qx.event.GlobalError.observeMethod(function(bd){var be=this.getFocus();if(be&&bd!=be&&(be.nodeName.toLowerCase()===k||be.nodeName.toLowerCase()===d)){bd=be;}
;return bd;}
),__eF:qx.event.GlobalError.observeMethod(function(bf){var bg=qx.bom.Event.getTarget(bf);if(!this.__eJ(bg)){qx.bom.Event.preventDefault(bf);}
;}
),__eG:function(bh){var bi=qx.bom.element.Attribute.get(bh,p);if(bi>=1){return true;}
;var bj=qx.event.handler.Focus.FOCUSABLE_ELEMENTS;if(bi>=0&&bj[bh.tagName]){return true;}
;return false;}
,__eH:function(bk){while(bk&&bk.nodeType===1){if(bk.getAttribute(g)==h){return null;}
;if(this.__eG(bk)){return bk;}
;bk=bk.parentNode;}
;return this._body;}
,__eI:function(bl){var bm=bl;while(bl&&bl.nodeType===1){if(bl.getAttribute(r)==h){return null;}
;bl=bl.parentNode;}
;return bm;}
,__eJ:function(bn){while(bn&&bn.nodeType===1){var bo=bn.getAttribute(m);if(bo!=null){return bo===h;}
;bn=bn.parentNode;}
;return true;}
,_applyActive:function(bp,bq){if(bq){this.__dO(bq,bp,l,true);}
;if(bp){this.__dO(bp,bq,t,true);}
;}
,_applyFocus:function(br,bs){if(bs){this.__dO(bs,br,s,true);}
;if(br){this.__dO(br,bs,j,true);}
;if(bs){this.__dO(bs,br,a,false);}
;if(br){this.__dO(br,bs,i,false);}
;}
},destruct:function(){this._stopObserver();this._manager=this._window=this._document=this._root=this._body=this.__eK=null;}
,defer:function(bt){qx.event.Registration.addHandler(bt);var bu=bt.FOCUSABLE_ELEMENTS;for(var bv in bu){bu[bv.toUpperCase()]=1;}
;}
});}
)();
(function(){var a="qx.event.type.Focus";qx.Class.define(a,{extend:qx.event.type.Event,members:{init:function(b,c,d){qx.event.type.Event.prototype.init.call(this,d,false);this._target=b;this._relatedTarget=c;return this;}
}});}
)();
(function(){var q="useraction",p="engine.version",o="DOMMouseScroll",n="qx.event.handler.Mouse",m="dblclick",l="os.name",k="mouseover",j="mouseout",h="ios",g="mousemove",c="on",f="mousedown",e="contextmenu",b="click",a="mouseup",d="mousewheel";qx.Class.define(n,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(r){qx.core.Object.call(this);this.__dg=r;this.__cz=r.getWindow();this.__cS=this.__cz.document;this._initButtonObserver();this._initMoveObserver();this._initWheelObserver();}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{mousemove:1,mouseover:1,mouseout:1,mousedown:1,mouseup:1,click:1,dblclick:1,contextmenu:1,mousewheel:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE+qx.event.IEventHandler.TARGET_DOCUMENT+qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{__eL:null,__eM:null,__eN:null,__eO:null,__eP:null,__dg:null,__cz:null,__cS:null,canHandleEvent:function(s,t){}
,registerEvent:qx.core.Environment.get(l)===h?function(u,v,w){u[c+v]=qx.lang.Function.returnNull;}
:qx.lang.Function.returnNull,unregisterEvent:qx.core.Environment.get(l)===h?function(x,y,z){x[c+y]=undefined;}
:qx.lang.Function.returnNull,__dO:function(A,B,C){if(!C){C=qx.bom.Event.getTarget(A);}
;if(C&&C.nodeType){qx.event.Registration.fireEvent(C,B||A.type,B==d?qx.event.type.MouseWheel:qx.event.type.Mouse,[A,C,null,true,true]);}
;qx.event.Registration.fireEvent(this.__cz,q,qx.event.type.Data,[B||A.type]);}
,__eQ:function(){var E=[this.__cz,this.__cS,this.__cS.body];var F=this.__cz;var D=o;for(var i=0;i<E.length;i++){if(qx.bom.Event.supportsEvent(E[i],d)){D=d;F=E[i];break;}
;}
;return {type:D,target:F};}
,_initButtonObserver:function(){this.__eL=qx.lang.Function.listener(this._onButtonEvent,this);var Event=qx.bom.Event;Event.addNativeListener(this.__cS,f,this.__eL);Event.addNativeListener(this.__cS,a,this.__eL);Event.addNativeListener(this.__cS,b,this.__eL);Event.addNativeListener(this.__cS,m,this.__eL);Event.addNativeListener(this.__cS,e,this.__eL);}
,_initMoveObserver:function(){this.__eM=qx.lang.Function.listener(this._onMoveEvent,this);var Event=qx.bom.Event;Event.addNativeListener(this.__cS,g,this.__eM);Event.addNativeListener(this.__cS,k,this.__eM);Event.addNativeListener(this.__cS,j,this.__eM);}
,_initWheelObserver:function(){this.__eN=qx.lang.Function.listener(this._onWheelEvent,this);var G=this.__eQ();qx.bom.Event.addNativeListener(G.target,G.type,this.__eN);}
,_stopButtonObserver:function(){var Event=qx.bom.Event;Event.removeNativeListener(this.__cS,f,this.__eL);Event.removeNativeListener(this.__cS,a,this.__eL);Event.removeNativeListener(this.__cS,b,this.__eL);Event.removeNativeListener(this.__cS,m,this.__eL);Event.removeNativeListener(this.__cS,e,this.__eL);}
,_stopMoveObserver:function(){var Event=qx.bom.Event;Event.removeNativeListener(this.__cS,g,this.__eM);Event.removeNativeListener(this.__cS,k,this.__eM);Event.removeNativeListener(this.__cS,j,this.__eM);}
,_stopWheelObserver:function(){var H=this.__eQ();qx.bom.Event.removeNativeListener(H.target,H.type,this.__eN);}
,_onMoveEvent:qx.event.GlobalError.observeMethod(function(I){this.__dO(I);}
),_onButtonEvent:qx.event.GlobalError.observeMethod(function(J){var K=J.type;var L=qx.bom.Event.getTarget(J);if(false||true){if(L&&L.nodeType==3){L=L.parentNode;}
;}
;if(this.__eR){this.__eR(J,K,L);}
;if(this.__eT){this.__eT(J,K,L);}
;this.__dO(J,K,L);if(this.__eS){this.__eS(J,K,L);}
;if(this.__eU){this.__eU(J,K,L);}
;this.__eO=K;}
),_onWheelEvent:qx.event.GlobalError.observeMethod(function(M){this.__dO(M,d);}
),__eR:function(N,O,P){if(parseFloat(qx.core.Environment.get(p))<530){if(O==e){this.__dO(N,a,P);}
;}
;}
,__eS:null,__eT:null,__eU:function(Q,R,S){switch(R){case f:this.__eP=S;break;case a:if(S!==this.__eP){var T=qx.dom.Hierarchy.getCommonParent(S,this.__eP);this.__dO(Q,b,T);}
;};}
},destruct:function(){this._stopButtonObserver();this._stopMoveObserver();this._stopWheelObserver();this.__dg=this.__cz=this.__cS=this.__eP=null;}
,defer:function(U){qx.event.Registration.addHandler(U);}
});}
)();
(function(){var j="click",i="contextmenu",h="qx.event.type.Mouse",g="browser.documentmode",f="browser.name",e="ie",d="none",c="middle",b="left",a="right";qx.Class.define(h,{extend:qx.event.type.Dom,members:{_cloneNativeEvent:function(k,l){var l=qx.event.type.Dom.prototype._cloneNativeEvent.call(this,k,l);l.button=k.button;l.clientX=k.clientX;l.clientY=k.clientY;l.pageX=k.pageX;l.pageY=k.pageY;l.screenX=k.screenX;l.screenY=k.screenY;l.wheelDelta=k.wheelDelta;l.wheelDeltaX=k.wheelDeltaX;l.wheelDeltaY=k.wheelDeltaY;l.detail=k.detail;l.axis=k.axis;l.wheelX=k.wheelX;l.wheelY=k.wheelY;l.HORIZONTAL_AXIS=k.HORIZONTAL_AXIS;l.srcElement=k.srcElement;l.target=k.target;return l;}
,__eV:{'0':b,'2':a,'1':c},__eW:{'1':b,'2':a,'4':c},stop:function(){this.stopPropagation();}
,getButton:function(){switch(this._type){case i:return a;case j:if(qx.core.Environment.get(f)===e&&qx.core.Environment.get(g)<9){return b;}
;default:if(this._native.target!==undefined){return this.__eV[this._native.button]||d;}
else {return this.__eW[this._native.button]||d;}
;};}
,isLeftPressed:function(){return this.getButton()===b;}
,isMiddlePressed:function(){return this.getButton()===c;}
,isRightPressed:function(){return this.getButton()===a;}
,getRelatedTarget:function(){return this._relatedTarget;}
,getViewportLeft:function(){return this._native.clientX;}
,getViewportTop:function(){return this._native.clientY;}
,getDocumentLeft:function(){if(this._native.pageX!==undefined){return this._native.pageX;}
else {var m=qx.dom.Node.getWindow(this._native.srcElement);return this._native.clientX+qx.bom.Viewport.getScrollLeft(m);}
;}
,getDocumentTop:function(){if(this._native.pageY!==undefined){return this._native.pageY;}
else {var n=qx.dom.Node.getWindow(this._native.srcElement);return this._native.clientY+qx.bom.Viewport.getScrollTop(n);}
;}
,getScreenLeft:function(){return this._native.screenX;}
,getScreenTop:function(){return this._native.screenY;}
}});}
)();
(function(){var k="x",j="osx",i="win",h="chrome",g="qx.dynamicmousewheel",f="qx.event.type.MouseWheel",d="browser.name",c="y",b="os.name",a="engine.version";qx.Class.define(f,{extend:qx.event.type.Mouse,statics:{MAXSCROLL:null,MINSCROLL:null,FACTOR:1},members:{stop:function(){this.stopPropagation();this.preventDefault();}
,__eX:function(l){var m=Math.abs(l);if(qx.event.type.MouseWheel.MINSCROLL==null||qx.event.type.MouseWheel.MINSCROLL>m){qx.event.type.MouseWheel.MINSCROLL=m;this.__eY();}
;if(qx.event.type.MouseWheel.MAXSCROLL==null||qx.event.type.MouseWheel.MAXSCROLL<m){qx.event.type.MouseWheel.MAXSCROLL=m;this.__eY();}
;if(qx.event.type.MouseWheel.MAXSCROLL===m&&qx.event.type.MouseWheel.MINSCROLL===m){return 2*(l/m);}
;var n=qx.event.type.MouseWheel.MAXSCROLL-qx.event.type.MouseWheel.MINSCROLL;var o=(l/n)*Math.log(n)*qx.event.type.MouseWheel.FACTOR;return o<0?Math.min(o,-1):Math.max(o,1);}
,__eY:function(){var p=qx.event.type.MouseWheel.MAXSCROLL||0;var s=qx.event.type.MouseWheel.MINSCROLL||p;if(p<=s){return;}
;var q=p-s;var r=(p/q)*Math.log(q);if(r==0){r=1;}
;qx.event.type.MouseWheel.FACTOR=6/r;}
,getWheelDelta:function(t){var e=this._native;if(t===undefined){if(u===undefined){var u=-e.wheelDelta;if(e.wheelDelta===undefined){u=e.detail;}
;}
;return this.__fa(u);}
;if(t===k){var x=0;if(e.wheelDelta!==undefined){if(e.wheelDeltaX!==undefined){x=e.wheelDeltaX?this.__fa(-e.wheelDeltaX):0;}
;}
else {if(e.axis&&e.axis==e.HORIZONTAL_AXIS){x=this.__fa(e.detail);}
;}
;return x;}
;if(t===c){var y=0;if(e.wheelDelta!==undefined){if(e.wheelDeltaY!==undefined){y=e.wheelDeltaY?this.__fa(-e.wheelDeltaY):0;}
else {y=this.__fa(-e.wheelDelta);}
;}
else {if(!(e.axis&&e.axis==e.HORIZONTAL_AXIS)){y=this.__fa(e.detail);}
;}
;return y;}
;return 0;}
,__fa:function(v){if(qx.core.Environment.get(g)){return this.__eX(v);}
else {var w=function(){if(qx.core.Environment.get(d)==h){if(qx.core.Environment.get(b)==j){return v/60;}
else {return v/120;}
;}
else {if(qx.core.Environment.get(b)==i){var z=120;if(parseFloat(qx.core.Environment.get(a))==533.16){z=1200;}
;}
else {z=40;if(parseFloat(qx.core.Environment.get(a))==533.16||parseFloat(qx.core.Environment.get(a))==533.17||parseFloat(qx.core.Environment.get(a))==533.18){z=1200;}
;}
;return v/z;}
;}
;return w.call(this);}
;}
}});}
)();
(function(){var g="qx.dom.Hierarchy",f="previousSibling",e="nextSibling",d="parentNode",c="*",b="html.element.compareDocumentPosition",a="html.element.contains";qx.Class.define(g,{statics:{getNodeIndex:function(h){var i=0;while(h&&(h=h.previousSibling)){i++;}
;return i;}
,getElementIndex:function(j){var k=0;var l=qx.dom.Node.ELEMENT;while(j&&(j=j.previousSibling)){if(j.nodeType==l){k++;}
;}
;return k;}
,getNextElementSibling:function(m){while(m&&(m=m.nextSibling)&&!qx.dom.Node.isElement(m)){continue;}
;return m||null;}
,getPreviousElementSibling:function(n){while(n&&(n=n.previousSibling)&&!qx.dom.Node.isElement(n)){continue;}
;return n||null;}
,contains:function(o,p){if(qx.core.Environment.get(a)){if(qx.dom.Node.isDocument(o)){var q=qx.dom.Node.getDocument(p);return o&&q==o;}
else if(qx.dom.Node.isDocument(p)){return false;}
else {return o.contains(p);}
;}
else if(qx.core.Environment.get(b)){return !!(o.compareDocumentPosition(p)&16);}
else {while(p){if(o==p){return true;}
;p=p.parentNode;}
;return false;}
;}
,isRendered:function(r){var s=r.ownerDocument||r.document;if(qx.core.Environment.get(a)){if(!r.parentNode||!r.offsetParent){return false;}
;return s.body.contains(r);}
else if(qx.core.Environment.get(b)){return !!(s.compareDocumentPosition(r)&16);}
else {while(r){if(r==s.body){return true;}
;r=r.parentNode;}
;return false;}
;}
,isDescendantOf:function(t,u){return this.contains(u,t);}
,getCommonParent:function(v,w){if(v===w){return v;}
;if(qx.core.Environment.get(a)){while(v&&qx.dom.Node.isElement(v)){if(v.contains(w)){return v;}
;v=v.parentNode;}
;return null;}
else {var x={};var A=qx.core.ObjectRegistry;var z,y;while(v||w){if(v){z=A.toHashCode(v);if(x[z]){return x[z];}
;x[z]=v;v=v.parentNode;}
;if(w){y=A.toHashCode(w);if(x[y]){return x[y];}
;x[y]=w;w=w.parentNode;}
;}
;return null;}
;}
,getAncestors:function(B){return this._recursivelyCollect(B,d);}
,getChildElements:function(C){C=C.firstChild;if(!C){return [];}
;var D=this.getNextSiblings(C);if(C.nodeType===1){D.unshift(C);}
;return D;}
,getDescendants:function(E){return qx.lang.Array.fromCollection(E.getElementsByTagName(c));}
,getFirstDescendant:function(F){F=F.firstChild;while(F&&F.nodeType!=1){F=F.nextSibling;}
;return F;}
,getLastDescendant:function(G){G=G.lastChild;while(G&&G.nodeType!=1){G=G.previousSibling;}
;return G;}
,getPreviousSiblings:function(H){return this._recursivelyCollect(H,f);}
,getNextSiblings:function(I){return this._recursivelyCollect(I,e);}
,_recursivelyCollect:function(J,K){var L=[];while(J=J[K]){if(J.nodeType==1){L.push(J);}
;}
;return L;}
,getSiblings:function(M){return this.getPreviousSiblings(M).reverse().concat(this.getNextSiblings(M));}
,isEmpty:function(N){N=N.firstChild;while(N){if(N.nodeType===qx.dom.Node.ELEMENT||N.nodeType===qx.dom.Node.TEXT){return false;}
;N=N.nextSibling;}
;return true;}
,cleanWhitespace:function(O){var P=O.firstChild;while(P){var Q=P.nextSibling;if(P.nodeType==3&&!/\S/.test(P.nodeValue)){O.removeChild(P);}
;P=Q;}
;}
}});}
)();
(function(){var a="qx.event.handler.Capture";qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{capture:true,losecapture:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(b,c){}
,registerEvent:function(d,e,f){}
,unregisterEvent:function(g,h,i){}
},defer:function(j){qx.event.Registration.addHandler(j);}
});}
)();
(function(){var k="mousedown",j="qxDraggable",i="Escape",h="drag",g="Unsupported data type: ",f="drop",d="qxDroppable",c="qx.event.handler.DragDrop",b="This method must not be used outside the drop event listener!",a="!",H="droprequest",G="dragstart",F="dragchange",E="dragleave",D="dragover",C="left",B="Please use a droprequest listener to the drag source to fill the manager with data!",A="blur",z="mouseout",y="keydown",r="Control",s="Shift",p="mousemove",q="move",n="mouseover",o="Alt",l="keyup",m="mouseup",t="keypress",u="dragend",w="on",v="copy",x="alias";qx.Class.define(c,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(I){qx.core.Object.call(this);this.__dg=I;this.__cS=I.getWindow().document.documentElement;this.__dg.addListener(this.__cS,k,this._onMouseDown,this);this.__fl();}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{dragstart:1,dragend:1,dragover:1,dragleave:1,drop:1,drag:1,dragchange:1,droprequest:1},IGNORE_CAN_HANDLE:true},members:{__dg:null,__cS:null,__fb:null,__fc:null,__fd:null,__fe:null,__ff:null,__e:null,__fg:null,__fh:null,__fi:false,__fj:0,__fk:0,canHandleEvent:function(J,K){}
,registerEvent:function(L,M,N){}
,unregisterEvent:function(O,P,Q){}
,addType:function(R){this.__fd[R]=true;}
,addAction:function(S){this.__fe[S]=true;}
,supportsType:function(T){return !!this.__fd[T];}
,supportsAction:function(U){return !!this.__fe[U];}
,getData:function(V){if(!this.__fr||!this.__fb){throw new Error(b);}
;if(!this.__fd[V]){throw new Error(g+V+a);}
;if(!this.__e[V]){this.__fg=V;this.__dO(H,this.__fc,this.__fb,false);}
;if(!this.__e[V]){throw new Error(B);}
;return this.__e[V]||null;}
,getCurrentAction:function(){return this.__fh;}
,addData:function(W,X){this.__e[W]=X;}
,getCurrentType:function(){return this.__fg;}
,isSessionActive:function(){return this.__fi;}
,__fl:function(){this.__fd={};this.__fe={};this.__ff={};this.__e={};}
,__fm:function(){if(this.__fc==null){return;}
;var bb=this.__fe;var Y=this.__ff;var ba=null;if(this.__fr){if(Y.Shift&&Y.Control&&bb.alias){ba=x;}
else if(Y.Shift&&Y.Alt&&bb.copy){ba=v;}
else if(Y.Shift&&bb.move){ba=q;}
else if(Y.Alt&&bb.alias){ba=x;}
else if(Y.Control&&bb.copy){ba=v;}
else if(bb.move){ba=q;}
else if(bb.copy){ba=v;}
else if(bb.alias){ba=x;}
;;;;;;;}
;if(ba!=this.__fh){this.__fh=ba;this.__dO(F,this.__fc,this.__fb,false);}
;}
,__dO:function(bc,bd,be,bf,bg){var bi=qx.event.Registration;var bh=bi.createEvent(bc,qx.event.type.Drag,[bf,bg]);if(bd!==be){bh.setRelatedTarget(be);}
;return bi.dispatchEvent(bd,bh);}
,__fn:function(bj){while(bj&&bj.nodeType==1){if(bj.getAttribute(j)==w){return bj;}
;bj=bj.parentNode;}
;return null;}
,__fo:function(bk){while(bk&&bk.nodeType==1){if(bk.getAttribute(d)==w){return bk;}
;bk=bk.parentNode;}
;return null;}
,__fp:function(){this.__fc=null;this.__dg.removeListener(this.__cS,p,this._onMouseMove,this,true);this.__dg.removeListener(this.__cS,m,this._onMouseUp,this,true);qx.event.Registration.removeListener(window,A,this._onWindowBlur,this);this.__fl();}
,__fq:function(){if(this.__fi){this.__dg.removeListener(this.__cS,n,this._onMouseOver,this,true);this.__dg.removeListener(this.__cS,z,this._onMouseOut,this,true);this.__dg.removeListener(this.__cS,y,this._onKeyDown,this,true);this.__dg.removeListener(this.__cS,l,this._onKeyUp,this,true);this.__dg.removeListener(this.__cS,t,this._onKeyPress,this,true);this.__dO(u,this.__fc,this.__fb,false);this.__fi=false;}
;this.__fr=false;this.__fb=null;this.__fp();}
,__fr:false,_onWindowBlur:function(e){this.__fq();}
,_onKeyDown:function(e){var bl=e.getKeyIdentifier();switch(bl){case o:case r:case s:if(!this.__ff[bl]){this.__ff[bl]=true;this.__fm();}
;};}
,_onKeyUp:function(e){var bm=e.getKeyIdentifier();switch(bm){case o:case r:case s:if(this.__ff[bm]){this.__ff[bm]=false;this.__fm();}
;};}
,_onKeyPress:function(e){var bn=e.getKeyIdentifier();switch(bn){case i:this.__fq();};}
,_onMouseDown:function(e){if(this.__fi||e.getButton()!==C){return;}
;var bo=this.__fn(e.getTarget());if(bo){this.__fj=e.getDocumentLeft();this.__fk=e.getDocumentTop();this.__fc=bo;this.__dg.addListener(this.__cS,p,this._onMouseMove,this,true);this.__dg.addListener(this.__cS,m,this._onMouseUp,this,true);qx.event.Registration.addListener(window,A,this._onWindowBlur,this);}
;}
,_onMouseUp:function(e){if(this.__fr){this.__dO(f,this.__fb,this.__fc,false,e);}
;if(this.__fi){e.stopPropagation();}
;this.__fq();}
,_onMouseMove:function(e){if(this.__fi){if(!this.__dO(h,this.__fc,this.__fb,true,e)){this.__fq();}
;}
else {if(Math.abs(e.getDocumentLeft()-this.__fj)>3||Math.abs(e.getDocumentTop()-this.__fk)>3){if(this.__dO(G,this.__fc,this.__fb,true,e)){this.__fi=true;this.__dg.addListener(this.__cS,n,this._onMouseOver,this,true);this.__dg.addListener(this.__cS,z,this._onMouseOut,this,true);this.__dg.addListener(this.__cS,y,this._onKeyDown,this,true);this.__dg.addListener(this.__cS,l,this._onKeyUp,this,true);this.__dg.addListener(this.__cS,t,this._onKeyPress,this,true);var bp=this.__ff;bp.Control=e.isCtrlPressed();bp.Shift=e.isShiftPressed();bp.Alt=e.isAltPressed();this.__fm();}
else {this.__dO(u,this.__fc,this.__fb,false);this.__fp();}
;}
;}
;}
,_onMouseOver:function(e){var bq=e.getTarget();var br=this.__fo(bq);if(br&&br!=this.__fb){this.__fr=this.__dO(D,br,this.__fc,true,e);this.__fb=br;this.__fm();}
;}
,_onMouseOut:function(e){var bt=this.__fo(e.getTarget());var bs=this.__fo(e.getRelatedTarget());if(bt&&bt!==bs&&bt==this.__fb){this.__dO(E,this.__fb,bs,false,e);this.__fb=null;this.__fr=false;qx.event.Timer.once(this.__fm,this,0);}
;}
},destruct:function(){this.__fc=this.__fb=this.__dg=this.__cS=this.__fd=this.__fe=this.__ff=this.__e=null;}
,defer:function(bu){qx.event.Registration.addHandler(bu);}
});}
)();
(function(){var a="qx.event.type.Drag";qx.Class.define(a,{extend:qx.event.type.Event,members:{init:function(b,c){qx.event.type.Event.prototype.init.call(this,true,b);if(c){this._native=c.getNativeEvent()||null;this._originalTarget=c.getTarget()||null;}
else {this._native=null;this._originalTarget=null;}
;return this;}
,clone:function(d){var e=qx.event.type.Event.prototype.clone.call(this,d);e._native=this._native;return e;}
,getDocumentLeft:function(){if(this._native==null){return 0;}
;if(this._native.pageX!==undefined){return this._native.pageX;}
else {var f=qx.dom.Node.getWindow(this._native.srcElement);return this._native.clientX+qx.bom.Viewport.getScrollLeft(f);}
;}
,getDocumentTop:function(){if(this._native==null){return 0;}
;if(this._native.pageY!==undefined){return this._native.pageY;}
else {var g=qx.dom.Node.getWindow(this._native.srcElement);return this._native.clientY+qx.bom.Viewport.getScrollTop(g);}
;}
,getManager:function(){return qx.event.Registration.getManager(this.getTarget()).getHandler(qx.event.handler.DragDrop);}
,addType:function(h){this.getManager().addType(h);}
,addAction:function(i){this.getManager().addAction(i);}
,supportsType:function(j){return this.getManager().supportsType(j);}
,supportsAction:function(k){return this.getManager().supportsAction(k);}
,addData:function(l,m){this.getManager().addData(l,m);}
,getData:function(n){return this.getManager().getData(n);}
,getCurrentType:function(){return this.getManager().getCurrentType();}
,getCurrentAction:function(){return this.getManager().getCurrentAction();}
}});}
)();
(function(){var h="qx.event.Timer",g="_applyInterval",f="_applyEnabled",d="Boolean",c="qx.event.type.Event",b="Integer",a="interval";qx.Class.define(h,{extend:qx.core.Object,construct:function(i){qx.core.Object.call(this);this.setEnabled(false);if(i!=null){this.setInterval(i);}
;var self=this;this.__fs=function(){self._oninterval.call(self);}
;}
,events:{"interval":c},statics:{once:function(j,k,l){{}
;var m=new qx.event.Timer(l);m.__ft=j;m.addListener(a,function(e){m.stop();j.call(k,e);m.dispose();k=null;}
,k);m.start();return m;}
},properties:{enabled:{init:true,check:d,apply:f},interval:{check:b,init:1000,apply:g}},members:{__fu:null,__fs:null,_applyInterval:function(n,o){if(this.getEnabled()){this.restart();}
;}
,_applyEnabled:function(p,q){if(q){window.clearInterval(this.__fu);this.__fu=null;}
else if(p){this.__fu=window.setInterval(this.__fs,this.getInterval());}
;}
,start:function(){this.setEnabled(true);}
,startWith:function(r){this.setInterval(r);this.start();}
,stop:function(){this.setEnabled(false);}
,restart:function(){this.stop();this.start();}
,restartWith:function(s){this.stop();this.startWith(s);}
,_oninterval:qx.event.GlobalError.observeMethod(function(){if(this.$$disposed){return;}
;if(this.getEnabled()){this.fireEvent(a);}
;}
)},destruct:function(){if(this.__fu){window.clearInterval(this.__fu);}
;this.__fu=this.__fs=null;}
});}
)();
(function(){var c="qx.event.handler.Offline",b="offline",a="online";qx.Class.define(c,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(d){qx.core.Object.call(this);this.__dg=d;this.__cz=d.getWindow();this._initObserver();}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{online:true,offline:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{__dg:null,__cz:null,__dC:null,canHandleEvent:function(e,f){}
,registerEvent:function(g,h,i){}
,unregisterEvent:function(j,k,l){}
,_initObserver:function(){this.__dC=qx.lang.Function.listener(this._onNative,this);qx.bom.Event.addNativeListener(this.__cz,b,this.__dC);qx.bom.Event.addNativeListener(this.__cz,a,this.__dC);}
,_stopObserver:function(){qx.bom.Event.removeNativeListener(this.__cz,b,this.__dC);qx.bom.Event.removeNativeListener(this.__cz,a,this.__dC);}
,_onNative:qx.event.GlobalError.observeMethod(function(m){qx.event.Registration.fireEvent(this.__cz,m.type,qx.event.type.Event,[]);}
),isOnline:function(){return !!this.__cz.navigator.onLine;}
},destruct:function(){this.__dg=null;this._stopObserver();delete qx.event.handler.Appear.__instances[this.$$hash];}
,defer:function(n){qx.event.Registration.addHandler(n);}
});}
)();
(function(){var p="='",o="none",n="<INPUT TYPE='RADIO' NAME='RADIOTEST' VALUE='Second Choice'>",m="qx.bom.Element",k="The tag name is missing!",h="div",g="' ",f="></",d="<",c=" ",a=">",b="";qx.Class.define(m,{statics:{__fv:{"onload":true,"onpropertychange":true,"oninput":true,"onchange":true,"name":true,"type":true,"checked":true,"disabled":true},__fw:{},__fx:{},allowCreationWithMarkup:function(q){if(!q){q=window;}
;var r=q.location.href;if(qx.bom.Element.__fx[r]==undefined){try{q.document.createElement(n);qx.bom.Element.__fx[r]=true;}
catch(e){qx.bom.Element.__fx[r]=false;}
;}
;return qx.bom.Element.__fx[r];}
,getHelperElement:function(s){if(!s){s=window;}
;var u=s.location.href;if(!qx.bom.Element.__fw[u]){var t=qx.bom.Element.__fw[u]=s.document.createElement(h);t.style.display=o;s.document.body.appendChild(t);}
;return qx.bom.Element.__fw[u];}
,create:function(name,v,w){if(!w){w=window;}
;if(!name){throw new Error(k);}
;var y=this.__fv;var x=b;for(var A in v){if(y[A]){x+=A+p+v[A]+g;}
;}
;var B;if(x!=b){if(qx.bom.Element.allowCreationWithMarkup(w)){B=w.document.createElement(d+name+c+x+a);}
else {var z=qx.bom.Element.getHelperElement(w);z.innerHTML=d+name+c+x+f+name+a;B=z.firstChild;}
;}
else {B=w.document.createElement(name);}
;for(var A in v){if(!y[A]){qx.bom.element.Attribute.set(B,A,v[A]);}
;}
;return B;}
,empty:function(C){return C.innerHTML=b;}
,addListener:function(D,E,F,self,G){return qx.event.Registration.addListener(D,E,F,self,G);}
,removeListener:function(H,I,J,self,K){return qx.event.Registration.removeListener(H,I,J,self,K);}
,removeListenerById:function(L,M){return qx.event.Registration.removeListenerById(L,M);}
,hasListener:function(N,O,P){return qx.event.Registration.hasListener(N,O,P);}
,focus:function(Q){qx.event.Registration.getManager(Q).getHandler(qx.event.handler.Focus).focus(Q);}
,blur:function(R){qx.event.Registration.getManager(R).getHandler(qx.event.handler.Focus).blur(R);}
,activate:function(S){qx.event.Registration.getManager(S).getHandler(qx.event.handler.Focus).activate(S);}
,deactivate:function(T){qx.event.Registration.getManager(T).getHandler(qx.event.handler.Focus).deactivate(T);}
,capture:function(U,V){qx.event.Registration.getManager(U).getDispatcher(qx.event.dispatch.MouseCapture).activateCapture(U,V);}
,releaseCapture:function(W){qx.event.Registration.getManager(W).getDispatcher(qx.event.dispatch.MouseCapture).releaseCapture(W);}
,matchesSelector:function(X,Y){if(Y){return qx.bom.Selector.query(Y,X.parentNode).length>0;}
else {return false;}
;}
,clone:function(ba,bb){var i,l;var i,l;var be;if(bb||((false)&&!qx.xml.Document.isXmlDocument(ba))){var bi=qx.event.Registration.getManager(ba);var bc=qx.dom.Hierarchy.getDescendants(ba);bc.push(ba);}
;{}
;var be=ba.cloneNode(true);{}
;if(bb===true){var bl=qx.dom.Hierarchy.getDescendants(be);bl.push(be);var bd,bg,bk,bf;for(var i=0,bj=bc.length;i<bj;i++){bk=bc[i];bd=bi.serializeListeners(bk);if(bd.length>0){bg=bl[i];for(var j=0,bh=bd.length;j<bh;j++){bf=bd[j];bi.addListener(bg,bf.type,bf.handler,bf.self,bf.capture);}
;}
;}
;}
;return be;}
}});}
)();
(function(){var g="blur",f="focus",e="click",d="qx.event.dispatch.MouseCapture",c="capture",b="scroll",a="losecapture";qx.Class.define(d,{extend:qx.event.dispatch.AbstractBubbling,construct:function(h,i){qx.event.dispatch.AbstractBubbling.call(this,h);this.__cz=h.getWindow();this.__cB=i;h.addListener(this.__cz,g,this.releaseCapture,this);h.addListener(this.__cz,f,this.releaseCapture,this);h.addListener(this.__cz,b,this.releaseCapture,this);}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_FIRST},members:{__cB:null,__fy:null,__fz:true,__cz:null,_getParent:function(j){return j.parentNode;}
,canDispatchEvent:function(k,event,l){return !!(this.__fy&&this.__fA[l]);}
,dispatchEvent:function(m,event,n){if(n==e){event.stopPropagation();this.releaseCapture();return;}
;if(this.__fz||!qx.dom.Hierarchy.contains(this.__fy,m)){m=this.__fy;}
;qx.event.dispatch.AbstractBubbling.prototype.dispatchEvent.call(this,m,event,n);}
,__fA:{"mouseup":1,"mousedown":1,"click":1,"dblclick":1,"mousemove":1,"mouseout":1,"mouseover":1},activateCapture:function(o,p){var p=p!==false;if(this.__fy===o&&this.__fz==p){return;}
;if(this.__fy){this.releaseCapture();}
;this.nativeSetCapture(o,p);if(this.hasNativeCapture){var self=this;qx.bom.Event.addNativeListener(o,a,function(){qx.bom.Event.removeNativeListener(o,a,arguments.callee);self.releaseCapture();}
);}
;this.__fz=p;this.__fy=o;this.__cB.fireEvent(o,c,qx.event.type.Event,[true,false]);}
,getCaptureElement:function(){return this.__fy;}
,releaseCapture:function(){var q=this.__fy;if(!q){return;}
;this.__fy=null;this.__cB.fireEvent(q,a,qx.event.type.Event,[true,false]);this.nativeReleaseCapture(q);}
,hasNativeCapture:false,nativeSetCapture:qx.lang.Function.empty,nativeReleaseCapture:qx.lang.Function.empty},destruct:function(){this.__fy=this.__cz=this.__cB=null;}
,defer:function(r){qx.event.Registration.addDispatcher(r);}
});}
)();
(function(){var a="qx.event.handler.Window";qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(b){qx.core.Object.call(this);this._manager=b;this._window=b.getWindow();this._initWindowObserver();}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{error:1,load:1,beforeunload:1,unload:1,resize:1,scroll:1,beforeshutdown:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(c,d){}
,registerEvent:function(f,g,h){}
,unregisterEvent:function(i,j,k){}
,_initWindowObserver:function(){this._onNativeWrapper=qx.lang.Function.listener(this._onNative,this);var m=qx.event.handler.Window.SUPPORTED_TYPES;for(var l in m){qx.bom.Event.addNativeListener(this._window,l,this._onNativeWrapper);}
;}
,_stopWindowObserver:function(){var o=qx.event.handler.Window.SUPPORTED_TYPES;for(var n in o){qx.bom.Event.removeNativeListener(this._window,n,this._onNativeWrapper);}
;}
,_onNative:qx.event.GlobalError.observeMethod(function(e){if(this.isDisposed()){return;}
;var q=this._window;try{var t=q.document;}
catch(e){return;}
;var r=t.documentElement;var p=qx.bom.Event.getTarget(e);if(p==null||p===q||p===t||p===r){var event=qx.event.Registration.createEvent(e.type,qx.event.type.Native,[e,q]);qx.event.Registration.dispatchEvent(q,event);var s=event.getReturnValue();if(s!=null){e.returnValue=s;return s;}
;}
;}
)},destruct:function(){this._stopWindowObserver();this._manager=this._window=null;}
,defer:function(u){qx.event.Registration.addHandler(u);}
});}
)();
(function(){var q="text",p="file",o="+",n="'/>",k="CLASS",h="HTML",g="radio",f="script",d="className",c="TAG",bh="[test!='']:sizzle",bg="password",bf="htmlFor",be="submit",bd="<a href='#'></a>",bc="<a name='",bb="#",ba="qx.bom.Selector",Y="type",X="'] ",x="\\$&",y="parentNode",v="previousSibling",w="NAME",t="number",u="='$1']",r="reset",s='type',B="image",C=".TEST",K="<div class='test e'></div><div class='test'></div>",I="Syntax error, unrecognized expression: ",P="~",M="checkbox",T="[id='",R="hidden",E="__sizzle__",W="<p class='TEST'></p>",V="ID",U="body",D="object",G="button",H="[object Array]",J="href",L="e",N="\\",Q="div",S="*",z="id",A="string",F="undefined",O="";qx.Class.define(ba,{statics:{query:null,matches:null}});(function(){var bq=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,bx=0,bz=Object.prototype.toString,br=false,bB=true,bv=/\\/g,bk=/\W/;[0,0].sort(function(){bB=false;return 0;}
);var bu=function(bD,bE,bF,bG){bF=bF||[];bE=bE||document;var bP=bE;if(bE.nodeType!==1&&bE.nodeType!==9){return [];}
;if(!bD||typeof bD!==A){return bF;}
;var m,bJ,bH,bL,bN,bK,bQ,i,bR=true,bI=bu.isXML(bE),bM=[],bO=bD;do {bq.exec(O);m=bq.exec(bO);if(m){bO=m[3];bM.push(m[1]);if(m[2]){bL=m[3];break;}
;}
;}
while(m);if(bM.length>1&&bs.exec(bD)){if(bM.length===2&&bn.relative[bM[0]]){bJ=bm(bM[0]+bM[1],bE);}
else {bJ=bn.relative[bM[0]]?[bE]:bu(bM.shift(),bE);while(bM.length){bD=bM.shift();if(bn.relative[bD]){bD+=bM.shift();}
;bJ=bm(bD,bJ);}
;}
;}
else {if(!bG&&bM.length>1&&bE.nodeType===9&&!bI&&bn.match.ID.test(bM[0])&&!bn.match.ID.test(bM[bM.length-1])){bN=bu.find(bM.shift(),bE,bI);bE=bN.expr?bu.filter(bN.expr,bN.set)[0]:bN.set[0];}
;if(bE){bN=bG?{expr:bM.pop(),set:bj(bG)}:bu.find(bM.pop(),bM.length===1&&(bM[0]===P||bM[0]===o)&&bE.parentNode?bE.parentNode:bE,bI);bJ=bN.expr?bu.filter(bN.expr,bN.set):bN.set;if(bM.length>0){bH=bj(bJ);}
else {bR=false;}
;while(bM.length){bK=bM.pop();bQ=bK;if(!bn.relative[bK]){bK=O;}
else {bQ=bM.pop();}
;if(bQ==null){bQ=bE;}
;bn.relative[bK](bH,bQ,bI);}
;}
else {bH=bM=[];}
;}
;if(!bH){bH=bJ;}
;if(!bH){bu.error(bK||bD);}
;if(bz.call(bH)===H){if(!bR){bF.push.apply(bF,bH);}
else if(bE&&bE.nodeType===1){for(i=0;bH[i]!=null;i++){if(bH[i]&&(bH[i]===true||bH[i].nodeType===1&&bu.contains(bE,bH[i]))){bF.push(bJ[i]);}
;}
;}
else {for(i=0;bH[i]!=null;i++){if(bH[i]&&bH[i].nodeType===1){bF.push(bJ[i]);}
;}
;}
;}
else {bj(bH,bF);}
;if(bL){bu(bL,bP,bF,bG);bu.uniqueSort(bF);}
;return bF;}
;bu.uniqueSort=function(bS){if(bw){br=bB;bS.sort(bw);if(br){for(var i=1;i<bS.length;i++){if(bS[i]===bS[i-1]){bS.splice(i--,1);}
;}
;}
;}
;return bS;}
;bu.matches=function(bT,bU){return bu(bT,null,null,bU);}
;bu.matchesSelector=function(bV,bW){return bu(bW,null,null,[bV]).length>0;}
;bu.find=function(bX,bY,ca){var cb;if(!bX){return [];}
;for(var i=0,l=bn.order.length;i<l;i++){var cd,cc=bn.order[i];if((cd=bn.leftMatch[cc].exec(bX))){var ce=cd[1];cd.splice(1,1);if(ce.substr(ce.length-1)!==N){cd[1]=(cd[1]||O).replace(bv,O);cb=bn.find[cc](cd,bY,ca);if(cb!=null){bX=bX.replace(bn.match[cc],O);break;}
;}
;}
;}
;if(!cb){cb=typeof bY.getElementsByTagName!==F?bY.getElementsByTagName(S):[];}
;return {set:cb,expr:bX};}
;bu.filter=function(cf,cg,ch,ci){var ct,cs,cj=cf,co=[],ck=cg,cl=cg&&cg[0]&&bu.isXML(cg[0]);while(cf&&cg.length){for(var cr in bn.filter){if((ct=bn.leftMatch[cr].exec(cf))!=null&&ct[2]){var cq,cn,cm=bn.filter[cr],cu=ct[1];cs=false;ct.splice(1,1);if(cu.substr(cu.length-1)===N){continue;}
;if(ck===co){co=[];}
;if(bn.preFilter[cr]){ct=bn.preFilter[cr](ct,ck,ch,co,ci,cl);if(!ct){cs=cq=true;}
else if(ct===true){continue;}
;}
;if(ct){for(var i=0;(cn=ck[i])!=null;i++){if(cn){cq=cm(cn,ct,i,ck);var cp=ci^!!cq;if(ch&&cq!=null){if(cp){cs=true;}
else {ck[i]=false;}
;}
else if(cp){co.push(cn);cs=true;}
;}
;}
;}
;if(cq!==undefined){if(!ch){ck=co;}
;cf=cf.replace(bn.match[cr],O);if(!cs){return [];}
;break;}
;}
;}
;if(cf===cj){if(cs==null){bu.error(cf);}
else {break;}
;}
;cj=cf;}
;return ck;}
;bu.error=function(cv){throw I+cv;}
;var bn=bu.selectors={order:[V,w,c],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":d,"for":bf},attrHandle:{href:function(cw){return cw.getAttribute(J);}
,type:function(cx){return cx.getAttribute(Y);}
},relative:{"+":function(cy,cz){var cA=typeof cz===A,cC=cA&&!bk.test(cz),cD=cA&&!cC;if(cC){cz=cz.toLowerCase();}
;for(var i=0,l=cy.length,cB;i<l;i++){if((cB=cy[i])){while((cB=cB.previousSibling)&&cB.nodeType!==1){}
;cy[i]=cD||cB&&cB.nodeName.toLowerCase()===cz?cB||false:cB===cz;}
;}
;if(cD){bu.filter(cz,cy,true);}
;}
,">":function(cE,cF){var cH,cG=typeof cF===A,i=0,l=cE.length;if(cG&&!bk.test(cF)){cF=cF.toLowerCase();for(;i<l;i++){cH=cE[i];if(cH){var parent=cH.parentNode;cE[i]=parent.nodeName.toLowerCase()===cF?parent:false;}
;}
;}
else {for(;i<l;i++){cH=cE[i];if(cH){cE[i]=cG?cH.parentNode:cH.parentNode===cF;}
;}
;if(cG){bu.filter(cF,cE,true);}
;}
;}
,"":function(cI,cJ,cK){var cN,cL=bx++,cM=bA;if(typeof cJ===A&&!bk.test(cJ)){cJ=cJ.toLowerCase();cN=cJ;cM=bC;}
;cM(y,cJ,cL,cI,cN,cK);}
,"~":function(cO,cP,cQ){var cT,cR=bx++,cS=bA;if(typeof cP===A&&!bk.test(cP)){cP=cP.toLowerCase();cT=cP;cS=bC;}
;cS(v,cP,cR,cO,cT,cQ);}
},find:{ID:function(cU,cV,cW){if(typeof cV.getElementById!=="undefined"&&!cW){var m=cV.getElementById(cU[1]);return m&&m.parentNode?[m]:[];}
;}
,NAME:function(cX,cY){if(typeof cY.getElementsByName!=="undefined"){var db=[],da=cY.getElementsByName(cX[1]);for(var i=0,l=da.length;i<l;i++){if(da[i].getAttribute("name")===cX[1]){db.push(da[i]);}
;}
;return db.length===0?null:db;}
;}
,TAG:function(dc,dd){if(typeof dd.getElementsByTagName!=="undefined"){return dd.getElementsByTagName(dc[1]);}
;}
},preFilter:{CLASS:function(de,df,dg,dh,di,dj){de=" "+de[1].replace(bv,"")+" ";if(dj){return de;}
;for(var i=0,dk;(dk=df[i])!=null;i++){if(dk){if(di^(dk.className&&(" "+dk.className+" ").replace(/[\t\n\r]/g," ").indexOf(de)>=0)){if(!dg){dh.push(dk);}
;}
else if(dg){df[i]=false;}
;}
;}
;return false;}
,ID:function(dl){return dl[1].replace(bv,"");}
,TAG:function(dm,dn){return dm[1].replace(bv,"").toLowerCase();}
,CHILD:function(dp){if(dp[1]==="nth"){if(!dp[2]){bu.error(dp[0]);}
;dp[2]=dp[2].replace(/^\+|\s*/g,'');var dq=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(dp[2]==="even"&&"2n"||dp[2]==="odd"&&"2n+1"||!/\D/.test(dp[2])&&"0n+"+dp[2]||dp[2]);dp[2]=(dq[1]+(dq[2]||1))-0;dp[3]=dq[3]-0;}
else if(dp[2]){bu.error(dp[0]);}
;dp[0]=bx++;return dp;}
,ATTR:function(dr,ds,dt,du,dv,dw){var name=dr[1]=dr[1].replace(bv,"");if(!dw&&bn.attrMap[name]){dr[1]=bn.attrMap[name];}
;dr[4]=(dr[4]||dr[5]||"").replace(bv,"");if(dr[2]==="~="){dr[4]=" "+dr[4]+" ";}
;return dr;}
,PSEUDO:function(dx,dy,dz,dA,dB){if(dx[1]==="not"){if((bq.exec(dx[3])||"").length>1||/^\w/.test(dx[3])){dx[3]=bu(dx[3],null,null,dy);}
else {var dC=bu.filter(dx[3],dy,dz,true^dB);if(!dz){dA.push.apply(dA,dC);}
;return false;}
;}
else if(bn.match.POS.test(dx[0])||bn.match.CHILD.test(dx[0])){return true;}
;return dx;}
,POS:function(dD){dD.unshift(true);return dD;}
},filters:{enabled:function(dE){return dE.disabled===false&&dE.type!==R;}
,disabled:function(dF){return dF.disabled===true;}
,checked:function(dG){return dG.checked===true;}
,selected:function(dH){if(dH.parentNode){dH.parentNode.selectedIndex;}
;return dH.selected===true;}
,parent:function(dI){return !!dI.firstChild;}
,empty:function(dJ){return !dJ.firstChild;}
,has:function(dK,i,dL){return !!bu(dL[3],dK).length;}
,header:function(dM){return (/h\d/i).test(dM.nodeName);}
,text:function(dN){return q===dN.getAttribute(s);}
,radio:function(dO){return g===dO.type;}
,checkbox:function(dP){return M===dP.type;}
,file:function(dQ){return p===dQ.type;}
,password:function(dR){return bg===dR.type;}
,submit:function(dS){return be===dS.type;}
,image:function(dT){return B===dT.type;}
,reset:function(dU){return r===dU.type;}
,button:function(dV){return G===dV.type||dV.nodeName.toLowerCase()===G;}
,input:function(dW){return (/input|select|textarea|button/i).test(dW.nodeName);}
},setFilters:{first:function(dX,i){return i===0;}
,last:function(dY,i,ea,eb){return i===eb.length-1;}
,even:function(ec,i){return i%2===0;}
,odd:function(ed,i){return i%2===1;}
,lt:function(ee,i,ef){return i<ef[3]-0;}
,gt:function(eg,i,eh){return i>eh[3]-0;}
,nth:function(ei,i,ej){return ej[3]-0===i;}
,eq:function(ek,i,el){return el[3]-0===i;}
},filter:{PSEUDO:function(em,en,i,eo){var name=en[1],ep=bn.filters[name];if(ep){return ep(em,i,en,eo);}
else if(name==="contains"){return (em.textContent||em.innerText||bu.getText([em])||"").indexOf(en[3])>=0;}
else if(name==="not"){var eq=en[3];for(var j=0,l=eq.length;j<l;j++){if(eq[j]===em){return false;}
;}
;return true;}
else {bu.error(name);}
;;}
,CHILD:function(er,es){var ey=es[1],et=er;switch(ey){case "only":case "first":while((et=et.previousSibling)){if(et.nodeType===1){return false;}
;}
;if(ey==="first"){return true;}
;et=er;case "last":while((et=et.nextSibling)){if(et.nodeType===1){return false;}
;}
;return true;case "nth":var ez=es[2],ev=es[3];if(ez===1&&ev===0){return true;}
;var ex=es[0],parent=er.parentNode;if(parent&&(parent.sizcache!==ex||!er.nodeIndex)){var eu=0;for(et=parent.firstChild;et;et=et.nextSibling){if(et.nodeType===1){et.nodeIndex=++eu;}
;}
;parent.sizcache=ex;}
;var ew=er.nodeIndex-ev;if(ez===0){return ew===0;}
else {return (ew%ez===0&&ew/ez>=0);}
;};}
,ID:function(eA,eB){return eA.nodeType===1&&eA.getAttribute("id")===eB;}
,TAG:function(eC,eD){return (eD==="*"&&eC.nodeType===1)||eC.nodeName.toLowerCase()===eD;}
,CLASS:function(eE,eF){return (" "+(eE.className||eE.getAttribute("class"))+" ").indexOf(eF)>-1;}
,ATTR:function(eG,eH){var name=eH[1],eL=bn.attrHandle[name]?bn.attrHandle[name](eG):eG[name]!=null?eG[name]:eG.getAttribute(name),eK=eL+"",eJ=eH[2],eI=eH[4];return eL==null?eJ==="!=":eJ==="="?eK===eI:eJ==="*="?eK.indexOf(eI)>=0:eJ==="~="?(" "+eK+" ").indexOf(eI)>=0:!eI?eK&&eL!==false:eJ==="!="?eK!==eI:eJ==="^="?eK.indexOf(eI)===0:eJ==="$="?eK.substr(eK.length-eI.length)===eI:eJ==="|="?eK===eI||eK.substr(0,eI.length+1)===eI+"-":false;}
,POS:function(eM,eN,i,eO){var name=eN[2],eP=bn.setFilters[name];if(eP){return eP(eM,i,eN,eO);}
;}
}};var bs=bn.match.POS,bi=function(eQ,eR){return N+(eR-0+1);}
;for(var by in bn.match){bn.match[by]=new RegExp(bn.match[by].source+(/(?![^\[]*\])(?![^\(]*\))/.source));bn.leftMatch[by]=new RegExp(/(^(?:.|\r|\n)*?)/.source+bn.match[by].source.replace(/\\(\d+)/g,bi));}
;var bj=function(eS,eT){eS=Array.prototype.slice.call(eS,0);if(eT){eT.push.apply(eT,eS);return eT;}
;return eS;}
;try{Array.prototype.slice.call(document.documentElement.childNodes,0)[0].nodeType;}
catch(e){bj=function(eU,eV){var i=0,eW=eV||[];if(bz.call(eU)===H){Array.prototype.push.apply(eW,eU);}
else {if(typeof eU.length===t){for(var l=eU.length;i<l;i++){eW.push(eU[i]);}
;}
else {for(;eU[i];i++){eW.push(eU[i]);}
;}
;}
;return eW;}
;}
;var bw,bo;if(document.documentElement.compareDocumentPosition){bw=function(a,b){if(a===b){br=true;return 0;}
;if(!a.compareDocumentPosition||!b.compareDocumentPosition){return a.compareDocumentPosition?-1:1;}
;return a.compareDocumentPosition(b)&4?-1:1;}
;}
else {bw=function(a,b){var fc,fa,fd=[],fe=[],eY=a.parentNode,fb=b.parentNode,eX=eY;if(a===b){br=true;return 0;}
else if(eY===fb){return bo(a,b);}
else if(!eY){return -1;}
else if(!fb){return 1;}
;;;while(eX){fd.unshift(eX);eX=eX.parentNode;}
;eX=fb;while(eX){fe.unshift(eX);eX=eX.parentNode;}
;fc=fd.length;fa=fe.length;for(var i=0;i<fc&&i<fa;i++){if(fd[i]!==fe[i]){return bo(fd[i],fe[i]);}
;}
;return i===fc?bo(a,fe[i],-1):bo(fd[i],b,1);}
;bo=function(a,b,ff){if(a===b){return ff;}
;var fg=a.nextSibling;while(fg){if(fg===b){return -1;}
;fg=fg.nextSibling;}
;return 1;}
;}
;bu.getText=function(fh){var fj=O,fi;for(var i=0;fh[i];i++){fi=fh[i];if(fi.nodeType===3||fi.nodeType===4){fj+=fi.nodeValue;}
else if(fi.nodeType!==8){fj+=bu.getText(fi.childNodes);}
;}
;return fj;}
;(function(){var fm=document.createElement(Q),fl=f+(new Date()).getTime(),fk=document.documentElement;fm.innerHTML=bc+fl+n;fk.insertBefore(fm,fk.firstChild);if(document.getElementById(fl)){bn.find.ID=function(fn,fo,fp){if(typeof fo.getElementById!==F&&!fp){var m=fo.getElementById(fn[1]);return m?m.id===fn[1]||typeof m.getAttributeNode!==F&&m.getAttributeNode(z).nodeValue===fn[1]?[m]:undefined:[];}
;}
;bn.filter.ID=function(fq,fr){var fs=typeof fq.getAttributeNode!==F&&fq.getAttributeNode(z);return fq.nodeType===1&&fs&&fs.nodeValue===fr;}
;}
;fk.removeChild(fm);fk=fm=null;}
)();(function(){var ft=document.createElement(Q);ft.appendChild(document.createComment(O));if(ft.getElementsByTagName(S).length>0){bn.find.TAG=function(fu,fv){var fx=fv.getElementsByTagName(fu[1]);if(fu[1]===S){var fw=[];for(var i=0;fx[i];i++){if(fx[i].nodeType===1){fw.push(fx[i]);}
;}
;fx=fw;}
;return fx;}
;}
;ft.innerHTML=bd;if(ft.firstChild&&typeof ft.firstChild.getAttribute!==F&&ft.firstChild.getAttribute(J)!==bb){bn.attrHandle.href=function(fy){return fy.getAttribute(J,2);}
;}
;ft=null;}
)();if(document.querySelectorAll){(function(){var fA=bu,fz=document.createElement(Q),fB=E;fz.innerHTML=W;if(fz.querySelectorAll&&fz.querySelectorAll(C).length===0){return;}
;bu=function(fD,fE,fF,fG){fE=fE||document;if(!fG&&!bu.isXML(fE)){var fL=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(fD);if(fL&&(fE.nodeType===1||fE.nodeType===9)){if(fL[1]){return bj(fE.getElementsByTagName(fD),fF);}
else if(fL[2]&&bn.find.CLASS&&fE.getElementsByClassName){return bj(fE.getElementsByClassName(fL[2]),fF);}
;}
;if(fE.nodeType===9){if(fD===U&&fE.body){return bj([fE.body],fF);}
else if(fL&&fL[3]){var fJ=fE.getElementById(fL[3]);if(fJ&&fJ.parentNode){if(fJ.id===fL[3]){return bj([fJ],fF);}
;}
else {return bj([],fF);}
;}
;try{return bj(fE.querySelectorAll(fD),fF);}
catch(fO){}
;}
else if(fE.nodeType===1&&fE.nodeName.toLowerCase()!==D){var fN=fE,fI=fE.getAttribute(z),fK=fI||fB,fH=fE.parentNode,fM=/^\s*[+~]/.test(fD);if(!fI){fE.setAttribute(z,fK);}
else {fK=fK.replace(/'/g,x);}
;if(fM&&fH){fE=fE.parentNode;}
;try{if(!fM||fH){return bj(fE.querySelectorAll(T+fK+X+fD),fF);}
;}
catch(fP){}
finally{if(!fI){fN.removeAttribute(z);}
;}
;}
;}
;return fA(fD,fE,fF,fG);}
;for(var fC in fA){bu[fC]=fA[fC];}
;fz=null;}
)();}
;(function(){var fS=document.documentElement,fQ=fS.matchesSelector||fS.mozMatchesSelector||fS.webkitMatchesSelector||fS.msMatchesSelector,fR=false;try{fQ.call(document.documentElement,bh);}
catch(fT){fR=true;}
;if(fQ){bu.matchesSelector=function(fU,fV){fV=fV.replace(/\=\s*([^'"\]]*)\s*\]/g,u);if(!bu.isXML(fU)){try{if(fR||!bn.match.PSEUDO.test(fV)&&!/!=/.test(fV)){return fQ.call(fU,fV);}
;}
catch(e){}
;}
;return bu(fV,null,null,[fU]).length>0;}
;}
;}
)();(function(){var fW=document.createElement(Q);fW.innerHTML=K;if(!fW.getElementsByClassName||fW.getElementsByClassName(L).length===0){return;}
;fW.lastChild.className=L;if(fW.getElementsByClassName(L).length===1){return;}
;bn.order.splice(1,0,k);bn.find.CLASS=function(fX,fY,ga){if(typeof fY.getElementsByClassName!==F&&!ga){return fY.getElementsByClassName(fX[1]);}
;}
;fW=null;}
)();function bC(gb,gc,gd,ge,gf,gg){for(var i=0,l=ge.length;i<l;i++){var gi=ge[i];if(gi){var gh=false;gi=gi[gb];while(gi){if(gi.sizcache===gd){gh=ge[gi.sizset];break;}
;if(gi.nodeType===1&&!gg){gi.sizcache=gd;gi.sizset=i;}
;if(gi.nodeName.toLowerCase()===gc){gh=gi;break;}
;gi=gi[gb];}
;ge[i]=gh;}
;}
;}
;function bA(gj,gk,gl,gm,gn,go){for(var i=0,l=gm.length;i<l;i++){var gq=gm[i];if(gq){var gp=false;gq=gq[gj];while(gq){if(gq.sizcache===gl){gp=gm[gq.sizset];break;}
;if(gq.nodeType===1){if(!go){gq.sizcache=gl;gq.sizset=i;}
;if(typeof gk!==A){if(gq===gk){gp=true;break;}
;}
else if(bu.filter(gk,[gq]).length>0){gp=gq;break;}
;}
;gq=gq[gj];}
;gm[i]=gp;}
;}
;}
;if(document.documentElement.contains){bu.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):true);}
;}
else if(document.documentElement.compareDocumentPosition){bu.contains=function(a,b){return !!(a.compareDocumentPosition(b)&16);}
;}
else {bu.contains=function(){return false;}
;}
;bu.isXML=function(gr){var gs=(gr?gr.ownerDocument||gr:0).documentElement;return gs?gs.nodeName!==h:false;}
;var bm=function(gt,gu){var gy,gw=[],gv=O,gx=gu.nodeType?[gu]:gu;while((gy=bn.match.PSEUDO.exec(gt))){gv+=gy[0];gt=gt.replace(bn.match.PSEUDO,O);}
;gt=bn.relative[gt]?gt+S:gt;for(var i=0,l=gx.length;i<l;i++){bu(gt,gx[i],gw);}
;return bu.filter(gv,gw);}
;var bt=qx.bom.Selector;bt.query=function(gz,gA){return bu(gz,gA);}
;bt.matches=function(gB,gC){return bu(gB,null,null,gC);}
;}
)();}
)();
(function(){var l="Silverlight",k="plugin.silverlight.version",h="function",g="QuickTimeCheckObject.QuickTimeCheck.1",f="Adobe Acrobat",e="plugin.windowsmedia",d="QuickTime",c="plugin.silverlight",b="qx.bom.client.Plugin",a="plugin.divx",H="Chrome PDF Viewer",G="Windows Media",F="plugin.gears",E="plugin.quicktime",D="plugin.windowsmedia.version",C="DivX Web Player",B="AgControl.AgControl",A="plugin.pdf",z="plugin.pdf.version",y="plugin.divx.version",s="WMPlayer.OCX.7",t="AcroPDF.PDF",q="plugin.activex",r="plugin.quicktime.version",o="npdivx.DivXBrowserPlugin.1",p="pdf",m="wmv",n="divx",u="quicktime",v="mshtml",x="silverlight",w="";qx.Bootstrap.define(b,{statics:{getGears:function(){return !!(window.google&&window.google.gears);}
,getActiveX:function(){return (typeof window.ActiveXObject===h);}
,__fB:{quicktime:{plugin:[d],control:g},wmv:{plugin:[G],control:s},divx:{plugin:[C],control:o},silverlight:{plugin:[l],control:B},pdf:{plugin:[H,f],control:t}},getQuicktimeVersion:function(){var I=qx.bom.client.Plugin.__fB[u];return qx.bom.client.Plugin.__fC(I.control,I.plugin);}
,getWindowsMediaVersion:function(){var J=qx.bom.client.Plugin.__fB[m];return qx.bom.client.Plugin.__fC(J.control,J.plugin);}
,getDivXVersion:function(){var K=qx.bom.client.Plugin.__fB[n];return qx.bom.client.Plugin.__fC(K.control,K.plugin);}
,getSilverlightVersion:function(){var L=qx.bom.client.Plugin.__fB[x];return qx.bom.client.Plugin.__fC(L.control,L.plugin);}
,getPdfVersion:function(){var M=qx.bom.client.Plugin.__fB[p];return qx.bom.client.Plugin.__fC(M.control,M.plugin);}
,getQuicktime:function(){var N=qx.bom.client.Plugin.__fB[u];return qx.bom.client.Plugin.__fD(N.control,N.plugin);}
,getWindowsMedia:function(){var O=qx.bom.client.Plugin.__fB[m];return qx.bom.client.Plugin.__fD(O.control,O.plugin);}
,getDivX:function(){var P=qx.bom.client.Plugin.__fB[n];return qx.bom.client.Plugin.__fD(P.control,P.plugin);}
,getSilverlight:function(){var Q=qx.bom.client.Plugin.__fB[x];return qx.bom.client.Plugin.__fD(Q.control,Q.plugin);}
,getPdf:function(){var R=qx.bom.client.Plugin.__fB[p];return qx.bom.client.Plugin.__fD(R.control,R.plugin);}
,__fC:function(S,T){var U=qx.bom.client.Plugin.__fD(S,T);if(!U){return w;}
;if(qx.bom.client.Engine.getName()==v){var V=new ActiveXObject(S);try{var Y=V.versionInfo;if(Y!=undefined){return Y;}
;Y=V.version;if(Y!=undefined){return Y;}
;Y=V.settings.version;if(Y!=undefined){return Y;}
;}
catch(bb){return w;}
;return w;}
else {var ba=navigator.plugins;var X=/([0-9]\.[0-9])/g;for(var i=0;i<ba.length;i++){var W=ba[i];for(var j=0;j<T.length;j++){if(W.name.indexOf(T[j])!==-1){if(X.test(W.name)||X.test(W.description)){return RegExp.$1;}
;}
;}
;}
;return w;}
;}
,__fD:function(bc,bd){if(qx.bom.client.Engine.getName()==v){var be=window.ActiveXObject;if(!be){return false;}
;try{new ActiveXObject(bc);}
catch(bg){return false;}
;return true;}
else {var bf=navigator.plugins;if(!bf){return false;}
;var name;for(var i=0;i<bf.length;i++){name=bf[i].name;for(var j=0;j<bd.length;j++){if(name.indexOf(bd[j])!==-1){return true;}
;}
;}
;return false;}
;}
},defer:function(bh){qx.core.Environment.add(F,bh.getGears);qx.core.Environment.add(E,bh.getQuicktime);qx.core.Environment.add(r,bh.getQuicktimeVersion);qx.core.Environment.add(e,bh.getWindowsMedia);qx.core.Environment.add(D,bh.getWindowsMediaVersion);qx.core.Environment.add(a,bh.getDivX);qx.core.Environment.add(y,bh.getDivXVersion);qx.core.Environment.add(c,bh.getSilverlight);qx.core.Environment.add(k,bh.getSilverlightVersion);qx.core.Environment.add(A,bh.getPdf);qx.core.Environment.add(z,bh.getPdfVersion);qx.core.Environment.add(q,bh.getActiveX);}
});}
)();
(function(){var t='<\?xml version="1.0" encoding="utf-8"?>\n<',s="qx.xml.Document",r=" />",q="xml.domparser",p="SelectionLanguage",o="'",n="MSXML2.XMLHTTP.3.0",m="MSXML2.XMLHTTP.6.0",k="xml.implementation",j=" xmlns='",c="text/xml",h="XPath",f="MSXML2.DOMDocument.6.0",b="HTML",a="MSXML2.DOMDocument.3.0",e="",d="No XML implementation available!",g="plugin.activex";qx.Class.define(s,{statics:{DOMDOC:null,XMLHTTP:null,isXmlDocument:function(u){if(u.nodeType===9){return u.documentElement.nodeName!==b;}
else if(u.ownerDocument){return this.isXmlDocument(u.ownerDocument);}
else {return false;}
;}
,create:function(v,w){if(qx.core.Environment.get(g)){var x=new ActiveXObject(this.DOMDOC);if(this.DOMDOC==a){x.setProperty(p,h);}
;if(w){var y=t;y+=w;if(v){y+=j+v+o;}
;y+=r;x.loadXML(y);}
;return x;}
;if(qx.core.Environment.get(k)){return document.implementation.createDocument(v||e,w||e,null);}
;throw new Error(d);}
,fromString:function(z){if(qx.core.Environment.get(g)){var B=qx.xml.Document.create();B.loadXML(z);return B;}
;if(qx.core.Environment.get(q)){var A=new DOMParser();return A.parseFromString(z,c);}
;throw new Error(d);}
},defer:function(C){if(qx.core.Environment.get(g)){var D=[f,a];var E=[m,n];for(var i=0,l=D.length;i<l;i++){try{new ActiveXObject(D[i]);new ActiveXObject(E[i]);}
catch(F){continue;}
;C.DOMDOC=D[i];C.XMLHTTP=E[i];break;}
;}
;}
});}
)();
(function(){var s="xml.implementation",r="xml.attributens",q="xml.selectnodes",p="xml.getqualifieditem",o="SelectionLanguage",n="xml.getelementsbytagnamens",m="qx.bom.client.Xml",l="xml.domproperties",k="xml.selectsinglenode",j="1.0",d="xml.createnode",i="xml.domparser",g="getProperty",c="XML",b="string",f="xml.createelementns",e="<a></a>",h="function",a="undefined";qx.Bootstrap.define(m,{statics:{getImplementation:function(){return document.implementation&&document.implementation.hasFeature&&document.implementation.hasFeature(c,j);}
,getDomParser:function(){return typeof window.DOMParser!==a;}
,getSelectSingleNode:function(){return typeof qx.xml.Document.create().selectSingleNode!==a;}
,getSelectNodes:function(){return typeof qx.xml.Document.create().selectNodes!==a;}
,getElementsByTagNameNS:function(){return typeof qx.xml.Document.create().getElementsByTagNameNS!==a;}
,getDomProperties:function(){var t=qx.xml.Document.create();return (g in t&&typeof t.getProperty(o)===b);}
,getAttributeNS:function(){var u=qx.xml.Document.fromString(e).documentElement;return typeof u.getAttributeNS===h&&typeof u.setAttributeNS===h;}
,getCreateElementNS:function(){return typeof qx.xml.Document.create().createElementNS===h;}
,getCreateNode:function(){return typeof qx.xml.Document.create().createNode!==a;}
,getQualifiedItem:function(){var v=qx.xml.Document.fromString(e).documentElement;return typeof v.attributes.getQualifiedItem!==a;}
},defer:function(w){qx.core.Environment.add(s,w.getImplementation);qx.core.Environment.add(i,w.getDomParser);qx.core.Environment.add(k,w.getSelectSingleNode);qx.core.Environment.add(q,w.getSelectNodes);qx.core.Environment.add(n,w.getElementsByTagNameNS);qx.core.Environment.add(l,w.getDomProperties);qx.core.Environment.add(r,w.getAttributeNS);qx.core.Environment.add(f,w.getCreateElementNS);qx.core.Environment.add(d,w.getCreateNode);qx.core.Environment.add(p,w.getQualifiedItem);}
});}
)();
(function(){var d="qx.bom.Style",c="string",b="",a="-";qx.Bootstrap.define(d,{statics:{VENDOR_PREFIXES:["Webkit","Moz","O","ms","Khtml"],getPropertyName:function(e){var f=document.documentElement.style;if(f[e]!==undefined){return e;}
;for(var i=0,l=this.VENDOR_PREFIXES.length;i<l;i++){var g=this.VENDOR_PREFIXES[i]+qx.lang.String.firstUp(e);if(f[g]!==undefined){return g;}
;}
;return null;}
,getAppliedStyle:function(h,j,k,m){var n=(m!==false)?[null].concat(this.VENDOR_PREFIXES):[null];for(var i=0,l=n.length;i<l;i++){var o=n[i]?a+n[i].toLowerCase()+a+k:k;try{h.style[j]=o;if(typeof h.style[j]==c&&h.style[j]!==b){return o;}
;}
catch(p){}
;}
;return null;}
}});}
)();
(function(){var m="css.float",k="css.borderimage.standardsyntax",j="borderRadius",h="boxSizing",g='m11',f="progid:DXImageTransform.Microsoft.gradient(",e="content",d="css.inlineblock",c="css.gradient.filter",b="css.appearance",bn="css.gradient.radial",bm="input",bl="borderImage",bk="userSelect",bj="css.overflowxy",bi="styleFloat",bh="css.textShadow.filter",bg="css.usermodify",bf="css.boxsizing",be='url("foo.png") 4 4 4 4 fill stretch',t="css.boxmodel",u="qx.bom.client.Css",r="appearance",s="placeholder",p="css.textShadow",q="css.boxshadow",n="css.gradient.legacywebkit",o="css.borderradius",z="linear-gradient(0deg, #fff, #000)",A="textShadow",J="css.borderimage",G="rgba(1, 2, 3, 0.5)",R="css.opacity",M="radial-gradient(0px 0px, cover, red 50%, blue 100%)",ba="rgba",W='url("foo.png") 4 4 4 4 stretch',C="css.gradient.linear",bd="css.userselect",bc="startColorStr=#550000FF, endColorStr=#55FFFF00)",bb="-webkit-gradient(linear,0% 0%,100% 100%,from(white), to(red))",B="mshtml",E="css.rgba",F="4 fill",I='WebKitCSSMatrix',K="red 1px 1px 3px",N="none",T="progid:DXImageTransform.Microsoft.Shadow(color=#666666,direction=45);",Y="css.placeholder",v="css.userselect.none",w="css.textoverflow",D="textOverflow",Q="userModify",P="boxShadow",O="cssFloat",V="border",U="color",L="span",S="string",a="-moz-none",X="backgroundImage",x="inline-block",y="-moz-inline-box",H="div";qx.Bootstrap.define(u,{statics:{__fE:null,getBoxModel:function(){var content=qx.bom.client.Engine.getName()!==B||!qx.bom.client.Browser.getQuirksMode();return content?e:V;}
,getTextOverflow:function(){return qx.bom.Style.getPropertyName(D);}
,getPlaceholder:function(){var i=document.createElement(bm);return s in i;}
,getAppearance:function(){return qx.bom.Style.getPropertyName(r);}
,getBorderRadius:function(){return qx.bom.Style.getPropertyName(j);}
,getBoxShadow:function(){return qx.bom.Style.getPropertyName(P);}
,getBorderImage:function(){return qx.bom.Style.getPropertyName(bl);}
,getBorderImageSyntax:function(){var bq=qx.bom.client.Css.getBorderImage();if(!bq){return null;}
;var bp=[{standard:true,syntax:be,regEx:/foo\.png.*?4.*?fill.*?stretch/},{standard:false,syntax:W,regEx:/foo\.png.*?4 4 4 4 stretch/}];for(var i=0,l=bp.length;i<l;i++){var bo=document.createElement(H);bo.style[bq]=bp[i].syntax;if(bp[i].regEx.exec(bo.style[bq])||bo.style.borderImageSlice&&bo.style.borderImageSlice==F){return bp[i].standard;}
;}
;return null;}
,getUserSelect:function(){return qx.bom.Style.getPropertyName(bk);}
,getUserSelectNone:function(){var bs=qx.bom.client.Css.getUserSelect();if(bs){var br=document.createElement(L);br.style[bs]=a;return br.style[bs]===a?a:N;}
;return null;}
,getUserModify:function(){return qx.bom.Style.getPropertyName(Q);}
,getFloat:function(){var bt=document.documentElement.style;return bt.cssFloat!==undefined?O:bt.styleFloat!==undefined?bi:null;}
,getTranslate3d:function(){return I in window&&g in new WebKitCSSMatrix();}
,getLinearGradient:function(){qx.bom.client.Css.__fE=false;var bx=z;var bu=document.createElement(H);var bv=qx.bom.Style.getAppliedStyle(bu,X,bx);if(!bv){bx=bb;var bv=qx.bom.Style.getAppliedStyle(bu,X,bx,false);if(bv){qx.bom.client.Css.__fE=true;}
;}
;if(!bv){return null;}
;var bw=/(.*?)\(/.exec(bv);return bw?bw[1]:null;}
,getFilterGradient:function(){var bz=f+bc;var by=document.createElement(H);by.style.filter=bz;return by.style.filter==bz;}
,getRadialGradient:function(){var bD=M;var bA=document.createElement(H);var bB=qx.bom.Style.getAppliedStyle(bA,X,bD);if(!bB){return null;}
;var bC=/(.*?)\(/.exec(bB);return bC?bC[1]:null;}
,getLegacyWebkitGradient:function(){if(qx.bom.client.Css.__fE===null){qx.bom.client.Css.getLinearGradient();}
;return qx.bom.client.Css.__fE;}
,getRgba:function(){var bE;try{bE=document.createElement(H);}
catch(bF){bE=document.createElement();}
;try{bE.style[U]=G;if(bE.style[U].indexOf(ba)!=-1){return true;}
;}
catch(bG){}
;return false;}
,getBoxSizing:function(){return qx.bom.Style.getPropertyName(h);}
,getInlineBlock:function(){var bH=document.createElement(L);bH.style.display=x;if(bH.style.display==x){return x;}
;bH.style.display=y;if(bH.style.display!==y){return y;}
;return null;}
,getOpacity:function(){return (typeof document.documentElement.style.opacity==S);}
,getOverflowXY:function(){return (typeof document.documentElement.style.overflowX==S)&&(typeof document.documentElement.style.overflowY==S);}
,getTextShadow:function(){var bK=K;var bI=document.createElement(H);var bJ=qx.bom.Style.getAppliedStyle(bI,A,bK);return (!bJ)?false:true;}
,getFilterTextShadow:function(){var bM=T;var bL=document.createElement(H);bL.style.filter=bM;return bL.style.filter==bM;}
},defer:function(bN){qx.core.Environment.add(w,bN.getTextOverflow);qx.core.Environment.add(Y,bN.getPlaceholder);qx.core.Environment.add(o,bN.getBorderRadius);qx.core.Environment.add(q,bN.getBoxShadow);qx.core.Environment.add(C,bN.getLinearGradient);qx.core.Environment.add(c,bN.getFilterGradient);qx.core.Environment.add(bn,bN.getRadialGradient);qx.core.Environment.add(n,bN.getLegacyWebkitGradient);qx.core.Environment.add(t,bN.getBoxModel);qx.core.Environment.add(E,bN.getRgba);qx.core.Environment.add(J,bN.getBorderImage);qx.core.Environment.add(k,bN.getBorderImageSyntax);qx.core.Environment.add(bg,bN.getUserModify);qx.core.Environment.add(bd,bN.getUserSelect);qx.core.Environment.add(v,bN.getUserSelectNone);qx.core.Environment.add(b,bN.getAppearance);qx.core.Environment.add(m,bN.getFloat);qx.core.Environment.add(bf,bN.getBoxSizing);qx.core.Environment.add(d,bN.getInlineBlock);qx.core.Environment.add(R,bN.getOpacity);qx.core.Environment.add(bj,bN.getOverflowXY);qx.core.Environment.add(p,bN.getTextShadow);qx.core.Environment.add(bh,bN.getFilterTextShadow);}
});}
)();
(function(){var k="borderLeftStyle",j="borderRightStyle",i="div",h="borderRightWidth",g="overflow-y",f="borderLeftWidth",e="-moz-scrollbars-vertical",d=":",b="overflowY",a="100px",z="overflow:",y="qx.bom.element.Overflow",x="overflow-x",w=";",v="overflowX",u="engine.version",r="none",q="scroll",p="overflow",o="",m="-moz-scrollbars-none",n="hidden",l="css.overflowxy";qx.Class.define(y,{statics:{DEFAULT_SCROLLBAR_WIDTH:14,__fF:null,getScrollbarWidth:function(){if(this.__fF!==null){return this.__fF;}
;var A=qx.bom.element.Style;var C=function(G,H){return parseInt(A.get(G,H),10)||0;}
;var D=function(I){return (A.get(I,j)==r?0:C(I,h));}
;var B=function(J){return (A.get(J,k)==r?0:C(J,f));}
;var F=function(K){if(K.clientWidth==0){var L=A.get(K,p);var M=(L==q||L==e?16:0);return Math.max(0,D(K)+M);}
;return Math.max(0,(K.offsetWidth-K.clientWidth-B(K)));}
;var E=function(N){return F(N)-D(N);}
;var t=document.createElement(i);var s=t.style;s.height=s.width=a;s.overflow=q;document.body.appendChild(t);var c=E(t);this.__fF=c;document.body.removeChild(t);return this.__fF;}
,_compile:function(O,P){if(!qx.core.Environment.get(l)){O=z;if(false&&P==n){P=m;}
;}
;return O+d+P+w;}
,compileX:function(Q){return this._compile(x,Q);}
,compileY:function(R){return this._compile(g,R);}
,getX:function(S,T){if(qx.core.Environment.get(l)){return qx.bom.element.Style.get(S,v,T,false);}
;var U=qx.bom.element.Style.get(S,p,T,false);if(U===m){U=n;}
;return U;}
,setX:function(V,W){if(qx.core.Environment.get(l)){V.style.overflowX=W;}
else {if(W===n&&false&&parseFloat(qx.core.Environment.get(u))<1.8){W=m;}
;V.style.overflow=W;}
;}
,resetX:function(X){if(qx.core.Environment.get(l)){X.style.overflowX=o;}
else {X.style.overflow=o;}
;}
,getY:function(Y,ba){if(qx.core.Environment.get(l)){return qx.bom.element.Style.get(Y,b,ba,false);}
;var bb=qx.bom.element.Style.get(Y,p,ba,false);if(bb===m){bb=n;}
;return bb;}
,setY:function(bc,bd){if(qx.core.Environment.get(l)){bc.style.overflowY=bd;}
else {if(bd===n&&false&&parseFloat(qx.core.Environment.get(u))<1.8){bd=m;}
;bc.style.overflow=bd;}
;}
,resetY:function(be){if(qx.core.Environment.get(l)){be.style.overflowY=o;}
else {be.style.overflow=o;}
;}
}});}
)();
(function(){var j="This client does not support the boxSizing value",i="border-box",h="qx.bom.element.BoxSizing",g="boxSizing",f="content-box",e=":",d=";",c="",b="This client does not support dynamic modification of the boxSizing property.",a="css.boxsizing";qx.Class.define(h,{statics:{__fG:{tags:{button:true,select:true},types:{search:true,button:true,submit:true,reset:true,checkbox:true,radio:true}},__fH:function(k){var l=this.__fG;return l.tags[k.tagName.toLowerCase()]||l.types[k.type];}
,compile:function(m){if(qx.core.Environment.get(a)){var n=qx.lang.String.hyphenate(qx.core.Environment.get(a));return n+e+m+d;}
else {qx.log.Logger.warn(this,b);qx.log.Logger.trace();}
;}
,get:function(o){if(qx.core.Environment.get(a)){return qx.bom.element.Style.get(o,g,null,false)||c;}
;if(qx.bom.Document.isStandardMode(qx.dom.Node.getWindow(o))){if(!this.__fH(o)){return f;}
;}
;return i;}
,set:function(p,q){if(qx.core.Environment.get(a)){try{p.style[qx.core.Environment.get(a)]=q;}
catch(r){qx.log.Logger.warn(this,j,q);}
;}
else {qx.log.Logger.warn(this,b);}
;}
,reset:function(s){this.set(s,c);}
}});}
)();
(function(){var e="",d="cursor:",c="qx.bom.element.Cursor",b="cursor",a=";";qx.Class.define(c,{statics:{__bd:{},compile:function(f){return d+(this.__bd[f]||f)+a;}
,get:function(g,h){return qx.bom.element.Style.get(g,b,h,false);}
,set:function(i,j){i.style.cursor=this.__bd[j]||j;}
,reset:function(k){k.style.cursor=e;}
}});}
)();
(function(){var p="clip:auto;",o="rect(",n=")",m=");",l="",k="Could not parse clip string: ",j="qx.bom.element.Clip",i="string",h="clip:rect(",g=" ",c="clip",f="rect(auto,auto,auto,auto)",e="rect(auto, auto, auto, auto)",b=",",a="px",d="auto";qx.Class.define(j,{statics:{compile:function(q){if(!q){return p;}
;var v=q.left;var top=q.top;var u=q.width;var t=q.height;var r,s;if(v==null){r=(u==null?d:u+a);v=d;}
else {r=(u==null?d:v+u+a);v=v+a;}
;if(top==null){s=(t==null?d:t+a);top=d;}
else {s=(t==null?d:top+t+a);top=top+a;}
;return h+top+b+r+b+s+b+v+m;}
,get:function(w,x){var z=qx.bom.element.Style.get(w,c,x,false);var F,top,D,C;var y,A;if(typeof z===i&&z!==d&&z!==l){z=qx.lang.String.trim(z);if(/\((.*)\)/.test(z)){var E=RegExp.$1;if(/,/.test(E)){var B=E.split(b);}
else {var B=E.split(g);}
;top=qx.lang.String.trim(B[0]);y=qx.lang.String.trim(B[1]);A=qx.lang.String.trim(B[2]);F=qx.lang.String.trim(B[3]);if(F===d){F=null;}
;if(top===d){top=null;}
;if(y===d){y=null;}
;if(A===d){A=null;}
;if(top!=null){top=parseInt(top,10);}
;if(y!=null){y=parseInt(y,10);}
;if(A!=null){A=parseInt(A,10);}
;if(F!=null){F=parseInt(F,10);}
;if(y!=null&&F!=null){D=y-F;}
else if(y!=null){D=y;}
;if(A!=null&&top!=null){C=A-top;}
else if(A!=null){C=A;}
;}
else {throw new Error(k+z);}
;}
;return {left:F||null,top:top||null,width:D||null,height:C||null};}
,set:function(G,H){if(!H){G.style.clip=f;return;}
;var M=H.left;var top=H.top;var L=H.width;var K=H.height;var I,J;if(M==null){I=(L==null?d:L+a);M=d;}
else {I=(L==null?d:M+L+a);M=M+a;}
;if(top==null){J=(K==null?d:K+a);top=d;}
else {J=(K==null?d:top+K+a);top=top+a;}
;G.style.clip=o+top+b+I+b+J+b+M+n;}
,reset:function(N){N.style.clip=e;}
}});}
)();
(function(){var f="opacity",e="qx.bom.element.Opacity",d="css.opacity",c=";",b="opacity:",a="";qx.Class.define(e,{statics:{SUPPORT_CSS3_OPACITY:false,compile:function(g){if(g>=1){return a;}
;return b+g+c;}
,set:function(h,i){if(i>=1){i=a;}
;h.style.opacity=i;}
,reset:function(j){j.style.opacity=a;}
,get:function(k,l){var m=qx.bom.element.Style.get(k,f,l,false);if(m!=null){return parseFloat(m);}
;return 1.0;}
},defer:function(n){n.SUPPORT_CSS3_OPACITY=qx.core.Environment.get(d);}
});}
)();
(function(){var u="css.float",t="qx.bom.element.Style",s="css.borderimage",r="css.userselect",q="css.boxsizing",p="pixelLeft",o="css.textoverflow",n="Cascaded styles are not supported in this browser!",m="pixelBottom",l="pixelHeight",e="pixelWidth",k="css.appearance",h="pixelRight",c="css.usermodify",b="pixelTop",g=";",f=":",i="browser.documentmode",a="style",j="float",d="";qx.Class.define(t,{statics:{__fI:function(){var w={"appearance":qx.core.Environment.get(k),"userSelect":qx.core.Environment.get(r),"textOverflow":qx.core.Environment.get(o),"borderImage":qx.core.Environment.get(s),"float":qx.core.Environment.get(u),"userModify":qx.core.Environment.get(c),"boxSizing":qx.core.Environment.get(q)};this.__fJ={};for(var v in qx.lang.Object.clone(w)){if(!w[v]){delete w[v];}
else {this.__fJ[v]=v==j?j:qx.lang.String.hyphenate(w[v]);}
;}
;this.__fK=w;}
,__fL:function(name){var x=qx.bom.Style.getPropertyName(name);if(x){this.__fK[name]=x;}
;return x;}
,__fM:{width:e,height:l,left:p,right:h,top:b,bottom:m},__fN:{clip:qx.bom.element.Clip,cursor:qx.bom.element.Cursor,opacity:qx.bom.element.Opacity,boxSizing:qx.bom.element.BoxSizing,overflowX:{set:qx.lang.Function.bind(qx.bom.element.Overflow.setX,qx.bom.element.Overflow),get:qx.lang.Function.bind(qx.bom.element.Overflow.getX,qx.bom.element.Overflow),reset:qx.lang.Function.bind(qx.bom.element.Overflow.resetX,qx.bom.element.Overflow),compile:qx.lang.Function.bind(qx.bom.element.Overflow.compileX,qx.bom.element.Overflow)},overflowY:{set:qx.lang.Function.bind(qx.bom.element.Overflow.setY,qx.bom.element.Overflow),get:qx.lang.Function.bind(qx.bom.element.Overflow.getY,qx.bom.element.Overflow),reset:qx.lang.Function.bind(qx.bom.element.Overflow.resetY,qx.bom.element.Overflow),compile:qx.lang.Function.bind(qx.bom.element.Overflow.compileY,qx.bom.element.Overflow)}},compile:function(y){var A=[];var C=this.__fN;var B=this.__fJ;var name,z;for(name in y){z=y[name];if(z==null){continue;}
;name=B[name]||name;if(C[name]){A.push(C[name].compile(z));}
else {A.push(qx.lang.String.hyphenate(name),f,z,g);}
;}
;return A.join(d);}
,setCss:function(D,E){if(false&&parseInt(qx.core.Environment.get(i),10)<8){D.style.cssText=E;}
else {D.setAttribute(a,E);}
;}
,getCss:function(F){if(false&&parseInt(qx.core.Environment.get(i),10)<8){return F.style.cssText.toLowerCase();}
else {return F.getAttribute(a);}
;}
,isPropertySupported:function(G){return (this.__fN[G]||this.__fK[G]||G in document.documentElement.style);}
,COMPUTED_MODE:1,CASCADED_MODE:2,LOCAL_MODE:3,set:function(H,name,I,J){{}
;name=this.__fK[name]||this.__fL(name)||name;if(J!==false&&this.__fN[name]){return this.__fN[name].set(H,I);}
else {H.style[name]=I!==null?I:d;}
;}
,setStyles:function(K,L,M){{}
;var P=this.__fK;var R=this.__fN;var N=K.style;for(var Q in L){var O=L[Q];var name=P[Q]||this.__fL(Q)||Q;if(O===undefined){if(M!==false&&R[name]){R[name].reset(K);}
else {N[name]=d;}
;}
else {if(M!==false&&R[name]){R[name].set(K,O);}
else {N[name]=O!==null?O:d;}
;}
;}
;}
,reset:function(S,name,T){name=this.__fK[name]||this.__fL(name)||name;if(T!==false&&this.__fN[name]){return this.__fN[name].reset(S);}
else {S.style[name]=d;}
;}
,get:function(U,name,V,W){name=this.__fK[name]||this.__fL(name)||name;if(W!==false&&this.__fN[name]){return this.__fN[name].get(U,V);}
;switch(V){case this.LOCAL_MODE:return U.style[name]||d;case this.CASCADED_MODE:if(U.currentStyle){return U.currentStyle[name]||d;}
;throw new Error(n);default:var X=qx.dom.Node.getDocument(U);var Y=X.defaultView.getComputedStyle(U,null);return Y?Y[name]:d;};}
},defer:function(ba){ba.__fI();}
});}
)();
(function(){var g="qx.ui.mobile.core.Root",f="Boolean",e="root",d="overflow-y",c="hidden",b="auto",a="_applyShowScrollbarY";qx.Class.define(g,{extend:qx.ui.mobile.core.Widget,include:[qx.ui.mobile.core.MChildrenHandling],construct:function(h){this.__cS=h||document.body;qx.ui.mobile.core.Widget.call(this);}
,properties:{defaultCssClass:{refine:true,init:e},showScrollbarY:{check:f,init:true,apply:a}},members:{__cS:null,_createContainerElement:function(){return this.__cS;}
,_applyShowScrollbarY:function(i,j){this._setStyle(d,i?b:c);}
},destruct:function(){this.__cS=null;}
,defer:function(k,l){qx.ui.mobile.core.MChildrenHandling.remap(l);}
});}
)();
(function(){var g="List",f="iartnorfolk.Application",e="back",d="Map",c="Share",b="Settings",a="eventNavigationButtonClicked";qx.Class.define(f,{extend:qx.application.Mobile,members:{main:function(){qx.application.Mobile.prototype.main.call(this);document.body.a1=this;document.mapMuralProperties=function(m){m.interalId=m.assetId||m.accession_id;delete m.assetId;m.title=m.Title||m.title;delete m.Title;m.imgs=[];m.imgs.push(m.Image);}
;document.__fO=null;{}
;this._pageForwarder=function(h){document.body.a2=h;switch(h.getData().button){case d:document.mapPage.show();break;case g:document.listPage.show();break;case c:document.sharePage.show();break;case b:document.settingsPage.show();break;default:return;break;};document.__fO=h.getData().from;}
;this._backButtonHandler=function(){if(document.__fO!=null){document.__fO.show({reverse:true});}
;document.__fO=null;}
;document.mapPage=new iartnorfolk.page.Map();document.mapPage.addListener(a,this._pageForwarder,this);document.listPage=new iartnorfolk.page.List();document.listPage.addListener(a,this._pageForwarder,this);document.sharePage=new iartnorfolk.page.Share();document.sharePage.addListener(a,this._pageForwarder,this);document.settingsPage=new iartnorfolk.page.Settings();document.settingsPage.addListener(a,this._pageForwarder,this);document.detailPage=new iartnorfolk.page.Detail();document.detailPage.addListener(e,this._backButtonHandler,this);document.detailPage.addListener(a,this._pageForwarder,this);document.mapPage.show();}
}});}
)();
(function(){var n="perspectiveProperty",m="css.transform.3d",l="BackfaceVisibility",k="TransformStyle",j="WebkitPerspective",h='div',g="TransformOrigin",f="qx.bom.client.CssTransform",e="Transform",d="MozPerspective",a="Perspective",c="css.transform",b="PerspectiveOrigin";qx.Bootstrap.define(f,{statics:{getSupport:function(){var name=qx.bom.client.CssTransform.getName();if(name!=null){return {"name":name,"style":qx.bom.client.CssTransform.getStyle(),"origin":qx.bom.client.CssTransform.getOrigin(),"3d":qx.bom.client.CssTransform.get3D(),"perspective":qx.bom.client.CssTransform.getPerspective(),"perspective-origin":qx.bom.client.CssTransform.getPerspectiveOrigin(),"backface-visibility":qx.bom.client.CssTransform.getBackFaceVisibility()};}
;return null;}
,getStyle:function(){return qx.bom.Style.getPropertyName(k);}
,getPerspective:function(){return qx.bom.Style.getPropertyName(a);}
,getPerspectiveOrigin:function(){return qx.bom.Style.getPropertyName(b);}
,getBackFaceVisibility:function(){return qx.bom.Style.getPropertyName(l);}
,getOrigin:function(){return qx.bom.Style.getPropertyName(g);}
,getName:function(){return qx.bom.Style.getPropertyName(e);}
,get3D:function(){var o=document.createElement(h);var q=false;var p=[n,j,d];for(var i=p.length-1;i>=0;i--){q=q?q:o.style[p[i]]!=undefined;}
;return q;}
},defer:function(r){qx.core.Environment.add(c,r.getSupport);qx.core.Environment.add(m,r.get3D);}
});}
)();
(function(){var k="add",j="input",h="qx.ui.mobile.page.manager.Simple",g="remove",f="menubutton",e="qx.event.type.Data",d="backbutton",c="os.name",b="android",a="phonegap";qx.Class.define(h,{extend:qx.core.Object,construct:function(l){qx.core.Object.call(this);this.__fP={};this._setRoot(l);this.__fT();}
,events:{add:e,remove:e},members:{__fP:null,__fQ:null,__cS:null,__fR:null,__fS:null,__fT:function(){if(qx.core.Environment.get(a)&&qx.core.Environment.get(c)==b){this.__fR=qx.lang.Function.bind(this._onBackButton,this);this.__fS=qx.lang.Function.bind(this._onMenuButton,this);qx.bom.Event.addNativeListener(document,d,this.__fR);qx.bom.Event.addNativeListener(document,f,this.__fS);}
;}
,__fU:function(){if(qx.core.Environment.get(a)&&qx.core.Environment.get(c)==b){qx.bom.Event.removeNativeListener(document,d,this.__fR);qx.bom.Event.removeNativeListener(document,f,this.__fS);}
;}
,_onBackButton:function(){if(qx.core.Environment.get(a)&&qx.core.Environment.get(c)==b){var m=true;if(this.__fQ){m=this.__fQ.back();}
;if(m){navigator.app.exitApp();}
;}
;}
,_onMenuButton:function(){if(qx.core.Environment.get(a)&&qx.core.Environment.get(c)==b){if(this.__fQ){this.__fQ.menu();}
;}
;}
,add:function(n){this.__fP[n.getId()]=n;this.fireDataEvent(k,n);}
,remove:function(o){var p=this.getPage(o);delete this.__fP[o];this.fireDataEvent(g,p);}
,show:function(q){var r=this.__fQ;if(r==q){return;}
;{}
;q.initialize();q.start();this._getRoot().add(q);if(r){r.stop();this.__fV();this._removeCurrentPage();}
;this._setCurrentPage(q);}
,_removeCurrentPage:function(){this._getRoot().remove(this.__fQ);}
,_getRoot:function(){if(this.__cS==null){this._setRoot(qx.core.Init.getApplication().getRoot());}
;return this.__cS;}
,_setRoot:function(s){this.__cS=s;}
,getCurrentPage:function(){return this.__fQ;}
,_setCurrentPage:function(t){this.__fQ=t;}
,getPage:function(u){return this.__fP[u];}
,__fV:function(){var v=document.getElementsByTagName(j);for(var i=0,length=v.length;i<length;i++){v[i].blur();}
;}
},destruct:function(){this.__fU();this.__fW=this.__fP=this.__fQ=this.__cS=null;}
});}
)();
(function(){var e="notification",d="PhoneGap",c="qx.bom.client.PhoneGap",b="phonegap",a="phonegap.notification";qx.Bootstrap.define(c,{statics:{getPhoneGap:function(){return d in window;}
,getNotification:function(){return e in navigator;}
},defer:function(f){qx.core.Environment.add(b,f.getPhoneGap);qx.core.Environment.add(a,f.getNotification);}
});}
)();
(function(){var m="qx.core.BaseInit",l="os.name",k="Main runtime: ",j="iartnorfolk.Application",i="engine.version",h="Missing application class: ",g="Load runtime: ",f="Finalize runtime: ",d="Could not detect operating system!",c="Could not detect the version of the engine!",a="",b="ms";qx.Class.define(m,{statics:{getApplication:function(){return this.__fX||null;}
,ready:function(){if(this.__fX){return;}
;{}
;if(qx.core.Environment.get(i)==a){qx.log.Logger.warn(c);}
;if(qx.core.Environment.get(l)==a){qx.log.Logger.warn(d);}
;qx.log.Logger.debug(this,g+(new Date-qx.Bootstrap.LOADSTART)+b);var o=j;var p=qx.Class.getByName(o);if(p){this.__fX=new p;var n=new Date;this.__fX.main();qx.log.Logger.debug(this,k+(new Date-n)+b);var n=new Date;this.__fX.finalize();qx.log.Logger.debug(this,f+(new Date-n)+b);}
else {qx.log.Logger.warn(h+o);}
;}
,__fY:function(e){var q=this.__fX;if(q){q.close();}
;}
,__ga:function(){var r=this.__fX;if(r){r.terminate();}
;qx.core.ObjectRegistry.shutdown();}
}});}
)();
(function(){var d="ready",c="shutdown",b="beforeunload",a="qx.core.Init";qx.Class.define(a,{statics:{getApplication:qx.core.BaseInit.getApplication,ready:qx.core.BaseInit.ready,__fY:function(e){var f=this.getApplication();if(f){e.setReturnValue(f.close());}
;}
,__ga:function(){var g=this.getApplication();if(g){g.terminate();}
;}
},defer:function(h){qx.event.Registration.addListener(window,d,h.ready,h);qx.event.Registration.addListener(window,c,h.__ga,h);qx.event.Registration.addListener(window,b,h.__fY,h);}
});}
)();
(function(){var k="animationChild",j="qx.ui.mobile.page.manager.Animation",i="reverse",h="slide",g="String",f="animationStart",e="animationParent",d="in",c="out",b="qx.event.type.Data",a="animationEnd";qx.Class.define(j,{extend:qx.ui.mobile.page.manager.Simple,events:{animationStart:b,animationEnd:b},properties:{defaultAnimation:{check:g,init:h}},statics:{ANIMATIONS:{"slide":true,"pop":true,"fade":true,"dissolve":true,"slideup":true,"flip":true,"swap":true,"cube":true}},members:{__gb:null,__gc:null,__gd:null,__ge:null,__gf:null,isInAnimation:function(){return this.__gb;}
,show:function(l,m){if(this.__gb){return;}
;m=m||{};this.__gc=m.animation||this.getDefaultAnimation();{}
;m.reverse=m.reverse==null?false:m.reverse;this.__gd=m.fromHistory||m.reverse;this.__ge=this.getCurrentPage();this.__gf=l;qx.ui.mobile.page.manager.Simple.prototype.show.call(this,l);}
,_removeCurrentPage:function(){this.__gg();}
,__gg:function(){this.__gb=true;this.fireDataEvent(f,[this.__ge,this.__gf]);var p=this.__ge.getContainerElement();var n=this.__gf.getContainerElement();var o=this.__gi(c);var q=this.__gi(d);qx.event.Registration.addListener(p,a,this._onAnimationEnd,this);qx.event.Registration.addListener(n,a,this._onAnimationEnd,this);this._getRoot().addCssClass(e);qx.bom.element.Class.addClasses(n,q);qx.bom.element.Class.addClasses(p,o);}
,_onAnimationEnd:function(r){this._getRoot().remove(this.__ge);this.__gh();this.fireDataEvent(a,[this.__ge,this.__gf]);}
,__gh:function(){if(this.__gb){var t=this.__ge.getContainerElement();var s=this.__gf.getContainerElement();qx.event.Registration.removeListener(t,a,this._onAnimationEnd,this);qx.event.Registration.removeListener(s,a,this._onAnimationEnd,this);qx.bom.element.Class.removeClasses(t,this.__gi(c));qx.bom.element.Class.removeClasses(s,this.__gi(d));this._getRoot().removeCssClass(e);this.__gb=false;}
;}
,__gi:function(u){var v=[k,this.__gc,u];if(this.__gd){v.push(i);}
;return v;}
},destruct:function(){this.__gh();this.__gb=this.__gc,this.__gd=null;this.__ge=this.__gf=null;}
});}
)();
(function(){var a="qx.event.handler.Transition";qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(b){qx.core.Object.call(this);this.__gj={};this.__gk=qx.lang.Function.listener(this._onNative,this);}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{transitionEnd:1,animationEnd:1,animationStart:1,animationIteration:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true,TYPE_TO_NATIVE:{transitionEnd:"webkitTransitionEnd",animationEnd:"webkitAnimationEnd",animationStart:"webkitAnimationStart",animationIteration:"webkitAnimationIteration"},NATIVE_TO_TYPE:{webkitTransitionEnd:"transitionEnd",webkitAnimationEnd:"animationEnd",webkitAnimationStart:"animationStart",webkitAnimationIteration:"animationIteration"}},members:{__gk:null,__gj:null,canHandleEvent:function(c,d){}
,registerEvent:function(e,f,g){var i=qx.core.ObjectRegistry.toHashCode(e)+f;var h=qx.event.handler.Transition.TYPE_TO_NATIVE[f];this.__gj[i]={target:e,type:h};qx.bom.Event.addNativeListener(e,h,this.__gk);}
,unregisterEvent:function(j,k,l){var n=this.__gj;if(!n){return;}
;var m=qx.core.ObjectRegistry.toHashCode(j)+k;if(n[m]){delete n[m];}
;qx.bom.Event.removeNativeListener(j,qx.event.handler.Transition.TYPE_TO_NATIVE[k],this.__gk);}
,_onNative:qx.event.GlobalError.observeMethod(function(o){qx.event.Registration.fireEvent(o.target,qx.event.handler.Transition.NATIVE_TO_TYPE[o.type],qx.event.type.Event);}
)},destruct:function(){var event;var q=this.__gj;for(var p in q){event=q[p];if(event.target){qx.bom.Event.removeNativeListener(event.target,event.type,this.__gk);}
;}
;this.__gj=this.__gk=null;}
,defer:function(r){qx.event.Registration.addHandler(r);}
});}
)();
(function(){var a="qx.ui.mobile.core.MLayoutHandling";qx.Mixin.define(a,{members:{setLayout:function(b){return this._setLayout(b);}
,getLayout:function(){return this._getLayout();}
},statics:{remap:function(c){c.getLayout=c._getLayout;c.setLayout=c._setLayout;}
}});}
)();
(function(){var a="qx.ui.mobile.container.Composite";qx.Class.define(a,{extend:qx.ui.mobile.core.Widget,include:[qx.ui.mobile.core.MChildrenHandling,qx.ui.mobile.core.MLayoutHandling],construct:function(b){qx.ui.mobile.core.Widget.call(this);if(b){this.setLayout(b);}
;}
,defer:function(c,d){qx.ui.mobile.core.MChildrenHandling.remap(d);qx.ui.mobile.core.MLayoutHandling.remap(d);}
});}
)();
(function(){var o="start",n="css.transform.3d",m="height",l="px",k="page",j="stop",i="resume",h="initialize",g="pause",f="back",c="qx.ui.mobile.page.Page",e="menu",d="resize",b="orientationchange",a="qx.event.type.Event";qx.Class.define(c,{extend:qx.ui.mobile.container.Composite,construct:function(p){qx.ui.mobile.container.Composite.call(this,p);if(!p){this.setLayout(new qx.ui.mobile.layout.VBox());}
;qx.ui.mobile.page.Page.getManager().add(this);this._resize();qx.event.Registration.addListener(window,b,this._resize,this);qx.event.Registration.addListener(window,d,this._resize,this);}
,events:{"initialize":a,"start":a,"stop":a,"pause":a,"resume":a,"back":a,"menu":a},properties:{defaultCssClass:{refine:true,init:k}},statics:{__dg:null,getManager:function(){return qx.ui.mobile.page.Page.__dg;}
,setManager:function(q){qx.ui.mobile.page.Page.__dg=q;}
},members:{__gl:false,_resize:function(){this._setStyle(m,window.innerHeight+l);}
,_applyId:function(r,s){qx.ui.mobile.container.Composite.prototype._applyId.call(this,r,s);if(s!=null){qx.ui.mobile.page.Page.getManager().remove(s);}
;qx.ui.mobile.page.Page.getManager().add(this);}
,back:function(){this.fireEvent(f);var t=this._back();return t||false;}
,_back:function(){}
,menu:function(){this.fireEvent(e);}
,show:function(u){qx.ui.mobile.page.Page.getManager().show(this,u);}
,initialize:function(){if(!this.isInitialized()){this._initialize();this.__gl=true;this.fireEvent(h);}
;}
,_initialize:function(){}
,isInitialized:function(){return this.__gl;}
,start:function(){this._start();this.fireEvent(o);}
,_start:function(){}
,stop:function(){this._stop();this.fireEvent(j);}
,_stop:function(){}
,pause:function(){this._pause();this.fireEvent(g);}
,_pause:function(){}
,resume:function(){this._resume();this.fireEvent(i);}
,_resume:function(){}
},destruct:function(){qx.event.Registration.removeListener(window,b,this._resize,this);qx.event.Registration.removeListener(window,d,this._resize,this);this.__gl=null;if(!qx.core.ObjectRegistry.inShutDown){if(this.getId()){qx.ui.mobile.page.Page.getManager().remove(this.getId());}
;}
;}
,defer:function(v){if(qx.core.Environment.get(n)){v.setManager(new qx.ui.mobile.page.manager.Animation());}
else {v.setManager(new qx.ui.mobile.page.manager.Simple());}
;}
});}
)();
(function(){var d="abstract",c="The layout does not support the ",b=" property",a="qx.ui.mobile.layout.Abstract";qx.Class.define(a,{extend:qx.core.Object,type:d,members:{_widget:null,__gm:null,__gn:null,getCssClass:function(){{}
;}
,_getSupportedChildLayoutProperties:function(){{}
;}
,_setLayoutProperty:function(e,f,g){{}
;}
,setLayoutProperties:function(h,i){var k=this._getSupportedChildLayoutProperties();for(var j in i){if(!k[j]){throw new Error(c+j+b);}
;var l=i[j];this._setLayoutProperty(h,j,l);this._addChildLayoutProperty(h,j,l);}
;}
,connectToWidget:function(m){if(this._widget){this._widget.removeCssClass(this.getCssClass());}
;this._widget=m;if(m){m.addCssClass(this.getCssClass());if(this.__gm){for(var n in this.__gm){this.reset(n);this.set(n,this.__gm[n]);}
;}
;}
else {this.__gm=null;}
;}
,_addCachedProperty:function(o,p){if(!this.__gm){this.__gm={};}
;this.__gm[o]=p;}
,_getChildLayoutPropertyValue:function(q,r){var s=this.__go(q);return s[r];}
,_addChildLayoutProperty:function(t,u,v){var w=this.__go(t);if(v==null){delete w[u];}
else {w[u]=v;}
;}
,__go:function(x){if(!this.__gn){this.__gn={};}
;var y=this.__gn;var z=x.toHashCode();if(!y[z]){y[z]={};}
;return y[z];}
},destruct:function(){this._widget=null;}
});}
)();
(function(){var l="abstract",k="middle",j="bottom",i="center",h="Boolean",g="flex",f="top",e="left",d="right",c="qx.ui.mobile.layout.AbstractBox",a="boxFlex",b="_applyLayoutChange";qx.Class.define(c,{extend:qx.ui.mobile.layout.Abstract,type:l,construct:function(m,n,o){qx.ui.mobile.layout.Abstract.call(this);if(m){this.setAlignX(m);}
;if(n){this.setAlignY(n);}
;if(o){this.setReversed(o);}
;}
,properties:{alignX:{check:[e,i,d],nullable:true,init:null,apply:b},alignY:{check:[f,k,j],nullable:true,init:null,apply:b},reversed:{check:h,nullable:true,init:null,apply:b}},statics:{PROPERTY_CSS_MAPPING:{"alignX":{"hbox":{"left":"boxPackStart","center":"boxPackCenter","right":"boxPackEnd"},"vbox":{"left":"boxAlignStart","center":"boxAlignCenter","right":"boxAlignEnd"}},"alignY":{"hbox":{"top":"boxAlignStart","middle":"boxAlignCenter","bottom":"boxAlignEnd"},"vbox":{"top":"boxPackStart","middle":"boxPackCenter","bottom":"boxPackEnd"}},"reversed":{"hbox":{"true":"boxReverse","false":null},"vbox":{"true":"boxReverse","false":null}}},SUPPORTED_CHILD_LAYOUT_PROPERTIES:{"flex":1}},members:{_getSupportedChildLayoutProperties:function(){return qx.ui.mobile.layout.AbstractBox.SUPPORTED_CHILD_LAYOUT_PROPERTIES;}
,_setLayoutProperty:function(p,q,r){if(q==g){var s=this._getChildLayoutPropertyValue(p,q);if(s!=null){p.removeCssClass(a+r);}
;p.addCssClass(a+r);}
;}
,connectToWidget:function(t){if(this._widget){this.resetAlignX();this.resetAlignY();this.resetReversed();}
;qx.ui.mobile.layout.Abstract.prototype.connectToWidget.call(this,t);}
,_applyLayoutChange:function(u,v,w){if(this._widget){var A=this.getCssClass();var y=qx.ui.mobile.layout.AbstractBox.PROPERTY_CSS_MAPPING[w][A];if(v){var z=y[v];if(z){this._widget.removeCssClass(z);}
;}
;if(u){var x=y[u];if(x){this._widget.addCssClass(x);}
;}
;}
else {if(u){this._addCachedProperty(w,u);}
;}
;}
}});}
)();
(function(){var b="vbox",a="qx.ui.mobile.layout.VBox";qx.Class.define(a,{extend:qx.ui.mobile.layout.AbstractBox,members:{getCssClass:function(){return b;}
}});}
)();
(function(){var n="_applyShowButton",m="_applyShowBackButton",l="action",k="content",j="_applyBackButtonText",i="qx.event.type.Event",h="_applyContentCssClass",g="_applyButtonText",f="qx.ui.mobile.page.NavigationPage",e="_applyTitle",b="Boolean",d="tap",c="",a="String";qx.Class.define(f,{extend:qx.ui.mobile.page.Page,events:{action:i},properties:{title:{check:a,init:c,nullable:true,apply:e},backButtonText:{check:a,init:c,apply:j},buttonText:{check:a,init:c,apply:g},showBackButton:{check:b,init:false,apply:m},showButton:{check:b,init:false,apply:n},contentCssClass:{check:a,init:k,nullable:true,apply:h}},members:{__gp:null,__gq:null,__gr:null,__gs:null,__gt:null,__gu:null,getContent:function(){return this.__gt;}
,scrollTo:function(x,y,o){this.__gu._scrollTo(x,y,o);}
,_getTitle:function(){return this.__gq;}
,_getNavigationBar:function(){return this.__gp;}
,_getBackButton:function(){return this.__gr;}
,_getButton:function(){return this.__gs;}
,_getScrollContainer:function(){return this.__gu;}
,_applyTitle:function(p,q){if(this.__gq){this.__gq.setValue(p);}
;}
,_applyBackButtonText:function(r,s){if(this.__gr){this.__gr.setValue(r);}
;}
,_applyButtonText:function(t,u){if(this.__gs){this.__gs.setValue(t);}
;}
,_applyShowBackButton:function(v,w){this._showBackButton();}
,_applyShowButton:function(z,A){this._showButton();}
,_applyContentCssClass:function(B,C){if(this.__gt){this.__gt.setDefaultCssClass(B);}
;}
,_showBackButton:function(){if(this.__gr){if(this.getShowBackButton()){this.__gr.show();}
else {this.__gr.hide();}
;}
;}
,_showButton:function(){if(this.__gs){if(this.getShowButton()){this.__gs.show();}
else {this.__gs.hide();}
;}
;}
,_initialize:function(){qx.ui.mobile.page.Page.prototype._initialize.call(this);this.__gp=this._createNavigationBar();if(this.__gp){this.add(this.__gp);}
;this.__gu=this._createScrollContainer();this.__gt=this._createContent();if(this.__gt){this.__gu._setLayout(new qx.ui.mobile.layout.VBox());this.__gu.add(this.__gt,{flex:1});}
;if(this.__gu){this.add(this.__gu,{flex:1});}
;}
,_createScrollContainer:function(){return new qx.ui.mobile.container.Scroll();}
,_createContent:function(){var content=new qx.ui.mobile.container.Composite();content.setDefaultCssClass(this.getContentCssClass());return content;}
,_createNavigationBar:function(){var D=new qx.ui.mobile.navigationbar.NavigationBar();this.__gr=this._createBackButton();if(this.__gr){this.__gr.addListener(d,this._onBackButtonTap,this);this.__gr.setValue(this.getBackButtonText());this._showBackButton();D.add(this.__gr);}
;this.__gq=this._createTitle();if(this.__gq){D.add(this.__gq,{flex:1});}
;this.__gs=this._createButton();if(this.__gs){this.__gs.addListener(d,this._onButtonTap,this);this.__gs.setValue(this.getButtonText());this._showButton();D.add(this.__gs);}
;return D;}
,_createTitle:function(){return new qx.ui.mobile.navigationbar.Title(this.getTitle());}
,_createBackButton:function(){return new qx.ui.mobile.navigationbar.BackButton();}
,_createButton:function(){return new qx.ui.mobile.navigationbar.Button();}
,_onBackButtonTap:function(E){this.back();}
,_onButtonTap:function(F){this.fireEvent(l);}
},destruct:function(){this.__gp=this.__gq=this.__gr=this.__gs=this.__gt=this.__gu=null;}
});}
)();
(function(){var n='TEXTAREA',m="qx/mobile/js/iscroll.min.js",l='INPUT',k="iscroll",j="scrollbar",i='SELECT',h="div",g="qx.ui.mobile.container.MIScroll",f="success",d='iscrollstart',a="resize",c="orientationchange",b="domupdated";qx.Mixin.define(g,{construct:function(){this.__gw();this.__fT();}
,members:{__gv:null,_createScrollElement:function(){var scroll=qx.bom.Element.create(h);qx.bom.element.Class.add(scroll,k);return scroll;}
,_getScrollContentElement:function(){return this.getContainerElement().childNodes[0];}
,_scrollTo:function(x,y,o){this.__gv.scrollTo(x,y,o);}
,__gw:function(){if(!window.iScroll){var q=m;var p=qx.util.ResourceManager.getInstance().toUri(q);{}
;var r=new qx.io.ScriptLoader();r.load(p,this.__gz,this);}
else {this._setScroll(this.__gx());}
;}
,__gx:function(){var scroll=new iScroll(this.getContainerElement(),{hideScrollbar:true,fadeScrollbar:true,hScrollbar:false,scrollbarClass:j,onBeforeScrollStart:function(e){var t=e.target;while(t.nodeType!=1){t=t.parentNode;}
;if(t.tagName!=i&&t.tagName!=l&&t.tagName!=n){e.preventDefault();}
;var s=new qx.event.message.Message(d);qx.event.message.Bus.getInstance().dispatch(s);}
});return scroll;}
,__fT:function(){qx.event.Registration.addListener(window,c,this._refresh,this);qx.event.Registration.addListener(window,a,this._refresh,this);this.addListener(b,this._refresh,this);}
,__gy:function(){qx.event.Registration.removeListener(window,c,this._refresh,this);qx.event.Registration.removeListener(window,a,this._refresh,this);this.removeListener(b,this._refresh,this);}
,__gz:function(status){if(status==f){this._setScroll(this.__gx());}
else {{}
;}
;}
,_setScroll:function(scroll){this.__gv=scroll;}
,_refresh:function(){if(this.__gv){this.__gv.refresh();}
;}
},destruct:function(){this.__gy();if(this.__gv){this.__gv.destroy();}
;this.__gv;}
});}
)();
(function(){var m="data",l="io.ssl",k="resourceUri",j="type",i="data:image/",h=";",g="/",f="encoding",e="qx.util.ResourceManager",d="singleton",a=",",c="string",b="";qx.Class.define(e,{extend:qx.core.Object,type:d,construct:function(){qx.core.Object.call(this);}
,statics:{__j:qx.$$resources||{},__gA:{}},members:{has:function(n){return !!this.self(arguments).__j[n];}
,getData:function(o){return this.self(arguments).__j[o]||null;}
,getImageWidth:function(p){var q=this.self(arguments).__j[p];return q?q[0]:null;}
,getImageHeight:function(r){var s=this.self(arguments).__j[r];return s?s[1]:null;}
,getImageFormat:function(t){var u=this.self(arguments).__j[t];return u?u[2]:null;}
,getCombinedFormat:function(v){var y=b;var x=this.self(arguments).__j[v];var w=x&&x.length>4&&typeof (x[4])==c&&this.constructor.__j[x[4]];if(w){var A=x[4];var z=this.constructor.__j[A];y=z[2];}
;return y;}
,toUri:function(B){if(B==null){return B;}
;var C=this.self(arguments).__j[B];if(!C){return B;}
;if(typeof C===c){var E=C;}
else {var E=C[3];if(!E){return B;}
;}
;var D=b;if((false)&&qx.core.Environment.get(l)){D=this.self(arguments).__gA[E];}
;return D+qx.util.LibraryManager.getInstance().get(E,k)+g+B;}
,toDataUri:function(F){var H=this.constructor.__j[F];var I=this.constructor.__j[H[4]];var J;if(I){var G=I[4][F];J=i+G[j]+h+G[f]+a+G[m];}
else {J=this.toUri(F);}
;return J;}
},defer:function(K){var O,M,L,P,N;{}
;}
});}
)();
(function(){var n="Microsoft.XMLHTTP",m="io.ssl",l="io.xhr",k="",j="file:",i="https:",h="webkit",g="gecko",f="activex",e="opera",b=".",d="io.maxrequests",c="qx.bom.client.Transport",a="xhr";qx.Bootstrap.define(c,{statics:{getMaxConcurrentRequestCount:function(){var o;var r=qx.bom.client.Engine.getVersion().split(b);var p=0;var s=0;var q=0;if(r[0]){p=r[0];}
;if(r[1]){s=r[1];}
;if(r[2]){q=r[2];}
;if(window.maxConnectionsPerServer){o=window.maxConnectionsPerServer;}
else if(qx.bom.client.Engine.getName()==e){o=8;}
else if(qx.bom.client.Engine.getName()==h){o=4;}
else if(qx.bom.client.Engine.getName()==g&&((p>1)||((p==1)&&(s>9))||((p==1)&&(s==9)&&(q>=1)))){o=6;}
else {o=2;}
;;;return o;}
,getSsl:function(){return window.location.protocol===i;}
,getXmlHttpRequest:function(){var t=window.ActiveXObject?(function(){if(window.location.protocol!==j){try{new window.XMLHttpRequest();return a;}
catch(u){}
;}
;try{new window.ActiveXObject(n);return f;}
catch(v){}
;}
)():(function(){try{new window.XMLHttpRequest();return a;}
catch(w){}
;}
)();return t||k;}
},defer:function(x){qx.core.Environment.add(d,x.getMaxConcurrentRequestCount);qx.core.Environment.add(m,x.getSsl);qx.core.Environment.add(l,x.getXmlHttpRequest);}
});}
)();
(function(){var b="singleton",a="qx.util.LibraryManager";qx.Class.define(a,{extend:qx.core.Object,type:b,statics:{__gB:qx.$$libraries||{}},members:{has:function(c){return !!this.self(arguments).__gB[c];}
,get:function(d,e){return this.self(arguments).__gB[d][e]?this.self(arguments).__gB[d][e]:null;}
,set:function(f,g,h){this.self(arguments).__gB[f][g]=h;}
}});}
)();
(function(){var q="readystatechange",p="head",o="webkit",n="script",m="qx.io.ScriptLoader",l="text/javascript",k="Another request is still running!",j="abort",i="mshtml",h="complete",c="error",g="load",f="opera",b="loaded",a="fail",d="success";qx.Bootstrap.define(m,{construct:function(){this.__gC=qx.Bootstrap.bind(this.__gG,this);this.__gD=document.createElement(n);}
,statics:{TIMEOUT:15},members:{__gE:null,__gF:null,__by:null,__bz:null,__gC:null,__gD:null,load:function(r,s,t){if(this.__gE){throw new Error(k);}
;this.__gE=true;this.__gF=false;var u=document.getElementsByTagName(p)[0];var v=this.__gD;this.__by=s||null;this.__bz=t||window;v.type=l;v.onerror=v.onload=v.onreadystatechange=this.__gC;var self=this;if(qx.bom.client.Engine.getName()===f&&this._getTimeout()>0){setTimeout(function(){self.dispose(a);}
,this._getTimeout()*1000);}
;v.src=r;setTimeout(function(){u.appendChild(v);}
,0);}
,abort:function(){if(this.__gE){this.dispose(j);}
;}
,dispose:function(status){if(this.__gF){return;}
;this.__gF=true;var y=this.__gD;y.onerror=y.onload=y.onreadystatechange=null;var x=y.parentNode;if(x){x.removeChild(y);}
;delete this.__gE;if(this.__by){var w=qx.bom.client.Engine.getName();if(w==i||w==o){var self=this;setTimeout(qx.event.GlobalError.observeMethod(function(){self.__by.call(self.__bz,status);delete self.__by;}
),0);}
else {this.__by.call(this.__bz,status);delete this.__by;}
;}
;}
,_getTimeout:function(){return qx.io.ScriptLoader.TIMEOUT;}
,__gG:qx.event.GlobalError.observeMethod(function(e){var z=qx.bom.client.Engine.getName();if(z==i){var A=this.__gD.readyState;if(A==b){this.dispose(d);}
else if(A==h){this.dispose(d);}
else {return;}
;}
else if(z==f){if(qx.Bootstrap.isString(e)||e.type===c){return this.dispose(a);}
else if(e.type===g){return this.dispose(d);}
else {return;}
;}
else {if(qx.Bootstrap.isString(e)||e.type===c){this.dispose(a);}
else if(e.type===g){this.dispose(d);}
else if(e.type===q&&(e.target.readyState===h||e.target.readyState===b)){this.dispose(d);}
else {return;}
;;}
;}
)}});}
)();
(function(){var c="Object",b="qx.event.message.Message",a="String";qx.Class.define(b,{extend:qx.core.Object,construct:function(name,d){qx.core.Object.call(this);if(name!=null){this.setName(name);}
;if(d!=null){this.setData(d);}
;}
,properties:{name:{check:a},data:{init:null,nullable:true},sender:{check:c}}});}
)();
(function(){var f="function",e="qx.event.message.Bus",d="*",c="Invalid parameters! ",b="Object method already subscribed to ",a="singleton";qx.Class.define(e,{type:a,extend:qx.core.Object,statics:{getSubscriptions:function(){return this.getInstance().getSubscriptions();}
,subscribe:function(g,h,j){return this.getInstance().subscribe(g,h,j);}
,checkSubscription:function(k,l,m){return this.getInstance().checkSubscription(k,l,m);}
,unsubscribe:function(n,o,p){return this.getInstance().unsubscribe(n,o,p);}
,dispatch:function(q){return this.getInstance().dispatch.apply(this.getInstance(),arguments);}
,dispatchByName:function(name,r){return this.getInstance().dispatchByName.apply(this.getInstance(),arguments);}
},construct:function(){this.__gH={};}
,members:{__gH:null,getSubscriptions:function(){return this.__gH;}
,subscribe:function(s,t,u){if(!s||typeof t!=f){this.error(c+[s,t,u]);return false;}
;var v=this.getSubscriptions();if(this.checkSubscription(s)){if(this.checkSubscription(s,t,u)){this.warn(b+s);return false;}
;v[s].push({subscriber:t,context:u||null});return true;}
else {v[s]=[{subscriber:t,context:u||null}];return true;}
;}
,checkSubscription:function(w,x,y){var z=this.getSubscriptions();if(!z[w]||z[w].length===0){return false;}
;if(x){for(var i=0;i<z[w].length;i++){if(z[w][i].subscriber===x&&z[w][i].context===(y||null)){return true;}
;}
;return false;}
;return true;}
,unsubscribe:function(A,B,C){var E=this.getSubscriptions();var D=E[A];if(D){if(!B){E[A]=null;delete E[A];return true;}
else {if(!C){C=null;}
;var i=D.length;var F;do {F=D[--i];if(F.subscriber===B&&F.context===C){D.splice(i,1);if(D.length===0){E[A]=null;delete E[A];}
;return true;}
;}
while(i);}
;}
;return false;}
,dispatch:function(G){var J=this.getSubscriptions();var H=G.getName();var I=false;for(var K in J){var L=K.indexOf(d);if(L>-1){if(L===0||K.substr(0,L)===H.substr(0,L)){this.__gI(J[K],G);I=true;}
;}
else {if(K===H){this.__gI(J[H],G);I=true;}
;}
;}
;return I;}
,dispatchByName:function(name,M){var N=new qx.event.message.Message(name,M);return this.dispatch(N);}
,__gI:function(O,P){for(var i=0;i<O.length;i++){var Q=O[i].subscriber;var R=O[i].context;if(R&&R.isDisposed){if(R.isDisposed()){O.splice(i,1);i--;}
else {Q.call(R,P);}
;}
else {Q.call(R,P);}
;}
;}
}});}
)();
(function(){var b="qx.ui.mobile.container.Scroll",a="scroll";qx.Class.define(b,{extend:qx.ui.mobile.core.Widget,include:[qx.ui.mobile.core.MChildrenHandling],properties:{defaultCssClass:{refine:true,init:a}},members:{_createContainerElement:function(){var d=qx.ui.mobile.core.Widget.prototype._createContainerElement.call(this);var c=this._createScrollElement();if(c){d.appendChild(c);}
;return d;}
,_getContentElement:function(){var e=qx.ui.mobile.core.Widget.prototype._getContentElement.call(this);var f=this._getScrollContentElement();return f||e;}
},defer:function(g){qx.Class.include(g,qx.ui.mobile.container.MIScroll);}
});}
)();
(function(){var c="middle",b="navigationbar",a="qx.ui.mobile.navigationbar.NavigationBar";qx.Class.define(a,{extend:qx.ui.mobile.container.Composite,construct:function(d){qx.ui.mobile.container.Composite.call(this,d);if(!d){this.setLayout(new qx.ui.mobile.layout.HBox().set({alignY:c}));}
;}
,properties:{defaultCssClass:{refine:true,init:b}}});}
)();
(function(){var b="qx.ui.mobile.layout.HBox",a="hbox";qx.Class.define(b,{extend:qx.ui.mobile.layout.AbstractBox,members:{getCssClass:function(){return a;}
}});}
)();
(function(){var h="Boolean",g="label",f="_applyValue",e="qx.ui.mobile.basic.Label",d="_applyWrap",c="changeValue",b='display',a="no-wrap";qx.Class.define(e,{extend:qx.ui.mobile.core.Widget,construct:function(i){qx.ui.mobile.core.Widget.call(this);if(i){this.setValue(i);}
;this.initWrap();}
,properties:{defaultCssClass:{refine:true,init:g},value:{nullable:true,init:null,apply:f,event:c},anonymous:{refine:true,init:true},wrap:{check:h,init:true,apply:d}},members:{_applyValue:function(j,k){this._setHtml(j);}
,_applyWrap:function(l,m){if(l){this.removeCssClass(a);}
else {this.addCssClass(a);}
;}
,setDisplay:function(n){this._setStyle(b,n);}
}});}
)();
(function(){var b="qx.ui.mobile.navigationbar.Title",a="h1";qx.Class.define(b,{extend:qx.ui.mobile.basic.Label,properties:{wrap:{refine:true,init:false}},members:{_getTagName:function(){return a;}
}});}
)();
(function(){var j="Boolean",i='px',h="_applyCenter",g="changeIcon",f="__gL",e="__gJ",d="changeLabel",c="Integer",b="_applyIconPosition",a='verticalAlign',M="center",L="icon",K="__gK",J="__gM",I="right",H="qx.ui.mobile.basic.Atom",G="_applyIcon",F='middle',E="label",D="_applyShow",q=" ",r='right',o="_applyLabel",p="_applyGap",m="atom",n="both",k='left',l='bottom',s="middle",t="String",w='top',v='block',y='both',x='margin',A='label',z='icon',u="bottom",C="left",B="top";qx.Class.define(H,{extend:qx.ui.mobile.core.Widget,construct:function(N,O){qx.ui.mobile.core.Widget.call(this);this.__gO(N,O);this.initGap();}
,properties:{defaultCssClass:{refine:true,init:m},label:{apply:o,nullable:true,check:t,event:d},icon:{check:t,apply:G,nullable:true,event:g},gap:{check:c,nullable:false,apply:p,init:4},show:{init:n,check:[n,E,L],inheritable:true,apply:D},iconPosition:{init:C,check:[B,I,u,C],apply:b},center:{init:true,check:j,apply:h}},members:{__gJ:null,__gK:null,__gL:null,__gM:null,_applyIconPosition:function(P,Q){var W;var S=[B,u].indexOf(P)!=-1;var V=[B,u].indexOf(Q)!=-1;if(S&&!V){W=new qx.ui.mobile.layout.VBox();this.__gJ.setDisplay(null);}
;if(!S&&V){W=new qx.ui.mobile.layout.HBox();this.__gJ.setDisplay(v);}
;if(W){this.__gL.setLayout(W);}
;var U=[B,C].indexOf(P)!=-1;var R=[B,C].indexOf(Q)!=-1;if(U!=R){if(U){this.__gL.remove(this.__gJ);this.__gL._addAfter(this.__gJ,this.__gK);}
else {this.__gL.remove(this.__gK);this.__gL._addAfter(this.__gK,this.__gJ);}
;var T=this.__gN(Q);this.__gK._setStyle(x+qx.lang.String.firstUp(T),null);this._applyGap(this.getGap());this._domUpdated();}
;}
,_applyShow:function(X,Y){if(this.__gJ){if(X===y||X===A){this.__gJ.show();}
else if(X===z){this.__gJ.exclude();}
;}
;if(this.__gK){if(X===y||X===z){this.__gK.show();}
else if(X===A){this.__gK.exclude();}
;}
;}
,_applyGap:function(ba,bb){if(this.__gK){var bc=this.__gN(this.getIconPosition());this.__gK._setStyle(x+qx.lang.String.firstUp(bc),ba+i);}
;}
,__gN:function(bd){var be=k;switch(bd){case w:be=l;break;case l:be=w;break;case k:be=r;break;};return be;}
,_applyLabel:function(bf,bg){if(this.__gJ){this.__gJ.setValue(bf);}
else {this.__gJ=this._createLabelWidget(bf);if(this.__gK){var bh=[B,C].indexOf(this.getIconPosition())!=-1;if(bh){this.__gL._addAfter(this.__gJ,this.__gK);}
else {this.__gL._addBefore(this.__gJ,this.__gK);}
;}
;if(this.__gM){this.__gL._addAfter(this.__gJ,this.__gM);this.__gM.destroy();this.__gM=null;}
;}
;}
,_applyIcon:function(bi,bj){if(this.__gK){this.__gK.setSource(bi);}
else {this.__gK=this._createIconWidget(bi);var bk=[B,C].indexOf(this.getIconPosition())!=-1;if(bk){this.__gL._addBefore(this.__gK,this.__gJ);}
else {this.__gL._addAfter(this.__gK,this.__gJ);}
;}
;}
,getIconWidget:function(){return this.__gK;}
,getLabelWidget:function(){return this.__gJ;}
,_createIconWidget:function(bl){var bm=new qx.ui.mobile.basic.Image(bl);bm.setAnonymous(true);bm._setStyle(a,F);return bm;}
,_createLabelWidget:function(bn){var bp=new qx.ui.mobile.basic.Label(bn);bp.setAnonymous(true);bp.setWrap(false);var bo=[B,u].indexOf(this.getIconPosition())!=-1;if(!bo){bp.setDisplay(v);}
;return bp;}
,__gO:function(bq,br){if(bq){this.__gJ=this._createLabelWidget(bq);this.setLabel(bq);}
;if(br){this.__gK=this._createIconWidget(br);this.setIcon(br);}
;var bs=[B,u].indexOf(this.getIconPosition())!=-1;var bt=bs?new qx.ui.mobile.layout.VBox():new qx.ui.mobile.layout.HBox();if(this.getCenter()){if(bs){bt.set({alignY:s});}
else {bt.set({alignX:M});}
;}
;this.__gL=new qx.ui.mobile.container.Composite(bt);this.__gL.setAnonymous(true);var bv=[B,C].indexOf(this.getIconPosition())!=-1;if(this.__gK&&this.__gJ){if(bv){this.__gL.add(this.__gK);this.__gL.add(this.__gJ,{flex:1});}
else {this.__gL.add(this.__gJ,{flex:1});this.__gL.add(this.__gK);}
;}
else {if(this.__gK){this.__gL.add(this.__gK);}
;if(this.__gJ){this.__gL.add(this.__gJ,{flex:1});}
else {if(!this.__gK){this.__gM=new qx.ui.mobile.basic.Label(q);this.__gL.add(this.__gM);}
;}
;}
;if(this.getShow()===z&&this.__gJ){this.__gJ.exclude();}
;if(this.getShow()===A&&this.__gK){this.__gK.exclude();}
;var bu=new qx.ui.mobile.container.Composite(new qx.ui.mobile.layout.VBox().set({alignY:s}));bu.setAnonymous(true);bu.add(this.__gL,{'flex':0});this._add(bu);}
},destruct:function(){this._disposeObjects(e,J,K,f);}
});}
)();
(function(){var j="Image could not be loaded: ",i="src",h="_applySource",g='data:',f="loaded",e="img",d="loadingFailed",c="qx.ui.mobile.basic.Image",b="String",a="qx.event.type.Event";qx.Class.define(c,{extend:qx.ui.mobile.core.Widget,construct:function(k){qx.ui.mobile.core.Widget.call(this);if(k){this.setSource(k);}
else {this.initSource();}
;}
,events:{loadingFailed:a,loaded:a},properties:{source:{check:b,nullable:true,init:null,apply:h}},members:{_getTagName:function(){return e;}
,_applySource:function(l,m){var n=l;if(n&&n.indexOf(g)!=0){n=qx.util.ResourceManager.getInstance().toUri(n);var o=qx.io.ImageLoader;if(!o.isFailed(n)&&!o.isLoaded(n)){o.load(n,this.__gP,this);}
;}
;this._setSource(n);}
,__gP:function(p,q){if(this.$$disposed===true){return;}
;if(q.failed){this.warn(j+p);this.fireEvent(d);}
else if(q.aborted){return;}
else {this.fireEvent(f);}
;this._domUpdated();}
,_setSource:function(r){this._setAttribute(i,r);}
}});}
)();
(function(){var c="load",b="qx.io.ImageLoader",a="html.image.naturaldimensions";qx.Bootstrap.define(b,{statics:{__cQ:{},__gQ:{width:null,height:null},__gR:/\.(png|gif|jpg|jpeg|bmp)\b/i,__gS:/^data:image\/(png|gif|jpg|jpeg|bmp)\b/i,isLoaded:function(d){var e=this.__cQ[d];return !!(e&&e.loaded);}
,isFailed:function(f){var g=this.__cQ[f];return !!(g&&g.failed);}
,isLoading:function(h){var j=this.__cQ[h];return !!(j&&j.loading);}
,getFormat:function(k){var m=this.__cQ[k];if(!m||!m.format){var o=this.__gS.exec(k);if(o!=null){var p=(m&&qx.lang.Type.isNumber(m.width)?m.width:this.__gQ.width);var n=(m&&qx.lang.Type.isNumber(m.height)?m.height:this.__gQ.height);m={loaded:true,format:o[1],width:p,height:n};}
;}
;return m?m.format:null;}
,getSize:function(q){var r=this.__cQ[q];return r?{width:r.width,height:r.height}:this.__gQ;}
,getWidth:function(s){var t=this.__cQ[s];return t?t.width:null;}
,getHeight:function(u){var v=this.__cQ[u];return v?v.height:null;}
,load:function(w,x,y){var z=this.__cQ[w];if(!z){z=this.__cQ[w]={};}
;if(x&&!y){y=window;}
;if(z.loaded||z.loading||z.failed){if(x){if(z.loading){z.callbacks.push(x,y);}
else {x.call(y,w,z);}
;}
;}
else {z.loading=true;z.callbacks=[];if(x){z.callbacks.push(x,y);}
;var B=new Image();var A=qx.lang.Function.listener(this.__gT,this,B,w);B.onload=A;B.onerror=A;B.src=w;z.element=B;}
;}
,abort:function(C){var D=this.__cQ[C];if(D&&!D.loaded){D.aborted=true;var F=D.callbacks;var E=D.element;E.onload=E.onerror=null;delete D.callbacks;delete D.element;delete D.loading;for(var i=0,l=F.length;i<l;i+=2){F[i].call(F[i+1],C,D);}
;}
;this.__cQ[C]=null;}
,__gT:qx.event.GlobalError.observeMethod(function(event,G,H){var I=this.__cQ[H];if(event.type===c){I.loaded=true;I.width=this.__gU(G);I.height=this.__gV(G);var J=this.__gR.exec(H);if(J!=null){I.format=J[1];}
;}
else {I.failed=true;}
;G.onload=G.onerror=null;var K=I.callbacks;delete I.loading;delete I.callbacks;delete I.element;for(var i=0,l=K.length;i<l;i+=2){K[i].call(K[i+1],H,I);}
;}
),__gU:function(L){return qx.core.Environment.get(a)?L.naturalWidth:L.width;}
,__gV:function(M){return qx.core.Environment.get(a)?M.naturalHeight:M.height;}
}});}
)();
(function(){var b="qx.ui.mobile.form.Button",a="button";qx.Class.define(b,{extend:qx.ui.mobile.basic.Atom,properties:{defaultCssClass:{refine:true,init:a},activatable:{refine:true,init:true}},members:{setValue:function(c){this.setLabel(c);}
,getValue:function(){return this.getLabel();}
}});}
)();
(function(){var b="qx.ui.mobile.navigationbar.Button",a="navigationbar-button";qx.Class.define(b,{extend:qx.ui.mobile.form.Button,properties:{defaultCssClass:{refine:true,init:a}}});}
)();
(function(){var b="qx.ui.mobile.navigationbar.BackButton",a="navigationbar-backbutton";qx.Class.define(b,{extend:qx.ui.mobile.navigationbar.Button,properties:{defaultCssClass:{refine:true,init:a}}});}
)();
(function(){var j="iArtNorfolk",i="iartnorfolk.page.iArtShell",h="Find Me",g="FindMe",f="qx.event.type.Data",e="Share",d="Map",c="Settings",b="eventNavigationButtonClicked",a="tap";qx.Class.define(i,{extend:qx.ui.mobile.page.NavigationPage,construct:function(){qx.ui.mobile.page.NavigationPage.call(this);}
,members:{_initialize:function(){qx.ui.mobile.page.NavigationPage.prototype._initialize.call(this);this.remove(this._getNavigationBar());var k=this.__gW=new qx.ui.mobile.navigationbar.NavigationBar();this.getContent().add(this.__gW);var l=this.__gX=new qx.ui.mobile.navigationbar.Button(d);this.__gY=d;l.addListener(a,function(){this.fireDataEvent(b,{from:this,button:this.__gY});}
,this);k.add(l,{flex:0});var l=this.__ha=new qx.ui.mobile.navigationbar.Button(e);this.__hb=e;l.addListener(a,function(){this.fireDataEvent(b,{from:this,button:this.__hb});}
,this);k.add(l,{flex:0});var m=this.__hc=new qx.ui.mobile.navigationbar.Title(j);k.add(m,{flex:1});var l=this.__hd=new qx.ui.mobile.navigationbar.Button(h);this.__he=g;l.addListener(a,function(){this.fireDataEvent(b,{from:this,button:this.__he});}
,this);k.add(l,{flex:0});var l=this.__hf=new qx.ui.mobile.navigationbar.Button(c);this.__hg=c;l.addListener(a,function(){this.fireDataEvent(b,{from:this,button:this.__hg});}
,this);k.add(l,{flex:0});}
},events:{"eventNavigationButtonClicked":f}});}
)();
(function(){var n=' away.',m='<div class="info-background"><center>',l='resource/location-icon-pin-32.png',k="iartnorfolk.page.Map",j="http://iartnorfolk.com/data.php?detail=",h='',g="view",e='" /><br style="clear:both" />',d="road.local",c='You are ',R='</center></div>',Q='</strong><br />',P="fade",O='resource/map-stake.png',N="#0000ff",M='json',L='We couldn\'t locate your position.',K="click",J='<img class="thumbnail" src="',I='Map',u='server-side failure with status code ',v="http://iartnorfolk.com/data.php",s="<br>",t='<strong>',q="close",r="on",o='dragend',p="button",w="myDetailThumbButton",x="px",A="",z="simplified",C="labels",B="road",E="List",D="geometry",y="tap",H="all",G="&nbsp;&nbsp;",F="setCenter";qx.Class.define(k,{extend:iartnorfolk.page.iArtShell,construct:function(){iartnorfolk.page.iArtShell.call(this);}
,members:{_muralIcon:O,_locationIcon:l,_dataLoadUrl:v,_detailDataLoadUrl:j,_map:null,_mapTypeName:I,_mapTypeDef:[{featureType:B,elementType:H,stylers:[{saturation:-99},{hue:N}]},{featureType:H,elementType:C,stylers:[{visibility:z}]},{featureType:B,elementType:D,stylers:[{visibility:z}]},{featureType:d,elementType:C,stylers:[{visibility:r}]},{featureType:H,elementType:D,stylers:[{saturation:-20}]}],_mapOptions:{zoom:16,center:new google.maps.LatLng(36.84765224454971,-76.2922677397728),mapTypeId:this._mapTypeName,mapTypeControlOptions:{mapTypeIds:[this._mapTypeName,google.maps.MapTypeId.SATELLITE,google.maps.MapTypeId.HYBRID]}},_markers:[],_lastSearchLatLng:undefined,_myLocationLatLng:undefined,_myLocationMarker:undefined,_directionsService:new google.maps.DirectionsService(),_murals:[],_initialize:function(){iartnorfolk.page.iArtShell.prototype._initialize.call(this);document._mapPage=this;var U=new qx.ui.mobile.container.Composite();U.setLayout(new qx.ui.mobile.layout.VBox());U.addCssClass(F);document.detailThumbHtmlBlob=new qx.ui.mobile.embed.Html();document.detailThumbHtmlBlob.addCssClass(F);var T=new qx.ui.mobile.container.Composite();T.setLayout(new qx.ui.mobile.layout.HBox());U.add(document.detailThumbHtmlBlob);var V=new qx.ui.mobile.form.Button(g);V.removeCssClass(p);V.addCssClass(w);V.addListener(y,function(){document.detailPopup.hide();document.__fO=document.mapPage;document.detailPage.show({animation:P});document.detailPage._refreshDetail(document.theDetailId);}
);V.addCssClass(F);var W=new qx.ui.mobile.form.Button(q);W.removeCssClass(p);W.addCssClass(w);W.addListener(y,function(){document.detailPopup.hide();}
);W.addCssClass(F);U.add(new qx.ui.mobile.embed.Html(s));T.add(new qx.ui.mobile.embed.Html(G),{flex:1});T.add(V,{flex:0});T.add(new qx.ui.mobile.embed.Html(G),{flex:1});T.add(W,{flex:0});T.add(new qx.ui.mobile.embed.Html(G),{flex:1});T.addCssClass(F);U.add(T);document.detailPopup=new qx.ui.mobile.dialog.Popup(U);this.__mainButton.setValue(E);this.__gY=E;var S=this.__hh=new qx.ui.mobile.page.NavigationPage();this.getContent().add(S);S.getContainerElement().style.height=((S.getContainerElement().style.height+A).replace(x,A)-75)+x;this._alreadyInitedPins=false;this._initMap();this._findMe();if(!this._alreadyInitedPins){this._refresh(this._myLocationLatLng);}
;}
,_clearMarkers:function(){var X=this._markers.length;for(var i=0;i<X;i++){this._markers[i].setMap(null);}
;this._markers=[];}
,_calcDistance:function(Y){var ba={origin:this._myLocationLatLng,destination:new google.maps.LatLng(Y.geometry.coordinates[1],Y.geometry.coordinates[0]),travelMode:google.maps.DirectionsTravelMode.WALKING};this._directionsService.route(ba,function(bb,status){if(status==google.maps.DirectionsStatus.OK){alert(c+bb.routes[0].legs[0].distance.text+n);}
;}
);}
,_addMarker:function(bc){var be=new google.maps.LatLng(bc.geometry.coordinates[1],bc.geometry.coordinates[0]);var bd=new google.maps.Marker({map:this._map,position:be,icon:this._muralIcon});this._markers.push(bd);google.maps.event.addListener(bd,K,function(){var bf=h;bf+=m;bf+=t+bc.properties.title+Q;bf+=J+bc.properties.imgs[0]+e;bf+=R;document.detailThumbHtmlBlob.setHtml(bf);document.theDetailId=bc.properties._id;document.detailPopup.show();}
);}
,_refresh:function(bg){var bk;var f=0.015;bg=bg||this._lastSearchLatLng||this._map.getCenter();var bj={'minx':(bg.lng()-f),'miny':(bg.lat()-f),'maxx':(bg.lng()+f),'maxy':(bg.lat()+f)};this._lastSearchLatLng=bg;var bh=undefined;$.ajax({url:this._dataLoadUrl,crossDomain:true,dataType:M,async:false,success:function(bl,bm,bn){bh=bl;}
,error:function(bo,status,bp){console.log(u+status);}
});if(bh!=undefined){document.murals=bh.features;$.each(document.murals,function(i,bq){document.mapMuralProperties(bq.properties);}
);function bi(a,b){return a.properties.distance-b.properties.distance;}
;document.murals.sort(bi);document.murals=document.murals.slice(0,50);this._refreshMarkers();}
;}
,_refreshMarkers:function(){this._clearMarkers();var br=document.murals.length;for(var i=0;i<br;i++){var bs=document.murals[i];if(bs&&bs.geometry){this._addMarker(bs);}
;}
;}
,_findMe:function(){if(navigator.geolocation){navigator.geolocation.getCurrentPosition(function(bt){var bu=new google.maps.LatLng(bt.coords.latitude,bt.coords.longitude);if(this._myLocationMarker){this._myLocationMarker.setMap(null);}
;this._myLocationLatLng=bu;this._myLocationMarker=new google.maps.Marker({map:this._map,position:this._myLocationLatLng,icon:this._locationIcon});this._map.setCenter(this._myLocationLatLng);this._refresh(this._myLocationLatLng);this._alreadyInitedPins=true;}
,function(bv){console.log(L);}
,{enableHighAccuracy:true,maximumAge:90000});}
;}
,_initMap:function(){this._map=new google.maps.Map(this.__hh.getContentElement(),this._mapOptions);var bw=new google.maps.StyledMapType(this._mapTypeDef,{name:this._mapTypeName});this._map.mapTypes.set(this._mapTypeName,bw);this._map.setMapTypeId(this._mapTypeName);google.maps.event.addListener(this._map,o,function(){this._refresh(this._map.getCenter());}
);}
}});}
)();
(function(){var d="qx.ui.mobile.embed.Html",c="changeHtml",b="String",a="_applyHtml";qx.Class.define(d,{extend:qx.ui.mobile.core.Widget,construct:function(e){qx.ui.mobile.core.Widget.call(this);if(e){this.setHtml(e);}
;}
,properties:{html:{check:b,init:null,nullable:true,event:c,apply:a}},members:{_applyHtml:function(f,g){this._setHtml(f);}
}});}
)();
(function(){var j="changeIcon",i="__gL",h="qx.ui.mobile.dialog.Popup",g='marginBottom',f="middle",e='paddingRight',d='popupAnchorPointer',c="changeTitle",b='borderBottomWidth',a="popup",B="_applyIcon",A='borderRightWidth',z="_applyTitle",y="px",w='marginLeft',v='popupAnchorPointerRight',u='borderTopWidth',t="String",s="resize",r='popupAnchorPointerBottom',p='popupAnchorPointerLeft',q='-',n='popupAnchorPointerTop',o='dialogTitleUnderline',l='marginTop',m='paddingBottom',k='px';qx.Class.define(h,{extend:qx.ui.mobile.core.Widget,construct:function(C,D){qx.ui.mobile.core.Widget.call(this);this.exclude();qx.core.Init.getApplication().getRoot().add(this);if(D){this.__hi=D;}
;if(C){this._initializeChild(C);}
;}
,properties:{defaultCssClass:{refine:true,init:a},title:{apply:z,nullable:true,check:t,event:c},icon:{check:t,apply:B,nullable:true,event:j}},members:{__hj:false,__gL:null,__hk:null,__hl:null,__hm:null,__hi:null,__hn:null,__ho:null,__hp:null,_updatePosition:function(){if(this.__hk!=null||this.__hl!=null){return;}
;if(this.__hi){var G=qx.bom.element.Location.getPosition(this.__hi.getContainerElement());var E=qx.bom.element.Dimension.getSize(this.__hi.getContainerElement());var L=qx.bom.element.Dimension.getSize(this.getContainerElement());if(G.top+L.height>qx.bom.Viewport.getHeight()){G.top=G.top-L.height-parseInt(qx.bom.element.Style.get(this.getContainerElement(),m))-parseInt(qx.bom.element.Style.get(this.getContainerElement(),b));this.__hp.removeCssClass(n);this.__hp.removeCssClass(p);this.__hp.removeCssClass(v);this.__hp.addCssClass(r);this.__hp._setStyle(w,(E.width/2)+k);this.__hp._setStyle(g,q+(parseInt(qx.bom.element.Style.get(this.getContainerElement(),m))+parseInt(qx.bom.element.Style.get(this.__hp.getContainerElement(),u)))+k);this.__hp._setStyle(l,(parseInt(qx.bom.element.Style.get(this.getContainerElement(),m)))+k);var F=qx.bom.element.Dimension.getSize(this.getContainerElement());this._positionTo(G.left,G.top-(F.height-L.height));}
else if(G.left+L.width>qx.bom.Viewport.getWidth()){G.left=G.left-L.width-parseInt(qx.bom.element.Style.get(this.getContainerElement(),e))-parseInt(qx.bom.element.Style.get(this.getContainerElement(),A));this.__hp.removeCssClass(n);this.__hp.removeCssClass(p);this.__hp.removeCssClass(r);this.__hp.addCssClass(v);this._positionTo(G.left,G.top);}
else {this.__hp._setStyle(w,(E.width/2)+k);var F=qx.bom.element.Dimension.getSize(this.getContainerElement());var x=parseInt(this.__hp._getStyle(l))==0?2:0;this.__hp._setStyle(l,q+(F.height-x*parseInt(qx.bom.element.Style.get(this.getContainerElement(),m))+parseInt(qx.bom.element.Style.get(this.getContainerElement(),u)))+k);this._positionTo(G.left,G.top+E.height+parseInt(qx.bom.element.Dimension.getHeight(this.__hp.getContainerElement())));}
;return;}
;var top=qx.bom.Viewport.getScrollTop(),H=1;var M=qx.bom.Viewport.getScrollLeft(),I=1;var K=qx.bom.Viewport.getWidth(),J=qx.bom.Viewport.getHeight();if(this.__gL){var L=qx.bom.element.Dimension.getSize(this.__gL.getContainerElement());I=L.width;H=L.height;}
;this._positionTo(M+(K-I)/2,top+(J-H)/2);}
,show:function(){if(!this.__hj){this.__hq();qx.ui.mobile.core.Widget.prototype.show.call(this);this._updatePosition();}
;this.__hj=true;}
,placeTo:function(N,top){this.__hk=N;this.__hl=top;this._positionTo(N,top);}
,_positionTo:function(O,top){this.getContainerElement().style.left=O+y;this.getContainerElement().style.top=top+y;}
,hide:function(){if(this.__hj){this.__hr();this.exclude();}
;this.__hj=false;}
,__hq:function(){qx.event.Registration.addListener(window,s,this._updatePosition,this);}
,__hr:function(){qx.event.Registration.removeListener(window,s,this._updatePosition,this);}
,_initializeChild:function(P){if(this.__gL==null){this.__gL=new qx.ui.mobile.container.Composite(new qx.ui.mobile.layout.VBox().set({alignY:f}));this._add(this.__gL);}
;if(this._createTitleWidget()){this.__gL.add(this._createTitleWidget());}
;this.__gL.add(P);if(this.__hi){this.__hp=new qx.ui.mobile.core.Widget();this.__hp.addCssClass(d);this.__hp.addCssClass(n);this._add(this.__hp);}
;this.__hn=P;}
,_createTitleWidget:function(){if(this.__ho){return this.__ho;}
;if(this.getTitle()||this.getIcon()){this.__ho=new qx.ui.mobile.basic.Atom(this.getTitle(),this.getIcon());this.__ho.addCssClass(o);return this.__ho;}
else {return null;}
;}
,_applyTitle:function(Q,R){if(Q){if(this.__ho){this.__ho.setLabel(Q);}
else {this.__ho=new qx.ui.mobile.basic.Atom(Q,this.getIcon());this.__ho.addCssClass(o);if(this.__hn){this.__gL.addBefore(this._createTitleWidget(),this.__hn);}
else {if(this.__gL){this.__gL.add(this._createTitleWidget());}
;}
;}
;}
;}
,_applyIcon:function(S,T){if(S){if(this.__ho){this.__ho.setIcon(S);}
else {this.__ho=new qx.ui.mobile.basic.Atom(this.getTitle(),S);this.__ho.addCssClass(o);if(this.__hn){this.__gL.addBefore(this._createTitleWidget(),this.__hn);}
else {if(this.__gL){this.__gL.add(this._createTitleWidget());}
;}
;}
;}
;}
,add:function(U){this.removeWidget();this._initializeChild(U);}
,setAnchor:function(V){this.__hi=V;}
,getTitleWidget:function(){return this.__ho;}
,removeWidget:function(){if(this.__hn){this.__gL.remove(this.__hn);return this.__hn;}
else {{}
;return null;}
;}
},destruct:function(){this.__hr();this._disposeObjects(i);}
});}
)();
(function(){var j="qx.bom.element.Location",i="paddingLeft",h="browser.quirksmode",g="static",f="marginBottom",e="browser.documentmode",d="paddingBottom",c="paddingTop",b="marginRight",a="position",x="margin",w="paddingRight",v="BODY",u="border",t="borderBottomWidth",s="engine.version",r="auto",q="marginTop",p="marginLeft",o="padding",m="borderRightWidth",n="borderTopWidth",k="borderLeftWidth",l="scroll";qx.Class.define(j,{statics:{__hs:function(y,z){return qx.bom.element.Style.get(y,z,qx.bom.element.Style.COMPUTED_MODE,false);}
,__ht:function(A,B){return parseInt(qx.bom.element.Style.get(A,B,qx.bom.element.Style.COMPUTED_MODE,false),10)||0;}
,__hu:function(C){var E=0,top=0;var D=qx.dom.Node.getWindow(C);E-=qx.bom.Viewport.getScrollLeft(D);top-=qx.bom.Viewport.getScrollTop(D);return {left:E,top:top};}
,__hv:function(F){var H=qx.dom.Node.getDocument(F);var G=H.body;var I=G.offsetLeft;var top=G.offsetTop;if(parseFloat(qx.core.Environment.get(s))<530.17){I+=this.__ht(G,k);top+=this.__ht(G,n);}
;return {left:I,top:top};}
,__hw:function(J){var L=qx.dom.Node.getDocument(J);if(J.getBoundingClientRect){var M=J.getBoundingClientRect();var N=M.left;var top=M.top;}
else {var N=J.offsetLeft;var top=J.offsetTop;J=J.offsetParent;var K=L.body;while(J&&J!=K){N+=J.offsetLeft;top+=J.offsetTop;N+=this.__ht(J,k);top+=this.__ht(J,n);J=J.offsetParent;}
;}
;return {left:N,top:top};}
,get:function(O,P){if(O.tagName==v){var location=this.__hx(O);var W=location.left;var top=location.top;}
else {var Q=this.__hv(O);var V=this.__hw(O);var scroll=this.__hu(O);var W=V.left+Q.left-scroll.left;var top=V.top+Q.top-scroll.top;}
;var R=W+O.offsetWidth;var S=top+O.offsetHeight;if(P){if(P==o||P==l){var T=qx.bom.element.Overflow.getX(O);if(T==l||T==r){R+=O.scrollWidth-O.offsetWidth+this.__ht(O,k)+this.__ht(O,m);}
;var U=qx.bom.element.Overflow.getY(O);if(U==l||U==r){S+=O.scrollHeight-O.offsetHeight+this.__ht(O,n)+this.__ht(O,t);}
;}
;switch(P){case o:W+=this.__ht(O,i);top+=this.__ht(O,c);R-=this.__ht(O,w);S-=this.__ht(O,d);case l:W-=O.scrollLeft;top-=O.scrollTop;R-=O.scrollLeft;S-=O.scrollTop;case u:W+=this.__ht(O,k);top+=this.__ht(O,n);R-=this.__ht(O,m);S-=this.__ht(O,t);break;case x:W-=this.__ht(O,p);top-=this.__ht(O,q);R+=this.__ht(O,b);S+=this.__ht(O,f);break;};}
;return {left:W,top:top,right:R,bottom:S};}
,__hx:function(X){var top=X.offsetTop;var Y=X.offsetLeft;if(true||!((parseFloat(qx.core.Environment.get(s))<8||qx.core.Environment.get(e)<8)&&!qx.core.Environment.get(h))){top+=this.__ht(X,q);Y+=this.__ht(X,p);}
;{}
;return {left:Y,top:top};}
,getLeft:function(ba,bb){return this.get(ba,bb).left;}
,getTop:function(bc,bd){return this.get(bc,bd).top;}
,getRight:function(be,bf){return this.get(be,bf).right;}
,getBottom:function(bg,bh){return this.get(bg,bh).bottom;}
,getRelative:function(bi,bj,bk,bl){var bn=this.get(bi,bk);var bm=this.get(bj,bl);return {left:bn.left-bm.left,top:bn.top-bm.top,right:bn.right-bm.right,bottom:bn.bottom-bm.bottom};}
,getPosition:function(bo){return this.getRelative(bo,this.getOffsetParent(bo));}
,getOffsetParent:function(bp){var br=bp.offsetParent||document.body;var bq=qx.bom.element.Style;while(br&&(!/^body|html$/i.test(br.tagName)&&bq.get(br,a)===g)){br=br.offsetParent;}
;return br;}
}});}
)();
(function(){var g="qx.bom.element.Dimension",f="paddingRight",e="paddingLeft",d="paddingBottom",c="paddingTop",b="engine.version",a="0px";qx.Class.define(g,{statics:{getWidth:function(h){return h.offsetWidth;}
,getHeight:function(i){return i.offsetHeight;}
,getSize:function(j){return {width:this.getWidth(j),height:this.getHeight(j)};}
,__hy:{visible:true,hidden:true},getContentWidth:function(k){var l=qx.bom.element.Style;var m=qx.bom.element.Overflow.getX(k);var n=parseInt(l.get(k,e)||a,10);var q=parseInt(l.get(k,f)||a,10);if(this.__hy[m]){var p=k.clientWidth;if((false)||qx.dom.Node.isBlockNode(k)){p=p-n-q;}
;return p;}
else {if(k.clientWidth>=k.scrollWidth){return Math.max(k.clientWidth,k.scrollWidth)-n-q;}
else {var o=k.scrollWidth-n;if(false&&qx.core.Environment.get(b)>=6){o-=q;}
;return o;}
;}
;}
,getContentHeight:function(r){var s=qx.bom.element.Style;var v=qx.bom.element.Overflow.getY(r);var u=parseInt(s.get(r,c)||a,10);var t=parseInt(s.get(r,d)||a,10);if(this.__hy[v]){return r.clientHeight-u-t;}
else {if(r.clientHeight>=r.scrollHeight){return Math.max(r.clientHeight,r.scrollHeight)-u-t;}
else {var w=r.scrollHeight-u;if(false&&qx.core.Environment.get(b)==6){w-=t;}
;return w;}
;}
;}
,getContentSize:function(x){return {width:this.getContentWidth(x),height:this.getContentHeight(x)};}
}});}
)();
(function(){var g='<span class="list_page_item"><span class="list_page_item_header">',f="showPointer",e='</span> <span class="list_page_item_Artists">by ',d='</span></span>',c="changeSelection",b="fade",a="iartnorfolk.page.List";qx.Class.define(a,{extend:iartnorfolk.page.iArtShell,construct:function(){iartnorfolk.page.iArtShell.call(this);}
,members:{_initialize:function(){iartnorfolk.page.iArtShell.prototype._initialize.call(this);document.listPageItems=this.__hz=new qx.ui.mobile.list.List();document.listPageItems.setDelegate({configureItem:function(h,j,k){var l=document.murals[j];h.setTitle(g+l.properties.title+e+l.properties.Artists+d);h.setImage(l.properties.imgs[0]);}
});document.listPageItems.addCssClass(f);document.listPageItems.addListener(c,function(m){var n=m.getData();var o=document.murals[n];document.theDetailId=o.properties._id;document.__fO=document.listPage;document.detailPage.show({animation:b});document.detailPage._refreshDetail(document.theDetailId);}
);this.getContent().add(document.listPageItems);this._refreshDetailList();}
,_refreshDetailList:function(){if(document.murals==undefined){document.mapPage._refresh();}
;if(document.murals==undefined){return;}
;var p=new Array();for(var i=document.murals.length;i!=0;i--){p[i-1]=i-1;}
;document.listPageItems.setModel(new qx.data.Array(p));}
}});}
)();
(function(){var r="_applyDelegate",q="changeModel",p="LI",o="list",n="changeDelegate",m="",l="qx.data.Array",k="data-selectable",j="false",i="__hA",c="qx.ui.mobile.list.List",h="changeSelection",f="tap",b="ul",a="Integer",e="_applyModel",d="qx.event.type.Data",g="changeBubble";qx.Class.define(c,{extend:qx.ui.mobile.core.Widget,construct:function(s){qx.ui.mobile.core.Widget.call(this);this.addListener(f,this._onTap,this);this.__hA=new qx.ui.mobile.list.provider.Provider(this);if(s){this.setDelegate(s);}
;}
,events:{changeSelection:d},properties:{defaultCssClass:{refine:true,init:o},delegate:{apply:r,event:n,init:null,nullable:true},model:{check:l,apply:e,event:q,nullable:true,init:null},itemCount:{check:a,init:0}},members:{__hA:null,_getTagName:function(){return b;}
,_onTap:function(t){var v=t.getOriginalTarget();var u=-1;while(v.tagName!=p){v=v.parentNode;}
;if(qx.bom.element.Attribute.get(v,k)!=j&&qx.dom.Element.hasChild(this.getContainerElement(),v)){u=qx.dom.Hierarchy.getElementIndex(v);}
;if(u!=-1){this.fireDataEvent(h,u);}
;}
,_applyModel:function(w,x){if(x!=null){x.removeListener(g,this.__hB,this);}
;if(w!=null){w.addListener(g,this.__hB,this);}
;this.__hB();}
,_applyDelegate:function(y,z){this.__hA.setDelegate(y);}
,__hB:function(){var A=this.getModel();this.setItemCount(A?A.getLength():0);this.__hC();}
,__hC:function(){this._setHtml(m);var E=this.getItemCount();var D=this.getModel();var F=this.getContentElement();for(var C=0;C<E;C++){var B=this.__hA.getItemElement(D.getItem(C),C);F.appendChild(B);}
;this._domUpdated();}
},destruct:function(){this._disposeObjects(i);}
});}
)();
(function(){var e="_applyDelegate",d="__hD",c="qx.ui.mobile.list.provider.Provider",b="createItemRenderer",a="changeDelegate";qx.Class.define(c,{extend:qx.core.Object,properties:{delegate:{event:a,init:null,nullable:true,apply:e}},members:{__hD:null,_setItemRenderer:function(f){this.__hD=f;}
,_getItemRenderer:function(){return this.__hD;}
,getItemElement:function(g,h){this.__hD.reset();this._configureItem(g,h);return qx.bom.Element.clone(this.__hD.getContainerElement(),true);}
,_configureItem:function(i,j){var k=this.getDelegate();if(k!=null&&k.configureItem!=null){k.configureItem(this.__hD,i,j);}
;}
,_createItemRenderer:function(){var m=qx.util.Delegate.getMethod(this.getDelegate(),b);var l=null;if(m==null){l=new qx.ui.mobile.list.renderer.Default();}
else {l=m();}
;return l;}
,_applyDelegate:function(n,o){this._setItemRenderer(this._createItemRenderer());}
},destruct:function(){this._disposeObjects(d);}
});}
)();
(function(){var a="qx.util.Delegate";qx.Class.define(a,{statics:{getMethod:function(b,c){if(qx.util.Delegate.containsMethod(b,c)){return qx.lang.Function.bind(b[c],b);}
;return null;}
,containsMethod:function(d,e){var f=qx.lang.Type;if(f.isObject(d)){return f.isFunction(d[e]);}
;return false;}
}});}
)();
(function(){var k="listItem",j="li",i="_applyAttribute",h="_applySelected",g="qx.ui.mobile.list.renderer.Abstract",f="LI",e="_applyShowArrow",d="abstract",c="arrow",b="selected",a="Boolean";qx.Class.define(g,{extend:qx.ui.mobile.container.Composite,type:d,construct:function(l){qx.ui.mobile.container.Composite.call(this,l);this.initSelectable();this.initShowArrow();}
,properties:{defaultCssClass:{refine:true,init:k},selected:{check:a,init:false,apply:h},selectable:{check:a,init:true,apply:i},showArrow:{check:a,init:false,apply:e},activatable:{refine:true,init:true}},members:{reset:function(){{}
;}
,_getTagName:function(){return j;}
,getRowIndexFromEvent:function(m){return this.getRowIndex(m.getOriginalTarget());}
,getRowIndex:function(n){while(n.tagName!=f){n=n.parentNode;}
;return qx.dom.Hierarchy.getElementIndex(n);}
,_applyShowArrow:function(o,p){if(o){this.addCssClass(c);}
else {this.removeCssClass(c);}
;}
,_applySelected:function(q,r){if(q){this.addCssClass(b);}
else {this.removeCssClass(b);}
;}
}});}
)();
(function(){var j="__gq",i="list-itemlabel",h="qx.ui.mobile.list.renderer.Default",g="__hF",f="__hE",e="list-itemimage",d="__hG",c="middle",b="subtitle",a="";qx.Class.define(h,{extend:qx.ui.mobile.list.renderer.Abstract,construct:function(k){qx.ui.mobile.list.renderer.Abstract.call(this,k||new qx.ui.mobile.layout.HBox().set({alignY:c}));this._init();}
,members:{__hE:null,__gq:null,__hF:null,__hG:null,getImageWidget:function(){return this.__hE;}
,getTitleWidget:function(){return this.__gq;}
,getSubtitleWidget:function(){return this.__hF;}
,setImage:function(l){this.__hE.setSource(l);}
,setTitle:function(m){this.__gq.setValue(m);}
,setSubtitle:function(n){this.__hF.setValue(n);}
,_init:function(){this.__hE=this._createImage();this.add(this.__hE);this.__hG=this._createRightContainer();this.add(this.__hG,{flex:1});this.__gq=this._createTitle();this.__hG.add(this.__gq);this.__hF=this._createSubtitle();this.__hG.add(this.__hF);}
,_createRightContainer:function(){return new qx.ui.mobile.container.Composite(new qx.ui.mobile.layout.VBox());}
,_createImage:function(){var o=new qx.ui.mobile.basic.Image();o.setAnonymous(true);o.addCssClass(e);return o;}
,_createTitle:function(){var p=new qx.ui.mobile.basic.Label();p.setWrap(false);p.addCssClass(i);return p;}
,_createSubtitle:function(){var q=new qx.ui.mobile.basic.Label();q.setWrap(false);q.addCssClass(b);return q;}
,reset:function(){this.__hE.setSource(null);this.__gq.setValue(a);this.__hF.setValue(a);}
},destruct:function(){this._disposeObjects(f,j,g,d);}
});}
)();
(function(){var a="qx.dom.Element";qx.Class.define(a,{statics:{hasChild:function(parent,b){return b.parentNode===parent;}
,hasChildren:function(c){return !!c.firstChild;}
,hasChildElements:function(d){d=d.firstChild;while(d){if(d.nodeType===1){return true;}
;d=d.nextSibling;}
;return false;}
,getParentElement:function(e){return e.parentNode;}
,isInDom:function(f,g){if(!g){g=window;}
;var h=g.document.getElementsByTagName(f.nodeName);for(var i=0,l=h.length;i<l;i++){if(h[i]===f){return true;}
;}
;return false;}
,insertAt:function(j,parent,k){var m=parent.childNodes[k];if(m){parent.insertBefore(j,m);}
else {parent.appendChild(j);}
;return true;}
,insertBegin:function(n,parent){if(parent.firstChild){this.insertBefore(n,parent.firstChild);}
else {parent.appendChild(n);}
;}
,insertEnd:function(o,parent){parent.appendChild(o);}
,insertBefore:function(p,q){q.parentNode.insertBefore(p,q);return true;}
,insertAfter:function(r,s){var parent=s.parentNode;if(s==parent.lastChild){parent.appendChild(r);}
else {return this.insertBefore(r,s.nextSibling);}
;return true;}
,remove:function(t){if(!t.parentNode){return false;}
;t.parentNode.removeChild(t);return true;}
,removeChild:function(u,parent){if(u.parentNode!==parent){return false;}
;parent.removeChild(u);return true;}
,removeChildAt:function(v,parent){var w=parent.childNodes[v];if(!w){return false;}
;parent.removeChild(w);return true;}
,replaceChild:function(x,y){if(!y.parentNode){return false;}
;y.parentNode.replaceChild(x,y);return true;}
,replaceAt:function(z,A,parent){var B=parent.childNodes[A];if(!B){return false;}
;parent.replaceChild(z,B);return true;}
}});}
)();
(function(){var j="qx.data.marshal.MEventBubbling",h="",g="qx.event.type.Data",f="changeBubble",d=".",c="]",b="idBubble-",a="[";qx.Mixin.define(j,{events:{"changeBubble":g},members:{_applyEventPropagation:function(k,l,name){this.fireDataEvent(f,{value:k,name:name,old:l,item:this});this._registerEventChaining(k,l,name);}
,_registerEventChaining:function(m,n,name){if((m instanceof qx.core.Object)&&qx.Class.hasMixin(m.constructor,qx.data.marshal.MEventBubbling)){var o=qx.lang.Function.bind(this.__hH,this,name);var q=m.addListener(f,o,this);var p=m.getUserData(b+this.$$hash);if(p==null){p=[];m.setUserData(b+this.$$hash,p);}
;p.push(q);}
;if(n!=null&&n.getUserData&&n.getUserData(b+this.$$hash)!=null){var p=n.getUserData(b+this.$$hash);for(var i=0;i<p.length;i++){n.removeListenerById(p[i]);}
;n.setUserData(b+this.$$hash,null);}
;}
,__hH:function(name,e){var y=e.getData();var u=y.value;var s=y.old;if(qx.Class.hasInterface(e.getTarget().constructor,qx.data.IListData)){if(y.name.indexOf){var x=y.name.indexOf(d)!=-1?y.name.indexOf(d):y.name.length;var v=y.name.indexOf(a)!=-1?y.name.indexOf(a):y.name.length;if(v==0){var t=name+y.name;}
else if(x<v){var r=y.name.substring(0,x);var w=y.name.substring(x+1,y.name.length);if(w[0]!=a){w=d+w;}
;var t=name+a+r+c+w;}
else if(v<x){var r=y.name.substring(0,v);var w=y.name.substring(v,y.name.length);var t=name+a+r+c+w;}
else {var t=name+a+y.name+c;}
;;}
else {var t=name+a+y.name+c;}
;}
else {if(parseInt(name)==name&&name!==h){name=a+name+c;}
;var t=name+d+y.name;}
;this.fireDataEvent(f,{value:u,name:t,old:s,item:y.item||e.getTarget()});}
}});}
)();
(function(){var p="Boolean",o="qx.data.Array",n="Type of the parameter not supported!",m="number",l="changeLength",k="-",j="0",h="qx.event.type.Data",g="order",f="0-",c="remove",e="add",d="",b="change",a="changeBubble";qx.Class.define(o,{extend:qx.core.Object,include:qx.data.marshal.MEventBubbling,implement:[qx.data.IListData],construct:function(q){qx.core.Object.call(this);if(q==undefined){this.__hI=[];}
else if(arguments.length>1){this.__hI=[];for(var i=0;i<arguments.length;i++){this.__hI.push(arguments[i]);}
;}
else if(typeof q==m){this.__hI=new Array(q);}
else if(q instanceof Array){this.__hI=qx.lang.Array.clone(q);}
else {this.__hI=[];this.dispose();throw new Error(n);}
;;;for(var i=0;i<this.__hI.length;i++){this._applyEventPropagation(this.__hI[i],null,i);}
;this.__hJ();{}
;}
,properties:{autoDisposeItems:{check:p,init:false}},events:{"change":h,"changeLength":h},members:{__hI:null,concat:function(r){if(r){var s=this.__hI.concat(r);}
else {var s=this.__hI.concat();}
;return new qx.data.Array(s);}
,join:function(t){return this.__hI.join(t);}
,pop:function(){var u=this.__hI.pop();this.__hJ();this._registerEventChaining(null,u,this.length-1);this.fireDataEvent(a,{value:[],name:this.length+d,old:[u],item:this});this.fireDataEvent(b,{start:this.length-1,end:this.length-1,type:c,items:[u]},null);return u;}
,push:function(v){for(var i=0;i<arguments.length;i++){this.__hI.push(arguments[i]);this.__hJ();this._registerEventChaining(arguments[i],null,this.length-1);this.fireDataEvent(a,{value:[arguments[i]],name:(this.length-1)+d,old:[],item:this});this.fireDataEvent(b,{start:this.length-1,end:this.length-1,type:e,items:[arguments[i]]},null);}
;return this.length;}
,reverse:function(){if(this.length==0){return;}
;var w=this.__hI.concat();this.__hI.reverse();this.fireDataEvent(b,{start:0,end:this.length-1,type:g,items:null},null);this.fireDataEvent(a,{value:this.__hI,name:f+(this.__hI.length-1),old:w,item:this});}
,shift:function(){if(this.length==0){return;}
;var x=this.__hI.shift();this.__hJ();this._registerEventChaining(null,x,this.length-1);this.fireDataEvent(a,{value:[],name:j,old:[x],item:this});this.fireDataEvent(b,{start:0,end:this.length-1,type:c,items:[x]},null);return x;}
,slice:function(y,z){return new qx.data.Array(this.__hI.slice(y,z));}
,splice:function(A,B,C){var K=this.__hI.length;var G=this.__hI.splice.apply(this.__hI,arguments);if(this.__hI.length!=K){this.__hJ();}
;var I=B>0;var E=arguments.length>2;var F=null;if(I||E){if(this.__hI.length>K){var J=e;F=qx.lang.Array.fromArguments(arguments,2);}
else if(this.__hI.length<K){var J=c;F=G;}
else {var J=g;}
;this.fireDataEvent(b,{start:A,end:this.length-1,type:J,items:F},null);}
;for(var i=2;i<arguments.length;i++){this._registerEventChaining(arguments[i],null,A+i);}
;var H=[];for(var i=2;i<arguments.length;i++){H[i-2]=arguments[i];}
;var D=(A+Math.max(arguments.length-3,B-1));var name=A==D?D:A+k+D;this.fireDataEvent(a,{value:H,name:name+d,old:G,item:this});for(var i=0;i<G.length;i++){this._registerEventChaining(null,G[i],i);}
;return (new qx.data.Array(G));}
,sort:function(L){if(this.length==0){return;}
;var M=this.__hI.concat();this.__hI.sort.apply(this.__hI,arguments);if(qx.lang.Array.equals(this.__hI,M)===true){return;}
;this.fireDataEvent(b,{start:0,end:this.length-1,type:g,items:null},null);this.fireDataEvent(a,{value:this.__hI,name:f+(this.length-1),old:M,item:this});}
,unshift:function(N){for(var i=arguments.length-1;i>=0;i--){this.__hI.unshift(arguments[i]);this.__hJ();this._registerEventChaining(arguments[i],null,0);this.fireDataEvent(a,{value:[this.__hI[0]],name:j,old:[this.__hI[1]],item:this});this.fireDataEvent(b,{start:0,end:this.length-1,type:e,items:[arguments[i]]},null);}
;return this.length;}
,toArray:function(){return this.__hI;}
,getItem:function(O){return this.__hI[O];}
,setItem:function(P,Q){var R=this.__hI[P];if(R===Q){return;}
;this.__hI[P]=Q;this._registerEventChaining(Q,R,P);if(this.length!=this.__hI.length){this.__hJ();}
;this.fireDataEvent(a,{value:[Q],name:P+d,old:[R],item:this});this.fireDataEvent(b,{start:P,end:P,type:e,items:[Q]},null);}
,getLength:function(){return this.length;}
,indexOf:function(S){return this.__hI.indexOf(S);}
,toString:function(){if(this.__hI!=null){return this.__hI.toString();}
;return d;}
,contains:function(T){return this.__hI.indexOf(T)!==-1;}
,copy:function(){return this.concat();}
,insertAt:function(U,V){this.splice(U,0,V).dispose();}
,insertBefore:function(W,X){var Y=this.indexOf(W);if(Y==-1){this.push(X);}
else {this.splice(Y,0,X).dispose();}
;}
,insertAfter:function(ba,bb){var bc=this.indexOf(ba);if(bc==-1||bc==(this.length-1)){this.push(bb);}
else {this.splice(bc+1,0,bb).dispose();}
;}
,removeAt:function(bd){var bf=this.splice(bd,1);var be=bf.getItem(0);bf.dispose();return be;}
,removeAll:function(){for(var i=0;i<this.__hI.length;i++){this._registerEventChaining(null,this.__hI[i],i);}
;if(this.getLength()==0){return;}
;var bh=this.getLength();var bg=this.__hI.concat();this.__hI.length=0;this.__hJ();this.fireDataEvent(a,{value:[],name:f+(bh-1),old:bg,item:this});this.fireDataEvent(b,{start:0,end:bh-1,type:c,items:bg},null);return bg;}
,append:function(bi){if(bi instanceof qx.data.Array){bi=bi.toArray();}
;{}
;Array.prototype.push.apply(this.__hI,bi);for(var i=0;i<bi.length;i++){this._registerEventChaining(bi[i],null,this.__hI.length+i);}
;var bj=this.length;this.__hJ();var name=bj==(this.length-1)?bj:bj+k+(this.length-1);this.fireDataEvent(a,{value:bi,name:name+d,old:[],item:this});this.fireDataEvent(b,{start:bj,end:this.length-1,type:e,items:bi},null);}
,remove:function(bk){var bl=this.indexOf(bk);if(bl!=-1){this.splice(bl,1).dispose();return bk;}
;}
,equals:function(bm){if(this.length!==bm.length){return false;}
;for(var i=0;i<this.length;i++){if(this.getItem(i)!==bm.getItem(i)){return false;}
;}
;return true;}
,sum:function(){var bn=0;for(var i=0;i<this.length;i++){bn+=this.getItem(i);}
;return bn;}
,max:function(){var bo=this.getItem(0);for(var i=1;i<this.length;i++){if(this.getItem(i)>bo){bo=this.getItem(i);}
;}
;return bo===undefined?null:bo;}
,min:function(){var bp=this.getItem(0);for(var i=1;i<this.length;i++){if(this.getItem(i)<bp){bp=this.getItem(i);}
;}
;return bp===undefined?null:bp;}
,forEach:function(bq,br){for(var i=0;i<this.__hI.length;i++){bq.call(br,this.__hI[i],i,this);}
;}
,__hJ:function(){var bs=this.length;this.length=this.__hI.length;this.fireDataEvent(l,this.length,bs);}
},destruct:function(){for(var i=0;i<this.__hI.length;i++){var bt=this.__hI[i];this._applyEventPropagation(null,bt,i);if(this.isAutoDisposeItems()&&bt&&bt instanceof qx.core.Object){bt.dispose();}
;}
;this.__hI=null;}
});}
)();
(function(){var c="iartnorfolk.page.Share",b="iArtNorfolk: Share",a="List";qx.Class.define(c,{extend:iartnorfolk.page.iArtShell,construct:function(){iartnorfolk.page.iArtShell.call(this);}
,members:{_initialize:function(){iartnorfolk.page.iArtShell.prototype._initialize.call(this);this.__pageTitle.setValue(b);this.__hb=a;this.__shareButton.setValue(a);}
}});}
)();
(function(){var b="iArtNorfolk: Settings",a="iartnorfolk.page.Settings";qx.Class.define(a,{extend:iartnorfolk.page.iArtShell,construct:function(){iartnorfolk.page.iArtShell.call(this);}
,members:{_initialize:function(){iartnorfolk.page.iArtShell.prototype._initialize.call(this);this.__pageTitle.setValue(b);this.remove(this.__findMeButton);this.remove(this.__settingsButton);}
}});}
)();
(function(){var o='<span class="details_seperator"><span class="details_seperator_',m='_id',l='</span></span></li>',k='<div class="details_title">',j='<li>',h='geometry',g='">: </span></span>',f='<li><span class="details_header"><span class="details_header_Link">Link</span></span>',e='imgs',b='</span></a></span></span></span></li>',Q='<span class="details_seperator"><span class="details_seperator_Link">: </span></span>',P='<span class="details_header"><span class="details_header_',O='Image',N='Loading Detail...',M="back",L='title',K="noimage.png",J='<div class="details_wrapper">',I='"><span class="details_info_Link_text">',H='<div class="details_image"><img src="',v='">',w='Link',t='json',u="iartnorfolk.page.Detail",r='server-side failure with status code ',s='<span class="details_info"><span class="details_info_Link"><a href="',p='interalId',q='" /></div>',x='<span class="details_info"><span class="details_info_">',y='id',B='</span></span>',A="tap",D='_rev',C='<ul>',F='</div>',E='</ul>',z="Back",G='';qx.Class.define(u,{extend:iartnorfolk.page.iArtShell,construct:function(){iartnorfolk.page.iArtShell.call(this);}
,members:{_initialize:function(){iartnorfolk.page.iArtShell.prototype._initialize.call(this);var S=new qx.ui.mobile.navigationbar.BackButton(z);S.addListener(A,function(){this.fireDataEvent(M,z);}
,this);this.__navBar.addBefore(S,this.__mainButton,{flex:0});this.remove(this.__mainButton);document.detailHtmlBlob=new qx.ui.mobile.embed.Html();this.getContent().add(document.detailHtmlBlob);}
,_refreshDetail:function(T){document.detailHtmlBlob.setHtml(N);var V=document.mapPage._detailDataLoadUrl+T+G;var U=undefined;$.ajax({url:V,crossDomain:true,dataType:t,async:false,success:function(bb,bc,bd){U=bb;}
,error:function(be,status,bf){console.log(r+status);}
});if(U!=undefined){var W=U;document.mapMuralProperties(W.properties);var Y=k+W.properties.title+F;var X=G;if(W.properties.imgs.length>0){Y+=(W.properties.imgs[0]!=K)?H+W.properties.imgs[0]+q:G;}
;Y+=C;$.each(W.properties,function(i,n){if(n!=G&&i!=L&&i!=h&&i!=y&&i!=m&&i!=D&&i!=e&&i!=O&&i!=p&&i!=w){var bg=P+i+v+i+B;var bh=o+i+g;Y+=j+bg+bh+x+n+l;}
;}
);var ba=Q;Y+=f+ba+s+W.properties.Link+I+W.properties.title+b;Y+=G;Y+=E;Y+=C;Y+=X;Y+=E;Y=J+Y+F;document.detailHtmlBlob.setHtml(Y);}
;}
,_calcDistance:function(bi,bj){var R=6371;var bl=(bj[0]-bi[0]).toRad();var bk=(bj[1]-bi[1]).toRad();var a=Math.sin(bl/2)*Math.sin(bl/2)+Math.cos(bi[0].toRad())*Math.cos(bj[0].toRad())*Math.sin(bk/2)*Math.sin(bk/2);var c=2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));var d=R*c;return d;}
}});}
)();


qx.$$loader.init();

