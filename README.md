# Manual Técnico y Centro de Control — Camper Taller Mazda T (2000)

> **Ingeniería Eléctrica y Memoria Técnica Definitiva** para conversión de camión Mazda T (4.5 toneladas) en taller móvil autónomo con arquitectura eléctrica de **48V DC** y **Fase Dividida (110V / 220V)**.

![Arquitectura Eléctrica 48V](https://img.shields.io/badge/Arquitectura-48V%20DC-0284c7?style=flat-square)
![Inversor MUST](https://img.shields.io/badge/Inversor-MUST%206kW%20Split--Phase-09090b?style=flat-square)
![Batería Litio](https://img.shields.io/badge/Bater%C3%ADa-LiFePO4%2010.240Wh-16a34a?style=flat-square)
![Solar Techo](https://img.shields.io/badge/Generaci%C3%B3n-1.920%20Wp-eab308?style=flat-square)
![Normativa](https://img.shields.io/badge/Cumplimiento-RETIE%20Colombia-dc2626?style=flat-square)

---

## 📋 Resumen del Sistema

- **Inversor Cargador Híbrido:** MUST PV33-6048 TLV (Baja Frecuencia con Transformador Toroidal de Cobre, 6.000W continuos, 18.000 VA pico). Salidas simultáneas en fase dividida:
  - **Fase 1 (HOT1 - N / 110V):** Taller y Cocina (GFCI 20A).
  - **Fase 2 (HOT2 - N / 110V):** Cómputo (RTX 5080, monitores), Impresión 3D y Nevera Inverter.
  - **Salida Bifásica (HOT1 - HOT2 / 220V):** Cubierta de inducción empotrable Electrolux ETIH30G7EOB (3.700W) y Aire Acondicionado Samsung Inverter 12k BTU (1.100W).
- **Almacenamiento:** Batería Litio LiFePO4 MUST LP16-48200 (51.2V 200Ah = 10.240 Wh útiles, BMS de 150A continuo, 6.000 ciclos al 80% DOD).
- **Generación Solar Techo (1.920 Wp):**
  - **Línea Principal (1.460 Wp):** 2x Paneles TOPCon Bifaciales OSDA 730W en serie (2S) al MPPT 80A integrado del MUST.
  - **Línea Secundaria (460 Wp):** 1x Panel Restar 460W conectado a controlador elevador MPPT Boost 500W (SmartSolar 48V).
- **Carga Alternador en Carretera:** Cargador DC-DC Victron Orion-Tr Smart 12/48-8A (380W) con sensor de motor encendido.
- **Protocolo de Carga Rápida 220V en Carretera:** Clavija industrial NEMA 14-30P con cable STW 4x10 AWG (15m) para talleres y montallantas en Colombia (carga completa en < 2.8 horas @ 40A DC).

---

## 🚀 Capítulos de la Aplicación Web

1. **Capítulo 1: Equipos Oficiales Verificados:** Hojas de datos técnicas y especificaciones verificadas de fábrica.
2. **Capítulo 2: Diagramas Técnicos & Curvas de Potencia:** Diagrama unifilar interactivo SVG, balance de potencia simultánea 220V, curvas solares, balance bifásico y desacoplo mecánico antivibración de chasis.
3. **Capítulo 3: Esquema Split-Phase (110V/220V):** Balance de cargas entre fases y topología de red.
4. **Capítulo 4: Simulador Dinámico de Autonomía:**
   - **Cockpit HUD Fijo:** Siempre visible en pantalla al hacer scroll con valores de Cosecha Solar, Carga Alternador, Consumo Total, Balance Neto y Estado % de la batería LiFePO4.
   - **Arranque en Cero (0 min):** Todos los 31 equipos inician apagados.
   - **Ajuste por Minutos:** Chips rápidos (`0m`, `15m`, `30m`, `40m`, `1h`, `2h`, `4h`, `12h`, `24h`), botones `[-5m]` / `[+5m]` e input numérico.
   - **Presets Rápidos:** `[🔄 Todo a Cero]`, `[🏕️ Base 24/7]`, `[⚡ Día de Taller]`, `[🍳 Almuerzo Gourmet]`.
5. **Capítulo 5: Tabla Maestra de Cargas (31 Equipos):** Potencias, amperajes a 48V, línea asignada y buscador instantáneo.
6. **Capítulo 6: Blindaje Mecánico & Protecciones:** RETIE, tuercas de seguridad Nyloc, silentblocks M10, marcas de torque y cuadro de breakers.
7. **Capítulo 7: Carga Rápida 220V en Ruta:** Protocolo NEMA 14-30P para montallantas y estaciones de servicio.
8. **Capítulo 8: Directorio de Proveedores Locales:** Proveedores verificados en Colombia (Ineldec, Ecozaque, Emergente Energía, Electrolux).
9. **Capítulo 9: Banco de Enlaces, Fichas & Galería:** Enlaces directos a productos y fichas técnicas.

---

## 💻 Ejecución Local

Esta aplicación es una Single Page Application (SPA) ultra ligera construida con Vanilla HTML5, CSS3 moderno y JavaScript (ES6+), sin dependencias externas complejas.

Para verla localmente:

```bash
# Con Python
python -m http.server 8080

# O con Node.js / npx
npx serve .
```

Abre tu navegador en `http://localhost:8080/`.

---

## 🛠️ Tecnologías y Estilo
- **Diseño:** Minimalista escandinavo moderno (blanco puro `#ffffff`, gris suave `#f8fafc` y tipografía de alto contraste `#09090b`).
- **Fuentes:** [Outfit](https://fonts.google.com/specimen/Outfit) y [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono).
- **Diagramación:** Gráficos técnicos SVG vectoriales optimizados e interactivos.
