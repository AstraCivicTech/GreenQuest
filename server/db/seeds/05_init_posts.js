/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {

  const now = new Date().toISOString();

  // Deletes ALL existing entries
  await knex('posts').del();

 //Resets auto-incrementing ID.
 await knex.raw('ALTER SEQUENCE "posts_postId_seq" RESTART WITH 1');

  try {
   const inserted = await knex('posts').insert([
      {userId: 1, content: 'Type something here...',imageUrl:null, createdAt:now, updated_at:now, challengeId: 4},
      {userId: 2, content: 'Type something here...',imageUrl:null, createdAt:now, updated_at:now, challengeId: 4}, 
      {userId: 1, content: 'Type something here...',imageUrl:null, createdAt:now, updated_at:now, challengeId: 6}
    ]).returning('*');
    console.log('Seeding Successful', inserted);
  } catch(error){
    console.error('Seeding Failed',error);
  }
};
