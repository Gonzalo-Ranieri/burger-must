import { useState, useEffect, useCallback } from "react";

/* ─── TOKENS ──────────────────────────────────────────────────────────── */
const C = {
  bordoOscuro: "#3D1A2E", bordoMedio: "#6B2D4E",
  crema: "#F7F4F0", dorado: "#C9A96E", doradoOscuro: "#A07840",
  blanco: "#FFFFFF", grisClaro: "#E8E3DC", grisMedio: "#B8B0A6", texto: "#1A0A12",
};

/* ─── ÍCONOS SVG (stroke, 16×16, sin emojis) ─────────────────────────── */
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
};

/* ─── ROLES ───────────────────────────────────────────────────────────── */
const ROLES = {
  cliente: { label: "Cliente",       ico: "cliente",  color: C.bordoMedio,  desc: "Menú y tienda online" },
  admin:   { label: "Administrador", ico: "admin",    color: C.bordoOscuro, desc: "Acceso completo al sistema" },
  cocina:  { label: "Cocina",        ico: "cocina",   color: "#7B4F00",     desc: "Pedidos en tiempo real" },
};

const TABS_POR_ROL = {
  cliente: [{ id:"menu", label:"Menú", ico:"menu" }, { id:"tienda", label:"Tienda", ico:"tienda" }],
  admin:   [{ id:"menu", label:"Menú", ico:"menu" }, { id:"tienda", label:"Tienda", ico:"tienda" }, { id:"admin", label:"Administración", ico:"admin" }, { id:"finanzas", label:"Finanzas", ico:"finanzas" }],
  cocina:  [{ id:"cocina", label:"Cocina", ico:"cocina" }],
};

/* ─── DATOS ───────────────────────────────────────────────────────────── */
const MENU_DATA = [
  { id:1,  categoria:"Burgers",         nombre:"Crispy",         precio:17300, descripcion:"Wagyu 110g · Triple cheddar · Cebolla morada · Bacon · Salsa Ember", badge:"Más pedida" },
  { id:2,  categoria:"Burgers",         nombre:"Cheesy",         precio:16000, descripcion:"Wagyu 110g · Triple queso cheddar", badge:null },
  { id:3,  categoria:"Burgers",         nombre:"Classic",        precio:16500, descripcion:"Wagyu 110g · Triple cheddar · Cebolla morada · Lechuga · Tomate · Salsa Pickled", badge:null },
  { id:4,  categoria:"The Box",         nombre:"The Box",        precio:38000, descripcion:"Classic + Cheesy + Crispy · Papas fritas · 2 salsas a elección", badge:"Para compartir" },
  { id:5,  categoria:"Acompañamientos", nombre:"Papas fritas",   precio:6000,  descripcion:"Papas fritas crocantes", badge:null },
  { id:6,  categoria:"Acompañamientos", nombre:"Aros de cebolla",precio:6500,  descripcion:"Cebolla rebozada y frita", badge:null },
  { id:7,  categoria:"Acompañamientos", nombre:"Nuggets",        precio:6500,  descripcion:"Nuggets de pollo crujientes", badge:null },
  { id:8,  categoria:"Acompañamientos", nombre:"Boniatos",       precio:7500,  descripcion:"Bastones de boniato asado", badge:null },
  { id:9,  categoria:"Bebidas",         nombre:"Agua",           precio:4500,  descripcion:"Agua mineral", badge:null },
  { id:10, categoria:"Bebidas",         nombre:"Coca Cola",      precio:4500,  descripcion:"355ml", badge:null },
  { id:11, categoria:"Bebidas",         nombre:"Coca Cola Zero", precio:4500,  descripcion:"355ml", badge:null },
  { id:12, categoria:"Bebidas",         nombre:"Soda Estambul",  precio:4500,  descripcion:"Soda artesanal", badge:null },
];

const PEDIDOS_SEED = [
  { id:"#0039", hora:"12:48", items:[{nombre:"Classic",qty:1},{nombre:"Aros de cebolla",qty:1}], total:23000, estado:"listo",          modo:"Online",   entrega:"takeaway" },
  { id:"#0040", hora:"13:05", items:[{nombre:"The Box",qty:1},{nombre:"Coca Cola",qty:1}],        total:42500, estado:"en preparación", modo:"Efectivo", entrega:"takeaway" },
  { id:"#0041", hora:"13:22", items:[{nombre:"Crispy",qty:2},{nombre:"Papas fritas",qty:1}],      total:40600, estado:"nuevo",          modo:"Online",   entrega:"delivery" },
];

const ESTADOS_COCINA = ["nuevo","en preparación","listo"];
const fmt  = n => `$${n.toLocaleString("es-AR")}`;
const ahora = () => { const d = new Date(); return `${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`; };

/* ─── HOOK RESPONSIVE ─────────────────────────────────────────────────── */
function useIsMobile(bp = 768) {
  const [mob, setMob] = useState(typeof window !== "undefined" ? window.innerWidth < bp : false);
  useEffect(() => {
    const fn = () => setMob(window.innerWidth < bp);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, [bp]);
  return mob;
}

/* ─── CSS ─────────────────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=DM+Sans:wght@300;400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{font-size:16px}
body{font-family:'DM Sans',sans-serif;background:#F7F4F0;color:#1A0A12;-webkit-font-smoothing:antialiased}
::-webkit-scrollbar{width:5px;height:5px}::-webkit-scrollbar-track{background:#E8E3DC}::-webkit-scrollbar-thumb{background:#6B2D4E;border-radius:3px}
.cav{font-family:'Caveat',cursive}
.badge{display:inline-block;background:#C9A96E;color:#3D1A2E;font-size:10px;font-weight:700;padding:2px 9px;border-radius:20px;letter-spacing:.4px}

/* NAV */
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

/* BOTTOM NAV MOBILE */
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

/* BUTTONS */
.btn-p{display:inline-flex;align-items:center;gap:6px;background:#3D1A2E;color:#fff;border:none;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;padding:9px 18px;border-radius:8px;cursor:pointer;transition:background .18s}
.btn-p:hover{background:#6B2D4E}
.btn-o{display:inline-flex;align-items:center;gap:6px;background:none;color:#3D1A2E;border:1.5px solid #3D1A2E;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;padding:8px 16px;border-radius:8px;cursor:pointer;transition:all .18s}
.btn-o:hover{background:#3D1A2E;color:#fff}
.btn-g{display:inline-flex;align-items:center;gap:6px;background:#C9A96E;color:#3D1A2E;border:none;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:600;padding:12px 22px;border-radius:8px;cursor:pointer;transition:background .18s}
.btn-g:hover{background:#A07840;color:#fff}
.btn-danger{display:inline-flex;align-items:center;gap:5px;background:none;border:1.5px solid #e0c0c0;color:#9a2a2a;font-family:'DM Sans',sans-serif;font-size:12px;padding:6px 12px;border-radius:7px;cursor:pointer;transition:all .18s}
.btn-danger:hover{background:#fdf0f0;border-color:#c53030}
input,select,textarea{font-family:'DM Sans',sans-serif}
.field-label{font-size:11px;font-weight:600;color:#1A0A12;display:block;margin-bottom:4px}
.field-input{width:100%;padding:8px 11px;border-radius:7px;border:1.5px solid #E8E3DC;font-size:14px;background:#F7F4F0;color:#1A0A12;outline:none;transition:border-color .15s}
.field-input:focus{border-color:#6B2D4E}

/* GRIDS */
.menu-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:16px}
@media(max-width:480px){.menu-grid{grid-template-columns:1fr}}
.kpi-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:24px}
@media(max-width:900px){.kpi-grid{grid-template-columns:repeat(2,1fr)}}
.charts-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px}
@media(max-width:768px){.charts-grid{grid-template-columns:1fr}}
.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px}
@media(max-width:480px){.form-grid{grid-template-columns:1fr}}

/* TIENDA */
.tienda-layout{display:flex;gap:24px;padding:24px;max-width:1100px;margin:0 auto;align-items:flex-start}
.tienda-productos{flex:1;min-width:0}
.tienda-carrito-desktop{width:290px;flex-shrink:0;position:sticky;top:72px}
@media(max-width:768px){
  .tienda-layout{flex-direction:column;padding:16px;gap:0}
  .tienda-carrito-desktop{display:none}
}
.carrito-mobile-bar{display:none}
@media(max-width:768px){
  .carrito-mobile-bar{display:flex;position:fixed;bottom:58px;left:0;right:0;z-index:150;background:#3D1A2E;padding:10px 16px;align-items:center;justify-content:space-between;border-top:1px solid rgba(255,255,255,.1)}
}
.table-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch}
table{width:100%;border-collapse:collapse;min-width:520px}

/* COCINA */
.cocina-col{border-right:1px solid rgba(255,255,255,.06);display:flex;flex-direction:column}
.cocina-cards{flex:1;padding:12px;display:flex;flex-direction:column;gap:10px;overflow-y:auto}
@media(max-width:700px){
  .cocina-cols{flex-direction:column!important}
  .cocina-col{border-right:none;border-bottom:1px solid rgba(255,255,255,.06)}
}

/* LOGIN */
.login-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;background:#3D1A2E;padding:20px}
.login-card{background:#fff;border-radius:20px;padding:40px 36px;width:100%;max-width:400px}
.role-btn{width:100%;background:none;border:1.5px solid #E8E3DC;border-radius:12px;padding:14px 16px;cursor:pointer;text-align:left;transition:all .2s;display:flex;align-items:center;gap:14px;margin-bottom:10px;font-family:'DM Sans',sans-serif}
.role-btn:hover{border-color:#6B2D4E;background:#FBF9F8}
.role-btn.selected{border-color:#3D1A2E;background:#FBF9F8;box-shadow:0 0 0 3px rgba(61,26,46,.07)}

/* ADMIN UNIFIED */
.admin-section{margin-bottom:32px}
.admin-section-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid #E8E3DC}
`;

/* ─── SHARED ──────────────────────────────────────────────────────────── */
function Card({ children, style = {} }) {
  return <div style={{ background:C.blanco, borderRadius:12, border:`1px solid ${C.grisClaro}`, ...style }}>{children}</div>;
}

/* ─── LOGIN ───────────────────────────────────────────────────────────── */
function Login({ onLogin }) {
  const [rol, setRol] = useState(null);
  return (
    <div className="login-wrap">
      <div className="login-card">
        <div style={{ textAlign:"center", marginBottom:28 }}>
          <div style={{ width:44, height:44, background:C.bordoOscuro, borderRadius:10, margin:"0 auto 12px", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="8" r="3"/><path d="M5 19 C5 15.5 7.5 13 11 13 C14.5 13 17 15.5 17 19"/>
            </svg>
          </div>
          <p className="cav" style={{ fontSize:32, color:C.bordoOscuro, lineHeight:1 }}>Burger Must</p>
          <p style={{ color:C.grisMedio, fontSize:13, marginTop:3 }}>Selection · Bella Vista</p>
        </div>
        <p style={{ fontSize:12, fontWeight:600, color:C.grisMedio, marginBottom:12, letterSpacing:.5 }}>INGRESÁ COMO</p>
        {Object.entries(ROLES).map(([key, r]) => (
          <button key={key} className={`role-btn${rol===key?" selected":""}`} onClick={() => setRol(key)}>
            <span style={{ width:38, height:38, borderRadius:9, background:r.color, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, color:C.dorado }}>
              {Ico[r.ico]}
            </span>
            <div style={{ flex:1 }}>
              <p style={{ fontWeight:600, fontSize:14, color:C.texto, marginBottom:1 }}>{r.label}</p>
              <p style={{ fontSize:12, color:C.grisMedio }}>{r.desc}</p>
            </div>
            {rol===key && <span style={{ color:C.bordoOscuro, display:"flex" }}>{Ico.check}</span>}
          </button>
        ))}
        <button
          className="btn-g"
          style={{ width:"100%", marginTop:4, justifyContent:"center", opacity:rol?1:.45, cursor:rol?"pointer":"default", fontSize:15 }}
          onClick={() => rol && onLogin(rol)}
          disabled={!rol}
        >
          Ingresar {rol && <span style={{ display:"flex" }}>{Ico.arrow}</span>}
        </button>
        <p style={{ fontSize:11, color:C.grisMedio, textAlign:"center", marginTop:14 }}>Demo sin contraseña · En producción usará JWT</p>
      </div>
    </div>
  );
}

/* ─── MENÚ DIGITAL ────────────────────────────────────────────────────── */
function MenuDigital() {
  const [cat, setCat] = useState("Todas");
  const cats = ["Todas","Burgers","The Box","Acompañamientos","Bebidas"];
  const items = cat==="Todas" ? MENU_DATA : MENU_DATA.filter(i => i.categoria===cat);
  return (
    <div className="page" style={{ background:C.crema, paddingTop:56 }}>
      <div style={{ background:C.bordoOscuro, padding:"48px 20px 40px", textAlign:"center" }}>
        <p style={{ color:C.dorado, fontSize:11, fontWeight:600, letterSpacing:2.5, marginBottom:10 }}>BELLA VISTA · FRANCIA Y MOINE</p>
        <h1 className="cav" style={{ color:C.blanco, fontSize:"clamp(32px,6vw,52px)", lineHeight:1.05, marginBottom:10 }}>
          La hamburguesa<br /><span style={{ color:C.dorado }}>es el punto de partida.</span>
        </h1>
        <p style={{ color:C.grisMedio, fontSize:13, marginTop:12 }}>Carne estilo Wagyu · Ingredientes seleccionados</p>
      </div>
      <div style={{ background:C.blanco, borderBottom:`1px solid ${C.grisClaro}`, display:"flex", overflowX:"auto", padding:"0 8px" }}>
        {cats.map(c => (
          <button key={c} onClick={() => setCat(c)} style={{
            background:"none", border:"none", fontFamily:"'DM Sans',sans-serif",
            fontSize:14, fontWeight:cat===c?600:400,
            color:cat===c?C.bordoOscuro:C.grisMedio,
            borderBottom:cat===c?`2px solid ${C.bordoOscuro}`:"2px solid transparent",
            padding:"13px 14px", cursor:"pointer", whiteSpace:"nowrap", flexShrink:0, transition:"all .18s",
          }}>{c}</button>
        ))}
      </div>
      <div style={{ maxWidth:960, margin:"0 auto", padding:"24px 16px" }}>
        <div className="menu-grid">
          {items.map(item => (
            <div key={item.id} style={{ background:C.blanco, borderRadius:12, overflow:"hidden", border:`1px solid ${C.grisClaro}` }}>
              <div style={{ background:`linear-gradient(135deg,${C.bordoOscuro},${C.bordoMedio})`, height:120, display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" opacity=".14" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round">
                  <ellipse cx="24" cy="22" rx="16" ry="6"/><path d="M8 22 C8 30 16 34 24 34 C32 34 40 30 40 22"/><rect x="10" y="34" width="28" height="4" rx="2"/>
                </svg>
                {item.badge && <span className="badge" style={{ position:"absolute", top:10, left:10 }}>{item.badge}</span>}
                <span style={{ position:"absolute", top:10, right:10, background:"rgba(0,0,0,.35)", color:C.dorado, fontSize:10, fontWeight:600, padding:"2px 8px", borderRadius:20 }}>{item.categoria}</span>
              </div>
              <div style={{ padding:"14px 16px 18px" }}>
                <h3 className="cav" style={{ fontSize:24, color:C.bordoOscuro, marginBottom:4 }}>{item.nombre}</h3>
                <p style={{ fontSize:12, color:C.grisMedio, lineHeight:1.5, marginBottom:12, minHeight:36 }}>{item.descripcion}</p>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontWeight:700, fontSize:18, color:C.bordoOscuro }}>{fmt(item.precio)}</span>
                  <span style={{ fontSize:11, color:C.grisMedio }}>Take away · Delivery</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background:C.bordoOscuro, padding:"28px 20px", textAlign:"center" }}>
        <p className="cav" style={{ color:C.blanco, fontSize:26, marginBottom:2 }}>Burger Must</p>
        <p style={{ color:C.grisMedio, fontSize:12 }}>Selection · Bella Vista</p>
      </div>
    </div>
  );
}

/* ─── TIENDA ONLINE ───────────────────────────────────────────────────── */
function TiendaOnline({ onNuevoPedido }) {
  const mob = useIsMobile();
  const [carrito, setCarrito] = useState([]);
  const [verCarrito, setVerCarrito] = useState(false);
  const [modal, setModal] = useState(false);
  const [modoPago, setModoPago] = useState("online");
  const [modoEntrega, setModoEntrega] = useState("takeaway");
  const [ok, setOk] = useState(false);

  const agregar = item => setCarrito(c => { const ex=c.find(x=>x.id===item.id); return ex?c.map(x=>x.id===item.id?{...x,qty:x.qty+1}:x):[...c,{...item,qty:1}]; });
  const quitar  = id  => setCarrito(c => { const ex=c.find(x=>x.id===id); return ex?.qty===1?c.filter(x=>x.id!==id):c.map(x=>x.id===id?{...x,qty:x.qty-1}:x); });
  const total = carrito.reduce((s,x)=>s+x.precio*x.qty,0);
  const cant  = carrito.reduce((s,x)=>s+x.qty,0);

  const confirmar = () => {
    onNuevoPedido({ id:`#${String(Math.floor(Math.random()*9000)+1000)}`, hora:ahora(), items:carrito.map(x=>({nombre:x.nombre,qty:x.qty})), total, estado:"nuevo", modo:modoPago==="online"?"Online":"Efectivo", entrega:modoEntrega });
    setOk(true); setCarrito([]); setModal(false); setVerCarrito(false);
  };

  const grupos = [
    ["Burgers", MENU_DATA.filter(i=>["Burgers","The Box"].includes(i.categoria))],
    ["Acompañamientos", MENU_DATA.filter(i=>i.categoria==="Acompañamientos")],
    ["Bebidas", MENU_DATA.filter(i=>i.categoria==="Bebidas")],
  ];

  const SelBtn = ({ activo, onClick, children }) => (
    <button onClick={onClick} style={{ flex:1, padding:"10px 8px", borderRadius:8, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontWeight:500, fontSize:13, background:activo?C.bordoOscuro:C.blanco, color:activo?C.blanco:C.texto, border:`1.5px solid ${activo?C.bordoOscuro:C.grisClaro}`, transition:"all .15s" }}>{children}</button>
  );

  const CarritoPanel = () => (
    <div style={{ background:C.blanco, borderRadius:14, border:`1px solid ${C.grisClaro}`, overflow:"hidden" }}>
      <div style={{ background:C.bordoOscuro, padding:"14px 18px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <h3 className="cav" style={{ color:C.blanco, fontSize:22 }}>Tu pedido</h3>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          {cant>0 && <span style={{ background:C.dorado, color:C.bordoOscuro, borderRadius:"50%", width:22, height:22, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:12 }}>{cant}</span>}
          {mob && <button onClick={()=>setVerCarrito(false)} style={{ background:"none", border:"none", color:C.grisMedio, cursor:"pointer", display:"flex" }}>{Ico.close}</button>}
        </div>
      </div>
      <div style={{ padding:"16px 18px" }}>
        {carrito.length===0
          ? <p style={{ color:C.grisMedio, fontSize:14, textAlign:"center", padding:"20px 0" }}>El carrito está vacío</p>
          : <>
            {carrito.map(x=>(
              <div key={x.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10, fontSize:14 }}>
                <div><span style={{ fontWeight:500 }}>{x.nombre}</span><span style={{ color:C.grisMedio, marginLeft:5 }}>×{x.qty}</span></div>
                <span style={{ fontWeight:600, color:C.bordoOscuro }}>{fmt(x.precio*x.qty)}</span>
              </div>
            ))}
            <div style={{ borderTop:`1px solid ${C.grisClaro}`, paddingTop:12, marginTop:4, display:"flex", justifyContent:"space-between", fontWeight:700, fontSize:17, marginBottom:16 }}>
              <span>Total</span><span style={{ color:C.bordoOscuro }}>{fmt(total)}</span>
            </div>
            <button className="btn-g" style={{ width:"100%", justifyContent:"center" }} onClick={()=>{ setVerCarrito(false); setModal(true); }}>Confirmar pedido</button>
          </>
        }
      </div>
    </div>
  );

  return (
    <div className="page" style={{ background:C.crema, paddingTop:56 }}>
      {ok && (
        <div style={{ position:"fixed", inset:0, background:"rgba(61,26,46,.85)", zIndex:400, display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
          <div style={{ background:C.blanco, borderRadius:16, padding:"44px 36px", textAlign:"center", maxWidth:320, width:"100%" }}>
            <div style={{ width:52, height:52, borderRadius:"50%", background:"#e8f5e9", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px", color:"#2e7d32" }}>{Ico.check}</div>
            <h2 className="cav" style={{ fontSize:32, color:C.bordoOscuro, marginBottom:8 }}>Pedido confirmado</h2>
            <p style={{ color:C.grisMedio, marginBottom:24 }}>Ya está en cocina. Te avisamos cuando esté listo.</p>
            <button className="btn-p" style={{ justifyContent:"center" }} onClick={()=>setOk(false)}>Hacer otro pedido</button>
          </div>
        </div>
      )}
      {modal && (
        <div style={{ position:"fixed", inset:0, background:"rgba(61,26,46,.75)", zIndex:300, display:"flex", alignItems:mob?"flex-end":"center", justifyContent:"center", padding:mob?0:24 }}>
          <div style={{ background:C.blanco, borderRadius:mob?"16px 16px 0 0":16, padding:"28px 24px", width:"100%", maxWidth:420, maxHeight:mob?"90vh":"auto", overflowY:"auto" }}>
            <h2 className="cav" style={{ fontSize:28, color:C.bordoOscuro, marginBottom:20 }}>Confirmar pedido</h2>
            <p style={{ fontSize:11, fontWeight:600, color:C.grisMedio, letterSpacing:.5, marginBottom:8 }}>ENTREGA</p>
            <div style={{ display:"flex", gap:8, marginBottom:18 }}>
              <SelBtn activo={modoEntrega==="takeaway"} onClick={()=>setModoEntrega("takeaway")}>Take away</SelBtn>
              <SelBtn activo={modoEntrega==="delivery"} onClick={()=>setModoEntrega("delivery")}>Delivery</SelBtn>
            </div>
            <p style={{ fontSize:11, fontWeight:600, color:C.grisMedio, letterSpacing:.5, marginBottom:8 }}>PAGO</p>
            <div style={{ display:"flex", gap:8, marginBottom:20 }}>
              <SelBtn activo={modoPago==="online"}   onClick={()=>setModoPago("online")}>MercadoPago</SelBtn>
              <SelBtn activo={modoPago==="efectivo"} onClick={()=>setModoPago("efectivo")}>Efectivo</SelBtn>
            </div>
            <div style={{ borderTop:`1px solid ${C.grisClaro}`, paddingTop:14, marginBottom:18 }}>
              {carrito.map(x=>(
                <div key={x.id} style={{ display:"flex", justifyContent:"space-between", marginBottom:6, fontSize:14 }}>
                  <span>{x.qty}× {x.nombre}</span><span style={{ fontWeight:600, color:C.bordoOscuro }}>{fmt(x.precio*x.qty)}</span>
                </div>
              ))}
              <div style={{ display:"flex", justifyContent:"space-between", marginTop:10, paddingTop:10, borderTop:`1px solid ${C.grisClaro}`, fontWeight:700, fontSize:17 }}>
                <span>Total</span><span style={{ color:C.bordoOscuro }}>{fmt(total)}</span>
              </div>
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <button className="btn-o" onClick={()=>setModal(false)} style={{ flex:1, justifyContent:"center" }}>Volver</button>
              <button className="btn-g" onClick={confirmar} style={{ flex:2, justifyContent:"center" }}>Confirmar</button>
            </div>
          </div>
        </div>
      )}
      {mob && verCarrito && (
        <div style={{ position:"fixed", inset:0, zIndex:250, background:"rgba(61,26,46,.6)" }} onClick={()=>setVerCarrito(false)}>
          <div style={{ position:"absolute", bottom:58, left:0, right:0, maxHeight:"75vh", overflowY:"auto", background:C.blanco, borderRadius:"16px 16px 0 0" }} onClick={e=>e.stopPropagation()}>
            <CarritoPanel />
          </div>
        </div>
      )}
      <div className="tienda-layout">
        <div className="tienda-productos">
          <h1 className="cav" style={{ fontSize:"clamp(28px,5vw,38px)", color:C.bordoOscuro, marginBottom:24 }}>Hacé tu pedido</h1>
          {grupos.map(([titulo, items]) => (
            <div key={titulo} style={{ marginBottom:28 }}>
              <h2 className="cav" style={{ fontSize:24, color:C.bordoOscuro, marginBottom:12, paddingBottom:8, borderBottom:`1px solid ${C.grisClaro}` }}>{titulo}</h2>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {items.map(item => {
                  const en = carrito.find(x=>x.id===item.id);
                  return (
                    <Card key={item.id} style={{ padding:"12px 14px", display:"flex", justifyContent:"space-between", alignItems:"center", gap:12 }}>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:3, flexWrap:"wrap" }}>
                          <span style={{ fontWeight:600, fontSize:15, color:C.texto }}>{item.nombre}</span>
                          {item.badge && <span className="badge">{item.badge}</span>}
                        </div>
                        <p style={{ fontSize:12, color:C.grisMedio, lineHeight:1.4 }}>{item.descripcion}</p>
                      </div>
                      <div style={{ display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>
                        <span style={{ fontWeight:700, color:C.bordoOscuro, fontSize:15, minWidth:62, textAlign:"right" }}>{fmt(item.precio)}</span>
                        {en ? (
                          <div style={{ display:"flex", alignItems:"center", gap:6, background:C.bordoOscuro, borderRadius:8, padding:"5px 10px" }}>
                            <button onClick={()=>quitar(item.id)} style={{ background:"none", border:"none", color:C.blanco, fontSize:16, cursor:"pointer", lineHeight:1, width:18 }}>−</button>
                            <span style={{ color:C.blanco, fontWeight:600, minWidth:14, textAlign:"center", fontSize:14 }}>{en.qty}</span>
                            <button onClick={()=>agregar(item)} style={{ background:"none", border:"none", color:C.dorado, fontSize:16, cursor:"pointer", lineHeight:1, width:18 }}>+</button>
                          </div>
                        ) : (
                          <button className="btn-p" style={{ padding:"7px 14px", fontSize:13 }} onClick={()=>agregar(item)}>Agregar</button>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="tienda-carrito-desktop"><CarritoPanel /></div>
      </div>
      <div className="carrito-mobile-bar">
        <div>
          <p style={{ color:C.blanco, fontWeight:600, fontSize:14 }}>{cant>0?`${cant} producto${cant>1?"s":""}`:"Carrito vacío"}</p>
          {cant>0 && <p style={{ color:C.dorado, fontSize:12 }}>{fmt(total)}</p>}
        </div>
        <button className="btn-g" style={{ padding:"9px 18px", fontSize:13 }} onClick={()=>cant>0&&setVerCarrito(true)} disabled={cant===0}>Ver pedido</button>
      </div>
    </div>
  );
}

/* ─── PANEL ADMIN UNIFICADO ───────────────────────────────────────────── */
function PanelAdmin({ pedidos }) {
  const [items, setItems]     = useState(MENU_DATA.map(i=>({...i})));
  const [editando, setEditando] = useState(null);
  const [form, setForm]       = useState({});
  const [agregando, setAgregando] = useState(false);
  const [nuevo, setNuevo]     = useState({ nombre:"", categoria:"Burgers", precio:"", descripcion:"", badge:"" });
  const [flash, setFlash]     = useState(false);
  const cats = ["Burgers","The Box","Acompañamientos","Bebidas"];

  const editar  = item => { setEditando(item.id); setForm({...item}); setAgregando(false); };
  const guardar = () => { setItems(p=>p.map(i=>i.id===editando?{...form,precio:Number(form.precio)}:i)); setEditando(null); setFlash(true); setTimeout(()=>setFlash(false),2200); };
  const eliminar = id => { if(window.confirm("¿Eliminar este producto del menú?")) setItems(p=>p.filter(i=>i.id!==id)); };
  const agregar  = () => {
    if(!nuevo.nombre||!nuevo.precio) return;
    setItems(p=>[...p,{...nuevo,id:Date.now(),precio:Number(nuevo.precio),badge:nuevo.badge||null}]);
    setAgregando(false); setNuevo({nombre:"",categoria:"Burgers",precio:"",descripcion:"",badge:""});
    setFlash(true); setTimeout(()=>setFlash(false),2200);
  };

  const Field = ({ label, full=false, children }) => (
    <div style={full?{gridColumn:"1/-1"}:{}}><label className="field-label">{label}</label>{children}</div>
  );

  const ventasHoy  = pedidos.reduce((s,p)=>s+p.total,0);
  const ticketProm = pedidos.length ? Math.round(ventasHoy/pedidos.length) : 0;

  return (
    <div className="page" style={{ background:C.crema, paddingTop:56 }}>
      <div style={{ maxWidth:1000, margin:"0 auto", padding:"28px 24px" }}>

        {/* Encabezado */}
        <div style={{ marginBottom:32 }}>
          <h1 className="cav" style={{ fontSize:"clamp(26px,4vw,36px)", color:C.bordoOscuro, marginBottom:2 }}>Administración</h1>
          <p style={{ color:C.grisMedio, fontSize:13 }}>Burger Must Selection · Bella Vista</p>
        </div>

        {/* ── RESUMEN RÁPIDO ── */}
        <div className="admin-section">
          <div className="admin-section-header">
            <h2 className="cav" style={{ fontSize:22, color:C.bordoOscuro }}>Resumen del día</h2>
            <span style={{ fontSize:12, color:C.grisMedio }}>Actualizado en tiempo real</span>
          </div>
          <div className="kpi-grid">
            {[
              ["Ventas hoy",       fmt(ventasHoy),            "vs. ayer"],
              ["Pedidos",          pedidos.length,             `${pedidos.filter(p=>p.estado==="nuevo").length} pendientes`],
              ["Ticket promedio",  fmt(ticketProm),           "por pedido"],
              ["Productos activos",items.length,              "en el menú"],
            ].map(([label,valor,sub])=>(
              <Card key={label} style={{ padding:"16px 18px" }}>
                <p style={{ fontSize:11, fontWeight:600, color:C.grisMedio, marginBottom:6, letterSpacing:.4 }}>{label}</p>
                <p className="cav" style={{ fontSize:"clamp(22px,3vw,30px)", color:C.bordoOscuro, lineHeight:1, marginBottom:3 }}>{valor}</p>
                <p style={{ fontSize:11, color:C.grisMedio }}>{sub}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* ── GESTIÓN DEL MENÚ ── */}
        <div className="admin-section">
          <div className="admin-section-header">
            <h2 className="cav" style={{ fontSize:22, color:C.bordoOscuro }}>Gestión del menú</h2>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              {flash && <span style={{ display:"flex", alignItems:"center", gap:5, color:"#2e7d32", fontSize:13, fontWeight:500 }}>{Ico.check} Guardado</span>}
              <button className="btn-p" onClick={()=>{ setAgregando(true); setEditando(null); }}>{Ico.plus} Nuevo producto</button>
            </div>
          </div>

          {agregando && (
            <Card style={{ padding:20, marginBottom:16 }}>
              <p className="cav" style={{ fontSize:20, color:C.bordoOscuro, marginBottom:14 }}>Nuevo producto</p>
              <div className="form-grid">
                <Field label="Nombre"><input className="field-input" value={nuevo.nombre} onChange={e=>setNuevo(p=>({...p,nombre:e.target.value}))} placeholder="Ej: Classic" /></Field>
                <Field label="Categoría"><select className="field-input" value={nuevo.categoria} onChange={e=>setNuevo(p=>({...p,categoria:e.target.value}))}>{cats.map(c=><option key={c}>{c}</option>)}</select></Field>
                <Field label="Precio ($)"><input className="field-input" type="number" value={nuevo.precio} onChange={e=>setNuevo(p=>({...p,precio:e.target.value}))} placeholder="16000" /></Field>
                <Field label="Badge (opcional)"><input className="field-input" value={nuevo.badge} onChange={e=>setNuevo(p=>({...p,badge:e.target.value}))} placeholder="Ej: Nuevo" /></Field>
                <Field label="Descripción" full><input className="field-input" value={nuevo.descripcion} onChange={e=>setNuevo(p=>({...p,descripcion:e.target.value}))} placeholder="Ingredientes del producto..." /></Field>
              </div>
              <div style={{ display:"flex", gap:10 }}>
                <button className="btn-o" onClick={()=>setAgregando(false)}>Cancelar</button>
                <button className="btn-p" onClick={agregar}>{Ico.plus} Agregar al menú</button>
              </div>
            </Card>
          )}

          <Card style={{ overflow:"hidden" }}>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr style={{ background:C.crema, borderBottom:`1px solid ${C.grisClaro}` }}>
                    {["Producto","Categoría","Precio","Badge",""].map((h,i)=>(
                      <th key={i} style={{ padding:"11px 14px", textAlign:"left", fontSize:11, fontWeight:700, color:C.grisMedio, letterSpacing:.5, whiteSpace:"nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {items.map((item,i)=>(
                    <tr key={item.id} style={{ borderBottom:i<items.length-1?`1px solid ${C.grisClaro}`:"none", background:editando===item.id?"#FFF9F6":C.blanco }}>
                      {editando===item.id ? (
                        <>
                          <td style={{ padding:"9px 14px" }}><input className="field-input" style={{ minWidth:130 }} value={form.nombre} onChange={e=>setForm(p=>({...p,nombre:e.target.value}))} /></td>
                          <td style={{ padding:"9px 14px" }}><select className="field-input" style={{ width:"auto" }} value={form.categoria} onChange={e=>setForm(p=>({...p,categoria:e.target.value}))}>{cats.map(c=><option key={c}>{c}</option>)}</select></td>
                          <td style={{ padding:"9px 14px" }}><input className="field-input" type="number" style={{ width:100 }} value={form.precio} onChange={e=>setForm(p=>({...p,precio:e.target.value}))} /></td>
                          <td style={{ padding:"9px 14px" }}><input className="field-input" style={{ width:90 }} value={form.badge||""} onChange={e=>setForm(p=>({...p,badge:e.target.value}))} placeholder="—" /></td>
                          <td style={{ padding:"9px 14px" }}>
                            <div style={{ display:"flex", gap:6 }}>
                              <button className="btn-p" style={{ padding:"6px 12px" }} onClick={guardar}>{Ico.save} Guardar</button>
                              <button className="btn-o" style={{ padding:"6px 10px" }} onClick={()=>setEditando(null)}>{Ico.close}</button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td style={{ padding:"12px 14px" }}>
                            <p style={{ fontWeight:600, fontSize:14, whiteSpace:"nowrap" }}>{item.nombre}</p>
                            <p style={{ fontSize:11, color:C.grisMedio, marginTop:2, maxWidth:220, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{item.descripcion}</p>
                          </td>
                          <td style={{ padding:"12px 14px", fontSize:13, color:C.grisMedio, whiteSpace:"nowrap" }}>{item.categoria}</td>
                          <td style={{ padding:"12px 14px", fontWeight:700, color:C.bordoOscuro, whiteSpace:"nowrap" }}>{fmt(item.precio)}</td>
                          <td style={{ padding:"12px 14px" }}>{item.badge?<span className="badge">{item.badge}</span>:<span style={{ color:C.grisClaro, fontSize:13 }}>—</span>}</td>
                          <td style={{ padding:"12px 14px" }}>
                            <div style={{ display:"flex", gap:6 }}>
                              <button className="btn-o" style={{ padding:"6px 12px" }} onClick={()=>editar(item)}>{Ico.edit} Editar</button>
                              <button className="btn-danger" onClick={()=>eliminar(item.id)}>{Ico.trash}</button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* ── PEDIDOS RECIENTES ── */}
        <div className="admin-section">
          <div className="admin-section-header">
            <h2 className="cav" style={{ fontSize:22, color:C.bordoOscuro }}>Pedidos recientes</h2>
            <span style={{ fontSize:12, color:C.grisMedio }}>{pedidos.length} pedidos hoy</span>
          </div>
          <Card style={{ overflow:"hidden" }}>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr style={{ background:C.crema, borderBottom:`1px solid ${C.grisClaro}` }}>
                    {["N°","Hora","Detalle","Pago","Total","Estado"].map(h=>(
                      <th key={h} style={{ padding:"10px 14px", textAlign:"left", fontSize:11, fontWeight:700, color:C.grisMedio, whiteSpace:"nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[...pedidos].reverse().map((p,i)=>{
                    const estadoC = { "nuevo":{ bg:"#e8f0fe",t:"#1a56c4" }, "en preparación":{ bg:"#fff8e1",t:"#b45309" }, "listo":{ bg:"#e8f5e9",t:"#2e7d32" }, "entregado":{ bg:"#f3f4f6",t:"#4b5563" } };
                    const ec = estadoC[p.estado]||{ bg:C.grisClaro,t:C.grisMedio };
                    const detalle = Array.isArray(p.items) ? p.items.map(x=>`${x.nombre}${x.qty>1?` ×${x.qty}`:""}`).join(", ") : p.items;
                    return (
                      <tr key={p.id+i} style={{ borderBottom:i<pedidos.length-1?`1px solid ${C.grisClaro}`:"none" }}>
                        <td style={{ padding:"12px 14px", fontWeight:700, color:C.bordoOscuro, whiteSpace:"nowrap" }}>{p.id}</td>
                        <td style={{ padding:"12px 14px", fontSize:13, color:C.grisMedio, whiteSpace:"nowrap" }}>{p.hora}</td>
                        <td style={{ padding:"12px 14px", fontSize:13, color:C.texto, minWidth:160 }}>{detalle}</td>
                        <td style={{ padding:"12px 14px" }}><span style={{ fontSize:11, background:p.modo==="Online"?"#e8f0fe":"#f0f4e8", color:p.modo==="Online"?"#1a56c4":"#3a6b1a", padding:"2px 9px", borderRadius:20, fontWeight:600 }}>{p.modo}</span></td>
                        <td style={{ padding:"12px 14px", fontWeight:700, color:C.bordoOscuro, whiteSpace:"nowrap" }}>{fmt(p.total)}</td>
                        <td style={{ padding:"12px 14px" }}><span style={{ fontSize:11, background:ec.bg, color:ec.t, padding:"2px 9px", borderRadius:20, fontWeight:600 }}>{p.estado}</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}

/* ─── DASHBOARD FINANZAS ──────────────────────────────────────────────── */
function Finanzas({ pedidos }) {
  const ventasHoy  = pedidos.reduce((s,p)=>s+p.total,0);
  const ticketProm = pedidos.length ? Math.round(ventasHoy/pedidos.length) : 0;
  const barData = [42,67,55,89,73,91,61];
  const dias    = ["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"];
  const maxBar  = Math.max(...barData);

  const KPI = ({ label, valor, sub, color }) => (
    <Card style={{ padding:"18px 20px" }}>
      <p style={{ fontSize:11, fontWeight:700, color:C.grisMedio, marginBottom:6, letterSpacing:.4 }}>{label}</p>
      <p className="cav" style={{ fontSize:"clamp(22px,3vw,32px)", color:color||C.bordoOscuro, lineHeight:1, marginBottom:4 }}>{valor}</p>
      <p style={{ fontSize:12, color:C.grisMedio }}>{sub}</p>
    </Card>
  );

  const estadoC = { "nuevo":{ bg:"#e8f0fe",t:"#1a56c4" }, "en preparación":{ bg:"#fff8e1",t:"#b45309" }, "listo":{ bg:"#e8f5e9",t:"#2e7d32" }, "entregado":{ bg:"#f3f4f6",t:"#4b5563" } };

  return (
    <div className="page" style={{ background:C.crema, paddingTop:56 }}>
      <div style={{ maxWidth:1000, margin:"0 auto", padding:"28px 24px" }}>
        <div style={{ marginBottom:28 }}>
          <h1 className="cav" style={{ fontSize:"clamp(26px,4vw,36px)", color:C.bordoOscuro }}>Finanzas</h1>
          <p style={{ color:C.grisMedio, fontSize:13 }}>Martes 8 de septiembre · Bella Vista</p>
        </div>
        <div className="kpi-grid">
          <KPI label="Ventas hoy"      valor={fmt(ventasHoy)}  sub="↑ 12% vs ayer"   color={C.bordoOscuro} />
          <KPI label="Pedidos hoy"     valor={pedidos.length}  sub={`${pedidos.filter(p=>p.modo==="Efectivo").length} efectivo · ${pedidos.filter(p=>p.modo==="Online").length} online`} />
          <KPI label="Ticket promedio" valor={fmt(ticketProm)} sub="Por pedido" />
          <KPI label="Ventas del mes"  valor="$1.847K"         sub="Septiembre 2026"  color={C.dorado} />
        </div>
        <div className="charts-grid">
          <Card style={{ padding:"20px 22px" }}>
            <p className="cav" style={{ fontSize:20, color:C.bordoOscuro, marginBottom:18 }}>Pedidos esta semana</p>
            <div style={{ display:"flex", alignItems:"flex-end", gap:6, height:110 }}>
              {barData.map((v,i)=>(
                <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
                  <span style={{ fontSize:10, color:C.grisMedio, fontWeight:600 }}>{v}</span>
                  <div style={{ width:"100%", height:`${(v/maxBar)*80}px`, background:i===5?C.bordoOscuro:C.grisClaro, borderRadius:"3px 3px 0 0" }} />
                  <span style={{ fontSize:10, color:C.grisMedio }}>{dias[i]}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card style={{ padding:"20px 22px" }}>
            <p className="cav" style={{ fontSize:20, color:C.bordoOscuro, marginBottom:18 }}>Por categoría hoy</p>
            {[["Burgers",68,C.bordoOscuro],["Acompañamientos",20,C.bordoMedio],["Bebidas",12,C.dorado]].map(([cat,pct,color])=>(
              <div key={cat} style={{ marginBottom:14 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                  <span style={{ fontSize:14, fontWeight:500 }}>{cat}</span>
                  <span style={{ fontSize:14, fontWeight:700, color }}>{pct}%</span>
                </div>
                <div style={{ height:7, background:C.grisClaro, borderRadius:4, overflow:"hidden" }}>
                  <div style={{ height:"100%", width:`${pct}%`, background:color, borderRadius:4 }} />
                </div>
              </div>
            ))}
          </Card>
        </div>
        <Card style={{ overflow:"hidden" }}>
          <div style={{ padding:"14px 18px", borderBottom:`1px solid ${C.grisClaro}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <p className="cav" style={{ fontSize:20, color:C.bordoOscuro }}>Pedidos recientes</p>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr style={{ background:C.crema, borderBottom:`1px solid ${C.grisClaro}` }}>
                  {["N°","Hora","Detalle","Pago","Total","Estado"].map(h=>(
                    <th key={h} style={{ padding:"10px 14px", textAlign:"left", fontSize:11, fontWeight:700, color:C.grisMedio, whiteSpace:"nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...pedidos].reverse().map((p,i)=>{
                  const ec = estadoC[p.estado]||{ bg:C.grisClaro,t:C.grisMedio };
                  const detalle = Array.isArray(p.items) ? p.items.map(x=>`${x.nombre}${x.qty>1?` ×${x.qty}`:""}`).join(", ") : p.items;
                  return (
                    <tr key={p.id+i} style={{ borderBottom:i<pedidos.length-1?`1px solid ${C.grisClaro}`:"none" }}>
                      <td style={{ padding:"12px 14px", fontWeight:700, color:C.bordoOscuro, whiteSpace:"nowrap" }}>{p.id}</td>
                      <td style={{ padding:"12px 14px", fontSize:13, color:C.grisMedio, whiteSpace:"nowrap" }}>{p.hora}</td>
                      <td style={{ padding:"12px 14px", fontSize:13, minWidth:160 }}>{detalle}</td>
                      <td style={{ padding:"12px 14px" }}><span style={{ fontSize:11, background:p.modo==="Online"?"#e8f0fe":"#f0f4e8", color:p.modo==="Online"?"#1a56c4":"#3a6b1a", padding:"2px 9px", borderRadius:20, fontWeight:600 }}>{p.modo}</span></td>
                      <td style={{ padding:"12px 14px", fontWeight:700, color:C.bordoOscuro, whiteSpace:"nowrap" }}>{fmt(p.total)}</td>
                      <td style={{ padding:"12px 14px" }}><span style={{ fontSize:11, background:ec.bg, color:ec.t, padding:"2px 9px", borderRadius:20, fontWeight:600 }}>{p.estado}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ─── VISTA COCINA ────────────────────────────────────────────────────── */
function VistaCocina({ pedidos, onAvanzarEstado }) {
  const [tick, setTick] = useState(new Date());
  useEffect(() => { const t = setInterval(()=>setTick(new Date()),1000); return ()=>clearInterval(t); }, []);

  const mins = horaStr => {
    const [h,m] = horaStr.split(":").map(Number);
    const ref = new Date(tick); ref.setHours(h,m,0,0);
    return Math.max(0, Math.floor((tick-ref)/60000));
  };

  const cols = [
    { estado:"nuevo",          label:"Nuevos",         dot:"#FF6B6B", btnLabel:"Iniciar",      btnBg:"#C9A96E", btnColor:"#3D1A2E" },
    { estado:"en preparación", label:"En preparación", dot:"#FFC107", btnLabel:"Marcar listo",  btnBg:"#4CAF50", btnColor:"#fff"    },
    { estado:"listo",          label:"Listos",         dot:"#4CAF50", btnLabel:null,            btnBg:null,      btnColor:null      },
  ];

  return (
    <div className="page" style={{ background:"#120709", paddingTop:56, minHeight:"100vh" }}>
      {/* Sub-header cocina */}
      <div style={{ background:"#1E0C14", borderBottom:"1px solid rgba(255,255,255,.07)", padding:"11px 20px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ display:"flex", alignItems:"center", gap:4, background:"rgba(76,175,80,.12)", borderRadius:20, padding:"4px 10px" }}>
            {Ico.live}
            <span style={{ color:"#4CAF50", fontSize:11, fontWeight:700, letterSpacing:.6 }}>EN VIVO</span>
          </span>
          <span style={{ color:"rgba(255,255,255,.3)", fontSize:12 }}>{pedidos.length} pedidos hoy</span>
        </div>
        <p style={{ color:"rgba(255,255,255,.55)", fontSize:13, fontFamily:"monospace" }}>
          {tick.toLocaleTimeString("es-AR",{hour:"2-digit",minute:"2-digit",second:"2-digit"})}
        </p>
      </div>

      {/* Columnas */}
      <div className="cocina-cols" style={{ display:"flex", height:"calc(100vh - 115px)", overflow:"hidden" }}>
        {cols.map(col => {
          const list = pedidos.filter(p=>p.estado===col.estado);
          return (
            <div key={col.estado} className="cocina-col" style={{ flex:1 }}>
              {/* Col header */}
              <div style={{ padding:"12px 16px", borderBottom:"1px solid rgba(255,255,255,.07)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ width:8, height:8, borderRadius:"50%", background:col.dot, display:"inline-block", flexShrink:0 }} />
                  <span style={{ color:C.blanco, fontWeight:600, fontSize:13 }}>{col.label}</span>
                </div>
                <span style={{ background:"rgba(255,255,255,.08)", color:"rgba(255,255,255,.5)", fontSize:11, fontWeight:700, padding:"2px 8px", borderRadius:20 }}>{list.length}</span>
              </div>

              {/* Tarjetas */}
              <div className="cocina-cards">
                {list.length===0 && (
                  <div style={{ textAlign:"center", padding:"32px 16px", color:"rgba(255,255,255,.15)", fontSize:13 }}>Sin pedidos</div>
                )}
                {list.map(p => {
                  const m = mins(p.hora);
                  const urgente = col.estado==="en preparación" && m>=10;
                  return (
                    <div key={p.id} style={{ background: urgente?"#3A0F00":"#1E0C14", border:`1px solid ${urgente?"rgba(255,100,50,.4)":"rgba(255,255,255,.07)"}`, borderRadius:12, overflow:"hidden" }}>
                      {/* Card header */}
                      <div style={{ padding:"11px 14px", borderBottom:"1px solid rgba(255,255,255,.06)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                          <span style={{ color:C.blanco, fontWeight:700, fontSize:15 }}>{p.id}</span>
                          {urgente && <span style={{ display:"flex", alignItems:"center", gap:3, color:"#FF6B6B", fontSize:11, fontWeight:700 }}>{Ico.alert} Demorado</span>}
                        </div>
                        <div style={{ display:"flex", alignItems:"center", gap:6, color:m>=10?"#FF6B6B":m>=5?"#FFC107":"#4CAF50" }}>
                          {Ico.clock}
                          <span style={{ fontSize:13, fontWeight:700 }}>{m}min</span>
                        </div>
                      </div>

                      {/* Items */}
                      <div style={{ padding:"12px 14px" }}>
                        {p.items.map((it,i)=>(
                          <div key={i} style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                            <span style={{ color:"rgba(255,255,255,.85)", fontSize:14 }}>{it.nombre}</span>
                            <span style={{ color:C.dorado, fontWeight:700, fontSize:14 }}>×{it.qty}</span>
                          </div>
                        ))}
                        <div style={{ display:"flex", gap:6, marginTop:10, flexWrap:"wrap" }}>
                          <span style={{ fontSize:11, background:"rgba(255,255,255,.08)", color:"rgba(255,255,255,.5)", padding:"2px 8px", borderRadius:20 }}>
                            {p.entrega==="takeaway"?"Take away":"Delivery"}
                          </span>
                          <span style={{ fontSize:11, background:"rgba(255,255,255,.08)", color:"rgba(255,255,255,.5)", padding:"2px 8px", borderRadius:20 }}>{p.modo}</span>
                        </div>
                      </div>

                      {/* Acción */}
                      {col.btnLabel && (
                        <div style={{ padding:"10px 14px", borderTop:"1px solid rgba(255,255,255,.06)" }}>
                          <button
                            onClick={()=>onAvanzarEstado(p.id)}
                            style={{ width:"100%", background:col.btnBg, color:col.btnColor, border:"none", borderRadius:8, padding:"9px", fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:13, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}
                          >
                            {col.estado==="nuevo" ? Ico.arrow : Ico.check}
                            {col.btnLabel}
                          </button>
                        </div>
                      )}
                      {col.estado==="listo" && (
                        <div style={{ padding:"10px 14px", borderTop:"1px solid rgba(255,255,255,.06)", display:"flex", alignItems:"center", justifyContent:"center", gap:6, color:"#4CAF50", fontSize:13, fontWeight:600 }}>
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
export default function App() {
  const [rol, setRol]     = useState(null);
  const [vista, setVista] = useState(null);
  const [pedidos, setPedidos] = useState(PEDIDOS_SEED);

  const login = useCallback(r => { setRol(r); setVista(TABS_POR_ROL[r][0].id); }, []);
  const logout = () => { setRol(null); setVista(null); };
  const nuevoPedido  = useCallback(p  => setPedidos(prev=>[...prev,p]), []);
  const avanzarEstado = useCallback(id => setPedidos(prev=>prev.map(p=>{
    if(p.id!==id) return p;
    const idx = ESTADOS_COCINA.indexOf(p.estado);
    return { ...p, estado:ESTADOS_COCINA[Math.min(idx+1,ESTADOS_COCINA.length-1)] };
  })), []);

  if (!rol) return <><style>{CSS}</style><Login onLogin={login} /></>;

  const tabs    = TABS_POR_ROL[rol];
  const rolCfg  = ROLES[rol];

  return (
    <>
      <style>{CSS}</style>
      <nav className="nav">
        <div className="nav-logo">Burger Must <em>Selection</em></div>

        <div className="nav-center">
          {rol!=="cocina" && tabs.map(t=>(
            <button key={t.id} className={`nav-tab${vista===t.id?" active":""}`} onClick={()=>setVista(t.id)}>
              <span style={{ display:"flex", opacity:.7 }}>{Ico[t.ico]}</span>
              {t.label}
            </button>
          ))}
          {rol==="cocina" && <span style={{ color:"rgba(255,255,255,.4)", fontSize:13 }}>Pantalla de cocina</span>}
        </div>

        <div className="nav-right">
          <div className="role-pill">
            <span className="role-dot" style={{ background:rolCfg.color }} />
            <span className="role-label" style={{ color:C.blanco, fontWeight:500 }}>{rolCfg.label}</span>
          </div>
          <button className="btn-logout" onClick={logout}>
            {Ico.logout} <span>Salir</span>
          </button>
        </div>
      </nav>

      {rol!=="cocina" && (
        <nav className="bottom-nav">
          <div className="bottom-nav-inner">
            {tabs.map(t=>(
              <button key={t.id} className={`bnav-btn${vista===t.id?" active":""}`} onClick={()=>setVista(t.id)}>
                <span className="bnav-ico">{Ico[t.ico]}</span>
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </nav>
      )}

      {vista==="menu"     && <MenuDigital />}
      {vista==="tienda"   && <TiendaOnline onNuevoPedido={nuevoPedido} />}
      {vista==="admin"    && <PanelAdmin pedidos={pedidos} />}
      {vista==="finanzas" && <Finanzas pedidos={pedidos} />}
      {vista==="cocina"   && <VistaCocina pedidos={pedidos} onAvanzarEstado={avanzarEstado} />}
    </>
  );
}
