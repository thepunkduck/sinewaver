
        function showAxes(ctx,axes) {
            var width = ctx.canvas.width;
            var height = ctx.canvas.height;
            var xMin = 0;

            ctx.beginPath();
            ctx.strokeStyle = "rgb(128,128,128)";

            // X-Axis
            ctx.moveTo(xMin, height/2);
            ctx.lineTo(width, height/2);

            // Y-Axis
            ctx.moveTo(width/2, 0);
            ctx.lineTo(width/2, height);

            // Starting line
            ctx.moveTo(0, 0);
            ctx.lineTo(0, height);

            ctx.stroke();
        }
        function drawPoint(ctx, y) {
            var radius = 3;
            ctx.beginPath();

            // Hold x constant at 4 so the point only moves up and down.
            ctx.arc(4, y, radius, 0, 2 * Math.PI, false);

            ctx.fillStyle = 'red';
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.stroke();
        }
        function plotWiggle(ctx, phase, frequency,nz, style) {
            var width = ctx.canvas.width;
            var height = ctx.canvas.height;

            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = style;


            var x = 4;
            var y = 0;
            var y2 = 0;
            var amplitude = height/2;


            while (x < width) {
                y =  amplitude/2 * Math.sin(phase+x/15);
                y2 = amplitude/2 * Math.sin(phase*1.7+x/27);
                y = y + y2 + height/2 ;

                if (nz>0)
                {
                    y += (Math.random() * nz / 1);
                }

                ctx.lineTo(x, y);
                x++;
                 }
            ctx.stroke();
            ctx.save();



        }


        function plotSine(ctx, xOffset, frequency, style) {
            var width = ctx.canvas.width;
            var height = ctx.canvas.height;

            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = style; //"rgb(66,44,255)";


            var x = 4;
            var y = 0;
            var amplitude = height/2.1;
            while (x < width) {
                y = height/2 +  amplitude * Math.sin(frequency*(x+xOffset));
                ctx.lineTo(x, y);
                x++;
               }
            ctx.stroke();
            ctx.save();


            ctx.stroke();
            ctx.restore();
        }

        var phase = 0.0;
        var min = -0.03;
        var max = 0.03;
        var inc = 0.01;
        var noise = 0;
        function draw() {
            var canvas = document.getElementById("canvas");
            var context = canvas.getContext("2d");
            canvas.width = window.innerWidth-20;
            canvas.height = 200;
            var w = canvas.width;
            var h = canvas.height;
            context.clearRect(0, 0, w, h);
            showAxes(context);
            context.save();

            plotWiggle(context, phase, 30, noise, "rgb(170,170, 255)");
            plotWiggle(context, phase*3, 20, noise, "rgb(173,255,47)");

            context.restore();

            // decay
            noise--;
            if (noise<0) {noise=0;}
            phase += inc;

            inc /= 1.02;
           if (inc<0.0001) { inc = 0.0; }

            if (phase>Math.PI*2) phase -= Math.PI*2;
            if (phase<0) phase += Math.PI*2;

            showOut();
            window.requestAnimationFrame(draw);
        }



        function spirograph() {
            var canvas2 = document.getElementById("canvas2");
            var context = canvas2.getContext("2d");

            canvas2.width = window.innerWidth-20;
            canvas2.height = 200;

            var w = canvas.width;
            var h = canvas.height;
            context.clearRect(0, 0, w, h);
            showAxes(context);
            context.save();

            var step = canvas.height/5;
            for (var i = -4; i < canvas.height; i += step) {
                plotSine(context, i, sinFrq, "rgb(255, 255, 0)");
            }
        }


        function resizeCanvas() {
            spirograph();
        }

      var  sinFrq = 0.01;
       var mX, mY;
        function myFunctionC1(e) {
                mX = e.clientX;
                mY = e.clientY;
                inc *= 1.08;
                if (inc == 0) inc = 0.01;
                if (inc > 0.3) {inc=0.3;}
                if (inc >= 0.3) noise = 30;
                showOut();
            }

            function myFunctionC2(e) {
                mX = e.clientX;
                mY = e.clientY;
                var minF = 0.01;
                var maxF = 0.04;
                var w = document.getElementById("canvas2").width
                sinFrq = (maxF-minF)*(mX/w) + minF;
                spirograph();
                showOut();
            }

            function showOut()
            {
                var coor = "Coordinates: (" + mX + "," + mY + ") inc:" + inc.toFixed(3)
                 + " Freq:"+(100*sinFrq).toFixed(2);
                document.getElementById("demo").innerHTML = coor;

            }
        function init() {
            window.requestAnimationFrame(draw);
            window.addEventListener('resize', resizeCanvas, false);

            document.getElementById("canvas")
            .addEventListener("mousemove", function(event) {
                        myFunctionC1(event);
                        });

            document.getElementById("canvas2")
            .addEventListener("mousemove", function(event) {
                        myFunctionC2(event);
                        });


            spirograph();
        }




    var xValues = [100,200,300,400,500,600,700,800,900,1000];

    new Chart("myChart", {
    type: "line",
    data: {
        labels: xValues,
    datasets: [{
      data: [860,1140,1060,1060,1070,1110,1330,2210,7830,2478],
      borderColor: "red",
      fill: false
    }, {
        data: [1600,1700,1700,1900,2000,2700,4000,5000,6000,7000],
        borderColor: "green",
        fill: false
    }, {
        data: [300,700,2000,5000,6000,4000,2000,1000,200,100],
        borderColor: "blue",
        fill: false
    }]
},
options: {
    legend: {display: false}
}
});