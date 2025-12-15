import ItemCard from "../components/todolist-global-item-card" ;
import { useState } from "react" ;
import NavTabs from "../components/todolist-help-navigation-tab" ;
import { SortExampleTables } from "../components/todolist-help-navigation-tab-sort-example-tables" ;

import '../../styles/todolist-help-style.css'; // UI for help guide

const MESSAGE_BLOCK_TYPE = {
  CAUTION: "caution",
  WARNING: "warning",
  NOTE: "note",
  INFO: "info",
} // MESSAGE_BLOCK_TYPE

/**
 * Item examples for sorting demonstrations
 * 
 * @param {string} item sample item content
 * @param {boolean} checked whether this item has been checked 
 * @returns {{ctnt: string, checked: boolean}} a sample item for the "basic components" section
 */
function ITEMS_FOR_SORT_DISPLAY( item, checked ) {
  return { ctnt: item, checked: checked } ;
} // ITEMS_FOR_SORT_DISPLAY()

/**
 * Generates a link to a given instruction
 * @param {string} link link to a given instruction
 * @returns a link to a given instruction
 */
const linkToInstruction = link => `${window.location.href}${link}` ;

/**
 * Samples for the 'Import list' section
 * 
 * Showing common syntax mistakes when attempting to import a to-do list
 */
const ListSyntaxErrSamples = [
  (
    <>
      <h3>Case: checkbox status not valid</h3>
			<p>
				If an item's checkbox status is neither <code>true</code> nor <code>false</code>,<br/>
				there is no way to tell whether it's done or not.
			</p>
			<p>An item with checkbox status neither true nor false results in an error.</p>
			<p>For example:</p>
			<code className="examples">
				<div>Line</div>
				<div>1 | John, false</div>
				<div>2 | Jessica, true</div>
				<div>3 | Albert, false, folk</div>
				<div>4 | Simon, trust</div>
				<div>5 | Billy, true</div>
				<div>6 | Paul, fault</div>
			</code>
			<p>
				The first error will be found on line 3<br/>
				because while the item's content is present, i.e. 'Albert, false',<br/>
				its checkbox status is 'folk', which is neither true nor false.
			</p>
    </>
  ),
  (
    <>
			<h3>Case: item's content is empty (no sided spaces)</h3>
			<p>
				An item must have a content: it's essential part of the list.
        Not giving content of an item results in an error.
			</p>
			<p>For example:</p>
			<code className="examples">
				<div>Line</div>
				<div>1 | sweets, true</div>
				<div>2 | crisps, true</div>
				<div>3 | maize, false</div>
				<div>4 | Simon, false</div>
				<div>5 | capsicum, true</div>
				<div>6 | salmon, false</div>
				<div>7 | &nbsp;&nbsp;,false</div>
				<div>8 | ice lolly, false</div>
			</code>
			<p>
				The first error will be found on line 7<br/>
				because after getting rid of spaces from both sides of the item's contents,
        the item is simply empty.
			</p>
    </>
  ),
  (
    <>
			<h3>Case: missing checkbox status</h3>
			<p>An item must have a checkbox status in order to tell if it's done or not.</p>
			<p>Not giving a checkbox status of a item results in an error.</p>
			<p>For example:</p>
			<code className="examples">
				<div>Line</div>
				<div>1 | screw, false</div>
				<div>2 | hammer, folk,</div>
				<div>3 | turpet, true</div>
				<div>4 | tape, trust</div>
				<div>5 | helmet, 			</div>
				<div>6 | drill, fault</div>
				<div>7 | tractor, fault</div>
				<div>8 | vibrator, fault</div>
				<div>9 | steel, fault</div>
			</code>
			<p>
				The first error will be found on line 2<br/>
				because while the item's content is present, i.e. '<strong>hammer, folk</strong>',<br/>
				its checkbox status is not given.
			</p>
    </>
  )
] ;

const listSampleForSort = [
  ITEMS_FOR_SORT_DISPLAY( "spinach", true ),
  ITEMS_FOR_SORT_DISPLAY( "capsicum", false ),
  ITEMS_FOR_SORT_DISPLAY( "aubergine", true ),
  ITEMS_FOR_SORT_DISPLAY( "celery", false ),
  ITEMS_FOR_SORT_DISPLAY( "mushroom", true ),
] ;

Object.freeze(
  MESSAGE_BLOCK_TYPE,
  ITEMS_FOR_SORT_DISPLAY,
  listSampleForSort,
  ListSyntaxErrSamples
) ;

export default function TODOLIST_PAGE2_HELP_GUIDE() {
  // Sample item
  const [itemCtnt, setItemCtnt] = useState({
    content: "Sample",
    id: "SAMPLE",
    checked: false
  }) ;

  function EditItem( itemToEdit ) {
    if ( itemToEdit.content.trim() === "" ) {
      alert("No empty entries is allowed") ;
      return ;
    } // if content is empty (including the one of mere spaces)

    setItemCtnt({
      ...itemCtnt,
      content: itemToEdit.content,
      checked: itemToEdit.checked
    }) ;
  } // EditItem()

  /**
   * A menu guide for to-do list assistance.
   * @returns a menu guide
   */
  function TableOfContents() {
    return (
      <article id="table-of-contents">
        <div id="toc_title">Table of contents</div>
        <div id="contents">
          <li name="Basic components of an item">
            <a title="Basic components of an item" href={ linkToInstruction("#basic-components-of-an-item") }>Basic components of an item</a>
            <ul className="table-of-contents-subtitle">
              <li name="Add item">
                <a title="Add item" href={"#add-item"}>Add item</a>
              </li>
              <li name="Remove item">
                <a title="Remove item" href={ linkToInstruction("#remove-item") }>Remove item</a>
              </li>
              <li name="Edit item">
                <a title="Edit item" href={ linkToInstruction("#edit-item") }>Edit item</a>
              </li>
              <li name="Check or uncheck item">
                <a title="Check or uncheck item" href={ linkToInstruction("#check-or-uncheck-item") }>Check/uncheck item</a>
              </li>
              <li name="Move item">
                <a title="Move item" href={ linkToInstruction("#move-item") }>Move item</a>
              </li>
            </ul>
          </li>
          <li name="Sort items">
            <a title="Sort items" href={ linkToInstruction("#sort-items") }>Sort items</a>
            <ul className="table-of-contents-subtitle">
              <li name="Smallest to largest">
              <a title="Smallest to largest" href={ linkToInstruction("#sort-items-magnitude-asc") }>
                Smallest to largest
              </a>
              </li>
              <li name="Largest to smallest">
              <a title="Largest to smallest" href={ linkToInstruction("#sort-items-magnitude-desc") }>
                Largest to smallest
              </a>
              </li>
              <li name="Latest done to earliest done">
              <a title="Latest done to earliest done" href={ linkToInstruction("#sort-items-checkbox-status-asc") }>
                Latest done to earliest done
              </a>
              </li>
              <li name="Earliest done to latest done">
              <a title="Earliest done to latest done" href={ linkToInstruction("#sort-items-checkbox-status-desc") }>
                Earliest done to latest done
              </a>
              </li>
            </ul>
          </li>
          <li name="Delete list">
            <a title="Delete list" href={ linkToInstruction("#delete-list") }>Delete list</a>
          </li>
          <li name="Export list">
            <a title="Export list" href={ linkToInstruction("#export-list") }>Export list</a>
          </li>
          <li name="Import list">
            <a title="Import list" href={ linkToInstruction("#import-list") }>Import list</a>
          </li>
          <li name="How a list is saved">
            <a title="How a list is saved" href={ linkToInstruction("#how-a-list-is-saved") }>How a list is saved</a>
          </li>
        </div>
      </article>
    ) ;
  } // TableOfContents()

  /**
   * A block that tells users what to keep in mind.
   * @param { MESSAGE_BLOCK_TYPE } type type of message block
   * @param { JSX.Element } children HTML structure inside this block message
   * @returns a message block structure
   */
  function ImportantBlockMessage({ type, children }) {
    // title of message block
    const title =
      type === MESSAGE_BLOCK_TYPE.CAUTION ? "Caution!" :
      type === MESSAGE_BLOCK_TYPE.WARNING ? "Warning" :
      type === MESSAGE_BLOCK_TYPE.NOTE ? "Note" : "Info" ;

    // icon to use for this message block
    const icon = `UI icons/${
      type === MESSAGE_BLOCK_TYPE.CAUTION ? "dangerous" :
      type === MESSAGE_BLOCK_TYPE.WARNING ? "warning":
      type === MESSAGE_BLOCK_TYPE.NOTE ? "lightbulb" : "info"}.svg` ;

    const imgDscr =
      type === MESSAGE_BLOCK_TYPE.CAUTION ? "danger sign" :
      type === MESSAGE_BLOCK_TYPE.WARNING ? "warning sign" :
      type === MESSAGE_BLOCK_TYPE.NOTE ? "note sign" : "info sign" ;

    // message block structure
    return (
      <div className={`important-block ${type}`}>
        <h3 className="block-type">
          <i className="material-symbols-rounded">
            <img height="26" width="26" title={imgDscr} alt={imgDscr} src={icon} />
          </i>
          {title}
        </h3>
        <p>
          {children}
        </p>
      </div>
    ) ;
  } // ImportantBlockMessage()

  function ITEM_EXPLANATION_0_COMPONENTS() {
    return (
      <dl>
        {/* ITEM PART 0: DRAG INDICATORS */}
        <dt className="description-title">
          The
          <i className="material-symbols-rounded">
            <img height="30" width="30" title="drag indicator used to drag an item"
                 alt="drag to move and drop this item"
                 src="UI icons/drag_indicator.svg" />
          </i>
          icon
        </dt>
        <dd>
          Can be used to drag an entire item and drop it at a specific position.
        </dd>

        {/* ITEM PART 1: CONTENT */}
        <dt className="description-title">Item content</dt>
        <dd>The essential part of an item to clarify what to be done.</dd>

        {/* ITEM PART 2: THE CHECKBOX */}
        <dt className="description-title">
          The checkbox
          <label className="checkbox-container sample-checkbox">
            <input type="checkbox" name="sample-input" className="done" disabled />
            <span className="checkmark"></span>
          </label>
        </dt>
        <dd>
          Used to toggle the status of the item.
        </dd>
        <dd>
          When clicked, it switches between
          <label className="checkbox-container sample-checkbox">
            <input type="checkbox" name="sample-input" className="done" disabled />
            <span className="checkmark"></span>
          </label>
          and
          <label className="checkbox-container sample-checkbox">
            <input type="checkbox" name="sample-input" className="done" checked disabled />
            <span className="checkmark"></span>
          </label>.
        </dd>
        <dd>A checkbox's binary status:</dd>
        <dd>
          <label className="checkbox-container sample-checkbox first">
            <input type="checkbox" name="sample-input" className="done" disabled />
            <span className="checkmark"></span>
          </label>:
          item is not yet done; its content is purely black.
        </dd>
        <dd>
          <label className="checkbox-container sample-checkbox first">
            <input type="checkbox" name="sample-input" className="done" checked disabled />
            <span className="checkmark"></span>
          </label>:
          item has already been done; its content is gray and crossed out.
        </dd>

        {/* ITEM PART 3: THE EDIT ICON */}
        <dt className="description-title">
          The
          <i className="material-symbols-rounded" data-type-name="edit">
            <img height="30" width="30" alt="check" src="UI icons/edit_square.svg" />
          </i>
          icon
        </dt>
        <dd>
          Allows a user to edit a specific item.
          <p>When being editted, an item will show the elements below:</p>
          <dl>
            <dt className="description-title">
              The
              <i className="material-symbols-rounded" data-type-name="edit">
                <img height="30" width="30" alt="confirm edit" src="UI icons/check.svg" />
              </i>
              icon
            </dt>
            <dd>
              Save its final content status as a specific item's new content.
              <ImportantBlockMessage type={MESSAGE_BLOCK_TYPE.NOTE}>
                It also can be done by pressing <kbd>Enter</kbd>.
              </ImportantBlockMessage>
            </dd>
            <dt className="description-title">
              The
              <i className="material-symbols-rounded" data-type-name="edit">
                <img height="30" width="30" alt="discard edit" src="UI icons/cancel.svg" />
              </i>
              icon
            </dt>
            <dd>
              Discard edits over a specific item.
              <ImportantBlockMessage type={MESSAGE_BLOCK_TYPE.NOTE}>
                It can also be done by pressing <kbd>Esc</kbd>.<br/>
                Once canceled, all edits over the specific item will not be saved.
              </ImportantBlockMessage>
            </dd>
          </dl>
        </dd>

        {/* ITEM PART 4: THE DELETE ICON */}
        <dt className="description-title">
          The
          <i className="material-symbols-rounded" data-type-name="remove">
            <img height="30" width="30" alt="delete item" src="UI icons/delete.svg" />
          </i>
          icon
        </dt>
        <dd>Allows a user to delete a specific item.</dd>
      </dl>
    ) ;
  } // ITEM_EXPLANATION_0_COMPONENTS()

  function ITEM_EXPLANATION_1_ADD_ITEM() {
    return (
      <div id="add-item" className="instructions-item-manipulation">
        <h3>Add item</h3>
        <p>
          Click the <b>'Add item'</b> button to add an item to the list at a time.<br/>
          It can be done by pressing <kbd>Enter</kbd>, too.
        </p>
        <p>
          An item to be added must not be empty.<br/>
          An item that is made up of <strong>space(s) only</strong> is not acceptable, either.
        </p>
        For example:
        <table>
          <thead>
            <tr>
              <th scope="col">example</th>
              <th scope="col">OK?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Good morning</td>
              <td>OK</td>
            </tr>
            <tr>
              <td>biscuits</td>
              <td>OK</td>
            </tr>
            <tr>
              <td>But I'm OK!</td>
              <td>OK</td>
            </tr>
            <tr>
              <td>'' (empty)</td>
              <td><strong>NOT OK</strong></td>
            </tr>
            <tr>
              <td>' ' (a space)</td>
              <td><strong>NOT OK</strong></td>
            </tr>
            <tr>
              <td>'&nbsp;&nbsp;&nbsp;&nbsp;' (spaces only)</td>
              <td><strong>NOT OK</strong></td>
            </tr>
          </tbody>
        </table>
        <ImportantBlockMessage type={MESSAGE_BLOCK_TYPE.CAUTION} >
          Avoid typing something associated with your identity and privacy.<br/>
          Doing so may compromise your personal info security.
        </ImportantBlockMessage>
      </div>
    ) ;
  } // ITEM_EXPLANATION_1_ADD_ITEM()

  function ITEM_EXPLANATION_2_REMOVE_ITEM() {
    return (
      <div id="remove-item" className="instructions-item-manipulation">
        <h3>Remove item</h3>
        <p>
          Click the
          <i className="material-symbols-rounded" data-type-name="remove">
            <img height="30" width="30" alt="delete item" src="UI icons/delete.svg" />
          </i>
          icon to remove a specific item in the list.
        </p>
        <p>Once removed, it also updates the to-do list.</p>
        <p>
          Keep it in mind this action cannot be undone once an item gets removed.
        </p>
      </div>
    ) ;
  } // ITEM_EXPLANATION_2_REMOVE_ITEM()

  function ITEM_EXPLANATION_3_EDIT_ITEM() {
    return (
      <article id="edit-item" className="instructions-item-manipulation">
        <h3>Edit item</h3>
        <p>
          Click the
          <i className="material-symbols-rounded"  data-type-name="edit">
            <img height="30" width="30" alt="edit square" src="UI icons/edit_square.svg" />
          </i>
          icon to edit an specific item's content.
        </p>
        <p>The new content must be neither empty nor mere spaces.</p>
        <p>Once editted, it updates its parent item and the to-do list.</p>
      </article>
    ) ;
  } // ITEM_EXPLANATION_3_EDIT_ITEM()

  function ITEM_EXPLANATION_4_CHECK_ITEM() {
    return (
			<article id="check-or-uncheck-item" className="instructions-item-manipulation">
				<h3>Check/uncheck item</h3>
				<p>
					Click the
					<label className="checkbox-container sample-checkbox">
						<input type="checkbox" name="sample-input" className="done" disabled />
						<span className="checkmark"></span>
					</label>
					icon to switch between
					<label className="checkbox-container sample-checkbox">
						<input type="checkbox" name="sample-input" className="done" disabled />
						<span className="checkmark"></span>
					</label>
					and
					<label className="checkbox-container sample-checkbox">
						<input type="checkbox" name="sample-input" className="done" checked disabled />
						<span className="checkmark"></span>
					</label>.
				</p>
				<p>
					By (un)checking it, it also updates its parent item and the to-do list.
				</p>
			</article>
    ) ;
  } // ITEM_EXPLANATION_4_CHECK_ITEM()

  function ITEM_EXPLANATION_5_DRAG_ITEM() {
    return (
      <article id="move-item" className="instructions-item-manipulation">
        <h3>Move item</h3>
        <p>
          Drag the
          <i className="material-symbols-rounded" data-type-name="drag">
            <img height="30" width="30" title="drag indicator used to drag an item"
                 alt="drag to move and drop this item"
                 src="UI icons/drag_indicator.svg" />
          </i>
          icon to move the item to somewhere in the list.
        </p>
        <p>
          As the currently dragged item sweeps through other items,<br/>
          they may move either up or down together.
        </p>
        <p>
          Once the currently dragged item gets dropped,<br/>
          it locates at the closest fixed spot in the list.
        </p>
        <p>
          It will update the list once the dragging item gets dropped.
        </p>
      </article>
    ) ;
  } // ITEM_EXPLANATION_5_DRAG_ITEM()

  function SortItemsExplanation() {
    return (
      <article>
        <h2 className="subtitle">Sort items</h2>
        <p>
          Sorts all items in the list by a specific property such as contents and checkbox status.
        </p>
        <p>
          By default, the list is empty.
          That is, the dropdown list is not for use at this state, like this:
        </p>
        <div>
          <img className="image-dropdown" src="images/dropdown_disabled.png" alt="disabled dropdown list" />
        </div>
        <p>
          To enable the dropdown list, that is,
        </p>
        <div>
          <img className="image-dropdown" src="images/dropdown_enabled.png" alt="enabled dropdown list" />
        </div>
        <p>
          there should be at least one item in the list.<br/>
          To do so, import a to-do list or add an item to the list.
        </p>
        <p>There are four ways to sort items:</p>
        <div id="sort-items-magnitude-asc" className="instructions-sort-items-mode">
          <b className="h3">Smallest to largest</b>
          <p>
            Arranges all items from smallest to largest,<br/>i.e. A to Z, a to z, 0 to 9, etc.
          </p>
          <strong>After sorting</strong><br/>
          <p>
            The greater an item is, the closer it is to the bottom of the list;<br/>
            the smaller an item is, the closer it is to the top of the list.
          </p>

          <p>Take the following list for example:</p>
          <SortExampleTables
            tab1={listSampleForSort}
            tab2={[...listSampleForSort].sort(
              (a, b) => a.ctnt > b.ctnt ? 1 : a.ctnt < b.ctnt ? -1 : 0
            )}
          />
        </div>
        <div id="sort-items-magnitude-desc" className="instructions-sort-items-mode">
          <b className="h3">Largest to smallest</b>
          <p>
            Arranges all items from largest to smallest,<br/>i.e. Z to A, z to a, 9 to 0, etc.
          </p>
          <strong>After sorting</strong><br/>
          <p>
            The greater an item is, the closer it is to the top of the list;<br/>
            the smaller an item is, the closer it is to the bottom of the list.
          </p>
          <p>Take the following list for example:</p>
          <SortExampleTables
            tab1={listSampleForSort}
            tab2={[...listSampleForSort].sort(
              (a, b) => a.ctnt > b.ctnt ? -1 : a.ctnt < b.ctnt ? 1 : 0
            )}
          />
        </div>
        <div id="sort-items-checkbox-status-asc" className="instructions-sort-items-mode">
          <b className="h3">Latest done to earliest done</b>
          <p>
            Arranges all items from smallest to largest, then
            arranges them again by checkbox status from latest done to earliest done.
          </p>
          <strong>After sorting</strong><br/>
          <p>
            The items that are already done are all placed after the things that are yet done.
            Items in both groups are ordered from smallest to largest.
          </p>
          <p>Take the following list for example:</p>
          <SortExampleTables
            tab1={listSampleForSort}
            tab2={[...listSampleForSort].sort( (a, b) => {
              return ( a.checked > b.checked ) ? 1 : ( a.checked < b.checked ) ? -1 :
                     ( a.ctnt > b.ctnt ) ? 1 : ( a.ctnt < b.ctnt ) ? -1 : 0 ;
            })}
          />
        </div>
        <div id="sort-items-checkbox-status-desc" className="instructions-sort-items-mode">
          <b className="h3">Earliest done to latest done</b>
          <p>
            Arranges all items from smallest to largest, then
            arranges them again by checkbox status from earliest done to latest done.
          </p>
          <strong>After sorting</strong><br/>
          <p>
            The items that are already done are all placed before the things that are yet done.
            Items in both groups are ordered from smallest to largest.
          </p>
          <p>Take the following list for example:</p>
          <SortExampleTables
            tab1={listSampleForSort}
            tab2={[...listSampleForSort].sort( (a, b) => {
              return ( a.checked > b.checked ) ? -1 : ( a.checked < b.checked ) ? 1 :
                     ( a.ctnt > b.ctnt ) ? 1 : ( a.ctnt < b.ctnt ) ? -1 : 0 ;
            })}
          />
        </div>
      </article>
    ) ;
  } // SortItemsExplanation()

  function DeleteListExplanation() {
    return (
      <article>
        <h2 className="subtitle">Delete list</h2>
			  <p>
          Removes all items in the list.<br/>
          It also clear the list saved in the browser.<br/>
			  </p>
        <ImportantBlockMessage type={MESSAGE_BLOCK_TYPE.WARNING}>
          This action cannot be undone.
        </ImportantBlockMessage>
      </article>
    ) ;
  } // DeleteListExplanation

  function ExportListExplanation() {
    return (
      <article>
				<h2 className="subtitle">Export list</h2>
				<p>
					Exports all items in the list in a text file.<br/>
					All items in this list can be seen in the exported file.
				</p>
				<p>
					By default, it should appear in the "Downloads" folder in your coumputer.
				</p>
				<p>
					Once exported, the file looks like the following:<br/>
        </p>
				<code className="examples">
					<div>item1, checked1</div>
					<div>item2, checked2</div>
					<div>item3, checked3</div>
					<div>...</div>
					<div>itemN, checkedN</div>
				</code>
				<p>
					where for each item,<br/>
					<code>itemN</code> is the contents,<br/>
					and <code>checkedN</code> is the checkbox status (true or false only).<br/>
				</p>
      </article>
    ) ;
  } // ExpoerListExplanation()

  function ImportListExplanation() {
    return (
      <article>
        <h2 className="subtitle">Import list</h2>
				<p>
					Imports the list from a file.<br/>
					A file to import must be a <strong>text file</strong>
          , i.e. ends with <code>.txt</code>.<br/>
					Any attempt to load a file that doesn't end
          with <code>.txt</code> results in an error.
				</p>
				<p>
					Generally, a file picker jumps out and asks a user to pick a file.<br/>
					If possible, select the filter with TXT files so that only text files can be selected.<br/>
					If not, select a file that ends with <code>.txt</code>.
				</p>
				<p>Make sure the file to import follows the following pattern:</p>
				<code className="examples">
					<div>item1, checked1</div>
					<div>item2, checked2</div>
					<div>item3, checked3</div>
					<div>...</div>
					<div>itemN, checkedN</div>
				</code>
				<p>
					where for each specific item,<br/>
					<code>itemN</code> is the contents,<br/>
					and <code>checkedN</code> is
          the checkbox status (true or false only).<br/>
				</p>
				<p>
					Any flaws found in the file results in an error,<br/>
					pointing out the line where the first error is found.
				</p>
				<p>Look at the following cases:</p>
        <NavTabs
          tabInfoList={[
            { name: "case 1", ctnt: ListSyntaxErrSamples[0] },
            { name: "case 2", ctnt: ListSyntaxErrSamples[1] },
            { name: "case 3", ctnt: ListSyntaxErrSamples[2] },
          ]}
        />
      </article>
    )
  } // ImportListExplanation()

  function SaveListExplanation() {
    return (
      <article>
        <h2 className="subtitle">How a list is saved</h2>
        <p>
          As long as any item in the list gets modified,
          it also updates the list.
        </p>
        <p>
          Note that, however, the list is saved only on a local device where modifications are made.
        </p>
        <p>
          For example, a list saved in computer A will be available in computer A and nothing else.
        </p>
        <p>
          Once clearing the browser's history, the list will be destroyed, too.
        </p>
        <ImportantBlockMessage type={MESSAGE_BLOCK_TYPE.WARNING}>
          Once the list gets destroyed, there is no way to get it back.
        </ImportantBlockMessage>
      </article>
    )
  } // SaveListExplanation()

  return (
    <section>
      <h1 className="title">How to use To-do List</h1>

      <TableOfContents />

      <ul id="instructions">
        <li id="basic-components-of-an-item" className="instruction-section">
          <article>
            <h2 className="subtitle">Basic components of an item</h2>
            <p>Each item looks like the following:</p>
            <ItemCard
              key={ itemCtnt.id }
              item={ itemCtnt }
              onEditItemCtnt={ EditItem }
              onToggleItem={ EditItem }
              onRemoveItem={ () => console.log("SAMPLE ITEM CANNOT BE DELETED") }
            />
            <ITEM_EXPLANATION_0_COMPONENTS/>
            <p>
              With the basic components of an item explained,<br/>
              you may check out features in an item below.
            </p>
            <ITEM_EXPLANATION_1_ADD_ITEM/>
            <ITEM_EXPLANATION_2_REMOVE_ITEM/>
            <ITEM_EXPLANATION_3_EDIT_ITEM/>
            <ITEM_EXPLANATION_4_CHECK_ITEM/>
            <ITEM_EXPLANATION_5_DRAG_ITEM/>
          </article>
        </li>
        <li id="sort-items" className="instruction-section">
          <SortItemsExplanation />
        </li>
        <li id="delete-list" className="instruction-section">
          <DeleteListExplanation />
        </li>
        <li id="export-list" className="instruction-section">
          <ExportListExplanation />
        </li>
        <li id="import-list" className="instruction-section">
          <ImportListExplanation />
        </li>
        <li id="how-a-list-is-saved" className="instruction-section">
          <SaveListExplanation />
        </li>
      </ul>
    </section>
  ) ;
} // TODOLIST_PAGE2_HELP_GUIDE()