'use strict';

angular.module('materialApp')
.controller('filesController', ['$scope', 'filesService', 'Socket', function($scope, filesService, Socket){
		
		Socket.on('ImageProcessMessage', function(msg){
			Materialize.toast(msg, 4000);
		});

		$scope.$watch('file', function(file){
			$scope.previewImage = false;
			$scope.validationError = null;

			if($scope.file) {
				
				var img = new Image();

				var reader = new FileReader();
				reader.onload = function(e) { 
					img.src = e.target.result;
					$scope.imageWidth = img.width;
					$scope.imageHeight = img.height;
					if($scope.imageWidth === 1024 && $scope.imageHeight === 1024) {
						$scope.previewImage = true;
						$scope.scaledWidth = $scope.imageWidth;
						$scope.scaledHeight = $scope.imageHeight;
						$scope.resizeableImage($('#resize1 img'), file, 755, 450);
					} else {
						$scope.validationError = 'File dimensions must be 1024 x 1024.';
					}
				};
				reader.readAsDataURL(file);		
			}
		});

		$scope.resizeFilesOnServer = function() {
			filesService.resizeFiles($scope.file)
			.then(function(response){
				console.log(response.data);
				Materialize.toast(response.data.message, 4000);
			});
		};

		$scope.upload = function (file) {
			filesService.uploadFile(file)
			.then(function(response){
				console.log(response);
        Materialize.toast('File Uploaded Successfully.', 4000);
			});	        
    	};


		function dataURItoBlob(dataURI) {
    		// convert base64/URLEncoded data component to raw binary data held in a string
    		var byteString;
    		if (dataURI.split(',')[0].indexOf('base64') >= 0)
        		byteString = atob(dataURI.split(',')[1]);
    		else
        		byteString = unescape(dataURI.split(',')[1]);

    		// separate out the mime component
    		var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    		// write the bytes of the string to a typed array
    		var ia = new Uint8Array(byteString.length);
    		for (var i = 0; i < byteString.length; i++) {
        		ia[i] = byteString.charCodeAt(i);
    		}

    		return new Blob([ia], {type:mimeString});
		}



  		$scope.resizeableImage = function(target_image, file, resizeWidth, resizeHeight) {

  			// Some variable and settings
  			var $container,
  			$overlay,
      		orig_src = new Image(),
      		image_target = $(target_image).get(0),
      		event_state = {},
      		min_width = resizeWidth,
      		min_height = resizeHeight,
      		max_width = 1025,
      		max_height = 1025,
      		resize_canvas = document.createElement('canvas');

  		var init = function(){
  		
  			orig_src.file = file;

			var reader = new FileReader();
			reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(orig_src);
			reader.readAsDataURL(file);
    		// When resizing, we will always use this copy of the original as the base
   
    		// Assign the container to a variable
    		$container =  $(image_target).parent('.resize-container');
    		$overlay = $container.parent('.preview-container').children('.overlay');
    		
    		var overlayWidth = resizeWidth*($scope.scaledWidth/max_width);
    		var overlayHeight = resizeHeight*($scope.scaledWidth/max_height);

    		$overlay.css({
    				'width': overlayWidth,
    				'height': overlayHeight,
    				'margin-left': -overlayWidth/2,
    				'margin-top': -overlayHeight/2
    		});

    		$(image_target).load(function(){
    			$scope.scaledWidth = $(this).width();
    			$scope.scaledHeight = $(this).height();

        		var overlayWidth = resizeWidth*($scope.scaledWidth/max_width);
    			var overlayHeight = resizeHeight*($scope.scaledWidth/max_height);

    			min_width = overlayWidth;
    			min_height = overlayHeight;

    			$overlay.css({
    				'width': overlayWidth,
    				'height': overlayHeight,
    				'margin-left': -overlayWidth/2,
    				'margin-top': -overlayHeight/2
    			});
    			$(image_target).off('load');
    		});

    		// Add events
    		$container.on('mousedown touchstart', '.resize-handle', startResize);
    		$container.on('mousedown touchstart', 'img', startMoving);
    		$container.parent('.preview-container').on('click', '.js-crop', crop);
  		};

  		var startResize = function(e){
    		e.preventDefault();
    		e.stopPropagation();
    		saveEventState(e);
    		$(document).on('mousemove touchmove', resizing);
    		$(document).on('mouseup touchend', endResize);
  		};

  		var endResize = function(e){
    		e.preventDefault();
    		$(document).off('mouseup touchend', endResize);
    		$(document).off('mousemove touchmove', resizing);
  		};

  		var saveEventState = function(e){
    		// Save the initial event details and container state
    		event_state.container_width = $container.width();
    		event_state.container_height = $container.height();
    		event_state.container_left = $container.offset().left; 
    		event_state.container_top = $container.offset().top;
    		event_state.mouse_x = (e.clientX || e.pageX || e.originalEvent.touches[0].clientX) + $(window).scrollLeft(); 
    		event_state.mouse_y = (e.clientY || e.pageY || e.originalEvent.touches[0].clientY) + $(window).scrollTop();
	
    		event_state.evnt = e;
  		};

  var resizing = function(e){
    var mouse={},width,height,left,top,offset=$container.offset();
    mouse.x = (e.clientX || e.pageX || e.originalEvent.touches[0].clientX) + $(window).scrollLeft(); 
    mouse.y = (e.clientY || e.pageY || e.originalEvent.touches[0].clientY) + $(window).scrollTop();
    
    // Position image differently depending on the corner dragged and constraints
    if( $(event_state.evnt.target).hasClass('resize-handle-se') ){
      width = mouse.x - event_state.container_left;
      height = mouse.y  - event_state.container_top;
      left = event_state.container_left;
      top = event_state.container_top;
    } else if($(event_state.evnt.target).hasClass('resize-handle-sw') ){
      width = event_state.container_width - (mouse.x - event_state.container_left);
      height = mouse.y  - event_state.container_top;
      left = mouse.x;
      top = event_state.container_top;
    } else if($(event_state.evnt.target).hasClass('resize-handle-nw') ){
      width = event_state.container_width - (mouse.x - event_state.container_left);
      height = event_state.container_height - (mouse.y - event_state.container_top);
      left = mouse.x;
      top = mouse.y;
    } else if($(event_state.evnt.target).hasClass('resize-handle-ne') ){
      width = mouse.x - event_state.container_left;
      height = event_state.container_height - (mouse.y - event_state.container_top);
      left = event_state.container_left;
      top = mouse.y;
    } else if($(event_state.evnt.target).hasClass('resize-handle-n')) {
    	width = event_state.container_width;
    	height = event_state.container_height - (mouse.y - event_state.container_top);

    	left = event_state.container_left;
    	top = mouse.y;
    } else if($(event_state.evnt.target).hasClass('resize-handle-s')) {
    	width = event_state.container_width;
    	height = event_state.container_height - (event_state.container_top + event_state.container_height - mouse.y);

    	left = event_state.container_left;
    	top = event_state.container_top;

    } else if($(event_state.evnt.target).hasClass('resize-handle-e')) {
    	width = event_state.container_width  - (event_state.container_left + event_state.container_width - mouse.x);
    	height = event_state.container_height;

    	left = event_state.container_left;
    	top = event_state.container_top;

    } else if($(event_state.evnt.target).hasClass('resize-handle-w')) {
    	width = event_state.container_width  - (mouse.x - event_state.container_left);
    	height = event_state.container_height;

    	left = mouse.x;
    	top = event_state.container_top;
    }
	
    if(width > min_width && height > min_height && width < max_width && height < max_height){
      // To improve performance you might limit how often resizeImage() is called
      resizeImage(width, height);  
      // Without this Firefox will not re-calculate the the image dimensions until drag end
      $container.offset({'left': left, 'top': top});
    }
  };

  var resizeImage = function(width, height){
    resize_canvas.width = width;
    resize_canvas.height = height;
    console.log(orig_src);
    resize_canvas.getContext('2d').drawImage(orig_src, 0, 0, width, height);   
    $(image_target).attr('src', resize_canvas.toDataURL('image/png'));  
  };

  var startMoving = function(e){
    e.preventDefault();
    e.stopPropagation();
    saveEventState(e);
    $(document).on('mousemove touchmove', moving);
    $(document).on('mouseup touchend', endMoving);
  };

  var endMoving = function(e){
    e.preventDefault();
    $(document).off('mouseup touchend', endMoving);
    $(document).off('mousemove touchmove', moving);
  };

  var moving = function(e){
    var  mouse={}, touches;
    e.preventDefault();
    e.stopPropagation();
    
    touches = e.originalEvent.touches;
    
    mouse.x = (e.clientX || e.pageX || touches[0].clientX) + $(window).scrollLeft(); 
    mouse.y = (e.clientY || e.pageY || touches[0].clientY) + $(window).scrollTop();
    $container.offset({
      'left': mouse.x - ( event_state.mouse_x - event_state.container_left ),
      'top': mouse.y - ( event_state.mouse_y - event_state.container_top ) 
    });
    
  };

  var crop = function(){
    //Find the part of the image that is inside the crop box
    var crop_canvas,
        left = $overlay.offset().left - $container.offset().left,
        top =  $overlay.offset().top - $container.offset().top,
        width = resizeWidth,
        height = resizeHeight;
		
    crop_canvas = document.createElement('canvas');
    crop_canvas.width = width;
    crop_canvas.height = height;
    
	var screenImage = $(image_target);

	// Create new offscreen image to test
	var theImage = new Image();
	theImage.src = screenImage.attr('src');

	// Get accurate measurements from that.
	var imageWidth = theImage.width;
	var imageHeight = theImage.height;

    crop_canvas.getContext('2d').drawImage(image_target, left * imageWidth/$(image_target).width(), top*imageHeight/$(image_target).height(), width, height, 0, 0, width, height);
    //window.open(crop_canvas.toDataURL('image/png'));
    var dataURI = crop_canvas.toDataURL('image/png');
    var blob = dataURItoBlob(dataURI);
    $scope.upload(blob);
  };

  init();
};

}]);
