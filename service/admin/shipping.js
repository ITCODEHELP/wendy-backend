const shippingModel = require("../../model/shipping.model");
const countryModel = require("../../model/country.model");
const mongoose = require("mongoose");

module.exports = {
  addshipping: (data) => {
    return new Promise(async (res, rej) => {
      try {
        let countrydata = await shippingModel.find({
          profile_name: data.profile_name,
        });
        // console.log("data ...", productdata);
        if (countrydata != "") {
          let updateData = await shippingModel.findOneAndUpdate(
            { profile_name: data.profile_name },
            { $set: { country: data.country } },
            { new: true }
          );
          if (updateData) {
            res({ status: 200, data: "Data Updated!!" });
          } else {
            rej({ status: 500, message: "Something Went Worng!!" });
          }
        } else {
          // data.product_id = [data.product_id];
          let newshippingModel = new shippingModel(data);
          let saveData = await newshippingModel.save();
          if (saveData) {
            res({ status: 200, data: "shipping data added!!" });
          } else {
            rej({ status: 404, message: "something went wrong!!" });
          }
        }
      } catch (err) {
        console.log("err ...", err);
        rej({
          status: err?.status || 500,
          error: err,
          message: err?.message || "Something Went Wrong!!!",
        });
      }
    });
  },

  getshipping: (profile_name, name) => {
    return new Promise(async (res, rej) => {
      try {
        let getData = await shippingModel.find();
        getData = getData[0];
        if (getData) {
          // console.log("getData .......", getData);
          res({ status: 200, data: getData });
        } else {
          rej({ status: 404, message: "Invalid id!!" });
        }
      } catch (err) {
        console.log("err ...", err);
        rej({
          status: err?.status || 500,
          error: err,
          message: err?.message || "Something Went Wrong!!!",
        });
      }
    });
  },

  delete: (_id) => {
    return new Promise(async (res, rej) => {
      try {
        let deleteData = await shippingModel.findByIdAndDelete(_id);
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

  update: (profile_name, country, data) => {
    return new Promise(async (res, rej) => {
      try {
        let updateData = await shippingModel.findOneAndUpdate(
          { profile_name: profile_name, "country._id": country },
          {
            $set: {
              "country.$": {
                name: data.name,
                price: data.price,
                start: data.start,
                end: data.end,
              },
            },
          },
          { new: true }
        );
        if (updateData) {
          res({ status: 200, data: "Data Updated Successfully!!" });
        } else {
          rej({ status: 404, message: "Invalid Address Id!!" });
        }
      } catch (err) {
        console.log("err ...", err);
        rej({
          status: err?.status || 500,
          error: err,
          message: err?.message || "Something Went Wrong!!!",
        });
      }
    });
  },
};
