import {
    getViewConfig,
    populateViewConfig,
    getDatasetInfo,
    getImageTypeTooltipCopy,
    getPublicFileLink
} from './viewConfigHelper';
import lmViewConfig from './lightMicroscopyViewConfig.json';
import threeDCytometryViewConfig from './threeDCytometryViewConfig.json';
import threeDCytometryViewNoChannelsConfig from './threeDCytometryViewNoChannelsConfig.json';
import stViewConfig from './spatialTranscriptomicsViewConfig.json';
import * as helpers from '../../helpers/Api';

describe('getViewConfig', () => {
    it('should return 3dCyto config when 3D Cytometry', () => {
        let config = getViewConfig('3D Cytometry');
        let expectedConfig = threeDCytometryViewConfig;

        expect(config).toEqual(expectedConfig);

    });
    it ('should return light microscopy config when Light Microscopic Whole Slide Images', () => {
        let config = getViewConfig('Light Microscopic Whole Slide Images');
        let expectedConfig = lmViewConfig;

        expect(config).toEqual(expectedConfig);
    });
    it ('should return spatial transcriptopmics config when Spatial Transcriptomics', () => {
        let config = getViewConfig('Spatial Transcriptomics');
        let expectedConfig = stViewConfig;

        expect(config).toEqual(expectedConfig);
    });
    it ('should return no channel 3dcyto config when given 3d cyto no channel', () => {
        let config = getViewConfig('3D Tissue Imaging and Cytometry No Channels');
        let expectedConfig = threeDCytometryViewNoChannelsConfig;

        expect(config).toEqual(expectedConfig);
    });
    it ('should return 3dcyto config when CODEX', () => {
        let config = getViewConfig('CODEX');
        let expectedConfig = threeDCytometryViewConfig;

        expect(config).toEqual(expectedConfig);
    });
    it ('should default to 3dcyto when unknown type', () => {
        let config = getViewConfig('garbage');
        let expectedConfig = threeDCytometryViewConfig;

        expect(config).toEqual(expectedConfig);
    });
});

describe ('populateViewConfig', () => {
    beforeEach(() => {

        let mockUtilFunction = jest.spyOn(helpers, 'getFileLink').mockImplementation(() => {
            let result = {};
            result.data='url/returned/from/service';
            return result;
        });
    });

    it('should replace all of the placeholder values with the values passed in', async () => {
        let selectedDataset = {
            'filename': 'imageName.tiff',
            'packageid': '123',
            'imagetype': 'stuff',
            'relatedfiles': []
        };
        let result = await populateViewConfig(threeDCytometryViewConfig, selectedDataset);
        let resultString = JSON.stringify(result);
        let index = resultString.search('<*>');

        expect(index).toBe(-1);
        
        expect(result.datasets[0].files[0].options.images[0].name).toEqual('imageName.tiff');
        expect(result.datasets[0].files[0].options.images[0].url).toEqual('url/returned/from/service');
        expect(result.description).toEqual('stuff');
    });

    it('should replace all of the placeholder values with the values passed in for spatial transcriptomics', async () => {
        let selectedDataset = {
            'filename': 'imageName.tiff',
            'packageid': '123',
            'imagetype': 'stuff',
            'relatedfiles': ['{"filename": "file.zarr"}']
        };
        let result = await populateViewConfig(stViewConfig, selectedDataset);
        let resultString = JSON.stringify(result);
        let index = resultString.search('<*>');

        expect(index).toBe(-1);

        expect(result.datasets[0].files[2].options.images[0].name).toEqual('imageName.tiff');
        expect(result.datasets[0].files[2].options.images[0].url).toEqual('url/returned/from/service');
        expect(result.datasets[0].files[0].url).toEqual('https://kpmp-knowledge-environment-public.s3.amazonaws.com/123/derived/file.zarr');
        expect(result.datasets[0].files[1].url).toEqual('https://kpmp-knowledge-environment-public.s3.amazonaws.com/123/derived/file.zarr');
        expect(result.description).toEqual('stuff');
    });

    it('should handle missing Image Type', async () => {
        let selectedDataset = {
            'filename': 'imageName.tiff',
            'relatedfiles': []
        };
        let result = await populateViewConfig(threeDCytometryViewConfig, selectedDataset);
        let resultString = JSON.stringify(result);
        let index = resultString.search('<*>');
        expect(index).toBe(-1);
        expect(result.description).toEqual('');
    });

});

describe ('getDatasetInfo', () => {
    it('should return whole slide image string with level included', () => {
        const selectedDataset = {
            "datatype": "Light Microscopic Whole Slide Images",
            "imagetype": "Jones' Methenamine Silver (SIL) histochemical stain",
            "level": "L12"
          }

        let datasetInfo = getDatasetInfo(selectedDataset);
        let expectedInfo = "Jones' Methenamine Silver (SIL) histochemical stain (L12)";

        expect(datasetInfo).toBe(expectedInfo);
    });
    it('should return whole slide image string without level included', () => {
        const selectedDataset = {
            "datatype": "Light Microscopic Whole Slide Images",
            "imagetype": "Jones' Methenamine Silver (SIL) histochemical stain",
          }

        let datasetInfo = getDatasetInfo(selectedDataset);
        let expectedInfo = "Jones' Methenamine Silver (SIL) histochemical stain";

        expect(datasetInfo).toBe(expectedInfo);
    });
    it('should return a Label-free auto-fluorescent image', () => {
        const selectedDataset = {
            "datatype": "Label-free auto-fluorescent image",
            "imagetype": "Jones' Methenamine Silver (SIL) histochemical stain",
          }

        let datasetInfo = getDatasetInfo(selectedDataset);
        let expectedInfo = "Jones' Methenamine Silver (SIL) histochemical stain";

        expect(datasetInfo).toBe(expectedInfo);
    });
    it('should return an empty string if image type not present for 3d Cyto', () => {
        const selectedDataset = {
            "datatype": "Label-free auto-fluorescent image",
          }

        let datasetInfo = getDatasetInfo(selectedDataset);
        let expectedInfo = "";

        expect(datasetInfo).toBe(expectedInfo);
    });
    it('should return an empty string if image type not present for Whole slide image', () => {
        const selectedDataset = {
            "datatype": "Light Microscopic Whole Slide Images",
          }

        let datasetInfo = getDatasetInfo(selectedDataset);
        let expectedInfo = "";

        expect(datasetInfo).toBe(expectedInfo);
    });
})

describe('getPublicFileLink',() => {
    it('should generate the url', () => {
        let fileLink = getPublicFileLink("12345", "filename");
        expect(fileLink).toBe('https://kpmp-knowledge-environment-public.s3.amazonaws.com/12345/derived/filename');
    });
});

describe('getImageTypeTooltipCopy',() => {
     it('should return empty when copy not available', () => {
        const expectedCopy = '';
        const copy = getImageTypeTooltipCopy('');
        expect(copy).toBe(expectedCopy);
    });

    it('should return empty when copy not available', () => {
        const expectedCopy = '';
        const copy = getImageTypeTooltipCopy('AS(DJ9asdjasd');
        expect(copy).toBe(expectedCopy);
    });

     it('should return copy for RGB max projection of 8-channel immunofluorescence image volume', () => {
        const expectedCopy = '8-channel volume combined into a single maximum projection and converted to RGB color space.';
        const copy = getImageTypeTooltipCopy('RGB max projection of 8-channel immunofluorescence image volume');
        expect(copy).toBe(expectedCopy);
    });

     it('should return copy for Composite max projection of 8-channel immunofluorescence image volume', () => {
        const expectedCopy = '8-channel volume combined into a single maximum projection; composite image consists of 8 channels.';
        const copy = getImageTypeTooltipCopy('Composite max projection of 8-channel immunofluorescence image volume');
        expect(copy).toBe(expectedCopy);
    });

     it('should return copy for Composite 3D 8-channel immunofluorescence image volume', () => {
        const expectedCopy = '3D volume completely represented as a stack of individual, 8-channel images. Every focal plane image and every channel can be independently inspected.';
        const copy = getImageTypeTooltipCopy('Composite 3D 8-channel immunofluorescence image volume');
        expect(copy).toBe(expectedCopy);
    });

     it('should return copy for RGB max projection of 2-channel (autofluorescence and second harmonic generation) image volume', () => {
        const expectedCopy = 'Projection of 3D volume collected prior to labeling; channels cannot be controlled.';
        const copy = getImageTypeTooltipCopy('RGB max projection of 2-channel (autofluorescence and second harmonic generation) image volume');
        expect(copy).toBe(expectedCopy);
    });

    });

