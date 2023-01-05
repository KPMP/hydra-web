
import { useState } from 'react';

export function useForceUpdate(){
    const [value, setValue] = useState(0); // eslint-disable-line
    return () => setValue(value => value + 1);
}
  
export function hasSortableColumns(sortableToolbarColumns) {
    return (typeof sortableToolbarColumns === 'object' && sortableToolbarColumns && sortableToolbarColumns.length) > 0
}
  
export function isCheckboxChecked(sortedColumns, columnName) {
    return sortedColumns.findIndex((el) => {
      if( el.columnName === columnName ) {
        return true
      } else {
        return false
      }
    }) >= 0 ? true : false
}

export function isRadioChecked(sortedColumns, columnName, direction) {
    return sortedColumns.findIndex((el) => {
      if( el.columnName === columnName && el.direction === direction ) {
        return true
      } else {
        return false
      }
    }) >= 0 ? true : false
}

export function handleCheckboxSortingClick(
    sortedColumns,
    columnName,
    changeColumnSorting,
    addSortedColumn,
    removeSortedColumn,
    forceUpdate) {
    const Direction = {
      ASC: 'asc'
    }
    if(isCheckboxChecked(sortedColumns, columnName)){
      changeColumnSorting(
        {columnName, direction: null, keepOther: true, sortIndex: -1})
      removeSortedColumn(columnName)
    } else {
      changeColumnSorting(
        {columnName, direction: Direction.ASC, keepOther: true, sortIndex: -1})
      addSortedColumn({columnName, direction: Direction.ASC})
    }
    forceUpdate()
}
  
export function handleRadioSortingClick(
    columnName,direction, changeColumnSorting, addSortedColumn, forceUpdate) {
      changeColumnSorting(
        {columnName, direction, keepOther: true, sortIndex: -1})
      addSortedColumn({columnName, direction})
      forceUpdate()
}