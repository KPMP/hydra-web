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
    console.log(data)
    return {
        key: "stuff",
        value: "stuff"
    }
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

export const mapClinicalKeysToPresentationStyle = (data) => {
    const result = {};
    result['A1C (%)']= "";
    result['Albuminuria (mg)'] = "";
    result['Baseline eGFR (ml/min/1.73m2)'] = "";
    result['Diabetes Duration (Years)'] = "";
    result['Diabetes History'] = "";
    result['Hypertension Duration (years)'] = "";
    result['Hypertension History'] = "";
    result['KDIGO Stage'] = "";
    result['On RAAS Blockade'] = "";
    result['Proteinuria (mg)'] = "";
    result['Ethnicity'] = "";
    result['Age (Years)'] = "";
    result['Sample Type'] = "";
    result['Sex'] = "";
    result['Protocol'] = "";
    result['Tissue Source'] = "";

    if (!data || data === {}) {
        return result;
    }
    if (data['A1c (%) (Binned)']) {
        result['A1C (%)'] = data['A1c (%) (Binned)'] ? data['A1c (%) (Binned)'] : "";
    }
    if (data['Albuminuria (mg) (Binned)']) {
        result['Albuminuria (mg)'] = data['Albuminuria (mg) (Binned)'] ? data['Albuminuria (mg) (Binned)'] : "";
    }
    if (data['Baseline eGFR (ml/min/1.73m2) (Binned)']) {
        result['Baseline eGFR (ml/min/1.73m2)'] = data['Baseline eGFR (ml/min/1.73m2) (Binned)'] ? data['Baseline eGFR (ml/min/1.73m2) (Binned)'].replace(' ml/min/1.73m2', '') : "";
    }
    if (data['Diabetes Duration (Years)']) {
        result['Diabetes Duration (Years)'] = data['Diabetes Duration (Years)'] ? data['Diabetes Duration (Years)'].replace(' Years', '') : "";
    }
    if (data['Diabetes History']) {
        result['Diabetes History']  = data['Diabetes History'] ? data['Diabetes History'] : "";
    }
    if (data['Hypertension Duration (Years)']) {
        result['Hypertension Duration (years)'] = data['Hypertension Duration (Years)'] ? data['Hypertension Duration (Years)'].replace(' Years', '') : "";
    } 
    if (data['Hypertension History']) {
        result['Hypertension History'] = data['Hypertension History'] ? data['Hypertension History'] : "";
    }
    if (data['KDIGO Stage']) {
        result['KDIGO Stage'] = data['KDIGO Stage'] ? data['KDIGO Stage'] : "";
    }
    if (data['On RAAS Blockade']) {
        result['On RAAS Blockade'] = data['On RAAS Blockade'] ? data['On RAAS Blockade'] : "";
    }
    if (data['Proteinuria (mg) (Binned)']) {
        result['Proteinuria (mg)'] = data['Proteinuria (mg) (Binned)'] ? data['Proteinuria (mg) (Binned)'] : "";
    }
    if (data['Race']) {
        result['Ethnicity'] = data['Race'] ? data['Race'] : "";
    }
    if (data['Age (Years) (Binned)']) {
        result['Age (Years)'] = data['Age (Years) (Binned)'] ? data['Age (Years) (Binned)'].replace(' Years', '') : "";
    }

    if (data['Sample Type']) {
        result['Sample Type'] = data['Sample Type'] ? data['Sample Type'] : "";
    }
    
    if (data['Sex']) {
        result['Sex'] = data['Sex'] ? data['Sex'] : "";
    }
    if (data['Protocol']) {
        result['Protocol'] = data['Protocol'] ? data['Protocol'] : "";
    }
    if (data['Tissue Source']) {
        result['Tissue Source'] = data['Tissue Source'] ? data['Tissue Source'] : "";
    }
    
    return result;
};