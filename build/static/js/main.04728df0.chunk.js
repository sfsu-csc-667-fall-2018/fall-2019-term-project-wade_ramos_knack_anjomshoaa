(this.webpackJsonptermproject=this.webpackJsonptermproject||[]).push([[0],{27:function(e,t,n){},34:function(e,t,n){e.exports=n(61)},61:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(28),l=n.n(c),o=n(6),u=n(2),i=n.n(u),s=function(e){return i.a.post("/users/register",e).then((function(e){return e.data}))},m=n(3),p=Object(m.a)(),d=function(){var e=Object(a.useState)(""),t=Object(o.a)(e,2),n=t[0],c=t[1],l=Object(a.useState)(""),u=Object(o.a)(l,2),i=u[0],m=u[1],d=Object(a.useState)(""),f=Object(o.a)(d,2),g=f[0],E=f[1],b=Object(a.useState)(""),h=Object(o.a)(b,2),v=h[0],y=h[1];return r.a.createElement("div",{className:"user-input"},r.a.createElement("img",{src:"mainLogo.png",id:"register-logo",alt:"Logo for puppy poker"}),r.a.createElement("form",{onSubmit:function(e){if(e.preventDefault(),0===n.length||0===i.length||0===v.length)alert("Make sure you've filled in all of the fields");else if(i!==g)alert("Your passwords don't match");else{s({username:n,password:i,email:v}).then((function(){y(""),c(""),m(""),E(""),alert("You have successfully registered please log in to play!"),p.push("/")}))}}},r.a.createElement("input",{type:"text",onChange:function(e){c(e.target.value)},placeholder:"Username",value:n}),r.a.createElement("br",null),r.a.createElement("input",{type:"password",onChange:function(e){m(e.target.value)},placeholder:"Password",value:i}),r.a.createElement("br",null),r.a.createElement("input",{type:"password",onChange:function(e){E(e.target.value)},placeholder:"Password",value:g}),r.a.createElement("br",null),r.a.createElement("input",{type:"email",onChange:function(e){y(e.target.value)},placeholder:"Email",value:v}),r.a.createElement("br",null),r.a.createElement("input",{type:"submit",value:"Register"})))},f=function(e){return i.a.post("users/login",e).then((function(e){return e.data}))},g=n(29),E=n(30);function b(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function h(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?b(n,!0).forEach((function(t){Object(g.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):b(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var v={username:""},y=Object(E.a)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:v,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"LOGIN_USER":var n=h({},e,{username:t.data.username});return n;default:return e}})),O=function(){var e=Object(a.useState)(""),t=Object(o.a)(e,2),n=t[0],c=t[1],l=Object(a.useState)(""),u=Object(o.a)(l,2),i=u[0],s=u[1];return r.a.createElement("div",{className:"user-input"},r.a.createElement("img",{src:"mainLogo.png",id:"login-logo",alt:"Logo for puppy poker"}),r.a.createElement("form",{onSubmit:function(e){if(e.preventDefault(),0===n.length||0===i.length)alert("Please enter your username and password.");else{var t={username:n,password:i};f(t).then((function(){y.dispatch({type:"LOGIN_USER",data:{username:t.username}}),p.push("/gameslobby")})).catch((function(e){alert("User not found, please try again."),p.push("/login")}))}}},r.a.createElement("input",{type:"text",value:n,onChange:function(e){c(e.target.value)},placeholder:"Username"}),r.a.createElement("br",null),r.a.createElement("input",{type:"password",value:i,onChange:function(e){s(e.target.value)},placeholder:"Password"}),r.a.createElement("br",null),r.a.createElement("input",{type:"submit",value:"Login"})))},j=n(9),N=function(){return i.a.get("gameslobby").then((function(e){return e.data}))},k=function(){return r.a.createElement("div",null,r.a.createElement("div",{className:"game-tiles"},r.a.createElement("form",null,r.a.createElement("input",{type:"submit",value:"Enter Game",title:"Enter Game",className:"enter-game-button"}))))},S=function(){return r.a.createElement("div",null,r.a.createElement("div",{className:"lobby-username"},r.a.createElement("h3",null,"Username")),r.a.createElement("div",{className:"winnings"},r.a.createElement("h4",null,"Winnings:")),r.a.createElement("div",{className:"userInfo"},r.a.createElement("img",{src:"profileIcon.png",id:"profile-logo"}),r.a.createElement("button",{type:"button",className:"log-out"},"Log Out"),r.a.createElement("br",null),r.a.createElement("button",{type:"button",className:"settings"},"Settings"),r.a.createElement("br",null),r.a.createElement("button",{type:"button",className:"create-game"},"Create Game"),r.a.createElement("br",null)))},C=function(){return r.a.createElement("div",null,r.a.createElement("form",null,r.a.createElement("input",{type:"text",placeholder:"Enter Message",className:"barks-box"}),r.a.createElement("input",{type:"submit",value:"Send",title:"Send",className:"barks-send-button"})))},w=function(){var e=Object(a.useState)([]),t=Object(o.a)(e,2),n=(t[0],t[1]);return Object(a.useEffect)((function(){N().then((function(e){n(e)}))}),[]),r.a.createElement("div",null,r.a.createElement("div",{className:"userInfo"},S()),r.a.createElement("div",{className:"chat"},"chat section",C()),r.a.createElement("div",{className:"games"},"game section",k()))},L=function(e){var t=e.card,n="resources/".concat(t,".png");return r.a.createElement("img",{src:n,alt:"This players hole card",id:"hole-card"})},P=function(e){var t=e.player,n=e.index;return null===t.username?r.a.createElement("div",{id:"player".concat(n)},r.a.createElement("button",{className:"join-button  "},"Join Game")):t.isInHand?r.a.createElement("div",{className:"player",id:"player".concat(n)},r.a.createElement("div",{id:"card"},t.holeCards.map((function(e,t){return r.a.createElement(L,{key:t,card:e})}))),r.a.createElement("div",{className:"play-text-info"},r.a.createElement("div",null,t.username),r.a.createElement("div",null,"Chips: ",t.chipCount))):r.a.createElement("div",{className:"not-in-hand",id:"player".concat(n)},r.a.createElement("div",{className:"play-text-info"},r.a.createElement("div",null,t.username),r.a.createElement("div",null,"Chips: ",t.chipCount)))},R=function(e){var t=e.cards,n=e.currentBettingRound;return console.log(n),n.isRiver?r.a.createElement("div",{id:"community-cards"},t.map((function(e,t){return r.a.createElement(L,{key:t,card:e})}))):n.isTurn?r.a.createElement("div",{id:"community-cards"},r.a.createElement(L,{card:t[0]}),r.a.createElement(L,{card:t[1]}),r.a.createElement(L,{card:t[2]}),r.a.createElement(L,{card:t[3]})):n.isFlop?r.a.createElement("div",{id:"community-cards"},r.a.createElement(L,{card:t[0]}),r.a.createElement(L,{card:t[1]}),r.a.createElement(L,{card:t[2]})):r.a.createElement("div",{id:"community-cards"})},x=function(e){return i.a.post("".concat(e,"/").concat(y.getState().username,"/check")).then((function(e){return e.data}))},I=function(e){return i.a.post("".concat(e,"/").concat(y.getState().username,"/bet")).then((function(e){return e.data}))},G=function(e){return i.a.post("".concat(e,"/").concat(y.getState().username,"/raise")).then((function(e){return e.data}))},D=function(e){return i.a.post("".concat(e,"/").concat(y.getState().username,"/call")).then((function(e){return e.data}))},U=function(e){return i.a.post("".concat(e,"/").concat(y.getState().username,"/fold")).then((function(e){return e.data}))},B=function(e){var t=e.potRaised,n=(e.playerTurn,e.gameId),a=function(){U(n).then((function(){console.log("player fold")})).catch((function(){console.log("player fold")}))};return t?r.a.createElement("div",{className:"player-turn-menu"},r.a.createElement("button",{onClick:function(){x(n).then((function(){console.log("player checked")})).catch((function(){console.log("player checked")}))}},"Check"),r.a.createElement("button",{onClick:function(){I(n).then((function(){console.log("player bet")})).catch((function(){console.log("player bet")}))}},"Bet"),r.a.createElement("button",{onClick:a},"Fold")):r.a.createElement("div",{className:"player-turn-menu"},r.a.createElement("button",{onClick:function(){D(n).then((function(){console.log("player call")})).catch((function(){console.log("player call")}))}},"Call"),r.a.createElement("button",{onClick:function(){G(n).then((function(){console.log("player raise")})).catch((function(){console.log("player raise")}))}},"Raise"),r.a.createElement("button",{onClick:a},"Fold"))},F=function(e){return i.a.get("".concat(e,"/getGame")).then((function(e){return e.data}))},J=function(e){var t=e.match,n=Object(a.useState)(null),c=Object(o.a)(n,2),l=c[0],u=c[1],i=t.params.id;return Object(a.useEffect)((function(){F(i).then((function(e){u(e)})).catch((function(e){console.log(e)}))}),[]),null===l?r.a.createElement("div",null,r.a.createElement("h2",null,"Loading...")):r.a.createElement("div",{id:"table"},l.players.map((function(e,t){return r.a.createElement(P,{key:e.username,player:e,index:t})})),r.a.createElement(R,{cards:l.communityCards,currentBettingRound:l.currentBettingRound}),r.a.createElement(B,{isRaised:l.isRaised,gameId:i}))},T=function(){return r.a.createElement("div",{id:"landing-page"},r.a.createElement("img",{src:"mainLogo.png",id:"main-logo",alt:"Logo for puppy poker"}),r.a.createElement(j.a,{to:"/login"},r.a.createElement("button",{id:"login",className:"landing-button"},"Login")),r.a.createElement(j.a,{to:"/register"},r.a.createElement("button",{id:"register",className:"landing-button"},"Register")))},M=n(8),Y=(n(27),function(){return r.a.createElement(M.b,{history:p},r.a.createElement("div",{id:"app"},r.a.createElement(M.c,null,r.a.createElement(M.a,{path:"/",exact:!0,component:T}),r.a.createElement(M.a,{path:"/login",component:O}),r.a.createElement(M.a,{path:"/register",component:d}),r.a.createElement(M.a,{path:"/gameslobby",exact:!0,component:w}),r.a.createElement(M.a,{path:"/gameslobby/:id",component:J}))))});l.a.render(r.a.createElement(Y,null),document.getElementById("root"))}},[[34,1,2]]]);
//# sourceMappingURL=main.04728df0.chunk.js.map