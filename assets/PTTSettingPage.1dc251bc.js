import{r as i,o as p,j as f,i as m,e as t,w as r,F as g,am as b,f as c,p as h}from"./index.0f80e695.js";import{Q as _,a as w}from"./QForm.512ca602.js";import{Q as T,a as k}from"./QTable.a52508ea.js";import"./use-dark.a03b507b.js";import"./QSelect.0e0ebbbd.js";import"./format.826bc018.js";import"./QDialog.8ddf2cf9.js";import"./portal.ab367d15.js";import"./rtl.b51694b1.js";import"./QMarkupTable.fd947bac.js";import"./use-fullscreen.530df175.js";const v={class:"q-pa-xl row justify-center"},y={class:"q-pa-md"},D={__name:"PTTSettingPage",setup(I){const o=i(""),u=[{name:"head",required:!0,label:"\u6A19\u984C",align:"center",field:"head"},{name:"content",label:"\u5167\u5BB9",field:"content",align:"center"},{name:"userName",label:"\u4F5C\u8005",field:"userName",align:"center",sortable:!0},{name:"theme",label:"\u985E\u5225",field:"theme",align:"center",sortable:!0},{name:"deleteImg",label:"\u522A\u9664",field:"deleteImg",align:"center",sort:(e,a)=>parseInt(e,10)-parseInt(a,10)}],n=i(),s=async()=>{try{const{data:e}=await b.get("/PTTs/all");n.value=e.result}catch{}};s();const d=async e=>{await h.delete(`/PTTs/${e}`),s()};return(e,a)=>(p(),f(g,null,[m("div",v,[t(_,{onSubmit:e.onSubmit,class:"q-gutter-md col-9"},{default:r(()=>[t(w,{name:"theme",modelValue:o.value,"onUpdate:modelValue":a[0]||(a[0]=l=>o.value=l),color:"primary",label:"\u641C\u5C0B\u985E\u578B",filled:"",hint:"\u98A8\u666F\u651D\u5F71, \u4EBA\u50CF\u651D\u5F71, \u52D5\u614B\u651D\u5F71, \u5EFA\u7BC9\u651D\u5F71, \u975C\u7269\u651D\u5F71, \u7D00\u5BE6\u651D\u5F71, \u5BE6\u9A57\u6027\u651D\u5F71, \u5176\u4ED6"},{default:r(()=>[t(c,{flat:"",ripple:!1,"text-color":"blue",icon:"search",size:"lg",onClick:e.searchImgData},null,8,["onClick"])]),_:1},8,["modelValue"])]),_:1},8,["onSubmit"])]),m("div",y,[t(T,{title:"\u8AD6\u58C7\u7BA1\u7406",rows:n.value,columns:u,"row-key":"name",filter:o.value},{"body-cell-deleteImg":r(l=>[t(k,{props:l},{default:r(()=>[t(c,{flat:"",round:"",color:"primary",size:"xs",icon:"delete",onClick:Q=>d(l.row._id)},null,8,["onClick"])]),_:2},1032,["props"])]),_:1},8,["rows","filter"])])],64))}};export{D as default};