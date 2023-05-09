import * as React from "react";
import { Link } from "gatsby";
import Search from "./search"
const searchIndices = [{ name: `Pages`, title: `Pages` }]
 
/*
 *  "Adding global styles with a layout component."
 *  https://www.gatsbyjs.com/docs/how-to/styling/global-css/
 */
import "./layout.css";
 
const Layout = function({ pageTitle, children }) {

  return (
    <div id="top">

      <header>
        <h1>All Time Top Most Liked Movies <span className="headingparens">( Just some of the many! )</span></h1>
        <Search indices={searchIndices} />
        <nav>
          Navigation: <Link to="/">Home Page</Link> | <Link to="/movies">Top Movies</Link>
        </nav>
        <br/><hr/>
        <h2>{pageTitle}</h2>
      </header>
      
      <main>
        {children}
      </main>
      
      <footer>
        <p>This work is part of CSCI E-114, Web application development with Jamstack and is a For Educational Purposes Only School Project.</p>
        <p>All Movie Copyrights are of their respective Companies and Movie Studios.</p>
      </footer>

    </div>
  );
  
}

export default Layout;
