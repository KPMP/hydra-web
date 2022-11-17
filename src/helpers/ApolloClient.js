import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import 'isomorphic-unfetch';
import { sendMessageToBackend } from '../actions/Error/errorActions';
import { store } from '../App'

const getBaseURL = () => {
    return process.env.REACT_APP_API_HOST ? process.env.REACT_APP_API_HOST : '';
};

const httpLink = new HttpLink({
    uri: getBaseURL() + '/graphql'
});

console.log(httpLink)

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
            store.dispatch(sendMessageToBackend(
                `GraphQL error: Message: ${message}, Location: ${locations}, Path: ${path}`,true
            )),
        );

    if (networkError) {
        let { response } = operation.getContext()

        if (response) {
            store.dispatch(sendMessageToBackend("Could not connect to GraphQL: " + networkError, true));
        } else {
            // No response received, user is probably attempting to navigate away during a data fetch
            const shouldUseRedirect = false;
            store.dispatch(sendMessageToBackend("Could not connect to GraphQL: " + networkError, shouldUseRedirect));
        }
    };
});
const typePolicies = {
  participantClinicalDataset: {
      keyFields: [
        "redcap_id",
        "tissue_type",
      ]
  }
};

export const apolloClient = new ApolloClient({
    cache: new InMemoryCache({ typePolicies: typePolicies }),
    link: from([errorLink, httpLink]),
    fetchOptions: {
        fetchOptions: { fetch },
        mode: 'no-cors',
    },
});

