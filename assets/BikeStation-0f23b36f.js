import{_ as l}from"./sidebar-062ab9a7.js";import{u as _,s as b,r as m,o as v,a as y,m as c,b as d,c as f,d as k}from"./index-72e18a07.js";const B={__name:"BikeStation",setup(g){const e=_(),{userLocation:o,bikeTab:n,chooseNearbyBikeDataList:t}=b(e),s=m([]);v(async()=>{if(y(),o.value.length>0){const a=await e.getNearbyBikeData(o.value);s.value=a,t.value=a,c(t.value)}});const i=async a=>{const r=await e.getCityBikeData(a);s.value=r},u=async a=>{n.value=a,c(t.value)};return(a,r)=>(d(),f(l,{cardList:s.value,tab:k(n),onChangeCity:i,onChangeTab:u},null,8,["cardList","tab"]))}};export{B as default};
