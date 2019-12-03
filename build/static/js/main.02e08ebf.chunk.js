(this.webpackJsonptermproject=this.webpackJsonptermproject||[]).push([[0],{27:function(e,t,a){},34:function(e,t,a){e.exports=a(61)},61:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(28),l=a.n(c),o=a(5),i=a(9),u=a.n(i),s=function(e){return u.a.post("/users/register",e).then((function(e){return e.data}))},m=a(2),p=Object(m.a)(),d=function(){var e=Object(n.useState)(""),t=Object(o.a)(e,2),a=t[0],c=t[1],l=Object(n.useState)(""),i=Object(o.a)(l,2),u=i[0],m=i[1],d=Object(n.useState)(""),g=Object(o.a)(d,2),h=g[0],E=g[1],f=Object(n.useState)(""),y=Object(o.a)(f,2),b=y[0],v=y[1];return r.a.createElement("div",{className:"user-input"},r.a.createElement("img",{src:"mainLogo.png",id:"register-logo",alt:"Logo for puppy poker"}),r.a.createElement("form",{onSubmit:function(e){if(e.preventDefault(),0===a.length||0===u.length||0===b.length)alert("Make sure you've filled in all of the fields");else if(u!==h)alert("Your passwords don't match");else{s({username:a,password:u,email:b}).then((function(){p.push("/gameslobby")})).catch((function(e){console.log(e)}))}}},r.a.createElement("input",{type:"text",onChange:function(e){c(e.target.value)},placeholder:"Username"}),r.a.createElement("br",null),r.a.createElement("input",{type:"password",onChange:function(e){m(e.target.value)},placeholder:"Password"}),r.a.createElement("br",null),r.a.createElement("input",{type:"password",onChange:function(e){E(e.target.value)},placeholder:"Password"}),r.a.createElement("br",null),r.a.createElement("input",{type:"email",onChange:function(e){v(e.target.value)},placeholder:"Email"}),r.a.createElement("br",null),r.a.createElement("input",{type:"submit",value:"Register"})))},g=function(e){return u.a.post("users/login",e).then((function(e){return e.data}))},h=a(29),E=a(30);function f(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function y(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?f(a,!0).forEach((function(t){Object(h.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):f(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var b={username:""},v=Object(E.a)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:b,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"LOGIN_USER":var a=y({},e,{username:t.data.username});return a;default:return e}})),C=function(){var e=Object(n.useState)(""),t=Object(o.a)(e,2),a=t[0],c=t[1],l=Object(n.useState)(""),i=Object(o.a)(l,2),u=i[0],s=i[1];return r.a.createElement("div",{className:"user-input"},r.a.createElement("img",{src:"mainLogo.png",id:"login-logo",alt:"Logo for puppy poker"}),r.a.createElement("form",{onSubmit:function(e){if(e.preventDefault(),0===a.length||0===u.length)alert("Please enter your username and password.");else{var t={username:a,password:u};g(t).then((function(){v.dispatch({type:"LOGIN_USER",data:{username:t.username}}),p.push("/gameslobby")})).catch((function(e){alert("User not found, please try again."),p.push("/login")}))}}},r.a.createElement("input",{type:"text",value:a,onChange:function(e){c(e.target.value)},placeholder:"Username"}),r.a.createElement("br",null),r.a.createElement("input",{type:"password",value:u,onChange:function(e){s(e.target.value)},placeholder:"Password"}),r.a.createElement("br",null),r.a.createElement("input",{type:"submit",value:"Login"})))},O=a(10),j=function(e){var t=e.gameId,a=e.players,n="gameslobby/".concat(t);return r.a.createElement("div",{id:"games-lobby-items"},"Game:",t," Players: ",a,"/9 ",r.a.createElement(O.a,{to:n},"Join"))},A=function(){return u.a.get("gameslobby").then((function(e){return e.data}))},w=function(){var e=Object(n.useState)([]),t=Object(o.a)(e,2),a=t[0],c=t[1];return Object(n.useEffect)((function(){A().then((function(e){c(e)}))}),[]),r.a.createElement("div",null,r.a.createElement("h2",null,"Games Lobby"),a.map((function(e){return r.a.createElement(j,{key:e.id,gameId:e.id,players:e.players})})))},I=function(e){var t=e.card,a="resources/".concat(t,".png");return r.a.createElement("img",{src:a,alt:"This players hole card",id:"hole-card"})},P=function(e){var t=e.player,a=e.index;return null===t.username?r.a.createElement("div",{id:"player".concat(a)},r.a.createElement("button",{className:"join-button  "},"Join Game")):t.isInHand?r.a.createElement("div",{className:"player",id:"player".concat(a)},r.a.createElement("div",{id:"card"},t.holeCards.map((function(e,t){return r.a.createElement(I,{key:t,card:e})}))),r.a.createElement("div",{className:"play-text-info"},r.a.createElement("div",null,t.username),r.a.createElement("div",null,"Chips: ",t.chipCount))):r.a.createElement("div",{className:"not-in-hand",id:"player".concat(a)},r.a.createElement("div",{className:"play-text-info"},r.a.createElement("div",null,t.username),r.a.createElement("div",null,"Chips: ",t.chipCount)))},B=function(e){var t=e.cards,a=e.currentBettingRound;return console.log(a),a.isRiver?r.a.createElement("div",{id:"community-cards"},t.map((function(e,t){return r.a.createElement(I,{key:t,card:e})}))):a.isTurn?r.a.createElement("div",{id:"community-cards"},r.a.createElement(I,{card:t[0]}),r.a.createElement(I,{card:t[1]}),r.a.createElement(I,{card:t[2]}),r.a.createElement(I,{card:t[3]})):a.isFlop?r.a.createElement("div",{id:"community-cards"},r.a.createElement(I,{card:t[0]}),r.a.createElement(I,{card:t[1]}),r.a.createElement(I,{card:t[2]})):r.a.createElement("div",{id:"community-cards"})},S={currentPot:0,currentBettingRound:{isPreflop:!1,isFlop:!1,isTurn:!1,isRiver:!0},communityCards:["AC","AC","AC","AC","AC"],players:[{username:"player1",isInHand:!1,chipCount:200,currentBet:0,holeCards:["AC","AC"]},{username:null,isInHand:!0,chipCount:200,currentBet:0,holeCards:["AC","AC"]},{username:"player3",isInHand:!0,chipCount:200,currentBet:0,holeCards:["AC","AC"]},{username:"player4",isInHand:!0,chipCount:200,currentBet:0,holeCards:["AC","AC"]},{username:"player5",isInHand:!0,chipCount:200,currentBet:0,holeCards:["AC","AC"]},{username:"player6",isInHand:!0,chipCount:200,currentBet:0,holeCards:["AC","AC"]},{username:"player7",isInHand:!0,chipCount:200,currentBet:0,holeCards:["AC","AC"]},{username:"shire",isInHand:!0,chipCount:200,currentBet:0,holeCards:["AC","AC"]},{username:"player9",isInHand:!0,chipCount:200,currentBet:0,holeCards:["AC","AC"]}]},k=function(){return r.a.createElement("div",{id:"table"},S.players.map((function(e,t){return r.a.createElement(P,{key:e.username,player:e,index:t})})),r.a.createElement(B,{cards:S.communityCards,currentBettingRound:S.currentBettingRound}))},L=function(){return r.a.createElement("div",{id:"landing-page"},r.a.createElement("img",{src:"mainLogo.png",id:"main-logo",alt:"Logo for puppy poker"}),r.a.createElement(O.a,{to:"/login"},r.a.createElement("button",{id:"login",className:"landing-button"},"Login")),r.a.createElement(O.a,{to:"/register"},r.a.createElement("button",{id:"register",className:"landing-button"},"Register")))},N=a(7),H=(a(27),function(){return r.a.createElement(N.b,{history:p},r.a.createElement("div",{id:"app"},r.a.createElement(N.c,null,r.a.createElement(N.a,{path:"/",exact:!0,component:L}),r.a.createElement(N.a,{path:"/login",component:C}),r.a.createElement(N.a,{path:"/register",component:d}),r.a.createElement(N.a,{path:"/gameslobby",exact:!0,component:w}),r.a.createElement(N.a,{path:"/gameslobby/:id",component:k}))))});l.a.render(r.a.createElement(H,null),document.getElementById("root"))}},[[34,1,2]]]);
//# sourceMappingURL=main.02e08ebf.chunk.js.map