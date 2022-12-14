const productService = require("../../service/user/product");
const { response } = require("../../middleware/response");
const RequestIp = require("@supercharge/request-ip");

exports.getAll = async (req, res) => {
  try {
    if (!req.query.page || !req.query.limit) {
      return response("pagination is require for pagination..!!", {}, 404, res);
    } else {
      let resp = await productService.getAll({
        user_id: req.user_id,
        page: req.query.page,
        limit: req.query.limit,
        str: req.query.str,
        startDate: req.query.startDate,
        endDate: req.query.endDate,
        ring_type: req.query.ring_type,
        diamond_shape: req.query.diamond_shape,
        metal: req.query.metal,
        min: req.query.min,
        max: req.query.max,
        tag: req.query.tag,
        category: req.query.category,
        country: req.query.country,
        sort_by: req.query.sort_by,
      });
      if (resp) {
        // req.ip = RequestIp.getClientIp(req);
        // let ip = req.socket.localAddress;
        // let ip = req.socket.localAddress;
        // let resp1 = await productService.addip(ip);//resp1 km??te comment karavanu che
        // if (resp1) {
        return response("SUCESS..!!", resp.data, 200, res);
        // } else {
        //   return response("something went wrong!!", {}, 404, res);
        // }
      } else {
        return response("something went wrong!!", {}, 500, res);
      }
    }
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};

exports.byId = async (req, res) => {
  try {
    let resp = await productService.byId({
      id: req.params._id,
      country: req.query.country,
      user_id: req.user_id,
    });
    if (resp) {
      return response("SUCCESS..!!", resp.data, 200, res);
    } else {
      return response("Something went worng!!", {}, 404, res); //message chnage kr
    }
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};
exports.search = async (req, res) => {
  try {
    let resp = await productService.search({
      str: req.query.str,
      country: req.query.country,
    });
    if (resp) {
      return response("SUCCESS..!!", resp.data, 200, res);
    } else {
      return response("Something went worng!!", {}, 404, res); //same
    }
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};
