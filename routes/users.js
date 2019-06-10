var express = require("express");
var router = express.Router();

const { register, login, logout } = require("../controllers/TaiKhoan");
const { UserValidator, LoginValidator } = require("../validators/validator");

router.post("/register", UserValidator, register);

/* POST Login */
router.post("/login", LoginValidator, login);

/* GET Logout */
router.get("/logout", logout);

// upload muli file
router.post("/upload", (req, res, next) => {
if (req.files) {
    var file = req.files.file;
    const data = [];
    console.log(file);
    var time = new Date()
        .toJSON()
        .slice(0, 19)
        .replace(/[-T:]/g, "");
    for (var i = 0; i < file.length; i++) {
        console.log(file[i].name);
        file[i].mv(
        `${__dirname}/../public/AnhXe/${time}-${file[i].name}`,
        function(err) {
            if (err) {
                return res.send(err);
            }
        }
        );
        data.push(`public/AnhXe/${time}-${file[i].name}`);
    }
    return res.send(data);
}
});

// upload single file
router.post("/uploadsingle", (req, res, next) => {
let imageFile = req.files.file;
console.log(imageFile);
var time = new Date()
    .toJSON()
    .slice(0, 19)
    .replace(/[-T:]/g, "");
imageFile.mv(
    `${__dirname}/../public/AnhDaiDien/${time}-${imageFile.name}`,
    function(err) {
        if (err) {
        return res.status(500).send(err);
        }
        res.json({ file: `public/AnhDaiDien/${time}-${imageFile.name}` });
    }
);
});

module.exports = router;
