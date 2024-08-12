import type { NextApiRequest, NextApiResponse } from "next";
import { getSchoolFull, updateLatitudeLongitude } from "@/services/GeoLocationService";

/**
 * @description - get all school or address and update latitude and longitude on the base of address.
 * @param req - Req.
 * @param res - Res.
 * @returns - Return school data .
 */

async function LatitudeLongitude(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const apiKey = 'AIzaSyCpamFgUVka1UyYjSTSpQ61bkfGjqNr-0E';
    try {
      const data=  await getSchoolFull();
      // for latter use to update Latitude Longitude on the base of Loation 
    // const response = await axios.get(geocodeUrl);
    //     data?.map(async(data:any)=>{
    //     const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(data?.address)}&key=${apiKey}`;
    //     const response = await axios.get(geocodeUrl);
    //     updateLatitudeLongitude(data?.id,response.data?.results?.[0]?.geometry?.location)
        
    //     return response.data
    // })
        
      return res.send(data);
    } catch (error:any) {
        // Log the entire error object for complete information
        console.log(error);
    
        // Log specific details about the error
        console.log('Error message:', error.message);
        console.log('Error stack:', error.stack);
    
        // Optionally, include more details in the response
        res.status(504).json({ 
            message: "Server Error",
            error: error.message, // Include the error message in the response
            stack: error.stack // Include the stack trace in the response (useful for debugging, but avoid in production)
        });
    }
    
  } else {
    // Handle any other HTTP method
  }
}

export default LatitudeLongitude;