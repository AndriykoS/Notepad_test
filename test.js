var STICKIES = (function () {
    var openStickies = function openStickies() {

            // console.log(temp_arr[1]);
            console.log("OpenSticky");
            // var row,id,title,text;
            // console.log(temp_arr[0]);

            console.log("Test");

            let ajax_arr = new Array();

            $.ajax({
                url: '/admin/index.cgi?get_index=notepad_show_sticker&header=2&ajax=1&get_stickers=1',
                success: function(result){
                    if(result) {
                        ajax_arr = JSON.parse(result);
                        // for (let i=0; i<ajax_arr.length; i++){
                        //
                        // }
                        for (let i=0; i<ajax_arr.length; i++){
                            console.log(ajax_arr[i]);
                            createSticky(ajax_arr[i]);
                        }

                        // console.log(JSON.parse(ajax_arr));
                    }
                }
            });


            // for (let i=0; i<temp_arr.length; i++){
            //     if (localStorage.getItem(temp_arr[i])){
            //         createSticky(localStorage.getItem(temp_arr[i]));
            //         console.log(localStorage.getItem(temp_arr[i]))
            //     }
            // }

            console.log(JSON.parse(localStorage.getItem("sticky-1351")));
        },
        searchKey = function searchKey(array) {
            let sticky_array = new Array();
            for (let i=0; i<array.length; i++){
                if (array[i].match("sticky-")) sticky_array.push(array[i]) ;
            }
            for (let i=0; i<sticky_array.length; i++) return sticky_array;
            return -1;
        },
        createSticky = function createSticky(data) {
            console.log("CreateSticky");
            data = data || { id : data.sticker_id, top : "40px", left : "40px"   };
            let arr = new Array();
            let temp_arr = new Array();
            for (let i = 0; i < localStorage.length; i++) {
                arr.push(localStorage.key(i));
                // alert(arr[i]);
            }
            temp_arr = searchKey(arr);
            console.log(data.top);

            for (let i=0; i<temp_arr.length; i++){
                if (data.sticker_id==temp_arr[i]){
                    let temp = JSON.parse(localStorage.getItem(data.sticker_id));
                    console.log(temp);
                    data.top = temp.top;
                    data.left = temp.left;
                }
            }
            console.log(data);
             //+new Date()
            return $("<div />", {
                "class" : "sticky",
                'id' : data.sticker_id
            })
                .prepend($("<div />", { "class" : "sticky-header"} )
                    .append($("<span />", {
                        "class" : "sticky-status",
                        click : saveSticky
                    }))
                    .append($("<span />", {
                        html : data.sticker_title,
                        "class" : "title",
                        keypress : markUnsaved
                    }))
                    .append($("<span />", {
                        "class" : "close-sticky",
                        text : "X",
                        click : function () { deleteSticky($(this).parents(".sticky").attr("id")); }
                    }))
                )
                .append($("<div />", {
                    html : data.sticker_text,
                    "class" : "sticky-content",
                    keypress : markUnsaved
                }))
                .draggable({
                    handle : "div.sticky-header",
                    stack : ".sticky",
                    start : markUnsaved,
                    stop  : saveSticky
                })
                .css({
                    position: "absolute",
                    "top" : data.top,
                    "left": data.left
                })
                .focusout(saveSticky)
                .appendTo(document.body);
        },
        deleteSticky = function deleteSticky(id) {
            console.log("DeleteSticky");
            localStorage.removeItem(id); //"sticky-" +
            $("#" + id).fadeOut(200, function () { $(this).remove(); });
        },
        saveSticky = function saveSticky() {
            console.log("SaveSticky");
            let that = $(this), sticky = (that.hasClass("sticky-status") || that.hasClass("sticky-content")) ? that.parents('div.sticky'): that,
                obj = {
                    id: sticky.attr("id"),
                    top: sticky.css("top"),
                    left: sticky.css("left"),
                    text: sticky.children(".sticky-content").html(),
                    title: sticky.children(".sticky-header").children(".title").html()
            };
            console.log("Title"+sticky.children(".sticky-header").children(".title").html());
            localStorage.setItem(obj.id, JSON.stringify(obj)); //"sticky-" +
            sticky.find(".sticky-status").text("Saved");
        },
        markUnsaved = function markUnsaved() {
            var that = $(this), sticky = that.hasClass("sticky-content") ? that.parents("div.sticky") : that;
            sticky.find(".sticky-status").text("Unsaved");
        };
    return {
        open   : openStickies,
        "new"  : createSticky,
        remove : deleteSticky
    };

}());
