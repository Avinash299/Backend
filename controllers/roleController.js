
let Role = require("../models/role");
module.exports = {
  addRole: addRole,
  getRole: getRole,
  getRoleById:getRoleById,
  deactiveRole:deactiveRole,
  deleteRole:deleteRole,
  updateRole:updateRole
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
function deleteRole(req, res) {
  Role.remove({ _id: req.params.id }, function (err) {
    if (err) {
      return res.json({ success: false, msg: 'Deletion failed.' });
    } else {
      res.json({ success: true, msg: 'Successfully deleted.' });
    }
  });
}
function deactiveRole(req, res) {
  Role.update({ _id: req.params.id }, { "$set": { active: req.params.value } }, function (err) {
    if (err) {
      return res.json({ success: false, msg: 'Updation failed.' });
    } else {
      res.json({ success: true, msg: 'Successfully updated.' });
    }
  });
}

function updateRole(req, res) {
  if (!req.params.id) {
    res.json({ success: false, msg: 'Role not found.' });
  } else {
    let updateInfo = {
      name: req.body.name,
      chartPermission: req.body.chartPermission,
      dashboardPermission: req.body.dashboardPermission,
      userPermission: req.body.userPermission,
    }
    Role.update({ _id: req.params.id }, { "$set": updateInfo }, function (err, result) {
      if (err) {
        return res.json({ success: false, msg: 'Role updation failed.' });
      } else {
        res.json({ success: true, data: updateInfo, msg: 'Successful updated role.' });
      }
    });
  }
};