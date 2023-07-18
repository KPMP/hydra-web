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
    let repoData = data.repositoryDataTypes;
    let spatialData = data.spatialViewerDataTypes;
    let explorerData = data.explorerDataTypes;
    let result = formatData(repoData, [], 'atlas-repository');
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

    if (data['tissueType']) {
        result['Disease Type'] = data['tissueType'] ? data['tissueType'] : "";
    }
    return result;
};

