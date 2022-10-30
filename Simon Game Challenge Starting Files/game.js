var buttonColours = ["red", "blue", "green", "yellow"];  //Tạo 4 giá trị màu của 4 div button

var gamePattern = [];  // Chứa danh sách thứ tự các màu được thêm vào ở mỗi level

var userClickedPattern = [];   //chứa danh sách các nút người dùng nhấn và lưu nó

var started = false;  //biến bắt đầu ban đâu bằng 0

var level = 0;  //level ban đầu bằng 0

$(document).keydown(function() {  //khi nhấn phím bất kỳ thì thực hiện bên trong nó
    if (!started) // thực hiện bên trong if
    {
        $("h1").text("Level " + level);  //level ban đầu 
        nextSequence();  //hàm thực hiện tiếp theo
        started = true; 
    }
});

$(".btn").click(function() {  //nãy sai vì lấy thẳng id mà k có sự kiện được thực hiện
    //có event click vào 1 button thì mới lấy được id của button đó
    
    var userChosenColour = $(this).attr("id"); //get attribute: lấy giá trị id của button vừa nhấp

    userClickedPattern.push(userChosenColour);  // thêm nó vào list người dùng click 

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel) {  //nó sẽ luôn luôn kiểm tra từng giá trị của 2 list so với nhau
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {  // nếu độ dài hai cái chưa bằng nhau thì ta phải tiếp
            setTimeout(function() {     // tục click
                nextSequence();
            }, 1000);
        }
    }
    else {

        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
        
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function nextSequence() {
    //Ban đầu reset list người dùng nhấn
    userClickedPattern = [];
    level++;  //tăng level
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);  //Tạo một số ngẫu nhiên từ 0 đến 3 là trùng với chỉ mục arr của
                                                        // array màu, để dễ lấy màu

    var randomChosenColour = buttonColours[randomNumber];  //Lấy màu ngẫu nhiên để hiển thị cho người chơi xem

    gamePattern.push(randomChosenColour);  // thêm màu vừa lấy ngẫu nhiên vào list, theo level sẽ theo thứ tự

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);  // Khi nút được random ngầu nhiên sẽ
                                                                                // được select và có hiệu ứng

    playSound(randomChosenColour);
}



function animatePress(currentColour) {

    $("." + currentColour).addClass("pressed");   // có thể dùng class hay id ở đây cũng đc vì giá trị của id bằng 
    //                                               giá trị của class
    //khi nút nhấn thì hiệu ứng hiện lên r lại tắt
    setTimeout(function() {
        $("." + currentColour).removeClass("pressed");
    }, 100);  //sau 100ms thì remove class vừa thêm vào

}


function playSound (name) {
    // 2 dòng dưới là hiệu ứng âm thanh khi nút được chọn ngẫu nhiên
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}


//Một số chỗ chưa tối ưu như select đến phần tử h1 hay button, chúng ta có thể select qua id của nó (ví dụ dòng số 60)
// function hàm dòng 75 đến 86 nên select qua id có tên màu, ví id là duy nhất