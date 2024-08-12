
import { formattedResponse } from "@/shared/utils/formatted-data";
import Airtable from "airtable";
import { AIRTABLE_API_KEY, AIRTABLE_BASE_SCHOOLS } from "../../airtable.config";


export const AirtableService = new Airtable({
    apiKey: AIRTABLE_API_KEY,
  });

const table = AirtableService.base(AIRTABLE_BASE_SCHOOLS)(
    'Schools'
  );


  export async function getSchoolFull<F >(
    slug?: any,
  ) {
    try {
      const data = await table
        .select()
        .all();
       const formattedData= formattedResponse(data as any);
    return formattedData

    } catch (err) {
      console.log(err);
    }
  }

  export async function updateLatitudeLongitude(recordId:any, schoolLatLong:any) {
    try {
        await table.update(recordId, {
            Lat: `${schoolLatLong.lat}`,
            Long:`${schoolLatLong.lng}`,
        });
        console.log(`Record ${recordId} updated successfully.`);
    } catch (error) {
        console.error(`Error updating record ${recordId}:`);
    }
}
