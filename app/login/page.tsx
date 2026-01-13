"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-2xl font-bold mb-4">
          Welcome, {session.user?.name}
        </h1>
        <p className="mb-4">
          Your Access Token is: {session.accessToken?.substring(0, 15)}...
        </p>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-2xl font-bold mb-4">Wellness App</h1>
      <button
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        onClick={() => signIn("spotify")}
      >
        Sign in with Spotify
      </button>
    </main>
  );
}