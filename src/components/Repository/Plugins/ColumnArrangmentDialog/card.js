import { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd'; //https://react-dnd.github.io/react-dnd/about
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function useForceUpdate(){
  const [value, setValue] = useState(0) // eslint-disable-line
  return () => setValue(value => value + 1) 
}

function handleColumnVisibilityClick(event,forceUpdate, toggleColumnVisibility, hideable, text) {
  if(hideable === false){
    event.stopPropagation()
  } else {
    toggleColumnVisibility(text)
  }
  forceUpdate()
}

function isChecked(hiddenColumnNames, text) {
  return hiddenColumnNames.findIndex((columnName)=>{
    if(columnName === text){
      return true
    } else {
      return false
    }
  }) >= 0 ? false : true
}

export const Card = ({ id, text, name, index, moveCard, hideable, hiddenColumnNames, toggleColumnVisibility }) => {
  let forceUpdate = useForceUpdate();
  
  const [{ handlerId }, drop] = useDrop({
      accept: 'card',
      collect(monitor) {
          return {
              handlerId: monitor.getHandlerId(),
          };
      },
      hover(item, monitor) {
          if (!ref.current) {
              return;
          }
          const dragIndex = item.index;
          const hoverIndex = index;
          // Don't replace items with themselves
          if (dragIndex === hoverIndex) {
              return;
          }
          // Determine rectangle on screen
          const hoverBoundingRect = ref.current?.getBoundingClientRect();
          // Get vertical middle
          const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
          // Determine mouse position
          const clientOffset = monitor.getClientOffset();
          // Get pixels to the top
          const hoverClientY = clientOffset.y - hoverBoundingRect.top;
          // Only perform the move when the mouse has crossed half of the items height
          // When dragging downwards, only move when the cursor is below 50%
          // When dragging upwards, only move when the cursor is above 50%
          // Dragging downwards
          if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
              return;
          }
          // Dragging upwards
          if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
              return;
          }
          // Time to actually perform the action
          moveCard(dragIndex, hoverIndex);
          // Note: we're mutating the monitor item here!
          // Generally it's better to avoid mutations,
          // but it's good here for the sake of performance
          // to avoid expensive index searches.
          item.index = hoverIndex;
      },
  });

  const [{ isDragging }, drag] = useDrag({
      type: 'card',
      item: () => {
          return { id, index };
      },
      collect: (monitor) => ({
          isDragging: monitor.isDragging(),
      }),
  });

  const ref = useRef(null);
  drag(drop(ref));

  const opacity = isDragging ? 0 : 1;
  const style = {cursor: 'move'}
  return (<div ref={ref}
    style={{ ...style, opacity }}
    data-handler-id={handlerId}>
    <div className="sort-dialog-option-wrapper">
      <div className="sort-dialog-options">
        <input
          onClick={(event)=> {
            handleColumnVisibilityClick(
              event,
              forceUpdate,
              toggleColumnVisibility,
              hideable,
              name) }
          }
          onChange={()=>{}}
          type="checkbox"
          checked={isChecked(hiddenColumnNames, name)}
          name={name}
          value="sort"></input>
          <span>{text}</span>
      </div>
      <div className="sort-dialog-radio-wrapper">
        <FontAwesomeIcon alt="Arrange Columns" className="fas fa-bars" icon={faBars} />

      </div>
    </div>
  </div>);
};
