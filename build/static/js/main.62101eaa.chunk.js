(this.webpackJsonptermproject=this.webpackJsonptermproject||[]).push([[0],{117:function(e,t){},124:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(57),o=n.n(c),l=n(6),u=n(2),s=n.n(u),i=function(e){return s.a.post("/users/register",e).then((function(e){return e.data}))},m=n(3),p=Object(m.a)(),d=n(58),h=n(59);function g(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function f(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?g(n,!0).forEach((function(t){Object(d.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):g(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var E={username:"yeet"},b=Object(h.a)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:E,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"LOGIN_USER":var n=f({},e,{username:t.data.username});return n;case"LOGOUT_USER":return E;default:return e}})),v=function(){var e=Object(a.useState)(""),t=Object(l.a)(e,2),n=t[0],c=t[1],o=Object(a.useState)(""),u=Object(l.a)(o,2),s=u[0],m=u[1],d=Object(a.useState)(""),h=Object(l.a)(d,2),g=h[0],f=h[1],E=Object(a.useState)(""),v=Object(l.a)(E,2),y=v[0],C=v[1];return r.a.createElement("div",{className:"user-input"},r.a.createElement("img",{src:"mainLogo.png",id:"register-logo",alt:"Logo for puppy poker"}),r.a.createElement("form",{onSubmit:function(e){if(e.preventDefault(),0===n.length||0===s.length||0===y.length)alert("Make sure you've filled in all of the fields");else if(s!==g)alert("Your passwords don't match");else{var t={username:n,password:s,email:y};i(t).then((function(){b.dispatch({type:"LOGIN_USER",data:{username:t.username}}),p.push("/gameslobby")})).catch((function(e){p.push("register")}))}}},r.a.createElement("input",{type:"text",onChange:function(e){c(e.target.value)},placeholder:"Username",value:n}),r.a.createElement("br",null),r.a.createElement("input",{type:"password",onChange:function(e){m(e.target.value)},placeholder:"Password",value:s}),r.a.createElement("br",null),r.a.createElement("input",{type:"password",onChange:function(e){f(e.target.value)},placeholder:"Password",value:g}),r.a.createElement("br",null),r.a.createElement("input",{type:"email",onChange:function(e){C(e.target.value)},placeholder:"Email",value:y}),r.a.createElement("br",null),r.a.createElement("input",{type:"submit",value:"Register"})))},y=function(e){return s.a.post("users/login",e).then((function(e){return e.data}))},C=function(){var e=Object(a.useState)(""),t=Object(l.a)(e,2),n=t[0],c=t[1],o=Object(a.useState)(""),u=Object(l.a)(o,2),s=u[0],i=u[1];return r.a.createElement("div",{className:"user-input"},r.a.createElement("img",{src:"mainLogo.png",id:"login-logo",alt:"Logo for puppy poker"}),r.a.createElement("form",{onSubmit:function(e){if(e.preventDefault(),0===n.length||0===s.length)alert("Please enter your username and password.");else{var t={username:n,password:s};y(t).then((function(){b.dispatch({type:"LOGIN_USER",data:{username:t.username}}),p.push("/gameslobby")})).catch((function(e){console.log("error")}))}}},r.a.createElement("input",{type:"text",value:n,onChange:function(e){c(e.target.value)},placeholder:"Username"}),r.a.createElement("br",null),r.a.createElement("input",{type:"password",value:s,onChange:function(e){i(e.target.value)},placeholder:"Password"}),r.a.createElement("br",null),r.a.createElement("input",{type:"submit",value:"Login"})))},O=function(){return s.a.get("getGames").then((function(e){return e.data}))},j=function(){return s.a.post("createGame").then((function(e){return e.data0}))},k=(n(86),n(17)),S=n(18),N=n(21),I=n(19),w=n(22),B=(n(87),function(e){function t(e){var n;return Object(k.a)(this,t),(n=Object(N.a)(this,Object(I.a)(t).call(this,e))).state={},n}return Object(w.a)(t,e),Object(S.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"msgWrapper"},r.a.createElement("span",{id:"name"},this.props.username+":"),r.a.createElement("div",{id:"text"}," "+this.props.msg))}}]),t}(a.Component)),L=(n(88),n(20)),R=n.n(L),M=window.location.hostname;console.log(M);var P=M.lastIndexOf("/");P>0?M=M.substr(0,P):M+=":3001",console.log(M);var A=R()("https://wade-ramos-knack-anjomshoaa.herokuapp.com/"),x=function(e){function t(e){var n;Object(k.a)(this,t);return(n=Object(N.a)(this,Object(I.a)(t).call(this,e))).handleSubmit=function(e){e.preventDefault(),A.emit("income-msg",{msg:n.state.userMessage,user:b.getState().username})},n.handleInputChange=function(e){e.preventDefault(),n.setState({userMessage:e.target.value})},n.state={chatMsgs:[],userMessage:"",income:0},n.chat="none",n}return Object(w.a)(t,e),Object(S.a)(t,[{key:"componentDidMount",value:function(){this.chat=document.getElementById("chat"),A.emit("join","lobby")}},{key:"componentDidUpdate",value:function(){null!==this.chat.scrollHeight&&(this.chat.scrollTop=this.chat.scrollHeight)}},{key:"componentWillMount",value:function(){var e=this;A.on("chat",(function(t){var n=t.incomeMsg,a=t.user;e.state.chatMsgs.push(r.a.createElement(B,{username:a.charAt(0).toUpperCase()+a.slice(1),msg:n})),e.setState({userMessage:""})}))}},{key:"render",value:function(){return r.a.createElement("div",{className:"wrapper"},r.a.createElement("div",{className:"content"},r.a.createElement("div",{id:"chat-container"},r.a.createElement("div",{id:"chat"},this.state.chatMsgs),r.a.createElement("form",{id:"chatForm",onSubmit:this.handleSubmit,autoComplete:"off"},r.a.createElement("input",{type:"text",className:"chat-input",placeholder:"message",message:"userMessage",value:this.state.userMessage,onChange:this.handleInputChange})),this.state.chatMsgs)))}}]),t}(a.Component),H=function(){return r.a.createElement("div",null,r.a.createElement("div",{className:"game-tiles"},r.a.createElement("form",null,r.a.createElement("input",{type:"submit",value:"Enter Game",title:"Enter Game",className:"enter-game-button"}))))},D=function(){return r.a.createElement("div",null,r.a.createElement("div",{className:"lobby-username"},r.a.createElement("h2",null,b.getState().username)),r.a.createElement("div",{className:"winnings"},r.a.createElement("h4",null,"Winnings:")),r.a.createElement("div",{className:"userInfo"},r.a.createElement("img",{src:"./profileIcon.png",id:"profile-logo"}),r.a.createElement("button",{type:"button",className:"log-out",onClick:function(){b.dispatch({type:"LOGOUT_USER"}),p.push("/")}},"Log Out"),r.a.createElement("br",null),r.a.createElement("button",{type:"button",className:"create-game",onClick:function(){j().then((function(){})).catch((function(e){console.log(e),p.push("/gameslobby")}))}},"Create Game"),r.a.createElement("br",null)))},G=function(){var e=Object(a.useState)(null),t=Object(l.a)(e,2),n=t[0],c=t[1];return Object(a.useEffect)((function(){""===b.getState().username&&p.push("/login"),console.log("in use effect"),O().then((function(e){c(e)})).catch((function(e){console.log(e)}))}),[]),null===n?r.a.createElement("h2",null,"Loading..."):r.a.createElement("div",{className:"game-lobby-container"},r.a.createElement("div",{className:"userInfo"},D()),r.a.createElement("div",{className:"chat"},r.a.createElement(x,null)),r.a.createElement("div",{className:"games"},H()))},U=function(e){var t=e.card,n="resources/".concat(t,".png");return r.a.createElement("img",{src:n,alt:"This players hole card",id:"hole-card"})},W=function(e){return s.a.post("".concat(e,"/").concat(b.getState().username,"/joingame")).then((function(e){return e.data}))},T=function(e){var t=e.player,n=e.index,a=e.gameId;return null===t.username?r.a.createElement("div",{id:"player".concat(n)},r.a.createElement("button",{className:"join-button",onClick:function(e){e.preventDefault(),W(a).then((function(){console.log("success")})).catch((function(e){console.log(e)}))}},"Join Game")):t.isInHand?r.a.createElement("div",{className:"player",id:"player".concat(n)},r.a.createElement("div",{id:"card"},t.holeCards.map((function(e,t){return r.a.createElement(U,{key:t,card:e})}))),r.a.createElement("div",{className:"play-text-info"},r.a.createElement("div",null,t.username),r.a.createElement("div",null,"Chips: ",t.chipCount))):r.a.createElement("div",{className:"not-in-hand",id:"player".concat(n)},r.a.createElement("div",{className:"play-text-info"},r.a.createElement("div",null,t.username),r.a.createElement("div",null,"Chips: ",t.chipCount)))},_=function(e){var t=e.cards,n=e.currentBettingRound;return 3===n?r.a.createElement("div",{id:"community-cards"},t.map((function(e,t){return r.a.createElement(U,{key:t,card:e})}))):2===n?r.a.createElement("div",{id:"community-cards"},r.a.createElement(U,{card:t[0]}),r.a.createElement(U,{card:t[1]}),r.a.createElement(U,{card:t[2]}),r.a.createElement(U,{card:t[3]})):1===n?r.a.createElement("div",{id:"community-cards"},r.a.createElement(U,{card:t[0]}),r.a.createElement(U,{card:t[1]}),r.a.createElement(U,{card:t[2]})):r.a.createElement("div",{id:"community-cards"})},K={currentPot:0,currentBettingRound:1,communityCards:["AC","AC","AC","AC","AC"],players:[{username:"fuck",isInHand:!0,chipCount:200,currentBet:0,holeCards:["KC","QC"]},{username:"shit",isInHand:!0,chipCount:200,currentBet:0,holeCards:["2P","2C"]},{username:"player3",isInHand:!0,chipCount:200,currentBet:0,holeCards:["3C","3C"]},{username:"player4",isInHand:!0,chipCount:200,currentBet:0,holeCards:["KC","KC"]},{username:"player5",isInHand:!0,chipCount:200,currentBet:0,holeCards:["QC","QW"]},{username:"player6",isInHand:!0,chipCount:200,currentBet:0,holeCards:["AW","KW"]},{username:"player7",isInHand:!0,chipCount:200,currentBet:0,holeCards:["AC","AC"]},{username:"shire",isInHand:!0,chipCount:200,currentBet:0,holeCards:["AC","AC"]},{username:"player9",isInHand:!0,chipCount:200,currentBet:0,holeCards:["AC","AC"]}]},F=function(e){return s.a.post("".concat(e,"/").concat(b.getState().username,"/check")).then((function(e){return e.data}))},J=function(e){return s.a.post("".concat(e,"/").concat(b.getState().username,"/bet")).then((function(e){return e.data}))},Q=function(e){return s.a.post("".concat(e,"/").concat(b.getState().username,"/raise")).then((function(e){return e.data}))},Y=function(e){return s.a.post("".concat(e,"/").concat(b.getState().username,"/call")).then((function(e){return e.data}))},q=function(e){return s.a.post("".concat(e,"/").concat(b.getState().username,"/fold")).then((function(e){return e.data}))},z=function(e){var t=e.potRaised,n=(e.playerTurn,e.gameId),a=function(){q(n).then((function(){console.log("player fold")})).catch((function(){console.log("player fold")}))};return t?r.a.createElement("div",{className:"player-turn-menu"},r.a.createElement("button",{onClick:function(){F(n).then((function(){console.log("player checked")})).catch((function(){console.log("player checked")}))}},"Check"),r.a.createElement("button",{onClick:function(){J(n).then((function(){console.log("player bet")})).catch((function(){console.log("player bet")}))}},"Bet"),r.a.createElement("button",{onClick:a},"Fold")):r.a.createElement("div",{className:"player-turn-menu"},r.a.createElement("button",{onClick:function(){Y(n).then((function(){console.log("player call")})).catch((function(){console.log("player call")}))}},"Call"),r.a.createElement("button",{onClick:function(){Q(n).then((function(){console.log("player raise")})).catch((function(){console.log("player raise")}))}},"Raise"),r.a.createElement("button",{onClick:a},"Fold"))},V=R()("http://localhost:3002");V.on("gameState",(function(e){console.log(e)}));var X=function(e){var t=e.match,n=Object(a.useState)(null),c=Object(l.a)(n,2),o=c[0],u=c[1],s=t.params.id;return Object(a.useEffect)((function(){u(K),V.emit("join",s),u(K)}),[]),null===o?r.a.createElement("div",null,r.a.createElement("h2",null,"Loading...")):r.a.createElement("div",{id:"table"},o.players.map((function(e,t){return r.a.createElement(T,{key:e.username,player:e,index:t,gameId:s})})),r.a.createElement(_,{cards:o.communityCards,currentBettingRound:o.currentBettingRound}),r.a.createElement(z,{isRaised:o.isRaised,gameId:s}))},Z=n(12),$=function(){return r.a.createElement("div",{id:"landing-page"},r.a.createElement("img",{src:"mainLogo.png",id:"main-logo",alt:"Logo for puppy poker"}),r.a.createElement(Z.a,{to:"/login"},r.a.createElement("button",{id:"login",className:"landing-button"},"Login")),r.a.createElement(Z.a,{to:"/register"},r.a.createElement("button",{id:"register",className:"landing-button"},"Register")))},ee=n(9),te=(n(56),n(63)),ne=n.n(te),ae=function(){return r.a.createElement(ee.b,{history:p},r.a.createElement("div",{id:"app"},r.a.createElement(ee.c,null,r.a.createElement(ee.a,{path:"/",exact:!0,component:$}),r.a.createElement(ee.a,{path:"/login",component:C}),r.a.createElement(ee.a,{path:"/register",component:v}),r.a.createElement(ee.a,{path:"/gameslobby",exact:!0,component:G}),r.a.createElement(ee.a,{path:"/gameslobby/:id",component:X}),r.a.createElement(ee.a,{path:"/chat",component:ne.a}))))};o.a.render(r.a.createElement(ae,null),document.getElementById("root"))},56:function(e,t,n){},63:function(e,t){},64:function(e,t,n){e.exports=n(124)},86:function(e,t,n){},87:function(e,t,n){},88:function(e,t,n){}},[[64,1,2]]]);
//# sourceMappingURL=main.62101eaa.chunk.js.map