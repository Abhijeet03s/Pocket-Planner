import Image from "next/image";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
   const session = await getServerSession(authOptions);

   if (!session) {
      redirect("/");
   }

   return (
      <div>
         <h1 className="text-2xl font-bold mb-6">User Profile</h1>
         <div className="flex items-center space-x-8">
            {session.user?.image && (
               <Image
                  src={session.user.image || "/default-avatar.png"}
                  alt={session.user.name || "User"}
                  width={48}
                  height={48}
                  className="rounded-full"
                  unoptimized
               />
            )}
            <div className="space-y-2">
               <p className="text-xl font-semibold">{session.user?.name}</p>
               <p className="text-gray-600">{session.user?.email}</p>
            </div>
         </div>
      </div>
   );
}
