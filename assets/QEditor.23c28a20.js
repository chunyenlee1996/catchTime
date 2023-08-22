import{a1 as ze,q as W,c as v,z as c,A as K,aG as me,r as L,x as N,E as pe,m as ve,f as _,L as ie,aH as Oe,a9 as ye,y as ne,ab as ae,a6 as re,T as He,H as be,J as we,a8 as se,X as Le}from"./index.3bc77ca5.js";import{Q as Ee,u as $e,v as ue,b as Ae,c as _e,d as Ne,r as ce,s as Re,p as de,e as De}from"./QMenu.9cc80aff.js";import{u as ke,a as je,b as Fe}from"./QDialog.6e19ce62.js";import{u as Me}from"./uid.42677368.js";import{b as Ie,c as Qe,u as Ue,a as We,d as Ke,i as fe,j as Ge}from"./format.079d6594.js";import{a as he,Q as Xe}from"./QItem.62e2cac4.js";import{u as Je,a as Ye}from"./use-dark.a295ce0c.js";import{u as Ze,a as Ve,b as et}from"./use-fullscreen.0d757ae0.js";import{i as tt}from"./QForm.23cf33ad.js";import{a as ot}from"./focus-manager.05708ea9.js";function Se(e,t){if(t&&e===t)return null;const o=e.nodeName.toLowerCase();if(["div","li","ul","ol","blockquote"].includes(o)===!0)return e;const l=window.getComputedStyle?window.getComputedStyle(e):e.currentStyle,a=l.display;return a==="block"||a==="table"?e:Se(e.parentNode)}function te(e,t,o){return!e||e===document.body?!1:o===!0&&e===t||(t===document?document.body:t).contains(e.parentNode)}function Ce(e,t,o){if(o||(o=document.createRange(),o.selectNode(e),o.setStart(e,0)),t.count===0)o.setEnd(e,t.count);else if(t.count>0)if(e.nodeType===Node.TEXT_NODE)e.textContent.length<t.count?t.count-=e.textContent.length:(o.setEnd(e,t.count),t.count=0);else for(let l=0;t.count!==0&&l<e.childNodes.length;l++)o=Ce(e.childNodes[l],t,o);return o}const nt=/^https?:\/\//;class it{constructor(t,o){this.el=t,this.eVm=o,this._range=null}get selection(){if(this.el){const t=document.getSelection();if(te(t.anchorNode,this.el,!0)&&te(t.focusNode,this.el,!0))return t}return null}get hasSelection(){return this.selection!==null?this.selection.toString().length!==0:!1}get range(){const t=this.selection;return t!==null&&t.rangeCount?t.getRangeAt(0):this._range}get parent(){const t=this.range;if(t!==null){const o=t.startContainer;return o.nodeType===document.ELEMENT_NODE?o:o.parentNode}return null}get blockParent(){const t=this.parent;return t!==null?Se(t,this.el):null}save(t=this.range){t!==null&&(this._range=t)}restore(t=this._range){const o=document.createRange(),l=document.getSelection();t!==null?(o.setStart(t.startContainer,t.startOffset),o.setEnd(t.endContainer,t.endOffset),l.removeAllRanges(),l.addRange(o)):(l.selectAllChildren(this.el),l.collapseToEnd())}savePosition(){let t=-1,o;const l=document.getSelection(),a=this.el.parentNode;if(l.focusNode&&te(l.focusNode,a))for(o=l.focusNode,t=l.focusOffset;o&&o!==a;)o!==this.el&&o.previousSibling?(o=o.previousSibling,t+=o.textContent.length):o=o.parentNode;this.savedPos=t}restorePosition(t=0){if(this.savedPos>0&&this.savedPos<t){const o=window.getSelection(),l=Ce(this.el,{count:this.savedPos});l&&(l.collapse(!1),o.removeAllRanges(),o.addRange(l))}}hasParent(t,o){const l=o?this.parent:this.blockParent;return l!==null?l.nodeName.toLowerCase()===t.toLowerCase():!1}hasParents(t,o,l=this.parent){return l===null?!1:t.includes(l.nodeName.toLowerCase())===!0?!0:o===!0?this.hasParents(t,o,l.parentNode):!1}is(t,o){if(this.selection===null)return!1;switch(t){case"formatBlock":return o==="DIV"&&this.parent===this.el||this.hasParent(o,o==="PRE");case"link":return this.hasParent("A",!0);case"fontSize":return document.queryCommandValue(t)===o;case"fontName":const l=document.queryCommandValue(t);return l===`"${o}"`||l===o;case"fullscreen":return this.eVm.inFullscreen.value;case"viewsource":return this.eVm.isViewingSource.value;case void 0:return!1;default:const a=document.queryCommandState(t);return o!==void 0?a===o:a}}getParentAttribute(t){return this.parent!==null?this.parent.getAttribute(t):null}can(t){if(t==="outdent")return this.hasParents(["blockquote","li"],!0);if(t==="indent")return this.hasParents(["li"],!0);if(t==="link")return this.selection!==null||this.is("link")}apply(t,o,l=ze){if(t==="formatBlock")["BLOCKQUOTE","H1","H2","H3","H4","H5","H6"].includes(o)&&this.is(t,o)&&(t="outdent",o=null),o==="PRE"&&this.is(t,"PRE")&&(o="P");else if(t==="print"){l();const a=window.open();a.document.write(`
        <!doctype html>
        <html>
          <head>
            <title>Print - ${document.title}</title>
          </head>
          <body>
            <div>${this.el.innerHTML}</div>
          </body>
        </html>
      `),a.print(),a.close();return}else if(t==="link"){const a=this.getParentAttribute("href");if(a===null){const s=this.selectWord(this.selection),r=s?s.toString():"";if(!r.length&&(!this.range||!this.range.cloneContents().querySelector("img")))return;this.eVm.editLinkUrl.value=nt.test(r)?r:"https://",document.execCommand("createLink",!1,this.eVm.editLinkUrl.value),this.save(s.getRangeAt(0))}else this.eVm.editLinkUrl.value=a,this.range.selectNodeContents(this.parent),this.save();return}else if(t==="fullscreen"){this.eVm.toggleFullscreen(),l();return}else if(t==="viewsource"){this.eVm.isViewingSource.value=this.eVm.isViewingSource.value===!1,this.eVm.setContent(this.eVm.props.modelValue),l();return}document.execCommand(t,!1,o),l()}selectWord(t){if(t===null||t.isCollapsed!==!0||t.modify===void 0)return t;const o=document.createRange();o.setStart(t.anchorNode,t.anchorOffset),o.setEnd(t.focusNode,t.focusOffset);const l=o.collapsed?["backward","forward"]:["forward","backward"];o.detach();const a=t.focusNode,s=t.focusOffset;return t.collapse(t.anchorNode,t.anchorOffset),t.modify("move",l[0],"character"),t.modify("move",l[1],"word"),t.extend(a,s),t.modify("extend",l[1],"character"),t.modify("extend",l[0],"word"),t}}var lt=W({name:"QBtnGroup",props:{unelevated:Boolean,outline:Boolean,flat:Boolean,rounded:Boolean,square:Boolean,push:Boolean,stretch:Boolean,glossy:Boolean,spread:Boolean},setup(e,{slots:t}){const o=v(()=>{const l=["unelevated","outline","flat","rounded","square","push","stretch","glossy"].filter(a=>e[a]===!0).map(a=>`q-btn-group--${a}`).join(" ");return`q-btn-group row no-wrap${l.length!==0?" "+l:""}`+(e.spread===!0?" q-btn-group--spread":" inline")});return()=>c("div",{class:o.value},K(t.default))}});const at=Object.keys(me),rt=e=>at.reduce((t,o)=>{const l=e[o];return l!==void 0&&(t[o]=l),t},{});var st=W({name:"QBtnDropdown",props:{...me,...ke,modelValue:Boolean,split:Boolean,dropdownIcon:String,contentClass:[Array,String,Object],contentStyle:[Array,String,Object],cover:Boolean,persistent:Boolean,noRouteDismiss:Boolean,autoClose:Boolean,menuAnchor:{type:String,default:"bottom end"},menuSelf:{type:String,default:"top end"},menuOffset:Array,disableMainBtn:Boolean,disableDropdown:Boolean,noIconAnimation:Boolean,toggleAriaLabel:String},emits:["update:modelValue","click","beforeShow","show","beforeHide","hide"],setup(e,{slots:t,emit:o}){const{proxy:l}=ie(),a=L(e.modelValue),s=L(null),r=Me(),d=v(()=>{const u={"aria-expanded":a.value===!0?"true":"false","aria-haspopup":"true","aria-controls":r,"aria-label":e.toggleAriaLabel||l.$q.lang.label[a.value===!0?"collapse":"expand"](e.label)};return(e.disable===!0||e.split===!1&&e.disableMainBtn===!0||e.disableDropdown===!0)&&(u["aria-disabled"]="true"),u}),p=v(()=>"q-btn-dropdown__arrow"+(a.value===!0&&e.noIconAnimation===!1?" rotate-180":"")+(e.split===!1?" q-btn-dropdown__arrow-container":"")),S=v(()=>Oe(e)),h=v(()=>rt(e));N(()=>e.modelValue,u=>{s.value!==null&&s.value[u?"show":"hide"]()}),N(()=>e.split,z);function T(u){a.value=!0,o("beforeShow",u)}function m(u){o("show",u),o("update:modelValue",!0)}function g(u){a.value=!1,o("beforeHide",u)}function q(u){o("hide",u),o("update:modelValue",!1)}function B(u){o("click",u)}function H(u){ye(u),z(),o("click",u)}function P(u){s.value!==null&&s.value.toggle(u)}function x(u){s.value!==null&&s.value.show(u)}function z(u){s.value!==null&&s.value.hide(u)}return Object.assign(l,{show:x,hide:z,toggle:P}),pe(()=>{e.modelValue===!0&&x()}),()=>{const u=[c(ve,{class:p.value,name:e.dropdownIcon||l.$q.iconSet.arrow.dropdown})];return e.disableDropdown!==!0&&u.push(c(Ee,{ref:s,id:r,class:e.contentClass,style:e.contentStyle,cover:e.cover,fit:!0,persistent:e.persistent,noRouteDismiss:e.noRouteDismiss,autoClose:e.autoClose,anchor:e.menuAnchor,self:e.menuSelf,offset:e.menuOffset,separateClosePopup:!0,transitionShow:e.transitionShow,transitionHide:e.transitionHide,transitionDuration:e.transitionDuration,onBeforeShow:T,onShow:m,onBeforeHide:g,onHide:q},t.default)),e.split===!1?c(_,{class:"q-btn-dropdown q-btn-dropdown--simple",...h.value,...d.value,disable:e.disable===!0||e.disableMainBtn===!0,noWrap:!0,round:!1,onClick:B},{default:()=>K(t.label,[]).concat(u),loading:t.loading}):c(lt,{class:"q-btn-dropdown q-btn-dropdown--split no-wrap q-btn-item",rounded:e.rounded,square:e.square,...S.value,glossy:e.glossy,stretch:e.stretch},()=>[c(_,{class:"q-btn-dropdown--current",...h.value,disable:e.disable===!0||e.disableMainBtn===!0,noWrap:!0,round:!1,onClick:H},{default:t.label,loading:t.loading}),c(_,{class:"q-btn-dropdown__arrow-container q-anchor--skip",...d.value,...S.value,disable:e.disable===!0||e.disableDropdown===!0,rounded:e.rounded,color:e.color,textColor:e.textColor,dense:e.dense,size:e.size,padding:e.padding,ripple:e.ripple},()=>u)])}}}),ut=W({name:"QTooltip",inheritAttrs:!1,props:{...$e,...Ie,...ke,maxHeight:{type:String,default:null},maxWidth:{type:String,default:null},transitionShow:{default:"jump-down"},transitionHide:{default:"jump-up"},anchor:{type:String,default:"bottom middle",validator:ue},self:{type:String,default:"top middle",validator:ue},offset:{type:Array,default:()=>[14,14],validator:Ae},scrollTarget:{default:void 0},delay:{type:Number,default:0},hideDelay:{type:Number,default:0}},emits:[...Qe],setup(e,{slots:t,emit:o,attrs:l}){let a,s;const r=ie(),{proxy:{$q:d}}=r,p=L(null),S=L(!1),h=v(()=>de(e.anchor,d.lang.rtl)),T=v(()=>de(e.self,d.lang.rtl)),m=v(()=>e.persistent!==!0),{registerTick:g,removeTick:q}=Ue(),{registerTimeout:B}=We(),{transitionProps:H,transitionStyle:P}=je(e),{localScrollTarget:x,changeScrollEvent:z,unconfigureScrollTarget:u}=_e(e,I),{anchorEl:C,canShow:D,anchorEvents:y}=Ne({showing:S,configureAnchorEl:ee}),{show:G,hide:R}=Ke({showing:S,canShow:D,handleShow:J,handleHide:Y,hideOnRouteChange:m,processOnMount:!0});Object.assign(y,{delayShow:Z,delayHide:V});const{showPortal:j,hidePortal:F,renderPortal:X}=Fe(r,p,U,"tooltip");if(d.platform.is.mobile===!0){const b={anchorEl:C,innerRef:p,onClickOutside(k){return R(k),k.target.classList.contains("q-dialog__backdrop")&&be(k),!0}},$=v(()=>e.modelValue===null&&e.persistent!==!0&&S.value===!0);N($,k=>{(k===!0?De:ce)(b)}),ne(()=>{ce(b)})}function J(b){j(),g(()=>{s=new MutationObserver(()=>E()),s.observe(p.value,{attributes:!1,childList:!0,characterData:!0,subtree:!0}),E(),I()}),a===void 0&&(a=N(()=>d.screen.width+"|"+d.screen.height+"|"+e.self+"|"+e.anchor+"|"+d.lang.rtl,E)),B(()=>{j(!0),o("show",b)},e.transitionDuration)}function Y(b){q(),F(),M(),B(()=>{F(!0),o("hide",b)},e.transitionDuration)}function M(){s!==void 0&&(s.disconnect(),s=void 0),a!==void 0&&(a(),a=void 0),u(),ae(y,"tooltipTemp")}function E(){Re({targetEl:p.value,offset:e.offset,anchorEl:C.value,anchorOrigin:h.value,selfOrigin:T.value,maxHeight:e.maxHeight,maxWidth:e.maxWidth})}function Z(b){if(d.platform.is.mobile===!0){fe(),document.body.classList.add("non-selectable");const $=C.value,k=["touchmove","touchcancel","touchend","click"].map(A=>[$,A,"delayHide","passiveCapture"]);re(y,"tooltipTemp",k)}B(()=>{G(b)},e.delay)}function V(b){d.platform.is.mobile===!0&&(ae(y,"tooltipTemp"),fe(),setTimeout(()=>{document.body.classList.remove("non-selectable")},10)),B(()=>{R(b)},e.hideDelay)}function ee(){if(e.noParentEvent===!0||C.value===null)return;const b=d.platform.is.mobile===!0?[[C.value,"touchstart","delayShow","passive"]]:[[C.value,"mouseenter","delayShow","passive"],[C.value,"mouseleave","delayHide","passive"]];re(y,"anchor",b)}function I(){if(C.value!==null||e.scrollTarget!==void 0){x.value=Ge(C.value,e.scrollTarget);const b=e.noParentEvent===!0?E:R;z(x.value,b)}}function Q(){return S.value===!0?c("div",{...l,ref:p,class:["q-tooltip q-tooltip--style q-position-engine no-pointer-events",l.class],style:[l.style,P.value],role:"tooltip"},K(t.default)):null}function U(){return c(He,H.value,Q)}return ne(M),Object.assign(r.proxy,{updatePosition:E}),X}});function Te(e,t,o){t.handler?t.handler(e,o,o.caret):o.runCmd(t.cmd,t.param)}function le(e){return c("div",{class:"q-editor__toolbar-group"},e)}function Be(e,t,o,l=!1){const a=l||(t.type==="toggle"?t.toggled?t.toggled(e):t.cmd&&e.caret.is(t.cmd,t.param):!1),s=[];if(t.tip&&e.$q.platform.is.desktop){const r=t.key?c("div",[c("small",`(CTRL + ${String.fromCharCode(t.key)})`)]):null;s.push(c(ut,{delay:1e3},()=>[c("div",{innerHTML:t.tip}),r]))}return c(_,{...e.buttonProps.value,icon:t.icon!==null?t.icon:void 0,color:a?t.toggleColor||e.props.toolbarToggleColor:t.color||e.props.toolbarColor,textColor:a&&!e.props.toolbarPush?null:t.textColor||e.props.toolbarTextColor,label:t.label,disable:t.disable?typeof t.disable=="function"?t.disable(e):!0:!1,size:"sm",onClick(r){o&&o(),Te(r,t,e)}},()=>s)}function ct(e,t){const o=t.list==="only-icons";let l=t.label,a=t.icon!==null?t.icon:void 0,s,r;function d(){S.component.proxy.hide()}if(o)r=t.options.map(h=>{const T=h.type===void 0?e.caret.is(h.cmd,h.param):!1;return T&&(l=h.tip,a=h.icon!==null?h.icon:void 0),Be(e,h,d,T)}),s=e.toolbarBackgroundClass.value,r=[le(r)];else{const h=e.props.toolbarToggleColor!==void 0?`text-${e.props.toolbarToggleColor}`:null,T=e.props.toolbarTextColor!==void 0?`text-${e.props.toolbarTextColor}`:null,m=t.list==="no-icons";r=t.options.map(g=>{const q=g.disable?g.disable(e):!1,B=g.type===void 0?e.caret.is(g.cmd,g.param):!1;B&&(l=g.tip,a=g.icon!==null?g.icon:void 0);const H=g.htmlTip;return c(Xe,{active:B,activeClass:h,clickable:!0,disable:q,dense:!0,onClick(P){d(),e.contentRef.value!==null&&e.contentRef.value.focus(),e.caret.restore(),Te(P,g,e)}},()=>[m===!0?null:c(he,{class:B?h:T,side:!0},()=>c(ve,{name:g.icon!==null?g.icon:void 0})),c(he,H?()=>c("div",{class:"text-no-wrap",innerHTML:g.htmlTip}):g.tip?()=>c("div",{class:"text-no-wrap"},g.tip):void 0)])}),s=[e.toolbarBackgroundClass.value,T]}const p=t.highlight&&l!==t.label,S=c(st,{...e.buttonProps.value,noCaps:!0,noWrap:!0,color:p?e.props.toolbarToggleColor:e.props.toolbarColor,textColor:p&&!e.props.toolbarPush?null:e.props.toolbarTextColor,label:t.fixedLabel?t.label:l,icon:t.fixedIcon?t.icon!==null?t.icon:void 0:a,contentClass:s,onShow:h=>e.emit("dropdownShow",h),onHide:h=>e.emit("dropdownHide",h),onBeforeShow:h=>e.emit("dropdownBeforeShow",h),onBeforeHide:h=>e.emit("dropdownBeforeHide",h)},()=>r);return S}function dt(e){if(e.caret)return e.buttons.value.filter(t=>!e.isViewingSource.value||t.find(o=>o.cmd==="viewsource")).map(t=>le(t.map(o=>e.isViewingSource.value&&o.cmd!=="viewsource"?!1:o.type==="slot"?K(e.slots[o.slot]):o.type==="dropdown"?ct(e,o):Be(e,o))))}function ft(e,t,o,l={}){const a=Object.keys(l);if(a.length===0)return{};const s={default_font:{cmd:"fontName",param:e,icon:o,tip:t}};return a.forEach(r=>{const d=l[r];s[r]={cmd:"fontName",param:d,icon:o,tip:d,htmlTip:`<font face="${d}">${d}</font>`}}),s}function ht(e){if(e.caret){const t=e.props.toolbarColor||e.props.toolbarTextColor;let o=e.editLinkUrl.value;const l=()=>{e.caret.restore(),o!==e.editLinkUrl.value&&document.execCommand("createLink",!1,o===""?" ":o),e.editLinkUrl.value=null};return[c("div",{class:`q-mx-xs text-${t}`},`${e.$q.lang.editor.url}: `),c("input",{key:"qedt_btm_input",class:"col q-editor__link-input",value:o,onInput:a=>{ye(a),o=a.target.value},onKeydown:a=>{if(we(a)!==!0)switch(a.keyCode){case 13:return se(a),l();case 27:se(a),e.caret.restore(),(!e.editLinkUrl.value||e.editLinkUrl.value==="https://")&&document.execCommand("unlink"),e.editLinkUrl.value=null;break}}}),le([c(_,{key:"qedt_btm_rem",tabindex:-1,...e.buttonProps.value,label:e.$q.lang.label.remove,noCaps:!0,onClick:()=>{e.caret.restore(),document.execCommand("unlink"),e.editLinkUrl.value=null}}),c(_,{key:"qedt_btm_upd",...e.buttonProps.value,label:e.$q.lang.label.update,noCaps:!0,onClick:l})])]}}const gt=Object.prototype.toString,oe=Object.prototype.hasOwnProperty,mt=new Set(["Boolean","Number","String","Function","Array","Date","RegExp"].map(e=>"[object "+e+"]"));function ge(e){if(e!==Object(e)||mt.has(gt.call(e))===!0||e.constructor&&oe.call(e,"constructor")===!1&&oe.call(e.constructor.prototype,"isPrototypeOf")===!1)return!1;let t;for(t in e);return t===void 0||oe.call(e,t)}function qe(){let e,t,o,l,a,s,r=arguments[0]||{},d=1,p=!1;const S=arguments.length;for(typeof r=="boolean"&&(p=r,r=arguments[1]||{},d=2),Object(r)!==r&&typeof r!="function"&&(r={}),S===d&&(r=this,d--);d<S;d++)if((e=arguments[d])!==null)for(t in e)o=r[t],l=e[t],r!==l&&(p===!0&&l&&((a=Array.isArray(l))||ge(l)===!0)?(a===!0?s=Array.isArray(o)===!0?o:[]:s=ge(o)===!0?o:{},r[t]=qe(p,s,l)):l!==void 0&&(r[t]=l));return r}var qt=W({name:"QEditor",props:{...Je,...Ze,modelValue:{type:String,required:!0},readonly:Boolean,disable:Boolean,minHeight:{type:String,default:"10rem"},maxHeight:String,height:String,definitions:Object,fonts:Object,placeholder:String,toolbar:{type:Array,validator:e=>e.length===0||e.every(t=>t.length),default(){return[["left","center","right","justify"],["bold","italic","underline","strike"],["undo","redo"]]}},toolbarColor:String,toolbarBg:String,toolbarTextColor:String,toolbarToggleColor:{type:String,default:"primary"},toolbarOutline:Boolean,toolbarPush:Boolean,toolbarRounded:Boolean,paragraphTag:{type:String,validator:e=>["div","p"].includes(e),default:"div"},contentStyle:Object,contentClass:[Object,Array,String],square:Boolean,flat:Boolean,dense:Boolean},emits:[...Ve,"update:modelValue","keydown","click","mouseup","keyup","touchend","focus","blur","dropdownShow","dropdownHide","dropdownBeforeShow","dropdownBeforeHide","linkShow","linkHide"],setup(e,{slots:t,emit:o,attrs:l}){const{proxy:a,vnode:s}=ie(),{$q:r}=a,d=Ye(e,r),{inFullscreen:p,toggleFullscreen:S}=et(),h=tt(l,s),T=L(null),m=L(null),g=L(null),q=L(!1),B=v(()=>!e.readonly&&!e.disable);let H,P,x=e.modelValue;document.execCommand("defaultParagraphSeparator",!1,e.paragraphTag),H=window.getComputedStyle(document.body).fontFamily;const z=v(()=>e.toolbarBg?` bg-${e.toolbarBg}`:""),u=v(()=>{const n=e.toolbarOutline!==!0&&e.toolbarPush!==!0;return{type:"a",flat:n,noWrap:!0,outline:e.toolbarOutline,push:e.toolbarPush,rounded:e.toolbarRounded,dense:!0,color:e.toolbarColor,disable:!B.value,size:"sm"}}),C=v(()=>{const n=r.lang.editor,i=r.iconSet.editor;return{bold:{cmd:"bold",icon:i.bold,tip:n.bold,key:66},italic:{cmd:"italic",icon:i.italic,tip:n.italic,key:73},strike:{cmd:"strikeThrough",icon:i.strikethrough,tip:n.strikethrough,key:83},underline:{cmd:"underline",icon:i.underline,tip:n.underline,key:85},unordered:{cmd:"insertUnorderedList",icon:i.unorderedList,tip:n.unorderedList},ordered:{cmd:"insertOrderedList",icon:i.orderedList,tip:n.orderedList},subscript:{cmd:"subscript",icon:i.subscript,tip:n.subscript,htmlTip:"x<subscript>2</subscript>"},superscript:{cmd:"superscript",icon:i.superscript,tip:n.superscript,htmlTip:"x<superscript>2</superscript>"},link:{cmd:"link",disable:f=>f.caret&&!f.caret.can("link"),icon:i.hyperlink,tip:n.hyperlink,key:76},fullscreen:{cmd:"fullscreen",icon:i.toggleFullscreen,tip:n.toggleFullscreen,key:70},viewsource:{cmd:"viewsource",icon:i.viewSource,tip:n.viewSource},quote:{cmd:"formatBlock",param:"BLOCKQUOTE",icon:i.quote,tip:n.quote,key:81},left:{cmd:"justifyLeft",icon:i.left,tip:n.left},center:{cmd:"justifyCenter",icon:i.center,tip:n.center},right:{cmd:"justifyRight",icon:i.right,tip:n.right},justify:{cmd:"justifyFull",icon:i.justify,tip:n.justify},print:{type:"no-state",cmd:"print",icon:i.print,tip:n.print,key:80},outdent:{type:"no-state",disable:f=>f.caret&&!f.caret.can("outdent"),cmd:"outdent",icon:i.outdent,tip:n.outdent},indent:{type:"no-state",disable:f=>f.caret&&!f.caret.can("indent"),cmd:"indent",icon:i.indent,tip:n.indent},removeFormat:{type:"no-state",cmd:"removeFormat",icon:i.removeFormat,tip:n.removeFormat},hr:{type:"no-state",cmd:"insertHorizontalRule",icon:i.hr,tip:n.hr},undo:{type:"no-state",cmd:"undo",icon:i.undo,tip:n.undo,key:90},redo:{type:"no-state",cmd:"redo",icon:i.redo,tip:n.redo,key:89},h1:{cmd:"formatBlock",param:"H1",icon:i.heading1||i.heading,tip:n.heading1,htmlTip:`<h1 class="q-ma-none">${n.heading1}</h1>`},h2:{cmd:"formatBlock",param:"H2",icon:i.heading2||i.heading,tip:n.heading2,htmlTip:`<h2 class="q-ma-none">${n.heading2}</h2>`},h3:{cmd:"formatBlock",param:"H3",icon:i.heading3||i.heading,tip:n.heading3,htmlTip:`<h3 class="q-ma-none">${n.heading3}</h3>`},h4:{cmd:"formatBlock",param:"H4",icon:i.heading4||i.heading,tip:n.heading4,htmlTip:`<h4 class="q-ma-none">${n.heading4}</h4>`},h5:{cmd:"formatBlock",param:"H5",icon:i.heading5||i.heading,tip:n.heading5,htmlTip:`<h5 class="q-ma-none">${n.heading5}</h5>`},h6:{cmd:"formatBlock",param:"H6",icon:i.heading6||i.heading,tip:n.heading6,htmlTip:`<h6 class="q-ma-none">${n.heading6}</h6>`},p:{cmd:"formatBlock",param:e.paragraphTag,icon:i.heading,tip:n.paragraph},code:{cmd:"formatBlock",param:"PRE",icon:i.code,htmlTip:`<code>${n.code}</code>`},"size-1":{cmd:"fontSize",param:"1",icon:i.size1||i.size,tip:n.size1,htmlTip:`<font size="1">${n.size1}</font>`},"size-2":{cmd:"fontSize",param:"2",icon:i.size2||i.size,tip:n.size2,htmlTip:`<font size="2">${n.size2}</font>`},"size-3":{cmd:"fontSize",param:"3",icon:i.size3||i.size,tip:n.size3,htmlTip:`<font size="3">${n.size3}</font>`},"size-4":{cmd:"fontSize",param:"4",icon:i.size4||i.size,tip:n.size4,htmlTip:`<font size="4">${n.size4}</font>`},"size-5":{cmd:"fontSize",param:"5",icon:i.size5||i.size,tip:n.size5,htmlTip:`<font size="5">${n.size5}</font>`},"size-6":{cmd:"fontSize",param:"6",icon:i.size6||i.size,tip:n.size6,htmlTip:`<font size="6">${n.size6}</font>`},"size-7":{cmd:"fontSize",param:"7",icon:i.size7||i.size,tip:n.size7,htmlTip:`<font size="7">${n.size7}</font>`}}}),D=v(()=>{const n=e.definitions||{},i=e.definitions||e.fonts?qe(!0,{},C.value,n,ft(H,r.lang.editor.defaultFont,r.iconSet.editor.font,e.fonts)):C.value;return e.toolbar.map(f=>f.map(w=>{if(w.options)return{type:"dropdown",icon:w.icon,label:w.label,size:"sm",dense:!0,fixedLabel:w.fixedLabel,fixedIcon:w.fixedIcon,highlight:w.highlight,list:w.list,options:w.options.map(xe=>i[xe])};const O=i[w];return O?O.type==="no-state"||n[w]&&(O.cmd===void 0||C.value[O.cmd]&&C.value[O.cmd].type==="no-state")?O:Object.assign({type:"toggle"},O):{type:"slot",slot:w}}))}),y={$q:r,props:e,slots:t,emit:o,inFullscreen:p,toggleFullscreen:S,runCmd:$,isViewingSource:q,editLinkUrl:g,toolbarBackgroundClass:z,buttonProps:u,contentRef:m,buttons:D,setContent:b};N(()=>e.modelValue,n=>{x!==n&&(x=n,b(n,!0))}),N(g,n=>{o(`link${n?"Show":"Hide"}`)});const G=v(()=>e.toolbar&&e.toolbar.length!==0),R=v(()=>{const n={},i=f=>{f.key&&(n[f.key]={cmd:f.cmd,param:f.param})};return D.value.forEach(f=>{f.forEach(w=>{w.options?w.options.forEach(i):i(w)})}),n}),j=v(()=>p.value?e.contentStyle:[{minHeight:e.minHeight,height:e.height,maxHeight:e.maxHeight},e.contentStyle]),F=v(()=>`q-editor q-editor--${q.value===!0?"source":"default"}`+(e.disable===!0?" disabled":"")+(p.value===!0?" fullscreen column":"")+(e.square===!0?" q-editor--square no-border-radius":"")+(e.flat===!0?" q-editor--flat":"")+(e.dense===!0?" q-editor--dense":"")+(d.value===!0?" q-editor--dark q-dark":"")),X=v(()=>[e.contentClass,"q-editor__content",{col:p.value,"overflow-auto":p.value||e.maxHeight}]),J=v(()=>e.disable===!0?{"aria-disabled":"true"}:e.readonly===!0?{"aria-readonly":"true"}:{});function Y(){if(m.value!==null){const n=`inner${q.value===!0?"Text":"HTML"}`,i=m.value[n];i!==e.modelValue&&(x=i,o("update:modelValue",i))}}function M(n){if(o("keydown",n),n.ctrlKey!==!0||we(n)===!0){k();return}const i=n.keyCode,f=R.value[i];if(f!==void 0){const{cmd:w,param:O}=f;be(n),$(w,O,!1)}}function E(n){k(),o("click",n)}function Z(n){if(m.value!==null){const{scrollTop:i,scrollHeight:f}=m.value;P=f-i}y.caret.save(),o("blur",n)}function V(n){Le(()=>{m.value!==null&&P!==void 0&&(m.value.scrollTop=m.value.scrollHeight-P)}),o("focus",n)}function ee(n){const i=T.value;if(i!==null&&i.contains(n.target)===!0&&(n.relatedTarget===null||i.contains(n.relatedTarget)!==!0)){const f=`inner${q.value===!0?"Text":"HTML"}`;y.caret.restorePosition(m.value[f].length),k()}}function I(n){const i=T.value;i!==null&&i.contains(n.target)===!0&&(n.relatedTarget===null||i.contains(n.relatedTarget)!==!0)&&(y.caret.savePosition(),k())}function Q(){P=void 0}function U(n){y.caret.save()}function b(n,i){if(m.value!==null){i===!0&&y.caret.savePosition();const f=`inner${q.value===!0?"Text":"HTML"}`;m.value[f]=n,i===!0&&(y.caret.restorePosition(m.value[f].length),k())}}function $(n,i,f=!0){A(),y.caret.restore(),y.caret.apply(n,i,()=>{A(),y.caret.save(),f&&k()})}function k(){setTimeout(()=>{g.value=null,a.$forceUpdate()},1)}function A(){ot(()=>{m.value!==null&&m.value.focus({preventScroll:!0})})}function Pe(){return m.value}return pe(()=>{y.caret=a.caret=new it(m.value,y),b(e.modelValue),k(),document.addEventListener("selectionchange",U)}),ne(()=>{document.removeEventListener("selectionchange",U)}),Object.assign(a,{runCmd:$,refreshToolbar:k,focus:A,getContentEl:Pe}),()=>{let n;if(G.value){const i=[c("div",{key:"qedt_top",class:"q-editor__toolbar row no-wrap scroll-x"+z.value},dt(y))];g.value!==null&&i.push(c("div",{key:"qedt_btm",class:"q-editor__toolbar row no-wrap items-center scroll-x"+z.value},ht(y))),n=c("div",{key:"toolbar_ctainer",class:"q-editor__toolbars-container"},i)}return c("div",{ref:T,class:F.value,style:{height:p.value===!0?"100%":null},...J.value,onFocusin:ee,onFocusout:I},[n,c("div",{ref:m,style:j.value,class:X.value,contenteditable:B.value,placeholder:e.placeholder,...h.listeners.value,onInput:Y,onKeydown:M,onClick:E,onBlur:Z,onFocus:V,onMousedown:Q,onTouchstartPassive:Q})])}}});export{qt as Q};
