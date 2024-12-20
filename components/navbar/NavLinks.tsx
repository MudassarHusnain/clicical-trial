'use client';
import { useState, useEffect, useRef } from 'react';
import { IoMdClose, IoMdMenu } from 'react-icons/io';
import Link from 'next/link';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu';
import { useUser, useAuth } from '@clerk/nextjs';  // Clerk authentication hook
import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
} from '@clerk/nextjs'

function NavLinks() {
    const { userId } = useAuth(); // Clerk auth
    const { isSignedIn } = useUser();  // Check if the user is signed in via Clerk
    const [isOpen, setIsOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false); // Track if Clerk auth has loaded
    const dropdownRef = useRef<HTMLDivElement>(null);  // For closing the dropdown when clicking outside

    useEffect(() => {
        if (isSignedIn !== undefined && userId !== undefined) {
            setIsLoaded(true); // Authentication state has finished loading
        }
    }, [isSignedIn, userId]); // Trigger when isSignedIn or userId changes

    const toggleMenu = () => setIsOpen(!isOpen);

    // Ensure the userId and the environment variable are available
    const isAdmin = userId === process.env.NEXT_PUBLIC_ADMIN_USER;

    // Don't render the menu until Clerk authentication state is available
    if (!isLoaded) {
        return <div>Loading...</div>; // Optional: Show loading state while waiting for Clerk
    }

    return (
        <NavigationMenu>
            {/* Mobile Menu */}
            <div className="md:hidden bg-white p-4">
                <div className="relative inline-block text-left" ref={dropdownRef}>
                    <button
                        type="button"
                        className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        onClick={toggleMenu}
                    >
                        {isOpen ? <IoMdClose size={28} /> : <IoMdMenu size={28} />}
                    </button>
                    {isOpen && (
                        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <ul className="py-1">
                                <li>
                                    <Link href="/study" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Studies</Link>
                                </li>
                                <li>
                                    <Link href="/study/newStudy" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">New Study</Link>
                                </li>
                                {isSignedIn && isAdmin && (
                                    <li>
                                        <Link href="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Admin</Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link href="/study" legacyBehavior passHref>
                            <NavigationMenuLink className="font-bold text-xl m-5">Studies</NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/study/newStudy" legacyBehavior passHref>
                            <NavigationMenuLink className="font-bold text-xl m-5">New Study</NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    {isSignedIn && isAdmin && (
                        <NavigationMenuItem>
                            <Link href="/admin" legacyBehavior passHref>
                                <NavigationMenuLink className="font-bold text-xl m-5">Admin</NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    )}

                    <SignedOut>
                        <SignInButton />
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </NavigationMenuList>
            </div>
        </NavigationMenu>
    );
}

export default NavLinks;
