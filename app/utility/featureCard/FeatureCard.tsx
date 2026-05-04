import Image from 'next/image';
import Link from 'next/link';

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

type FeatureCardProps = {
    card: Tile;
};

const FeatureCard = ({ card }: FeatureCardProps) => {
    // Use an external image proxy (weserv.nl) to resize massive 20MB+ images on the fly.
    const proxyImageUrl = `https://wsrv.nl/?url=${encodeURIComponent(card.image)}&w=800&q=80&output=webp`;

    return (
        <div className="group flex flex-col bg-white rounded-3xl border border-slate-100/80 overflow-hidden w-full shadow-sm shadow-brand-primari/50">
            {/* Image Container */}
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-100">
                <Image
                    src={proxyImageUrl}
                    alt={card.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Badges Overlay */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                    <span className="px-3 py-1 bg-white/95 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-brand-secoundry rounded-full shadow-sm">
                        {card.category}
                    </span>
                    {!card.inStock && (
                        <span className="px-3 py-1 bg-red-500/95 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-white rounded-full shadow-sm w-fit">
                            Out of Stock
                        </span>
                    )}
                </div>

                {/* Price Tag Overlay */}
                <div className="absolute bottom-4 right-4 bg-brand-primari/95 backdrop-blur-md text-white px-4 py-2 rounded-2xl shadow-lg font-bold flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                    <span className="text-sm mr-1">{card.currency}</span>
                    <span className="text-xl">{card.price}</span>
                </div>
            </div>

            {/* Content Container */}
            <div className="p-6 md:p-8 flex flex-col flex-grow relative">

                <h2 className="text-2xl font-bold text-brand-primari line-clamp-1 mb-3">
                    {card.title}
                </h2>

                <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-6 line-clamp-2 flex-grow">
                    {card.description}
                </p>

                {/* Tags / Properties */}
                <div className="flex items-center gap-3 mb-8 flex-wrap">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-primari"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path><path d="m3.3 7 8.7 5 8.7-5"></path><path d="M12 22V12"></path></svg>
                        <span className="text-xs font-semibold text-slate-600">
                            {card.dimensions}
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-primari"><path d="M2 16h20"></path><path d="M5 20h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z"></path></svg>
                        <span className="text-xs font-semibold text-slate-600">
                            {card.material}
                        </span>
                    </div>
                </div>

                {/* Footer/Action */}
                <div className="mt-auto">
                    <Link href={`/all-tiles/${card.id}`}>
                        <button
                            className="w-full py-3.5 px-4 bg-brand-primari text-white rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-md group/btn cursor-pointer"

                        >
                            Details
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover/btn:translate-x-1 transition-transform duration-300"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FeatureCard;