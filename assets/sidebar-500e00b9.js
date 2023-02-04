import{b as n,f as i,u as B,s as L,g as t,t as f,n as _,h as V,i as p,e as l,j as O,k as R,d as E,m as M,l as U,r as w,o as N,_ as Z,F as u,p as x,q as h,v as z,w as P,x as j,y as F,z as q,A as G,B as H,c as S}from"./index-623b633d.js";const J={key:0,class:"btn btn-warn",type:"button"},K={key:1,class:"btn btn-trouble",type:"button"},Q={key:2,class:"btn btn-trouble",type:"button"},W={key:3,class:"btn btn-none",type:"button"},X={__name:"parkingStatus",props:{item:{type:Object}},setup(a){return(c,m)=>(n(),i("div",null,[a.item.AvailableRentBikes>0&&a.item.AvailableReturnBikes>0?(n(),i("button",J,"可借可還")):a.item.AvailableRentBikes>0&&a.item.AvailableReturnBikes==0?(n(),i("button",K,"只可借車")):a.item.AvailableRentBikes==0&&a.item.AvailableReturnBikes>0?(n(),i("button",Q,"只可停車")):(n(),i("button",W,"站點施工中"))]))}},Y={class:"col-12 mb-3"},tt={class:"col-12 d-flex justify-content-between mb-3"},et=t("div",{class:"w-100"},[t("i",{class:"fa fa-bicycle"}),p(" 可租借 ")],-1),st={class:"w-100 count"},at={class:"card-tab"},nt=t("div",{class:"w-100"},[t("i",{class:"fa fa-parking"}),p(" 可停車 ")],-1),ot={class:"w-100 count"},it={class:"col-12 d-flex justify-content-between mb-3"},lt={class:"distance"},ct=t("i",{class:"fas fa-map-marker-alt"},null,-1),rt={__name:"card1",props:{item:{type:Object}},setup(a){const c=a,m=B(),{userLocation:d,chooseStation:b,chooseNearbyBikeDataList:k}=L(m),v=async()=>{b.value=c.item,R([c.item.StationPosition.PositionLat,c.item.StationPosition.PositionLon]);const $=await m.getNearbyBikeData(`${c.item.StationPosition.PositionLat},${c.item.StationPosition.PositionLon}`);$.map(r=>r.distance=E(d.value[0],d.value[1],r.StationPosition.PositionLat,r.StationPosition.PositionLon)),k.value=$,M(k.value,c.item)};return($,r)=>(n(),i("div",{class:"w-100 cards card1 d-flex flex-wrap",onClick:v},[t("h2",Y,f(a.item.StationName.Zh_tw),1),t("div",tt,[t("div",{class:_(["card-tab",a.item.AvailableRentBikes>5?"":a.item.AvailableRentBikes>0?"danger":"none"])},[et,t("div",st,f(a.item.AvailableRentBikes),1)],2),t("div",at,[nt,t("div",ot,f(a.item.AvailableReturnBikes),1)])]),t("div",it,[V(X,{item:a.item},null,8,["item"]),t("div",lt,[ct,t("span",null,[p("距離"),t("span",null,f(l(O)(a.item.distance)),1)])])])]))}},dt={class:"w-100 cards card2 d-flex flex-wrap"},ut={class:"col-12 d-flex pb-3"},vt=t("div",{class:"col-1 card-tab-dot dot1"},null,-1),mt={class:"col-11 d-flex justify-content-between"},bt={class:"w-100 d-flex card-tabs"},ft=t("div",{class:"col-2 card-tab justify-content-center me-2"},"起",-1),kt={class:"col-10 card-tab justify-content-start ps-2"},ht={class:"col-12 d-flex pb-3"},_t=t("div",{class:"col-1 card-tab-dot dot2"},null,-1),yt={class:"col-11 d-flex justify-content-between"},gt={class:"w-100 d-flex card-tabs"},$t=t("div",{class:"col-2 card-tab justify-content-center me-2"},"迄",-1),xt={class:"col-10 card-tab justify-content-start ps-2"},pt={__name:"card2",props:{item:{type:Object}},setup(a){const c=a,m=()=>{U(c.item)};return(d,b)=>(n(),i("div",dt,[t("h2",{class:"col-12 mb-3",onClick:m},f(a.item.RouteName),1),t("div",ut,[vt,t("div",mt,[t("div",bt,[ft,t("div",kt,f(a.item.RoadSectionStart||"資料建置中"),1)])])]),t("div",ht,[_t,t("div",yt,[t("div",gt,[$t,t("div",xt,f(a.item.RoadSectionEnd||"資料建置中"),1)])])])]))}},wt={class:"col-12 d-flex"},Ct={class:"col-12 d-none d-lg-flex mb-2 tabs"},St={key:0,class:"oneline"},Bt={__name:"card3",props:{item:{type:Object}},setup(a){const c=a,m=B(),{chooseAttraction:d}=L(m),b=w();N(()=>{if(!Z.isEmpty(c.item.Picture)){const v=new Image;v.src=c.item.Picture.PictureUrl1,v.onload=function(){b.value.classList.remove("default"),b.value.style.backgroundImage=`url(${v.src})`,setTimeout(()=>{b.value.classList.add("has-img")},500)}}});const k=()=>{d.value=c.item,R([c.item.Position.PositionLat,c.item.Position.PositionLon],18),z(c.item.sid)};return(v,$)=>(n(),i("div",{class:"col-lg-12 col-md-5 col-12 cards card3 d-flex flex-wrap",onClick:k},[t("div",{class:"card3-img mt-lg-4 default",ref_key:"backgroundImage",ref:b,style:{}},null,512),t("div",wt,[t("h2",{class:"col-12 my-2",onClick:k},f(a.item.ScenicSpotName),1)]),t("div",Ct,[(n(),i(u,null,x(5,r=>(n(),i(u,{key:r},[a.item["Class"+r]?(n(),i("span",St,f(a.item["Class"+r]),1)):h("",!0)],64))),64))])]))}},Lt={class:"sidebar d-flex flex-wrap align-content-start"},Rt={class:"d-flex w-100 justify-content-between mb-3 flex-wrap"},At={class:"search col-lg-8 col-sm-10 col-8 mb-3"},Pt=t("i",{class:"fa-solid fa-chevron-down"},null,-1),jt=t("option",{value:"",style:{display:"none"}},"請選擇縣市",-1),Nt=["value"],Dt={class:"sort col-lg-4 col-sm-2 col-4 d-flex mb-3 justify-content-center"},Tt={class:"search col-lg-8 col-sm-10 col-8"},It=t("i",{class:"fa fa-search"},null,-1),Vt={class:"d-flex w-100 card-section"},Ot={class:"top-icon"},Et={key:0,class:"find-tab"},Mt={class:"col-12"},Ut=t("i",{class:"fas fa-bicycle"},null,-1),Zt=t("span",{class:"d-none d-lg-block"},"找單車",-1),zt=t("i",{class:"fas fa-umbrella-beach"},null,-1),Ft=t("span",{class:"d-none d-lg-block"},"找景點",-1),qt=t("i",{class:"fas fa-parking"},null,-1),Gt=t("span",{class:"d-none d-lg-block"},"找車位",-1),Ht=t("i",{class:"fas fa-utensils"},null,-1),Jt=t("span",{class:"d-none d-lg-block"},"找餐廳",-1),Kt=["disabled"],Qt=t("i",{class:"fas fa-crosshairs fa-2x"},null,-1),Wt=[Qt],Yt={__name:"sidebar",props:{cardList:{type:Array,default:[]},tab:[String,Number]},emits:["changeCity","changeTab"],setup(a,{emit:c}){const m=a,d=H(),b=B(),{userLocation:k,searchParams:v,cityDataList:$}=L(b),r=w(!1),y=w(""),D=P(()=>{let o=$.value;return o=o.filter(e=>e.type.includes(d.name)),o}),C=P(()=>{let o=m.cardList;if(v.value.ks)switch(d.name){case"BikeStation":o=o.filter(e=>e.StationName.Zh_tw.includes(g.value)||e.StationAddress.Zh_tw.includes(g.value));break;case"BikeRoute":o=o.filter(e=>e.RouteName.includes(g.value));break}if(y.value)switch(y.value){case"distance":o=o.sort((e,s)=>e.distance-s.distance);break;case"rent":o=o.sort((e,s)=>s.AvailableRentBikes-e.AvailableRentBikes);break;case"return":o=o.sort((e,s)=>s.AvailableReturnBikes-e.AvailableReturnBikes);break;case"short-length":o=o.sort((e,s)=>e.CyclingLength-s.CyclingLength);break;case"long-length":o=o.sort((e,s)=>s.CyclingLength-e.CyclingLength);break;default:o=o}return o}),g=w("");N(async()=>{await b.getCityData(),v.value.city=""});const T=async o=>{c("changeCity",o)},A=o=>{c("changeTab",o)},I=()=>{if(!g.value)return!1;if(m.cardList.length<=0)return alert("請先搜尋縣市或是打開定位"),!1;v.value.ks=g.value};return(o,e)=>(n(),i(u,null,[t("div",Lt,[t("div",Rt,[t("div",At,[Pt,j(t("select",{class:"form-control search-button",onChange:e[0]||(e[0]=s=>T(s.target.value)),"onUpdate:modelValue":e[1]||(e[1]=s=>l(v).city=s)},[jt,(n(!0),i(u,null,x(l(D),s=>(n(),i("option",{value:s.city_value,key:s.city_value},f(s.city_name),9,Nt))),128))],544),[[F,l(v).city]])]),t("div",Dt,[t("button",{type:"button",class:"btn btn-change",onClick:e[2]||(e[2]=s=>r.value=!r.value)},[t("i",{class:_(["fa",{"fa-arrow-up-wide-short":!r.value,"fa-arrow-down-wide-short":r.value}])},null,2),p(" 排序 ")]),t("div",{class:_(["sort-section",{open:r.value}])},[t("div",{class:"text-center",onClick:e[3]||(e[3]=s=>{y.value="distance",r.value=!1})},"距離較近"),l(d).name==="BikeStation"?(n(),i(u,{key:0},[t("div",{class:"text-center",onClick:e[4]||(e[4]=s=>{y.value="rent",r.value=!1})},"可借車數"),t("div",{class:"text-center",onClick:e[5]||(e[5]=s=>{y.value="return",r.value=!1})},"可還車數")],64)):h("",!0),l(d).name==="BikeRoute"?(n(),i(u,{key:1},[t("div",{class:"text-center",onClick:e[6]||(e[6]=s=>{y.value="short-length",r.value=!1})},"路線短到長"),t("div",{class:"text-center",onClick:e[7]||(e[7]=s=>{y.value="long-length",r.value=!1})},"路線長到短")],64)):h("",!0)],2)]),t("div",Tt,[j(t("input",{id:"search-button",placeholder:"搜尋站點或路名",type:"text",class:"form-control search-button","onUpdate:modelValue":e[8]||(e[8]=s=>g.value=s)},null,512),[[q,g.value,void 0,{trim:!0}]])]),t("div",{class:"col-lg-4 col-sm-2 col-4 d-flex justify-content-center"},[t("button",{type:"button",class:"btn btn-change",onClick:I},[It,p(" 搜尋 ")])])]),t("div",Vt,[t("div",{class:_(["w-100 card-list pe-3",{Attractions:l(d).name==="Attractions"}])},[l(d).name==="BikeStation"?(n(!0),i(u,{key:0},x(l(C),s=>(n(),S(rt,{key:s.StationID,item:s},null,8,["item"]))),128)):l(d).name==="BikeRoute"?(n(!0),i(u,{key:1},x(l(C),s=>(n(),S(pt,{key:s.RouteName,item:s},null,8,["item"]))),128)):l(d).name==="Attractions"?(n(!0),i(u,{key:2},x(l(C),s=>(n(),S(Bt,{key:s.ScenicSpotID,item:s},null,8,["item"]))),128)):h("",!0)],2)])]),t("div",Ot,[a.tab!=0?(n(),i("div",Et,[t("span",{class:_(["cover",{active:a.tab==2}])},null,2),t("div",Mt,[t("div",{class:_(["col-6 cover-tabs",{active:a.tab==1}]),onClick:e[9]||(e[9]=s=>A(1))},[l(d).name==="BikeStation"?(n(),i(u,{key:0},[Ut,Zt],64)):h("",!0),l(d).name==="Attractions"?(n(),i(u,{key:1},[zt,Ft],64)):h("",!0)],2),t("div",{class:_(["col-6 cover-tabs",{active:a.tab==2}]),onClick:e[10]||(e[10]=s=>A(2))},[l(d).name==="BikeStation"?(n(),i(u,{key:0},[qt,Gt],64)):h("",!0),l(d).name==="Attractions"?(n(),i(u,{key:1},[Ht,Jt],64)):h("",!0)],2)])])):h("",!0),t("div",null,[t("button",{type:"button",class:_(["locate-icon",{"none-locate":l(k).length==0}]),onClick:e[11]||(e[11]=s=>{l(R)(l(k)),l(G)()}),disabled:l(k).length==0},Wt,10,Kt)])])],64))}};export{Yt as _};