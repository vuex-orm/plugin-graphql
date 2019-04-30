# Eager Loading and Saving

[[toc]]


## Eager Loading

All `belongsTo`, `hasOne` and `morphOne` related records are eager loaded when `fetch` is called.
All other related records have to be added to a static field in the model called `eagerLoad` to
have them eagerly loaded with fetch.

Example:

```javascript{3}
class User extends Model {
  static entity = 'users';
  static eagerLoad = ['posts'];

  static fields () {
    return {
      id: this.attr(null),
      name: this.attr(''),
      
      posts: this.hasMany(Post, 'userId')
    }
  }
}
```

## Eager Saving

Similar to the eager loading there is a "eager saving". When saving (via `$persist` or `$push`) a
record will automatically sends all `belongsTo` related records too to the server.

All other related records have to be added to a static field in the model called `eagerSave` to
have them eagerly saved with persist and push.

```javascript{4}
class User extends Model {
  static entity = 'users';
  static eagerLoad = ['posts'];
  static eagerSave = ['posts'];

  static fields () {
    return {
      id: this.attr(null),
      name: this.attr(''),
      
      posts: this.hasMany(Post, 'userId')
    }
  }
}
```


## Eager Syncing

`eagerSync` combines these two fields. Adding a relation to this array will make it eagerly loaded
and saved:


```javascript{3}
class User extends Model {
  static entity = 'users';
  static eagerSync = ['posts'];

  static fields () {
    return {
      id: this.attr(null),
      name: this.attr(''),
      
      posts: this.hasMany(Post, 'userId')
    }
  }
}
```
