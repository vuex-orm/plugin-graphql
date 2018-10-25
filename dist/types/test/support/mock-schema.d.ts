export declare const typeDefs = "\n  type Query {\n    user(id: ID!): User!\n    users(filter: UserFilter): UserTypeConnection!\n    profile(id: ID!): Profile!\n    profiles(filter: ProfileFilter): ProfileTypeConnection!\n    post(id: ID!): Post!\n    posts(filter: PostFilter): PostTypeConnection!\n    video(id: ID!): Video!\n    videos(filter: VideoFilter): VideoTypeConnection!\n    comment(id: ID!): Comment!\n    comments(filter: CommentFilter): CommentTypeConnection!\n    tariffOption(id: ID!): TariffOption!\n    tariffOptions(filter: TariffOptionFilter): TariffOptionTypeConnection!\n    tariff(id: ID!): Tariff!\n    tariffs(filter: TariffFilter): TariffTypeConnection!\n    tariffTariffOption(id: ID!): TariffTariffOption!\n    tariffTariffOptions(filter: TariffTariffOptionFilter): TariffTariffOptionTypeConnection!\n    category(id: ID!): Category!\n    categories: CategoryTypeConnection!\n    \n    unpublishedPosts(authorId: ID!): PostTypeConnection\n    status: Status\n  }\n\n  type Mutation {\n    deleteUser(id: ID!): User!\n    deleteProfile(id: ID!): Profile!\n    deletePost(id: ID!): Post!\n    deleteVideo(id: ID!): Video!\n    deleteComment(id: ID!): Comment!\n    deleteTariffOption(id: ID!): TariffOption!\n    deleteTariff(id: ID!): Tariff!\n    \n    createUser(user: UserInput!): User!\n    createProfile(profile: ProfileInput!): Profile!\n    createPost(post: PostInput!): Post!\n    createVideo(video: VideoInput!): Video!\n    createComment(comment: CommentInput!): Comment!\n    createTariffOption(tariffOption: TariffOptionInput!): TariffOption!\n    createTariff(tariff: TariffInput!): Tariff!\n    \n    updateUser(id: ID!, user: UserInput!): User!\n    updateProfile(id: ID!, profile: ProfileInput!): Profile!\n    updatePost(id: ID!, post: PostInput!): Post!\n    updateVideo(id: ID!, video: VideoInput!): Video!\n    updateComment(id: ID!, comment: CommentInput!): Comment!\n    updateTariffOption(id: ID!, tariffOption: TariffOptionInput!): TariffOption!\n    updateTariff(id: ID!, tariff: TariffInput!): Tariff!\n    \n    upvotePost(captchaToken: String!, postId: ID!): Post!\n    sendSms(to: String!, text: String!): SmsStatus!\n    reorderItems(id: ID!, itemIds: [ID]!): PostTypeConnection\n  }\n\n  type Status {\n    backend: Boolean\n    smsGateway: Boolean\n    paypalIntegration: Boolean\n  }\n\n  type SmsStatus {\n    delivered: Boolean!\n  }\n\n  type User {\n    id: ID\n    name: String\n    profileId: ID\n    posts: PostTypeConnection\n    comments: CommentTypeConnection\n    profile: Profile\n  }\n\n\n  input UserFilter {\n    id: ID\n    name: String\n    profileId: ID\n    profile: ProfileInput\n  }\n\n\n   input UserInput {\n    id: ID\n    name: String\n    profileId: ID\n    profile: ProfileInput\n  }\n\n\n  type UserTypeConnection {\n    nodes: [User!]!\n  }\n\n\n  type Profile {\n    id: ID\n    email: String\n    age: Int\n    sex: Boolean\n    user: User\n  }\n\n\n  input ProfileFilter {\n    id: ID\n    email: String\n    age: Int\n    sex: Boolean\n    user: UserInput\n  }\n\n\n   input ProfileInput {\n    id: ID\n    email: String\n    age: Int\n    sex: Boolean\n    user: UserInput\n  }\n\n\n  type ProfileTypeConnection {\n    nodes: [Profile!]!\n  }\n\n\n  type Post {\n    id: ID\n    content: String\n    title: String\n    authorId: ID\n    otherId: ID\n    published: Boolean\n    author: User\n    comments: CommentTypeConnection\n  }\n\n\n  input PostFilter {\n    id: ID\n    content: String\n    title: String\n    authorId: ID\n    otherId: ID\n    published: Boolean\n    author: UserInput\n  }\n\n\n  input PostInput {\n    id: ID\n    content: String\n    title: String\n    authorId: ID\n    otherId: ID\n    published: Boolean\n    author: UserInput\n  }\n\n\n  type PostTypeConnection {\n    nodes: [Post!]!\n  }\n\n\n  type Video {\n    id: ID\n    content: String\n    title: String\n    authorId: ID\n    otherId: ID\n    author: User\n    comments: CommentTypeConnection\n  }\n\n\n  input VideoFilter {\n    id: ID\n    content: String\n    title: String\n    authorId: ID\n    otherId: ID\n    author: UserInput\n  }\n\n\n   input VideoInput {\n    id: ID\n    content: String\n    title: String\n    authorId: ID\n    otherId: ID\n    author: UserInput\n  }\n\n\n  type VideoTypeConnection {\n    nodes: [Video!]!\n  }\n\n\n  type Comment {\n    id: ID\n    content: String\n    authorId: ID\n    author: User\n    subjectId: ID\n    subjectType: String\n  }\n\n\n  input CommentFilter {\n    id: ID\n    content: String\n    authorId: ID\n    author: UserInput\n    subjectId: ID\n    subjectType: String\n  }\n\n\n   input CommentInput {\n    id: ID\n    content: String\n    authorId: ID\n    author: UserInput\n    subjectId: ID\n    subjectType: String\n  }\n\n\n  type CommentTypeConnection {\n    nodes: [Comment!]!\n  }\n\n\n  type TariffOption {\n    id: ID\n    name: String\n    description: String\n    tariffs: TariffTypeConnection\n  }\n\n\n  input TariffOptionFilter {\n    id: ID\n    name: String\n    description: String\n  }\n\n\n   input TariffOptionInput {\n    id: ID\n    name: String\n    description: String\n  }\n\n\n  type TariffOptionTypeConnection {\n    nodes: [TariffOption!]!\n  }\n\n\n  type Tariff {\n    id: ID\n    name: String!\n    displayName: String\n    tariffType: String\n    slug: String\n    tariffOptions: TariffOptionTypeConnection\n  }\n\n\n  input TariffFilter {\n    id: ID\n    name: String\n    displayName: String\n    tariffType: String\n    slug: String\n  }\n\n\n   input TariffInput {\n    id: ID\n    name: String\n    displayName: String\n    tariffType: String\n    slug: String\n  }\n\n\n  type TariffTypeConnection {\n    nodes: [Tariff!]!\n  }\n\n\n  type TariffTariffOption {\n    tariffId: ID\n    tariffOptionId: ID\n  }\n\n\n  input TariffTariffOptionFilter {\n    tariffId: ID\n    tariffOptionId: ID\n  }\n\n\n   input TariffTariffOptionInput {\n    tariffId: ID\n    tariffOptionId: ID\n  }\n\n\n  type TariffTariffOptionTypeConnection {\n    nodes: [TariffTariffOption!]!\n  }\n\n  type Category {\n    id: ID\n    name: String\n    parentId: ID\n    parent: Category\n  }\n\n\n  input CategoryFilter {\n    id: ID\n    name: String\n    parentId: ID\n    parent: CategoryInput\n  }\n\n\n   input CategoryInput {\n    id: ID\n    name: String\n    parentId: ID\n    parent: CategoryInput\n  }\n\n\n  type CategoryTypeConnection {\n    nodes: [Category!]!\n  }\n";
export declare const resolvers: {
    Query: {
        user: (parent: any, { id }: any) => any;
        users: (parent: any, { filter }: any) => {
            nodes: any[];
        };
        profile: (parent: any, { id }: any) => any;
        profiles: (parent: any, { filter }: any) => {
            nodes: any[];
        };
        video: (parent: any, { id }: any) => any;
        videos: (parent: any, { filter }: any) => {
            nodes: any[];
        };
        post: (parent: any, { id }: any) => any;
        posts: (parent: any, { filter }: any) => {
            nodes: any[];
        };
        comment: (parent: any, { id }: any) => any;
        comments: (parent: any, { filter }: any) => {
            nodes: any[];
        };
        tariff: (parent: any, { id }: any) => any;
        tariffs: (parent: any, { filter }: any) => {
            nodes: any[];
        };
        tariffOption: (parent: any, { id }: any) => any;
        tariffOptions: (parent: any, { filter }: any) => {
            nodes: any[];
        };
        category: (parent: any, { id }: any) => any;
        categories: (parent: any, { filter }: any) => {
            nodes: any[];
        };
        unpublishedPosts: (parent: any, { authorId }: any) => any;
        status: (parent: any, args: any) => {
            backend: boolean;
            smsGateway: boolean;
            paypalIntegration: boolean;
        };
    };
    Mutation: {
        upvotePost: (parent: any, { captchaToken, postId }: any) => any;
        sendSms: (parent: any, { to, text }: any) => {
            delivered: boolean;
        };
        deleteUser: (parent: any, { id }: any) => any;
        deleteProfile: (parent: any, { id }: any) => any;
        deletePost: (parent: any, { id }: any) => any;
        deleteVideo: (parent: any, { id }: any) => any;
        deleteComment: (parent: any, { id }: any) => any;
        deleteTariffOption: (parent: any, { id }: any) => any;
        deleteTariff: (parent: any, { id }: any) => any;
        createUser: (parent: any, { user }: any) => any;
        createProfile: (parent: any, { profile }: any) => any;
        createPost: (parent: any, { post }: any) => any;
        createVideo: (parent: any, { video }: any) => any;
        createComment: (parent: any, { comment }: any) => any;
        createTariffOption: (parent: any, { tariffOption }: any) => any;
        createTariff: (parent: any, { tariff }: any) => any;
        updateUser: (parent: any, { id, user }: any) => any;
        updateProfile: (parent: any, { id, profile }: any) => any;
        updatePost: (parent: any, { id, post }: any) => any;
        updateVideo: (parent: any, { id, video }: any) => any;
        updateComment: (parent: any, { id, comment }: any) => any;
        updateTariffOption: (parent: any, { id, tariffOption }: any) => any;
        updateTariff: (parent: any, { id, tariff }: any) => any;
    };
};
