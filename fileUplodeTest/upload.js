
angular.module('app',['angularFileUpload'])
     .controller('UploaderController', ['$scope', 'FileUploader', function($scope, FileUploader) {
        
        $scope.test = "yxnne test";
        //构造你的uploader对象
        var uploader = $scope.uploader = new FileUploader({
            url: 'upload.php'   //这里是未来需要上传的url
        });

        // FILTERS
        //数量的限制
        uploader.filters.push({
            name: 'customFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 3;
            }
        });
        //大小也可以限制
        uploader.filters.push({
            name: 'compressFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                console.log("compressFilter----------\n"+item);
                return item._file.size < 1048576;
            }
        });


        // CALLBACKS
        // 下面是各种事件的回调

        //选择文件失败时回调
        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
            //因为过滤器中设置了最大个数，那么如果添加第4张的时候，一定添加不成功
            //所以本方法回调
            if (this.queue.length  == 3) {

                alert("猫娃儿，我设置了不能大于三幅图");
            }

        };
        //添加单张完成回调
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);

        };
        //添加所有完成回调
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        //下面的应该和上传有关了我没有研究
        //但是每个时机都输出了log，到时候可以验证
        //上传之前回调
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);


        // -------------------------------


        var controller = $scope.controller = {
            isImage: function(item) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        };

    }]);
