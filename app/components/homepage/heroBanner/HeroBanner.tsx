import Image from "next/image";

const HeroBanner = () => {
    return (
        <div className="relative min-h-screen">

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
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                    <p className="mb-5">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                    <button className="btn bg-brand-primari">Get Started</button>
                </div>
            </div>

        </div>
    );
};

export default HeroBanner;
