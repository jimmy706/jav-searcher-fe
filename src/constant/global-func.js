export function checkArrayChanged(newArr, prevArr) {
    if (newArr.length !== prevArr.length) {
        return true;
    }
    for (let i = 0; i < prevArr.length; i++) {
        if (newArr[i] !== prevArr[i]) {
            return true;
        }
    }
    return false;
}