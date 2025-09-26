"use strict";
var _awaiter = (this && this._awaiter) || function (thisArg, _arguments, P, generator) { ... } // mevcut helper kodu aynen kalabilir
var _generator = (this && this._generator) || function (thisArg, body) { ... }

exports.__esModule = true;
var react_1 = require("react");

var PaymentButton = function (_a) {
    var amount = _a.amount, receiver = _a.receiver, _b = _a.memo, memo = _b === void 0 ? "Health360+ Payment" : _b;
    var _c = (0, react_1.useState)(false), loading = _c[0], setLoading = _c[1];

    var startPayment = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, data, backendUrl, payUrl, err_1;
        return _generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    // Backend URL -> Cloudflared tunnel URL
                    backendUrl = "https://governance-aberdeen-guam-picked.trycloudflare.com";
                    return [4 /yield/, fetch(backendUrl + "/approve_payment", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ amount: amount, receiver: receiver, memo: memo })
                        })];
                case 2:
                    res = _a.sent();
                    return [4 /yield/, res.json()];
                case 3:
                    data = _a.sent();
                    if (data.paymentId) {
                        alert("Payment ID: " + data.paymentId);
                        payUrl = "https://minepi.com/pay";
                        window.open(payUrl + "/" + data.paymentId, "_blank", "width=500,height=700");
                    } else {
                        alert("Hata: " + data.error);
                    }
                    return [3 /break/, 6];
                case 4:
                    err_1 = _a.sent();
                    alert("Sunucu hatası: " + err_1.message);
                    return [3 /break/, 6];
                case 5:
                    setLoading(false);
                    return [7 /endfinally/];
                case 6: return [2 /return/];
            }
        });
    }); };

    return (<button onClick={startPayment} disabled={loading} style={{
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "8px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer"
        }}>
      {loading ? "Ödeme İşleniyor..." : "Öde " + amount + " Pi"}
    </button>);
};

exports["default"] = PaymentButton;