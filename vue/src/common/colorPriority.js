export default  function (priority) {
    if (priority === 'NONE')
        return 'none'
    else if (priority === 'LOW')
        return '#51f8a5'
    else if (priority === 'MEDIUM')
        return '#f8bd64'
    else if (priority === 'HIGH')
        return '#da4465'
}
