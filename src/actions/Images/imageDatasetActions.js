import actionNames from '../actionNames'

export const setSelectedImageDataset = (imageDataset) => {
    if (imageDataset['configtype'] === 'external_link') {
        window.open(imageDataset['externallink'], '_blank')
    } else {

        return {
            type: actionNames.SET_SELECTED_IMAGE_DATASET,
            payload: imageDataset
        }
    }
}

export const setTableSettings = (tableSettings) => {
    return {
        type: actionNames.SET_TABLE_SETTINGS,
        payload: tableSettings
    }
}