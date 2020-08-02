/**
 * Created by plter on 2016/12/24.
 */

angular.module("app").component("comment", {
    templateUrl: "/js/article/comment.template.htm",
    controller: function ($scope, $http) {
        $scope.currentArticleId = nblog.pageInfo.currentArticleId;

        function addListeners() {
            $scope.formCommentSubmitHandler = function () {
                $http.post(
                    nblog.ServerApiUrls.COMMENT_ADD,
                    {
                        article_id: $scope.currentArticleId,
                        comment_content: $scope.content
                    }
                ).then(function (result) {
                    switch (result.data.code) {
                        case 1:
                            nblog.showAlert("提交评论成功", nblog.AlertLevel.SUCCESS, 3000);
                            loadComments();
                            break;
                        case 20002:
                            nblog.showAlert("你需要登陆才能发表评论", nblog.AlertLevel.WARNING, 3000);
                            break;
                        default:
                            nblog.showAlert("未知错误");
                            break;
                    }
                });
            }
        }

        function loadComments() {
            $http.post(
                nblog.ServerApiUrls.COMMENT_GET,
                {article_id: $scope.currentArticleId}
            ).then(function (result) {
                console.log(result);

                if (result.data.code == 1) {
                    $scope.comments = result.data.result;
                }
            });
        }

        function init() {
            addListeners();
            loadComments();
        }

        init();
    }
});