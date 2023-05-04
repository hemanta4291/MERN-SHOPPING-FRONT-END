export const setData = (key, value)=> {
    localStorage.setItem(key, JSON.stringify(value));
}
export const getData = (key) => {
    const data = localStorage.getItem(key);
    return JSON.parse(data)
}

export const removeData = (key) => {
    localStorage.removeItem(key);
}
