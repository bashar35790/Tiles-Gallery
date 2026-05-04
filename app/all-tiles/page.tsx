
import FeatureCard from "../utility/featureCard/FeatureCard";
import FilterSection from "./FilterSection";

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

const featureData = async (): Promise<Tile[]> => {
    try {
        const res = await fetch("https://tiles-gallery-db-server.onrender.com/tiles", {
            next: { revalidate: 3600 } // Cache for 1 hour
        });
        if (!res.ok) {
            throw new Error(`Failed to fetch: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching feature tiles:", error);
        return [];
    }
};

const AllTiles = async ({
    searchParams,
}: {
    searchParams: Promise<{ search?: string; category?: string }>;
}) => {
    const { search, category } = await searchParams;
    const featureTiles = await featureData();

    // Filtering logic
    const filteredTiles = featureTiles.filter((tile) => {
        const matchesSearch = search
            ? tile.title.toLowerCase().includes(search.toLowerCase()) ||
            tile.description.toLowerCase().includes(search.toLowerCase()) ||
            tile.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
            : true;

        const matchesCategory = category && category !== "all"
            ? tile.category.toLowerCase() === category.toLowerCase()
            : true;

        return matchesSearch && matchesCategory;
    });

    // Display a curated selection or all if filtered?
    // Usually, if searching/filtering, we want to see all results.
    const displayTiles = filteredTiles;

    return (
        <section className="py-24 bg-slate-50/50">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
                <FilterSection />

                {displayTiles.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
                        {displayTiles.map((card: Tile) => (
                            <FeatureCard key={card.id} card={card} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100">
                        <p className="text-xl text-brand-primari font-medium">No tiles found matching your criteria.</p>
                        <p className="text-slate-400 mt-2">Try adjusting your search or filters.</p>
                    </div>
                )}

                {/* Only show "View All" if not already viewing all and not filtered */}
                {!search && !category && featureTiles.length > 6 && displayTiles.length <= 6 && (
                    <div className="mt-16 text-center">
                        <button className="px-8 py-4 bg-white border-2 border-brand-primari text-brand-primari hover:bg-brand-primari hover:text-white rounded-xl font-bold transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-1">
                            View All Collection
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default AllTiles;
