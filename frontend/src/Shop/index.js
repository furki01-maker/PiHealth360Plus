"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var axios_1 = require("axios");
var ProductCard_1 = require("./components/ProductCard");
var SignIn_1 = require("./components/SignIn");
var Header_1 = require("./components/Header");
;
var _window = window;
var backendURL = _window.__ENV && _window.__ENV.backendURL;
var axiosClient = axios_1["default"].create({ baseURL: "".concat(backendURL), timeout: 20000, withCredentials: true });
var config = { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } };
function Shop() {
    var _this = this;
    var _a = (0, react_1.useState)(null), user = _a[0], setUser = _a[1];
    var _b = (0, react_1.useState)(false), showModal = _b[0], setShowModal = _b[1];
    var signIn = function () { return __awaiter(_this, void 0, void 0, function () {
        var scopes, authResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    scopes = ['username', 'payments'];
                    return [4 /*yield*/, window.Pi.authenticate(scopes, onIncompletePaymentFound)];
                case 1:
                    authResult = _a.sent();
                    signInUser(authResult);
                    setUser(authResult.user);
                    return [2 /*return*/];
            }
        });
    }); };
    var signOut = function () {
        setUser(null);
        signOutUser();
    };
    var signInUser = function (authResult) {
        axiosClient.post('/user/signin', { authResult: authResult });
        return setShowModal(false);
    };
    var signOutUser = function () {
        return axiosClient.get('/user/signout');
    };
    var onModalClose = function () {
        setShowModal(false);
    };
    var orderProduct = function (memo, amount, paymentMetadata) { return __awaiter(_this, void 0, void 0, function () {
        var paymentData, callbacks, payment;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (user === null) {
                        return [2 /*return*/, setShowModal(true)];
                    }
                    paymentData = { amount: amount, memo: memo, metadata: paymentMetadata };
                    callbacks = {
                        onReadyForServerApproval: onReadyForServerApproval,
                        onReadyForServerCompletion: onReadyForServerCompletion,
                        onCancel: onCancel,
                        onError: onError
                    };
                    return [4 /*yield*/, window.Pi.createPayment(paymentData, callbacks)];
                case 1:
                    payment = _a.sent();
                    console.log(payment);
                    return [2 /*return*/];
            }
        });
    }); };
    var onIncompletePaymentFound = function (payment) {
        console.log("onIncompletePaymentFound", payment);
        return axiosClient.post('/payments/incomplete', { payment: payment });
    };
    var onReadyForServerApproval = function (paymentId) {
        console.log("onReadyForServerApproval", paymentId);
        axiosClient.post('/payments/approve', { paymentId: paymentId }, config);
    };
    var onReadyForServerCompletion = function (paymentId, txid) {
        console.log("onReadyForServerCompletion", paymentId, txid);
        axiosClient.post('/payments/complete', { paymentId: paymentId, txid: txid }, config);
    };
    var onCancel = function (paymentId) {
        console.log("onCancel", paymentId);
        return axiosClient.post('/payments/cancelled_payment', { paymentId: paymentId });
    };
    var onError = function (error, payment) {
        console.log("onError", error);
        if (payment) {
            console.log(payment);
            // handle the error accordingly
        }
    };
    return (<>
      <Header_1["default"] user={user} onSignIn={signIn} onSignOut={signOut}/>

      <ProductCard_1["default"] name="Apple Pie" description="You know what this is. Pie. Apples. Apple pie." price={3} pictureURL="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Apple_pie.jpg/1280px-Apple_pie.jpg" pictureCaption="Picture by Dan Parsons - https://www.flickr.com/photos/dan90266/42759561/, CC BY-SA 2.0, https://commons.wikimedia.org/w/index.php?curid=323125" onClickBuy={function () { return orderProduct("Order Apple Pie", 3, { productId: 'apple_pie_1' }); }}/>
      <ProductCard_1["default"] name="Lemon Meringue Pie" description="Non-contractual picture. We might have used oranges because we had no lemons. Order at your own risk." price={5} pictureURL="https://live.staticflickr.com/1156/5134246283_f2686ff8a8_b.jpg" pictureCaption="Picture by Sistak - https://www.flickr.com/photos/94801434@N00/5134246283, CC BY-SA 2.0" onClickBuy={function () { return orderProduct("Order Lemon Meringue Pie", 5, { productId: 'lemon_pie_1' }); }}/>

      {showModal && <SignIn_1["default"] onSignIn={signIn} onModalClose={onModalClose}/>}
    </>);
}
exports["default"] = Shop;
