class RestfulAPI {
  constructor (router, controller, passport) {
    this.router = router;
    this.controller = controller;
    this.passport = passport;
  }
  findOneAndUpdate() {
    this.router.route(`/:resourceName/:identifier`)
    .post( this.controller.findOneAndUpdate)
  }
  findAll() {
    this.router.route(`/`)
      .get( this.controller.findAll)
  }
}
module.exports = RestfulAPI;