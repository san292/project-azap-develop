// == Import NPM
import React from "react";
import { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
// == Import Css styles
import "./styles.css";
// == Import Components
import Header from "../Header";
import Footer from "../Footer";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import Home from "../Home";
import User from "../User";
import MovieDetail from "../MovieDetail";
import Error from "../Error";
import Search from "../Search";
import UserLibrary from "../UserLibrary";
import ResetPassword from "../ResetPassword";
import Team from "../Team";
import GeneralConditions from "../GeneralConditions";

const App = () => {
  // condition si user connecté remontée depuis le composant SignIn
  let [isLogged, setIsLogged] = useState(false);

  // TODO on refresh if token exist then send a request to back to authentificate, back will answer with user obj
  // TODO for ex route check user
  // Maintien de connexion même si changement de website
  
    /****** MANIERE PROPRE (fait apparaitre des warning) ******/
      useEffect(() => {
        const hasToken = !!(localStorage.getItem("token"));
        if (hasToken) setIsLogged(true);

        return () => setIsLogged(false);
      }, []);

    /****** MANIERE SALE ******/
    // const hasToken = !!(localStorage.getItem("token"));
    //   if (hasToken) isLogged = true


  return (
    <div className="App">
      <Router>
        <Header isLogged={isLogged} setIsLogged={setIsLogged}/>
        <Switch>
          {/* Routes utilisateur connecté */}

          {isLogged && (
            <>
              <Route path="/my-profile" exact >
                <User setIsLogged={setIsLogged} />
              </Route>
              <Route path="/library" exact component={UserLibrary} />
              <Route path="/" exact component={Home} />
              <Route path="/sign-in" exact component={SignIn} />
              <Route path="/sign-up" exact component={SignUp} />
              <Route path="/movie/:id" exact component={MovieDetail} />
              <Route path="/search" exact component={Search} />
              <Route path="/reset-password" exact component={ResetPassword} />
              <Route path="/team" exact component={Team} />
              <Route
                path="/general-conditions"
                exact
                component={GeneralConditions}
              />
              {/* Renvoie vers une page d'erreur 404 si aucunes des routes ne corresponds */}
              <Route>{/* <Error /> */}</Route>
            </>
          )}

          {/* Routes pour utilsateur NON connecté */}
          <Route path="/" exact component={Home} />
          <Route path="/sign-in" exact>
            <SignIn setIsLogged={setIsLogged} isLogged={isLogged} />
          </Route>
          <Route path="/sign-up" exact component={SignUp} />
          <Route path="/movie/:id" exact component={MovieDetail} />
          <Route path="/search" exact component={Search} />
          <Route path="/team" exact component={Team} />
          <Route
            path="/general-conditions"
            exact
            component={GeneralConditions}
          />

          {/* Routes avec redirect vers la page connexion si utilisateur NON connecté */}
          <Route exact path="/library">
            {isLogged ? (
              <Redirect to="/library" />
            ) : (
              <SignIn setIsLogged={setIsLogged} isLogged={isLogged} />
            )}
          </Route>
          <Route exact path="/my-profile">
            {isLogged ? (
              <Redirect to="/my-profile" />
            ) : (
              <SignIn setIsLogged={setIsLogged} isLogged={isLogged} />
            )}
          </Route>
          {/* Renvoie vers une page d'erreur 404 si aucunes des routes ne corresponds */}
          <Route>
            <Error />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
