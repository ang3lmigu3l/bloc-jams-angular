(function() {

    function SongPlayer(Fixtures) {
        var SongPlayer = {};
        /*
        *@desc stores songs from current album 
        *type [array]
        */
        var currentAlbum = Fixtures.getAlbum();

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
                SongPlayer.currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            SongPlayer.currentSong = song;
         };
        /*
        *@desc stops currently playing song 
        *@params {object} song
        */
        var stopSong = function(song) {
            currentBuzzObject.stop();
            song.playing = null;
            
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
        *@function getSongIndex(private)
        *@desc returns index value of song
        *@returns {Number}
        */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
        /*
        *@desc sets current song
        *@type {object}
        */
        SongPlayer.currentSong = null;
        
        /*
        *@function SongPlayer.play (public)
        *@desc checks if clicked song is not the same as the currentsong , if so then it will play new song and set it as currentSong. if its the same song , it will pause it instead.
        *@params {object} song
        */
        SongPlayer.play = function(song){
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            }
            else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()){
                    playSong(song);
                }
            }
        };
        /*
        *@function SongPlayer.previous(public)
        *@desc gets current song index value and subtracts -1 to play previous song on album list
        @params {none}
        */
        SongPlayer.previous = function(){
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0) {
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        /*
        *@function SongPlayer.next
        *@desc gets current song index , pauses current song and plays to next index value in the array of songs .
        *@params {none}
        */
        
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            if (currentSongIndex >= currentAlbum.songs.length){
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        /*
        *@function SongPlayer.pause (public)
        *@desc pauses currently playing song 
        *@param {object} song
        */
        SongPlayer.pause = function(song){
        song = song || SongPlayer.currentSong;
        currentBuzzObject.pause();
        song.playing = false ;
            
        };
        
        return SongPlayer;
        
    }
    

    angular
        .module("blocJams")
        .factory('SongPlayer', SongPlayer);
})();




