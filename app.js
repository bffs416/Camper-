/**
 * MANUAL TÉCNICO & CENTRO DE INGENIERÍA — CAMPER MAZDA T (2000)
 * Lógica Interactiva, Datos Oficiales y Gestión de Autonomía
 */

// 1. BASE DE DATOS MAESTRA DE CARGAS (31 EQUIPOS - CON ASIGNACIÓN SPLIT-PHASE NATIVA)
const MASTER_LOADS = [
  { id: 0, name: "Estufa de Inducción Electrolux ETIH30G7EOB 220V", cat: "Confort", watts: 3700, amps: 77.1, conn: "HOT1 - HOT2 (220V)", notes: "Bifásica 220V pura (1.850W balanceados por fase). Formato 30cm. Taco bipolar 2x20A.", defHours: 0.5 },
  { id: 1, name: "Horno Freidora KitchenAid 21L", cat: "Confort", watts: 1800, amps: 37.5, conn: "HOT1 - N (110V)", notes: "Resistencia térmica pura. No encender simultáneo con soldadora.", defHours: 0.3 },
  { id: 2, name: "Lavadora-Secadora LG 14kg", cat: "Confort", watts: 1800, amps: 37.5, conn: "HOT2 - N (110V)", notes: "Consumo máximo en secado por calor. Lavado simple ~250W.", defHours: 0 },
  { id: 3, name: "Soldadora MIG 140A Flux/Stick", cat: "Taller", watts: 1600, amps: 33.3, conn: "HOT1 - N (110V)", notes: "Picos inductivos absorbidos por los 18 kVA de baja frecuencia. Taco 20A GFCI.", defHours: 0.5 },
  { id: 4, name: "Sierra Circular Enventor 7-1/4\"", cat: "Taller", watts: 1400, amps: 29.1, conn: "HOT1 - N (110V)", notes: "Motor AC de inducción. Cero caídas en el PC Gamer al estar en HOT1.", defHours: 0.3 },
  { id: 5, name: "Plancha Térmica Multifunción 5 en 1", cat: "Taller", watts: 1300, amps: 27.1, conn: "HOT1 - HOT2 (220V)", notes: "Salida bifásica 220V nativa del MUST PV3300 TLV. Taco doble 2x20A.", defHours: 0 },
  { id: 6, name: "Aire Acondicionado Samsung 12K Inverter 220V", cat: "Confort", watts: 1100, amps: 22.9, conn: "HOT1 - HOT2 (220V)", notes: "Compresor Inverter 220V. Al estabilizar baja a 400W–500W continuos. Taco bipolar 2x15A.", defHours: 4.0 },
  { id: 7, name: "Licuadora Universal Ice Power", cat: "Confort", watts: 1100, amps: 22.9, conn: "HOT1 - N (110V)", notes: "Motor universal alta potencia. Ráfagas cortas de 30-60 seg.", defHours: 0.05 },
  { id: 8, name: "Amoladora Angular WorkNeon 4-1/2\"", cat: "Taller", watts: 850, amps: 17.7, conn: "HOT1 - N (110V)", notes: "Motor 11.000 RPM. Cortes rápidos en metal.", defHours: 0.2 },
  { id: 9, name: "Sanduchera Kalley Panini", cat: "Confort", watts: 750, amps: 15.6, conn: "HOT1 - N (110V)", notes: "Resistencia térmica de contacto. Ciclos de 5 min.", defHours: 0.1 },
  { id: 10, name: "Enrutador de Madera de Palma TEENO", cat: "Taller", watts: 715, amps: 14.9, conn: "HOT1 - N (110V)", notes: "Motor AC con velocidad variable.", defHours: 0.2 },
  { id: 11, name: "PC Gamer (RTX 5080 + Fuente MSI 850W)", cat: "Cómputo", watts: 650, amps: 13.5, conn: "HOT2 - N (110V)", notes: "Línea limpia aislada en Fase 2. Exige onda senoidal pura.", defHours: 3.0 },
  { id: 12, name: "Sierra Caladora Hammerhead", cat: "Taller", watts: 528, amps: 11.0, conn: "HOT1 - N (110V)", notes: "Motor AC función pendular orbital.", defHours: 0.1 },
  { id: 13, name: "Impresora Filamento Flsun V400", cat: "Cómputo", watts: 450, amps: 9.3, conn: "HOT2 - N (110V)", notes: "Picos en cama caliente; media real ~150W imprimiendo.", defHours: 2.0 },
  { id: 14, name: "Lijadora Orbital Enventor 5\"", cat: "Taller", watts: 300, amps: 6.2, conn: "HOT1 - N (110V)", notes: "Motor AC baja potencia para acabados.", defHours: 0.3 },
  { id: 15, name: "Limpiador Ultrasónico Creworks 3L", cat: "Taller", watts: 280, amps: 5.8, conn: "HOT1 - N (110V)", notes: "180W calefacción + 100W transductores cavitación.", defHours: 0.5 },
  { id: 16, name: "Nevera No Frost Mabe 400L Inverter", cat: "Confort", watts: 200, amps: 4.2, conn: "HOT2 - N (110V)", notes: "Compresor Eco Advanced Inverter. Promedio continuo ~35W.", defHours: 24.0 },
  { id: 17, name: "Procesador de Inmersión Black & Decker", cat: "Confort", watts: 200, amps: 4.2, conn: "HOT1 - N (110V)", notes: "Motor DC compacto de mano.", defHours: 0.05 },
  { id: 18, name: "Compresor Aerógrafo Master TC-320", cat: "Taller", watts: 150, amps: 3.1, conn: "HOT1 - N (110V)", notes: "Pistón 1/5 HP con doble ventilador.", defHours: 0.5 },
  { id: 19, name: "Grabador Láser Atomstack X20 Pro", cat: "Taller", watts: 130, amps: 2.7, conn: "HOT2 - N (110V)", notes: "Potencia óptica láser de 20W.", defHours: 1.0 },
  { id: 20, name: "3 Monitores Juntos (Dell, Dahua, HP)", cat: "Cómputo", watts: 100, amps: 2.1, conn: "HOT2 - N (110V)", notes: "Consumo combinado de las 3 pantallas de trabajo.", defHours: 4.0 },
  { id: 21, name: "Impresora 3D Resina Elegoo Saturn 2", cat: "Cómputo", watts: 100, amps: 2.1, conn: "HOT2 - N (110V)", notes: "Muy sensible a microcortes. Matriz LED UV 8K.", defHours: 2.0 },
  { id: 22, name: "Starlink Gen 3 (Router + Antena)", cat: "DC", watts: 75, amps: 1.6, conn: "Directo 48V (YAOSHENG)", notes: "Inyector 48V sin encender inversor. Ahorro de 1.500 Wh/d.", defHours: 12.0 },
  { id: 23, name: "Bordadora Brother LB5000", cat: "Taller", watts: 80, amps: 1.6, conn: "HOT2 - N (110V)", notes: "Tarjeta computarizada protegida de picos del taller.", defHours: 0 },
  { id: 24, name: "Kit Cautín Soldador Digital LCD", cat: "Taller", watts: 80, amps: 1.6, conn: "HOT1 - N (110V)", notes: "Calentamiento cerámico rápido.", defHours: 0.5 },
  { id: 25, name: "Laptops (Lenovo + Huawei) + Móvil", cat: "Cómputo", watts: 170, amps: 3.6, conn: "HOT2 o USB 12V", notes: "Consumo sumado en carga rápida simultánea.", defHours: 2.5 },
  { id: 26, name: "Estación Elegoo Mercury Plus 2.0", cat: "DC", watts: 48, amps: 1.0, conn: "Caja DC 12V", notes: "Adaptador cortado; directo a 12V con fusible 10A.", defHours: 0.5 },
  { id: 27, name: "Impresora Inyección Brother T510W", cat: "Cómputo", watts: 14, amps: 0.3, conn: "HOT2 - N (110V)", notes: "Copiando 14W; reposo cae a 3W.", defHours: 0.2 },
  { id: 28, name: "Reductor 48V a 12V (20A)", cat: "DC", watts: 240, amps: 5.0, conn: "Directo 48V", notes: "Alimenta la caja GaRhomxy para cargas 24/7.", defHours: 24.0 },
  { id: 29, name: "Cámara Wi-Fi Imou Ranger 2", cat: "DC", watts: 3.5, amps: 0.07, conn: "Caja DC 12V", notes: "Monitoreo 24/7 activo permanentemente.", defHours: 24.0 },
  { id: 30, name: "Interfaces MIDI / Audio USB", cat: "Cómputo", watts: 0, amps: 0, conn: "USB de PC (5V)", notes: "Alimentación por bus USB de la torre.", defHours: 3.0 }
];

// 2. PROVEEDORES LOCALES OFICIALES VERIFICADOS POR EL USUARIO
const OFFICIAL_VERIFIED_SUPPLIERS = [
  {
    id: 1,
    name: "Ineldec Soluciones S.A.S.",
    category: "Inversor Central 6 kW",
    contact: "Sitio Web: ineldec.com • PBX/WhatsApp: Colombia",
    items: "• Inversor Híbrido 6 kW 48V MUST PV33-6048 TLV (Fase dividida 110V/220V, pico 18 kVA)\n• Cotización oficial: $2.590.000 COP\n• Enlace directo: ineldec.com/producto/inversor-hibrido-6-kw-48v-must-pv33-6048-tlv/"
  },
  {
    id: 2,
    name: "Ecozaque Ingeniería S.A.S.",
    category: "Almacenamiento LiFePO4",
    contact: "Sitio Web: ecozaque.com • PBX/WhatsApp: Colombia",
    items: "• Batería LiFePO4 MUST LP16-48200 (51.2V 200Ah, 10.240 Wh, BMS 150A continuo, gabinete SPCC)\n• Cotización oficial: $6.981.000 COP\n• Enlace directo: ecozaque.com/producto/bateria-litio-200ah-51-2-vdc-lp16-48200/"
  },
  {
    id: 3,
    name: "Emergente Energía Sostenible",
    category: "Paneles Solares Techo",
    contact: "Sitio Web: emergente.com.co • PBX/WhatsApp: Colombia",
    items: "• 2x Paneles Solares Bifaciales 730W TOPCon OSDA (1.460Wp 2S al MPPT 80A del MUST)\n• 1x Panel Solar 460W Restar (al MPPT Boost 500W)\n• Generación total techo: 1.920 Wp (~6.900 Wh/día)"
  },
  {
    id: 4,
    name: "Electrolux Colombia",
    category: "Cocción 220V",
    contact: "Sitio Web: electrolux.com.co • Cobertura Nacional",
    items: "• Cubierta Empotrable de Inducción 2 Puestos (ETIH30G7EOB)\n• 220V–240V nativo (3.700W máx), formato dominó 30cm\n• Garantía oficial de fábrica y certificación RETIE"
  }
];

// 3. BANCO DE ENLACES OFICIALES VERIFICADOS POR EL USUARIO
const OFFICIAL_VERIFIED_LINKS = [
  {
    id: 1,
    title: "Inversor Híbrido 6 kW 48V MUST PV33-6048 TLV ($2.590.000)",
    cat: "Inversor Central",
    url: "https://ineldec.com/producto/inversor-hibrido-6-kw-48v-must-pv33-6048-tlv/",
    notes: "Ineldec Colombia. Baja frecuencia, transformador toroidal de cobre, pico de 18 kVA, fase dividida 110V/220V nativo y MPPT 80A."
  },
  {
    id: 2,
    title: "Batería Litio MUST 200Ah 51.2V LP16-48200 ($6.981.000)",
    cat: "Almacenamiento",
    url: "https://www.ecozaque.com/producto/bateria-litio-200ah-51-2-vdc-lp16-48200/",
    notes: "Ecozaque Colombia. 10.240 Wh útiles, BMS 150A continuo, 6.000 ciclos al 80% DOD, gabinete SPCC con disyuntor frontal y puerto CAN."
  },
  {
    id: 3,
    title: "Panel Solar Bifacial 730W TOPCon OSDA (2x en Serie Techo)",
    cat: "Energía Solar",
    url: "https://www.emergente.com.co/producto/panel-bifacial-730w-topcon-osda",
    notes: "Emergente Energía Colombia. Panel monocristalino TOPCon Bifacial. 2 unidades en serie (1.460 Wp) directo al MPPT 80A del MUST."
  },
  {
    id: 4,
    title: "Panel Solar 460W Restar (Línea Secundaria Techo)",
    cat: "Energía Solar",
    url: "https://www.emergente.com.co/producto/panel-solar-460w-restar",
    notes: "Emergente Energía Colombia. 460W monocristalino. Conectado al controlador MPPT Boost 500W para elevar a 58.4V de litio."
  },
  {
    id: 5,
    title: "Cubierta de Inducción Empotrable Electrolux 2 Puestos (220V / 3.700W)",
    cat: "Cocción / 220V",
    url: "https://www.electrolux.com.co/cubierta-empotrable-induccion-etih30g7eob/p?idsku=3488",
    notes: "Electrolux Colombia. Modelo ETIH30G7EOB. 220V-240V nativo (1.850W balanceados por fase). Formato dominó 30cm, gestión inteligente de potencia."
  },
  {
    id: 6,
    title: "Controlador Solar MPPT Boost SmartSolar 500W (Elevador 48V)",
    cat: "Energía Solar",
    url: "https://www.amazon.com/-/es/gp/product/B0GPQX7TS1/ref=ewc_pr_img_1?smid=A5V71VP3AMH26&psc=1",
    notes: "Amazon ASIN B0GPQX7TS1. Entrada 18V-50V (Panel Restar 460W), salida 48V/58.4V litio. Carga la batería LP1600 de forma independiente."
  },
  {
    id: 7,
    title: "ABuff Paquete de 8 Soportes Silentblocks M10 Antivibración (40x30 mm)",
    cat: "Blindaje Chasis",
    url: "https://www.amazon.com/-/es/gp/product/B0DCJVPLC7/ref=ewc_pr_img_2?smid=A1XSIC9BZWI23M&psc=1",
    notes: "Amazon ASIN B0DCJVPLC7. Aisladores cilíndricos de goma con doble perno M10. Desacoplan mecánicamente los 125 kg del MUST y la batería."
  },
  {
    id: 8,
    title: "YAOSHENG Inyector PoE 48V para Starlink Gen 3",
    cat: "Internet / DC Directo",
    url: "https://www.amazon.com/-/es/gp/product/B0F1NLLD4J/ref=ewc_pr_img_3?smid=A3R3Z1TROCAHH6&psc=1",
    notes: "Amazon ASIN B0F1NLLD4J. Conexión directa a busbars de 48V con fusible de 5A. Ahorra 1.500 Wh diarios al operar con el inversor apagado."
  },
  {
    id: 9,
    title: "Victron Energy Orion-Tr Smart DC-DC 12/48V 8A (380W) Aislado",
    cat: "Carga Alternador",
    url: "https://www.amazon.com/-/es/gp/product/B0F9PJ2HBD/ref=ox_sc_act_title_2?smid=A35W7G02QU77CF&psc=1",
    notes: "Amazon ASIN B0F9PJ2HBD (US$198.01). Carga la batería LiFePO4 MUST desde el alternador de 70A del motor diésel. Aislamiento galvánico y Bluetooth."
  },
  {
    id: 10,
    title: "Extensor USB 2.0 sobre Cable de Red RJ45 Cat5e/Cat6 (Hasta 50m)",
    cat: "Cabina / Dashcam",
    url: "https://www.amazon.com/s?k=usb+over+ethernet+extender+rj45",
    notes: "Par de adaptadores USB a RJ45. Conecta la webcam delantera y retrovisor trasero de la camper sin caídas de voltaje en distancias de más de 10 metros."
  },
  {
    id: 11,
    title: "Cable de Red Cat6 STP Blindado para Exterior (Resistente UV y Grasa)",
    cat: "Cableado Chasis",
    url: "https://www.amazon.com/s?k=cat6+outdoor+shielded+cable",
    notes: "Cable UTP/STP Cat6 con chaqueta impermeable para pasar por el canal interior del larguero del chasis del Mazda T."
  }
];

let suppliers = JSON.parse(localStorage.getItem('mazda_t_suppliers')) || [];
let links = JSON.parse(localStorage.getItem('mazda_t_links')) || [];
let photos = JSON.parse(localStorage.getItem('mazda_t_photos')) || [];

// Sincronizar proveedores verificados
if (!suppliers || suppliers.length === 0) {
  suppliers = OFFICIAL_VERIFIED_SUPPLIERS;
  localStorage.setItem('mazda_t_suppliers', JSON.stringify(suppliers));
} else {
  OFFICIAL_VERIFIED_SUPPLIERS.forEach(sup => {
    if (!suppliers.some(s => s.name === sup.name)) {
      suppliers.push(sup);
    }
  });
  localStorage.setItem('mazda_t_suppliers', JSON.stringify(suppliers));
}

// Sincronizar enlaces verificados
if (!links || links.length === 0) {
  links = OFFICIAL_VERIFIED_LINKS;
  localStorage.setItem('mazda_t_links', JSON.stringify(links));
} else {
  OFFICIAL_VERIFIED_LINKS.forEach(offLink => {
    if (!links.some(l => l.url === offLink.url)) {
      links.push(offLink);
    }
  });
  localStorage.setItem('mazda_t_links', JSON.stringify(links));
}

// El simulador siempre arranca en 0 minutos por defecto (cero consumo inicial)
let deviceSimMinutes = {};

MASTER_LOADS.forEach(load => {
  deviceSimMinutes[load.id] = 0;
});

// INICIALIZACIÓN AL CARGAR EL DOM
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  renderLoadsTable(MASTER_LOADS);
  initSimulator();
  renderSuppliers();
  renderLinks();
  renderGallery();
  initModals();
  initExport();
});

// 1. NAVEGACIÓN ENTRE CAPÍTULOS
function initNavigation() {
  const navBtns = document.querySelectorAll('.nav-item');
  const panes = document.querySelectorAll('.tab-pane');
  const pageTitle = document.getElementById('page-title');
  const pageSubtitle = document.getElementById('page-subtitle');

  const titles = {
    'tab-datasheets': { title: 'Capítulo 1: Equipos Oficiales Verificados', sub: 'Memoria técnica oficial: MUST PV33-6048 TLV, Batería LP16-48200, 2x Osda 720W y MPPT Boost 500W' },
    'tab-diagrams': { title: 'Capítulo 2: Diagramas Técnicos & Curvas de Potencia', sub: 'Representación gráfica unifilar, distribución de cargas, anti-vibración y curvas de potencia' },
    'tab-overview': { title: 'Capítulo 3: Esquema Split-Phase (110V/220V)', sub: 'Distribución equilibrada entre Fase 1 (Taller), Fase 2 (Cómputo) y Salida 220V' },
    'tab-simulator': { title: 'Capítulo 4: Simulador Dinámico de Autonomía', sub: 'Calcula tu balance neto diario entre paneles solares (1.890Wp), alternador Victron y consumos' },
    'tab-loads': { title: 'Capítulo 5: Tabla Maestra de Cargas (31 Equipos)', sub: 'Especificaciones completas, amperajes a 48V y asignación por fase HOT1 / HOT2' },
    'tab-technical': { title: 'Capítulo 6: Blindaje Mecánico & Protecciones', sub: 'Normativa RETIE, tornillería Nyloc, silentblocks y cuadro de breakers residenciales' },
    'tab-rescue': { title: 'Capítulo 7: Protocolo de Carga Rápida en Carretera', sub: 'Conexión 220V NEMA 14-30P en talleres y montallantas de Colombia (Carga en <3h)' },
    'tab-suppliers': { title: 'Capítulo 8: Directorio de Proveedores Locales', sub: 'Tus contactos y cotizaciones reales listos para ser agregados' },
    'tab-links-media': { title: 'Capítulo 9: Banco de Enlaces, Fichas & Galería', sub: 'Tus manuales PDF, enlaces de compra y fotos del montaje listos para ser subidos' }
  };

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      navBtns.forEach(b => b.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const activePane = document.getElementById(target);
      if (activePane) activePane.classList.add('active');

      if (titles[target]) {
        pageTitle.textContent = titles[target].title;
        pageSubtitle.textContent = titles[target].sub;
      }
    });
  });

  document.getElementById('btn-quick-calc').addEventListener('click', () => {
    alert("⚡ PROTOCOLO OFICIAL DE CARGA 220V (MUST PV33-6048 TLV):\n\n1. Conectar clavija NEMA 14-30P a toma de 220V (HOT1-HOT2) de montallantas.\n2. Cargador AC interno del MUST inyecta 40A DC constantes a 48V (~2.000W).\n3. Tiempo para llenar el 100% de la batería LP1600 (10.240 Wh): ~2.8 Horas.\n4. Alimenta simultáneamente las cargas internas en modo bypass.");
  });
}

// 2. TABLA MAESTRA DE CARGAS
function renderLoadsTable(data) {
  const tbody = document.getElementById('loads-table-body');
  tbody.innerHTML = '';

  data.forEach(item => {
    const tr = document.createElement('tr');
    
    let connBadge = 'badge-conn-110';
    if (item.conn.includes('220V')) connBadge = 'badge-conn-220';
    if (item.conn.includes('Directo') || item.conn.includes('DC')) connBadge = 'badge-conn-dc';

    tr.innerHTML = `
      <td><strong>${item.name}</strong></td>
      <td><span class="badge-tag">${item.cat}</span></td>
      <td><strong style="font-family: var(--font-mono); color: var(--accent-black);">${item.watts} W</strong></td>
      <td style="font-family: var(--font-mono); font-weight: 700; color: var(--accent-black);">${item.amps.toFixed(1)} A</td>
      <td><span class="badge-tag ${connBadge}">${item.conn}</span></td>
      <td style="font-size: 0.84rem; color: var(--text-muted);">${item.notes}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Búsqueda y Filtros de Cargas
const searchInput = document.getElementById('load-search');
const filterBtns = document.querySelectorAll('.filter-btn');
let currentFilterCat = 'all';

searchInput.addEventListener('input', applyLoadFilters);
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilterCat = btn.dataset.cat;
    applyLoadFilters();
  });
});

function applyLoadFilters() {
  const query = searchInput.value.toLowerCase().trim();
  const filtered = MASTER_LOADS.filter(item => {
    const matchesQuery = item.name.toLowerCase().includes(query) || 
                         item.notes.toLowerCase().includes(query) ||
                         item.conn.toLowerCase().includes(query);
    
    let matchesCat = true;
    if (currentFilterCat === 'Taller') matchesCat = (item.cat === 'Taller');
    if (currentFilterCat === 'Cómputo') matchesCat = (item.cat === 'Cómputo');
    if (currentFilterCat === 'Confort') matchesCat = (item.cat === 'Confort');
    if (currentFilterCat === 'DC') matchesCat = (item.cat === 'DC');

    return matchesQuery && matchesCat;
  });
  renderLoadsTable(filtered);
}

// 3. SIMULADOR DE ENERGÍA Y AUTONOMÍA (ARREGLO HÍBRIDO 1.890 Wp)
// 3. SIMULADOR DE ENERGÍA Y AUTONOMÍA (INTERFAZ EN MINUTOS & COCKPIT HUD FIJO)

function formatDuration(minutes) {
  if (minutes === 0) return '0 min';
  if (minutes < 60) return `${minutes} min`;
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins === 0 ? `${hrs}h` : `${hrs}h ${mins}m`;
}

function calcDeviceWh(load, minutes) {
  if (minutes <= 0) return 0;
  if (load.name.includes("Nevera")) {
    return Math.round((35 * minutes) / 60); // Inverter media real 35W
  }
  return Math.round((load.watts * minutes) / 60);
}

let currentSimFilter = 'all';
let simSearchTerm = '';

function initSimulator() {
  const solarPreset = document.getElementById('sim-solar-preset');
  const hspRange = document.getElementById('sim-hsp-range');
  const hspVal = document.getElementById('sim-hsp-val');
  const victronPreset = document.getElementById('sim-victron-preset');
  const driveRange = document.getElementById('sim-drive-range');
  const driveVal = document.getElementById('sim-drive-val');

  // Eventos de Generación
  hspRange.addEventListener('input', () => {
    hspVal.textContent = `${hspRange.value} h`;
    recalculateEnergy();
  });

  driveRange.addEventListener('input', () => {
    driveVal.textContent = `${driveRange.value} h`;
    recalculateEnergy();
  });

  solarPreset.addEventListener('change', recalculateEnergy);
  victronPreset.addEventListener('change', recalculateEnergy);

  // Botones de Presets Rápidos
  document.getElementById('btn-sim-reset').addEventListener('click', resetAllSimToZero);
  document.getElementById('btn-sim-base').addEventListener('click', setSimPresetBase);
  document.getElementById('btn-sim-workshop').addEventListener('click', setSimPresetWorkshop);
  document.getElementById('btn-sim-kitchen').addEventListener('click', setSimPresetKitchen);

  // Filtros y Búsqueda dentro del Simulador
  const simSearchInput = document.getElementById('sim-search-input');
  if (simSearchInput) {
    simSearchInput.addEventListener('input', (e) => {
      simSearchTerm = e.target.value.toLowerCase().trim();
      filterSimulatorCards();
    });
  }

  const simFilterBtns = document.querySelectorAll('.sim-cat-btn');
  simFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      simFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentSimFilter = btn.dataset.simCat;
      filterSimulatorCards();
    });
  });

  renderSimulatorCards();
  recalculateEnergy();
}

function renderSimulatorCards() {
  const devContainer = document.getElementById('sim-devices-container');
  devContainer.innerHTML = '';

  MASTER_LOADS.forEach(load => {
    if (load.watts === 0) return;

    const mins = deviceSimMinutes[load.id] || 0;
    const subtotalWh = calcDeviceWh(load, mins);
    const isLongRun = load.name.includes('Nevera') || load.name.includes('Starlink') || load.name.includes('Reductor') || load.name.includes('Cámara');
    const maxMinutes = isLongRun ? 1440 : 480;

    let connBadge = 'badge-conn-110';
    if (load.conn.includes('220V')) connBadge = 'badge-conn-220';
    if (load.conn.includes('Directo') || load.conn.includes('DC')) connBadge = 'badge-conn-dc';

    const card = document.createElement('div');
    card.className = `sim-device-card ${mins > 0 ? 'is-active' : ''}`;
    card.id = `sim-card-${load.id}`;
    card.dataset.id = load.id;
    card.dataset.cat = load.cat;
    card.dataset.name = load.name.toLowerCase();

    card.innerHTML = `
      <div class="sim-card-top">
        <div class="sim-card-titles">
          <span class="tag ${connBadge} sim-dev-conn">${load.conn}</span>
          <h4 class="sim-dev-name">${load.name}</h4>
        </div>
        <span class="sim-dev-watts">${load.watts}W</span>
      </div>

      <div class="sim-status-banner ${mins > 0 ? 'active' : 'off'}" id="sim-status-${load.id}">
        <span>${mins > 0 ? '⚡ En uso' : '⚪ Inactivo'}</span>
        <span class="wh-result" id="sim-wh-${load.id}">${mins > 0 ? `${mins}m (${formatDuration(mins)}) ➔ ${subtotalWh} Wh` : 'Apagado (0 Wh)'}</span>
      </div>

      <!-- Fila de Chips Rápidos de Minutos -->
      <div class="sim-quick-chips">
        <button class="chip-min ${mins === 0 ? 'active' : ''}" onclick="window.setDeviceMinutes(${load.id}, 0)">0m</button>
        <button class="chip-min ${mins === 15 ? 'active' : ''}" onclick="window.setDeviceMinutes(${load.id}, 15)">15m</button>
        <button class="chip-min ${mins === 30 ? 'active' : ''}" onclick="window.setDeviceMinutes(${load.id}, 30)">30m</button>
        <button class="chip-min ${mins === 40 ? 'active' : ''}" onclick="window.setDeviceMinutes(${load.id}, 40)">40m</button>
        <button class="chip-min ${mins === 60 ? 'active' : ''}" onclick="window.setDeviceMinutes(${load.id}, 60)">1h</button>
        <button class="chip-min ${mins === 120 ? 'active' : ''}" onclick="window.setDeviceMinutes(${load.id}, 120)">2h</button>
        ${isLongRun ? `
          <button class="chip-min ${mins === 720 ? 'active' : ''}" onclick="window.setDeviceMinutes(${load.id}, 720)">12h</button>
          <button class="chip-min ${mins === 1440 ? 'active' : ''}" onclick="window.setDeviceMinutes(${load.id}, 1440)">24h</button>
        ` : `
          <button class="chip-min ${mins === 240 ? 'active' : ''}" onclick="window.setDeviceMinutes(${load.id}, 240)">4h</button>
        `}
      </div>

      <!-- Controles Finos: Stepper +/- 5 min y Slider -->
      <div class="sim-fine-controls">
        <div class="sim-stepper-row">
          <button class="btn-step" onclick="window.adjustDeviceMinutes(${load.id}, -5)" title="Restar 5 minutos">-5m</button>
          <div class="sim-num-wrap">
            <input type="number" min="0" max="${maxMinutes}" step="5" value="${mins}" class="sim-num-input" id="sim-input-${load.id}" data-id="${load.id}">
            <span class="sim-unit">min</span>
          </div>
          <button class="btn-step" onclick="window.adjustDeviceMinutes(${load.id}, 5)" title="Sumar 5 minutos">+5m</button>
        </div>

        <input type="range" min="0" max="${maxMinutes}" step="5" value="${mins}" class="sim-range-slider" id="sim-slider-${load.id}" data-id="${load.id}">
      </div>
    `;

    devContainer.appendChild(card);
  });

  // Listeners para los inputs numéricos y sliders
  document.querySelectorAll('.sim-num-input').forEach(input => {
    input.addEventListener('change', (e) => {
      const id = parseInt(e.target.dataset.id);
      let val = parseInt(e.target.value) || 0;
      val = Math.max(0, Math.min(1440, val));
      window.setDeviceMinutes(id, val);
    });
  });

  document.querySelectorAll('.sim-range-slider').forEach(slider => {
    slider.addEventListener('input', (e) => {
      const id = parseInt(e.target.dataset.id);
      const val = parseInt(e.target.value) || 0;
      window.setDeviceMinutes(id, val);
    });
  });

  filterSimulatorCards();
}

// Funciones globales vinculadas al objeto window para onclick de chips y steppers
window.setDeviceMinutes = function(id, min) {
  const load = MASTER_LOADS.find(l => l.id === id);
  if (!load) return;

  const validMin = Math.max(0, Math.min(1440, min));
  deviceSimMinutes[id] = validMin;

  const card = document.getElementById(`sim-card-${id}`);
  if (card) {
    if (validMin > 0) {
      card.classList.add('is-active');
    } else {
      card.classList.remove('is-active');
    }

    const subtotalWh = calcDeviceWh(load, validMin);
    const statusBanner = document.getElementById(`sim-status-${id}`);
    const whResult = document.getElementById(`sim-wh-${id}`);
    if (statusBanner && whResult) {
      if (validMin > 0) {
        statusBanner.className = 'sim-status-banner active';
        statusBanner.querySelector('span').textContent = '⚡ En uso';
        whResult.textContent = `${validMin}m (${formatDuration(validMin)}) ➔ ${subtotalWh} Wh`;
      } else {
        statusBanner.className = 'sim-status-banner off';
        statusBanner.querySelector('span').textContent = '⚪ Inactivo';
        whResult.textContent = 'Apagado (0 Wh)';
      }
    }

    // Actualizar input numérico y slider
    const inputNum = document.getElementById(`sim-input-${id}`);
    if (inputNum) inputNum.value = validMin;

    const slider = document.getElementById(`sim-slider-${id}`);
    if (slider) slider.value = validMin;

    // Actualizar estado activo en los chips de la tarjeta
    card.querySelectorAll('.chip-min').forEach(chip => {
      const chipText = chip.textContent.trim();
      let chipVal = 0;
      if (chipText.endsWith('m')) chipVal = parseInt(chipText);
      else if (chipText === '1h') chipVal = 60;
      else if (chipText === '2h') chipVal = 120;
      else if (chipText === '4h') chipVal = 240;
      else if (chipText === '12h') chipVal = 720;
      else if (chipText === '24h') chipVal = 1440;

      if (chipVal === validMin) {
        chip.classList.add('active');
      } else {
        chip.classList.remove('active');
      }
    });
  }

  recalculateEnergy();
  updateActiveBadgeCount();
};

window.adjustDeviceMinutes = function(id, delta) {
  const current = deviceSimMinutes[id] || 0;
  window.setDeviceMinutes(id, current + delta);
};

// Presets del Simulador
function resetAllSimToZero() {
  MASTER_LOADS.forEach(load => {
    deviceSimMinutes[load.id] = 0;
  });
  renderSimulatorCards();
  recalculateEnergy();
}

function setSimPresetBase() {
  resetAllSimToZero();
  // Nevera Mabe Inverter (24h)
  deviceSimMinutes[16] = 1440;
  // Starlink Gen 3 Directo 48V (12h)
  deviceSimMinutes[22] = 720;
  // Reductor 48V/12V (24h)
  deviceSimMinutes[28] = 1440;
  // Cámara Imou Ranger 2 (24h)
  deviceSimMinutes[29] = 1440;
  renderSimulatorCards();
  recalculateEnergy();
}

function setSimPresetWorkshop() {
  setSimPresetBase();
  // Soldadora MIG (20 min)
  deviceSimMinutes[3] = 20;
  // Sierra Circular (15 min)
  deviceSimMinutes[4] = 15;
  // Amoladora Angular (15 min)
  deviceSimMinutes[8] = 15;
  // PC Gamer (2h = 120 min)
  deviceSimMinutes[11] = 120;
  // 3 Monitores (2h = 120 min)
  deviceSimMinutes[20] = 120;
  renderSimulatorCards();
  recalculateEnergy();
}

function setSimPresetKitchen() {
  setSimPresetBase();
  // Estufa Inducción Electrolux 220V (30 min)
  deviceSimMinutes[0] = 30;
  // Horno Freidora KitchenAid (25 min)
  deviceSimMinutes[1] = 25;
  // Licuadora Universal (2 min)
  deviceSimMinutes[7] = 2;
  // Sanduchera (10 min)
  deviceSimMinutes[9] = 10;
  renderSimulatorCards();
  recalculateEnergy();
}

function filterSimulatorCards() {
  const cards = document.querySelectorAll('.sim-device-card');
  cards.forEach(card => {
    const id = parseInt(card.dataset.id);
    const cat = card.dataset.cat;
    const name = card.dataset.name;
    const mins = deviceSimMinutes[id] || 0;

    const matchesSearch = !simSearchTerm || name.includes(simSearchTerm);
    let matchesCat = true;

    if (currentSimFilter === 'active') {
      matchesCat = (mins > 0);
    } else if (currentSimFilter === 'Taller') {
      matchesCat = (cat === 'Taller');
    } else if (currentSimFilter === 'Cómputo') {
      matchesCat = (cat === 'Cómputo');
    } else if (currentSimFilter === 'Confort') {
      matchesCat = (cat === 'Confort');
    } else if (currentSimFilter === 'DC') {
      matchesCat = (cat === 'DC');
    }

    if (matchesSearch && matchesCat) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
  updateActiveBadgeCount();
}

function updateActiveBadgeCount() {
  let activeCount = 0;
  MASTER_LOADS.forEach(load => {
    if ((deviceSimMinutes[load.id] || 0) > 0) activeCount++;
  });
  const badgeEl = document.getElementById('sim-cat-active-num');
  if (badgeEl) badgeEl.textContent = activeCount;
}

function recalculateEnergy() {
  const solarW = parseFloat(document.getElementById('sim-solar-preset').value);
  const hsp = parseFloat(document.getElementById('sim-hsp-range').value);
  const victronW = parseFloat(document.getElementById('sim-victron-preset').value);
  const driveH = parseFloat(document.getElementById('sim-drive-range').value);

  // Generación Solar: Wp * HSP * 0.80 (eficiencia en techo)
  const solarHarvest = Math.round(solarW * hsp * 0.80);
  const driveHarvest = Math.round(victronW * driveH);
  const totalHarvest = solarHarvest + driveHarvest;

  let totalConsumed = 0;
  let activeDeviceCount = 0;
  let maxACMinutes = 0;

  MASTER_LOADS.forEach(load => {
    const mins = deviceSimMinutes[load.id] || 0;
    if (mins > 0) {
      activeDeviceCount++;
      const devWh = calcDeviceWh(load, mins);
      totalConsumed += devWh;

      if (!load.conn.includes('Directo') && !load.conn.includes('DC')) {
        if (mins > maxACMinutes) maxACMinutes = mins;
      }
    }
  });

  // Autoconsumo inversor MUST si hay cargas AC encendidas (~50W proporcional al uso)
  if (maxACMinutes > 0) {
    const inverterIdleHours = Math.max(1, maxACMinutes / 60);
    totalConsumed += Math.round(50 * inverterIdleHours);
  }

  totalConsumed = Math.round(totalConsumed);

  // Actualizar indicadores del Sidebar
  document.getElementById('res-solar-harvest').textContent = `${solarHarvest.toLocaleString()} Wh`;
  document.getElementById('res-drive-harvest').textContent = `${driveHarvest.toLocaleString()} Wh`;
  document.getElementById('res-total-harvest').textContent = `${totalHarvest.toLocaleString()} Wh`;

  // Actualizar Sticky Cockpit HUD (SIEMPRE VISIBLE)
  document.getElementById('dash-gen-val').textContent = `+${totalHarvest.toLocaleString()} Wh`;
  document.getElementById('dash-con-val').textContent = totalConsumed === 0 ? '0 Wh' : `-${totalConsumed.toLocaleString()} Wh`;
  
  const genDetail = document.getElementById('hud-gen-detail');
  if (genDetail) genDetail.textContent = `Solar: ~${solarHarvest.toLocaleString()}Wh • Alt: ~${driveHarvest.toLocaleString()}Wh`;

  const conDetail = document.getElementById('hud-con-detail');
  if (conDetail) {
    conDetail.textContent = maxACMinutes > 0 ? `Inversor MUST: Activo (~50W idle)` : `Inversor MUST: En reposo (0W)`;
  }

  const activeCountEl = document.getElementById('hud-active-count');
  if (activeCountEl) {
    activeCountEl.innerHTML = activeDeviceCount === 0 
      ? `0 equipos activos (0 Wh)` 
      : `<strong>${activeDeviceCount} equipos activos</strong> (-${totalConsumed.toLocaleString()} Wh)`;
  }

  // Balance Neto
  const netBalance = totalHarvest - totalConsumed;
  const netEl = document.getElementById('dash-net-val');
  const netDetail = document.getElementById('hud-net-detail');

  if (netBalance >= 0) {
    netEl.textContent = `+${netBalance.toLocaleString()} Wh`;
    netEl.className = 'hud-m-val text-green';
    if (netDetail) netDetail.textContent = totalConsumed === 0 ? 'Superávit total del sistema' : `Superávit neto de +${netBalance.toLocaleString()} Wh`;
  } else {
    netEl.textContent = `${netBalance.toLocaleString()} Wh`;
    netEl.className = 'hud-m-val text-red';
    if (netDetail) netDetail.textContent = `Déficit de batería cubierto por litio`;
  }

  // Batería MUST LP1600 (10.240 Wh)
  const batStateEl = document.getElementById('dash-bat-state');
  const batBarEl = document.getElementById('hud-bat-bar');

  if (netBalance >= 0) {
    batStateEl.textContent = "100% Carga";
    batStateEl.className = 'hud-m-val text-green';
    if (batBarEl) {
      batBarEl.style.width = '100%';
      batBarEl.style.background = 'var(--accent-green)';
    }
  } else {
    const def = Math.abs(netBalance);
    const remaining = Math.max(0, 10240 - def);
    const pct = Math.round((remaining / 10240) * 100);
    batStateEl.textContent = `${pct}% (${remaining.toLocaleString()} Wh)`;
    batStateEl.className = (pct > 30) ? 'hud-m-val text-cyan' : 'hud-m-val text-red';
    if (batBarEl) {
      batBarEl.style.width = `${pct}%`;
      batBarEl.style.background = pct > 30 ? 'var(--accent-black)' : 'var(--accent-red)';
    }
  }

  updateActiveBadgeCount();
}

// 4. PROVEEDORES & TIENDAS (LIMPIO CON ESTADO VACÍO ELEGANTE)
function renderSuppliers() {
  const container = document.getElementById('suppliers-container');
  container.innerHTML = '';

  if (suppliers.length === 0) {
    container.innerHTML = `
      <div class="empty-state-card" style="grid-column: 1 / -1; background: #ffffff; border: 2px dashed var(--border-subtle); border-radius: var(--radius-lg); padding: 48px 24px; text-align: center;">
        <div style="font-size: 2.2rem; margin-bottom: 12px;">🏪</div>
        <h4 style="font-size: 1.2rem; font-weight: 800; color: var(--accent-black); margin-bottom: 6px;">Directorio Listo y Limpio</h4>
        <p style="font-size: 0.9rem; color: var(--text-muted); max-width: 500px; margin: 0 auto 20px auto;">
          Pásame los nombres, teléfonos y datos de tus proveedores por el chat o usa el botón <strong>"+ Agregar Proveedor"</strong> para registrarlos aquí.
        </p>
      </div>
    `;
    return;
  }

  suppliers.forEach(sup => {
    const card = document.createElement('div');
    card.className = 'supplier-card';
    card.innerHTML = `
      <span class="sup-badge">${sup.category}</span>
      <h4>${sup.name}</h4>
      <div class="sup-contact">${sup.contact || 'Sin contacto guardado'}</div>
      <div class="sup-items">${sup.items || 'Sin notas'}</div>
      <div class="card-actions">
        <button class="btn-sm-del" onclick="deleteSupplier(${sup.id})">Eliminar</button>
      </div>
    `;
    container.appendChild(card);
  });
}

window.deleteSupplier = function(id) {
  if (confirm('¿Eliminar este proveedor de la lista?')) {
    suppliers = suppliers.filter(s => s.id !== id);
    saveSuppliers();
    renderSuppliers();
  }
};

function saveSuppliers() {
  localStorage.setItem('mazda_t_suppliers', JSON.stringify(suppliers));
}

// 5. BANCO DE ENLACES & GALERÍA (LIMPIO CON ESTADO VACÍO ELEGANTE)
function renderLinks() {
  const container = document.getElementById('links-container');
  const countEl = document.getElementById('count-links');
  container.innerHTML = '';
  countEl.textContent = links.length;

  if (links.length === 0) {
    container.innerHTML = `
      <div class="empty-state-card" style="grid-column: 1 / -1; background: #ffffff; border: 2px dashed var(--border-subtle); border-radius: var(--radius-lg); padding: 48px 24px; text-align: center;">
        <div style="font-size: 2.2rem; margin-bottom: 12px;">🔗</div>
        <h4 style="font-size: 1.2rem; font-weight: 800; color: var(--accent-black); margin-bottom: 6px;">Banco de Enlaces Vacío</h4>
        <p style="font-size: 0.9rem; color: var(--text-muted); max-width: 500px; margin: 0 auto 20px auto;">
          Pásame los links de compra o manuales en PDF que quieras guardar, o agrégalos directamente con el botón <strong>"+ Agregar Enlace"</strong>.
        </p>
      </div>
    `;
    return;
  }

  links.forEach(link => {
    const card = document.createElement('div');
    card.className = 'link-card';
    card.innerHTML = `
      <span class="link-tag">${link.cat}</span>
      <h4>${link.title}</h4>
      <p class="link-notes">${link.notes || ''}</p>
      <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="link-anchor">
        Abrir Enlace ↗
      </a>
      <div class="card-actions">
        <button class="btn-sm-del" onclick="deleteLink(${link.id})">Eliminar</button>
      </div>
    `;
    container.appendChild(card);
  });
}

window.deleteLink = function(id) {
  if (confirm('¿Eliminar este enlace?')) {
    links = links.filter(l => l.id !== id);
    saveLinks();
    renderLinks();
  }
};

function saveLinks() {
  localStorage.setItem('mazda_t_links', JSON.stringify(links));
}

function renderGallery() {
  const container = document.getElementById('gallery-container');
  const countEl = document.getElementById('count-photos');
  container.innerHTML = '';
  countEl.textContent = photos.length;

  if (photos.length === 0) {
    container.innerHTML = `
      <div class="empty-state-card" style="grid-column: 1 / -1; background: #ffffff; border: 2px dashed var(--border-subtle); border-radius: var(--radius-lg); padding: 48px 24px; text-align: center;">
        <div style="font-size: 2.2rem; margin-bottom: 12px;">📷</div>
        <h4 style="font-size: 1.2rem; font-weight: 800; color: var(--accent-black); margin-bottom: 6px;">Galería de Imágenes Vacía</h4>
        <p style="font-size: 0.9rem; color: var(--text-muted); max-width: 500px; margin: 0 auto 20px auto;">
          Pásame las fotos o URLs de tus componentes, diagramas o avances del furgón, o usa el botón <strong>"+ Agregar Foto / Imagen"</strong>.
        </p>
      </div>
    `;
    return;
  }

  photos.forEach(photo => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.innerHTML = `
      <img src="${photo.url}" alt="${photo.title}" class="gallery-thumb" onerror="this.src='https://via.placeholder.com/400x300?text=Imagen+No+Disponible'">
      <div class="gallery-info">
        <span class="gallery-title">${photo.title}</span>
        <span class="gallery-tag">${photo.tag || 'Foto'}</span>
      </div>
    `;
    item.addEventListener('click', () => {
      openLightbox(photo.url, photo.title);
    });
    container.appendChild(item);
  });
}

function savePhotos() {
  localStorage.setItem('mazda_t_photos', JSON.stringify(photos));
}

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');

function openLightbox(url, title) {
  lightboxImg.src = url;
  lightboxCaption.textContent = title;
  lightbox.classList.add('open');
}

document.getElementById('lightbox-close').addEventListener('click', () => {
  lightbox.classList.remove('open');
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) lightbox.classList.remove('open');
});

// Pestañas secundarias en Enlaces / Galería
const subTabBtns = document.querySelectorAll('.sub-tab-btn');
const subPanes = document.querySelectorAll('.sub-pane');

subTabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    subTabBtns.forEach(b => b.classList.remove('active'));
    subPanes.forEach(p => p.classList.remove('active'));

    btn.classList.add('active');
    document.getElementById(btn.dataset.subtab).classList.add('active');
  });
});

// 6. MODALES Y FORMULARIOS
function initModals() {
  const modalSup = document.getElementById('modal-supplier');
  document.getElementById('btn-add-supplier').addEventListener('click', () => modalSup.classList.add('open'));

  document.getElementById('form-supplier').addEventListener('submit', (e) => {
    e.preventDefault();
    const newSup = {
      id: Date.now(),
      name: document.getElementById('sup-name').value.trim(),
      category: document.getElementById('sup-category').value.trim(),
      contact: document.getElementById('sup-contact').value.trim(),
      items: document.getElementById('sup-items').value.trim()
    };
    suppliers.push(newSup);
    saveSuppliers();
    renderSuppliers();
    modalSup.classList.remove('open');
    e.target.reset();
  });

  const modalLink = document.getElementById('modal-link');
  document.getElementById('btn-add-link').addEventListener('click', () => modalLink.classList.add('open'));

  document.getElementById('form-link').addEventListener('submit', (e) => {
    e.preventDefault();
    const newLink = {
      id: Date.now(),
      title: document.getElementById('link-title').value.trim(),
      url: document.getElementById('link-url').value.trim(),
      cat: document.getElementById('link-category').value,
      notes: document.getElementById('link-notes').value.trim()
    };
    links.push(newLink);
    saveLinks();
    renderLinks();
    modalLink.classList.remove('open');
    e.target.reset();
  });

  const modalPhoto = document.getElementById('modal-photo');
  document.getElementById('btn-add-photo').addEventListener('click', () => modalPhoto.classList.add('open'));

  document.getElementById('form-photo').addEventListener('submit', (e) => {
    e.preventDefault();
    const newPhoto = {
      id: Date.now(),
      title: document.getElementById('photo-title').value.trim(),
      url: document.getElementById('photo-url').value.trim(),
      tag: document.getElementById('photo-tag').value.trim()
    };
    photos.push(newPhoto);
    savePhotos();
    renderGallery();
    modalPhoto.classList.remove('open');
    e.target.reset();
  });

  document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.dataset.close;
      document.getElementById(modalId).classList.remove('open');
    });
  });
}

// 7. EXPORTAR DATOS A JSON (RESPALDO)
function initExport() {
  document.getElementById('btn-export-data').addEventListener('click', () => {
    const backupData = {
      exportDate: new Date().toISOString(),
      vehicle: "Camión Mazda T4.5 (2000)",
      inverter: "MUST PV33-6048 TLV (Fase Dividida 110/220V 6kW / 18kVA)",
      battery: "MUST LP16-48200 LiFePO4 (51.2V 200Ah 10.240Wh)",
      solar: "2x Osda 720W (1.440Wp) + 1x 450W MPPT Boost 500W (Total 1.890Wp)",
      alternator: "Original Mazda T4.5 + Victron Orion-Tr Smart 12/48-8A (380W)",
      suppliers,
      links,
      photos,
      loads: MASTER_LOADS
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `manual_ingenieria_mazda_t_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });
}
