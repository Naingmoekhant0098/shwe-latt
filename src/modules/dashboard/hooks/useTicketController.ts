import { useState } from "react";

import {
  useGetResultDetail,
  useGetCheckWinner,
  useGetWinners,
} from "./useQuaries";

export const useResultController = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedWinnerCategory, setSelectedWinnerCategory] = useState<string>("");
  const [selectedShowWinnerCategory, setSelectedShowWinnerCategory] = useState<string>("");

  // ✅ result details
  const {
    data: results,
    isLoading,
    error,
  } = useGetResultDetail(selectedCategory);

  // ✅ check winner
  const {
    data: checkResults,
    isLoading: checkLoading,
    error: checkingError,
  } = useGetCheckWinner(selectedWinnerCategory);

  // ✅ show winners (IMPORTANT FIX)
const data= useGetWinners(selectedShowWinnerCategory || undefined);
console.log(data);

  // ---------------------------
  // HANDLERS
  // ---------------------------

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