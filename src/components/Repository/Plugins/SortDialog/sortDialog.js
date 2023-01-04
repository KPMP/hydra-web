import React from 'react';
import PropTypes from 'prop-types';
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  useForceUpdate,
  hasSortableColumns,
  isCheckboxChecked,
  handleRadioSortingClick,
  handleCheckboxSortingClick,
  isRadioChecked,
} from './sortDialogHelpers';

function SortDialog({
  sortDialogOpenValue,
  sortedColumns,
  sortableToolbarColumns,
  closeDialogs,
  changeColumnSorting,
  addSortedColumn,
  removeSortedColumn }) {

    let forceUpdate = useForceUpdate()
    const Directions = {
      ASC: 'asc',
      DESC: 'desc'
    }
    return(
      <div>
        {(sortDialogOpenValue) &&
          <div>
            <div className="modal-backdrop"
              onClick={() => {
                closeDialogs()}}>
            </div>
            <div className="sort-dialog border rounded">
              {hasSortableColumns(sortableToolbarColumns) ?
                <div className="dialog-content" onClick={e => {
                    e.stopPropagation();}}>
                  {sortableToolbarColumns.map((item) => { 
                    return (
                      <div className="sort-dialog-option-wrapper">
                        <div className="sort-dialog-options">
                          <input onClick={()=> 
                            handleCheckboxSortingClick(
                              sortedColumns,
                              item.name,
                              changeColumnSorting,
                              addSortedColumn,
                              removeSortedColumn,
                              forceUpdate)}
                            key={sortedColumns} 
                            onChange={()=>{}} 
                            type="checkbox" checked={isCheckboxChecked(
                              sortedColumns, item.name)}
                            name={item.name}
                            value="sort"></input>
                          <span>{item.title}</span>
                        </div>
                        
                        <div className="sort-dialog-radio-wrapper">
                          <span onClick={() => 
                            handleRadioSortingClick(
                              item.name,
                              Directions.ASC,
                              changeColumnSorting,
                              addSortedColumn,
                              forceUpdate)}>
                              <FontAwesomeIcon
                                alt="Sort Column Descending"
                                className="fas fa-arrow-up"
                                icon={faArrowUp} />
                            <input checked={
                              isRadioChecked(
                                sortedColumns,
                                item.name,
                                Directions.ASC)}
                              type="radio"
                              name={item.name}
                              value={Directions.ASC}>
                            </input>
                          </span>

                          <span onClick={() =>
                            handleRadioSortingClick(
                              item.name,
                              Directions.DESC,
                              changeColumnSorting,
                              addSortedColumn,
                              forceUpdate)}>
                            <FontAwesomeIcon
                              alt="Sort Column Descending"
                              className="fas fa-arrow-down"
                              icon={faArrowDown} />
                            <input checked={
                              isRadioChecked(
                                sortedColumns,
                                item.name,
                                Directions.DESC
                              )}
                              type="radio"
                              name={item.name}
                              value={Directions.DESC}>
                            </input>
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              : <div className="sort-dialog-option-wrapper">
                  <span>No sortable columns</span>
                </div>
              }
            </div>
          </div>
        }
      </div>
    )
}

SortDialog.propTypes = {
  sortDialogOpenValue: PropTypes.bool,
  sortedColumns: PropTypes.array,
  sortableToolbarColumns: PropTypes.array,
  closeDialogs: PropTypes.func,
  changeColumnSorting: PropTypes.func,
  addSortedColumn: PropTypes.func,
  removeSortedColumn: PropTypes.func,
}

SortDialog.defaultProps = {
  sortDialogOpenValue: false,
  sortedColumns: [],
  sortableToolbarColumns: [],
  closeDialogs: () => {},
  changeColumnSorting: () => {},
  addSortedColumn: () => {},
  removeSortedColumn: () => {},
};

  
export default SortDialog;