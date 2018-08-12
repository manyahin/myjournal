module.exports = function(Note) {

  Note.afterRemote('create', async function(ctx, data) {
    // attach the count of symbols that was in note 
    data.count_symbols = ctx.args.data.body.length
    
    // attach the id of last note
    data.note_id = await Note.count()

    return
  })
};
