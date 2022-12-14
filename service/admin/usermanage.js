const mongoose = require("mongoose");
const userModel = require("../../model/user.model");

module.exports = {
  update: async (_id, data) => {
    return new Promise(async (res, rej) => {
      try {
        let getData = await userModel.findByIdAndUpdate(_id, data, {
          new: true,
        });
        if (getData) {
          res({ status: 200, data: "" });
        } else {
          rej({ status: 404, message: "Invalid id!!" });
        }
      } catch (err) {
        console.log("err", err);
        rej({ status: 500, error: err, message: "something went wrong!!" });
      }
    });
  },

  userstatus: async (_id, data) => {
    return new Promise(async (res, rej) => {
      try {
        let getData = await userModel.findByIdAndUpdate(
          _id,
          { user_status: data },
          { new: true }
        );
        if (getData) {
          res({ status: 200, data: "" });
        } else {
          rej({ status: 404, message: "Invalid id!!" });
        }
      } catch (err) {
        console.log("err", err);
        rej({ status: 500, error: err, message: "something went wrong!!" });
      }
    });
  },

  getAll: (page, limit, str) => {
    return new Promise(async (res, rej) => {
      try {
        let qry = {};
        page = parseInt(page);
        limit = parseInt(limit);
        let getData = await userModel.aggregate([
          {
            $match: { email: { $regex: str, $options: "i" } },
          },
          {
            $facet: {
              total_count: [
                {
                  $group: {
                    _id: null,
                    count: { $sum: 1 },
                  },
                },
              ],
              result: [
                {
                  $project: {
                    password: 0,
                    __v: 0,
                  },
                },
                { $sort: { createdAt: -1 } },
                { $skip: (page - 1) * limit },
                { $limit: limit },
              ],
            },
          },
        ]);
        getData = getData[0];
        if (getData.result.length > 0) {
          res({
            status: 200,
            data: {
              total_count: getData.total_count[0].count,
              result: getData.result,
            },
          });
        } else {
          rej({ status: 404, message: "No Data Found!!" });
        }
      } catch (err) {
        console.log("err ....", err);
        rej({ status: 500, error: err, message: "something went wrong!!" });
      }
    });
  },

  byId: (id) => {
    return new Promise(async (res, rej) => {
      try {
        console.log(id);
        let Data = await userModel.aggregate([
          { $match: { _id: mongoose.Types.ObjectId(id) } },
          { $project: { password: 0, __v: 0 } },
        ]);
        console.log("Data ..........", Data);
        if (Data) {
          res({
            status: 200,
            data: {
              result: Data,
            },
          });
        } else {
          rej({ status: 404, message: "User Not Found", error: {} });
        }
        rej({
          status: 404,
          message: "User Not Found, Invalid id!!",
          error: {},
        });
      } catch (err) {
        console.log(err);
        rej({ status: 500, error: err, message: "something went wrong!!" });
      }
    });
  },

  delete: (_id) => {
    return new Promise(async (res, rej) => {
      try {
        let deleteData = await userModel.findByIdAndDelete(_id);
        if (deleteData) {
          res({ status: 200, data: "Data Deleted!!" });
        } else {
          rej({ status: 404, message: "Invalid id!!" });
        }
      } catch (err) {
        console.log(err);
        rej({ status: 500, error: err, message: "something went wrong!!" });
      }
    });
  },
};
