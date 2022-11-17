import {
  isFiltered,
} from './columnArrangementDialogHelpers';

describe('columnArrangementDialogHelpers', () => {
  describe('isFiltered', () => {
    it('should return true when filterValue is same as value', () => {
      const result = isFiltered('Foo', 'Foo')
      const expected = true
      expect(result).toEqual(expected);
    }),
    it('should return true when lowercase filterValue is same as value', () => {
      const result = isFiltered('Foo', 'foo')
      const expected = true
      expect(result).toEqual(expected);
    }),
    it('should return true when filterValue is portion of value', () => {
      const result = isFiltered('Foo', 'fo')
      const expected = true
      expect(result).toEqual(expected);
    }),
    it('should return true when filterValue is portion of value', () => {
      const result = isFiltered('Foo', 'f')
      const expected = true
      expect(result).toEqual(expected);
    }),
    it('should return true when filterValue empty', () => {
      const result = isFiltered('Foo', 'oo')
      const expected = true
      expect(result).toEqual(expected);
    }),
    it('should return true when filterValue empty', () => {
      const result = isFiltered('Foo', '')
      const expected = true
      expect(result).toEqual(expected);
    }),
    it('should return false when filterValue does not match order of value', () => {
      const result = isFiltered('Foo', 'ooF')
      const expected = false
      expect(result).toEqual(expected);
    }),
    it('should return false when filterValue does not match value', () => {
      const result = isFiltered('Foo', 'abc')
      const expected = false
      expect(result).toEqual(expected);
    })
  })
})

