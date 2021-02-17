
var likes=0, dislikes =0;

function like(){
    likes++;
    calculateBar();
}

function dislike(){
    dislikes++;
    calculateBar();
}

function calculateBar(){
    var total= likes+dislikes;
    var percentageLikes = (likes/total)*100;
    var percentageDisLikes = (dislikes/total)*100;

    document.getElementById('likes').style.width=percentageLikes.toString()+"%";
    document.getElementById('dislikes').style.width=percentageDisLikes.toString()+"%";

}
