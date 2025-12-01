// src/menu/BreakfastFavorites.tsx
import React from "react";
import { Star, Heart } from "lucide-react";

export type FavoriteItem = {
    title: string;
    description: string;
    price: string;
    image: string;
    popular?: boolean;
};

type Props = {
    items: FavoriteItem[];
};

function FavoriteCard({ item }: { item: FavoriteItem }) {
    return (
        <article
            className="
        group relative
        rounded-2xl
        p-[1px]
        bg-gradient-to-br from-amber-200 via-yellow-200/60 to-orange-200/40
        transition-all duration-300 ease-out
        motion-safe:hover:translate-y-[-4px]
        focus-within:translate-y-[-4px]
      "
        >
            {/* Inner card */}
            <div
                className="
          rounded-2xl bg-white shadow-sm
          ring-1 ring-black/5
          transition-all duration-300 ease-out
          group-hover:shadow-xl
          focus-within:shadow-xl
        "
            >
                {/* Media */}
                <div className="relative overflow-hidden rounded-t-2xl">
                    {/* Fixed aspect ratio keeps heights consistent across cards */}
                    <div className="aspect-[4/3] w-full">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="
                h-[280px] w-full object-cover
                transition-transform duration-300 ease-out
                motion-safe:group-hover:scale-105
              "
                            loading="lazy"
                        />
                    </div>

                    {/* Gradient scrim on hover for contrast */}
                    <div
                        className="
              pointer-events-none absolute inset-0
              opacity-0 group-hover:opacity-100
              transition-opacity duration-300 ease-out
              bg-gradient-to-t from-black/40 via-black/10 to-transparent
            "
                        aria-hidden
                    />

                    {/* Popular badge */}
                    {item.popular && (
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

                    {/* Favorite (heart) button */}
                    <button
                        type="button"
                        aria-label={`Add ${item.title} to favorites`}
                        className="
              absolute right-3 top-3 z-10
              inline-flex h-9 w-9 items-center justify-center
              rounded-full bg-white/90 backdrop-blur
              text-red-500
              shadow ring-1 ring-black/5
              transition-transform duration-200 ease-out
              hover:scale-110 active:scale-95
              focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-[#601f1f] focus-visible:ring-offset-2 focus-visible:ring-offset-white
            "
                    >
                        <Heart size={18} />
                    </button>
                </div>

                {/* Body */}
                <div className="space-y-2 px-4 py-4 h-[180px]">
                    <h4 className="line-clamp-2 text-xl font-semibold text-[#601f1f] p-2">
                        {item.title}
                    </h4>
                    {item.description && (
                        <p className="px-2 text-sm text-[#601f1f]">{item.description}</p>
                    )}
                    <div className="flex items-center justify-between pt-1">
                        <span className="px-2 text-[15px] tabular-nums text-[#601f1f]">{item.price}</span>

                        {/* Subtle underline grows on hover to signal interactivity */}
                        <span
                            className="
                h-[2px] w-10 origin-left scale-x-0 bg-amber-300
                transition-transform duration-300 ease-out
                group-hover:scale-x-100
              "
                            aria-hidden
                        />
                    </div>
                </div>
            </div>
        </article>
    );
}

const BreakfastFavorites: React.FC<Props> = ({ items }) => {
    if (!items?.length) return null;

    return (
        <section
            aria-labelledby="favorites-title"
            className="scroll-mt-20 relative w-full bg-[#FFF] p-5 px-5 text-[#601f1f] overflow-hidden"
        >
            <div className={"w-full h-full px-4 sm:px-6 lg:px-8 faded-fixed-table-bg pb-15"}>
                <h3 id="favorites-title" className="text-4xl font-bold text-[#601f1f] opacity-99 pt-15 text-center ">
                    Our Morning Favorites
                </h3>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8 flex items-end justify-between">
                    {/* Count */}
                    <span className="text-sm text-[#601f1f]">
            {items.length} item{items.length > 1 ? "s" : ""}
          </span>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {items.map((item, idx) => (
                        <FavoriteCard key={`${item.title}-${idx}`} item={item} />
                    ))}
                </div>
            </div>
            </div>
        </section>
    );
};

export default BreakfastFavorites;
