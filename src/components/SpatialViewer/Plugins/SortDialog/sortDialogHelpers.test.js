import {
  hasSortableColumns,
  isCheckboxChecked,
  isRadioChecked,
} from './sortDialogHelpers';

describe('sortDialogHelpers', () => {
  describe('isRadioChecked', () => {
    it('should return true when sortedColumns has name and direction present in same direction', () => {
      const sortedColumns = [
        {columnName: 'foo', direction: 'asc'}]
      const columnName = 'foo'
      const direction = 'asc'
      const result = isRadioChecked(
        sortedColumns,
        columnName,
        direction)
      const expected = true
      expect(result).toEqual(expected);
    }),
    it('should return false when sortedColumns has name and direction present in wrong direction', () => {
      const sortedColumns = [
        {columnName: 'foo', direction: 'asc'}]
      const columnName = 'foo'
      const direction = 'desc'
      const result = isRadioChecked(
        sortedColumns,
        columnName,
        direction)
      const expected = false
      expect(result).toEqual(expected);
    }),
    it('should return false when column name not equal', () => {
      const sortedColumns = [
        {columnName: 'bar', direction: 'asc'}]
      const columnName = 'foo'
      const direction = 'desc'
      const result = isRadioChecked(
        sortedColumns,
        columnName,
        direction)
      const expected = false
      expect(result).toEqual(expected);
    }),
    it('should return false when column name present but direction is not', () => {
      const sortedColumns = [
        {columnName: 'foo'}]
      const columnName = 'foo'
      const direction = 'desc'
      const result = isRadioChecked(
        sortedColumns,
        columnName,
        direction)
      const expected = false
      expect(result).toEqual(expected);
    }),
    it('should return false no sortedColumns', () => {
      const sortedColumns = []
      const columnName = 'foo'
      const direction = 'desc'
      const result = isRadioChecked(
        sortedColumns,
        columnName,
        direction)
      const expected = false
      expect(result).toEqual(expected);
    })
  }),
  describe('hasSortableColumns', () => {
    it('should return true when sortedColumns has values', () => {
      const sortedColumns = [{columnName: 'foo', direction: 'asc'}]
      const result = hasSortableColumns(sortedColumns)
      const expected = true
      expect(result).toEqual(expected);
    }),
    it('should return false when sortedColumns is empty', () => {
      const sortedColumns = []
      const result = hasSortableColumns(sortedColumns)
      const expected = false
      expect(result).toEqual(expected);
    }),
    it('should return false when sortedColumns is undefined', () => {
      const sortedColumns = undefined
      const result = hasSortableColumns(sortedColumns)
      const expected = false
      expect(result).toEqual(expected);
    }),
    it('should return false when sortedColumns is wrong type', () => {
      const sortedColumns = 'foo'
      const result = hasSortableColumns(sortedColumns)
      const expected = false
      expect(result).toEqual(expected);
    })
  }),
  describe('isCheckboxChecked', () => {
    it('should return true when sortedColumns has name present', () => {
      const sortedColumns = [
        {columnName: 'foo'}]
      const columnName = 'foo'
      const result = isCheckboxChecked(sortedColumns, columnName)
      const expected = true
      expect(result).toEqual(expected);
    }),
    it('should return false when sortedColumns has no name present', () => {
      const sortedColumns = [{fake: 'foo'}]
      const columnName = 'foo'
      const result = isCheckboxChecked(sortedColumns, columnName)
      const expected = false
      expect(result).toEqual(expected);
    }),
    it('should return false when sortedColumns has incorrect name present', () => {
      const sortedColumns = [
        {columnName: 'bar'}]
      const columnName = 'foo'
      const result = isCheckboxChecked(sortedColumns, columnName)
      const expected = false
      expect(result).toEqual(expected);
    })
  })
})

