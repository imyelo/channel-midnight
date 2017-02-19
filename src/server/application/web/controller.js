exports.app = function *() {
  if (!/^\/\?/.test(this.originalUrl)) {
    return this.redirect('/?');
  }

  yield this.render('main/index.ejs', {})
}
