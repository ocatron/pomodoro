import "./App.css";
import { MainLayout } from "./components/main-layout";
import { ThemeProvider } from "./components/theme";
import { Timer } from "./components/timer";

function App() {
  return (
    <ThemeProvider>
      <MainLayout>
        <Timer />
      </MainLayout>
    </ThemeProvider>
  );
}

export default App;
