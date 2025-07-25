import * as React from "react";
import {
  Template,
  Plugin,
  TemplateConnector,
} from "@devexpress/dx-react-core";
import SortDialog from './SortDialog/sortDialog';
import ColumnArrangementDialog from './ColumnArrangmentDialog/columnArrangementDialog';
import { faBars, faSortAmountDownAlt, faDownload } from "@fortawesome/free-solid-svg-icons";
// Commenting out the unused imports and variables below until we resotre the bulk download section
// import { faWindows, faApple, faLinux } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSVLink } from "react-csv";
// import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
// import FileSaver from "file-saver";

const pluginDependencies = [
  { name: "Toolbar" },
  { name: "ToolbarButtonState" }
];
// let fileDownloadEndpoint = "https://" + window.location.hostname + "/api/v1/file/download"
// if (process.env.REACT_APP_FILE_ENDPOINT) {
//     fileDownloadEndpoint = process.env.REACT_APP_FILE_ENDPOINT
// }
export class ToolbarButton extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      csvData: [],
      csvRef: React.createRef(),
      isOpen: false,
      dropdownOpen: false,
      
    };
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

  // commenting out this code until we figure out a better way to give users mass amounts of data without crashing our file services

//   downloadBatchFile(res) {
//     let batchContent = "@echo off\n";
//     batchContent += "set error_occurred=false\n";
//     batchContent += "set error_404=false\n";
//     batchContent += "set error_403=false\n";
//     batchContent += "set controlled_access_files=\n";
//     res.forEach(element => {
//         const fileName = element['File Name'];
//         const encodedFileName = encodeURIComponent(fileName).replace(/%20/g, '%%20');
//         const internalPackageId = element["Internal Package ID"];

//         batchContent += `
//         echo Trying file ${fileName} 
//         For /F %%G In ('%__AppDir__%curl.exe -o ${fileName} "${fileDownloadEndpoint}/${internalPackageId}/${encodedFileName}"  --fail --write-out --show-error -w "%%{http_code}"') Do Set "response=%%G"
//             if %response%==404 (
//                 set error_404=true
//                 set controlled_access_files=%controlled_access_files% "${fileName}"
//             )\n`;
//     });
//     batchContent += `
//         if %error_404%==true (
//             echo One or more files is controlled access. You will not be able to download the following files because they require a Data Use Agreement:
//             for %%f in (%controlled_access_files%) do (
//                 echo %%f
//             )
//         )
//         if %error_404%==false (
//             echo Download complete.
//         )
//             pause
//         `;
//     const blob = new Blob([batchContent], { type: "text/plain;charset=utf-8" });
//     FileSaver.saveAs(blob, "atlas_repository_bulk_download.bat");
// }

//   downloadShellScript(res) {
//     let scriptContent = "#!/bin/bash\n";
//     scriptContent += "error_404=false\n";
//     scriptContent += "error_403=false\n";
//     scriptContent += "declare -a controlled_access_files\n";
//     res.forEach(element => {
//         const fileName = element['File Name'];
//         const encodedFileName = encodeURIComponent(fileName);
//         const internalPackageId = element["Internal Package ID"];
        
//         scriptContent += `
//             echo "Trying file ${fileName}"
//             status_code=$(curl -o "$HOME/Downloads/${fileName}" --fail --write-out --show-error -w "%{http_code}" "${fileDownloadEndpoint}/${internalPackageId}/${encodedFileName}")
//             if [ "$status_code" -eq 404 ]; then
//                 error_404=true
//                 controlled_access_files+=("${fileName}")
//             elif [ "$status_code" -eq 403 ]; then
//                 error_403=true
//             fi`;
//     });
//     scriptContent += `
//         if [ "$error_404" = true ]; then
//             echo "One or more files is controlled access. You will not be able to download the following files becuase they require a Data Use Agreement: \n"
//             for file in "\${controlled_access_files[@]}"; do
//                 echo "$file"
//             done
//         fi
//         if [ "$error_404" = false ]; then
//             echo "Download complete."
//         fi
//         `;
//     const blob = new Blob([scriptContent], { type: "text/plain;charset=utf-8" });
//     FileSaver.saveAs(blob, "atlas_repository_bulk_download.sh");
// }


//   getBulkDownloadScript(os) {
//     this.props.cleanResults().then((res) => {
//         if (os === "Windows") {
//             this.downloadBatchFile(res);
//         }else if (os === "MacOS") {
//             this.downloadShellScript(res);
//         }else if(os === "Linux") {
//             this.downloadShellScript(res);
//         }
//     });
//   }

  getCsvData = () => {
    this.props.cleanResults().then((res) => {
        this.setState({csvData: res});
        if (this.state.csvData.length > 0) {
            this.state.csvRef.current.link.click();
          }
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
                {/* <Dropdown 
                style={{float:"left", paddingRight: ".3rem"}} isOpen={this.state.dropdownOpen} toggle={this.dropdownToggle} 
                onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} 
                direction="down">
                    <DropdownToggle className="border rounded" color="primary" style={{backgroundColor: "#43649d", maxHeight: "2.2rem"}} caret>Bulk Download</DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={() => this.getBulkDownloadScript("Windows")}>
                        <FontAwesomeIcon className="fas fa-windows" icon={faWindows}/> &nbsp;
                            Windows
                        </DropdownItem>
                        <DropdownItem onClick={() => this.getBulkDownloadScript("MacOS")}>
                        <FontAwesomeIcon className="fas fa-apple" icon={faApple}/> &nbsp;
                            MacOS
                        </DropdownItem>
                        <DropdownItem onClick={() => this.getBulkDownloadScript("Linux")}>
                            <FontAwesomeIcon className="fas fa-linux" icon={faLinux} /> &nbsp;
                            Linux
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem >
                            <a style={{"color":"inherit"}} href="https://www.kpmp.org/help-docs/software?tabname=atlasrepository" target="_blank" rel="noopener noreferrer"><span className="nav-text px-1">Instructions</span></a>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown> */}
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
