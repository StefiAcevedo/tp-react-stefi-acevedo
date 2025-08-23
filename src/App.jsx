// src/App.jsx
import AppRouter from "./router/Router";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="app-shell">
      <main className="app-main">
        <AppRouter />
      </main>
      <Footer />
    </div>
  );
}
