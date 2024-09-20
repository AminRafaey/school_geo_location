import React, { useState, useEffect, useCallback } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import {
  Amenities,
  AmenitiesDescription,
  AmenitiesWrapper,
  CleanAll,
  FilterCardWrapper,
} from "./location.styled";
import { debounce } from "lodash";
const FilterCard = ({
  schoolData,
  finalFilterData,
  setFinalFilterData,
}: {
  setFinalFilterData: (data: any) => void;
  schoolData: any[];
  finalFilterData: {
    length: number;
  };
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [stateFilter, setStateFilter] = useState<string[]>([]);
  const [divisionFilter, setDivisionFilter] = useState<string[]>([]);

  const divisionsDataFilter = schoolData?.filter(
    (object, index, self) =>
      index === self.findIndex((t) => t.division === object.division)
  );
  const divisionsData = divisionsDataFilter
    .map((data) => data?.division)
    .sort();

  const stateDataFilter = schoolData?.filter(
    (object, index, self) =>
      index === self.findIndex((t) => t.state === object.state)
  );
  const stateData = stateDataFilter?.map((data) => data?.state).sort();

  const filterData = useCallback(() => {
    let filteredData = schoolData;

    if (stateFilter.length > 0) {
      filteredData = filteredData.filter((schoolsData) =>
        stateFilter.includes(schoolsData?.state)
      );            
    }
    if (divisionFilter.length > 0) {
      filteredData = filteredData.filter((schoolsData) =>
        divisionFilter.includes(schoolsData?.division)
      
      );
    }
    if (searchTerm) {
      filteredData = filteredData.filter(
        (schoolsData) =>
            schoolsData?.state
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          schoolsData?.nameOfCollege
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) 
        
      );      
    }
    setFinalFilterData(filteredData);
  }, [
    schoolData,
    stateFilter,
    divisionFilter,
    searchTerm,
    setFinalFilterData,
  ]);

  const debouncedFilterData = useCallback(debounce(filterData, 300), [
    filterData,
  ]);

  useEffect(() => {
    debouncedFilterData();
    return () => {
      debouncedFilterData.cancel();
    };
  }, [debouncedFilterData]);


  const handleClearFilters = () => {
    setSearchTerm("");
    setStateFilter([]);
    setDivisionFilter([]);
    setFinalFilterData(schoolData);
  };

  return (
    <FilterCardWrapper>
      <Amenities>Schools</Amenities>
      <AmenitiesDescription>
        Number of Schools {finalFilterData?.length}
      </AmenitiesDescription>
      <AmenitiesWrapper>
        {/* State */}
        <div style={{ marginBottom: "20px" }}>
          <Autocomplete
            multiple
            value={stateFilter}
            onChange={(event, newValue) => {
              setStateFilter(newValue || []);
            }}
            options={stateData || []}
            getOptionLabel={(option) => option || ""}
            renderInput={(params) => (
              <TextField
                {...params}
                label="State"
                variant="outlined"
                sx={{
                  backgroundColor: "#1B1B1B",
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
                  "&:hover fieldset": {
                    borderColor: "#737373",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#737373",
                  },
                  "& input": {
                    color: "#b0b0b0",
                  },
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
                  "& .MuiChip-root": {
                    backgroundColor: "#737373",
                    color: "#b0b0b0",
                  },
                  "& .MuiChip-deleteIcon": {
                    color: "#b0b0b0",
                  },
                }}
              />
            )}
          />
        </div>

        {/* Division */}
        <div style={{ marginBottom: "20px" }}>
          <Autocomplete
            multiple
            value={divisionFilter}
            onChange={(event, newValue) => {
              setDivisionFilter(newValue || []);
            }}
            options={divisionsData || []}
            getOptionLabel={(option) => option || ""}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Division"
                variant="outlined"
                sx={{
                  backgroundColor: "#1B1B1B",
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
                  "& .MuiChip-root": {
                    backgroundColor: "#737373",
                    color: "#b0b0b0",
                  },
                  "& .MuiChip-deleteIcon": {
                    color: "#b0b0b0",
                  },
                }}
              />
            )}
          />
        </div>

        {/* Search */}
        <TextField
          label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon
                  sx={{
                    color: "#737373 !important",
                    cursor: "pointer",
                  }}
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
          }}
        />
      </AmenitiesWrapper>

      <CleanAll onClick={handleClearFilters}>Clear Filter</CleanAll>
    </FilterCardWrapper>
  );
};

export default FilterCard;