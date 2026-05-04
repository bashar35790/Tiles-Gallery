"use client";

import { MarqueeComponent } from "@/utility/marque/Marque";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';

const images = [
    "https://i.ibb.co/qFgk792p/3d-rendering-modern-black-bathroom-with-luxury-tile-decor.jpg",
    "https://images.unsplash.com/photo-1600585154340-be6199f73315?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"
];

const HeroBanner = () => {
    return (
        <div className="relative h-screen overflow-hidden bg-brand-secoundry">
            {/* Background Slider */}
            <Swiper
                modules={[Autoplay, EffectFade]}
                effect={'fade'}
                speed={2000} // Slower, smoother transition
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                loop={true}
                className="h-full w-full"
            >
                {images.map((img, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative h-full w-full">
                            <Image
                                src={img}
                                alt={`Background ${index + 1}`}
                                fill
                                priority={index === 0}
                                className="object-cover transform scale-110 animate-ken-burns"
                            />
                            {/* Gradient Overlay (inside slide to fade with image) */}
                            <div className="absolute inset-0 bg-linear-to-tr from-[#020617]/90 via-brand-secoundry/80 to-brand-primari/30 z-10"></div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Static Content - Placed over the slider */}
            <div className="absolute inset-0 z-20 flex items-center justify-center text-center text-white px-4">
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1]">
                            Discover Your Perfect <br />
                            <span className="text-brand-primari italic drop-shadow-sm">Aesthetic</span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/80 font-medium leading-relaxed">
                            Explore our curated collection of architectural surfaces, where craftsmanship meets contemporary design for the discerning professional.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-5 pt-4">
                        <Link href={"/all-tiles"}>
                            <button className="group relative px-10 py-5 bg-brand-primari text-white rounded-2xl font-bold uppercase tracking-widest overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(2,140,141,0.4)] active:scale-95">
                                <span className="relative z-10">Explore All Tiles</span>
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            </button>
                        </Link>
                        <Link href={"/auth/resister"}>
                            <button className="px-10 py-5 border-2 border-white/30 text-white rounded-2xl font-bold uppercase tracking-widest hover:bg-white hover:text-brand-secoundry hover:border-white transition-all active:scale-95">
                                Create Account
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Marquee remains pinned at the bottom */}
            <div className="absolute bottom-0 left-0 w-full z-30">
                <MarqueeComponent />
            </div>

            <style jsx global>{`
                @keyframes kenburns {
                    0% { transform: scale(1); }
                    100% { transform: scale(1.15); }
                }
                .animate-ken-burns {
                    animation: kenburns 10s ease-out infinite alternate;
                }
            `}</style>
        </div>
    );
};

export default HeroBanner;


