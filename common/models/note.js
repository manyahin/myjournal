module.exports = function(Note) {
  Note.observe('after save', async function(ctx) {
    return;
  });
};
