//  jQueryXDR: jQuery implementation of cross-subdomain communication
//  Copyright (C) 2012 Alex Ladyga


(function(){

	var originalDomain = document.domain;

	// -----------------------------------------------------------------

	if (frameElement && typeof frameElement._xdrLoaded == "function") {

		
		// Server
		frameElement._xdrLoaded(function(method, url, headers, body, callback) {
			body = body || '';
			var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
			if ( callback ) {
				xhr.onreadystatechange = function() {					
					if ( xhr.readyState == 4 ) {
						// status, statusText, responses, headers
						callback(xhr.status, xhr.statusText, { text: xhr.responseText }, xhr.getAllResponseHeaders());
					}
				};
			}			
			xhr.open(method, url, true);
			if ( headers ) {
				for ( var header in headers ) {
					xhr.setRequestHeader(header, headers[header]);					
				}
			}
			xhr.send(body);
		});
	}	

	// ----------

	if ( typeof jQuery == 'undefined' ) { return; }

	var xdr = false,
		jobs = [],
		frame = document.createElement("iframe"),
		append = function() { document.body.appendChild(frame); };		

	// Client code
	jQuery.initXDR = function(url, tld) {

		document.domain = tld;

		frame.src = url+'#'+tld;
		frame.style.display = "none";
		frame._xdrLoaded = function(xhr) {
			xdr = xhr;

			for (var i = 0; i < jobs.length; i++) {
				var j = jobs[i];
				xdr(j.method, j.url, j.headers, j.body, j.callback);
			}
		};

		if ( document.body ) {
			append();	
		} else if ( window.addEventListener ) {
			addEventListener("load", append, false);	
		} else {
			attachEvent("onload", append);	
		}
	};

	function isCrossDomain(url) {
		var res = /(?:\w+):\/\/(.*?)(?:\/|$)/.exec(url);		
		return res ? res[1] != originalDomain : false
	}


	jQuery.ajaxTransport( '+*', function( options, originalOptions, jqXHR ) {
		if ( isCrossDomain(options.url) ) {
			return {
				send: function( headers, completeCallback ) {
					/* send code */
					var o = options;
					if ( xdr ) {
						xdr(o.type, o.url, headers, o.data, completeCallback);
					} else {
						jobs.push({ "method": o.type, "url": o.url, "headers": headers, "body": o.data, "callback": completeCallback });
					}
				},
				abort: function() {
					/* abort code */
					//console.warn('Abort option for xSubDomain requests is not yest implemented.');					
				}
			};
		}
	});	

})();