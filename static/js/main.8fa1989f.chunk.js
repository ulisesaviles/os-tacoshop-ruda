(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[0],{26:function(e,t){},28:function(e,t,a){},472:function(e,t,a){"use strict";a.r(t);var n=a(6),r=a.n(n),s=a(51),c=a.n(s),i=a(9),o=a(3),l=a.n(o),u=a(4),d=a(8),f=a(7),p=(a(28),function(e,t,a){var n=function(){var e=localStorage.getItem("orders");return JSON.parse(e)};return{getAllOrders:n,setOrders:function(a){var r=n();r[t]=a,e(r),localStorage.setItem("orders",JSON.stringify(r))},pushOrder:function(a){var r=n();r[t].push(a),e(r),localStorage.setItem("orders",JSON.stringify(r))},restartRUDA:function(){e(a),localStorage.setItem("orders",JSON.stringify(a))}}}),g=function(e,t){var a=function(e){return new Promise((function(t){return setTimeout(t,e)}))},n=function(){var e=Object(u.a)(l.a.mark((function e(n){var c,i,o;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:c=r(),i=0;case 2:if(!(i<n.length)){e.next=11;break}return o=n[i],c[t].fillings[o]--,e.next=7,a(500);case 7:s("fillings",c[t].fillings);case 8:i++,e.next=2;break;case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),r=function(){var e=localStorage.getItem("metadata");return JSON.parse(e)},s=function(a,n){var s=r();s[t][a]=n,e(s),localStorage.setItem("metadata",JSON.stringify(s))};return{getMetadata:r,setMetadata:s,consumeFillings:n,useTortilla:function(){var e=r();e[t].tortillas--,s("tortillas",e[t].tortillas)},madeTaco:function(){var a=r();a[t].rest.untilNeeded--,a[t].fan.untilNeeded--,e(a),localStorage.setItem("metadata",JSON.stringify(a))},madePart:function(){var a=r();a[t].queueLength--,a[t].workingOn=null,e(a),localStorage.setItem("metadata",JSON.stringify(a))}}},m=function(e,t,a,n,r,s){var c=function(e){return new Promise((function(t){return setTimeout(t,e)}))},o=p(a,e),d=g(n,e),m=[],b=function(){var t=Object(u.a)(l.a.mark((function t(a){var n,r;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(h(a)){t.next=4;break}return t.next=3,c(100);case 3:return t.abrupt("return");case 4:if(n={guacamole:25,salsa:15,cilantro:10,cebolla:10,tortillas:10},"tortillas"===a){t.next=13;break}return(r=d.getMetadata()[e].fillings)[a]=s[a],t.next=10,c(1e3*n[a]);case 10:d.setMetadata("fillings",r),t.next=16;break;case 13:return t.next=15,c(1e3*n.tortillas);case 15:d.setMetadata("tortillas",s.tortillas);case 16:return t.abrupt("return",!0);case 17:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),h=function(t){return"tortillas"!==t?d.getMetadata()[e].fillings[t]<s[t]:d.getMetadata()[e].tortillas<s.tortillas},j=function(e){return[0,v(e[0].orden)]},O=function(){return o.getAllOrders()[e]},x=function(){return d.getMetadata()[e].quesadillasInStock},v=function(e){for(var a=0;a<e.length;a++){var n=e[a];if(t.includes(n.meat)&&"done"!==n.status&&("quesadilla"!==n.type||x()>=1))return a}return null},N=function(){for(var e=O(),t=0;t<e.length;t++){var a=e[t];S(a)}o.setOrders([])},q=function(t){for(var a=d.getMetadata()[e].fillings,n=0;n<t.length;n++){if(0===a[t[n]])return!1}return!0},k=function(t){r.log("Taquero ".concat(e,":"),t)},y=function(){var t=d.getMetadata()[e].rest;t.resting=!0,d.setMetadata("rest",t)},w=function(){var e=Object(u.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.consumeFillings(t.ingredients);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),S=function(){var e=Object(u.a)(l.a.mark((function e(t){var a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:k("I'll give order ".concat(t.request_id," to allocation handler")),a=JSON.parse(localStorage.getItem("ordersToReAllocate")),localStorage.setItem("ordersToReAllocate",JSON.stringify([].concat(Object(i.a)(a),[t])));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),M=function(){var t=Object(u.a)(l.a.mark((function t(){var a;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!((a=60-d.getMetadata()[e].rest.timeRested)>0)){t.next=5;break}return k("I'll rest ".concat(a," secs")),t.next=5,c(1e3*a);case 5:d.setMetadata("rest",{untilNeeded:1e3,timeRested:0,resting:!1});case 6:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),I=function(){var t=Object(u.a)(l.a.mark((function t(){var a;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,c(1e3);case 2:(a=d.getMetadata()[e]).rest.timeRested++,d.setMetadata("rest",a.rest);case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),R=function(){var e=Object(u.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(0!==O().length){e.next=6;break}return e.next=4,I();case 4:e.next=8;break;case 6:return e.next=8,T();case 8:if(JSON.parse(localStorage.getItem("RUDAIsWorking"))){e.next=10;break}return e.abrupt("break",12);case 10:e.next=0;break;case 12:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),T=function(){var t=Object(u.a)(l.a.mark((function t(){var a,n,r,s,i,u,p,g;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(m=O(),a=j(m),n=Object(f.a)(a,2),r=n[0],s=n[1],i=m[r].orden[s],null!==s&&("quesadilla"!==i.type||0!==x())){t.next=9;break}return S(m.shift()),o.setOrders(m),t.next=8,I();case 8:return t.abrupt("return");case 9:u=Date.now(),m[r].status="working",o.setOrders(m),i.status="working",d.setMetadata("workingOn",i.part_id),p=0,0;case 16:if(!(i.quantity>i.finished_products)){t.next=48;break}if(0!==d.getMetadata()[e].rest.untilNeeded){t.next=23;break}return y(),N(),t.next=22,M();case 22:return t.abrupt("return");case 23:if(q(i.ingredients)){t.next=27;break}return k("I have not enought fillings to continue"),i.status="open",t.abrupt("break",48);case 27:if(!("quesadilla"===i.type&&x()<=0)){t.next=30;break}return i.status="open",t.abrupt("break",48);case 30:if("quesadilla"!==i.type){t.next=35;break}g=d.getMetadata()[e].quesadillasInStock-1,d.setMetadata("quesadillasInStock",g),t.next=39;break;case 35:if("quesadilla"===i.type){t.next=39;break}return d.useTortilla(),t.next=39,c(1e3);case 39:return t.next=41,w(i);case 41:d.madeTaco(),i.finished_products+=1,i.quantity===i.finished_products&&(i.status="done"),p++;case 45:t.next=16;break;case 48:return m[r].orden[s]=i,m[r].response.push({who:"Taquero de ".concat(e),when:(new Date).toISOString(),what:"Made ".concat(p," ").concat(i.meat," ").concat(i.type," (part ").concat(i.part_id,")"),time:Date.now()-u}),m[r].status="open",d.madePart(),S(m.shift()),o.setOrders(m),k('Finished part "'.concat(i.part_id,'" ').concat(m.length," left")),t.abrupt("return",m.length);case 56:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return{name:e,insertToQueue:function(e){return m=[].concat(Object(i.a)(O()),Object(i.a)(e)),o.setOrders(m),k("Inserted ".concat(e.length," element(s) succesfully")),d.setMetadata("queueLength",m.length),m},getQueueSize:function(){return O().length},workOnNextOrder:T,getOrders:O,startWorking:R,canWorkOn:t,getQuesadillasInStock:x,giveQuesadilla:function(){var t=d.getMetadata()[e].quesadillasInStock+1;d.setMetadata("quesadillasInStock",t)},restart:function(){o.setOrders([])},fillFilling:b,getTortillas:function(){return d.getMetadata()[e].tortillas},isResting:function(){return d.getMetadata()[e].rest.resting}}},b=function(e,t,a){var n=function(e){return new Promise((function(t){return setTimeout(t,e)}))},r=g(e,"quesadillero"),s=function(){return r.getMetadata().quesadillero.quesadillasReady},c=function(){var e=Object(u.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n(1e4);case 2:r.setMetadata("tortillas",a);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),i=function(){var e=Object(u.a)(l.a.mark((function e(){var a,i,u,d;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:o();case 1:if(JSON.parse(localStorage.getItem("RUDAIsWorking"))){e.next=4;break}return e.abrupt("break",17);case 4:if(0!==(a=r.getMetadata().quesadillero.tortillas)){e.next=9;break}return e.next=8,c();case 8:a=r.getMetadata().quesadillero.tortillas;case 9:return r.setMetadata("tortillas",a-1),e.next=12,n(5e3);case 12:for(i={index:null,quantity:6},u=0;u<t.length;u++)(d=t[u]).getQuesadillasInStock()<i.quantity&&d.getQuesadillasInStock()<5&&(i={index:u,quantity:d.getQuesadillasInStock()});null!==i.index?t[i.index].giveQuesadilla():r.setMetadata("quesadillasReady",s()+1),e.next=1;break;case 17:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),o=function(){var e=Object(u.a)(l.a.mark((function e(){var a,c,i;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(JSON.parse(localStorage.getItem("RUDAIsWorking"))){e.next=3;break}return e.abrupt("break",9);case 3:if((a=s())>0)for(c=0;c<t.length;c++)for(i=t[c];i.getQuesadillasInStock()<5&&a>0;)r.setMetadata("quesadillasReady",s()-1),i.giveQuesadilla(),a=s();return e.next=7,n(100);case 7:e.next=0;break;case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return{start:i}},h=function(e){return{log:function(t,a){var n=JSON.parse(localStorage.getItem("logs"));n.unshift({title:t,message:a,time:Date.now()}),n.length>100&&n.pop(),e(n),localStorage.setItem("logs",JSON.stringify(n))}}},j=a(27),O=a.n(j),x=a(52),v=function(e,t,a,n){var r=function(e){return new Promise((function(t){return setTimeout(t,e)}))},s=!1;s||(s=!0,function(){var e=localStorage.getItem("awsConfig");e&&null!==(e=JSON.parse(e)).accessKeyId&&null!==e.secretAccessKey||((e={}).accessKeyId=window.prompt("Ingresa el accessKeyId del equipo 9: "),e.secretAccessKey=window.prompt("Ingresa el secretAccessKey del equipo 9: "),e.region="us-east-1",localStorage.setItem("awsConfig",JSON.stringify(e))),O.a.config.update(Object(d.a)(Object(d.a)({},e),{},{region:"us-east-1"}))}());for(var c=new O.a.SQS({apiVersion:"2012-11-05"}),o="https://sqs.us-east-1.amazonaws.com/292274580527/sqs_cc106_team_9",g=function(e){for(var t=[],a=0;a<e.length;a++)for(var n=e[a],r=0;r<n.canWorkOn.length;r++){var s=n.canWorkOn[r];t.includes(s)||t.push(s)}return t}(t),m=["cilantro","cebolla","salsa","guacamole"],b={},h=0;h<t.length;h++){var j=t[h];b[j.name]=p(n,j.name)}b.rejected=p(n,"rejected"),b.done=p(n,"done");var v=function(t){for(var a={name:null,listSize:e[0].getQueueSize(),taqueroIndex:-1},n=0;n<e.length;n++){var r=e[n];D(r,t)&&(r.getQueueSize()<=a.listSize&&(a={name:r.name,listSize:r.getQueueSize(),taqueroIndex:n}))}if(null!==a.name)return y(a.taqueroIndex,[t]),M("Asigned order ".concat(t.request_id," to ").concat(a.name)),!0;if(I(t))return N(Object(d.a)({},t)),!0;var s=JSON.parse(localStorage.getItem("ordersToReAllocate"));return localStorage.setItem("ordersToReAllocate",JSON.stringify([].concat(Object(i.a)(s),[t]))),!1},N=function(e){e.status="done",b.done.pushOrder(e),M("Order ".concat(e.request_id," is done."))},q=function(){var e=Object(u.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e){c.deleteMessage({QueueUrl:o,ReceiptHandle:t},(function(){return e()}))})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),k=function(e){e.status="done",b.done.pushOrder(e),M("Order ".concat(e.request_id," was empty, so its done."))},y=function(t,a){e[t].insertToQueue(a)},w=function(){var e=Object(u.a)(l.a.mark((function e(t){var a,n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=0;case 1:if(!(a<t.length)){e.next=9;break}return n=t[a],e.next=5,C(n);case 5:console.log("Sent order: ".concat(JSON.stringify(n)));case 6:a++,e.next=1;break;case 9:console.log("FILL DONE");case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),S=function(e){var t={invalid:!0},a=0;try{if("number"!==typeof e.request_id||e.request_id<0)return _(e,"invalid id"),t;if("Invalid Date"===new Date(e.datetime).toString())return _(e,"invalid date"),t;if("open"!==e.status)return _(e,"invalid status '".concat(e.status,"'")),t;var n=!1;if(e.orden.length>10)return t;for(var r=0;r<e.orden.length;r++){var s=e.orden[r];if((a+=s.quantity)>300)return _(e,"the order has more than 300 products"),t;var c=s.part_id.split("-"),i=Object(f.a)(c,2),o=i[0],l=i[1];if(parseInt(o)===e.request_id)if(parseInt(l)>e.orden.length||parseInt(l)!==r)J(null,"Invalid Id"),n=!0,delete e.orden[r];else if(s.cuantity>100)J(s.part_id,"has more than 100 products"),n=!0,delete e.orden[r];else if(g.includes(s.meat))if(["taco","quesadilla"].includes(s.type))if("open"===s.status){for(var u=0;u<s.ingredients.length;u++){var d=s.ingredients[u];m.includes(d)||(J(s.part_id,'"'.concat(d,'" is not a valid ingredient')),n=!0,delete e.orden[r])}e.orden[r].delay_counter=0,e.orden[r].finished_products=0,e.response=[]}else J(s.part_id,'"'.concat(s.status,'" is not a valid initial status')),n=!0,delete e.orden[r];else J(s.part_id,'"'.concat(s.type,'" is not a valid type of product')),n=!0,delete e.orden[r];else J(s.part_id,'"'.concat(s.meat,'" is not a valid type of meat')),n=!0,delete e.orden[r];else J(null,"Invalid Id"),n=!0,delete e.orden[r]}if(n){var p=e.orden;e.orden=[];for(var b=0;b<p.length;b++){var h=p[b];h&&e.orden.push(h)}}return e}catch(j){return t}},M=function(e){a.log("Allocation and balancing:",e)},I=function(e){for(var t=0;t<e.orden.length;t++){if("done"!==e.orden[t].status)return!1}return!0},R=function(){var e=Object(u.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e){c.purgeQueue({QueueUrl:o},(function(){console.log("PURGE DONE"),e()}))})));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),T=function(){var e=Object(u.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e){c.receiveMessage({QueueUrl:o},(function(t,a){e(a.Messages)}))})));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),_=function(e,t){M("Order ".concat(e.request_id?e.request_id:"with unknown id"," rejected due to: ").concat(t)),e.status="rejected",b.rejected.pushOrder(e)},J=function(e,t){M("Part ".concat(e||"with unknown id"," rejected due to: ").concat(t))},C=function(){var e=Object(u.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e){c.sendMessage({MessageBody:JSON.stringify(t),QueueUrl:o},(function(){return e()}))})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),A=function(){var e=Object(u.a)(l.a.mark((function e(){var t,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,R();case 2:return e.next=4,w(x);case 4:Q();case 5:return e.next=8,T();case 8:if(!((t=e.sent).length>0)){e.next=21;break}return e.next=12,q(t[0].ReceiptHandle);case 12:if(!(a=S(JSON.parse(t[0].Body))).invalid){e.next=15;break}return e.abrupt("continue",5);case 15:if(0!==a.orden.length){e.next=18;break}return k(Object(d.a)({},a)),e.abrupt("continue",5);case 18:v(a),e.next=24;break;case 21:return M("There are no more orders"),localStorage.setItem("gotAllOrders",JSON.stringify(!0)),e.abrupt("break",26);case 24:e.next=5;break;case 26:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),D=function(e,t){for(var a=0;a<t.orden.length;a++){var n=t.orden[a];if("done"!==n.status&&(("quesadilla"!==n.type||0!==e.getQuesadillasInStock())&&!e.isResting()&&e.canWorkOn.includes(n.meat)))return!0}},Q=function(){var e=Object(u.a)(l.a.mark((function e(){var t,a,n,s;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(JSON.parse(localStorage.getItem("RUDAIsWorking"))){e.next=3;break}return e.abrupt("break",11);case 3:for(t=JSON.parse(localStorage.getItem("ordersToReAllocate")),a=[],n=0;n<t.length;n++)s=t[n],v(s)||a.push(s);return localStorage.setItem("ordersToReAllocate",JSON.stringify(a)),e.next=9,r(100);case 9:e.next=0;break;case 11:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return{start:A,insertTaquero:y,allocateOrder:v}},N=function(e,t,a){var n=["guacamole","salsa","cilantro","cebolla"],r=function(e,t,n){a.log("Chalan ".concat(e,":"),"Filled ".concat(t,"'s' ").concat(n))},s=function(){var e=Object(u.a)(l.a.mark((function e(t){var a,n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=0;case 1:if(!(a<t.servesTaqueros.length)){e.next=9;break}return n=i(t.servesTaqueros[a]),e.next=5,n.fillFilling("tortillas");case 5:r(t.name,n.name,"tortillas");case 6:a++,e.next=1;break;case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),c=function(){var e=Object(u.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(JSON.parse(localStorage.getItem("RUDAIsWorking"))){e.next=3;break}return e.abrupt("break",7);case 3:return e.next=5,o(t);case 5:e.next=0;break;case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),i=function(e){for(var a=0;a<t.length;a++){var n=t[a];if(n.name===e)return n}},o=function(){var e=Object(u.a)(l.a.mark((function e(t){var a,c,o,u,d,f;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=0,o=0;case 2:if(!(o<t.servesTaqueros.length)){e.next=27;break}if(JSON.parse(localStorage.getItem("RUDAIsWorking"))){e.next=5;break}return e.abrupt("break",27);case 5:u=i(t.servesTaqueros[o]),d=0;case 7:if(!(d<n.length)){e.next=24;break}if(JSON.parse(localStorage.getItem("RUDAIsWorking"))){e.next=10;break}return e.abrupt("break",24);case 10:return f=n[d],c=Date.now(),e.next=14,u.fillFilling(f);case 14:if(!e.sent){e.next=16;break}r(t.name,u.name,f);case 16:if(!((a+=Date.now()-c)>2e4||u.getTortillas()<25)){e.next=21;break}return e.next=20,s(t);case 20:a=0;case 21:d++,e.next=7;break;case 24:o++,e.next=2;break;case 27:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return{start:function(){(function(){for(var t={},a=0;a<e.length;a++){var n=e[a];void 0===t[n.chalan]?t[n.chalan]=[n.name]:t[n.chalan].push(n.name)}return t=Object.keys(t).map((function(e){return{name:e,servesTaqueros:t[e]}}))})().forEach((function(e){return c(e)}))}}},q=a(1),k=function(e){var t=e.data,a=null!=t&&t.length>=1?Object.keys(t[0]):null;return a?Object(q.jsxs)("div",{className:"table",children:[Object(q.jsx)("div",{className:"tableRow",children:a.map((function(e){return Object(q.jsx)("div",{className:"cell cellHeader",children:Object(q.jsx)("p",{className:"cellText cellTextHeader",children:e})},e)}))}),t.map((function(e){return Object(q.jsx)("div",{className:"tableRow",children:a.map((function(a){return Object(q.jsx)("div",{className:"cell cell".concat(t.indexOf(e)%2),children:Object(q.jsx)("p",{className:"cellText",children:e[a]})},"".concat(a,"_").concat(e[a]))}))},"".concat(JSON.stringify(e)))}))]}):Object(q.jsx)("p",{className:"noOrders",children:"(No orders)"})},y=function(){var e=Object(n.useState)(!1),t=Object(f.a)(e,2),a=t[0],r=t[1],s=Object(n.useState)(!0),c=Object(f.a)(s,2),o=c[0],g=c[1],j={tortillas:50,cilantro:200,cebolla:200,salsa:150,guacamole:100},O=Object(n.useState)(0),x=Object(f.a)(O,2),y=x[0],w=x[1],S=Object(n.useState)([]),M=Object(f.a)(S,2),I=M[0],R=M[1],T=h(R),_=[{name:"tripa y cabeza",canWorkOn:["tripa","cabeza"],chalan:"AMLO"},{name:"cabeza y asada",canWorkOn:["cabeza","asada"],chalan:"AMLO"},{name:"asada y suadero",canWorkOn:["asada","suadero"],chalan:"Marina"},{name:"suadero y adobada",canWorkOn:["suadero","adobada"],chalan:"Marina"}],J=function(e){for(var t={},a=0;a<e.length;a++){t[e[a].name]=[]}return t.done=[],t.rejected=[],t}(_),C=Object(n.useState)(J),A=Object(f.a)(C,2),D=A[0],Q=A[1],U={workingOn:null,queueLength:0,fan:{active:!0,untilNeeded:0},rest:{untilNeeded:1e3,timeRested:0,resting:!1},tortillas:j.tortillas,quesadillasInStock:0,fillings:{salsa:j.salsa,guacamole:j.guacamole,cilantro:j.cilantro,cebolla:j.cebolla}},W={fan:{active:!0,untilNeeded:0},tortillas:50,quesadillasReady:0},z=function(e){for(var t={},a=0;a<e.length;a++){var n=e[a];t[n.name]=Object(d.a)(Object(d.a)({},U),{},{chalan:n.chalan})}return t.quesadillero=W,t},P=Object(n.useState)(z(_)),F=Object(f.a)(P,2),L=F[0],E=F[1],H=_.map((function(e){return m(e.name,e.canWorkOn,Q,E,T,j)})),K=b(E,H,j.tortillas),B=v(H,_,T,Q),G=N(_,H,T),V=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return"".concat(e.charAt(0).toUpperCase()).concat(e.substring(1,e.length))},X=function(){localStorage.setItem("logs",JSON.stringify([])),R([]),te(),ae()},Y=function(e){var t=Object(d.a)({},e);t.datetime=$(t.datetime),t.parts=t.orden.length,t.finishedParts=0,t.productQuantity=0;for(var a=0;a<t.orden.length;a++){var n=t.orden[a];"done"===n.status&&t.finishedParts++,t.productQuantity+=n.quantity}return delete t.orden,t.stepsDone=void 0!==t.response?t.response.length:0,delete t.response,t},Z=function(e){for(var t=[],a=0;a<e.length;a++)null!=e[a]&&t.push(Y(e[a]));return t},$=function(e){var t=new Date(e);return"".concat(t.getHours(),":").concat(t.getMinutes(),":").concat(t.getSeconds()," (").concat(t.getMilliseconds(),"ms)")},ee=function(){for(var e=0;e<H.length;e++)if(H[e].getQueueSize()>0)return!1;return!(JSON.parse(localStorage.getItem("ordersToReAllocate")).length>0)&&!!JSON.parse(localStorage.getItem("gotAllOrders"))},te=function(){E(z(_)),localStorage.setItem("metadata",JSON.stringify(z(_)))},ae=function(){p(Q,null,J).restartRUDA()},ne=function(){var e=Object(u.a)(l.a.mark((function e(){var t,n,s;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!a){e.next=2;break}return e.abrupt("return");case 2:for(r(!0),X(),localStorage.setItem("RUDAIsWorking",JSON.stringify(!0)),G.start(),B.start(),t=0;t<H.length;t++)H[t].startWorking();K.start(),n=0;case 10:return s=Date.now(),e.next=14,re(100);case 14:if(!ee()){e.next=17;break}return localStorage.setItem("RUDAIsWorking",JSON.stringify(!1)),e.abrupt("break",21);case 17:n+=Date.now()-s,w((n/1e3).toFixed(1)),e.next=10;break;case 21:r(!1),T.log("RUDA is done\ud83d\ude0e");case 23:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),re=function(e){return new Promise((function(t){return setTimeout(t,e)}))};return Object(n.useEffect)((function(){o&&(g(!1),localStorage.setItem("orders",JSON.stringify(J)),localStorage.setItem("logs",JSON.stringify([])),localStorage.setItem("metadata",JSON.stringify(z(_))),localStorage.setItem("ordersToReAllocate",JSON.stringify([])),localStorage.setItem("gotAllOrders",JSON.stringify(!1)))})),Object(q.jsxs)("div",{className:"App",children:[Object(q.jsxs)("div",{className:"header",children:[Object(q.jsx)("img",{src:"https://raw.githubusercontent.com/ulisesaviles/os-tacoshop-ruda/main/RUDA.png",className:"logo",alt:"logo"}),a?Object(q.jsx)("div",{className:"running",children:"Running RUDA..."}):Object(q.jsx)("button",{onClick:ne,className:"startBtn",children:"Start RUDA"}),Object(q.jsxs)("p",{className:"chrono",children:["(",y,"s)"]})]}),Object(q.jsxs)("div",{className:"contentContainer",children:[Object(q.jsxs)("div",{className:"contentLeftContainer",children:[Object(q.jsxs)("div",{className:"taquerosContainer",children:[_.map((function(e){var t=_.indexOf(e);return Object(q.jsxs)("div",{className:"taqueroContainer",children:[Object(q.jsxs)("h4",{className:"taqueroName",children:["Taquero de ",e.name]}),Object(q.jsxs)("div",{className:"taqueroMetadataContainer",children:[Object(q.jsx)("h3",{className:"metadata",children:"Metadata"}),Object(q.jsxs)("div",{className:"taqueroMetadataRowContainer",children:[Object(q.jsx)("h6",{className:"taqueroMetadataRowTitle",children:"Orders in queue:"}),Object(q.jsx)("p",{className:"actualMetadata",children:L[e.name].queueLength})]}),Object(q.jsxs)("div",{className:"taqueroMetadataRowContainer",children:[Object(q.jsx)("h6",{className:"taqueroMetadataRowTitle",children:"Working on:"}),Object(q.jsx)("p",{className:"actualMetadata",children:null===L[e.name].workingOn?"null":L[e.name].workingOn})]}),Object(q.jsxs)("div",{className:"taqueroMetadataRowContainer",children:[Object(q.jsx)("h6",{className:"taqueroMetadataRowTitle",children:"Fan active:"}),Object(q.jsx)("p",{className:"actualMetadata",children:JSON.stringify(L[e.name].fan.active)})]}),Object(q.jsxs)("div",{className:"taqueroMetadataRowContainer",children:[Object(q.jsx)("h6",{className:"taqueroMetadataRowTitle",children:"Chal\xe1n:"}),Object(q.jsx)("p",{className:"actualMetadata",children:L[e.name].chalan})]}),Object(q.jsxs)("div",{className:"taqueroMetadataRowContainer",children:[Object(q.jsx)("h6",{className:"taqueroMetadataRowTitle",children:"Resting:"}),Object(q.jsx)("p",{className:"actualMetadata",children:JSON.stringify(L[e.name].rest.resting)})]}),Object(q.jsxs)("div",{className:"taqueroMetadataRowContainer",children:[Object(q.jsx)("h6",{className:"taqueroMetadataRowTitle",children:"Time rested:"}),Object(q.jsx)("p",{className:"actualMetadata",children:L[e.name].rest.timeRested})]}),Object(q.jsxs)("div",{className:"taqueroMetadataRowContainer",children:[Object(q.jsx)("h6",{className:"taqueroMetadataRowTitle",children:"Tacos untill rest:"}),Object(q.jsx)("p",{className:"actualMetadata",children:L[e.name].rest.untilNeeded})]}),Object(q.jsxs)("div",{className:"taqueroMetadataRowContainer",children:[Object(q.jsx)("h6",{className:"taqueroMetadataRowTitle",children:"Quesadillas in stock:"}),Object(q.jsx)("p",{className:"actualMetadata",children:L[e.name].quesadillasInStock})]}),Object(q.jsxs)("div",{className:"taqueroMetadataRowContainer",children:[Object(q.jsx)("h6",{className:"taqueroMetadataRowTitle",children:"Tortillas"}),Object(q.jsx)("p",{className:"actualMetadata",children:L[e.name].tortillas})]}),Object(q.jsxs)("div",{className:"taqueroMetadataRowContainer",children:[Object(q.jsx)("h6",{className:"taqueroMetadataRowTitle",children:"Cilantro:"}),Object(q.jsx)("p",{className:"actualMetadata",children:L[e.name].fillings.cilantro})]}),Object(q.jsxs)("div",{className:"taqueroMetadataRowContainer",children:[Object(q.jsx)("h6",{className:"taqueroMetadataRowTitle",children:"Cebolla:"}),Object(q.jsx)("p",{className:"actualMetadata",children:L[e.name].fillings.cebolla})]}),Object(q.jsxs)("div",{className:"taqueroMetadataRowContainer",children:[Object(q.jsx)("h6",{className:"taqueroMetadataRowTitle",children:"Salsa:"}),Object(q.jsx)("p",{className:"actualMetadata",children:L[e.name].fillings.salsa})]}),Object(q.jsxs)("div",{className:"taqueroMetadataRowContainer",children:[Object(q.jsx)("h6",{className:"taqueroMetadataRowTitle",children:"Guacamole:"}),Object(q.jsx)("p",{className:"actualMetadata",children:L[e.name].fillings.guacamole})]})]})]},t)})),Object(q.jsxs)("div",{className:"taqueroContainer",children:[Object(q.jsx)("h4",{className:"taqueroName",children:"Quesadillero"}),Object(q.jsxs)("div",{className:"taqueroMetadataContainer",children:[Object(q.jsx)("h3",{className:"metadata",children:"Metadata"}),Object(q.jsxs)("div",{className:"taqueroMetadataRowContainer",children:[Object(q.jsx)("h6",{className:"taqueroMetadataRowTitle",children:"Ready quesadillas:"}),Object(q.jsx)("p",{className:"actualMetadata",children:L.quesadillero.quesadillasReady})]}),Object(q.jsxs)("div",{className:"taqueroMetadataRowContainer",children:[Object(q.jsx)("h6",{className:"taqueroMetadataRowTitle",children:"Fan active:"}),Object(q.jsx)("p",{className:"actualMetadata",children:JSON.stringify(L.quesadillero.fan.active)})]}),Object(q.jsxs)("div",{className:"taqueroMetadataRowContainer",children:[Object(q.jsx)("h6",{className:"taqueroMetadataRowTitle",children:"Tortillas"}),Object(q.jsx)("p",{className:"actualMetadata",children:L.quesadillero.tortillas})]})]})]})]}),Object(q.jsx)("h2",{className:"orders",children:"Orders"}),Object(q.jsx)("div",{className:"ordersContainer",children:Object.keys(D).map((function(e){return Object(q.jsxs)("div",{className:"tableSuperContainer",children:[Object(q.jsx)("p",{className:"tableName",children:V(e)}),Object(q.jsx)(k,{data:Z(Object(i.a)(D[e]))})]},e)}))})]}),Object(q.jsxs)("div",{className:"logsContainer",children:[Object(q.jsx)("h2",{className:"logsTitle",children:"Logs:"}),Object(q.jsx)("p",{className:"logsSubtitle",children:"(De m\xe1s nuevo a m\xe1s viejo)"}),Object(q.jsx)("div",{className:"logsContentContainer",children:I.map((function(e){var t=I.indexOf(e);return Object(q.jsxs)("div",{className:"logContainer",children:[Object(q.jsxs)("div",{className:"logHeaderContainer",children:[Object(q.jsx)("h5",{className:"logTitle",children:e.title}),Object(q.jsx)("p",{className:"logTime",children:$(e.time)})]}),e.message]},t)}))})]})]})]})};c.a.render(Object(q.jsx)(r.a.StrictMode,{children:Object(q.jsx)(y,{})}),document.getElementById("root"))},52:function(e){e.exports=JSON.parse('[{"datetime":"2021-09-14 16:15:55.421215","request_id":0,"status":"open","orden":[]},{"datetime":"2021-09-14 16:15:55.421246","request_id":1,"status":"open","orden":[{"part_id":"1-0","type":"taco","meat":"suadero","status":"open","quantity":2,"finished_products":0,"delay_counter":0,"ingredients":["salsa","cilantro","cebolla"]}]},{"datetime":"2021-09-14 16:15:55.421329","request_id":2,"status":"open","orden":[{"part_id":"2-0","type":"quesadilla","meat":"suadero","status":"open","quantity":6,"ingredients":[]},{"part_id":"2-1","type":"taco","meat":"suadero","status":"open","quantity":3,"ingredients":["cebolla","salsa"]},{"part_id":"2-2","type":"taco","meat":"asada","status":"open","quantity":6,"ingredients":["cebolla","cilantro"]},{"part_id":"2-3","type":"taco","meat":"tripa","status":"open","quantity":1,"ingredients":["salsa","cilantro","guacamole"]},{"part_id":"2-4","type":"taco","meat":"cabeza","status":"open","quantity":9,"ingredients":["guacamole","cebolla","cilantro"]}]},{"datetime":"2021-09-14 16:15:55.422069","request_id":3,"status":"open","orden":[]},{"datetime":"2021-09-14 16:15:55.422085","request_id":4,"status":"open","orden":[]},{"datetime":"2021-09-14 16:15:55.422090","request_id":5,"status":"open","orden":[{"part_id":"5-0","type":"taco","meat":"asada","status":"open","quantity":8,"ingredients":[]},{"part_id":"5-1","type":"quesadilla","meat":"adobada","status":"open","quantity":5,"ingredients":["cilantro"]},{"part_id":"5-2","type":"taco","meat":"adobada","status":"open","quantity":9,"ingredients":["cebolla"]},{"part_id":"5-3","type":"taco","meat":"asada","status":"open","quantity":6,"ingredients":["salsa","guacamole"]}]},{"datetime":"2021-09-14 16:15:55.422263","request_id":6,"status":"open","orden":[]},{"datetime":"2021-09-14 16:15:55.422273","request_id":7,"status":"open","orden":[]},{"datetime":"2021-09-14 16:15:55.422279","request_id":8,"status":"open","orden":[{"part_id":"8-0","type":"taco","meat":"adobada","status":"open","quantity":1,"ingredients":["salsa","cilantro"]},{"part_id":"8-1","type":"taco","meat":"cabeza","status":"open","quantity":8,"ingredients":[]}]},{"datetime":"2021-09-14 16:15:55.422346","request_id":9,"status":"open","orden":[{"part_id":"9-0","type":"taco","meat":"cabeza","status":"open","quantity":7,"ingredients":["guacamole","cilantro"]},{"part_id":"9-1","type":"taco","meat":"suadero","status":"open","quantity":4,"ingredients":["cilantro","salsa"]},{"part_id":"9-2","type":"taco","meat":"cabeza","status":"open","quantity":1,"ingredients":["cebolla"]},{"part_id":"9-3","type":"quesadilla","meat":"asada","status":"open","quantity":6,"ingredients":["salsa","cebolla","cilantro"]},{"part_id":"9-4","type":"quesadilla","meat":"tripa","status":"open","quantity":6,"ingredients":["salsa"]}]},{"datetime":"2021-09-14 16:15:55.422689","request_id":10,"status":"open","orden":[]}]')}},[[472,1,2]]]);
//# sourceMappingURL=main.8fa1989f.chunk.js.map