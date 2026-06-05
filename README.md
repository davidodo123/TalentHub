# TalentHub — Job Board Headless

Portal de empleo moderno construido con arquitectura **headless**: WordPress como CMS/API en Hostinger, Next.js como frontend en Vercel.

**Live:** `https://talent-hub-one-livid.vercel.app` → (futuro: `https://talenthub.damen.sbs`)  
**Backend:** `https://cms.damen.sbs/wp-admin`  
**Repo:** `https://github.com/davidodo123/TalentHub`

---

## Stack

| Capa | Tecnología | Dónde |
|------|-----------|-------|
| Frontend | Next.js 16 + TypeScript + Tailwind v4 | Vercel (gratis) |
| Backend | WordPress + WP Job Manager | Hostinger Premium |
| Base de datos | MySQL (incluida en Hostinger) | Hostinger |
| API | WordPress REST API (`/wp-json/wp/v2/`) | `cms.damen.sbs` |
| Estilos | Tailwind CSS v4 (CSS-first, sin `tailwind.config`) | — |

---

## Estado actual

### Hecho
- [x] Next.js con App Router, TypeScript, Tailwind v4
- [x] WordPress + WP Job Manager en `cms.damen.sbs`
- [x] REST API habilitada para `job_listing`, `job_types`, `job_categories`
- [x] CORS configurado en `functions.php`
- [x] Frontend desplegado en Vercel
- [x] Variable de entorno `NEXT_PUBLIC_WP_API_URL` apuntando a `cms.damen.sbs`
- [x] Empleos de WordPress aparecen en tiempo real en el frontend

### Pendiente
- [ ] Configurar dominio `talenthub.damen.sbs` en Vercel
- [ ] Añadir registro DNS CNAME en Hostinger → Vercel
- [ ] Crear 5-10 empleos de demo realistas (empresa, ubicación, tipo, categoría)
- [ ] Añadir tarjeta de TalentHub al portfolio `damen.sbs`
- [ ] Imagen `cms.damen.sbs` en `next.config.ts` → `remotePatterns`

---

## Desarrollo local

```bash
cd frontend
npm install --include=dev
cp .env.example .env.local   # editar con la URL del backend
npm run dev
```

Variables de entorno necesarias:

```env
NEXT_PUBLIC_WP_API_URL=https://cms.damen.sbs/wp-json
```

---

## Arquitectura Vercel + WordPress Hostinger

```
Usuario
  │
  ▼
Vercel (Next.js)          ←── gratis, CDN global, auto-deploy desde GitHub
  │  talenthub.damen.sbs
  │
  │  fetch en build-time o en cliente
  ▼
WordPress REST API         ←── cms.damen.sbs (Hostinger Premium)
  │  /wp-json/wp/v2/...
  │
  ▼
MySQL (Hostinger)          ←── incluido en el plan
```

**Por qué esta arquitectura:**
- Hostinger Premium es hosting compartido → no puede ejecutar Node.js como servidor
- WordPress sí corre en PHP → perfecto para Hostinger
- Next.js necesita Node.js → Vercel lo provee gratis con CDN global
- El frontend llama a la API de WordPress → se renderizan las páginas

---

## ¿Puedo poner más proyectos en subdominio?

**Sí, sin límite.** Cada proyecto es independiente:

```
damen.sbs              → Portfolio principal (Vite/Node.js en Hostinger Horizons)
cms.damen.sbs          → WordPress backend (Hostinger Premium, PHP)
talenthub.damen.sbs    → TalentHub frontend (Vercel, Next.js)
blog.damen.sbs         → Futuro blog (Vercel, Next.js)
app.damen.sbs          → Futura SaaS (Vercel, Next.js)
```

Cada subdomain:
1. En **Hostinger** → DNS → añadir registro `CNAME` apuntando a `cname.vercel-dns.com`
2. En **Vercel** → proyecto → Settings → Domains → añadir el subdominio

Un dominio (`damen.sbs`) puede tener tantos subdominios como quieras. Cada uno puede apuntar a un proyecto Vercel distinto o al mismo WordPress con distinta ruta.

---

## Qué más puedes hacer con Vercel + WordPress Hostinger

### Con el stack actual

| Idea | Qué añadir |
|------|-----------|
| **Blog headless** | ACF + WP REST API + Next.js → `blog.damen.sbs` |
| **Portfolio con CMS** | WordPress maneja el contenido, Next.js lo renderiza en `damen.sbs` |
| **Tienda** | WooCommerce en Hostinger + Next.js en Vercel (headless commerce) |
| **Multiidioma** | `next-intl` en el frontend + WPML en WordPress |

### Sin WordPress (solo Vercel)

| Idea | Stack |
|------|-------|
| **SaaS de facturas** | Next.js + Supabase (gratis) + Stripe |
| **Directorio de empresas** | Next.js + Airtable API o Google Sheets como backend |
| **Herramienta de CV** | Next.js + jsPDF → generador de CV online |
| **Dashboard de métricas** | Next.js + Chart.js + cualquier API pública |

---

## Proyectos futuros recomendados para el portfolio

Proyectos que demuestran skills distintos y se construyen rápido:

### 1. DevLinks — Linktree para devs
Bio page personal con links a GitHub, proyectos, contacto. Stack: Next.js + Vercel. Sin backend. Rápido, visual, útil.

### 2. JobTracker — Seguimiento de candidaturas
App para guardar a qué empleos has aplicado, en qué estado están, notas. Stack: Next.js + Supabase (gratis). Demuestra CRUD real con auth.

### 3. Blog técnico headless
WordPress en `cms.damen.sbs` ya lo tienes. Añade el CPT `post` con Next.js en `blog.damen.sbs`. Demuestra que sabes SEO, markdown, imágenes optimizadas.

### 4. Generador de contratos freelance
Formulario → PDF descargable. Stack: Next.js + jsPDF. Sin backend. Útil para el mundo real, impresiona a reclutadores.

### 5. API pública de empleos (extensión de TalentHub)
Exponer `/api/jobs` desde Next.js → cualquiera puede consultar los empleos. Demuestra diseño de API REST con documentación (Swagger).

---

## Comandos útiles

```bash
# Verificar tipos TypeScript
node_modules/.bin/tsc --noEmit

# Build local
npm run build

# Ver la API de WordPress
curl https://cms.damen.sbs/wp-json/wp/v2/job_listing
```
