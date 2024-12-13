# Changelog

## Release 1.6 (unreleased)
Brief summary of what's in this release:
- Combined filter trees into single one
- reorganized filters (made filter groupings)
- updates to graphql endpoints to get clinical data
- added clinical data facets (filters)
- added hovers to the filter pills to help disambiguate values
- Removed units from participant report since those units will now show up in the values
- updated code to show total number of files when no filters to get around an issue with app search having a 10K result limit
  - Note: This is a temporary fix, and will only really work until we have a filter that returns more than 10k results
- updated kpmp-common-components to get new menu options

### Breaking changes
Breaking changes include any database updates needed, if we need to edit any files on system (like .env or certs, etc). Things that are outside of the code itself that need changed for the system to work.
- This won't work with previous versions of pegasus-data because the endpoints to return the clinical data have changed

----

## Release 1.5 (10/3/2024)
Brief summary of what's in this release:
- "Recently released" is on both tabs
- Experimental Strategy sorting improvements
- Remove download GA event (moved to Atlas File Service)
- Participant ID visibility fix

### Breaking changes
None

### Non-breaking changes
- fixed a bug where the participant filters wouldn't go back to their default state after clicking the Clear Filters button
- added participant id to the url in the report page


## Release 1.4 (released 07/08/2024)
Brief summary of what's in this release:
- introduced this changelog
- updated the package.json version


### Breaking changes

Breaking changes include any database updates needed, if we need to edit any files on system (like .env or certs, etc). Things that are outside of the code itself that need changed for the system to work.


### Non-breaking changes

Just a place to keep track of things that have changed in the code that we may want to pay special attention to when smoke testing, etc.
