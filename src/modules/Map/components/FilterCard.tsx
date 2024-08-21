import React from "react";
import { Controller, useForm } from "react-hook-form";
import InputBase from "@mui/material/InputBase";
import {
  Amenities,
  AmenitiesDescription,
  AmenitiesWrapper,
  CleanAll,
  FilterCardWrapper,
  FooterButton,
} from "./location.styled";

import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/system";
import BasicSelect from "@/shared/components/BasicSelect/BasicSelect";

const Search = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row-reverse",
  borderRadius: "6px",
  marginBottom: "30px",
  backgroundColor: "#1B1B1B",
  alignItems: "center",
  border: "2px solid #3d3d3d",
  color: "#FFFFFF !important",
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }: any) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(2, 2, 2, 0),
    paddingLeft: "12px",
    [theme.breakpoints.up("sm")]: {
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const FilterCard = ({
  schoolData,
  setFinalFilterData,
  finalFilterData,
}: {
  schoolData: any;
  setFinalFilterData: any;
  finalFilterData: {
    length: number;
  };
}) => {
  console.log("Schools Data", schoolData);
  const divisionsDataFilter = schoolData?.filter(
    (object: any, index: number, self: any) =>
      index === self.findIndex((t: any) => t.division === object.division)
  );
  const divisionsData = divisionsDataFilter
    .map((data: any) => data?.division)
    .sort();

  const stateDataFilter = schoolData?.filter(
    (object: any, index: number, self: any) =>
      index === self.findIndex((t: any) => t.state === object.state)
  );

  const stateData = stateDataFilter?.map((data: any) => data?.state).sort();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    reValidateMode: "onChange",
  });

  const handleFormSubmit = (data: any) => {
    if (data?.nameOfCollege) {
      console.log("data?.nameOfCollege", data?.nameOfCollege);
      const schoolNameData = schoolData?.filter(
        (schoolsData: any) => schoolsData?.nameOfCollege === data?.nameOfCollege
      );
      setFinalFilterData(schoolNameData || []);
    } else if (data?.division) {
      const filterDivsionData = schoolData?.filter(
        (schoolsData: any) => schoolsData?.division === data?.division
      );
      setFinalFilterData(filterDivsionData || []);
    } else if (data?.state) {
      const filterStateData = schoolData?.filter(
        (schoolsData: any) => schoolsData?.state === data?.state
      );
      setFinalFilterData(filterStateData || []);
    }
    // reset();
  };

  return (
    <>
      <FilterCardWrapper>
        <Amenities>Schools</Amenities>
        <AmenitiesDescription>
          Number of Schools {finalFilterData?.length}
        </AmenitiesDescription>
        <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
          <AmenitiesWrapper>
            <Controller
              name="nameOfCollege"
              control={control}
              render={({ field }) => (
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon
                      sx={{
                        color: "#737373 !important",
                      }}
                    />
                  </SearchIconWrapper>
                  <StyledInputBase
                    value={field.value}
                    defaultValue={divisionsData?.[0]?.nameOfCollege}
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                    onChange={(e) => {
                      field?.onChange(e);
                    }}
                  />
                </Search>
              )}
            />
            <Controller
              name="division"
              control={control}
              defaultValue={divisionsData?.[0]?.division}
              render={({ field }) => (
                <div>
                  <BasicSelect
                    value={field?.value || ""}
                    onChange={(e) => {
                      field?.onChange(e);
                    }}
                    options={divisionsData}
                    width="100%"
                    backgroundColor="#1B1B1B"
                    label="Division"
                    error={errors?.martialArts && "Please Enter Division"}
                  />
                </div>
              )}
            />
            {/* state */}
            <Controller
              name="state"
              control={control}
              defaultValue={divisionsData?.[0]?.state}
              render={({ field }) => (
                <div style={{ marginTop: "20px" }}>
                  <BasicSelect
                    value={field?.value || ""}
                    onChange={(e) => {
                      field?.onChange(e);
                    }}
                    options={stateData}
                    width="100%"
                    backgroundColor="#1B1B1B"
                    label="State "
                    error={errors?.martialArts && "Please Enter State"}
                  />
                </div>
              )}
            />
          </AmenitiesWrapper>
          <FooterButton type="submit">FILTERS</FooterButton>
          <CleanAll
            onClick={() => {
              setValue("nameOfCollege", "");
              setValue("division", "");
              setValue("state", "");
            }}
          >
            Clear Filter
          </CleanAll>
        </form>
      </FilterCardWrapper>
    </>
  );
};

export default FilterCard;
