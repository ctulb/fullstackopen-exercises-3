(this.webpackJsonpthephonebook=this.webpackJsonpthephonebook||[]).push([[0],{19:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var c=t(1),a=t.n(c),r=t(14),o=t.n(r),u=(t(19),t(3)),i=t(0),s=function(e){return Object(i.jsxs)("div",{children:["filter shown with"," ",Object(i.jsx)("input",{value:e.searchFilter,onChange:e.handleSearchFilterChange,onKeyUp:e.handleSearchFilterKeyUp})]})},l=function(e){return Object(i.jsx)("div",{children:Object(i.jsxs)("form",{children:[Object(i.jsxs)("div",{children:["name:"," ",Object(i.jsx)("input",{value:e.newName,onChange:e.handleNameChange})]}),Object(i.jsxs)("div",{children:["number:"," ",Object(i.jsx)("input",{value:e.newPhoneNumber,onChange:e.handlePhoneNumberChange})]}),Object(i.jsx)("div",{children:Object(i.jsx)("button",{onClick:e.handleAdd,type:"submit",children:"add"})})]})})},d=function(e){var n=e.personsToShow,t=e.handleDelete;return Object(i.jsx)("div",{children:Object(i.jsx)("ul",{children:n.map((function(e){return Object(i.jsxs)("div",{children:[Object(i.jsxs)("li",{children:[e.name," ",e.phoneNumber]}),Object(i.jsx)("button",{name:e.name,onClick:t,children:"Delete"})]},e.id)}))})})},h=function(e){var n=e.message,t=e.messageType;return null===n?null:Object(i.jsx)("div",{className:t,children:n})},j=t(4),b=t.n(j),f="/api/persons",m={getAll:function(){return b.a.get(f)},create:function(e){return b.a.post(f,e)},update:function(e,n){return b.a.put("".concat(f,"/").concat(e),n)},remove:function(e){return b.a.delete("".concat(f,"/").concat(e))}},O=function(){var e=Object(c.useState)([]),n=Object(u.a)(e,2),t=n[0],a=n[1],r=Object(c.useState)(""),o=Object(u.a)(r,2),j=o[0],b=o[1],f=Object(c.useState)(""),O=Object(u.a)(f,2),p=O[0],v=O[1],g=Object(c.useState)(""),x=Object(u.a)(g,2),w=x[0],C=x[1],S=Object(c.useState)(t),N=Object(u.a)(S,2),y=N[0],k=N[1],T=Object(c.useState)(null),F=Object(u.a)(T,2),A=F[0],D=F[1],P=Object(c.useState)(null),L=Object(u.a)(P,2),U=L[0],E=L[1];return Object(c.useEffect)((function(){m.getAll().then((function(e){a(e.data),k(e.data)}))}),[]),Object(i.jsxs)("div",{children:[Object(i.jsx)("h2",{children:"Phonebook"}),Object(i.jsx)(h,{message:A,messageType:U}),Object(i.jsx)(s,{searchFilter:w,handleSearchFilterChange:function(e){C(e.target.value)},handleSearchFilterKeyUp:function(e){var n=t.filter((function(e){return e.name.toLowerCase().includes(w.toLowerCase())}));k(n)}}),Object(i.jsx)("h3",{children:"Add a new"}),Object(i.jsx)(l,{newName:j,handleNameChange:function(e){b(e.target.value)},newPhoneNumber:p,handlePhoneNumberChange:function(e){v(e.target.value)},handleAdd:function(e){e.preventDefault();var n={name:j,phoneNumber:p};if(t.filter((function(e){return e.name===j})).length){if(window.confirm("".concat(j," has already been added to the phonebook. Update number?"))){var c=t.findIndex((function(e){return e.name===j}));m.update(t[c].id,n);var r=t;r[c].phoneNumber=p,a(r),k(r)}return b(""),v(""),D("".concat(j," updated successfully")),E("success"),void window.setTimeout((function(){D(null),E(null)}),5e3)}var o=[];m.create(n).then((function(e){o=t.concat(e.data),a(o),b(""),v("");var n=o.filter((function(e){return e.name.toLowerCase().includes(w.toLowerCase())}));k(n),D("".concat(j," created successfully")),E("success"),window.setTimeout((function(){D(null),E(null)}),5e3)})).catch((function(e){D("Error: ".concat(e.response.data.error.message)),E("error")}))}}),Object(i.jsx)("h2",{children:"Numbers"}),Object(i.jsx)(d,{personsToShow:y,handleDelete:function(e){if(window.confirm("Delete ".concat(e.target.name,"?"))){var n=t.filter((function(n){return n.name===e.target.name}));console.log(n),m.remove(n[0].id).then((function(n){var c=t.filter((function(n){return n.name!==e.target.name}));a(c),k(c),D("".concat(e.target.name," deleted successfully")),E("success"),window.setTimeout((function(){D(null),E(null)}),5e3)})).catch((function(e){D(e),E("error")}))}}})]})};o.a.render(Object(i.jsx)(a.a.StrictMode,{children:Object(i.jsx)(O,{})}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.461cb2cb.chunk.js.map