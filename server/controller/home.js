const Product = require('../model/product');

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// check the our server is working or not
module.exports.home = async (req, res) => {
    try {
        return res.status(200).json({
            message: "Home page of API project",
            success: true
        })
    } catch (error) {
        console.log("Error in finding the home page", error);
        return res.status(500).json({
            message: "Internal server error finding the home page",
            error
        })
    }
}

// fetching the data from api sna seeding in the database
module.exports.fetchData = async (req, res) => {
    try {
        const response = await fetch(process.env.apiurl);
        const productData = await response.json();
        const cleanedProductData = productData.map(product => ({
            ...product,
            price: parseFloat(product.price),
        }));
        await Product.collection.drop();
        await Product.insertMany(cleanedProductData)
        return res.status(200).json({
            message: "Database initialize with seed data"
        })
    } catch (error) {
        console.log("Error in fetching the data", error);
        return res.status(500).json({
            message: "Internal Server Error in finding the data",
            error
        })
    }
}

// code for pagination and search the data by title description and price

module.exports.transaction = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;
        const search = req.query.search;
        const selectedMonth = req.query.month;

        const query = {};

        // Handle search filter
        if (search !== undefined && search !== '') {
            const searchRegex = new RegExp(search, 'i');
            query.$or = [
                { title: { $regex: searchRegex } },
                { description: { $regex: searchRegex } },
            ];

            // Handle numeric search for price
            const priceAsNumber = parseFloat(search);
            if (!isNaN(priceAsNumber)) {
                query.$or.push({ price: priceAsNumber });
            }
        }

        // Handle month filter
        if (selectedMonth) {
            const monthIndex = monthNames.indexOf(selectedMonth);
            if (monthIndex === -1) {
                return res.status(400).json({
                    message: "Invalid month name provided!"
                });
            }
            const monthQuery = {
                $expr: { $eq: [{ $month: "$dateOfSale" }, monthIndex + 1] }
            };

            query.$and = query.$and ? [...query.$and, monthQuery] : [monthQuery];
        }

        // Fetch transactions based on the constructed query
        const transactionData = await Product.find(query)
            .skip(skip)
            .limit(limit);

        // Count total number of documents matching the query for pagination
        const totalCount = await Product.countDocuments(query);
        const totalPages = Math.ceil(totalCount / limit);

        return res.status(200).json({
            message: "Here is the pagination data",
            transactionData,
            totalCount,
            page,
            pageLimit: limit,
            totalPages,
            monthNames
        });
    } catch (error) {
        console.error("Error in fetching transaction", error);
        return res.status(500).json({
            message: "Internal Server error in fetching transaction data",
            error,
        });
    }
};
