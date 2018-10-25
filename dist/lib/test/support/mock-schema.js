import { Category, User, Profile, Video, Post, Comment, Tariff, TariffOption } from "./mock-data";
import inflection from "inflection";
import { clone, matches } from "../../src/support/utils";
export var typeDefs = "\n  type Query {\n    user(id: ID!): User!\n    users(filter: UserFilter): UserTypeConnection!\n    profile(id: ID!): Profile!\n    profiles(filter: ProfileFilter): ProfileTypeConnection!\n    post(id: ID!): Post!\n    posts(filter: PostFilter): PostTypeConnection!\n    video(id: ID!): Video!\n    videos(filter: VideoFilter): VideoTypeConnection!\n    comment(id: ID!): Comment!\n    comments(filter: CommentFilter): CommentTypeConnection!\n    tariffOption(id: ID!): TariffOption!\n    tariffOptions(filter: TariffOptionFilter): TariffOptionTypeConnection!\n    tariff(id: ID!): Tariff!\n    tariffs(filter: TariffFilter): TariffTypeConnection!\n    tariffTariffOption(id: ID!): TariffTariffOption!\n    tariffTariffOptions(filter: TariffTariffOptionFilter): TariffTariffOptionTypeConnection!\n    category(id: ID!): Category!\n    categories: CategoryTypeConnection!\n    \n    unpublishedPosts(authorId: ID!): PostTypeConnection\n    status: Status\n  }\n\n  type Mutation {\n    deleteUser(id: ID!): User!\n    deleteProfile(id: ID!): Profile!\n    deletePost(id: ID!): Post!\n    deleteVideo(id: ID!): Video!\n    deleteComment(id: ID!): Comment!\n    deleteTariffOption(id: ID!): TariffOption!\n    deleteTariff(id: ID!): Tariff!\n    \n    createUser(user: UserInput!): User!\n    createProfile(profile: ProfileInput!): Profile!\n    createPost(post: PostInput!): Post!\n    createVideo(video: VideoInput!): Video!\n    createComment(comment: CommentInput!): Comment!\n    createTariffOption(tariffOption: TariffOptionInput!): TariffOption!\n    createTariff(tariff: TariffInput!): Tariff!\n    \n    updateUser(id: ID!, user: UserInput!): User!\n    updateProfile(id: ID!, profile: ProfileInput!): Profile!\n    updatePost(id: ID!, post: PostInput!): Post!\n    updateVideo(id: ID!, video: VideoInput!): Video!\n    updateComment(id: ID!, comment: CommentInput!): Comment!\n    updateTariffOption(id: ID!, tariffOption: TariffOptionInput!): TariffOption!\n    updateTariff(id: ID!, tariff: TariffInput!): Tariff!\n    \n    upvotePost(captchaToken: String!, postId: ID!): Post!\n    sendSms(to: String!, text: String!): SmsStatus!\n    reorderItems(id: ID!, itemIds: [ID]!): PostTypeConnection\n  }\n\n  type Status {\n    backend: Boolean\n    smsGateway: Boolean\n    paypalIntegration: Boolean\n  }\n\n  type SmsStatus {\n    delivered: Boolean!\n  }\n\n  type User {\n    id: ID\n    name: String\n    profileId: ID\n    posts: PostTypeConnection\n    comments: CommentTypeConnection\n    profile: Profile\n  }\n\n\n  input UserFilter {\n    id: ID\n    name: String\n    profileId: ID\n    profile: ProfileInput\n  }\n\n\n   input UserInput {\n    id: ID\n    name: String\n    profileId: ID\n    profile: ProfileInput\n  }\n\n\n  type UserTypeConnection {\n    nodes: [User!]!\n  }\n\n\n  type Profile {\n    id: ID\n    email: String\n    age: Int\n    sex: Boolean\n    user: User\n  }\n\n\n  input ProfileFilter {\n    id: ID\n    email: String\n    age: Int\n    sex: Boolean\n    user: UserInput\n  }\n\n\n   input ProfileInput {\n    id: ID\n    email: String\n    age: Int\n    sex: Boolean\n    user: UserInput\n  }\n\n\n  type ProfileTypeConnection {\n    nodes: [Profile!]!\n  }\n\n\n  type Post {\n    id: ID\n    content: String\n    title: String\n    authorId: ID\n    otherId: ID\n    published: Boolean\n    author: User\n    comments: CommentTypeConnection\n  }\n\n\n  input PostFilter {\n    id: ID\n    content: String\n    title: String\n    authorId: ID\n    otherId: ID\n    published: Boolean\n    author: UserInput\n  }\n\n\n  input PostInput {\n    id: ID\n    content: String\n    title: String\n    authorId: ID\n    otherId: ID\n    published: Boolean\n    author: UserInput\n  }\n\n\n  type PostTypeConnection {\n    nodes: [Post!]!\n  }\n\n\n  type Video {\n    id: ID\n    content: String\n    title: String\n    authorId: ID\n    otherId: ID\n    author: User\n    comments: CommentTypeConnection\n  }\n\n\n  input VideoFilter {\n    id: ID\n    content: String\n    title: String\n    authorId: ID\n    otherId: ID\n    author: UserInput\n  }\n\n\n   input VideoInput {\n    id: ID\n    content: String\n    title: String\n    authorId: ID\n    otherId: ID\n    author: UserInput\n  }\n\n\n  type VideoTypeConnection {\n    nodes: [Video!]!\n  }\n\n\n  type Comment {\n    id: ID\n    content: String\n    authorId: ID\n    author: User\n    subjectId: ID\n    subjectType: String\n  }\n\n\n  input CommentFilter {\n    id: ID\n    content: String\n    authorId: ID\n    author: UserInput\n    subjectId: ID\n    subjectType: String\n  }\n\n\n   input CommentInput {\n    id: ID\n    content: String\n    authorId: ID\n    author: UserInput\n    subjectId: ID\n    subjectType: String\n  }\n\n\n  type CommentTypeConnection {\n    nodes: [Comment!]!\n  }\n\n\n  type TariffOption {\n    id: ID\n    name: String\n    description: String\n    tariffs: TariffTypeConnection\n  }\n\n\n  input TariffOptionFilter {\n    id: ID\n    name: String\n    description: String\n  }\n\n\n   input TariffOptionInput {\n    id: ID\n    name: String\n    description: String\n  }\n\n\n  type TariffOptionTypeConnection {\n    nodes: [TariffOption!]!\n  }\n\n\n  type Tariff {\n    id: ID\n    name: String!\n    displayName: String\n    tariffType: String\n    slug: String\n    tariffOptions: TariffOptionTypeConnection\n  }\n\n\n  input TariffFilter {\n    id: ID\n    name: String\n    displayName: String\n    tariffType: String\n    slug: String\n  }\n\n\n   input TariffInput {\n    id: ID\n    name: String\n    displayName: String\n    tariffType: String\n    slug: String\n  }\n\n\n  type TariffTypeConnection {\n    nodes: [Tariff!]!\n  }\n\n\n  type TariffTariffOption {\n    tariffId: ID\n    tariffOptionId: ID\n  }\n\n\n  input TariffTariffOptionFilter {\n    tariffId: ID\n    tariffOptionId: ID\n  }\n\n\n   input TariffTariffOptionInput {\n    tariffId: ID\n    tariffOptionId: ID\n  }\n\n\n  type TariffTariffOptionTypeConnection {\n    nodes: [TariffTariffOption!]!\n  }\n\n  type Category {\n    id: ID\n    name: String\n    parentId: ID\n    parent: Category\n  }\n\n\n  input CategoryFilter {\n    id: ID\n    name: String\n    parentId: ID\n    parent: CategoryInput\n  }\n\n\n   input CategoryInput {\n    id: ID\n    name: String\n    parentId: ID\n    parent: CategoryInput\n  }\n\n\n  type CategoryTypeConnection {\n    nodes: [Category!]!\n  }\n";
var users = [
    {
        id: 1,
        name: "Charlie Brown",
        profileId: 1
    },
    {
        id: 2,
        name: "Peppermint Patty",
        profileId: 2
    },
    {
        id: 3,
        name: "Snoopy",
        profileId: 3
    }
];
var profiles = [
    {
        id: 1,
        email: "charlie@peanuts.com",
        age: 8,
        sex: true
    },
    {
        id: 2,
        email: "peppermint@peanuts.com",
        age: 9,
        sex: false
    },
    {
        id: 3,
        email: "snoopy@peanuts.com",
        age: 5,
        sex: true
    }
];
var videos = [
    {
        id: 1,
        content: "Foo",
        title: "Example Video 1",
        otherId: 42,
        authorId: 1
    },
    {
        id: 2,
        content: "Bar",
        title: "Example Video 2",
        otherId: 67,
        authorId: 2
    },
    {
        id: 3,
        content: "FooBar",
        title: "Example Video 3",
        otherId: 491,
        authorId: 2
    }
];
var posts = [
    {
        id: 1,
        content: "GraphQL is so nice!",
        title: "GraphQL",
        otherId: 123,
        published: true,
        authorId: 1
    },
    {
        id: 2,
        content: "Vue is so awesome!",
        title: "Vue.js",
        otherId: 435,
        published: true,
        authorId: 3
    },
    {
        id: 3,
        content: "Vuex-ORM is so crisp",
        title: "Vuex-ORM",
        otherId: 987,
        published: false,
        authorId: 3
    }
];
var comments = [
    {
        id: 1,
        content: "Yes!!!!",
        authorId: 2,
        subjectId: 1,
        subjectType: "post"
    },
    {
        id: 2,
        content: "So crazy :O",
        authorId: 1,
        subjectId: 2,
        subjectType: "video"
    },
    {
        id: 3,
        content: "Hell no!",
        authorId: 3,
        subjectId: 3,
        subjectType: "post"
    }
];
var tariffs = [
    {
        id: 1,
        name: "Super DSL S",
        displayName: "super-dsl-s",
        tariffType: "dsl",
        slug: "1as8d8w6iu"
    },
    {
        id: 2,
        name: "Super DSL M",
        displayName: "super-dsl-m",
        tariffType: "dsl",
        slug: "asd8e2c89"
    },
    {
        id: 3,
        name: "Super DSL L",
        displayName: "super-dsl-l",
        tariffType: "dsl",
        slug: "8aas6e8a4w"
    }
];
var tariffOptions = [
    {
        id: 1,
        name: "Installation",
        description: "Someone will come up your house and setup the router and so on."
    },
    {
        id: 2,
        name: "Spotify Music",
        description: "Spotify Premium"
    },
    {
        id: 3,
        name: "HomeMatic IP Access Point",
        description: "Smarthome stuff."
    }
];
var categories = [
    {
        id: 1,
        name: "Programming",
        parentId: 0
    },
    {
        id: 2,
        name: "Frameworks",
        parentId: 1
    },
    {
        id: 3,
        name: "Languages",
        parentId: 1
    },
    {
        id: 4,
        name: "Patterns",
        parentId: 1
    },
    {
        id: 5,
        name: "Ruby",
        parentId: 3
    },
    {
        id: 6,
        name: "JavaScript",
        parentId: 3
    },
    {
        id: 7,
        name: "PHP",
        parentId: 3
    },
    {
        id: 8,
        name: "RSpec",
        parentId: 5
    }
];
function addRelations(model, record, path) {
    if (path === void 0) { path = []; }
    if (!record)
        return record;
    switch (model) {
        case User:
            if (!ignoreRelation(Profile, path)) {
                record.profile = findOne(Profile, profiles, record.profileId, path);
            }
            if (!ignoreRelation(Comment, path)) {
                record.comments = findMany(Comment, comments, function (r) { return parseInt(r.authorId, 10) === parseInt(record.id, 10); }, path);
            }
            if (!ignoreRelation(Post, path)) {
                record.posts = findMany(Post, posts, function (r) { return parseInt(r.authorId, 10) === parseInt(record.id, 10); }, path);
            }
            break;
        case Profile:
            if (!ignoreRelation(User, path)) {
                record.user = findOne(User, users, function (r) { return parseInt(r.profileId, 10) === parseInt(record.id, 10); }, path);
            }
            break;
        case Video:
            if (!ignoreRelation(User, path))
                record.author = findOne(User, users, record.authorId, path);
            if (!ignoreRelation(Comment, path)) {
                record.comments = findMany(Comment, comments, function (r) { return parseInt(r.subjectId, 10) === parseInt(record.id, 10) && r.subjectType === "video"; }, path);
            }
            break;
        case Post:
            if (!ignoreRelation(User, path))
                record.author = findOne(User, users, record.authorId);
            if (!ignoreRelation(Comment, path)) {
                record.comments = findMany(Comment, comments, function (r) { return parseInt(r.subjectId, 10) === parseInt(record.id, 10) && r.subjectType === "post"; }, path);
            }
            break;
        case Comment:
            if (!ignoreRelation(User, path))
                record.author = findOne(User, users, record.authorId, path);
            break;
        case Tariff:
            if (!ignoreRelation(TariffOption, path)) {
                record.tariffOptions = findMany(TariffOption, tariffOptions, function () { return true; }, path);
            }
            break;
        case TariffOption:
            if (!ignoreRelation(Tariff, path)) {
                record.tariffs = findMany(Tariff, tariffs, function () { return true; }, path);
            }
            break;
        case Category:
            if (record.parentId)
                record.parent = findOne(Category, categories, record.parentId);
            break;
    }
    return record;
}
function ignoreRelation(model, path) {
    return path.includes(inflection.singularize(model.entity));
}
function findMany(model, collection, filterFn, path) {
    if (path === void 0) { path = []; }
    if (!filterFn) {
        filterFn = function () { return true; };
    }
    if (typeof filterFn !== "function") {
        filterFn = matches(filterFn);
    }
    var records = collection.filter(filterFn);
    if (records.length === 0)
        return { nodes: [] };
    return {
        nodes: records.map(function (r) {
            var newPath = path.slice(0); // clone
            newPath.push(inflection.singularize(model.entity));
            return addRelations(model, r, newPath);
        })
    };
}
function findOne(model, collection, idOrFn, path) {
    if (path === void 0) { path = []; }
    var filterFn;
    if (typeof idOrFn === "function") {
        filterFn = idOrFn;
    }
    else {
        filterFn = function (r) {
            return parseInt(r.id, 10) === parseInt(idOrFn, 10);
        };
    }
    var record = collection.find(filterFn);
    var newPath = path.slice(0); // clone
    newPath.push(inflection.singularize(model.entity));
    return addRelations(model, record, newPath);
}
export var resolvers = {
    Query: {
        user: function (parent, _a) {
            var id = _a.id;
            return findOne(User, users, id);
        },
        users: function (parent, _a) {
            var filter = _a.filter;
            return findMany(User, users, filter);
        },
        profile: function (parent, _a) {
            var id = _a.id;
            return findOne(Profile, profiles, id);
        },
        profiles: function (parent, _a) {
            var filter = _a.filter;
            return findMany(Profile, profiles, filter);
        },
        video: function (parent, _a) {
            var id = _a.id;
            return findOne(Video, videos, id);
        },
        videos: function (parent, _a) {
            var filter = _a.filter;
            return findMany(Video, videos, filter);
        },
        post: function (parent, _a) {
            var id = _a.id;
            return findOne(Post, posts, id);
        },
        posts: function (parent, _a) {
            var filter = _a.filter;
            return findMany(Post, posts, filter);
        },
        comment: function (parent, _a) {
            var id = _a.id;
            return findOne(Comment, comments, id);
        },
        comments: function (parent, _a) {
            var filter = _a.filter;
            return findMany(Comment, comments, filter);
        },
        tariff: function (parent, _a) {
            var id = _a.id;
            return findOne(Tariff, tariffs, id);
        },
        tariffs: function (parent, _a) {
            var filter = _a.filter;
            return findMany(Tariff, tariffs, filter);
        },
        tariffOption: function (parent, _a) {
            var id = _a.id;
            return findOne(TariffOption, tariffOptions, id);
        },
        tariffOptions: function (parent, _a) {
            var filter = _a.filter;
            return findMany(TariffOption, tariffOptions, filter);
        },
        category: function (parent, _a) {
            var id = _a.id;
            return findOne(Category, categories, id);
        },
        categories: function (parent, _a) {
            var filter = _a.filter;
            return findMany(Category, categories);
        },
        // @ts-ignore
        unpublishedPosts: function (parent, _a) {
            var authorId = _a.authorId;
            return findMany(Post, posts, { authorId: authorId });
        },
        status: function (parent, args) { return ({
            backend: true,
            smsGateway: false,
            paypalIntegration: true
        }); }
    },
    Mutation: {
        // Customs
        upvotePost: function (parent, _a) {
            var captchaToken = _a.captchaToken, postId = _a.postId;
            return findOne(Post, posts, postId);
        },
        sendSms: function (parent, _a) {
            var to = _a.to, text = _a.text;
            return ({ delivered: true });
        },
        // Deletes
        deleteUser: function (parent, _a) {
            var id = _a.id;
            return findOne(User, users, id);
        },
        deleteProfile: function (parent, _a) {
            var id = _a.id;
            return findOne(Profile, profiles, id);
        },
        deletePost: function (parent, _a) {
            var id = _a.id;
            return findOne(Post, posts, id);
        },
        deleteVideo: function (parent, _a) {
            var id = _a.id;
            return findOne(Video, videos, id);
        },
        deleteComment: function (parent, _a) {
            var id = _a.id;
            return findOne(Comment, comments, id);
        },
        deleteTariffOption: function (parent, _a) {
            var id = _a.id;
            return findOne(TariffOption, tariffOptions, id);
        },
        deleteTariff: function (parent, _a) {
            var id = _a.id;
            return findOne(Tariff, tariffs, id);
        },
        // Creates
        createUser: function (parent, _a) {
            var user = _a.user;
            var path = [inflection.singularize(User.entity)];
            Object.assign(user, { id: 4 });
            return addRelations(User, user, path);
        },
        createProfile: function (parent, _a) {
            var profile = _a.profile;
            var path = [inflection.singularize(Profile.entity)];
            Object.assign(profile, { id: 4 });
            return addRelations(Profile, profile, path);
        },
        createPost: function (parent, _a) {
            var post = _a.post;
            var path = [inflection.singularize(Post.entity)];
            Object.assign(post, { id: 4 });
            return addRelations(Post, post, path);
        },
        createVideo: function (parent, _a) {
            var video = _a.video;
            var path = [inflection.singularize(Video.entity)];
            Object.assign(video, { id: 4 });
            return addRelations(Video, video, path);
        },
        createComment: function (parent, _a) {
            var comment = _a.comment;
            var path = [inflection.singularize(Comment.entity)];
            Object.assign(comment, { id: 4 });
            return addRelations(Comment, comment, path);
        },
        createTariffOption: function (parent, _a) {
            var tariffOption = _a.tariffOption;
            var path = [inflection.singularize(TariffOption.entity)];
            Object.assign(tariffOption, { id: 4 });
            return addRelations(TariffOption, tariffOption, path);
        },
        createTariff: function (parent, _a) {
            var tariff = _a.tariff;
            var path = [inflection.singularize(Tariff.entity)];
            Object.assign(tariff, { id: 4 });
            return addRelations(Tariff, tariff, path);
        },
        // Updates
        updateUser: function (parent, _a) {
            var id = _a.id, user = _a.user;
            var record = clone(findOne(User, users, id));
            Object.assign(record, user);
            return record;
        },
        updateProfile: function (parent, _a) {
            var id = _a.id, profile = _a.profile;
            var record = clone(findOne(Profile, profiles, id));
            Object.assign(record, profile);
            return record;
        },
        updatePost: function (parent, _a) {
            var id = _a.id, post = _a.post;
            var record = clone(findOne(Post, posts, id));
            Object.assign(record, post);
            return record;
        },
        updateVideo: function (parent, _a) {
            var id = _a.id, video = _a.video;
            var record = clone(findOne(Video, videos, id));
            Object.assign(record, video);
            return record;
        },
        updateComment: function (parent, _a) {
            var id = _a.id, comment = _a.comment;
            var record = clone(findOne(Comment, comments, id));
            Object.assign(record, comment);
            return record;
        },
        updateTariffOption: function (parent, _a) {
            var id = _a.id, tariffOption = _a.tariffOption;
            var record = clone(findOne(TariffOption, tariffOptions, id));
            Object.assign(record, tariffOption);
            return record;
        },
        updateTariff: function (parent, _a) {
            var id = _a.id, tariff = _a.tariff;
            var record = clone(findOne(Tariff, tariffs, id));
            Object.assign(record, tariff);
            return record;
        }
    }
};
//# sourceMappingURL=mock-schema.js.map