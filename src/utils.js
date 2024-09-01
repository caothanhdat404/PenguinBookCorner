export const isJsonString = (data) => {
    try {
        JSON.parse(data)
    } catch (error) {
        return false
    }
    return true
}

export const getItem = (key, icon, children, label, type) => {
    return {
        key,
        icon,
        children,
        label,
        type
    }
}