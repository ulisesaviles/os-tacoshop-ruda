(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[0],{26:function(e,t){},28:function(e,t,a){},470:function(e){e.exports=JSON.parse("{}")},472:function(e,t,a){"use strict";a.r(t);var n=a(6),r=a.n(n),s=a(51),c=a.n(s),i=a(8),o=a(3),l=a.n(o),u=a(4),d=a(9),f=a(7),g=(a(28),function(e,t,a){var n=function(){var e=localStorage.getItem("orders");return JSON.parse(e)};return{getAllOrders:n,setOrders:function(a){var r=n();r[t]=a,e(r),localStorage.setItem("orders",JSON.stringify(r))},pushOrder:function(a){var r=n();r[t].push(a),e(r),localStorage.setItem("orders",JSON.stringify(r))},restartRUDA:function(){e(a),localStorage.setItem("orders",JSON.stringify(a))}}}),p=function(e,t){var a=function(e){return new Promise((function(t){return setTimeout(t,e)}))},n=function(){var e=Object(u.a)(l.a.mark((function e(n){var c,i,o;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:c=r(),i=0;case 2:if(!(i<n.length)){e.next=11;break}return o=n[i],c[t].fillings[o]--,e.next=7,a(500);case 7:s("fillings",c[t].fillings);case 8:i++,e.next=2;break;case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),r=function(){var e=localStorage.getItem("metadata");return JSON.parse(e)},s=function(a,n){var s=r();s[t][a]=n,e(s),localStorage.setItem("metadata",JSON.stringify(s))};return{getMetadata:r,setMetadata:s,consumeFillings:n,useTortilla:function(){var e=r();e[t].tortillas--,s("tortillas",e[t].tortillas)},madeTaco:function(){var a=r();a[t].rest.untilNeeded--,a[t].fan.untilNeeded--,e(a),localStorage.setItem("metadata",JSON.stringify(a))},madePart:function(){var a=r();a[t].queueLength--,a[t].workingOn=null,e(a),localStorage.setItem("metadata",JSON.stringify(a))},getUnoccupiedTaqueros:function(){for(var e=[],t=r(),a=Object.keys(t),n=0;n<a.length;n++){var s=a[n];null!==t[s].workingOn||t[s].resting||e.push(s)}return e}}},m=function(e,t,a,n,r,s){var c=function(e){return new Promise((function(t){return setTimeout(t,e)}))},o=g(a,e),d=p(n,e),m=[],h=function(){var t=Object(u.a)(l.a.mark((function t(a){var n,r;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(b(a)){t.next=4;break}return t.next=3,c(100);case 3:return t.abrupt("return");case 4:if(n={guacamole:20,salsa:15,cilantro:10,cebolla:10,tortillas:5},"tortillas"===a){t.next=13;break}return(r=d.getMetadata()[e].fillings)[a]=s[a],t.next=10,c(1e3*n[a]);case 10:d.setMetadata("fillings",r),t.next=16;break;case 13:return t.next=15,c(1e3*n.tortillas);case 15:d.setMetadata("tortillas",s.tortillas);case 16:return t.abrupt("return",!0);case 17:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),b=function(t){return"tortillas"!==t?d.getMetadata()[e].fillings[t]<s[t]:d.getMetadata()[e].tortillas<s.tortillas},O=function(e){return[0,v(e[0].orden)]},j=function(){return o.getAllOrders()[e]},x=function(){return d.getMetadata()[e].quesadillasInStock},v=function(e){for(var a=0;a<e.length;a++){var n=e[a];if(t.includes(n.meat)&&"done"!==n.status&&("quesadilla"!==n.type||x()>=1))return a}return null},k=function(){for(var e=j(),t=0;t<e.length;t++){var a=e[t];y(a)}o.setOrders([])},N=function(t){for(var a=d.getMetadata()[e].fillings,n=0;n<t.length;n++){if(0===a[t[n]])return!1}return!0},S=function(t){r.log("Taquero ".concat(e,":"),t)},w=function(){var t=d.getMetadata()[e].rest;t.resting=!0,d.setMetadata("rest",t)},q=function(){var e=Object(u.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.consumeFillings(t.ingredients);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),y=function(){var e=Object(u.a)(l.a.mark((function e(t){var a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:S("I'll give order ".concat(t.request_id," to allocation handler")),a=JSON.parse(localStorage.getItem("ordersToReAllocate")),localStorage.setItem("ordersToReAllocate",JSON.stringify([].concat(Object(i.a)(a),[t])));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),M=function(){var t=Object(u.a)(l.a.mark((function t(){var a;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!((a=60-d.getMetadata()[e].rest.timeRested)>0)){t.next=5;break}return S("I'll rest ".concat(a," secs")),t.next=5,c(1e3*a);case 5:d.setMetadata("rest",{untilNeeded:1e3,timeRested:0,resting:!1});case 6:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),I=function(){var t=Object(u.a)(l.a.mark((function t(){var a;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return(a=d.getMetadata()[e]).rest.tempResting=!0,d.setMetadata("rest",a.rest),t.next=5,c(1e3);case 5:(a=d.getMetadata()[e]).rest.timeRested++,a.rest.tempResting=!1,d.setMetadata("rest",a.rest);case 9:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),R=function(){var e=Object(u.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(0!==j().length){e.next=6;break}return e.next=4,I();case 4:e.next=8;break;case 6:return e.next=8,T();case 8:if(JSON.parse(localStorage.getItem("RUDAIsWorking"))){e.next=10;break}return e.abrupt("break",12);case 10:e.next=0;break;case 12:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),T=function(){var t=Object(u.a)(l.a.mark((function t(){var a,n,r,s,i,u,g,p;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(m=j(),a=O(m),n=Object(f.a)(a,2),r=n[0],s=n[1],i=m[r].orden[s],null!==s&&("quesadilla"!==i.type||0!==x())){t.next=9;break}return y(m.shift()),o.setOrders(m),t.next=8,I();case 8:return t.abrupt("return");case 9:u=Date.now(),m[r].status="working",o.setOrders(m),i.status="working",d.setMetadata("workingOn",i.part_id),g=0,0;case 16:if(!(i.quantity>i.finished_products)){t.next=53;break}if(!(g>=10)){t.next=21;break}return S("I have done ".concat(10," ").concat(i.type,"s for part ").concat(i.part_id," ")),i.status="open",t.abrupt("break",53);case 21:if(0!==d.getMetadata()[e].rest.untilNeeded){t.next=27;break}return w(),k(),t.next=26,M();case 26:return t.abrupt("return");case 27:if(N(i.ingredients)){t.next=31;break}return S("I have not enought fillings to continue"),i.status="open",t.abrupt("break",53);case 31:if(!("quesadilla"===i.type&&x()<=0)){t.next=35;break}return S("I have not enought quesadillas to continue"),i.status="open",t.abrupt("break",53);case 35:if("quesadilla"!==i.type){t.next=40;break}p=d.getMetadata()[e].quesadillasInStock-1,d.setMetadata("quesadillasInStock",p),t.next=44;break;case 40:if("quesadilla"===i.type){t.next=44;break}return d.useTortilla(),t.next=44,c(1e3);case 44:return t.next=46,q(i);case 46:d.madeTaco(),i.finished_products+=1,i.quantity===i.finished_products&&(i.status="done"),g++;case 50:t.next=16;break;case 53:return m[r].orden[s]=i,m[r].response.push({who:"Taquero de ".concat(e),when:(new Date).toISOString(),what:"Made ".concat(g," ").concat(i.meat," ").concat(i.type," (part ").concat(i.part_id,")"),time:Date.now()-u}),m[r].status="open",d.madePart(),y(m.shift()),o.setOrders(m),S("".concat(i.quantity===i.finished_products?"Finished":"Putted aside",' part "').concat(i.part_id,'" (').concat(i.finished_products,"/").concat(i.quantity,")  ").concat(m.length," left in my list")),t.abrupt("return",m.length);case 61:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return{name:e,insertToQueue:function(e){return m=[].concat(Object(i.a)(j()),Object(i.a)(e)),o.setOrders(m),S("Inserted ".concat(e.length," element(s) succesfully")),d.setMetadata("queueLength",m.length),m},getQueueSize:function(){return j().length},workOnNextOrder:T,getOrders:j,startWorking:R,canWorkOn:t,getQuesadillasInStock:x,giveQuesadilla:function(){var t=d.getMetadata()[e].quesadillasInStock+1;d.setMetadata("quesadillasInStock",t)},restart:function(){o.setOrders([])},fillFilling:h,getTortillas:function(){return d.getMetadata()[e].tortillas},isResting:function(){return d.getMetadata()[e].rest.resting}}},h=function(e,t,a){var n=function(e){return new Promise((function(t){return setTimeout(t,e)}))},r=p(e,"quesadillero"),s=function(){return r.getMetadata().quesadillero.quesadillasReady},c=function(){var e=Object(u.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n(5e3);case 2:r.setMetadata("tortillas",a);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),i=function(){var e=Object(u.a)(l.a.mark((function e(){var a,i,u,d;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:o();case 1:if(JSON.parse(localStorage.getItem("RUDAIsWorking"))){e.next=4;break}return e.abrupt("break",17);case 4:if(0!==(a=r.getMetadata().quesadillero.tortillas)){e.next=9;break}return e.next=8,c();case 8:a=r.getMetadata().quesadillero.tortillas;case 9:return r.setMetadata("tortillas",a-1),e.next=12,n(2e4);case 12:for(i={index:null,quantity:6},u=0;u<t.length;u++)(d=t[u]).getQuesadillasInStock()<i.quantity&&d.getQuesadillasInStock()<5&&(i={index:u,quantity:d.getQuesadillasInStock()});null!==i.index?t[i.index].giveQuesadilla():r.setMetadata("quesadillasReady",s()+1),e.next=1;break;case 17:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),o=function(){var e=Object(u.a)(l.a.mark((function e(){var a,c,i;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(JSON.parse(localStorage.getItem("RUDAIsWorking"))){e.next=3;break}return e.abrupt("break",9);case 3:if((a=s())>0)for(c=0;c<t.length;c++)for(i=t[c];i.getQuesadillasInStock()<5&&a>0;)r.setMetadata("quesadillasReady",s()-1),i.giveQuesadilla(),a=s();return e.next=7,n(100);case 7:e.next=0;break;case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return{start:i}},b=function(e){return{log:function(t,a){var n=JSON.parse(localStorage.getItem("logs"));n.unshift({title:t,message:a,time:Date.now()}),n.length>100&&n.pop(),e(n),localStorage.setItem("logs",JSON.stringify(n))}}},O=a(27),j=a.n(O),x=(a(470),function(e,t,a,n,r){var s=function(e){return new Promise((function(t){return setTimeout(t,e)}))},c=p(r),o=!1;o||(o=!0,function(){var e=localStorage.getItem("awsConfig");e&&null!==(e=JSON.parse(e)).accessKeyId&&null!==e.secretAccessKey||((e={}).accessKeyId=window.prompt("Ingresa el accessKeyId del equipo 9: "),e.secretAccessKey=window.prompt("Ingresa el secretAccessKey del equipo 9: "),e.region="us-east-1",localStorage.setItem("awsConfig",JSON.stringify(e))),j.a.config.update(Object(d.a)(Object(d.a)({},e),{},{region:"us-east-1"}))}());for(var m=new j.a.SQS({apiVersion:"2012-11-05"}),h="https://sqs.us-east-1.amazonaws.com/292274580527/sqs_cc106_team_9",b=function(e){for(var t=[],a=0;a<e.length;a++)for(var n=e[a],r=0;r<n.canWorkOn.length;r++){var s=n.canWorkOn[r];t.includes(s)||t.push(s)}return t}(t),O=["cilantro","cebolla","salsa","guacamole"],x={},v=0;v<t.length;v++){var k=t[v];x[k.name]=g(n,k.name)}x.rejected=g(n,"rejected"),x.done=g(n,"done");var N=function(t){for(var a={name:null,listSize:e[0].getQueueSize(),taqueroIndex:-1},n=0;n<e.length;n++){var r=e[n];D(r,t)&&(r.getQueueSize()<=a.listSize&&(a={name:r.name,listSize:r.getQueueSize(),taqueroIndex:n}))}if(null!==a.name)return y(a.taqueroIndex,[t]),R("Asigned order ".concat(t.request_id," to ").concat(a.name)),!0;if(T(t))return S(Object(d.a)({},t)),!0;var s=JSON.parse(localStorage.getItem("ordersToReAllocate"));return localStorage.setItem("ordersToReAllocate",JSON.stringify([].concat(Object(i.a)(s),[t]))),!1},S=function(e){e.status="done",x.done.pushOrder(e),R("Order ".concat(e.request_id," is done."))},w=function(){var e=Object(u.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e){m.deleteMessage({QueueUrl:h,ReceiptHandle:t},(function(){return e()}))})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),q=function(e){e.status="done",x.done.pushOrder(e),R("Order ".concat(e.request_id," was empty, so its done."))},y=function(t,a){e[t].insertToQueue(a)},M=function(e){var t={invalid:!0},a=0;try{if("number"!==typeof e.request_id||e.request_id<0)return A(e,"invalid id"),t;if("Invalid Date"===new Date(e.datetime).toString())return A(e,"invalid date"),t;if("open"!==e.status)return A(e,"invalid status '".concat(e.status,"'")),t;var n=!1;if(e.orden.length>10)return t;for(var r=0;r<e.orden.length;r++){var s=e.orden[r];if((a+=s.quantity)>300)return A(e,"the order has more than 300 products"),t;var c=s.part_id.split("-"),i=Object(f.a)(c,2),o=i[0],l=i[1];if(parseInt(o)===e.request_id)if(parseInt(l)>e.orden.length||parseInt(l)!==r)C(null,"Invalid Id"),n=!0,delete e.orden[r];else if(s.cuantity>100)C(s.part_id,"has more than ".concat(100," products")),n=!0,delete e.orden[r];else if(b.includes(s.meat))if(["taco","quesadilla"].includes(s.type))if("open"===s.status){for(var u=0;u<s.ingredients.length;u++){var d=s.ingredients[u];O.includes(d)||(C(s.part_id,'"'.concat(d,'" is not a valid ingredient')),n=!0,delete e.orden[r])}e.orden[r].delay_counter=0,e.orden[r].finished_products=0,e.response=[]}else C(s.part_id,'"'.concat(s.status,'" is not a valid initial status')),n=!0,delete e.orden[r];else C(s.part_id,'"'.concat(s.type,'" is not a valid type of product')),n=!0,delete e.orden[r];else C(s.part_id,'"'.concat(s.meat,'" is not a valid type of meat')),n=!0,delete e.orden[r];else C(null,"Invalid Id"),n=!0,delete e.orden[r]}if(n){var g=e.orden;e.orden=[];for(var p=0;p<g.length;p++){var m=g[p];m&&e.orden.push(m)}}return e}catch(h){return t}},I=function(){var e=Object(u.a)(l.a.mark((function e(t){var a,n,r,s,o,u;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(c.getUnoccupiedTaqueros().includes(t)){e.next=2;break}return e.abrupt("return");case 2:a=x.done.getAllOrders(),n=Object.keys(a),r=0;case 5:if(!(r<n.length)){e.next=25;break}if(s=n[r],!["done","rejected",t].includes(s)){e.next=9;break}return e.abrupt("continue",22);case 9:o=0;case 10:if(!(o<a[s].length)){e.next=22;break}if(u=a[s][o],!D(Q(t),u)){e.next=19;break}if(x.done.getAllOrders()[s].includes(u)){e.next=15;break}return e.abrupt("continue",19);case 15:x[t].setOrders([u].concat(Object(i.a)(x.done.getAllOrders()[t]))),a[s].splice(o,1),x[s].setOrders(a[s]),R("".concat(t," was unoccupied, so I gave him something to do."));case 19:o++,e.next=10;break;case 22:r++,e.next=5;break;case 25:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),R=function(e){a.log("Sistema de asignaci\xf3n:",e)},T=function(e){for(var t=0;t<e.orden.length;t++){if("done"!==e.orden[t].status)return!1}return!0},J=function(){var e=Object(u.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e){m.receiveMessage({QueueUrl:h},(function(t,a){e(a.Messages)}))})));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),A=function(e,t){R("Order ".concat(e.request_id?e.request_id:"with unknown id"," rejected due to: ").concat(t)),e.status="rejected",x.rejected.pushOrder(e)},C=function(e,t){R("Part ".concat(e||"with unknown id"," rejected due to: ").concat(t))},_=function(){var e=Object(u.a)(l.a.mark((function e(){var t,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:U(),W();case 2:return e.next=5,J();case 5:if(!((t=e.sent).length>0)){e.next=18;break}return e.next=9,w(t[0].ReceiptHandle);case 9:if(!(a=M(JSON.parse(t[0].Body))).invalid){e.next=12;break}return e.abrupt("continue",2);case 12:if(0!==a.orden.length){e.next=15;break}return q(Object(d.a)({},a)),e.abrupt("continue",2);case 15:N(a),e.next=21;break;case 18:return R("There are no more orders"),localStorage.setItem("gotAllOrders",JSON.stringify(!0)),e.abrupt("break",23);case 21:e.next=2;break;case 23:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),D=function(e,t){if("open"===t.status)for(var a=0;a<t.orden.length;a++){var n=t.orden[a];if("open"===n.status&&(("quesadilla"!==n.type||0!==e.getQuesadillasInStock())&&!e.isResting()&&e.canWorkOn.includes(n.meat)))return!0}},Q=function(t){for(var a=0;a<e.length;a++){var n=e[a];if(n.name===t)return n}},U=function(){var e=Object(u.a)(l.a.mark((function e(){var t,a,n,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(JSON.parse(localStorage.getItem("RUDAIsWorking"))){e.next=3;break}return e.abrupt("break",11);case 3:for(t=JSON.parse(localStorage.getItem("ordersToReAllocate")),a=[],n=0;n<t.length;n++)r=t[n],N(r)||a.push(r);return localStorage.setItem("ordersToReAllocate",JSON.stringify(a)),e.next=9,s(100);case 9:e.next=0;break;case 11:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),W=function(){var e=Object(u.a)(l.a.mark((function e(){var t,a,n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=3,s(1e3);case 3:if(JSON.parse(localStorage.getItem("RUDAIsWorking"))){e.next=5;break}return e.abrupt("break",18);case 5:if(JSON.parse(localStorage.getItem("gotAllOrders"))){e.next=7;break}return e.abrupt("continue",0);case 7:t=c.getUnoccupiedTaqueros(),a=0;case 9:if(!(a<t.length)){e.next=16;break}return n=t[a],e.next=13,I(n);case 13:a++,e.next=9;break;case 16:e.next=0;break;case 18:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return{start:_,insertTaquero:y,allocateOrder:N}}),v=function(e,t,a){var n=["guacamole","salsa","cilantro","cebolla"],r=function(e,t,n){a.log("Chalan ".concat(e,":"),"Filled ".concat(t,"'s' ").concat(n))},s=function(){var e=Object(u.a)(l.a.mark((function e(t){var a,n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=0;case 1:if(!(a<t.servesTaqueros.length)){e.next=9;break}return n=i(t.servesTaqueros[a]),e.next=5,n.fillFilling("tortillas");case 5:r(t.name,n.name,"tortillas");case 6:a++,e.next=1;break;case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),c=function(){var e=Object(u.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(JSON.parse(localStorage.getItem("RUDAIsWorking"))){e.next=3;break}return e.abrupt("break",7);case 3:return e.next=5,o(t);case 5:e.next=0;break;case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),i=function(e){for(var a=0;a<t.length;a++){var n=t[a];if(n.name===e)return n}},o=function(){var e=Object(u.a)(l.a.mark((function e(t){var a,c,o,u,d,f;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=0,o=0;case 2:if(!(o<t.servesTaqueros.length)){e.next=27;break}if(JSON.parse(localStorage.getItem("RUDAIsWorking"))){e.next=5;break}return e.abrupt("break",27);case 5:u=i(t.servesTaqueros[o]),d=0;case 7:if(!(d<n.length)){e.next=24;break}if(JSON.parse(localStorage.getItem("RUDAIsWorking"))){e.next=10;break}return e.abrupt("break",24);case 10:return f=n[d],c=Date.now(),e.next=14,u.fillFilling(f);case 14:if(!e.sent){e.next=16;break}r(t.name,u.name,f);case 16:if(!((a+=Date.now()-c)>25e3||u.getTortillas()<15)){e.next=21;break}return e.next=20,s(t);case 20:a=0;case 21:d++,e.next=7;break;case 24:o++,e.next=2;break;case 27:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return{start:function(){(function(){for(var t={},a=0;a<e.length;a++){var n=e[a];void 0===t[n.chalan]?t[n.chalan]=[n.name]:t[n.chalan].push(n.name)}return t=Object.keys(t).map((function(e){return{name:e,servesTaqueros:t[e]}}))})().forEach((function(e){return c(e)}))}}},k=a(1),N=function(e){var t=e.data,a=null!=t&&t.length>=1?Object.keys(t[0]):null;return a?Object(k.jsxs)("div",{className:"table",children:[Object(k.jsx)("div",{className:"tableRow",children:a.map((function(e){return Object(k.jsx)("div",{className:"cell cellHeader",children:Object(k.jsx)("p",{className:"cellText cellTextHeader",children:e})},e)}))}),t.map((function(e){return Object(k.jsx)("div",{className:"tableRow",children:a.map((function(a){return Object(k.jsx)("div",{className:"cell cell".concat(t.indexOf(e)%2),children:Object(k.jsx)("p",{className:"cellText",children:e[a]})},"".concat(a,"_").concat(e[a]))}))},"".concat(JSON.stringify(e)))}))]}):Object(k.jsx)("p",{className:"noOrders",children:"(No orders)"})},S=function(){var e=Object(n.useState)(!1),t=Object(f.a)(e,2),a=t[0],r=t[1],s=Object(n.useState)(!0),c=Object(f.a)(s,2),o=c[0],p=c[1],O={tortillas:50,cilantro:200,cebolla:200,salsa:150,guacamole:100},j=Object(n.useState)(0),S=Object(f.a)(j,2),w=S[0],q=S[1],y=Object(n.useState)([]),M=Object(f.a)(y,2),I=M[0],R=M[1],T=b(R),J=[{name:"tripa y cabeza",canWorkOn:["tripa","cabeza"],chalan:"AMLO"},{name:"asada y suadero 1",canWorkOn:["asada","suadero"],chalan:"AMLO"},{name:"asada y suadero 2",canWorkOn:["asada","suadero"],chalan:"Marina"},{name:"adobada",canWorkOn:["adobada"],chalan:"Marina"}],A=function(e){for(var t={},a=0;a<e.length;a++){t[e[a].name]=[]}return t.done=[],t.rejected=[],t}(J),C=Object(n.useState)(A),_=Object(f.a)(C,2),D=_[0],Q=_[1],U={workingOn:null,queueLength:0,fan:{active:!0,untilNeeded:0},rest:{untilNeeded:1e3,timeRested:0,resting:!1,tempResting:!1},tortillas:O.tortillas,quesadillasInStock:0,fillings:{salsa:O.salsa,guacamole:O.guacamole,cilantro:O.cilantro,cebolla:O.cebolla}},W={fan:{active:!0,untilNeeded:0},tortillas:50,quesadillasReady:0},P=function(e){for(var t={},a=0;a<e.length;a++){var n=e[a];t[n.name]=Object(d.a)(Object(d.a)({},U),{},{chalan:n.chalan})}return t.quesadillero=W,t},z=Object(n.useState)(P(J)),F=Object(f.a)(z,2),L=F[0],H=F[1],K=J.map((function(e){return m(e.name,e.canWorkOn,Q,H,T,O)})),B=h(H,K,O.tortillas),E=x(K,J,T,Q,H),G=v(J,K,T),V=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return"".concat(e.charAt(0).toUpperCase()).concat(e.substring(1,e.length))},X=function(){localStorage.setItem("logs",JSON.stringify([])),R([]),te(),ae(),localStorage.setItem("gotAllOrders",JSON.stringify(!1))},Y=function(e){var t=Object(d.a)({},e);t.datetime=$(t.datetime),t.parts=t.orden.length,t.finishedParts=0,t.productQuantity=0;for(var a=0;a<t.orden.length;a++){var n=t.orden[a];"done"===n.status&&t.finishedParts++,t.productQuantity+=n.quantity}return delete t.orden,t.stepsDone=void 0!==t.response?t.response.length:0,delete t.response,t},Z=function(e){for(var t=[],a=0;a<e.length;a++)null!=e[a]&&t.push(Y(e[a]));return t},$=function(e){var t=new Date(e);return"".concat(t.getHours(),":").concat(t.getMinutes(),":").concat(t.getSeconds()," (").concat(t.getMilliseconds(),"ms)")},ee=function(){for(var e=0;e<K.length;e++)if(K[e].getQueueSize()>0)return!1;return!(JSON.parse(localStorage.getItem("ordersToReAllocate")).length>0)&&!!JSON.parse(localStorage.getItem("gotAllOrders"))},te=function(){H(P(J)),localStorage.setItem("metadata",JSON.stringify(P(J)))},ae=function(){g(Q,null,A).restartRUDA()},ne=function(){var e=Object(u.a)(l.a.mark((function e(){var t,n,s;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!a){e.next=2;break}return e.abrupt("return");case 2:for(r(!0),X(),localStorage.setItem("RUDAIsWorking",JSON.stringify(!0)),G.start(),E.start(),t=0;t<K.length;t++)K[t].startWorking();B.start(),n=0;case 10:return s=Date.now(),e.next=14,re(100);case 14:if(!ee()){e.next=17;break}return localStorage.setItem("RUDAIsWorking",JSON.stringify(!1)),e.abrupt("break",21);case 17:n+=Date.now()-s,q((n/1e3).toFixed(1)),e.next=10;break;case 21:r(!1),T.log("RUDA is done\ud83d\ude0e"),console.log(g().getAllOrders().done);case 24:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),re=function(e){return new Promise((function(t){return setTimeout(t,e)}))};return Object(n.useEffect)((function(){o&&(p(!1),localStorage.setItem("orders",JSON.stringify(A)),localStorage.setItem("logs",JSON.stringify([])),localStorage.setItem("metadata",JSON.stringify(P(J))),localStorage.setItem("ordersToReAllocate",JSON.stringify([])),localStorage.setItem("gotAllOrders",JSON.stringify(!1)))})),Object(k.jsxs)("div",{className:"App",children:[Object(k.jsxs)("div",{className:"header",children:[Object(k.jsx)("img",{src:"https://raw.githubusercontent.com/ulisesaviles/os-tacoshop-ruda/main/RUDA.png",className:"logo",alt:"logo"}),a?Object(k.jsx)("div",{className:"running",children:"Running RUDA..."}):Object(k.jsx)("button",{onClick:ne,className:"startBtn",children:"Start RUDA"}),Object(k.jsxs)("p",{className:"chrono",children:["(",w,"s)"]})]}),Object(k.jsxs)("div",{className:"contentContainer",children:[Object(k.jsxs)("div",{className:"contentLeftContainer",children:[Object(k.jsxs)("div",{className:"taquerosContainer",children:[J.map((function(e){var t=J.indexOf(e);return Object(k.jsxs)("div",{className:"taqueroContainer",children:[Object(k.jsxs)("h4",{className:"taqueroName",children:["Taquero de ",e.name]}),Object(k.jsxs)("div",{className:"taqueroMetadataContainer",children:[Object(k.jsx)("h3",{className:"metadata",children:"Metadata"}),Object(k.jsxs)("div",{className:"taqueroMetadataRowContainer",children:[Object(k.jsx)("h6",{className:"taqueroMetadataRowTitle",children:"Orders in list:"}),Object(k.jsx)("p",{className:"actualMetadata",children:L[e.name].queueLength})]}),Object(k.jsxs)("div",{className:"taqueroMetadataRowContainer",children:[Object(k.jsx)("h6",{className:"taqueroMetadataRowTitle",children:"Working on:"}),Object(k.jsx)("p",{className:"actualMetadata",children:null===L[e.name].workingOn?"null":L[e.name].workingOn})]}),Object(k.jsxs)("div",{className:"taqueroMetadataRowContainer",children:[Object(k.jsx)("h6",{className:"taqueroMetadataRowTitle",children:"Fan active:"}),Object(k.jsx)("p",{className:"actualMetadata",children:JSON.stringify(L[e.name].fan.active)})]}),Object(k.jsxs)("div",{className:"taqueroMetadataRowContainer",children:[Object(k.jsx)("h6",{className:"taqueroMetadataRowTitle",children:"Chal\xe1n:"}),Object(k.jsx)("p",{className:"actualMetadata",children:L[e.name].chalan})]}),Object(k.jsxs)("div",{className:"taqueroMetadataRowContainer",children:[Object(k.jsx)("h6",{className:"taqueroMetadataRowTitle",children:"Resting:"}),Object(k.jsx)("p",{className:"actualMetadata",children:JSON.stringify(L[e.name].rest.resting||L[e.name].rest.tempResting)})]}),Object(k.jsxs)("div",{className:"taqueroMetadataRowContainer",children:[Object(k.jsx)("h6",{className:"taqueroMetadataRowTitle",children:"Time rested:"}),Object(k.jsx)("p",{className:"actualMetadata",children:L[e.name].rest.timeRested})]}),Object(k.jsxs)("div",{className:"taqueroMetadataRowContainer",children:[Object(k.jsx)("h6",{className:"taqueroMetadataRowTitle",children:"Tacos untill rest:"}),Object(k.jsx)("p",{className:"actualMetadata",children:L[e.name].rest.untilNeeded})]}),Object(k.jsxs)("div",{className:"taqueroMetadataRowContainer",children:[Object(k.jsx)("h6",{className:"taqueroMetadataRowTitle",children:"Quesadillas in stock:"}),Object(k.jsx)("p",{className:"actualMetadata",children:L[e.name].quesadillasInStock})]}),Object(k.jsxs)("div",{className:"taqueroMetadataRowContainer",children:[Object(k.jsx)("h6",{className:"taqueroMetadataRowTitle",children:"Tortillas"}),Object(k.jsx)("p",{className:"actualMetadata",children:L[e.name].tortillas})]}),Object(k.jsxs)("div",{className:"taqueroMetadataRowContainer",children:[Object(k.jsx)("h6",{className:"taqueroMetadataRowTitle",children:"Cilantro:"}),Object(k.jsx)("p",{className:"actualMetadata",children:L[e.name].fillings.cilantro})]}),Object(k.jsxs)("div",{className:"taqueroMetadataRowContainer",children:[Object(k.jsx)("h6",{className:"taqueroMetadataRowTitle",children:"Cebolla:"}),Object(k.jsx)("p",{className:"actualMetadata",children:L[e.name].fillings.cebolla})]}),Object(k.jsxs)("div",{className:"taqueroMetadataRowContainer",children:[Object(k.jsx)("h6",{className:"taqueroMetadataRowTitle",children:"Salsa:"}),Object(k.jsx)("p",{className:"actualMetadata",children:L[e.name].fillings.salsa})]}),Object(k.jsxs)("div",{className:"taqueroMetadataRowContainer",children:[Object(k.jsx)("h6",{className:"taqueroMetadataRowTitle",children:"Guacamole:"}),Object(k.jsx)("p",{className:"actualMetadata",children:L[e.name].fillings.guacamole})]})]})]},t)})),Object(k.jsxs)("div",{className:"taqueroContainer",children:[Object(k.jsx)("h4",{className:"taqueroName",children:"Quesadillero"}),Object(k.jsxs)("div",{className:"taqueroMetadataContainer",children:[Object(k.jsx)("h3",{className:"metadata",children:"Metadata"}),Object(k.jsxs)("div",{className:"taqueroMetadataRowContainer",children:[Object(k.jsx)("h6",{className:"taqueroMetadataRowTitle",children:"Ready quesadillas:"}),Object(k.jsx)("p",{className:"actualMetadata",children:L.quesadillero.quesadillasReady})]}),Object(k.jsxs)("div",{className:"taqueroMetadataRowContainer",children:[Object(k.jsx)("h6",{className:"taqueroMetadataRowTitle",children:"Fan active:"}),Object(k.jsx)("p",{className:"actualMetadata",children:JSON.stringify(L.quesadillero.fan.active)})]}),Object(k.jsxs)("div",{className:"taqueroMetadataRowContainer",children:[Object(k.jsx)("h6",{className:"taqueroMetadataRowTitle",children:"Tortillas"}),Object(k.jsx)("p",{className:"actualMetadata",children:L.quesadillero.tortillas})]})]})]})]}),Object(k.jsx)("h2",{className:"orders",children:"Orders"}),Object(k.jsx)("div",{className:"ordersContainer",children:Object.keys(D).map((function(e){return Object(k.jsxs)("div",{className:"tableSuperContainer",children:[Object(k.jsx)("p",{className:"tableName",children:V(e)}),Object(k.jsx)(N,{data:Z(Object(i.a)(D[e]))})]},e)}))})]}),Object(k.jsxs)("div",{className:"logsContainer",children:[Object(k.jsx)("h2",{className:"logsTitle",children:"Logs:"}),Object(k.jsx)("p",{className:"logsSubtitle",children:"(De m\xe1s nuevo a m\xe1s viejo)"}),Object(k.jsx)("div",{className:"logsContentContainer",children:I.map((function(e){var t=I.indexOf(e);return Object(k.jsxs)("div",{className:"logContainer",children:[Object(k.jsxs)("div",{className:"logHeaderContainer",children:[Object(k.jsx)("h5",{className:"logTitle",children:e.title}),Object(k.jsx)("p",{className:"logTime",children:$(e.time)})]}),e.message]},t)}))})]})]})]})};c.a.render(Object(k.jsx)(r.a.StrictMode,{children:Object(k.jsx)(S,{})}),document.getElementById("root"))}},[[472,1,2]]]);
//# sourceMappingURL=main.ebcd0470.chunk.js.map