import { MarqueeComponent } from "@/utility/marque/Marque";
import Image from "next/image";
import Link from "next/link";

const HeroBanner = () => {
    return (
        <div className="relative max-h-dvh">

            {/* Background Image */}
            <Image
                src="https://i.ibb.co/qFgk792p/3d-rendering-modern-black-bathroom-with-luxury-tile-decor.jpg"
                alt="Hero banner image"
                fill
                priority
                className="object-cover"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-tr from-[#020617]/95 via-brand-secoundry/85 to-brand-primari/40"></div>

            {/* Content */}
            <div className="relative flex items-center justify-center min-h-screen text-center text-white">
                <div className="max-w-3xl mx-auto">
                    <h1 className="mb-5 text-5xl lg:text-7xl font-bold">Discover Your Perfect <span className="text-brand-primari italic">Aesthetic</span></h1>
                    <p className="mb-5 max-w-2xl mx-auto">
                        Explore our curated collection of architectural surfaces, where craftsmanship meets contemporary design for the discerning professional.
                    </p>
                    <div className=" space-x-4">
                        <Link href={"/all-tiles"}>
                            <button className="btn bg-brand-primari uppercase text-white">Explore All Tiles </button>
                        </Link>
                        <button className="btn btn-outline">Create Account </button>
                    </div>
                </div>
            </div>
            <MarqueeComponent></MarqueeComponent>

        </div>
    );
};

export default HeroBanner;
