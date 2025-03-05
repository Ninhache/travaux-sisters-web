"use client";

import { useSession } from "@/context/session-context";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X, User, LogOut, Settings, ChevronDown } from "lucide-react";

type NavItem = {
  path: string;
  label: string;
  badge?: string;
};

type NavbarConfig = {
  links: NavItem[];
};

const defaultNavConfig: NavbarConfig = {
  links: [
    { path: "/forum", label: "Forum" },
    { path: "/devis", label: "Devis" },
  ],
};

const ConnectedRightPart = () => {
  const { logout } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex gap-2 items-center">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-base-200 hover:bg-base-300 transition-colors px-3 py-2 rounded-lg"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img
              alt="User Avatar"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="hidden md:inline font-medium">Mon compte</span>
          <ChevronDown size={16} />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-base-100 rounded-lg shadow-lg py-2 z-50">
            <div className="px-4 py-2 border-b border-base-200">
              <p className="text-sm font-medium">Mon profil</p>
              <p className="text-xs text-base-content/70 truncate">
                user@example.com
              </p>
            </div>
            <ul>
              <li>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-base-200 transition-colors"
                >
                  <User size={16} />
                  <span>Profile</span>
                  <span className="ml-auto badge badge-sm badge-primary">
                    New
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/settings"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-base-200 transition-colors"
                >
                  <Settings size={16} />
                  <span>Settings</span>
                </Link>
              </li>
              <li className="border-t border-base-200 mt-1">
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-error hover:bg-base-200 transition-colors"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

interface HeaderProps {
  navConfig?: NavbarConfig;
}

export default function Header({ navConfig = defaultNavConfig }: HeaderProps) {
  const { isConnected, loading } = useSession();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setMobileMenuOpen(false);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Close mobile menu on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, []); // Removed unnecessary pathname dependency

  return (
    <header className="sticky top-0 z-30 w-full bg-base-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="navbar h-16 px-0">
          <div className="flex-1 flex items-center">
            <Link href={"/"} className="flex items-center">
              <Image
                src={"/travaux-sisters-logo.png"}
                width={180}
                height={40}
                alt="Travaux Sisters"
                className="h-10 w-auto"
              />
            </Link>

            {/* Divider */}
            <div className="hidden md:block mx-4 h-6 border-r border-base-300"></div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex">
              <ul className="flex space-x-1">
                {navConfig.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      href={link.path}
                      className={`px-3 py-2 rounded-md font-medium text-sm transition-colors ${
                        pathname === link.path
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-base-200"
                      }`}
                    >
                      {link.label}
                      {link.badge && (
                        <span className="ml-2 badge badge-sm badge-primary">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden mr-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-2 rounded-md hover:bg-base-200"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Auth section */}
          <div className="flex items-center">
            {loading ? (
              <div className="flex items-center justify-center w-8 h-8">
                <span className="loading loading-spinner loading-sm"></span>
              </div>
            ) : isConnected ? (
              <ConnectedRightPart />
            ) : (
              <Link
                href="/sign-in"
                className="btn btn-primary btn-sm md:btn-md"
              >
                Se connecter
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-base-100 border-t border-base-200 shadow-lg">
          <div className="container mx-auto px-4 py-3">
            <ul className="space-y-2">
              {navConfig.links.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className={`block px-3 py-2 rounded-md ${
                      pathname === link.path
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-base-200"
                    }`}
                  >
                    {link.label}
                    {link.badge && (
                      <span className="ml-2 badge badge-sm badge-primary">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}

// "use client";

// import { useSession } from "@/context/session-context";
// import Link from "next/link";
// import { useEffect } from "react";
// import { usePathname } from "next/navigation";
// import Image from "next/image";

// type NavItem = {
//   path: string;
//   label: string;
//   badge?: string;
// };

// type NavbarConfig = {
//   links: NavItem[];
// };

// const defaultNavConfig: NavbarConfig = {
//   links: [
//     { path: "/forum", label: "Forum" },
//     { path: "/devis", label: "Devis" },
//   ],
// };

// const ConnectedRightPart = () => {
//   const { logout } = useSession();

//   return (
//     <div className="flex gap-2">
//       <div className="dropdown dropdown-end">
//         <div
//           tabIndex={0}
//           role="button"
//           className="btn btn-ghost btn-circle avatar"
//         >
//           <div className="w-10 rounded-full">
//             <img
//               alt="User Avatar"
//               src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
//             />
//           </div>
//         </div>
//         <ul
//           tabIndex={0}
//           className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
//         >
//           <li>
//             <a className="justify-between">
//               Profile
//               <span className="badge">New</span>
//             </a>
//           </li>
//           <li>
//             <a>Settings</a>
//           </li>
//           <li>
//             <button className="btn" onClick={logout}>
//               Logout
//             </button>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// interface HeaderProps {
//   navConfig?: NavbarConfig;
// }

// export default function Header({ navConfig = defaultNavConfig }: HeaderProps) {
//   const { isConnected, loading } = useSession();
//   const pathname = usePathname();

//   useEffect(() => {}, []);

//   return (
//     <header className="navbar bg-base-100 shadow-sm">
//       <div className="flex-1 flex items-center">
//         <Link href={"/"} className="btn btn-ghost text-xl">
//           <Image
//             src={"/travaux-sisters-logo.png"}
//             width={240}
//             height={50}
//             alt="Travaux Sisters"
//           />
//         </Link>

//         {/* Divider */}
//         <div className="hidden md:block mx-4 h-6 border-r border-base-300"></div>

//         {/* Navigation Links */}
//         <div className="hidden md:flex">
//           <ul className="menu menu-horizontal px-1">
//             {navConfig.links.map((link) => (
//               <li key={link.path}>
//                 <Link
//                   href={link.path}
//                   className={pathname === link.path ? "active" : ""}
//                 >
//                   {link.label}
//                   {link.badge && (
//                     <span className="badge badge-sm">{link.badge}</span>
//                   )}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {loading ? (
//         <span className="loading loading-spinner loading-sm"></span>
//       ) : isConnected ? (
//         <ConnectedRightPart />
//       ) : (
//         <Link href="/sign-in" className="link">
//           Se connecter
//         </Link>
//       )}
//     </header>
//   );
// }
