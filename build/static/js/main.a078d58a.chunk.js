(this.webpackJsonptermproject=this.webpackJsonptermproject||[]).push([[0],{28:function(e,t,a){e.exports=a(56)},55:function(e,t,a){},56:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(25),c=a.n(l),u=a(7),i=a(11),s=a.n(i),o=function(e){return s.a.post("/users/register",e).then((function(e){return e.data}))},m=a(2),d=Object(m.a)(),p=function(){var e=Object(n.useState)(""),t=Object(u.a)(e,2),a=t[0],l=t[1],c=Object(n.useState)(""),i=Object(u.a)(c,2),s=i[0],m=i[1],p=Object(n.useState)(""),E=Object(u.a)(p,2),h=E[0],C=E[1],y=Object(n.useState)(""),v=Object(u.a)(y,2),g=v[0],f=v[1];return r.a.createElement("div",null,r.a.createElement("h2",null,"Register"),r.a.createElement("form",{onSubmit:function(e){if(e.preventDefault(),0===a.length||0===s.length||0===g.length)alert("Make sure you've filled in all of the fields");else if(s!==h)alert("Your passwords don't match");else{var t={username:a,password:s,email:g};o(t).then((function(){f(""),l(""),m(""),C(""),alert("You have successfully registered please log in to play!"),d.push("/")})),console.log(t)}}},r.a.createElement("label",null,"Username:"),r.a.createElement("input",{type:"text",onChange:function(e){l(e.target.value)}}),r.a.createElement("br",null),r.a.createElement("label",null,"Password:"),r.a.createElement("input",{type:"password",onChange:function(e){m(e.target.value)}}),r.a.createElement("br",null),r.a.createElement("label",null,"Repeat Password:"),r.a.createElement("input",{type:"password",onChange:function(e){C(e.target.value)}}),r.a.createElement("br",null),r.a.createElement("label",null,"Email:"),r.a.createElement("input",{type:"email",onChange:function(e){f(e.target.value)}}),r.a.createElement("br",null),r.a.createElement("input",{type:"submit",value:"Register"})))},E=function(e){return s.a.post("users/login",e).then((function(e){return e.data}))},h=function(){var e=Object(n.useState)(""),t=Object(u.a)(e,2),a=t[0],l=t[1],c=Object(n.useState)(""),i=Object(u.a)(c,2),s=i[0],o=i[1];return r.a.createElement("div",{id:"login"},r.a.createElement("h2",null,"Login"),r.a.createElement("form",{onSubmit:function(e){(e.preventDefault(),0===a.length||0===s.length)?alert("Please enter your username and password."):E({username:a,password:s}).then((function(){l(""),o(""),d.push("/gametable")})).catch((function(e){console.log(e)}))}},r.a.createElement("label",null,"Username:"),r.a.createElement("input",{type:"text",value:a,onChange:function(e){l(e.target.value)}}),r.a.createElement("br",null),r.a.createElement("label",null,"Password:"),r.a.createElement("input",{type:"password",value:s,onChange:function(e){o(e.target.value)}}),r.a.createElement("br",null),r.a.createElement("input",{type:"submit",value:"Login"})))},C=function(e){var t=e.card,a="resources/".concat(t,".png");return r.a.createElement("img",{src:a,alt:"This players hole card",id:"hole-card"})},y=function(e){var t=e.player,a=e.index;return null===t.username?r.a.createElement("div",{id:"player".concat(a)},r.a.createElement("button",{className:"join-button  "},"Join Game")):t.isInHand?r.a.createElement("div",{className:"player",id:"player".concat(a)},r.a.createElement("div",{id:"card"},t.holeCards.map((function(e,t){return r.a.createElement(C,{key:t,card:e})}))),r.a.createElement("div",{className:"play-text-info"},r.a.createElement("div",null,t.username),r.a.createElement("div",null,"Chips: ",t.chipCount))):r.a.createElement("div",{className:"not-in-hand",id:"player".concat(a)},r.a.createElement("div",{className:"play-text-info"},r.a.createElement("div",null,t.username),r.a.createElement("div",null,"Chips: ",t.chipCount)))},v=function(e){var t=e.cards,a=e.currentBettingRound;return console.log(a),a.isRiver?r.a.createElement("div",{id:"community-cards"},t.map((function(e,t){return r.a.createElement(C,{key:t,card:e})}))):a.isTurn?r.a.createElement("div",{id:"community-cards"},r.a.createElement(C,{card:t[0]}),r.a.createElement(C,{card:t[1]}),r.a.createElement(C,{card:t[2]}),r.a.createElement(C,{card:t[3]})):a.isFlop?r.a.createElement("div",{id:"community-cards"},r.a.createElement(C,{card:t[0]}),r.a.createElement(C,{card:t[1]}),r.a.createElement(C,{card:t[2]})):r.a.createElement("div",{id:"community-cards"})},g={currentPot:0,currentBettingRound:{isPreflop:!1,isFlop:!1,isTurn:!1,isRiver:!0},communityCards:["AC","AC","AC","AC","AC"],players:[{username:"player1",isInHand:!1,chipCount:200,currentBet:0,holeCards:["AC","AC"]},{username:null,isInHand:!0,chipCount:200,currentBet:0,holeCards:["AC","AC"]},{username:"player3",isInHand:!0,chipCount:200,currentBet:0,holeCards:["AC","AC"]},{username:"player4",isInHand:!0,chipCount:200,currentBet:0,holeCards:["AC","AC"]},{username:"player5",isInHand:!0,chipCount:200,currentBet:0,holeCards:["AC","AC"]},{username:"player6",isInHand:!0,chipCount:200,currentBet:0,holeCards:["AC","AC"]},{username:"player7",isInHand:!0,chipCount:200,currentBet:0,holeCards:["AC","AC"]},{username:"shire",isInHand:!0,chipCount:200,currentBet:0,holeCards:["AC","AC"]},{username:"player9",isInHand:!0,chipCount:200,currentBet:0,holeCards:["AC","AC"]}]},f=function(){return r.a.createElement("div",{id:"table"},g.players.map((function(e,t){return r.a.createElement(y,{key:e.username,player:e,index:t})})),r.a.createElement(v,{cards:g.communityCards,currentBettingRound:g.currentBettingRound}))},b=a(10),A=function(){var e={color:"white"};return r.a.createElement("nav",null,r.a.createElement("h2",null,"Puppy Poker"),r.a.createElement("ul",{className:"nav-links"},r.a.createElement(b.a,{style:e,to:"/"},r.a.createElement("li",null,"Login")),r.a.createElement(b.a,{style:e,to:"/register"},r.a.createElement("li",null,"Register")),r.a.createElement(b.a,{style:e,to:"/gametable"},r.a.createElement("li",null,"Games Lobby"))))},j=a(6),B=(a(55),function(){return r.a.createElement(j.b,{history:d},r.a.createElement("div",{id:"app"},r.a.createElement(A,null),r.a.createElement(j.c,null,r.a.createElement(j.a,{path:"/",exact:!0,component:h}),r.a.createElement(j.a,{path:"/register",component:p}),r.a.createElement(j.a,{path:"/gametable",component:f}))))});c.a.render(r.a.createElement(B,null),document.getElementById("root"))}},[[28,1,2]]]);
//# sourceMappingURL=main.a078d58a.chunk.js.map