import{Q as j}from"./QImg.20d231d0.js";import{al as P,r as f,_ as F,b as L,d as g,k as h,j as s,F as _,l as q,f as l,g as p,w as o,p as R,t as S,aD as C,aE as B,q as D}from"./index.db764cee.js";import{Q as T,a as I}from"./QCardActions.25fe30fb.js";import{Q as v,a as k}from"./QSelect.9cf3cdc7.js";import{Q as A,a as x}from"./QForm.f5990077.js";import{Q as z}from"./QCard.57f28827.js";import{Q as N}from"./QDialog.f096fac1.js";/* empty css                   */import{u as E}from"./use-quasar.008ba00b.js";import"./use-dark.7d48d3c9.js";import"./use-prevent-scroll.7f7d7311.js";import"./format.5c5cc304.js";import"./rtl.b51694b1.js";import"./portal.85d26471.js";const c=n=>(C("data-v-ba9e277c"),n=n(),B(),n),M=c(()=>s("div",{class:"topic-bg"},null,-1)),G=c(()=>s("div",{class:"q-mb-md q-mt-xl text-center text-h2 text-weight-medium text-uppercase"},"Topics",-1)),O=c(()=>s("div",{class:"text-center text-h4"},"Group your hobby",-1)),$={class:"row wrap q-pa-xl"},H={class:"imgBox"},J={class:"imgBoxText",style:{opacity:"1"}},K={class:"absolute-center q-mt-xl pttCreateLand flex justify-center items-center"},W=c(()=>s("div",{class:"text-h6"},"\u65B0\u589E\u8A71\u984C",-1)),X={__name:"PTTPage",setup(n){const u=E(),d=f(!1),r=[{name:"\u98A8\u666F\u651D\u5F71",imgUrl:new URL("/catchTime/assets/1.c25c4856.jpg",self.location).href},{name:"\u4EBA\u50CF\u651D\u5F71",imgUrl:new URL("/catchTime/assets/2.7dd08cfb.jpg",self.location).href},{name:"\u52D5\u614B\u651D\u5F71",imgUrl:new URL("/catchTime/assets/3.aa21a3f9.jpg",self.location).href},{name:"\u5EFA\u7BC9\u651D\u5F71",imgUrl:new URL("/catchTime/assets/4.0f294c76.jpg",self.location).href},{name:"\u975C\u7269\u651D\u5F71",imgUrl:new URL("/catchTime/assets/5.f2849529.jpg",self.location).href},{name:"\u7D00\u5BE6\u651D\u5F71",imgUrl:new URL("/catchTime/assets/6.c4d9d75c.jpg",self.location).href},{name:"\u5BE6\u9A57\u6027\u651D\u5F71",imgUrl:new URL("/catchTime/assets/7.8f9b5d95.jpg",self.location).href},{name:"\u5176\u4ED6",imgUrl:new URL("/catchTime/assets/8.2bff020f.jpg",self.location).href}],i=f(!1),e=F({head:"",content:"",theme:"",files:[],rawFiles:[]}),w=["\u98A8\u666F\u651D\u5F71","\u4EBA\u50CF\u651D\u5F71","\u52D5\u614B\u651D\u5F71","\u5EFA\u7BC9\u651D\u5F71","\u975C\u7269\u651D\u5F71","\u7D00\u5BE6\u651D\u5F71","\u5BE6\u9A57\u6027\u651D\u5F71","\u5176\u4ED6"],y=()=>{i.value=!0},U=()=>{e.head="",e.content="",e.theme="",e.files="",e.rawFiles="",d.value=!1},b=async V=>{try{d.value=!0;const t=new FormData;t.append("head",e.head),t.append("content",e.content),t.append("theme",e.theme),e.files[0]!==void 0&&t.append("imgURL",e.files[0].file),await D.post("/PTTs",t),u.notify({message:"success",caption:"\u65B0\u589E\u6210\u529F",color:"secondary"}),i.value=!1,U(),console.log(e.files)}catch{u.notify({message:"error",caption:"\u65B0\u589E\u5931\u6557",color:"red"})}};return(V,t)=>{const Q=L("VueFileAgent");return g(),h(_,null,[M,G,O,s("div",$,[(g(),h(_,null,q(r,(a,m)=>s("div",{class:"col-3 justify-center flex q-mb-lg q-mt-lg",key:m},[s("div",H,[l(j,{src:r[m].imgUrl,ratio:1,"spinner-color":"primary"},null,8,["src"]),s("div",J,[l(p,{flat:"",to:"/PTTIndependentPage/"+r[m].name},{default:o(()=>[R(S(r[m].name),1)]),_:2},1032,["to"])])])])),64))]),s("div",K,[l(p,{round:"",flat:"",padding:"xl",color:"blue-grey-5",icon:"fa-solid fa-plus",onClick:y})]),s("div",null,[l(N,{modelValue:i.value,"onUpdate:modelValue":t[5]||(t[5]=a=>i.value=a)},{default:o(()=>[l(z,null,{default:o(()=>[l(A,{onSubmit:b},{default:o(()=>[l(T,null,{default:o(()=>[W]),_:1}),l(v),l(T,{style:{"max-height":"50vh",width:"25vw"},class:"scroll"},{default:o(()=>[l(Q,{modelValue:e.files,"onUpdate:modelValue":t[0]||(t[0]=a=>e.files=a),"raw-model-value":e.rawFiles,"onUpdate:rawModelValue":t[1]||(t[1]=a=>e.rawFiles=a),"max-files":1,"max-size":"1MB",accept:"image/jpg,image/jpeg,image/png",multiple:!1,"error-text":{type:"\u6A94\u6848\u683C\u5F0F\u932F\u8AA4",size:"\u6A94\u6848\u592A\u5927"},"help-text":"\u9700\u8981\u4E0A\u50B3\u5716\u7247\u8ACB\u9078\u64C7\u6A94\u6848\u6216\u62D6\u653E\u5230\u9019\u88E1",class:"q-mb-md"},null,8,["modelValue","raw-model-value"]),l(x,{filled:"",type:"text",modelValue:e.head,"onUpdate:modelValue":t[2]||(t[2]=a=>e.head=a),label:"\u6A19\u984C *","lazy-rules":"",rules:[a=>!!a||"\u7F3A\u5C11\u6A19\u984C"]},null,8,["modelValue","rules"]),l(x,{filled:"",type:"textarea",modelValue:e.content,"onUpdate:modelValue":t[3]||(t[3]=a=>e.content=a),label:"\u4ECB\u7D39 *","lazy-rules":"",rules:[a=>!!a||"\u7F3A\u5C11\u5167\u5BB9"]},null,8,["modelValue","rules"]),l(k,{filled:"",modelValue:e.theme,"onUpdate:modelValue":t[4]||(t[4]=a=>e.theme=a),options:w,label:"\u985E\u5225 *"},null,8,["modelValue"])]),_:1}),l(v),l(I,{align:"right"},{default:o(()=>[l(p,{label:"\u9001\u51FA",type:"submit",color:"primary",loading:d.value},null,8,["loading"])]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])])],64)}}};var pe=P(X,[["__scopeId","data-v-ba9e277c"]]);export{pe as default};