import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Instagram,
  Mail,
  Menu,
  Star,
  X,
} from 'lucide-react'

/* ---------- Shared motion config ---------- */
const springPremium = { type: 'spring' as const, stiffness: 120, damping: 20 }

const heroStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
}

const heroItem: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(12px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: springPremium,
  },
}

const revealItem: Variants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: springPremium,
  },
}

/* ---------- Ambient background ---------- */
function AmbientBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse at center, black 35%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, black 35%, transparent 75%)',
        }}
      />
      <motion.div
        className="absolute -top-40 -left-40 h-[620px] w-[620px] rounded-full"
        style={{
          background:
            'radial-gradient(closest-side, rgba(0,112,243,0.28), rgba(0,112,243,0) 70%)',
          filter: 'blur(4px)',
        }}
        animate={{ x: [0, 40, -20, 0], y: [0, 20, -30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-10%] h-[520px] w-[520px] rounded-full"
        style={{
          background:
            'radial-gradient(closest-side, rgba(102,166,255,0.18), rgba(102,166,255,0) 70%)',
          filter: 'blur(6px)',
        }}
        animate={{ x: [0, -30, 20, 0], y: [0, -20, 30, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Logo watermark */}
      <motion.div
        className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.04, 0.09, 0.04], rotate: [0, 3, -2, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut' }}
        style={{ mixBlendMode: 'screen' }}
      >
        <img
          src="/alvra-mark.png"
          alt=""
          aria-hidden
          className="h-[68vmin] w-[68vmin] select-none"
          style={{
            filter: 'blur(2px) drop-shadow(0 0 50px rgba(0,112,243,0.3))',
          }}
        />
      </motion.div>
      <motion.div
        className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
        style={{ mixBlendMode: 'screen' }}
      >
        <div
          className="h-[80vmin] w-[80vmin] rounded-full"
          style={{
            background:
              'conic-gradient(from 0deg, rgba(0,112,243,0) 0deg, rgba(0,112,243,0.10) 90deg, rgba(0,112,243,0) 180deg, rgba(102,166,255,0.07) 270deg, rgba(0,112,243,0) 360deg)',
            mask: 'radial-gradient(closest-side, transparent 64%, black 65%, black 66.5%, transparent 67.5%)',
            WebkitMask:
              'radial-gradient(closest-side, transparent 64%, black 65%, black 66.5%, transparent 67.5%)',
          }}
        />
      </motion.div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,#050505_100%)]" />
    </div>
  )
}

/* ---------- Top bar ---------- */
const navItems = [
  { label: 'Productos', href: '#productos' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Equipo', href: '#equipo' },
  { label: 'Contacto', href: '#contacto' },
]

function TopBar() {
  const { scrollY } = useScroll()
  const navOpacity = useTransform(scrollY, [200, 320], [0, 1], { clamp: true })
  const navPE = useTransform(navOpacity, (v) =>
    v > 0.5 ? 'auto' : 'none',
  ) as unknown as 'auto' | 'none'
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 border-b border-white/[0.06] bg-obsidian/70 backdrop-blur-xl backdrop-saturate-150"
        />
        <div className="px-5 pt-4 pb-3 md:px-10 md:pt-5 md:pb-4">
          <div className="mx-auto flex max-w-[1280px] items-center justify-between">
            <a href="#hero" aria-label="Alvra.IA — inicio" className="block">
              <div
                data-morph-target
                aria-hidden
                style={{ width: BRAND_WIDTH, height: 36 }}
              />
            </a>
            <motion.nav
              style={{ opacity: navOpacity, pointerEvents: navPE }}
              className="hidden items-center gap-8 md:flex"
            >
              {navItems.map((it) => (
                <a
                  key={it.label}
                  href={it.href}
                  className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/45 transition-colors hover:text-white"
                >
                  {it.label}
                </a>
              ))}
            </motion.nav>
            <div className="flex items-center gap-3">
              <motion.a
                href="#contacto"
                style={{ opacity: navOpacity, pointerEvents: navPE }}
                className="group hidden items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-white backdrop-blur-md transition-all hover:border-electric hover:bg-electric/15 md:inline-flex"
              >
                Agendá 20 min
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.a>
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Abrir menú"
                aria-expanded={menuOpen}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/[0.04] text-white backdrop-blur-md transition-colors hover:border-electric md:hidden"
              >
                <Menu className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}

function MobileMenu({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 md:hidden"
        >
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={onClose}
            className="absolute inset-0 bg-obsidian/95 backdrop-blur-2xl"
          />
          <motion.div
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={springPremium}
            className="relative flex h-full flex-col px-6 pb-10 pt-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="/alvra-mark.png"
                  alt=""
                  aria-hidden
                  className="h-8 w-8 object-contain drop-shadow-[0_0_14px_rgba(0,112,243,0.5)]"
                />
                <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-white">
                  Alvra.IA
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar menú"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="mt-12 flex flex-col">
              {navItems.map((it) => (
                <a
                  key={it.label}
                  href={it.href}
                  onClick={onClose}
                  className="border-b border-white/[0.08] py-5 font-serif text-3xl italic text-white/90 transition-colors hover:text-electric"
                >
                  {it.label}
                </a>
              ))}
            </nav>
            <a
              href="#contacto"
              onClick={onClose}
              className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-electric px-7 py-4 font-mono text-[11px] uppercase tracking-[0.25em] text-white shadow-glow"
            >
              Agendá 20 min
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ---------- Side dots — IG-carousel style section indicator ---------- */
const sectionDots = [
  { id: 'hero', label: 'Inicio' },
  { id: 'productos', label: 'Productos' },
  { id: 'resenas', label: 'Reseñas' },
  { id: 'proceso', label: 'Proceso' },
  { id: 'filtro', label: 'Filtro' },
  { id: 'equipo', label: 'Estructura' },
  { id: 'faq', label: 'Preguntas' },
  { id: 'contacto', label: 'Contacto' },
]

function SectionDots() {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive((e.target as HTMLElement).id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sectionDots.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <div className="pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-4 md:right-8 md:flex">
      {sectionDots.map((s) => {
        const isActive = active === s.id
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-label={`Ir a ${s.label}`}
            className="group pointer-events-auto flex items-center gap-3"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-white/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {s.label}
            </span>
            <motion.span
              animate={{
                width: isActive ? 22 : 6,
                backgroundColor: isActive
                  ? 'rgb(0,112,243)'
                  : 'rgba(255,255,255,0.28)',
                boxShadow: isActive
                  ? '0 0 14px rgba(0,112,243,0.65)'
                  : '0 0 0 rgba(0,0,0,0)',
              }}
              transition={springPremium}
              className="block h-[6px] rounded-full"
            />
          </a>
        )
      })}
    </div>
  )
}

/* ---------- Morphing brand lockup (header center → header left) ---------- */
const BRAND_WIDTH = 118
const BRAND_BIG_SCALE = 1.3

function MorphingBrand() {
  const [target, setTarget] = useState({ x: 40, y: 20 })
  useEffect(() => {
    const measure = () => {
      const el = document.querySelector<HTMLElement>('[data-morph-target]')
      if (!el) return
      const r = el.getBoundingClientRect()
      setTarget({ x: r.left, y: r.top })
    }
    measure()
    const t = setTimeout(measure, 80)
    window.addEventListener('resize', measure)
    return () => {
      clearTimeout(t)
      window.removeEventListener('resize', measure)
    }
  }, [])

  const { scrollY } = useScroll()
  const progress = useTransform(scrollY, [0, 320], [0, 1], { clamp: true })
  const scale = useTransform(progress, [0, 1], [BRAND_BIG_SCALE, 1])
  const centerOffset = (BRAND_WIDTH * BRAND_BIG_SCALE) / 2

  const transform = useMotionTemplate`translate(calc(50vw - ${centerOffset}px + (${target.x}px - 50vw + ${centerOffset}px) * ${progress}), ${target.y}px) scale(${scale})`

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: BRAND_WIDTH,
        transform,
        transformOrigin: '0 0',
        zIndex: 60,
        pointerEvents: 'none',
      }}
      className="flex items-center gap-3"
    >
      <img
        src="/alvra-mark.png"
        alt="Alvra.IA"
        className="h-9 w-9 object-contain drop-shadow-[0_0_14px_rgba(0,112,243,0.5)]"
      />
      <span className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.28em] text-white">
        Alvra.IA
      </span>
    </motion.div>
  )
}

/* ---------- Hero ---------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.14])
  const blur = useTransform(scrollYProgress, [0, 1], [0, 10])
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0])
  const filter = useTransform(blur, (v) => `blur(${v}px)`)

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <section
      id="hero"
      ref={ref}
      className="relative z-10 flex min-h-[100vh] items-center justify-center px-6 pb-16 pt-32 md:px-10 md:pb-24 md:pt-40"
    >
      <motion.div
        style={{ scale, filter, opacity }}
        className="relative mx-auto w-full max-w-[1100px]"
      >
        <AnimatePresence>
          {mounted && (
            <motion.div
              key="hero-stack"
              variants={heroStagger}
              initial="hidden"
              animate="show"
              className="flex flex-col items-center text-center"
            >
              <motion.div
                variants={heroItem}
                className="mb-10 inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/50"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric/70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-electric" />
                </span>
                Consultora · CABA · 2026
              </motion.div>

              <motion.h1
                variants={heroItem}
                className="font-serif text-[clamp(52px,9vw,148px)] italic leading-[0.9] tracking-tight"
              >
                <span className="block text-white">Ganás tiempo.</span>
                <span className="mt-1 block">
                  <span className="shimmer-text">Vendés más.</span>
                </span>
              </motion.h1>

              <motion.p
                variants={heroItem}
                className="mt-10 max-w-[520px] text-balance text-base text-white/55 md:text-[17px]"
              >
                IA, producto y paid media.{' '}
                <span className="text-white/90">Sin humo.</span>
              </motion.p>

              <motion.div
                variants={heroItem}
                className="mt-12 flex flex-col items-center gap-3 sm:flex-row"
              >
                <a
                  href="#contacto"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-electric px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.25em] text-white shadow-glow transition-transform hover:scale-[1.02]"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-electric-400 via-electric to-electric-600 opacity-0 transition-opacity group-hover:opacity-100" />
                  <span className="relative">Agendá 20 min</span>
                  <ArrowRight className="relative h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href="#productos"
                  className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-white/60 transition-colors hover:text-white"
                >
                  Ver productos
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </a>
              </motion.div>

              <motion.div
                variants={heroItem}
                className="mt-20 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.26em] text-white/40"
              >
                <span>
                  <span className="text-white/35">01</span>
                  <span className="mx-2 text-white/20">·</span>
                  <span className="text-white/70">Producto</span>
                </span>
                <span className="h-1 w-1 rounded-full bg-electric/50" />
                <span>
                  <span className="text-white/35">02</span>
                  <span className="mx-2 text-white/20">·</span>
                  <span className="text-white/70">Crecimiento</span>
                </span>
                <span className="h-1 w-1 rounded-full bg-electric/50" />
                <span>respuesta &lt; 24h</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/30"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="h-8 w-px bg-gradient-to-b from-electric to-transparent"
        />
      </motion.div>
    </section>
  )
}

/* ---------- Section label ---------- */
function SectionLabel({ num, title }: { num: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={springPremium}
      className="flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.3em] text-electric"
    >
      <span className="text-white/35">{num}</span>
      <span className="h-px w-8 bg-electric/40" />
      {title}
    </motion.div>
  )
}

/* ---------- 01 · Productos ---------- */
type Product = {
  tag: string
  name: string
  line: string
  detail: string
  year: string
}

const products: Product[] = [
  {
    tag: 'Salud',
    name: 'MediTurnos',
    line: 'Sistema de turnos para consultorios.',
    detail:
      'Reservas por WhatsApp, recordatorios automáticos, cobro de seña y panel para la clínica. Reduce ausentes y libera al equipo de la agenda.',
    year: '2025',
  },
  {
    tag: 'B2B',
    name: 'CotizApp',
    line: 'Cotizaciones en minutos, no horas.',
    detail:
      'Generador de presupuestos para distribuidoras y servicios B2B. Catálogo, descuentos por cliente, PDF prolijo y envío directo por mail o WhatsApp.',
    year: '2025',
  },
  {
    tag: 'Finanzas',
    name: 'Atlas Finance',
    line: 'Finanzas con asesor IA.',
    detail:
      'App de finanzas personales con coach IA. Categoriza movimientos, propone presupuestos y responde preguntas sobre tu plata sin abrir una planilla.',
    year: '2025',
  },
  {
    tag: 'WhatsApp',
    name: 'MisGastos',
    line: 'Registrá gastos por chat.',
    detail:
      'Mandás "Café 3500" y el bot lo guarda categorizado en tu dashboard. Reportes mensuales automáticos. Pensado para freelancers y monotributistas.',
    year: '2024',
  },
  {
    tag: 'Educación',
    name: 'English Tutor',
    line: 'Tutor de inglés por chat.',
    detail:
      'Conversaciones guiadas con IA, corrección en tiempo real y ejercicios adaptados al nivel. Para adultos que no entran a clases tradicionales.',
    year: '2024',
  },
  {
    tag: 'Ecommerce',
    name: 'Gala Regalos',
    line: 'Regalos corporativos end-to-end.',
    detail:
      'Tienda de regalos corporativos: catálogo curado, armado de combos, checkout y logística integrada. Para empresas que regalan a equipos y clientes.',
    year: '2025',
  },
]

function Productos() {
  return (
    <section
      id="productos"
      className="relative z-10 px-6 py-24 md:px-10 md:py-44"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[auto_1fr] md:items-end md:gap-16">
          <div>
            <SectionLabel num="01" title="Productos" />
            <motion.h2
              initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.4 }}
              transition={springPremium}
              className="mt-6 font-serif text-[clamp(36px,8vw,84px)] italic leading-[0.98] tracking-tight text-white"
            >
              Algunos de los productos{' '}
              <span className="shimmer-text">que ya construimos.</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ ...springPremium, delay: 0.15 }}
            className="md:text-right"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-electric/80">
              Casos reales
            </span>
            <p className="mt-3 max-w-sm text-balance font-serif text-lg italic leading-snug text-white/65 md:ml-auto md:text-xl">
              Cada uno, hecho a medida. Con un cliente real detrás.
            </p>
          </motion.div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] md:mt-20 md:grid-cols-2">
          {products.map((p, i) => (
            <motion.article
              key={p.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ ...springPremium, delay: (i % 2) * 0.06 }}
              className="group relative bg-obsidian-900/60 p-7 backdrop-blur-xl transition-colors hover:bg-electric/[0.04] md:p-10"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-electric">
                  {p.tag}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/35">
                  {p.year}
                </span>
              </div>
              <h3 className="mt-8 font-serif text-3xl italic text-white md:text-4xl">
                {p.name}
              </h3>
              <p className="mt-3 text-[15px] text-white/75 md:text-[16px]">
                {p.line}
              </p>
              <p className="mt-5 text-[14px] leading-relaxed text-white/50 md:text-[14.5px]">
                {p.detail}
              </p>
              <span className="absolute bottom-0 left-0 h-px w-0 bg-electric transition-all duration-500 group-hover:w-full" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- 02 · Reseñas ---------- */
type Review = {
  name: string
  role: string
  text: string
}

const reviews: Review[] = [
  {
    name: 'Pablo G.',
    role: 'Dueño de pyme',
    text: 'Trabajar con Alvra es lo más cercano a tener un equipo de producto.',
  },
  {
    name: 'Ramiro K.',
    role: 'Founder SaaS',
    text: 'Entendieron mi marca mejor que yo. Ahora comunico lo que quiero comunicar.',
  },
  {
    name: 'Camila R.',
    role: 'Operaciones · pyme',
    text: 'Pasamos de mil plantillas de Excel aisladas a un sistema que integra todas nuestras bases y podemos sacar métricas clave de la operación.',
  },
]

function Reseñas() {
  return (
    <section
      id="resenas"
      className="relative z-10 px-6 py-24 md:px-10 md:py-44"
    >
      <div className="mx-auto max-w-[1180px]">
        <SectionLabel num="02" title="Reseñas" />

        <motion.h2
          initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.4 }}
          transition={springPremium}
          className="mt-6 max-w-3xl font-serif text-[clamp(36px,7vw,80px)] italic leading-[0.98] tracking-tight text-white"
        >
          Lo que dicen{' '}
          <span className="shimmer-text">los que ya trabajaron con nosotros.</span>
        </motion.h2>

        <div className="mx-auto mt-14 grid max-w-2xl grid-cols-1 gap-4 md:mt-20 lg:max-w-none lg:grid-cols-3">
          {reviews.map((r, i) => (
            <motion.article
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ ...springPremium, delay: i * 0.07 }}
              className="group relative flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7 backdrop-blur-xl transition-colors hover:border-electric/40 md:p-8"
            >
              <div
                className="flex items-center gap-1.5"
                role="img"
                aria-label="5 estrellas sobre 5"
              >
                {[0, 1, 2, 3, 4].map((k) => (
                  <Star
                    key={k}
                    className="h-4 w-4 fill-electric text-electric"
                    strokeWidth={1.5}
                  />
                ))}
              </div>
              <p className="mt-6 flex-1 font-serif text-xl italic leading-relaxed text-white/85 md:text-[22px]">
                “{r.text}”
              </p>
              <div className="mt-7 border-t border-white/[0.06] pt-5">
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-white">
                  {r.name}
                </div>
                <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-white/45">
                  {r.role}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- 03 · Proceso ---------- */
const steps = [
  {
    n: '01',
    title: 'Diagnóstico',
    line: '20 minutos. Contás qué pasa. Salís con una respuesta.',
    note: 'gratis',
  },
  {
    n: '02',
    title: 'Propuesta',
    line: 'En 48hs. Alcance, precio, plazos. Por escrito.',
    note: '48 h',
  },
  {
    n: '03',
    title: 'Ejecución',
    line: 'Sprints cortos, check-ins semanales. Nada de Gantts.',
    note: 'semana a semana',
  },
]

function Proceso() {
  return (
    <section
      id="proceso"
      className="relative z-10 px-6 py-32 md:px-10 md:py-44"
    >
      <div className="mx-auto max-w-[1180px]">
        <SectionLabel num="03" title="Proceso" />

        <motion.h2
          initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.4 }}
          transition={springPremium}
          className="mt-6 max-w-3xl font-serif text-[clamp(40px,6vw,84px)] italic leading-[0.98] tracking-tight text-white"
        >
          Tres pasos. <span className="shimmer-text">Sin vueltas.</span>
        </motion.h2>

        <div className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ ...springPremium, delay: i * 0.1 }}
              className="group relative bg-obsidian-900/60 p-8 backdrop-blur-xl transition-colors hover:bg-electric/[0.04] md:p-10"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.28em] text-electric">
                  {s.n}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/35">
                  {s.note}
                </span>
              </div>
              <div className="mt-10 font-serif text-3xl italic text-white md:text-4xl">
                {s.title}
              </div>
              <p className="mt-4 max-w-[280px] text-[14.5px] leading-relaxed text-white/55">
                {s.line}
              </p>
              <span className="absolute bottom-0 left-0 h-px w-0 bg-electric transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- 03 · Filtro honesto ---------- */
const fitYes = [
  'Tenés una pyme con operación, no solo una idea.',
  'Perdés horas en tareas repetitivas.',
  'Tu marketing lo manejás entre mil cosas.',
  'Querés probar IA con criterio.',
  'Valorás hablar con los socios, no con un account.',
]

const fitNo = [
  'Buscás la agencia más barata.',
  'Ya tenés equipo técnico resolviendo esto.',
  'Querés algo para ayer sin presupuesto.',
  'Esperás promesas tipo "300% ROI".',
  'Necesitás logos famosos en la home.',
]

function Filtro() {
  return (
    <section id="filtro" className="relative z-10 px-6 py-24 md:px-10 md:py-44">
      <div className="mx-auto max-w-[1180px]">
        <SectionLabel num="04" title="Filtro" />

        <motion.h2
          initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.4 }}
          transition={springPremium}
          className="mt-6 max-w-3xl font-serif text-[clamp(36px,7vw,84px)] italic leading-[0.98] tracking-tight text-white"
        >
          No somos para todos.{' '}
          <span className="shimmer-text">Y está bien.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={springPremium}
          className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-white/[0.08] md:mt-20 md:grid-cols-2"
        >
          {/* Para vos si — panel resaltado */}
          <div className="relative bg-electric/[0.04] p-8 md:p-12">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric/70 to-transparent" />
            <div
              className="pointer-events-none absolute -top-24 -left-16 h-64 w-64 rounded-full"
              style={{
                background:
                  'radial-gradient(closest-side, rgba(0,112,243,0.18), rgba(0,112,243,0) 70%)',
              }}
            />

            <div className="relative flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.28em] text-electric">
              <span className="grid h-7 w-7 place-items-center rounded-full border border-electric/40 bg-electric/[0.1] shadow-[0_0_18px_rgba(0,112,243,0.35)]">
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
              Para vos si
            </div>

            <ul className="relative mt-10 divide-y divide-white/[0.05]">
              {fitYes.map((t, i) => (
                <motion.li
                  key={t}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ ...springPremium, delay: i * 0.05 }}
                  className="flex items-start gap-4 py-5"
                >
                  <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-electric shadow-[0_0_10px_rgba(0,112,243,0.8)]" />
                  <span className="text-[15.5px] leading-relaxed text-white/90 md:text-[17px]">
                    {t}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* No es para vos si — panel apagado */}
          <div className="relative bg-obsidian-900/60 p-8 md:p-12">
            <div className="flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.28em] text-white/45">
              <span className="grid h-7 w-7 place-items-center rounded-full border border-white/15">
                <X className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
              No es para vos si
            </div>

            <ul className="mt-10 divide-y divide-white/[0.04]">
              {fitNo.map((t, i) => (
                <motion.li
                  key={t}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ ...springPremium, delay: i * 0.05 }}
                  className="flex items-start gap-4 py-5"
                >
                  <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/20" />
                  <span className="text-[15.5px] leading-relaxed text-white/40 md:text-[17px]">
                    {t}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- 05 · Estructura ---------- */
type Pillar = {
  n: string
  label: string
  title: string
  line: string
  detail: string
  highlighted?: boolean
}

const pillars: Pillar[] = [
  {
    n: '01',
    label: 'Producto · sistemas',
    title: 'Diseño y construcción.',
    line: 'Construimos los productos. Mantenemos los sistemas vivos.',
    detail:
      'IA aplicada, automatización, integraciones y plataformas a medida. Lo que ves arriba está hecho desde cero, sin templates.',
  },
  {
    n: '02',
    label: 'Crecimiento · marca',
    title: 'Estrategia y voz.',
    line: 'Hacemos crecer la marca con criterio.',
    detail:
      'Estrategia de marca, contenido y paid media en agencia de ecommerce. Medimos todo y escribimos copy que vende.',
    highlighted: true,
  },
]

type Stat = {
  value: string
  label: string
}

const stats: Stat[] = [
  { value: '6', label: 'Productos en producción' },
  { value: '< 24h', label: 'Respuesta promedio' },
  { value: '100%', label: 'Código y estrategia propios' },
  { value: '0', label: 'Agencias intermediarias' },
]

function Estructura() {
  return (
    <section
      id="equipo"
      className="relative z-10 px-6 py-24 md:px-10 md:py-44"
    >
      <div className="mx-auto max-w-[1180px]">
        <SectionLabel num="05" title="Estructura" />

        <motion.h2
          initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.4 }}
          transition={springPremium}
          className="mt-6 max-w-3xl font-serif text-[clamp(36px,7vw,84px)] italic leading-[0.98] tracking-tight text-white"
        >
          Sin estructura entre vos y{' '}
          <span className="shimmer-text">el trabajo.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ ...springPremium, delay: 0.1 }}
          className="mt-8 max-w-xl text-[15.5px] leading-relaxed text-white/55 md:text-[16.5px]"
        >
          Dos disciplinas trabajando como una. Acceso directo a quien diseña,
          construye y lleva tu marca al mercado.
        </motion.p>

        {/* Diagram: two pillars + center glow connector */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={springPremium}
          className="relative mt-14 md:mt-20"
        >
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-white/[0.08] md:grid-cols-2">
            {pillars.map((p, i) => (
              <div
                key={p.n}
                className={`relative overflow-hidden p-8 md:p-12 ${
                  p.highlighted
                    ? 'bg-electric/[0.04]'
                    : 'bg-obsidian-900/60'
                }`}
              >
                {p.highlighted && (
                  <>
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric/70 to-transparent" />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full"
                      style={{
                        background:
                          'radial-gradient(closest-side, rgba(0,112,243,0.18), rgba(0,112,243,0) 70%)',
                      }}
                    />
                  </>
                )}

                <div className="relative flex items-baseline gap-5">
                  <span
                    className={`font-serif text-[64px] italic leading-none md:text-[88px] ${
                      p.highlighted
                        ? 'text-electric drop-shadow-[0_0_22px_rgba(0,112,243,0.45)]'
                        : 'text-electric/85'
                    }`}
                  >
                    {p.n}
                  </span>
                  <span
                    className={`font-mono text-[10.5px] uppercase tracking-[0.28em] ${
                      p.highlighted ? 'text-electric' : 'text-white/45'
                    }`}
                  >
                    {p.label}
                  </span>
                </div>

                <h3 className="relative mt-8 font-serif text-3xl italic text-white md:text-4xl">
                  {p.title}
                </h3>
                <p className="relative mt-3 text-[15.5px] text-white/75 md:text-[17px]">
                  {p.line}
                </p>
                <p className="relative mt-5 text-[14px] leading-relaxed text-white/50 md:text-[14.5px]">
                  {p.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Center connector — visual diagram element between pillars */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block"
          >
            <div className="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-obsidian shadow-[0_0_24px_rgba(0,112,243,0.4)]">
              <span className="h-1.5 w-1.5 rounded-full bg-electric shadow-[0_0_10px_rgba(0,112,243,0.9)]" />
            </div>
          </div>
        </motion.div>

        {/* Manifest line */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ ...springPremium, delay: 0.15 }}
          className="mx-auto mt-10 max-w-2xl text-center font-mono text-[11px] uppercase tracking-[0.28em] text-white/45 md:mt-14"
        >
          <span className="text-white">Sin</span> account managers ·{' '}
          <span className="text-white">Sin</span> juniors ·{' '}
          <span className="text-white">Sin</span> agencia en el medio
        </motion.p>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ ...springPremium, delay: 0.2 }}
          className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] md:mt-14 md:grid-cols-4"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="group relative bg-obsidian-900/60 p-7 text-center backdrop-blur-xl transition-colors hover:bg-electric/[0.04] md:p-9"
            >
              <div className="font-serif text-[44px] italic leading-none text-white md:text-[56px]">
                {s.value}
              </div>
              <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.26em] text-white/45 md:mt-4">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- 05 · FAQ ---------- */
type Faq = { q: string; a: React.ReactNode }

const faqs: Faq[] = [
  {
    q: 'Y si no funciona',
    a: (
      <>
        Lo revisamos sin cobrar revisión. Sprints cortos para detectar
        rápido. Mes a mes en marketing, alcance cerrado en proyectos. Si no
        entregamos lo prometido, te devolvemos la parte que no usaste.
      </>
    ),
  },
  {
    q: 'Trabajan fuera de Argentina',
    a: (
      <>
        Sí, pero nuestro foco es{' '}
        <span className="text-white">CABA y GBA</span> porque conocemos el
        contexto. Para afuera hacemos producto y consultoría, facturamos en
        USD, trabajamos remoto.
      </>
    ),
  },
  {
    q: 'Necesito saber de tecnología',
    a: (
      <>
        <span className="text-white">No.</span> Vos conocés tu negocio, el
        resto lo traducimos nosotros. Si querés meterte y entender,
        también — tenemos clientes de los dos tipos.
      </>
    ),
  },
]

function FaqItem({ faq, index }: { faq: Faq; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ ...springPremium, delay: index * 0.04 }}
      className="border-b border-white/[0.08]"
    >
      <button
        onClick={() => setOpen(!open)}
        className="group flex w-full items-center justify-between gap-6 py-6 text-left md:py-8"
      >
        <span className="font-serif text-2xl italic text-white/85 transition-colors group-hover:text-white md:text-3xl">
          {faq.q}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={springPremium}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/15 text-electric transition-colors group-hover:border-electric/60"
        >
          <ChevronDown className="h-3.5 w-3.5" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 0.8, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="max-w-2xl pb-8 text-[15.5px] leading-relaxed text-white/55">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function FAQ() {
  return (
    <section id="faq" className="relative z-10 px-6 py-32 md:px-10 md:py-44">
      <div className="mx-auto max-w-[980px]">
        <SectionLabel num="06" title="Preguntas" />

        <motion.h2
          initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.4 }}
          transition={springPremium}
          className="mt-6 max-w-3xl font-serif text-[clamp(40px,6vw,84px)] italic leading-[0.98] tracking-tight text-white"
        >
          Lo que preguntan{' '}
          <span className="shimmer-text">primero.</span>
        </motion.h2>

        <div className="mt-16 border-t border-white/[0.08]">
          {faqs.map((f, i) => (
            <FaqItem key={f.q} faq={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Contact form ---------- */
type FormState = 'idle' | 'sending' | 'sent' | 'error'

function ContactForm() {
  const [state, setState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (state === 'sending' || state === 'sent') return

    const form = e.currentTarget
    const fd = new FormData(form)
    const payload = {
      nombre: String(fd.get('nombre') ?? '').trim(),
      apellido: String(fd.get('apellido') ?? '').trim(),
      empresa: String(fd.get('empresa') ?? '').trim(),
      descripcion: String(fd.get('descripcion') ?? '').trim(),
      contacto: String(fd.get('contacto') ?? '').trim(),
    }

    setState('sending')
    setErrorMsg(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean
        error?: string
      }
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'No pudimos enviar el mensaje.')
      }
      setState('sent')
      form.reset()
    } catch (err) {
      setState('error')
      setErrorMsg(
        err instanceof Error ? err.message : 'Error desconocido al enviar.',
      )
    }
  }

  if (state === 'sent') {
    return (
      <motion.div
        role="status"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springPremium}
        className="mt-14 w-full max-w-xl rounded-2xl border border-electric/30 bg-electric/[0.05] p-10 text-center"
      >
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-electric/40 bg-electric/[0.1] shadow-[0_0_18px_rgba(0,112,243,0.35)]">
          <Check className="h-5 w-5 text-electric" strokeWidth={2.5} />
        </div>
        <h4 className="mt-6 font-serif text-3xl italic text-white">
          ¡Recibido!
        </h4>
        <p className="mt-3 text-[15px] leading-relaxed text-white/60">
          Te respondemos en menos de 24 horas al contacto que dejaste.
        </p>
      </motion.div>
    )
  }

  const inputCls =
    'w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-[15px] text-white placeholder:text-white/30 transition-colors focus:border-electric focus:bg-white/[0.05] focus:outline-none disabled:opacity-60'
  const labelCls =
    'mb-2 block font-mono text-[10px] uppercase tracking-[0.26em] text-white/50'
  const sending = state === 'sending'

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-busy={sending}
      className="mt-14 w-full max-w-xl text-left"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-nombre" className={labelCls}>
            Nombre
          </label>
          <input
            id="cf-nombre"
            name="nombre"
            type="text"
            required
            maxLength={80}
            autoComplete="given-name"
            disabled={sending}
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="cf-apellido" className={labelCls}>
            Apellido
          </label>
          <input
            id="cf-apellido"
            name="apellido"
            type="text"
            required
            maxLength={80}
            autoComplete="family-name"
            disabled={sending}
            className={inputCls}
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="cf-empresa" className={labelCls}>
          Nombre de la empresa
        </label>
        <input
          id="cf-empresa"
          name="empresa"
          type="text"
          required
          maxLength={160}
          autoComplete="organization"
          disabled={sending}
          className={inputCls}
        />
      </div>

      <div className="mt-5">
        <label htmlFor="cf-descripcion" className={labelCls}>
          Contanos sobre tu negocio
        </label>
        <textarea
          id="cf-descripcion"
          name="descripcion"
          required
          maxLength={4000}
          rows={5}
          disabled={sending}
          placeholder="Qué hacés, qué te frena, qué querrías resolver…"
          className={`${inputCls} resize-none leading-relaxed`}
        />
      </div>

      <div className="mt-5">
        <label htmlFor="cf-contacto" className={labelCls}>
          Dónde te contactamos
        </label>
        <input
          id="cf-contacto"
          name="contacto"
          type="text"
          required
          maxLength={200}
          disabled={sending}
          placeholder="Mail, WhatsApp o @instagram"
          className={inputCls}
        />
      </div>

      {state === 'error' && (
        <div
          role="alert"
          className="mt-5 rounded-xl border border-red-400/30 bg-red-500/[0.06] px-4 py-3 text-[13px] leading-relaxed text-red-200"
        >
          {errorMsg ?? 'No pudimos enviar el mensaje.'} Probá de nuevo o
          escribinos a{' '}
          <a
            href="mailto:alegrum@alvra-ia.com"
            className="underline underline-offset-2 hover:text-white"
          >
            alegrum@alvra-ia.com
          </a>
          .
        </div>
      )}

      <button
        type="submit"
        disabled={sending}
        className="group relative mt-8 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-electric px-7 py-4 font-mono text-[11px] uppercase tracking-[0.25em] text-white shadow-glow transition-all hover:scale-[1.01] disabled:cursor-wait disabled:opacity-70 disabled:hover:scale-100"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-electric-400 via-electric to-electric-600 opacity-0 transition-opacity group-hover:opacity-100" />
        <span className="relative">
          {sending ? 'Enviando…' : 'Enviar mensaje'}
        </span>
        {!sending && (
          <ArrowRight className="relative h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        )}
      </button>
    </form>
  )
}

/* ---------- Contact + Footer ---------- */
function ContactCTA() {
  return (
    <section
      id="contacto"
      className="relative z-10 px-6 py-24 md:px-10 md:py-44"
    >
      <div className="mx-auto max-w-[1180px]">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.3 }}
          transition={springPremium}
          className="flex flex-col items-center text-center"
        >
          <SectionLabel num="→" title="Agendá tu reunión" />
          <h3 className="mt-8 max-w-3xl font-serif text-[clamp(40px,7vw,110px)] italic leading-[0.92] tracking-tight text-white">
            Contanos{' '}
            <span className="shimmer-text">qué te frena.</span>
          </h3>
          <p className="mt-8 max-w-md text-[16px] leading-relaxed text-white/55">
            Te respondemos en menos de 24 horas. Si no somos para vos, te lo
            decimos.
          </p>

          <ContactForm />

          <div className="mt-14 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.28em] text-white/35">
            <span className="h-px w-10 bg-white/10" />
            o si preferís
            <span className="h-px w-10 bg-white/10" />
          </div>

          <div className="mt-6 flex flex-col items-center gap-4 font-mono text-[11px] uppercase tracking-[0.24em] text-white/50 sm:flex-row sm:gap-8">
            <a
              href="mailto:alegrum@alvra-ia.com"
              className="group inline-flex items-center gap-2 transition-colors hover:text-white"
            >
              <Mail className="h-3.5 w-3.5 text-electric" />
              alegrum@alvra-ia.com
            </a>
            <span className="hidden h-3 w-px bg-white/15 sm:block" />
            <a
              href="https://instagram.com/alvra.ia"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 transition-colors hover:text-white"
            >
              <Instagram className="h-3.5 w-3.5 text-electric" />
              @alvra.ia
            </a>
          </div>
        </motion.div>

        <footer className="mt-32 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 font-mono text-[10px] uppercase tracking-[0.24em] text-white/35 md:flex-row">
          <div className="flex items-center gap-3">
            <img
              src="/alvra-mark.png"
              alt=""
              aria-hidden
              className="h-4 w-4 object-contain opacity-60"
            />
            © 2026 Alvra.IA · Buenos Aires
          </div>
          <div>Hecho por nosotros · sin plantillas</div>
        </footer>
      </div>
    </section>
  )
}

/* ---------- Root ---------- */
export default function App() {
  return (
    <div className="relative min-h-screen bg-obsidian text-white">
      <AmbientBackdrop />
      <TopBar />
      <MorphingBrand />
      <SectionDots />
      <main className="relative">
        <Hero />
        <Productos />
        <Reseñas />
        <Proceso />
        <Filtro />
        <Estructura />
        <FAQ />
        <ContactCTA />
      </main>
    </div>
  )
}
