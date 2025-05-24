const knex = require("../db/db");
const User = require("./User");
const Post = require("./Post")

class UserPost {
    constructor({user, posts}) {
        this.user = user; 
        this.posts = posts;
    }

    getPostCount() {
        return this.posts.length; // Gets the number of posts per User.
    }

    getLatestPost() {
        return this.posts[0] // Assumes the posts are ordered by date.
    }

// Finds all the users that have posted about a specific community challenge. 
 static async findUsersAndPostByChallengeId(challengeId) {
    try {
      const results = await knex('users')
      .select(
        'users.id', 
        'users.username',
        'users.level',
        'users.exp', 
        'posts.postId', 
        'posts.content',
        'posts.createdAt', 
        'posts.userId'
      )
      .join('posts', 'users.id', '=', 'posts.userId')
      .where('posts.challengeId', challengeId)
      .orderBy('posts.createdAt', 'desc');

      // Organize results by user
      const userMap = new Map();

      results.forEach(row => {

      // Checks whether the userPost was already created.
        if(!userMap.has(row.id)) {
           const user =  new User({
                id: row.id, 
                username: row.username, 
                password_hash: null,
                exp: row.exp, 
                level: row.level
            }); 
        // Adds that userPost instance to the map with the user object.
        userMap.set(row.id, new UserPost({
         user,
         posts: []
       }))     
        }
      // Creates a post instance. 
       const post = new Post({
        postId: row.postId, 
        userId: row.userId, 
        content: row.content, 
        createdAt: row.createdAt
        })
        // Add posts to the userPost array. 
        const userPost = userMap.get(row.id);
        userPost.posts.push(post);
      })

      // Convert the Map to array of users with their posts 
      return Array.from(userMap.values());
    } catch(error) {
        console.error('Error finding users and posts by challenge ID', error);
    }
    return 
   }
}

module.exports = UserPost;