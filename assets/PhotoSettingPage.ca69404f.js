import{Q as p,a as g}from"./QForm.f5990077.js";import{Q as f}from"./QImg.20d231d0.js";import{Q as b,a as m}from"./QTable.d5bbc59a.js";import{r as c,d as h,k as _,j as s,f as a,w as r,F as w,an as x,g as y,q as v}from"./index.db764cee.js";import"./use-dark.7d48d3c9.js";import"./QSelect.9cf3cdc7.js";import"./use-prevent-scroll.7f7d7311.js";import"./format.5c5cc304.js";import"./QDialog.f096fac1.js";import"./portal.85d26471.js";import"./rtl.b51694b1.js";import"./QMarkupTable.cd81ed92.js";import"./use-fullscreen.97de2154.js";const I=s("div",{class:"q-mb-md q-mt-xl text-center text-h2 text-weight-medium text-uppercase"},"Discovery",-1),Q={class:"q-pa-xl row justify-center"},k={class:"q-pa-md"},z={__name:"PhotoSettingPage",setup(q){const o=c(""),d=[{name:"name",required:!0,label:"\u4F5C\u54C1\u540D\u7A31",align:"center",field:"name"},{name:"imgURL",align:"center",label:"\u5716\u7247",field:"imgURL"},{name:"userName",label:"\u4F5C\u8005",field:"userName",align:"center",sortable:!0},{name:"content",label:"\u5167\u5BB9",field:"content",align:"center",sort:(e,l)=>parseInt(e,10)-parseInt(l,10)},{name:"theme",label:"\u985E\u5225",field:"theme",align:"center",sortable:!0},{name:"deleteImg",label:"\u522A\u9664",field:"deleteImg",align:"center",sort:(e,l)=>parseInt(e,10)-parseInt(l,10)}],n=c(),i=async()=>{try{const{data:e}=await x.get("/images/all");n.value=e.result}catch{}};i();const u=async e=>{await v.delete(`/images/${e}`),i()};return(e,l)=>(h(),_(w,null,[I,s("div",Q,[a(p,{onSubmit:e.onSubmit,class:"q-gutter-md col-9"},{default:r(()=>[a(g,{name:"theme",modelValue:o.value,"onUpdate:modelValue":l[0]||(l[0]=t=>o.value=t),color:"primary",label:"\u641C\u5C0B\u985E\u578B",filled:"",hint:"\u53EF\u641C\u5C0B \uFF1A \u4F5C\u8005\u3001\u985E\u578B\u3001\u6A19\u984C"},null,8,["modelValue"])]),_:1},8,["onSubmit"])]),s("div",k,[a(b,{title:"\u5716\u7247\u7BA1\u7406",rows:n.value,columns:d,"row-key":"name",filter:o.value},{"body-cell-imgURL":r(t=>[a(m,{props:t},{default:r(()=>[a(f,{src:t.row.imgURL,style:{width:"50px",height:"50px"}},null,8,["src"])]),_:2},1032,["props"])]),"body-cell-deleteImg":r(t=>[a(m,{props:t},{default:r(()=>[a(y,{flat:"",round:"",color:"primary",size:"xs",icon:"delete",onClick:U=>u(t.row._id)},null,8,["onClick"])]),_:2},1032,["props"])]),_:1},8,["rows","filter"])])],64))}};export{z as default};
