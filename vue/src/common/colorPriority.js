export default  function (priority) {
    if (priority === 'NONE')
        return 'none'
    else if (priority === 'LOW')
        return '#1c1ce0'
    else if (priority === 'MEDIUM')
        return '#f3a939'
    else if (priority === 'HIGH')
        return '#bd173b'
}