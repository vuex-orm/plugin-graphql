import { User, Profile, Video, Post, Comment, Tariff, TariffOption } from 'test/support/mock-data'
import inflection from 'inflection';
import * as _ from 'lodash';


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
    
    unpublishedPosts(userId: ID!): PostTypeConnection
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
    userId: ID
    otherId: ID
    published: Boolean
    user: User
    comments: CommentTypeConnection
  }


  input PostFilter {
    id: ID
    content: String
    title: String
    userId: ID
    otherId: ID
    published: Boolean
    user: UserInput
  }


  input PostInput {
    id: ID
    content: String
    title: String
    userId: ID
    otherId: ID
    published: Boolean
    user: UserInput
  }


  type PostTypeConnection {
    nodes: [Post!]!
  }


  type Video {
    id: ID
    content: String
    title: String
    userId: ID
    otherId: ID
    user: User
    comments: CommentTypeConnection
  }


  input VideoFilter {
    id: ID
    content: String
    title: String
    userId: ID
    otherId: ID
    user: UserInput
  }


   input VideoInput {
    id: ID
    content: String
    title: String
    userId: ID
    otherId: ID
    user: UserInput
  }


  type VideoTypeConnection {
    nodes: [Video!]!
  }


  type Comment {
    id: ID
    content: String
    userId: ID
    user: User
    subjectId: ID
    subjectType: String
  }


  input CommentFilter {
    id: ID
    content: String
    userId: ID
    user: UserInput
    subjectId: ID
    subjectType: String
  }


   input CommentInput {
    id: ID
    content: String
    userId: ID
    user: UserInput
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
`;


const users = [
  {
    id: 1,
    name: 'Charlie Brown',
    profileId: 1
  },

  {
    id: 2,
    name: 'Peppermint Patty',
    profileId: 2
  },

  {
    id: 3,
    name: 'Snoopy',
    profileId: 3
  }
];

const profiles = [
  {
    id: 1,
    email: 'charlie@peanuts.com',
    age: 8,
    sex: true
  },

  {
    id: 2,
    email: 'peppermint@peanuts.com',
    age: 9,
    sex: false
  },

  {
    id: 3,
    email: 'snoopy@peanuts.com',
    age: 5,
    sex: true
  }
];

const videos = [
  {
    id: 1,
    content: 'Foo',
    title: 'Example Video 1',
    otherId: 42,
    userId: 1
  },

  {
    id: 2,
    content: 'Bar',
    title: 'Example Video 2',
    otherId: 67,
    userId: 2
  },

  {
    id: 3,
    content: 'FooBar',
    title: 'Example Video 3',
    otherId: 491,
    userId: 2
  }
];

const posts = [
  {
    id: 1,
    content: 'GraphQL is so nice!',
    title: 'GraphQL',
    otherId: 123,
    published: true,
    userId: 1
  },

  {
    id: 2,
    content: 'Vue is so awesome!',
    title: 'Vue.js',
    otherId: 435,
    published: true,
    userId: 3
  },

  {
    id: 3,
    content: 'Vuex-ORM is so crisp',
    title: 'Vuex-ORM',
    otherId: 987,
    published: false,
    userId: 3
  }
];

const comments = [
  {
    id: 1,
    content: 'Yes!!!!',
    userId: 2,
    subjectId: 1,
    subjectType: 'post'
  },

  {
    id: 2,
    content: 'So crazy :O',
    userId: 1,
    subjectId: 2,
    subjectType: 'video'
  },

  {
    id: 3,
    content: 'Hell no!',
    userId: 3,
    subjectId: 3,
    subjectType: 'post'
  }
];

const tariffs = [
  {
    id: 1,
    name: 'Super DSL S',
    displayName: 'super-dsl-s',
    tariffType: 'dsl',
    slug: '1as8d8w6iu'
  },

  {
    id: 2,
    name: 'Super DSL M',
    displayName: 'super-dsl-m',
    tariffType: 'dsl',
    slug: 'asd8e2c89'
  },

  {
    id: 3,
    name: 'Super DSL L',
    displayName: 'super-dsl-l',
    tariffType: 'dsl',
    slug: '8aas6e8a4w'
  }
];

const tariffOptions = [
  {
    id: 1,
    name: 'Installation',
    description: 'Someone will come up your house and setup the router and so on.'
  },

  {
    id: 2,
    name: 'Spotify Music',
    description: 'Spotify Premium'
  },

  {
    id: 3,
    name: 'HomeMatic IP Access Point',
    description: 'Smarthome stuff.'
  }
];


function addRelations(model, record, path = []) {
  if (!record) return record;

  switch (model) {
    case User:
      if (!ignoreRelation(Profile, path)) record.profile = findOne(Profile, profiles, record.profileId, path);
      if (!ignoreRelation(Comment, path)) record.comments = findMany(Comment, comments, (r) => parseInt(r.userId) === parseInt(record.id), path);
      if (!ignoreRelation(Post, path)) record.posts = findMany(Post, posts, (r) => parseInt(r.userId) === parseInt(record.id), path);
      break;

    case Profile:
      if (!ignoreRelation(User, path)) record.user = findOne(User, users, (r) => parseInt(r.profileId) === parseInt(record.id), path);
      break;

    case Video:
      if (!ignoreRelation(User, path)) record.user = findOne(User, users, record.userId, path);
      if (!ignoreRelation(Comment, path)) record.comments = findMany(Comment, comments, (r) => parseInt(r.subjectId) === parseInt(record.id) && r.subjectType === 'video', path);
      break;

    case Post:
      if (!ignoreRelation(User, path)) record.user = findOne(User, users, record.userId);
      if (!ignoreRelation(Comment, path)) record.comments = findMany(Comment, comments, (r) => parseInt(r.subjectId) === parseInt(record.id) && r.subjectType === 'post', path);
      break;

    case Comment:
      if (!ignoreRelation(User, path)) record.user = findOne(User, users, record.userId, path);
      break;

    case Tariff:
      if (!ignoreRelation(TariffOption, path)) record.tariffOptions = findMany(TariffOption, tariffOptions, () => true, path);
      break;

    case TariffOption:
      if (!ignoreRelation(Tariff, path)) record.tariffs = findMany(Tariff, tariffs, () => true, path);
      break;

  }

  return record;
}


function ignoreRelation(model, path) {
  return path.includes(inflection.singularize(model.entity));
}


function findMany(model, collection, filterFn, path = []) {
  if (!filterFn) {
    filterFn = () => true;
  }

  if (typeof filterFn !== 'function') {
    filterFn = _.matches(filterFn);
  }

  const records = _.filter(collection, filterFn);

  if (records.length === 0) return { nodes: [] };

  return {
    nodes: _.map(records, r => {
      const newPath = path.slice(0); // clone
      newPath.push(inflection.singularize(model.entity));
      return addRelations(model, r, newPath);
    })
  };
}


function findOne(model, collection, idOrFn, path = []) {
  let filterFn;

  if (typeof idOrFn === 'function') {
    filterFn = idOrFn
  } else {
    filterFn = r => {
      return parseInt(r.id) === parseInt(idOrFn);
    }
  }

  const record = _.find(collection, filterFn);

  const newPath = path.slice(0); // clone
  newPath.push(inflection.singularize(model.entity));

  return addRelations(model, record, newPath);
}


export const resolvers = {
  Query: {
    user: (parent, { id }) => findOne(User, users, id),
    users: (parent, { filter }) => findMany(User, users, filter),
    profile: (parent, { id }) => findOne(Profile, profiles, id),
    profiles: (parent, { filter }) => findMany(Profile, profiles, filter),
    video: (parent, { id }) => findOne(Video, videos, id),
    videos: (parent, { filter }) => findMany(Video, videos, filter),
    post: (parent, { id }) => findOne(Post, posts, id),
    posts: (parent, { filter }) => findMany(Post, posts, filter),
    comment: (parent, { id }) => findOne(Comment, comments, id),
    comments: (parent, { filter }) => findMany(Comment, comments, filter),
    tariff: (parent, { id }) => findOne(Tariff, tariffs, id),
    tariffs: (parent, { filter }) => findMany(Tariff, tariffs, filter),
    tariffOption: (parent, { id }) => findOne(TariffOption, tariffOptions, id),
    tariffOptions: (parent, { filter }) => findMany(TariffOption, tariffOptions, filter),

    unpublishedPosts: (parent, { userId }) => findMany(Post, posts, { userId }),
    status: (parent, args) => ({
        backend: true,
        smsGateway: false,
        paypalIntegration: true
    })
  },

  Mutation: {
    // Customs

    upvotePost: (parent, { captchaToken, postId }) => findOne(Post, posts, postId),
    sendSms: (parent, { to, text }) => ({ delivered: true }),


    // Deletes

    deleteUser: (parent, { id }) => findOne(User, users, id),
    deleteProfile: (parent, { id }) => findOne(Profile, profiles, id),
    deletePost: (parent, { id }) => findOne(Post, posts, id),
    deleteVideo: (parent, { id }) => findOne(Video, videos, id),
    deleteComment: (parent, { id }) => findOne(Comment, comments, id),
    deleteTariffOption: (parent, { id }) => findOne(TariffOption, tariffOptions, id),
    deleteTariff: (parent, { id }) => findOne(Tariff, tariffs, id),



    // Creates

    createUser: (parent, { user }) => {
      const path = [inflection.singularize(User.entity)];
      _.assign(user, { id: 4 });
      return addRelations(User, user, path);
    },

    createProfile: (parent, { profile }) => {
      const path = [inflection.singularize(Profile.entity)];
      _.assign(profile, { id: 4 });
      return addRelations(Profile, profile, path);
    },

    createPost: (parent, { post }) => {
      const path = [inflection.singularize(Post.entity)];
      _.assign(post, { id: 4 });
      return addRelations(Post, post, path);
    },

    createVideo: (parent, { video }) => {
      const path = [inflection.singularize(Video.entity)];
      _.assign(video, { id: 4 });
      return addRelations(Video, video, path);
    },

    createComment: (parent, { comment }) => {
      const path = [inflection.singularize(Comment.entity)];
      _.assign(comment, { id: 4 });
      return addRelations(Comment, comment, path);
    },

    createTariffOption: (parent, { tariffOption }) => {
      const path = [inflection.singularize(TariffOption.entity)];
      _.assign(tariffOption, { id: 4 });
      return addRelations(TariffOption, tariffOption, path);
    },

    createTariff: (parent, { tariff }) => {
      const path = [inflection.singularize(Tariff.entity)];
      _.assign(tariff, { id: 4 });
      return addRelations(Tariff, tariff, path);
    },



    // Updates

    updateUser: (parent, { id, user }) => {
      const record = _.clone(findOne(User, users, id));
      _.assign(record, user);
      return record;
    },

    updateProfile: (parent, { id, profile }) => {
      const record = _.clone(findOne(Profile, profiles, id));
      _.assign(record, profile);
      return record;
    },

    updatePost: (parent, { id, post }) => {
      const record = _.clone(findOne(Post, posts, id));
      _.assign(record, post);
      return record;
    },

    updateVideo: (parent, { id, video }) => {
      const record = _.clone(findOne(Video, videos, id));
      _.assign(record, video);
      return record;
    },

    updateComment: (parent, { id, comment }) => {
      const record = _.clone(findOne(Comment, comments, id));
      _.assign(record, comment);
      return record;
    },

    updateTariffOption: (parent, { id, tariffOption }) => {
      const record = _.clone(findOne(TariffOption, tariffOptions, id));
      _.assign(record, tariffOption);
      return record;
    },

    updateTariff: (parent, { id, tariff }) => {
      const record = _.clone(findOne(Tariff, tariffs, id));
      _.assign(record, tariff);
      return record;
    },
  }
};
