/**
 * Created by Saad Ahmed on 2/16/2016.
 */
var dynamicScrollModule = angular.module('dynamicScroll', []);

( function DynamicScroll() {
    "use strict";

    dynamicScrollModule
        .directive('dynamicScroll', function () {
            return {
                restrict: 'E',
                scope:  true,
                link: function (scope, elem, attr) {
                    var index       = 0;
                    var displaySize = +attr.mlmDisplaySize;
                    var loadSize    = +attr.mlmLoadSize;
                    var element     = elem[0];
                    var data        = scope.$eval(attr.mlmModel);
                    var outputList  = data.slice(index, displaySize);
                    scope[attr.mlmOutput] = outputList;
                    var doScrollZero = true;

                    var initialTop = element.getBoundingClientRect().top;
                    window.addEventListener('scroll', onScroll);

                    function onScroll() {
                        if(doScrollZero){
                            window.scrollTo(0, 0);
                            doScrollZero = false;
                            return;
                        }
                        if(data.length<=displaySize){
                            return window.removeEventListener('scroll', onScroll);
                        }
                        if( innerContainerBottom()<= windowScrollBottom()){
                            scope.$apply(scrolledDown());
                        } else if(initialTop>=windowScrollUp()){
                            scope.$apply(scrolledUp());
                        }
                    }
                    function scrolledUp(){
                        if(index<=0){
                            return;
                        }
                        var insertion = data.slice(index-loadSize>0 ? index-loadSize : 0, index);
                        outputList.splice(outputList.length-insertion.length, insertion.length);
                        [].unshift.apply(outputList, insertion);
                        index -= insertion.length;
                        setTimeout(scrollByItems, 0, insertion.length);
                    }
                    function scrolledDown(){
                        if(index+displaySize>=data.length){
                            return;
                        }
                        var insertion = data.slice(displaySize+index, displaySize+index+loadSize);
                        outputList.splice(0, insertion.length);
                        [].push.apply(outputList, insertion);
                        index += insertion.length;
                        setTimeout(scrollByItems, 0, -insertion.length);
                    }

                    function scrollByItems(addedLength){
                        window.scrollBy(0, elem[0].querySelector(attr.mlmElement).getBoundingClientRect().height*addedLength);
                    }

                    function windowScrollUp() {
                        return window.scrollY;
                    }

                    function windowScrollBottom() {
                        return window.scrollY + window.innerHeight;
                    }
                    function innerContainerBottom() {
                        return initialTop + element.getBoundingClientRect().height;
                    }

                    scope.$on('$distroy', function(){
                        window.removeEventListener('scroll', onScroll);
                    })

                }
            }
        });
})();