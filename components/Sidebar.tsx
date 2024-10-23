"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, DollarSign, User, Settings, PanelRightOpen } from "lucide-react";
import { useState } from "react";

const links = [
   { href: "/dashboard", label: "Dashboard", icon: Home },
   { href: "/dashboard/expenses", label: "Expenses", icon: DollarSign },
   { href: "/dashboard/profile", label: "Profile", icon: User },
   { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
   const pathname = usePathname();
   const [collapsed, setCollapsed] = useState(false);

   return (
      <div
         className={cn(
            "flex flex-col bg-gray-900 text-gray-100 transition-all duration-300 ease-in-out",
            collapsed ? "w-20" : "w-64"
         )}
      >
         <div className="flex items-center justify-between p-4 border-b border-gray-800">
            {!collapsed && (
               <Link href="/">
                  <h1 className="text-xl font-semibold text-purple-400 cursor-pointer">Pocket Planner</h1>
               </Link>
            )}
            <button
               onClick={() => setCollapsed(!collapsed)}
               className="p-1 rounded-md hover:bg-gray-800 transition-colors duration-200"
            >
               <PanelRightOpen className={cn("w-5 h-5 text-gray-400 transition-transform duration-200", collapsed && "rotate-180")} />
            </button>
         </div>
         <nav className="flex-grow py-4">
            <ul className="space-y-1 px-2">
               {links.map((link) => (
                  <li key={link.href}>
                     <Link
                        href={link.href}
                        className={cn(
                           "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                           pathname === link.href
                              ? "bg-purple-600 text-white"
                              : "text-gray-300 hover:bg-gray-800 hover:text-white"
                        )}
                     >
                        <link.icon className="w-5 h-5 mr-3" />
                        {!collapsed && link.label}
                     </Link>
                  </li>
               ))}
            </ul>
         </nav>
      </div>
   );
}