function generateUUID() {
    const randomStr = () =>
        (
            Math.random()
                .toString()
                .substring(3) * 1
        ).toString(36)
    const timeStr = () => Date.now().toString(36)
    return `${randomStr()}${timeStr()}`
}

module.exports = {
    generateUUID,
}