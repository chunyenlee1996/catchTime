import{S as D,y as W,X as M,a0 as K,L as V,q as N,c as g,z as _,A as te,N as oe,O as le,r as R,I as ne,H as Q,V as ie,a1 as X,x as O,a2 as re,E as se,a3 as ae,a4 as Y,a5 as p,a6 as m,a7 as ue,a8 as ce}from"./index.c9889f0b.js";import{a as de,b as fe}from"./use-dark.882fafdf.js";function ge(){let e;const t=V();function o(){e=void 0}return D(o),W(o),{removeTick:o,registerTick(l){e=l,M(()=>{e===l&&(K(t)===!1&&e(),e=void 0)})}}}function Te(){let e=null;const t=V();function o(){e!==null&&(clearTimeout(e),e=null)}return D(o),W(o),{removeTimeout:o,registerTimeout(l,n){o(),K(t)===!1&&(e=setTimeout(l,n))}}}var qe=N({name:"QItemSection",props:{avatar:Boolean,thumbnail:Boolean,side:Boolean,top:Boolean,noWrap:Boolean},setup(e,{slots:t}){const o=g(()=>`q-item__section column q-item__section--${e.avatar===!0||e.side===!0||e.thumbnail===!0?"side":"main"}`+(e.top===!0?" q-item__section--top justify-start":" justify-center")+(e.avatar===!0?" q-item__section--avatar":"")+(e.thumbnail===!0?" q-item__section--thumbnail":"")+(e.noWrap===!0?" q-item__section--nowrap":""));return()=>_("div",{class:o.value},te(t.default))}}),Le=N({name:"QItem",props:{...de,...oe,tag:{type:String,default:"div"},active:{type:Boolean,default:null},clickable:Boolean,dense:Boolean,insetLevel:Number,tabindex:[String,Number],focused:Boolean,manualFocus:Boolean},emits:["click","keyup"],setup(e,{slots:t,emit:o}){const{proxy:{$q:l}}=V(),n=fe(e,l),{hasLink:u,linkAttrs:s,linkClass:a,linkTag:d,navigateOnClick:q}=le(),c=R(null),w=R(null),h=g(()=>e.clickable===!0||u.value===!0||e.tag==="label"),f=g(()=>e.disable!==!0&&h.value===!0),b=g(()=>"q-item q-item-type row no-wrap"+(e.dense===!0?" q-item--dense":"")+(n.value===!0?" q-item--dark":"")+(u.value===!0&&e.active===null?a.value:e.active===!0?` q-item--active${e.activeClass!==void 0?` ${e.activeClass}`:""}`:"")+(e.disable===!0?" disabled":"")+(f.value===!0?" q-item--clickable q-link cursor-pointer "+(e.manualFocus===!0?"q-manual-focusable":"q-focusable q-hoverable")+(e.focused===!0?" q-manual-focusable--focused":""):"")),L=g(()=>{if(e.insetLevel===void 0)return null;const r=l.lang.rtl===!0?"Right":"Left";return{["padding"+r]:16+e.insetLevel*56+"px"}});function S(r){f.value===!0&&(w.value!==null&&(r.qKeyEvent!==!0&&document.activeElement===c.value?w.value.focus():document.activeElement===w.value&&c.value.focus()),q(r))}function E(r){if(f.value===!0&&ne(r,13)===!0){Q(r),r.qKeyEvent=!0;const z=new MouseEvent("click",r);z.qKeyEvent=!0,c.value.dispatchEvent(z)}o("keyup",r)}function i(){const r=ie(t.default,[]);return f.value===!0&&r.unshift(_("div",{class:"q-focus-helper",tabindex:-1,ref:w})),r}return()=>{const r={ref:c,class:b.value,style:L.value,role:"listitem",onClick:S,onKeyup:E};return f.value===!0?(r.tabindex=e.tabindex||"0",Object.assign(r,s.value)):h.value===!0&&(r["aria-disabled"]="true"),_(d.value,r,i())}}});function Se(e,t,o){let l;function n(){l!==void 0&&(X.remove(l),l=void 0)}return W(()=>{e.value===!0&&n()}),{removeFromHistory:n,addToHistory(){l={condition:()=>o.value===!0,handler:t},X.add(l)}}}const Ee={modelValue:{type:Boolean,default:null},"onUpdate:modelValue":[Function,Array]},ke=["beforeShow","show","beforeHide","hide"];function xe({showing:e,canShow:t,hideOnRouteChange:o,handleShow:l,handleHide:n,processOnMount:u}){const s=V(),{props:a,emit:d,proxy:q}=s;let c;function w(i){e.value===!0?b(i):h(i)}function h(i){if(a.disable===!0||i!==void 0&&i.qAnchorHandled===!0||t!==void 0&&t(i)!==!0)return;const r=a["onUpdate:modelValue"]!==void 0;r===!0&&(d("update:modelValue",!0),c=i,M(()=>{c===i&&(c=void 0)})),(a.modelValue===null||r===!1)&&f(i)}function f(i){e.value!==!0&&(e.value=!0,d("beforeShow",i),l!==void 0?l(i):d("show",i))}function b(i){if(a.disable===!0)return;const r=a["onUpdate:modelValue"]!==void 0;r===!0&&(d("update:modelValue",!1),c=i,M(()=>{c===i&&(c=void 0)})),(a.modelValue===null||r===!1)&&L(i)}function L(i){e.value!==!1&&(e.value=!1,d("beforeHide",i),n!==void 0?n(i):d("hide",i))}function S(i){a.disable===!0&&i===!0?a["onUpdate:modelValue"]!==void 0&&d("update:modelValue",!1):i===!0!==e.value&&(i===!0?f:L)(c)}O(()=>a.modelValue,S),o!==void 0&&re(s)===!0&&O(()=>q.$route.fullPath,()=>{o.value===!0&&e.value===!0&&b()}),u===!0&&se(()=>{S(a.modelValue)});const E={show:h,hide:b,toggle:w};return Object.assign(q,E),E}const me=[null,document,document.body,document.scrollingElement,document.documentElement];function Ve(e,t){let o=ae(t);if(o===void 0){if(e==null)return window;o=e.closest(".scroll,.scroll-y,.overflow-auto")}return me.includes(o)?window:o}function G(e){return e===window?window.pageYOffset||window.scrollY||document.body.scrollTop||0:e.scrollTop}function J(e){return e===window?window.pageXOffset||window.scrollX||document.body.scrollLeft||0:e.scrollLeft}function Z(e,t,o=0){const l=arguments[3]===void 0?performance.now():arguments[3],n=G(e);if(o<=0){n!==t&&A(e,t);return}requestAnimationFrame(u=>{const s=u-l,a=n+(t-n)/Math.max(s,o)*s;A(e,a),a!==t&&Z(e,t,o-s,u)})}function ee(e,t,o=0){const l=arguments[3]===void 0?performance.now():arguments[3],n=J(e);if(o<=0){n!==t&&B(e,t);return}requestAnimationFrame(u=>{const s=u-l,a=n+(t-n)/Math.max(s,o)*s;B(e,a),a!==t&&ee(e,t,o-s,u)})}function A(e,t){if(e===window){window.scrollTo(window.pageXOffset||window.scrollX||document.body.scrollLeft||0,t);return}e.scrollTop=t}function B(e,t){if(e===window){window.scrollTo(t,window.pageYOffset||window.scrollY||document.body.scrollTop||0);return}e.scrollLeft=t}function Ce(e,t,o){if(o){Z(e,t,o);return}A(e,t)}function He(e,t,o){if(o){ee(e,t,o);return}B(e,t)}let k;function Pe(){if(k!==void 0)return k;const e=document.createElement("p"),t=document.createElement("div");Y(e,{width:"100%",height:"200px"}),Y(t,{position:"absolute",top:"0px",left:"0px",visibility:"hidden",width:"200px",height:"150px",overflow:"hidden"}),t.appendChild(e),document.body.appendChild(t);const o=e.offsetWidth;t.style.overflow="scroll";let l=e.offsetWidth;return o===l&&(l=t.clientWidth),t.remove(),k=o-l,k}function ve(e,t=!0){return!e||e.nodeType!==Node.ELEMENT_NODE?!1:t?e.scrollHeight>e.clientHeight&&(e.classList.contains("scroll")||e.classList.contains("overflow-auto")||["auto","scroll"].includes(window.getComputedStyle(e)["overflow-y"])):e.scrollWidth>e.clientWidth&&(e.classList.contains("scroll")||e.classList.contains("overflow-auto")||["auto","scroll"].includes(window.getComputedStyle(e)["overflow-x"]))}let y=0,C,H,T,P=!1,F,I,$,v=null;function we(e){pe(e)&&Q(e)}function pe(e){if(e.target===document.body||e.target.classList.contains("q-layout__backdrop"))return!0;const t=ue(e),o=e.shiftKey&&!e.deltaX,l=!o&&Math.abs(e.deltaX)<=Math.abs(e.deltaY),n=o||l?e.deltaY:e.deltaX;for(let u=0;u<t.length;u++){const s=t[u];if(ve(s,l))return l?n<0&&s.scrollTop===0?!0:n>0&&s.scrollTop+s.clientHeight===s.scrollHeight:n<0&&s.scrollLeft===0?!0:n>0&&s.scrollLeft+s.clientWidth===s.scrollWidth}return!0}function U(e){e.target===document&&(document.scrollingElement.scrollTop=document.scrollingElement.scrollTop)}function x(e){P!==!0&&(P=!0,requestAnimationFrame(()=>{P=!1;const{height:t}=e.target,{clientHeight:o,scrollTop:l}=document.scrollingElement;(T===void 0||t!==window.innerHeight)&&(T=o-t,document.scrollingElement.scrollTop=l),l>T&&(document.scrollingElement.scrollTop-=Math.ceil((l-T)/8))}))}function j(e){const t=document.body,o=window.visualViewport!==void 0;if(e==="add"){const{overflowY:l,overflowX:n}=window.getComputedStyle(t);C=J(window),H=G(window),F=t.style.left,I=t.style.top,$=window.location.href,t.style.left=`-${C}px`,t.style.top=`-${H}px`,n!=="hidden"&&(n==="scroll"||t.scrollWidth>window.innerWidth)&&t.classList.add("q-body--force-scrollbar-x"),l!=="hidden"&&(l==="scroll"||t.scrollHeight>window.innerHeight)&&t.classList.add("q-body--force-scrollbar-y"),t.classList.add("q-body--prevent-scroll"),document.qScrollPrevented=!0,p.is.ios===!0&&(o===!0?(window.scrollTo(0,0),window.visualViewport.addEventListener("resize",x,m.passiveCapture),window.visualViewport.addEventListener("scroll",x,m.passiveCapture),window.scrollTo(0,0)):window.addEventListener("scroll",U,m.passiveCapture))}p.is.desktop===!0&&p.is.mac===!0&&window[`${e}EventListener`]("wheel",we,m.notPassive),e==="remove"&&(p.is.ios===!0&&(o===!0?(window.visualViewport.removeEventListener("resize",x,m.passiveCapture),window.visualViewport.removeEventListener("scroll",x,m.passiveCapture)):window.removeEventListener("scroll",U,m.passiveCapture)),t.classList.remove("q-body--prevent-scroll"),t.classList.remove("q-body--force-scrollbar-x"),t.classList.remove("q-body--force-scrollbar-y"),document.qScrollPrevented=!1,t.style.left=F,t.style.top=I,window.location.href===$&&window.scrollTo(C,H),T=void 0)}function he(e){let t="add";if(e===!0){if(y++,v!==null){clearTimeout(v),v=null;return}if(y>1)return}else{if(y===0||(y--,y>0))return;if(t="remove",p.is.ios===!0&&p.is.nativeMobile===!0){v!==null&&clearTimeout(v),v=setTimeout(()=>{j(t),v=null},100);return}}j(t)}function Me(){let e;return{preventBodyScroll(t){t!==e&&(e!==void 0||t===!0)&&(e=t,he(t))}}}function _e(){if(window.getSelection!==void 0){const e=window.getSelection();e.empty!==void 0?e.empty():e.removeAllRanges!==void 0&&(e.removeAllRanges(),ce.is.mobile!==!0&&e.addRange(document.createRange()))}else document.selection!==void 0&&document.selection.empty()}function Ae(e,t,o){return o<=t?t:Math.min(o,Math.max(t,e))}function Be(e,t,o){if(o<=t)return t;const l=o-t+1;let n=t+(e-t)%l;return n<t&&(n=l+n),n===0?0:n}function We(e,t=2,o="0"){if(e==null)return e;const l=""+e;return l.length>=t?l:new Array(t-l.length+1).join(o)+l}export{Le as Q,qe as a,Te as b,Ee as c,ke as d,xe as e,Se as f,Ae as g,Me as h,Pe as i,_e as j,Ve as k,G as l,J as m,Be as n,He as o,We as p,Ce as s,ge as u};