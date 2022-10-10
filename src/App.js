import {Routes, Route} from "react-router-dom";
import {Navbar} from "./components";
import {StateContext} from "./context/StateContext";
import {Home, Product} from "./pages";
import "./styles.css";
import {useState} from "react";

const App = () => {
    const [activeCurrency, setActiveCurrency] = useState(0);
    const [activeSection, setActiveSection] = useState('');
    const [activeProduct, setActiveProduct] = useState('');

  return (
      <div className={"container"}>
        <Navbar activeCurrency={activeCurrency} setActiveCurrency={setActiveCurrency} activeSection={activeSection}/>
          <Routes>
            <Route path={"/"} element={<Home activeCurrency={activeCurrency} setActiveSection={setActiveSection} setActiveProduct={setActiveProduct}/>}/>
            <Route path={"/all"} element={<Home activeCurrency={activeCurrency} setActiveSection={setActiveSection} setActiveProduct={setActiveProduct}/>}/>
            <Route path={"/clothes"} element={""}/>
            <Route path={"/tech"} element={""}/>
            <Route path={"/product/:id"} element={<Product activeProduct={activeProduct}/>}/>
          </Routes>
    </div>
  );
}
export default App;