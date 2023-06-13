import React, { Component } from 'react';
import { NavBar, NavFooter } from 'kpmp-common-components';
import loadedState from './initialState';
import { createStore, applyMiddleware } from 'redux';
import appReducer from './reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import ReactGA from 'react-ga4';
import { createBrowserHistory } from 'history';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import ErrorBoundaryContainer from './components/Error/ErrorBoundaryContainer';
import Oops from './components/Error/Oops';
import NotFoundPage from './components/Error/NotFoundPage';
import FileListContainer from "./components/Repository/FileListContainer";
import packagejson from '../package.json';
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import { SearchProvider } from "@elastic/react-search-ui";

const cacheStore = window.sessionStorage.getItem('hyrda-redux-store');
const initialState = cacheStore ? JSON.parse(cacheStore) : loadedState;
export const store = applyMiddleware(thunk)(createStore)(
  appReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const saveState = () => {
  window.sessionStorage.setItem(
    'hydra-redux-store',
    JSON.stringify(store.getState())
  );
};

// *** Get a new tracking Id and add it here *** //
const GA_TRACKING_ID = 'G-64W6E37TQB';

ReactGA.initialize(GA_TRACKING_ID,{ testMode: process.env.NODE_ENV === 'test' ? true : false });
function logPageView(location, action) {
  ReactGA.set({ page: location.pathname + location.search });
  ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
}
const history = createBrowserHistory();
history.listen((location, action) => {
  logPageView(location, action);
});

store.subscribe(function () {
  console.log(store.getState());
});

store.subscribe(saveState);

const connector = new AppSearchAPIConnector({
  searchKey: process.env.REACT_APP_SEARCH_KEY,
  endpointBase: process.env.REACT_APP_SEARCH_ENDPOINT,
  engineName: "atlas-repository",
  cacheResponses: false
})

const searchConfig = {
  apiConnector: connector,
  searchQuery: {
      disjunctiveFacets: [
        "id",
        "data_format",
        "access",
        "redcap_id",
        "file_name",
        "data_category",
        "workflow_type",
        "package_id",
        "platform",
        "file_size",
        "file_id",
        "data_type",
        "dois",
        "experimental_strategy",
        "sex",
        "age_binned",
        "tissue_type",
        "sample_type",
        "tissue_source",
        "protocol",
        "release_version"
      ],
      facets: {
        id: { type: "value", size: 100},
        data_format: { type: "value", size: 100},
        access: { type: "value", size: 100},
        redcap_id: { type: "value", size: 100},
        file_name: { type: "value", size: 100},
        data_category: { type: "value", size: 100},
        workflow_type: { type: "value", size: 100},
        package_id: { type: "value", size: 100},
        platform: { type: "value", size: 100},
        file_size: { type: "value", size: 100},
        file_id: { type: "value", size: 100},
        data_type: { type: "value", size: 100},
        dois: { type: "value", size: 100},
        experimental_strategy: { type: "value", size: 100},
        sex: { type: "value", size: 100},
        age_binned: { type: "value", size: 100},
        tissue_type: { type: "value", size:100},
        sample_type: { type: "value", size: 100},
        tissue_source: { type: "value", size: 100},
        protocol: { type: "value", size: 100},
        release_version: { type: "value", size: 100}
      }
  },
  initialState: {
    resultsPerPage: 1000
  },
  alwaysSearchOnInitialLoad: true
}

class App extends Component {
  componentWillMount() {
    logPageView(window.location, '');
  }

  render() {
    return (
      <Provider store={store}>
        <SearchProvider config={searchConfig}>
        <BrowserRouter history={history} basename={packagejson.baseURL}>
          <ErrorBoundaryContainer>
            <NavBar app='atlas' />
            <Switch>
              <Route exact path="/" component={FileListContainer} store={store} />
              <Route exact path="/oops" component={Oops} />
              <Route path='*' component={NotFoundPage} />
            </Switch>
            <NavFooter app='atlas' />
          </ErrorBoundaryContainer>
        </BrowserRouter>
        </SearchProvider>
      </Provider>
    );
  }
}

export default App;
