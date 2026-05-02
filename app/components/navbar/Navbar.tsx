import Image from "next/image";
import Link from "next/link";
import Logo from "@/app/assets/logo.png";


const links = <>
    <Link href={"/"} className=" uppercase hover:text-brand-primari">Home</Link>
    <Link href={"/all-tiles"} className=" uppercase hover:text-brand-primari">All Tiles</Link>
    <Link href={"/my-profile"} className=" uppercase hover:text-brand-primari">My Profile</Link>

</>
const Navbar = () => {
    return (
        <nav className="bg-white shadow-sm text-brand-secoundry">
            <div className="navbar container mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <Link href={"/"}>

                        <Image
                            src={Logo}
                            alt="Logo"
                            width={120}
                            height={50}
                            loading="eager"
                            className="h-auto w-auto"
                        />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-5">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end gap-5">
                    <Link href={"/auth/signIn"}>
                        <button className="btn btn-outline text-brand-primari rounded-sm hover:bg-brand-primari hover:border-none hover:text-white">Login</button>
                    </Link>
                    <Link href={"/auth/resister"}>
                        <button className="btn border bg-brand-primari text-white rounded-sm hover: btn-outline hover:bg-transparent hover: outline-accent hover:text-brand-primari">Sign Up</button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;