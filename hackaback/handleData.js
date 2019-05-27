const utmObj = require('utm-latlng')
const utm = new utmObj('Everest')

module.exports = (linha) =>
{
    const data = [0,1,2,3,6,7]
    const vet = linha.split(",")
    var result = []

    for(i in vet)
    {
        if(data.includes(Number(i)))
        {
            result.push(vet[i])
        }
    }

    const { lat,lng } = utm.convertUtmToLatLng(result[4], result[5], 25, 'L' )
    result[4] = lat
    result[5] = lng

    return result.join()
}
