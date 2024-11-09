"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { PanelRightOpen } from "lucide-react";
import { useState } from "react";
import { satoshi } from "@/app/fonts/font";
import { links } from "@/lib/constants";
import { UserProfileSection } from "./UserProfileSection";

export function Sidebar() {
   const pathname = usePathname();
   const [collapsed, setCollapsed] = useState(false);

   return (
      <div
         className={cn(
            `${satoshi.variable} font-satoshi`,
            "flex flex-col h-screen bg-gray-900 text-gray-100 transition-all duration-300 ease-in-out border-r border-gray-800",
            collapsed ? "w-20" : "w-64"
         )}
      >
         <div className="flex items-center justify-between p-4 border-b border-gray-800">
            {!collapsed && (
               <Link href="/">
                  <h1 className="text-xl font-semibold text-purple-400 cursor-pointer hover:text-purple-300 transition-colors">
                     Pocket Planner
                  </h1>
               </Link>
            )}
            <button
               onClick={() => setCollapsed(!collapsed)}
               className={cn(
                  "p-1.5 rounded-md hover:bg-gray-800 transition-all duration-200",
                  collapsed && "mx-auto"
               )}
               title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
               <PanelRightOpen
                  className={cn(
                     "w-5 h-5 text-gray-400 transition-all duration-200 hover:text-gray-200",
                     collapsed && "rotate-180"
                  )}
               />
            </button>
         </div>
         <nav className="flex-1 py-4">
            <ul className="space-y-1 px-2">
               {links.map((link) => (
                  <li key={link.href}>
                     <Link
                        href={link.href}
                        className={cn(
                           "flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200",
                           "hover:bg-gray-800/50 active:scale-[0.98]",
                           pathname === link.href
                              ? "bg-purple-600/90 text-white hover:bg-purple-600"
                              : "text-gray-300 hover:text-white"
                        )}
                        title={collapsed ? link.label : undefined}
                     >
                        <link.icon className={cn(
                           "flex-shrink-0 transition-all duration-200",
                           collapsed ? "w-6 h-6" : "w-5 h-5 mr-3"
                        )} />
                        {!collapsed && link.label}
                     </Link>
                  </li>
               ))}
            </ul>
         </nav>
         <UserProfileSection collapsed={collapsed} />
      </div>
   );
}
