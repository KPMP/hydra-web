import * as React from "react";
import {
  Template,
  Plugin,
  TemplateConnector,
} from "@devexpress/dx-react-core";
import SortDialog from './SortDialog/sortDialog';
import ColumnArrangementDialog from './ColumnArrangmentDialog/columnArrangementDialog';
import { faBars, faSortAmountDownAlt, faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { handleGoogleAnalyticsEvent } from "../../../helpers/googleAnalyticsHelper";
import { CSVLink } from "react-csv";

const pluginDependencies = [
  { name: "Toolbar" },
  { name: "ToolbarButtonState" }
];

export class ToolbarButton extends React.PureComponent {

  getExportFilename = () => {
    return "atlas_repository_filelist-" + new Date().toISOString().split('T')[0].replace(/\D/g,'');
  }

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
                <React.Fragment>
                <div className="mr-auto">Files ({this.props.resultCount})</div>
              <div className="ms-auto">
                <button type="button" className="btn border rounded action-button">
                  <span className="icon-info spatial-info-cell spatial-button">
                    <CSVLink
                        onClick={() => handleGoogleAnalyticsEvent('Repository', 'Download', this.getExportFilename())}
                        data={this.props.cleanResults()}
                        filename={this.getExportFilename()}
                        target="_blank"
                        className="icon-container action-button">
                            <FontAwesomeIcon className="fas fa-download" icon={faDownload} /> &nbsp; CSV
                    </CSVLink>
                  </span>
                </button>
                &nbsp;
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
                </React.Fragment>
            )}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}
