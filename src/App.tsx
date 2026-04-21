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
  Mail,
  MessageSquare,
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
  // Nav + CTA fade in as the brand moves from center to the left slot,
  // so nothing overlaps with the centered lockup on first view.
  const navOpacity = useTransform(scrollY, [200, 320], [0, 1], {
    clamp: true,
  })
  const navPE = useTransform(navOpacity, (v) =>
    v > 0.5 ? 'auto' : 'none',
  ) as unknown as 'auto' | 'none'
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      {/* Persistent glass background — keeps the bar legible on any section */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 border-b border-white/[0.06] bg-obsidian/70 backdrop-blur-xl backdrop-saturate-150"
      />
      <div className="px-6 pt-5 pb-4 md:px-10">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between">
          <a href="#hero" aria-label="Alvra.IA — inicio" className="block">
            {/* Morph target — MorphingBrand lands here at scroll end */}
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
          <motion.a
            href="#contacto"
            style={{ opacity: navOpacity, pointerEvents: navPE }}
            className="group hidden items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-white backdrop-blur-md transition-all hover:border-electric hover:bg-electric/15 md:inline-flex"
          >
            Agendá 20 min
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
        </div>
      </div>
    </header>
  )
}

/* ---------- Side dots — IG-carousel style section indicator ---------- */
const sectionDots = [
  { id: 'hero', label: 'Inicio' },
  { id: 'productos', label: 'Productos' },
  { id: 'proceso', label: 'Proceso' },
  { id: 'filtro', label: 'Filtro' },
  { id: 'equipo', label: 'Equipo' },
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
      className="relative z-10 flex min-h-[100vh] items-center justify-center px-6 md:px-10"
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
                  <span className="text-white/70">Ale</span>
                  <span className="mx-2 text-white/20">·</span>
                  paid media
                </span>
                <span className="h-1 w-1 rounded-full bg-electric/50" />
                <span>
                  <span className="text-white/70">Valen</span>
                  <span className="mx-2 text-white/20">·</span>
                  producto
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
}

const products: Product[] = [
  {
    tag: 'Salud',
    name: 'MediTurnos',
    line: 'Turnos por WhatsApp — agenda, recordatorios, seña.',
  },
  {
    tag: 'B2B',
    name: 'CotizApp',
    line: 'Cotizaciones en 2 minutos, no en 30.',
  },
  {
    tag: 'Finanzas',
    name: 'Atlas Finance',
    line: 'Finanzas con asesor IA. Sin planillas.',
  },
  {
    tag: 'WhatsApp',
    name: 'MisGastos',
    line: 'Mandás un mensaje, se categoriza solo.',
  },
  {
    tag: 'Educación',
    name: 'English Tutor',
    line: 'Aprendés inglés por chat, a tu ritmo.',
  },
  {
    tag: 'Ecommerce',
    name: 'Gala Regalos',
    line: 'Regalos corporativos, de catálogo a checkout.',
  },
]

function Productos() {
  return (
    <section
      id="productos"
      className="relative z-10 px-6 py-32 md:px-10 md:py-44"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[auto_1fr] md:items-end md:gap-16">
          <div>
            <SectionLabel num="01" title="Productos" />
            <motion.h2
              initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.4 }}
              transition={springPremium}
              className="mt-6 font-serif text-[clamp(40px,6vw,84px)] italic leading-[0.98] tracking-tight text-white"
            >
              Probá lo que{' '}
              <span className="shimmer-text">ya construimos.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ ...springPremium, delay: 0.15 }}
            className="max-w-sm text-[15px] leading-relaxed text-white/55 md:text-right"
          >
            Seis productos vivos, hechos por nosotros. Abrilos, probalos,
            rompelos.
          </motion.p>
        </div>

        <div className="mt-20 divide-y divide-white/[0.06] border-y border-white/[0.06]">
          {products.map((p, i) => (
            <motion.a
              href="#contacto"
              key={p.name}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={revealItem}
              transition={{ ...springPremium, delay: i * 0.04 }}
              className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-6 py-7 transition-colors hover:bg-white/[0.02] md:py-9"
            >
              <span className="w-[96px] font-mono text-[10px] uppercase tracking-[0.26em] text-white/35 transition-colors group-hover:text-electric md:w-[140px]">
                {p.tag}
              </span>
              <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-6">
                <span className="font-serif text-3xl italic text-white transition-colors group-hover:text-electric md:text-5xl">
                  {p.name}
                </span>
                <span className="text-[14px] text-white/50 md:text-[15px]">
                  {p.line}
                </span>
              </div>
              <ArrowUpRight className="h-5 w-5 text-white/25 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-electric md:h-6 md:w-6" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- 02 · Proceso ---------- */
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
        <SectionLabel num="02" title="Proceso" />

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
    <section id="filtro" className="relative z-10 px-6 py-32 md:px-10 md:py-44">
      <div className="mx-auto max-w-[1180px]">
        <SectionLabel num="03" title="Filtro" />

        <motion.h2
          initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.4 }}
          transition={springPremium}
          className="mt-6 max-w-3xl font-serif text-[clamp(40px,6vw,84px)] italic leading-[0.98] tracking-tight text-white"
        >
          No somos para todos.{' '}
          <span className="shimmer-text">Y está bien.</span>
        </motion.h2>

        <div className="mt-20 grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={springPremium}
          >
            <div className="flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.28em] text-electric">
              <Check className="h-4 w-4" strokeWidth={2.5} />
              Para vos si
            </div>
            <ul className="mt-8 space-y-5">
              {fitYes.map((t, i) => (
                <motion.li
                  key={t}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ ...springPremium, delay: i * 0.05 }}
                  className="text-[16px] leading-relaxed text-white/85"
                >
                  {t}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ ...springPremium, delay: 0.08 }}
          >
            <div className="flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.28em] text-white/45">
              <X className="h-4 w-4" strokeWidth={2.5} />
              No es para vos si
            </div>
            <ul className="mt-8 space-y-5">
              {fitNo.map((t, i) => (
                <motion.li
                  key={t}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ ...springPremium, delay: i * 0.05 }}
                  className="text-[16px] leading-relaxed text-white/30"
                >
                  {t}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ---------- 04 · Equipo ---------- */
const partners = [
  {
    initial: 'A',
    name: 'Ale',
    role: 'Paid media · estrategia',
    line: 'Analista en agencia de ecommerce. Mide todo, escribe copy que vende.',
  },
  {
    initial: 'V',
    name: 'Valen',
    role: 'Producto · automatización',
    line: 'Construye los productos que ves arriba. IA, sistemas, integraciones.',
  },
]

function Equipo() {
  return (
    <section
      id="equipo"
      className="relative z-10 px-6 py-32 md:px-10 md:py-44"
    >
      <div className="mx-auto max-w-[1180px]">
        <SectionLabel num="04" title="Equipo" />

        <motion.h2
          initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.4 }}
          transition={springPremium}
          className="mt-6 max-w-3xl font-serif text-[clamp(40px,6vw,84px)] italic leading-[0.98] tracking-tight text-white"
        >
          Somos dos. <span className="shimmer-text">Hablás con los dos.</span>
        </motion.h2>

        <div className="mt-20 grid grid-cols-1 gap-4 md:grid-cols-2">
          {partners.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ ...springPremium, delay: i * 0.1 }}
              className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 backdrop-blur-xl transition-colors hover:border-electric/40 md:p-10"
            >
              <div className="flex items-center gap-5">
                <div className="grid h-14 w-14 place-items-center rounded-full border border-electric/35 bg-electric/[0.06]">
                  <span className="font-serif text-2xl italic text-electric">
                    {p.initial}
                  </span>
                </div>
                <div>
                  <div className="font-serif text-3xl italic text-white">
                    {p.name}
                  </div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.26em] text-electric/80">
                    {p.role}
                  </div>
                </div>
              </div>
              <p className="mt-8 text-[15px] leading-relaxed text-white/55">
                {p.line}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ ...springPremium, delay: 0.2 }}
          className="mt-10 max-w-2xl border-l-2 border-electric pl-5 text-[14.5px] leading-relaxed text-white/55"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-electric">
            Transparencia total
          </span>
          <br />
          <span className="mt-2 inline-block">
            Alvra arrancó hace poco. Seis productos vivos, precio accesible,
            atención de socio. Para el primer cliente eso es{' '}
            <span className="text-white">ventaja</span>, no excusa.
          </span>
        </motion.p>
      </div>
    </section>
  )
}

/* ---------- 05 · FAQ ---------- */
type Faq = { q: string; a: React.ReactNode }

const faqs: Faq[] = [
  {
    q: 'Cuánto cuesta',
    a: (
      <>
        Proyectos puntuales desde{' '}
        <span className="text-white">USD 800</span>. Setups de marketing
        desde <span className="text-white">USD 500/mes</span>. Consultoría,
        caso por caso. En la llamada tenés número aproximado; en 48hs lo
        tenés cerrado por escrito.
      </>
    ),
  },
  {
    q: 'En cuánto tiempo veo resultados',
    a: (
      <>
        Automatización simple: <span className="text-white">2–3 semanas</span>.
        Producto a medida: <span className="text-white">4–8 semanas</span>.
        Marketing: primeras métricas a los 30 días, decisiones buenas con
        60–90 días de data.
      </>
    ),
  },
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
        <SectionLabel num="05" title="Preguntas" />

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

/* ---------- Contact + Footer ---------- */
function ContactCTA() {
  return (
    <section
      id="contacto"
      className="relative z-10 px-6 py-32 md:px-10 md:py-44"
    >
      <div className="mx-auto max-w-[1180px]">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.3 }}
          transition={springPremium}
          className="flex flex-col items-center text-center"
        >
          <SectionLabel num="→" title="Siguiente paso" />
          <h3 className="mt-8 max-w-3xl font-serif text-[clamp(44px,7vw,110px)] italic leading-[0.92] tracking-tight text-white">
            Contanos{' '}
            <span className="shimmer-text">qué te frena.</span>
          </h3>
          <p className="mt-8 max-w-md text-[16px] leading-relaxed text-white/55">
            20 minutos. Sin venta cruzada. Si no es para nosotros, te
            decimos.
          </p>

          <div className="mt-14 flex flex-col items-center gap-4 sm:flex-row">
            <a
              href="mailto:hola@alvra-ia.com"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-electric px-8 py-4 font-mono text-[11px] uppercase tracking-[0.25em] text-white shadow-glow transition-transform hover:scale-[1.02]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-electric-400 via-electric to-electric-600 opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="relative">Agendá 20 min</span>
              <ArrowRight className="relative h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          <div className="mt-10 flex flex-col items-center gap-4 font-mono text-[11px] uppercase tracking-[0.24em] text-white/50 sm:flex-row sm:gap-8">
            <a
              href="mailto:hola@alvra-ia.com"
              className="group inline-flex items-center gap-2 transition-colors hover:text-white"
            >
              <Mail className="h-3.5 w-3.5 text-electric" />
              hola@alvra-ia.com
            </a>
            <span className="hidden h-3 w-px bg-white/15 sm:block" />
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 transition-colors hover:text-white"
            >
              <MessageSquare className="h-3.5 w-3.5 text-electric" />
              WhatsApp
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
        <Proceso />
        <Filtro />
        <Equipo />
        <FAQ />
        <ContactCTA />
      </main>
    </div>
  )
}
