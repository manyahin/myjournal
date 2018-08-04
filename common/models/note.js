module.exports = function(Note) {

  Note.afterRemote('create', async function(ctx, data) {
    // attach the count of inserted letters
    data.count_symbols = ctx.args.data.body.length
    
    // attach the count of notes
    data.note_id = await Note.count()

    return
  })
};
