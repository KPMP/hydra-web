import * as React from "react";
import {
  Template,
  Plugin,
  TemplateConnector,
} from "@devexpress/dx-react-core";
import SortDialog from './SortDialog/sortDialog';
import ColumnArrangementDialog from './ColumnArrangmentDialog/columnArrangementDialog';
import { faBars, faSortAmountDownAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const pluginDependencies = [
  { name: "Toolbar" },
  { name: "IntegratedSorting" }, 
  { name: "ToolbarButtonState" }
];

export class ToolbarButton extends React.PureComponent {
  render() {
    return (
      <Plugin name="ToolbarButton" dependencies={pluginDependencies}>
        <Template name="toolbarContent">
          <TemplateConnector>
            {(
              {
                arrangeColumnsDialogOpen,
                sortDialogOpenValue,
                toolbarColumns,
                sortableToolbarColumns,
                sortedColumns,
                hiddenColumnNames,
                rows
              },
              {
                toggleArrangeColumnsDialog,
                toggleSortTableDialog,
                closeDialogs,
                changeColumnSorting,
                toggleColumnVisibility,
                addSortedColumn,
                removeSortedColumn,
              }
            ) => (
              <div className="ml-auto">
                <button type="button" className="btn btn-light border rounded" onClick={toggleArrangeColumnsDialog}>
                  <span className="icon-info spatial-info-cell spatial-button">
                      <FontAwesomeIcon alt="Arrange Columns" className="fas fa-bars" icon={faBars} />
                  </span>
                </button>
                &nbsp;
                <button type="button" className="btn btn-light border rounded" onClick={toggleSortTableDialog}>
                  <span className="icon-info spatial-info-cell spatial-button">
                      <FontAwesomeIcon alt="Sort Columns" className="fas fa-sort-amount-down-alt" icon={faSortAmountDownAlt} />
                  </span>
                </button>

                <ColumnArrangementDialog
                  arrangeColumnsDialogOpen={arrangeColumnsDialogOpen}
                  closeDialogs={closeDialogs}
                  toolbarColumns={toolbarColumns}
                  sortedColumns={sortedColumns}
                  cards={this.props.cards}
                  setCards={this.props.setCards}
                  setDefaultCards={this.props.setDefaultCards}
                  hiddenColumnNames={hiddenColumnNames}
                  toggleColumnVisibility={toggleColumnVisibility}
                  addSortedColumn={addSortedColumn}
                  removeSortedColumn={removeSortedColumn}
                />
                <SortDialog
                  sortDialogOpenValue={sortDialogOpenValue}
                  sortedColumns={sortedColumns}
                  sortableToolbarColumns={sortableToolbarColumns}
                  closeDialogs={closeDialogs}
                  changeColumnSorting={changeColumnSorting}
                  addSortedColumn={addSortedColumn}
                  removeSortedColumn={removeSortedColumn}
                  rows={rows}
                />
              </div>
            )}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}
