"use client";

import { useState } from "react";
import FeatureCard from "@/utility/featureCard/FeatureCard";

type Tile = {
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
    price: number;
    currency: string;
    dimensions: string;
    material: string;
    inStock: boolean;
    tags: string[];
};

type FeatureListProps = {
    tiles: Tile[];
};

export default function FeatureList({ tiles }: FeatureListProps) {
    const [showAll, setShowAll] = useState(false);

    const displayTiles = showAll ? tiles : tiles.slice(0, 4);

    if (tiles.length === 0) {
        return (
            <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100">
                <p className="text-xl text-slate-500 font-medium">No featured tiles currently available.</p>
                <p className="text-slate-400 mt-2">Please check back later.</p>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 xl:gap-10">
                {displayTiles.map((card: Tile) => (
                    <FeatureCard key={card.id} card={card} />
                ))}
            </div>

            {!showAll && tiles.length > 4 && (
                <div className="mt-16 text-center">
                    <button
                        onClick={() => setShowAll(true)}
                        className="px-8 py-4 bg-white border-2 border-brand-primari text-brand-primari hover:bg-brand-primari hover:text-white rounded-xl font-bold transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
                    >
                        View More
                    </button>
                </div>
            )}
        </>
    );
}
