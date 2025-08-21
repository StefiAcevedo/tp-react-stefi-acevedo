import AppRouter from "./router/Router.jsx";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="app-shell">
      <div className="app-main">
        <AppRouter />
      </div>
      <Footer />
    </div>
  );
}
