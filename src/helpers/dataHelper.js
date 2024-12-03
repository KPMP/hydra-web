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
    result['Enrollment Category'] = "";
    result['Primary Adjudicated Category'] = "";
    if (!data || data === {}) {
        return result;
    }

    if (data['redcapId']) {
        result['Participant ID'] = data['redcapId'] ? data['redcapId'] : "";
    }
    if (data['enrollmentCategory']) {
        result['Enrollment Category'] = data['enrollmentCategory'] ? data['enrollmentCategory'] : "";
    }
    if (data['adjudicatedCategory']) {
        result['Primary Adjudicated Category'] = data['adjudicatedCategory'] ? data['adjudicatedCategory'] : "";
    }
    return result;
};

export const mapClinicalKeysToPresentationStyle = (data) => {
    const result = {};
    result['A1C']= "";
    result['Albuminuria'] = "";
    result['Baseline eGFR'] = "";
    result['Diabetes Duration'] = "";
    result['Diabetes History'] = "";
    result['Hypertension Duration'] = "";
    result['Hypertension History'] = "";
    result['KDIGO Stage'] = "";
    result['RAAS Blockade'] = "";
    result['Proteinuria'] = "";
    result['Race'] = "";
    result['Age'] = "";
    result['Sample Type'] = "";
    result['Sex'] = "";
    result['Protocol'] = "";
    result['Tissue Source'] = "";

    if (!data || data === {}) {
        return result;
    }
    if (data.a1c) {
        result['A1C'] = data.a1c ? data.a1c : "";
    }
    if (data.albuminuria) {
        result['Albuminuria'] = data.albuminuria ? data.albuminuria : "";
    }
    if (data.baselineEgfr) {
        result['Baseline eGFR'] = data.baselineEgfr ? data.baselineEgfr : "";
    }
    if (data.diabetesDuration) {
        result['Diabetes Duration'] = data.diabetesDuration ? data.diabetesDuration : "";
    }
    if (data.diabetesHistory) {
        result['Diabetes History']  = data.diabetesHistory ? data.diabetesHistory : "";
    }
    if (data.hypertensionDuration) {
        result['Hypertension Duration'] = data.hypertensionDuration ? data.hypertensionDuration : "";
    } 
    if (data.hypertensionHistory) {
        result['Hypertension History'] = data.hypertensionHistory ? data.hypertensionHistory : "";
    }
    if (data.kdigoStage) {
        result['KDIGO Stage'] = data.kdigoStage ? data.kdigoStage : "";
    }
    if (data.onRaasBlockade) {
        result['RAAS Blockade'] = data.onRaasBlockade ? data.onRaasBlockade : "";
    }
    if (data.proteinuria) {
        result['Proteinuria'] = data.proteinuria ? data.proteinuria : "";
    }
    if (data.race) {
        result['Race'] = data.race ? data.race : "";
    }
    if (data.ageBinned) {
        result['Age'] = data.ageBinned ? data.ageBinned : "";
    }

    if (data.sampleType) {
        result['Sample Type'] = data.sampleType ? data.sampleType : "";
    }
    
    if (data.sex) {
        result['Sex'] = data.sex ? data.sex : "";
    }
    if (data.protocol) {
        result['Protocol'] = data.protocol ? data.protocol : "";
    }
    if (data.tissueSource) {
        result['Tissue Source'] = data.tissueSource ? data.tissueSource : "";
    }
    
    return result;
};