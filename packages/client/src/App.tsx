import NavBar from "./components/nav-bar/nav-bar";
import { Outlet } from "react-router-dom";
import "./App.css"


function App() {
  return (
    <div className="flex flex-col h-screen">
      <header>
        <NavBar />
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )

}

export default App
