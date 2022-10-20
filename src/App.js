import {Routes, Route} from "react-router-dom";
import {Navbar} from "./components";
import {ShoppingCartProvider} from "./context/StateContext";
import {Cart, Home, Product} from "./pages";
import "./styles.css";
import React, {useState} from "react";
import {useLocalStorage} from "./hooks/useLocalStorage";

const App = () => {
    const [activeCurrency, setActiveCurrency] = useLocalStorage('currency', 0);
    const [activeSection, setActiveSection] = useState('');

    return (
      <ShoppingCartProvider activeCurrency={activeCurrency}>
            <Navbar activeCurrency={activeCurrency} setActiveCurrency={setActiveCurrency} activeSection={activeSection} activeCurrency={activeCurrency}/>
              <div className={"container"}>
              <Routes>
                <Route path={"/"} element={<Home activeCurrency={activeCurrency} setActiveSection={setActiveSection}/>}/>
                <Route path={"/:category"} element={<Home activeCurrency={activeCurrency} setActiveSection={setActiveSection}/>}/>
                <Route path={"/product/:id"} element={<Product setActiveSection={setActiveSection} activeCurrency={activeCurrency}/>}/>
                <Route path={"/cart"} element={<Cart activeCurrency={activeCurrency} setActiveSection={setActiveSection}/>}/>
              </Routes>
        </div>
      </ShoppingCartProvider>
    );
}
export default App;