/* eslint-disable no-unused-expressions */
import {mapClinicalKeysToPresentationStyle, mapSummaryKeysToPresentationStyle} from './dataHelper'

describe('dataHelper', () => {
    describe('mapSummaryKeysToPresentationStyle', () => {
        it('should return remapped values when object params given', () => {
            let summaryUnmapped = {
                redcapId: "test-redcapId",
                enrollmentCategory: "test-enrollmentCategory",
                adjudicatedCategory: "test-adjudicatedCategory"
            };
            let summaryMappingResult = mapSummaryKeysToPresentationStyle(summaryUnmapped);
            let expectedSummaryMapping = {
                'Participant ID': "test-redcapId",
                'Enrollment Category': "test-enrollmentCategory",
                'Primary Adjudicated Category': "test-adjudicatedCategory"
            }
            expect(summaryMappingResult).toEqual(expectedSummaryMapping);
        }),
        it('should return remapped values when some values from object params given', () => {
            let summaryUnmapped = {
                redcapId: "test-redcapId",
                enrollmentCategory: "",
                adjudicatedCategory: ""
            };
            let summaryMappingResult = mapSummaryKeysToPresentationStyle(summaryUnmapped);
            let expectedSummaryMapping = {
                'Participant ID': "test-redcapId",
                'Enrollment Category': "",
                'Primary Adjudicated Category': ""
            }
            expect(summaryMappingResult).toEqual(expectedSummaryMapping);
        }),
        it('should return remapped values when some values from object params given', () => {
            let summaryUnmapped = {
                redcapId: "",
                enrollmentCategory: "test-enrollmentCategory",
                adjudicatedCategory: ""
            };
            let summaryMappingResult = mapSummaryKeysToPresentationStyle(summaryUnmapped);
            let expectedSummaryMapping = {
                'Participant ID': "",
                'Enrollment Category': "test-enrollmentCategory",
                'Primary Adjudicated Category': ""
            }
            expect(summaryMappingResult).toEqual(expectedSummaryMapping);
        }),
        it('should return empty values when empty object params given', () => {
            let summaryUnmapped = {};
            let summaryMappingResult = mapSummaryKeysToPresentationStyle(summaryUnmapped);
            let expectedSummaryMapping = {
                'Participant ID': "",
                'Enrollment Category': "",
                'Primary Adjudicated Category': ""
            }
            expect(summaryMappingResult).toEqual(expectedSummaryMapping);
        }),
        it('should return empty values when null params given', () => {
            let summaryUnmapped = null
            let summaryMappingResult = mapSummaryKeysToPresentationStyle(summaryUnmapped);
            let expectedSummaryMapping = {
                'Participant ID': "",
                'Enrollment Category': "",
                'Primary Adjudicated Category': ""
            }
            expect(summaryMappingResult).toEqual(expectedSummaryMapping);
        });
        it('should return empty values when no params given', () => {
            let summaryMappingResult = mapSummaryKeysToPresentationStyle();
            let expectedSummaryMapping = {
                'Participant ID': "",
                'Enrollment Category': "",
                'Primary Adjudicated Category': ""
            }
            expect(summaryMappingResult).toEqual(expectedSummaryMapping);
        });
    })

    describe('mapClinicalKeysToPresentationStyle', () => {
        it('should return remapped values when object params given', () => {
            let clinicalUnmapped = {
                "a1c": "test-a1c",
                "albuminuria": "test-albuminuria",
                "baselineEgfr": "test-baseline_egfr",
                "diabetesDuration": "test-diabetes_duration",
                "diabetesHistory": "test-diabetes_history",
                "hypertensionDuration": "test-hypertension_duration",
                "hypertensionHistory": "test-hypertension_history",
                "kdigoStage": "testdkigo_stage",
                "onRaasBlockade": "test-on_raas_blockade",
                "proteinuria": "proteinuria",
                "race": "test-race",
                "age": "test-Age",
                "sex": "test-sex",
                "protocol": "test-protocol",
                "sampleType": "test-sample_type",
                "tissueSource": "test-tissue_source",
                "ageBinned": "test-age"
            };
            const clinicalMappingResult = mapClinicalKeysToPresentationStyle(clinicalUnmapped);
            const expectedClinicalMapping =   {
                'A1C': "test-a1c",
                'Albuminuria': 'test-albuminuria',
                'Baseline eGFR': 'test-baseline_egfr',
                'Diabetes Duration': 'test-diabetes_duration',
                'Diabetes History': 'test-diabetes_history',
                'Hypertension Duration': 'test-hypertension_duration',
                'Hypertension History': 'test-hypertension_history',
                'KDIGO Stage': 'testdkigo_stage',
                'RAAS Blockade': 'test-on_raas_blockade',
                'Proteinuria': 'proteinuria',
                'Race': 'test-race',
                'Age': 'test-age',
                'Sample Type': 'test-sample_type',
                'Sex': 'test-sex',
                'Protocol': 'test-protocol',
                'Tissue Source': 'test-tissue_source'
              }
            expect(clinicalMappingResult).toEqual(expectedClinicalMapping);
        }),
        it('should return remapped values when object params given even when bad data is sent', () => {
            let clinicalUnmapped = {
                "a1c": "test-a1c",
                "albuminuria": "test-albuminuria",
            };
            const clinicalMappingResult = mapClinicalKeysToPresentationStyle(clinicalUnmapped);
            const expectedClinicalMapping = {
                'A1C': "test-a1c",
                'Albuminuria': 'test-albuminuria',
                'Baseline eGFR': '',
                'Diabetes Duration': '',
                'Diabetes History': '',
                'Hypertension Duration': '',
                'Hypertension History': '',
                'KDIGO Stage': '',
                'RAAS Blockade': '',
                'Proteinuria': '',
                'Race': '',
                'Age': '',
                'Sample Type': '',
                'Sex': '',
                'Protocol': '',
                'Tissue Source': ''
            };
            expect(clinicalMappingResult).toEqual(expectedClinicalMapping);
        }),
        it('should return remapped values when empty object params given', () => {
            let clinicalUnmapped = {};
            const clinicalMappingResult = mapClinicalKeysToPresentationStyle(clinicalUnmapped);
            const expectedClinicalMapping = {
                'A1C': "",
                'Albuminuria': '',
                'Baseline eGFR': '',
                'Diabetes Duration': '',
                'Diabetes History': '',
                'Hypertension Duration': '',
                'Hypertension History': '',
                'KDIGO Stage': '',
                'RAAS Blockade': '',
                'Proteinuria': '',
                'Race': '',
                'Age': '',
                'Sample Type': '',
                'Sex': '',
                'Protocol': '',
                'Tissue Source': ''
            };
            expect(clinicalMappingResult).toEqual(expectedClinicalMapping);
        }),
        it('should return remapped values when null params given', () => {
            let clinicalUnmapped = null;
            const clinicalMappingResult = mapClinicalKeysToPresentationStyle(clinicalUnmapped);
            const expectedClinicalMapping = {
                'A1C': "",
                'Albuminuria': '',
                'Baseline eGFR': '',
                'Diabetes Duration': '',
                'Diabetes History': '',
                'Hypertension Duration': '',
                'Hypertension History': '',
                'KDIGO Stage': '',
                'RAAS Blockade': '',
                'Proteinuria': '',
                'Race': '',
                'Age': '',
                'Sample Type': '',
                'Sex': '',
                'Protocol': '',
                'Tissue Source': ''
            };
            expect(clinicalMappingResult).toEqual(expectedClinicalMapping);
        })
    })
})