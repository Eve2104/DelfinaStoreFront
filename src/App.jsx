import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import ProductoDetalle from "./pages/ProductoDetalle.jsx";
import Carrito from "./pages/Carrito.jsx";
import Pago from "./pages/Pago.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";
import hero from "./assets/img/1.png";
import Nosotros from "./pages/Nosotros.jsx";
import Footer from "./components/Footer";
import MiniCart from "./components/MiniCart";
import Contacto from "./pages/Contacto";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  return (
    <CartProvider>
      <Navbar />
      <MiniCart />
      <header className="py-4 hero">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-12 col-lg-6">
              <h1 className="display-5 fw-bold text-dark mb-3">
                Delfina Store
              </h1>
              <p className="lead text-muted mb-4">
                Ropa para niñas con diseño moderno y amor en cada detalle.
              </p>
            </div>
            <div className="col-12 col-lg-6 text-center">
              <img src={hero} alt="Hero" className="img-fluid shadow-sm" />
            </div>
          </div>
        </div>
      </header>

      <main className="py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/producto/:id" element={<ProductoDetalle />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route
            path="/pago"
            element={
              <ProtectedRoute>
                <Pago />
              </ProtectedRoute>
            }
          />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
        </Routes>
      </main>

      <Footer />
    </CartProvider>
  );
}
