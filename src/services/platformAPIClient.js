"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var environments_1 = require("../environments");
var platformAPIClient = axios_1["default"].create({
    baseURL: environments_1["default"].platform_api_url,
    timeout: 20000,
    headers: { 'Authorization': "Key ".concat(environments_1["default"].pi_api_key) }
});
exports["default"] = platformAPIClient;
