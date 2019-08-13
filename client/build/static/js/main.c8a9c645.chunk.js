(window.webpackJsonpclient=window.webpackJsonpclient||[]).push([[0],{35:function(e,t,a){e.exports=a(45)},40:function(e,t,a){},45:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(14),c=a.n(l),o=(a(40),a(18)),i=a(12),s=a(19),m=a(20),u=a(25),p=a(6),h=a(3),E=a(4),f=a(78),d=a(79),g=a(80),v=a(71),b=a(81),O=a(77),w=a(47),y=a(72),j=a(76),x=a(75),N=a(73),S=a(74);function D(e){return r.a.createElement(v.a,{component:"h2",variant:"h6",color:"primary",gutterBottom:!0},e.children)}var k=function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return console.log(this.props.data),r.a.createElement(r.a.Fragment,null,r.a.createElement(D,null," Timesheet "),r.a.createElement(y.a,{size:"medium"},r.a.createElement(N.a,null,r.a.createElement(S.a,null,r.a.createElement(x.a,null,"Date"),r.a.createElement(x.a,null,"Start Time"),r.a.createElement(x.a,null,"End Time"),r.a.createElement(x.a,null,"Duration"),r.a.createElement(x.a,null,"Rating"),r.a.createElement(x.a,{align:"right"},"Task(s)"))),r.a.createElement(j.a,null,this.props.data.map(function(e){var t=new Date(e.start),a=new Date(e.end),n=a-t;Math.floor(n/36e5%60),Math.floor(n/6e4%60),n=function(e,t){var a=t-e,n=Math.floor(a/36e5%60),r=Math.floor(a/6e4%60);return n?n+" hours and "+r+" minutes":r+" minutes"}(t,a);return r.a.createElement(S.a,{key:e.rowid},r.a.createElement(x.a,null,t.toLocaleDateString()),r.a.createElement(x.a,null,t.toLocaleTimeString()),r.a.createElement(x.a,null,t.toLocaleTimeString()),r.a.createElement(x.a,null,n),r.a.createElement(x.a,null,2),r.a.createElement(x.a,{align:"right"},"worc_lock"))}))))}}]),t}(n.Component),B=a(46),P=a(82),T=Object(B.a)(function(e){return{button:{},input:{display:"none"}}});function W(e){var t=T();return r.a.createElement(r.a.Fragment,null,r.a.createElement(v.a,{component:"h1",variant:"h1",color:"primary",align:"center"},e.children),r.a.createElement(O.a,{container:!0,spacing:3,justify:"center",alignItems:"center"},r.a.createElement(O.a,{item:!0,xs:3},r.a.createElement(P.a,{variant:"outlined",className:t.button,color:"primary",fullWidth:"true"},"Start Working")),r.a.createElement(O.a,{item:!0,xs:3},r.a.createElement(P.a,{variant:"outlined",className:t.button,color:"secondary",fullWidth:"true"},"End Session"))))}function I(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function M(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?I(a,!0).forEach(function(t){Object(p.a)(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):I(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}var L="http://localhost:8000/api",C=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(s.a)(this,Object(m.a)(t).call(this,e))).state={timerState:"hey :)",timesheet:[]},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.interval=setInterval(function(){return fetch(L+"/timer").then(function(e){return e.json()}).then(function(t){t.state!=e.state.timerState&&e.setState({timerState:t.state})})},1e3),fetch(L+"/timesheet").then(function(e){return e.json()}).then(function(t){1===t.result&&e.setState({timesheet:t.rows})})}},{key:"componentWillUnmount",value:function(){clearInterval(this.interval)}},{key:"render",value:function(){var e=this.state.timerState,t=this.props.classes,a=(this.state.timesheet,Object(h.a)(t.paper,t.fixedHeight));return r.a.createElement("div",{className:t.root},r.a.createElement(f.a,null),r.a.createElement(d.a,{className:t.appBar},r.a.createElement(g.a,{className:t.toolbar},r.a.createElement(v.a,{component:"h1",variant:"h6",color:"inherit",noWrap:!0,className:t.title},"ADD ME ON LINKEDIN"))),r.a.createElement("main",{className:t.content},r.a.createElement("div",{className:t.appBarSpacer}),r.a.createElement(b.a,{maxWidth:"lg",className:t.container},r.a.createElement(O.a,{container:!0,spacing:3},r.a.createElement(O.a,{item:!0,xs:12},r.a.createElement(w.a,{className:t.paper},r.a.createElement(W,null," 00:00:00 "))),r.a.createElement(O.a,{item:!0,xs:12,md:8,lg:9},r.a.createElement(w.a,{className:a},r.a.createElement("span",null," ",e," "))),r.a.createElement(O.a,{item:!0,xs:12,md:4,lg:3},r.a.createElement(w.a,{className:a},r.a.createElement("span",null," ",e," "))),r.a.createElement(O.a,{item:!0,xs:12},r.a.createElement(w.a,{className:t.paper},r.a.createElement(k,{data:this.state.timesheet})))))))}}]),t}(n.Component),F=Object(E.a)(function(e){return{root:{display:"flex"},appBar:{},toolbar:{},title:{flexGrow:1},content:{flexGrow:1,height:"100vh",overflow:"auto"},appBarSpacer:M({},e.mixins.toolbar),container:{paddingTop:e.spacing(4),paddingBottom:e.spacing(4)},paper:{padding:e.spacing(2),display:"flex",overflow:"auto",flexDirection:"column"},fixedHeight:{height:240}}},{withTheme:!0})(C);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(F,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[35,1,2]]]);
//# sourceMappingURL=main.c8a9c645.chunk.js.map