"use strict";(self.webpackChunkTP_Clinica=self.webpackChunkTP_Clinica||[]).push([[592],{7059:(T,a,e)=>{e.d(a,{T:()=>i});var l=e(9648);class i extends l.I{constructor(p,c,u,s,g,h,d,f,C,E,P){super(p,c,u,s,g,h,d,f,C),this.obraSocial=E,this.foto2=P}}},9648:(T,a,e)=>{e.d(a,{I:()=>l});class l{constructor(r,p,c,u,s,g,h,d,f){this.id=r,this.nombre=p,this.apellido=c,this.edad=u,this.dni=s,this.mail=g,this.clave=h,this.foto=d,this.perfil=f,this.activo=!1}}},3945:(T,a,e)=>{e.d(a,{q:()=>U});var l=e(5861),i=e(4650),r=e(6166),p=e(4159),c=e.n(p),u=e(3264),s=e(6895),g=e(4784);function h(t,_){if(1&t&&(i.TgZ(0,"p"),i._uU(1),i.qZA()),2&t){const n=i.oxw().$implicit;i.xp6(1),i.AsE("",n.var1.prob,": ",n.var1.cant,"")}}function d(t,_){if(1&t&&(i.TgZ(0,"p"),i._uU(1),i.qZA()),2&t){const n=i.oxw().$implicit;i.xp6(1),i.AsE("",n.var2.prob,": ",n.var2.cant,"")}}function f(t,_){if(1&t&&(i.TgZ(0,"p"),i._uU(1),i.qZA()),2&t){const n=i.oxw().$implicit;i.xp6(1),i.AsE("",n.var3.prob,": ",n.var3.cant,"")}}function C(t,_){if(1&t&&(i.ynx(0),i.TgZ(1,"p"),i._uU(2),i.qZA(),i.TgZ(3,"p"),i._uU(4),i.ALo(5,"fecha"),i.qZA(),i.TgZ(6,"p"),i._uU(7),i.qZA(),i.YNc(8,h,2,2,"p",10),i.YNc(9,d,2,2,"p",10),i.YNc(10,f,2,2,"p",10),i.TgZ(11,"p"),i._uU(12),i.qZA(),i._UZ(13,"br"),i.BQk()),2&t){const n=_.$implicit,o=_.index;i.xp6(2),i.hij("Rese\xf1a ",o+1,":"),i.xp6(2),i.hij("Fecha: ",i.lcZ(5,9,n.fecha),""),i.xp6(3),i.lnq("Especialista: ",n.especialista.nombre," ",n.especialista.apellido," - ",n.especialista.especialidad,""),i.xp6(1),i.Q6J("ngIf",""!=n.var1.prob),i.xp6(1),i.Q6J("ngIf",""!=n.var2.prob),i.xp6(1),i.Q6J("ngIf",""!=n.var3.prob),i.xp6(2),i.hij("Diagnostico: ",n.diagnostico,"")}}function E(t,_){if(1&t){const n=i.EpF();i.TgZ(0,"button",2),i.NdJ("click",function(){i.CHM(n);const m=i.oxw(2);return i.KtG(m.generarPDF())}),i._uU(1,"Generar PDF"),i.qZA()}}function P(t,_){if(1&t&&(i.ynx(0),i.TgZ(1,"div",3)(2,"div",4),i._UZ(3,"img",5),i.TgZ(4,"small",6),i._uU(5),i.qZA()(),i.TgZ(6,"div",7)(7,"h2"),i._uU(8,"Historial clinico "),i.qZA(),i.TgZ(9,"h6"),i._uU(10," Clinica - Torrez "),i.qZA()(),i._UZ(11,"br"),i.TgZ(12,"p"),i._uU(13),i.qZA(),i.TgZ(14,"p"),i._uU(15),i.qZA(),i.TgZ(16,"p"),i._uU(17),i.qZA(),i.TgZ(18,"p"),i._uU(19),i.qZA(),i.TgZ(20,"p"),i._uU(21),i.qZA(),i._UZ(22,"br"),i.YNc(23,C,14,11,"ng-container",8),i.qZA(),i.YNc(24,E,2,0,"button",9),i.BQk()),2&t){const n=i.oxw();i.xp6(5),i.hij(" ",n.fecha," "),i.xp6(8),i.AsE("Paciente: ",n.histClinico.paciente.nombre," ",n.histClinico.paciente.apellido,""),i.xp6(2),i.hij("Altura: ",n.histClinico.altura,""),i.xp6(2),i.hij("Peso: ",n.histClinico.peso,""),i.xp6(2),i.hij("Presion: ",n.histClinico.presion,""),i.xp6(2),i.hij("Temperatura: ",n.histClinico.temperatura,""),i.xp6(2),i.Q6J("ngForOf",n.histClinico.resenias),i.xp6(1),i.Q6J("ngIf",n.mailU==n.mailP)}}function Z(t,_){1&t&&(i.TgZ(0,"h4"),i._uU(1,"Este paciente aun no tiene historial clinico"),i.qZA())}let U=(()=>{class t{constructor(n){this.servBase=n,this.mailP="",this.salirH=new i.vpe,this.histClinico=null,this.mailU="",this.fecha=(new Date).toLocaleDateString()}ngOnInit(){let n=this.servBase.getUser().subscribe(o=>{this.mailU=o?.email,n.unsubscribe()});this.servBase.traerFiltrado("HistClinico","paciente.mail",this.mailP).then(o=>{0!=o.length&&(this.histClinico=o[0])}).catch(o=>{console.log(o)})}salir(){this.salirH.emit()}generarPDF(){return(0,l.Z)(function*(){let n=document.getElementById("imprimir"),o=new r.kH("p","pt");yield c()(n).then(m=>{o.addImage(m.toDataURL(),"PNG",150,5,300,600)}),o.save("Historial.pdf")})()}}return t.\u0275fac=function(n){return new(n||t)(i.Y36(u.g))},t.\u0275cmp=i.Xpm({type:t,selectors:[["app-histclinico"]],inputs:{mailP:"mailP"},outputs:{salirH:"salirH"},decls:5,vars:2,consts:[[4,"ngIf","ngIfElse"],["vacio",""],[3,"click"],["id","imprimir"],[1,"titulo1"],["src","./favicon.ico","alt","Logo",1,"logo"],[1,"fecha"],[1,"titulo2"],[4,"ngFor","ngForOf"],[3,"click",4,"ngIf"],[4,"ngIf"]],template:function(n,o){if(1&n&&(i.YNc(0,P,25,9,"ng-container",0),i.YNc(1,Z,2,0,"ng-template",null,1,i.W1O),i.TgZ(3,"button",2),i.NdJ("click",function(){return o.salir()}),i._uU(4,"Salir"),i.qZA()),2&n){const m=i.MAs(2);i.Q6J("ngIf",null!=o.histClinico)("ngIfElse",m)}},dependencies:[s.sg,s.O5,g.j],styles:[".titulo1[_ngcontent-%COMP%]{display:flex;width:100%;justify-content:space-between;align-items:center}.logo[_ngcontent-%COMP%]{width:60px;height:60px}.titulo2[_ngcontent-%COMP%]{display:flex;flex-direction:column;width:100%;align-items:center}"]}),t})()},2396:(T,a,e)=>{e.d(a,{J:()=>p});var l=e(6895),i=e(9241),r=e(4650);let p=(()=>{class c{}return c.\u0275fac=function(s){return new(s||c)},c.\u0275mod=r.oAB({type:c}),c.\u0275inj=r.cJS({imports:[l.ez,i.J]}),c})()}}]);