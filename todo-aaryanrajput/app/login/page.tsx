import { LoginForm } from "@/app/login/login-form";

export default function LoginPage() {
  return (
    <main className="shell login-shell">
      <header className="site-header">
        <a className="brand" href="https://aaryanrajput.com">aaryanrajput.com</a><span className="muted">private</span>
      </header>
      <section className="login-panel">
        <p className="kicker">restricted access</p><h1>unlock todo</h1><p>enter your access key to continue.</p><LoginForm />
      </section>
    </main>
  );
}
