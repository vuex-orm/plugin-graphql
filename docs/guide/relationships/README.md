# Relationships

[[toc]]

This chapter describes how the Apollo-Plugin interacts with relationships. All relationships work out of the box.

## BelongsTo

Is eager loaded automatically.

**Models:**
```javascript
class Comment extends Model {
  static entity = 'comments';

  static fields () {
    return {
      id: this.increment(),
      postId: this.attr(null),
      content: this.attr(''),
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
```

**Fetch Query for Post:**
```graphql
query Posts {
  posts {
    id
    content
    title
  }
}
```


## HasOne

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
      userId: this.attr(null),
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
```

**Fetch Query for Profile:**
```graphql
query Users {
  profiles {
    nodes {
      id
      age
      sex
      userId
      
      users {
        id
        name
      }
    }
  }
}
```


## HasMany

Is NOT eager loaded automatically.

**Models:**
```javascript
TODO
```

**Fetch Query:**
```graphql
TODO
```


## HasManyThrough

Is NOT eager loaded automatically.

**Models:**
```javascript
TODO
```

**Fetch Query:**
```graphql
TODO
```


## MorphMany and MorphOne

Is NOT eager loaded automatically.

**Models:**
```javascript
TODO
```

**Fetch Query:**
```graphql
TODO
```

## Polymorph Many to Many

Is NOT eager loaded automatically.

**Models:**
```javascript
TODO
```

**Fetch Query:**
```graphql
TODO
```


::: danger
**TODO:**

- Example Queries
:::
