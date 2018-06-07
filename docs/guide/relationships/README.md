# Relationships

[[toc]]

This chapter describes how the Apollo-Plugin interacts with relationships. All relationships work out of the box.
We take the examples from the [Vuex-ORM documentation for definition relationships](https://vuex-orm.github.io/vuex-orm/relationships/defining-relationships.html)
and show what GraphQL queries will be generated.


## One To One

::: tip
See the [One To One section](https://vuex-orm.github.io/vuex-orm/relationships/defining-relationships.html#one-to-one) in the Vuex-ORM documentation.
::: 

Is eager loaded automatically.

**Models:**
```javascript
class Profile extends Model {
  static entity = 'profiles';

  static fields () {
    return {
      id: this.increment(),
      age: this.string(''),
      sex: this.string(''),
      userId: this.number(0),
      user: this.belongsTo(User, 'userID')
    }
  }
}

class User extends Model {
  static entity = 'users';

  static fields () {
    return {
      id: this.increment(),
      name: this.string(''),
      profile: this.hasOne(Profile, 'userId')
    }
  }
}

```

**Fetch Query for User:**
```graphql
query Users {
  users {
    nodes {
      id
      name
    
      profile {
        id
        age
        sex
        userId
      }
    }
  }
}
```

**Fetch Query for Profile:**
```graphql
query Profiles {
  profiles {
    nodes {
      id
      age
      sex
      userId
      
      user {
        id
        name
      }
    }
  }
}
```

## One To Many

::: tip
See the [One To Many section](https://vuex-orm.github.io/vuex-orm/relationships/defining-relationships.html#one-to-many) in the Vuex-ORM documentation.
::: 

BelongsTo is eager loaded automatically while HasMany is not eager loaded. 

**Models:**
```javascript
class Comment extends Model {
  static entity = 'comments';

  static fields () {
    return {
      id: this.increment(),
      postId: this.number(0),
      content: this.string(''),
      post: this.belongsTo(Post, 'postId')
    }
  }
}

class Post extends Model {
  static entity = 'posts';

  static fields () {
    return {
      id: this.increment(),
      title: this.string(''),
      content: this.string(''),
      comments: this.hasMany(Comment, 'postId')
    }
  }
}
```

**Fetch Query for Comment:**
```graphql
query Comments {
  comments {
    nodes {
      id
      postId
      content
    
      post {
        id
        content
        title
      }
    }
  }
}
```

As you can see the post is eager loaded.

**Fetch Query for Post:**
```graphql
query Posts {
  posts {
    nodes {
      id
      content
      title
    }
  }
}
```

As you can see the comments are not eager loaded.


## Many To Many

::: tip
See the [Many To Many section](https://vuex-orm.github.io/vuex-orm/relationships/defining-relationships.html#many-to-many) in the Vuex-ORM documentation.
::: 

Is NOT eager loaded automatically, so we add a eagerLoad field to User.

**Models:**
```javascript
class User extends Model {
  static entity = 'users';
  static eagerLoad = ['roles'];

  static fields () {
    return {
      id: this.increment(),
      email: this.string(''),
      roles: this.belongsToMany(Role, RoleUser, 'userId', 'roleId')
    }
  }
}

class Role extends Model {
  static entity = 'roles';

  static fields () {
    return {
      id: this.increment(),
      name: this.string(''),
      users: this.belongsToMany(User, RoleUser, 'roleId', 'userId')
    }
  }
}

class RoleUser extends Model {
  static entity = 'roleUser';
  static primaryKey = ['roleId', 'userId'];

  static fields () {
    return {
      roleId: this.number(0),
      userId: this.number(0)
    }
  }
}
```


**Fetch Query for User:**
```graphql
query Users {
  users {
    nodes {
      id
      email
      
      roles {
        nodes {
          id
          name
        }
      }
    }
  }
}
```

Roles are eager loaded because of the `eagerLoad` definition in the `User` model.


**Fetch Query for Role:**
```graphql
query Roles {
  roles {
    nodes {
      id
      name
    }
  }
}
```


## Has Many Through

::: tip
See the [Has Any Through section](https://vuex-orm.github.io/vuex-orm/relationships/defining-relationships.html#has-many-through) in the Vuex-ORM documentation.
::: 

Is NOT eager loaded automatically.

In this example we have a Product which can belong to many ProductGroups. And a ProductGroup can have many Products.
This is a classical n:m relation type, which we setup via HasManyThrough and a Pivot Model (ProductsProductGroup) 

**Models:**
```javascript
class Country extends Model {
  static entity = 'countries';

  static fields () {
    return {
      id: this.increment(),
      name: this.string(''),
      users: this.hasMany(User, 'countryId'),
      posts: this.hasManyThrough(Post, User, 'countryId', 'userId')
    }
  }
}

class User extends Model {
  static entity = 'users';

  static fields () {
    return {
      id: this.increment(),
      email: this.string(''),
      countryId: this.number(0),
      country: this.belongsTo(Country, 'countryId'),
      posts: this.hasMany(Post, 'userId'),
    }
  }
}

class Post extends Model {
  static entity = 'posts';

  static fields () {
    return {
      id: this.increment(),
      title: this.string(''),
      content: this.string(''),
      userId: this.number(0),
      user: this.belongsTo(User, 'userId')
    }
  }
}
```

**Fetch Query for Country:**
```graphql
query Countries {
  countries {
    nodes {
      id
      name
    }
  }
}
```

**Fetch Query for User:**
```graphql
query Users {
  users {
    nodes {
      id
      email
      countryId
      
      country {
        id
        name
      }
    }
  }
}
```

**Fetch Query for Post:**
```graphql
query Posts {
  posts {
    nodes {
      id
      title
      content
      
      user {
        id
        email
        countryId
        
        country {
          id
          name
        }
      }
    }
  }
}
```


## Polymorphic Relations

::: tip
See the [Polymorphic Relations section](https://vuex-orm.github.io/vuex-orm/relationships/defining-relationships.html#polymorphic-relations) in the Vuex-ORM documentation.
::: 

Eager loading behaves like in a normal One To Many or One to One. So we add a `eagerLoad` field to make sure the
comments are loaded automatically with the post or video.

**Models:**
```javascript
class Post extends Model {
  static entity = 'posts';
  static eagerLoad = ['comments'];

  static fields () {
    return {
      id: this.increment(),
      title: this.string(''),
      content: this.string(''),
      comments: this.morphMany(Comment, 'commentableId', 'commentableType')
    }
  }
}

class Video extends Model {
  static entity = 'videos';
  static eagerLoad = ['comments'];

  static fields () {
    return {
      id: this.increment(),
      title: this.string(''),
      url: this.string(''),
      comments: this.morphMany(Comment, 'commentableId', 'commentableType')
    }
  }
}

class Comment extends Model {
  static entity = 'comments';

  static fields () {
    return {
      id: this.increment(),
      content: this.string(''),
      commentableId: this.number(0),
      commentableType: this.string('')
    }
  }
}
```

**Fetch Query for Post (or Video):**
```graphql
query Posts {
  posts {
    nodes {
      id
      title
      content
      
      comments {
        nodes {
          id
          content
          commentableId
          commentableType
        }
      }
    }
  }
}
```


## Many To Many Polymorphic Relations

::: tip
See the [Many To Many Polymorphic Relations section](https://vuex-orm.github.io/vuex-orm/relationships/defining-relationships.html#many-to-many-polymorphic-relations) in the Vuex-ORM documentation.
::: 

Eager loading behaves the same as in a normal Many To Many: Nothing is eager loaded automatically. So we add a
`eagerLoad` field to make sure the tags are loaded automatically with the post or video.

**Models:**
```javascript
class Post extends Model {
  static entity = 'posts';
  static eagerLoad = ['tags'];

  static fields () {
    return {
      id: this.increment(),
      title: this.string(''),
      content: this.string(''),
      tags: this.morphToMany(Tag, Taggable, 'tagId', 'taggableId', 'taggableType')
    }
  }
}

class Video extends Model {
  static entity = 'videos';
  static eagerLoad = ['tags'];

  static fields () {
    return {
      id: this.increment(),
      title: this.string(''),
      url: this.string(''),
      tags: this.morphToMany(Tag, Taggable, 'tagId', 'taggableId', 'taggableType')
    }
  }
}

class Tag extends Model {
  static entity = 'tags';

  static fields () {
    return {
      id: this.increment(),
      name: this.string('')
    }
  }
}

class Taggable extends Model {
  static entity = 'taggables';

  static fields () {
    return {
      id: this.increment(),
      tagId: this.number(0),
      taggableId: this.number(0),
      taggableType: this.string('')
    }
  }
}
```

**Fetch Query For Post (or Video):**
```graphql
query Posts {
  posts {
    nodes {
      id
      title
      content
      
      tags {
        nodes {
          id
          name
        }
      }
    }
  }
}
```
