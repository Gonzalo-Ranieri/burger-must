import { useState, useEffect, useCallback, useRef } from "react";
import * as API from "./api.js";

/* ─── TOKENS ──────────────────────────────────────────────────────────── */
const C = {
  bordoOscuro:"#3D1A2E",bordoMedio:"#6B2D4E",crema:"#F7F4F0",
  dorado:"#C9A96E",doradoOscuro:"#A07840",blanco:"#FFFFFF",
  grisClaro:"#E8E3DC",grisMedio:"#B8B0A6",texto:"#1A0A12",
};

/* ─── ÍCONOS ──────────────────────────────────────────────────────────── */
const Ico = {
  menu:    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="2" y1="4" x2="14" y2="4"/><line x1="2" y1="8" x2="14" y2="8"/><line x1="2" y1="12" x2="14" y2="12"/></svg>,
  tienda:  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 2h1.5l1.8 7h7.4l1.3-4.5H5"/><circle cx="7" cy="13.5" r="1"/><circle cx="12" cy="13.5" r="1"/></svg>,
  admin:   <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="5" height="5" rx="1"/><rect x="9" y="2" width="5" height="5" rx="1"/><rect x="2" y="9" width="5" height="5" rx="1"/><rect x="9" y="9" width="5" height="5" rx="1"/></svg>,
  finanzas:<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12 L5 8 L8 10 L11 5 L14 7"/><line x1="14" y1="4" x2="14" y2="7"/><line x1="11" y1="7" x2="14" y2="7"/></svg>,
  cocina:  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2 C5 2 3 4 3 6 C3 8 4 9 4 10 L12 10 C12 9 13 8 13 6 C13 4 11 2 8 2Z"/><line x1="4" y1="12" x2="12" y2="12"/><line x1="6" y1="14" x2="10" y2="14"/></svg>,
  cliente: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="5" r="3"/><path d="M2 14 C2 11 4.5 9 8 9 C11.5 9 14 11 14 14"/></svg>,
  plus:    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><line x1="7" y1="2" x2="7" y2="12"/><line x1="2" y1="7" x2="12" y2="7"/></svg>,
  edit:    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 2 L11 4 L5 10 L2 11 L3 8 Z"/></svg>,
  trash:   <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="2" y1="3.5" x2="11" y2="3.5"/><path d="M4.5 3.5 V2.5 A.5.5 0 0 1 5 2 H8 A.5.5 0 0 1 8.5 2.5 V3.5"/><path d="M3 3.5 L3.5 11 H9.5 L10 3.5"/></svg>,
  save:    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 2 H9 L11 4 V11 H2 Z"/><rect x="4" y="8" width="5" height="3"/><rect x="4" y="2" width="4" height="3"/></svg>,
  close:   <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><line x1="2" y1="2" x2="10" y2="10"/><line x1="10" y1="2" x2="2" y2="10"/></svg>,
  check:   <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="2,7 6,11 12,3"/></svg>,
  logout:  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 H3 A1 1 0 0 0 2 3 V12 A1 1 0 0 0 3 13 H6"/><polyline points="10,5 13,7.5 10,10"/><line x1="6" y1="7.5" x2="13" y2="7.5"/></svg>,
  clock:   <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="6.5" cy="6.5" r="5"/><polyline points="6.5,3.5 6.5,6.5 8.5,8"/></svg>,
  alert:   <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 1 L13 12 H1 Z"/><line x1="7" y1="5" x2="7" y2="8"/><circle cx="7" cy="10" r=".5" fill="currentColor"/></svg>,
  arrow:   <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="3,7 11,7"/><polyline points="7,3 11,7 7,11"/></svg>,
  live:    <svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill="#4CAF50"/></svg>,
  refresh: <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 C10 0.5 7.5 0 5 1 C2 2.5 0.5 5.5 1 9"/><polyline points="0,6 1,9 4,8"/><path d="M2 12 C4 13.5 6.5 14 9 13 C12 11.5 13.5 8.5 13 5"/><polyline points="14,8 13,5 10,6"/></svg>,
};

/* ─── ROLES Y TABS ────────────────────────────────────────────────────── */
const ROLES = {
  cliente:{ label:"Cliente",       ico:"cliente", color:C.bordoMedio,  desc:"Menú y tienda online" },
  admin:  { label:"Administrador", ico:"admin",   color:C.bordoOscuro, desc:"Acceso completo al sistema" },
  cocina: { label:"Cocina",        ico:"cocina",  color:"#7B4F00",     desc:"Pedidos en tiempo real" },
};
const TABS_POR_ROL = {
  cliente:[{id:"menu",label:"Menú",ico:"menu"},{id:"tienda",label:"Tienda",ico:"tienda"}],
  admin:  [{id:"menu",label:"Menú",ico:"menu"},{id:"tienda",label:"Tienda",ico:"tienda"},{id:"admin",label:"Administración",ico:"admin"},{id:"finanzas",label:"Finanzas",ico:"finanzas"}],
  cocina: [{id:"cocina",label:"Cocina",ico:"cocina"}],
};

/* ─── HELPERS ─────────────────────────────────────────────────────────── */
const fmt = n => `$${Number(n).toLocaleString("es-AR")}`;
const ESTADOS_COCINA = ["nuevo","en preparación","listo"];

/* ─── HOOK RESPONSIVE ─────────────────────────────────────────────────── */
function useIsMobile(bp=768){
  const [mob,setMob]=useState(typeof window!=="undefined"?window.innerWidth<bp:false);
  useEffect(()=>{const fn=()=>setMob(window.innerWidth<bp);window.addEventListener("resize",fn);return()=>window.removeEventListener("resize",fn);},[bp]);
  return mob;
}

/* ─── HOOK API ────────────────────────────────────────────────────────── */
function useApi(fn, deps=[]){
  const [data,setData]=useState(null);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(null);
  const load=useCallback(async()=>{
    setLoading(true);setError(null);
    try{setData(await fn());}catch(e){setError(e.message);}
    finally{setLoading(false);}
  },[]);
  useEffect(()=>{load();},[...deps]);
  return{data,loading,error,reload:load};
}

/* ─── CSS ─────────────────────────────────────────────────────────────── */
const CSS=`
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=DM+Sans:wght@300;400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{font-size:16px}
body{font-family:'DM Sans',sans-serif;background:#F7F4F0;color:#1A0A12;-webkit-font-smoothing:antialiased}
::-webkit-scrollbar{width:5px;height:5px}::-webkit-scrollbar-track{background:#E8E3DC}::-webkit-scrollbar-thumb{background:#6B2D4E;border-radius:3px}
.cav{font-family:'Caveat',cursive}
.badge{display:inline-block;background:#C9A96E;color:#3D1A2E;font-size:10px;font-weight:700;padding:2px 9px;border-radius:20px;letter-spacing:.4px}
.nav{position:fixed;top:0;left:0;right:0;z-index:200;background:#3D1A2E;height:56px;display:flex;align-items:center;padding:0 20px;gap:16px}
.nav-logo{font-family:'Caveat',cursive;color:#fff;font-size:20px;font-weight:700;white-space:nowrap;flex-shrink:0}
.nav-logo em{font-style:normal;color:#C9A96E;font-size:13px;margin-left:5px}
.nav-center{display:flex;gap:2px;flex:1;justify-content:center}
.nav-tab{background:none;border:none;color:#B8B0A6;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;padding:8px 14px;border-radius:6px;cursor:pointer;transition:all .18s;white-space:nowrap;display:flex;align-items:center;gap:6px}
.nav-tab:hover{color:#fff;background:rgba(255,255,255,.08)}
.nav-tab.active{color:#fff;background:rgba(201,169,110,.18);border-bottom:2px solid #C9A96E}
.nav-right{display:flex;align-items:center;gap:10px;flex-shrink:0}
.role-pill{display:flex;align-items:center;gap:6px;background:rgba(255,255,255,.08);border-radius:20px;padding:5px 12px 5px 8px;font-size:12px;color:#B8B0A6;white-space:nowrap}
.role-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0}
.btn-logout{display:flex;align-items:center;gap:6px;background:none;border:1px solid rgba(255,255,255,.18);color:#B8B0A6;font-family:'DM Sans',sans-serif;font-size:12px;padding:5px 12px;border-radius:6px;cursor:pointer;transition:all .18s}
.btn-logout:hover{border-color:#C9A96E;color:#C9A96E}
.bottom-nav{display:none;position:fixed;bottom:0;left:0;right:0;z-index:200;background:#3D1A2E;border-top:1px solid rgba(255,255,255,.08);height:58px}
.bottom-nav-inner{display:flex;height:100%}
.bnav-btn{flex:1;background:none;border:none;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;cursor:pointer;color:#B8B0A6;font-family:'DM Sans',sans-serif;font-size:10px;font-weight:500;transition:color .18s;padding-bottom:2px}
.bnav-btn.active{color:#C9A96E}
.bnav-ico{display:flex;align-items:center;justify-content:center;width:20px;height:20px}
@media(max-width:768px){
  .nav-center{display:none}
  .bottom-nav{display:block}
  .page{padding-bottom:58px!important}
  .role-pill .role-label{display:none}
}
.btn-p{display:inline-flex;align-items:center;gap:6px;background:#3D1A2E;color:#fff;border:none;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;padding:9px 18px;border-radius:8px;cursor:pointer;transition:background .18s}
.btn-p:hover{background:#6B2D4E}
.btn-p:disabled{opacity:.45;cursor:default}
.btn-o{display:inline-flex;align-items:center;gap:6px;background:none;color:#3D1A2E;border:1.5px solid #3D1A2E;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;padding:8px 16px;border-radius:8px;cursor:pointer;transition:all .18s}
.btn-o:hover{background:#3D1A2E;color:#fff}
.btn-g{display:inline-flex;align-items:center;gap:6px;background:#C9A96E;color:#3D1A2E;border:none;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:600;padding:12px 22px;border-radius:8px;cursor:pointer;transition:background .18s}
.btn-g:hover{background:#A07840;color:#fff}
.btn-g:disabled{opacity:.45;cursor:default}
.btn-danger{display:inline-flex;align-items:center;gap:5px;background:none;border:1.5px solid #e0c0c0;color:#9a2a2a;font-family:'DM Sans',sans-serif;font-size:12px;padding:6px 12px;border-radius:7px;cursor:pointer;transition:all .18s}
.btn-danger:hover{background:#fdf0f0}
.field-label{font-size:11px;font-weight:600;color:#1A0A12;display:block;margin-bottom:4px}
.field-input{width:100%;padding:8px 11px;border-radius:7px;border:1.5px solid #E8E3DC;font-size:14px;background:#F7F4F0;color:#1A0A12;outline:none;transition:border-color .15s;font-family:'DM Sans',sans-serif}
.field-input:focus{border-color:#6B2D4E}
.menu-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:16px}
@media(max-width:480px){.menu-grid{grid-template-columns:1fr}}
.kpi-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:24px}
@media(max-width:900px){.kpi-grid{grid-template-columns:repeat(2,1fr)}}
.charts-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px}
@media(max-width:768px){.charts-grid{grid-template-columns:1fr}}
.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px}
@media(max-width:480px){.form-grid{grid-template-columns:1fr}}
.tienda-layout{display:flex;gap:24px;padding:24px;max-width:1100px;margin:0 auto;align-items:flex-start}
.tienda-productos{flex:1;min-width:0}
.tienda-carrito-desktop{width:290px;flex-shrink:0;position:sticky;top:72px}
@media(max-width:768px){.tienda-layout{flex-direction:column;padding:16px;gap:0}.tienda-carrito-desktop{display:none}}
.carrito-mobile-bar{display:none}
@media(max-width:768px){.carrito-mobile-bar{display:flex;position:fixed;bottom:58px;left:0;right:0;z-index:150;background:#3D1A2E;padding:10px 16px;align-items:center;justify-content:space-between;border-top:1px solid rgba(255,255,255,.1)}}
.table-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch}
table{width:100%;border-collapse:collapse;min-width:520px}
.admin-section{margin-bottom:32px}
.admin-section-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid #E8E3DC;flex-wrap:wrap;gap:10px}
.cocina-col{border-right:1px solid rgba(255,255,255,.06);display:flex;flex-direction:column}
.cocina-cards{flex:1;padding:12px;display:flex;flex-direction:column;gap:10px;overflow-y:auto}
@media(max-width:700px){.cocina-cols{flex-direction:column!important}.cocina-col{border-right:none;border-bottom:1px solid rgba(255,255,255,.06)}}
.login-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;background:#3D1A2E;padding:20px}
.login-card{background:#fff;border-radius:20px;padding:40px 36px;width:100%;max-width:400px}
.role-btn{width:100%;background:none;border:1.5px solid #E8E3DC;border-radius:12px;padding:14px 16px;cursor:pointer;text-align:left;transition:all .2s;display:flex;align-items:center;gap:14px;margin-bottom:10px;font-family:'DM Sans',sans-serif}
.role-btn:hover{border-color:#6B2D4E;background:#FBF9F8}
.role-btn.selected{border-color:#3D1A2E;background:#FBF9F8;box-shadow:0 0 0 3px rgba(61,26,46,.07)}
.spinner{width:32px;height:32px;border:3px solid #E8E3DC;border-top-color:#3D1A2E;border-radius:50%;animation:spin .7s linear infinite;margin:40px auto}
@keyframes spin{to{transform:rotate(360deg)}}
.error-banner{background:#fdf0f0;border:1px solid #e0c0c0;color:#9a2a2a;padding:12px 16px;border-radius:8px;font-size:13px;margin-bottom:16px}
`;

/* ─── SHARED ──────────────────────────────────────────────────────────── */
function Card({children,style={}}){
  return <div style={{background:C.blanco,borderRadius:12,border:`1px solid ${C.grisClaro}`,...style}}>{children}</div>;
}
function Spinner(){return <div className="spinner"/>;}
function ErrorBanner({msg}){return msg?<div className="error-banner">{msg}</div>:null;}

/* ─── LOGIN ───────────────────────────────────────────────────────────── */
function Login({onLogin}){
  const [rol,setRol]=useState(null);
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null);

  // Prefills de demo por rol
  const DEMO={
    admin:  {email:"admin@burgermust.com",  pass:"admin1234"},
    cocina: {email:"cocina@burgermust.com", pass:"admin1234"},
    cliente:{email:"",pass:""},
  };

  const selRol=r=>{setRol(r);setEmail(DEMO[r].email);setPass(DEMO[r].pass);setError(null);};

  const submit=async()=>{
    if(!rol) return;
    setLoading(true);setError(null);
    try{
      if(rol==="cliente"){
        // Cliente no requiere login — entra directo
        onLogin({rol:"cliente",nombre:"Cliente"});
        return;
      }
      const data=await API.auth.login(email,pass);
      localStorage.setItem("bm_token",data.token);
      onLogin({rol:data.rol,nombre:data.nombre});
    }catch(e){
      setError(e.message);
    }finally{
      setLoading(false);
    }
  };

  return(
    <div className="login-wrap">
      <div className="login-card">
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{width:44,height:44,background:C.bordoOscuro,borderRadius:10,margin:"0 auto 12px",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="8" r="3"/><path d="M5 19 C5 15.5 7.5 13 11 13 C14.5 13 17 15.5 17 19"/>
            </svg>
          </div>
          <p className="cav" style={{fontSize:32,color:C.bordoOscuro,lineHeight:1}}>Burger Must</p>
          <p style={{color:C.grisMedio,fontSize:13,marginTop:3}}>Selection · Bella Vista</p>
        </div>
        <p style={{fontSize:12,fontWeight:600,color:C.grisMedio,marginBottom:12,letterSpacing:.5}}>INGRESÁ COMO</p>
        {Object.entries(ROLES).map(([key,r])=>(
          <button key={key} className={`role-btn${rol===key?" selected":""}`} onClick={()=>selRol(key)}>
            <span style={{width:38,height:38,borderRadius:9,background:r.color,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,color:C.dorado}}>{Ico[r.ico]}</span>
            <div style={{flex:1}}>
              <p style={{fontWeight:600,fontSize:14,color:C.texto,marginBottom:1}}>{r.label}</p>
              <p style={{fontSize:12,color:C.grisMedio}}>{r.desc}</p>
            </div>
            {rol===key&&<span style={{color:C.bordoOscuro,display:"flex"}}>{Ico.check}</span>}
          </button>
        ))}
        {rol&&rol!=="cliente"&&(
          <div style={{marginBottom:12}}>
            <div style={{marginBottom:8}}>
              <label className="field-label">Email</label>
              <input className="field-input" value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="admin@burgermust.com"/>
            </div>
            <div>
              <label className="field-label">Contraseña</label>
              <input className="field-input" value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="••••••••" onKeyDown={e=>e.key==="Enter"&&submit()}/>
            </div>
          </div>
        )}
        <ErrorBanner msg={error}/>
        <button className="btn-g" style={{width:"100%",justifyContent:"center",marginTop:4,opacity:rol?1:.45,fontSize:15}} onClick={submit} disabled={!rol||loading}>
          {loading?"Ingresando...":"Ingresar"} {!loading&&rol&&<span style={{display:"flex"}}>{Ico.arrow}</span>}
        </button>
      </div>
    </div>
  );
}

/* ─── MENÚ DIGITAL ────────────────────────────────────────────────────── */
function MenuDigital(){
  const {data:items,loading,error,reload}=useApi(()=>API.menu.get());
  const [cat,setCat]=useState("Todas");

  const cats=["Todas",...new Set((items||[]).map(i=>i.categoria))];
  const filtrados=cat==="Todas"?(items||[]):(items||[]).filter(i=>i.categoria===cat);

  return(
    <div className="page" style={{background:C.crema,paddingTop:56}}>
      <div style={{background:C.bordoOscuro,padding:"48px 20px 40px",textAlign:"center"}}>
        <p style={{color:C.dorado,fontSize:11,fontWeight:600,letterSpacing:2.5,marginBottom:10}}>BELLA VISTA · FRANCIA Y MOINE</p>
        <h1 className="cav" style={{color:C.blanco,fontSize:"clamp(32px,6vw,52px)",lineHeight:1.05,marginBottom:10}}>
          La hamburguesa<br/><span style={{color:C.dorado}}>es el punto de partida.</span>
        </h1>
        <p style={{color:C.grisMedio,fontSize:13,marginTop:12}}>Carne estilo Wagyu · Ingredientes seleccionados</p>
      </div>
      <div style={{background:C.blanco,borderBottom:`1px solid ${C.grisClaro}`,display:"flex",overflowX:"auto",padding:"0 8px"}}>
        {cats.map(c=>(
          <button key={c} onClick={()=>setCat(c)} style={{background:"none",border:"none",fontFamily:"'DM Sans',sans-serif",fontSize:14,fontWeight:cat===c?600:400,color:cat===c?C.bordoOscuro:C.grisMedio,borderBottom:cat===c?`2px solid ${C.bordoOscuro}`:"2px solid transparent",padding:"13px 14px",cursor:"pointer",whiteSpace:"nowrap",flexShrink:0,transition:"all .18s"}}>{c}</button>
        ))}
      </div>
      <div style={{maxWidth:960,margin:"0 auto",padding:"24px 16px"}}>
        {loading&&<Spinner/>}
        {error&&<ErrorBanner msg={`No se pudo cargar el menú: ${error}`}/>}
        <div className="menu-grid">
          {filtrados.map(item=>(
            <div key={item.id} style={{background:C.blanco,borderRadius:12,overflow:"hidden",border:`1px solid ${C.grisClaro}`}}>
              <div style={{background:`linear-gradient(135deg,${C.bordoOscuro},${C.bordoMedio})`,height:120,display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
                {item.imagen_url
                  ? <img src={item.imagen_url} alt={item.nombre} style={{width:"100%",height:"100%",objectFit:"cover",position:"absolute",inset:0}}/>
                  : <svg width="48" height="48" viewBox="0 0 48 48" fill="none" opacity=".14" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round"><ellipse cx="24" cy="22" rx="16" ry="6"/><path d="M8 22 C8 30 16 34 24 34 C32 34 40 30 40 22"/><rect x="10" y="34" width="28" height="4" rx="2"/></svg>
                }
                {item.badge&&<span className="badge" style={{position:"absolute",top:10,left:10}}>{item.badge}</span>}
                <span style={{position:"absolute",top:10,right:10,background:"rgba(0,0,0,.35)",color:C.dorado,fontSize:10,fontWeight:600,padding:"2px 8px",borderRadius:20}}>{item.categoria}</span>
              </div>
              <div style={{padding:"14px 16px 18px"}}>
                <h3 className="cav" style={{fontSize:24,color:C.bordoOscuro,marginBottom:4}}>{item.nombre}</h3>
                <p style={{fontSize:12,color:C.grisMedio,lineHeight:1.5,marginBottom:12,minHeight:36}}>{item.descripcion}</p>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span style={{fontWeight:700,fontSize:18,color:C.bordoOscuro}}>{fmt(item.precio)}</span>
                  <span style={{fontSize:11,color:C.grisMedio}}>Take away · Delivery</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{background:C.bordoOscuro,padding:"28px 20px",textAlign:"center"}}>
        <p className="cav" style={{color:C.blanco,fontSize:26,marginBottom:2}}>Burger Must</p>
        <p style={{color:C.grisMedio,fontSize:12}}>Selection · Bella Vista</p>
      </div>
    </div>
  );
}

/* ─── TIENDA ONLINE ───────────────────────────────────────────────────── */
function TiendaOnline(){
  const mob=useIsMobile();
  const {data:menuItems,loading:menuLoading}=useApi(()=>API.menu.get());
  const [carrito,setCarrito]=useState([]);
  const [verCarrito,setVerCarrito]=useState(false);
  const [modal,setModal]=useState(false);
  const [modoPago,setModoPago]=useState("efectivo");
  const [modoEntrega,setModoEntrega]=useState("takeaway");
  const [ok,setOk]=useState(null); // pedido confirmado
  const [submitting,setSubmitting]=useState(false);
  const [error,setError]=useState(null);

  const agregar=item=>setCarrito(c=>{const ex=c.find(x=>x.id===item.id);return ex?c.map(x=>x.id===item.id?{...x,qty:x.qty+1}:x):[...c,{...item,qty:1}];});
  const quitar=id=>setCarrito(c=>{const ex=c.find(x=>x.id===id);return ex?.qty===1?c.filter(x=>x.id!==id):c.map(x=>x.id===id?{...x,qty:x.qty-1}:x);});
  const total=carrito.reduce((s,x)=>s+x.precio*x.qty,0);
  const cant=carrito.reduce((s,x)=>s+x.qty,0);

  const confirmar=async()=>{
    setSubmitting(true);setError(null);
    try{
      const pedido=await API.pedidos.create({
        items:carrito.map(x=>({producto_id:x.id,cantidad:x.qty})),
        modo_entrega:modoEntrega,
        modo_pago:modoPago,
      });
      // Si pago online, redirigir a MercadoPago
      if(modoPago==="online"){
        const{init_point}=await API.pagos.preference(pedido.id);
        window.location.href=init_point;
        return;
      }
      setOk(pedido);setCarrito([]);setModal(false);setVerCarrito(false);
    }catch(e){setError(e.message);}
    finally{setSubmitting(false);}
  };

  const grupos=[
    ["Burgers",(menuItems||[]).filter(i=>["Burgers","The Box"].includes(i.categoria))],
    ["Acompañamientos",(menuItems||[]).filter(i=>i.categoria==="Acompañamientos")],
    ["Bebidas",(menuItems||[]).filter(i=>i.categoria==="Bebidas")],
  ];

  const SelBtn=({activo,onClick,children})=>(
    <button onClick={onClick} style={{flex:1,padding:"10px 8px",borderRadius:8,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:500,fontSize:13,background:activo?C.bordoOscuro:C.blanco,color:activo?C.blanco:C.texto,border:`1.5px solid ${activo?C.bordoOscuro:C.grisClaro}`,transition:"all .15s"}}>{children}</button>
  );

  const CarritoPanel=()=>(
    <div style={{background:C.blanco,borderRadius:14,border:`1px solid ${C.grisClaro}`,overflow:"hidden"}}>
      <div style={{background:C.bordoOscuro,padding:"14px 18px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <h3 className="cav" style={{color:C.blanco,fontSize:22}}>Tu pedido</h3>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          {cant>0&&<span style={{background:C.dorado,color:C.bordoOscuro,borderRadius:"50%",width:22,height:22,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:12}}>{cant}</span>}
          {mob&&<button onClick={()=>setVerCarrito(false)} style={{background:"none",border:"none",color:C.grisMedio,cursor:"pointer",display:"flex"}}>{Ico.close}</button>}
        </div>
      </div>
      <div style={{padding:"16px 18px"}}>
        {carrito.length===0
          ?<p style={{color:C.grisMedio,fontSize:14,textAlign:"center",padding:"20px 0"}}>El carrito está vacío</p>
          :<>
            {carrito.map(x=>(
              <div key={x.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10,fontSize:14}}>
                <div><span style={{fontWeight:500}}>{x.nombre}</span><span style={{color:C.grisMedio,marginLeft:5}}>×{x.qty}</span></div>
                <span style={{fontWeight:600,color:C.bordoOscuro}}>{fmt(x.precio*x.qty)}</span>
              </div>
            ))}
            <div style={{borderTop:`1px solid ${C.grisClaro}`,paddingTop:12,marginTop:4,display:"flex",justifyContent:"space-between",fontWeight:700,fontSize:17,marginBottom:16}}>
              <span>Total</span><span style={{color:C.bordoOscuro}}>{fmt(total)}</span>
            </div>
            <button className="btn-g" style={{width:"100%",justifyContent:"center"}} onClick={()=>{setVerCarrito(false);setModal(true);}}>Confirmar pedido</button>
          </>
        }
      </div>
    </div>
  );

  return(
    <div className="page" style={{background:C.crema,paddingTop:56}}>
      {ok&&(
        <div style={{position:"fixed",inset:0,background:"rgba(61,26,46,.85)",zIndex:400,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
          <div style={{background:C.blanco,borderRadius:16,padding:"44px 36px",textAlign:"center",maxWidth:320,width:"100%"}}>
            <div style={{width:52,height:52,borderRadius:"50%",background:"#e8f5e9",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",color:"#2e7d32"}}>{Ico.check}</div>
            <h2 className="cav" style={{fontSize:32,color:C.bordoOscuro,marginBottom:6}}>Pedido confirmado</h2>
            <p style={{color:C.bordoMedio,fontWeight:600,fontSize:15,marginBottom:8}}>{ok.numero}</p>
            <p style={{color:C.grisMedio,marginBottom:24}}>Ya está en cocina. Te avisamos cuando esté listo.</p>
            <button className="btn-p" style={{justifyContent:"center"}} onClick={()=>setOk(null)}>Hacer otro pedido</button>
          </div>
        </div>
      )}
      {modal&&(
        <div style={{position:"fixed",inset:0,background:"rgba(61,26,46,.75)",zIndex:300,display:"flex",alignItems:mob?"flex-end":"center",justifyContent:"center",padding:mob?0:24}}>
          <div style={{background:C.blanco,borderRadius:mob?"16px 16px 0 0":16,padding:"28px 24px",width:"100%",maxWidth:420,maxHeight:mob?"90vh":"auto",overflowY:"auto"}}>
            <h2 className="cav" style={{fontSize:28,color:C.bordoOscuro,marginBottom:20}}>Confirmar pedido</h2>
            <p style={{fontSize:11,fontWeight:600,color:C.grisMedio,letterSpacing:.5,marginBottom:8}}>ENTREGA</p>
            <div style={{display:"flex",gap:8,marginBottom:18}}>
              <SelBtn activo={modoEntrega==="takeaway"} onClick={()=>setModoEntrega("takeaway")}>Take away</SelBtn>
              <SelBtn activo={modoEntrega==="delivery"} onClick={()=>setModoEntrega("delivery")}>Delivery</SelBtn>
            </div>
            <p style={{fontSize:11,fontWeight:600,color:C.grisMedio,letterSpacing:.5,marginBottom:8}}>PAGO</p>
            <div style={{display:"flex",gap:8,marginBottom:20}}>
              <SelBtn activo={modoPago==="efectivo"} onClick={()=>setModoPago("efectivo")}>Efectivo</SelBtn>
              <SelBtn activo={modoPago==="online"} onClick={()=>setModoPago("online")}>MercadoPago</SelBtn>
            </div>
            <div style={{borderTop:`1px solid ${C.grisClaro}`,paddingTop:14,marginBottom:18}}>
              {carrito.map(x=>(
                <div key={x.id} style={{display:"flex",justifyContent:"space-between",marginBottom:6,fontSize:14}}>
                  <span>{x.qty}× {x.nombre}</span><span style={{fontWeight:600,color:C.bordoOscuro}}>{fmt(x.precio*x.qty)}</span>
                </div>
              ))}
              <div style={{display:"flex",justifyContent:"space-between",marginTop:10,paddingTop:10,borderTop:`1px solid ${C.grisClaro}`,fontWeight:700,fontSize:17}}>
                <span>Total</span><span style={{color:C.bordoOscuro}}>{fmt(total)}</span>
              </div>
            </div>
            <ErrorBanner msg={error}/>
            <div style={{display:"flex",gap:10}}>
              <button className="btn-o" onClick={()=>{setModal(false);setError(null);}} style={{flex:1,justifyContent:"center"}}>Volver</button>
              <button className="btn-g" onClick={confirmar} disabled={submitting} style={{flex:2,justifyContent:"center"}}>
                {submitting?"Procesando...":"Confirmar"}
              </button>
            </div>
          </div>
        </div>
      )}
      {mob&&verCarrito&&(
        <div style={{position:"fixed",inset:0,zIndex:250,background:"rgba(61,26,46,.6)"}} onClick={()=>setVerCarrito(false)}>
          <div style={{position:"absolute",bottom:58,left:0,right:0,maxHeight:"75vh",overflowY:"auto",background:C.blanco,borderRadius:"16px 16px 0 0"}} onClick={e=>e.stopPropagation()}>
            <CarritoPanel/>
          </div>
        </div>
      )}
      <div className="tienda-layout">
        <div className="tienda-productos">
          <h1 className="cav" style={{fontSize:"clamp(28px,5vw,38px)",color:C.bordoOscuro,marginBottom:24}}>Hacé tu pedido</h1>
          {menuLoading&&<Spinner/>}
          {grupos.map(([titulo,items])=>items.length===0?null:(
            <div key={titulo} style={{marginBottom:28}}>
              <h2 className="cav" style={{fontSize:24,color:C.bordoOscuro,marginBottom:12,paddingBottom:8,borderBottom:`1px solid ${C.grisClaro}`}}>{titulo}</h2>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {items.map(item=>{
                  const en=carrito.find(x=>x.id===item.id);
                  return(
                    <Card key={item.id} style={{padding:"12px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:12}}>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3,flexWrap:"wrap"}}>
                          <span style={{fontWeight:600,fontSize:15,color:C.texto}}>{item.nombre}</span>
                          {item.badge&&<span className="badge">{item.badge}</span>}
                        </div>
                        <p style={{fontSize:12,color:C.grisMedio,lineHeight:1.4}}>{item.descripcion}</p>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
                        <span style={{fontWeight:700,color:C.bordoOscuro,fontSize:15,minWidth:62,textAlign:"right"}}>{fmt(item.precio)}</span>
                        {en?(
                          <div style={{display:"flex",alignItems:"center",gap:6,background:C.bordoOscuro,borderRadius:8,padding:"5px 10px"}}>
                            <button onClick={()=>quitar(item.id)} style={{background:"none",border:"none",color:C.blanco,fontSize:16,cursor:"pointer",lineHeight:1,width:18}}>−</button>
                            <span style={{color:C.blanco,fontWeight:600,minWidth:14,textAlign:"center",fontSize:14}}>{en.qty}</span>
                            <button onClick={()=>agregar(item)} style={{background:"none",border:"none",color:C.dorado,fontSize:16,cursor:"pointer",lineHeight:1,width:18}}>+</button>
                          </div>
                        ):(
                          <button className="btn-p" style={{padding:"7px 14px",fontSize:13}} onClick={()=>agregar(item)}>Agregar</button>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="tienda-carrito-desktop"><CarritoPanel/></div>
      </div>
      <div className="carrito-mobile-bar">
        <div>
          <p style={{color:C.blanco,fontWeight:600,fontSize:14}}>{cant>0?`${cant} producto${cant>1?"s":""}`:"Carrito vacío"}</p>
          {cant>0&&<p style={{color:C.dorado,fontSize:12}}>{fmt(total)}</p>}
        </div>
        <button className="btn-g" style={{padding:"9px 18px",fontSize:13}} onClick={()=>cant>0&&setVerCarrito(true)} disabled={cant===0}>Ver pedido</button>
      </div>
    </div>
  );
}

/* ─── PANEL ADMIN ─────────────────────────────────────────────────────── */
function PanelAdmin(){
  const {data:productos,loading:loadProd,error:errProd,reload:reloadMenu}=useApi(()=>API.menu.getAll());
  const {data:pedidosData,loading:loadPed,reload:reloadPed}=useApi(()=>API.pedidos.getAll());
  const {data:finData}=useApi(()=>API.finanzas.resumen());

  const [editando,setEditando]=useState(null);
  const [form,setForm]=useState({});
  const [agregando,setAgregando]=useState(false);
  const [nuevo,setNuevo]=useState({nombre:"",categoria:"Burgers",precio:"",descripcion:"",badge:""});
  const [flash,setFlash]=useState(null);
  const [saving,setSaving]=useState(false);
  const cats=["Burgers","The Box","Acompañamientos","Bebidas"];

  const showFlash=msg=>{setFlash(msg);setTimeout(()=>setFlash(null),2500);};

  const guardar=async()=>{
    setSaving(true);
    try{
      await API.menu.update(editando,{...form,precio:Number(form.precio)});
      setEditando(null);reloadMenu();showFlash("Guardado correctamente");
    }catch(e){showFlash("Error: "+e.message);}
    finally{setSaving(false);}
  };
  const eliminar=async id=>{
    if(!window.confirm("¿Eliminar este producto?")) return;
    try{await API.menu.delete(id);reloadMenu();showFlash("Producto eliminado");}
    catch(e){showFlash("Error: "+e.message);}
  };
  const agregar=async()=>{
    if(!nuevo.nombre||!nuevo.precio) return;
    setSaving(true);
    try{
      await API.menu.create({...nuevo,precio:Number(nuevo.precio),badge:nuevo.badge||null});
      setAgregando(false);setNuevo({nombre:"",categoria:"Burgers",precio:"",descripcion:"",badge:""});
      reloadMenu();showFlash("Producto agregado");
    }catch(e){showFlash("Error: "+e.message);}
    finally{setSaving(false);}
  };

  const kpis=finData?.kpis||{};
  const pedidos=pedidosData||[];
  const items=productos||[];

  const estadoC={"nuevo":{bg:"#e8f0fe",t:"#1a56c4"},"en preparación":{bg:"#fff8e1",t:"#b45309"},"listo":{bg:"#e8f5e9",t:"#2e7d32"},"entregado":{bg:"#f3f4f6",t:"#4b5563"},"cancelado":{bg:"#fef2f2",t:"#b91c1c"}};

  return(
    <div className="page" style={{background:C.crema,paddingTop:56}}>
      <div style={{maxWidth:1000,margin:"0 auto",padding:"28px 24px"}}>
        <div style={{marginBottom:32}}>
          <h1 className="cav" style={{fontSize:"clamp(26px,4vw,36px)",color:C.bordoOscuro,marginBottom:2}}>Administración</h1>
          <p style={{color:C.grisMedio,fontSize:13}}>Burger Must Selection · Bella Vista</p>
        </div>

        {/* KPIs */}
        <div className="admin-section">
          <div className="admin-section-header">
            <h2 className="cav" style={{fontSize:22,color:C.bordoOscuro}}>Resumen del día</h2>
            <button className="btn-o" style={{fontSize:12,padding:"6px 12px"}} onClick={()=>{reloadPed();}}>{Ico.refresh} Actualizar</button>
          </div>
          {loadPed?<Spinner/>:
          <div className="kpi-grid">
            {[
              ["Ventas hoy",fmt(kpis.ventas_total||0),"vs. ayer"],
              ["Pedidos",kpis.pedidos||pedidos.length,`${pedidos.filter(p=>p.estado==="nuevo").length} pendientes`],
              ["Ticket promedio",fmt(kpis.ticket_promedio||0),"por pedido"],
              ["Productos activos",items.filter(i=>i.activo).length,"en el menú"],
            ].map(([label,valor,sub])=>(
              <Card key={label} style={{padding:"16px 18px"}}>
                <p style={{fontSize:11,fontWeight:600,color:C.grisMedio,marginBottom:6,letterSpacing:.4}}>{label}</p>
                <p className="cav" style={{fontSize:"clamp(22px,3vw,30px)",color:C.bordoOscuro,lineHeight:1,marginBottom:3}}>{valor}</p>
                <p style={{fontSize:11,color:C.grisMedio}}>{sub}</p>
              </Card>
            ))}
          </div>}
        </div>

        {/* Gestión menú */}
        <div className="admin-section">
          <div className="admin-section-header">
            <h2 className="cav" style={{fontSize:22,color:C.bordoOscuro}}>Gestión del menú</h2>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              {flash&&<span style={{color:flash.startsWith("Error")?"#9a2a2a":"#2e7d32",fontSize:13,fontWeight:500}}>{flash}</span>}
              <button className="btn-p" style={{fontSize:13,padding:"9px 18px"}} onClick={()=>{setAgregando(true);setEditando(null);}}>{Ico.plus} Nuevo</button>
            </div>
          </div>
          {errProd&&<ErrorBanner msg={errProd}/>}
          {agregando&&(
            <Card style={{padding:20,marginBottom:16}}>
              <p className="cav" style={{fontSize:20,color:C.bordoOscuro,marginBottom:14}}>Nuevo producto</p>
              <div className="form-grid">
                {[["Nombre","nombre","text","Ej: Classic"],["Precio ($)","precio","number","16000"],["Badge (opcional)","badge","text","Ej: Nuevo"]].map(([lbl,key,type,ph])=>(
                  <div key={key}><label className="field-label">{lbl}</label><input className="field-input" type={type} value={nuevo[key]} onChange={e=>setNuevo(p=>({...p,[key]:e.target.value}))} placeholder={ph}/></div>
                ))}
                <div><label className="field-label">Categoría</label><select className="field-input" value={nuevo.categoria} onChange={e=>setNuevo(p=>({...p,categoria:e.target.value}))}>{cats.map(c=><option key={c}>{c}</option>)}</select></div>
                <div style={{gridColumn:"1/-1"}}><label className="field-label">Descripción</label><input className="field-input" value={nuevo.descripcion} onChange={e=>setNuevo(p=>({...p,descripcion:e.target.value}))} placeholder="Ingredientes..."/></div>
              </div>
              <div style={{display:"flex",gap:10,marginTop:4}}>
                <button className="btn-o" style={{fontSize:13}} onClick={()=>setAgregando(false)}>Cancelar</button>
                <button className="btn-p" style={{fontSize:13}} onClick={agregar} disabled={saving}>{saving?"Guardando...":(<>{Ico.plus} Agregar</>)}</button>
              </div>
            </Card>
          )}
          {loadProd?<Spinner/>:(
            <Card style={{overflow:"hidden"}}>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr style={{background:C.crema,borderBottom:`1px solid ${C.grisClaro}`}}>
                      {["Producto","Categoría","Precio","Badge",""].map((h,i)=>(
                        <th key={i} style={{padding:"11px 14px",textAlign:"left",fontSize:11,fontWeight:700,color:C.grisMedio,letterSpacing:.5,whiteSpace:"nowrap"}}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item,i)=>(
                      <tr key={item.id} style={{borderBottom:i<items.length-1?`1px solid ${C.grisClaro}`:"none",background:editando===item.id?"#FFF9F6":item.activo?C.blanco:"#fafafa",opacity:item.activo?1:.6}}>
                        {editando===item.id?(
                          <>
                            <td style={{padding:"9px 14px"}}><input className="field-input" style={{minWidth:130}} value={form.nombre} onChange={e=>setForm(p=>({...p,nombre:e.target.value}))}/></td>
                            <td style={{padding:"9px 14px"}}><select className="field-input" style={{width:"auto"}} value={form.categoria} onChange={e=>setForm(p=>({...p,categoria:e.target.value}))}>{cats.map(c=><option key={c}>{c}</option>)}</select></td>
                            <td style={{padding:"9px 14px"}}><input className="field-input" type="number" style={{width:100}} value={form.precio} onChange={e=>setForm(p=>({...p,precio:e.target.value}))}/></td>
                            <td style={{padding:"9px 14px"}}><input className="field-input" style={{width:90}} value={form.badge||""} onChange={e=>setForm(p=>({...p,badge:e.target.value}))} placeholder="—"/></td>
                            <td style={{padding:"9px 14px"}}><div style={{display:"flex",gap:6}}><button className="btn-p" style={{padding:"6px 12px"}} onClick={guardar} disabled={saving}>{saving?"...":(<>{Ico.save} Guardar</>)}</button><button className="btn-o" style={{padding:"6px 10px"}} onClick={()=>setEditando(null)}>{Ico.close}</button></div></td>
                          </>
                        ):(
                          <>
                            <td style={{padding:"12px 14px"}}><p style={{fontWeight:600,fontSize:14,whiteSpace:"nowrap"}}>{item.nombre}</p><p style={{fontSize:11,color:C.grisMedio,marginTop:2,maxWidth:220,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.descripcion}</p></td>
                            <td style={{padding:"12px 14px",fontSize:13,color:C.grisMedio,whiteSpace:"nowrap"}}>{item.categoria}</td>
                            <td style={{padding:"12px 14px",fontWeight:700,color:C.bordoOscuro,whiteSpace:"nowrap"}}>{fmt(item.precio)}</td>
                            <td style={{padding:"12px 14px"}}>{item.badge?<span className="badge">{item.badge}</span>:<span style={{color:C.grisClaro,fontSize:13}}>—</span>}</td>
                            <td style={{padding:"12px 14px"}}><div style={{display:"flex",gap:6}}><button className="btn-o" style={{padding:"6px 12px"}} onClick={()=>{setEditando(item.id);setForm({...item});setAgregando(false);}}>{Ico.edit} Editar</button><button className="btn-danger" onClick={()=>eliminar(item.id)}>{Ico.trash}</button></div></td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </div>

        {/* Pedidos recientes */}
        <div className="admin-section">
          <div className="admin-section-header">
            <h2 className="cav" style={{fontSize:22,color:C.bordoOscuro}}>Pedidos recientes</h2>
            <span style={{fontSize:12,color:C.grisMedio}}>{pedidos.length} pedidos hoy</span>
          </div>
          <Card style={{overflow:"hidden"}}>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr style={{background:C.crema,borderBottom:`1px solid ${C.grisClaro}`}}>
                    {["N°","Hora","Detalle","Pago","Total","Estado"].map(h=>(
                      <th key={h} style={{padding:"10px 14px",textAlign:"left",fontSize:11,fontWeight:700,color:C.grisMedio,whiteSpace:"nowrap"}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pedidos.map((p,i)=>{
                    const ec=estadoC[p.estado]||{bg:C.grisClaro,t:C.grisMedio};
                    const detalle=Array.isArray(p.items)?p.items.map(x=>`${x.nombre}${x.cantidad>1?` ×${x.cantidad}`:""}`).join(", "):"-";
                    const hora=new Date(p.created_at).toLocaleTimeString("es-AR",{hour:"2-digit",minute:"2-digit"});
                    return(
                      <tr key={p.id} style={{borderBottom:i<pedidos.length-1?`1px solid ${C.grisClaro}`:"none"}}>
                        <td style={{padding:"12px 14px",fontWeight:700,color:C.bordoOscuro,whiteSpace:"nowrap"}}>{p.numero}</td>
                        <td style={{padding:"12px 14px",fontSize:13,color:C.grisMedio,whiteSpace:"nowrap"}}>{hora}</td>
                        <td style={{padding:"12px 14px",fontSize:13,minWidth:160}}>{detalle}</td>
                        <td style={{padding:"12px 14px"}}><span style={{fontSize:11,background:p.modo_pago==="online"?"#e8f0fe":"#f0f4e8",color:p.modo_pago==="online"?"#1a56c4":"#3a6b1a",padding:"2px 9px",borderRadius:20,fontWeight:600,textTransform:"capitalize"}}>{p.modo_pago}</span></td>
                        <td style={{padding:"12px 14px",fontWeight:700,color:C.bordoOscuro,whiteSpace:"nowrap"}}>{fmt(p.total)}</td>
                        <td style={{padding:"12px 14px"}}><span style={{fontSize:11,background:ec.bg,color:ec.t,padding:"2px 9px",borderRadius:20,fontWeight:600}}>{p.estado}</span></td>
                      </tr>
                    );
                  })}
                  {pedidos.length===0&&<tr><td colSpan={6} style={{padding:"28px 14px",textAlign:"center",color:C.grisMedio,fontSize:14}}>Sin pedidos hoy</td></tr>}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ─── FINANZAS ────────────────────────────────────────────────────────── */
function Finanzas(){
  const {data,loading,error}=useApi(()=>API.finanzas.resumen());
  const {data:hist}=useApi(()=>API.finanzas.historico(7));

  const kpis=data?.kpis||{};
  const porCat=data?.por_categoria||[];
  const porHora=data?.por_hora||[];
  const historico=hist||[];
  const maxVentas=Math.max(...historico.map(d=>Number(d.ventas_total)||0),1);

  const estadoC={"nuevo":{bg:"#e8f0fe",t:"#1a56c4"},"en preparación":{bg:"#fff8e1",t:"#b45309"},"listo":{bg:"#e8f5e9",t:"#2e7d32"},"entregado":{bg:"#f3f4f6",t:"#4b5563"}};

  const KPI=({label,valor,sub,color})=>(
    <Card style={{padding:"18px 20px"}}>
      <p style={{fontSize:11,fontWeight:700,color:C.grisMedio,marginBottom:6,letterSpacing:.4}}>{label}</p>
      <p className="cav" style={{fontSize:"clamp(22px,3vw,32px)",color:color||C.bordoOscuro,lineHeight:1,marginBottom:4}}>{valor}</p>
      <p style={{fontSize:12,color:C.grisMedio}}>{sub}</p>
    </Card>
  );

  return(
    <div className="page" style={{background:C.crema,paddingTop:56}}>
      <div style={{maxWidth:1000,margin:"0 auto",padding:"28px 24px"}}>
        <div style={{marginBottom:28}}>
          <h1 className="cav" style={{fontSize:"clamp(26px,4vw,36px)",color:C.bordoOscuro}}>Finanzas</h1>
          <p style={{color:C.grisMedio,fontSize:13}}>Bella Vista · {new Date().toLocaleDateString("es-AR",{weekday:"long",day:"numeric",month:"long"})}</p>
        </div>
        {loading&&<Spinner/>}
        {error&&<ErrorBanner msg={error}/>}
        {!loading&&(
          <>
            <div className="kpi-grid">
              <KPI label="Ventas hoy"      valor={fmt(kpis.ventas_total||0)}   sub="Pedidos no cancelados"     color={C.bordoOscuro}/>
              <KPI label="Pedidos hoy"     valor={kpis.pedidos||0}             sub={`${kpis.pedidos_efectivo||0} efectivo · ${kpis.pedidos_online||0} online`}/>
              <KPI label="Ticket promedio" valor={fmt(kpis.ticket_promedio||0)} sub="Por pedido"/>
              <KPI label="Cancelados"      valor={kpis.cancelados||0}          sub="Hoy"                       color={kpis.cancelados>0?"#9a2a2a":C.grisMedio}/>
            </div>
            <div className="charts-grid">
              <Card style={{padding:"20px 22px"}}>
                <p className="cav" style={{fontSize:20,color:C.bordoOscuro,marginBottom:18}}>Ventas últimos 7 días</p>
                {historico.length===0
                  ?<p style={{color:C.grisMedio,fontSize:13,textAlign:"center",padding:"20px 0"}}>Sin datos aún</p>
                  :<div style={{display:"flex",alignItems:"flex-end",gap:6,height:110}}>
                    {historico.slice(0,7).map((d,i)=>{
                      const v=Number(d.ventas_total)||0;
                      const fecha=new Date(d.fecha).toLocaleDateString("es-AR",{weekday:"short"});
                      return(
                        <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
                          <span style={{fontSize:9,color:C.grisMedio,fontWeight:600}}>{fmt(v/1000).replace("$","")}k</span>
                          <div style={{width:"100%",height:`${(v/maxVentas)*80}px`,background:i===0?C.bordoOscuro:C.grisClaro,borderRadius:"3px 3px 0 0"}}/>
                          <span style={{fontSize:9,color:C.grisMedio,textTransform:"capitalize"}}>{fecha}</span>
                        </div>
                      );
                    })}
                  </div>
                }
              </Card>
              <Card style={{padding:"20px 22px"}}>
                <p className="cav" style={{fontSize:20,color:C.bordoOscuro,marginBottom:18}}>Por categoría hoy</p>
                {porCat.length===0
                  ?<p style={{color:C.grisMedio,fontSize:13,textAlign:"center",padding:"20px 0"}}>Sin datos aún</p>
                  :<>{porCat.map((c,i)=>{
                    const colores=[C.bordoOscuro,C.bordoMedio,C.dorado,"#8B4A6B"];
                    const totalCat=porCat.reduce((s,x)=>s+Number(x.total),0);
                    const pct=totalCat?Math.round((Number(c.total)/totalCat)*100):0;
                    return(
                      <div key={i} style={{marginBottom:14}}>
                        <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                          <span style={{fontSize:14,fontWeight:500}}>{c.categoria}</span>
                          <span style={{fontSize:14,fontWeight:700,color:colores[i%colores.length]}}>{pct}%</span>
                        </div>
                        <div style={{height:7,background:C.grisClaro,borderRadius:4,overflow:"hidden"}}>
                          <div style={{height:"100%",width:`${pct}%`,background:colores[i%colores.length],borderRadius:4}}/>
                        </div>
                      </div>
                    );
                  })}</>
                }
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ─── VISTA COCINA ────────────────────────────────────────────────────── */
function VistaCocina(){
  const [pedidos,setPedidos]=useState([]);
  const [tick,setTick]=useState(new Date());
  const intervalRef=useRef(null);

  const cargarPedidos=useCallback(async()=>{
    try{
      const data=await API.pedidos.getAll({estado:""});
      // Solo mostrar pedidos activos en cocina
      setPedidos(data.filter(p=>["nuevo","en preparación","listo"].includes(p.estado)));
    }catch(e){console.error("[cocina]",e.message);}
  },[]);

  useEffect(()=>{
    cargarPedidos();
    // Polling cada 10 segundos
    intervalRef.current=setInterval(cargarPedidos,10000);
    const tick=setInterval(()=>setTick(new Date()),1000);
    return()=>{clearInterval(intervalRef.current);clearInterval(tick);};
  },[]);

  const avanzar=async id=>{
    const p=pedidos.find(x=>x.id===id);
    if(!p) return;
    const idx=ESTADOS_COCINA.indexOf(p.estado);
    const nuevoEstado=ESTADOS_COCINA[Math.min(idx+1,ESTADOS_COCINA.length-1)];
    try{
      await API.pedidos.setEstado(id,nuevoEstado);
      setPedidos(prev=>prev.map(x=>x.id===id?{...x,estado:nuevoEstado}:x)
        .filter(x=>["nuevo","en preparación","listo"].includes(x.estado)));
    }catch(e){console.error("[cocina/avanzar]",e.message);}
  };

  const mins=createdAt=>{
    const ref=new Date(createdAt);
    return Math.max(0,Math.floor((tick-ref)/60000));
  };

  const cols=[
    {estado:"nuevo",          label:"Nuevos",         dot:"#FF6B6B",btnLabel:"Iniciar",     btnBg:C.dorado,       btnColor:C.bordoOscuro},
    {estado:"en preparación", label:"En preparación", dot:"#FFC107",btnLabel:"Marcar listo",btnBg:"#4CAF50",      btnColor:"#fff"},
    {estado:"listo",          label:"Listos",         dot:"#4CAF50",btnLabel:null,           btnBg:null,           btnColor:null},
  ];

  return(
    <div className="page" style={{background:"#120709",paddingTop:56,minHeight:"100vh"}}>
      <div style={{background:"#1E0C14",borderBottom:"1px solid rgba(255,255,255,.07)",padding:"11px 20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{display:"flex",alignItems:"center",gap:4,background:"rgba(76,175,80,.12)",borderRadius:20,padding:"4px 10px"}}>
            {Ico.live}<span style={{color:"#4CAF50",fontSize:11,fontWeight:700,letterSpacing:.6}}>EN VIVO</span>
          </span>
          <span style={{color:"rgba(255,255,255,.3)",fontSize:12}}>{pedidos.length} activos · actualiza cada 10s</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <button onClick={cargarPedidos} style={{background:"none",border:"1px solid rgba(255,255,255,.15)",color:"rgba(255,255,255,.5)",borderRadius:6,padding:"4px 10px",cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",gap:5,fontFamily:"'DM Sans',sans-serif"}}>{Ico.refresh} Actualizar</button>
          <p style={{color:"rgba(255,255,255,.55)",fontSize:13,fontFamily:"monospace"}}>{tick.toLocaleTimeString("es-AR",{hour:"2-digit",minute:"2-digit",second:"2-digit"})}</p>
        </div>
      </div>
      <div className="cocina-cols" style={{display:"flex",height:"calc(100vh - 115px)",overflow:"hidden"}}>
        {cols.map(col=>{
          const list=pedidos.filter(p=>p.estado===col.estado);
          return(
            <div key={col.estado} className="cocina-col" style={{flex:1}}>
              <div style={{padding:"12px 16px",borderBottom:"1px solid rgba(255,255,255,.07)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{width:8,height:8,borderRadius:"50%",background:col.dot,display:"inline-block",flexShrink:0}}/>
                  <span style={{color:C.blanco,fontWeight:600,fontSize:13}}>{col.label}</span>
                </div>
                <span style={{background:"rgba(255,255,255,.08)",color:"rgba(255,255,255,.5)",fontSize:11,fontWeight:700,padding:"2px 8px",borderRadius:20}}>{list.length}</span>
              </div>
              <div className="cocina-cards">
                {list.length===0&&<div style={{textAlign:"center",padding:"32px 16px",color:"rgba(255,255,255,.15)",fontSize:13}}>Sin pedidos</div>}
                {list.map(p=>{
                  const m=mins(p.created_at);
                  const urgente=col.estado==="en preparación"&&m>=10;
                  const items=Array.isArray(p.items)?p.items:[];
                  return(
                    <div key={p.id} style={{background:urgente?"#3A0F00":"#1E0C14",border:`1px solid ${urgente?"rgba(255,100,50,.4)":"rgba(255,255,255,.07)"}`,borderRadius:12,overflow:"hidden"}}>
                      <div style={{padding:"11px 14px",borderBottom:"1px solid rgba(255,255,255,.06)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <div style={{display:"flex",alignItems:"center",gap:8}}>
                          <span style={{color:C.blanco,fontWeight:700,fontSize:15}}>{p.numero}</span>
                          {urgente&&<span style={{display:"flex",alignItems:"center",gap:3,color:"#FF6B6B",fontSize:11,fontWeight:700}}>{Ico.alert} Demorado</span>}
                        </div>
                        <div style={{display:"flex",alignItems:"center",gap:6,color:m>=10?"#FF6B6B":m>=5?"#FFC107":"#4CAF50"}}>
                          {Ico.clock}<span style={{fontSize:13,fontWeight:700}}>{m}min</span>
                        </div>
                      </div>
                      <div style={{padding:"12px 14px"}}>
                        {items.map((it,i)=>(
                          <div key={i} style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                            <span style={{color:"rgba(255,255,255,.85)",fontSize:14}}>{it.nombre}</span>
                            <span style={{color:C.dorado,fontWeight:700,fontSize:14}}>×{it.cantidad}</span>
                          </div>
                        ))}
                        <div style={{display:"flex",gap:6,marginTop:10,flexWrap:"wrap"}}>
                          <span style={{fontSize:11,background:"rgba(255,255,255,.08)",color:"rgba(255,255,255,.5)",padding:"2px 8px",borderRadius:20}}>{p.modo_entrega==="takeaway"?"Take away":"Delivery"}</span>
                          <span style={{fontSize:11,background:"rgba(255,255,255,.08)",color:"rgba(255,255,255,.5)",padding:"2px 8px",borderRadius:20,textTransform:"capitalize"}}>{p.modo_pago}</span>
                        </div>
                      </div>
                      {col.btnLabel&&(
                        <div style={{padding:"10px 14px",borderTop:"1px solid rgba(255,255,255,.06)"}}>
                          <button onClick={()=>avanzar(p.id)} style={{width:"100%",background:col.btnBg,color:col.btnColor,border:"none",borderRadius:8,padding:"9px",fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
                            {col.estado==="nuevo"?Ico.arrow:Ico.check}{col.btnLabel}
                          </button>
                        </div>
                      )}
                      {col.estado==="listo"&&(
                        <div style={{padding:"10px 14px",borderTop:"1px solid rgba(255,255,255,.06)",display:"flex",alignItems:"center",justifyContent:"center",gap:6,color:"#4CAF50",fontSize:13,fontWeight:600}}>
                          {Ico.check} Listo para entregar
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── APP ROOT ────────────────────────────────────────────────────────── */
export default function App(){
  const [user,setUser]=useState(()=>{
    const t=localStorage.getItem("bm_token");
    if(!t) return null;
    try{
      const payload=JSON.parse(atob(t.split(".")[1]));
      if(payload.exp*1000<Date.now()){localStorage.removeItem("bm_token");return null;}
      return{rol:payload.rol,nombre:payload.nombre};
    }catch{localStorage.removeItem("bm_token");return null;}
  });
  const [vista,setVista]=useState(null);

  const login=useCallback(u=>{setUser(u);setVista(TABS_POR_ROL[u.rol][0].id);},[]);
  const logout=()=>{localStorage.removeItem("bm_token");setUser(null);setVista(null);};

  useEffect(()=>{
    if(user&&!vista) setVista(TABS_POR_ROL[user.rol][0].id);
  },[user]);

  if(!user) return <><style>{CSS}</style><Login onLogin={login}/></>;

  const tabs=TABS_POR_ROL[user.rol];
  const rolCfg=ROLES[user.rol];

  return(
    <>
      <style>{CSS}</style>
      <nav className="nav">
        <div className="nav-logo">Burger Must <em>Selection</em></div>
        <div className="nav-center">
          {user.rol!=="cocina"&&tabs.map(t=>(
            <button key={t.id} className={`nav-tab${vista===t.id?" active":""}`} onClick={()=>setVista(t.id)}>
              <span style={{display:"flex",opacity:.7}}>{Ico[t.ico]}</span>{t.label}
            </button>
          ))}
          {user.rol==="cocina"&&<span style={{color:"rgba(255,255,255,.4)",fontSize:13}}>Pantalla de cocina</span>}
        </div>
        <div className="nav-right">
          <div className="role-pill">
            <span className="role-dot" style={{background:rolCfg.color}}/>
            <span className="role-label" style={{color:C.blanco,fontWeight:500}}>{user.nombre||rolCfg.label}</span>
          </div>
          <button className="btn-logout" onClick={logout}>{Ico.logout} <span>Salir</span></button>
        </div>
      </nav>
      {user.rol!=="cocina"&&(
        <nav className="bottom-nav">
          <div className="bottom-nav-inner">
            {tabs.map(t=>(
              <button key={t.id} className={`bnav-btn${vista===t.id?" active":""}`} onClick={()=>setVista(t.id)}>
                <span className="bnav-ico">{Ico[t.ico]}</span><span>{t.label}</span>
              </button>
            ))}
          </div>
        </nav>
      )}
      {vista==="menu"     &&<MenuDigital/>}
      {vista==="tienda"   &&<TiendaOnline/>}
      {vista==="admin"    &&<PanelAdmin/>}
      {vista==="finanzas" &&<Finanzas/>}
      {vista==="cocina"   &&<VistaCocina/>}
    </>
  );
}
