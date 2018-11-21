import {
  Category,
  User,
  Profile,
  Video,
  Post,
  Comment,
  Tariff,
  TariffOption,
  Tag
} from "./mock-data";
import { Model } from "@vuex-orm/core";
import { clone, matches, singularize } from "../../src/support/utils";

export const typeDefs = `
  type Query {
    user(id: ID!): User!
    users(filter: UserFilter): UserTypeConnection!
    profile(id: ID!): Profile!
    profiles(filter: ProfileFilter): ProfileTypeConnection!
    post(id: ID!): Post!
    posts(filter: PostFilter): PostTypeConnection!
    video(id: ID!): Video!
    videos(filter: VideoFilter): VideoTypeConnection!
    comment(id: ID!): Comment!
    comments(filter: CommentFilter): CommentTypeConnection!
    tariffOption(id: ID!): TariffOption!
    tariffOptions(filter: TariffOptionFilter): TariffOptionTypeConnection!
    tariff(id: ID!): Tariff!
    tariffs(filter: TariffFilter): TariffTypeConnection!
    tariffTariffOption(id: ID!): TariffTariffOption!
    tariffTariffOptions(filter: TariffTariffOptionFilter): TariffTariffOptionTypeConnection!
    category(id: ID!): Category!
    categories: CategoryTypeConnection!
    tag(id: ID!): Tag!
    tags: TagTypeConnection!
    
    unpublishedPosts(authorId: ID!): PostTypeConnection
    status: Status
  }

  type Mutation {
    deleteUser(id: ID!): User!
    deleteProfile(id: ID!): Profile!
    deletePost(id: ID!): Post!
    deleteVideo(id: ID!): Video!
    deleteComment(id: ID!): Comment!
    deleteTariffOption(id: ID!): TariffOption!
    deleteTariff(id: ID!): Tariff!
    
    createUser(user: UserInput!): User!
    createProfile(profile: ProfileInput!): Profile!
    createPost(post: PostInput!): Post!
    createVideo(video: VideoInput!): Video!
    createComment(comment: CommentInput!): Comment!
    createTariffOption(tariffOption: TariffOptionInput!): TariffOption!
    createTariff(tariff: TariffInput!): Tariff!
    
    updateUser(id: ID!, user: UserInput!): User!
    updateProfile(id: ID!, profile: ProfileInput!): Profile!
    updatePost(id: ID!, post: PostInput!): Post!
    updateVideo(id: ID!, video: VideoInput!): Video!
    updateComment(id: ID!, comment: CommentInput!): Comment!
    updateTariffOption(id: ID!, tariffOption: TariffOptionInput!): TariffOption!
    updateTariff(id: ID!, tariff: TariffInput!): Tariff!
    
    upvotePost(captchaToken: String!, postId: ID!): Post!
    sendSms(to: String!, text: String!): SmsStatus!
    reorderItems(id: ID!, itemIds: [ID]!): PostTypeConnection
  }

  type Status {
    backend: Boolean
    smsGateway: Boolean
    paypalIntegration: Boolean
  }

  type SmsStatus {
    delivered: Boolean!
  }

  type User {
    id: ID
    name: String
    profileId: ID
    posts: PostTypeConnection
    comments: CommentTypeConnection
    profile: Profile
  }


  input UserFilter {
    id: ID
    name: String
    profileId: ID
    profile: ProfileInput
  }


   input UserInput {
    id: ID
    name: String
    profileId: ID
    profile: ProfileInput
  }


  type UserTypeConnection {
    nodes: [User!]!
  }


  type Profile {
    id: ID
    email: String
    age: Int
    sex: Boolean
    user: User
  }


  input ProfileFilter {
    id: ID
    email: String
    age: Int
    sex: Boolean
    user: UserInput
  }


   input ProfileInput {
    id: ID
    email: String
    age: Int
    sex: Boolean
    user: UserInput
  }


  type ProfileTypeConnection {
    nodes: [Profile!]!
  }


  type Post {
    id: ID
    content: String
    title: String
    authorId: ID
    otherId: ID
    published: Boolean
    author: User
    comments: CommentTypeConnection
    tags: TagTypeConnection
  }


  input PostFilter {
    id: ID
    content: String
    title: String
    authorId: ID
    otherId: ID
    published: Boolean
    author: UserInput
  }


  input PostInput {
    id: ID
    content: String
    title: String
    authorId: ID
    otherId: ID
    published: Boolean
    author: UserInput
  }


  type PostTypeConnection {
    nodes: [Post!]!
  }


  type Video {
    id: ID
    content: String
    title: String
    authorId: ID
    otherId: ID
    author: User
    comments: CommentTypeConnection
    tags: TagTypeConnection
  }


  input VideoFilter {
    id: ID
    content: String
    title: String
    authorId: ID
    otherId: ID
    author: UserInput
  }


   input VideoInput {
    id: ID
    content: String
    title: String
    authorId: ID
    otherId: ID
    author: UserInput
  }


  type VideoTypeConnection {
    nodes: [Video!]!
  }


  type Comment {
    id: ID
    content: String
    authorId: ID
    author: User
    subjectId: ID
    subjectType: String
  }


  input CommentFilter {
    id: ID
    content: String
    authorId: ID
    author: UserInput
    subjectId: ID
    subjectType: String
  }


   input CommentInput {
    id: ID
    content: String
    authorId: ID
    author: UserInput
    subjectId: ID
    subjectType: String
  }


  type CommentTypeConnection {
    nodes: [Comment!]!
  }


  type TariffOption {
    id: ID
    name: String
    description: String
    tariffs: TariffTypeConnection
  }


  input TariffOptionFilter {
    id: ID
    name: String
    description: String
  }


   input TariffOptionInput {
    id: ID
    name: String
    description: String
  }


  type TariffOptionTypeConnection {
    nodes: [TariffOption!]!
  }


  type Tariff {
    id: ID
    name: String!
    displayName: String
    tariffType: String
    slug: String
    tariffOptions: TariffOptionTypeConnection
  }


  input TariffFilter {
    id: ID
    name: String
    displayName: String
    tariffType: String
    slug: String
  }


  input TariffInput {
    id: ID
    name: String
    displayName: String
    tariffType: String
    slug: String
  }


  type TariffTypeConnection {
    nodes: [Tariff!]!
  }


  type TariffTariffOption {
    tariffId: ID
    tariffOptionId: ID
  }


  input TariffTariffOptionFilter {
    tariffId: ID
    tariffOptionId: ID
  }


   input TariffTariffOptionInput {
    tariffId: ID
    tariffOptionId: ID
  }


  type TariffTariffOptionTypeConnection {
    nodes: [TariffTariffOption!]!
  }

  type Category {
    id: ID
    name: String
    parentId: ID
    parent: Category
  }


  input CategoryFilter {
    id: ID
    name: String
    parentId: ID
    parent: CategoryInput
  }


   input CategoryInput {
    id: ID
    name: String
    parentId: ID
    parent: CategoryInput
  }


  type CategoryTypeConnection {
    nodes: [Category!]!
  }
  
  
  type Tag {
    id: ID
    name: String
    subjectId: ID
    subjectType: String
  }


  input TagFilter {
    id: ID
    name: String
    subjectId: ID
    subjectType: String
  }


   input TagInput {
    id: ID
    name: String
    subjectId: ID
    subjectType: String
  }


  type TagTypeConnection {
    nodes: [Tag!]!
  }
`;

const users = [
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

const profiles = [
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

const videos = [
  {
    id: 1,
    content: "Foo",
    title: "Example Video 1",
    otherId: 42,
    authorId: 1,
    tags: [4]
  },

  {
    id: 2,
    content: "Bar",
    title: "Example Video 2",
    otherId: 67,
    authorId: 2,
    tags: [1]
  },

  {
    id: 3,
    content: "FooBar",
    title: "Example Video 3",
    otherId: 491,
    authorId: 2,
    tags: [1, 3]
  }
];

const posts = [
  {
    id: 1,
    content: "GraphQL is so nice!",
    title: "GraphQL",
    otherId: 123,
    published: true,
    authorId: 1,
    tags: [1, 2]
  },

  {
    id: 2,
    content: "Vue is so awesome!",
    title: "Vue.js",
    otherId: 435,
    published: true,
    authorId: 3,
    tags: [3, 4]
  },

  {
    id: 3,
    content: "Vuex-ORM is so crisp",
    title: "Vuex-ORM",
    otherId: 987,
    published: false,
    authorId: 3,
    tags: [4, 1]
  }
];

const comments = [
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

const tariffs = [
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

const tariffOptions = [
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

const categories = [
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

const tags = [
  {
    id: 1,
    name: "GraphQL"
  },

  {
    id: 2,
    name: "Ruby"
  },

  {
    id: 3,
    name: "JavaScript"
  },

  {
    id: 4,
    name: "Vue"
  }
];

function addRelations(model: typeof Model, record: any, path: Array<string> = []) {
  if (!record) return record;

  switch (model) {
    case User:
      if (!ignoreRelation(Profile, path)) {
        record.profile = findOne(Profile, profiles, record.profileId, path);
      }
      if (!ignoreRelation(Comment, path)) {
        record.comments = findMany(
          Comment,
          comments,
          r => parseInt(r.authorId, 10) === parseInt(record.id, 10),
          path
        );
      }
      if (!ignoreRelation(Post, path)) {
        record.posts = findMany(
          Post,
          posts,
          r => parseInt(r.authorId, 10) === parseInt(record.id, 10),
          path
        );
      }
      break;

    case Profile:
      if (!ignoreRelation(User, path)) {
        record.user = findOne(
          User,
          users,
          (r: any) => parseInt(r.profileId, 10) === parseInt(record.id, 10),
          path
        );
      }
      break;

    case Video:
      if (!ignoreRelation(User, path)) record.author = findOne(User, users, record.authorId, path);
      if (!ignoreRelation(Comment, path)) {
        record.comments = findMany(
          Comment,
          comments,
          r => parseInt(r.subjectId, 10) === parseInt(record.id, 10) && r.subjectType === "video",
          path
        );
      }
      if (
        !ignoreRelation(Tag, path) &&
        record.tags &&
        record.tags.length > 0 &&
        typeof record.tags[0] === "number"
      ) {
        record.tags = findMany(Tag, tags, r => record.tags.includes(parseInt(r.id, 10)), path);
      }
      break;

    case Post:
      if (!ignoreRelation(User, path)) record.author = findOne(User, users, record.authorId);
      if (!ignoreRelation(Comment, path)) {
        record.comments = findMany(
          Comment,
          comments,
          r => parseInt(r.subjectId, 10) === parseInt(record.id, 10) && r.subjectType === "post",
          path
        );
      }
      if (
        !ignoreRelation(Tag, path) &&
        record.tags &&
        record.tags.length > 0 &&
        typeof record.tags[0] === "number"
      ) {
        record.tags = findMany(Tag, tags, r => record.tags.includes(parseInt(r.id, 10)), path);
      }
      break;

    case Comment:
      if (!ignoreRelation(User, path)) record.author = findOne(User, users, record.authorId, path);
      break;

    case Tariff:
      if (!ignoreRelation(TariffOption, path)) {
        record.tariffOptions = findMany(TariffOption, tariffOptions, () => true, path);
      }
      break;

    case TariffOption:
      if (!ignoreRelation(Tariff, path)) {
        record.tariffs = findMany(Tariff, tariffs, () => true, path);
      }
      break;

    case Category:
      if (record.parentId) record.parent = findOne(Category, categories, record.parentId);
      break;
  }

  return record;
}

function ignoreRelation(model: typeof Model, path: Array<string>) {
  return path.includes(singularize(model.entity));
}

function findMany(
  model: typeof Model,
  collection: Array<any>,
  filterFn?: (v: any) => boolean,
  path: Array<string> = []
) {
  if (!filterFn) {
    filterFn = () => true;
  }

  if (typeof filterFn !== "function") {
    filterFn = matches(filterFn);
  }

  const records = collection.filter(filterFn);

  if (records.length === 0) return { nodes: [] };

  return {
    nodes: records.map(r => {
      const newPath = path.slice(0); // clone
      newPath.push(singularize(model.entity));
      return addRelations(model, r, newPath);
    })
  };
}

function findOne(
  model: typeof Model,
  collection: Array<any>,
  idOrFn: any,
  path: Array<string> = []
) {
  let filterFn;

  if (typeof idOrFn === "function") {
    filterFn = idOrFn;
  } else {
    filterFn = (r: any) => {
      return parseInt(r.id, 10) === parseInt(idOrFn, 10);
    };
  }

  const record = collection.find(filterFn);

  const newPath = path.slice(0); // clone
  newPath.push(singularize(model.entity));

  return addRelations(model, record, newPath);
}

export const resolvers = {
  Query: {
    user: (parent: any, { id }: any) => findOne(User, users, id),
    users: (parent: any, { filter }: any) => findMany(User, users, filter),
    profile: (parent: any, { id }: any) => findOne(Profile, profiles, id),
    profiles: (parent: any, { filter }: any) => findMany(Profile, profiles, filter),
    video: (parent: any, { id }: any) => findOne(Video, videos, id),
    videos: (parent: any, { filter }: any) => findMany(Video, videos, filter),
    post: (parent: any, { id }: any) => findOne(Post, posts, id),
    posts: (parent: any, { filter }: any) => findMany(Post, posts, filter),
    comment: (parent: any, { id }: any) => findOne(Comment, comments, id),
    comments: (parent: any, { filter }: any) => findMany(Comment, comments, filter),
    tariff: (parent: any, { id }: any) => findOne(Tariff, tariffs, id),
    tariffs: (parent: any, { filter }: any) => findMany(Tariff, tariffs, filter),
    tariffOption: (parent: any, { id }: any) => findOne(TariffOption, tariffOptions, id),
    tariffOptions: (parent: any, { filter }: any) => findMany(TariffOption, tariffOptions, filter),
    category: (parent: any, { id }: any) => findOne(Category, categories, id),
    categories: (parent: any, { filter }: any) => findMany(Category, categories),
    tag: (parent: any, { id }: any) => findOne(Tag, tags, id),
    tags: (parent: any, { filter }: any) => findMany(Tag, tags),

    // @ts-ignore
    unpublishedPosts: (parent: any, { authorId }: any) => findMany(Post, posts, { authorId }),

    status: (parent: any, args: any) => ({
      backend: true,
      smsGateway: false,
      paypalIntegration: true
    })
  },

  Mutation: {
    // Customs

    upvotePost: (parent: any, { captchaToken, postId }: any) => findOne(Post, posts, postId),
    sendSms: (parent: any, { to, text }: any) => ({ delivered: true }),

    // Deletes

    deleteUser: (parent: any, { id }: any) => findOne(User, users, id),
    deleteProfile: (parent: any, { id }: any) => findOne(Profile, profiles, id),
    deletePost: (parent: any, { id }: any) => findOne(Post, posts, id),
    deleteVideo: (parent: any, { id }: any) => findOne(Video, videos, id),
    deleteComment: (parent: any, { id }: any) => findOne(Comment, comments, id),
    deleteTariffOption: (parent: any, { id }: any) => findOne(TariffOption, tariffOptions, id),
    deleteTariff: (parent: any, { id }: any) => findOne(Tariff, tariffs, id),

    // Creates

    createUser: (parent: any, { user }: any) => {
      const path = [singularize(User.entity)];
      Object.assign(user, { id: 4 });
      return addRelations(User, user, path);
    },

    createProfile: (parent: any, { profile }: any) => {
      const path = [singularize(Profile.entity)];
      Object.assign(profile, { id: 4 });
      return addRelations(Profile, profile, path);
    },

    createPost: (parent: any, { post }: any) => {
      const path = [singularize(Post.entity)];
      Object.assign(post, { id: 4 });
      return addRelations(Post, post, path);
    },

    createVideo: (parent: any, { video }: any) => {
      const path = [singularize(Video.entity)];
      Object.assign(video, { id: 4 });
      return addRelations(Video, video, path);
    },

    createComment: (parent: any, { comment }: any) => {
      const path = [singularize(Comment.entity)];
      Object.assign(comment, { id: 4 });
      return addRelations(Comment, comment, path);
    },

    createTariffOption: (parent: any, { tariffOption }: any) => {
      const path = [singularize(TariffOption.entity)];
      Object.assign(tariffOption, { id: 4 });
      return addRelations(TariffOption, tariffOption, path);
    },

    createTariff: (parent: any, { tariff }: any) => {
      const path = [singularize(Tariff.entity)];
      Object.assign(tariff, { id: 4 });
      return addRelations(Tariff, tariff, path);
    },

    // Updates

    updateUser: (parent: any, { id, user }: any) => {
      const record = clone(findOne(User, users, id));
      Object.assign(record, user);
      return record;
    },

    updateProfile: (parent: any, { id, profile }: any) => {
      const record = clone(findOne(Profile, profiles, id));
      Object.assign(record, profile);
      return record;
    },

    updatePost: (parent: any, { id, post }: any) => {
      const record = clone(findOne(Post, posts, id));
      Object.assign(record, post);
      return record;
    },

    updateVideo: (parent: any, { id, video }: any) => {
      const record = clone(findOne(Video, videos, id));
      Object.assign(record, video);
      return record;
    },

    updateComment: (parent: any, { id, comment }: any) => {
      const record = clone(findOne(Comment, comments, id));
      Object.assign(record, comment);
      return record;
    },

    updateTariffOption: (parent: any, { id, tariffOption }: any) => {
      const record = clone(findOne(TariffOption, tariffOptions, id));
      Object.assign(record, tariffOption);
      return record;
    },

    updateTariff: (parent: any, { id, tariff }: any) => {
      const record = clone(findOne(Tariff, tariffs, id));
      Object.assign(record, tariff);
      return record;
    }
  }
};
