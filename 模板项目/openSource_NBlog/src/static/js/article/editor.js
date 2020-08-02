/**
 * Created by plter on 2016/12/23.
 */
(function () {
    var editor = $(".editor");
    var content = editor.find(".content");
    var formAddArticle = $(".form-add-article");
    var selectImageDialog = $("#select-image-dialog");
    var imageListContainer = selectImageDialog.find(".image-list-container");
    var imageFileInput = $("#image-file-input");
    var imagePreview = $(".image-preview");
    var btnAddImageToArticle = selectImageDialog.find(".btn-add-image-to-article");
    var currentImagePath;
    var imageWidthInput = selectImageDialog.find(".image-width-input");
    var imageHeightInput = selectImageDialog.find(".image-height-input");


    function generateImageList(images) {
        var html = "<ul>";
        for (var i = 0; i < images.length; i++) {
            var image = images[i];
            html += "<li><a class='btn-preview-image' href='" + image.path + "'>" + image.name + "</a></li>";
        }

        html += "</ul>";
        imageListContainer.html(html);

        //preview the first image
        previewImage(images[0].path);

        $(".btn-preview-image").click(function (e) {
            e.preventDefault();

            previewImage(this.href);
        });
    }

    function previewImage(imageUrl) {
        currentImagePath = imageUrl;
        btnAddImageToArticle.show();
        imagePreview.html("<img class='preview-image' src='" + imageUrl + "'>");
        $(".preview-image").on("load", function () {
            imageWidthInput.val(this.width);
            imageHeightInput.val(this.height);
            if (this.width > 400) {
                this.width = 400;
            }
        });
    }

    function loadImages() {
        $.post(nblog.ServerApiUrls.MEDIA_GET, {media_type: "image"}).done(function (data) {
            switch (data.code) {
                case 1:
                    var images = data.result;
                    if (images && images.length) {
                        generateImageList(images);
                    } else {
                        imageListContainer.html("<div>没有图片</div>");
                    }
                    break;
                default:
                    imageListContainer.html("<div style='color: red'>无法获取图片</div>");
                    break;
            }
        }).fail(function (e) {
            imageListContainer.html("<div style='color: red'>无法连接服务器</div>");
        });
    }

    function showMedias() {
        selectImageDialog.modal();

        loadImages();
    }

    function btnAddImageClickedHandler(e) {
        e.preventDefault();

        showMedias();
    }

    function imageFileInputChangeHandler(e) {
        if (this.files && this.files.length) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = "json";
            xhr.onload = function () {
                console.log(xhr.response);

                switch (xhr.response.code) {
                    case 1:
                        loadImages();
                        break;
                    default:
                        alert("上传失败");
                        break;
                }
            };
            xhr.open("POST", nblog.ServerApiUrls.MEDIA_UPLOAD);
            xhr.send(new FormData(document.querySelector("#upload-image-form")));
        }
    }

    function formAddArticleSubmitHandler(e) {
        e.preventDefault();

        var title = this["title"].value;
        var content = formAddArticle.find(".content").html();

        if (!content || content.trim() == "") {
            nblog.showAlert("请填写文章内容", nblog.AlertLevel.WARNING, 3000);
            return;
        }

        $.post(nblog.ServerApiUrls.ARTICLE_ADD, {
            title: title,
            content: content
        }).done(function (data) {
            console.log(data);

            switch (data.code) {
                case 1:
                    nblog.showAlert("文章保存成功", nblog.AlertLevel.SUCCESS, 3000);
                    break;
                case 30003:
                    nblog.showAlert("你没有权限修改文章", nblog.AlertLevel.WARNING, 5000);
                    break;
                default:
                    nblog.showAlert("无法保存文章，请稍候重试", nblog.AlertLevel.WARNING, 3000);
                    break;
            }
        }).fail(function (err) {
            nblog.showAlert("无法连接服务器", nblog.AlertLevel.DANGER);
        });
    }

    function addListeners() {
        $(".btn-add-ul").click(function (e) {
            e.preventDefault();
            content.append("<ul><li></li></ul>");
        });
        editor.find(".btn-add-ol").click(function (e) {
            e.preventDefault();
            content.append("<ol><li></li></ol>");
        });

        editor.find(".btn-add-image").click(btnAddImageClickedHandler);
        formAddArticle.submit(formAddArticleSubmitHandler);
        imageFileInput.change(imageFileInputChangeHandler);
        selectImageDialog.find(".btn-select-image").click(function (e) {
            imageFileInput.click();
        });
        btnAddImageToArticle.click(function (e) {
            //hide the select image dialog
            selectImageDialog.modal("hide");
            content.append("<img width='" + imageWidthInput.val() + "' height='" + imageHeightInput.val() + "' src='" + currentImagePath + "'>");
        });
    }

    function init() {
        addListeners();
    }

    init();
})();