(function(){

	var targetDOM = document.getElementById('fsyt_player'),
		DOMid = targetDOM.getAttribute('id'),
		vid = targetDOM.getAttribute('data-vid');


	if ( typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined' ) {
	    var tag = document.createElement('script');
	    tag.src = "//www.youtube.com/iframe_api";
	    tag.async = true;
	    var firstScriptTag = document.getElementsByTagName('script')[0];
	    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	    loadPlayer();
	}

	function loadPlayer() {
		window.onYouTubePlayerAPIReady = function() {
		    onYouTubePlayer();
		};
	}

	var player;

	function onYouTubePlayer() {
		player = new YT.Player(DOMid, {
	    	videoId: vid,
	    	playerVars: {
	      		autoplay: 1,
				controls: 0,
				disablekb: 1,
				loop: 1,
				playlist: vid,
				showinfo: 0, 
				rel: 0
		    },
	    	events: {
	        	'onReady': onPlayerReady, pausePlayer, resumePlayer
	        	// todo
	        	//'onStateChange': onPlayerStateChange
	    	}
		});
	}

	// 靜音
	function onPlayerReady(event){
	    player.mute();
	}

	function pausePlayer(event) {
		player.pauseVideo();
	}

	function resumePlayer(event) {
		player.playVideo();
	}

	function loadIframe() {

		pausePlayer();

		var d = document.createElement('div');
		d.setAttribute('id', 'pop_container')

		var s = document.createElement('span');
		s.className = 'close_btn';
		s.setAttribute('id', 'close_btn');
		s.textContent = 'close';

	    var iframe = document.createElement("iframe");
	    iframe.className = 'pop_youtube';
	    iframe.setAttribute("src", "//www.youtube.com/embed/" 
	    					+ vid
	    					+ "?autoplay=1&autohide=2&border=0&wmode=opaque&enablejsapi=1&controls=1&showinfo=1&fs=0");
	    iframe.setAttribute("frameborder", "0");
	    iframe.setAttribute("id", "youtube-iframe");
	    iframe.setAttribute("allowfullscreen", "");
	    
	    d.appendChild(iframe);
	    d.appendChild(s);

	  	this.parentNode.insertBefore(d, this.nextSibling);

	    v.style.display = 'none';

	    var c = document.getElementById('close_btn');
	    c.onclick = function() {
	    	
	    	document.getElementById('pop_container').remove();
	    	resumePlayer();
	    	v.style.display = 'block';
	    }
	}

	
	var v = document.getElementById('play_btn');
	v.onclick = loadIframe;
	
})();
