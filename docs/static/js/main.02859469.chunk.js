(this.webpackJsonpmovies=this.webpackJsonpmovies||[]).push([[0],{113:function(e,t,a){},114:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(14),o=a.n(c),i=a(10),s=a(164),l=a(184),d=a(183),p=a(83),u=a(163),j=a(185),b=a(30),h=a(12),m=a(188),g=a(2),x=function(e){var t=e.mensaje;return Object(g.jsx)(m.a,{severity:"error",children:t})},O=function(e){var t=Object(n.useRef)(!0),a=Object(n.useState)({data:null,loading:!0,error:null}),r=Object(i.a)(a,2),c=r[0],o=r[1];return Object(n.useEffect)((function(){return function(){t.current=!1}}),[]),Object(n.useEffect)((function(){o({data:null,loading:!0,error:null}),fetch(e).then((function(e){return e.json()})).then((function(e){t.current&&o({loading:!1,error:null,data:e})})).catch((function(){o({data:null,loading:!1,error:"No se pudo cargar la info"})}))}),[e]),c},f="0799b15d3091f6948d82b2274f8e5226",v=a(24),y=a.n(v),_=a(42),C=function(){var e=Object(_.a)(y.a.mark((function e(t){var a,n,r,c;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a="https://api.themoviedb.org/3/search/person?api_key=".concat(f,"&query=").concat(t),e.next=3,fetch(a);case 3:return n=e.sent,e.next=6,n.json();case 6:return r=e.sent,c=r.results,e.abrupt("return",c);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),k=function(){var e=(new Date).getFullYear();return Array(e-1940).fill().map((function(){return e--}))},w=[1,2,3,4,5,6,7,8,9],N=[{index:"Popularidad DESC",value:"popularity.desc"},{index:"Popularidad ASC",value:"popularity.asc"},{index:"Fecha de estreno DESC",value:"primary_release_date.desc"},{index:"Fecha de estreno ASC",value:"primary_release_date.asc"},{index:"T\xedtulo original DESC",value:"original_title.desc"},{index:"T\xedtulo original ASC",value:"original_title.asc"},{index:"Puntuaci\xf3n DESC",value:"vote_average.desc"},{index:"Puntuaci\xf3n ASC",value:"vote_average.asc"}],S=a(8),B=a(191),F=a(165),P=a(78),R=a(186),T=a(79),D=a.n(T),I=a(167),A=a(166),E=a(116),W=a(87),z=Object(u.a)((function(e){return{formControl:{margin:e.spacing(1),flexGrow:1},selectEmpty:{marginTop:e.spacing(2)},search:Object(h.a)({position:"relative",borderRadius:e.shape.borderRadius,backgroundColor:Object(S.c)(e.palette.common.white,.15),"&:hover":{backgroundColor:Object(S.c)(e.palette.common.white,.25)},marginRight:e.spacing(2),marginLeft:0,width:"100%"},e.breakpoints.up("sm"),{marginLeft:e.spacing(3),width:"auto"}),searchIcon:{padding:e.spacing(0,2),height:"100%",position:"absolute",pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center"},formulario:{padding:"25px 0"},buscarFiltros:{display:"flex",justifyContent:"space-between",alignItems:"center"}}})),L=function(e){var t=e.guardarFiltros,a=Object(n.useState)(!1),r=Object(i.a)(a,2),c=r[0],o=(r[1],function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=Object(n.useState)(e),a=Object(i.a)(t,2),r=a[0],c=a[1];return[r,function(e){var t=e.target;c(Object(b.a)(Object(b.a)({},r),{},Object(h.a)({},t.name,t.value)))},function(){c(e)}]}({titulo:"",genero:"",puntuacion:"",year:"",with_cast:"",orden:"popularity.desc"})),l=Object(i.a)(o,2),d=l[0],p=l[1],u=(d.titulo,d.genero),m=d.puntuacion,v=d.year,y=d.with_cast,_=d.orden,S="https://api.themoviedb.org/3/genre/movie/list?api_key=".concat(f),T=O(S).data,L=T?T.genres:[],V=function(e){e.preventDefault(),console.log("formFiltersValues"),console.log(d);var a="";if(""!==y.trim()){var n=document.getElementById("autocomplete-cast");a=n.options.length>0?n.options[0].dataset.value:y}t(Object(b.a)(Object(b.a)({},d),{},{with_cast:a}))},q=z();return Object(g.jsx)(s.a,{maxWidth:"md",children:Object(g.jsxs)("form",{onSubmit:V,className:q.formulario,children:[Object(g.jsx)(W.a,{variant:"h6",color:"textSecondary",component:"h6",children:"Buscar por t\xedtulo"}),Object(g.jsx)(j.a,{marginBottom:"20px",children:Object(g.jsx)(R.a,{id:"standard-basic",name:"titulo",label:"Buscar por titulo",color:"secondary",onChange:p,fullWidth:!0,InputProps:{startAdornment:Object(g.jsx)(A.a,{position:"start",children:Object(g.jsx)(D.a,{})})}})}),Object(g.jsx)(W.a,{variant:"h6",color:"textSecondary",component:"h6",children:"Buscar por filtros"}),Object(g.jsxs)(j.a,{className:q.buscarFiltros,children:[Object(g.jsxs)(F.a,{className:q.formControl,children:[Object(g.jsx)(B.a,{shrink:!0,htmlFor:"genre-native-label-placeholder",color:"secondary",children:"G\xe9nero"}),Object(g.jsxs)(P.a,{value:u,onChange:p,color:"secondary",inputProps:{name:"genero",id:"genre-native-label-placeholder"},children:[Object(g.jsx)("option",{value:"",children:"-Cualquiera-"}),L.map((function(e){return Object(g.jsx)("option",{value:e.id,children:e.name},e.id)}))]})]}),Object(g.jsxs)(F.a,{className:q.formControl,children:[Object(g.jsx)(B.a,{shrink:!0,htmlFor:"puntuacion-native-label-placeholder",color:"secondary",children:"Puntuaci\xf3n"}),Object(g.jsxs)(P.a,{value:m,onChange:p,color:"secondary",inputProps:{name:"puntuacion",id:"puntuacion-native-label-placeholder"},children:[Object(g.jsx)("option",{value:"",children:"-Cualquiera-"}),w.map((function(e){return Object(g.jsxs)("option",{value:e,children:["+",e]},e)}))]})]}),Object(g.jsxs)(F.a,{className:q.formControl,children:[Object(g.jsx)(B.a,{shrink:!0,htmlFor:"year-native-label-placeholder",color:"secondary",children:"A\xf1o"}),Object(g.jsxs)(P.a,{value:v,onChange:p,color:"secondary",inputProps:{name:"year",id:"year-native-label-placeholder"},children:[Object(g.jsx)("option",{value:"",children:"-Cualquiera-"}),k().map((function(e){return Object(g.jsx)("option",{value:e,children:e},e)})),Object(g.jsx)("option",{value:"1940",children:"1940"})]})]}),Object(g.jsxs)(F.a,{className:q.formControl,children:[Object(g.jsx)(B.a,{shrink:!0,htmlFor:"orden-native-label-placeholder",color:"secondary",children:"Orden"}),Object(g.jsx)(P.a,{value:_,onChange:p,color:"secondary",inputProps:{name:"orden",id:"orden-native-label-placeholder"},children:N.map((function(e){return Object(g.jsx)("option",{value:e.value,children:e.index},e.value)}))})]}),Object(g.jsxs)(F.a,{className:q.formControl,children:[Object(g.jsx)(B.a,{shrink:!0,htmlFor:"with_cast",color:"secondary",children:"Actor/Actriz"}),Object(g.jsx)(E.a,{list:"autocomplete-cast",id:"with_cast",name:"with_cast",color:"secondary",onChange:p,onKeyUp:function(e){var t=e.target.value;if(t.length>2){var a=document.getElementById("autocomplete-cast");a.innerHTML="",C(t).then((function(e){e.map((function(e){return a.innerHTML+="<option data-value=".concat(e.id,">\n                            ").concat(e.name,"\n                        </option>")}))}))}},inputProps:{list:"autocomplete-cast"}}),Object(g.jsx)("datalist",{id:"autocomplete-cast"})]}),Object(g.jsx)(I.a,{variant:"contained",color:"secondary",onClick:V,children:"Buscar"})]}),c?Object(g.jsx)(x,{mensaje:"Debe haber al menos un campo de b\xfasqueda"}):null]})})},V=a(187),q=Object(u.a)((function(e){return{paginacion:{display:"flex",marginBottom:"20px",justifyContent:"center","& > *":{marginTop:e.spacing(2)},"& > span":{alignSelf:"center",marginLeft:"10px"}}}})),G=function(e){var t=e.totalpaginas,a=e.paginaactual,n=e.handlePagination,r=q();return Object(g.jsxs)(s.a,{maxWidth:"xl",className:r.paginacion,children:[Object(g.jsx)(V.a,{variant:"outlined",shape:"rounded",siblingCount:2,boundaryCount:2,count:t,page:a,onChange:n}),Object(g.jsx)(W.a,{variant:"body2",color:"textPrimary",component:"span",children:"".concat(a," de ").concat(t)})]})},M=a(169),U=a(170),H=a(171),J=a(172),K=a(81),Y=a.n(K),Q=a.p+"static/media/no_img.04fe48ca.png",X=a(162),Z=a(168),$=a(80),ee=a.n($),te=a(194),ae=a(190),ne=function(){var e=Object(_.a)(y.a.mark((function e(t){var a,n,r,c;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a="https://www.omdbapi.com/?i=".concat(encodeURI(t),"&apikey=b7618069"),e.next=3,fetch(a);case 3:return n=e.sent,e.next=6,n.json();case 6:return r=e.sent,(c=r.Ratings).forEach((function(e){"Internet Movie Database"===e.Source&&(e.Source="IMDB")})),e.abrupt("return",c);case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),re=Object(u.a)((function(e){return{root:{},modal:{display:"flex",alignItems:"center",justifyContent:"center",backgroundSize:"cover",backgroundRepeat:"no-repeat"},paper:{display:"flex",color:"#fff",outline:0,padding:"0px !important"},contenido:{padding:e.spacing(2,4)},closeButton:{position:"absolute",right:"5px",top:"5px"},generos:{display:"flex",flexWrap:"wrap",listStyle:"none",padding:"0","& > li":{paddingRight:"5px",paddingBottom:"5px"}},castContainer:{padding:"0",display:"flex"},cast:{display:"flex",flexDirection:"column",flexGrow:.1,flexBasis:0,marginRight:e.spacing(3),"&:last-child":{marginRight:0}}}})),ce=function(e){var t=e.movieDetails,a=e.movieCast,r=e.handleClose,c=e.open;console.log("movieDetails"),console.log(t);t.id;var o=t.title,l=(t.original_title,t.original_language,t.backdrop_path),d=t.poster_path,p=t.genres,u=t.overview,j=t.tagline,b=t.vote_average,h=t.vote_count,m=t.release_date,x=t.runtime,O=t.imdb_id,f="https://image.tmdb.org/t/p/original".concat(l),v="https://image.tmdb.org/t/p/w500".concat(d),y=function(e){var t=Object(n.useState)({ratings:[]}),a=Object(i.a)(t,2),r=a[0],c=a[1];return Object(n.useEffect)((function(){ne(e).then((function(e){c({ratings:e})}))}),[e]),r}(O).ratings,_=re();return Object(g.jsx)("div",{children:Object(g.jsxs)(ae.a,{onClose:r,"aria-labelledby":"customized-dialog-title",open:c,className:_.modal,style:{backgroundImage:"url(".concat(f,")")},maxWidth:"lg",PaperProps:{style:{backgroundColor:"rgba(0, 0, 0, .5)",boxShadow:"none",borderRadius:"6px"}},BackdropProps:{style:{backgroundColor:"transparent"}},children:[Object(g.jsx)(Z.a,{className:_.paper,children:Object(g.jsxs)("div",{style:{display:"flex"},children:[Object(g.jsx)("img",{src:d?v:Q,alt:o,style:{maxWidth:"50%"}}),Object(g.jsxs)("div",{className:_.contenido,children:[Object(g.jsx)(X.a,{"aria-label":"close",className:_.closeButton,onClick:r,children:Object(g.jsx)(ee.a,{className:_.title,style:{fontSize:30,color:"#fff"}})}),Object(g.jsx)("h2",{id:"transition-modal-title",children:o}),j?Object(g.jsx)("h3",{style:{color:"greenyellow"},children:j}):null,Object(g.jsx)("p",{id:"transition-modal-description",children:u}),Object.keys(t).length>0?Object(g.jsxs)(g.Fragment,{children:[Object(g.jsxs)("p",{children:["Fecha de estreno: ",m]}),Object(g.jsxs)("p",{children:["Duraci\xf3n: ",function(e){var t=Math.floor(e/60),a=e%60;return a=a<10?"0"+a:a,"".concat(t,"h ").concat(a,"mins")}(x)]}),p.length>0?Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)("p",{children:"G\xe9neros:"}),Object(g.jsx)("ul",{className:_.generos,children:p.map((function(e){return Object(g.jsx)("li",{children:Object(g.jsx)(te.a,{label:e.name})},e.id)}))})]}):null,Object(g.jsx)("p",{children:"Puntuacion:"}),y.length>0?Object(g.jsxs)(g.Fragment,{children:[Object(g.jsxs)("li",{children:["TMDB: ",b," de ",h," votos"]}),y.map((function(e){return Object(g.jsx)("li",{children:"".concat(e.Source,": ").concat(e.Value)},e.Source)}))]}):Object(g.jsxs)("li",{children:["TMDB: ",b," de ",h," votos"]})]}):null,Object(g.jsx)("p",{children:"Reviews/criticas:"})]})]})}),Object.keys(t).length>0&&a.length>0?Object(g.jsxs)("div",{style:{color:"white",padding:"24px"},children:[Object(g.jsx)("h3",{children:"Reparto:"}),Object(g.jsx)(s.a,{maxWidth:"xl",className:_.castContainer,children:a.slice(0,10).map((function(e){return Object(g.jsxs)("div",{className:_.cast,children:[Object(g.jsx)("img",{src:e.profile_path?"https://image.tmdb.org/t/p/w185".concat(e.profile_path):Q,alt:e.character,style:{maxWidth:"100%"}}),Object(g.jsxs)("div",{style:{padding:"10px 0"},children:[Object(g.jsx)("span",{style:{display:"block"},children:e.character}),Object(g.jsx)("span",{style:{color:"grey"},children:e.name})]})]},e.id)}))})]}):null]})})},oe=Object(u.a)((function(e){return{root:{position:"relative",borderRadius:"6px"},media:{height:0,paddingTop:"145%"},cardContent:{display:"flex",alignItems:"center"},cardTitle:{flexGrow:1},cardAverage:{display:"flex",position:"absolute",top:0,right:0,backgroundColor:"rgba(0,0,0, .4)",padding:"5px 5px 0 5px",borderBottomLeftRadius:"6px","& > span:last-child":{alignSelf:"center"}},modal:{display:"flex",alignItems:"center",justifyContent:"center",backgroundSize:"cover",backgroundRepeat:"no-repeat"},paper:{display:"flex",color:"#fff",outline:0,padding:"0px !important"},contenido:{padding:e.spacing(2,4)},closeButton:{position:"absolute",right:"5px",top:"5px"},generos:{display:"flex",listStyle:"none",padding:"0","& > li":{paddingRight:"5px"}},castContainer:{},cast:{display:"flex",flexDirection:"column",flexGrow:1,flexBasis:0,marginRight:e.spacing(3),"&:last-child":{marginRight:0}}}})),ie=function(e){var t=r.a.useState(!1),a=Object(i.a)(t,2),n=a[0],c=a[1],o=e.id,s=e.title,l=e.original_title,d=e.original_language,p=e.poster_path,u=e.vote_average,b="https://image.tmdb.org/t/p/w500".concat(p),h=oe(),m="https://api.themoviedb.org/3/movie/".concat(o,"?api_key=").concat(f),x=O(m).data,v=x||[],y="https://api.themoviedb.org/3/movie/".concat(o,"/credits?api_key=").concat(f),_=O(y).data,C=_?_.cast.filter((function(e){return e.profile_path})):[];return Object(g.jsxs)(g.Fragment,{children:[Object(g.jsxs)(M.a,{className:h.root,children:[Object(g.jsx)(U.a,{className:h.media,image:p?b:Q}),Object(g.jsxs)(H.a,{className:h.cardContent,children:[Object(g.jsx)(W.a,{variant:"body2",color:"textPrimary",component:"span",className:h.cardTitle,children:"es"===d?l:s}),Object(g.jsxs)(j.a,{className:h.cardAverage,children:[Object(g.jsx)(W.a,{variant:"body2",color:"secondary",component:"span",style:{lineHeight:"initial"},children:Object(g.jsx)(Y.a,{className:h.title,style:{fontSize:"2rem"}})}),Object(g.jsx)(W.a,{variant:"body2",color:"secondary",component:"span",style:{fontSize:"1.4rem"},children:u})]})]}),Object(g.jsx)(J.a,{style:{display:"flex",justifyContent:"center"},children:Object(g.jsx)(I.a,{style:{width:"100%"},size:"small",color:"primary",variant:"contained",onClick:function(){c(!0)},children:"Ver detalles"})})]}),n?Object(g.jsx)(ce,{movieDetails:v,movieCast:C,handleClose:function(){c(!1)},open:n}):null]})},se=a(174),le=a(173),de=Object(u.a)((function(e){return{cargando:{textAlign:"center",border:"1px solid red"},total:{textAlign:"center",marginTop:"10px"}}})),pe=function(e){var t=e.busqueda,a=t.titulo,r=t.genero,c=t.puntuacion,o=t.year,l=t.with_cast,d=t.orden,p=Object(n.useState)({movies:[],loading:!0}),u=Object(i.a)(p,2),j=u[0],h=u[1],x=Object(n.useState)(1),O=Object(i.a)(x,2),v=O[0],C=O[1],k=Object(n.useState)(1),w=Object(i.a)(k,2),N=w[0],S=w[1],B=Object(n.useState)(1),F=Object(i.a)(B,2),P=F[0],R=F[1];Object(n.useEffect)((function(){(function(){var e=Object(_.a)(y.a.mark((function e(){var t,n,i,s,p;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t="",""!==a.trim()?t="https://api.themoviedb.org/3/search/movie?query=".concat(a,"&api_key=").concat(f,"&page=").concat(v):(n=[{paramName:"with_genres",paramValue:r},{paramName:"with_cast",paramValue:l},{paramName:"vote_average.gte",paramValue:c},{paramName:"primary_release_year",paramValue:o},{paramName:"sort_by",paramValue:d}],t="https://api.themoviedb.org/3/discover/movie?api_key=".concat(f,"&page=").concat(v),""!==(i=n.filter((function(e){return""!==e.paramValue})).map((function(e){return e.paramName+"="+e.paramValue})).join("&"))&&(t+="&".concat(i)),console.log({url:t})),e.next=4,fetch(t);case 4:return s=e.sent,e.next=7,s.json();case 7:p=e.sent,h({movies:p.results,loading:!1}),S(p.total_pages),R(p.total_results);case 11:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[t,v]);var T=function(e,t){C(t)},D=de();return Object(g.jsxs)(g.Fragment,{children:[a&&Object(g.jsxs)(W.a,{variant:"h3",color:"textPrimary",component:"h3",children:["Resultados para:\xa0",Object(g.jsx)(W.a,{variant:"h3",color:"secondary",component:"span",children:a})]}),j.loading&&Object(g.jsx)(le.a,{color:"secondary"}),j.movies.length>0?Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)(s.a,{maxWidth:"xl",className:D.total,children:Object(g.jsxs)(W.a,{variant:"h6",color:"primary",component:"h6",children:[P," pel\xedculas encontradas"]})}),Object(g.jsx)(G,{totalpaginas:N,paginaactual:v,handlePagination:T}),Object(g.jsx)(se.a,{container:!0,spacing:3,children:j.movies.map((function(e){return Object(g.jsx)(se.a,{item:!0,xs:4,sm:3,xl:2,children:Object(g.jsx)(ie,Object(b.a)({},e),e.id)},e.id)}))}),Object(g.jsx)(G,{totalpaginas:N,paginaactual:v,handlePagination:T})]}):null,!j.loading&&j.movies.length<1&&Object(g.jsx)(s.a,{maxWidth:"md",className:D.total,children:Object(g.jsx)(m.a,{severity:"warning",children:"No se encontraron resultados"})})]})},ue=a(175),je=a(176),be=a(192),he=a(178),me=a(177),ge=a.p+"static/media/tmdb_logo_blue_square_2.e51fc2a7.svg",xe=Object(u.a)((function(e){return{root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1,textAlign:"center",fontSize:"3rem"},logo:{maxWidth:"5rem"}}})),Oe=function(e){var t=e.theme,a=e.setTheme,n=xe();return Object(g.jsx)(ue.a,{position:"static",className:n.root,children:Object(g.jsxs)(je.a,{children:[Object(g.jsx)("img",{src:ge,alt:ge,className:n.logo}),Object(g.jsx)(W.a,{variant:"h2",className:n.title,children:"Movies App"}),Object(g.jsx)(me.a,{children:Object(g.jsx)(he.a,{control:Object(g.jsx)(be.a,{checked:t,onChange:function(e){a(e.target.checked)},"aria-label":"login switch"}),label:t?"Dark mode":"Light mode"})})]})})},fe=a(179),ve=a(180),ye=a(181),_e=a(82),Ce=a.n(_e),ke=Object(u.a)((function(e){return{title:{},titleBar:{background:"linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"},rating:{},topSlider:{flexWrap:"nowrap",overflow:"hidden"},topTitle:{fontSize:"2rem",margin:"20px 0 10px 0",borderLeft:"5px solid",paddingLeft:"7px"}}})),we=function(e){var t=e.topUrl,a=e.topTitle,n=O(t).data,r=n?n.results.filter((function(e){return e.backdrop_path})):[],c=ke();return Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)(W.a,{variant:"h3",color:"secondary",component:"h3",className:c.topTitle,children:a}),Object(g.jsx)(se.a,{container:!0,spacing:0,className:c.topSlider,children:r.length>0?r.slice(0,6).map((function(e){return Object(g.jsx)(se.a,{item:!0,xs:3,xl:2,children:Object(g.jsx)(fe.a,{className:c.gridList,cols:1,children:Object(g.jsxs)(ve.a,{children:[Object(g.jsx)("img",{src:e.backdrop_path?"https://image.tmdb.org/t/p/w500".concat(e.backdrop_path):Q,alt:e.title,className:""}),Object(g.jsx)(ye.a,{title:e.title,classes:{root:c.titleBar,title:c.title},actionIcon:Object(g.jsxs)(X.a,{"aria-label":"star ".concat(e.title),color:"secondary",children:[Object(g.jsx)(Ce.a,{className:c.title,color:"secondary"}),Object(g.jsx)("span",{className:c.rating,children:e.vote_average})]})})]},e.id)})},e.id)})):null})]})},Ne=(a(113),a(63)),Se=a(182);var Be=function(){var e=Object(n.useState)({}),t=Object(i.a)(e,2),a=t[0],r=t[1],c=Object(n.useState)(!0),o=Object(i.a)(c,2),b=o[0],h=o[1],m=b?"dark":"light",x=Ne.a[500],O=b?Se.a[400]:Se.a[500],v=b?Ne.a[300]:Ne.a[800],y=Object(p.a)({palette:{type:m,primary:{main:x},secondary:{main:O},text:{secondary:v}}}),_=Object(u.a)((function(e){return{search:{backgroundImage:"linear-gradient(60deg, rgba(0, 0, 0, 0.1) 25%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.1) 75%, rgba(0, 0, 0, 0.1)), linear-gradient(120deg, rgba(0, 0, 0, 0.1) 25%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.1) 75%, rgba(0, 0, 0, 0.1))",boxShadow:"2px 0px 3px 2px rgb(0 0 0 / 10%)"}}}))(),C="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=".concat(f),k="https://api.themoviedb.org/3/discover/movie/?certification_country=US&sort_by=vote_average.desc&api_key=".concat(f);return Object(g.jsxs)(d.a,{theme:y,children:[Object(g.jsx)(l.a,{}),Object(g.jsx)(Oe,{theme:b,setTheme:h}),Object(g.jsxs)(s.a,{maxWidth:"xl",children:[Object(g.jsx)(we,{topUrl:C,topTitle:"Top 5 mas populares"}),Object(g.jsx)(we,{topUrl:k,topTitle:"Top 5 mejor valoradas"})]}),Object(g.jsx)(j.a,{margin:"50px auto",className:_.search,children:Object(g.jsx)(L,{guardarFiltros:r})}),Object.keys(a).length>0?Object(g.jsx)(s.a,{maxWidth:"xl",children:Object(g.jsx)(pe,{busqueda:a})}):null]})};o.a.render(Object(g.jsx)(Be,{}),document.getElementById("root"))}},[[114,1,2]]]);
//# sourceMappingURL=main.02859469.chunk.js.map