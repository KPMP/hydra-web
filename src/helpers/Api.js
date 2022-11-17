import axios from 'axios';
import { apolloClient } from './ApolloClient';
import { gql } from "@apollo/client";
import { store } from '../App';
import { sendMessageToBackend } from '../actions/Error/errorActions';

export default class Api {
  static getInstance() {
    return axios.create({
      timeout: 10000,
    });
  }
}

export const getFileLink = async (queryString) => {
  const api_host = process.env.REACT_APP_API_HOST ? process.env.REACT_APP_API_HOST : '';
  return Api.getInstance().get(api_host + "/api/v1/derived/download/" + queryString)
};


export const fetchParticipantSummaryDataset = async (redcapId) => {
  const query = gql`
  query participantSummaryDataset($redcapId: String) {
    participantSummaryDataset(redcapId: $redcapId){
      tissueType
      redcapId
    }
  }`;
  const response = await apolloClient.query({
      query: query,
      variables: {
        redcapId: redcapId
      }
    });
  if (response && response.data && response.data.participantSummaryDataset) {
      return response.data.participantSummaryDataset;
  } else {
      store.dispatch(sendMessageToBackend("Could not retrieve participantSummaryDataset: " + response.error));
  }
};

export const fetchParticipantExperimentCounts = async (redcapId) => {
  const response = await apolloClient.query({
    query: gql`
      query {
        getDataTypeInformationByParticipant(redcapId: "${redcapId}") {
          spatialViewerDataTypes {
            count
            dataType
            isAggregatedData
          }
          explorerDataTypes {
            count
            dataType
            isAggregatedData
          }
        }
      }`
  });

  if (response && response.data && response.data.getDataTypeInformationByParticipant) {
    return response.data.getDataTypeInformationByParticipant;
  } else {
    store.dispatch(sendMessageToBackend("Could not retrieve getDataTypeInformationByParticipant: " + response.error));
  }
};

export const fetchParticipantClinicalDataset = async (redcapId) => {
  const query = gql`
  query participantClinicalDataset($redcapId: String) {
    participantClinicalDataset(redcapId: $redcapId){
      clinicalData
    }
  }`;
  const response = await apolloClient.query({
      query: query,
      variables: {
        redcapId: redcapId
      }
    });
  if (response && response.data && response.data.participantClinicalDataset) {
      return response.data.participantClinicalDataset;
  } else {
      store.dispatch(sendMessageToBackend("Could not retrieve participantClinicalDataset: " + response.error));
  }
};