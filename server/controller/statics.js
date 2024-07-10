// statics data controller
const Product = require('../model/product');

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// code for get total saleAmount 
module.exports.totalSaleAmount = async (req, res) => {
    try {
        const selectedMonthName = req.query.month;

        // Find the index of the selected month name
        const monthIndex = monthNames.indexOf(selectedMonthName);
        if (monthIndex === -1) {
            return res.status(400).json({
                message: "Invalid month name provided!"
            });
        }

        // Use aggregation to extract the month from the `dateOfSale` field
        const aggregationResult = await Product.aggregate([
            {
                $project: {
                    month: { $month: "$dateOfSale" },
                    sold: 1,
                    price: 1
                }
            },
            {
                $match: {
                    month: monthIndex + 1,
                    sold: true
                }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$price" }
                }
            }
        ]);

        // Check if there is any result and return the total amount
        const totalSaleAmount = aggregationResult.length > 0 ? aggregationResult[0].totalAmount : 0;

        return res.status(200).json({
            message: "Total Sale Amount!!",
            totalSaleAmount: totalSaleAmount,
            monthNames
        });
    } catch (error) {
        console.error("Error in finding the total amount data", error);
        return res.status(500).json({
            message: "Internal server error finding the total amount data!",
            error
        });
    }
}

// code for get total sold Items
module.exports.totalSoldItems = async (req, res) => {
    try {
        const selectedMonth = req.query.month;
        const monthIndex = monthNames.indexOf(selectedMonth);

        if (monthIndex === -1) {
            return res.status(400).json({
                message: "Invalid month name provided!"
            });
        }

        const aggregationResult = await Product.aggregate([
            {
                $project: {
                    month: { $month: "$dateOfSale" },
                    sold: 1
                }
            },
            {
                $match: {
                    month: monthIndex + 1,
                    sold: true
                }
            },
            {
                $count: "totalSoldItems"
            }
        ]);

        const totalSoldItems = aggregationResult.length > 0 ? aggregationResult[0].totalSoldItems : 0;

        return res.status(200).json({
            message: "Total Sold Items",
            totalSoldItems
        });
    } catch (error) {
        console.error("Internal server error in getting total sold items", error);
        return res.status(500).json({
            message: "Internal server error in getting total sold items!",
            error
        });
    }
}

// code for total not sold Items
module.exports.totalNotSoldItem = async (req, res)=>{
    try {
        const selectedMonth = req.query.month;
        const monthIndex = monthNames.indexOf(selectedMonth);
        if(monthIndex === -1){
            return res.status(400).json({
                message: "Invalid month name provided!"
            });
        }
        const totalNotSoldItem = await Product.aggregate([
            {
                $project:{
                    month: {$month: "$dateOfSale"},
                    sold: 1
                }
            },
            {
                $match:{
                    month: monthIndex+1,
                    sold: false
                }
            },
            {
                $count: 'totalUnsoldItems'
            }
        ]);
        const totalUnsoldItems = totalNotSoldItem.length>0?totalNotSoldItem[0].totalUnsoldItems: 0;
        return res.status(200).json({
            message: "Total Not Sold item",
            totalUnsoldItems
        })
    } catch (error) {
        console.log("Internal server error in getting total not sold items", error);
        return res.status(500).json({
            message: "Internal server error in getting total not sold items!",
            error
        })
    }
}

// code for get the data by price Range
// code for get the data by price Range
module.exports.getPriceRangeData = async (req, res) => {
    try {
        const selectedMonthName = req.query.month;
        const monthIndex = monthNames.indexOf(selectedMonthName);

        if (monthIndex === -1) {
            return res.status(400).json({
                message: "Invalid month name provided!"
            });
        }

        // Define price range categories
        const priceRange = [
            { min: 0, max: 100 },
            { min: 101, max: 200 },
            { min: 201, max: 300 },
            { min: 301, max: 400 },
            { min: 401, max: 500 },
            { min: 501, max: 600 },
            { min: 601, max: 700 },
            { min: 701, max: 800 },
            { min: 801, max: 900 },
            { min: 901, max: "above" }
        ];

        // Use aggregation framework to fetch data for each price range
        const priceRangeData = await Promise.all(
            priceRange.map(async ({ min, max }) => {
                const aggregationResult = await Product.aggregate([
                    {
                        $project: {
                            month: { $month: "$dateOfSale" },
                            price: 1 // Ensure you project the price field if needed
                        }
                    },
                    {
                        $match: {
                            month: monthIndex + 1,
                            price: { $gte: min, $lt: max } // Filter by price range
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            count: { $sum: 1 }
                        }
                    }
                ]);

                const count = aggregationResult.length > 0 ? aggregationResult[0].count : 0;

                return {
                    range: `${min}-${max}`,
                    count: count
                };
            })
        );

        return res.status(200).json({
            message: "Item price range data",
            data: priceRangeData
        });
    } catch (error) {
        console.error("Internal server error in getting price range data", error);
        return res.status(500).json({
            message: "Internal server error in getting price range data!",
            error
        });
    }
};


// code for get the data by category
module.exports.categoryData = async (req, res) => {
    try {
        const selectedMonth = req.query.month;
        const monthIndex = monthNames.indexOf(selectedMonth);
        
        if (monthIndex === -1) {
            return res.status(400).json({
                message: "Invalid month name provided!"
            });
        }
        
        const categoryData = await Product.aggregate([
            {
                $project: {
                    month: { $month: '$dateOfSale' }, // Extract month from dateOfSale
                    category: 1
                }
            },
            {
                $match: {
                    month: monthIndex+1
                }
            },
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 }
                }
            }
        ]);

        return res.status(200).json({
            message: "Category Data",
            categoryData
        });
    } catch (error) {
        console.error("Internal server error in getting category data", error);
        return res.status(500).json({
            message: "Internal server error in getting category data!",
            error
        });
    }
};