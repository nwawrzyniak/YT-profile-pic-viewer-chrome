console.log("Start");

let img = document.createElement("img");
img.style.display = "none";
img.style.position = "absolute";
img.id = "profilePicMover";
img.style.zIndex = "99999";
document.body.appendChild(img);

function positionMover(mover, pageX, pageY) {
    const margin = 8; // min gap from viewport bottom edge
    const offsetX = 40;
    const offsetY = 40;

    const imgHeight = mover.naturalHeight || mover.offsetHeight || 0;

    // Candidate top position (below and to the right of cursor)
    let top = pageY + offsetY;

    // The bottom of the image in viewport-relative coordinates
    const viewportBottom = window.scrollY + window.innerHeight;
    const imageBottom = top + imgHeight;

    if (imageBottom > viewportBottom - margin) {
        // Shift up so the image's bottom edge sits just inside the viewport
        top = viewportBottom - imgHeight - margin;
    }

    mover.style.left = (pageX + offsetX) + "px";
    mover.style.top = top + "px";
}

function setUpListeners_comments(){
    let comments = document.getElementsByTagName("ytd-comments")[0];

    if (!comments) return;
	
    comments.addEventListener("mousemove", e => {
        if (e.target.tagName === "IMG") {
            let mover = document.getElementById("profilePicMover");
            const newSrc = e.target.src.replace(/^(https.*)(=.*)$/gi, "$1");

            if (mover.src !== newSrc) {
                // New image — reposition once it has loaded so we know its size
                mover.src = newSrc;
                mover.onload = () => positionMover(mover, e.pageX, e.pageY);
            } else {
                // Same image already loaded, just reposition
                positionMover(mover, e.pageX, e.pageY);
            }

            mover.style.display = "unset";
        }
    });
    comments.addEventListener("mouseleave", e => {
        let mover = document.getElementById("profilePicMover");
        mover.style.display = "none";
    });
}

window.setTimeout(setUpListeners_comments, 1000);
window.setTimeout(setUpListeners_comments, 3000);
window.setTimeout(setUpListeners_comments, 10000);

chrome.runtime.onMessage.addListener(request => {
    setUpListeners_comments();
});
