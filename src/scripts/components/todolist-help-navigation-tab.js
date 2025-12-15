import { useState } from "react" ;
import MakeId from "./todolist-global-functions" ;

/**
 * Navigation tab component.
 * 
 * @param {{ name : String, ctnt : JSX.element }} tabInfoList list of tab information
 */
const NavTabs = function( { tabInfoList } ) {

  const tabs = [], tabCtnts = [] ;
  const [activeTabIdx, setActiveTabIdx] = useState(0) ;

  for ( let i = 0 ; i < tabInfoList.length ; i++ ) {
    tabs.push(
      <div key={ MakeId() } className={ `tab${ i === activeTabIdx ? " active" : "" }` }
           onClick={ () => setActiveTabIdx(i) }>
        { tabInfoList[i].name }
      </div>
    ) ;

    tabCtnts.push(
      <div key={ MakeId() } className={ `tab-content${ i === activeTabIdx ? " active" : "" }` }>
        { tabInfoList[i].ctnt }
      </div>
    ) ;
  } // for

  return (
    <span className="tab-container">
      <article>
        <div className="tabs">{tabs}</div>
        {tabCtnts}
      </article>
    </span>
  )
} // NavBar()

export default NavTabs ;