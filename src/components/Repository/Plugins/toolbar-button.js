import * as React from "react";
import {
  Template,
  Plugin,
  TemplateConnector,
} from "@devexpress/dx-react-core";
import SortDialog from './SortDialog/sortDialog';
import ColumnArrangementDialog from './ColumnArrangmentDialog/columnArrangementDialog';
import { faBars, faSortAmountDownAlt, faDownload } from "@fortawesome/free-solid-svg-icons";
import { faWindows, faApple, faLinux } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSVLink } from "react-csv";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";

const pluginDependencies = [
  { name: "Toolbar" },
  { name: "ToolbarButtonState" }
];

export class ToolbarButton extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      csvData: [],
      csvRef: React.createRef(),
      isOpen: false,
      dropdownOpen: false,
      clickHandled: false
    };
    this.handleDropdownClickOnce = this.handleDropdownClickOnce.bind(this);
    this.dropdownToggle = this.dropdownToggle.bind(this);
  }

  handleMouseEnter = () => {
    this.setState({ dropdownOpen: true });
  }

  handleMouseLeave = () => {
    this.setState({ dropdownOpen: false });
  }

  dropdownToggle = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  } 

  getExportFilename = () => {
    return "atlas_repository_filelist-" + new Date().toISOString().split('T')[0].replace(/\D/g,'');
  }

  handleDropdownClickOnce(event) {
    if (!this.state.clickHandled) {
      this.setState({ clickHandled: true });
      this.getCsvData();
    }
  }

  getCsvData = () => {
    this.props.cleanResults().then((res) => {
      this.setState({csvData: res});
      if (this.state.csvData.length > 0) {
        this.state.csvRef.current.link.click();
      }
      console.log(this.state.csvData);
      this.setState({ clickHandled: false });
    });
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
                <div className="me-auto">Files ({this.props.resultCount})</div>
              <div className="ms-auto">
                <Dropdown className="icon-info bulk-download" style={{float:"left", backgroundColor: "#43649d"}} isOpen={this.state.dropdownOpen} toggle={this.dropdownToggle()} 
                // onMouseEnter={this.handleMouseEnter()} onMouseLeave={this.handleMouseLeave()} 
                direction="down">
                    <DropdownToggle style={{backgroundColor: "#43649d"}}caret>Bulk Download</DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={this.handleDropdownClickOnce()}>
                        <FontAwesomeIcon className="fas fa-windows" icon={faWindows}/> &nbsp;
                            Windows
                        </DropdownItem>
                        <DropdownItem onClick={this.handleDropdownClickOnce()}>
                        <FontAwesomeIcon className="fas fa-apple" icon={faApple}/> &nbsp;
                            MacOS
                        </DropdownItem>
                        <DropdownItem onClick={this.handleDropdownClickOnce()}>
                            <FontAwesomeIcon className="fas fa-linux" icon={faLinux} /> &nbsp;
                            Linux
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                  <button 
                    type="button" 
                    className="btn border rounded action-button icon-info"
                    onClick={() => this.getCsvData()}>
                    <FontAwesomeIcon className="fas fa-download" icon={faDownload} /> &nbsp; CSV
                  </button> 
                <span className="icon-info spatial-info-cell spatial-button"> 
                  <CSVLink
                      data={this.state.csvData}
                      filename={this.getExportFilename()}
                      ref={this.state.csvRef}
                      target="_blank">
                  </CSVLink>
                </span>
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
