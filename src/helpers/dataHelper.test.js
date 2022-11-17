import {mapClinicalKeysToPresentationStyle, mapSummaryKeysToPresentationStyle} from './dataHelper'

describe('dataHelper', () => {
    describe('mapSummaryKeysToPresentationStyle', () => {
        it('should return remapped values when object params given', () => {
            let summaryUnmapped = {
                redcapId: "test-redcapId",
                tissueType: "test-tissueType"
            };
            let summaryMappingResult = mapSummaryKeysToPresentationStyle(summaryUnmapped);
            let expectedSummaryMapping = {
                'Participant ID': "test-redcapId",
                'Disease Type': "test-tissueType"
            }
            expect(summaryMappingResult).toEqual(expectedSummaryMapping);
        }),
        it('should return remapped values when some values from object params given', () => {
            let summaryUnmapped = {
                redcapId: "test-redcapId",
                tissueType: ""
            };
            let summaryMappingResult = mapSummaryKeysToPresentationStyle(summaryUnmapped);
            let expectedSummaryMapping = {
                'Participant ID': "test-redcapId",
                'Disease Type': ""
            }
            expect(summaryMappingResult).toEqual(expectedSummaryMapping);
        }),
        it('should return remapped values when some values from object params given', () => {
            let summaryUnmapped = {
                redcapId: "",
                tissueType: "test-tissueType"
            };
            let summaryMappingResult = mapSummaryKeysToPresentationStyle(summaryUnmapped);
            let expectedSummaryMapping = {
                'Participant ID': "",
                'Disease Type': "test-tissueType"
            }
            expect(summaryMappingResult).toEqual(expectedSummaryMapping);
        }),
        it('should return empty values when empty object params given', () => {
            let summaryUnmapped = {};
            let summaryMappingResult = mapSummaryKeysToPresentationStyle(summaryUnmapped);
            let expectedSummaryMapping = {
                'Participant ID': "",
                'Disease Type': ""
            }
            expect(summaryMappingResult).toEqual(expectedSummaryMapping);
        }),
        it('should return empty values when null params given', () => {
            let summaryUnmapped = null
            let summaryMappingResult = mapSummaryKeysToPresentationStyle(summaryUnmapped);
            let expectedSummaryMapping = {
                'Participant ID': "",
                'Disease Type': ""
            }
            expect(summaryMappingResult).toEqual(expectedSummaryMapping);
        });
        it('should return empty values when no params given', () => {
            let summaryMappingResult = mapSummaryKeysToPresentationStyle();
            let expectedSummaryMapping = {
                'Participant ID': "",
                'Disease Type': ""
            }
            expect(summaryMappingResult).toEqual(expectedSummaryMapping);
        });
    })

    describe('mapClinicalKeysToPresentationStyle', () => {
        it('should return remapped values when object params given', () => {
            let clinicalUnmapped = {};
            clinicalUnmapped['A1c (%) (Binned)']= "test-a1c";
            clinicalUnmapped['Albuminuria (mg) (Binned)'] = "test-albuminuria";
            clinicalUnmapped['Baseline eGFR (ml/min/1.73m2) (Binned) '] = "test-baseline_egfr";
            clinicalUnmapped['Diabetes Duration (Years)'] = "test-diabetes_duration";
            clinicalUnmapped['Diabetes History'] = "test-diabetes_history";
            clinicalUnmapped['Hypertension Duration (Years)'] = "test-hypertension_duration";
            clinicalUnmapped['Hypertension History'] = "test-hypertension_history";
            clinicalUnmapped['KDIGO Stage'] = "test-kdigo_stage";
            clinicalUnmapped['On RAAS Blockade'] = "test-on_raas_blockade";
            clinicalUnmapped['Proteinuria (mg) (Binned)'] = "test-proteinuria";
            clinicalUnmapped['Race'] = "test-Ethnicity";
            clinicalUnmapped['Age (Years) (Binned)'] = "test-Age";
            clinicalUnmapped['Sex'] = "test-sex";
            clinicalUnmapped['Protocol'] = "test-Protocol";
            clinicalUnmapped['Sample Type'] = "test-Sample Type";
            clinicalUnmapped['Tissue Source'] = "test-Tissue Source";
            const clinicalMappingResult = mapClinicalKeysToPresentationStyle(clinicalUnmapped);
            const expectedClinicalMapping = {};
            expectedClinicalMapping['A1C (%)']= "test-a1c";
            expectedClinicalMapping['Albuminuria (mg)'] = "test-albuminuria";
            expectedClinicalMapping['Baseline_eGFR (ml/min/1.73m2)'] = "test-baseline_egfr";
            expectedClinicalMapping['Diabetes Duration (Years)'] = "test-diabetes_duration";
            expectedClinicalMapping['Diabetes History'] = "test-diabetes_history";
            expectedClinicalMapping['Hypertension Duration (years)'] = "test-hypertension_duration";
            expectedClinicalMapping['Hypertension History'] = "test-hypertension_history";
            expectedClinicalMapping['KDIGO Stage'] = "test-kdigo_stage";
            expectedClinicalMapping['On RAAS Blockade'] = "test-on_raas_blockade";
            expectedClinicalMapping['Proteinuria (mg)'] = "test-proteinuria";
            expectedClinicalMapping['Ethnicity'] = "test-Ethnicity";
            expectedClinicalMapping['Age (Years)'] = "test-Age";
            expectedClinicalMapping['Sex'] = "test-sex";
            expectedClinicalMapping['Protocol'] = "test-Protocol";
            expectedClinicalMapping['Sample Type'] = "test-Sample Type";
            expectedClinicalMapping['Tissue Source'] = "test-Tissue Source";
            expect(clinicalMappingResult).toEqual(expectedClinicalMapping);
        }),
        it('should return remapped values when object params given even when bad data is sent', () => {
            let clinicalUnmapped = {};
            clinicalUnmapped['A1c (%) (EXAMPLE SHOULD BE BINNED)']= "test-a1c";
            clinicalUnmapped['Albuminuria (mg) (Binned)'] = "test-albuminuria";
            const clinicalMappingResult = mapClinicalKeysToPresentationStyle(clinicalUnmapped);
            const expectedClinicalMapping = {};
            expectedClinicalMapping['A1C (%)']= "";
            expectedClinicalMapping['Albuminuria (mg)'] = "test-albuminuria";
            expectedClinicalMapping['Baseline_eGFR (ml/min/1.73m2)'] = "";
            expectedClinicalMapping['Diabetes Duration (Years)'] = "";
            expectedClinicalMapping['Diabetes History'] = "";
            expectedClinicalMapping['Hypertension Duration (years)'] = "";
            expectedClinicalMapping['Hypertension History'] = "";
            expectedClinicalMapping['KDIGO Stage'] = "";
            expectedClinicalMapping['On RAAS Blockade'] = "";
            expectedClinicalMapping['Proteinuria (mg)'] = "";
            expectedClinicalMapping['Ethnicity'] = "";
            expectedClinicalMapping['Age (Years)'] = "";
            expectedClinicalMapping['Sex'] = "";
            expectedClinicalMapping['Protocol'] = "";
            expectedClinicalMapping['Sample Type'] = "";
            expectedClinicalMapping['Tissue Source'] = "";
            expect(clinicalMappingResult).toEqual(expectedClinicalMapping);
        }),
        it('should return remapped values when empty object params given', () => {
            let clinicalUnmapped = {};
            const clinicalMappingResult = mapClinicalKeysToPresentationStyle(clinicalUnmapped);
            const expectedClinicalMapping = {};
            expectedClinicalMapping['A1C (%)']= "";
            expectedClinicalMapping['Albuminuria (mg)'] = "";
            expectedClinicalMapping['Baseline_eGFR (ml/min/1.73m2)'] = "";
            expectedClinicalMapping['Diabetes Duration (Years)'] = "";
            expectedClinicalMapping['Diabetes History'] = "";
            expectedClinicalMapping['Hypertension Duration (years)'] = "";
            expectedClinicalMapping['Hypertension History'] = "";
            expectedClinicalMapping['KDIGO Stage'] = "";
            expectedClinicalMapping['On RAAS Blockade'] = "";
            expectedClinicalMapping['Proteinuria (mg)'] = "";
            expectedClinicalMapping['Ethnicity'] = "";
            expectedClinicalMapping['Age (Years)'] = "";
            expectedClinicalMapping['Sex'] = "";
            expectedClinicalMapping['Protocol'] = "";
            expectedClinicalMapping['Sample Type'] = "";
            expectedClinicalMapping['Tissue Source'] = "";
            expect(clinicalMappingResult).toEqual(expectedClinicalMapping);
        }),
        it('should return remapped values when null params given', () => {
            let clinicalUnmapped = null;
            const clinicalMappingResult = mapClinicalKeysToPresentationStyle(clinicalUnmapped);
            const expectedClinicalMapping = {};
            expectedClinicalMapping['A1C (%)']= "";
            expectedClinicalMapping['Albuminuria (mg)'] = "";
            expectedClinicalMapping['Baseline_eGFR (ml/min/1.73m2)'] = "";
            expectedClinicalMapping['Diabetes Duration (Years)'] = "";
            expectedClinicalMapping['Diabetes History'] = "";
            expectedClinicalMapping['Hypertension Duration (years)'] = "";
            expectedClinicalMapping['Hypertension History'] = "";
            expectedClinicalMapping['KDIGO Stage'] = "";
            expectedClinicalMapping['On RAAS Blockade'] = "";
            expectedClinicalMapping['Proteinuria (mg)'] = "";
            expectedClinicalMapping['Ethnicity'] = "";
            expectedClinicalMapping['Age (Years)'] = "";
            expectedClinicalMapping['Sex'] = "";
            expectedClinicalMapping['Protocol'] = "";
            expectedClinicalMapping['Sample Type'] = "";
            expectedClinicalMapping['Tissue Source'] = "";
            expect(clinicalMappingResult).toEqual(expectedClinicalMapping);
        })
    })
})
