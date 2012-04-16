#jQueryXDR

# Synopsis
jQueryXDR is a jQuery transport plugin that gives you an opportunity to make cross-subdomain requests using standard jQuery API.

# The Problem
Due to security reasons ([same origin policy](http://en.wikipedia.org/wiki/Same_origin_policy)) web browsers won't allow you to make requests from a.mydomain.com to b.mydomain.com.
This is a problem as a lot of developers prefer to separate different parts of their web applications into subdomains.
A common web app structure is:

* mydomain.com - main website, blog, etc.
* app.mydomain.com - web app interface
* api.mydomain.com - web app API

# The Solution

jQueryXDR uses know iFrame hack to make communication to subdomains available via standard jQuery functions like $.getJSON() and $.ajax().

# Usage
1. Place ```jquery-xdr.js``` on the app.mydomain.com server.
2. Open ```xdr.html``` file and change it's second script tag to point to the file you've just uploaded, let say http://app.mydomain.com/js/jquery-xdr.js
3. Upload this ```xdr.html``` file to the api.mydomain.com server
4. Add ```jquery-xdr.js``` to your web app with script loader or ```<script>``` tag.
5. Add the following line somewhere before the requests to the api server ```$.initXDR('http://api.mydomain.com/xdr.html', 'mydomain.com');```. It's better to place it at the beginning of your code. 

That's it. Now you can make requests to api.mydomain.com

```javascript

    $(function(){
    	$.initXDR('http://api.mydomain.com/xdr.html', 'mydomain.com');
    
    	$.getJSON('http://api.mydomain.com/v1/accounts/123.json', function(data) {
    		console.log(data);
    	});
    
    	$.ajax({
    		type: "POST",
    		url: "http://api.mydomain.com/v1/accounts.json",
    		data: { firstName: "John", lastName:"Doe", location: "San Francisco" }
    	}).done(function( data ) {
    		console.log( "account created: " );
    		console.log(data);

    	});    	
    });

```


# Licence

(The MIT License)

Copyright (c) 2012 [Alex Ladyga](mailto:neocoder@gmail.com) - [http://alexladyga.posterous.com](http://alexladyga.posterous.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

