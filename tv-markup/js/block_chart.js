//functions
(function () {

	//convert string date to array
	var parsechartdata = function (data) {
		var new_data = [],
			l = data.length;

		var fn_parsetime = d3.time.format('%Y-%m-%d %H:%M:%S.%L');

		for (var i=0; i<l; i++) {
			data[i] = fn_parsetime.parse(data[i]);
			new_data.push([
				data[i].getFullYear(),
				data[i].getMonth() + 1,
				data[i].getDate(),
				data[i].getHours(),
				data[i].getMinutes()
			]);
		};

		return new_data;
	};

	window.pi_fn_parsechartdata = parsechartdata;

	//get array of months from first to last day in data
	var getdataperiod = function (data) {
		var new_data = [],
			l = data.length;

		var start_y = data[0][0],
			start_m = data[0][1],
			start_d = data[0][2],
			end_y = data[l-1][0],
			end_m = data[l-1][1],
			end_d = data[l-1][2],
			last_y = start_y,
			last_m = start_m,
			count_m = (end_y-start_y)*12+(end_m-start_m),
			count_d = 0;

		for (var i=0; i<count_m; i++) {
			new_data.push({
				date : [last_y, last_m],
				start : (last_m == start_m) ? start_d : 1,
				end : new Date(last_y, last_m, 0).getDate(),
				type : 'om'
			});

			count_d += new_data[i].end-new_data[i].start+1;

			last_m++;
			if (last_m > 12) {
				last_y++;
				last_m = 1;
			};
		};

		if (end_d-1) {
			new_data.push({
				date : [end_y, end_m],
				start : (end_m == start_m) ? start_d : 1,
				end : end_d-1,
				type : 'cm'
			});

			count_d += new_data[new_data.length-1].end-new_data[new_data.length-1].start+1;
		};

		new_data.push({
			date : [end_y, end_m, end_d],
			start : 0,
			end : 24,
			type : 'cd'
		});

		new_data.month_start = start_m;
		new_data.month_end = end_m;
		new_data.months = count_m;
		new_data.days = count_d;

		return new_data;
	};

	window.pi_fn_getdataperiod = getdataperiod;

	//add persent size to each month
	var addmainparts = function (data) {
		var part_first = (data.days < 8) ? 30 : (data.days < 13) ? 50 : 70,
			part_second = 100-part_first,
			min_size = Math.min(5, part_first/data.months),
			notadd = [],
			addon = 0,
			l = data.length;

		for (var i=0; i<l; i++) {
			if (data[i].type == 'cd') {
				data[i].part = part_second;
			} else {
				data[i].part = (data[i].end-data[i].start+1)/data.days*part_first;
				
				if (data[i].part < min_size) {
					addon += min_size-data[i].part;
					data[i].part = min_size;
					notadd.push(i);
				};
			};
		};

		var add = notadd/(l-notadd.length),
			rest = part_first,
			max_val = 0,
			max_id = 0;

		for (var i=0; i<l; i++) {
			if (data[i].type != 'cd') {
				if (notadd.indexOf(i) == -1) {
					data[i].part -= add;
					data[i].part = Math.round(data[i].part);
				};

				rest -= data[i].part;

				if (data[i].part > max_val) {
					max_val = data[i].part;
					max_id = i;
				};
			};
		};

		if (rest < 0) {
			data[max_id].part += rest;
		};

		var indent = 0;

		for (var i=0; i<l; i++) {
			data[i].indent = indent;
			indent += data[i].part;
		};

		return data;
	};

	window.pi_fn_addmainparts = addmainparts;

	//add persent size to each month
	var addlightparts = function (data) {
		var part_first = 70,
			part_second = 100-part_first,
			min_size = Math.min(5, part_first/data.months),
			notadd = [],
			addon = 0,
			l = data.length;

		for (var i=0; i<l; i++) {
			if (data[i].type == 'cd') {
				data[i].part = part_second;
			} else {
				data[i].part = (data[i].end-data[i].start+1)/data.days*part_first;
				
				if (data[i].part < min_size) {
					addon += min_size-data[i].part;
					data[i].part = min_size;
					notadd.push(i);
				};
			};
		};

		var add = notadd/(l-notadd.length),
			rest = part_first,
			max_val = 0,
			max_id = 0;

		for (var i=0; i<l; i++) {
			if (data[i].type != 'cd') {
				if (notadd.indexOf(i) == -1) {
					data[i].part -= add;
					data[i].part = Math.round(data[i].part);
				};

				rest -= data[i].part;

				if (data[i].part > max_val) {
					max_val = data[i].part;
					max_id = i;
				};
			};
		};

		if (rest < 0) {
			data[max_id].part += rest;
		};

		var indent = 0;

		for (var i=0; i<l; i++) {
			data[i].indent = indent;
			indent += data[i].part;
		};

		return data;
	};

	window.pi_fn_addlightparts = addlightparts;

	//convert date value to percents, where 0 - start day in data, 100 - last day + 24 hours
	var convertchartdata = function (data, period) {
		var new_data = ['x'],
			dl = data.length,
			pl = period.length;

		var temp,
			point;

		for (var i=0; i<pl; i++) {
			temp = period[i];

			if (temp.type == 'cd') {
				for (var j=0; j<dl; j++) {
					if (data[j][0] != temp.date[0] || data[j][1] != temp.date[1] || data[j][2] != temp.date[2]) continue;

					point = temp.indent + (data[j][3]-temp.start+data[j][4]/60)/(temp.end-temp.start)*temp.part;

					new_data.push(point);
				};
			} else {
				for (var j=0; j<dl; j++) {
					if (data[j][0] > temp.date[0] && data[j][1] > temp.date[1]) break;
					else if (data[j][0] != temp.date[0] || data[j][1] != temp.date[1]) continue;
					else if (data[j][2] > temp.end) continue;

					point = temp.indent + (data[j][2]-temp.start)/(temp.end-temp.start+1)*temp.part;

					new_data.push(point);
				};
			};
		};

		return new_data;
	};

	window.pi_fn_convertchartdata = convertchartdata;

	//create html grid
	var getmaingrid = function (data) {
		var html = document.createDocumentFragment(),
			l = data.length;

		var names_n = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
			names_s = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

		var block, title, subblock, subtitle;

		for (var i=0; i<l; i++) {
			block = document.createElement('div');
			title = document.createElement('div');

			block.className = 'b-chart_grid-block t-'+ data[i].type;
			title.className = 'b-chart_grid-title';

			block.style.width = data[i].part +'%';

			if (data[i].type == 'cd') {
				title.innerHTML = 'Сегодня, '+ data[i].date[2] +' '+ names_s[data[i].date[1]-1];
			} else {
				title.innerHTML = names_n[data[i].date[1]-1];
			};

			var k, s, d;

			if (data[i].type == 'cd') {
				k = (data[i].part > 50) ? 6 : 4;
			} else {
				k = Math.floor(Math.min(data[i].part/4, data[i].end-data[i].start+1));
			};

			for (var j=0; j<k; j++) {
				subblock = document.createElement('div');
				subtitle = document.createElement('div');

				subblock.className = 'b-chart_grid-subblock';
				subtitle.className = 'b-chart_grid-subtitle';

				s = (data[i].end-data[i].start)/k;
				d = data[i].start+Math.round(s*j+s/2);

				if (data[i].type == 'cd') {
					subtitle.innerHTML = (s*j) + '<span>00</span>-' + (s*j+s) + '<span>00</span>';
				} else {
					subtitle.innerHTML = d;
				};

				subblock.style.width = (100/k) +'%';

				subblock.appendChild(subtitle);
				block.appendChild(subblock);
			};

			block.appendChild(title);
			html.appendChild(block);
		};

		var temp = document.createElement('div');
		temp.appendChild(html);

		return temp.innerHTML;
	};

	window.pi_fn_getmaingrid = getmaingrid;

	//create html grid
	var getlightgrid = function (data) {
		var html = document.createDocumentFragment(),
			l = data.length;

		var block, title, subblock, subtitle;

		for (var i=0; i<l; i++) {
			block = document.createElement('div');
			title = document.createElement('div');

			block.className = 'b-light_chart_grid-block t-'+ data[i].type;

			block.style.width = data[i].part +'%';

			if (data[i].type == 'cd') {
				subblock = document.createElement('div');
				subtitle = document.createElement('div');

				subblock.className = 'b-light_chart_grid-subblock';
				subtitle.className = 'b-light_chart_grid-subtitle';

				subtitle.innerHTML = 'Сегодня '+ data[i].date[2];

				subblock.style.width = '100%';

				subblock.appendChild(subtitle);
				block.appendChild(subblock);
			} else {
				var k = Math.floor(Math.min(data[i].part/4, data[i].end-data[i].start+1)),
					s, d;

				for (var j=0; j<k; j++) {
					subblock = document.createElement('div');
					subtitle = document.createElement('div');

					subblock.className = 'b-light_chart_grid-subblock';
					subtitle.className = 'b-light_chart_grid-subtitle';

					s = (data[i].end-data[i].start)/k;
					d = data[i].start+Math.round(s*j+s/2);

					if (data[i].type == 'cd') {
						subtitle.innerHTML = d + '<span>00</span>';
					} else {
						subtitle.innerHTML = d;
					};

					subblock.style.width = (100/k) +'%';

					subblock.appendChild(subtitle);
					block.appendChild(subblock);
				};
			};

			html.appendChild(block);
		};

		var temp = document.createElement('div');
		temp.appendChild(html);

		return temp.innerHTML;
	};

	window.pi_fn_getlightgrid = getlightgrid;

	//init chart
	var getdefaultchart = function (id, data, names, colors, tooltip, scope) {
		var new_chart = c3.generate({
			bindto: id,
			data: {
				x: 'x',
				columns: data,
				names: names,
				colors: colors
			},
			axis: {
				x: {
					show: false,
					min: 0,
					max: 100
				},
				y: {
					show: false,
					min: scope.y_min,
					max: scope.y_max
				}
			},
			legend: {
				show: false
			},
			tooltip: {
				show: tooltip,
				grouped: false,
				contents: function (d, defaultTitleFormat, defaultValueFormat, color) {
					var temp = '';

					for (var i=0, l=d.length; i<l; i++) {
						temp += '<div style="background: '+ color(d[i]) +';">'+ d[i].value +'</div>'
					};

					return temp;
				}
			},
			point: {
				show: tooltip,
				r: 1,
				focus: {
					expand: {
						r: 8
					}
				}
			}
		});

		return new_chart;
	};

	window.pi_fn_getdefaultchart = getdefaultchart;

	//init chart
	var getdividedchart = function (id, data, names, colors, colors_lim, show_tooltip, limit, show_limit, scope) {
		var x,
			cur_y = 0,
			cur_p = 0,
			last_y = 0,
			last_p = 0,
			last;

		var new_x = [],
			new_data = [],
			new_colors = {};

		for (var i=1, l=data.length; i<l; i++) {
			var name_top = data[i][0]+'_lim',
				name_bottom = data[i][0],
				data_top = [name_top],
				date_bottom = [name_bottom];

			for (var j=1, k=data[i].length; j<k; j++) {
				last_y = cur_y;
				last_p = cur_p;
				cur_y = data[i][j];
				cur_p = (cur_y >= limit) ? 1 : -1;

				if (j != 1 && cur_p != last_p) {
					if (cur_p < 0) {
						x = data[0][j-1]+((last_y-limit)*(data[0][j]-data[0][j-1]))/(last_y-cur_y);
					} else {
						x = data[0][j]-((cur_y-limit)*(data[0][j]-data[0][j-1]))/(cur_y-last_y);
					};

					data_top.push(limit);
					date_bottom.push(limit);
					new_x.push(x);
				};

				if (cur_p < 0) {
					data_top.push(null);
					date_bottom.push(cur_y);
				} else {
					data_top.push(cur_y);
					date_bottom.push(null);
				};
			};

			new_data.push(date_bottom);
			new_data.push(data_top);

			new_colors[name_top] = colors_lim[name_bottom];
			new_colors[name_bottom] = colors[name_bottom];
		};

		new_x = new_x.concat(data[0].slice(1));

		new_x.sort(function (a, b) { return a - b; });

		new_x = [data[0][0]].concat(new_x);

		new_data.unshift(new_x);

		var new_chart = c3.generate({
			bindto: id,
			data: {
				x: 'x',
				columns: new_data,
				names: names,
				colors: new_colors
			},
			axis: {
				x: {
					show: false,
					min: 0,
					max: 100,
				},
				y: {
					show: false,
					min: scope.y_min,
					max: scope.y_max
				}
			},
			legend: {
				show: false
			},
			tooltip: {
				show: show_tooltip,
				grouped: false,
				contents: function (d, defaultTitleFormat, defaultValueFormat, color) {
					var temp = '';

					for (var i=0, l=d.length; i<l; i++) {
						temp += '<div style="background: '+ color(d[i]) +';">'+ d[i].value +'</div>'
					};

					return temp;
				}
			},
			point: {
				show: show_tooltip,
				r: 1,
				focus: {
					expand: {
						r: 8
					}
				}
			}
		});

		var full = scope.y_max-scope.y_min,
			part_top = (scope.y_max-limit)/full*100,
			part_bottom = 100-part_top;

		var block = document.querySelector(id);
			middle_block = document.createElement('div');
			middle_block_holder = document.createElement('div');

		middle_block.className = 'b-divided_chart-line';
		middle_block_holder.className = 'b-divided_chart-item';
		middle_block_holder.style.top = part_top +'%';

		if (show_limit) {
			var limit_block = document.createElement('div');
				limit_block_holder = document.createElement('div');

			limit_block.className = 'b-chart_limit-block';
			limit_block_holder.className = 'b-chart_limit-holder';

			limit_block_holder.innerHTML = limit;

			limit_block.appendChild(limit_block_holder);
			middle_block_holder.appendChild(limit_block);
		};

		middle_block.appendChild(middle_block_holder);
		block.insertAdjacentHTML('afterbegin', middle_block.outerHTML);

		return new_chart;
	};

	window.pi_fn_getdividedchart = getdividedchart;

	//init chart
	var getonebarchart = function (id, data, names, colors, show_tooltip, scope) {
		var new_chart = c3.generate({
			bindto: id,
			data: {
				columns: data,
				names: names,
				colors: colors,
				type: 'bar'
			},
			axis: {
				x: {
					show: false
				},
				y: {
					show: false,
					max: scope.y_max
				}
			},
			legend: {
				show: false
			},
			tooltip: {
				show: show_tooltip,
				grouped: false,
				contents: function (d, defaultTitleFormat, defaultValueFormat, color) {
					var temp = '';

					for (var i=0, l=d.length; i<l; i++) {
						temp += '<div style="background: '+ color(d[i]) +';">'+ d[i].value +'</div>'
					};

					return temp;
				}
			}
		});

		return new_chart;
	};

	window.pi_fn_getonebarchart = getonebarchart;

	//search min and max value for x and y
	var getdatascope = function (data) {
		var x_min = 0,
			x_max = 100,
			//x_min = data[0][1],
			//x_max = data[0][data[0].length-1],
			y_min = 0,
			y_max = 0,
			temp_max = 0,
			temp_min = 0,
			is_full = (data[0][0] == 'x') ? false : true;

		for (var i=(is_full)?0:1, l=data.length; i<l; i++) {
			temp_min = Math.min.apply(null, data[i].slice(1));
			y_min = (i == 1) ? temp_min : (temp_min < y_min) ? temp_min : y_min;
			temp_max = Math.max.apply(null, data[i].slice(1));
			y_max = (temp_max > y_max) ? temp_max : y_max;
		};

		return {
			x_min: x_min,
			x_max: x_max,
			y_min: y_min,
			y_max: y_max
		};
	};

	window.pi_fn_getdatascope = getdatascope;

	//get html for pointers
	var getchartpoints = function (data, colors, list, scope, add_class) {
		var html = document.createDocumentFragment(),
			new_points = [],
			x_length = data[0].length-1;

		var n;

		for (var i=1, l=data.length; i<l; i++) {
			for (var j=0, k=list.length; j<k; j++) {
				n = (typeof list[j] == 'number') ? list[j] : (list[j] == 'start') ? 1 : (list[j] == 'end') ? x_length : 0;

				if (!n) continue;

				new_points.push({
					top: (scope.y_max-data[i][n])/(scope.y_max-scope.y_min)*100,
					left: (data[0][n])/(scope.x_max-scope.x_min)*100,
					name: data[i][0],
					value: data[i][n]
				});
			};
		};

		var block, subblock;

		for (var i=0, l=new_points.length; i<l; i++) {
			block = document.createElement('div');
			subblock = document.createElement('div');

			block.style.top = new_points[i].top +'%';
			block.style.left = new_points[i].left +'%';
			subblock.style.background = colors[new_points[i].name];
			block.className = 'b-chart_points-block ' + add_class + ((new_points[i].left > 90) ? ' t-right' : ' t-left');
			subblock.className = 'b-chart_points-holder';

			subblock.innerHTML = new_points[i].value;

			block.appendChild(subblock);
			html.appendChild(block);
		};

		var temp = document.createElement('div');
		temp.appendChild(html);

		return temp.innerHTML;
	};

	window.pi_fn_getchartpoints = getchartpoints;

	//get html for pointers
	var getbarpoints = function (data, colors, scope, add_class) {
		var html = document.createDocumentFragment(),
			new_points = [],
			x_length = data[0].length-1,
			is_full = (data[0][0] == 'x') ? false : true;

		for (var i=(is_full)?0:1, l=data.length; i<l; i++) {
			for (var j=1, k=data[i].length; j<k; j++) {
				if (!new_points[j-1]) {
					new_points[j-1] = [];
					new_points[j-1].left = 100/(k-1)*(j-1);
					new_points[j-1].width = 100/(k-1);
				};

				new_points[j-1].push({
					top: (scope.y_max-data[i][j])/(scope.y_max)*100,
					left: 100/l*i,
					width: 100/l,
					name: data[i][0],
					value: data[i][j],
					index: i
				});
			};
		};

		var group, subgroup, block, subblock;

		for (var i=0, l=new_points.length; i<l; i++) {
			group = document.createElement('div');
			subgroup = document.createElement('div');

			group.style.left = new_points[i].top +'%';
			group.style.width = new_points[i].width +'%';
			group.className = 'b-bar_points-group';
			subgroup.className = 'b-bar_points-subgroup';

			for (var j=0, k=new_points[i].length; j<k; j++) {
				block = document.createElement('div');
				subblock = document.createElement('div');

				block.style.top = new_points[i][j].top +'%';
				block.style.left = new_points[i][j].left +'%';
				block.style.width = new_points[i][j].width +'%';
				subblock.style.color = colors[new_points[i][j].name];
				block.className = 'b-bar_points-block ' + add_class;
				subblock.className = 'b-bar_points-holder';

				subblock.innerHTML = new_points[i][j].value;

				block.appendChild(subblock);
				subgroup.appendChild(block);
			};

			group.appendChild(subgroup);
			html.appendChild(group);
		};

		var temp = document.createElement('div');
		temp.appendChild(html);

		return temp.innerHTML;
	};

	window.pi_fn_getbarpoints = getbarpoints;

	//get data for some id
	var getsomedata = function (data, n) {
		n += 1;

		var new_data = [],
			max = data[0].length;

		if (n >= max || n < 1) return new_data;

		for (var i=0, l=data.length; i<l; i++) {
			new_data[i] = [data[i][0], data[i][n]];
		};

		return new_data;
	};

	window.pi_fn_getsomedata = getsomedata;

})();