

function calculateBar(){
    const bar = document.getElementById('bar');
    const likesEnDislikes = JSON.parse(bar.dataset.likesendislikes);

    let likes = 0, dislikes = 0;

    for (let i = 0; i < likesEnDislikes.length; i++) {
        const likeOfDislike = likesEnDislikes[i];
        if (likeOfDislike.radio == 1) {
            likes += 1;
        } else {
            dislikes += 1;
        }
    }

    const total= likes+dislikes;
    const percentageLikes = (likes/total)*100;
    const percentageDisLikes = (dislikes/total)*100;
    document.getElementById('likes').style.width=percentageLikes.toString()+"%";
    document.getElementById('dislikes').style.width=percentageDisLikes.toString()+"%";

}

    window.addEventListener('load', function(){
        if (window.location.pathname == '/mensen'){
            calculateBar();
        }
        
    })
