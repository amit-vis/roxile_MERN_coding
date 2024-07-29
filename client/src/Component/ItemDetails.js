import { useTable } from "../context/Table";

// this the section where we show total sold unsold item count and and total sold item price
export const ItemDetails = () => {
    const { totalSellAmount, totalSoltItem, totalUnSoldItem } = useTable();
    return (
        <>
            <div className="container bg-success" style={{
                width: "30%", height: "30vh", border: "2px solid black", padding: "2%",
                borderRadius: "2%",
                border: "none",
                color: "white"
            }}>
                <div className="container d-flex justify-content-around mt-2">
                    <h4>Total Sale</h4>
                    <h4>-</h4>
                    <h4>{totalSellAmount}</h4>
                </div>
                <div className="container d-flex justify-content-around mt-2">
                    <h4>Total Sold Items</h4>
                    <h4>-</h4>
                    <h4>{totalSoltItem}</h4>
                </div>
                <div className="container d-flex justify-content-around mt-2">
                    <h4>Total Not Sold Items</h4>
                    <h4>-</h4>
                    <h4>{totalUnSoldItem}</h4>
                </div>
            </div>
        </>
    )
}