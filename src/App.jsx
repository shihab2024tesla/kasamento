import { BrowserRouter } from "react-router-dom";
import { BagDrawer } from "./components/Bag";
import { ChatWidget } from "./components/Chat";
import { ToastViewport } from "./components/Toast";
import { AuthProvider } from "./context/AuthContext";
import { BagProvider } from "./context/BagContext";
import { ToastProvider } from "./context/ToastContext";
import { AppRoutes } from "./routes/AppRoutes";

export function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <BagProvider>
            <AppRoutes />
            <BagDrawer />
            <ToastViewport />
            <ChatWidget />
          </BagProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
