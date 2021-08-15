
var template = {};

const Global = {
    add: function (element) {
        var item = {
            key: element.key,
            value: element.value
        }
        template[element.key] = element.value;
        return this.update(template);
    },

    remove: function (element) {
        let data = this.init();
        let index = element.index;
        data.splice(index, 1);
        for (var i = index; i <= data.length - 1; i++) {
            data[i].index = data[i].index - 1;
        }
        return data;
    },
    init: function () {
        return template;
    },

    update: function (item) {
        // this.init().push(item);
        template = Object.assign({}, item);
        return this.init();
    },

    data: function (data) {
        template = {
            'items': data
        }
    }
};


export default Global;
