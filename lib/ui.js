let ui = {}

ui.createTable = (id, data, header=false) => {
    // the data is a 2d array
    let element = ""
    
    $(id).empty()

    data.forEach( (item, i) => {
    	let element = ''
        $(id).append("<tr></tr>")
        item.forEach( (_, j) => {
            if (header && i == 0) {
                element = "th"
            }
            else {
                element = "td"
            }
            $(id + " tr").eq(i).append("<" + element + " id=" + i + "x" + j + ">" + data[i][j] + "</" + element + ">")
        })
    })
}

ui.jsonToTable = (data, fields, table_id, header = true, vertical_head = false) => {
	let rows = ''
	let thead = ''
	let tbody = ''

	if (header) {
		for (const field of Object.values(fields)) {
			rows = `${rows}\n<th>${field}</th>`
		}
		thead = `<thead>\n<tr>${rows}\n</tr>\n</thead>`
		rows = ''
	}
	for (const [i, record] of data.entries()){
		let cols = ''
		for (const [j, field] of Object.keys(fields).entries()) {
			cols = `${cols}\n<td id='cell_${i}_${j}'>${record[field]}</td>`
		}
		rows = `${rows}\n<tr id='row_${i}'>${cols}\n</tr>`
	}

	const table = `<table id='${table_id}'>\n${thead}\n<tbody>${rows}\n</tbody>\n</table>`
	return table
}

ui.editableCells = (table_id) => {
	$(`#${table_id} td`).click( (e) => {
		const t = e.target || e.srcElement
		const el_name = t.tagName.toLowerCase()

		if (el_name == 'input') {
			return false
		}

		const val = $(t).html()
		$(t).empty().append(`<input type='text' id='edit', value='${val}' />`)
		$('#edit').focus()
		$('#edit').blur( () => {
			const new_val = $('#edit').val()
			$(t).empty().html(new_val)
		} )
	} )
}
