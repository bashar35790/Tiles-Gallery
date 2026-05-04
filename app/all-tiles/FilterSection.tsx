"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const FilterSection = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentCategory = searchParams.get("category") || "all";
    const currentSearch = searchParams.get("search") || "";

    const [searchInput, setSearchInput] = useState(currentSearch);

    // Sync input with URL search param
    useEffect(() => {
        setSearchInput(currentSearch);
    }, [currentSearch]);

    const updateQueryParams = (updates: Record<string, string | null>) => {
        const params = new URLSearchParams(searchParams.toString());
        
        Object.entries(updates).forEach(([key, value]) => {
            if (value === null || value === "all") {
                params.delete(key);
            } else {
                params.set(key, value);
            }
        });

        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchInput(value);
        // We can debounce this, but for now let's just update on Enter or Blur
        // Or simple update for responsiveness
    };

    const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            updateQueryParams({ search: searchInput });
        }
    };

    const handleCategoryClick = (category: string) => {
        updateQueryParams({ category });
    };

    const categories = [
        { label: "ALL SURFACES", value: "all" },
        { label: "MARBLE", value: "marble" },
        { label: "CERAMIC", value: "ceramic" },
        { label: "TERRAZZO", value: "terrazzo" },
        { label: "CONCRETE", value: "concrete" },
    ];

    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <div className="text-left flex flex-col gap-4 w-full md:w-auto">
                <div className="flex flex-col gap-2">
                    <span className="text-brand-primari w-fit font-bold tracking-widest uppercase text-sm bg-brand-primari/10 px-4 py-1.5 rounded-full">
                        Curated Collection
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-secoundry">
                        Featured <span className="text-brand-primari italic">Tiles</span>
                    </h2>
                    <p className="text-slate-500 max-w-sm text-lg mt-2">
                        Discover our most popular and stunning tile designs, carefully selected to elevate your next interior design project.
                    </p>
                </div>

                {/* filter buttons */}
                <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                        <button
                            key={cat.value}
                            onClick={() => handleCategoryClick(cat.value)}
                            className={`btn px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                currentCategory === cat.value
                                    ? "bg-brand-secoundry text-white shadow-lg"
                                    : "bg-brand-primari/10 text-brand-primari hover:bg-brand-primari/20"
                            }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>
            <div className="w-full md:w-auto">
                <div className="relative group">
                    <input
                        type="text"
                        placeholder="Search tiles..."
                        value={searchInput}
                        onChange={handleSearchChange}
                        onKeyDown={handleSearchKeyDown}
                        className="input input-bordered w-full md:min-w-[300px] bg-white border-slate-200 focus:border-brand-primari focus:ring-2 focus:ring-brand-primari/20 transition-all rounded-xl pl-4 pr-10"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterSection;
