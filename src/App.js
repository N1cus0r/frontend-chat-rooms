import AuthProvider from "./context/AuthProvider";
import RoomProvider from "./context/RoomProvider";
import AppRouter from "./routing/AppRouter";
import AppTheme from "./theme/AppTheme";

function App() {
  return (
    <div className="App">
      <AppTheme>
        <AuthProvider>
          <RoomProvider>
            <AppRouter />
          </RoomProvider>
        </AuthProvider>
      </AppTheme>
    </div>
  );
}

export default App;
