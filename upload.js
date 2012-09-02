/*	
	Upload Ajax
	@author Eduardo Ottaviani (Javiani)
	@version 1.0
*/
;(function(namespace){

	//Static
	var 
		id = 0,
		attributes = {
			method	:'post',
			enctype :'multipart/form-data',
			encoding:'multipart/form-data'
		};

	namespace.Upload = {
		
		_class :function(o){
			
			//Private
			var
				form,
				name = 'iframe-ajax-' + (id++),
				iframe = $('<iframe />').attr('name', name).hide();
			
			;(function(){
				
				form = o.form;
				form.attr('target', name);
				form.attr( attributes );
				
				iframe.load( load );
				form.append( iframe );
				
				//IE 6
				window.frames[name].name = name;

			}).call(this);

			//Private methods

			function load(){ get.call(this, o); };

			// Public
			this.send = function(action, list){
				
				var clone = form.clone();
				list = clone.find(list);
				
				$(clone[0].elements).attr('disabled', 'disabled');
				list.attr('disabled', false);
				
				form.after(clone);
				
				clone.submit();
				clone.remove();	
			};
		}
	};

	function get(o){
		var response = $(this).contents().find('body').html();
		try{
			response = (new Function('return '+ response))();
			if(!!response) o.callback(response);
		}catch(e){ /*handle chrome*/ }
	};

})(window);
