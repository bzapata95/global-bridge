import { BrowserRouter } from "react-router-dom";
import { SidebarDrawerProvider } from "./context/SidebarDrawerContext";
import { IndexedDBProvider } from "./context/IndexedDBContext";
import { AuthProvider } from "./context/Auth";
import { Routes } from "./routes";

export function App() {
  return (
    <BrowserRouter>
      <SidebarDrawerProvider>
        <IndexedDBProvider>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </IndexedDBProvider>
      </SidebarDrawerProvider>
    </BrowserRouter>
  );
}
