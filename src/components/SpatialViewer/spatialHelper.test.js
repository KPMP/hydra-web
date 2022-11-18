import { 
    compareTableStrings,
    includesLetter,
    compareNumeric } from './spatialHelper';

describe('includesLetter', () => {
    it('should return true with string 123abc123', () => {
        const result = includesLetter('123abc123')
        const expected = true
        expect(result).toEqual(expected)
    }),
    it('should return true with string 123abc', () => {
        const result = includesLetter('123abc')
        const expected = true
        expect(result).toEqual(expected)
    }),
    it('should return true with string abc', () => {
        const result = includesLetter('abc')
        const expected = true
        expect(result).toEqual(expected)
    }),
    it('should return false with string 123', () => {
        const result = includesLetter('123')
        const expected = false
        expect(result).toEqual(expected)
    }),
    it('should return true with string aA', () => {
        const result = includesLetter('aA')
        const expected = true
        expect(result).toEqual(expected)
    }),
    it('should return true with string A', () => {
        const result = includesLetter('A')
        const expected = true
        expect(result).toEqual(expected)
    })
});

describe('compareNumeric', () => {
    it('should be sorted when strings a equals b', () => {
        const a = '1'
        const b = '1'

        const compareResult = compareNumeric(a,b);

        const expectedresult = 0
        expect(compareResult).toEqual(expectedresult);
    }),
    it('should be sorted a before b when strings are 2 and 1', () => {
        const a = '2'
        const b = '1'

        const compareResult = compareNumeric(a,b);

        const expectedresult = -1
        expect(compareResult).toEqual(expectedresult);
    }),
    it('should be sorted b before a when strings are 1 and 2', () => {
        const a = '1'
        const b = '2'

        const compareResult = compareNumeric(a,b);

        const expectedresult = 1
        expect(compareResult).toEqual(expectedresult);
    }),
    it('should be sorted a before b when strings are 100 and 2', () => {
        const a = '100'
        const b = '2'

        const compareResult = compareNumeric(a,b);

        const expectedresult = -1
        expect(compareResult).toEqual(expectedresult);
    })
})

describe('compareTableStrings', () => {
    it('should be sorted when strings a equals b', () => {
        const a = {props: {children: '1'}}
        const b = {props: {children: '1'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 0
        expect(compareResult).toEqual(expectedresult);
    }),
    it('should be sorted when strings a equals b', () => {
        const a = {props: {children: '1a'}}
        const b = {props: {children: '1a'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 0
        expect(compareResult).toEqual(expectedresult);
    }),
    it('should be sorted when strings a equals b', () => {
        const a = {props: {children: 'A1'}}
        const b = {props: {children: 'A1'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 0
        expect(compareResult).toEqual(expectedresult);
    }),
    it('should be sorted when string A equals a', () => {
        const a = {props: {children: 'A'}}
        const b = {props: {children: 'a'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 0
        expect(compareResult).toEqual(expectedresult);
    }),
    it('should be sorted when string a equals A', () => {
        const a = {props: {children: 'a'}}
        const b = {props: {children: 'A'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 0
        expect(compareResult).toEqual(expectedresult);
    }),
    it('should be sorted when numbers a equals b', () => {
        const a = {props: {children: 10}}
        const b = {props: {children: 10}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 0
        expect(compareResult).toEqual(expectedresult);
    }),
    it('should be sorted when a equals b with dashed numbers and letters', () => {
        const a = {props: {children: '100-200-abc'}}
        const b = {props: {children: '100-200-abc'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 0
        expect(compareResult).toEqual(expectedresult);
    }),
    it('should be sorted when a equals b with dashed letters and numbers', () => {
        const a = {props: {children: 'abC-100-200'}}
        const b = {props: {children: 'abC-100-200'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 0
        expect(compareResult).toEqual(expectedresult);
    }),
    it('should sort a before b when letters a and b are compared', () => {
        const a = {props: {children: 'a'}}
        const b = {props: {children: 'b'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 1
        expect(compareResult).toEqual(expectedresult);
    }),
    it('should sort b before a when letters z and y are compared', () => {
        const a = {props: {children: 'z'}}
        const b = {props: {children: 'y'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = -1
        expect(compareResult).toEqual(expectedresult);
    }),
    it('should sort a before b when stringed numbers 1 and 0 are compared', () => {
        const a = {props: {children: '1'}}
        const b = {props: {children: '0'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 1
        expect(compareResult).toEqual(expectedresult);
    })
    it('should sort b before a when stringed numbers 0 and 1 are compared', () => {
        const a = {props: {children: '0'}}
        const b = {props: {children: '1'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = -1
        expect(compareResult).toEqual(expectedresult);
    }),
    it('should sort a before b when strings 1-0 and 0-0 are compared', () => {
        const a = {props: {children: '1-0'}}
        const b = {props: {children: '0-0'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 1
        expect(compareResult).toEqual(expectedresult);
    }),
    it('should sort a before b when strings 1-1 and 1-0 are compared', () => {
        const a = {props: {children: '1-1'}}
        const b = {props: {children: '1-0'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 1
        expect(compareResult).toEqual(expectedresult);
    }),
    it('should sort a before b when integer numbers 2 and 1 are compared', () => {
        const a = {props: {children: 2}}
        const b = {props: {children: 1}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort b before a when integer numbers 1 and 2 are compared', () => {
        const a = {props: {children: 1}}
        const b = {props: {children: 2}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = -1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort a before b when 32-10034 and 32-2 are compared', () => {
        const a = {props: {children: '32-10034'}}
        const b = {props: {children: '32-2'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort b before a when 32-2 and 32-10034 are compared', () => {
        const a = {props: {children: '32-2'}}
        const b = {props: {children: '32-10034'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = -1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort a before b when 32-10034a and 32-2b are compared', () => {
        const a = {props: {children: '32-10034a'}}
        const b = {props: {children: '32-2b'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort b before a when 32-2b and 32-10034a are compared', () => {
        const a = {props: {children: '32-2b'}}
        const b = {props: {children: '32-10034a'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = -1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort b before a when 32-10034b and 32-200000a are compared', () => {
        const a = {props: {children: '32-10034b'}}
        const b = {props: {children: '32-200000a'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = -1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort b before a when 32-10034 and 32-20034 are compared', () => {
        const a = {props: {children: '32-10034'}}
        const b = {props: {children: '32-20034'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = -1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort a before b when 32-aa and 32-bb are compared', () => {
        const a = {props: {children: '32-aa'}}
        const b = {props: {children: '32-bb'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort b before a when 32-bb and 32-aa are compared', () => {
        const a = {props: {children: '32-bb'}}
        const b = {props: {children: '32-aa'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = -1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort b before a when 32-ab and 32-aa are compared', () => {
        const a = {props: {children: '32-ab'}}
        const b = {props: {children: '32-aa'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = -1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort a before b when 32-aaa and 32-aaa are compared', () => {
        const a = {props: {children: '32-aaa'}}
        const b = {props: {children: '32-aab'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort a before b when 32-aaa and 32-aab are compared', () => {
        const a = {props: {children: '32-aaa'}}
        const b = {props: {children: '32-aab'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort b before a when 32-aaa and 32-aab are compared', () => {
        const a = {props: {children: '32-aabb'}}
        const b = {props: {children: '32-aaab'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = -1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort a before b when 32-100aa and 32-100bb are compared', () => {
        const a = {props: {children: '32-100aa'}}
        const b = {props: {children: '32-100bb'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort a before b when 32-200aa and 32-100bb are compared', () => {
        const a = {props: {children: '32-200aa'}}
        const b = {props: {children: '32-100bb'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort b before b when 32-1a and 32-1bb are compared', () => {
        const a = {props: {children: '32-1a'}}
        const b = {props: {children: '32-1bb'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort a before b when 32-100b and 32-2a are compared', () => {
        const a = {props: {children: '32-100b'}}
        const b = {props: {children: '32-2a'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort a before b when a32-100b and a32-2a are compared', () => {
        const a = {props: {children: 'a32-100b'}}
        const b = {props: {children: 'a32-2a'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort a before b when a32-100b and b32-2a are compared', () => {
        const a = {props: {children: 'a32-100b'}}
        const b = {props: {children: 'b32-2a'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort a before b when b32-100b and a32-2a are compared', () => {
        const a = {props: {children: 'b32-100b'}}
        const b = {props: {children: 'a32-2a'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = -1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort triple hyphen', () => {
        const a = {props: {children: 'a-a-b'}}
        const b = {props: {children: 'a-a-a'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = -1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort double and tripple hyphen', () => {
        const a = {props: {children: 'a-1'}}
        const b = {props: {children: 'a-a-a'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort identical triple hypen as equal', () => {
        const a = {props: {children: 'a-a-a'}}
        const b = {props: {children: 'a-a-a'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 0
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort triple hypen with numerics 1-1-100 and 1-1-20 ', () => {
        const a = {props: {children: '1-1-100'}}
        const b = {props: {children: '1-1-20'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort triple hypen with numerics 1-1-20 and 1-1-100', () => {
        const a = {props: {children: '1-1-20'}}
        const b = {props: {children: '1-1-100'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = -1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort double and triple hypen with 1-20 and 1-1-100', () => {
        const a = {props: {children: '1-20'}}
        const b = {props: {children: '1-1-100'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort double and triple hypen with 1-1-100 and 1-20', () => {
        const a = {props: {children: '1-1-100'}}
        const b = {props: {children: '1-20'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = -1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort numbers before letters with 19 and s', () => {
        const a = {props: {children: '19'}}
        const b = {props: {children: 'S'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort numbers before letters with s and 19', () => {
        const a = {props: {children: 'S'}}
        const b = {props: {children: '19'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = -1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort numbers before letters with external hypen with s-100 and 19-100', () => {
        const a = {props: {children: 'S-100'}}
        const b = {props: {children: '19-100'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = -1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort should sort numbers before letters with external hypen with 19-100 and s-100', () => {
        const a = {props: {children: '19-100'}}
        const b = {props: {children: 'a-100'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort should sort numbers before letters with triple hypen with S-1908-009689 and 19-0004-20', () => {
        const a = {props: {children: 'S-1908-009689'}}
        const b = {props: {children: '19-0004-20'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = -1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort by numbers after letters with aaa-bbb-100 and aaa-bbb-200', () => {
        const a = {props: {children: 'aaa-bbb-100'}}
        const b = {props: {children: 'aaa-bbb-200'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = -1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort by numbers after letters with 100-bbb-aaa and 200-bbb-aaa', () => {
        const a = {props: {children: '100-bbb-aaa'}}
        const b = {props: {children: '200-bbb-aaa'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = -1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort regardless of (), \' or spaces with Jones\' Methenamine Silver (SIL) histochemical stain and Trichrome (TRI) histochemical stain', () => {
        const a = {props: {children: 'Trichrome (TRI) histochemical stain'}}
        const b = {props: {children: 'Jones\' Methenamine Silver (SIL) histochemical stain'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = -1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should equal with \' not accounted for with Trichrome aaaaa and Trichrome\' aaaaa', () => {
        const a = {props: {children: 'Trichrome aaaaa'}}
        const b = {props: {children: 'Trichrome\' aaaaa'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 0
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort regardless of (), \' or spaces with Trichrome aaaaa and Trichrome\' bbbb', () => {
        const a = {props: {children: 'Trichrome aaaaa'}}
        const b = {props: {children: 'Trichrome\' bbbb'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort regardless of (), \' or spaces with Trichrome bbbb and Trichrome\' aaaa', () => {
        const a = {props: {children: 'Trichrome bbbb'}}
        const b = {props: {children: 'Trichrome\' aaaa'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = -1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should equal regardless of (), \' or spaces with Trichrome foo and Trichrome (\'-foo-\')', () => {
        const a = {props: {children: 'Trichrome foo'}}
        const b = {props: {children: 'Trichrome (\'-foo-\')'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 0
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort regardless of (), \' or spaces with Jones\' Methenamine Silver (SIL) histochemical stain and Composite 3D 8-channel immunofluorescence image volume', () => {
        const a = {props: {children: 'Jones\' Methenamine Silver (SIL) histochemical stain'}}
        const b = {props: {children: 'Composite 3D 8-channel immunofluorescence image volume'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = -1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort regardless of (), \' or spaces with Jones\' Methenamine Silver (SIL) histochemical stain and Periodic acid-Schiff (PAS) histochemical stain', () => {
        const a = {props: {children: 'Periodic acid-Schiff (PAS) histochemical stain'}}
        const b = {props: {children: 'Jones\' Methenamine Silver (SIL) histochemical stain'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = -1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort ', () => {
        const a = {props: {children: 'a'}}
        const b = {props: {children: 'b'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort regardless of (), \' or spaces with Composite 3d projection of 8-channel immunofluorescence image volumen and Composite max projection of 8-channel immunofluorescence image volumen', () => {
        const a = {props: {children: 'Composite 3d projection of 8-channel immunofluorescence image volumen'}}
        const b = {props: {children: 'Composite max projection of 8-channel immunofluorescence image volumen'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 1
        expect(compareResult).toEqual(expectedresult)
    })
});
