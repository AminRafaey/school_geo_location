import _ from 'lodash';

export const formattedResponse: (records: any[]) => any = (records) => {
  return records.map((record) => ({
    ..._.mapKeys(record.fields, (v:any, k:any) => _.camelCase(k)),
    id: record.id,
  }));
};
