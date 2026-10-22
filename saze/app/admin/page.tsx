'use client'

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Lock,
  Eye,
  EyeOff,
  Plus,
  Edit2,
  Trash2,
  Search,
  Check,
  X,
  ExternalLink,
  Sparkles,
  Download,
  Upload,
  LogOut,
  RefreshCw,
  Package,
  Tag,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Product, Category } from '@/lib/products'
import { formatPrice } from '@/lib/products'
import { initialCategories, type CategoryItem } from '@/lib/catalog-store'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [loggingIn, setLoggingIn] = useState(false)
  const [showForgotModal, setShowForgotModal] = useState(false)

  // Catalog state
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [stockFilter, setStockFilter] = useState<'all' | 'instock' | 'outofstock'>('all')

  // Category management state
  const [categories, setCategories] = useState<CategoryItem[]>(initialCategories)
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const [newCategoryLabel, setNewCategoryLabel] = useState('')
  const [categorySaving, setCategorySaving] = useState(false)
  const [categoryError, setCategoryError] = useState('')

  // Edit/Add modal state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [saving, setSaving] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')

  // Form fields
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    tagline: '',
    category: 'everyday',
    price: 399,
    originalPrice: 599,
    image: '/images/products/IMG-20261012-WA0050.jpg',
    badge: 'new',
    available: true,
    description: '',
    includes: ['24 press-on nails (12 sizes)', 'Nail glue', 'Prep pad', 'Mini nail file'],
  })

  // Check auth on load
  useEffect(() => {
    async function verifyAuth() {
      try {
        const res = await fetch('/api/admin/products')
        if (res.ok) {
          const data = await res.json()
          setProducts(data)
          fetch('/api/admin/categories')
            .then((r) => (r.ok ? r.json() : null))
            .then((cats) => {
              if (Array.isArray(cats) && cats.length > 0) setCategories(cats)
            })
            .catch(() => {})
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
        }
      } catch {
        setIsAuthenticated(false)
      }
    }
    verifyAuth()
  }, [])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoggingIn(true)
    setLoginError('')

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        setIsAuthenticated(true)
        // Fetch products
        const prodRes = await fetch('/api/admin/products')
        if (prodRes.ok) {
          const data = await prodRes.json()
          setProducts(data)
          fetch('/api/admin/categories')
            .then((r) => (r.ok ? r.json() : null))
            .then((cats) => {
              if (Array.isArray(cats) && cats.length > 0) setCategories(cats)
            })
            .catch(() => {})
        }
      } else {
        setLoginError('Incorrect password. Please try again.')
      }
    } catch {
      setLoginError('Connection error. Please try again.')
    } finally {
      setLoggingIn(false)
    }
  }

  async function handleLogout() {
    await fetch('/api/admin/login', { method: 'DELETE' })
    setIsAuthenticated(false)
    setPassword('')
  }

  // Stock toggle
  async function toggleStock(product: Product) {
    const updatedStatus = !product.available
    // Optimistic UI update
    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, available: updatedStatus } : p))
    )

    try {
      await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'toggle_stock',
          payload: { id: product.id, available: updatedStatus },
        }),
      })
      showStatus(
        `${product.name} is now ${updatedStatus ? 'IN STOCK' : 'OUT OF STOCK'}`
      )
    } catch (e) {
      console.error(e)
    }
  }

  // Open Edit Modal
  function openEdit(product: Product) {
    setEditingProduct(product)
    setFormData({ ...product })
    setIsModalOpen(true)
  }

  // Open Add Modal
  function openAdd() {
    setEditingProduct(null)
    setFormData({
      id: `set-${Date.now().toString().slice(-6)}`,
      name: '',
      tagline: '',
      category: categories.find((c) => c.value !== 'all')?.value || 'everyday',
      price: 399,
      originalPrice: 599,
      image: '/images/products/IMG-20261012-WA0050.jpg',
      badge: 'new',
      available: true,
      description: 'Handcrafted press-on nails made with precision and love in Goa.',
      includes: ['24 press-on nails (12 sizes)', 'Nail glue', 'Prep pad', 'Mini nail file'],
    })
    setIsModalOpen(true)
  }

  // Save product (Add or Update)
  async function handleSaveProduct(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    const finalProduct = {
      ...formData,
      id:
        formData.id ||
        formData.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') ||
        `item-${Date.now()}`,
      price: Number(formData.price) || 399,
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
    } as Product

    try {
      const action = editingProduct ? 'update_product' : 'add_product'
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          payload: { product: finalProduct },
        }),
      })

      if (res.ok) {
        const data = await res.json()
        if (data.catalog) setProducts(data.catalog)
        setIsModalOpen(false)
        showStatus(
          editingProduct
            ? `Updated "${finalProduct.name}" successfully!`
            : `Added "${finalProduct.name}" to catalog!`
        )
      }
    } catch (err) {
      console.error(err)
      alert('Failed to save product.')
    } finally {
      setSaving(false)
    }
  }

  // Delete product
  async function handleDeleteProduct(id: string, name: string) {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return

    setProducts((prev) => prev.filter((p) => p.id !== id))
    try {
      await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'delete_product',
          payload: { id },
        }),
      })
      showStatus(`Deleted "${name}"`)
    } catch (e) {
      console.error(e)
    }
  }

  // 1-Click Backup Catalog
  function downloadBackup() {
    const jsonStr = JSON.stringify(products, null, 2)
    const blob = new Blob([jsonStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `saze-catalog-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  function showStatus(msg: string) {
    setStatusMessage(msg)
    setTimeout(() => setStatusMessage(''), 4000)
  }

  // Category management handlers
  async function handleAddCategory(e: React.FormEvent) {
    e.preventDefault()
    if (!newCategoryLabel.trim()) return
    setCategorySaving(true)
    setCategoryError('')

    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add',
          payload: { label: newCategoryLabel.trim() },
        }),
      })

      const data = await res.json()
      if (res.ok && data.categories) {
        setCategories(data.categories)
        setNewCategoryLabel('')
        showStatus(`Category "${newCategoryLabel.trim()}" added!`)
      } else {
        setCategoryError(data.error || 'Failed to add category')
      }
    } catch {
      setCategoryError('Failed to add category. Please try again.')
    } finally {
      setCategorySaving(false)
    }
  }

  async function handleDeleteCategory(value: string, label: string) {
    if (value === 'all') return
    const count = products.filter((p) => p.category === value).length
    const warning =
      count > 0
        ? `"${label}" currently has ${count} product(s). Deleting it will keep the products but remove this category filter. Delete category?`
        : `Are you sure you want to delete the category "${label}"?`

    if (!confirm(warning)) return
    setCategorySaving(true)
    setCategoryError('')

    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'delete',
          payload: { value },
        }),
      })

      const data = await res.json()
      if (res.ok && data.categories) {
        setCategories(data.categories)
        if (selectedCategory === value) {
          setSelectedCategory('all')
        }
        showStatus(`Category "${label}" deleted`)
      } else {
        setCategoryError(data.error || 'Failed to delete category')
      }
    } catch {
      setCategoryError('Failed to delete category. Please try again.')
    } finally {
      setCategorySaving(false)
    }
  }

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.tagline.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())

      const matchCategory =
        selectedCategory === 'all' || p.category === selectedCategory

      const matchStock =
        stockFilter === 'all'
          ? true
          : stockFilter === 'instock'
          ? p.available
          : !p.available

      return matchSearch && matchCategory && matchStock
    })
  }, [products, search, selectedCategory, stockFilter])

  const inStockCount = products.filter((p) => p.available).length
  const outOfStockCount = products.length - inStockCount

  // Loading initial auth check
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#101526] text-cream flex items-center justify-center p-4">
        <div className="flex items-center gap-3 text-sm text-gold">
          <RefreshCw className="animate-spin" size={18} />
          <span>Verifying access…</span>
        </div>
      </div>
    )
  }

  // ─────────────────────────────────────────────────────────────
  // 1. LOGIN SCREEN
  // ─────────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#101526] text-cream flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
          className="w-full max-w-md bg-card/80 backdrop-blur-xl border border-gold/30 rounded-3xl p-8 sm:p-10 shadow-2xl relative"
        >
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center mx-auto mb-4 text-gold shadow-lg">
              <Lock size={24} />
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-foreground font-normal">
              SAZ<span className="text-gold">É</span> Portal
            </h1>
            <p className="text-xs text-muted-foreground mt-2" style={{ fontFamily: 'var(--font-jost)' }}>
              Enter password to manage catalog &amp; stock.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4" style={{ fontFamily: 'var(--font-jost)' }}>
            <div className="relative">
              <label htmlFor="admin-pw" className="sr-only">
                Password
              </label>
              <input
                id="admin-pw"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full bg-background/80 border border-border rounded-xl px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-gold transition-colors pr-11"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-muted-foreground hover:text-gold"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {loginError && (
              <p className="text-xs text-red-400 bg-red-950/40 border border-red-800/40 rounded-lg p-2.5 text-center">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              disabled={loggingIn}
              className="button-primary w-full min-h-[48px] rounded-xl font-medium text-sm shadow-lg shadow-gold/20"
            >
              {loggingIn ? 'Unlocking…' : 'Unlock Portal'}
            </button>
          </form>

          <div className="mt-5 text-center" style={{ fontFamily: 'var(--font-jost)' }}>
            <button
              type="button"
              onClick={() => setShowForgotModal(!showForgotModal)}
              className="text-xs text-muted-foreground hover:text-gold transition-colors inline-flex items-center gap-1"
            >
              Forgot password?
            </button>

            <AnimatePresence>
              {showForgotModal && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 p-3.5 bg-background/90 border border-gold/30 rounded-xl text-left text-xs text-muted-foreground leading-relaxed shadow-sm overflow-hidden"
                >
                  <p className="font-medium text-foreground mb-1 text-gold flex items-center gap-1.5">
                    ✦ Password Recovery
                  </p>
                  <p className="mb-2">
                    To reset or change your password at any time, log into your <strong>Vercel Dashboard &rarr; Project Settings &rarr; Environment Variables</strong> and update <code className="text-gold font-mono">ADMIN_PASSWORD</code>.
                  </p>
                  <p className="text-[11px] text-muted-foreground/80">
                    If you haven&apos;t customized it yet, your original password remains active. Contact your site admin if you need assistance.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-6 pt-6 border-t border-border/40 text-center">
            <Link
              href="/"
              className="text-xs text-muted-foreground hover:text-gold transition-colors inline-flex items-center gap-1.5"
            >
              &larr; Back to live store
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  // ─────────────────────────────────────────────────────────────
  // 2. DASHBOARD VIEW
  // ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#101526] text-cream pb-24" style={{ fontFamily: 'var(--font-jost)' }}>
      {/* Toast Alert */}
      <AnimatePresence>
        {statusMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] bg-gold text-primary-foreground px-5 py-2.5 rounded-full text-xs font-medium shadow-2xl flex items-center gap-2 border border-cream/30"
          >
            <Check size={16} />
            <span>{statusMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-xl border-b border-border/80 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image src="/images/saze-logo.png" alt="" width={32} height={32} className="rounded-full ring-1 ring-gold/40" />
            <div>
              <span className="font-serif text-2xl tracking-[0.12em] block leading-none">
                SAZ<span className="text-gold">É</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-gold/80 block mt-0.5">
                Catalog &amp; Stock Manager
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/shop"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-gold transition-colors py-1.5 px-3 rounded-full border border-border"
            >
              <span>View live store</span>
              <ExternalLink size={13} />
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs text-red-300 hover:text-red-200 py-1.5 px-3 rounded-full border border-red-900/40 bg-red-950/20 transition-colors"
            >
              <LogOut size={13} />
              <span>Log out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        {/* Metric Cards Banner */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-8">
          <div className="bg-card/60 backdrop-blur-sm border border-border/70 rounded-2xl p-4 sm:p-5">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Total Sets</p>
            <p className="font-serif text-2xl sm:text-4xl text-foreground mt-1">{products.length}</p>
          </div>
          <div className="bg-card/60 backdrop-blur-sm border border-emerald-900/40 rounded-2xl p-4 sm:p-5">
            <p className="text-[10px] uppercase tracking-wider text-emerald-400">In Stock</p>
            <p className="font-serif text-2xl sm:text-4xl text-emerald-400 mt-1">{inStockCount}</p>
          </div>
          <div className="bg-card/60 backdrop-blur-sm border border-red-900/40 rounded-2xl p-4 sm:p-5">
            <p className="text-[10px] uppercase tracking-wider text-red-400">Out of Stock</p>
            <p className="font-serif text-2xl sm:text-4xl text-red-400 mt-1">{outOfStockCount}</p>
          </div>
        </div>

        {/* Action Controls & Filters */}
        <div className="bg-card/40 backdrop-blur-sm border border-border/80 rounded-2xl p-4 sm:p-6 mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4 items-stretch sm:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3.5 top-3.5 text-muted-foreground" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products by name or tagline…"
                className="w-full bg-background/80 border border-border rounded-xl pl-10 pr-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={openAdd}
                className="button-primary min-h-[42px] px-5 rounded-full text-xs font-medium flex items-center gap-2 shadow-lg shadow-gold/20 flex-1 sm:flex-none justify-center"
              >
                <Plus size={16} />
                <span>Add New Product</span>
              </button>
              <button
                type="button"
                onClick={downloadBackup}
                title="Download JSON backup of catalog"
                className="min-h-[42px] px-3.5 rounded-full text-xs border border-border hover:border-gold text-muted-foreground hover:text-gold transition-colors flex items-center gap-1.5"
              >
                <Download size={15} />
                <span className="hidden sm:inline">Backup</span>
              </button>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border/50 text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map(({ value, label }) => (
                <button
                  type="button"
                  key={value}
                  onClick={() => setSelectedCategory(value)}
                  className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
                    selectedCategory === value
                      ? 'bg-gold text-primary-foreground font-medium'
                      : 'border border-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {label}
                </button>
              ))}

              <button
                type="button"
                onClick={() => {
                  setCategoryError('')
                  setIsCategoryModalOpen(true)
                }}
                className="px-3 py-1.5 rounded-full text-xs border border-gold/40 text-gold hover:bg-gold/10 transition-colors flex items-center gap-1.5 ml-1"
                title="Manage categories"
              >
                <Tag size={12} />
                <span>Manage Categories</span>
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-muted-foreground mr-1">Status:</span>
              {(['all', 'instock', 'outofstock'] as const).map((filter) => (
                <button
                  type="button"
                  key={filter}
                  onClick={() => setStockFilter(filter)}
                  className={`px-2.5 py-1 rounded-full text-[11px] transition-colors ${
                    stockFilter === filter
                      ? 'bg-foreground text-background font-medium'
                      : 'border border-border/80 text-muted-foreground'
                  }`}
                >
                  {filter === 'all' ? 'All' : filter === 'instock' ? 'In Stock' : 'Out of Stock'}
                </button>
              ))}

              
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-card/50 backdrop-blur-sm border rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all ${
                product.available
                  ? 'border-border/80 hover:border-gold/40'
                  : 'border-red-950/60 bg-red-950/10'
              }`}
            >
              <div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-background shrink-0 border border-border/60">
                    <Image src={product.image} alt={product.name} fill className="object-cover" sizes="80px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-gold/10 text-gold border border-gold/20 font-medium">
                        {product.category}
                      </span>
                      {product.badge && (
                        <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-border text-foreground">
                          {product.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl text-foreground truncate">
                      {product.name}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5 leading-relaxed">
                      {product.tagline}
                    </p>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-sm font-semibold text-gold font-serif">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-[11px] line-through text-muted-foreground">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-border/60 flex items-center justify-between gap-2">
                {/* One-Tap Stock Toggle */}
                <button
                  type="button"
                  onClick={() => toggleStock(product)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    product.available
                      ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-600/50 hover:bg-emerald-900/60'
                      : 'bg-red-950/60 text-red-300 border border-red-700/60 hover:bg-red-900/80'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      product.available ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'
                    }`}
                  />
                  <span>{product.available ? 'In Stock' : 'Out of Stock'}</span>
                </button>

                {/* Edit & Delete */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => openEdit(product)}
                    className="p-2 rounded-lg text-muted-foreground hover:text-gold hover:bg-gold/10 transition-colors"
                    aria-label={`Edit ${product.name}`}
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteProduct(product.id, product.name)}
                    className="p-2 rounded-lg text-muted-foreground hover:text-red-400 hover:bg-red-950/40 transition-colors"
                    aria-label={`Delete ${product.name}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-card/20 rounded-2xl border border-border/50">
            <Package size={36} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-foreground">No products found matching filters.</p>
            <button
              type="button"
              onClick={() => {
                setSearch('')
                setSelectedCategory('all')
                setStockFilter('all')
              }}
              className="mt-3 text-xs text-gold underline underline-offset-4"
            >
              Reset all filters
            </button>
          </div>
        )}
      </main>

      {/* ─────────────────────────────────────────────────────────────
          3. ADD / EDIT PRODUCT MODAL
         ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-md"
              aria-hidden="true"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-xl bg-card border border-gold/30 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 my-auto text-foreground max-h-[90vh] overflow-y-auto"
            >
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-background transition-colors"
              >
                <X size={20} />
              </button>

              <h2 className="font-serif text-3xl mb-1">
                {editingProduct ? `Edit "${editingProduct.name}"` : 'Add New Product'}
              </h2>
              <p className="text-xs text-muted-foreground mb-6">
                Fill in the details below. Changes reflect on the live store immediately.
              </p>

              <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
                {/* Name */}
                <div>
                  <label className="block text-muted-foreground font-medium mb-1">Product Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Royal Emerald Almond"
                    className="w-full bg-background border border-border rounded-xl px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-gold"
                  />
                </div>

                {/* Tagline */}
                <div>
                  <label className="block text-muted-foreground font-medium mb-1">Short Tagline</label>
                  <input
                    type="text"
                    required
                    value={formData.tagline || ''}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    placeholder="e.g. Sheer blush with delicate gold accents"
                    className="w-full bg-background border border-border rounded-xl px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-gold"
                  />
                </div>

                {/* Pricing & Category in 2 columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-muted-foreground font-medium mb-1">Selling Price (₹)</label>
                    <input
                      type="number"
                      required
                      value={formData.price ?? 399}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      className="w-full bg-background border border-border rounded-xl px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-muted-foreground font-medium mb-1">Original Price (₹) (Optional)</label>
                    <input
                      type="number"
                      value={formData.originalPrice ?? ''}
                      onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                      placeholder="e.g. 599"
                      className="w-full bg-background border border-border rounded-xl px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-muted-foreground font-medium">Category</label>
                      <button
                        type="button"
                        onClick={() => {
                          setCategoryError('')
                          setIsCategoryModalOpen(true)
                        }}
                        className="text-[11px] text-gold hover:underline flex items-center gap-1"
                      >
                        <Plus size={11} /> New Category
                      </button>
                    </div>
                    <select
                      value={formData.category || (categories.find(c => c.value !== 'all')?.value ?? 'everyday')}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-background border border-border rounded-xl px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-gold cursor-pointer"
                    >
                      {categories
                        .filter((c) => c.value !== 'all')
                        .map((c) => (
                          <option key={c.value} value={c.value}>
                            {c.label}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-muted-foreground font-medium mb-1">Badge (Optional)</label>
                    <select
                      value={formData.badge || ''}
                      onChange={(e) => setFormData({ ...formData, badge: (e.target.value as any) || undefined })}
                      className="w-full bg-background border border-border rounded-xl px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-gold cursor-pointer"
                    >
                      <option value="">None</option>
                      <option value="new">New</option>
                      <option value="bestseller">Bestseller</option>
                      <option value="limited">Limited Edition</option>
                    </select>
                  </div>
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-muted-foreground font-medium mb-1">
                    Image URL or Path
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.image || ''}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="/images/products/... or https://..."
                    className="w-full bg-background border border-border rounded-xl px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-gold"
                  />
                  <p className="text-[10px] text-muted-foreground mt-1">
                    Use existing photos (e.g. <span className="font-mono text-gold">/images/products/IMG-20261012-WA0050.jpg</span>) or any web photo URL.
                  </p>
                </div>

                {/* Stock Toggle */}
                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="stock-check"
                    checked={formData.available ?? true}
                    onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                    className="w-4 h-4 rounded text-gold focus:ring-gold border-border bg-background"
                  />
                  <label htmlFor="stock-check" className="text-xs font-medium text-foreground cursor-pointer">
                    Available in stock (uncheck if sold out)
                  </label>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-muted-foreground font-medium mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-background border border-border rounded-xl p-3 text-xs text-foreground focus:outline-none focus:border-gold"
                  />
                </div>

                <div className="pt-4 flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={saving}
                    className="button-primary flex-1 min-h-[46px] rounded-xl font-medium text-xs shadow-lg shadow-gold/20"
                  >
                    {saving ? 'Saving changes…' : editingProduct ? 'Save Changes' : 'Create Product'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="button-outline min-h-[46px] px-5 rounded-xl text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Category Manager Modal */}
      <AnimatePresence>
        {isCategoryModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as const }}
              className="w-full max-w-lg bg-[#141b2d] border border-gold/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] flex flex-col"
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              <div className="flex items-center justify-between pb-4 border-b border-border/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center text-gold">
                    <Tag size={18} />
                  </div>
                  <div>
                    <h2 className="font-serif text-xl sm:text-2xl text-foreground font-normal">
                      Manage Categories
                    </h2>
                    <p className="text-[11px] text-muted-foreground">
                      Add new categories or delete existing ones
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Add New Category Form */}
              <form onSubmit={handleAddCategory} className="py-4 border-b border-border/60">
                <label className="block text-xs font-medium text-foreground mb-1.5">
                  Add New Category
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCategoryLabel}
                    onChange={(e) => {
                      setNewCategoryLabel(e.target.value)
                      setCategoryError('')
                    }}
                    placeholder="e.g. Rings, Luxury Sets, Summer Glow"
                    required
                    className="flex-1 bg-background border border-border rounded-xl px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-gold transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={categorySaving || !newCategoryLabel.trim()}
                    className="button-primary px-4 rounded-xl text-xs font-medium flex items-center gap-1.5 whitespace-nowrap shadow-md shadow-gold/20"
                  >
                    <Plus size={14} />
                    <span>{categorySaving ? 'Adding…' : 'Add'}</span>
                  </button>
                </div>
                {categoryError && (
                  <p className="text-[11px] text-red-400 mt-2 bg-red-950/40 border border-red-800/40 rounded-lg p-2">
                    {categoryError}
                  </p>
                )}
              </form>

              {/* Existing Categories List */}
              <div className="flex-1 overflow-y-auto py-4 space-y-2">
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">
                  Active Categories ({categories.length})
                </p>
                {categories.map((cat) => {
                  const productCount = products.filter((p) => p.category === cat.value).length
                  const isAll = cat.value === 'all'

                  return (
                    <div
                      key={cat.value}
                      className="flex items-center justify-between p-3 rounded-xl bg-card/60 border border-border/70 hover:border-border transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-gold/70" />
                        <div>
                          <p className="text-xs font-medium text-foreground">
                            {cat.label}
                            {isAll && (
                              <span className="ml-2 text-[10px] text-muted-foreground font-normal bg-background/80 px-2 py-0.5 rounded-full border border-border">
                                Default (All Products)
                              </span>
                            )}
                          </p>
                          <p className="text-[10px] text-muted-foreground font-mono">
                            slug: {cat.value} {!isAll && `• ${productCount} set${productCount === 1 ? '' : 's'}`}
                          </p>
                        </div>
                      </div>

                      {!isAll && (
                        <button
                          type="button"
                          onClick={() => handleDeleteCategory(cat.value, cat.label)}
                          disabled={categorySaving}
                          title={`Delete category "${cat.label}"`}
                          className="w-8 h-8 rounded-lg border border-red-900/40 bg-red-950/20 text-red-400 hover:bg-red-900/40 flex items-center justify-center transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-border/80 flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="button-outline min-h-[40px] px-6 rounded-xl text-xs"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
