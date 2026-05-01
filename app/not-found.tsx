import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-white to-gray-50 px-6">
            <div className="text-center max-w-md">

                {/* Big 404 */}
                <h1 className="text-8xl font-bold text-[#028C8D] tracking-tight">
                    404
                </h1>

                {/* Title */}
                <h2 className="mt-4 text-2xl font-semibold text-gray-800">
                    Page Not Found
                </h2>

                {/* Description */}
                <p className="mt-3 text-gray-500 leading-relaxed">
                    The page you are looking for doesn&apos;t exist or has been moved.
                    Let&apos;s get you back to our beautiful tile collections.
                </p>

                {/* Decorative Tile Grid */}
                <div className="mt-8 grid grid-cols-3 gap-2 opacity-60">
                    {Array.from({ length: 9 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-10 rounded-md bg-[#028C8D]/10 border border-[#028C8D]/20"
                        />
                    ))}
                </div>

                {/* Button */}
                <div className="mt-10 flex justify-center">
                    <Link
                        href="/"
                        className="px-6 py-3 rounded-lg bg-[#028C8D] text-white font-medium hover:bg-[#027577] transition-all shadow-md"
                    >
                        Back to Home
                    </Link>
                </div>

                {/* Secondary hint */}
                <p className="mt-6 text-sm text-gray-400">
                    Tiles Gallery • Premium Ceramic & Luxury Tiles
                </p>
            </div>
        </div>
    );
}