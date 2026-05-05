import FeatureList from "./FeatureList";

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

                <FeatureList tiles={featureTiles} />
            </div>
        </section>
    );
}
