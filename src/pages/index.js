import * as React from "react";
import Layout from "../components/layout";
import { Link } from "gatsby";
 
// Gatsby Image Plugin - https://www.gatsbyjs.com/plugins/gatsby-plugin-image/#dynamic-images
import { StaticImage } from "gatsby-plugin-image";


const HomePage = () => {
  
  // let testingESLint; // <--- Uncomment this to confirm that ESLint is catching errors at GitHub. Will say: "testingESLint is defined but never used (no-unused-vars)"
  
  // For <StaticImage>, most of the default options are pretty good, so let's just add the Width and Placeholder Effect.
  // https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-plugin-image/#all-options
  
  // *** The Academy Award Trophy is a demonstration of how *Gatsby Image* can enhance the performance and effects of regular html images.
  
  return (
      <Layout pageTitle="Home Page">
        Visit: <Link to="/movies">All Movies</Link><br/><br/><br/>
        <StaticImage src="../images/academyawardtrophy.png" width={219} placeholder="blurred" alt="NPS Logo"></StaticImage>
        <br/><br/> &nbsp;( Image from Wikipedia )<br/><br/>
        *** The Academy Award Trophy is a demonstration of how *Gatsby Image* can enhance the performance and effects of regular html images. ***<br/><br/><br/><br/>
      </Layout>
  );

}

export default HomePage
export const Head = () => <title>Home Page</title>
 
// Thanks!
 
 
 
