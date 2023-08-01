export const resultConverter = (results) => {
    return results.map(row => {
        let newRow =  Object.keys(row).reduce((attrs, key)=> ({...attrs, [key]: row[key].raw}), {});
        if (newRow["redcap_id"]) {
            if (newRow['redcap_id'].length > 1)
            newRow['redcap_id'] = 'Multiple Participants';
        }
        return newRow;
    })
};

export const experimentalDataConverter = (data={}) => {
    let spatialData = data.spatialViewerDataTypes;
    let explorerData = data.explorerDataTypes;
    let result = formatData(spatialData, [], 'spatial-viewer');
    result = formatData(explorerData, result, 'explorer');
    return result;
}

const formatData = (data=[], result=[], toolName='') => {
    data.forEach((datum) => {
        result.push({key: datum.dataType, value: datum.count, tool: toolName, isAggregated: datum.isAggregatedData})
    });
    return result;
}

export const dataToTableConverter = (data=[]) => {
    return Object.keys(data).map((key, index) => {
        return {
            key: key,
            value: data[key]
        }
    })
}

export const fileCountsToTableConverter = (data=[], redcap_id) => {
    let result = []
    console.log(data)
    data.forEach((datum) => {
        let link = '/repository/?filters[0][field]=redcap_id' 
                + '&filters[0][values][0]=' + redcap_id + '&filters[0][type]=any' 
                + '&filters[1][field]=' + datum.linkInformation.linkType 
                + '&filters[1][values][0]=' + datum.dataType + '&filters[1][type]=any'
        let linkResult = (datum.count > 0 ? <a className="p-0" href={link}>{datum.count}</a>: <span>{datum.count}</span>);
                result.push({key: datum.dataType, value: linkResult});
    })
    return result;
}

export const removeUUID = (text) => {
    return text.substring(37);
};

export const mapSummaryKeysToPresentationStyle = (data) => {
    const result = {};
    result['Participant ID'] = "";
    result['Disease Type'] = "";
    if (!data || data === {}) {
        return result;
    }

    if (data['redcapId']) {
        result['Participant ID'] = data['redcapId'] ? data['redcapId'] : "";
    }
    if (data['tissueType']) {
        result['Disease Type'] = data['tissueType'] ? data['tissueType'] : "";
    }
    return result;
};

