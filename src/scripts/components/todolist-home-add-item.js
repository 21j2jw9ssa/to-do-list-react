import { useState } from 'react';

export default function AddItemSection({ onAddItem }) {

  // Input that determines the new item's content
  const [inputCtnt, setInputCtnt] = useState("") ;

  /**
   * An feature that enables users to add an item
   * by simply clicking 'Enter'.
   * @param {*} evt event which detects the key that gets pressed down 
   */
  function CheckKeyDownBeforeAddItem(evt) {
    if ( evt.key === "Enter" ) {
      // To prevent closing the jumping alert in one click
      evt.preventDefault() ;
      evt.stopPropagation() ;

      setInputCtnt("") ;
      onAddItem(inputCtnt) ;
    }
  } // CheckKeyBeforeAddItem()

  return (
    <div id="input-wrapper">
      <input type="text" id="inputItem" placeholder="enter new item"
        value={inputCtnt}
        onChange={ e => setInputCtnt(e.target.value) }
        onKeyDown={ e => { CheckKeyDownBeforeAddItem(e) } }
      />{' '}
      <button id="addItem" title="add item" className="listFunc"
        onClick={ () => {
          setInputCtnt("") ;
          onAddItem(inputCtnt) ;
        }}>
        add item
      </button>
    </div>
  ) ;
} // AddItemSection()