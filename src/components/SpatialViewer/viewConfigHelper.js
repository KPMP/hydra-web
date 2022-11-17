import lmViewConfig from './lightMicroscopyViewConfig.json';
import threeDCytometryViewConfig from './threeDCytometryViewConfig.json';
import threeDCytometryViewNoChannelsConfig from './threeDCytometryViewNoChannelsConfig.json';
import stViewConfig from './spatialTranscriptomicsViewConfig.json'
import { getFileLink } from "../../helpers/Api";

export const getViewConfig = (type) => {
    switch (type) {
        case '3D Tissue Imaging and Cytometry':
            return threeDCytometryViewConfig;
        case '3D Tissue Imaging and Cytometry No Channels':
            return threeDCytometryViewNoChannelsConfig;
        case 'CODEX':
            return threeDCytometryViewConfig;
        case 'Light Microscopic Whole Slide Images':
            return lmViewConfig;
        case 'Spatial Transcriptomics':
            return stViewConfig;
        default:
            return threeDCytometryViewConfig
    }
};

export const getDatasetInfo = (selectedDataset) => {
    let datasetInfo = '';
    if(selectedDataset["imagetype"]) {
        if(selectedDataset["datatype"] === "Light Microscopic Whole Slide Images" && selectedDataset["level"]) {
            datasetInfo = `${selectedDataset["imagetype"]} (${selectedDataset["level"]})`
        } else {
            datasetInfo = selectedDataset["imagetype"]
        }
    }
    return datasetInfo;
}



export const populateViewConfig = async (viewConfig, selectedDataset) => {
    let stringifiedConfig = JSON.stringify(viewConfig);
    let imageUrlResponse = await getFileLink(selectedDataset["packageid"] + '/' + selectedDataset["longfilename"]);
    if (selectedDataset["relatedfiles"].length > 0) {
        let relatedFiles = [];
        selectedDataset['relatedfiles'].forEach(function (item, index) {
            relatedFiles.push(JSON.parse(item));
        });
        let dataUrl = getPublicFileLink(selectedDataset["packageid"], relatedFiles[0]['filename']);
        stringifiedConfig = stringifiedConfig.replace(/<DATA_FILE_URL>/gi, dataUrl);
    }
    stringifiedConfig = stringifiedConfig.replace('<IMAGE_NAME>', selectedDataset["filename"]);
    stringifiedConfig = stringifiedConfig.replace('<IMAGE_URL>', imageUrlResponse.data);
    stringifiedConfig = stringifiedConfig.replace('<DATASET_INFO>', getDatasetInfo(selectedDataset));
    return JSON.parse(stringifiedConfig);
}

export const getPublicFileLink = (packageId, fileName) => {
    return "https://kpmp-knowledge-environment-public.s3.amazonaws.com/" + packageId + "/derived/" + fileName
}


export const getImageTypeTooltipCopy = (imageType) => {
    const availableCopy = {
        "RGB max projection of 8-channel immunofluorescence image volume": "8-channel volume combined into a single maximum projection and converted to RGB color space.",
        "Composite max projection of 8-channel immunofluorescence image volume": "8-channel volume combined into a single maximum projection; composite image consists of 8 channels.",
        "Composite 3D 8-channel immunofluorescence image volume": "3D volume completely represented as a stack of individual, 8-channel images. Every focal plane image and every channel can be independently inspected.",
        "RGB max projection of 2-channel (autofluorescence and second harmonic generation) image volume": "Projection of 3D volume collected prior to labeling; channels cannot be controlled.",
        "CODEX": '',
    };
    
    let copy = availableCopy[imageType];

    if (!copy) {
        copy = '';
    }
    return copy;
}

