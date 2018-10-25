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
var _this = this;
import { setupMockData, User, Profile, Post, Tariff, Category } from "../support/mock-data";
import Context from "../../src/common/context";
import { recordGraphQLRequest } from "../support/helpers";
var store;
var vuexOrmGraphQL;
describe("VuexORMGraphQL", function () {
    beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, setupMockData()];
                case 1:
                    _a = _b.sent(), store = _a[0], vuexOrmGraphQL = _a[1];
                    return [2 /*return*/];
            }
        });
    }); });
    test("fetches the schema on the first action", function () { return __awaiter(_this, void 0, void 0, function () {
        var result, request, context;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, recordGraphQLRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, Post.fetch(2)];
                                case 1:
                                    // @ts-ignore
                                    result = _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
                case 1:
                    request = _a.sent();
                    expect(request).not.toEqual(null);
                    expect(result).not.toEqual(null);
                    context = Context.getInstance();
                    expect(!!context.schema).not.toEqual(false);
                    expect(context.schema.getType("Post").name).toEqual("Post");
                    expect(context.schema.getQuery("post").name).toEqual("post");
                    expect(context.schema.getMutation("createPost").name).toEqual("createPost");
                    return [2 /*return*/];
            }
        });
    }); });
    describe("fetch", function () {
        test("also requests the otherId field", function () { return __awaiter(_this, void 0, void 0, function () {
            var request, post;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, recordGraphQLRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: 
                                    // @ts-ignore
                                    return [4 /*yield*/, Post.fetch(1)];
                                    case 1:
                                        // @ts-ignore
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1:
                        request = _a.sent();
                        expect(request.query).toEqual("\nquery Post($id: ID!) {\n  post(id: $id) {\n    id\n    content\n    title\n    otherId\n    published\n    author {\n      id\n      name\n      profile {\n        id\n        email\n        age\n        sex\n      }\n    }\n    comments {\n      nodes {\n        id\n        content\n        subjectId\n        subjectType\n        author {\n          id\n          name\n          profile {\n            id\n            email\n            age\n            sex\n          }\n        }\n      }\n    }\n  }\n}\n        ".trim() + "\n");
                        post = Post.query()
                            .withAll()
                            .where("id", 1)
                            .first();
                        expect(post.title).toEqual("GraphQL");
                        expect(post.content).toEqual("GraphQL is so nice!");
                        expect(post.comments.length).toEqual(1);
                        expect(post.comments[0].content).toEqual("Yes!!!!");
                        return [2 /*return*/];
                }
            });
        }); });
        describe("with ID", function () {
            test("doesn't cache when bypassCache = true", function () { return __awaiter(_this, void 0, void 0, function () {
                var request1, request2, request3;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, recordGraphQLRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: 
                                        // @ts-ignore
                                        return [4 /*yield*/, User.fetch(1)];
                                        case 1:
                                            // @ts-ignore
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, true)];
                        case 1:
                            request1 = _a.sent();
                            expect(request1).not.toEqual(null);
                            return [4 /*yield*/, recordGraphQLRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: 
                                            // @ts-ignore
                                            return [4 /*yield*/, User.fetch(1)];
                                            case 1:
                                                // @ts-ignore
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }, true)];
                        case 2:
                            request2 = _a.sent();
                            expect(request2).toEqual(null);
                            return [4 /*yield*/, recordGraphQLRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: 
                                            // @ts-ignore
                                            return [4 /*yield*/, User.fetch(1, true)];
                                            case 1:
                                                // @ts-ignore
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }, true)];
                        case 3:
                            request3 = _a.sent();
                            expect(request3).not.toEqual(null);
                            return [2 /*return*/];
                    }
                });
            }); });
            test("sends the correct query to the API", function () { return __awaiter(_this, void 0, void 0, function () {
                var request;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, recordGraphQLRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: 
                                        // @ts-ignore
                                        return [4 /*yield*/, User.fetch(1)];
                                        case 1:
                                            // @ts-ignore
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                        case 1:
                            request = _a.sent();
                            expect(request.variables).toEqual({ id: 1 });
                            expect(request.query).toEqual("\nquery User($id: ID!) {\n  user(id: $id) {\n    id\n    name\n    profile {\n      id\n      email\n      age\n      sex\n    }\n  }\n}\n        ".trim() + "\n");
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("without ID but with filter with ID", function () {
            test("sends the correct query to the API", function () { return __awaiter(_this, void 0, void 0, function () {
                var request;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, recordGraphQLRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: 
                                        // @ts-ignore
                                        return [4 /*yield*/, User.fetch({ profileId: 2 })];
                                        case 1:
                                            // @ts-ignore
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                        case 1:
                            request = _a.sent();
                            expect(request.variables).toEqual({ profileId: 2 });
                            expect(request.query).toEqual("\nquery Users($profileId: ID!) {\n  users(filter: {profileId: $profileId}) {\n    nodes {\n      id\n      name\n      profile {\n        id\n        email\n        age\n        sex\n      }\n    }\n  }\n}\n          ".trim() + "\n");
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("without ID but with filter with object", function () {
            test("sends the correct query to the API", function () { return __awaiter(_this, void 0, void 0, function () {
                var profile, request;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: 
                        // @ts-ignore
                        return [4 /*yield*/, Profile.fetch(2)];
                        case 1:
                            // @ts-ignore
                            _a.sent();
                            profile = Context.getInstance()
                                .getModel("profile")
                                .getRecordWithId(2);
                            return [4 /*yield*/, recordGraphQLRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: 
                                            // @ts-ignore
                                            return [4 /*yield*/, User.fetch({ profile: profile })];
                                            case 1:
                                                // @ts-ignore
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        case 2:
                            request = _a.sent();
                            expect(request.variables).toEqual({
                                profile: {
                                    id: profile.id,
                                    email: profile.email,
                                    age: profile.age,
                                    sex: profile.sex
                                }
                            });
                            expect(request.query).toEqual("\nquery Users($profile: ProfileInput!) {\n  users(filter: {profile: $profile}) {\n    nodes {\n      id\n      name\n      profile {\n        id\n        email\n        age\n        sex\n      }\n    }\n  }\n}\n          ".trim() + "\n");
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("without ID or filter", function () {
            test("sends the correct query to the API", function () { return __awaiter(_this, void 0, void 0, function () {
                var request;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, recordGraphQLRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: 
                                        // @ts-ignore
                                        return [4 /*yield*/, User.fetch()];
                                        case 1:
                                            // @ts-ignore
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                        case 1:
                            request = _a.sent();
                            expect(request.variables).toEqual({});
                            expect(request.query).toEqual("\nquery Users {\n  users {\n    nodes {\n      id\n      name\n      profile {\n        id\n        email\n        age\n        sex\n      }\n    }\n  }\n}\n          ".trim() + "\n");
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("without ID or filter and no FilterType exists", function () {
            test("sends the correct query to the API", function () { return __awaiter(_this, void 0, void 0, function () {
                var request;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, recordGraphQLRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: 
                                        // @ts-ignore
                                        return [4 /*yield*/, Category.fetch()];
                                        case 1:
                                            // @ts-ignore
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                        case 1:
                            request = _a.sent();
                            expect(request.variables).toEqual({});
                            expect(request.query).toEqual("\nquery Categories {\n  categories {\n    nodes {\n      id\n      name\n      parent {\n        id\n        name\n        parent {\n          id\n          name\n          parent {\n            id\n            name\n            parent {\n              id\n              name\n              parent {\n                id\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n          ".trim() + "\n");
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
    describe("persist", function () {
        test("sends the correct query to the API", function () { return __awaiter(_this, void 0, void 0, function () {
            var insertedData, post, request;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // @ts-ignore
                    return [4 /*yield*/, User.fetch(1)];
                    case 1:
                        // @ts-ignore
                        _a.sent();
                        return [4 /*yield*/, Post.insert({
                                data: {
                                    title: "It works!",
                                    content: "This is a test!",
                                    published: false,
                                    otherId: 15,
                                    author: User.find(1)
                                }
                            })];
                    case 2:
                        insertedData = _a.sent();
                        post = insertedData.posts[0];
                        return [4 /*yield*/, recordGraphQLRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, post.$persist()];
                                        case 1:
                                            post = _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 3:
                        request = _a.sent();
                        expect(post.id).toEqual(4); // was set from the server
                        expect(request.variables).toEqual({
                            post: {
                                content: "This is a test!",
                                id: 1,
                                otherId: 15,
                                published: false,
                                title: "It works!",
                                authorId: 1,
                                author: {
                                    id: 1,
                                    name: "Charlie Brown",
                                    profileId: 1,
                                    profile: {
                                        id: 1,
                                        sex: true,
                                        age: 8,
                                        email: "charlie@peanuts.com"
                                    }
                                }
                            }
                        });
                        expect(request.query).toEqual("\nmutation CreatePost($post: PostInput!) {\n  createPost(post: $post) {\n    id\n    content\n    title\n    otherId\n    published\n    author {\n      id\n      name\n      profile {\n        id\n        email\n        age\n        sex\n      }\n    }\n    comments {\n      nodes {\n        id\n        content\n        subjectId\n        subjectType\n        author {\n          id\n          name\n          profile {\n            id\n            email\n            age\n            sex\n          }\n        }\n      }\n    }\n  }\n}\n      ".trim() + "\n");
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("push", function () {
        test("sends the correct query to the API", function () { return __awaiter(_this, void 0, void 0, function () {
            var user, request;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // @ts-ignore
                    return [4 /*yield*/, User.fetch(1)];
                    case 1:
                        // @ts-ignore
                        _a.sent();
                        user = User.find(1);
                        user.name = "Snoopy";
                        return [4 /*yield*/, recordGraphQLRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, user.$push()];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2:
                        request = _a.sent();
                        expect(request.variables).toEqual({ id: 1, user: { id: 1, name: "Snoopy", profileId: 1 } });
                        expect(request.query).toEqual("\nmutation UpdateUser($id: ID!, $user: UserInput!) {\n  updateUser(id: $id, user: $user) {\n    id\n    name\n    profile {\n      id\n      email\n      age\n      sex\n    }\n  }\n}\n      ".trim() + "\n");
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("destroy", function () {
        test("sends the correct query to the API", function () { return __awaiter(_this, void 0, void 0, function () {
            var post, request;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // @ts-ignore
                    return [4 /*yield*/, Post.fetch(1)];
                    case 1:
                        // @ts-ignore
                        _a.sent();
                        post = Post.find(1);
                        return [4 /*yield*/, recordGraphQLRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, post.$destroy()];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2:
                        request = _a.sent();
                        expect(request.variables).toEqual({ id: 1 });
                        expect(request.query).toEqual("\nmutation DeletePost($id: ID!) {\n  deletePost(id: $id) {\n    id\n    content\n    title\n    otherId\n    published\n    author {\n      id\n      name\n      profile {\n        id\n        email\n        age\n        sex\n      }\n    }\n    comments {\n      nodes {\n        id\n        content\n        subjectId\n        subjectType\n        author {\n          id\n          name\n          profile {\n            id\n            email\n            age\n            sex\n          }\n        }\n      }\n    }\n  }\n}\n      ".trim() + "\n");
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("custom query", function () {
        test("via Model method sends the correct query to the API", function () { return __awaiter(_this, void 0, void 0, function () {
            var request;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, recordGraphQLRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: 
                                    // @ts-ignore
                                    return [4 /*yield*/, Post.customQuery({ name: "unpublishedPosts", filter: { authorId: 3 } })];
                                    case 1:
                                        // @ts-ignore
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1:
                        request = _a.sent();
                        expect(request.variables.authorId).toEqual(3);
                        expect(request.query).toEqual("\nquery UnpublishedPosts($authorId: ID!) {\n  unpublishedPosts(authorId: $authorId) {\n    nodes {\n      id\n      content\n      title\n      otherId\n      published\n      author {\n        id\n        name\n        profile {\n          id\n          email\n          age\n          sex\n        }\n      }\n      comments {\n        nodes {\n          id\n          content\n          subjectId\n          subjectType\n          author {\n            id\n            name\n            profile {\n              id\n              email\n              age\n              sex\n            }\n          }\n        }\n      }\n    }\n  }\n}\n      ".trim() + "\n");
                        return [2 /*return*/];
                }
            });
        }); });
        test("via record method sends the correct query to the API", function () { return __awaiter(_this, void 0, void 0, function () {
            var post, request;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // @ts-ignore
                    return [4 /*yield*/, Post.fetch(1)];
                    case 1:
                        // @ts-ignore
                        _a.sent();
                        post = Post.find(1);
                        return [4 /*yield*/, recordGraphQLRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, post.$customQuery({ name: "unpublishedPosts", filter: { authorId: 2 } })];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2:
                        request = _a.sent();
                        expect(request.variables.authorId).toEqual(2);
                        expect(request.variables.id).toEqual(1);
                        expect(request.query).toEqual("\nquery UnpublishedPosts($authorId: ID!, $id: ID!) {\n  unpublishedPosts(authorId: $authorId, id: $id) {\n    nodes {\n      id\n      content\n      title\n      otherId\n      published\n      author {\n        id\n        name\n        profile {\n          id\n          email\n          age\n          sex\n        }\n      }\n      comments {\n        nodes {\n          id\n          content\n          subjectId\n          subjectType\n          author {\n            id\n            name\n            profile {\n              id\n              email\n              age\n              sex\n            }\n          }\n        }\n      }\n    }\n  }\n}\n      ".trim() + "\n");
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("custom mutation", function () {
        test("sends the correct query to the API", function () { return __awaiter(_this, void 0, void 0, function () {
            var post, request;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // @ts-ignore
                    return [4 /*yield*/, Post.fetch(1)];
                    case 1:
                        // @ts-ignore
                        _a.sent();
                        post = Post.find(1);
                        return [4 /*yield*/, recordGraphQLRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: 
                                        // @ts-ignore
                                        return [4 /*yield*/, Post.mutate({ name: "upvotePost", args: { captchaToken: "15", postId: post.id } })];
                                        case 1:
                                            // @ts-ignore
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2:
                        request = _a.sent();
                        expect(request.variables.captchaToken).toEqual("15");
                        expect(request.variables.postId).toEqual(post.id);
                        expect(request.query).toEqual("\nmutation UpvotePost($captchaToken: String!, $postId: ID!) {\n  upvotePost(captchaToken: $captchaToken, postId: $postId) {\n    id\n    content\n    title\n    otherId\n    published\n    author {\n      id\n      name\n      profile {\n        id\n        email\n        age\n        sex\n      }\n    }\n    comments {\n      nodes {\n        id\n        content\n        subjectId\n        subjectType\n        author {\n          id\n          name\n          profile {\n            id\n            email\n            age\n            sex\n          }\n        }\n      }\n    }\n  }\n}\n      ".trim() + "\n");
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("simple mutation", function () {
        test("sends my query to the api", function () { return __awaiter(_this, void 0, void 0, function () {
            var result, query, request;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "\nmutation SendSms($to: String!, $text: String!) {\n  sendSms(to: $to, text: $text) {\n    delivered\n  }\n}";
                        return [4 /*yield*/, recordGraphQLRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, store.dispatch("entities/simpleMutation", {
                                                query: query,
                                                variables: { to: "+4912345678", text: "GraphQL is awesome!" }
                                            })];
                                        case 1:
                                            result = _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        request = _a.sent();
                        expect(request.variables).toEqual({ to: "+4912345678", text: "GraphQL is awesome!" });
                        expect(result).toEqual({
                            sendSms: {
                                __typename: "SmsStatus",
                                delivered: true
                            }
                        });
                        expect(request.query).toEqual("\nmutation SendSms($to: String!, $text: String!) {\n  sendSms(to: $to, text: $text) {\n    delivered\n  }\n}\n      ".trim() + "\n");
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("simple query", function () {
        test("sends my query to the api", function () { return __awaiter(_this, void 0, void 0, function () {
            var result, query, request;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "\nquery Status {\n  status {\n    backend\n    smsGateway\n    paypalIntegration\n  }\n}";
                        return [4 /*yield*/, recordGraphQLRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, store.dispatch("entities/simpleQuery", { query: query, variables: {} })];
                                        case 1:
                                            result = _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        request = _a.sent();
                        expect(result).toEqual({
                            status: {
                                __typename: "Status",
                                backend: true,
                                paypalIntegration: true,
                                smsGateway: false
                            }
                        });
                        expect(request.query).toEqual("\nquery Status {\n  status {\n    backend\n    smsGateway\n    paypalIntegration\n  }\n}\n      ".trim() + "\n");
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("$isPersisted", function () {
        test("is false for newly created records", function () { return __awaiter(_this, void 0, void 0, function () {
            var insertedData, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User.insert({ data: { name: "Snoopy" } })];
                    case 1:
                        insertedData = _a.sent();
                        user = insertedData.users[0];
                        expect(user.$isPersisted).toBeFalsy();
                        user = User.find(user.id);
                        expect(user.$isPersisted).toBeFalsy();
                        return [2 /*return*/];
                }
            });
        }); });
        test("is true for persisted records", function () { return __awaiter(_this, void 0, void 0, function () {
            var insertedData, user, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User.insert({ data: { name: "Snoopy" } })];
                    case 1:
                        insertedData = _a.sent();
                        user = insertedData.users[0];
                        expect(user.$isPersisted).toBeFalsy();
                        return [4 /*yield*/, user.$persist()];
                    case 2:
                        result = _a.sent();
                        user = User.find(4);
                        expect(user.$isPersisted).toBeTruthy();
                        return [2 /*return*/];
                }
            });
        }); });
        test("is true for fetched records", function () { return __awaiter(_this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // @ts-ignore
                    return [4 /*yield*/, User.fetch(1)];
                    case 1:
                        // @ts-ignore
                        _a.sent();
                        user = User.find(1);
                        expect(user.$isPersisted).toBeTruthy();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("Relations", function () {
        describe("One To One", function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                test("works", function () { return __awaiter(_this, void 0, void 0, function () {
                    var user;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: 
                            // @ts-ignore
                            return [4 /*yield*/, User.fetch(1, true)];
                            case 1:
                                // @ts-ignore
                                _a.sent();
                                user = User.query()
                                    .withAllRecursive()
                                    .find(1);
                                expect(user.name).toEqual("Charlie Brown");
                                expect(user.profile).not.toEqual(null);
                                expect(user.profile.sex).toEqual(true);
                                expect(user.profile.email).toEqual("charlie@peanuts.com");
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        }); });
        describe("One To Many", function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                test("works", function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/];
            });
        }); });
        describe("Has Many Through", function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                test("works", function () { return __awaiter(_this, void 0, void 0, function () {
                    var tariff;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: 
                            // @ts-ignore
                            return [4 /*yield*/, Tariff.fetch()];
                            case 1:
                                // @ts-ignore
                                _a.sent();
                                tariff = Tariff.query()
                                    .withAllRecursive()
                                    .find(1);
                                expect(tariff.name).toEqual("Super DSL S");
                                expect(tariff.tariffOptions).not.toEqual(null);
                                expect(tariff.tariffOptions.length).not.toEqual(0);
                                expect(tariff.tariffOptions[0].name).toEqual("Installation");
                                expect(tariff.tariffOptions[0].tariffs).not.toEqual(null);
                                expect(tariff.tariffOptions[0].tariffs[0].name).toEqual("Super DSL S");
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        }); });
        describe("Polymorphic One To One", function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                test("works", function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/];
            });
        }); });
        describe("Polymorphic One To Many", function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                test("works", function () { return __awaiter(_this, void 0, void 0, function () {
                    var result, post;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, Post.fetch(1, true)];
                            case 1:
                                result = _a.sent();
                                post = Post.query()
                                    .withAllRecursive()
                                    .find(1);
                                expect(post.author).not.toEqual(null);
                                expect(post.comments).not.toEqual(null);
                                expect(post.comments.length).not.toEqual(0);
                                expect(post.author.name).toEqual("Charlie Brown");
                                expect(post.comments[0].content).toEqual("Yes!!!!");
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        }); });
        describe("Polymorphic Many To Many", function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                test("works", function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/];
            });
        }); });
    });
});
//# sourceMappingURL=plugin.spec.js.map