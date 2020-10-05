var sp = [
    //['0',       '1',    '2',     '3',   4,     5],
    //['company', 'name', 'title', 'img', jelen, beszelt],
    ['WUP', 'Kovács Zsombor', 'Manual Tester', 'zskovacs.png', true, false],
    ['WUP', 'Bíró Gáspár', 'Automata tester', 'gbiro.png', true, false],
    ['WUP', 'Bodnár Kristóf', 'DevOps', 'kbodnar.png', true, false],
    ['WUP', 'Wolff Péter', 'Business Consultant', 'pwolff.png', true, false],
    ['WUP', 'Száraz Ferenc', 'Business Consultant', 'fszaraz.png', true, false],
    ['WUP', 'Szigeti Erik', 'Backend fejlesztő', 'eszigeti.png', true, false],
    ['WUP', 'Mészáros Patrik', 'Backend fejlesztő', 'pmeszaros.png', true, false],
    ['WUP', 'Rausz Dániel', 'Backend fejlesztő', 'drausz.png', true, false],
    ['WUP', 'Novák Béla', 'Backend fejlesztő', 'bnovak.png', true, false],
    ['WUP', 'Bederna Attila', 'Backend fejlesztő, TL', '', true, false],
    ['WUP', 'Vaszil Ádám', 'Android mobil fejlesztő, TL', 'avaszil.png', true, false],
    ['WUP', 'Lödi Myriam', 'Android mobil fejlesztő', 'mlodi.png', true, false],
    ['WUP', 'Lukács Dániel', 'Android mobil fejlesztő', 'dlukacs.png', true, false],
    ['WUP', 'Boros Bence', 'Android mobil fejlesztő', 'bboros.png', true, false],
    ['WUP', 'Bányai Róbert', 'Android mobil fejlesztő', 'rbanyai.png', true, false],
    ['WUP', 'Tamaska Richard', 'IT Delivery manager', 'rtamaska.png', true, false],
    ['MKB', 'Jekkel Dóra Ida', 'Product Owner', 'djekkel.png', true, false],
    ['MKB', 'Magera András', 'BA', '', true, false],
    ['MKB', 'Ihász Zsolt', 'UI designer', 'zsihasz.png', true, false],
    ['MKB', 'Kelemen László', 'UX designer', 'lkelemen.png', true, false],
    ['MKB', 'Tóth Ákos', 'Tester', 'atoth.png', true, false]
];
var start = 0;
var interval = null;

(function($) {
    $.fn.ShuffleArray = function(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    };
})(jQuery);
(function($) {
    $.fn.GenerateParticipants = function() {
        $(".container").empty();
        $(".chip_container").empty();
        jQuery.each(sp, function(i, val) {
            var avatar = '';
            if (val[3] === "") {
                var avatar = 'dummy.png';
            } else {
                var avatar = val[3];
            }
            $(".container").append('<div class="card" id="p' + i + '" userid="' + i + '"><img src="src/' + avatar + '"><p class="participantName">' + val[1] + '</p><p class = "participantTitle">' + val[2] + '</p><div class="primary_btn" id="speak">Elmondta</div><div class="secondary_btn" id="leave">nem volt itt</div></div>');
            $(".chip_container").append('<div class="chip" id="c' + i + '" userid="' + i + '"><img class="chipimg" src="src/' + avatar + '"><span>' + val[1] + '</span></div>');
            if (val[4]) {
                $("#c" + i).children('img').toggleClass("chipactive");
            }
            if (val[5]) {
                $("#c" + i).children('img').css("border-color", "rgb(60, 117, 60)")
            }
        });
        $(".container").append('<div class="end" id="end"><span id="endspan">Thank you for coming today!</span> <div class="secondary_btn" id="standuprestart">Restart</div> </div>');
        return this;
    };
})(jQuery);
(function($) {
    $.fn.GenerateTimer = function(timer2) {
        interval = setInterval(function() {
            var timer = timer2.split(':');
            var minutes = parseInt(timer[0], 10);
            var seconds = parseInt(timer[1], 10);
            --seconds;
            minutes = (seconds < 0) ? --minutes : minutes;
            if (minutes < 0) clearInterval(interval);
            seconds = (seconds < 0) ? 59 : seconds;
            seconds = (seconds < 10) ? '0' + seconds : seconds;
            $('.countdown').html(minutes + ':' + seconds);
            timer2 = minutes + ':' + seconds;
        }, 1000);
        return this;
    };
})(jQuery);
(function($) {
    $.fn.StopTimer = function() {
        console.log("stop");
        clearInterval(interval);
        $('.header_countdown').html("");
        return false;
    };
})(jQuery);
(function($) {
    $.fn.fillrandomize = function(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };
})(jQuery);
(function($) {
    $.fn.showCard = function() {
        jQuery.each(sp, function(i, val) {
            if (!val[5] && val[4]) {
                $("#p" + i).show();
                return false;
            }
        });
        return false;
    };
})(jQuery);

$(document).ready(function() {
    $("#standupstart").GenerateParticipants();
    $("#standupstart").click(function() {
        start = 1
        $(document).showCard();
        $(".header_title").toggle();
        $(".header_countdown").toggle();
        $("#footer").toggle();
        $('.countdown').html("15:00");
        $("#standupstart").GenerateTimer("15:01");
        $("#standupstart").toggle();
    });
    $("#fill").click(function() {
        var a = $(document).fillrandomize(10);
        var b = $(document).fillrandomize(5);
        $("#pname").val(a);
        $("#ptitle").val(b);
    });
    $("#addparticipants").click(function() {
        $(".addparticipants_overlay").show();
        $("#pname").focus();
    });
    $("#cancel").click(function() {
        $(".addparticipants_overlay").hide();

    });
    $("#add").click(function() {
        var data = [];
        data.push('');
        data.push($("#pname").val());
        data.push($("#ptitle").val());
        data.push('', true, false);
        sp.push(data);
        $(".addparticipants_overlay").GenerateParticipants();
        $("#pname").val("");
        $("#ptitle").val("");
        $(".addparticipants_overlay").hide();
        if (start == 1) {
            $(document).showCard();
        }

    });
    $(document).on("click", "div#speak", function() {
        var pid = $(this).parent().attr("userid");
        sp[pid][5] = true;
        var i_num = false;
        jQuery.each(sp, function(i, val) {
            if (val[4] == true && val[5] == false) {
                i_num = i;
                return false;
            }
        });
        if (i_num) {
            $("#p" + pid).fadeOut(500, function() {
                $("#c" + pid).children("img").css("border-color", "rgb(60, 117, 60)");
                $("#p" + i_num).fadeIn(500);
            });
        } else {
            $("#c" + pid).children("img").css("border-color", "rgb(60, 117, 60)");
            $("#standupstart").StopTimer();
            $("#p" + pid).fadeOut(500, function() {
                $("#end").fadeIn(500);
            });
        }
    });
    $(document).on("click", "div#leave", function() {
        var pid = $(this).parent().attr("userid");
        sp[pid][5] = true;
        var i_num = false;
        jQuery.each(sp, function(i, val) {
            if (val[4] == true && val[5] == false) {
                i_num = i;
                return false;
            }
        });
        if (i_num) {
            $("#p" + pid).fadeOut(500, function() {
                $("#c" + pid).children("img").css("border-color", " rgb(255, 99, 71)");
                $("#p" + i_num).fadeIn(500);
            });
        } else {
            $("#c" + pid).children("img").css("border-color", " rgb(255, 99, 71)");
            $("#p" + pid).fadeOut(500, function() {
                $("#end").fadeIn(500);
            });
            $("#standupstart").StopTimer();
        }
    });
    $(document).on("click", "div.chip", function() {
        var pid = $(this).attr("userid");
        if (sp[pid][4] === true) {
            sp[pid][4] = false;
        } else {
            sp[pid][4] = true;
        }
        $(".chip").GenerateParticipants();
        if (start == 1) {
            $(document).showCard();
        }
    });
    $(document).on("click", "div#standuprestart", function() {
        window.location.reload();
    });

});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('../sw.js').then(() => {
            console.log('Service Worker Registered')
        })
    })
}