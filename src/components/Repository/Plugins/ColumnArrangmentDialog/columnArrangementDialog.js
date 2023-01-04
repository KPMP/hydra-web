import React, { useState } from 'react'
import { Card } from './card';
import update from 'immutability-helper';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function useForceUpdate(){
  const [value, setValue] = useState(0) // eslint-disable-line
  return () => setValue(value => value + 1)
}

function isFiltered(value, filterValue) {
  return (((value).toLowerCase()).indexOf(filterValue.toLowerCase()) >= 0 || filterValue === '' )
}

function ColumnArrangementDialog(
  { cards,
    toolbarColumns,
    toggleColumnVisibility,
    arrangeColumnsDialogOpen,
    closeDialogs,
    setCards,
    setDefaultCards,
    hiddenColumnNames }) {
  let forceUpdate = useForceUpdate();
  const [filterValue, setFilterValue] = useState('');

  const onChangeHandler = event => {
    setFilterValue(event.target.value);
  };

  const moveCard = (dragIndex, hoverIndex) => {
    setCards(update(cards, {
      $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, cards[dragIndex]],
      ],
    }))
  };

  const handleRestoreDefaultsClick = () => {
    setFilterValue('')
    setDefaultCards()
    toolbarColumns.forEach(column => {
      if(!column.defaultHidden && hiddenColumnNames.includes(column.name)){
        toggleColumnVisibility(column.name)
      } else if (column.defaultHidden && !hiddenColumnNames.includes(column.name)) {
        toggleColumnVisibility(column.name)
      }
    });
  }

  return(
    <div className='column-arrage-dialog'>
      {(arrangeColumnsDialogOpen) && 
        <div>
          <div className="modal-backdrop" onClick={() => {closeDialogs()}}>
          </div>
          <div className="sort-dialog border rounded">
            <div className="column-filter-wrapper">
                <FontAwesomeIcon className="fas fa-magnifying-glass" alt="Arrange Columns Button" icon={faMagnifyingGlass} />
                <input
                  type="text"
                  value={filterValue}
                  onChange={onChangeHandler}
                  placeholder="Filter Columns"
                />
              </div>
              <div className="sort-dialog-options fake-link">
                <span
                  onClick={() => {handleRestoreDefaultsClick()}}>
                  Restore Defaults
                </span>
              </div>
              
              <div>{cards.map((card, index) => {
                return (
                  <div key={card.text}>
                    { isFiltered(card.text, filterValue)
                      ?
                      <Card
                        index={index}
                        id={card.text}
                        text={card.text}
                        name={card.name}
                        moveCard={moveCard}
                        hideable={card.hideable}
                        hiddenColumnNames={hiddenColumnNames}
                        toggleColumnVisibility={toggleColumnVisibility}
                        forceUpdate={forceUpdate} />
                      : <div></div>
                    }
                  </div>)
              })}
            </div>
          </div>
        </div>
      }
    </div>
  )
}
  
export default ColumnArrangementDialog;