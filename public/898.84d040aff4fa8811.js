"use strict";(self.webpackChunkTP_Clinica=self.webpackChunkTP_Clinica||[]).push([[898],{4784:(v,f,l)=>{l.d(f,{j:()=>h});var d=l(4650);let h=(()=>{class p{transform(_){let m=Math.floor(_/1e4).toString(),e=_%1e4,S=Math.floor(e/100).toString();return(e%100).toString()+"/"+S+"/"+m}}return p.\u0275fac=function(_){return new(_||p)},p.\u0275pipe=d.Yjl({name:"fecha",type:p,pure:!0}),p})()},9241:(v,f,l)=>{l.d(f,{J:()=>p});var d=l(6895),h=l(4650);let p=(()=>{class c{}return c.\u0275fac=function(m){return new(m||c)},c.\u0275mod=h.oAB({type:c}),c.\u0275inj=h.cJS({imports:[d.ez]}),c})()},898:(v,f,l)=>{l.r(f),l.d(f,{MSolicTurnosModule:()=>U});var d=l(6895),h=l(9051),p=l(5861),c=l(727),_=l(3998),m=l.n(_),e=l(4650),S=l(3264),b=l(4784);function x(i,a){1&i&&e._UZ(0,"img",2)}function C(i,a){if(1&i){const t=e.EpF();e.TgZ(0,"button",9),e.NdJ("click",function(s){const r=e.CHM(t).$implicit,u=e.oxw(4);return e.KtG(u.selPaciente(s,r))}),e._uU(1),e.qZA()}if(2&i){const t=a.$implicit;e.xp6(1),e.AsE("",t.nombre," ",t.apellido,"")}}function E(i,a){if(1&i&&(e.TgZ(0,"div"),e.YNc(1,C,2,2,"button",8),e.qZA()),2&i){const t=e.oxw(3);e.xp6(1),e.Q6J("ngForOf",t.listaPacientes)}}function M(i,a){1&i&&(e.TgZ(0,"p"),e._uU(1,"No hay ningun paciente para listar"),e.qZA())}function P(i,a){if(1&i&&(e.TgZ(0,"div")(1,"h3"),e._uU(2,"Lista de Pacientes"),e.qZA(),e.YNc(3,E,2,1,"div",6),e.YNc(4,M,2,0,"ng-template",null,7,e.W1O),e.qZA()),2&i){const t=e.MAs(5),o=e.oxw(2);e.xp6(3),e.Q6J("ngIf",0!=o.listaPacientes.length)("ngIfElse",t)}}const T=function(i){return{"background-image":i}};function F(i,a){if(1&i){const t=e.EpF();e.TgZ(0,"button",13),e.NdJ("click",function(s){e.CHM(t);const n=e.oxw().$implicit,r=e.oxw(3);return e.KtG(r.seleccionEsp(s,n.nombre))}),e.qZA()}if(2&i){const t=e.oxw().$implicit;e.Q6J("ngStyle",e.VKq(1,T,"url("+t.foto+")"))}}function O(i,a){if(1&i){const t=e.EpF();e.TgZ(0,"button",14),e.NdJ("click",function(s){e.CHM(t);const n=e.oxw().$implicit,r=e.oxw(3);return e.KtG(r.seleccionEsp(s,n.nombre))}),e._uU(1),e.qZA()}if(2&i){const t=e.oxw().$implicit;e.Q6J("ngStyle",e.VKq(2,T,"url("+t.foto+")")),e.xp6(1),e.Oqu(t.nombre)}}function Z(i,a){if(1&i&&(e.ynx(0),e.YNc(1,F,1,3,"button",11),e.YNc(2,O,2,4,"ng-template",null,12,e.W1O),e.BQk()),2&i){const t=a.$implicit,o=e.MAs(3);e.xp6(1),e.Q6J("ngIf","https://firebasestorage.googleapis.com/v0/b/clinicaonline-torrez.appspot.com/o/fotos%2Fdotora.jpg?alt=media&token=6c1541ed-6907-4523-bd57-7f7c8702b64e"!=t.foto)("ngIfElse",o)}}function y(i,a){if(1&i&&(e.TgZ(0,"div"),e.YNc(1,Z,4,2,"ng-container",10),e.qZA()),2&i){const t=e.oxw(2);e.xp6(1),e.Q6J("ngForOf",t.especialidades)}}function A(i,a){if(1&i){const t=e.EpF();e.TgZ(0,"button",13),e.NdJ("click",function(s){const r=e.CHM(t).$implicit,u=e.oxw(3);return e.KtG(u.seleccionEsp2(s,r.mail))}),e._uU(1),e.qZA()}if(2&i){const t=a.$implicit;e.Q6J("ngStyle",e.VKq(2,T,"url("+t.foto+")")),e.xp6(1),e.Oqu(t.nombre)}}function J(i,a){if(1&i&&(e.TgZ(0,"div"),e.YNc(1,A,2,4,"button",15),e.qZA()),2&i){const t=e.oxw(2);e.xp6(1),e.Q6J("ngForOf",t.listaEspSelec)}}function k(i,a){if(1&i){const t=e.EpF();e.TgZ(0,"button",9),e.NdJ("click",function(s){const r=e.CHM(t).$implicit,u=e.oxw(3);return e.KtG(u.selTurno(s,r))}),e._uU(1),e.ALo(2,"fecha"),e.qZA()}if(2&i){const t=a.$implicit;e.xp6(1),e.AsE("",e.lcZ(2,2,t.nro)," ",t.horario,"")}}function w(i,a){if(1&i&&(e.TgZ(0,"div"),e.YNc(1,k,3,4,"button",8),e.qZA()),2&i){const t=e.oxw(2);e.xp6(1),e.Q6J("ngForOf",t.listaTurnos)}}function B(i,a){if(1&i){const t=e.EpF();e.TgZ(0,"button",9),e.NdJ("click",function(){e.CHM(t);const s=e.oxw(2);return e.KtG(s.guardarTurno())}),e._uU(1,"Guardar"),e.qZA()}}function I(i,a){if(1&i&&(e.TgZ(0,"div",3),e.YNc(1,P,6,2,"div",4),e.YNc(2,y,2,1,"div",4),e.YNc(3,J,2,1,"div",4),e.YNc(4,w,2,1,"div",4),e.YNc(5,B,2,0,"button",5),e.qZA()),2&i){const t=e.oxw();e.xp6(1),e.Q6J("ngIf","administrador"==(null==t.usuario?null:t.usuario.perfil)),e.xp6(1),e.Q6J("ngIf","paciente"==(null==t.usuario?null:t.usuario.perfil)||1==t.mostrarAdmin),e.xp6(1),e.Q6J("ngIf",0!=t.listaEspSelec.length),e.xp6(1),e.Q6J("ngIf",0!=t.listaTurnos.length),e.xp6(1),e.Q6J("ngIf",""!=t.horarioSel)}}const N=[{path:"",component:(()=>{class i{constructor(t){this.servBase=t,this.usuario=null,this.usuSel=null,this.susUsu=c.w0.EMPTY,this.susEsp=c.w0.EMPTY,this.especialidades=[],this.listaEspecialistas=[],this.listaEspSelec=[],this.listaDias=[],this.listaTurnos=[],this.especSeleccionada="",this.fechas=[],this.especialistaSel={},this.diaSel="",this.fechaSel="",this.horarioSel="",this.spinner=!1,this.listaPacientes=[],this.mostrarAdmin=!1,this.tomados=[];let o=new Date;for(let s=0;s<15;s++){let n="";switch(o.getDay()){case 0:n="Domingo";break;case 1:n="Lunes";break;case 2:n="Martes";break;case 3:n="Miercoles";break;case 4:n="Jueves";break;case 5:n="Viernes";break;case 6:n="Sabado"}let r=1e4*o.getFullYear()+100*(o.getMonth()+1)+o.getDate();this.fechas.push({dia:n,nro:r}),o.setDate(o.getDate()+1)}}ngOnInit(){this.susUsu=this.servBase.getUser().subscribe(o=>{this.servBase.traerFiltrado("Usuarios","mail",o?.email).then(s=>{this.usuario=s[0],"paciente"==s[0].perfil?this.usuSel={nombre:s[0].nombre,apellido:s[0].apellido,mail:s[0].mail}:this.servBase.traerFiltrado("Usuarios","perfil","paciente").then(n=>{this.listaPacientes=n})})}),this.susEsp=this.servBase.traer("Especialidades").subscribe(o=>{this.especialidades=o}),this.servBase.traerFiltrado("Usuarios","perfil","especialista").then(o=>{this.listaEspecialistas=o});let t=this.servBase.traer("Turnos").subscribe(o=>{o.forEach(s=>{("pendiente"==s.estado||"aceptado"==s.estado)&&this.tomados.push(s)}),t.unsubscribe()})}ngOnDestroy(){this.susUsu.unsubscribe(),this.susEsp.unsubscribe()}seleccionEsp(t,o){this.horarioSel="",this.diaSel="",this.fechaSel="",this.listaDias=[],this.listaTurnos=[],this.especialistaSel={},this.listaEspSelec=[],this.especSeleccionada=o,this.borrarColor("rojo"),this.seleccionBoton(t,"verde"),this.listaEspecialistas.forEach(s=>{for(let n=0;n<s.especialidad.length;n++)if(o==s.especialidad[n]){this.listaEspSelec.push(s);break}})}seleccionEsp2(t,o){this.horarioSel="",this.diaSel="",this.fechaSel="",this.listaDias=[],this.listaTurnos=[],this.seleccionBoton(t,"rojo"),this.servBase.traerFiltrado("Horarios","mail",o).then(s=>{s.forEach(n=>{n.especialidad==this.especSeleccionada&&(this.especialistaSel={especialidad:this.especSeleccionada,nombre:n.nombre,apellido:n.apellido,mail:n.mail},n.horarios.forEach(r=>{this.fechas.forEach(u=>{r.dia==u.dia&&this.selDia(r,u.nro)})}))})})}selDia(t,o){"Sabado"!=t.dia?"08:00 - 13:00"==t.horario?this.calcularTurnos(t.dia,o,8,13):this.calcularTurnos(t.dia,o,13,19):"08:00 - 11:00"==t.horario?this.calcularTurnos(t.dia,o,8,11):this.calcularTurnos(t.dia,o,11,14)}calcularTurnos(t,o,s,n){for(let r=s;r<n;r++){let u=!1;this.tomados.forEach(g=>{g.info.fecha==o&&g.info.horario==`${r}:00`&&g.especialista.mail==this.especialistaSel.mail&&g.especialista.especialidad==this.especialistaSel.especialidad&&(u=!0)}),u||this.listaTurnos.push({nro:o,horario:`${r}:00`,dia:t})}}selTurno(t,o){this.horarioSel=o.horario,this.diaSel=o.dia,this.fechaSel=o.nro,this.seleccionBoton(t,"celeste")}guardarTurno(){var t=this;return(0,p.Z)(function*(){t.spinner=!0;let n={info:{dia:t.diaSel,fecha:t.fechaSel,horario:t.horarioSel},especialista:t.especialistaSel,paciente:t.usuSel,estado:"pendiente",resenia:{diagnostico:"",var1:{prob:"",cant:""},var2:{prob:"",cant:""},var3:{prob:"",cant:""},altura:"",peso:"",temperatura:"",presion:""},marcaEncuesta:"",calificacion:""};try{yield t.servBase.guardarObjeto(n,"Turnos")}catch(r){m().fire(`Error: ${r}`,"Haga click para continuar","error")}finally{t.tomados.push(n),t.horarioSel="",t.diaSel="",t.fechaSel="",t.especSeleccionada="",t.listaDias=[],t.listaTurnos=[],t.listaEspSelec=[],t.especialistaSel={},"administrador"==t.usuario.perfil&&(t.usuSel={}),t.mostrarAdmin=!1,t.spinner=!1}m().fire("El turno ha sido registrado correctamente!","Haga click para continuar","success")})()}seleccionBoton(t,o){this.borrarColor(o),t?.srcElement.classList.add(o)}borrarColor(t){let o=document.getElementsByClassName(t),s=o.length;for(let n=0;n<s;n++)o[0].classList.remove(t)}selPaciente(t,o){this.horarioSel="",this.diaSel="",this.fechaSel="",this.especSeleccionada="",this.listaDias=[],this.listaTurnos=[],this.listaEspSelec=[],this.especialistaSel={},this.usuSel={nombre:o.nombre,apellido:o.apellido,mail:o.mail},this.mostrarAdmin=!0,this.borrarColor("verde"),this.seleccionBoton(t,"amarillo")}}return i.\u0275fac=function(t){return new(t||i)(e.Y36(S.g))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-solic-turnos"]],decls:2,vars:2,consts:[["class","mt-5 pt-5 h-25 w-25","src","./assets/spinner.gif","alt","spinner",4,"ngIf"],["class","contenedor",4,"ngIf"],["src","./assets/spinner.gif","alt","spinner",1,"mt-5","pt-5","h-25","w-25"],[1,"contenedor"],[4,"ngIf"],[3,"click",4,"ngIf"],[4,"ngIf","ngIfElse"],["sinPacientes",""],[3,"click",4,"ngFor","ngForOf"],[3,"click"],[4,"ngFor","ngForOf"],["class","foto",3,"ngStyle","click",4,"ngIf","ngIfElse"],["default",""],[1,"foto",3,"ngStyle","click"],[1,"foto","foto2",3,"ngStyle","click"],["class","foto",3,"ngStyle","click",4,"ngFor","ngForOf"]],template:function(t,o){1&t&&(e.YNc(0,x,1,0,"img",0),e.YNc(1,I,6,5,"div",1)),2&t&&(e.Q6J("ngIf",1==o.spinner),e.xp6(1),e.Q6J("ngIf",0==o.spinner))},dependencies:[d.sg,d.O5,d.PC,b.j],styles:["button[_ngcontent-%COMP%]{margin-right:.5em}.imagen[_ngcontent-%COMP%]{width:5em;height:5em}.verde[_ngcontent-%COMP%]{border:3px solid green}.rojo[_ngcontent-%COMP%]{border:3px solid red}.violeta[_ngcontent-%COMP%]{border:3px solid violet}.celeste[_ngcontent-%COMP%]{border:3px solid aqua}.amarillo[_ngcontent-%COMP%]{border:3px solid yellow}.foto[_ngcontent-%COMP%]{height:6em;width:6em;background-size:cover;text-shadow:white -.05em -.05em;color:red;font-weight:600}.foto2[_ngcontent-%COMP%]{position:relative;top:-2.43em}"]}),i})()}];let D=(()=>{class i{}return i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[h.Bz.forChild(N),h.Bz]}),i})();var Y=l(9241);let U=(()=>{class i{}return i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[d.ez,D,Y.J]}),i})()}}]);