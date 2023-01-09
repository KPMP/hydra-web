# hydra-web
This is the front-end code for the KPMP data repository. 

# Notes.

Currently the app-search is using the spatial-viewers elastic-search index, this requires the src/App.js file has an "endpointBase" variable set to "/spatial-viewer/search" instead of "/repository/search". This is a temporary solution until the repository has its own elastic-search index.
