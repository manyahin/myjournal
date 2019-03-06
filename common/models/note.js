'use strict';

module.exports = function(Note) {

  Note.beforeRemote('create', function(ctx, note, next) {
    // trim input body
    ctx.args.data.body = ctx.args.data.body.trim()

    next()
  })

  Note.afterRemote('create', async function(ctx, data) {
    // attach the count of symbols that was in note 
    data.count_symbols = ctx.args.data.body.length
    
    // attach the id of last note
    // data.note_id = await Note.count()

    return
  })
};
