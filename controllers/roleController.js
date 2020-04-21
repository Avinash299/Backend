
let Role = require("../models/role");
module.exports = {
  addRole: addRole,
  getRole: getRole,
  getRoleById:getRoleById
}


function addRole(req, res) {
    var newRole = new Role(req.body);
    newRole.save(function (err) {
      if (err) {
        return res.json({ success: false, msg: 'Role already exists.' });
      } else {
        res.json({ success: true, data:newRole,msg: 'Successful created new role.' });
      }
    });
};
function getRole(req, res) {
    Role.find({},{name:1,active:1}, function (err, result) {
    if (err) {
      return res.json({ success: false, msg: 'Problem in fetching roles.' });
    } else {
      res.json({ success: true, data: result, msg: 'Successful roles fetched.' });
    }
  });
}
function getRoleById(req, res) {
  let id=req.params.id;
  Role.findOne({_id:id}, function (err, result) {
  if (err) {
    return res.json({ success: false, msg: 'Problem in fetching roles.' });
  } else {
    res.json({ success: true, data: result, msg: 'Successful roles fetched.' });
  }
});
}