const orderService = require("../../service/user/order");
const { response } = require("../../middleware/response");

exports.order = async (req, res) => {
  try {
    req.body.user_id = req.user_id;
    let resp = await orderService.order(req.body);
    if (resp) {
      return response("SUCCESS..!!", resp.data, 200, res);
    } else {
      return response("Something went wrong!!", {}, 500, res);
    }
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};

exports.payment = async (req, res) => {
  try {
    req.body.payerId = req.query.PayerID;
    req.body.paymentId = req.query.payerId;
    req.body.user_id = req.user_id;
    console.log(req.body);
    let resp = await orderService.payment(req.body);
    if (resp) {
      return response("Added successfully..!!", resp.data, 200, res);
    } else {
      return response("Something went wrong!!", {}, 500, res);
    }
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};

exports.getorder = async (req, res) => {
  try {
    if (!req.query.page || !req.query.limit) {
      return response("pagination is require for pagination..!!", {}, 404, res);
    } else {
      let resp = await orderService.getorder(
        req.user_id,
        req.query.page,
        req.query.limit
      );
      if (resp) {
        return response("SUCESS..!!", resp.data, 200, res);
      } else {
        return response("Something went wrong!!", {}, 500, res);
      }
    }
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};

exports.byId = async (req, res) => {
  try {
    let resp = await orderService.byId(req.query.id);
    if (resp) {
      return response("SUCESS..!!", resp.data, 200, res);
    } else {
      return response("Something went wrong!!", {}, 500, res);
    }
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};

exports.cancel = async (req, res) => {
  try {
    let resp = await orderService.cancel(req.body.id);
    if (resp) {
      return response("SUCESS..!!", { data: "Data Updated" }, 200, res);
    } else {
      return response("Something went wrong!!", {}, 500, res);
    }
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};

exports.add_address = async (req, res) => {
  try {
    console.log(req.body);
    let resp = await orderService.add_address(req.user_id, req.body);
    if (resp) {
      return response("Added successfully..!!", resp.data, 200, res);
    } else {
      return response("Something went wrong!!", {}, 500, res);
    }
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};

exports.get_address = async (req, res) => {
  try {
    console.log(req.body);
    let resp = await orderService.get_address(req.user_id, req.body);
    if (resp) {
      return response("Added successfully..!!", resp.data, 200, res);
    } else {
      return response("Something went wrong!!", {}, 500, res);
    }
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};

exports.delete_address = async (req, res) => {
  try {
    let resp = await orderService.delete_address(req.params._id);
    if (resp) {
      return response("Added successfully..!!", resp.data, 200, res);
    } else {
      return response("Something went wrong!!", {}, 500, res);
    }
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};
