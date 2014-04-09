Ext.define('App.store.Overlap',{
    extend: 'Ext.data.Store',
    model: 'App.model.Overlap',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        api: {
            read: 'php/Overlap.php' // link que retorna os dados a serem exibidos na grid
        },
        reader: {
            type: 'json',
            root: 'dados',
            successProperty: 'success'
        }
    }
});