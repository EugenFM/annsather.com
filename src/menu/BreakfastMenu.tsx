// src/components/menu/BreakfastMenu.tsx
import React, { useEffect, useMemo, useState } from "react";
import { Search, Star } from "lucide-react";
// Reuse your existing API client (same as current CompleteMenu)
import { publicGet } from "../utils/apiClient.ts";

type ApiItem = {
    title: string;
    price: number | string;
    description?: string;
    featured?: boolean;
    category: string; // e.g., "EGGS BENEDICT", "PANCAKES, WAFFLES & MORE", etc.
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

const formatPrice = (p: number | string) => {
    if (typeof p === "number") {
        return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(p);
    }
    return p.startsWith("$") ? p : `$${p}`;
};

const BreakfastMenu: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState<string>("");
    const [data, setData] = useState<ApiItem[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const load = async () => {
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
        };
        load();
    }, []);

    const grouped: Categorized = useMemo(() => {
        const g: Categorized = {};
        for (const item of data) {
            const cat = item.category || "Other";
            if (!g[cat]) g[cat] = [];
            g[cat].push(item);
        }
        return g;
    }, [data]);

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

    if (loading) {
        return (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex items-center justify-center h-40">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#601f1f]" />
                </div>
            </section>
        );
    }

    if (err) {
        return (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{err}</div>
            </section>
        );
    }

    return (
        <section aria-labelledby="breakfast-menu-title" className="bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Header */}
                <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                    <div>
                        <h2 id="breakfast-menu-title" className="text-3xl font-bold text-[#601f1f]">
                            Our Breakfast Menu
                        </h2>
                        <p className="text-gray-700">
                            Simple, familiar, and Swedish-inspired classics.
                        </p>
                    </div>

                    {/* Search */}
                    <div className="relative w-full md:w-80">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#601f1f]" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search breakfast..."
                            className="w-full bg-white border border-[#601f1f] text-[#601f1f] placeholder-[#601f1f] rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                        />
                    </div>
                </div>

                {/* Sections */}
                <div className="space-y-8">
                    {(ORDER.filter((s) => filtered[s]).length ? ORDER : Object.keys(filtered)).map(
                        (section) => {
                            const items = filtered[section];
                            if (!items || !items.length) return null;
                            return (
                                <article key={section} className="bg-white rounded-xl shadow-sm border border-gray-200">
                                    <header className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                                        <h3 className="text-xl font-bold text-[#601f1f]">{section}</h3>
                                        <span className="text-sm text-gray-600">{items.length} item{items.length > 1 ? "s" : ""}</span>
                                    </header>
                                    <ul className="divide-y divide-gray-100">
                                        {items.map((i, idx) => (
                                            <li key={`${i.title}-${idx}`} className="px-6 py-4 flex items-start justify-between">
                                                <div className="pr-4">
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="font-semibold text-gray-900">{i.title}</h4>
                                                        {i.featured && <Star size={16} className="text-yellow-500" fill="currentColor" />}
                                                    </div>
                                                    {i.description && (
                                                        <p className="text-sm text-gray-600 mt-1">{i.description}</p>
                                                    )}
                                                </div>
                                                <div className="shrink-0 text-lg text-gray-900">
                                                    {formatPrice(i.price)}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </article>
                            );
                        }
                    )}
                </div>
            </div>
        </section>
    );
};

export default BreakfastMenu;
