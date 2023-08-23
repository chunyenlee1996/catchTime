import{r as i,d as f,k as g,j as m,f as t,w as r,F as b,an as h,g as c,q as _}from"./index.026be9e3.js";import{Q as w,a as y}from"./QForm.33008aec.js";import{Q as I}from"./QImg.2ee3a4ff.js";import{Q as k,a as p}from"./QTable.c56eeb05.js";import"./use-dark.d85d4452.js";import"./uid.42677368.js";import"./QSelect.cd608b95.js";import"./use-prevent-scroll.bb5724f4.js";import"./format.dae1b3d5.js";import"./QDialog.a4ca6f54.js";import"./portal.4cb70496.js";import"./rtl.b51694b1.js";import"./QMarkupTable.c449c839.js";import"./use-fullscreen.d78ca9ba.js";const Q={class:"q-pa-xl row justify-center"},v={class:"q-pa-md"},$={__name:"PhotoSettingPage",setup(x){const o=i(""),u=[{name:"name",required:!0,label:"\u4F5C\u54C1\u540D\u7A31",align:"center",field:"name"},{name:"imgURL",align:"center",label:"\u5716\u7247",field:"imgURL"},{name:"userName",label:"\u4F5C\u8005",field:"userName",align:"center",sortable:!0},{name:"content",label:"\u5167\u5BB9",field:"content",align:"center",sort:(e,l)=>parseInt(e,10)-parseInt(l,10)},{name:"theme",label:"\u985E\u5225",field:"theme",align:"center",sortable:!0},{name:"deleteImg",label:"\u522A\u9664",field:"deleteImg",align:"center",sort:(e,l)=>parseInt(e,10)-parseInt(l,10)}],n=i(),s=async()=>{try{const{data:e}=await h.get("/images/all");n.value=e.result}catch{}};s();const d=async e=>{await _.delete(`/images/${e}`),s()};return(e,l)=>(f(),g(b,null,[m("div",Q,[t(w,{onSubmit:e.onSubmit,class:"q-gutter-md col-9"},{default:r(()=>[t(y,{name:"theme",modelValue:o.value,"onUpdate:modelValue":l[0]||(l[0]=a=>o.value=a),color:"primary",label:"\u641C\u5C0B\u985E\u578B",filled:"",hint:"\u98A8\u666F\u651D\u5F71, \u4EBA\u50CF\u651D\u5F71, \u52D5\u614B\u651D\u5F71, \u5EFA\u7BC9\u651D\u5F71, \u975C\u7269\u651D\u5F71, \u7D00\u5BE6\u651D\u5F71, \u5BE6\u9A57\u6027\u651D\u5F71, \u5176\u4ED6"},{default:r(()=>[t(c,{flat:"",ripple:!1,"text-color":"blue",icon:"search",size:"lg",onClick:e.searchImgData},null,8,["onClick"])]),_:1},8,["modelValue"])]),_:1},8,["onSubmit"])]),m("div",v,[t(k,{title:"\u5716\u7247\u7BA1\u7406",rows:n.value,columns:u,"row-key":"name",filter:o.value},{"body-cell-imgURL":r(a=>[t(p,{props:a},{default:r(()=>[t(I,{src:a.row.imgURL,style:{width:"50px",height:"50px"}},null,8,["src"])]),_:2},1032,["props"])]),"body-cell-deleteImg":r(a=>[t(p,{props:a},{default:r(()=>[t(c,{flat:"",round:"",color:"primary",size:"xs",icon:"delete",onClick:q=>d(a.row._id)},null,8,["onClick"])]),_:2},1032,["props"])]),_:1},8,["rows","filter"])])],64))}};export{$ as default};
