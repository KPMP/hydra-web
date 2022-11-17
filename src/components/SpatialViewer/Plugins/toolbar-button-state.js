import * as React from "react";
import { Plugin, Getter, Action } from "@devexpress/dx-react-core";

export class ToolbarButtonState extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sortedColumns: [],
      sortDialogOpen: false,
      arrangeColumnsDialogOpen: false,
    };
  }

  toggleArrangeColumnsDialogState = () => {
    this.setState({
      arrangeColumnsDialogOpen: this.state.arrangeColumnsDialogOpen ? false : true,
      sortDialogOpen: false
    });
  }

  toggleSortDialogState = () => {
    this.setState({
      sortDialogOpen: this.state.sortDialogOpen ? false : true,
      arrangeColumnsDialogOpen: false
    });
  }

  closeDialogs = () => {
    this.setState({
      sortDialogOpen: false,
      arrangeColumnsDialogOpen: false
    });
  }

  addSortedColumn = (sortObj) => {
    const sortedColumns = this.state.sortedColumns;
    if(sortedColumns.findIndex((el)=>{if(el.columnName===sortObj.columnName){return true}else{return false}}) === -1 ){
      sortedColumns.push(sortObj);
      this.setState({sortedColumns});
    }else{
      sortedColumns[sortedColumns.findIndex((el)=>{if(el.columnName===sortObj.columnName){return true}else{return false}})].direction = sortObj.direction
      this.setState({sortedColumns})
    }
  }

  removeSortedColumn = (columnName) => {
    const sortedColumns = this.state.sortedColumns
    sortedColumns.splice(
      sortedColumns.findIndex((el)=>{if(el.columnName===columnName){return true}else{return false}}), 1
    )
    this.setState({sortedColumns})
  }

  getComputedSortedColumns = ({sorting, columns}) => {
    const result1 = sorting.filter((o1)=>{
      return (this.state.sortedColumns).some((o2)=>{
         return ( o1.columnName === o2.columnName && o1.direction === o2.direction );
       });
     });
    
    if (result1.length !== sorting.length ) {
      columns.forEach(column => {
        this.removeSortedColumn(column.columnName)
      })
      sorting.forEach(sortedElement => {
        this.addSortedColumn(sortedElement)  
      });
    }
    return this.state.sortedColumns
  }

  getSortableToolbarColumns = ({ columns }) => {
    return columns.filter(col => col.sortable === true);
  }

  getColumns = ({columns}) => {
    return columns
  }
  
  render() {
    const { sortDialogOpen, arrangeColumnsDialogOpen } = this.state;

    return (
      <Plugin name="ToolbarButtonState">
        <Getter name="sortableToolbarColumns" computed={this.getSortableToolbarColumns} />
        <Getter name="sortedColumns" computed={this.getComputedSortedColumns} />
        <Getter name="toolbarColumns" computed={this.getColumns} />
        <Getter name="arrangeColumnsDialogOpen" value={arrangeColumnsDialogOpen} />
        <Getter name="sortDialogOpenValue" value={sortDialogOpen} />

        <Action name="toggleArrangeColumnsDialog" action={this.toggleArrangeColumnsDialogState} />
        <Action name="toggleSortTableDialog" action={this.toggleSortDialogState} />
        <Action name="closeDialogs" action={this.closeDialogs} />
        <Action name="addSortedColumn" action={this.addSortedColumn} />
        <Action name="removeSortedColumn" action={this.removeSortedColumn} />
      </Plugin>
    );
  }
}
