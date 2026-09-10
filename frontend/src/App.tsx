import { AppProvider } from "./foundation/context/app";
import { GameProvider } from "./foundation/context/game";
import Header from "./components/header/Header";
import GameScreen from "./components/game-screen/GameScreen";

function App() {
  return (
    <AppProvider>
      <GameProvider>
        <main>
          <Header />
          <GameScreen />
        </main>
      </GameProvider>
    </AppProvider>
  );
}

export default App;