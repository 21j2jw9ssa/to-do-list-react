function ButtonSet( { onClickExport, onClickImport, onClickDelete } ) {
  return (
    <div className="btn-container">
			<button id="exportFile" title="export list" className="listFunc" onClick={ onClickExport } >
        export list
      </button>
			<button id="importFile" title="import list" className="listFunc" onClick={ onClickImport } >
        import list
      </button>
			<button id="deleteList" title="delete list" className="listFunc" onClick={ onClickDelete } >
        delete list
      </button>
		</div>
  ) ;
} // ButtonSet()

export default ButtonSet ;