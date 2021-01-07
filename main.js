var current_position_of_touch_x, current_position_of_touch_y;
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    preview = document.getElementById("preview");
    ctx2 = preview.getContext("2d");
    var width = screen.width;
    var height = screen.height;
    new_width = screen.width;
    new_height = screen.height - 430;
    var saved_sketch;

    if (width < 992) {
        canvas.width = new_width;
        canvas.height = new_height;
        preview.width = new_width;
        preview.height = new_height;
        document.body.style.overflow = "hidden";
    }

    bg_color = "white";
    color = "black";
    width_of_line = 1;
    radius = 10;

    background();
    all_move();

    canvas.addEventListener("touchstart", my_touchstart);
    function my_touchstart(e) {
        console.log("my_touchstart")
        color = document.getElementById("color").value;
        width_of_line = document.getElementById("width_of_line").value;
        radius = document.getElementById("radius").value;
        current_position_of_touch_x = e.touches[0].clientX - canvas.offsetLeft;
        current_position_of_touch_y = e.touches[0].clientY - canvas.offsetTop;
        console.log("Current position of x and y coordinates = ");
        console.log("x  = " + current_position_of_touch_x + "y = " + current_position_of_touch_y);
        ctx.strokeStyle = color;
        ctx.lineWidth = width_of_line;
        ctx.beginPath();
        ctx.arc(current_position_of_touch_x, current_position_of_touch_y, radius, 0, 2 * Math.PI);
        ctx.stroke();
    }

    function clearArea() {
        document.getElementById("color").value = "#000000";
        document.getElementById("width_of_line").value = 1;
        document.getElementById("radius").value = 10;
        document.getElementById("colorbox").style.backgroundColor = "#000000";
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx2.clearRect(0,0,preview.width,preview.height);
        console.clear();
        background();
        all_move();
    }

    function cclick(){
        document.getElementById("color").click();
    }

    function colorc(){
        document.getElementById("colorbox").style.backgroundColor = document.getElementById("color").value;
        all_move();
    }

    document.getElementById("width_of_line").addEventListener("touchstart", all_touchstart);
    document.getElementById("width_of_line").addEventListener("touchend", all_touchend);
    document.getElementById("radius").addEventListener("touchstart", all_touchstart);
    document.getElementById("radius").addEventListener("touchend", all_touchend);

    function all_touchstart(){
        preview.style.visibility = "visible";
    }

    function all_touchend(){
        preview.style.visibility = "hidden";
    }

    function background(){
        ctx.beginPath();
        ctx.lineWidth = "10";
        ctx.fillStyle = bg_color;
        ctx.rect(0,0,canvas.width,canvas.height);
        ctx.fill();
    }

    function all_move(){
        ctx2.clearRect(0,0,canvas.width,canvas.height);
        ctx2.strokeStyle = document.getElementById("color").value;
        ctx2.lineWidth = document.getElementById("width_of_line").value;
        ctx2.beginPath();
        ctx2.arc(new_width/2, new_height/2, document.getElementById("radius").value, 0, 2 * Math.PI);
        ctx2.stroke();
    }

    function saveImagePng(){
        const a = document.getElementById("a");
        a.href = canvas.toDataURL("image/png");
        a.download = "My Canvas Sketch";
        a.click();
    }

    function saveImageJpg(){
        const a = document.getElementById("a");
        a.href = canvas.toDataURL("image/jpeg");
        a.download = "My Canvas Sketch";
        a.click();
    }
