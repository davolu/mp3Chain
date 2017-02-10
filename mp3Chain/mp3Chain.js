/* 
 * 
   This is a simple libary that can be used to join mp3 files end to end.
   

@author  David Oluyale.
@Email   oluyaled@gmail.com

 */


        window.URL = window.URL || window.webkitURL;
        var len;
		
      /*Array to keep track of he loaded files */
        var trackLoaded=[];
       
    /*Array to keep track of the file pattern in the array*/
       var keepTrack=[];
      
    /*Array to hold loaded buffers*/
       var bufferList=[];
        
    
    /* This array would hold the final arraybuffer 
         * which would be appended 
         * to the blob file/
         * */
        
       var finalBufferList=[];  
        

Array.prototype.chainMp3 = function(MODE) {
       
      len= this.length;  
       mode=MODE.toUpperCase();
       
        for(t=0; t < len; t++){
            keepTrack.push(this[t]);
        }
        
        
  
       for (i = 0; i < len; i++) {
     
             loadSound(this[i]);
}       
  
 };
 

    
    /* Function that loads sound using AJAX .
     * We set the responseType to arraybuffer. 
     * We can load arraybuffers into blobs. 
     * 
     * */
    
     function loadSound(URL) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', URL, true);
        xhr.responseType = 'arraybuffer';

        xhr.onload = function(e) {
           /*track loaded files URL */
            trackLoaded.push(URL);
     
        /*  Push the arraybuffer to the array bufferList  */
           bufferList.push(xhr.response);
               
               /*Run the merge function once all have been loaded*/
               if(bufferList.length===len){
               chain();
               }
                  
    };
            xhr.send();
 }
    


    function chain(){
       
        /*Let us follow the patter/sequence in the array*/
        /*Remember the keepTrack array at the begining?*/
        /*We merge the file as sequenced in the arrayed
         *  i.e we follow the order in the array.
         *   
         * 
         */
        for(kt=0; kt<keepTrack.length; kt++){
           var index              =   trackLoaded.indexOf(keepTrack[kt]);
           var mp3File            =   bufferList[index];
                finalBufferList.push(mp3File);
          
        }
         /*Once all buffer has been pushed into the final buffer*/
        if(finalBufferList.length===keepTrack.length){
            
            
            if(mode==='SPEAK'){
             b= new Blob([].concat(finalBufferList),{type:'audio/mp3'});
               aud= document.createElement('audio');
             
               aud.src= window.URL.createObjectURL(b);
               
               aud.play();
                
            }
            else if(mode==='DOWNLOAD'){
                  b= new Blob([].concat(finalBufferList),{type:'audio/mp3'});
               d= document.createElement('a');
               d.download= 'mergedMp3';
               d.href= window.URL.createObjectURL(b);
               
               d.click();
            }
            
            else{
                mode='DOWNLOAD';
                merge();
            };
            
        };
        
        
    };