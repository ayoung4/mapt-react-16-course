/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("fluture");

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Webpart; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ramda__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_monet__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_monet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_monet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_fluture__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_fluture___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_fluture__);



var Webpart;
(function (Webpart_1) {
    class Webpart {
        constructor(op) {
            this.op = op;
        }
        run(request) {
            return this.op(request);
        }
        concat(wp) {
            return new Webpart((request) => this.run(request)
                .bimap(() => Webpart_1.reject(), (f) => f.chain(() => {
                const res = wp.run(request);
                return res.isRight()
                    ? res.right()
                    : __WEBPACK_IMPORTED_MODULE_2_fluture__["reject"]({});
            })));
        }
    }
    Webpart_1.Webpart = Webpart;
    Webpart_1.reject = () => __WEBPACK_IMPORTED_MODULE_1_monet__["Either"].Left({});
    Webpart_1.accept = (f) => __WEBPACK_IMPORTED_MODULE_1_monet__["Either"].Right(f);
    Webpart_1.ok = (x) => __WEBPACK_IMPORTED_MODULE_1_monet__["Either"].Right(__WEBPACK_IMPORTED_MODULE_2_fluture__["resolve"](x));
    Webpart_1.fail = (err) => __WEBPACK_IMPORTED_MODULE_1_monet__["Either"].Right(__WEBPACK_IMPORTED_MODULE_2_fluture__["reject"](err));
    Webpart_1.log = (str) => new Webpart(() => Webpart_1.ok(console.log('DEBUG', str)));
    Webpart_1.match = (wps) => new Webpart((request) => {
        const options = __WEBPACK_IMPORTED_MODULE_0_ramda__["map"]((wp) => wp.run(request), wps);
        return __WEBPACK_IMPORTED_MODULE_0_ramda__["find"]((wr) => wr.isRight(), options)
            || Webpart_1.reject();
    });
    const method = (m) => new Webpart((request) => m === request.req.method
        ? Webpart_1.ok(request)
        : Webpart_1.reject());
    Webpart_1.GET = method('GET');
    Webpart_1.POST = method('POST');
    Webpart_1.path = (p) => new Webpart((request) => p === request.req.path
        ? Webpart_1.ok(request)
        : Webpart_1.reject());
    Webpart_1.exec = (fn) => new Webpart((request) => Webpart_1.accept(fn(request)));
    Webpart_1.validate = (v) => new Webpart(({ req, res }) => {
        const val = v.exec(req.body);
        return val.isLeft()
            ? Webpart_1.fail(res.status(400).json({
                message: val.left(),
            }))
            : Webpart_1.ok(req.body);
    });
    Webpart_1.load = (app, wp) => app.use((req, res, next) => {
        console.log(req.method, req['path']);
        wp.run({ req, res, next })
            .bimap(() => res.status(404).end(), (f) => f.fork(() => res.end(), () => res.end()));
    });
})(Webpart || (Webpart = {}));


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("monet");

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_passport_jwt__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_passport_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_passport_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_passport__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_passport___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_passport__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_fluture__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_fluture___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_fluture__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_webpart__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_api_users__ = __webpack_require__(6);





const settings = __webpack_require__(8);
const jwtStrategy = new __WEBPACK_IMPORTED_MODULE_0_passport_jwt__["Strategy"]({
    jwtFromRequest: __WEBPACK_IMPORTED_MODULE_0_passport_jwt__["ExtractJwt"].fromAuthHeaderAsBearerToken(),
    secretOrKey: settings.secretOrKey,
}, (payload, done) => __WEBPACK_IMPORTED_MODULE_4_api_users__["a" /* User */].findById(payload.id)
    .catch((err) => done(err, null))
    .then((user) => !!user
    ? done(null, user)
    : done(null, null)));
const pp = new __WEBPACK_IMPORTED_MODULE_1_passport__["Passport"]().use(jwtStrategy);
/* harmony export (immutable) */ __webpack_exports__["c"] = pp;

const authenticateRequest = ({ req, res, next }) => __WEBPACK_IMPORTED_MODULE_2_fluture__["Future"]((reject, resolve) => {
    pp.authenticate('jwt', { session: false }, (err, user) => err
        ? reject(err)
        : resolve(user))(req, res, next);
});
/* harmony export (immutable) */ __webpack_exports__["b"] = authenticateRequest;

const AuthPart = __WEBPACK_IMPORTED_MODULE_3_webpart__["a" /* Webpart */].exec(({ req, res, next }) => authenticateRequest({ req, res, next })
    .chainRej(() => __WEBPACK_IMPORTED_MODULE_2_fluture__["reject"](res.status(500)))
    .chain((user) => !!user
    ? __WEBPACK_IMPORTED_MODULE_2_fluture__["resolve"](user)
    : __WEBPACK_IMPORTED_MODULE_2_fluture__["reject"](res.status(401).json({ message: 'unauthorized' }))));
/* harmony export (immutable) */ __webpack_exports__["a"] = AuthPart;



/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("ramda");

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model__ = __webpack_require__(7);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__model__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__queries__ = __webpack_require__(18);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__queries__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__insert__ = __webpack_require__(19);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__insert__["a"]; });





/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);

const UserSchema = new __WEBPACK_IMPORTED_MODULE_0_mongoose__["Schema"]({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, required: true },
    created: { type: Date, default: Date.now },
});
const User = __WEBPACK_IMPORTED_MODULE_0_mongoose__["model"]('users', UserSchema);
/* harmony export (immutable) */ __webpack_exports__["a"] = User;



/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = {
    apiSecret: 'string',
    mongoURI: 'mongodb://root:password123@ds045097.mlab.com:45097/react-16-course',
    secretOrKey: 'string',
};


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Validation; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_monet__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_monet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_monet__);

var Validation;
(function (Validation_1) {
    class Validation {
        constructor(pred) {
            this.pred = pred;
        }
        exec(data) {
            return this.pred(data);
        }
        concat(v) {
            return new Validation((data) => {
                const first = this.pred(data);
                const second = v.pred(data);
                return first
                    .leftMap((errs) => second.isLeft()
                    ? errs.concat(second.left())
                    : errs)
                    .chain(() => second.isLeft()
                    ? __WEBPACK_IMPORTED_MODULE_0_monet__["Either"].Left(second.left())
                    : __WEBPACK_IMPORTED_MODULE_0_monet__["Either"].Right(data));
            });
        }
    }
    Validation_1.Validation = Validation;
    Validation_1.empty = () => new Validation(() => __WEBPACK_IMPORTED_MODULE_0_monet__["Either"].Right({}));
    Validation_1.of = (errStr, pred) => new Validation((data) => pred(data)
        ? __WEBPACK_IMPORTED_MODULE_0_monet__["Either"].Right(data)
        : __WEBPACK_IMPORTED_MODULE_0_monet__["Either"].Left([errStr]));
})(Validation || (Validation = {}));


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bcryptjs__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bcryptjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_bcryptjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_fluture__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_fluture___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_fluture__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ramda__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ramda__);



const genSalt = (seed = 10) => __WEBPACK_IMPORTED_MODULE_1_fluture__["Future"]((reject, resolve) => __WEBPACK_IMPORTED_MODULE_0_bcryptjs__["genSalt"](seed, (err, salt) => err
    ? reject(err)
    : resolve(salt)));
/* unused harmony export genSalt */

const hash = __WEBPACK_IMPORTED_MODULE_2_ramda__["curry"]((str, salt) => __WEBPACK_IMPORTED_MODULE_1_fluture__["Future"]((reject, resolve) => __WEBPACK_IMPORTED_MODULE_0_bcryptjs__["hash"](str, salt, (err, hash) => err
    ? reject(err)
    : resolve(hash))));
/* unused harmony export hash */

const genHash = (password) => genSalt().chain(hash(password));
/* harmony export (immutable) */ __webpack_exports__["b"] = genHash;

const compare = __WEBPACK_IMPORTED_MODULE_2_ramda__["curry"]((str, hash) => __WEBPACK_IMPORTED_MODULE_1_fluture__["Future"]((reject, resolve) => __WEBPACK_IMPORTED_MODULE_0_bcryptjs__["compare"](str, hash, (err, isCollision) => err
    ? reject(err)
    : resolve(isCollision))));
/* harmony export (immutable) */ __webpack_exports__["a"] = compare;



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_validation__ = __webpack_require__(9);


const passwordLength = ({ password }) => __WEBPACK_IMPORTED_MODULE_0_lodash__["isString"](password) && password.length > 7;
const emailRegex = ({ email }) => __WEBPACK_IMPORTED_MODULE_0_lodash__["isString"](email) && !!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.exec(email);
const nameRegex = ({ name }) => __WEBPACK_IMPORTED_MODULE_0_lodash__["isString"](name) && !!/^[a-z ,.'-]+$/.exec(name);
const passwordLengthValidator = __WEBPACK_IMPORTED_MODULE_1_validation__["a" /* Validation */].of('your password must consist of at least 7 characters', passwordLength);
/* harmony export (immutable) */ __webpack_exports__["c"] = passwordLengthValidator;

const emailRegexValidator = __WEBPACK_IMPORTED_MODULE_1_validation__["a" /* Validation */].of('your email must be valid', emailRegex);
/* harmony export (immutable) */ __webpack_exports__["a"] = emailRegexValidator;

const nameRegexValidator = __WEBPACK_IMPORTED_MODULE_1_validation__["a" /* Validation */].of('your name must be valid', nameRegex);
/* harmony export (immutable) */ __webpack_exports__["b"] = nameRegexValidator;



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);

const ProfileSchema = new __WEBPACK_IMPORTED_MODULE_0_mongoose__["Schema"]({
    owner: {
        type: __WEBPACK_IMPORTED_MODULE_0_mongoose__["Schema"].Types.ObjectId,
        ref: 'users',
        required: true,
    },
    company: {
        type: String,
    },
    website: {
        type: String,
    },
    location: {
        type: String,
    },
    status: {
        type: String,
    },
    skills: {
        type: [String],
        required: true,
    },
    bio: {
        type: String,
    },
    githubUsername: {
        type: String,
    },
    experience: [
        {
            title: {
                type: String,
                required: true,
            },
            company: {
                type: String,
                required: true,
            },
            location: {
                type: String,
            },
            from: {
                type: Date,
                required: true,
            },
            to: {
                type: Date,
            },
            description: {
                type: String,
            },
        },
    ],
    education: [
        {
            school: {
                type: String,
                required: true,
            },
            degree: {
                type: String,
                required: true,
            },
            field: {
                type: String,
                required: true,
            },
            from: {
                type: Date,
                required: true,
            },
            to: {
                type: Date,
            },
            description: {
                type: String,
            },
        },
    ],
    social: {
        youtube: {
            type: String,
        },
        twitter: {
            type: String,
        },
        facebook: {
            type: String,
        },
        linkedin: {
            type: String,
        },
        instagram: {
            type: String,
        },
    },
    created: {
        type: Date,
        default: Date.now,
    }
});
/* unused harmony export ProfileSchema */

const Profile = __WEBPACK_IMPORTED_MODULE_0_mongoose__["model"]('profiles', ProfileSchema);
/* harmony export (immutable) */ __webpack_exports__["a"] = Profile;



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mongoose__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_mongoose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_body_parser__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_body_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__webpart__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__auth_passport__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__routes_users__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__routes_profiles__ = __webpack_require__(29);







const settings = __webpack_require__(8);
const server = __WEBPACK_IMPORTED_MODULE_0_express__();
const PORT = process.env.PORT || 5000;
__WEBPACK_IMPORTED_MODULE_1_mongoose__["connect"](settings.mongoURI, { useNewUrlParser: true })
    .catch(console.warn)
    .then(() => console.log('mongo connected'));
server.use(__WEBPACK_IMPORTED_MODULE_0_express__["static"](__dirname + '/public/'));
server.use(__WEBPACK_IMPORTED_MODULE_4__auth_passport__["c" /* pp */].initialize());
server.use(__WEBPACK_IMPORTED_MODULE_2_body_parser__["urlencoded"]({ extended: true }));
const app = __WEBPACK_IMPORTED_MODULE_3__webpart__["a" /* Webpart */].match([
    __WEBPACK_IMPORTED_MODULE_6__routes_profiles__["a" /* ProfilesApi */],
    __WEBPACK_IMPORTED_MODULE_5__routes_users__["a" /* UsersApi */],
]);
// server.get('*', (req, res) => {
//     console.log('getting index');
// })
__WEBPACK_IMPORTED_MODULE_3__webpart__["a" /* Webpart */].load(server, app);
server.listen(PORT, () => console.log(`api listening on ${PORT}`));


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("passport-jwt");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_fluture__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_fluture___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_fluture__);


const findByEmail = (email) => __WEBPACK_IMPORTED_MODULE_1_fluture__["Future"]((reject, resolve) => {
    __WEBPACK_IMPORTED_MODULE_0__model__["a" /* User */].findOne({ email })
        .catch(reject)
        .then(resolve);
});
/* harmony export (immutable) */ __webpack_exports__["a"] = findByEmail;

const findById = (id) => __WEBPACK_IMPORTED_MODULE_1_fluture__["Future"]((reject, resolve) => {
    __WEBPACK_IMPORTED_MODULE_0__model__["a" /* User */].findOne({ _id: id })
        .catch(reject)
        .then(resolve);
});
/* unused harmony export findById */



/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_gravatar__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_gravatar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_gravatar__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_fluture__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_fluture___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_fluture__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ramda__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_crypt__ = __webpack_require__(10);





const insertUser = __WEBPACK_IMPORTED_MODULE_2_ramda__["curry"]((email, name, password) => __WEBPACK_IMPORTED_MODULE_1_fluture__["Future"]((reject, resolve) => {
    new __WEBPACK_IMPORTED_MODULE_3__model__["a" /* User */]({
        name,
        email,
        avatar: __WEBPACK_IMPORTED_MODULE_0_gravatar__["url"](email, {
            s: 200,
            r: 'r',
        }),
        password,
    })
        .save()
        .then(resolve)
        .catch(reject);
}));
const register = (email, name, password) => __WEBPACK_IMPORTED_MODULE_4_crypt__["b" /* genHash */](password)
    .chain(insertUser(email, name));
/* harmony export (immutable) */ __webpack_exports__["a"] = register;



/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("gravatar");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("bcryptjs");

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webpart__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_auth_passport__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__register__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__current__ = __webpack_require__(28);





const UsersApi = __WEBPACK_IMPORTED_MODULE_0_webpart__["a" /* Webpart */].match([
    __WEBPACK_IMPORTED_MODULE_0_webpart__["a" /* Webpart */].path('/api/users/register')
        .concat(__WEBPACK_IMPORTED_MODULE_0_webpart__["a" /* Webpart */].POST)
        .concat(__WEBPACK_IMPORTED_MODULE_2__register__["b" /* validateRegister */])
        .concat(__WEBPACK_IMPORTED_MODULE_2__register__["a" /* Register */]),
    __WEBPACK_IMPORTED_MODULE_0_webpart__["a" /* Webpart */].path('/api/users/login')
        .concat(__WEBPACK_IMPORTED_MODULE_0_webpart__["a" /* Webpart */].POST)
        .concat(__WEBPACK_IMPORTED_MODULE_3__login__["b" /* validateLogin */])
        .concat(__WEBPACK_IMPORTED_MODULE_3__login__["a" /* Login */]),
    __WEBPACK_IMPORTED_MODULE_0_webpart__["a" /* Webpart */].path('/api/users/current')
        .concat(__WEBPACK_IMPORTED_MODULE_0_webpart__["a" /* Webpart */].GET)
        .concat(__WEBPACK_IMPORTED_MODULE_1_auth_passport__["a" /* AuthPart */])
        .concat(__WEBPACK_IMPORTED_MODULE_4__current__["a" /* CurrentUser */]),
]);
/* harmony export (immutable) */ __webpack_exports__["a"] = UsersApi;



/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_api_users__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_fluture__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_fluture___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_fluture__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_monet__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_monet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_monet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_webpart__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_validation__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__validators__ = __webpack_require__(11);






const validateRegister = __WEBPACK_IMPORTED_MODULE_3_webpart__["a" /* Webpart */].validate(__WEBPACK_IMPORTED_MODULE_4_validation__["a" /* Validation */].empty()
    .concat(__WEBPACK_IMPORTED_MODULE_5__validators__["c" /* passwordLengthValidator */])
    .concat(__WEBPACK_IMPORTED_MODULE_5__validators__["a" /* emailRegexValidator */])
    .concat(__WEBPACK_IMPORTED_MODULE_5__validators__["b" /* nameRegexValidator */]));
/* harmony export (immutable) */ __webpack_exports__["b"] = validateRegister;

const Register = __WEBPACK_IMPORTED_MODULE_3_webpart__["a" /* Webpart */].exec(({ req, res }) => __WEBPACK_IMPORTED_MODULE_0_api_users__["b" /* findByEmail */](req.body.email)
    .chain((user) => user
    ? __WEBPACK_IMPORTED_MODULE_1_fluture__["resolve"](__WEBPACK_IMPORTED_MODULE_2_monet__["Maybe"].None())
    : __WEBPACK_IMPORTED_MODULE_0_api_users__["c" /* register */](req.body.email, req.body.name, req.body.password)
        .map((user) => __WEBPACK_IMPORTED_MODULE_2_monet__["Maybe"].Some(user)))
    .bimap(() => res.status(500).json({ message: 'internal server error' }), (registration) => registration.isSome()
    ? res.status(200).json(registration.some())
    : res.status(400).json({ email: 'email already exists' })));
/* harmony export (immutable) */ __webpack_exports__["a"] = Register;



/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fluture__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fluture___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_fluture__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_monet__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_monet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_monet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_api_users__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_crypt__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_auth__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_webpart__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_validation__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__validators__ = __webpack_require__(11);








const validateLogin = __WEBPACK_IMPORTED_MODULE_5_webpart__["a" /* Webpart */].validate(__WEBPACK_IMPORTED_MODULE_6_validation__["a" /* Validation */].empty()
    .concat(__WEBPACK_IMPORTED_MODULE_7__validators__["a" /* emailRegexValidator */])
    .concat(__WEBPACK_IMPORTED_MODULE_7__validators__["c" /* passwordLengthValidator */]));
/* harmony export (immutable) */ __webpack_exports__["b"] = validateLogin;

const loginUserWithPassword = (password) => (user) => !user
    ? __WEBPACK_IMPORTED_MODULE_0_fluture__["resolve"](__WEBPACK_IMPORTED_MODULE_1_monet__["Either"].Left({ email: 'email not found' }))
    : __WEBPACK_IMPORTED_MODULE_3_crypt__["a" /* compare */](password, user.password)
        .chain((matches) => !matches
        ? __WEBPACK_IMPORTED_MODULE_0_fluture__["resolve"](__WEBPACK_IMPORTED_MODULE_1_monet__["Either"].Left({ password: 'incorrect password' }))
        : __WEBPACK_IMPORTED_MODULE_4_auth__["a" /* createToken */](user._id).bimap(() => __WEBPACK_IMPORTED_MODULE_1_monet__["Either"].Left({ message: 'failed to create token' }), (token) => __WEBPACK_IMPORTED_MODULE_1_monet__["Either"].Right({ token })));
const Login = __WEBPACK_IMPORTED_MODULE_5_webpart__["a" /* Webpart */].exec(({ req, res }) => __WEBPACK_IMPORTED_MODULE_2_api_users__["b" /* findByEmail */](req.body.email)
    .chain(loginUserWithPassword(req.body.password))
    .bimap(() => res.status(500).json({ message: 'internal server error' }), (login) => login.isRight()
    ? res.status(200).json(login.right())
    : res.status(400).json(login.left())));
/* harmony export (immutable) */ __webpack_exports__["a"] = Login;



/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jsonwebtoken__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jsonwebtoken___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jsonwebtoken__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_fluture__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_fluture___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_fluture__);


const settings = __webpack_require__(8);
const createToken = (id) => __WEBPACK_IMPORTED_MODULE_1_fluture__["Future"]((reject, resolve) => __WEBPACK_IMPORTED_MODULE_0_jsonwebtoken__["sign"]({ id }, settings.apiSecret, { expiresIn: 3600 }, (err, token) => err
    ? reject(err)
    : resolve(`Bearer ${token}`)));
/* harmony export (immutable) */ __webpack_exports__["a"] = createToken;



/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webpart__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_auth_passport__ = __webpack_require__(3);


const CurrentUser = __WEBPACK_IMPORTED_MODULE_0_webpart__["a" /* Webpart */].exec(({ req, res, next }) => Object(__WEBPACK_IMPORTED_MODULE_1_auth_passport__["b" /* authenticateRequest */])({ req, res, next })
    .bimap(() => res.status(500).json({ message: 'internal server error' }), (user) => user
    ? res.json(user)
    : res.status(400).json({ message: 'user not found' })));
/* harmony export (immutable) */ __webpack_exports__["a"] = CurrentUser;



/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fluture__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fluture___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_fluture__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_api_profiles__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_webpart__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_auth_passport__ = __webpack_require__(3);




const LoggedInUserProfile = __WEBPACK_IMPORTED_MODULE_2_webpart__["a" /* Webpart */].exec(({ req, res }) => __WEBPACK_IMPORTED_MODULE_0_fluture__["Future"]((reject, resolve) => __WEBPACK_IMPORTED_MODULE_1_api_profiles__["a" /* findByOwner */](req.user.id)
    .bimap(() => reject(res.status(500).write('error finding profile')), (profile) => profile
    ? resolve(profile)
    : reject(res.status(404)))));
const ProfilesApi = __WEBPACK_IMPORTED_MODULE_2_webpart__["a" /* Webpart */].path('api/profile/current')
    .concat(__WEBPACK_IMPORTED_MODULE_2_webpart__["a" /* Webpart */].GET)
    .concat(__WEBPACK_IMPORTED_MODULE_3_auth_passport__["a" /* AuthPart */])
    .concat(LoggedInUserProfile);
/* harmony export (immutable) */ __webpack_exports__["a"] = ProfilesApi;



/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model__ = __webpack_require__(12);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__queries__ = __webpack_require__(31);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__queries__["a"]; });




/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_fluture__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_fluture___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_fluture__);


const findByOwner = (owner) => __WEBPACK_IMPORTED_MODULE_1_fluture__["Future"]((reject, resolve) => {
    __WEBPACK_IMPORTED_MODULE_0__model__["a" /* Profile */].findOne({ owner }, (err, profile) => err
        ? reject(err)
        : resolve(profile));
});
/* harmony export (immutable) */ __webpack_exports__["a"] = findByOwner;



/***/ })
/******/ ]);