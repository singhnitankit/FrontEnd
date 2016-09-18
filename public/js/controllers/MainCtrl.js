angular.module('MainCtrl', []).controller('MainController', function($scope,$http) {

    $scope.tagline = 'To the moon and back!'; 
    $scope.pushing = {};
    $scope.searchText = String.EMPTY;
    $scope.likeCountById = [];
    $scope.likeCountById =(localStorage.getItem('likes')!=null)? JSON.parse(localStorage.getItem('likes')):[];
    $scope.loadingData = true;
    
    $scope.pushingData = function(){
        $http.post('https://hackerearth.0x10.info/api/one-push?type=json&query=push&title='+$scope.pushing.title+'&url='+
                   $scope.pushing.url_address+'&tag='+$scope.pushing.tag).then(function(result){
            console.log(result.data);
        });
    }
    
    $scope.like = function(x){
        $scope.likeCountById[x]++;
        localStorage.setItem('likes',JSON.stringify($scope.likeCountById));
    }
     $http.get('https://hackerearth.0x10.info/api/one-push?type=json&query=list_websites').
        then(function(response) {
            $scope.linksData = response.data.websites;
            $scope.totalData = $scope.linksData.length;
            angular.forEach($scope.linksData,function(value,key){
                if($scope.likeCountById[value.id] == null){
                   $scope.likeCountById[value.id] = 0; 
                   
                }
                $scope.loadingData = false;
            });
         localStorage.setItem('likes',JSON.stringify($scope.likeCountById));
        });
});