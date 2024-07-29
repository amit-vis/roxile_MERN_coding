import React from "react";
import { useTable } from "../context/Table";

// this is the filter section here code for showing the filter
export const FilterSection = () => {
    const { getMonth, setSelectedMonth, selectedMonth, search, setSearch } = useTable();

    const handleClearFilter = () => {
        setSelectedMonth('');
        setSearch('');
    };

    return (
        <div className="mt-4 container d-flex">
            <div className="form-floating w-25 d-flex" style={{ marginRight: "2%" }}>
                <select
                    className="form-select"
                    id="floatingSelect"
                    aria-label="Floating label select example"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                >
                    <option value="">Select Month</option>
                    {getMonth?.map((month, index) => (
                        <option key={index} value={month}>
                            {month}
                        </option>
                    ))}
                </select>
                <label htmlFor="floatingSelect">Select Month</label>
            </div>
            <div className="form-floating w-25 d-flex ml-2" style={{ marginLeft: "2%" }}>
                <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <label htmlFor="floatingInput">Search</label>
                <button className="btn btn-link" onClick={handleClearFilter} style={{ textDecoration: "none", color: "blueviolet", fontWeight: "bold" }}>
                    Clear
                </button>
            </div>
        </div>
    );
};

export default FilterSection;
