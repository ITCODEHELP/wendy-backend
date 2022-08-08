const productModel = require("../../model/product.model");
// const userModel = require("../../model/user.model");
const mongoose = require("mongoose");
// const watchlistModel = require("../../model/watchlist.model");
// const transactionModel = require("../../model/transaction.model");
// const walletService = require("./wallet");

// module.exports = {
//     getAll: ({ page, limit, str, startDate, endDate, userId, status }) => {
//         return new Promise(async (res, rej) => {
//             try {
//                 let qry = {};
//                 page = parseInt(page);
//                 limit = parseInt(limit);
//                 if (startDate && endDate) {
//                     startDate = new Date(startDate);
//                     endDate = new Date(endDate);
//                     endDate.setDate(endDate.getDate() + 1);
//                     qry["$and"] = [
//                         { createdAt: { $gt: startDate } },
//                         { createdAt: { $lt: endDate } },
//                     ];
//                 }
//                 if (str) {
//                     qry["$or"] = [
//                         { name: { $regex: str, $options: "i" } },
//                         { propertyManagerName: { $regex: str, $options: "i" } },
//                         { tenantName: { $regex: str, $options: "i" } },
//                     ];
//                 }
//                 if (status) {
//                     qry["status"] = status;
//                 }
//                 // qry = { 'propertyTransactionData.typeOfTransaction': "Real Estate" };
//                 let watchlistOfUser = [];
//                 console.log("userId: ", userId);

//                 if (userId)
//                     watchlistOfUser =
//                         (await watchlistModel.findOne({ userId }, { properties: 1 }))
//                             ?.properties || [];
//                 console.log("isFav: ", watchlistOfUser);
//                 let getData = await productModel.aggregate([
//                     { $match: qry },
//                     {
//                         $lookup: {
//                             from: "transactions",
//                             localField: "_id",
//                             foreignField: "idOfCompanyProperty",
//                             as: "propertyTransactionData",
//                         },
//                     },
//                     // { $unwind: "$propertyTransactionData" },
//                     {
//                         $facet: {
//                             total_count: [
//                                 {
//                                     $group: {
//                                         _id: null,
//                                         count: { $sum: 1 },
//                                     },
//                                 },
//                             ],
//                             result: [
//                                 {
//                                     $addFields: {
//                                         is_fav: { $in: ["$_id", watchlistOfUser] },
//                                     },
//                                 },
//                                 {
//                                     $project: {
//                                         name: 1,
//                                         urlName: 1,
//                                         featureImage: 1,
//                                         minimunInvestment: 1,
//                                         totalInvestment: 1,
//                                         totalAmount: 1,
//                                         averageRentalYield: 1,
//                                         targetIRR: 1,
//                                         dividentYield: 1,
//                                         fiveYearExpectedReturn: 1,
//                                         remainingPeriod: 1,
//                                         rentAmount: 1,
//                                         numberOfInvestors: 1,
//                                         totalInvestmentNeeded: 1,
//                                         grossYield: 1,
//                                         suggestedHoldingPeriod: 1,
//                                         propertyType: 1,
//                                         area: 1,
//                                         report: 1,
//                                         overview: 1,
//                                         whyInvest: 1,
//                                         mapLink: 1,
//                                         propertyManagerName: 1,
//                                         propertyManagerDetails: 1,
//                                         developer: 1,
//                                         developerDetails: 1,
//                                         tenantName: 1,
//                                         tenantLogo: 1,
//                                         tenantOverview: 1,
//                                         leaseStructureDetails: 1,
//                                         leaseStart: 1,
//                                         leaseLockIn: 1,
//                                         leaseEnd: 1,
//                                         leaseCommencement: 1,
//                                         monthlyRentRupeePerSQFT: 1,
//                                         escalation: 1,
//                                         securityDeposit: 1,
//                                         leaseTerm: 1,
//                                         floorPlanDetails: 1,
//                                         gallaryImages: 1,
//                                         floorPlan: 1,
//                                         status: 1,
//                                         location: 1,
//                                         locationStr: 1,
//                                         documents: 1,
//                                         amenities: 1,
//                                         propetyMetaInfo: 1,
//                                         propertyManagerWebsiteUrl: 1,
//                                         propertyManagerAddress: 1,
//                                         propertyManagerImage: 1,
//                                         projectedReturn: 1,
//                                         sharePrice: 1,
//                                         iframeUrl: 1,
//                                         videoUpload: 1,
//                                         createdAt: 1,
//                                         updatedAt: 1,
//                                         toatlInvestedData: "$propertyTransactionData",
//                                         totalInvestedAmountByUser: {
//                                             $sum: "$propertyTransactionData.totalAmount",
//                                         },
//                                         is_fav: 1,
//                                     },
//                                 },
//                                 { $sort: { createdAt: -1 } },
//                                 { $skip: (page - 1) * limit },
//                                 { $limit: limit },
//                             ],
//                         },
//                     },
//                 ]);
//                 getData = getData[0];
//                 // console.log("getData.total_count[0] ...........", getData.total_count);
//                 // console.log("getData ...........", getData);
//                 if (getData.result.length > 0) {
//                     getData.result = getData.result.map((item, index) => {
//                         let uniqueUser = [
//                             ...new Set(item.toatlInvestedData.map((i) => i.customerId.toString())),
//                         ].length;

//                         delete item.toatlInvestedData;
//                         return {
//                             ...item,
//                             uniqueUser,
//                             fundedByUser: (item.totalInvestedAmountByUser / item.totalAmount) * 100 || 0,
//                             index: getData.total_count[0].count - index,
//                         };
//                     });
//                     res({
//                         status: 200,
//                         data: {
//                             total_count: getData.total_count[0].count,
//                             result: getData.result,
//                         },
//                     });
//                 } else {
//                     rej({ status: 404, message: "No Data found!!" });
//                 }
//             } catch (err) {
//                 console.log("err ....", err);
//                 rej({ status: 500, error: err, message: "something went wrong!!" });
//             }
//         });
//     },

//     byId: (_id) => {
//         return new Promise(async (res, rej) => {
//             try {
//                 let getData = await productModel.findById(_id);
//                 if (getData) {
//                     res({ status: 200, data: getData });
//                 } else {
//                     rej({ status: 404, message: "Invalid id!!" });
//                 }
//             } catch (err) {
//                 console.log(err);
//                 rej({ status: 500, error: err, message: "something went wrong!!" });
//             }
//         });
//     },

//     getByName: ({ urlName, userId }) => {
//         return new Promise(async (res, rej) => {
//             try {
//                 console.log("userId ...........", userId);
//                 console.log("urlName ...........", urlName);
//                 let watchlistOfUser = [];
//                 if (userId)
//                     watchlistOfUser =
//                         (await watchlistModel.findOne({ userId }, { properties: 1 }))
//                             ?.properties || [];
//                 let getData = await productModel.aggregate([
//                     {
//                         $match: { urlName: urlName }
//                     },
//                     { $addFields: { is_fav: { $in: ["$_id", watchlistOfUser] } } },
//                     { $limit: 1 },
//                 ]);
//                 console.log("getData .......", getData);

//                 let balance = await walletService.getBalance(userId);
//                 console.log("balance .....", balance);

//                 let propertyId = mongoose.Types.ObjectId(getData[0]._id);
//                 let existData = await transactionModel.find({
//                     idOfCompanyProperty: mongoose.Types.ObjectId(getData[0]._id),
//                 });
//                 console.log("existData ......", existData.length);
//                 if (existData.length > 0) {
//                     let trasactionData = await transactionModel.aggregate([
//                         { $match: { idOfCompanyProperty: propertyId } },
//                         {
//                             $group: {
//                                 _id: "$customerId",
//                                 totalInvestment: { $sum: "$totalAmount" },
//                             },
//                         },
//                         {
//                             $group: {
//                                 _id: null,
//                                 totalInvestment: { $sum: "$totalInvestment" },
//                                 totalInvestors: { $sum: 1 },
//                             },
//                         },
//                     ]);
//                     console.log("trasactionData ..........", trasactionData);
//                     let funded =
//                         (trasactionData[0].totalInvestment / getData[0].totalAmount) * 100;
//                     console.log("funded ........", funded);
//                     if (getData[0]) {
//                         res({
//                             status: 200,
//                             data: {
//                                 totalInvestment: trasactionData[0].totalInvestment || 0,
//                                 totalInvestors: trasactionData[0].totalInvestors,
//                                 Funded: funded,
//                                 balance: balance,
//                                 result: getData[0],
//                             },
//                         });
//                     } else {
//                         rej({ status: 404, message: "Property Not Found", error: {} });
//                     }
//                 } else {
//                     res({ status: 200, data: { balance: balance, result: getData[0] } });
//                 }
//                 rej({ status: 404, message: "Property Not Found", error: {} });
//             } catch (err) {
//                 console.log(err);
//                 rej({ status: 500, error: err, message: "something went wrong!!" });
//             }
//         });
//     },
// };