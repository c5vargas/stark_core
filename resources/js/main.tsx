import App from "./App";
import { createRoot } from "react-dom/client";
import './i18n';

import "@/styles/tailwind.css";
import "@/styles/global.css";

createRoot(document.getElementById("app") as HTMLElement).render(<App />);
