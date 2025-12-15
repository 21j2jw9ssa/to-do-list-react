"use client"

import { useState, useEffect } from "react" ;

/**
 * 
 */


/**
 * Bottom of a page
 * 
 * @returns a footer of a website
 */
export default function FOOTER() {

  // handles back-to-top button status
  const [visible, setVisible] = useState(false) ;
  const yPos = 200 ;

  function scrollToTop() {
    // return to the top of the site
    window.scrollTo( { top: 0, behavior: "smooth" } );
  } // scrollToTop()

  // Handles back-to-top button status
  useEffect(() => {
    const handleScroll = () => setVisible( window.scrollY > yPos ) ;

    setVisible( window.scrollY > yPos ) ;
    window.addEventListener( "scroll", handleScroll ) ;
    return () => window.removeEventListener( "scroll", handleScroll ) ; // cleanup after back to the top
  }, []) ;

  return (
    <>
      {/* BACK-TO-TOP BUTTON (only visible when not at the top of a page) */}
      <button
        id="backToTop"
        title="Go to top"
        className={ visible ? "show" : "" }
        onClick={scrollToTop}>
        back to top
      </button>

      {/* DISCLAIMER */}
      <footer>
        All contents is made by myself.<br/>
        All rights reserved.
      </footer>
    </>
  ) ;

} // FOOTER()