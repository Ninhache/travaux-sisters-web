"use client";

import { useSession } from "@/context/session-context";
import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Define the navigation configuration type
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
    { path: "/", label: "Forum" },
    { path: "/devis", label: "Devis" },
  ],
};

const ConnectedRightPart = () => {
  const { logout } = useSession();

  return (
    <div className="flex gap-2">
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            <img
              alt="User Avatar"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
          <li>
            <a className="justify-between">
              Profile
              <span className="badge">New</span>
            </a>
          </li>
          <li>
            <a>Settings</a>
          </li>
          <li>
            <button className="btn" onClick={logout}>
              Logout
            </button>
          </li>
        </ul>
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

  useEffect(() => {}, []);

  return (
    <header className="navbar bg-base-100 shadow-sm">
      <div className="flex-1 flex items-center">
        <Link href={"/"} className="btn btn-ghost text-xl">
          Travaux Sisters
        </Link>

        {/* Divider */}
        <div className="hidden md:block mx-4 h-6 border-r border-base-300"></div>

        {/* Navigation Links */}
        <div className="hidden md:flex">
          <ul className="menu menu-horizontal px-1">
            {navConfig.links.map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className={pathname === link.path ? "active" : ""}
                >
                  {link.label}
                  {link.badge && (
                    <span className="badge badge-sm">{link.badge}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {loading ? (
        <span className="loading loading-spinner loading-sm"></span>
      ) : isConnected ? (
        <ConnectedRightPart />
      ) : (
        <Link href="/sign-in" className="link">
          Se connecter
        </Link>
      )}
    </header>
  );
}
