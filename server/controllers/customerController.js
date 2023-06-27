// get homepage
exports.homepage = async (req, res) => {
  const locals = {
    title: 'NodeJs',
    description: 'Free NodeJS User Management System'
  };

  res.render('index', locals);
};
