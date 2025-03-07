import UserProfile from "@/components/profile/user-profile";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-base-200 min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-center text-3xl font-bold">
          Profil utilisateur
        </h1>
        <Link className="btn btn-ghost mb-6" href={"/forum"}>
          Retourner au forum
        </Link>
        <UserProfile />
      </div>
    </main>
  );
}
