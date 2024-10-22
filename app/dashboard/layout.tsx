import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions";
import { Sidebar } from "@/components/Sidebar";

export default async function DashboardLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   const session = await getServerSession(authOptions);

   if (!session) {
      redirect("/");
   }

   return (
      <div className="flex h-screen">
         <Sidebar />
         <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
   );
}