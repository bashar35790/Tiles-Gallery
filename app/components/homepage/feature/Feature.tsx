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

export default async function Feature() {
    const featureTiles = await featureData();

    // Display a curated selection of up to 6 tiles on the homepage
    const displayTiles = featureTiles.slice(0, 6);

    return (
        <section className="py-24 bg-slate-50/50">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
                <div className="flex flex-col items-center text-center mb-16 space-y-4">
                    <span className="text-brand-primari font-bold tracking-widest uppercase text-sm bg-brand-primari/10 px-4 py-1.5 rounded-full">
                        Curated Collection
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-secoundry">
                        Featured <span className="text-brand-primari italic">Tiles</span>
                    </h2>
                    <p className="text-slate-500 max-w-2xl text-lg mt-4">
                        Discover our most popular and stunning tile designs, carefully selected to elevate your next interior design project.
                    </p>
                </div>

                {displayTiles.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
                        {displayTiles.map((card: Tile) => (
                            <FeatureCard key={card.id} card={card} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100">
                        <p className="text-xl text-slate-500 font-medium">No featured tiles currently available.</p>
                        <p className="text-slate-400 mt-2">Please check back later.</p>
                    </div>
                )}

                {featureTiles.length > 6 && (
                    <div className="mt-16 text-center">
                        <button className="px-8 py-4 bg-white border-2 border-brand-primari text-brand-primari hover:bg-brand-primari hover:text-white rounded-xl font-bold transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-1">
                            View All Collection
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
