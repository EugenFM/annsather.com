// src/menu/BreakfastMenu.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Search, Star, X, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { publicGet } from "../utils/apiClient.ts";

/**
 * Breakfast & Desserts menu with integrated Favorites (polished cards).
 * - Fetches Breakfast and optional Desserts.
 * - Renders Favorites grid with consistent hover & focus behavior.
 * - Adds "Show full menu" modal (paged: Breakfast, Lunch, Specials, Entrees).
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

// ---- Favorites: lock to exactly 4 with per-item fallback images ----
type FavoriteTarget = {
    key: string;      // lookup key (lowercase)
    title: string;    // display title
    img: string;      // fallback image
    synonyms: string[];
};

const FAVORITES_TARGETS: FavoriteTarget[] = [
    {
        key: "cinnamon rolls",
        title: "Cinnamon Rolls",
        img: "/images/EFM-AnnSather_PICS/CRolls3.jpg",
        synonyms: ["cinnamon roll", "cinnamon rolls", "cinnamon bun", "cinnamon buns"],
    },
    {
        key: "french toast",
        title: "French Toast",
        img: "https://github.com/Aracif/images/blob/main/swedish-french-toast.png?raw=true",
        synonyms: ["french toast", "pain perdu"],
    },
    {
        key: "swedish waffles",
        title: "Swedish Waffles",
        img: "/images/EFM-AnnSather_PICS/Breakfast6.jpeg",
        synonyms: ["swedish waffle", "swedish waffles", "heart-shaped waffle", "heart shaped waffle"],
    },
    {
        key: "swedish pancakes",
        title: "Swedish Pancakes",
        img: "/images/EFM-AnnSather_PICS/Food1.jpeg",
        synonyms: ["swedish pancake", "swedish pancakes", "pannkakor", "crepes", "thin pancakes"],
    },
];

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

// Free stock fallback image
const DEFAULT_FAVORITE_IMAGE =
    "https://images.pexels.com/photos/6072378/pexels-photo-6072378.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&q=80";

const slug = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const formatPrice = (p: number | string) =>
    typeof p === "number"
        ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(p)
        : `${p}`.trim().startsWith("$")
            ? `${p}`
            : `$${p}`;

/* -------------------------------------------------------
   FullMenuModal: fetches all categories & renders pages
   ------------------------------------------------------- */
type Pages = Array<{
    key: "Breakfast" | "Lunch" | "Specials" | "Entrees";
    title: string;
    data: Categorized;
}>;

function FullMenuModal({
                           open,
                           onClose,
                       }: {
    open: boolean;
    onClose: () => void;
}) {
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");
    const [pages, setPages] = useState<Pages>([]);
    const [page, setPage] = useState(0);
    const closeBtnRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") setPage((p) => Math.max(0, p - 1));
            if (e.key === "ArrowRight") setPage((p) => Math.min(pages.length - 1, p + 1));
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, pages.length, onClose]);

    useEffect(() => {
        if (!open) return;
        (async () => {
            setLoading(true);
            setErr("");
            try {
                const mealTypes: Array<Pages[number]["key"]> = ["Breakfast", "Lunch", "Specials", "Entrees"];
                const built: Pages = [];
                for (const meal of mealTypes) {
                    const op = await publicGet(`/menu/${meal}`);
                    const res = await op.response;
                    const arr: ApiItem[] = await res.body.json();
                    // Group by category
                    const cat: Categorized = {};
                    for (const item of arr) {
                        const c = (item.category || "OTHER").toUpperCase();
                        (cat[c] ??= []).push(item);
                    }
                    Object.values(cat).forEach((a) => a.sort((a, b) => a.title.localeCompare(b.title)));
                    if (Object.keys(cat).length) {
                        built.push({
                            key: meal,
                            title: meal,
                            data: cat,
                        });
                    }
                }
                setPages(built);
                setPage(0);
            } catch (e) {
                console.error(e);
                setErr("Failed to load the full menu. Please try again later.");
            } finally {
                setLoading(false);
                setTimeout(() => closeBtnRef.current?.focus(), 0);
            }
        })();
    }, [open]);

    if (!open) return null;

    const current = pages[page];

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="full-menu-title"
            onClick={onClose}
        >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <div
                className="relative z-10 w-full max-w-5xl rounded-2xl bg-white shadow-2xl ring-1 ring-black/10"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h2 id="full-menu-title" className="text-2xl font-bold text-[#601f1f]">
                        Full Menu
                    </h2>
                    <button
                        ref={closeBtnRef}
                        onClick={onClose}
                        aria-label="Close full menu"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                    >
                        <X />
                    </button>
                </div>

                {/* Toolbar */}
                <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100">
                    <div className="text-sm text-gray-600">
                        {pages.length > 0 ? (
                            <>
                                <span className="font-semibold text-[#601f1f]">{current?.title}</span>{" "}
                                <span>
                  ({page + 1} / {pages.length})
                </span>
                            </>
                        ) : (
                            <span>Loading…</span>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setPage((p) => Math.max(0, p - 1))}
                            className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm hover:bg-gray-50 disabled:opacity-40"
                            disabled={page === 0}
                            aria-label="Previous page"
                        >
                            <ChevronLeft size={18} />
                            Prev
                        </button>
                        <button
                            onClick={() => setPage((p) => Math.min(pages.length - 1, p + 1))}
                            className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm hover:bg-gray-50 disabled:opacity-40"
                            disabled={page >= pages.length - 1}
                            aria-label="Next page"
                        >
                            Next
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>

                {/* Body */}
                <div className="max-h-[70vh] overflow-y-auto">
                    {loading && (
                        <div className="p-10 flex items-center justify-center">
                            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-[#601f1f]" />
                        </div>
                    )}
                    {err && (
                        <div className="p-6">
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                                {err}
                            </div>
                        </div>
                    )}
                    {!loading && !err && current && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                            {Object.entries(current.data).map(([section, items]) => (
                                <article
                                    key={section}
                                    className="rounded-xl border border-gray-100 shadow-sm bg-white"
                                >
                                    <header className="px-5 py-4 border-b border-gray-100 bg-amber-50/60 rounded-t-xl">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-[#601f1f]">{section}</h3>
                                            <span className="text-xs text-gray-600">{items.length} items</span>
                                        </div>
                                    </header>
                                    <ul className="divide-y divide-gray-100/70">
                                        {items.map((i, idx) => (
                                            <li key={`${i.title}-${idx}`} className="px-5 py-3">
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
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-3 border-t border-gray-100 flex items-center justify-end">
                    <button
                        onClick={onClose}
                        className="rounded-md bg-[#601f1f] text-white px-4 py-2 text-sm font-semibold hover:bg-[#4f1919] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

/* -------------------------
   Favorite Card (updated)
   ------------------------- */
function FavoriteCard({ item }: { item: ApiItem }) {
    const imgSrc =
        item.image && item.image.trim().length > 0 ? item.image : DEFAULT_FAVORITE_IMAGE;

    return (
        <article
            className="
        group relative h-full rounded-2xl p-[1px]
        bg-gradient-to-br from-amber-200 via-yellow-200/60 to-orange-200/40
        transition-all duration-300 ease-out
        motion-safe:hover:-translate-y-1
        focus-within:-translate-y-1
      "
        >
            <div
                className="
          flex h-full flex-col rounded-2xl bg-white ring-1 ring-black/5 shadow-sm
          transition-all duration-300 ease-out
          group-hover:shadow-xl
          group-focus-within:shadow-xl
        "
            >
                {/* Media */}
                <div className="relative overflow-hidden rounded-t-2xl">
                    <div className="aspect-[4/3] w-full">
                        <img
                            src={imgSrc}
                            alt={item.title}
                            className="
                h-[280px] w-full object-cover
                transition-transform duration-300 ease-out
                motion-safe:group-hover:scale-105
              "
                            loading="lazy"
                        />
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

                    {/* Heart — now solid red */}
                    <button
                        type="button"
                        aria-label={`Favorite ${item.title}`}
                        className="
              absolute right-3 top-3 z-10
              inline-flex h-9 w-9 items-center justify-center
              rounded-full bg-white/90 backdrop-blur
              text-red-600
              shadow ring-1 ring-black/5
              transition-transform duration-200 ease-out
              hover:scale-110 active:scale-95
              focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white
            "
                    >
                        {/* The fill prop turns the glyph solid using the current text color */}
                        <Heart size={18} fill="currentColor" />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 px-4 py-4">
                    <div className="space-y-2">
                        <h4 className="line-clamp-2 text-base font-semibold text-[#601f1f]">
                            {item.title}
                        </h4>
                        {item.description && (
                            <p className="line-clamp-3 text-sm text-gray-700">{item.description}</p>
                        )}
                    </div>

                    {/* Price row pinned to bottom via outer flex-1 */}
                    <div className="mt-3 flex items-center justify-between">
            <span className="text-[15px] tabular-nums text-[#601f1f]">
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
    const [showFullMenu, setShowFullMenu] = useState(false);
    const [showTop, setShowTop] = useState(false);

    const containerRef = useRef<HTMLDivElement | null>(null);

    // 🧭 Show "Back to Top" button when scrolled down
    useEffect(() => {
        const handleScroll = () => {
            setShowTop(window.scrollY > 400);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // fetch Breakfast + optional Desserts with localStorage cache
    useEffect(() => {
        let hasCache = false;

        // 1️⃣ Try to load cached data first (instant render if available)
        try {
            const cachedBreakfast = localStorage.getItem("as_menu_breakfast");
            const cachedDesserts = localStorage.getItem("as_menu_desserts");

            if (cachedBreakfast) {
                const parsedB: ApiItem[] = JSON.parse(cachedBreakfast);
                setBreakfastData(parsedB);
                hasCache = true;
            }

            if (cachedDesserts) {
                const parsedD: ApiItem[] = JSON.parse(cachedDesserts);
                setDessertData(parsedD);
            }

            if (hasCache) {
                // we already have something to show, so don't block UI
                setLoading(false);
            }
        } catch (e) {
            console.error("Failed to read menu cache:", e);
        }

        // 2️⃣ Always fetch fresh data in the background
        (async () => {
            setErr("");
            try {
                if (!hasCache) {
                    setLoading(true); // only show spinner if nothing cached
                }

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
                            dJson = arr.map((i) => ({
                                ...i,
                                category: i.category || "DESSERTS",
                            }));
                            break;
                        }
                    } catch {
                        // try next candidate
                    }
                }

                // ✅ Update state
                setBreakfastData(bJson || []);
                setDessertData(dJson || []);

                // ✅ Update cache
                try {
                    localStorage.setItem("as_menu_breakfast", JSON.stringify(bJson || []));
                    localStorage.setItem("as_menu_desserts", JSON.stringify(dJson || []));
                } catch (e) {
                    console.error("Failed to write menu cache:", e);
                }
            } catch (e) {
                console.error(e);
                if (!hasCache) {
                    // only show error if we truly have nothing to show
                    setErr("Failed to load breakfast menu. Please try again later.");
                }
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

    // Favorites: exactly 4 targeted picks or fallbacks
    const favorites = useMemo(() => {
        const src = sectionsInOrder.flatMap((sec) => filtered[sec] || []);

        const pickBySynonyms = (syns: string[]) => {
            return src.find((i) => {
                const t = (i.title || "").toLowerCase();
                return syns.some((s) => t.includes(s));
            });
        };

        return FAVORITES_TARGETS.map((t) => {
            const found = pickBySynonyms(t.synonyms);
            if (!found) {
                return {
                    title: t.title,
                    price: "$",
                    description: "",
                    image: t.img,
                    featured: true,
                    category: "FAVORITES",
                };
            }
            return {
                ...found,
                image: found.image && found.image.trim().length > 0 ? found.image : t.img,
                category: found.category || "FAVORITES",
            };
        });
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
        <section id={'menu'} aria-labelledby="breakfast-menu-title" className="relative w-viewport bg-[#FFF] ml-5 mt-5 mr-5 mx-auto text-[#601f1f] overflow-hidden scroll-mt-24" ref={containerRef}>

            {/* Background image (motion-safe parallax on md+) */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-0 bg-[url('/images/EFM-AnnSather_PICS/table.jpg')] bg-cover bg-center bg-no-repeat bg-scroll md:bg-fixed motion-reduce:bg-scroll"
            />
            <div aria-hidden className="pointer-events-none absolute inset-0 z-10 bg-white/70 md:bg-white/70" />

            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Header Row */}
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <h2 id="breakfast-menu-title" className="text-4xl font-bold text-[#601f1f]">
                            Breakfast & Desserts
                        </h2>
                        <p className="text-lg text-[#601f1f]/80">Our morning classics and sweet treats.</p>
                    </div>

                    {/* Search + Full menu link */}
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
                                    <X size={18} />
                                </button>
                            )}
                        </div>

                        {/* NEW: Show full menu modal trigger */}
                        <button
                            type="button"
                            onClick={() => setShowFullMenu(true)}
                            className="shrink-0 rounded-md border border-[#601f1f]/30 bg-white/90 backdrop-blur px-3 py-2 text-base font-semibold text-[#601f1f] hover:bg-white cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                        >
                            Show full menu
                        </button>
                    </div>
                </div>

                {/* ===== Favorites (integrated, upgraded cards) ===== */}
                {favorites.length > 0 && (
                    <section aria-labelledby="favorites-title" className="mb-10">
                        <div className="flex items-center justify-between mb-3">
                            <h3 id="favorites-title" className="text-xl font-bold text-[#601f1f]">
                                Favorites
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-stretch gap-6">
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
                <div className="grid grid-cols-1 lg:grid-cols-[285px_1fr] gap-6">
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
                                        className="w-full text-left px-3 py-2 rounded-md border border-white/60 bg-white/80 backdrop-blur hover:bg-white shadow-sm ring-1 ring-black/5 flex items-center justify-between cursor-pointer"
                                    >
                                        <span className="truncate text-sm text-[#601f1f]">{section}</span>
                                        <span className="ml-3 text-sm text-[#601f1f]">{count}</span>
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
                                    className="h-full bg-white/30 p-2 backdrop-blur rounded-xl shadow-sm hover:shadow-md transition-shadow border border-white/60 ring-1 ring-black/5 flex flex-col"
                                >
                                    <header
                                        id={id}
                                        className={`${secPad} border-b border-white/60 bg-gradient-to-r from-amber-50/80 to-amber-50/70 rounded-xl scroll-mt-24`}
                                    >
                                        <div id={`${id}-title`} className="flex items-center justify-between">
                                            <h3 className="text-xl font-bold text-[#601f1f]">{section}</h3>
                                            <span className="text-sm text-[#601f1f]">
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
                                                            <h4 className="font-small text-[#601f1f]">{i.title}</h4>
                                                            {i.featured && (
                                                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-yellow-800 bg-yellow-100 px-2 py-0.5 rounded-full">
                                  <Star size={12} className="inline" /> Popular
                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <span className="flex-1 border-b border-dashed border-gray-300 translate-y-1" />
                                                    <div className="shrink-0 text-[15px] tabular-nums text-[#601f1f]">
                                                        {formatPrice(i.price)}
                                                    </div>
                                                </div>
                                                {i.description && (
                                                    <p className="mt-1 text-sm text-[#601f1f]">{i.description}</p>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </article>
                            );
                        })}
                    </div>
                    {/* 🔝 Back to Top Floating Button */}
                    {showTop && (
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                            aria-label="Back to top"
                            className="fixed bottom-6 right-6 z-[9999] w-12 h-12 rounded-full
            bg-[#EDEDED] text-[#601f1f] text-xl font-bold
            flex items-center justify-center shadow-lg border border-[#601f1f]/30
            hover:bg-[#601f1f] hover:text-[#EDEDED] hover:scale-110
            transition-all duration-300 ease-in-out"
                        >
                            ↑
                        </button>
                    )}
                </div>
            </div>

            {/* Full Menu Modal */}
            <FullMenuModal open={showFullMenu} onClose={() => setShowFullMenu(false)} />
        </section>
    );
};

export default BreakfastMenu;
