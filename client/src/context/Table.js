import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const TableContext = createContext();

export const useTable = () => {
    return useContext(TableContext);
};

export const TableProvider = ({ children }) => {
    const [transactionData, setTransactionData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);
    const [pageLimit, setPageLimit] = useState(null);
    const [search, setSearch] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('March');
    const [getMonth, setGetMonth] = useState([]);
    const [totalSellAmount, setTotalSellAmount] = useState(null);
    const [totalSoldItem, setTotalSoldItem] = useState(null);
    const [totalUnSoldItem, setTotalUnSoldItem] = useState(null);
    const [rangeData, setRangeData] = useState(null);


    // fetch all the data from the backend
    const fetchTransactionData = async () => {
        try {
            const response = await axios.get("https://roxile-mern-coding.onrender.com/transaction", {
                headers: {
                    "Content-Type": "application/json"
                },
                params: {
                    page,
                    search,
                    month: selectedMonth
                }
            });
            setTransactionData(response.data.transactionData);
            setPage(response.data.page);
            setGetMonth(response.data.monthNames);
            setTotalPages(response.data.pageLimit);
            setPageLimit(response.data.totalPages);
        } catch (error) {
            console.error("Error fetching transaction data:", error);
        }
    };

    // fetch total of the sold item data from backend
    const fetchTotalSoldItem = async () => {
        try {
            const response = await axios.get("https://roxile-mern-coding.onrender.com/statics/total-sale-amount", {
                params: {
                    month: selectedMonth
                }
            });
            setTotalSellAmount(response.data.totalSaleAmount);
        } catch (error) {
            console.log(error.message);
        }
    };

    // here we fetch sold item count from backend
    const fetchSoldItem = async () => {
        try {
            const response = await axios.get("https://roxile-mern-coding.onrender.com/statics/total-sold-item", {
                params: {
                    month: selectedMonth
                }
            });
            // console.log("here is the sold item", response.data.totalSoldItems)
            setTotalSoldItem(response.data.totalSoldItems);
        } catch (error) {
            console.log(error.message);
        }
    };

    // here we fetch unsold item count from backend
    const fetchNotSoldItem = async () => {
        try {
            const response = await axios.get("https://roxile-mern-coding.onrender.com/statics/total-notsold-item", {
                params: {
                    month: selectedMonth
                }
            });
            setTotalUnSoldItem(response.data.totalUnsoldItems);
        } catch (error) {
            console.log(error.message);
        }
    };

    // here we fetch range data
    const fetchDataRange = async () => {
        try {
            const response = await axios.get("https://roxile-mern-coding.onrender.com/statics/price-range-data", {
                params: {
                    month: selectedMonth
                }
            });
            setRangeData(response.data.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        fetchTransactionData();
        fetchTotalSoldItem();
        fetchSoldItem();
        fetchNotSoldItem();
        fetchDataRange();
    }, [page, search, selectedMonth,totalSoldItem,totalUnSoldItem,totalSellAmount]);

    // toggle the next page
    const handleNextPage = () => {
        if (page <= pageLimit) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    // toggle the previous page
    const handlePrevPage = () => {
        if (page > 1) {
            setPage((prevPage) => prevPage - 1);
        }
    };

    return (
        <TableContext.Provider value={{
            transactionData,
            page, totalPages, search, setSearch,
            selectedMonth, setSelectedMonth, getMonth,
            handleNextPage, handlePrevPage, totalSellAmount,
            totalSoldItem, totalUnSoldItem, rangeData
        }}>
            {children}
        </TableContext.Provider>
    );
};
