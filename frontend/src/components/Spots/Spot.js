import { Link } from "react-router-dom"
import "./Spots.css"

const Spot = ({spot}) => {
  return (
    <div>
      <Link to={`/spots/${spot.id}`}>

        <div className="allspots-spot-image-container">
        {spot.previewImage ?
          (<div><img src={spot.previewImage} /></div>) :
          (<div><img src="https://bitsofco.de/content/images/2018/12/broken-1.png" alt="spot has no preview image" /></div>)
        }
        </div>

        <div>
          {spot.city}, {spot.state}
        </div>

        <div>
          {spot.avgRating ?
            (<span>★{spot.avgRating}</span>):
            (<span>no rating</span>)
          }
        </div>

        <div>
          $<span>{spot.price}</span> night
        </div>


      </Link>
    </div>
  )
}

export default Spot

/*
    allSpots: {
      [spotId]: {
         id,
         ownerId,
         address,
         city,
         state,
         country
         lat,
         lng,
         name,
         description,
         price,
         avgRating,
         previewImage
      },
      optionalOrderedList: []
    }
 */
