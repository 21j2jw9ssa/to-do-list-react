"use client"

import { Link, Route, Routes } from "react-router-dom" ;
import { useState, useEffect } from "react" ;

import TODOLIST_PAGE1_TODOLIST from "../routes/todolist-home" ;
import TODOLIST_PAGE2_HELP_GUIDE from "../routes/todolist-help" ;
import TODOLIST_PAGE3_ABOUT from "../routes/todolist-about";
import FOOTER from "./todolist-global-footer" ;

const jsonData = require("./../../../package.json") ; // To retrieve the URL of the homepage

/*
------------------------>>>
-------- SECTION O. SELF-MADE TOOLS --------
------------------------>>>
*/

// OBJECT FORMAT TO-DO LIST PAGE ELEMENTS
function Page( path, title, titleHovered, element ) {
  return { path: path, title: title, titleHovered: titleHovered, element: element } ;
} // Page

const pageURL = url => `${window.location.href}${url}` ;

// PAGE OBJECTS
const PAGES = [
  Page( "/",      "Home",  "Homepage",            <TODOLIST_PAGE1_TODOLIST/> ),
  Page( "/help",  "Help",  "How to use MakeList", <TODOLIST_PAGE2_HELP_GUIDE/> ),
  Page( "/about", "About", "About me",            <TODOLIST_PAGE3_ABOUT/> ),
] ; // PAGES

Object.freeze(PAGES) ; // AVOID ANY MUTATIONS

console.log(`Current URL: ${process.env.PUBLIC_URL}`) ;
console.log(`Current full URL: ${window.location.href}`) ;
console.log(`Current full URL's path name: ${window.location.pathname}`) ;
console.log(`Current home page: ${pageURL("/")}`) ;
console.log(`Current help page: ${pageURL("/help")}`) ;
console.log(`Current about page: ${pageURL("/about")}`) ;

// // By default, show the user the homepage if pathname's not specified
if ( window.location.href === jsonData.homepage ) {
  window.location.href += "#" + PAGES[0].path ;
} // if: by default, direct to the homepage

/*
------------------------>>>
-------- SECTION I. INTERFACE --------
------------------------>>>
*/

const ToDoListInterface = function() {

  // When opened, it shows the current page the window is on
  // Initially set to the URL of homepage,
  // and changes whenever any tab of the navigation bar gets clicked
  const [curPage, setCurPage] = useState( `${ window.location.href }` ) ;

  /**
   * Updates the current page to a specified path
   * @param {String} path Path to update the current page to 
   */
  function UpdateCurPage(path) {
    setCurPage( path ) ;
    // window.location.href = path ;
  } // UpdateCurPage()

  /**
   * Navigation bar component
   * 
   * Sticks to the top with the app title when scrolling down.
   */
  function NavBar() {
    const [showShadow, setShadowStat] = useState( window.scrollY > 0 ) ;

    // Handles navigation bar shadow status
    useEffect(() => {
      const handleScroll = () => setShadowStat( window.scrollY > 0 ) ;
      setShadowStat( window.scrollY > 0 ) ;
      window.addEventListener( "scroll", handleScroll );
      return () => window.removeEventListener("scroll", handleScroll); // cleanup
    }, []) ;

    return (
      <div id="nav-of-links" aria-disabled="false"
           className={ showShadow > 0 ? "is-stuck" : "" } >
        {
          PAGES.map( page =>
            <Link key={page.title}
                  to={page.path}
                  title={page.titleHovered}
                  onClick={ () => UpdateCurPage(page.path) }
                  className={ curPage.startsWith( page.path ) ? "current-page" : "" }
              >
              {page.title}
            </Link>
          )
        }
      </div>
    ) ;
  } // NavBar()

  /**
   * Navigation router component
   * 
   * Consists of routes to every perspective page
   */
  const NavRouter = function() {
    return (
      <Routes>
        {
          PAGES.map( page =>
            <Route path={`${page.path}`} element={page.element} />
          )
        }
      </Routes>
    ) ;
  } // NavRouter()

  return (
    <>
      <div id="header-wrapper">
        <h1 id="mainTitle">To-do List</h1>
        <NavBar />
      </div>

      <NavRouter />

      <FOOTER />
    </>
  ) ;

} // ToDoListInterface

export default ToDoListInterface ;