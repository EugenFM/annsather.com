// src/components/menu/BreakfastMenu.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Search, Star, X, Heart } from "lucide-react";
import { publicGet } from "../utils/apiClient.ts";

/**
 * Breakfast & Desserts menu with integrated Favorites (polished cards).
 * - Fetches Breakfast and optional Desserts.
 * - Renders Favorites grid with consistent hover & focus behavior.
 * - Respects reduced-motion preferences.
 */

type ApiItem = {
    title: string;
    price: number | string;
    description?: string;
    featured?: boolean;
    category?: string;
    image?: string;
};

type Categorized = Record<string, ApiItem[]>;

const BREAKFAST_ORDER = [
    "EGGS BENEDICT",
    "THREE EGG OMELETS",
    "EGGS",
    "BREAKFAST WRAPS",
    "PANCAKES, WAFFLES & MORE",
    "A LA CARTE",
    "FRUIT & CEREAL",
    "BEVERAGES",
];

const ORDER = [...BREAKFAST_ORDER, "DESSERTS"];

const FAVORITE_KEYWORDS = [
    "cinnamon",
    "pancake",
    "waffle",
    "french toast",
    "roll",
    "muffin",
    "pecan",
    "lingonberry",
    "swedish",
];

const slug = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const formatPrice = (p: number | string) =>
    typeof p === "number"
        ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(p)
        : `${p}`.trim().startsWith("$")
            ? `${p}`
            : `$${p}`;

// ---- Favorite Card (polished & consistent) ----
function FavoriteCard({ item }: { item: ApiItem }) {
    const hasImage = !!item.image;
    const initial = item.title?.charAt(0)?.toUpperCase() ?? "•";

    return (
        <article
            className="
        group relative rounded-2xl p-[1px]
        bg-gradient-to-br from-amber-200 via-yellow-200/60 to-orange-200/40
        transition-all duration-300 ease-out
        motion-safe:hover:-translate-y-1
        focus-within:-translate-y-1
      "
        >
            <div
                className="
          rounded-2xl bg-white ring-1 ring-black/5 shadow-sm
          transition-all duration-300 ease-out
          group-hover:shadow-xl
          group-focus-within:shadow-xl
        "
            >
                {/* Media */}
                <div className="relative overflow-hidden rounded-t-2xl">
                    <div className="aspect-[4/3] w-full">
                        {hasImage ? (
                            <img
                                src={item.image as string}
                                alt={item.title}
                                className="
                  h-full w-full object-cover
                  transition-transform duration-300 ease-out
                  motion-safe:group-hover:scale-105
                "
                                loading="lazy"
                            />
                        ) : (
                            <div
                                aria-hidden
                                className="
                  h-full w-full
                  bg-gradient-to-br from-amber-100 to-rose-100
                  flex items-center justify-center
                "
                            >
                                <span className="text-4xl font-bold text-[#601f1f]/70">{initial}</span>
                            </div>
                        )}
                    </div>

                    {/* hover scrim */}
                    <div
                        aria-hidden
                        className="
              pointer-events-none absolute inset-0
              opacity-0 group-hover:opacity-100
              transition-opacity duration-300 ease-out
              bg-gradient-to-t from-black/40 via-black/15 to-transparent
            "
                    />

                    {/* Popular badge */}
                    {item.featured && (
                        <span
                            className="
                absolute left-3 top-3 z-10 inline-flex items-center gap-1
                rounded-full bg-yellow-100 px-2.5 py-1
                text-xs font-semibold text-yellow-900
                shadow ring-1 ring-black/5
              "
                        >
              <Star size={12} /> Popular
            </span>
                    )}

                    {/* Heart */}
                    <button
                        type="button"
                        aria-label={`Favorite ${item.title}`}
                        className="
              absolute right-3 top-3 z-10
              inline-flex h-9 w-9 items-center justify-center
              rounded-full bg-white/90 backdrop-blur
              text-red-500
              shadow ring-1 ring-black/5
              transition-transform duration-200 ease-out
              hover:scale-110 active:scale-95
              focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white
            "
                    >
                        <Heart size={18} />
                    </button>
                </div>

                {/* Body */}
                <div className="space-y-2 px-4 py-4">
                    <h4 className="line-clamp-2 text-base font-semibold text-[#601f1f]">
                        {item.title}
                    </h4>
                    {item.description && (
                        <p className="line-clamp-3 text-sm text-gray-700">{item.description}</p>
                    )}
                    <div className="flex items-center justify-between pt-1">
            <span className="text-[15px] tabular-nums text-gray-900">
              {formatPrice(item.price)}
            </span>
                        <span
                            aria-hidden
                            className="
                h-[2px] w-10 origin-left scale-x-0 bg-amber-300
                transition-transform duration-300 ease-out
                group-hover:scale-x-100
              "
                        />
                    </div>
                </div>
            </div>
        </article>
    );
}

const BreakfastMenu: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");
    const [breakfastData, setBreakfastData] = useState<ApiItem[]>([]);
    const [dessertData, setDessertData] = useState<ApiItem[]>([]);
    const [search, setSearch] = useState("");
    const [density] = useState<"cozy" | "compact">("compact");

    const containerRef = useRef<HTMLDivElement | null>(null);

    // fetch Breakfast + optional Desserts
    useEffect(() => {
        (async () => {
            setLoading(true);
            setErr("");
            try {
                const bOp = await publicGet(`/menu/Breakfast`);
                const bRes = await bOp.response;
                const bJson: ApiItem[] = await bRes.body.json();

                const dessertCandidates = ["/menu/Desserts", "/menu/Dessert"];
                let dJson: ApiItem[] = [];
                for (const path of dessertCandidates) {
                    try {
                        const dOp = await publicGet(path);
                        const dRes = await dOp.response;
                        const arr: ApiItem[] = await dRes.body.json();
                        if (Array.isArray(arr) && arr.length) {
                            dJson = arr.map((i) => ({ ...i, category: i.category || "DESSERTS" }));
                            break;
                        }
                    } catch {
                        // continue to next candidate
                    }
                }

                setBreakfastData(bJson || []);
                setDessertData(dJson || []);
            } catch (e) {
                console.error(e);
                setErr("Failed to load breakfast menu. Please try again later.");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    // Combine breakfast + desserts (or derive dessertish items if missing)
    const allItems: ApiItem[] = useMemo(() => {
        const base = [...breakfastData];
        const haveDesserts = dessertData.length > 0;
        if (!haveDesserts) {
            const dessertish = breakfastData.filter((i) =>
                FAVORITE_KEYWORDS.some((k) => i.title?.toLowerCase().includes(k))
            );
            const tagged = dessertish.map((i) => ({ ...i, category: "DESSERTS" as const }));
            return [...base, ...tagged];
        }
        return [...base, ...dessertData];
    }, [breakfastData, dessertData]);

    // Group by category
    const grouped: Categorized = useMemo(() => {
        const g: Categorized = {};
        for (const item of allItems) {
            const cat = (item.category || "OTHER").toUpperCase();
            (g[cat] ??= []).push(item);
        }
        Object.values(g).forEach((arr) => arr.sort((a, b) => a.title.localeCompare(b.title)));
        return g;
    }, [allItems]);

    // Filter by search
    const filtered: Categorized = useMemo(() => {
        if (!search.trim()) return grouped;
        const q = search.toLowerCase();
        const out: Categorized = {};
        Object.entries(grouped).forEach(([section, items]) => {
            const hits = items.filter(
                (i) =>
                    i.title.toLowerCase().includes(q) ||
                    (i.description ?? "").toLowerCase().includes(q)
            );
            if (hits.length) out[section] = hits;
        });
        return out;
    }, [grouped, search]);

    // Section ordering
    const sectionsInOrder = useMemo(() => {
        const keys = Object.keys(filtered);
        const ordered = ORDER.filter((s) => keys.includes(s));
        const leftovers = keys.filter((k) => !ORDER.includes(k)).sort();
        return [...ordered, ...leftovers];
    }, [filtered]);

    // Favorites: featured items and sweets/classics; max 8
    const favorites = useMemo(() => {
        const src = sectionsInOrder.flatMap((sec) => filtered[sec] || []);
        const pool = src.filter(
            (i) =>
                i.featured ||
                FAVORITE_KEYWORDS.some((k) => i.title?.toLowerCase().includes(k))
        );
        const seen = new Set<string>();
        const unique = pool.filter((i) => {
            const key = `${i.title}|${i.category}`;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
        return unique.slice(0, 8);
    }, [filtered, sectionsInOrder]);

    const rowPad = "py-2";
    const secPad = "px-6 py-6";

    const handleAnchorClick = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return;
        const offset = 100;
        const y = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: "smooth" });
    };

    if (loading) {
        return (
            <section className="bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#601f1f]" />
                </div>
            </section>
        );
    }

    if (err) {
        return (
            <section className="bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {err}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section aria-labelledby="breakfast-menu-title" className="relative z-0" ref={containerRef}>
            {/* Background image (motion-safe parallax on md+) */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-0 bg-[url('/images/breakfast-hero.png')] bg-cover bg-center bg-no-repeat bg-scroll md:bg-fixed motion-reduce:bg-scroll"
            />
            <div aria-hidden className="pointer-events-none absolute inset-0 z-10 bg-white/80 md:bg-white/70" />

            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Header Row */}
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <h2 id="breakfast-menu-title" className="text-3xl font-bold text-[#601f1f]">
                            Breakfast & Desserts
                        </h2>
                        <p className="text-sm text-[#601f1f]/80">
                            Our morning classics and sweet treats.
                        </p>
                    </div>

                    {/* Search */}
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative w-full md:w-80">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#601f1f]" />
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search breakfast & desserts…"
                                className="w-full bg-white/90 backdrop-blur border border-[#601f1f]/80 text-[#601f1f] placeholder-[#601f1f] rounded-md py-2 pl-10 pr-9 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
                                aria-label="Search breakfast and desserts menu"
                            />
                            {search && (
                                <button
                                    type="button"
                                    onClick={() => setSearch("")}
                                    aria-label="Clear search"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-white/60"
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* ===== Favorites (integrated, upgraded cards) ===== */}
                {favorites.length > 0 && (
                    <section aria-labelledby="favorites-title" className="mb-10">
                        <div className="flex items-center justify-between mb-3">
                            <h3 id="favorites-title" className="text-xl font-bold text-[#601f1f]">
                                Favorites
                            </h3>
                            <span className="text-sm text-gray-700">
                {favorites.length} item{favorites.length > 1 ? "s" : ""}
              </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {favorites.map((f, idx) => (
                                <FavoriteCard key={`${f.title}-${idx}`} item={f} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Mobile chips */}
                <div className="md:hidden -mx-4 px-4 overflow-x-auto no-scrollbar pb-3">
                    <div className="flex gap-2">
                        {sectionsInOrder.map((section) => {
                            const id = `sec-${slug(section)}`;
                            return (
                                <button
                                    key={section}
                                    onClick={() => handleAnchorClick(id)}
                                    className="shrink-0 rounded-full border border-[#601f1f]/50 text-[#601f1f] px-3 py-1 text-sm bg-white/80 backdrop-blur"
                                >
                                    {section}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
                    {/* Sticky left index */}
                    <aside className="hidden lg:block">
                        <div className="sticky top-24 space-y-2">
                            {sectionsInOrder.map((section) => {
                                const id = `sec-${slug(section)}`;
                                const count = (filtered[section]?.length ?? 0);
                                return (
                                    <button
                                        key={section}
                                        onClick={() => handleAnchorClick(id)}
                                        className="w-full text-left px-3 py-2 rounded-md border border-white/60 bg-white/80 backdrop-blur hover:bg-white shadow-sm ring-1 ring-black/5 flex items-center justify-between"
                                    >
                                        <span className="truncate text-sm text-[#601f1f]">{section}</span>
                                        <span className="ml-3 text-xs text-gray-600">{count}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </aside>

                    {/* Sections */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                        {sectionsInOrder.map((section) => {
                            const items = filtered[section];
                            if (!items || !items.length) return null;
                            const id = `sec-${slug(section)}`;
                            return (
                                <article
                                    key={section}
                                    aria-labelledby={`${id}-title`}
                                    className="h-full bg-white/80 backdrop-blur rounded-xl shadow-sm hover:shadow-md transition-shadow border border-white/60 ring-1 ring-black/5 flex flex-col"
                                >
                                    <header
                                        id={id}
                                        className={`${secPad} border-b border-white/60 bg-gradient-to-r from-amber-50/80 to-transparent rounded-t-xl scroll-mt-24`}
                                    >
                                        <div id={`${id}-title`} className="flex items-center justify-between">
                                            <h3 className="text-xl font-bold text-[#601f1f]">{section}</h3>
                                            <span className="text-sm text-gray-700">
                        {items.length} item{items.length > 1 ? "s" : ""}
                      </span>
                                        </div>
                                    </header>

                                    <ul className="divide-y divide-gray-100/70">
                                        {items.map((i, idx) => (
                                            <li key={`${i.title}-${idx}`} className={`px-4 sm:px-6 ${rowPad}`}>
                                                <div className="flex items-baseline gap-3">
                                                    <div className="min-w-0">
                                                        <div className="flex items-center gap-2">
                                                            <h4 className="font-medium text-gray-900 truncate">{i.title}</h4>
                                                            {i.featured && (
                                                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-yellow-800 bg-yellow-100 px-2 py-0.5 rounded-full">
                                  <Star size={12} className="inline" /> Popular
                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <span className="flex-1 border-b border-dashed border-gray-300 translate-y-1" />
                                                    <div className="shrink-0 text-[15px] tabular-nums text-gray-900">
                                                        {formatPrice(i.price)}
                                                    </div>
                                                </div>
                                                {i.description && (
                                                    <p className="mt-1 text-sm text-gray-700">{i.description}</p>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BreakfastMenu;
