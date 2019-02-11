// Return an new array containing the passed array elements plus the passed element
// Does not change the original array
export function addToDuplicateArray(array, newElement) {
    let newArray = array.slice();
    newArray.push(newElement);
    return newArray;
}