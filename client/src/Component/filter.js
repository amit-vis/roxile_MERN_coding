import React from "react";
import { useTable } from "../context/Table";

export const FilterSection = () => {
    const { getMonth,setSelectedMonth, selectedMonth,search,setSearch} = useTable();
    const handleClearFilter = ()=>{
        setSelectedMonth('');
        setSearch('');
    }

    return (
        <>
            <div className="mt-4 container d-flex">
                <div className="form-floating w-25 d-flex" style={{marginRight:"2%"}}>
                    <select
                        className="form-select"
                        id="floatingSelect"
                        aria-label="Floating label select example"
                        value={selectedMonth}
                        onChange={(e)=>setSelectedMonth(e.target.value)}
                    >
                        {getMonth?.map((month, index) => (
                            <option key={index} value={month}>
                                {month}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="floatingSelect">Select Month</label>
                </div>
                <div className="form-floating w-25 d-flex ml-2" style={{marginLeft:"2%"}}>
                    <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="Search..."
                        value={search}
                        onChange={(e)=>setSearch(e.target.value)}
                    />
                    <label htmlFor="floatingInput">
                        Search
                    </label>
                    <h1 className="btn btn-link" onClick={handleClearFilter}>&#x2715;</h1>
                </div>
            </div>
        </>
    );
};

export default FilterSection;
