// "use client"

import {useState} from 'react' ;

/**
 * UI of an item card in a to-do list
 * @param { {String: content, id: String, checked: Boolean} } item Item format
 * @param { Function } onEditItemCtnt method for editing this item
 * @param { Function } onToggleItem method for (un)checking this item
 * @param { Function } onRemoveItem method for removing this item
 * @returns HTML structure of this item card
 */
function ItemCard( { item, onEditItemCtnt, onToggleItem, onRemoveItem } ) {
  const [isEditing, setEditStat] = useState(false) ;
  const [editCtnt, setEditCtnt] = useState(item.content) ;

  /**
   * Activate the editing state.
   */
  function EnableEdit() {
    setEditStat(true) ;

    // Sets delay so rendering can be done first
    // before focusing on the input
    setTimeout( () => {
      document.getElementById( `editing-item-${item.id}` ).focus() ;
    }, 0) ;
  } // EnableEdit()

  /**
   * Check if an item to be editted is empty
   * @returns `true` if it's empty, or `false` if not
   */
  function ItemCtntIsEmpty() { return editCtnt.trim() === "" ; } // ItemCtntIsEmpty()

  /**
   * Check if the item editted is empty (or mere spaces)
   */
  function VerifyItemCtnt() {
    if ( ItemCtntIsEmpty() ) {
      const msg = "Item must be neither empty nor mere spaces." ;
      document.querySelector( `#editing-item-${item.id}` ).setCustomValidity(msg) ;
      document.querySelector( `#editing-item-${item.id}` ).reportValidity() ;
    } else {
      onEditItemCtnt( {...item, content: editCtnt} ) ;
      setEditStat(false) ;
    }
  } // VerifyItemCtnt()

  /**
   * Exit item-editing mode
   */
  function CancelEditing() {
    setEditCtnt(item.content) ;
    setEditStat(false) ;
  } // CancelEditing()

  /**
   * Checking finish editting pressing down a key
   * 
   * `Enter`: saves the edit of this item and
   * updates the to-do list if the new content is empty.
   * 
   * Pops up an error to tell users re-edit it until
   * it's not empty or pure spaces
   * 
   * `Esc`: discards the edit of this item
   */
  function CheckKeyDownBeforeFinishEditing(evt) {

    // Pressing 'Enter': Check if the editted item is empty or mere spaces.
    //                   If so, tell users to re-edit it until it's not.
    //                   If not, it's saved the latest input as the item's
    //                   content.

    // Pressing 'Escape': Discard the change made on the item.

    if ( evt.key === "Enter" ) VerifyItemCtnt() ;
    else if ( evt.key === "Escape" ) CancelEditing() ;
  } // CheckKeyDownBeforeFinishEditing()

  function HandleEditStat() {
    isEditing ? CancelEditing() : EnableEdit() ; 
  } // HandleEditStat()

  let itemCtnt = "" ;

  if ( isEditing ) {
    itemCtnt = (
      <form className="editing-area">
        <input value={editCtnt} id={`editing-item-${item.id}`} name="editing-item"
          onChange={ e => setEditCtnt(e.target.value) }
          onKeyDown={ e => CheckKeyDownBeforeFinishEditing(e) } />
          <img className="material-symbols-rounded" data-type-name="confirm-edit"
               title="click to confirm content change"
               alt="check" src="UI icons/check.svg" onClick={ VerifyItemCtnt } />
          <img className="material-symbols-rounded" data-type-name="cancel-edit"
               title="click to discard change made on this item"
               alt="cancel" src="UI icons/cancel.svg" onClick={ CancelEditing }/>
      </form>
    ) ;
  } // if: currently editing the item
  else {
    itemCtnt = (
      <>
        {item.content}
      </>
    ) ;
  } // else: not editing the item right now

  return (
    <div draggable="false" className="item-card">
      <div className="material-symbols-rounded" data-type-name="drag">
        <img height="48" width="36" title="drag indicator used to drag an item"
             alt="drag to move and drop this item" src="UI icons/drag_indicator.svg" />
      </div>
      <div className="content">
        <div className="upper-content">
          <label className="checkbox-container">
            <input type="checkbox" name="done" className="chkbox"
                   checked={item.checked}
                   onChange={ () => {
                     onToggleItem( { ...item, checked: !item.checked } ) ;
                   }}
            />
            <span className="checkmark"></span>
          </label>
          <span className={ `tag${ item.checked ? " checked" : "" }` }>
            {itemCtnt}
          </span>
        </div>
        <div className="lower-content">
          <div className="material-symbols-rounded" data-type-name="edit"
               onClick={ () => HandleEditStat() }>
            <img height="35" width="35" title="click to edit this item"
                 alt="pen editing the square" src="UI icons/edit_square.svg" />
          </div>
          <div className="material-symbols-rounded" data-type-name="remove"
               onClick={ () => onRemoveItem(item.id) }>
            <img height="35" width="35" title="click to delete this item"
                 alt="rubbish bin" src="UI icons/delete.svg" />
          </div>
        </div>
      </div>
    </div>
  ) ;
} // ItemCard()

export default ItemCard ;