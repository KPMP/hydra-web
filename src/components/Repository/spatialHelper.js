export const includesLetter = (stringToCheck) => { return /[a-zA-Z]/.test(stringToCheck); }

export const compareNumeric = (a, b) => {
    let numberA = a.replace(/[a-z]/g, '');
    let numberB = b.replace(/[a-z]/g, '');
    
    if (parseInt(numberA) < parseInt(numberB)) {
        return 1
    } else if (parseInt(numberA) > parseInt(numberB)) {
        return -1
    } else {
        return 0
    }
}

export const getCharVal = (char) => {
    const charList = {
        'a': -1,
        'b': -2,
        'c': -3,
        'd': -4,
        'e': -5,
        'f': -6,
        'g': -7,
        'h': -8,
        'i': -9,
        'j': -10,
        'k': -11,
        'l': -12,
        'm': -13,
        'n': -14,
        'o': -15,
        'p': -16,
        'q': -17,
        'r': -18,
        's': -19,
        't': -20,
        'u': -21,
        'v': -22,
        'w': -23,
        'x': -24,
        'y': -25,
        'z': -26,
    }
    if(isNaN(char)) {
        if (charList[char]) {
            return charList[char]
        } else {
            return -100
        }
    } else {
        return char
    }
}

export const compareAlphaNumeric = (a, b) => {
    a = a.toLowerCase()
    b = b.toLowerCase()

    if (a === b) {
        return 0
    }

    // sort on numbers first
    const comparedNumerics = compareNumeric(a,b)
    if(comparedNumerics !== 0) {
        return comparedNumerics
    }
    
    // a AND b contains letters
    if (includesLetter(a) || includesLetter(b)) {
        let asplit = a.split('')
        let bsplit = b.split('')
        
        let index = 0
        for (let ele of asplit) { // eslint-disable-line
            if(bsplit[index] !== undefined && bsplit[index] !== undefined && getCharVal(asplit[index]) < getCharVal(bsplit[index])) {
                return 1
            } else if(bsplit[index] !== undefined && bsplit[index] !== undefined && getCharVal(asplit[index]) > getCharVal(bsplit[index])) {
                return -1
            }
            index++
        }
    }
}

export const compareTableStrings = (a, b) => {

    if(a && a.props && a.props.children && b && b.props && b.props.children) {
        if (typeof a.props.children === 'object') {
            a = a.props.children[0].props.children
            b = b.props.children[0].props.children
        } else {
            a = a.props.children
            b = b.props.children
        }
    }

    a = a.toString().split(/[-| |(|)|']/)
    b = b.toString().split(/[-| |(|)|']/)

    a = a.filter(x => x !== '');
    b = b.filter(x => x !== '');


    let compareValue = 0
    a.forEach((element, index) => {
        if(compareValue === 0 && a[index] && b[index] ) {
            compareValue = compareAlphaNumeric(a[index], b[index])
        }
    });

    // Flip value to correctly handle ascending/descending
    if ( compareValue === 1 || compareValue === -1 ) {
        compareValue = compareValue * -1
    }

    return compareValue
}
