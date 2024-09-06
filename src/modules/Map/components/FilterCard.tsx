import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { Box, Stack, styled } from "@mui/system";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import BasicSelect from "@/shared/components/BasicSelect/BasicSelect";
import {
  Amenities,
  AmenitiesDescription,
  AmenitiesWrapper,
  CleanAll,
  FilterCardWrapper,
} from "./location.styled";

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
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
}));

const filter = createFilterOptions();

const FilterCard = ({
  schoolData,
  finalFilterData,
  handleFormSubmit,
  setFinalFilterData,
}: {
  setFinalFilterData: any;
  schoolData: any;
  finalFilterData: {
    length: number;
  };
  handleFormSubmit: any;
}) => {
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [divisionFilter, setDivisionFilter] = useState<string>("");

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

  useEffect(() => {
    const filterData = (data: any) => {
      let filteredData = schoolData;

      if (stateFilter) {
        filteredData = filteredData.filter(
          (schoolsData: any) => schoolsData?.state === stateFilter
        );    
      }
      if (divisionFilter) {
        filteredData = filteredData.filter(
          (schoolsData: any) => schoolsData?.division === divisionFilter
        );
      }
      if (data?.nameOfCollege) {
        filteredData = filteredData.filter((schoolsData: any) =>
          schoolsData?.nameOfCollege
            ?.toLowerCase()
            .includes(data?.nameOfCollege?.toLowerCase())
        );
      }
      setFinalFilterData(filteredData);

      return filteredData;
    };

    const data = {
      nameOfCollege: searchTerm,
    };

    const updatedOptions = filterData(data).map((item:any) => ({
      title: item.nameOfCollege || "",
    }));
    

    setFilteredOptions(updatedOptions);
  }, [searchTerm, stateFilter, divisionFilter, schoolData]);

  const handleSearchIconClick = () => {
    handleSubmit(handleFormSubmit)();
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
            {/* State */}
            <Controller
              name="state"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <div style={{ marginBottom: "20px" }}>
                  <Autocomplete
                    value={field.value || null}
                    onChange={(event, newValue) => {
                      field.onChange(newValue);
                      setStateFilter(newValue ? String(newValue) : "");
                      setDivisionFilter("");
                    }}
                    options={stateData || []}
                    getOptionLabel={(option) => option || ""}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="State"
                        variant="outlined"
                        error={Boolean(errors.state)}
                        helperText={errors.state ? "Please Enter State" : ""}
                        sx={{
                          backgroundColor: "#1B1B1B",
                          color: "#b0b0b0",
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "#3d3d3d",
                            },
                            "&:hover fieldset": {
                              borderColor: "#737373",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#737373",
                            },
                            "& input": {
                              color: "#b0b0b0",
                            },
                          },
                          "& .MuiInputLabel-root": {
                            color: "#b0b0b0",
                          },
                          "& .MuiFormHelperText-root": {
                            color: "#f44336",
                          },
                        }}
                      />
                    )}
                    sx={{
                      width: "100%",
                      "& .MuiAutocomplete-popupIndicator": {
                        color: "#b0b0b0",
                      },
                      "& .MuiAutocomplete-clearIndicator": {
                        color: "#b0b0b0",
                      },
                      "& .MuiAutocomplete-listbox": {
                        backgroundColor: "#1B1B1B",
                        color: "#b0b0b0",
                      },
                    }}
                  />
                </div>
              )}
            />

            {/* Division */}
            <Controller
              name="division"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <div style={{ marginBottom: "20px" }}>
                  <BasicSelect
                    value={field?.value || ""}
                    onChange={(e) => {
                      field?.onChange(e);
                      setDivisionFilter(String(e));
                    }}
                    options={divisionsData}
                    width="100%"
                    backgroundColor="#1B1B1B"
                    label="Division"
                    error={errors?.division && "Please Enter Division"}
                  />
                </div>
              )}
            />
            {/* Search */}
            <Controller
              name="nameOfCollege"
              control={control}
              defaultValue=""
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    label="Search"
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      setSearchTerm(e.target.value);
                    }}
                    value={field.value || ""}
                    variant="outlined"
                    error={Boolean(errors.nameOfCollege)}
                    helperText={
                      errors.nameOfCollege ? "Please Enter College Name" : ""
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <SearchIcon
                            sx={{
                              color: "#737373 !important",
                              cursor: "pointer",
                            }}
                            onClick={handleSearchIconClick}
                          />
                        </InputAdornment>
                      ),
                      style: {
                        color: "#b0b0b0",
                        backgroundColor: "#1B1B1B",
                      },
                    }}
                    sx={{
                      backgroundColor: "#1B1B1B",
                      color: "#b0b0b0",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#3d3d3d",
                        },
                        "&:hover fieldset": {
                          borderColor: "#737373",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#737373",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "#b0b0b0",
                      },
                      "& .MuiFormHelperText-root": {
                        color: "#f44336",
                      },
                    }}
                  />
                );
              }}
            />
          </AmenitiesWrapper>
          <CleanAll
            onClick={() => {
              setValue("nameOfCollege", "");
              setValue("division", "");
              setValue("state", "");
              setSearchTerm("");
              setStateFilter("");
              setDivisionFilter("");
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
