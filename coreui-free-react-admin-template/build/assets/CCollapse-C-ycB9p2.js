import{R as E,r as C,_ as P,b as m,c as W,P as d}from"./index-y4xGgW4z.js";import{_ as j,g as V,h as D,T as F,u as q}from"./DefaultLayout-BSwlQHNQ.js";function N(){return N=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var l=arguments[t];for(var s in l)Object.prototype.hasOwnProperty.call(l,s)&&(e[s]=l[s])}return e},N.apply(this,arguments)}function B(e,t){return e.classList?!!t&&e.classList.contains(t):(" "+(e.className.baseVal||e.className)+" ").indexOf(" "+t+" ")!==-1}function G(e,t){e.classList?e.classList.add(t):B(e,t)||(typeof e.className=="string"?e.className=e.className+" "+t:e.setAttribute("class",(e.className&&e.className.baseVal||"")+" "+t))}function S(e,t){return e.replace(new RegExp("(^|\\s)"+t+"(?:\\s|$)","g"),"$1").replace(/\s+/g," ").replace(/^\s*|\s*$/g,"")}function I(e,t){e.classList?e.classList.remove(t):typeof e.className=="string"?e.className=S(e.className,t):e.setAttribute("class",S(e.className&&e.className.baseVal||"",t))}var J=function(t,l){return t&&l&&l.split(" ").forEach(function(s){return G(t,s)})},x=function(t,l){return t&&l&&l.split(" ").forEach(function(s){return I(t,s)})},$=function(e){j(t,e);function t(){for(var s,i=arguments.length,c=new Array(i),o=0;o<i;o++)c[o]=arguments[o];return s=e.call.apply(e,[this].concat(c))||this,s.appliedClasses={appear:{},enter:{},exit:{}},s.onEnter=function(n,a){var r=s.resolveArguments(n,a),u=r[0],p=r[1];s.removeClasses(u,"exit"),s.addClass(u,p?"appear":"enter","base"),s.props.onEnter&&s.props.onEnter(n,a)},s.onEntering=function(n,a){var r=s.resolveArguments(n,a),u=r[0],p=r[1],f=p?"appear":"enter";s.addClass(u,f,"active"),s.props.onEntering&&s.props.onEntering(n,a)},s.onEntered=function(n,a){var r=s.resolveArguments(n,a),u=r[0],p=r[1],f=p?"appear":"enter";s.removeClasses(u,f),s.addClass(u,f,"done"),s.props.onEntered&&s.props.onEntered(n,a)},s.onExit=function(n){var a=s.resolveArguments(n),r=a[0];s.removeClasses(r,"appear"),s.removeClasses(r,"enter"),s.addClass(r,"exit","base"),s.props.onExit&&s.props.onExit(n)},s.onExiting=function(n){var a=s.resolveArguments(n),r=a[0];s.addClass(r,"exit","active"),s.props.onExiting&&s.props.onExiting(n)},s.onExited=function(n){var a=s.resolveArguments(n),r=a[0];s.removeClasses(r,"exit"),s.addClass(r,"exit","done"),s.props.onExited&&s.props.onExited(n)},s.resolveArguments=function(n,a){return s.props.nodeRef?[s.props.nodeRef.current,n]:[n,a]},s.getClassNames=function(n){var a=s.props.classNames,r=typeof a=="string",u=r&&a?a+"-":"",p=r?""+u+n:a[n],f=r?p+"-active":a[n+"Active"],v=r?p+"-done":a[n+"Done"];return{baseClassName:p,activeClassName:f,doneClassName:v}},s}var l=t.prototype;return l.addClass=function(i,c,o){var n=this.getClassNames(c)[o+"ClassName"],a=this.getClassNames("enter"),r=a.doneClassName;c==="appear"&&o==="done"&&r&&(n+=" "+r),o==="active"&&i&&V(i),n&&(this.appliedClasses[c][o]=n,J(i,n))},l.removeClasses=function(i,c){var o=this.appliedClasses[c],n=o.base,a=o.active,r=o.done;this.appliedClasses[c]={},n&&x(i,n),a&&x(i,a),r&&x(i,r)},l.render=function(){var i=this.props;i.classNames;var c=D(i,["classNames"]);return E.createElement(F,N({},c,{onEnter:this.onEnter,onEntered:this.onEntered,onEntering:this.onEntering,onExit:this.onExit,onExiting:this.onExiting,onExited:this.onExited}))},t}(E.Component);$.defaultProps={classNames:""};$.propTypes={};var K=$,w=C.forwardRef(function(e,t){var l=e.children,s=e.className,i=e.horizontal,c=e.onHide,o=e.onShow,n=e.visible,a=P(e,["children","className","horizontal","onHide","onShow","visible"]),r=C.useRef(null),u=q(t,r),p=C.useState(),f=p[0],v=p[1],A=C.useState(),b=A[0],h=A[1],_=function(){if(o&&o(),i){r.current&&h(r.current.scrollWidth);return}r.current&&v(r.current.scrollHeight)},R=function(){if(i){h(0);return}v(0)},H=function(){if(i){r.current&&h(r.current.scrollWidth);return}r.current&&v(r.current.scrollHeight)},L=function(){if(c&&c(),i){h(0);return}v(0)},T=function(){if(i){h(0);return}v(0)};return E.createElement(K,{in:n,nodeRef:r,onEntering:_,onEntered:R,onExit:H,onExiting:L,onExited:T,timeout:350},function(g){var z=f===0?null:{height:f},O=b===0?null:{width:b};return E.createElement("div",m({className:W(s,{"collapse-horizontal":i,collapsing:g==="entering"||g==="exiting","collapse show":g==="entered",collapse:g==="exited"}),style:m(m({},z),O)},a,{ref:u}),l)})});w.propTypes={children:d.node,className:d.string,horizontal:d.bool,onHide:d.func,onShow:d.func,visible:d.bool};w.displayName="CCollapse";export{w as C};
