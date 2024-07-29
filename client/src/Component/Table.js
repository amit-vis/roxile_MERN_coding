import React from "react";
import { useTable } from "../context/Table";
import { FilterSection } from "./filter";
import { PageFunction } from "./PageFunction";
import { ItemDetails } from "./ItemDetails";
import { useExtra } from "../context/ExtraContext";

export const TableSection = () => {
    const { transactionData,selectedMonth } = useTable();
    const {renderSoldValue, renderDescription} = useExtra();

    const filteredData = selectedMonth 
        ? transactionData.filter(data => new Date(data.date).toLocaleString('default', { month: 'long' }) === selectedMonth) 
        : transactionData;

    return (
        <>
            <FilterSection />
            <div style={{ marginTop: "1%", marginLeft:"1%", display: "flex", justifyContent: "center", textAlign: "left", fontSize:"0.8rem",fontFamily:"monospace" }}>
                <table border="4" className="table table-dark mt-2" style={{width:"60%"}}>
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                            <th scope="col">Category</th>
                            <th scope="col">Sold</th>
                            <th scope="col">Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactionData?.map((data, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{data.title}</td>
                                <td>{renderDescription(data.description, index)}</td>
                                <td>{data.price}</td>
                                <td>{data.category}</td>
                                <td>{renderSoldValue(data.sold)}</td>
                                <td>
                                    <img src={data.image} alt={data.title} width="60px" height="60px" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <ItemDetails/>
            </div>
            <PageFunction/>
        </>
    );
};
