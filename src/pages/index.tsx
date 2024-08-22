import SchoolsMap from "@/modules/Map/SchoolsMap";
import { BASE_URL } from "@/services/config";
import axios from "axios";
import { GetServerSideProps } from "next";

import React from "react";

const SchoolMap = ({ data }: any) => {
  return (
    <div>
      <SchoolsMap schoolData={data} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const baseUrl = `${BASE_URL}api/GeoLocation/latitude-longitude`;
    const { data } = await axios(`${baseUrl}`);
    if (data.length === 0) {
      return {
        props: {
          notFound: true,
          data: [],
        },
      };
    }
    return {
      props: {
        notFound: false,
        data,
      },
    };
  } catch (error) {
    return {
      props: {
        data: null,
      },
    };
  }
};

export default SchoolMap;
