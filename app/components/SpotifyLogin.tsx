'use client';

import React, { useState, useEffect } from 'react';
import type { ReactElement } from 'react';

// --- Types ---
interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || '';
const REDIRECT_URI = 'https://127.0.0.1:5173'; 
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const SCOPES = "user-read-private user-read-email user-top-read";

const SpotifyLogin: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);

  // --- Helper: PKCE Code Challenge Generation ---
  const generateCodeVerifier = (length: number): string => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  };

  const sha256 = async (plain: string): Promise<ArrayBuffer> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
  };

  const base64encode = (input: ArrayBuffer): string => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  };

  // --- Step 1: Redirect to Spotify ---
  const handleLogin = async (): Promise<void> => {
    const codeVerifier = generateCodeVerifier(64);
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);

    window.localStorage.setItem('spotify_code_verifier', codeVerifier);

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: CLIENT_ID,
      scope: SCOPES,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      redirect_uri: REDIRECT_URI,
    });

    window.location.href = `${AUTH_ENDPOINT}?${params.toString()}`;
  };

  // --- Step 2: Catch the Code and Exchange for Token ---
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      const codeVerifier = window.localStorage.getItem('spotify_code_verifier');

      if (!codeVerifier) {
        console.error("Missing code verifier");
        return;
      }

      fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: CLIENT_ID,
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: REDIRECT_URI,
          code_verifier: codeVerifier,
        }),
      })
      .then((res) => res.json() as Promise<SpotifyTokenResponse>)
      .then((data) => {
        if (data.access_token) {
          setToken(data.access_token);
          // Clean up URL and storage
          window.history.pushState({}, '', "/");
          window.localStorage.removeItem('spotify_code_verifier');
        }
      })
      .catch((err) => console.error("Auth Error:", err));
    }
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 p-6 border rounded-xl bg-white shadow-sm">
      {!token ? (
        <button 
          onClick={handleLogin}
          className="bg-[#1DB954] text-white px-8 py-3 rounded-full font-bold hover:bg-[#1ed760] transition-colors"
        >
          Connect Spotify
        </button>
      ) : (
        <div className="text-center">
          <p className="text-green-600 font-medium">✓ Successfully Authenticated</p>
          <p className="text-xs text-gray-500 mt-1">Ready to fetch data</p>
        </div>
      )}
    </div>
  );
};

export default SpotifyLogin;