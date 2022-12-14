const usermanageService = require("../../service/admin/usermanage");
const { response } = require("../../middleware/response");

exports.update = async (req, res) => {
  try {
    // console.log(req.body.confirmPassword);
    if (req.body.password || req.body.confirmPassword) {
      return response(
        "Cannot update password and confirmPassword!!",
        {},
        400,
        res
      );
    } else {
      let resp = await usermanageService.update(req.params._id, req.body);
      if (resp) {
        return response("data updated successfully!!", {}, 200, res);
      } else {
        return response("something went wrong!!", {}, 500, res);
      }
    }
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};
exports.updatestatus = async (req, res) => {
  try {
    // console.log(req.body.confirmPassword);

    let resp = await usermanageService.userstatus(
      req.params._id,
      req.body.user_status
    );
    if (resp) {
      return response("data updated successfully!!", {}, 200, res);
    } else {
      return response("something went wrong!!", {}, 500, res);
    }
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};
exports.getAll = async (req, res) => {
  try {
    if (!req.query.page || !req.query.limit) {
      return response("pagination is require for pagination..!!", {}, 404, res);
    } else {
      let resp = await usermanageService.getAll(
        req.query.page,
        req.query.limit,
        req.query.str
      );
      if (resp) {
        return response("SUCCESS..!!", resp.data, 200, res);
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
    let resp = await usermanageService.byId(req.params._id);
    if (resp) {
      return response("SUCCESS..!!", resp.data, 200, res);
    } else {
      return response("Something went worng..!!", {}, 500, res); //message
    }
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};

exports.delete = async (req, res) => {
  try {
    let resp = await usermanageService.delete(req.params._id);
    if (resp) {
      return response("Deleted successfully!!", resp.data, 200, res);
    } else {
      return response("Something went worng..!!", err.error, err.status, res);
    }
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};

// exports.exportData = async (req, res) => {
//     try {
//         let resp = await productService.exportData(req.query.str, req.query.startDate, req.query.endDate, req.query.status);
//         if (resp) {
//             res.xls(`productData ${Math.floor(10000000 + Math.random() * 90000000)}.xlsx`, resp.data);
//         }
//         else {
//             return response("something went wrong!!", {}, 500, res);
//         }
//     }
//     catch (err) {
//         return response(err.message, err?.error, err.status, res);
//     }
// };
