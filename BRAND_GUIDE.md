# RETROFIT.MX — Brand & Visual Design Guide 2026
## Guía completa para rediseño / diseño con Codex o ChatGPT

---

## 1. IDENTIDAD DE MARCA

### Nombre y Slogan
- **Marca:** RETROFIT (siempre en MAYÚSCULAS)
- **Slogan:** "Eficiencia en Movimiento"
- **Sub-tagline:** "Renueva · Sustituye · Actualiza"
- **URL:** retrofit.mx

### Posicionamiento
Empresa B2B especializada en modernización de sistemas HVAC en México. Reemplazamos ventiladores centrífugos de banda y polea por muros de ventiladores EC (Electronically Commutated). Mercado: ingenieros, gerentes de planta, facility managers en Monterrey y México.

### Propuesta de valor
"No cambies toda la manejadora. Cambia el sistema de ventilación y gana eficiencia, control y redundancia."

### Tono de voz
- **Formal:** siempre "usted", nunca "tú"
- **Técnico pero accesible:** datos específicos (kWh, %, IE5, CFM), no vagos
- **Honesto:** no promesas absolutas; "menor mantenimiento mecánico" no "cero mantenimiento"
- **Directivo:** CTAs claros: "Solicite su evaluación", "Calcule su ahorro"

---

## 2. SISTEMA DE COLOR

### Paleta principal
```
--brand:        #1E53D8   /* Azul primario — marca, botones, acentos */
--brand-dark:   #1440B0   /* Hover del azul */
--brand-light:  #3B74EF   /* Variante clara */
--cyan:         #00C8F0   /* Acento secundario — gradientes, highlights */
--pop:          #ff5a1f   /* Naranja — CTA de acción, alertas, "before" */
--pop-dark:     #e04a10   /* Hover del naranja */
```

### Fondos (dark mode)
```
--bg:           #060a12   /* Fondo principal — negro azulado profundo */
--bg-2:         #090f1c   /* Fondo alternativo */
--bg-3:         #0c1424   /* Fondo terciario */
--surface:      #101828   /* Superficie de cards, modales */
--surface-2:    #172035   /* Superficie elevada */
```

### Bordes
```
--border:       rgba(30,83,216,0.14)   /* Bordes sutiles en cards */
--border-2:     rgba(30,83,216,0.24)   /* Bordes hover/activos */
```

### Texto
```
--text:         #e8ecf4   /* Texto principal */
--text-2:       #9ba8be   /* Texto secundario, descripciones */
--text-3:       #6b7a94   /* Texto de labels, metadatos */
```

### Gradientes
```
--grad-brand:    linear-gradient(135deg, #1E53D8, #00C8F0)
--grad-retrofit: linear-gradient(135deg, #1440B0 0%, #1E53D8 50%, #00C8F0 100%)
```

### Glow / Sombras
```
--glow-sm: 0 0 20px rgba(30,83,216,0.18)
--glow-md: 0 0 40px rgba(30,83,216,0.22)
--glow-lg: 0 0 80px rgba(30,83,216,0.28)
```

---

## 3. TIPOGRAFÍA

### Fuentes (Google Fonts)
```
Saira          → Títulos, nav, botones (display)
Hanken Grotesk → Cuerpo, párrafos (body)
JetBrains Mono → Datos técnicos, stats, badges, etiquetas (mono)
```

### Escala tipográfica aproximada
```
Hero H1:         72–88px, weight 900, Saira
Section H2:      40–48px, weight 800, Saira
Card H3:         20–24px, weight 700, Saira
Body text:       14–16px, weight 400–500, Hanken Grotesk
Labels/tags:     11–13px, weight 500–700, JetBrains Mono, letter-spacing 0.06–0.1em
```

### Uso de Mono
- Stats numéricos: "−58% ENERGÍA", "N+1", "IE5"
- Badges de sección: "HERRAMIENTA INTERACTIVA", "METODOLOGÍA"
- Protocolos técnicos: "BACnet IP", "Modbus RTU", "0–10 V"
- Tags de proyectos: "COMERCIAL", "DATA CENTER"

---

## 4. LOGO

### Símbolo (pinwheel / aspa)
SVG path (viewBox="158 366 228 218"):
```svg
<path fill="#1E53D8" fill-rule="evenodd" d="
  M347.80 567.92C321.32 564.04 298.30 546.40 285.91 520.50C280.29 508.75 277.00 496.72
  276.25 485.25L275.72 477.00L323.36 477.00L371.00 477.00L371.00 523.00L371.00 569.00
  L362.25 568.88C357.44 568.81 350.94 568.38 347.80 567.92Z
  M174.32 560.25C175.43 546.39 181.09 531.07 189.91 518.03C197.57 506.72 215.99 491.42
  228.51 485.96C240.94 480.55 256.58 477.07 268.75 477.02L273.00 477.00L273.00 522.50
  L273.00 568.00L223.35 568.00L173.70 568.00L174.32 560.25Z
  M174.00 427.50C174.00 402.48 174.34 382.00 174.75 382.01C175.16 382.01 180.45 382.46
  186.50 383.00C210.70 385.15 228.70 393.65 245.08 410.64C256.49 422.49 263.53 433.67
  267.95 447.02C270.55 454.86 273.00 466.06 273.00 470.07L273.00 473.00L223.50 473.00
  L174.00 473.00L174.00 427.50Z
  M275.50 428.50L275.50 384.00L323.39 384.00L371.29 384.00L370.62 391.25C369.61 402.26
  367.28 410.49 362.07 421.50C352.05 442.66 334.20 459.04 312.66 466.82C303.67 470.07
  288.46 473.00 280.57 473.00L275.50 473.00L275.50 428.50Z
"/>
```

### Combinación logo
- Símbolo azul (#1E53D8) + wordmark "RETROFIT" en Saira weight 900
- En dark backgrounds: símbolo azul + texto blanco
- Wordmark completo SVG disponible en: `assets/logo-dark.svg`

---

## 5. TOKENS DE DISEÑO

### Border Radius
```
--radius-sm:  8px    → Chips, tags pequeños
--radius-md:  12px   → Inputs, elementos medianos
--radius-lg:  18px   → Cards, paneles
--radius-xl:  26px   → Modal, hero cards grandes
```

### Easing
```
--ease-mech: cubic-bezier(.2, 0, 0, 1)   → Animaciones mecánicas/técnicas (característico de marca)
```

### Espaciado de secciones
```
Secciones:    padding: 100px 0
Container:    max-width: 1200px, padding: 0 24px
```

### Bordes de cards
```
Cards típicas: background var(--surface), border 1px solid var(--border), border-radius var(--radius-lg)
Hover:         border-color var(--border-2), box-shadow var(--glow-sm), transform translateY(-3px)
```

---

## 6. COMPONENTES CLAVE

### Botones
```css
/* Primario — azul */
.btn-primary {
  background: var(--brand);
  color: #fff;
  font-family: Saira;
  font-weight: 700;
  padding: 14px 28px;
  border-radius: var(--radius-md);
  letter-spacing: 0.03em;
}
/* CTA naranja — acción crítica */
.btn-pop { background: var(--pop); }

/* Ghost */
.btn-ghost {
  border: 1.5px solid rgba(30,83,216,0.24);
  background: transparent;
  color: var(--text);
}
```

### Section Label (etiqueta de sección)
```
Mono, tamaño 11px, color #1E53D8 o #00C8F0
Ejemplo: "METODOLOGÍA", "HERRAMIENTA INTERACTIVA"
Aparece arriba de todos los títulos H2 de sección
```

### Gradient Text
```css
background: linear-gradient(135deg, #1E53D8, #00C8F0);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```
Se usa en la parte de acento de cada título H2.

### Cards de beneficios / features
- Grid 4 columnas (desktop) → 2 → 1 (mobile)
- Icono Font Awesome con fondo rgba(brand, 0.1)
- H3 Saira, párrafo Hanken Grotesk
- Hover: border brand-light + glow

### Carousel (carrusel horizontal)
- `display: flex; overflow-x: auto; scroll-snap-type: x mandatory`
- Cards: `flex: 0 0 300px; scroll-snap-align: start`
- Flechas prev/next absolutas a los lados del container
- Click en card → abre modal overlay

### Modal Overlay
```
background: rgba(6,10,18,0.82) + backdrop-filter: blur(10px)
Caja: var(--surface), max-width 640px, max-height 88vh, overflow-y auto
Animación: translateY(20px) scale(0.97) → translateY(0) scale(1)
Cierre: botón X, clic fuera, tecla Escape
```

### Stats numéricos (hero)
```
Valor: 64–72px, Saira 900, gradient-text
Label: 12px, Hanken 500, --text-2
Separadores: líneas verticales rgba(30,83,216,0.2)
```

### Proceso steps
- Grid 64px (número) + 1fr (contenido)
- Línea vertical conectora entre pasos
- Número: Mono 700, color brand
- Tags: chips Mono en fondo rgba(brand, 0.08)

### Fan Wall Widget (animación hero)
- 9 círculos en grid 3×3
- Activos: rotación continua con pseudo-elemento blade
- 1 en mantenimiento: color pop (#ff5a1f), animación diferente
- Badges debajo con stats en Mono

---

## 7. ESTRUCTURA DE PÁGINAS

### index.html — Página principal
```
1. NAV          → Logo + 5 links + CTA button
2. HERO         → Canvas partículas + Fan Wall widget + Hero stats
3. EL PROBLEMA  → 6 tarjetas de problemas (grid 3×2)
4. LA SOLUCIÓN  → Fotos antes/después + render + 4 features + ZAcore BMS
5. BENEFICIOS   → 4 cards + impact band con stats globales
6. APLICACIONES → Carousel de 6 aplicaciones (AHU, ventilación, torre, chiller, evaporador, transformadores)
7. CALCULADORA  → Sliders interactivos + resultados en tiempo real
8. PROCESO      → 4 pasos numerados con tags
9. PROYECTOS    → 6 cards con filtros (Comercial / Industrial / Data Center)
10. BLOG        → Carousel de 6 artículos técnicos
11. CONTACTO    → Info + formulario
12. FOOTER      → Brand + 4 columnas de links
```

### aplicaciones.html — Detalle de aplicaciones
Página expandida con todas las aplicaciones en grid, cada una con imagen, descripción y stats.

### blog.html — Blog técnico
Artículos sobre tecnología EC, ahorro energético, BACnet, redundancia.

### motor-ec.html — Página de producto
Detalle técnico del motor EC IE5, specs, comparativa AC vs EC.

---

## 8. IMÁGENES DISPONIBLES (assets/)

### Imágenes principales
```
muro-ventiladores-ec.jpg     → Render principal del sistema EC (hero de La Solución)
ventilador-antiguo.jpg       → Fan AC de banda/polea (foto "ANTES")
fans-ec-instalados.jpg       → Muro EC instalado en AHU (foto "DESPUÉS")
zacore-bms.jpg               → Pantalla BMS/monitoreo ZAcore
fanwall-9fans.jpg            → Grid 3x3 de fans ECblue
motor-ec-azul.jpg            → Motor EC vista externa azul
motor-ec-corte.jpg           → Corte transversal del motor EC
motor-ec-explosionado.jpg    → Vista explosionada del motor EC
motor-ec-frontal.jpg         → Vista frontal del motor EC
fan-antiguo-grande.jpg       → Ventilador centrífugo AC grande
fan-ec-unit.jpg              → Unidad de fan EC individual
fan-axial.jpg                → Fan axial EC
ecblue-creative.jpg          → Imagen creativa producto ECblue
ecblue-flange.jpg            → ECblue con brida de montaje
ecblue-producto.jpg          → Producto ECblue
```

### Imágenes de aplicaciones (6 series)
```
app-img-p1-*.jpg  → AHU (5 imágenes de manejadoras)
app-img-p2-*.jpg  → Ventilación (6 imágenes)
app-img-p3-*.jpg  → Torres de enfriamiento (4 imágenes)
app-img-p4-*.jpg  → Refrigeración/proceso (4 imágenes)
app-img-p5-*.jpg  → Chillers (6 imágenes)
app-img-p6-*.jpg  → Evaporadores (5 imágenes)
app-img-p7-*.jpg  → Transformadores (5 imágenes)
```

### Logos y vectores
```
assets/symbol.svg      → Solo el símbolo pinwheel en SVG
assets/logo-dark.svg   → Logo completo horizontal (símbolo + wordmark)
```

---

## 9. CONTENIDO TÉCNICO CLAVE

### El producto
- **Motor EC IE5**: Electronically Commutated, 90–95% eficiencia, VFD integrado, sin escobillas
- **Muro de ventiladores EC (Fan Wall)**: Arreglo N×M de fans EC en paralelo sobre tabique (bulkhead) dentro del AHU
- **Proveedor principal**: Ziehl-Abegg, línea ECblue
- **Impulsor ZAflow**: Diseño biomimético inspirado en panal de abeja

### Cifras clave del negocio
```
Ahorro energético:    50–60% en ventilación (modelo: ×0.55)
Eficiencia motor EC:  90–95% (IE5 Ultra Premium)
Eficiencia motor AC:  55–70% (IE2–IE3)
CO₂ factor México:    0.454 kg/kWh (red eléctrica nacional)
ROI típico:           2–4 años
HVAC / edificio:      40–65% del consumo eléctrico total
```

### Fórmula calculadora
```
kWh_ahorrados = Potencia_kW × Horas_día × Días_año × 0.55
MXN_anuales   = kWh_ahorrados × Tarifa_MXN
CO₂_tons      = kWh_ahorrados × 0.454 / 1000
```

### Protocolos de integración
```
BACnet IP, BACnet MS/TP, Modbus RTU, señal 0–10 V / PWM
```

### Proyectos de referencia (datos genéricos B2B)
```
Centro Comercial  → Monterrey, NL     → −54% → 18 fans EC
Planta Automotriz → Apodaca, NL       → −61% → 32 fans EC
Hospital Regional → San Pedro, NL     → −47% → 24 fans EC
Centro de Datos   → Querétaro, QRO    → −58% → 48 fans EC
Torre de Oficinas → CDMX              → −52% → 20 fans EC
Centro Logístico  → Saltillo, COAH    → −60% → 28 fans EC
```

---

## 10. CONTACTO / DATOS DE LA EMPRESA

```
Empresa:    RETROFIT
Ciudad:     Monterrey, Nuevo León, México
Teléfono:   81 1568 1486  (+52-81-1568-1486)
Email:      Info@retrofit.com.mx
Web:        retrofit.mx
WhatsApp:   wa.me/528115681486
Horario:    Lun–Vie 9:00–18:00
```

---

## 11. NOTAS DE DISEÑO PARA CODEX / CHATGPT

### Dark theme obligatorio
El sitio es 100% dark mode. Fondo base #060a12. No existe versión light.

### Partículas en hero
Canvas con 120 partículas flotantes (azul/cyan) con conexiones entre partículas cercanas (<100px). Animación suave continua con `requestAnimationFrame`.

### Scroll reveal
Todos los elementos con clase `.reveal` aparecen con fade+translateY al entrar al viewport (IntersectionObserver). Se puede configurar delay con `data-delay="100"` (ms).

### Animaciones de contador
`.stat-num[data-target="60"]` → anima de 0 a 60 con easing cúbico al entrar al viewport.

### Carrusel (aplicaciones + blog)
Scroll horizontal nativo con `scroll-snap`. Botones prev/next con scroll programático. Click en card → modal con imagen + contenido del template oculto.

### Sin loader, sin cursor custom
El rediseño eliminó el loader inicial y el cursor personalizado. El hero anima directamente 300ms después del DOMContentLoaded.

### Responsive breakpoints
```
1024px → tablet landscape
768px  → tablet portrait
640px  → mobile grande
480px  → mobile pequeño
```

---

## 12. INSTRUCCIÓN SUGERIDA PARA CHATGPT/CODEX

> Eres un diseñador web experto. Usando el brand guide y el código fuente adjunto de RETROFIT.MX, rediseña [sección/componente/página]. El sitio es 100% dark mode con fondo #060a12, paleta azul #1E53D8 + cyan #00C8F0 + naranja de acción #ff5a1f. Fuentes: Saira (títulos), Hanken Grotesk (cuerpo), JetBrains Mono (datos técnicos). El tono es formal (usted), B2B técnico, sin exageraciones. Mantén los datos técnicos reales: motor EC IE5, 50–60% ahorro, redundancia N+1, protocolos BACnet/Modbus.

---

*Generado el 2026-06-25 · RETROFIT.MX · Monterrey, Nuevo León, México*
