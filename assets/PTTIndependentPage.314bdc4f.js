import{al as A,aF as F,u as $,r as v,o as d,j as T,i as a,e,f,w as t,F as q,am as U,k as C,d as h,n as y,t as n,Q as I,h as P,aD as E,aE as L,p as R}from"./index.c9889f0b.js";import{Q as O,b}from"./QDialog.7e65b1af.js";import{a as p,Q as x}from"./format.b157f706.js";import{Q as S}from"./QScrollArea.9076448a.js";import{Q as j}from"./QEditor.5e535408.js";import{u as z}from"./use-quasar.8c802a0e.js";import{_ as G}from"./SearchBar.0f39e17d.js";import"./use-dark.882fafdf.js";import"./portal.c1f3a29e.js";import"./QForm.2ef0d92d.js";import"./QScrollObserver.0fe34eac.js";import"./use-fullscreen.eeee998d.js";const H=_=>(E("data-v-f48d9116"),_=_(),L(),_),M=H(()=>a("div",{class:"topic-bg"},null,-1)),J={class:"absolute-top contentContainer"},K={class:"q-mt-xl"},W={class:"PTTContainerLeft absolute-center q-mt-md"},X={class:"listHeaderGroup"},Y={class:"questionDisplay"},Z={class:"questionDisplayTop"},ee={class:"text-h4 text-center"},te={class:"text-subtitle1 q-pa-md"},ae={class:"text-right q-mr-lg"},se=["src"],le={class:"q-ml-xs text-h6",style:{display:"inline-block",position:"relative",top:"6px",left:"6px"}},oe=["src"],re={class:"editorDialogContainer"},ie={class:"q-pa-md q-gutter-sm"},de={class:"text-center q-mt-xs"},ne={__name:"PTTIndependentPage",setup(_){const V=F(),g=z(),Q=$(),u=v([]),o=v({head:"\u9EDE\u9078\u65C1\u908A\u7684\u6B04\u4F4D",userAvatar:"https://source.boringavatars.com/beam/250/65sdfsdf65asg64w4t?colors=264653,2a9d8f,e9c46a,f4a261,e76f51",messageBoard:[]}),D=v(),i=v(""),c=v(!1),w=()=>{i.value="",c.value=!1},B=async()=>{try{await R.post(`PTTs/${D.value}`,{message:i.value}),o.value.messageBoard.push({avatar:Q.avatar,message:i.value,userName:Q.userName}),i.value="",c.value=!1,k(),g.notify({message:"success",caption:"\u65B0\u589E\u7559\u8A00\u6210\u529F",color:"secondary"})}catch{i.value="",c.value=!1,g.notify({message:"error",caption:"\u8ACB\u767B\u5165\u5E33\u865F",color:"red"})}},N=s=>{o.value=u.value[s],D.value=u.value[s]._id},k=async s=>{try{const{data:l}=await U.get("/PTTs/all",{params:{theme:V.params.theme,search:s}});u.value=l.result}catch(l){console.log(l),g.notify({message:"error",caption:"\u8B80\u53D6\u5931\u6557",color:"red"})}};return k(),(s,l)=>(d(),T(q,null,[M,a("div",J,[a("div",K,[e(f,{class:"q-mb-md q-mr-md fixed-bottom-right",color:"teal-2",icon:"fa-solid fa-angles-left",label:"back",to:"/PTTPage"})]),a("div",W,[e(G,{onSearchTheme:k}),a("div",X,[e(S,{"thumb-style":s.thumbStyle,"bar-style":s.barStyle,style:{height:"100%",width:"100%"}},{default:t(()=>[(d(!0),T(q,null,C(u.value,(r,m)=>(d(),h(x,{class:"q-mr-md",key:m,clickable:"",onClick:ue=>N(m),style:{"border-bottom":"1px solid #333"}},{default:t(()=>[e(p,null,{default:t(()=>[e(b,null,{default:t(()=>[y(n(u.value[m].head),1)]),_:2},1024)]),_:2},1024),e(p,{side:"",top:""},{default:t(()=>[e(b,{caption:""},{default:t(()=>[y(n(u.value[m].userName),1)]),_:2},1024)]),_:2},1024)]),_:2},1032,["onClick"]))),128))]),_:1},8,["thumb-style","bar-style"])]),a("div",Y,[a("div",Z,[e(S,{class:"q-mt-lg","thumb-style":s.thumbStyle,"bar-style":s.barStyle,style:{height:"300px",width:"100%"}},{default:t(()=>[a("div",ee,n(o.value.head),1),a("div",te,[a("p",null,n(o.value.content),1)]),a("div",ae,[o.value.head!=="\u9EDE\u9078\u65C1\u908A\u7684\u6B04\u4F4D"?(d(),h(I,{key:0,rounded:"",size:"md"},{default:t(()=>[a("img",{src:o.value.userAvatar},null,8,se)]),_:1})):P("",!0),a("div",le,n(o.value.userName),1)])]),_:1},8,["thumb-style","bar-style"])]),e(S,{"thumb-style":s.thumbStyle,"bar-style":s.barStyle,style:{height:"40%",width:"100%"}},{default:t(()=>[(d(!0),T(q,null,C(o.value.messageBoard,(r,m)=>(d(),h(x,{key:m},{default:t(()=>[e(p,{top:"",avatar:""},{default:t(()=>[e(I,{rounded:""},{default:t(()=>[a("img",{src:r.avatar},null,8,oe)]),_:2},1024)]),_:2},1024),e(p,null,{default:t(()=>[e(b,null,{default:t(()=>[y(n(r.message),1)]),_:2},1024)]),_:2},1024),e(p,{side:"",top:""},{default:t(()=>[e(b,{caption:""},{default:t(()=>[y(n(r.userName),1)]),_:2},1024)]),_:2},1024)]),_:2},1024))),128)),o.value.head!=="\u9EDE\u9078\u65C1\u908A\u7684\u6B04\u4F4D"?(d(),h(x,{key:0},{default:t(()=>[e(p,{top:"",class:"text-center"},{default:t(()=>[e(f,{color:"teal-4",icon:"fa-regular fa-comment",label:"\u7559\u8A00",onClick:l[0]||(l[0]=r=>c.value=!0)})]),_:1})]),_:1})):P("",!0)]),_:1},8,["thumb-style","bar-style"])])])]),e(O,{modelValue:c.value,"onUpdate:modelValue":l[2]||(l[2]=r=>c.value=r),persistent:""},{default:t(()=>[a("div",re,[a("div",ie,[e(j,{modelValue:i.value,"onUpdate:modelValue":l[1]||(l[1]=r=>i.value=r),definitions:{bold:{label:"Bold",icon:null,tip:"My bold tooltip"}}},null,8,["modelValue"]),a("div",de,[e(f,{color:"pink-4",icon:"fa-solid fa-xmark",onClick:w,class:"q-mr-md"}),e(f,{color:"teal-4",icon:"fa-solid fa-check",onClick:B})])])])]),_:1},8,["modelValue"])],64))}};var qe=A(ne,[["__scopeId","data-v-f48d9116"]]);export{qe as default};