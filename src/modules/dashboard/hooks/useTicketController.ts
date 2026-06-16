import { useState } from "react";

import {
  useGetResultDetail,
  useGetCheckWinner,
 
} from "./useQuaries";

export const useResultController = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedWinnerCategory, setSelectedWinnerCategory] = useState<string>("");
  const [selectedShowWinnerCategory, setSelectedShowWinnerCategory] = useState<string>("");

 
  const {
    data: results,
    isLoading,
    error,


  } = useGetResultDetail(selectedCategory);

 
  const {
    data: checkResults,
    isLoading: checkLoading,
    error: checkingError,
  } = useGetCheckWinner(selectedWinnerCategory);

 
  
  const handleSearch = (value: string) => {
    setSelectedCategory(value);
  };

  const handleSelectedWinning = (value: string) => {
    setSelectedWinnerCategory(value);
  };

  const handleShowWinners = (value: string) => {
    setSelectedShowWinnerCategory(value);
  };

  // ---------------------------
  // RETURN
  // ---------------------------

  return {
    // data
    results,
    checkResults,
    // showWinnerResults,

    // loading
    isLoading,
    checkLoading,
    // showWinnerLoading,

    // errors
    error,
    checkingError,
    // showWinnerError,

    // state
    selectedCategory,
    selectedWinnerCategory,
    selectedShowWinnerCategory,

    // setters (direct)
    setSelectedCategory,
    setSelectedWinnerCategory,
    setSelectedShowWinnerCategory,

    // handlers (safe usage)
    handleSearch,
    handleSelectedWinning,
    handleShowWinners,
  };
};