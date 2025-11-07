// src/components/menu/BreakfastMenu.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Search, Star, X, ListFilter } from "lucide-react";
import { publicGet } from "../utils/apiClient.ts";

type ApiItem = {
    title: string;
    price: number | string;
    description?: string;
    featured?: boolean;
    category: string; // e.g., "EGGS BENEDICT", "PANCAKES, WAFFLES & MORE"
};

type Categorized = Record<string, ApiItem[]>;

const ORDER: string[] = [
    "EGGS BENEDICT",
    "THREE EGG OMELETS",
    "EGGS",
    "BREAKFAST WRAPS",
    "PANCAKES, WAFFLES & MORE",
    "A LA CARTE",
    "FRUIT & CEREAL",
    "BEVERAGES",
];

const slug = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const formatPrice = (p: number | string) =>
    typeof p === "number"
        ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(p)
        : p.startsWith("$")
            ? p
            : `$${p}`;

const BreakfastMenu: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState<string>("");
    const [data, setData] = useState<ApiItem[]>([]);
    const [search, setSearch] = useState("");
    const [density, setDensity] = useState<"cozy" | "compact">("compact");

    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        (async () => {
            setLoading(true);
            setErr("");
            try {
                const op = await publicGet(`/menu/Breakfast`);
                const response = await op.response;
                const json: ApiItem[] = await response.body.json();
                setData(json || []);
            } catch (e) {
                console.error(e);
                setErr("Failed to load breakfast menu. Please try again later.");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    // Group by category
    const grouped: Categorized = useMemo(() => {
        const g: Categorized = {};
        for (const item of data) {
            const cat = item.category || "Other";
            (g[cat] ??= []).push(item);
        }
        // stable alpha inside each section
        Object.values(g).forEach((arr) => arr.sort((a, b) => a.title.localeCompare(b.title)));
        return g;
    }, [data]);

    // Filtered by search
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

    const sectionsInOrder = useMemo(() => {
        const keys = Object.keys(filtered);
        const ordered = ORDER.filter((s) => keys.includes(s));
        const leftovers = keys.filter((k) => !ORDER.includes(k)).sort();
        return [...ordered, ...leftovers];
    }, [filtered]);

    const rowPad = density === "compact" ? "py-2" : "py-3";
    const secPad = density === "compact" ? "px-4 py-4" : "px-6 py-6";

    const handleAnchorClick = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return;
        // offset for fixed header
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
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{err}</div>
                </div>
            </section>
        );
    }

    return (
        <section aria-labelledby="breakfast-menu-title" className="bg-[#FAFAFA]" ref={containerRef}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Header Row */}
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <h2 id="breakfast-menu-title" className="text-3xl font-bold text-[#601f1f]">
                            Our Breakfast Menu
                        </h2>
                        {/*<p className="text-gray-700">Quick to scan. Breakfast-first. All the classics.</p>*/}
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        {/* Search */}
                        <div className="relative w-full md:w-80">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#601f1f]" />
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search breakfast..."
                                className="w-full bg-white border border-[#601f1f] text-[#601f1f] placeholder-[#601f1f] rounded-md py-2 pl-10 pr-9 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                                aria-label="Search breakfast menu"
                            />
                            {search && (
                                <button
                                    type="button"
                                    onClick={() => setSearch("")}
                                    aria-label="Clear search"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-gray-100"
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>

                        {/* Density */}
              {/*          <button*/}
              {/*              type="button"*/}
              {/*              onClick={() => setDensity((d) => (d === "compact" ? "cozy" : "compact"))}*/}
              {/*              className="inline-flex items-center gap-2 border border-[#601f1f] text-[#601f1f] rounded-md px-3 py-2 hover:bg-white"*/}
              {/*              aria-pressed={density === "compact"}*/}
              {/*              aria-label="Toggle density"*/}
              {/*              title={`Switch to ${density === "compact" ? "cozy" : "compact"} density`}*/}
              {/*          >*/}
              {/*              <ListFilter size={16} />*/}
              {/*              <span className="text-sm hidden sm:inline">*/}
              {/*  {density === "compact" ? "Compact" : "Cozy"}*/}
              {/*</span>*/}
              {/*          </button>*/}
                    </div>
                </div>

                {/* Mobile category chips */}
                <div className="md:hidden -mx-4 px-4 overflow-x-auto no-scrollbar pb-3">
                    <div className="flex gap-2">
                        {sectionsInOrder.map((section) => {
                            const id = `sec-${slug(section)}`;
                            return (
                                <button
                                    key={section}
                                    onClick={() => handleAnchorClick(id)}
                                    className="shrink-0 rounded-full border border-[#601f1f] text-[#601f1f] px-3 py-1 text-sm bg-white"
                                >
                                    {section}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Main layout */}
                <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
                    {/* Sticky left index (desktop) */}
                    <aside className="hidden lg:block">
                        <div className="sticky top-24 space-y-2">
                            {sectionsInOrder.map((section) => {
                                const id = `sec-${slug(section)}`;
                                const count = filtered[section]?.length ?? 0;
                                return (
                                    <button
                                        key={section}
                                        onClick={() => handleAnchorClick(id)}
                                        className="w-full text-left px-3 py-2 rounded-md border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-between"
                                    >
                                        <span className="truncate text-sm text-[#601f1f]">{section}</span>
                                        <span className="ml-3 text-xs text-gray-500">{count}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </aside>

                    {/* Sections */}
                    <div className="space-y-6">
                        {sectionsInOrder.map((section) => {
                            const items = filtered[section];
                            if (!items || !items.length) return null;
                            const id = `sec-${slug(section)}`;
                            return (
                                <article key={section} aria-labelledby={`${id}-title`} className="bg-white rounded-xl shadow-sm border border-gray-200">
                                    <header id={id} className={`scroll-mt-24 ${secPad} border-b border-gray-100`}>
                                        <div id={`${id}-title`} className="flex items-center justify-between">
                                            <h3 className="text-xl font-bold text-[#601f1f]">{section}</h3>
                                            <span className="text-sm text-gray-600">{items.length} item{items.length > 1 ? "s" : ""}</span>
                                        </div>
                                    </header>

                                    <ul className="divide-y divide-gray-100">
                                        {items.map((i, idx) => (
                                            <li key={`${i.title}-${idx}`} className={`px-4 sm:px-6 ${rowPad}`}>
                                                {/* line with dotted leader */}
                                                <div className="flex items-baseline gap-3">
                                                    <div className="min-w-0">
                                                        <div className="flex items-center gap-2">
                                                            <h4 className="font-medium text-gray-900 truncate">{i.title}</h4>
                                                            {i.featured && (
                                                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded-full">
                                  <Star size={12} className="inline" /> Popular
                                </span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* dotted leader */}
                                                    <span className="flex-1 border-b border-dashed border-gray-300 translate-y-1" />

                                                    {/* price */}
                                                    <div className="shrink-0 text-[15px] tabular-nums text-gray-900">
                                                        {formatPrice(i.price)}
                                                    </div>
                                                </div>

                                                {i.description && (
                                                    <p className="mt-1 text-sm text-gray-600">{i.description}</p>
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
