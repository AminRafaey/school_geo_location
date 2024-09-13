import React, { useState, useEffect, useCallback, useMemo } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import { debounce } from "lodash";
import {
  Amenities,
  AmenitiesDescription,
  AmenitiesWrapper,
  CleanAll,
  FilterCardWrapper,
} from "./location.styled";

const FilterCard = ({
  schoolData,
  finalFilterData,
  handleFormSubmit,
  setFinalFilterData,
}: {
  setFinalFilterData: (data: any) => void;
  schoolData: any[];
  finalFilterData: {
    length: number;
  };
  handleFormSubmit: () => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [stateFilter, setStateFilter] = useState<string[]>([]);
  const [divisionFilter, setDivisionFilter] = useState<string[]>([]);
  const [localSearchTerm, setLocalSearchTerm] = useState("");

  const divisionsData = useMemo(() => {
    const uniqueDivisions = schoolData?.filter(
      (object, index, self) =>
        index === self.findIndex((t) => t.division === object.division)
    );
    return uniqueDivisions?.map((data) => data?.division).sort();
  }, [schoolData]);

  const stateData = useMemo(() => {
    const uniqueStates = schoolData?.filter(
      (object, index, self) =>
        index === self.findIndex((t) => t.state === object.state)
    );
    return uniqueStates?.map((data) => data?.state).sort();
  }, [schoolData]);

  const filteredData = useMemo(() => {
    let data = schoolData;

    if (stateFilter.length > 0) {
      data = data.filter((schoolsData) =>
        stateFilter.includes(schoolsData?.state)
      );
    }
    if (divisionFilter.length > 0) {
      data = data.filter((schoolsData) =>
        divisionFilter.includes(schoolsData?.division)
      );
    }
    if (localSearchTerm) {
      data = data.filter((schoolsData) =>
        schoolsData?.nameOfCollege
          ?.toLowerCase()
          .includes(localSearchTerm.toLowerCase())
      );
    }
    return data;
  }, [schoolData, stateFilter, divisionFilter, localSearchTerm]);

  const filterData = useCallback(() => {
    setFinalFilterData(filteredData);
  }, [filteredData, setFinalFilterData]);

  const debouncedFilterData = useCallback(debounce(filterData, 300), [
    filterData,
  ]);

  useEffect(() => {
    debouncedFilterData();
    return () => {
      debouncedFilterData.cancel(); 
    };
  }, [debouncedFilterData]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalSearchTerm(searchTerm);
    handleFormSubmit();
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setLocalSearchTerm("");
    setStateFilter([]);
    setDivisionFilter([]);
    setFinalFilterData(schoolData);
    handleFormSubmit();
  };

  return (
    <FilterCardWrapper>
      <Amenities>Schools</Amenities>
      <AmenitiesDescription>
        Number of Schools {finalFilterData?.length}
      </AmenitiesDescription>

      <form onSubmit={handleSearch}>
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(e as any);
              }
            }}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon
                    sx={{
                      color: "#737373 !important",
                      cursor: "pointer",
                    }}
                    onClick={handleSearch}
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
      </form>
    </FilterCardWrapper>
  );
};

export default FilterCard;
