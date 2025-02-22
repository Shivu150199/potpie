import "./App.css";
import Configuration from "./components/configuration/Configuration";
import Topbar from "./components/navbar/Topbar";
import Sidebar from "./components/navbar/Sidebar";
import Main from "./components/mainContent/Main";

function App() {
  return (
    <div className="App h-[88vh] flex">
      <div className="flex-1">
        <Sidebar />
      </div>
      <div className="h-full flex-[26]">
        <Topbar />
        <div className="flex h-full">
          <div className="flex-[19]">
            <Main />
          </div>
          <div className="flex-[6]">
            <Configuration />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
