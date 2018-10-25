var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
import { Model as ORMModel } from "@vuex-orm/core";
import { createStore } from "./helpers";
import { setupTestUtils } from "../../src/test-utils";
import VuexORMGraphQLPlugin from "../../src";
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    User.fields = function () {
        return {
            id: this.increment(),
            name: this.string(""),
            profileId: this.number(0),
            posts: this.hasMany(Post, "authorId"),
            comments: this.hasMany(Comment, "authorId"),
            profile: this.belongsTo(Profile, "profileId")
        };
    };
    User.entity = "users";
    return User;
}(ORMModel));
export { User };
var Profile = /** @class */ (function (_super) {
    __extends(Profile, _super);
    function Profile() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Profile.fields = function () {
        return {
            id: this.increment(),
            email: this.string(""),
            age: this.number(0),
            sex: this.boolean(true),
            user: this.hasOne(User, "profileId")
        };
    };
    Profile.entity = "profiles";
    return Profile;
}(ORMModel));
export { Profile };
var Video = /** @class */ (function (_super) {
    __extends(Video, _super);
    function Video() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Video.fields = function () {
        return {
            id: this.increment(),
            content: this.string(""),
            title: this.string(""),
            authorId: this.number(0),
            otherId: this.number(0),
            ignoreMe: this.string(""),
            author: this.belongsTo(User, "authorId"),
            comments: this.morphMany(Comment, "subjectId", "subjectType")
        };
    };
    Video.entity = "videos";
    Video.eagerLoad = ["comments"];
    return Video;
}(ORMModel));
export { Video };
var Post = /** @class */ (function (_super) {
    __extends(Post, _super);
    function Post() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Post.fields = function () {
        return {
            id: this.increment(),
            content: this.string(""),
            title: this.string(""),
            authorId: this.number(0),
            otherId: this.number(0),
            published: this.boolean(true),
            author: this.belongsTo(User, "authorId"),
            comments: this.morphMany(Comment, "subjectId", "subjectType")
        };
    };
    Post.entity = "posts";
    Post.eagerLoad = ["comments"];
    return Post;
}(ORMModel));
export { Post };
var Comment = /** @class */ (function (_super) {
    __extends(Comment, _super);
    function Comment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Comment.fields = function () {
        return {
            id: this.increment(),
            content: this.string(""),
            authorId: this.number(0),
            author: this.belongsTo(User, "authorId"),
            subjectId: this.number(0),
            subjectType: this.string("")
        };
    };
    Comment.entity = "comments";
    return Comment;
}(ORMModel));
export { Comment };
var TariffTariffOption = /** @class */ (function (_super) {
    __extends(TariffTariffOption, _super);
    function TariffTariffOption() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TariffTariffOption.fields = function () {
        return {
            tariffId: this.number(0),
            tariffOptionId: this.number(0)
        };
    };
    TariffTariffOption.entity = "tariffTariffOptions";
    TariffTariffOption.primaryKey = ["tariffId", "tariffOptionId"];
    return TariffTariffOption;
}(ORMModel));
export { TariffTariffOption };
var Tariff = /** @class */ (function (_super) {
    __extends(Tariff, _super);
    function Tariff() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tariff.fields = function () {
        return {
            id: this.increment(),
            name: this.string(""),
            displayName: this.string(""),
            tariffType: this.string(""),
            slug: this.string(""),
            tariffOptions: this.belongsToMany(TariffOption, TariffTariffOption, "tariffId", "tariffOptionId")
        };
    };
    Tariff.entity = "tariffs";
    Tariff.eagerLoad = ["tariffOptions"];
    return Tariff;
}(ORMModel));
export { Tariff };
var TariffOption = /** @class */ (function (_super) {
    __extends(TariffOption, _super);
    function TariffOption() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TariffOption.fields = function () {
        return {
            id: this.increment(),
            name: this.string(""),
            description: this.string(""),
            tariffs: this.belongsToMany(Tariff, TariffTariffOption, "tariffOptionId", "tariffId")
        };
    };
    TariffOption.entity = "tariffOptions";
    TariffOption.eagerLoad = ["tariffs"];
    return TariffOption;
}(ORMModel));
export { TariffOption };
var Category = /** @class */ (function (_super) {
    __extends(Category, _super);
    function Category() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Category.fields = function () {
        return {
            id: this.increment(),
            name: this.string(""),
            parentId: this.number(0),
            parent: this.belongsTo(Category, "parentId")
        };
    };
    Category.entity = "categories";
    return Category;
}(ORMModel));
export { Category };
export function setupMockData() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, store, vuexOrmGraphQL;
        return __generator(this, function (_b) {
            _a = createStore([
                { model: User },
                { model: Profile },
                { model: Post },
                { model: Video },
                { model: Comment },
                { model: TariffOption },
                { model: Tariff },
                { model: TariffTariffOption },
                { model: Category }
            ]), store = _a[0], vuexOrmGraphQL = _a[1];
            setupTestUtils(VuexORMGraphQLPlugin);
            return [2 /*return*/, [store, vuexOrmGraphQL]];
        });
    });
}
//# sourceMappingURL=mock-data.js.map