/*! For license information please see 3f1fa2ca.0d8d91c4.js.LICENSE.txt */
"use strict";(self.webpackChunkbackstage_microsite=self.webpackChunkbackstage_microsite||[]).push([[969928],{628489:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>i,contentTitle:()=>u,default:()=>f,frontMatter:()=>o,metadata:()=>c,toc:()=>s});var t=r(824246),a=r(511151);const o={id:"backend-plugin-manager.dynamicpluginmanager.backendplugins",title:"DynamicPluginManager.backendPlugins()",description:"API reference for DynamicPluginManager.backendPlugins()"},u=void 0,c={id:"reference/backend-plugin-manager.dynamicpluginmanager.backendplugins",title:"DynamicPluginManager.backendPlugins()",description:"API reference for DynamicPluginManager.backendPlugins()",source:"@site/../docs/reference/backend-plugin-manager.dynamicpluginmanager.backendplugins.md",sourceDirName:"reference",slug:"/reference/backend-plugin-manager.dynamicpluginmanager.backendplugins",permalink:"/docs/reference/backend-plugin-manager.dynamicpluginmanager.backendplugins",draft:!1,unlisted:!1,editUrl:"https://github.com/backstage/backstage/edit/master/docs/../docs/reference/backend-plugin-manager.dynamicpluginmanager.backendplugins.md",tags:[],version:"current",frontMatter:{id:"backend-plugin-manager.dynamicpluginmanager.backendplugins",title:"DynamicPluginManager.backendPlugins()",description:"API reference for DynamicPluginManager.backendPlugins()"}},i={},s=[];function l(e){const n=Object.assign({p:"p",a:"a",code:"code",strong:"strong",pre:"pre"},(0,a.ah)(),e.components);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.a,{href:"/docs/reference/",children:"Home"})," > ",(0,t.jsx)(n.a,{href:"/docs/reference/backend-plugin-manager",children:(0,t.jsx)(n.code,{children:"@backstage/backend-plugin-manager"})})," > ",(0,t.jsx)(n.a,{href:"/docs/reference/backend-plugin-manager.dynamicpluginmanager",children:(0,t.jsx)(n.code,{children:"DynamicPluginManager"})})," > ",(0,t.jsx)(n.a,{href:"/docs/reference/backend-plugin-manager.dynamicpluginmanager.backendplugins",children:(0,t.jsx)(n.code,{children:"backendPlugins"})})]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Signature:"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:"backendPlugins(): BackendDynamicPlugin[];\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Returns:"})}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.a,{href:"/docs/reference/backend-plugin-manager.backenddynamicplugin",children:"BackendDynamicPlugin"}),"[]"]})]})}const f=function(e={}){const{wrapper:n}=Object.assign({},(0,a.ah)(),e.components);return n?(0,t.jsx)(n,Object.assign({},e,{children:(0,t.jsx)(l,e)})):l(e)}},371426:(e,n,r)=>{var t=r(827378),a=Symbol.for("react.element"),o=Symbol.for("react.fragment"),u=Object.prototype.hasOwnProperty,c=t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,i={key:!0,ref:!0,__self:!0,__source:!0};function s(e,n,r){var t,o={},s=null,l=null;for(t in void 0!==r&&(s=""+r),void 0!==n.key&&(s=""+n.key),void 0!==n.ref&&(l=n.ref),n)u.call(n,t)&&!i.hasOwnProperty(t)&&(o[t]=n[t]);if(e&&e.defaultProps)for(t in n=e.defaultProps)void 0===o[t]&&(o[t]=n[t]);return{$$typeof:a,type:e,key:s,ref:l,props:o,_owner:c.current}}n.Fragment=o,n.jsx=s,n.jsxs=s},541535:(e,n)=>{var r=Symbol.for("react.element"),t=Symbol.for("react.portal"),a=Symbol.for("react.fragment"),o=Symbol.for("react.strict_mode"),u=Symbol.for("react.profiler"),c=Symbol.for("react.provider"),i=Symbol.for("react.context"),s=Symbol.for("react.forward_ref"),l=Symbol.for("react.suspense"),f=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),d=Symbol.iterator;var y={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},g=Object.assign,m={};function b(e,n,r){this.props=e,this.context=n,this.refs=m,this.updater=r||y}function h(){}function _(e,n,r){this.props=e,this.context=n,this.refs=m,this.updater=r||y}b.prototype.isReactComponent={},b.prototype.setState=function(e,n){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,n,"setState")},b.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},h.prototype=b.prototype;var k=_.prototype=new h;k.constructor=_,g(k,b.prototype),k.isPureReactComponent=!0;var v=Array.isArray,j=Object.prototype.hasOwnProperty,S={current:null},P={key:!0,ref:!0,__self:!0,__source:!0};function x(e,n,t){var a,o={},u=null,c=null;if(null!=n)for(a in void 0!==n.ref&&(c=n.ref),void 0!==n.key&&(u=""+n.key),n)j.call(n,a)&&!P.hasOwnProperty(a)&&(o[a]=n[a]);var i=arguments.length-2;if(1===i)o.children=t;else if(1<i){for(var s=Array(i),l=0;l<i;l++)s[l]=arguments[l+2];o.children=s}if(e&&e.defaultProps)for(a in i=e.defaultProps)void 0===o[a]&&(o[a]=i[a]);return{$$typeof:r,type:e,key:u,ref:c,props:o,_owner:S.current}}function E(e){return"object"==typeof e&&null!==e&&e.$$typeof===r}var w=/\/+/g;function R(e,n){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var n={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return n[e]}))}(""+e.key):n.toString(36)}function C(e,n,a,o,u){var c=typeof e;"undefined"!==c&&"boolean"!==c||(e=null);var i=!1;if(null===e)i=!0;else switch(c){case"string":case"number":i=!0;break;case"object":switch(e.$$typeof){case r:case t:i=!0}}if(i)return u=u(i=e),e=""===o?"."+R(i,0):o,v(u)?(a="",null!=e&&(a=e.replace(w,"$&/")+"/"),C(u,n,a,"",(function(e){return e}))):null!=u&&(E(u)&&(u=function(e,n){return{$$typeof:r,type:e.type,key:n,ref:e.ref,props:e.props,_owner:e._owner}}(u,a+(!u.key||i&&i.key===u.key?"":(""+u.key).replace(w,"$&/")+"/")+e)),n.push(u)),1;if(i=0,o=""===o?".":o+":",v(e))for(var s=0;s<e.length;s++){var l=o+R(c=e[s],s);i+=C(c,n,a,l,u)}else if(l=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=d&&e[d]||e["@@iterator"])?e:null}(e),"function"==typeof l)for(e=l.call(e),s=0;!(c=e.next()).done;)i+=C(c=c.value,n,a,l=o+R(c,s++),u);else if("object"===c)throw n=String(e),Error("Objects are not valid as a React child (found: "+("[object Object]"===n?"object with keys {"+Object.keys(e).join(", ")+"}":n)+"). If you meant to render a collection of children, use an array instead.");return i}function $(e,n,r){if(null==e)return e;var t=[],a=0;return C(e,t,"","",(function(e){return n.call(r,e,a++)})),t}function O(e){if(-1===e._status){var n=e._result;(n=n()).then((function(n){0!==e._status&&-1!==e._status||(e._status=1,e._result=n)}),(function(n){0!==e._status&&-1!==e._status||(e._status=2,e._result=n)})),-1===e._status&&(e._status=0,e._result=n)}if(1===e._status)return e._result.default;throw e._result}var D={current:null},I={transition:null},M={ReactCurrentDispatcher:D,ReactCurrentBatchConfig:I,ReactCurrentOwner:S};n.Children={map:$,forEach:function(e,n,r){$(e,(function(){n.apply(this,arguments)}),r)},count:function(e){var n=0;return $(e,(function(){n++})),n},toArray:function(e){return $(e,(function(e){return e}))||[]},only:function(e){if(!E(e))throw Error("React.Children.only expected to receive a single React element child.");return e}},n.Component=b,n.Fragment=a,n.Profiler=u,n.PureComponent=_,n.StrictMode=o,n.Suspense=l,n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=M,n.cloneElement=function(e,n,t){if(null==e)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var a=g({},e.props),o=e.key,u=e.ref,c=e._owner;if(null!=n){if(void 0!==n.ref&&(u=n.ref,c=S.current),void 0!==n.key&&(o=""+n.key),e.type&&e.type.defaultProps)var i=e.type.defaultProps;for(s in n)j.call(n,s)&&!P.hasOwnProperty(s)&&(a[s]=void 0===n[s]&&void 0!==i?i[s]:n[s])}var s=arguments.length-2;if(1===s)a.children=t;else if(1<s){i=Array(s);for(var l=0;l<s;l++)i[l]=arguments[l+2];a.children=i}return{$$typeof:r,type:e.type,key:o,ref:u,props:a,_owner:c}},n.createContext=function(e){return(e={$$typeof:i,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null}).Provider={$$typeof:c,_context:e},e.Consumer=e},n.createElement=x,n.createFactory=function(e){var n=x.bind(null,e);return n.type=e,n},n.createRef=function(){return{current:null}},n.forwardRef=function(e){return{$$typeof:s,render:e}},n.isValidElement=E,n.lazy=function(e){return{$$typeof:p,_payload:{_status:-1,_result:e},_init:O}},n.memo=function(e,n){return{$$typeof:f,type:e,compare:void 0===n?null:n}},n.startTransition=function(e){var n=I.transition;I.transition={};try{e()}finally{I.transition=n}},n.unstable_act=function(){throw Error("act(...) is not supported in production builds of React.")},n.useCallback=function(e,n){return D.current.useCallback(e,n)},n.useContext=function(e){return D.current.useContext(e)},n.useDebugValue=function(){},n.useDeferredValue=function(e){return D.current.useDeferredValue(e)},n.useEffect=function(e,n){return D.current.useEffect(e,n)},n.useId=function(){return D.current.useId()},n.useImperativeHandle=function(e,n,r){return D.current.useImperativeHandle(e,n,r)},n.useInsertionEffect=function(e,n){return D.current.useInsertionEffect(e,n)},n.useLayoutEffect=function(e,n){return D.current.useLayoutEffect(e,n)},n.useMemo=function(e,n){return D.current.useMemo(e,n)},n.useReducer=function(e,n,r){return D.current.useReducer(e,n,r)},n.useRef=function(e){return D.current.useRef(e)},n.useState=function(e){return D.current.useState(e)},n.useSyncExternalStore=function(e,n,r){return D.current.useSyncExternalStore(e,n,r)},n.useTransition=function(){return D.current.useTransition()},n.version="18.2.0"},827378:(e,n,r)=>{e.exports=r(541535)},824246:(e,n,r)=>{e.exports=r(371426)},511151:(e,n,r)=>{r.d(n,{Zo:()=>c,ah:()=>o});var t=r(667294);const a=t.createContext({});function o(e){const n=t.useContext(a);return t.useMemo((()=>"function"==typeof e?e(n):{...n,...e}),[n,e])}const u={};function c({components:e,children:n,disableParentContext:r}){let c;return c=r?"function"==typeof e?e({}):e||u:o(e),t.createElement(a.Provider,{value:c},n)}}}]);