export function isFiltered(value, filterValue) {
  return (((value).toLowerCase()).indexOf(filterValue.toLowerCase()) >= 0 || filterValue === '' )
}
