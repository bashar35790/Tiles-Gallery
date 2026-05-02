import Marquee from "react-fast-marquee";
const ITEMS = [
    "New Arrivals",
    "Weekly Feature: Modern Geometric Patterns",
    "Join the Community",
];

export const MarqueeComponent = () => {
    const row = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];
    return (
        <>
            <Marquee>
                <div className="overflow-hidden border-y border-border bg-brand-primari text-white py-4">
                    <div className="flex whitespace-nowrap">
                        {[...row, ...row].map((t, i) => (
                            <span key={i} className="mx-8 inline-flex items-center gap-2 font-display text-lg">
                                <span className="text-white">◆</span>
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </Marquee>
        </>
    );
};
