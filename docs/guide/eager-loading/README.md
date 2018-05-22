# Eager Loading

All `belongsTo` and `hasOne` related entities are eager loaded when `fetch` is called. All other related entities have to 
be added to a static field in the model called `eagerLoad` to have them eagerly loaded with fetch.

Example:

```javascript
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
