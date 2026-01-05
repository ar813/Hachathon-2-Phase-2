"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // Use better-auth session hook
    const { data: session, isPending } = useSession();
    const isLoggedIn = !!session?.user;
    const userName = session?.user?.name || "";

    const handleLogout = async () => {
        try {
            await signOut();
            window.location.href = '/login';
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    const getInitials = (name: string) => {
        return name
            ? name
                .split(' ')
                .map((word) => word[0])
                .join('')
                .toUpperCase()
                .slice(0, 2)
            : 'U';
    };

    // Show loading state
    if (isPending) {
        return (
            <nav className="fixed top-0 w-full z-50 glass border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
                            Todo
                        </div>
                        <div className="text-gray-400 text-sm">Loading...</div>
                    </div>
                </div>
            </nav>
        );
    }

    return (
        <nav className="fixed top-0 w-full z-50 glass border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500 hover:opacity-80 transition">
                            Todo
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <Link
                                href="/"
                                className={`text-sm font-medium transition-all duration-300 hover:text-white relative group ${pathname === "/" ? "text-white" : "text-gray-400"
                                    }`}
                            >
                                Home
                                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-500 rounded-full transition-all duration-300 ${pathname === "/" ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}></span>
                            </Link>

                            {!isLoggedIn ? (
                                <>
                                    <Link
                                        href="/login"
                                        className={`text-sm font-medium transition-all duration-300 hover:text-white relative group ${pathname === "/login" ? "text-white" : "text-gray-400"
                                            }`}
                                    >
                                        Login
                                        <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-500 rounded-full transition-all duration-300 ${pathname === "/login" ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}></span>
                                    </Link>
                                    <Link
                                        href="/signup"
                                        className={`px-4 py-2 rounded-full text-sm font-bold bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md border border-white/5 hover:border-white/20`}
                                    >
                                        Signup
                                    </Link>
                                </>
                            ) : (
                                <div className="flex items-center space-x-6">
                                    <div className="flex items-center space-x-3 bg-white/5 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
                                        {session?.user?.image ? (
                                            <Image
                                                src={session.user.image}
                                                alt={userName || 'User'}
                                                width={24}
                                                height={24}
                                                className="rounded-full ring-2 ring-white/10 object-cover"
                                                unoptimized
                                            />
                                        ) : (
                                            <div className="h-6 w-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-xs text-white font-bold ring-2 ring-white/10">
                                                {getInitials(userName)}
                                            </div>
                                        )}
                                        <div className="flex flex-col">
                                            <span className="text-xs font-medium text-gray-300">{userName || 'User Profile'}</span>
                                            {session?.user?.email && (
                                                <span className="text-[10px] text-gray-500">{session.user.email}</span>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="text-sm font-medium text-gray-400 hover:text-red-400 transition-colors duration-300"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700/50 focus:outline-none transition"
                            aria-controls="mobile-menu"
                            aria-expanded={isOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden glass border-b border-white/10" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link
                            href="/"
                            onClick={() => setIsOpen(false)}
                            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/10"
                        >
                            Home
                        </Link>
                        {!isLoggedIn ? (
                            <>
                                <Link
                                    href="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/10"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/signup"
                                    onClick={() => setIsOpen(false)}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/10"
                                >
                                    Signup
                                </Link>
                            </>
                        ) : (
                            <>
                                <div className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-white/10">
                                    {session?.user?.image ? (
                                        <Image
                                            src={session.user.image}
                                            alt={userName || 'User'}
                                            width={24}
                                            height={24}
                                            className="rounded-full ring-2 ring-white/20 object-cover"
                                            unoptimized
                                        />
                                    ) : (
                                        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold ring-2 ring-white/20">
                                            {getInitials(userName)}
                                        </div>
                                    )}
                                    <div className="flex flex-col">
                                        <span className="text-base font-medium text-white">{userName || 'User Profile'}</span>
                                        {session?.user?.email && (
                                            <span className="text-xs text-gray-400">{session.user.email}</span>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        handleLogout();
                                    }}
                                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-400 hover:text-white hover:bg-red-500/10"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
