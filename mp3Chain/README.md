 Mp3 chain is a simple libary that be used to join/concat mp3 audio files end to end.
 It uses Ajax.
 
 
 Example:
 
Start by including the libary
   
      <script type='text/javascript' src='mp3Chain.js'></script>
   
   
 
Then use :
     
	  
	  
			var audios= [
			" song1.mp3 ",
			" song2.mp3 ", 
			" song3.mp3 "
			];
 
			audios.chainMp3('speak');
 
 //mode: speak or download....
 
 
 