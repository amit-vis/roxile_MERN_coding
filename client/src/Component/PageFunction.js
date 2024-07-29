import { useTable } from "../context/Table"

// this the section where we handling the page basically pagination
export const PageFunction = () => {
    const { handleNextPage, handlePrevPage, page, totalPages } = useTable();
    return (
        <>
            <div style={{ fontFamily: "fantasy", width: "60%" }}>
                <div className="d-flex justify-content-around">
                    <div>
                        <h6>Page No: {page}</h6>
                    </div>
                    <div className="w-25 d-flex justify-content-around">
                        <button className="btn btn-link" style={{ textDecoration: "none" }} onClick={handlePrevPage}>previous</button>
                        <button className="btn btn-link" style={{ textDecoration: "none" }} onClick={handleNextPage}>next</button>
                    </div>
                    <div>
                        <h6>Total Count: {totalPages}</h6>
                    </div>
                </div>
            </div>
        </>
    )
}