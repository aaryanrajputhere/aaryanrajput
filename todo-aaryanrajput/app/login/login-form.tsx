"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter(); const [error, setError] = useState(""); const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setError("");
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key: form.get("key") }) });
      if (!response.ok) { setError(response.status === 429 ? "too many attempts. try again later." : "that key did not work."); return; }
      router.replace("/"); router.refresh();
    } catch { setError("could not reach the server. try again."); }
    finally { setLoading(false); }
  }
  return (
    <form className="login-form" onSubmit={submit}>
      <label className="sr-only" htmlFor="access-key">Access key</label>
      <input id="access-key" name="key" type="password" autoComplete="current-password" placeholder="access key" minLength={32} maxLength={128} required autoFocus />
      <button type="submit" disabled={loading}>{loading ? "checking…" : "unlock"}</button>
      <p className="form-error" role="alert">{error}</p>
    </form>
  );
}
