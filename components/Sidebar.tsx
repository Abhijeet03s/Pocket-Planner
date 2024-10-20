"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
   { href: "/dashboard", label: "Dashboard" },
   { href: "/dashboard/expenses", label: "Expenses" },
   { href: "/dashboard/profile", label: "Profile" },
];

export function Sidebar() {
   const pathname = usePathname();

   return (
      <nav className="w-64 bg-gray-100 p-4">
         <ul className="space-y-2">
            {links.map((link) => (
               <li key={link.href}>
                  <Link
                     href={link.href}
                     className={cn(
                        "block p-2 rounded-md",
                        pathname === link.href
                           ? "bg-primary text-primary-foreground"
                           : "hover:bg-gray-200"
                     )}
                  >
                     {link.label}
                  </Link>
               </li>
            ))}
         </ul>
      </nav>
   );
}