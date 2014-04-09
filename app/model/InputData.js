Ext.define('App.model.InputData', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'collector', type: 'integer'},
        {name: 'radius', type: 'float'},   
        {name: 'rainfall', type: 'float'}
    ]
});

