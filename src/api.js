const BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

function token() {
  return localStorage.getItem("bm_token");
}

async function req(method, path, body) {
  const headers = { "Content-Type": "application/json" };
  const t = token();
  if (t) headers["Authorization"] = `Bearer ${t}`;

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body != null ? JSON.stringify(body) : undefined,
  });

  if (res.status === 401) {
    localStorage.removeItem("bm_token");
    window.location.reload();
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? `Error ${res.status}`);
  return data;
}

/* ── AUTH ───────────────────────────────────────────────────────────────── */
export const auth = {
  login:  (email, password) => req("POST", "/api/auth/login",  { email, password }),
  me:     ()                => req("GET",  "/api/auth/me"),
};

/* ── MENÚ ───────────────────────────────────────────────────────────────── */
export const menu = {
  get:    ()       => req("GET",    "/api/menu"),
  getAll: ()       => req("GET",    "/api/menu/all"),
  create: (data)   => req("POST",   "/api/menu",      data),
  update: (id, d)  => req("PATCH",  `/api/menu/${id}`, d),
  delete: (id)     => req("DELETE", `/api/menu/${id}`),
};

/* ── PEDIDOS ────────────────────────────────────────────────────────────── */
export const pedidos = {
  create:       (data)          => req("POST",  "/api/pedidos",              data),
  getAll:       (params = {})   => req("GET",   "/api/pedidos?" + new URLSearchParams(params)),
  getById:      (id)            => req("GET",   `/api/pedidos/${id}`),
  setEstado:      (id, estado)  => req("PATCH", `/api/pedidos/${id}/estado`,        { estado }),
  confirmarCaja:  (id)          => req("POST",  `/api/pedidos/${id}/confirmar-caja`, {}),
  createCaja:     (data)        => req("POST",  "/api/pedidos/caja",                data),
};

/* ── INTEGRACIONES ──────────────────────────────────────────────────────── */
export const integraciones = {
  getAll: () => req("GET", "/api/integraciones"),
};

/* ── PAGOS ──────────────────────────────────────────────────────────────── */
export const pagos = {
  preference: (pedido_id) => req("POST", "/api/pagos/preference", { pedido_id }),
};

/* ── FINANZAS ───────────────────────────────────────────────────────────── */
export const finanzas = {
  resumen:    (fecha)  => req("GET", `/api/finanzas/resumen${fecha ? "?fecha=" + fecha : ""}`),
  historico:  (dias)   => req("GET", `/api/finanzas/historico?dias=${dias ?? 30}`),
};

/* ── CAJA ───────────────────────────────────────────────────────────────── */
export const caja = {
  sesionActiva:      ()             => req("GET",  "/api/caja"),
  abrir:             (fondo, notas) => req("POST", "/api/caja/abrir",      { fondo_inicial: fondo, notas }),
  cerrar:            (notas)        => req("POST", "/api/caja/cerrar",     { notas }),
  movimiento:        (data)         => req("POST", "/api/caja/movimiento", data),
  historial:         ()             => req("GET",  "/api/caja/historial"),
};

/* ── POINT PLUS ─────────────────────────────────────────────────────────── */
export const point = {
  dispositivos: ()          => req("GET",    "/api/point/dispositivos"),
  cobrar:       (pedido_id) => req("POST",   "/api/point/cobrar",          { pedido_id }),
  cancelar:     (pedido_id) => req("DELETE", `/api/point/cobrar/${pedido_id}`),
  estado:       (pedido_id) => req("GET",    `/api/point/estado/${pedido_id}`),
};

/* ── STOCK ──────────────────────────────────────────────────────────────── */
export const stock = {
  get:        ()              => req("GET",  "/api/stock"),
  critico:    ()              => req("GET",  "/api/stock/critico"),
  create:     (data)          => req("POST", "/api/stock",                   data),
  movimiento: (id, data)      => req("POST", `/api/stock/${id}/movimiento`,  data),
  historial:  (id)            => req("GET",  `/api/stock/${id}/historial`),
};
