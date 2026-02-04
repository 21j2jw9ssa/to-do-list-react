"use client"

import DOMPurify from 'dompurify';
import Swal from 'sweetalert2';
import Sortable from 'sortablejs';
import { useState, useRef, useEffect, useReducer } from 'react';

import AddItemSection from '../components/todolist-home-add-item' ;
import ItemCard from '../components/todolist-global-item-card' ;
import ButtonSet from '../components/todolist-home-buttons' ;
import MakeId from "../components/todolist-global-functions" ;

import '../../styles/todolist-style.css'; // UI for todolist

/*
------------------------>>>
-------- SECTION O. ELEMENTS PREPARATION --------
------------------------>>>
*/

const ORDER = {
  ASCENDING: "ITEMS SHOULD BE GOING UP!",
  DESCENDING: "ITEMS SHOULD BE GOING DOWNNN!",
} ; // ORDER

const ITEM_PROPERTY = {
  CONTENT: "property_content",
  CHECKBOX_STATUS: "property_checkbox-status",
} ; // ITEM_PROPERTY

const SORT_MODE = [
  { name: "📝⬆️ smallest to largest", sortMode: "magnitude-asc" },
  { name: "📝⬇️ largest to smallest", sortMode: "magnitude-desc" },
  { name: "✔️⬆️ latest done to earliest done", sortMode: "checkbox-stat-asc" },
  { name: "✔️⬇️ earliest done to latest done", sortMode: "checkbox-stat-desc" },

  // May be added in the future:
  // { name: "📅⬆️ closest to farthest", sortMode: "deadline-asc" },
  // { name: "📅⬆️ farthest to closest", sortMode: "deadline-desc" },
  // { name: "⌚⬆️ low to high priority", sortMode: "priority-asc" },
  // { name: "⌚⬆️ high to low priority", sortMode: "priority-desc" },
] ; // SORT_MODE

const LIST_ACTION = {
  ADD: "Add something will ya!",
  CHANGE: "JUST SWAP THE GUY ALREADY!",
  REMOVE_ITEM: "Get it out of the list. RIGHT NOW.",
  SORT: "You'd better get in done within 20 seconds NOW!",
  MOVE: "MOVE, MOVE, MOVE, MOVE, MOVE!",
  IMPORT: "NEW LIST INVASION.",
  DELETE_LIST: "OK. ANNIHILATION. NOW WHAT?",
} ; // LIST_ACTION

/**
 * The type of error thrown when detecting
 * an item not following the following pattern:
 * 
 * `item, checkStat`
 * 
 * In which `item` means its content, and
 * `checkStat` means its checkbox status
 */
class FileContentError extends Error {
  constrcutor(message) {
    this.message = message ;
    this.name = "FileContentError" ;
  } // constructor()
} // FileContentError

/**
 * The type of error thrown when detecting
 * the selected file not a text file, i.e. ends with `.txt`
 */
class FileTypeError extends Error {
  constrcutor(message) {
    this.message = message ;
    this.name = "FileTypeError" ;
  } // constructor()
} // FileTypeError

// No mutations will be made on the following constants.
Object.freeze( ORDER, ITEM_PROPERTY, SORT_MODE, LIST_ACTION ) ;

/**
 * Pop-up messages
 * @param {string} type type of popup up messages
 * @param {string} msg pop up message content; may be either plain text or HTML
 * @param {boolean} msgIsHTML if the pop up message content is, or contains HTML
 */
function PopUpMsg( type, msg, msgIsHTML=false ) {
  type = type.trim().toLowerCase() ;
  try {
    const typeName = type.slice(0, 1).toUpperCase().concat( type.slice(1) ) ;
    if ( msgIsHTML ) {
      Swal.fire({
        allowEscapeKey: false,
        allowOutsideClick: false,
        title: typeName,
        html: DOMPurify.sanitize(msg), // sanitize HTML content to prevent XSS attacks
        icon: type,
      }) ;
    } else {
      Swal.fire({
        allowEscapeKey: false,
        allowOutsideClick: false,
        title: typeName,
        text: msg, 
        icon: type,
      }) ;
    }
  } catch (err) {
    console.error( err ) ;
  }
} // PopUpMsg()

function ListItem( ctnt, done = false ) {
  return { id: MakeId(), content: ctnt, checked: done } ;
} // ListItem()

/*
------------------------>>>
-------- SECTION I. INTERFACE --------
------------------------>>>
*/

const TODOLIST_PAGE1_TODOLIST = function() {
  const lsName = "to-do list" ;

  function SaveLocalListState(newList) {
    localStorage.setItem( lsName, JSON.stringify(newList) ) ;
  } // SaveLocalListState()

  function GetLocalListState() {
    return localStorage.getItem(lsName) ;
  } // GetLocalListState()

  function ClearLocalListState() {
    localStorage.removeItem(lsName) ;
  } // ClearLocalListState()

  const [items, UpdateItems] = useReducer(
    ItemReducer,

    // List initialisation:
    // loads an array of items if the is a saved list;
    // loads an empty array if it's empty.
    GetLocalListState() === null ? [] : JSON.parse( GetLocalListState() )
  ) ;

  function ItemReducer( items, action ) {
    if ( action.type === LIST_ACTION.ADD ) {
      const newList = [ ...items, ListItem(action.newItemContent) ] ;
      SaveLocalListState(newList) ;
      return newList ;
    } // if: adding an item
    else if ( action.type === LIST_ACTION.CHANGE ) {
      const newList = items.map( item => ( item.id === action.newItem.id ) ? action.newItem : item ) ;
      SaveLocalListState(newList) ;
      return newList ;
    } // else if: toggling/renaming an item
    else if ( action.type === LIST_ACTION.REMOVE_ITEM ) {
      const newList = items.filter( item => item.id !== action.id ) ;
      newList.length > 0 ? SaveLocalListState(newList) : ClearLocalListState() ;
      return newList ;
    } // else if: delete an item
    else if ( action.type === LIST_ACTION.MOVE ||
              action.type === LIST_ACTION.IMPORT ||
              action.type === LIST_ACTION.SORT ) {
      SaveLocalListState(action.newList) ;
      return action.newList ;
    } // else if
    else if ( action.type === LIST_ACTION.DELETE_LIST ) {
      return [] ;
    }
    else {
      return items ;
    } // else
  } // ItemReducer()

  // toggle
  const [isOpen, setIsOpen] = useState(false) ;
  const [selected, setSelected] = useState( "👇 choose a sorting method" );
  // const [isLoading, setLoading] = useRef(true) ;
  const menuRef = useRef(null) ;
  const listRef = useRef(null) ;

  // Close dropdown list when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if ( menuRef.current && !menuRef.current.contains(e.target) ) setIsOpen(false) ;
    }
    document.addEventListener( "click", handleClickOutside ) ;
    return () => document.removeEventListener( "click", handleClickOutside ) ;
  }, []) ;

  // Tackle item-dragging
  useEffect(() => {
    const el = listRef.current;

    {
      let items = document.querySelectorAll( "#buffer li" ) ;
      if ( items.length > 0 ) {
        let lastItem = items[items.length-1] ;
        let lastItemOutOfBuffer = lastItem.classList.contains("sortable-drag") ;
        if ( lastItemOutOfBuffer ) {
          console.log("OUT-DRAGGED ITEM DETECTED") ;
          lastItem.remove() ; // removes the ghost
        } // last item is the one dragged by the draggable

        for ( let s of items )
          s.classList.remove("sortable-chosen", "sortable-ghost") ;
      } // if

    } // while: last element is a sortable ghost

    if ( !el ) return ;

    const sortable = new Sortable(el, {
      animation: 100,
      fallbackClass: "sortable-drag",
      handle: "[data-type-name='drag'] > img", // only drag by handle
      onEnd: (evt) => {
        const updated = [...items];
        const [moved] = updated.splice(evt.oldIndex, 1);
        updated.splice(evt.newIndex, 0, moved);
        UpdateItems({
          type: LIST_ACTION.MOVE,
          newList: updated
        }) ;
      },
      onMove: (evt) => {
        console.log("wdqdq:", evt.item); // check what is cloned
      },
    });

    return () => sortable.destroy();
  }) ;





  //////////////////////////
  //////// FEATURES ////////
  //////////////////////////

  /**
   * Adds a new item to the END of the list.
   * @param { String } newItemCtnt content of the new item
   */
  function AddItem(newItemCtnt) {
    if ( newItemCtnt.trim() === "" ) {
      PopUpMsg( "error", "New item contents must NOT be empty" ) ;
      return ;
    } // if input of item content is empty

    UpdateItems( { type: LIST_ACTION.ADD, newItemContent: newItemCtnt } ) ;
  } // AddItem()

  /**
   * Updates a specific item in the list.
   * @param { String } itemToEdit item to replace
   */
  function EditItem(itemToEdit) {
    if ( itemToEdit.content.trim() === "" ) {
      alert("No empty entries is allowed") ;
      return ;
    } // if content is empty (including the one of mere spaces)

    UpdateItems( { type: LIST_ACTION.CHANGE, newItem: itemToEdit } ) ;
  } // EditItem()

  /**
   * Removes a specific item in the list
   * @param {Number} id ID of the item to be deleted
   */
  function RemoveItem(id) {
    UpdateItems( { type: LIST_ACTION.REMOVE_ITEM, id: id } ) ;
  } // RemoveItem()

  function openFile() {
    return new Promise( (resolve, reject) => {
      const input = document.createElement("input") ;
      input.type = "file" ;
      input.accept = '.txt' ;

      input.onchange = () => {
        const file = input.files[0] ;

        ( ! file ) ? reject( "No file selected" ) :
        ( file.type === "text/plain" ) ? resolve(file) :
        reject( new FileTypeError(`Imported file "${file.name}" is not a plain text file`) ) ;
      } ;

      // Trigger the file input
      input.click();
    }) ;
  } // openFile()

  function ExportList() {
    try {
      if ( GetLocalListState() === null ) throw Error( "NOSS" ) ;
      Swal.fire({
        title: "Enter name to download the list",
        input: "text",
        inputPlaceholder: "default: to-do list",
        showCancelButton: true,
      }).then( function(resp) {
        if ( ! resp.isDismissed ) {
          let sout = "" ;                                              // text contents to store to file
          for ( let i = 0 ; i < items.length ; i++ ) {
            sout = sout.concat( items[i].content, ',', items[i].checked.toString() ) ;
            if ( i + 1 !== items.length ) sout = sout.concat('\r\n') ; // line break for each line-reading
          } // for: all items in a file

          const blob = new Blob( [sout], { type: "text/plain" } ) ;           // export type: plain text
          const link = document.createElement( "a" ) ;                        // create a temporary link
          link.href = URL.createObjectURL( blob ) ;                           // create URL object
          link.download = ( resp.value === "" ) ? "to-do list" : resp.value ; // generate file name

          // Append link to the document and trigger download
          document.body.appendChild( link ) ;
          link.click() ;

          // Clean up after
          document.body.removeChild( link ) ;
          URL.revokeObjectURL( link.href ) ; // Clean up
        } // edition permitted
      }) ;
    } catch ( err ) {
      console.log(err.type) ;
      PopUpMsg( "error", "Failed to save file." ) ;
    } // catch:
  } // ExportList()

  async function ImportList() {
    try {
      const file = await openFile() ;
      const text = await file.text() ;
      const lines = text.split( "\r\n" ) ; // to split file content into lines
      const newList = [] ;

      for ( let nLine = 1 ; nLine <= lines.length ; nLine++ ) {
        let curLine = lines[ nLine - 1 ] ;
        if ( curLine !== "" ) {
          let finCmaIdx = curLine.lastIndexOf(",") ;            // find the final comma on the current line
          let ctnt = curLine.slice( 0, finCmaIdx ).trim() ;     // item's contents
          let checked = curLine.slice( finCmaIdx + 1 ).trim() ; // item's checkbox status
          if ( ctnt === "" ) {
            throw new FileContentError( // pointing out the empty contents
              `<p style="text-align: left;">Error happened when reading line
              ${nLine}:<br><br><code>${curLine}</code><br><br>
              The item contents must NOT be empty.</p>`
            ) ;
          } // if the item contents is EMPTY
          else if ( checked !== "true" && checked !== "false" ) {
            throw new FileContentError( // pointing out the invalid/missing checkbox status
              `<p style="text-align: left;">
              Error happened when reading line ${nLine}:<br><br><code>${curLine}</code><br><br>
              The checked status must be 'true' or 'false'.<br><br>
              Instead, we received ${ ( finCmaIdx !== -1 ) ? "" : "there is"}
              ${ ( finCmaIdx !== -1 ) ? `'${checked}'` : "no checked status" }</p>`
            ) ;
          } // if the checked property is NEITHER true nor false
          else {
            newList.push( ListItem( ctnt, checked === "true" ) ) ;
          } // else: both the contents and the checked status are present
        } // Skip empty lines
      } // check every line in the imported file

      return new Promise( async (resolve) => {
        if ( items.length > 0 ) {
          Swal.fire({
            allowEscapeKey: false,
            allowOutsideClick: false,
            title: 'Import list file?',
            html: 'It will overwrite the list and become unrecoverable.<br>Would you like to continue?',
            showCancelButton: true
          }).then( async function( wantToLoadFile ) {
            if ( wantToLoadFile.isConfirmed ) {
              UpdateItems( { type: LIST_ACTION.IMPORT, newList: newList } ) ;
              PopUpMsg( "success", "List imported successfully" ) ;
              resolve() ;
            } // if: the user clicks yes
            else console.log( "Declined to update the list" ) ;
          }) ;
        } else {
          UpdateItems( { type: LIST_ACTION.IMPORT, newList: newList } ) ;
          PopUpMsg( "success", "List imported successfully" ) ;
          resolve() ;
        }
      }) ;
    } // try
    catch (err) {
      if ( err instanceof FileContentError )   // occurs if found errors
        PopUpMsg( "error", err.message, true ) ;
      else if ( err instanceof FileTypeError ) // occurs when file type is not plain text
        PopUpMsg( "error", err.message, true ) ;
      else if ( err.name !== "AbortError" )    // occurs while choosing a file
        PopUpMsg( "error", "Cannot import list from the file" ) ;
    } // catch
  } // ImportList()

  /**
   * Removes all items in the list.
   */
  function DeleteList() {
    if ( items.length > 0 ) {
      Swal.fire({
        allowEscapeKey: false,
        allowOutsideClick: false,
        title: 'Delete list?',
        html: 'Doing so will remove all items and cannot be undone.<br>Would you like to continue?',
        showCancelButton: true,
      }).then( async function( wantToDelete ) {
        if ( wantToDelete.isConfirmed ) {
          UpdateItems( { type: LIST_ACTION.DELETE_LIST } ) ;
          ClearLocalListState() ;
          PopUpMsg( "success", "To-do list cleared" ) ;
        }
      }) ;
    } // if
    else {
      PopUpMsg( "error", "There are no items in this list." ) ;
    } // else
  } // DeleteList()

  /**
   * Sort all list items by content.
   * 
   * the final result is in an ascending order.
   * @param mode order of the final result; may be `ascending` or `descending`
   */
  function SortItemsByContent(mode) {
    const newList = items ;
    newList.sort( ( a, b ) => {
      const nameA = a.content ;
      const nameB = b.content ;
      if ( nameA < nameB ) return ( mode === ORDER.ASCENDING ) ? -1 : 1 ;
      if ( nameA > nameB ) return ( mode === ORDER.ASCENDING ) ? 1 : -1 ;

      // names must be equal
      return 0 ;
    }) ;

    UpdateItems( { type: LIST_ACTION.SORT, newList: newList } ) ;
    console.log("SORT MODE CONTENT DONE") ;
  } // SortItemsByContents()

  /**
   * Sort all list items by checkbox status.
   * 
   * @param mode order of the final result; may be `ascending` or `descending`
   */
  function SortItemsByCheckStatus(mode) {
    const newList = items ;

    if ( mode === ORDER.ASCENDING ) newList.sort( ( a, b ) => a.checked - b.checked ) ;
    else newList.sort( ( a, b ) => b.checked - a.checked ) ;

    UpdateItems( { type: LIST_ACTION.SORT, newList: newList } ) ;
    console.log("SORT MODE CHECK STATUS DONE") ;
  } // SortItemsByCheckStatus()

  async function SortListItemsMode( prop, mode ) {
    console.clear() ;
    if ( prop === ITEM_PROPERTY.CONTENT ) {
      SortItemsByContent(mode) ;
    } // if: sort by item content
    else if ( prop === ITEM_PROPERTY.CHECKBOX_STATUS ) {
      SortItemsByContent( ORDER.ASCENDING ) ;
      SortItemsByCheckStatus(mode) ;
    } // else if: sort by checkbox status
    else console.log("Failed to sort items") ;
    console.log("SORT MODE DONE") ;
  } // SortListItems()

  async function SortListItems(mode) {
    const sortMode = mode ;
    if ( sortMode === "magnitude-asc" )
      await SortListItemsMode( ITEM_PROPERTY.CONTENT, ORDER.ASCENDING ) ;
    else if ( sortMode === "magnitude-desc" )
      await SortListItemsMode( ITEM_PROPERTY.CONTENT, ORDER.DESCENDING ) ;
    else if ( sortMode === "checkbox-stat-asc"  )
      await SortListItemsMode( ITEM_PROPERTY.CHECKBOX_STATUS, ORDER.ASCENDING ) ;
    else if ( sortMode === "checkbox-stat-desc" )
      await SortListItemsMode( ITEM_PROPERTY.CHECKBOX_STATUS, ORDER.DESCENDING ) ;
    else throw Error(`Sort mode ${mode} not valid.`) ;
  } // SortListItems()

  return (
    <>
      {/* COMPONENT I. INPUT WRAPPER */}
      <AddItemSection onAddItem={AddItem} />

      {/* COMPONENT II. BUTTON WRAPPER */}
      <ButtonSet onClickExport={ExportList} onClickImport={ImportList} onClickDelete={DeleteList} />

      {/* COMPONENT III. DROPDOWN LIST */}
      <div className={`dropdown${items.length > 0 ? "" : " disabled"}`} >
        {"Sort items from "}
        <div className="dropdown">
          <button
            className={`dropdown-toggle${items.length > 0 ? "" : " disabled"}`}
            aria-haspopup="true"
            aria-expanded={isOpen}
            ref={menuRef}
            onClick={ () => 
              items.length > 0 && setIsOpen( !isOpen )
            }>
            {selected}
          </button>
          {isOpen && (
            <ul className="dropdown-menu" role="listbox">
              {SORT_MODE.map( mode => (
                <li /* Sort mode */
                  key={mode.name}
                  role="option"
                  aria-selected="false"
                  onClick={ () => {
                    setSelected(mode.name) ;
                    setIsOpen(false) ;
                    SortListItems(mode.sortMode) ;
                  }}>
                  {mode.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* COMPONENT IV. TO-DO LIST BUFFER */}
      <div id="buffer" ref={listRef}>
        {
          items.map( item =>
            <li key={item.id}>
              <ItemCard
                item={item}
                onEditItemCtnt={EditItem}
                onToggleItem={EditItem}
                onRemoveItem={RemoveItem}
              />
            </li>
          )
        }
      </div>
    </>
  ) ;
} // ToDoList_Page1_ToDoList

export default TODOLIST_PAGE1_TODOLIST ;