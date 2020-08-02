/**
 * Created by plter on 2016/12/25.
 */


const Status = require("./Status");
const multer = require("multer");
const MediaFilesDestDir = "uploads/media";
const precheck = require("./precheck");

const multerUploader = multer({
    dest: `static/${MediaFilesDestDir}`
});

class Media {
    constructor(router) {

        this._router = router;
        this.configUploadMediaApi();
        this.configMediaGetApi();
    }

    configUploadMediaApi() {
        this.router.post("/media/upload",
            precheck.checkIfUserLogged,
            multerUploader.single("file"),
            async function (req, res) {
                try {
                    let media = await req.models.Media.qCreate({
                        user_id: req.session.currentUserId,
                        name: req.file.originalname,
                        path: `/${MediaFilesDestDir}/${req.file.filename}`,
                        type: "image",
                        creation_time: new Date()
                    });

                    res.json(Status.makeOkResult(media));
                } catch (err) {
                    res.json(Status.makeResultFromOrmError(err));
                }
            }
        );
    }

    configMediaGetApi() {
        this.router.post("/media/get",
            precheck.checkMediaTypeInput,
            async function (req, res) {
                try {
                    let medias = await req.models.Media.qFind(
                        {type: req.body.media_type}, ["creation_time", "Z"]);
                    res.json(Status.makeOkResult(medias));
                } catch (err) {
                    res.json(Status.makeResultFromOrmError(err));
                }
            }
        );
    }


    get router() {
        return this._router;
    }
}


module.exports = Media;