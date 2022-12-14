const authService = require("../../service/admin/auth");
const { response } = require("../../middleware/response");
// const { verifyOtpToken, verifyAdminEmailToken } = require("../../middleware/verifyToken");
// const adminModel = require("../../model/admin.model");

exports.register = async (req, res) => {
    try {
        let resp = await authService.register(req.body);
        if (resp) {
            return response("Added successfully..!!", resp.data, 200, res);
        }
        else {
            return response("Something went wrong!!", {}, 500, res);
        }
    }
    catch (err) {
        return response(err.message, err?.error, err.status, res);
    }
}

exports.login = async (req, res) => {
    try {
        let resp = await authService.login(req.body.email, req.body.password);
        if (resp) {
            return response("SUCCESS..!!", resp.data, 200, res);
        }
        else {
            return response("Something went wrong!!", {}, 500, res);
        }
    }
    catch (err) {
        return response(err.message, err?.error, err.status, res);
    }
}
