import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import CategoryPage from "./components/CategoryPage";
import ProductPage from "./components/ProductPage";
import CreateProductPage from "./components/CreateProductPage";
import ManageProducts from "./components/ManagePage";
import UpdateProductPage from "./components/UpdateProductPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/c/:category" component={CategoryPage} />
          <Route exact path="/products/create" component={CreateProductPage} />
          <Route exact path="/products/current" component={ManageProducts} />
          <Route
            path="/products/:productId/edit"
            component={UpdateProductPage}
          />
          <Route path="/products/:productId" component={ProductPage} />
        </Switch>
      )}
    </>
  );
}

export default App;
