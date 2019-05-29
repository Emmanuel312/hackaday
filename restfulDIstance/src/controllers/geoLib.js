const geolib = require('geolib')

class Geolib 
{
    Distance(req,res)
    {
        
        const {initialCordinate,finalCordinate } = req.body
        console.log(initialCordinate,finalCordinate)
        const distance = geolib.getDistance(initialCordinate,finalCordinate)
        res.json(distance)
    }

    DistanceRadius(req,res)
    {
        const {initialCordinate,finalCordinate } = req.body
        const { radius } = req.query
        const result = geolib.isPointWithinRadius(initialCordinate,finalCordinate,radius)
        res.json(result)
    }
}


module.exports = new Geolib