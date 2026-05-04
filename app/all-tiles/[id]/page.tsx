import Image from "next/image";
import Link from "next/link";

type PageProps = {
    params: Promise<{
        id: string;
    }>;
};

async function fetchSingleData(id: string) {
    try {
        const res = await fetch(`https://tiles-gallery-db-server.onrender.com/tiles/${id}`, {
            next: { revalidate: 60 }
        });
        if (!res.ok) {
            throw new Error(`Failed to fetch: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching feature tile:", error);
        return null;
    }
}

export default async function DetailsPage({ params }: PageProps) {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const tile = await fetchSingleData(String(id));

    if (!tile) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center space-y-4">
                    <h2 className="text-2xl font-bold text-brand-secoundry">Tile Not Found</h2>
                    <p className="text-gray-500">We couldn&apos;t find the tile you&apos;re looking for.</p>
                    <Link href="/all-tiles" className="inline-block px-6 py-2 bg-brand-primari text-white rounded-full hover:bg-opacity-90 transition-all">
                        Back to Gallery
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <section className="bg-white min-h-screen pt-24 pb-16 lg:pt-32 lg:pb-24">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">

                {/* Back Navigation */}
                <div className="mb-8">
                    <Link
                        href="/all-tiles"
                        className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-brand-primari transition-colors group"
                    >
                        <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to All Tiles
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                    {/* Left Column: Image Section */}
                    <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square group overflow-hidden rounded-2xl shadow-2xl shadow-brand-secoundry/10 bg-gray-100">
                        {tile.image ? (
                            <Image
                                src={`https://wsrv.nl/?url=${encodeURIComponent(tile.image)}&w=800&q=80&output=webp`}
                                alt={tile.title || "Tile image"}
                                fill
                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                No Image Available
                            </div>
                        )}
                        {/* Luxury Gradient Overlay on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-secoundry/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </div>

                    {/* Right Column: Product Info */}
                    <div className="flex flex-col space-y-8">

                        {/* Header: Badges & Title */}
                        <div className="space-y-4">
                            <div className="flex flex-wrap items-center gap-3">
                                {tile.category && (
                                    <span className="px-4 py-1.5 bg-brand-primari/10 text-brand-primari text-xs font-semibold uppercase tracking-wider rounded-full">
                                        {tile.category}
                                    </span>
                                )}
                                {tile.inStock && (
                                    <span className="flex items-center text-xs font-medium text-green-600 bg-green-50 px-3 py-1.5 rounded-full">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 animate-pulse" />
                                        In Stock
                                    </span>
                                )}
                            </div>

                            <h1 className="text-4xl lg:text-5xl font-extrabold text-brand-secoundry tracking-tight leading-tight">
                                {tile.title}
                            </h1>

                            {tile.price && (
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-brand-primari">
                                        {tile.currency === 'USD' ? '$' : ''}{tile.price}
                                    </span>
                                    <span className="text-gray-500 text-sm font-medium">/ sq ft</span>
                                </div>
                            )}
                        </div>

                        <hr className="border-gray-100" />

                        {/* Description */}
                        <div>
                            <h3 className="text-lg font-semibold text-brand-secoundry mb-3">Overview</h3>
                            <p className="text-gray-600 leading-relaxed text-lg font-light">
                                {tile.description}
                            </p>
                        </div>

                        {/* Specifications Grid */}
                        {(tile.dimensions || tile.material) && (
                            <div className="grid grid-cols-2 gap-6 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                {tile.dimensions && (
                                    <div>
                                        <span className="block text-sm text-gray-500 mb-1">Dimensions</span>
                                        <span className="block font-medium text-brand-secoundry">{tile.dimensions}</span>
                                    </div>
                                )}
                                {tile.material && (
                                    <div>
                                        <span className="block text-sm text-gray-500 mb-1">Material</span>
                                        <span className="block font-medium text-brand-secoundry">{tile.material}</span>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Tags */}
                        {tile.tags && tile.tags.length > 0 && (
                            <div className="space-y-3">
                                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Style Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {tile.tags.map((tag: string, index: number) => (
                                        <span
                                            key={index}
                                            className="px-4 py-2 bg-white border border-gray-200 text-gray-600 text-sm rounded-full shadow-sm hover:border-brand-primari hover:text-brand-primari transition-colors cursor-default"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}


                    </div>
                </div>
            </div>
        </section>
    );
}