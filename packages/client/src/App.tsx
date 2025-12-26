import NavBar from "./components/nav-bar/nav-bar";
import { Outlet } from "react-router-dom";


function App() {
  return (
    <div className="p-0 h-screen w-full">
      <header>
        <NavBar />
      </header>
      <Outlet />
    </div>
  )

}

export default App
