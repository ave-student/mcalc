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
        });
    });
};
