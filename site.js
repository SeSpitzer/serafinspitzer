function asJson( response ) {
  return response.json( );
}

function asText( response ) {
  return response.text( );
}

function HandleVideos( names ) {
  var index = 0;
  var nodes = {
    metadata: document.querySelector( '.ContentMetadata' ),
    video: document.querySelector( '.Video' ),
    prev: document.querySelector( '.ButtonPrev' ),
    next: document.querySelector( '.ButtonNext' )
  };
  function loadMetadata( name ) {
    return fetch( 'media/' + name + '.html' ).then( asText );
  }
  function renderMetadata( content ) {
    nodes.metadata.innerHTML = content;
  }
  function setVideoAttributes( name ) {
    nodes.video.setAttribute( 'poster', 'media/' + name + '.png' );
    nodes.video.setAttribute( 'src', 'media/' + name + '.mp4' );
  }
  function transitionTo( index ) {
    var name = names[ index ];
    loadMetadata( name ).then( renderMetadata );
    setVideoAttributes( name );
  }
  transitionTo( index );
  nodes.prev.addEventListener( 'click', function( e ) {
    if( index > 0 ) {
      index--;
    } else {
      index = names.length - 1;
    }
    transitionTo( index );
  }, false );
  nodes.next.addEventListener( 'click', function( e ) {
    if( index < names.length - 1 ) {
      index++;
    } else {
      index = 0;
    }
    transitionTo( index );
  }, false );
}

fetch( 'media/videos.json' ).then( asJson ).then( HandleVideos );
