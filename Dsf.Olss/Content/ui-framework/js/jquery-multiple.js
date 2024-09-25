var count = 0;
$(document).ready(function(){
	var number = 1;
	$(".add_btn").click(function(){
		selectValuesAddButton = { "1": "Customer Name", "2": "Marketing Officer", "3": "Visit Date" , "4": "Location" , "5": "Product Model" ,"6": "Created By", "7": "Created Date" ,"8": "Status", "9": "Action" };
		selectValuesInput = {"1": "and", "2": "or"};
		selectValuesOperation = {"1": "=", "2": "like", "3": "not like", "4": "!=", "5": "<", "6":"<=", "7":">", "8":">=", "9": "in", "10":"not in"};
		count += 1;
		number += 1;

		$('#container').append(
			'<tr class="records">'
			+ '<td>'+ number +'</td>'
			+ '<td><textarea class="form-control" rows="1"></textarea></td>'
			+ '<td><div><input id="operation_' + count + '" name="operation_' + count + '" type="text" class="form-control"></div></td>'
			+ '<td><button class="btn btn-info" onclick="addButtonAct()" name="add_btn_' + count + '" type="button" id="add_btn_'+ count + '"">+</button> <button class="btn btn-danger remove_item" name="rmv_btn_' + count + '" type="button" id="rmv_btn_'+ count + '"">-</button></tr>'
		);
	});
	
	$(".add_item").click(function(){
		selectValuesAddButton = { "1": "Customer Name", "2": "Marketing Officer", "3": "Visit Date" , "4": "Location" , "5": "Product Model" ,"6": "Created By", "7": "Created Date" ,"8": "Status", "9": "Action" };
		selectValuesInput = {"1": "and", "2": "or"};
		selectValuesOperation = {"1": "=", "2": "like", "3": "not like", "4": "!=", "5": "<", "6":"<=", "7":">", "8":">=", "9": "in", "10":"not in"};
		count += 1;
		number += 1;

		$('#container').append(
			'<tr class="records">'
			+ '<td colspan="2"></td>'
			+ '<td><div class="input-group"><input type="text" class="form-control mandatory"><span class="input-group-btn"><button class="btn btn-white font-bold" type="button">. . .</button></span><span class="input-group-btn"><button class="btn btn-primary font-bold remove_item fa fa-trash-o" type="button"></button></span></div></td>'
			+ '<td><div><input id="operation_' + count + '" name="operation_' + count + '" type="text" class="form-control"></div></td>'
			+ '<td><div class="input-group"><span class="input-group-addon">Rp</span><input class="form-control" type="text" value=""></div></td>'
			+ '<td><div class="input-group"><span class="input-group-addon">Rp</span><input class="form-control" type="text" value="" disabled="disabled"></div></td></tr>'
		);
		
		$(".remove_item").on('click', function (ev) {
            if (ev.type == 'click') {
                $(this).parents(".records").fadeOut();
                $(this).parents(".records").remove();
			}
		});
	});
	
	$(".add_item2").click(function(){
		selectValuesAddButton = { "1": "Customer Name", "2": "Marketing Officer", "3": "Visit Date" , "4": "Location" , "5": "Product Model" ,"6": "Created By", "7": "Created Date" ,"8": "Status", "9": "Action" };
		selectValuesInput = {"1": "and", "2": "or"};
		selectValuesOperation = {"1": "=", "2": "like", "3": "not like", "4": "!=", "5": "<", "6":"<=", "7":">", "8":">=", "9": "in", "10":"not in"};
		count += 1;
		number += 1;

		$('#container2').append(
			'<tr class="records">'
			+ '<td colspan="2"></td>'
			+ '<td><div class="input-group"><input type="text" class="form-control mandatory"><span class="input-group-btn"><button class="btn btn-white font-bold" type="button">. . .</button></span><span class="input-group-btn"><button class="btn btn-primary font-bold remove_item fa fa-trash-o" type="button"></button></span></div></td>'
			+ '<td><div><input id="operation_' + count + '" name="operation_' + count + '" type="text" class="form-control"></div></td>'
			+ '<td><div class="input-group"><span class="input-group-addon">Rp</span><input class="form-control" type="text" value=""></div></td>'
			+ '<td><div class="input-group"><span class="input-group-addon">Rp</span><input class="form-control" type="text" value="" disabled="disabled"></div></td></tr>'
		);
		
		$(".remove_item").on('click', function (ev) {
            if (ev.type == 'click') {
                $(this).parents(".records").fadeOut();
                $(this).parents(".records").remove();
			}
		});
	});
	
	$(".add_item3").click(function(){
		selectValuesAddButton = { "1": "Customer Name", "2": "Marketing Officer", "3": "Visit Date" , "4": "Location" , "5": "Product Model" ,"6": "Created By", "7": "Created Date" ,"8": "Status", "9": "Action" };
		selectValuesInput = {"1": "and", "2": "or"};
		selectValuesOperation = {"1": "=", "2": "like", "3": "not like", "4": "!=", "5": "<", "6":"<=", "7":">", "8":">=", "9": "in", "10":"not in"};
		count += 1;
		number += 1;

		$('#container3').append(
			'<tr class="records">'
			+ '<td colspan="2"></td>'
			+ '<td><div class="input-group"><input type="text" class="form-control mandatory"><span class="input-group-btn"><button class="btn btn-white font-bold" type="button">. . .</button></span><span class="input-group-btn"><button class="btn btn-primary font-bold remove_item fa fa-trash-o" type="button"></button></span></div></td>'
			+ '<td><div><input id="operation_' + count + '" name="operation_' + count + '" type="text" class="form-control"></div></td>'
			+ '<td><div class="input-group"><span class="input-group-addon">Rp</span><input class="form-control" type="text" value=""></div></td>'
			+ '<td><div class="input-group"><span class="input-group-addon">Rp</span><input class="form-control" type="text" value="" disabled="disabled"></div></td></tr>'
		);
		
		$(".remove_item").on('click', function (ev) {
            if (ev.type == 'click') {
                $(this).parents(".records").fadeOut();
                $(this).parents(".records").remove();
			}
		});
	});
});
		
function addButtonAct() {
	var sum = 2;
	selectValuesAddButton = { "1": "Customer Name", "2": "Marketing Officer", "3": "Visit Date" , "4": "Location" , "5": "Product Model" ,"6": "Created By", "7": "Created Date" ,"8": "Status", "9": "Action" };
	count += 1;
	sum += 1;
	$('#container').append(
		'<tr class="records">'
		+ '<td>'+ sum +'</td>'
		+ '<td><textarea class="form-control" rows="1"></textarea></td>'
		+ '<td><div><input id="operation_' + count + '" name="operation_' + count + '" type="text" class="form-control"></div></td>'
		+ '<td><button class="btn btn-info" onclick="addButtonAct()" name="add_btn_' + count + '" type="button" id="add_btn_'+ count + '"">+</button> <button class="btn btn-danger remove_item" name="rmv_btn_' + count + '" type="button" id="rmv_btn_'+ count + '"">-</button></tr>'
	);
				
	$(".remove_item").on('click', function (ev) {
			if (ev.type == 'click') {
				$(this).parents(".records").fadeOut();
				$(this).parents(".records").remove();
			}
	});
  }