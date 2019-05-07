const contexts = ctxs => {
  const result = [];
  ctxs.keys().forEach(function(item) {
    const mode = ctxs(item);
    result.push(mode.default || mode);
  });
  return result;
};
export default contexts(require.context('./', true, /(?<!index).js$/));
