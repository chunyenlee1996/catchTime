import{Q}from"./QImg.d7f1f22a.js";import{al as U,r as P,_ as F,b as S,o as c,j as f,i as l,F as h,k as q,e as o,f as d,w as s,n as C,t as B,ao as I,ap as D,p as j}from"./index.0f80e695.js";import{Q as g,a as k}from"./QCardActions.deb36d3e.js";import{Q as _,a as A}from"./QSelect.0e0ebbbd.js";import{Q as z,a as v}from"./QForm.512ca602.js";import{Q as L}from"./QCard.622aeb6d.js";import{Q as N}from"./QDialog.8ddf2cf9.js";/* empty css                   */import{u as M}from"./use-quasar.57d1af21.js";import"./use-dark.a03b507b.js";import"./format.826bc018.js";import"./rtl.b51694b1.js";import"./portal.ab367d15.js";const p=r=>(I("data-v-5c5b576e"),r=r(),D(),r),E=p(()=>l("div",{class:"topic-bg"},null,-1)),G=p(()=>l("div",{class:"q-mb-md q-mt-xl text-center text-h2 text-weight-medium text-uppercase"},"Topics",-1)),O=p(()=>l("div",{class:"text-center text-h4"},"Group your hobby",-1)),R={class:"row wrap q-pa-xl"},$={class:"imgBox"},H={class:"imgBoxText",style:{opacity:"1"}},J={class:"absolute-center q-mt-xl pttCreateLand flex justify-center items-center"},K=p(()=>l("div",{class:"text-h6"},"\u65B0\u589E\u8A71\u984C",-1)),W={__name:"PTTPage",setup(r){const u=M(),m=[{name:"\u98A8\u666F\u651D\u5F71",imgUrl:"https://picsum.photos/1080/1080/?random=10"},{name:"\u4EBA\u50CF\u651D\u5F71",imgUrl:"https://picsum.photos/1080/1080/?random=9"},{name:"\u52D5\u614B\u651D\u5F71",imgUrl:"https://picsum.photos/1080/1080/?random=8"},{name:"\u5EFA\u7BC9\u651D\u5F71",imgUrl:"https://picsum.photos/1080/1080/?random=7"},{name:"\u975C\u7269\u651D\u5F71",imgUrl:"https://picsum.photos/1080/1080/?random=6"},{name:"\u7D00\u5BE6\u651D\u5F71",imgUrl:"https://picsum.photos/1080/1080/?random=5"},{name:"\u5BE6\u9A57\u6027\u651D\u5F71",imgUrl:"https://picsum.photos/1080/1080/?random=4"},{name:"\u5176\u4ED6",imgUrl:"https://picsum.photos/1080/1080/?random=3"}],n=P(!1),e=F({head:"",content:"",theme:"",files:[],rawFiles:[]}),x=["\u98A8\u666F\u651D\u5F71","\u4EBA\u50CF\u651D\u5F71","\u52D5\u614B\u651D\u5F71","\u5EFA\u7BC9\u651D\u5F71","\u975C\u7269\u651D\u5F71","\u7D00\u5BE6\u651D\u5F71","\u5BE6\u9A57\u6027\u651D\u5F71","\u5176\u4ED6"],y=()=>{n.value=!0},T=()=>{e.head="",e.content="",e.theme="",e.files="",e.rawFiles=""},V=async b=>{try{const t=new FormData;t.append("head",e.head),t.append("content",e.content),t.append("theme",e.theme),e.files[0]!==void 0&&t.append("imgURL",e.files[0].file),await j.post("/PTTs",t),u.notify({message:"success",caption:"\u65B0\u589E\u6210\u529F",color:"secondary"}),n.value=!1,T(),console.log(e.files)}catch{u.notify({message:"error",caption:"\u65B0\u589E\u5931\u6557",color:"red"})}};return(b,t)=>{const w=S("VueFileAgent");return c(),f(h,null,[E,G,O,l("div",R,[(c(),f(h,null,q(m,(a,i)=>l("div",{class:"col-3 justify-center flex q-mb-lg q-mt-lg",key:i},[l("div",$,[o(Q,{src:m[i].imgUrl,ratio:1,"spinner-color":"primary"},null,8,["src"]),l("div",H,[o(d,{flat:"",to:"/PTTIndependentPage/"+m[i].name},{default:s(()=>[C(B(m[i].name),1)]),_:2},1032,["to"])])])])),64))]),l("div",J,[o(d,{round:"",flat:"",padding:"xl",color:"blue-grey-5",icon:"fa-solid fa-plus",onClick:y})]),l("div",null,[o(N,{modelValue:n.value,"onUpdate:modelValue":t[5]||(t[5]=a=>n.value=a)},{default:s(()=>[o(L,null,{default:s(()=>[o(z,{onSubmit:V},{default:s(()=>[o(g,null,{default:s(()=>[K]),_:1}),o(_),o(g,{style:{"max-height":"50vh",width:"25vw"},class:"scroll"},{default:s(()=>[o(w,{modelValue:e.files,"onUpdate:modelValue":t[0]||(t[0]=a=>e.files=a),"raw-model-value":e.rawFiles,"onUpdate:rawModelValue":t[1]||(t[1]=a=>e.rawFiles=a),"max-files":1,"max-size":"1MB",accept:"image/jpg,image/jpeg,image/png",multiple:!1,"error-text":{type:"\u6A94\u6848\u683C\u5F0F\u932F\u8AA4",size:"\u6A94\u6848\u592A\u5927"},"help-text":"\u9700\u8981\u4E0A\u50B3\u5716\u7247\u8ACB\u9078\u64C7\u6A94\u6848\u6216\u62D6\u653E\u5230\u9019\u88E1",class:"q-mb-md"},null,8,["modelValue","raw-model-value"]),o(v,{filled:"",type:"text",modelValue:e.head,"onUpdate:modelValue":t[2]||(t[2]=a=>e.head=a),label:"\u6A19\u984C *","lazy-rules":"",rules:[a=>!!a||"\u7F3A\u5C11\u6A19\u984C"]},null,8,["modelValue","rules"]),o(v,{filled:"",type:"textarea",modelValue:e.content,"onUpdate:modelValue":t[3]||(t[3]=a=>e.content=a),label:"\u4ECB\u7D39 *","lazy-rules":"",rules:[a=>!!a||"\u7F3A\u5C11\u5167\u5BB9"]},null,8,["modelValue","rules"]),o(A,{filled:"",modelValue:e.theme,"onUpdate:modelValue":t[4]||(t[4]=a=>e.theme=a),options:x,label:"\u985E\u5225 *"},null,8,["modelValue"])]),_:1}),o(_),o(k,{align:"right"},{default:s(()=>[o(d,{label:"\u9001\u51FA",type:"submit",color:"primary",loading:"true"})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])])],64)}}};var pe=U(W,[["__scopeId","data-v-5c5b576e"]]);export{pe as default};