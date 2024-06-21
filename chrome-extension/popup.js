$(document).ready(function(){
    $('#extractBtn').click(function(){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var currentUrl = tabs[0].url;
            if (isYouTubeUrl(currentUrl)) {
                var videoId = getYouTubeVideoId(currentUrl);
                if (videoId !== '') {
                    $('#videoId').text(videoId);
                    ShowAvailableCaptions(videoId);
                } else {
                    alert('The opened YouTube URL does not contain a video ID.');
                }
            } else {
                alert('Not a valid youtube video, Play Youtube Video and try again!');
            }
        });
    });
    
    function isYouTubeUrl(url) {
        return url.toLowerCase().indexOf('youtube.com') !== -1;
    }
    
    function getYouTubeVideoId(url) {
        var videoId = '';
        var regex = /[?&]([^=#]+)=([^&#]*)/g;
        var match;
        while (match = regex.exec(url)) {
            if (match && match[1].toLowerCase() === 'v') {
                videoId = match[2];
                break;
            }
        }
        return videoId;
    }


    function ShowAvailableCaptions(videoId){
    var captionsUrl = 'https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId=' + videoId + '&key=YOUR_YOUTUBE_API_KEY';
       $.ajax({
            url: captionsUrl,
            type: 'GET',
            dataType: 'json',
            success: function(response) {
               var captions = response.items;
                if (captions.length > 0) {
                    // Display captions
                    $('#captions').append('<h2>Captions</h2>');
                    for (var i = 0; i < captions.length; i++) {
                        $('#captions').append('<p>Name: ' + (captions[i].snippet.name || 'No Name' )+ '</p>');
                        $('#captions').append('<p>Language: ' + captions[i].snippet.language + '</p>');
                        $('#captions').append('<p>ID: ' + captions[i].id + '</p>');
                        $('#captions').append('<button class="caption-btn" data-id="' + videoId + '">Summarize</button>');
                        $('#captions').append('<hr>');
                    }
                } else {
                    // No captions available
                    $('#captions').append('<p>No captions available for this video.</p>');
                }
            },
            error: function(xhr, status, error) {
                // Error handling
                console.error('Error:', error);
                alert('invalid YOUTUBE_API_KEY')
            }
        });
    }

    $('#captions').on('click','.caption-btn',async function(e){
        var buttonClicked = e.currentTarget;
        var videoId = buttonClicked.dataset.id; 
        debugger
        try {
            $.get(`https://backend-server-url/api/summarize?videoId=${videoId}`, function(data) {
              $('#summary').text(data.summary);
            });
          } catch (error) {
            console.error('Error:', error);
            $('#summary').text('Failed to summarize video transcript');
          }
    })


});
