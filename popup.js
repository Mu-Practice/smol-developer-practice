```javascript
document.addEventListener('DOMContentLoaded', function() {
    let commentButton = document.getElementById('commentButton');
    let commentInput = document.getElementById('commentInput');

    commentButton.addEventListener('click', function() {
        let comment = commentInput.value;
        let url = window.location.href;

        chrome.runtime.sendMessage({
            action: "addComment",
            url: url,
            comment: comment
        }, function(response) {
            if(response.success) {
                commentInput.value = '';
                displayComments();
            }
        });
    });

    function displayComments() {
        chrome.runtime.sendMessage({
            action: "getComments",
            url: window.location.href
        }, function(response) {
            let commentsContainer = document.getElementById('commentsContainer');
            commentsContainer.innerHTML = '';

            response.comments.forEach(function(comment) {
                let commentElement = document.createElement('p');
                commentElement.textContent = comment;
                commentsContainer.appendChild(commentElement);
            });
        });
    }

    displayComments();
});
```