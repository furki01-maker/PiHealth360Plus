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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = mountUserEndpoints;
const platformAPIClient_1 = __importDefault(require("../services/platformAPIClient"));
function mountUserEndpoints(router) {
    // handle the user auth accordingly
    router.post('/signin', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const auth = req.body.authResult;
        const userCollection = req.app.locals.userCollection;
        try {
            // Verify the user's access token with the /me endpoint:
            const me = yield platformAPIClient_1.default.get(`/v2/me`, { headers: { 'Authorization': `Bearer ${auth.accessToken}` } });
            console.log(me);
        }
        catch (err) {
            console.log(err);
            return res.status(401).json({ error: "Invalid access token" });
        }
        let currentUser = yield userCollection.findOne({ uid: auth.user.uid });
        if (currentUser) {
            yield userCollection.updateOne({
                _id: currentUser._id
            }, {
                $set: {
                    accessToken: auth.accessToken,
                }
            });
        }
        else {
            const insertResult = yield userCollection.insertOne({
                username: auth.user.username,
                uid: auth.user.uid,
                roles: auth.user.roles,
                accessToken: auth.accessToken
            });
            currentUser = yield userCollection.findOne(insertResult.insertedId);
        }
        req.session.currentUser = currentUser;
        return res.status(200).json({ message: "User signed in" });
    }));
    // handle the user auth accordingly
    router.get('/signout', (req, res) => __awaiter(this, void 0, void 0, function* () {
        req.session.currentUser = null;
        return res.status(200).json({ message: "User signed out" });
    }));
}
