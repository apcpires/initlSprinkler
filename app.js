Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'App',
    appFolder: 'app',

    controllers: [      
        'Sprinkler',
        'Language'
    ],
    autoCreateViewport: true
});

