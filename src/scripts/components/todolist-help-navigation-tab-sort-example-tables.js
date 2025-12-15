import MakeId from "./todolist-global-functions" ;

/**
 * List sorting samples illustrated using tables
 * @param {{ctnt: Number, checked: Boolean}} tab1 table before sorting 
 * @param {{ctnt: Number, checked: Boolean}} tab2 table after sorting 
 * @returns a view on a example list, before and after sorting
 */
const SortExampleTables = function( { tab1, tab2 } ) {
  return (
    <div className="table-row">
      <div className="example-wrapper">
        <p>Before sorting:</p>
        <table>
          <thead>
            <tr>
              <th>checkbox</th>
              <th>item</th>
            </tr>
          </thead>
          <tbody>
            {
              tab1.map( item =>
                <tr key={MakeId()}>
                  <td>{ item.checked ? "V" : "▢" }</td>
                  <td>{ item.ctnt }</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
      <div className="example-wrapper">
        <p>After sorting:</p>
        <table>
          <thead>
            <tr>
              <th>checkbox</th>
              <th>item</th>
            </tr>
          </thead>
          <tbody>
            {
              tab2.map( item =>
                <tr key={MakeId()}>
                  <td>{ item.checked ? "V" : "▢" }</td>
                  <td>{ item.ctnt }</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  ) ;
} // SortExampleTables()

export { SortExampleTables } ;