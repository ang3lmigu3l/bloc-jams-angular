(function() {

    function SongPlayer() {
        var SongPlayer = {};
        /*
        *@desc sets current song
        *@type {object}
        */
        var currentSong = null;
         /**
         * @desc Buzz object audio file
         * @type {Object}
         */
        var currentBuzzObject = null;
        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        @param {Object} song
        */
         var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentSong = song;
         };
        /*
        *@funtion playSong
        *@desc set currentBuzzOject audio file to play
        *{object} song
        */
        var playSong = function(song){
            currentBuzzObject.play();
            song.playing = true;
        };
        
        /*
        *@function SongPlayer.play (public)
        *@desc checks if clicked song is not the same as the currentsong , if so then it will play new song and set it as currentSong. if its the same song , it will pause it instead.
        *@params {object} song
        */
        SongPlayer.play = function(song){
            if (currentSong !== song) {
                setSong(song);
                playSong(song);
            }
            else if (currentSong === song) {
                if (currentBuzzObject.isPaused()){
                    currentBuzzObject.play();
                }
            }
        };
        
        /*
        *@function SongPlayer.pause (public)
        *@desc pauses currently playing song 
        *@param {object} song
        */
        SongPlayer.pause = function(song){
        currentBuzzObject.pause();
        song.playing = false ;
            
        };
        
        return SongPlayer;
        
    }
    

    angular
        .module("blocJams")
        .factory('SongPlayer', SongPlayer);
})();




