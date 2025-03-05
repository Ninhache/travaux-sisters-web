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
  needConnected: boolean;
};

type NavbarConfig = {
  links: NavItem[];
};

const defaultNavConfig: NavbarConfig = {
  links: [
    { path: "/forum", label: "Forum", needConnected: false },
    { path: "/devis", label: "Devis", needConnected: true },
  ],
};

const ConnectedRightPart = () => {
  const { logout, isConnected } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-base-200 hover:bg-base-300 flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 transition-colors"
        >
          <div className="h-8 w-8 overflow-hidden rounded-full">
            <img
              alt="User Avatar"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              className="h-full w-full object-cover"
            />
          </div>
          <span className="hidden font-medium md:inline">Mon compte</span>
          <ChevronDown size={16} />
        </button>

        {isOpen && (
          <div className="bg-base-100 absolute right-0 z-50 mt-2 w-56 rounded-lg py-2 shadow-lg">
            <div className="border-base-200 border-b px-4 py-2">
              <p className="text-sm font-medium">Mon profil</p>
              <p className="text-base-content/70 truncate text-xs">
                user@example.com
              </p>
            </div>
            <ul>
              <li>
                <Link
                  href="/profile"
                  className="hover:bg-base-200 flex items-center gap-2 px-4 py-2 transition-colors"
                >
                  <User size={16} />
                  <span>Profile</span>
                  <span className="badge badge-sm badge-primary ml-auto">
                    New
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/settings"
                  className="hover:bg-base-200 flex items-center gap-2 px-4 py-2 transition-colors"
                >
                  <Settings size={16} />
                  <span>Settings</span>
                </Link>
              </li>
              <li className="border-base-200 mt-1 border-t">
                <button
                  onClick={logout}
                  className="text-error hover:bg-base-200 flex w-full items-center gap-2 px-4 py-2 transition-colors"
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
    <header className="bg-base-100 sticky top-0 z-30 w-full shadow-sm">
      <div className="container mx-auto px-4">
        <div className="navbar h-16 px-0">
          <div className="flex flex-1 items-center">
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
            <div className="border-base-300 mx-4 hidden h-6 border-r md:block"></div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex">
              <ul className="flex space-x-1">
                {navConfig.links.map((link) => (
                  <li key={link.path}>
                    {(link.needConnected && isConnected) ||
                    !link.needConnected ? (
                      <Link
                        href={link.path}
                        className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                          pathname === link.path
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-base-200"
                        }`}
                      >
                        {link.label}
                        {link.badge && (
                          <span className="badge badge-sm badge-primary ml-2">
                            {link.badge}
                          </span>
                        )}
                      </Link>
                    ) : (
                      <div
                        className="tooltip tooltip-bottom"
                        data-tip="You need to be connected to access this link"
                      >
                        <span className="text-primary/25 cursor-not-allowed rounded-md px-3 py-2 text-sm font-medium">
                          {link.label}
                        </span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="mr-2 md:hidden">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="hover:bg-base-200 rounded-md p-2"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Auth section */}
          <div className="flex items-center">
            {loading ? (
              <div className="flex h-8 w-8 items-center justify-center">
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
        <div className="bg-base-100 border-base-200 border-t shadow-lg md:hidden">
          <div className="container mx-auto px-4 py-3">
            <ul className="space-y-2">
              {navConfig.links.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className={`block rounded-md px-3 py-2 ${
                      pathname === link.path
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-base-200"
                    }`}
                  >
                    {link.label}
                    {link.badge && (
                      <span className="badge badge-sm badge-primary ml-2">
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
