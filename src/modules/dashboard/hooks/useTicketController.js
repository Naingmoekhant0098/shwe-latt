import { useState } from "react";
import { useGetResultDetail, useGetWinnerDetail } from "./useQuaries";
export const useResultController = () => {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedWinnerCategory, setSelectedWinnerCategory] = useState("");
    const { data: results, isLoading: isLoading, error } = useGetResultDetail(selectedCategory);
    const { data: checkResults, isLoading: checkLoading } = useGetWinnerDetail(selectedWinnerCategory);
    const handleSearch = (value) => {
        setSelectedCategory(value);
    };
    const handleSelectedWinning = (value) => {
        setSelectedWinnerCategory(value);
    };
    return {
        results,
        handleSearch,
        isLoading,
        handleSelectedWinning,
        selectedCategory,
        checkResults,
        checkLoading,
        error,
        setSelectedCategory,
        setSelectedWinnerCategory
    };
};
