//Called after application is started.
const OnStart = () => {
	$('#out_data').hide()
}

$('#btn_calculate').click( () => {
	$('#in_data').hide()
	$('#report').empty()
	$('#out_data').show()
	$('#report').append(`<p>Тип СИ: ${$('#mi_type').val()}</p>`)
	$('#report').append(`<p>Зав. номер: ${$('#mi_number').val()}</p>`)
	$('#report').append(`<p>Год выпуска: ${$('#mi_manufacture_year').val()}</p>`)

	const values = readData()
	const na = average(values)
	const ref_val = Number($('#ref_value').val())
	const abs_error = na - ref_val
	const rel_error = (na - ref_val) / ref_val * 100
	const sko_val = sko(values)

	$('#report').append(`<p>Среднее значение: ${na}</p>`)
	$('#report').append(`<p>Абсолютная погрешность: ${abs_error}</p>`)
	$('#report').append(`<p>Относительная погрешность: ${rel_error} %</p>`)
//	$('#report').append(`<p>Приведенная погрешность: ${ref_error}</p>`)
	$('#report').append(`<p>СКО: ${sko_val}</p>`)
})

const average = (vals) => {
	return vals.reduce((res, val) => {
		return Number(res) + Number(val)
	}) / vals.length
}



const sko = (values) => {
	const n = values.length
	const na = average(values)
	let vals = values.map((val) => {
		return (val - na) ** 2
	})
	return (vals.reduce((res, val) => {
		return res + val
	}) / (n - 1)) ** 0.5
}

$('#btn_edit').click( () => {
	$('#out_data').hide()
	$('#in_data').show()
})

$('#m_count').change( () => {
	addField($('#m_count').val())
})

$('#test').click( () => {
	let l = [100.5, 101, 100.5, 101.5, 100, 100.5, 100.5, 101, 101.5, 100.5]
	$('#mi_type').val('АМ-5, рег. № 10719-07')
	$('#mi_number').val('241821')
	$('#mi_manufacture_year').val(2017)
	$('#min_range').val(0)
	$('#max_range').val(100)
	$('#ref_value').val(100)
	$('#m_values').empty()
	$('#m_count').val(10)

	for (let i = 0; i < 10; i++) {
		$('#m_values').append(`<input type="text" id="input_${i}" value="${l[i]}"/>`)
	}
})

const addField = (count) => {
	$('#m_values').empty()
//	let l = [100.5, 101, 100.5, 101.5, 100, 100.5, 100.5, 101, 101.5, 100.5]
	for (let i = 0; i < count; i++) {
//		$('#m_values').append('<div>').append(`<input type="text" id="input_${i}" value="${l[i]}"/>`)
		$('#m_values').append('<div>').append(`<input type="text" id="input_${i}"/>`)
	}
}

const readData = () => {
	let data = []
	for (let i = 0; i < $('#m_count').val(); i++) {
		data[i] = $(`#input_${i}`).val()
	}
	return data
}