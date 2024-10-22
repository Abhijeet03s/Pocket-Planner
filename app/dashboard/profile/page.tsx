import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function ProfilePage() {
   const session = await getServerSession(authOptions);

   if (!session) {
      redirect("/");
   }

   return (
      <div>
         <h1 className="text-2xl font-bold mb-4">User Profile</h1>
         <div className="flex items-center space-x-4">
            {session.user?.image && (
               <Image
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  width={32}
                  height={32}
                  className="rounded-full"
                  unoptimized
               />
            )}
            <div>
               <p className="text-xl font-semibold">{session.user?.name}</p>
               <p className="text-gray-600">{session.user?.email}</p>
            </div>
         </div>
      </div>
   );
}
