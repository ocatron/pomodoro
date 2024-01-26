import "./App.css";
import { MainLayout } from "./components/main-layout";
import { ThemeProvider } from "./components/theme";

function App() {
  return (
    <ThemeProvider>
      <MainLayout>Hello world!</MainLayout>
    </ThemeProvider>
  );
}

export default App;
